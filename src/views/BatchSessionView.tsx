import { useState } from 'react';
import { 
  ArrowLeft, 
  Users, 
  Clock, 
  Flame, 
  Scissors, 
  Leaf, 
  Wind, 
  Refrigerator, 
  CheckCircle, 
  Package, 
  Snowflake, 
  AlertCircle, 
  ShoppingCart,
  Sparkles
} from 'lucide-react';
import { ViewState, BatchProject } from '../types';

interface BatchSessionViewProps {
  onNavigate: (view: ViewState) => void;
  activeProject?: BatchProject | null;
}

export function BatchSessionView({ onNavigate, activeProject }: BatchSessionViewProps) {
  if (!activeProject || !activeProject.dishes || activeProject.dishes.length === 0) {
    return (
      <div className="max-w-xl mx-auto py-16 px-4 text-center space-y-6 animate-fade-in text-zinc-900 dark:text-zinc-100">
        <div className="w-16 h-16 rounded-3xl bg-[#E07A5F]/10 text-[#E07A5F] flex items-center justify-center mx-auto">
          <Flame size={32} />
        </div>
        <div className="space-y-2">
          <span className="text-[10px] font-black uppercase tracking-wider bg-zinc-100 dark:bg-zinc-800 text-zinc-500 px-3 py-1 rounded-full border border-zinc-200 dark:border-zinc-700">
            Sin Lote Activo · Firebase a 0
          </span>
          <h2 className="text-xl font-black text-zinc-900 dark:text-white">
            No tienes ninguna sesión de batch cooking activa
          </h2>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            Crea tu primer menú semanal o receta canónica con el Asistente Guiado para visualizar el cronograma de cocción en lote.
          </p>
        </div>
        <button
          onClick={() => onNavigate({ name: 'ai-generator' })}
          className="btn-hero-copper text-white text-xs font-black px-6 py-3 rounded-2xl shadow-md flex items-center gap-2 mx-auto cursor-pointer"
        >
          <Sparkles size={16} />
          <span>Generar Menú Semanal con IA</span>
        </button>
      </div>
    );
  }

  const [servings, setServings] = useState<number>(activeProject.peopleCount);
  const [activeTab, setActiveTab] = useState<'cronograma' | 'ingredientes' | 'conservacion'>('cronograma');
  const [completedTasks, setCompletedTasks] = useState<Record<string, boolean>>({});

  const scaleFactor = servings / (activeProject.peopleCount || 4);

  const toggleTask = (taskId: string) => {
    setCompletedTasks(prev => ({ ...prev, [taskId]: !prev[taskId] }));
  };

  return (
    <div className="w-full bg-background -mx-4 px-4 md:mx-0 md:px-0 text-zinc-900 dark:text-zinc-100">
      {/* Header Bar */}
      <header className="fixed top-0 left-0 w-full z-40 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md shadow-sm border-b border-zinc-200 dark:border-zinc-800">
        <div className="flex items-center px-4 py-3 h-16 max-w-[1140px] mx-auto justify-between">
          <button 
            onClick={() => onNavigate({ name: 'home' })}
            className="p-2 -ml-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors active:scale-95 text-zinc-700 dark:text-zinc-300 flex items-center gap-2 font-medium text-xs cursor-pointer"
          >
            <ArrowLeft size={18} />
            <span className="hidden sm:inline">Volver a Inicio</span>
          </button>
          
          <div className="text-center">
            <h1 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-white truncate">{activeProject.title}</h1>
            <p className="text-xs text-zinc-500 font-medium">{activeProject.dishes.length} recetas en paralelo</p>
          </div>

          <div className="w-8"></div>
        </div>
      </header>

      <div className="pt-20 max-w-4xl mx-auto pb-24 space-y-6">
        {/* Hero Card */}
        <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 sm:p-8 shadow-md border border-zinc-200 dark:border-zinc-800 space-y-4">
          <div className="flex items-center gap-2">
            <span className="bg-[#E07A5F]/15 text-[#E07A5F] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              {activeProject.dietStyle}
            </span>
            <span className="text-xs text-zinc-400 font-mono">
              {activeProject.totalServings} raciones calculadas
            </span>
          </div>

          <h2 className="text-2xl font-black text-zinc-900 dark:text-white">{activeProject.title}</h2>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
            Sesión de batch cooking concurrente optimizada para {activeProject.peopleCount} comensales durante {activeProject.daysCount} días.
          </p>

          {/* Scale Controller */}
          <div className="bg-zinc-50 dark:bg-zinc-800/60 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 border border-zinc-200 dark:border-zinc-700">
            <div className="flex items-center gap-3">
              <Users size={22} className="text-[#E07A5F] shrink-0" />
              <div>
                <span className="text-xs font-bold uppercase tracking-wider block text-zinc-500">Multiplicador de Raciones</span>
                <span className="text-sm font-semibold text-zinc-900 dark:text-white">Calculado para {servings} comensales ({Math.round(activeProject.totalServings * scaleFactor)} raciones totales)</span>
              </div>
            </div>

            <div className="flex items-center gap-2 bg-white dark:bg-zinc-900 p-1.5 rounded-xl border border-zinc-200 dark:border-zinc-800">
              <button 
                onClick={() => setServings(Math.max(1, servings - 1))}
                className="w-8 h-8 rounded-lg bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 text-zinc-800 dark:text-zinc-200 font-bold text-base flex items-center justify-center transition-colors cursor-pointer"
              >
                -
              </button>
              <span className="w-10 text-center font-bold text-sm">{servings} p.</span>
              <button 
                onClick={() => setServings(servings + 1)}
                className="w-8 h-8 rounded-lg btn-hero-copper text-white font-bold text-base flex items-center justify-center transition-colors cursor-pointer"
              >
                +
              </button>
            </div>
          </div>
        </div>

        {/* Prepared Dishes Overview */}
        <div className="space-y-4">
          <h3 className="text-lg font-black text-zinc-900 dark:text-white flex items-center gap-2">
            <Package className="text-[#E07A5F]" size={20} />
            Platos Preparados en esta Sesión
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {activeProject.dishes.map((dish, i) => (
              <div key={dish.id || i} className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden shadow-xs flex flex-col justify-between">
                <div className="h-32 overflow-hidden relative">
                  <img src={dish.image} alt={dish.name} className="w-full h-full object-cover" />
                  <div className="absolute top-2 right-2 bg-stone-950/80 text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded-md backdrop-blur-xs">
                    {dish.cookingMethod}
                  </div>
                </div>
                <div className="p-4 space-y-1">
                  <strong className="text-xs font-black text-zinc-900 dark:text-white block line-clamp-2">{dish.name}</strong>
                  <span className="text-[11px] text-zinc-500 block">{dish.prepTime} · {Math.round(dish.servings * scaleFactor)} raciones</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
