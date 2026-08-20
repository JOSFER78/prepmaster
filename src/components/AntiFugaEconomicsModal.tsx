import React from 'react';
import { 
  X, 
  ShieldCheck, 
  TrendingDown, 
  Sparkles, 
  ChefHat, 
  Clock, 
  Lock, 
  RotateCcw, 
  UtensilsCrossed, 
  DollarSign,
  HeartHandshake,
  CheckCircle2
} from 'lucide-react';
import { ChefProfile } from '../types';
import { calculateAntiFugaQuote } from '../lib/antiFugaEngine';
import { BOOTSTRAP_CHEF_PROFILE } from '../lib/chefsData';

interface AntiFugaEconomicsModalProps {
  isOpen: boolean;
  onClose: () => void;
  chef?: ChefProfile | null;
  completedBookingsCount?: number;
}

export const AntiFugaEconomicsModal: React.FC<AntiFugaEconomicsModalProps> = ({
  isOpen,
  onClose,
  chef,
  completedBookingsCount = 0
}) => {
  if (!isOpen) return null;

  const activeChef: ChefProfile = chef || BOOTSTRAP_CHEF_PROFILE;

  const sampleQuote1 = calculateAntiFugaQuote({
    chef: activeChef,
    hours: 3,
    includeGrocery: true,
    completedBookingsWithChef: 0,
    ingredientsCost: 45
  });

  const sampleQuote2 = calculateAntiFugaQuote({
    chef: activeChef,
    hours: 3,
    includeGrocery: true,
    completedBookingsWithChef: 2,
    ingredientsCost: 45
  });

  const sampleQuote5 = calculateAntiFugaQuote({
    chef: activeChef,
    hours: 3,
    includeGrocery: true,
    completedBookingsWithChef: 5,
    ingredientsCost: 45
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-stone-900 border border-zinc-200 dark:border-stone-800 rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-5 border-b border-stone-800 flex items-center justify-between bg-zinc-50 dark:bg-stone-950/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">
                Garantía y Economía Anti-Fuga de TouChef
              </h2>
              <p className="text-xs text-zinc-600 dark:text-stone-400">
                Por qué cliente y cocinero ganan más reservando siempre en la plataforma
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

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-stone-200 text-xs leading-relaxed">
          
          {/* Main Value Proposition */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-stone-900 to-emerald-950/40 border border-emerald-500/30 space-y-2">
            <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-300 font-bold font-bold text-sm">
              <TrendingDown className="w-4 h-4 text-emerald-400" />
              <span>Comisión Decreciente por Fidelidad (Hasta un 5%)</span>
            </div>
            <p className="text-zinc-700 dark:text-stone-300 text-[11px] leading-relaxed">
              En TouChef la comisión se reduce drásticamente cuanto más repites con el mismo cocinero. Además, los alimentos e ingredientes frescos tienen <strong>0% de comisión</strong>.
            </p>
          </div>

          {/* Tier Comparison Table */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-600 dark:text-stone-400 mb-2.5">
              Escala de Tarifas y Comisiones Transparentes:
            </h4>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* Tier 1 */}
              <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-stone-900 border border-zinc-200 dark:border-stone-800 space-y-3 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase bg-stone-800 text-zinc-700 dark:text-stone-300 px-2 py-0.5 rounded">
                    Reserva 1 (Inicial)
                  </span>
                  <div className="text-xl font-black text-amber-700 dark:text-amber-400 mt-2">15%</div>
                  <p className="text-[11px] text-zinc-600 dark:text-stone-400 mt-1">
                    Cubre matching, verificación de identidad y seguro de responsabilidad civil.
                  </p>
                </div>
                <div className="pt-2 border-t border-stone-800 text-[11px] text-zinc-700 dark:text-stone-300 space-y-1">
                  <div className="flex justify-between">
                    <span>Cocinero cobra:</span>
                    <strong className="text-emerald-400">{sampleQuote1.chefNetPayout} €</strong>
                  </div>
                </div>
              </div>

              {/* Tier 2 */}
              <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-stone-900 border border-zinc-200 dark:border-stone-800 space-y-3 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded">
                    Reservas 2 a 4
                  </span>
                  <div className="text-xl font-black text-amber-300 mt-2">8%</div>
                  <p className="text-[11px] text-zinc-600 dark:text-stone-400 mt-1">
                    Tarifa de fidelidad reducida. Menor coste para mantener la relación dentro.
                  </p>
                </div>
                <div className="pt-2 border-t border-stone-800 text-[11px] text-zinc-700 dark:text-stone-300 space-y-1">
                  <div className="flex justify-between">
                    <span>Cocinero cobra:</span>
                    <strong className="text-emerald-400">{sampleQuote2.chefNetPayout} €</strong>
                  </div>
                </div>
              </div>

              {/* Tier 3 */}
              <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-500/40 space-y-3 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 font-bold px-2 py-0.5 rounded">
                    Reserva 5+ (Máxima)
                  </span>
                  <div className="text-xl font-black text-emerald-400 mt-2">5%</div>
                  <p className="text-[11px] text-zinc-600 dark:text-stone-400 mt-1">
                    Comisión mínima simbólica. Más rentable y cómodo que pagar por Bizum.
                  </p>
                </div>
                <div className="pt-2 border-t border-stone-800 text-[11px] text-zinc-700 dark:text-stone-300 space-y-1">
                  <div className="flex justify-between">
                    <span>Cocinero cobra:</span>
                    <strong className="text-emerald-400">{sampleQuote5.chefNetPayout} €</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 5 Pillars of Continuous Value */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-600 dark:text-stone-400">
              5 Servicios que se pierden al operar por fuera:
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div className="p-3 bg-stone-900 rounded-xl border border-stone-800 flex items-start gap-2.5">
                <Lock className="w-4 h-4 text-amber-700 dark:text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-zinc-900 dark:text-white block text-xs font-bold">Pago Protegido en Depósito</strong>
                  <span className="text-[11px] text-zinc-600 dark:text-stone-400">El dinero queda en custodia segura hasta que el menú queda terminado y listo en tu nevera.</span>
                </div>
              </div>

              <div className="p-3 bg-stone-900 rounded-xl border border-stone-800 flex items-start gap-2.5">
                <UtensilsCrossed className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-zinc-900 dark:text-white block text-xs font-bold">Memoria del Hogar Sincronizada</strong>
                  <span className="text-[11px] text-zinc-600 dark:text-stone-400">Tus alergias, tipo de cocina y fiambreras se guardan automáticamente. No hay que volver a explicar nada.</span>
                </div>
              </div>

              <div className="p-3 bg-stone-900 rounded-xl border border-stone-800 flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-zinc-900 dark:text-white block text-xs font-bold">Seguro y Reemplazo Inmediato</strong>
                  <span className="text-[11px] text-zinc-600 dark:text-stone-400">Si el cocinero sufre un imprevisto, TouChef gestiona un reemplazo o devolución íntegra al instante.</span>
                </div>
              </div>

              <div className="p-3 bg-stone-900 rounded-xl border border-stone-800 flex items-start gap-2.5">
                <RotateCcw className="w-4 h-4 text-amber-700 dark:text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-zinc-900 dark:text-white block text-xs font-bold">Replicación en 1 Clic</strong>
                  <span className="text-[11px] text-zinc-600 dark:text-stone-400">Repite el menú semanal con el mismo chef y compra en DIA en 10 segundos sin coordinar por WhatsApp.</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-stone-950/80 border-t border-stone-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs shadow-md transition-all cursor-pointer"
          >
            Entendido
          </button>
        </div>

      </div>
    </div>
  );
};
