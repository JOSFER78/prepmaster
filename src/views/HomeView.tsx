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
  Sparkle,
  Radio
} from 'lucide-react';
import { TouChefIsotype } from '../components/TouChefLogo';
import { ViewState, MealPlanConfig, BatchProject, BatchDish, ChefBookingRequest } from '../types';
import { calculateProjectMetrics } from '../lib/batchProjects';
import { APPROVED_CHEFS } from '../lib/chefsData';
import { FavoritesUnifiedHub } from '../components/FavoritesUnifiedHub';

interface HomeViewProps {
  onNavigate: (view: ViewState) => void;
  mealPlanConfig?: MealPlanConfig | null;
  activeProject: BatchProject | null;
  batchHistory: BatchProject[];
  favoriteBatches?: BatchProject[];
  favoriteDishes?: BatchDish[];
  chefBookings?: ChefBookingRequest[];
  onRepeatBatch: (project: BatchProject) => void;
  onUpdateActiveProjectStatus: (status: BatchProject['status']) => void;
  onRateDish: (dishId: string, rating: number, isFavorite?: boolean) => void;
  onArchiveActiveBatch?: () => void;
  onConsumePortion?: (dishId: string, count?: number) => void;
  onHireChefForBatch?: () => void;
  onRepeatChefBooking?: (booking: ChefBookingRequest) => void;
  onLaunchBatchToChefNetwork?: (batch: BatchProject) => void;
  onActivateBatchForCooking?: (batch: BatchProject) => void;
  onUpdateFavoriteBatches?: (batches: BatchProject[]) => void;
  onUpdateFavoriteDishes?: (dishes: BatchDish[]) => void;
}

