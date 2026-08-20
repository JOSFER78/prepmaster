import React from 'react';
import { 
  Flame, 
  ShoppingBag, 
  ChefHat, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  Clock, 
  CheckCircle2,
  PackageCheck,
  UtensilsCrossed,
  Truck
} from 'lucide-react';
import { ChefServicePackage } from '../types';

interface PlanActionBridgeProps {
  totalServings: number;
  dishCount: number;
  cookTime: string;
  onCookMyself: () => void;
  onHireChef: (pkg?: ChefServicePackage) => void;
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
            <span className="text-[10px] font-black uppercase tracking-wider text-[#E07A5F] bg-[#E07A5F]/10 px-2.5 py-0.5 rounded-full">
              Tu Plan · Tu Cocina · Tu Chef
            </span>
            <span className="text-xs font-mono font-bold text-zinc-400">
              {totalServings} raciones · {dishCount} recetas tradicionales
            </span>
          </div>
          <h2 className="text-lg sm:text-xl font-display font-black text-zinc-900 dark:text-white mt-1">
            ¿Cómo deseas ejecutar este plan?
          </h2>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            Elige si prefieres cocinar tú mismo con la guía interactiva o encargar el servicio a un cocinero profesional homologado.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-zinc-500">
          <span className="flex items-center gap-1 text-emerald-500 font-bold bg-emerald-500/10 px-2.5 py-1 rounded-xl border border-emerald-500/20">
            <ShieldCheck size={14} /> Garantía Sanitaria APPCC
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* OPTION 1: COOK MYSELF */}
        <div 
          onClick={onCookMyself}
          className="p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700/80 hover:border-[#E07A5F]/60 transition-all cursor-pointer flex flex-col justify-between space-y-4 group hover:shadow-md"
        >
          <div className="space-y-2.5">
            <div className="w-10 h-10 rounded-xl bg-[#E07A5F]/15 text-[#E07A5F] flex items-center justify-center font-bold">
              <Flame size={20} />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase text-zinc-400">Opción Autónoma</span>
              <strong className="text-sm font-black text-zinc-900 dark:text-white block group-hover:text-[#E07A5F] transition-colors">
                1. Cocinar Yo Mismo (Guiado)
              </strong>
            </div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
              Guía multi-fuego interactiva con temporizadores, pasos concurrentes y lista de compra descontada de tu despensa.
            </p>
          </div>

          <div className="pt-3 border-t border-zinc-200/60 dark:border-zinc-700/60 flex items-center justify-between text-xs font-bold">
            <span className="text-zinc-400 font-normal">Coste de la app:</span>
            <span className="text-emerald-500 font-black">0 € (Gratis)</span>
          </div>
        </div>

        {/* OPTION 2: HIRE CHEF WITH GROCERY (CON COMPRA) */}
        <div 
          onClick={() => onHireChef('with_grocery')}
          className="p-5 rounded-2xl bg-gradient-to-br from-amber-500/10 to-[#E07A5F]/15 border-2 border-amber-500/50 hover:border-amber-500 transition-all cursor-pointer flex flex-col justify-between space-y-4 shadow-md group relative overflow-hidden"
        >
          <span className="absolute top-2 right-2 text-[9px] font-black px-2 py-0.5 rounded-full bg-amber-500 text-stone-950 uppercase tracking-wider">
            Recomendado · Llave en Mano
          </span>

          <div className="space-y-2.5">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-stone-950 flex items-center justify-center font-black">
              <ChefHat size={22} />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase text-amber-600 dark:text-amber-400">Modalidad Integral</span>
              <strong className="text-sm font-black text-zinc-900 dark:text-white block group-hover:text-[#E07A5F] transition-colors">
                2. Encargar Chef · CON COMPRA
              </strong>
            </div>
            <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed">
              El chef compra todos los frescos en DIA / mercado, lleva cuchillería pro y cocina todo en tuppers herméticos.
            </p>
          </div>

          <div className="pt-3 border-t border-amber-500/30 flex items-center justify-between text-xs font-bold">
            <span className="text-zinc-500 dark:text-zinc-400 font-normal">Comida + Cocina:</span>
            <span className="text-[#E07A5F] font-black text-sm">Desde 25 €/h + Coste Súper</span>
          </div>
        </div>

        {/* OPTION 3: HIRE CHEF COOKING ONLY (SIN COMPRA) */}
        <div 
          onClick={() => onHireChef('cooking_only')}
          className="p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700/80 hover:border-amber-500/60 transition-all cursor-pointer flex flex-col justify-between space-y-4 group hover:shadow-md"
        >
          <div className="space-y-2.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
              <UtensilsCrossed size={20} />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase text-zinc-400">Yo pongo la comida</span>
              <strong className="text-sm font-black text-zinc-900 dark:text-white block group-hover:text-emerald-500 transition-colors">
                3. Encargar Chef · SIN COMPRA
              </strong>
            </div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
              Tú tienes los ingredientes en casa. El chef acude a cocinar las raciones y deja tu cocina impecable.
            </p>
          </div>

          <div className="pt-3 border-t border-zinc-200/60 dark:border-zinc-700/60 flex items-center justify-between text-xs font-bold">
            <span className="text-zinc-400 font-normal">Solo horas de cocina:</span>
            <span className="text-emerald-600 dark:text-emerald-400 font-black text-sm">Desde 20 €/h</span>
          </div>
        </div>

      </div>

      {/* ADDITIONAL DIA ONLINE CHECKOUT LINK */}
      <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs bg-zinc-100/60 dark:bg-zinc-800/40 p-3.5 rounded-2xl border border-zinc-200/60 dark:border-zinc-700/60">
        <div className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400">
          <Truck size={16} className="text-indigo-500" />
          <span>¿Prefieres pedir los ingredientes a domicilio para tenerlos antes?</span>
        </div>
        <button
          onClick={onSupermarketOrder}
          className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1 cursor-pointer"
        >
          <span>Coordinar Cesta Supermercados DIA JIT</span>
          <ArrowRight size={13} />
        </button>
      </div>

    </div>
  );
}
