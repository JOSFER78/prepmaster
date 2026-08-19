import React, { useState, useMemo, useRef, useEffect } from 'react';
import { 
  Sparkles, 
  Clock, 
  Users, 
  Calendar, 
  Flame, 
  ArrowRight, 
  Check, 
  RefreshCw, 
  Sliders, 
  ChevronDown, 
  ChevronUp, 
  X, 
  Zap, 
  Utensils, 
  ShieldCheck, 
  ShoppingBag, 
  ChefHat, 
  CheckCircle2,
  MessageSquare,
  Box,
  SlidersHorizontal
} from 'lucide-react';
import { GeneratedMenuPlan, MealPlanConfig, BatchProject, BatchDish, BatchShoppingItem } from '../types';
import { initialFridgeStock } from '../data';
import { PlanActionBridge } from '../components/PlanActionBridge';
import { 
  calculateBatchStructure, 
  generateDynamicBatchDishes 
} from '../lib/batchEngine';

interface AIGeneratorViewProps {
  onMenuApproved: (plan: GeneratedMenuPlan) => void;
  onNavigateToShopping: () => void;
  initialContext?: MealPlanConfig | null;
  onBatchProjectCreated?: (project: BatchProject) => void;
  onHireChefForBatch?: (project: BatchProject) => void;
}

