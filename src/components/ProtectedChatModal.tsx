import React, { useState } from 'react';
import { 
  X, 
  Send, 
  Lock, 
  CheckCheck, 
  ChefHat, 
  Check,
  ShieldCheck,
  Radio
} from 'lucide-react';
import { ChefBookingRequest } from '../types';

interface Message {
  id: string;
  sender: 'client' | 'chef' | 'system';
  text: string;
  timestamp: string;
}

interface ProtectedChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  booking: ChefBookingRequest | null;
  onAcceptOffer?: (bookingId: string, chefId: string) => void;
}

export const ProtectedChatModal: React.FC<ProtectedChatModalProps> = ({
  isOpen,
  onClose,
  booking,
  onAcceptOffer
}) => {
  if (!isOpen || !booking) return null;

  const chefName = booking.chefName || 'Cocinero TouChef';
  const isCandidateNegotiation = booking.status === 'offers_received' || (booking.applicants && booking.applicants.length > 0 && booking.status !== 'confirmed');

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'msg-1',
      sender: 'system',
      text: `🔒 Canal seguro TouChef activo para el encargo ${booking.id}. Tu teléfono y datos bancarios están 100% protegidos.`,
      timestamp: '10:00'
    },
    {
      id: 'msg-2',
      sender: 'chef',
      text: `¡Hola! He revisado tu menú de ${booking.dishes.length} platos y tengo disponibilidad completa en tu franja horaria. Cuento con carné sanitario y cuchillos propios desinfectados. ¿Tienes alguna indicación especial sobre los fogones o tuppers?`,
      timestamp: '10:05'
    }
  ]);

  const [inputMessage, setInputMessage] = useState<string>('');

  const quickReplies = [
    'Tengo vitro de 3 fuegos y horno eléctrico 🔥',
    'Las fiambreras de cristal están en la encimera 🍱',
    'El pedido de DIA llegará 2h antes 🛒',
    'Me gustaría empezar puntual a la hora acordada ⏰'
  ];

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || inputMessage;
    if (!text.trim()) return;

    const newMsg: Message = {
      id: `msg-${Date.now()}`,
      sender: 'client',
      text: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, newMsg]);
    setInputMessage('');

    // Instant confirmation response from chef
    setTimeout(() => {
      const chefReply: Message = {
        id: `msg-${Date.now() + 1}`,
        sender: 'chef',
        text: '¡Entendido perfectamente! Quedo a tu disposición para cuando desees confirmar la reserva.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, chefReply]);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl flex flex-col h-[620px] max-h-[90vh]">
        
        {/* Header */}
        <div className="p-4 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between bg-zinc-50 dark:bg-zinc-950/80">
          <div className="flex items-center gap-3">
            <img
              src={booking.chefAvatar || 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=400&auto=format&fit=crop&q=80'}
              alt={chefName}
              className="w-10 h-10 rounded-xl object-cover border border-amber-500/30"
            />
            <div>
              <h2 className="text-sm font-bold text-zinc-900 dark:text-white flex items-center gap-1.5">
                <span>{chefName}</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400" title="En línea" />
              </h2>
              <span className="text-[11px] text-zinc-500 dark:text-zinc-400">
                Encargo {booking.targetDate} ({booking.targetTimeSlot})
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-zinc-500 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Candidate Offer Action Banner (If negotiating) */}
        {isCandidateNegotiation && onAcceptOffer && booking.chefId && (
          <div className="bg-emerald-50 dark:bg-emerald-950/40 border-b border-emerald-200 dark:border-emerald-500/30 p-3 flex items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300 min-w-0">
              <ShieldCheck size={16} className="shrink-0 text-emerald-600 dark:text-emerald-400" />
              <span className="truncate">
                ¿Te convence la propuesta de <strong>{chefName}</strong>?
              </span>
            </div>
            <button
              onClick={() => onAcceptOffer(booking.id, booking.chefId!)}
              className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1 shrink-0 shadow-xs cursor-pointer active:scale-95 transition-all"
            >
              <Check size={13} strokeWidth={3} />
              <span>Aceptar Cocinero</span>
            </button>
          </div>
        )}

        {/* Security Alert Banner */}
        <div className="bg-amber-50 dark:bg-amber-500/10 border-b border-amber-200 dark:border-amber-500/20 px-4 py-2 flex items-center gap-2 text-[11px] text-amber-800 dark:text-amber-300 font-medium">
          <Lock size={12} className="shrink-0" />
          <span>Chat protegido: Tu reserva incluye cobertura de responsabilidad civil y garantía Escrow.</span>
        </div>

        {/* Messages Body */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-zinc-50/50 dark:bg-transparent">
          {messages.map(msg => {
            if (msg.sender === 'system') {
              return (
                <div key={msg.id} className="p-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 text-center text-[10px] text-zinc-600 dark:text-zinc-400">
                  {msg.text}
                </div>
              );
            }

            const isMe = msg.sender === 'client';

            return (
              <div
                key={msg.id}
                className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] p-3 rounded-2xl text-xs leading-relaxed ${
                    isMe
                      ? 'bg-[#E07A5F] text-white rounded-tr-xs shadow-xs'
                      : 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white rounded-tl-xs border border-zinc-200 dark:border-zinc-700 shadow-xs'
                  }`}
                >
                  <p>{msg.text}</p>
                </div>
                <div className="flex items-center gap-1 mt-1 text-[10px] text-zinc-400 px-1">
                  <span>{msg.timestamp}</span>
                  {isMe && <CheckCheck size={12} className="text-[#E07A5F]" />}
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Replies */}
        <div className="border-t border-zinc-200 dark:border-zinc-800/80 bg-zinc-50 dark:bg-zinc-950/40 p-2.5 flex items-center gap-1.5 overflow-x-auto hide-scrollbar">
          {quickReplies.map((reply, i) => (
            <button
              key={i}
              onClick={() => handleSendMessage(reply)}
              className="whitespace-nowrap px-3 py-1.5 rounded-xl bg-white hover:bg-zinc-100 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-700 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white text-[11px] font-medium border border-zinc-200 dark:border-zinc-700/60 transition-colors shrink-0 cursor-pointer shadow-2xs"
            >
              {reply}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-3 border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 flex items-center gap-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder={`Escribe un mensaje seguro a ${chefName}...`}
            className="flex-1 bg-zinc-50 dark:bg-zinc-850 border border-zinc-300 dark:border-zinc-700 rounded-xl px-3.5 py-2.5 text-xs text-zinc-900 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-zinc-500 focus:outline-none focus:border-[#E07A5F]"
          />
          <button
            onClick={() => handleSendMessage()}
            disabled={!inputMessage.trim()}
            className="p-2.5 rounded-xl bg-[#E07A5F] hover:bg-[#c85a32] text-white disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer shadow-xs active:scale-95"
            title="Enviar mensaje"
          >
            <Send size={16} />
          </button>
        </div>

      </div>
    </div>
  );
};
