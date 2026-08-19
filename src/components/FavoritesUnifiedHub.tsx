import React, { useState } from 'react';
import { 
  Star, 
  Heart, 
  Flame, 
  ChefHat, 
  Radio, 
  CheckCircle2, 
  Clock, 
  Utensils, 
  Layers, 
  Plus, 
  Trash2, 
  ArrowRight, 
  ShoppingBag, 
  Sparkles, 
  SlidersHorizontal,
  RotateCcw,
  BookOpen,
  Calendar,
  Check,
  Zap
} from 'lucide-react';
import { BatchProject, BatchDish, ViewState } from '../types';
import { composeBatchFromDishes, saveFavoriteBatchesToStorage, saveFavoriteDishesToStorage } from '../lib/favoritesEngine';

interface FavoritesUnifiedHubProps {
  favoriteBatches: BatchProject[];
  favoriteDishes: BatchDish[];
  onNavigate: (view: ViewState) => void;
  onActivateBatchForCooking: (batch: BatchProject) => void;
  onLaunchBatchToChefNetwork: (batch: BatchProject) => void;
  onUpdateFavoriteBatches: (batches: BatchProject[]) => void;
  onUpdateFavoriteDishes: (dishes: BatchDish[]) => void;
}

export function FavoritesUnifiedHub({
  favoriteBatches,
  favoriteDishes,
  onNavigate,
  onActivateBatchForCooking,
  onLaunchBatchToChefNetwork,
  onUpdateFavoriteBatches,
  onUpdateFavoriteDishes
}: FavoritesUnifiedHubProps) {
  const [activeTab, setActiveTab] = useState<'batches' | 'dishes'>('batches');
  const [selectedDishIds, setSelectedDishIds] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('todas');
  const [composerOpen, setComposerOpen] = useState<boolean>(false);
  const [customBatchTitle, setCustomBatchTitle] = useState<string>('');

  const categories = [
    { id: 'todas', label: 'Todas las Recetas' },
    { id: 'legumbres', label: 'Legumbres & Guisos' },
    { id: 'carnes', label: 'Carnes & Aves' },
    { id: 'pescados', label: 'Pescados & Mariscos' },
    { id: 'cremas', label: 'Cremas & Verduras' }
  ];

  const filteredDishes = favoriteDishes.filter(d => 
    selectedCategory === 'todas' || d.category === selectedCategory
  );

  const toggleSelectDish = (dishId: string) => {
    if (selectedDishIds.includes(dishId)) {
      setSelectedDishIds(selectedDishIds.filter(id => id !== dishId));
    } else {
      setSelectedDishIds([...selectedDishIds, dishId]);
    }
  };

  const selectAllDishes = () => {
    if (selectedDishIds.length === filteredDishes.length) {
      setSelectedDishIds([]);
    } else {
      setSelectedDishIds(filteredDishes.map(d => d.id));
    }
  };

  const selectedDishes = favoriteDishes.filter(d => selectedDishIds.includes(d.id));
  const totalSelectedServings = selectedDishes.reduce((acc, d) => acc + (d.servings || 4), 0);

  const handleToggleFavoriteDish = (dish: BatchDish) => {
    const exists = favoriteDishes.some(d => d.id === dish.id || d.name === dish.name);
    let updated: BatchDish[];
    if (exists) {
      updated = favoriteDishes.filter(d => d.id !== dish.id && d.name !== dish.name);
      setSelectedDishIds(selectedDishIds.filter(id => id !== dish.id));
    } else {
      updated = [{ ...dish, isFavorite: true }, ...favoriteDishes];
    }
    onUpdateFavoriteDishes(updated);
    saveFavoriteDishesToStorage(updated);
  };

  const handleDeleteBatch = (batchId: string) => {
    if (confirm('¿Eliminar este lote de tus favoritos guardados?')) {
      const updated = favoriteBatches.filter(b => b.id !== batchId);
      onUpdateFavoriteBatches(updated);
      saveFavoriteBatchesToStorage(updated);
    }
  };

  const handleComposeAndLaunch = (mode: 'network' | 'self_cook') => {
    if (selectedDishes.length === 0) return;
    const newBatch = composeBatchFromDishes(selectedDishes, customBatchTitle || undefined);
    
    // Save to favorites list if not already there
    const updatedBatches = [newBatch, ...favoriteBatches];
    onUpdateFavoriteBatches(updatedBatches);
    saveFavoriteBatchesToStorage(updatedBatches);

    if (mode === 'network') {
      onLaunchBatchToChefNetwork(newBatch);
    } else {
      onActivateBatchForCooking(newBatch);
    }
  };

  const getMethodBadge = (method: string) => {
    switch (method) {
      case 'olla_expres':
        return { label: '⚡ Olla Rápida', color: 'bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/20' };
      case 'horno':
        return { label: '🔥 Horno', color: 'bg-orange-500/10 text-orange-700 dark:text-orange-300 border-orange-500/20' };
      case 'robot':
        return { label: '🤖 Robot Cocina', color: 'bg-purple-500/10 text-purple-700 dark:text-purple-300 border-purple-500/20' };
      default:
        return { label: '🍳 Fuego Lento', color: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/20' };
    }
  };

  return (
    <div className="space-y-6 animate-fade-in text-zinc-900 dark:text-zinc-100">
      
      {/* 1. HEADER & SUB-TABS SELECTOR */}
      <div className="bg-white dark:bg-zinc-900 rounded-3xl p-5 sm:p-7 border border-zinc-200/80 dark:border-zinc-800 shadow-xs space-y-4">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black uppercase tracking-wider text-[#E07A5F] bg-[#E07A5F]/10 px-2.5 py-0.5 rounded-full border border-[#E07A5F]/20 flex items-center gap-1">
                <Star size={11} fill="currentColor" /> Favoritos &amp; Bóveda Inteligente
              </span>
              <span className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">Sincronizado en Firebase</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-white mt-1">
              Tus Lotes Semanales y Recetas Favoritas
            </h2>
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 mt-1 max-w-2xl leading-relaxed">
              Vuelve a pedir tu menú favorito en 1 clic a la red de cocineros o selecciona tus recetas guardadas para armar un lote batch cooking a medida.
            </p>
          </div>

          {/* SUB-TABS SWITCHER */}
          <div className="flex items-center gap-1.5 p-1 bg-zinc-100 dark:bg-zinc-800 rounded-2xl border border-zinc-200/80 dark:border-zinc-700 self-start sm:self-center shrink-0">
            <button
              onClick={() => setActiveTab('batches')}
              className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'batches'
                  ? 'btn-hero-copper text-white shadow-xs'
                  : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
              }`}
            >
              <Sparkles size={14} />
              <span>Lotes Completos ({favoriteBatches.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('dishes')}
              className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'dishes'
                  ? 'btn-hero-copper text-white shadow-xs'
                  : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
              }`}
            >
              <Heart size={14} className={activeTab === 'dishes' ? 'fill-white' : 'text-rose-500'} />
              <span>Recetas Sueltas ({favoriteDishes.length})</span>
            </button>
          </div>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* TAB 1: LOTES COMPLETOS GUARDADOS (BÓVEDA DE FAVORITOS)                    */}
      {/* ========================================================================= */}
      {activeTab === 'batches' && (
        <div className="space-y-6">
          {favoriteBatches.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {favoriteBatches.map(batch => (
                <div
                  key={batch.id}
                  className="bg-white dark:bg-zinc-900 rounded-3xl p-6 border border-zinc-200/80 dark:border-zinc-800 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-5 group"
                >
                  <div className="space-y-4">
                    
                    {/* Header Info */}
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-500/25 uppercase tracking-wider">
                            {batch.dietStyle || 'Batch Cooking'}
                          </span>
                          <span className="text-xs font-mono font-black text-[#E07A5F]">
                            {batch.totalServings} Raciones Totales
                          </span>
                          {batch.totalCookingTime && (
                            <span className="text-xs text-zinc-500 dark:text-zinc-400 flex items-center gap-1">
                              <Clock size={12} /> {batch.totalCookingTime}
                            </span>
                          )}
                        </div>

                        <h3 className="text-base sm:text-lg font-black text-zinc-900 dark:text-white mt-1.5 leading-snug">
                          {batch.title}
                        </h3>

                        {batch.notes && (
                          <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1 leading-relaxed line-clamp-2">
                            {batch.notes}
                          </p>
                        )}
                      </div>

                      <button
                        onClick={() => handleDeleteBatch(batch.id)}
                        className="p-2 rounded-xl text-zinc-400 hover:text-rose-500 hover:bg-rose-500/10 transition-colors cursor-pointer shrink-0"
                        title="Eliminar de favoritos"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>

                    {/* Dishes Grid */}
                    <div className="space-y-2 pt-2 border-t border-zinc-100 dark:border-zinc-800">
                      <span className="text-[11px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider block">
                        Platos incluidos ({batch.dishes.length}):
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {batch.dishes.map((dish, dIdx) => {
                          const mb = getMethodBadge(dish.cookingMethod);
                          return (
                            <div
                              key={dIdx}
                              className="p-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200/60 dark:border-zinc-700/60 flex items-center justify-between gap-2"
                            >
                              <div className="min-w-0 flex-1">
                                <strong className="text-xs font-bold text-zinc-900 dark:text-white truncate block">
                                  {dish.name}
                                </strong>
                                <span className="text-[10px] text-zinc-500 dark:text-zinc-400">
                                  {dish.servings} rac • {mb.label}
                                </span>
                              </div>
                              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-[#E07A5F]/15 text-[#E07A5F] dark:text-[#F4A261] font-mono shrink-0">
                                {dish.servings}r
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                  </div>

                  {/* ACTION BUTTONS (RE-ORDER / LAUNCH / COOK) */}
                  <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800 flex flex-col sm:flex-row items-center gap-2.5">
                    <button
                      onClick={() => onLaunchBatchToChefNetwork(batch)}
                      className="w-full sm:flex-1 py-2.5 px-3 rounded-xl bg-[#E07A5F] hover:bg-[#c85a32] text-white text-xs font-black transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs active:scale-95"
                    >
                      <Radio size={14} className="animate-pulse" />
                      <span>📡 Lanzar a la Red</span>
                    </button>

                    <button
                      onClick={() => onNavigate({ name: 'chefs' })}
                      className="w-full sm:w-auto py-2.5 px-3 rounded-xl bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <ChefHat size={14} className="text-amber-500" />
                      <span>Elegir Chef</span>
                    </button>

                    <button
                      onClick={() => onActivateBatchForCooking(batch)}
                      className="w-full sm:w-auto py-2.5 px-3 rounded-xl bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Flame size={14} className="text-[#E07A5F]" />
                      <span>Cocinar Yo</span>
                    </button>
                  </div>

                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white dark:bg-zinc-900 rounded-3xl p-12 text-center border border-zinc-200 dark:border-zinc-800 space-y-3">
              <Sparkles size={36} className="mx-auto text-amber-500/60" />
              <h3 className="text-base font-bold text-zinc-900 dark:text-white">No tienes lotes favoritos guardados</h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 max-w-md mx-auto">
                Guarda tus menús semanales de batch cooking o compone uno nuevo seleccionando recetas en la pestaña de Recetas Favoritas.
              </p>
              <button
                onClick={() => setActiveTab('dishes')}
                className="px-4 py-2 rounded-xl btn-hero-copper text-white text-xs font-bold shadow-xs cursor-pointer inline-flex items-center gap-2"
              >
                <span>Ver Recetas Sueltas y Armar Lote</span>
                <ArrowRight size={14} />
              </button>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: RECETARIO FAVORITO & COMPOSITOR MULTI-RECETA                       */}
      {/* ========================================================================= */}
      {activeTab === 'dishes' && (
        <div className="space-y-6">
          
          {/* COMPOSER STICKY ACTION BAR */}
          <div className="p-4 sm:p-5 rounded-3xl bg-gradient-to-r from-amber-500/15 via-[#E07A5F]/15 to-transparent border border-amber-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-sm">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-wider bg-amber-500 text-stone-950 px-2 py-0.5 rounded-md">
                  Compositor de Lote Batch Cooking
                </span>
                <strong className="text-xs font-bold text-zinc-900 dark:text-white">
                  {selectedDishIds.length} recetas seleccionadas ({totalSelectedServings} raciones)
                </strong>
              </div>
              <p className="text-xs text-zinc-600 dark:text-zinc-400">
                Marca las recetas deseadas con el selector. Te calculamos los ingredientes consolidados y puedes mandarlo a un cocinero o cocinarlo.
              </p>
            </div>

            <div className="flex items-center gap-2 w-full md:w-auto">
              <button
                onClick={selectAllDishes}
                className="px-3 py-2 rounded-xl bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 text-xs font-bold hover:bg-zinc-50 dark:hover:bg-zinc-700 transition-all cursor-pointer whitespace-nowrap"
              >
                {selectedDishIds.length === filteredDishes.length ? 'Deseleccionar Todas' : 'Seleccionar Todas'}
              </button>

              <button
                onClick={() => handleComposeAndLaunch('network')}
                disabled={selectedDishIds.length === 0}
                className="flex-1 md:flex-none px-4 py-2 rounded-xl bg-[#E07A5F] hover:bg-[#c85a32] text-white text-xs font-black shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed active:scale-95"
              >
                <Radio size={14} className="animate-pulse" />
                <span>📡 Encargar a la Red ({selectedDishIds.length})</span>
              </button>

              <button
                onClick={() => handleComposeAndLaunch('self_cook')}
                disabled={selectedDishIds.length === 0}
                className="flex-1 md:flex-none px-4 py-2 rounded-xl btn-hero-copper text-white text-xs font-black shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed active:scale-95"
              >
                <Flame size={14} />
                <span>🔥 Cocinar Lote</span>
              </button>
            </div>
          </div>

          {/* CATEGORY FILTERS */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 hide-scrollbar">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  selectedCategory === cat.id
                    ? 'btn-hero-copper text-white shadow-xs'
                    : 'bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* DISHES GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredDishes.map(dish => {
              const isSelected = selectedDishIds.includes(dish.id);
              const mb = getMethodBadge(dish.cookingMethod);

              return (
                <div
                  key={dish.id}
                  onClick={() => toggleSelectDish(dish.id)}
                  className={`bg-white dark:bg-zinc-900 rounded-3xl p-5 border transition-all cursor-pointer flex flex-col justify-between space-y-4 group relative ${
                    isSelected 
                      ? 'border-[#E07A5F] ring-2 ring-[#E07A5F]/20 shadow-md' 
                      : 'border-zinc-200/80 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 shadow-xs'
                  }`}
                >
                  <div className="space-y-3">
                    
                    {/* Top Image & Selection Pill */}
                    <div className="relative h-40 rounded-2xl overflow-hidden bg-zinc-100 dark:bg-zinc-800">
                      {dish.image ? (
                        <img 
                          src={dish.image} 
                          alt={dish.name} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-zinc-400">
                          <Utensils size={32} />
                        </div>
                      )}

                      {/* Selection Checkbox Pill */}
                      <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-black/60 backdrop-blur-md text-white text-xs font-bold shadow-md">
                        <div className={`w-4 h-4 rounded-md flex items-center justify-center border transition-all ${
                          isSelected 
                            ? 'bg-[#E07A5F] border-[#E07A5F] text-white' 
                            : 'border-white/60 bg-white/20'
                        }`}>
                          {isSelected && <Check size={12} />}
                        </div>
                        <span className="text-[11px]">{isSelected ? 'Incluido en lote' : 'Seleccionar'}</span>
                      </div>

                      {/* Heart Button */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleToggleFavoriteDish(dish);
                        }}
                        className="absolute top-3 right-3 p-2 rounded-xl bg-black/60 backdrop-blur-md text-white hover:text-rose-400 transition-colors shadow-md cursor-pointer"
                        title="Guardar en favoritos"
                      >
                        <Heart size={16} className="fill-rose-500 text-rose-500" />
                      </button>

                      {/* Servings badge */}
                      <div className="absolute bottom-3 right-3 px-2.5 py-0.5 rounded-lg bg-zinc-950/80 backdrop-blur-md text-white font-mono font-bold text-xs">
                        {dish.servings} raciones
                      </div>
                    </div>

                    {/* Dish Info */}
                    <div>
                      <div className="flex items-center gap-2">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border uppercase tracking-wider ${mb.color}`}>
                          {mb.label}
                        </span>
                        <span className="text-[11px] text-zinc-500 dark:text-zinc-400 font-medium">
                          {dish.prepTime}
                        </span>
                      </div>

                      <h4 className="text-sm font-black text-zinc-900 dark:text-white mt-1.5 leading-snug line-clamp-2">
                        {dish.name}
                      </h4>
                    </div>

                    {/* Ingredients summary */}
                    {dish.ingredients && (
                      <p className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-2">
                        <strong>Ingredientes:</strong> {dish.ingredients.map(i => i.name).join(', ')}
                      </p>
                    )}

                  </div>

                  {/* Bottom Actions */}
                  <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between gap-2">
                    <span className="text-[11px] text-zinc-500 dark:text-zinc-400 truncate">
                      {dish.storageAdvice}
                    </span>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        const singleBatch = composeBatchFromDishes([dish], `Cocinar ${dish.name} (${dish.servings} rac)`);
                        onActivateBatchForCooking(singleBatch);
                      }}
                      className="px-2.5 py-1.5 rounded-lg bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 text-xs font-bold transition-all flex items-center gap-1 shrink-0"
                      title="Cocinar esta receta individualmente"
                    >
                      <Zap size={12} className="text-[#E07A5F]" />
                      <span>Cocinar</span>
                    </button>
                  </div>

                </div>
              );
            })}
          </div>

        </div>
      )}

    </div>
  );
}
