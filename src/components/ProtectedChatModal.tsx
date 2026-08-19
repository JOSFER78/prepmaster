import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  Send, 
  Lock, 
  CheckCheck, 
  ChefHat, 
  Check, 
  ShieldCheck, 
  Radio,
  Star,
  Sparkles,
  AlertCircle
} from 'lucide-react';
import { ChefBookingRequest, ChefApplication } from '../types';
import { 
  ChatMessage, 
  subscribeToChatMessages, 
  sendChatMessage 
} from '../services/chatService';
import { acceptChefApplicationInFirestore } from '../services/bookingService';
import { auth } from '../lib/firebase';

interface ProtectedChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  booking: ChefBookingRequest | null;
  onAcceptOffer?: (bookingId: string, applicantId: string) => void;
}

export const ProtectedChatModal: React.FC<ProtectedChatModalProps> = ({
  isOpen,
  onClose,
  booking,
  onAcceptOffer
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState<string>('');
  const [isSending, setIsSending] = useState<boolean>(false);
  const [isAccepting, setIsAccepting] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen || !booking) return;

    const unsubscribe = subscribeToChatMessages(booking.id, (loadedMessages) => {
      setMessages(loadedMessages);
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    });

    return () => unsubscribe();
  }, [isOpen, booking?.id]);

  if (!isOpen || !booking) return null;

  const currentUid = auth.currentUser?.uid || 'user-client-123';
  const currentEmail = auth.currentUser?.email || '';
  const currentName = auth.currentUser?.displayName || (currentEmail ? currentEmail.split('@')[0] : 'Cliente');
  const isChefUser = currentEmail === 'usajosefernan@gmail.com' || (auth.currentUser as any)?.isChef;
  const userRole: 'client' | 'chef' = isChefUser ? 'chef' : 'client';

  const chefName = booking.chefName || 'Cocinero TouChef Homologado';
  const isCandidateNegotiation = booking.status === 'offers_received' || (booking.applicants && booking.applicants.length > 0 && booking.status !== 'confirmed');
  const pendingApplicants = booking.applicants?.filter(a => a.status === 'pending') || [];

  const quickReplies = [
    'Tengo vitrocerámica de 3 fuegos y horno eléctrico 🔥',
    'Las fiambreras de cristal están listas en la encimera 🍱',
    'El pedido de supermercado DIA ya está coordinado 🛒',
    'Me gustaría empezar puntual a la hora acordada ⏰'
  ];

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || inputMessage;
    if (!text.trim() || isSending) return;

    setIsSending(true);
    try {
      await sendChatMessage({
        bookingId: booking.id,
        senderId: currentUid,
        senderName: currentName,
        senderRole: userRole,
        text: text.trim()
      });
      setInputMessage('');
    } catch (err) {
      console.error('Error sending message:', err);
    } finally {
      setIsSending(false);
    }
  };

  const handleAcceptDeal = async (applicantId: string) => {
    setIsAccepting(true);
    try {
      await acceptChefApplicationInFirestore(booking.id, applicantId);
      if (onAcceptOffer) {
        onAcceptOffer(booking.id, applicantId);
      }
    } catch (err) {
      console.error('Error accepting candidate deal:', err);
    } finally {
      setIsAccepting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl w-full max-w-xl overflow-hidden shadow-2xl flex flex-col h-[650px] max-h-[92vh]">
        
        {/* Header */}
        <div className="p-4 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between bg-zinc-50 dark:bg-zinc-950/80">
          <div className="flex items-center gap-3">
            <img
              src={booking.chefAvatar || 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=400&auto=format&fit=crop&q=80'}
              alt={chefName}
              className="w-10 h-10 rounded-xl object-cover border border-amber-500/30 shrink-0"
            />
            <div>
              <h2 className="text-sm font-bold text-zinc-900 dark:text-white flex items-center gap-1.5">
                <span>{booking.chefName ? booking.chefName : 'Canal del Encargo (Wallapop Mode)'}</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400" title="En línea" />
              </h2>
              <span className="text-[11px] text-zinc-500 dark:text-zinc-400">
                Encargo {booking.targetDate} ({booking.targetTimeSlot}) · {booking.dishes?.length || 0} platos
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="hidden sm:flex items-center gap-1 text-[10px] font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 px-2 py-1 rounded-lg">
              <ShieldCheck size={12} /> Chat Protegido
            </span>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-zinc-500 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Candidaturas y Ofertas Recibidas (Modo Negociación) */}
        {isCandidateNegotiation && pendingApplicants.length > 0 && !isChefUser && (
          <div className="bg-amber-500/10 border-b border-amber-500/20 p-3 space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-amber-800 dark:text-amber-300">
              <span className="flex items-center gap-1">
                <ChefHat size={14} /> Candidatos Postulados ({pendingApplicants.length})
              </span>
              <span className="text-[10px] font-normal">Acepta un trato para confirmar la fecha</span>
            </div>

            <div className="space-y-2 max-h-32 overflow-y-auto">
              {pendingApplicants.map(app => (
                <div key={app.id} className="p-2.5 rounded-xl bg-white dark:bg-zinc-800 border border-amber-500/30 flex items-center justify-between gap-3 shadow-xs">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <img src={app.chefAvatar} alt={app.chefName} className="w-8 h-8 rounded-lg object-cover" />
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-zinc-900 dark:text-white truncate">{app.chefName}</span>
                        <span className="text-[10px] text-amber-500 flex items-center gap-0.5">
                          <Star size={10} fill="currentColor" /> {app.chefRating}
                        </span>
                      </div>
                      <p className="text-[11px] text-zinc-500 truncate">{app.message}</p>
                    </div>
                  </div>

                  <button
                    disabled={isAccepting}
                    onClick={() => handleAcceptDeal(app.id)}
                    className="btn-hero-copper text-white text-xs font-black px-3 py-1.5 rounded-lg flex items-center gap-1 shrink-0 shadow-sm disabled:opacity-50 cursor-pointer"
                  >
                    <Check size={12} />
                    <span>{isAccepting ? 'Aceptando...' : 'Aceptar Trato'}</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Messages Feed */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-zinc-50/50 dark:bg-zinc-950/30">
          {messages.map((msg) => {
            const isMe = msg.senderId === currentUid;
            const isSystem = msg.senderRole === 'system';

            if (isSystem) {
              return (
                <div key={msg.id} className="flex justify-center my-2">
                  <div className="bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 text-xs px-4 py-2 rounded-2xl max-w-md text-center flex items-center gap-2 shadow-xs">
                    <Lock size={13} className="text-amber-500 shrink-0" />
                    <span>{msg.text}</span>
                  </div>
                </div>
              );
            }

            return (
              <div
                key={msg.id}
                className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
              >
                <span className="text-[10px] text-zinc-400 px-1 mb-0.5 font-medium">
                  {msg.senderName} · {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
                <div
                  className={`max-w-[85%] p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-sm ${
                    isMe
                      ? 'bg-amber-600 text-white rounded-br-xs'
                      : 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 border border-zinc-200 dark:border-zinc-700/60 rounded-bl-xs'
                  }`}
                >
                  <p>{msg.text}</p>
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Replies */}
        <div className="px-4 py-2 bg-white dark:bg-zinc-900 border-t border-zinc-200/50 dark:border-zinc-800/50 flex gap-2 overflow-x-auto no-scrollbar">
          {quickReplies.map((reply, i) => (
            <button
              key={i}
              onClick={() => handleSendMessage(reply)}
              className="text-[11px] whitespace-nowrap bg-zinc-100 dark:bg-zinc-800 hover:bg-amber-500/10 hover:text-amber-600 dark:hover:text-amber-400 text-zinc-600 dark:text-zinc-400 px-3 py-1.5 rounded-xl border border-zinc-200 dark:border-zinc-700 transition-colors shrink-0 cursor-pointer"
            >
              {reply}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-3 bg-zinc-50 dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-800 flex items-center gap-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSendMessage()}
            placeholder="Escribe un mensaje seguro..."
            className="flex-1 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl px-4 py-2.5 text-xs sm:text-sm text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:border-amber-500"
          />

          <button
            disabled={!inputMessage.trim() || isSending}
            onClick={() => handleSendMessage()}
            className="btn-hero-copper text-white p-2.5 rounded-2xl disabled:opacity-50 transition-transform active:scale-95 cursor-pointer shadow-md"
          >
            <Send size={18} />
          </button>
        </div>

      </div>
    </div>
  );
};
