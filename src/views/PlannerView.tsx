import { useState } from 'react';
import { 
  ShoppingCart, 
  Play, 
  Clock, 
  Users, 
  ShieldCheck, 
  Sparkles, 
  Plus, 
  Minus, 
  Layers, 
  CheckCircle2,
  ChefHat,
  Refrigerator
} from 'lucide-react';
import { ViewState, GeneratedMenuPlan, BatchProject } from '../types';

interface PlannerViewProps {
  onNavigate: (view: ViewState) => void;
  currentMenuPlan?: GeneratedMenuPlan | null;
  activeProject?: BatchProject | null;
  onUpdateDishServings?: (dishId: string, delta: number) => void;
}

export function PlannerView({ 
  onNavigate, 
  currentMenuPlan,
  activeProject,
  onUpdateDishServings
}: PlannerViewProps) {
  
  const dishes = activeProject?.dishes || [];
  const totalServingsCount = activeProject?.totalServings || dishes.reduce((acc, d) => acc + d.servings, 0);
  const people = activeProject?.peopleCount || 4;

  if (!activeProject) {
    return (
      <div className="bg-white dark:bg-zinc-900 rounded-3xl p-8 border border-zinc-200 dark:border-zinc-800 text-center space-y-4 max-w-lg mx-auto my-8">
        <div className="w-12 h-12 rounded-2xl bg-[#E07A5F]/10 text-[#E07A5F] dark:text-[#F4A261] flex items-center justify-center mx-auto">
          <Layers size={24} />
        </div>
        <div>
          <h2 className="text-base font-bold text-zinc-900 dark:text-white">Planificador de Volumen</h2>
          <p className="text-xs text-zinc-500 mt-1">
            No hay ningún lote activo en curso. Genera tu menú con el asistente IA para ajustar las raciones por plato.
          </p>
        </div>
        <button
          onClick={() => onNavigate({ name: 'ai-generator' })}
          className="bg-[#E07A5F] hover:bg-[#c96a50] text-white font-bold text-xs px-5 py-3 rounded-2xl shadow-xs transition-all flex items-center justify-center gap-2 mx-auto"
        >
          <Sparkles size={14} />
          <span>Generar Lote con IA</span>
        </button>
      </div>
    );
  }

  return (
    <div className="w-full space-y-4 animate-fade-in pb-8 max-w-4xl mx-auto text-zinc-900 dark:text-zinc-100">
      
      {/* Header Banner - Raciones Totales Focused */}
      <div className="bg-white dark:bg-zinc-900 rounded-3xl p-5 border border-zinc-200 dark:border-zinc-800 shadow-xs flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="bg-[#E07A5F]/10 text-[#E07A5F] dark:text-[#F4A261] text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase flex items-center gap-1">
              <Sparkles size={11} /> Plan de Raciones Activo
            </span>
            <span className="text-xs font-bold text-zinc-500 flex items-center gap-1">
              <Users size={13} className="text-[#E07A5F]" /> {people} Comensales
            </span>
          </div>
          <h1 className="text-lg md:text-xl font-black text-zinc-900 dark:text-white">
            Gestión de Volumen: <span className="text-[#E07A5F] dark:text-[#F4A261]">{totalServingsCount} Raciones Totales</span>
          </h1>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
            Ajusta las raciones por plato para recalcular automáticamente las proporciones de tu lista de compra.
          </p>
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <button 
            onClick={() => onNavigate({ name: 'shopping-list' })}
            className="flex-1 md:flex-none flex items-center justify-center gap-1.5 bg-[#E07A5F] hover:bg-[#c96a50] text-white px-4 py-2.5 rounded-xl text-xs font-bold shadow-xs transition-all active:scale-95"
          >
            <ShoppingCart size={15} />
            <span>Lista de Compra</span>
          </button>
          <button 
            onClick={() => onNavigate({ name: 'interactive-cook' })}
            className="flex-1 md:flex-none flex items-center justify-center gap-1.5 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 text-zinc-800 dark:text-zinc-200 px-4 py-2.5 rounded-xl text-xs font-bold transition-all active:scale-95"
          >
            <ChefHat size={15} />
            <span>Cocinar</span>
          </button>
        </div>
      </div>

      {/* Grid of Dishes with live +/- serving controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {dishes.map((dish) => (
          <div 
            key={dish.id} 
            className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-5 shadow-xs flex flex-col justify-between gap-4"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase bg-[#E07A5F]/10 text-[#E07A5F] dark:text-[#F4A261] px-2 py-0.5 rounded">
                  {dish.category}
                </span>
                <span className="text-xs font-mono text-zinc-400">
                  {dish.prepTime}
                </span>
              </div>
              <h3 className="text-sm font-bold text-zinc-900 dark:text-white mt-2 leading-snug">
                {dish.name}
              </h3>
              <p className="text-xs text-zinc-500 mt-1 flex items-center gap-1">
                <Refrigerator size={12} className="text-[#E07A5F]" />
                <span>{dish.storageAdvice}</span>
              </p>
            </div>

            {/* Serving Scaler */}
            <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
              <span className="text-xs font-bold text-zinc-700 dark:text-zinc-300">Raciones a Cocinar:</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onUpdateDishServings && onUpdateDishServings(dish.id, -1)}
                  disabled={dish.servings <= 1}
                  className="w-8 h-8 rounded-xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-200 font-black text-sm flex items-center justify-center hover:bg-zinc-200 disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <Minus size={14} />
                </button>
                <span className="text-base font-black font-mono text-[#E07A5F] dark:text-[#F4A261] w-8 text-center">
                  {dish.servings}
                </span>
                <button
                  onClick={() => onUpdateDishServings && onUpdateDishServings(dish.id, 1)}
                  className="w-8 h-8 rounded-xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-200 font-black text-sm flex items-center justify-center hover:bg-zinc-200"
                >
                  <Plus size={14} />
                </button>
              </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}
