import React, { useState } from 'react';
import { 
  Sparkles, 
  Clock, 
  ShoppingBag, 
  ChefHat, 
  Users, 
  Flame, 
  ArrowRight, 
  CheckCircle2, 
  Calendar, 
  RotateCcw,
  Star,
  Heart,
  Layers,
  Refrigerator,
  Plus,
  Play,
  Archive,
  AlertCircle,
  Utensils,
  Snowflake,
  TrendingUp,
  Check
} from 'lucide-react';
import { TouChefIsotype } from '../components/TouChefLogo';
import { ViewState, SimulatorContext, BatchProject, BatchDish } from '../types';
import { calculateProjectMetrics } from '../lib/batchProjects';

interface HomeViewProps {
  onNavigate: (view: ViewState) => void;
  simulatorContext?: SimulatorContext | null;
  activeProject: BatchProject | null;
  batchHistory: BatchProject[];
  onRepeatBatch: (project: BatchProject) => void;
  onUpdateActiveProjectStatus: (status: BatchProject['status']) => void;
  onRateDish: (dishId: string, rating: number, isFavorite?: boolean) => void;
  onArchiveActiveBatch?: () => void;
  onConsumePortion?: (dishId: string, count?: number) => void;
}

export function HomeView({ 
  onNavigate, 
  simulatorContext,
  activeProject,
  batchHistory,
  onRepeatBatch,
  onUpdateActiveProjectStatus,
  onRateDish,
  onArchiveActiveBatch,
  onConsumePortion
}: HomeViewProps) {
  const [selectedTab, setSelectedTab] = useState<'today' | 'history' | 'favorites'>('today');

  // Collect favorite dishes across active and historical batches
  const favoriteDishes: BatchDish[] = [];
  const dishMap = new Map<string, BatchDish>();

  [...(activeProject ? [activeProject] : []), ...batchHistory].forEach(proj => {
    proj.dishes.forEach(d => {
      if ((d.isFavorite || (d.rating && d.rating >= 4)) && !dishMap.has(d.name)) {
        dishMap.set(d.name, d);
        favoriteDishes.push(d);
      }
    });
  });

  // Calculate live metrics for active project
  const metrics = activeProject ? calculateProjectMetrics(activeProject) : null;

  return (
    <div className="flex flex-col gap-5 w-full animate-fade-in pb-12 text-zinc-900 dark:text-zinc-100 max-w-5xl mx-auto">
      
      {/* NAVIGATION TABS: HOY / HISTÓRICO / FAVORITOS */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-200 dark:border-zinc-800 pb-3">
        <div className="flex items-center gap-1.5 sm:gap-2">
          <button
            onClick={() => setSelectedTab('today')}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
              selectedTab === 'today'
                ? 'btn-hero-copper shadow-xs'
                : 'glass-surface text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
            }`}
          >
            Hoy / Sesión Activa
          </button>

          <button
            onClick={() => setSelectedTab('history')}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
              selectedTab === 'history'
                ? 'btn-hero-copper shadow-xs'
                : 'glass-surface text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
            }`}
          >
            Bóveda de Sesiones ({batchHistory.length})
          </button>

          <button
            onClick={() => setSelectedTab('favorites')}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 cursor-pointer ${
              selectedTab === 'favorites'
                ? 'btn-hero-copper shadow-xs'
                : 'glass-surface text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
            }`}
          >
            <Heart size={13} className="text-rose-500" />
            <span>Recetario Maestro ({favoriteDishes.length})</span>
          </button>
        </div>

        <button
          onClick={() => onNavigate({ name: 'ai-generator' })}
          className="btn-hero-copper text-white font-bold text-xs px-4 py-2 rounded-xl shadow-xs transition-all flex items-center gap-1.5 active:scale-95 cursor-pointer"
        >
          <Plus size={14} />
          <span>Planificar Sesión</span>
        </button>
      </div>

      {/* TAB 1: HOY / ESTADO DEL LOTE ACTIVO */}
      {selectedTab === 'today' && (
        <div className="space-y-5">
          {activeProject ? (
            <div className="glass-surface-elevated rounded-3xl border border-zinc-200 dark:border-white/10 p-5 sm:p-7 shadow-xs space-y-6">
              
              {/* Header & Main Actions */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-100 dark:border-zinc-800 pb-5">
                <div className="flex items-start sm:items-center gap-3.5">
                  <TouChefIsotype size={44} />
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="bg-[#E07A5F]/15 text-[#E07A5F] text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider border border-[#E07A5F]/25">
                        {activeProject.status === 'planning' && '1. Fase de Planificación'}
                        {activeProject.status === 'shopping' && '2. Cesta de Compra Optimizada'}
                        {activeProject.status === 'ready_to_cook' && '3. Listo para Cocinar'}
                        {activeProject.status === 'cooking' && '3. Orquestación Térmica Activa'}
                        {activeProject.status === 'in_fridge' && '4. En Frío & Consumo'}
                        {activeProject.status === 'archived' && '5. Sesión Archivada'}
                      </span>
                      <span className="text-xs text-zinc-500 dark:text-zinc-400 font-semibold flex items-center gap-1">
                        <Users size={13} /> {activeProject.peopleCount} comensales • {activeProject.daysCount} días • {activeProject.totalServings} raciones
                      </span>
                    </div>
                    <h2 className="text-lg sm:text-xl font-display font-black text-zinc-900 dark:text-white mt-1">
                      {activeProject.title}
                    </h2>
                  </div>
                </div>

                {/* Primary Action Button based on status */}
                <div className="flex items-center gap-2">
                  {activeProject.status === 'shopping' && (
                    <button
                      onClick={() => onNavigate({ name: 'shopping-list' })}
                      className="btn-hero-copper text-white font-bold text-xs px-5 py-3 rounded-2xl shadow-xs transition-all flex items-center gap-2 active:scale-95 cursor-pointer"
                    >
                      <ShoppingBag size={15} />
                      <span>Ir a la Compra ({metrics?.boughtShopItems}/{metrics?.totalShopItems})</span>
                      <ArrowRight size={14} />
                    </button>
                  )}

                  {activeProject.status === 'ready_to_cook' && (
                    <button
                      onClick={() => onNavigate({ name: 'interactive-cook' })}
                      className="btn-hero-copper text-white font-bold text-xs px-5 py-3 rounded-2xl shadow-xs transition-all flex items-center gap-2 active:scale-95 cursor-pointer animate-pulse"
                    >
                      <Play size={15} />
                      <span>Comenzar Cocinado Simultáneo</span>
                      <ArrowRight size={14} />
                    </button>
                  )}

                  {activeProject.status === 'cooking' && (
                    <button
                      onClick={() => onNavigate({ name: 'interactive-cook' })}
                      className="btn-hero-copper text-white font-bold text-xs px-5 py-3 rounded-2xl shadow-xs transition-all flex items-center gap-2 active:scale-95 cursor-pointer"
                    >
                      <Flame size={15} />
                      <span>Continuar Cocinado en Vivo</span>
                      <ArrowRight size={14} />
                    </button>
                  )}

                  {activeProject.status === 'in_fridge' && (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onUpdateActiveProjectStatus('archived')}
                        className="glass-surface text-zinc-800 dark:text-zinc-200 font-bold text-xs px-4 py-3 rounded-2xl transition-colors flex items-center gap-1.5 cursor-pointer"
                      >
                        <Archive size={14} />
                        <span>Archivar Sesión</span>
                      </button>

                      <button
                        onClick={() => onNavigate({ name: 'ai-generator' })}
                        className="btn-hero-copper text-white font-bold text-xs px-5 py-3 rounded-2xl shadow-xs transition-all flex items-center gap-2 active:scale-95 cursor-pointer"
                      >
                        <Sparkles size={15} />
                        <span>Planificar Siguiente</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Lifecycle Progress Bar */}
              <div className="space-y-2">
                <div className="text-xs font-bold text-zinc-500 flex justify-between">
                  <span>Progreso del Ciclo de Vida:</span>
                  <span className="text-[#E07A5F] dark:text-[#F4A261] font-semibold">
                    {activeProject.status === 'planning' && 'Configurando platos y fuegos'}
                    {activeProject.status === 'shopping' && `Lista de compra (${metrics?.boughtShopItems}/${metrics?.totalShopItems} adquiridos)`}
                    {activeProject.status === 'ready_to_cook' && 'Compra lista • Preparado para cocina simultánea'}
                    {activeProject.status === 'cooking' && 'Sesión en marcha con temporizadores activos'}
                    {activeProject.status === 'in_fridge' && `En consumo: ${metrics?.remainingServings} raciones disponibles`}
                  </span>
                </div>

                <div className="grid grid-cols-4 gap-2">
                  {[
                    { step: 1, label: '1. Planificado', done: true },
                    { step: 2, label: '2. Compra', done: activeProject.status !== 'planning' && (activeProject.status === 'ready_to_cook' || activeProject.status === 'cooking' || activeProject.status === 'in_fridge' || metrics?.shoppingProgressPercent === 100), current: activeProject.status === 'shopping' },
                    { step: 3, label: '3. Cocinado', done: activeProject.status === 'in_fridge', current: activeProject.status === 'ready_to_cook' || activeProject.status === 'cooking' },
                    { step: 4, label: '4. En Nevera', done: activeProject.status === 'in_fridge', current: activeProject.status === 'in_fridge' }
                  ].map((phase, idx) => (
                    <div 
                      key={idx}
                      className={`p-2.5 rounded-xl border text-center transition-all ${
                        phase.done 
                          ? 'bg-[#E07A5F]/10 border-[#E07A5F]/40 text-[#E07A5F] dark:text-[#F4A261] font-bold' 
                          : phase.current
                            ? 'bg-[#E07A5F] text-white border-[#E07A5F] font-black shadow-xs'
                            : 'bg-zinc-50 dark:bg-zinc-800/40 border-zinc-200 dark:border-zinc-800 text-zinc-400 font-medium'
                      }`}
                    >
                      <div className="text-[10px] uppercase tracking-wider">{phase.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* SPECIAL WIDGET: SEGUIMIENTO DE CONSUMO EN NEVERA (SI STATUS === 'in_fridge') */}
              {activeProject.status === 'in_fridge' && (
                <div className="p-4 sm:p-5 bg-[#E07A5F]/10 border border-[#E07A5F]/30 rounded-3xl space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-[#E07A5F]/20 text-[#F4A261] flex items-center justify-center font-bold">
                        <Refrigerator size={18} />
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-zinc-900 dark:text-white">
                          Seguimiento de Raciones en Nevera & Congelador
                        </h3>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400">
                          Registra lo que vas comiendo día a día para mantener el control de stock
                        </p>
                      </div>
                    </div>

                    {/* Progress Badge */}
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <span className="text-[10px] text-zinc-400 uppercase font-bold block">Consumidas</span>
                        <span className="text-sm font-black text-[#F4A261]">
                          {metrics?.totalConsumed} / {metrics?.totalPlanned} raciones
                        </span>
                      </div>
                      <div className="w-16 h-2 bg-zinc-800 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-[#E07A5F] rounded-full transition-all duration-500" 
                          style={{ width: `${metrics?.progressPercent}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Cold Chain Smart Tip */}
                  <div className="p-3 bg-zinc-900/60 rounded-2xl border border-[#E07A5F]/20 text-xs text-zinc-300 flex items-center gap-2.5">
                    <Snowflake size={16} className="text-cyan-400 shrink-0" />
                    <span>
                      <strong>Protocolo de Frío:</strong> Consume primero las raciones de nevera (días 1 a 3). Las raciones de congelador pásalas a la nevera 24 horas antes de comerlas.
                    </span>
                  </div>
                </div>
              )}

              {/* Active Batch Dishes Grid with Portion Controls */}
              <div className="space-y-3 pt-2">
                <div className="flex justify-between items-center">
                  <h3 className="text-xs font-bold text-zinc-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                    <Flame size={14} className="text-[#E07A5F] dark:text-[#F4A261]" />
                    Platos del Lote Activo ({activeProject.dishes.length}):
                  </h3>
                  <span className="text-[11px] text-zinc-500">
                    Tiempo estimado: <strong>{activeProject.totalCookingTime || '1h 45m'}</strong>
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {activeProject.dishes.map((dish) => {
                    const fridgeLeft = dish.fridgePortions ?? Math.max(0, dish.servings - (dish.consumedPortions ?? 0));
                    const freezerLeft = dish.freezerPortions ?? 0;
                    const consumed = dish.consumedPortions ?? 0;
                    const isFullyConsumed = fridgeLeft === 0 && freezerLeft === 0;

                    return (
                      <div 
                        key={dish.id}
                        className={`rounded-2xl border p-4 flex flex-col justify-between gap-3 transition-all ${
                          isFullyConsumed 
                            ? 'bg-zinc-100 dark:bg-zinc-900/40 border-zinc-200 dark:border-zinc-800 opacity-60' 
                            : 'bg-zinc-50 dark:bg-zinc-800/60 border-zinc-200 dark:border-zinc-700/80 shadow-xs'
                        }`}
                      >
                        <div>
                          <div className="flex items-start justify-between gap-1.5">
                            <span className="text-[9px] font-bold bg-[#E07A5F]/10 text-[#E07A5F] dark:text-[#F4A261] px-2 py-0.5 rounded uppercase">
                              {dish.category}
                            </span>
                            <button
                              onClick={() => onRateDish(dish.id, dish.rating || 5, !dish.isFavorite)}
                              className={`p-1 rounded-lg transition-colors ${dish.isFavorite ? 'text-rose-500' : 'text-zinc-400 hover:text-rose-400'}`}
                              title="Marcar como favorito"
                            >
                              <Heart size={16} fill={dish.isFavorite ? 'currentColor' : 'none'} />
                            </button>
                          </div>
                          
                          <h4 className="text-xs sm:text-sm font-bold text-zinc-900 dark:text-white mt-1.5 leading-snug">
                            {dish.name}
                          </h4>
                        </div>

                        {/* Portions & Shelf Life Details */}
                        <div className="space-y-2 pt-2 border-t border-zinc-200/60 dark:border-zinc-700/60 text-xs">
                          <div className="flex justify-between items-center text-[11px] text-zinc-500 dark:text-zinc-400">
                            <span className="flex items-center gap-1">
                              <Refrigerator size={12} className="text-[#E07A5F]" /> Nevera: <strong>{fridgeLeft}</strong>
                            </span>
                            {freezerLeft > 0 && (
                              <span className="flex items-center gap-1">
                                <Snowflake size={12} className="text-cyan-400" /> Congelador: <strong>{freezerLeft}</strong>
                              </span>
                            )}
                            <span className="text-zinc-400">
                              Comidas: <strong>{consumed}</strong>
                            </span>
                          </div>

                          {/* Quick Consumption Buttons (when in_fridge) */}
                          {activeProject.status === 'in_fridge' && (
                            <div className="flex items-center gap-1.5 pt-1">
                              <button
                                onClick={() => onConsumePortion && onConsumePortion(dish.id, 1)}
                                disabled={isFullyConsumed}
                                className="flex-1 py-1.5 px-2 bg-[#E07A5F]/15 hover:bg-[#E07A5F] text-[#E07A5F] dark:text-[#F4A261] hover:text-white rounded-xl text-[10px] font-bold transition-all disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center gap-1"
                              >
                                <Utensils size={11} />
                                <span>-1 Ración</span>
                              </button>

                              <button
                                onClick={() => onConsumePortion && onConsumePortion(dish.id, activeProject.peopleCount)}
                                disabled={isFullyConsumed}
                                className="flex-1 py-1.5 px-2 bg-zinc-200 dark:bg-zinc-700 hover:bg-[#E07A5F] text-zinc-800 dark:text-zinc-200 hover:text-white rounded-xl text-[10px] font-bold transition-all disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center gap-1"
                              >
                                <Users size={11} />
                                <span>Toma Familiar (-{activeProject.peopleCount})</span>
                              </button>
                            </div>
                          )}

                          {/* Rating Stars */}
                          <div className="flex items-center justify-between pt-1">
                            <span className="text-[10px] text-zinc-400">Valoración:</span>
                            <div className="flex items-center gap-1">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                  key={star}
                                  onClick={() => onRateDish(dish.id, star, dish.isFavorite)}
                                  className={`p-0.5 ${(dish.rating || 0) >= star ? 'text-amber-400' : 'text-zinc-300 dark:text-zinc-600'}`}
                                >
                                  <Star size={13} fill={(dish.rating || 0) >= star ? 'currentColor' : 'none'} />
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>

                      </div>
                    );
                  })}
                </div>
              </div>

            </div>
          ) : (
            /* CLEAN EMPTY STATE: NO ACTIVE BATCH */
            <div className="glass-surface-elevated rounded-3xl border border-zinc-200 dark:border-white/10 p-8 sm:p-12 text-center space-y-5 shadow-xs">
              <div className="flex justify-center">
                <TouChefIsotype size={56} />
              </div>
              <div className="max-w-md mx-auto space-y-2">
                <h3 className="text-lg font-display font-black text-zinc-900 dark:text-white">
                  No tienes ninguna sesión activa en curso
                </h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                  Planifica una sesión de cocina inteligente para preparar todas tus comidas de la semana en 90 minutos con fuegos simultáneos.
                </p>
              </div>

              <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                <button
                  onClick={() => onNavigate({ name: 'ai-generator' })}
                  className="btn-hero-copper font-bold text-xs px-6 py-3.5 rounded-2xl shadow-sm transition-all flex items-center gap-2 active:scale-95 cursor-pointer"
                >
                  <Sparkles size={16} />
                  <span>Planificar Sesión Inteligente</span>
                </button>

                {batchHistory.length > 0 && (
                  <button
                    onClick={() => setSelectedTab('history')}
                    className="glass-surface text-zinc-700 dark:text-zinc-300 font-bold text-xs px-5 py-3.5 rounded-2xl hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-all cursor-pointer"
                  >
                    Ver Bóveda de Sesiones
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: HISTÓRICO DE LOTES */}
      {selectedTab === 'history' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500">
              Lotes Anteriores y Cocinados Realizados ({batchHistory.length})
            </h3>
          </div>

          {batchHistory.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {batchHistory.map((batch) => (
                <div 
                  key={batch.id}
                  className="bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 p-5 shadow-xs flex flex-col justify-between gap-4"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[10px] font-bold text-[#E07A5F] dark:text-[#F4A261] uppercase bg-[#E07A5F]/10 px-2 py-0.5 rounded-full">
                        {batch.daysCount} días • {batch.totalServings} raciones
                      </span>
                      <span className="text-[11px] text-zinc-400">
                        {new Date(batch.createdAt).toLocaleDateString('es-ES')}
                      </span>
                    </div>

                    <h4 className="text-base font-black text-zinc-900 dark:text-white">
                      {batch.title}
                    </h4>

                    <div className="text-xs text-zinc-500 space-y-1">
                      {batch.dishes.map((d, i) => (
                        <div key={i} className="flex justify-between items-center">
                          <span className="truncate max-w-[220px]">• {d.name}</span>
                          <span className="text-[10px] font-mono">{d.servings}r</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
                    <div className="flex items-center gap-1 text-amber-400">
                      <Star size={13} fill="currentColor" />
                      <span className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                        {batch.overallRating || 5}.0
                      </span>
                    </div>

                    <button
                      onClick={() => onRepeatBatch(batch)}
                      className="bg-[#E07A5F]/15 hover:bg-[#E07A5F] text-[#E07A5F] dark:text-[#F4A261] hover:text-white font-bold text-xs px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 active:scale-95"
                    >
                      <RotateCcw size={13} />
                      <span>Repetir este Lote</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 space-y-3">
              <p className="text-xs text-zinc-400">No hay lotes históricos archivados todavía.</p>
              <button
                onClick={() => onNavigate({ name: 'ai-generator' })}
                className="bg-[#E07A5F] text-white font-bold text-xs px-4 py-2 rounded-xl"
              >
                Crear Primer Lote
              </button>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: PLATOS FAVORITOS */}
      {selectedTab === 'favorites' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500">
              Catálogo de Platos con Máxima Puntuación ({favoriteDishes.length})
            </h3>
          </div>

          {favoriteDishes.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5">
              {favoriteDishes.map((dish, idx) => (
                <div 
                  key={idx}
                  className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-4 space-y-2 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] font-bold uppercase bg-[#E07A5F]/10 text-[#E07A5F] dark:text-[#F4A261] px-2 py-0.5 rounded">
                        {dish.category}
                      </span>
                      <Heart size={14} className="text-rose-500" fill="currentColor" />
                    </div>
                    <h4 className="text-xs font-bold text-zinc-900 dark:text-white mt-1">
                      {dish.name}
                    </h4>
                  </div>

                  <div className="text-[10px] text-zinc-500 pt-2 border-t border-zinc-100 dark:border-zinc-800 flex justify-between items-center">
                    <span>{dish.storageAdvice}</span>
                    <div className="flex items-center gap-0.5 text-amber-400">
                      <Star size={11} fill="currentColor" />
                      <span className="font-bold">{dish.rating || 5}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 space-y-2">
              <p className="text-xs text-zinc-400">Aún no has marcado platos con 5 estrellas o favoritos.</p>
            </div>
          )}
        </div>
      )}

    </div>
  );
}
