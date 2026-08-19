import { db } from '../lib/firebase';
import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  setDoc, 
  addDoc, 
  onSnapshot,
  query,
  orderBy
} from 'firebase/firestore';

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderRole: 'client' | 'chef' | 'system';
  text: string;
  timestamp: string;
  hasAntiLeakViolation?: boolean;
}

export interface ConversationMeta {
  id: string;
  bookingId: string;
  customerId: string;
  customerName: string;
  chefId: string;
  chefName: string;
  lastMessage?: string;
  updatedAt: string;
}

/**
 * Patrones de filtrado anti-fuga (teléfono, email, bizum, iban)
 */
export function filterAntiLeak(text: string): { cleanText: string; hasViolation: boolean } {
  const phonePattern = /(?:(?:\+|00)?34)?[6-9]\d{8}|\b\d{3}[-\s.]?\d{3}[-\s.]?\d{3}\b/g;
  const emailPattern = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g;
  const ibanPattern = /\bES\d{2}[-\s]?\d{4}[-\s]?\d{4}[-\s]?\d{4}[-\s]?\d{4}[-\s]?\d{4}\b/gi;
  const bizumPattern = /\b(?:bizum|pago directo|por fuera|transferencia)\b/gi;

  let hasViolation = false;
  let cleanText = text;

  if (phonePattern.test(cleanText)) {
    hasViolation = true;
    cleanText = cleanText.replace(phonePattern, '[🔒 Teléfono protegido hasta confirmar reserva]');
  }
  if (emailPattern.test(cleanText)) {
    hasViolation = true;
    cleanText = cleanText.replace(emailPattern, '[🔒 Email protegido hasta confirmar reserva]');
  }
  if (ibanPattern.test(cleanText)) {
    hasViolation = true;
    cleanText = cleanText.replace(ibanPattern, '[🔒 Cuenta bancaria protegida]');
  }

  return { cleanText, hasViolation };
}

/**
 * Envía un mensaje en la conversación de un encargo en Firestore
 */
export async function sendChatMessage(params: {
  bookingId: string;
  senderId: string;
  senderName: string;
  senderRole: 'client' | 'chef' | 'system';
  text: string;
}): Promise<void> {
  try {
    const { cleanText, hasViolation } = filterAntiLeak(params.text);
    const messagesCol = collection(db, 'conversations', params.bookingId, 'messages');
    
    const newMsg: ChatMessage = {
      id: `msg_${Date.now()}`,
      senderId: params.senderId,
      senderName: params.senderName,
      senderRole: params.senderRole,
      text: cleanText,
      timestamp: new Date().toISOString(),
      hasAntiLeakViolation: hasViolation
    };

    const msgRef = doc(messagesCol, newMsg.id);
    await setDoc(msgRef, newMsg);

    // Actualizar metadata de conversación
    const convRef = doc(db, 'conversations', params.bookingId);
    await setDoc(convRef, {
      bookingId: params.bookingId,
      lastMessage: cleanText,
      updatedAt: new Date().toISOString()
    }, { merge: true });
  } catch (error) {
    console.error('Error sending chat message to Firestore:', error);
    throw error;
  }
}

/**
 * Escuchador en tiempo real de los mensajes de una reserva
 */
export function subscribeToChatMessages(
  bookingId: string,
  callback: (messages: ChatMessage[]) => void
): () => void {
  const messagesCol = collection(db, 'conversations', bookingId, 'messages');
  const q = query(messagesCol, orderBy('timestamp', 'asc'));

  return onSnapshot(q, (snap) => {
    if (!snap.empty) {
      callback(snap.docs.map(d => d.data() as ChatMessage));
    } else {
      // Mensaje de bienvenida inicial si no hay mensajes
      callback([
        {
          id: 'msg-system-welcome',
          senderId: 'system',
          senderName: 'TouChef Protection System',
          senderRole: 'system',
          text: `🔒 Canal seguro TouChef activo para el encargo ${bookingId}. Negocia los detalles de tu menú y horarios con total seguridad.`,
          timestamp: new Date().toISOString()
        }
      ]);
    }
  }, (err) => {
    console.warn('Chat messages subscription error:', err);
  });
}