export function HomeView({ 
  onNavigate, 
  mealPlanConfig,
  activeProject,
  batchHistory,
  favoriteBatches = [],
  favoriteDishes = [],
  chefBookings = [],
  onRepeatBatch,
  onUpdateActiveProjectStatus,
  onRateDish,
  onArchiveActiveBatch,
  onConsumePortion,
  onHireChefForBatch,
  onRepeatChefBooking,
  onLaunchBatchToChefNetwork,
  onActivateBatchForCooking,
  onUpdateFavoriteBatches,
  onUpdateFavoriteDishes
}: HomeViewProps) {
  const [dualMode, setDualMode] = useState<'self_cook' | 'hire_chef'>('self_cook');
  const [selectedSubTab, setSelectedSubTab] = useState<'active' | 'favorites'>('active');

  const metrics = activeProject ? calculateProjectMetrics(activeProject) : null;

  const activeChefBooking = chefBookings.find(b => 
    b.status === 'confirmed' || b.status === 'in_progress' || b.status === 'awaiting_grocery' || b.status === 'published'
  );

  const totalFavoritesCount = favoriteBatches.length + favoriteDishes.length;

  return (
    <div className="flex flex-col gap-6 w-full animate-fade-in pb-12 text-zinc-900 dark:text-zinc-100">
      
      {/* ========================================================================= */}
      {/* 1. DUAL MASTER SELECTOR ("O COCINO YO O LO ENCARGO")                     */}
      {/* ========================================================================= */}
      <div className="glass-surface-elevated rounded-3xl p-3 sm:p-4 border border-zinc-200 dark:border-white/10 shadow-lg">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          
          <div className="w-full md:w-auto grid grid-cols-2 gap-2 bg-zinc-100 dark:bg-zinc-900 p-1.5 rounded-2xl border border-zinc-200 dark:border-zinc-800">
            <button
              onClick={() => {
                setDualMode('self_cook');
                setSelectedSubTab('active');
              }}
              className={`py-2.5 px-4 sm:px-6 rounded-xl font-display font-black text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
                dualMode === 'self_cook' && selectedSubTab === 'active'
                  ? 'btn-hero-copper text-white shadow-md'
                  : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
              }`}
            >
              <Flame size={16} />
              <span>1. Cocino Yo</span>
              <span className="text-[10px] opacity-80 font-mono font-normal hidden sm:inline">(Guiado)</span>
            </button>

            <button
              onClick={() => {
                setDualMode('hire_chef');
                setSelectedSubTab('active');
              }}
              className={`py-2.5 px-4 sm:px-6 rounded-xl font-display font-black text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
                dualMode === 'hire_chef' && selectedSubTab === 'active'
                  ? 'bg-amber-500 text-stone-950 shadow-md font-black'
                  : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
              }`}
            >
              <ChefHat size={16} />
              <span>2. Lo Encargo</span>
              <span className="text-[10px] opacity-80 font-mono font-normal hidden sm:inline">(Chef en Casa)</span>
            </button>
          </div>

          {/* Sub-tabs switcher: Sesión Activa vs Favoritos & Bóveda */}
          <div className="flex items-center gap-2 text-xs font-bold w-full md:w-auto justify-end">
            <button
              onClick={() => setSelectedSubTab('active')}
              className={`px-3.5 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
                selectedSubTab === 'active'
                  ? 'bg-zinc-200 dark:bg-zinc-800 text-zinc-900 dark:text-white font-black shadow-xs'
                  : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-white'
              }`}
            >
              <Flame size={14} className="text-[#E07A5F]" />
              <span>Sesión Activa</span>
            </button>

            <button
              onClick={() => setSelectedSubTab('favorites')}
              className={`px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer ${
                selectedSubTab === 'favorites'
                  ? 'btn-hero-copper text-white font-black shadow-xs'
                  : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-white'
              }`}
            >
              <Star size={14} className={selectedSubTab === 'favorites' ? 'fill-white text-white' : 'text-amber-500 fill-amber-500'} />
              <span>Favoritos &amp; Bóveda ({totalFavoritesCount})</span>
            </button>
          </div>

        </div>
      </div>

      {/* ACTIVE CHEF BOOKING BANNER IF ANY */}
      {activeChefBooking && selectedSubTab === 'active' && (
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
                  <ShieldCheck size={12} /> Fondos en Garantía Escrow
                </span>
              </p>
            </div>
          </div>

          <button
            onClick={() => onNavigate({ name: 'my-bookings' })}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-black text-xs transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <span>Ver Estado en Vivo</span>
            <ArrowRight size={14} />
          </button>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. SUB-TAB: FAVORITOS & BÓVEDA UNIFICADA                                   */}
      {/* ========================================================================= */}
      {selectedSubTab === 'favorites' && (
        <FavoritesUnifiedHub
          favoriteBatches={favoriteBatches}
          favoriteDishes={favoriteDishes}
          onNavigate={onNavigate}
          onActivateBatchForCooking={(batch) => {
            if (onActivateBatchForCooking) {
              onActivateBatchForCooking(batch);
            } else {
              onRepeatBatch(batch);
              setSelectedSubTab('active');
            }
          }}
          onLaunchBatchToChefNetwork={(batch) => {
            if (onLaunchBatchToChefNetwork) {
              onLaunchBatchToChefNetwork(batch);
            } else {
              onNavigate({ name: 'create-chef-request', preselectedPlanId: batch.id });
            }
          }}
          onUpdateFavoriteBatches={onUpdateFavoriteBatches || (() => {})}
          onUpdateFavoriteDishes={onUpdateFavoriteDishes || (() => {})}
        />
      )}

      {/* ========================================================================= */}
      {/* 3. SUB-TAB: SESIÓN ACTIVA - MODO 1 (COCINO YO)                            */}
      {/* ========================================================================= */}
      {selectedSubTab === 'active' && dualMode === 'self_cook' && (
        <div className="space-y-6">
          {activeProject ? (
            <div className="space-y-6">
              {/* CURRENT ACTIVE BATCH COCKPIT CARD */}
              <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 p-6 sm:p-8 shadow-xs space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-100 dark:border-zinc-800">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-black uppercase tracking-wider text-[#E07A5F] bg-[#E07A5F]/10 px-2.5 py-0.5 rounded-full border border-[#E07A5F]/20">
                        Sesión Activa
                      </span>
                      <span className="text-xs text-zinc-500 dark:text-zinc-400">
                        {activeProject.totalServings} raciones planificadas
                      </span>
                    </div>
                    <h2 className="text-xl sm:text-2xl font-black text-zinc-900 dark:text-white mt-1">
                      {activeProject.title}
                    </h2>
                  </div>

                  <div className="flex items-center gap-2 self-start sm:self-center">
                    <button
                      onClick={() => onNavigate({ name: 'batch-session' })}
                      className="btn-hero-copper text-white text-xs font-black px-4 py-2.5 rounded-xl shadow-xs transition-all flex items-center gap-1.5 active:scale-95 cursor-pointer"
                    >
                      <Play size={14} fill="currentColor" />
                      <span>Cocinar Paso a Paso</span>
                    </button>

                    <button
                      onClick={() => onNavigate({ name: 'create-chef-request', preselectedPlanId: activeProject.id })}
                      className="px-4 py-2.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/30 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <ChefHat size={14} className="text-amber-500" />
                      <span>Encargar a Chef</span>
                    </button>
                  </div>
                </div>

                {/* DISHES LIST */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {activeProject.dishes.map((dish, idx) => (
                    <div
                      key={dish.id || idx}
                      className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200/80 dark:border-zinc-700/60 space-y-2 flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-1">
                          <span className="text-[10px] font-black uppercase text-[#E07A5F]">
                            {dish.cookingMethod}
                          </span>
                          <span className="text-xs font-mono font-bold text-zinc-700 dark:text-zinc-300">
                            {dish.servings} rac
                          </span>
                        </div>
                        <strong className="text-xs font-bold text-zinc-900 dark:text-white block mt-1 leading-snug">
                          {dish.name}
                        </strong>
                      </div>

                      <div className="pt-2 border-t border-zinc-200/40 dark:border-zinc-700/40 flex items-center justify-between text-[11px] text-zinc-500">
                        <span>{dish.prepTime}</span>
                        {onConsumePortion && (
                          <button
                            onClick={() => onConsumePortion(dish.id, 1)}
                            className="px-2 py-0.5 rounded-md bg-zinc-200 dark:bg-zinc-700 text-zinc-800 dark:text-zinc-200 font-bold hover:bg-[#E07A5F] hover:text-white transition-colors cursor-pointer text-[10px]"
                          >
                            Consumir 1 rac
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white dark:bg-zinc-900 rounded-3xl p-12 text-center border border-zinc-200 dark:border-zinc-800 space-y-4">
              <div className="w-16 h-16 rounded-3xl bg-[#E07A5F]/10 text-[#E07A5F] flex items-center justify-center mx-auto">
                <Flame size={32} />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-black text-zinc-900 dark:text-white">No tienes ninguna sesión de cocina activa</h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 max-w-md mx-auto">
                  Genera tu plan semanal con IA en 1 clic o elige uno de tus lotes favoritos guardados para empezar a cocinar o encargarlo a un chef.
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <button
                  onClick={() => onNavigate({ name: 'ai-generator' })}
                  className="btn-hero-copper text-white text-xs font-black px-5 py-2.5 rounded-xl shadow-xs transition-all flex items-center gap-2 cursor-pointer hover:scale-[1.02]"
                >
                  <Sparkles size={14} />
                  <span>Crear Plan de Batch Cooking con IA</span>
                </button>

                <button
                  onClick={() => setSelectedSubTab('favorites')}
                  className="px-5 py-2.5 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 text-amber-700 dark:text-amber-300 border border-amber-500/30 text-xs font-bold transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Star size={14} className="fill-amber-500 text-amber-500" />
                  <span>Ver Lotes Favoritos Guardados</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* 4. SUB-TAB: SESIÓN ACTIVA - MODO 2 (LO ENCARGO)                           */}
      {/* ========================================================================= */}
      {selectedSubTab === 'active' && dualMode === 'hire_chef' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 sm:p-8 border border-zinc-200 dark:border-zinc-800 shadow-xs space-y-6">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-100 dark:border-zinc-800">
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-amber-600 dark:text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/20">
                  Marketplace de Cocineros a Domicilio
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-zinc-900 dark:text-white mt-1">
                  Resuelve tu Menú Semanal con un Cocinero Profesional
                </h3>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-0.5">
                  Lánzalo a la red para recibir propuestas con mensaje o elige manualmente a tu cocinero preferido.
                </p>
              </div>

              <div className="flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-500/10 px-3 py-1.5 rounded-xl border border-emerald-500/20 shrink-0">
                <ShieldCheck size={14} />
                <span>100% Fondos Protegidos Escrow</span>
              </div>
            </div>

            {/* BROADCAST CARD */}
            <div className="p-5 rounded-2xl bg-gradient-to-r from-[#E07A5F]/15 via-amber-500/10 to-transparent border border-[#E07A5F]/30 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black uppercase bg-[#E07A5F] text-white px-2 py-0.5 rounded-md">
                    Modo Recomendado
                  </span>
                  <strong className="text-sm font-black text-zinc-900 dark:text-white">
                    1. Lanzar Encargo a la Red de Cocineros
                  </strong>
                </div>
                <p className="text-xs text-zinc-600 dark:text-zinc-400">
                  Publica tu menú a los chefs verificados de tu barrio. Ellos postulan enviándote un mensaje personalizado con su experiencia y tú aceptas al que más te convenza vía chat.
                </p>
              </div>

              <button
                onClick={() => onNavigate({ name: 'create-chef-request', preselectedPlanId: activeProject?.id })}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#E07A5F] hover:bg-[#c85a32] text-white text-xs font-black shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer shrink-0 active:scale-95"
              >
                <Radio size={14} className="animate-pulse" />
                <span>📡 Lanzar a la Red TouChef</span>
              </button>
            </div>

            {/* DIRECT CHEF CATALOG SECTION */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-black uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                  2. O Elige Manualmente a tu Cocinero Favorito:
                </h4>
                <button
                  onClick={() => onNavigate({ name: 'chefs' })}
                  className="text-xs font-bold text-[#E07A5F] hover:underline cursor-pointer"
                >
                  Ver Directorio Completo →
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {APPROVED_CHEFS.slice(0, 3).map(chef => (
                  <div
                    key={chef.id}
                    className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200/80 dark:border-zinc-700/60 flex flex-col justify-between space-y-3"
                  >
                    <div className="flex items-center gap-3">
                      <img src={chef.avatar} alt={chef.name} className="w-12 h-12 rounded-xl object-cover" />
                      <div className="min-w-0 flex-1">
                        <strong className="text-xs font-black text-zinc-900 dark:text-white truncate block">
                          {chef.name}
                        </strong>
                        <span className="text-[11px] text-amber-500 font-bold flex items-center gap-1">
                          <Star size={11} fill="currentColor" /> {chef.rating} ({chef.reviewsCount})
                        </span>
                        <span className="text-[10px] text-zinc-500 dark:text-zinc-400 block truncate">
                          {chef.pricing.cookingHourRate} €/h • {chef.locationCity}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => onNavigate({ name: 'create-chef-request', preselectedPlanId: activeProject?.id, chefId: chef.id } as any)}
                      className="w-full py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-700 dark:hover:bg-zinc-600 text-white text-xs font-bold transition-all cursor-pointer text-center"
                    >
                      Elegir a {chef.name.split(' ')[0]}
                    </button>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