export function AIGeneratorView({ 
  onMenuApproved, 
  onNavigateToShopping, 
  initialContext, 
  onBatchProjectCreated,
  onHireChefForBatch 
}: AIGeneratorViewProps) {
  
  const [currentStep, setCurrentStep] = useState<1 | 2>(1);
  const [selectedArchetype, setSelectedArchetype] = useState<'familiar' | 'fitness' | 'gourmet' | 'custom'>('familiar');
  const [peopleCount, setPeopleCount] = useState<number>(initialContext?.peopleCount || 4);
  const [daysCount, setDaysCount] = useState<number>(initialContext?.daysCount || 5);
  const [mealCoverage, setMealCoverage] = useState<'lunches' | 'dinners' | 'both'>(initialContext?.mealCoverage || 'both');
  const [dietStyle, setDietStyle] = useState<'mediterranean' | 'fitness' | 'veggie' | 'lowcarb' | 'traditional'>(
    (initialContext?.dietStyle as any) || 'mediterranean'
  );
  const [varietyPreference, setVarietyPreference] = useState<'max_efficiency' | 'balanced' | 'high_variety'>('balanced');
  
  // Secondary collapsed settings
  const [cravings, setCravings] = useState<string>('');
  const [includeFridge, setIncludeFridge] = useState<boolean>(true);
  const [microwaveWatts, setMicrowaveWatts] = useState<number>(800);
  const [hasSteamValve, setHasSteamValve] = useState<boolean>(true);
  const [selectedAllergens, setSelectedAllergens] = useState<string[]>([]);
  const [preferredSupermarket, setPreferredSupermarket] = useState<string>('Supermercados DIA');
  const [activeDrawer, setActiveDrawer] = useState<'none' | 'cravings' | 'microwave' | 'containers' | 'allergens' | 'aisles'>('none');

  const ribbonRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [generatedPlan, setGeneratedPlan] = useState<GeneratedMenuPlan | null>(null);
  const [generatedDishes, setGeneratedDishes] = useState<BatchDish[]>([]);

  // Click outside to collapse
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ribbonRef.current && !ribbonRef.current.contains(event.target as Node)) {
        setActiveDrawer('none');
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // DYNAMIC BATCH ENGINE CALCULATION
  const structure = useMemo(() => {
    return calculateBatchStructure({
      peopleCount,
      daysCount,
      mealCoverage,
      dietStyle,
      varietyPreference
    });
  }, [peopleCount, daysCount, mealCoverage, dietStyle, varietyPreference]);

  const applyArchetype = (arch: 'familiar' | 'fitness' | 'gourmet') => {
    setSelectedArchetype(arch);
    if (arch === 'familiar') {
      setPeopleCount(4);
      setDaysCount(5);
      setMealCoverage('both');
      setDietStyle('mediterranean');
      setVarietyPreference('balanced');
    } else if (arch === 'fitness') {
      setPeopleCount(2);
      setDaysCount(4);
      setMealCoverage('both');
      setDietStyle('fitness');
      setVarietyPreference('max_efficiency');
    } else if (arch === 'gourmet') {
      setPeopleCount(3);
      setDaysCount(3);
      setMealCoverage('both');
      setDietStyle('traditional');
      setVarietyPreference('high_variety');
    }
  };

  const toggleAllergen = (allergen: string) => {
    setSelectedAllergens(prev => 
      prev.includes(allergen) ? prev.filter(a => a !== allergen) : [...prev, allergen]
    );
  };

  const handleGenerate = () => {
    setIsGenerating(true);
    setActiveDrawer('none');

    const dishes = generateDynamicBatchDishes({
      peopleCount,
      daysCount,
      mealCoverage,
      dietStyle,
      varietyPreference
    });

    setGeneratedDishes(dishes);

    const plan: GeneratedMenuPlan = {
      id: `plan-${Date.now()}`,
      title: `Plan Batch Cooking ${dietStyle.toUpperCase()} (${structure.totalIndividualServings} Raciones)`,
      philosophy: `Estructura optimizada para ${peopleCount} personas durante ${daysCount} días. ${structure.dishCount} recetas coordinadas en paralelo en ${structure.estimatedCookTimeFormatted}.`,
      macrosTarget: {
        protein: dietStyle === 'fitness' ? '30%' : '20%',
        carbs: dietStyle === 'lowcarb' ? '15%' : '45%',
        fats: '35%'
      },
      meals: [],
      batchCookingSummary: {
        totalTime: structure.estimatedCookTimeFormatted,
        parallelSteps: [
          'Mise en place unificada: Picar todas las verduras antes de encender fuegos.',
          'Cocción concurrente: Horno y fogones en paralelo para máxima eficiencia térmica.',
          'Envasado hermético: Nevera (días 1-3) y congelador (días 4+) en vidrio borosilicato.'
        ]
      }
    };

    setGeneratedPlan(plan);
    setIsGenerating(false);
    setCurrentStep(2);
    onMenuApproved(plan);
  };

  const createBatchProjectFromState = (status: BatchProject['status'] = 'planning'): BatchProject => {
    const shoppingMap = new Map<string, BatchShoppingItem>();

    generatedDishes.forEach(dish => {
      dish.ingredients.forEach(ing => {
        const pantryMatch = initialFridgeStock.find(
          item => item.name.toLowerCase() === ing.name.toLowerCase()
        );

        const current = shoppingMap.get(ing.name) || {
          id: `shop-${ing.name.toLowerCase().replace(/\s+/g, '-')}`,
          name: ing.name,
          requiredQty: 0,
          inPantryQty: pantryMatch ? pantryMatch.quantity : 0,
          toBuyQty: 0,
          unit: ing.unit,
          category: (ing.category as any) || 'despensa',
          isBought: false,
          isFromPantryDeduction: !!pantryMatch
        };

        current.requiredQty += ing.quantity;
        shoppingMap.set(ing.name, current);
      });
    });

    shoppingMap.forEach(item => {
      const needed = Math.max(0, item.requiredQty - item.inPantryQty);
      item.toBuyQty = Math.round(needed * 10) / 10;
    });

    return {
      id: `batch-${Date.now()}`,
      title: generatedPlan ? generatedPlan.title : `Sesión Batch Cooking (${structure.totalIndividualServings} raciones)`,
      status,
      createdAt: new Date().toISOString(),
      plannedShoppingDate: new Date().toISOString().split('T')[0],
      peopleCount,
      daysCount,
      mealCoverage,
      dietStyle,
      totalServings: structure.totalIndividualServings,
      dishes: generatedDishes,
      shoppingList: Array.from(shoppingMap.values()),
      totalCookingTime: structure.estimatedCookTimeFormatted,
      hoursSavedWeekly: structure.hoursSavedWeekly,
      totalConsumedServings: 0
    };
  };

  const handleApproveAndSave = () => {
    if (!generatedDishes || generatedDishes.length === 0) return;
    const project = createBatchProjectFromState('planning');
    if (onBatchProjectCreated) onBatchProjectCreated(project);
    onNavigateToShopping();
  };

  const handleApproveAndHireChef = () => {
    if (!generatedDishes || generatedDishes.length === 0) return;
    const project = createBatchProjectFromState('planning');
    if (onHireChefForBatch) onHireChefForBatch(project);
    else {
      if (onBatchProjectCreated) onBatchProjectCreated(project);
      onNavigateToShopping();
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8 animate-fade-in pb-16 text-zinc-900 dark:text-zinc-100">
      
      {/* STEP 1: UNIFIED SINGLE HERO CARD + AUTO-COLLAPSE RIBBON */}
      {currentStep === 1 && (
        <div className="space-y-6">
          
          {/* ========================================================================= */}
          {/* 1. SINGLE UNIFIED HERO CARD (NO BOX-IN-A-BOX / HAUTE MINIMAL)             */}
          {/* ========================================================================= */}
          <div className="glass-surface-elevated rounded-3xl p-6 sm:p-8 border border-zinc-200/80 dark:border-white/10 shadow-xl space-y-7">
            
            {/* SEGMENTED ARCHETYPE SWITCHER (TOP OF HERO CARD) */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-black uppercase tracking-wider text-[#E07A5F]">
                  1. Arquetipo de Semana
                </span>
                <span className="text-xs font-mono font-bold text-zinc-400">
                  {structure.totalIndividualServings} raciones calculadas
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2 bg-zinc-100 dark:bg-zinc-900 p-1.5 rounded-2xl border border-zinc-200 dark:border-zinc-800">
                <button
                  type="button"
                  onClick={() => applyArchetype('familiar')}
                  className={`py-3 px-2 sm:px-4 rounded-xl text-xs font-bold transition-all text-center cursor-pointer ${
                    selectedArchetype === 'familiar'
                      ? 'btn-hero-copper text-white shadow-md'
                      : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
                  }`}
                >
                  <span className="block text-sm">👨‍👩‍👧‍👦 Familiar 5D</span>
                  <span className="text-[10px] opacity-80 block font-normal mt-0.5">4 pers · 40 rac</span>
                </button>

                <button
                  type="button"
                  onClick={() => applyArchetype('fitness')}
                  className={`py-3 px-2 sm:px-4 rounded-xl text-xs font-bold transition-all text-center cursor-pointer ${
                    selectedArchetype === 'fitness'
                      ? 'btn-hero-copper text-white shadow-md'
                      : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
                  }`}
                >
                  <span className="block text-sm">⚡ Fitness 4D</span>
                  <span className="text-[10px] opacity-80 block font-normal mt-0.5">2 pers · 16 rac</span>
                </button>

                <button
                  type="button"
                  onClick={() => applyArchetype('gourmet')}
                  className={`py-3 px-2 sm:px-4 rounded-xl text-xs font-bold transition-all text-center cursor-pointer ${
                    selectedArchetype === 'gourmet'
                      ? 'btn-hero-copper text-white shadow-md'
                      : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
                  }`}
                >
                  <span className="block text-sm">🍷 Gourmet 3D</span>
                  <span className="text-[10px] opacity-80 block font-normal mt-0.5">3 pers · 18 rac</span>
                </button>
              </div>
            </div>

            {/* INLINE FLUID SCRUBBERS (PEOPLE & DAYS) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2 border-t border-zinc-200/50 dark:border-zinc-800/60">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5">
                    <Users size={14} className="text-[#E07A5F]" />
                    <span>Comensales en la mesa:</span>
                  </span>
                  <strong className="text-sm font-mono font-black text-[#E07A5F]">{peopleCount} personas</strong>
                </div>
                <input
                  type="range"
                  min={1}
                  max={8}
                  value={peopleCount}
                  onChange={(e) => { setPeopleCount(Number(e.target.value)); setSelectedArchetype('custom'); }}
                  className="w-full accent-[#E07A5F] cursor-pointer"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5">
                    <Calendar size={14} className="text-[#E07A5F]" />
                    <span>Días de cobertura:</span>
                  </span>
                  <strong className="text-sm font-mono font-black text-[#E07A5F]">{daysCount} días</strong>
                </div>
                <input
                  type="range"
                  min={2}
                  max={7}
                  value={daysCount}
                  onChange={(e) => { setDaysCount(Number(e.target.value)); setSelectedArchetype('custom'); }}
                  className="w-full accent-[#E07A5F] cursor-pointer"
                />
              </div>
            </div>

            {/* LIVE PRODUCTION METRICS (INLINE ROW) */}
            <div className="grid grid-cols-4 gap-2 text-center py-4 px-3 bg-zinc-50 dark:bg-zinc-800/80 rounded-2xl border border-zinc-200/60 dark:border-zinc-800">
              <div>
                <span className="text-[10px] text-zinc-400 uppercase font-bold block">Raciones</span>
                <strong className="text-lg sm:text-xl font-mono font-black text-[#E07A5F]">{structure.totalIndividualServings}</strong>
              </div>
              <div>
                <span className="text-[10px] text-zinc-400 uppercase font-bold block">Recetas</span>
                <strong className="text-lg sm:text-xl font-mono font-black text-zinc-900 dark:text-white">{structure.dishCount}</strong>
              </div>
              <div>
                <span className="text-[10px] text-zinc-400 uppercase font-bold block">Cocina</span>
                <strong className="text-lg sm:text-xl font-mono font-black text-amber-500">~{structure.estimatedCookTimeFormatted}</strong>
              </div>
              <div>
                <span className="text-[10px] text-zinc-400 uppercase font-bold block">Ahorro</span>
                <strong className="text-lg sm:text-xl font-mono font-black text-emerald-500">+{structure.hoursSavedWeekly}h</strong>
              </div>
            </div>

            {/* SINGLE MAGNETIC PRIMARY CTA */}
            <button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="w-full py-4 btn-hero-copper text-white font-black text-sm rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 active:scale-98 cursor-pointer"
            >
              {isGenerating ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Coordinando 4 fuegos y despensa...</span>
                </div>
              ) : (
                <>
                  <Sparkles size={18} />
                  <span>Generar Menú de {structure.totalIndividualServings} Raciones en 1 Clic</span>
                  <ArrowRight size={16} />
                </>
              )}
            </button>

          </div>

          {/* ========================================================================= */}
          {/* 2. SMART AUTO-COLLAPSE RIBBON (MICRO-CHIPS ACCORDION)                     */}
          {/* ========================================================================= */}
          <div ref={ribbonRef} className="space-y-2">
            
            {/* MICRO-CHIPS RIBBON (1 ROW 36px) */}
            <div className="flex items-center justify-between gap-2 p-2 rounded-2xl bg-zinc-100/80 dark:bg-zinc-900/80 border border-zinc-200/80 dark:border-white/5 overflow-x-auto no-scrollbar">
              
              <div className="flex items-center gap-1 text-[11px] font-bold text-zinc-500 shrink-0 pl-1">
                <SlidersHorizontal size={13} className="text-[#E07A5F]" />
                <span className="hidden sm:inline">Ajustes Finos (Opcional):</span>
              </div>

              <div className="flex items-center gap-1.5 overflow-x-auto py-0.5">
                
                {/* Chip 1: Antojos */}
                <button
                  type="button"
                  onClick={() => setActiveDrawer(d => d === 'cravings' ? 'none' : 'cravings')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                    activeDrawer === 'cravings'
                      ? 'bg-[#E07A5F] text-white shadow-xs'
                      : cravings.trim().length > 0
                      ? 'bg-[#E07A5F]/15 border border-[#E07A5F]/40 text-[#E07A5F] font-bold'
                      : 'bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50'
                  }`}
                >
                  <MessageSquare size={13} />
                  <span>{cravings.trim().length > 0 ? `Antojos (${cravings.slice(0, 12)}...)` : 'Antojos'}</span>
                </button>

                {/* Chip 2: Microondas */}
                <button
                  type="button"
                  onClick={() => setActiveDrawer(d => d === 'microwave' ? 'none' : 'microwave')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                    activeDrawer === 'microwave'
                      ? 'bg-[#E07A5F] text-white shadow-xs'
                      : 'bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50'
                  }`}
                >
                  <Zap size={13} className="text-amber-500" />
                  <span>{microwaveWatts}W</span>
                </button>

                {/* Chip 3: Envases */}
                <button
                  type="button"
                  onClick={() => setActiveDrawer(d => d === 'containers' ? 'none' : 'containers')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                    activeDrawer === 'containers'
                      ? 'bg-[#E07A5F] text-white shadow-xs'
                      : 'bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50'
                  }`}
                >
                  <Box size={13} className="text-emerald-500" />
                  <span>Borosilicato</span>
                </button>

                {/* Chip 4: Alérgenos */}
                <button
                  type="button"
                  onClick={() => setActiveDrawer(d => d === 'allergens' ? 'none' : 'allergens')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                    activeDrawer === 'allergens'
                      ? 'bg-red-600 text-white shadow-xs'
                      : selectedAllergens.length > 0
                      ? 'bg-red-500/15 border border-red-500/40 text-red-500 font-bold'
                      : 'bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50'
                  }`}
                >
                  <ShieldCheck size={13} />
                  <span>{selectedAllergens.length > 0 ? `Alérgenos (${selectedAllergens.length})` : 'Alérgenos'}</span>
                </button>

                {/* Chip 5: Pasillos DIA */}
                <button
                  type="button"
                  onClick={() => setActiveDrawer(d => d === 'aisles' ? 'none' : 'aisles')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                    activeDrawer === 'aisles'
                      ? 'bg-[#E07A5F] text-white shadow-xs'
                      : 'bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50'
                  }`}
                >
                  <ShoppingBag size={13} />
                  <span>{preferredSupermarket.replace('Supermercados ', '')}</span>
                </button>

              </div>

              <button
                type="button"
                onClick={() => setActiveDrawer(d => d === 'none' ? 'cravings' : 'none')}
                className="p-1.5 text-zinc-400 hover:text-white transition-colors cursor-pointer shrink-0"
              >
                {activeDrawer !== 'none' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>

            </div>

            {/* EXPANDABLE ACCORDION (CSS GRID 0fr -> 1fr ZERO CLS) */}
            <div 
              className={`grid transition-all duration-300 ease-out ${
                activeDrawer !== 'none' ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0 pointer-events-none'
              }`}
            >
              <div className="overflow-hidden">
                <div className="p-5 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xl space-y-4">
                  
                  <div className="flex items-center justify-between pb-3 border-b border-zinc-100 dark:border-zinc-800">
                    <span className="text-xs font-bold text-[#E07A5F] flex items-center gap-1.5 uppercase">
                      {activeDrawer === 'cravings' && <><MessageSquare size={14} /> Notas, Antojos & Despensa</>}
                      {activeDrawer === 'microwave' && <><Zap size={14} /> Microondas & Potencia (600W - 1200W)</>}
                      {activeDrawer === 'containers' && <><Box size={14} /> Envases de Vidrio Borosilicato</>}
                      {activeDrawer === 'allergens' && <><ShieldCheck size={14} /> Alérgenos Clínicos (14 UE)</>}
                      {activeDrawer === 'aisles' && <><ShoppingBag size={14} /> Pasillos de Supermercado</>}
                    </span>

                    <button
                      type="button"
                      onClick={() => setActiveDrawer('none')}
                      className="text-xs font-bold text-zinc-400 hover:text-zinc-900 dark:hover:text-white px-2.5 py-1 bg-zinc-100 dark:bg-zinc-800 rounded-lg cursor-pointer"
                    >
                      Listo ✓
                    </button>
                  </div>

                  {/* TAB 1: ANTOJOS */}
                  {activeDrawer === 'cravings' && (
                    <div className="space-y-3">
                      <div className="flex flex-wrap gap-1.5">
                        {['Guisos reconfortantes', 'Cremas suaves', 'Sin picante', 'Platos proteicos', 'Verduras de temporada'].map(tag => (
                          <button
                            key={tag}
                            type="button"
                            onClick={() => setCravings(tag)}
                            className="text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-zinc-100 dark:bg-zinc-800 hover:bg-[#E07A5F]/20 text-zinc-700 dark:text-zinc-300 hover:text-[#E07A5F] transition-colors cursor-pointer"
                          >
                            + {tag}
                          </button>
                        ))}
                      </div>
                      <input
                        type="text"
                        value={cravings}
                        onChange={(e) => setCravings(e.target.value)}
                        placeholder="Ej: Mucha calabaza, patatas con fundamento, salsas ligeras..."
                        className="w-full p-3 text-xs rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white focus:outline-none focus:border-[#E07A5F]"
                      />
                      <label className="flex items-center gap-2 text-xs font-bold text-zinc-700 dark:text-zinc-300 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={includeFridge}
                          onChange={(e) => setIncludeFridge(e.target.checked)}
                          className="accent-[#E07A5F]"
                        />
                        <span>Descontar automáticamente de Despensa Viva Zero Waste</span>
                      </label>
                    </div>
                  )}

                  {/* TAB 2: MICROONDAS */}
                  {activeDrawer === 'microwave' && (
                    <div className="space-y-3">
                      <span className="text-xs text-zinc-500 block">Potencia de regeneración de tu microondas:</span>
                      <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                        {[600, 750, 800, 900, 1000, 1200].map(watts => (
                          <button
                            key={watts}
                            type="button"
                            onClick={() => setMicrowaveWatts(watts)}
                            className={`p-2.5 rounded-xl border text-center font-bold text-xs cursor-pointer transition-all ${
                              microwaveWatts === watts 
                                ? 'bg-[#E07A5F] text-white border-[#E07A5F] shadow-xs' 
                                : 'bg-zinc-50 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300'
                            }`}
                          >
                            <span className="block font-mono text-sm">{watts}W</span>
                            <span className="text-[9px] opacity-75">{watts === 800 ? 'Estándar' : 'Potencia'}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* TAB 3: BOROSILICATO */}
                  {activeDrawer === 'containers' && (
                    <div className="space-y-3 text-xs">
                      <p className="text-zinc-500">
                        Los recipientes de vidrio de borosilicato son aptos para horno directo (400°C) y microondas sin transferir sabores ni microplásticos.
                      </p>
                      <label className="flex items-center gap-2 cursor-pointer font-semibold">
                        <input
                          type="checkbox"
                          checked={hasSteamValve}
                          onChange={(e) => setHasSteamValve(e.target.checked)}
                          className="accent-[#E07A5F]"
                        />
                        <span>Tapas con válvula de vapor (calentar en microondas sin salpicaduras)</span>
                      </label>
                    </div>
                  )}

                  {/* TAB 4: ALÉRGENOS */}
                  {activeDrawer === 'allergens' && (
                    <div className="space-y-3">
                      <span className="text-xs text-zinc-500 block">Selecciona restricciones a excluir de tus recetas:</span>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {[
                          'Gluten', 'Lactosa', 'Frutos Secos', 'Mariscos',
                          'Pescado', 'Huevos', 'Soja', 'FODMAP'
                        ].map(al => (
                          <button
                            key={al}
                            type="button"
                            onClick={() => toggleAllergen(al)}
                            className={`p-2.5 rounded-xl border text-xs text-left transition-all cursor-pointer flex items-center justify-between ${
                              selectedAllergens.includes(al)
                                ? 'bg-red-600 text-white border-red-600 font-bold'
                                : 'bg-zinc-50 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300'
                            }`}
                          >
                            <span>Sin {al}</span>
                            {selectedAllergens.includes(al) && <Check size={13} />}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* TAB 5: PASILLOS */}
                  {activeDrawer === 'aisles' && (
                    <div className="space-y-3">
                      <span className="text-xs text-zinc-500 block">Supermercado preferido para ordenar la ruta física:</span>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {['Supermercados DIA', 'Mercadona', 'Carrefour', 'Lidl'].map(sup => (
                          <button
                            key={sup}
                            type="button"
                            onClick={() => setPreferredSupermarket(sup)}
                            className={`p-2.5 rounded-xl border text-xs font-bold transition-all cursor-pointer flex items-center justify-between ${
                              preferredSupermarket === sup
                                ? 'bg-[#E07A5F] text-white border-[#E07A5F]'
                                : 'bg-zinc-50 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300'
                            }`}
                          >
                            <span>{sup}</span>
                            {preferredSupermarket === sup && <Check size={13} />}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                </div>
              </div>
            </div>

          </div>

        </div>
      )}

      {/* STEP 2: GENERATED PLAN & ORCHESTRATION BRIDGE */}
      {currentStep === 2 && generatedPlan && (
        <div className="space-y-6 animate-in fade-in duration-300">
          
          <PlanActionBridge
            totalServings={structure.totalIndividualServings}
            dishCount={structure.dishCount}
            cookTime={structure.estimatedCookTimeFormatted}
            onCookMyself={handleApproveAndSave}
            onHireChef={handleApproveAndHireChef}
            onSupermarketOrder={handleApproveAndSave}
          />

          <div className="glass-surface-elevated rounded-3xl p-6 sm:p-8 border border-zinc-200/80 dark:border-white/10 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-zinc-100 dark:border-zinc-800 gap-2">
              <div>
                <h3 className="text-base font-black text-zinc-900 dark:text-white">
                  Menú de Producción Optimizado ({generatedDishes.length} recetas coordinadas)
                </h3>
                <p className="text-xs text-zinc-500">
                  Elaboración simultánea en 4 fuegos + horno con envasado diferido.
                </p>
              </div>
              <button
                onClick={() => setCurrentStep(1)}
                className="text-xs font-bold text-[#E07A5F] hover:underline self-start sm:self-center cursor-pointer"
              >
                ← Modificar Parámetros
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-4">
              {generatedDishes.map(dish => (
                <div
                  key={dish.id}
                  className="p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700/70 shadow-xs flex flex-col justify-between space-y-3"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider bg-zinc-200 dark:bg-zinc-700 px-2 py-0.5 rounded text-zinc-600 dark:text-zinc-300">
                        {dish.cookingMethod.replace('_', ' ')}
                      </span>
                      <strong className="font-mono text-sm font-black text-[#E07A5F]">
                        {dish.servings} raciones
                      </strong>
                    </div>
                    <strong className="text-sm font-black text-zinc-900 dark:text-white block">
                      {dish.name}
                    </strong>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                      {dish.description}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-zinc-200/60 dark:border-zinc-700/60 flex items-center justify-between text-[11px] text-zinc-400">
                    <span>Conservación: <strong className="text-zinc-300">{dish.storageAdvice}</strong></span>
                    <span>{dish.estimatedTimeMinutes} min</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
