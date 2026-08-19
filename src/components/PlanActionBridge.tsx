import React from 'react';
import { 
  Flame, 
  ShoppingBag, 
  ChefHat, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  Clock, 
  CheckCircle2 
} from 'lucide-react';

interface PlanActionBridgeProps {
  totalServings: number;
  dishCount: number;
  cookTime: string;
  onCookMyself: () => void;
  onHireChef: () => void;
  onSupermarketOrder: () => void;
}

export function PlanActionBridge({
  totalServings,
  dishCount,
  cookTime,
  onCookMyself,
  onHireChef,
  onSupermarketOrder
}: PlanActionBridgeProps) {
  return (
    <div className="glass-surface-elevated rounded-3xl p-6 sm:p-7 border border-zinc-200/80 dark:border-white/10 shadow-xl space-y-6 animate-fade-in text-zinc-900 dark:text-zinc-100">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-zinc-100 dark:border-zinc-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black uppercase tracking-wider text-[#E07A5F] bg-[#E07A5F]/10 px-2 py-0.5 rounded-md">
              Tu Plan · Tu Cocina · Tu Chef
            </span>
            <span className="text-xs font-mono font-bold text-zinc-400">
              {totalServings} raciones calculadas
            </span>
          </div>
          <h2 className="text-lg sm:text-xl font-display font-black text-zinc-900 dark:text-white mt-1">
            Decide Cómo Ejecutar Tu Plan de Comidas
          </h2>
        </div>

        <div className="flex items-center gap-2 text-xs text-zinc-500">
          <span className="flex items-center gap-1 text-emerald-500 font-bold">
            <ShieldCheck size={14} /> Pago protegido
          </span>
          <span>·</span>
          <span>Ahorra 4-6h/semana</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* OPTION 1: COOK MYSELF */}
        <div 
          onClick={onCookMyself}
          className="p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700/80 hover:border-[#E07A5F]/60 transition-all cursor-pointer flex flex-col justify-between space-y-4 group"
        >
          <div className="space-y-2.5">
            <div className="w-10 h-10 rounded-xl bg-[#E07A5F]/15 text-[#E07A5F] flex items-center justify-center font-bold">
              <Flame size={20} />
            </div>
            <strong className="text-sm font-black text-zinc-900 dark:text-white block group-hover:text-[#E07A5F] transition-colors">
              1. Cocinar yo
            </strong>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
              Cocina siguiendo la guía multi-fuego interactiva con temporizadores y recetas paso a paso.
            </p>
          </div>

          <div className="pt-3 border-t border-zinc-200/60 dark:border-zinc-700/60 flex items-center justify-between text-xs font-bold">
            <span className="text-zinc-400 font-normal">Coste servicio:</span>
            <span className="text-emerald-500 font-black">0 € (Gratis)</span>
          </div>
        </div>

        {/* OPTION 2: SUPERMARKET DIA JIT */}
        <div 
          onClick={onSupermarketOrder}
          className="p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700/80 hover:border-[#E07A5F]/60 transition-all cursor-pointer flex flex-col justify-between space-y-4 group"
        >
          <div className="space-y-2.5">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/15 text-indigo-500 flex items-center justify-center font-bold">
              <ShoppingBag size={20} />
            </div>
            <strong className="text-sm font-black text-zinc-900 dark:text-white block group-hover:text-indigo-400 transition-colors">
              2. Compra en DIA
            </strong>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
              Convierte los ingredientes en cestas de supermercado con franja de entrega programada en casa.
            </p>
          </div>

          <div className="pt-3 border-t border-zinc-200/60 dark:border-zinc-700/60 flex items-center justify-between text-xs font-bold">
            <span className="text-zinc-400 font-normal">Entrega estimada:</span>
            <span className="text-indigo-500 font-black">Mismo día (4,99 €)</span>
          </div>
        </div>

        {/* OPTION 3: HIRE CHEF */}
        <div 
          onClick={onHireChef}
          className="p-5 rounded-2xl bg-gradient-to-br from-amber-500/10 to-[#E07A5F]/15 border-2 border-amber-500/40 hover:border-amber-500 transition-all cursor-pointer flex flex-col justify-between space-y-4 shadow-md group relative overflow-hidden"
        >
          <span className="absolute top-2 right-2 text-[9px] font-black px-2 py-0.5 rounded-full bg-amber-500 text-stone-950 uppercase tracking-wider">
            Más cómodo
          </span>

          <div className="space-y-2.5">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-stone-950 flex items-center justify-center font-black">
              <ChefHat size={22} />
            </div>
            <strong className="text-sm font-black text-zinc-900 dark:text-white block group-hover:text-[#E07A5F] transition-colors">
              3. Encargar a un Chef
            </strong>
            <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed">
              Lánzalo a la red de cocineros para recibir propuestas y aceptar vía chat, o elige manualmente a tu chef favorito.
            </p>
          </div>

          <div className="pt-3 border-t border-amber-500/30 flex items-center justify-between text-xs font-bold">
            <span className="text-zinc-500 dark:text-zinc-400 font-normal">Tarifas desde:</span>
            <span className="text-[#E07A5F] font-black text-sm">20 €/h · Escrow Seguro</span>
          </div>
        </div>

      </div>

    </div>
  );
}
