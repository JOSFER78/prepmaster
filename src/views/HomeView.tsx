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
  Check,
  ShieldCheck,
  MapPin,
  Truck,
  FileText,
  Lock,
  Sparkle
} from 'lucide-react';
import { TouChefIsotype } from '../components/TouChefLogo';
import { ViewState, MealPlanConfig, BatchProject, BatchDish, ChefBookingRequest } from '../types';
import { calculateProjectMetrics } from '../lib/batchProjects';
import { MOCK_CHEFS } from '../lib/chefsData';

interface HomeViewProps {
  onNavigate: (view: ViewState) => void;
  mealPlanConfig?: MealPlanConfig | null;
  activeProject: BatchProject | null;
  batchHistory: BatchProject[];
  chefBookings?: ChefBookingRequest[];
  onRepeatBatch: (project: BatchProject) => void;
  onUpdateActiveProjectStatus: (status: BatchProject['status']) => void;
  onRateDish: (dishId: string, rating: number, isFavorite?: boolean) => void;
  onArchiveActiveBatch?: () => void;
  onConsumePortion?: (dishId: string, count?: number) => void;
  onHireChefForBatch?: () => void;
  onRepeatChefBooking?: (booking: ChefBookingRequest) => void;
}

export function HomeView({ 
  onNavigate, 
  mealPlanConfig,
  activeProject,
  batchHistory,
  chefBookings = [],
  onRepeatBatch,
  onUpdateActiveProjectStatus,
  onRateDish,
  onArchiveActiveBatch,
  onConsumePortion,
  onHireChefForBatch,
  onRepeatChefBooking
}: HomeViewProps) {
  const [dualMode, setDualMode] = useState<'self_cook' | 'hire_chef'>('self_cook');
  const [selectedSubTab, setSelectedSubTab] = useState<'active' | 'history' | 'favorites'>('active');

  // Collect favorite dishes
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

  const metrics = activeProject ? calculateProjectMetrics(activeProject) : null;

  const activeChefBooking = chefBookings.find(b => 
    b.status === 'confirmed' || b.status === 'in_progress' || b.status === 'awaiting_grocery' || b.status === 'published'
  );

  return (
    <div className="flex flex-col gap-6 w-full animate-fade-in pb-12 text-zinc-900 dark:text-zinc-100">
      
      {/* ========================================================================= */}
      {/* 1. DUAL MASTER SELECTOR ("O COCINO YO O LO ENCARGO")                     */}
      {/* ========================================================================= */}
      <div className="glass-surface-elevated rounded-3xl p-3 sm:p-4 border border-zinc-200 dark:border-white/10 shadow-lg">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          
          <div className="w-full md:w-auto grid grid-cols-2 gap-2 bg-zinc-100 dark:bg-zinc-900 p-1.5 rounded-2xl border border-zinc-200 dark:border-zinc-800">
            <button
              onClick={() => setDualMode('self_cook')}
              className={`py-2.5 px-4 sm:px-6 rounded-xl font-display font-black text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
                dualMode === 'self_cook'
                  ? 'btn-hero-copper text-white shadow-md'
                  : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
              }`}
            >
              <Flame size={16} />
              <span>1. Cocino Yo</span>
              <span className="text-[10px] opacity-80 font-mono font-normal hidden sm:inline">(Guiado)</span>
            </button>

            <button
              onClick={() => setDualMode('hire_chef')}
              className={`py-2.5 px-4 sm:px-6 rounded-xl font-display font-black text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
                dualMode === 'hire_chef'
                  ? 'bg-amber-500 text-stone-950 shadow-md'
                  : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
              }`}
            >
              <ChefHat size={16} />
              <span>2. Lo Encargo</span>
              <span className="text-[10px] opacity-80 font-mono font-normal hidden sm:inline">(Chef en Casa)</span>
            </button>
          </div>

          {/* Sub-tabs switcher (Histórico y Recetario) */}
          <div className="flex items-center gap-2 text-xs font-bold w-full md:w-auto justify-end">
            <button
              onClick={() => setSelectedSubTab('active')}
              className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                selectedSubTab === 'active'
                  ? 'bg-zinc-200 dark:bg-zinc-800 text-zinc-900 dark:text-white font-black'
                  : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-white'
              }`}
            >
              Sesión Activa
            </button>
            <button
              onClick={() => setSelectedSubTab('history')}
              className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                selectedSubTab === 'history'
                  ? 'bg-zinc-200 dark:bg-zinc-800 text-zinc-900 dark:text-white font-black'
                  : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-white'
              }`}
            >
              Bóveda ({batchHistory.length})
            </button>
            <button
              onClick={() => setSelectedSubTab('favorites')}
              className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1 cursor-pointer ${
                selectedSubTab === 'favorites'
                  ? 'bg-zinc-200 dark:bg-zinc-800 text-rose-500 font-black'
                  : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-white'
              }`}
            >
              <Heart size={12} className="text-rose-500" />
              <span>Favoritos ({favoriteDishes.length})</span>
            </button>
          </div>

        </div>
      </div>

      {/* ACTIVE CHEF BOOKING BANNER IF ANY */}
      {activeChefBooking && (
        <div className="p-5 rounded-3xl bg-gradient-to-r from-amber-500/20 via-amber-950/40 to-stone-900 border-2 border-amber-500/40 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4 animate-fade-in">
          <div className="flex items-center gap-4">
            <img
              src={activeChefBooking.chefAvatar || 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=400&auto=format&fit=crop&q=80'}
              alt={activeChefBooking.chefName}
              className="w-14 h-14 rounded-2xl object-cover border-2 border-amber-500/50 shadow-md shrink-0"
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-wider bg-amber-500 text-stone-950 px-2 py-0.5 rounded-md">
                  Chef Reservado en tu Casa
                </span>
                <span className="text-xs text-amber-300 font-bold flex items-center gap-1">
                  <Calendar size={13} className="text-amber-400" />
                  {activeChefBooking.targetDate} ({activeChefBooking.targetTimeSlot})
                </span>
              </div>
              <h3 className="text-base font-black text-white mt-1">
                {activeChefBooking.chefName} preparará tu lote
              </h3>
              <p className="text-xs text-stone-400 mt-0.5 flex flex-wrap items-center gap-2">
                <span>{activeChefBooking.mealPlanTitle}</span>
                <span>•</span>
                <span>{activeChefBooking.dishes.length} platos ({activeChefBooking.costBreakdown.totalClientPrice} €)</span>
                <span>•</span>
                <span className="text-emerald-400 flex items-center gap-1">
                  <ShieldCheck size={13} /> Fondos en Garantía Escrow
                </span>
              </p>
            </div>
          </div>

          <button
            onClick={() => onNavigate({ name: 'my-bookings' })}
            className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-black text-xs shadow-md transition-all flex items-center gap-1.5 cursor-pointer self-stretch sm:self-auto justify-center"
          >
            <span>Ver Estado en Vivo</span>
            <ArrowRight size={14} />
          </button>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. MODO 1: COCINO YO (BATCH COOKING & TUPPERS EN NEVERA)                  */}
      {/* ========================================================================= */}
      {dualMode === 'self_cook' && selectedSubTab === 'active' && (
        <div className="space-y-6">
          {activeProject ? (
            <div className="glass-surface rounded-3xl border border-zinc-200 dark:border-white/10 p-6 sm:p-8 shadow-md space-y-6">
              
              {/* Header Lote Activo */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-100 dark:border-zinc-800 pb-5">
                <div className="flex items-start sm:items-center gap-3.5">
                  <TouChefIsotype size={44} />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-black uppercase tracking-wider bg-[#E07A5F]/15 text-[#E07A5F] px-2.5 py-0.5 rounded-md">
                        Lote Activo
                      </span>
                      <span className="text-xs font-mono font-bold text-zinc-500">
                        {activeProject.totalServings} raciones · {activeProject.dishes.length} recetas
                      </span>
                    </div>
                    <h2 className="text-xl font-black text-zinc-900 dark:text-white mt-1">
                      {activeProject.title}
                    </h2>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => onNavigate({ name: 'interactive-cook' })}
                    className="px-4 py-2.5 btn-hero-copper text-white font-black text-xs rounded-xl shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <Play size={14} />
                    <span>Cockpit Fuegos Simultáneos</span>
                  </button>

                  <button
                    onClick={() => onNavigate({ name: 'supermarket-checkout' })}
                    className="px-4 py-2.5 bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <Truck size={14} />
                    <span>Cesta DIA</span>
                  </button>

                  {onArchiveActiveBatch && (
                    <button
                      onClick={onArchiveActiveBatch}
                      className="p-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 text-zinc-600 dark:text-zinc-300 text-xs font-bold transition-all cursor-pointer"
                      title="Archivar sesión"
                    >
                      <Archive size={15} />
                    </button>
                  )}
                </div>
              </div>

              {/* Servings Tracker (Tuppers en Nevera vs Congelador) */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 bg-zinc-50 dark:bg-zinc-800 rounded-2xl border border-zinc-200/80 dark:border-zinc-700/60 space-y-1">
                  <span className="text-xs font-bold text-zinc-600 dark:text-zinc-400 flex items-center gap-1">
                    <Refrigerator size={14} className="text-[#52796F] dark:text-[#84A98C]" /> Tuppers en Nevera (Días 1-3)
                  </span>
                  <div className="text-2xl font-black font-mono text-zinc-900 dark:text-white">
                    {Math.ceil((metrics?.remainingServings || activeProject.totalServings) * 0.6)} <span className="text-xs text-zinc-500 dark:text-zinc-400 font-normal">raciones</span>
                  </div>
                </div>

                <div className="p-4 bg-zinc-50 dark:bg-zinc-800 rounded-2xl border border-zinc-200/80 dark:border-zinc-700/60 space-y-1">
                  <span className="text-xs font-bold text-zinc-600 dark:text-zinc-400 flex items-center gap-1">
                    <Snowflake size={14} className="text-indigo-600 dark:text-indigo-400" /> Congelador (Días 4+)
                  </span>
                  <div className="text-2xl font-black font-mono text-zinc-900 dark:text-white">
                    {Math.floor((metrics?.remainingServings || activeProject.totalServings) * 0.4)} <span className="text-xs text-zinc-500 dark:text-zinc-400 font-normal">raciones</span>
                  </div>
                </div>

                <div className="p-4 bg-emerald-500/10 rounded-2xl border border-emerald-500/20 space-y-1 text-emerald-600 dark:text-emerald-400">
                  <span className="text-xs font-bold flex items-center gap-1">
                    <TrendingUp size={14} /> Ahorro Semanal
                  </span>
                  <div className="text-2xl font-black font-mono">
                    +{activeProject.hoursSavedWeekly || 8.5}h <span className="text-xs font-normal opacity-80">de L a V</span>
                  </div>
                </div>
              </div>

              {/* Platos del Lote y Botones de Consumo */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-400">
                  Platos del Lote & Registro de Consumo
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
                  {activeProject.dishes.map(dish => (
                    <div
                      key={dish.id}
                      className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 flex items-center justify-between gap-3"
                    >
                      <div className="min-w-0">
                        <strong className="text-xs font-bold text-zinc-900 dark:text-white block truncate">
                          {dish.name}
                        </strong>
                        <span className="text-[11px] text-zinc-500 dark:text-zinc-400 block truncate">
                          {dish.storageAdvice || 'Nevera 3 días / Congelador'}
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          onClick={() => onConsumePortion && onConsumePortion(dish.id, 1)}
                          disabled={(dish.consumedPortions || 0) >= dish.servings}
                          className="px-2.5 py-1 rounded-xl bg-zinc-200 dark:bg-zinc-700 hover:bg-[#E07A5F] hover:text-white text-zinc-700 dark:text-zinc-200 text-xs font-bold transition-all disabled:opacity-40 cursor-pointer"
                          title="Marcar 1 ración como consumida"
                        >
                          -1 rac
                        </button>
                        <span className="text-xs font-mono font-bold text-zinc-900 dark:text-white">
                          {(dish.servings || 4) - (dish.consumedPortions || 0)}/{dish.servings || 4}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          ) : (
            <div className="p-12 text-center bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-[#E07A5F]/15 text-[#E07A5F] flex items-center justify-center mx-auto">
                <Flame size={32} />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-black text-zinc-900 dark:text-white">
                  No tienes ninguna sesión de cocina activa
                </h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 max-w-md mx-auto">
                  Genera tu plan semanal con IA en 1 clic o encarga a un chef profesional verificado para que cocine en tu casa.
                </p>
              </div>

              <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                <button
                  onClick={() => onNavigate({ name: 'ai-generator' })}
                  className="px-6 py-3 btn-hero-copper text-white font-black text-xs rounded-2xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Sparkles size={16} />
                  <span>Planificar Lote con IA</span>
                </button>
                <button
                  onClick={() => setDualMode('hire_chef')}
                  className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-stone-950 font-black text-xs rounded-2xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
                >
                  <ChefHat size={16} />
                  <span>Contratar Chef en Casa</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. MODO 2: LO ENCARGO (MARKETPLACE DE CHEFS ON-DEMAND)                   */}
      {/* ========================================================================= */}
      {dualMode === 'hire_chef' && (
        <div className="space-y-6">
          <div className="glass-surface rounded-3xl p-6 sm:p-8 border border-amber-500/30 space-y-6">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-100 dark:border-zinc-800 pb-4">
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider bg-amber-500/20 text-amber-600 dark:text-amber-300 px-2.5 py-0.5 rounded-full border border-amber-500/30">
                  Marketplace de Cocineros a Domicilio
                </span>
                <h3 className="font-display font-black text-xl text-zinc-900 dark:text-white mt-1">
                  Resuelve tu Menú Semanal con un Cocinero Profesional
                </h3>
                <p className="text-xs text-zinc-600 dark:text-zinc-400">
                  Lánzalo a la red para recibir propuestas con mensaje o elige manualmente a tu cocinero preferido.
                </p>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-zinc-500 uppercase block">Garantía Escrow</span>
                <strong className="text-emerald-600 dark:text-emerald-400 text-xs font-bold">100% Fondos Protegidos</strong>
              </div>
            </div>

            {/* BROADCAST HERO BANNER */}
            <div className="p-5 rounded-2xl bg-gradient-to-r from-[#E07A5F]/15 via-amber-500/10 to-transparent border border-[#E07A5F]/30 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-md bg-[#E07A5F] text-white text-[10px] font-black uppercase">
                    Modo Recomendado
                  </span>
                  <strong className="text-sm font-bold text-zinc-900 dark:text-white">1. Lanzar Encargo a la Red de Cocineros</strong>
                </div>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 max-w-xl">
                  Publica tu menú a los chefs verificados de tu barrio. Ellos postulan enviándote un mensaje personalizado con su experiencia y tú aceptas al que más te convenza vía chat.
                </p>
              </div>

              <button
                onClick={() => onNavigate({ name: 'create-chef-request', preselectedPlanId: activeProject?.id })}
                className="w-full sm:w-auto px-5 py-3 rounded-2xl bg-[#E07A5F] hover:bg-[#c85a32] text-white font-black text-xs shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 shrink-0 active:scale-95"
              >
                <span>📡 Lanzar a la Red TouChef</span>
              </button>
            </div>

            {/* DIRECT CHEF SELECTION */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-400">
                  2. O Elige Manualmente a tu Cocinero Favorito:
                </h4>
                <button
                  onClick={() => onNavigate({ name: 'chefs' })}
                  className="text-xs font-bold text-[#E07A5F] hover:underline"
                >
                  Ver Directorio Completo →
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {MOCK_CHEFS.map(chef => (
                  <div 
                    key={chef.id}
                    className="p-5 rounded-3xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex flex-col justify-between space-y-4 shadow-xs hover:border-amber-500 transition-all"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <img 
                          src={chef.avatar || 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=400&auto=format&fit=crop&q=80'} 
                          alt={chef.name} 
                          className="w-14 h-14 rounded-2xl object-cover border-2 border-amber-500/40" 
                        />
                        <div>
                          <h4 className="text-sm font-black text-zinc-900 dark:text-white">{chef.name}</h4>
                          <span className="text-xs text-amber-700 dark:text-amber-400 font-bold flex items-center gap-1">
                            <Star size={12} fill="currentColor" /> {chef.rating} ({chef.completedBookingsCount || 0} sesiones)
                          </span>
                          <span className="text-[10px] text-zinc-400 block">
                            {chef.locationCity} • {chef.zones?.[0] || 'Toda la ciudad'}
                          </span>
                        </div>
                      </div>

                      <p className="text-xs text-zinc-600 dark:text-zinc-400 line-clamp-2">
                        {chef.bio}
                      </p>

                      <div className="p-3 bg-white dark:bg-zinc-800/60 rounded-2xl border border-zinc-200 dark:border-zinc-700/60 space-y-1 text-xs">
                        <div className="flex justify-between text-zinc-600 dark:text-zinc-400">
                          <span>Tarifa Cocinado:</span>
                          <span className="font-mono text-zinc-900 dark:text-white font-bold">{chef.pricing.cookingHourRate} €/h</span>
                        </div>
                        <div className="flex justify-between text-zinc-600 dark:text-zinc-400">
                          <span>Compra coordinada DIA:</span>
                          <span className="font-mono text-zinc-900 dark:text-white font-bold">{chef.pricing.groceryShoppingHourRate} €/h</span>
                        </div>
                        <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-bold">
                          <span>Limpieza de cocina:</span>
                          <span>Incluida</span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => onNavigate({ name: 'create-chef-request', preselectedPlanId: activeProject?.id, chefId: chef.id })}
                      className="w-full py-3 rounded-2xl bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-white font-bold text-xs shadow-xs transition-all cursor-pointer flex items-center justify-center gap-1.5 active:scale-95"
                    >
                      <ChefHat size={15} />
                      <span>Elegir a {chef.name.split(' ')[0]}</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 4. SUB-TAB: BÓVEDA DE HISTORIAL                                          */}
      {/* ========================================================================= */}
      {selectedSubTab === 'history' && (
        <div className="glass-surface rounded-3xl p-6 border border-zinc-200 dark:border-white/10 space-y-4">
          <h3 className="text-base font-black text-zinc-900 dark:text-white">
            Bóveda de Lotes Archivados ({batchHistory.length})
          </h3>

          {batchHistory.length > 0 ? (
            <div className="space-y-3">
              {batchHistory.map(hist => (
                <div key={hist.id} className="p-4 bg-zinc-50 dark:bg-zinc-850 rounded-2xl border border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
                  <div>
                    <strong className="text-xs font-bold text-white block">{hist.title}</strong>
                    <span className="text-[11px] text-zinc-400">{hist.totalServings} raciones · {hist.plannedShoppingDate}</span>
                  </div>
                  <button
                    onClick={() => onRepeatBatch(hist)}
                    className="px-3.5 py-1.5 rounded-xl bg-copper-500 hover:bg-copper-400 text-white font-bold text-xs transition-all"
                  >
                    Repetir Lote
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-zinc-400">No hay lotes en el historial aún.</p>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* 5. SUB-TAB: RECETARIO FAVORITOS                                          */}
      {/* ========================================================================= */}
      {selectedSubTab === 'favorites' && (
        <div className="glass-surface rounded-3xl p-6 border border-zinc-200 dark:border-white/10 space-y-4">
          <h3 className="text-base font-black text-zinc-900 dark:text-white flex items-center gap-2">
            <Heart size={16} className="text-rose-500" />
            <span>Recetario Maestro Favorito ({favoriteDishes.length})</span>
          </h3>

          {favoriteDishes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
              {favoriteDishes.map((fav, i) => (
                <div key={i} className="p-4 bg-zinc-50 dark:bg-zinc-850 rounded-2xl border border-zinc-200 dark:border-zinc-800 space-y-2">
                  <strong className="text-xs font-bold text-white block">{fav.name}</strong>
                  <p className="text-[11px] text-zinc-400">{fav.description}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-zinc-400">Marca tus platos favoritos con corazón para verlos aquí.</p>
          )}
        </div>
      )}

    </div>
  );
}
