import React, { useState } from 'react';
import { 
  X, 
  ChefHat, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  Sparkles, 
  Flame, 
  Refrigerator, 
  ShieldCheck, 
  ShoppingBag,
  ArrowRight
} from 'lucide-react';
import { ChefBookingRequest } from '../types';

interface ServiceTimelineModalProps {
  isOpen: boolean;
  onClose: () => void;
  booking: ChefBookingRequest | null;
  onAdvanceMilestone?: (milestoneIndex: number) => void;
}

export const ServiceTimelineModal: React.FC<ServiceTimelineModalProps> = ({
  isOpen,
  onClose,
  booking,
  onAdvanceMilestone
}) => {
  if (!isOpen || !booking) return null;

  const [currentStep, setCurrentStep] = useState<number>(() => {
    if (booking.status === 'completed') return 5;
    if (booking.status === 'in_progress') return 3;
    if (booking.status === 'chef_arriving') return 2;
    if (booking.status === 'confirmed') return 1;
    return 1;
  });

  const milestones = [
    {
      id: 1,
      title: '1. Reserva Confirmada & Depósito Retenido',
      desc: 'El pago permanece en custodia segura. El cocinero ha recibido el menú y la lista de utensilios.',
      icon: <ShieldCheck className="w-5 h-5 text-emerald-400" />,
      time: 'Programado',
      status: currentStep >= 1 ? 'completed' : 'pending'
    },
    {
      id: 2,
      title: '2. Llegada del Chef & Check-in en Casa',
      desc: `El chef llega a ${booking.address} con sus cuchillos profesionales y valida los ingredientes de la compra.`,
      icon: <MapPin className="w-5 h-5 text-amber-400" />,
      time: booking.targetTimeSlot.split('-')[0].trim(),
      status: currentStep >= 2 ? 'completed' : currentStep === 1 ? 'current' : 'pending'
    },
    {
      id: 3,
      title: '3. Cocina Simultánea & Preparación de Raciones',
      desc: `Elaboración coordinada de ${booking.dishes.length} recetas en paralelo según la memoria del hogar.`,
      icon: <Flame className="w-5 h-5 text-rose-400" />,
      time: 'En curso (3h)',
      status: currentStep >= 3 ? 'completed' : currentStep === 2 ? 'current' : 'pending'
    },
    {
      id: 4,
      title: '4. Envasado, Etiquetado & Limpieza de Cocina',
      desc: 'Raciones repartidas en recipientes de cristal, rotuladas para nevera/congelador y fogones limpios.',
      icon: <Refrigerator className="w-5 h-5 text-[#52796F]" />,
      time: 'Finalizando',
      status: currentStep >= 4 ? 'completed' : currentStep === 3 ? 'current' : 'pending'
    },
    {
      id: 5,
      title: '5. Servicio Concluido & Liberación de Pago',
      desc: 'Cliente aprueba el resultado, el chef recibe su cobro neto y se aplica el descuento por fidelidad.',
      icon: <CheckCircle2 className="w-5 h-5 text-emerald-400" />,
      time: 'Completado',
      status: currentStep >= 5 ? 'completed' : currentStep === 4 ? 'current' : 'pending'
    }
  ];

  const handleNextStep = () => {
    if (currentStep < 5) {
      const next = currentStep + 1;
      setCurrentStep(next);
      if (onAdvanceMilestone) {
        onAdvanceMilestone(next);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-stone-900 border border-zinc-200 dark:border-stone-800 rounded-3xl w-full max-w-xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-5 border-b border-stone-800 flex items-center justify-between bg-zinc-50 dark:bg-stone-950/60">
          <div className="flex items-center gap-3">
            <img
              src={booking.chefAvatar || 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=400&auto=format&fit=crop&q=80'}
              alt={booking.chefName}
              className="w-11 h-11 rounded-xl object-cover border border-amber-500/30"
            />
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <span>Hitos de la Sesión en Vivo</span>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.2 rounded-full font-bold">
                  En Vivo
                </span>
              </h2>
              <p className="text-xs text-zinc-600 dark:text-stone-400">
                {booking.chefName} • {booking.targetDate} ({booking.targetTimeSlot})
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-zinc-600 dark:text-stone-400 hover:text-white hover:bg-stone-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Milestones List */}
        <div className="p-6 overflow-y-auto space-y-4 text-xs">
          
          <div className="space-y-4">
            {milestones.map((m, idx) => (
              <div
                key={m.id}
                className={`p-4 rounded-2xl border transition-all flex items-start gap-3.5 ${
                  m.status === 'completed'
                    ? 'bg-emerald-50 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-500/30 text-zinc-900 dark:text-stone-200'
                    : m.status === 'current'
                      ? 'bg-amber-500/15 border-amber-500/60 text-zinc-900 dark:text-white font-bold shadow-md'
                      : 'bg-stone-900/50 border-stone-800 text-stone-500'
                }`}
              >
                <div className="p-2 rounded-xl bg-stone-900 border border-stone-800 shrink-0">
                  {m.icon}
                </div>

                <div className="flex-1 min-w-0 space-y-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-xs text-zinc-900 dark:text-stone-100">{m.title}</h4>
                    <span className="text-[10px] font-mono text-zinc-600 dark:text-stone-400">{m.time}</span>
                  </div>
                  <p className="text-[11px] text-zinc-600 dark:text-stone-400 leading-relaxed">{m.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Action to advance milestone (demo & operational) */}
          <div className="pt-2 flex items-center justify-between border-t border-stone-800 text-xs">
            <span className="text-zinc-600 dark:text-stone-400">
              Estado: <strong className="text-amber-700 dark:text-amber-300">Paso {currentStep} de 5</strong>
            </span>

            {currentStep < 5 ? (
              <button
                onClick={handleNextStep}
                className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <span>Avanzar Hito del Servicio</span>
                <ArrowRight size={13} />
              </button>
            ) : (
              <span className="text-emerald-400 font-bold flex items-center gap-1">
                <CheckCircle2 size={15} />
                <span>Servicio 100% Finalizado</span>
              </span>
            )}
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-stone-950/80 border-t border-stone-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-white font-bold text-xs transition-colors cursor-pointer"
          >
            Cerrar
          </button>
        </div>

      </div>
    </div>
  );
};
