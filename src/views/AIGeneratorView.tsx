import React, { useState } from 'react';
import { 
  Sparkles, 
  ChefHat, 
  Check, 
  ArrowRight, 
  Flame, 
  RefreshCw, 
  Clock, 
  Users,
  ShoppingBag,
  Sliders,
  Utensils,
  Refrigerator,
  CheckCircle2,
  Calendar,
  MessageSquare,
  Layers,
  Snowflake,
  ShieldCheck,
  Sun,
  Moon
} from 'lucide-react';
import { TouChefIsotype } from '../components/TouChefLogo';
import { GeneratedMenuPlan, SimulatorContext, BatchProject, BatchDish, BatchShoppingItem } from '../types';
import { initialFridgeStock } from '../data';
import { 
  calculateBatchStructure, 
  generateDynamicBatchDishes, 
  BatchCalculationConfig 
} from '../lib/batchEngine';

interface AIGeneratorViewProps {
  onMenuApproved: (plan: GeneratedMenuPlan) => void;
  onNavigateToShopping: () => void;
  initialContext?: SimulatorContext | null;
  onBatchProjectCreated?: (project: BatchProject) => void;
}

export function AIGeneratorView({ 
  onMenuApproved, 
  onNavigateToShopping, 
  initialContext, 
  onBatchProjectCreated 
}: AIGeneratorViewProps) {
  
  const [currentStep, setCurrentStep] = useState<1 | 2>(1);
  const [peopleCount, setPeopleCount] = useState<number>(initialContext?.peopleCount || 2);
  const [daysCount, setDaysCount] = useState<number>(initialContext?.daysCount || 5);
  const [mealCoverage, setMealCoverage] = useState<'lunches' | 'dinners' | 'both'>(initialContext?.mealCoverage || 'both');
  const [dietStyle, setDietStyle] = useState<'mediterranean' | 'fitness' | 'veggie' | 'lowcarb' | 'traditional'>(
    (initialContext?.dietStyle as any) || 'mediterranean'
  );
  const [varietyPreference, setVarietyPreference] = useState<'max_efficiency' | 'balanced' | 'high_variety'>('balanced');
  const [cravings, setCravings] = useState<string>('Guisos reconfortantes, cremas suaves y verduras de temporada');
  const [includeFridge, setIncludeFridge] = useState<boolean>(true);

  // Live calculation of batch structure
  const structure = calculateBatchStructure({
    peopleCount,
    daysCount,
    mealCoverage,
    dietStyle,
    varietyPreference,
    cravings,
    includeFridge
  });

  // Generation state
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [generationProgress, setGenerationProgress] = useState<number>(0);
  const [generationStatusText, setGenerationStatusText] = useState<string>('');
  const [generatedDishes, setGeneratedDishes] = useState<BatchDish[]>([]);
  const [generatedPlan, setGeneratedPlan] = useState<GeneratedMenuPlan | null>(null);

  const getDietStyleLabel = () => {
    switch (dietStyle) {
      case 'mediterranean': return 'Mediterránea Equilibrada';
      case 'fitness': return 'Alto en Proteína & Fitness';
      case 'veggie': return '100% Vegetal & Plant-Based';
      case 'lowcarb': return 'Low Carb / Keto';
      case 'traditional': return 'Tradicional de Cuchara';
    }
  };

  // Generate Menu Execution
  const handleGenerate = () => {
    setIsGenerating(true);
    setGenerationProgress(20);
    setGenerationStatusText(`Dimensionando ${structure.peopleCount} comensales × ${structure.daysCount} días = ${structure.totalIndividualServings} raciones (${structure.totalFamilyMeals} tomas)...`);

    setTimeout(() => {
      setGenerationProgress(45);
      setGenerationStatusText(`Optimizando variedad: ${structure.dishCount} recetas (${structure.lunchDishCount} almuerzos + ${structure.dinnerDishCount} cenas)...`);
    }, 350);

    setTimeout(() => {
      setGenerationProgress(70);
      setGenerationStatusText(`Cruzando con despensa viva y preferencias (${cravings})...`);
    }, 750);

    setTimeout(() => {
      setGenerationProgress(90);
      setGenerationStatusText(`Orquestando estaciones simultáneas (Horno + Fuegos + Olla)...`);
    }, 1100);

    setTimeout(() => {
      setGenerationProgress(100);
      
      const dishes = generateDynamicBatchDishes({
        peopleCount,
        daysCount,
        mealCoverage,
        dietStyle,
        varietyPreference,
        cravings,
        includeFridge
      });

      setGeneratedDishes(dishes);

      const plan: GeneratedMenuPlan = {
        id: `plan_${Date.now()}`,
        title: `Sesión ${getDietStyleLabel()} (${structure.totalIndividualServings} rac · ${structure.dishCount} platos)`,
        mode: 'AUTO_BATCH',
        peopleCount,
        daysCount,
        referenceChannelName: 'TouChef Batch Engine',
        items: dishes.map((d, idx) => ({
          dayName: `Estación ${idx + 1} (${d.cookingMethod.toUpperCase()})`,
          mealType: d.category === 'cremas' || d.category === 'pescados' ? 'Cena' : 'Almuerzo',
          dishName: d.name,
          servings: d.servings,
          prepTime: d.prepTime,
          isFromFridge: true,
          ingredients: d.ingredients,
          instructions: d.instructions
        })),
        batchCookingSummary: {
          totalTime: structure.estimatedCookTimeFormatted,
          sessionsCount: 1,
          recommendedTechniques: [
            'Mise en place unificada: Picar todas las cebollas, ajos y verduras antes de encender fogones.',
            'Aprovechar el horno encendido para asar tubérculos y proteínas simultáneamente.',
            'Enfriamiento rápido a temperatura ambiente y envasado hermético para nevera (días 1-3) y congelador (días 4+).'
          ]
        }
      };

      setGeneratedPlan(plan);
      setIsGenerating(false);
      setCurrentStep(2);
      onMenuApproved(plan);
    }, 1500);
  };

  const handleApproveAndSave = () => {
    if (!generatedDishes || generatedDishes.length === 0) return;

    // Compile smart shopping list with pantry deduction
    const shoppingMap = new Map<string, BatchShoppingItem>();

    generatedDishes.forEach(dish => {
      dish.ingredients.forEach(ing => {
        const key = ing.name.toLowerCase().trim();
        const existing = shoppingMap.get(key);
        
        let inPantry = 0;
        if (includeFridge) {
          const matchInFridge = initialFridgeStock.find(f => 
            key.includes(f.name.toLowerCase()) || f.name.toLowerCase().includes(key)
          );
          if (matchInFridge) {
            inPantry = matchInFridge.quantity > 50 ? Number((matchInFridge.quantity / 1000).toFixed(2)) : matchInFridge.quantity;
          }
        }

        if (existing) {
          existing.requiredQty = Number((existing.requiredQty + ing.quantity).toFixed(2));
          existing.toBuyQty = Math.max(0, Number((existing.requiredQty - existing.inPantryQty).toFixed(2)));
        } else {
          const required = ing.quantity;
          const toBuy = Math.max(0, Number((required - inPantry).toFixed(2)));
          
          shoppingMap.set(key, {
            id: `shop_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
            name: ing.name,
            requiredQty: required,
            inPantryQty: inPantry,
            toBuyQty: toBuy,
            unit: ing.unit,
            category: (ing.category || 'despensa') as any,
            isBought: false,
            isFromPantryDeduction: inPantry > 0,
            estimatedPriceEuros: Number((toBuy * 2.8).toFixed(2))
          });
        }
      });
    });

    const project: BatchProject = {
      id: `batch_proj_${Date.now()}`,
      title: `Sesión ${getDietStyleLabel()} (${structure.totalIndividualServings} rac)`,
      status: 'shopping',
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

    if (onBatchProjectCreated) {
      onBatchProjectCreated(project);
    }

    onNavigateToShopping();
  };

  return (
    <div className="space-y-4 animate-fade-in pb-12 text-zinc-900 dark:text-zinc-100 max-w-5xl mx-auto">
      
      {/* HEADER BAR */}
      <div className="glass-surface-elevated rounded-3xl p-4 sm:p-5 border border-zinc-200 dark:border-white/10 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3.5">
          <TouChefIsotype size={40} />
          <div>
            <h1 className="text-sm sm:text-base font-display font-black text-zinc-900 dark:text-white leading-tight">
              {currentStep === 1 ? 'Planificador Inteligente de Batch Cooking' : 'Plan Maestro de Cocina Generado'}
            </h1>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              {currentStep === 1 
                ? 'Dimensiona comensales, días, tomas y variedad de recetas con balance térmico' 
                : `${structure.totalIndividualServings} raciones en ${structure.dishCount} recetas coordinadas para cocinar en una sola sesión`}
            </p>
          </div>
        </div>

        {/* Step Indicator */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 text-xs font-bold glass-surface px-3.5 py-1.5 rounded-xl border border-zinc-200 dark:border-zinc-700">
            <span className="w-2 h-2 rounded-full bg-[#E07A5F] animate-pulse" />
            <span>Paso {currentStep} de 2</span>
          </div>
        </div>
      </div>

      {/* STEP 1: PARAMS FORM */}
      {currentStep === 1 && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          
          {/* Main Form (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            
            {/* 1. Dimensionamiento del Hogar */}
            <div className="glass-surface rounded-3xl p-5 border border-zinc-200 dark:border-white/10 shadow-xs space-y-4">
              <h2 className="text-xs font-bold uppercase tracking-wider text-[#E07A5F] flex items-center gap-2">
                <Users size={15} />
                <span>1. Dimensionamiento del Hogar & Cobertura</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* People */}
                <div className="p-3.5 bg-zinc-50/80 dark:bg-zinc-800/60 rounded-2xl border border-zinc-200/80 dark:border-zinc-700/60 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-zinc-700 dark:text-zinc-300">Comensales:</span>
                    <span className="font-mono font-black text-[#E07A5F] text-xs">{peopleCount} pers</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <button 
                      onClick={() => setPeopleCount(Math.max(1, peopleCount - 1))}
                      className="w-8 h-8 rounded-xl bg-white dark:bg-zinc-700 border border-zinc-200 dark:border-zinc-600 font-bold text-zinc-700 dark:text-zinc-200 flex items-center justify-center hover:bg-zinc-100 cursor-pointer"
                    >
                      -
                    </button>
                    <span className="text-lg font-black text-zinc-900 dark:text-white font-mono">{peopleCount}</span>
                    <button 
                      onClick={() => setPeopleCount(Math.min(12, peopleCount + 1))}
                      className="w-8 h-8 rounded-xl bg-white dark:bg-zinc-700 border border-zinc-200 dark:border-zinc-600 font-bold text-zinc-700 dark:text-zinc-200 flex items-center justify-center hover:bg-zinc-100 cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                  {/* Quick people pills */}
                  <div className="flex justify-between gap-1 pt-1">
                    {[1, 2, 4, 6].map(p => (
                      <button
                        key={p}
                        onClick={() => setPeopleCount(p)}
                        className={`text-[10px] font-bold py-0.5 px-1.5 rounded-md transition-all cursor-pointer ${
                          peopleCount === p ? 'bg-[#E07A5F] text-white' : 'bg-zinc-200/60 dark:bg-zinc-700/50 text-zinc-500 hover:text-zinc-900 dark:hover:text-white'
                        }`}
                      >
                        {p}p
                      </button>
                    ))}
                  </div>
                </div>

                {/* Days */}
                <div className="p-3.5 bg-zinc-50/80 dark:bg-zinc-800/60 rounded-2xl border border-zinc-200/80 dark:border-zinc-700/60 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-zinc-700 dark:text-zinc-300">Días a Cubrir:</span>
                    <span className="font-mono font-black text-[#E07A5F] text-xs">{daysCount} días</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <button 
                      onClick={() => setDaysCount(Math.max(2, daysCount - 1))}
                      className="w-8 h-8 rounded-xl bg-white dark:bg-zinc-700 border border-zinc-200 dark:border-zinc-600 font-bold text-zinc-700 dark:text-zinc-200 flex items-center justify-center hover:bg-zinc-100 cursor-pointer"
                    >
                      -
                    </button>
                    <span className="text-lg font-black text-zinc-900 dark:text-white font-mono">{daysCount}</span>
                    <button 
                      onClick={() => setDaysCount(Math.min(14, daysCount + 1))}
                      className="w-8 h-8 rounded-xl bg-white dark:bg-zinc-700 border border-zinc-200 dark:border-zinc-600 font-bold text-zinc-700 dark:text-zinc-200 flex items-center justify-center hover:bg-zinc-100 cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                  {/* Quick days pills */}
                  <div className="flex justify-between gap-1 pt-1">
                    {[3, 5, 7, 10].map(d => (
                      <button
                        key={d}
                        onClick={() => setDaysCount(d)}
                        className={`text-[10px] font-bold py-0.5 px-1.5 rounded-md transition-all cursor-pointer ${
                          daysCount === d ? 'bg-[#E07A5F] text-white' : 'bg-zinc-200/60 dark:bg-zinc-700/50 text-zinc-500 hover:text-zinc-900 dark:hover:text-white'
                        }`}
                      >
                        {d}d
                      </button>
                    ))}
                  </div>
                </div>

                {/* Meals per day (Coverage) */}
                <div className="p-3.5 bg-zinc-50/80 dark:bg-zinc-800/60 rounded-2xl border border-zinc-200/80 dark:border-zinc-700/60 space-y-2">
                  <span className="text-xs font-bold text-zinc-700 dark:text-zinc-300 block">Tomas / Día:</span>
                  <div className="flex flex-col gap-1.5">
                    <button
                      onClick={() => setMealCoverage('lunches')}
                      className={`py-1 px-2 rounded-xl text-[11px] font-bold transition-all flex items-center justify-between cursor-pointer ${
                        mealCoverage === 'lunches' 
                          ? 'bg-[#E07A5F] text-white shadow-xs' 
                          : 'bg-white dark:bg-zinc-700 text-zinc-600 dark:text-zinc-300'
                      }`}
                    >
                      <span>Solo Comidas</span>
                      <Sun size={12} />
                    </button>
                    <button
                      onClick={() => setMealCoverage('dinners')}
                      className={`py-1 px-2 rounded-xl text-[11px] font-bold transition-all flex items-center justify-between cursor-pointer ${
                        mealCoverage === 'dinners' 
                          ? 'bg-[#E07A5F] text-white shadow-xs' 
                          : 'bg-white dark:bg-zinc-700 text-zinc-600 dark:text-zinc-300'
                      }`}
                    >
                      <span>Solo Cenas</span>
                      <Moon size={12} />
                    </button>
                    <button
                      onClick={() => setMealCoverage('both')}
                      className={`py-1 px-2 rounded-xl text-[11px] font-bold transition-all flex items-center justify-between cursor-pointer ${
                        mealCoverage === 'both' 
                          ? 'bg-[#E07A5F] text-white shadow-xs' 
                          : 'bg-white dark:bg-zinc-700 text-zinc-600 dark:text-zinc-300'
                      }`}
                    >
                      <span>Comida + Cena</span>
                      <span className="text-[9px] bg-white/20 px-1 rounded">2 tomas</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* 2. Preferencia de Variedad & Repetición de Recetas */}
            <div className="glass-surface rounded-3xl p-5 border border-zinc-200 dark:border-white/10 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="text-xs font-bold uppercase tracking-wider text-[#E07A5F] flex items-center gap-2">
                  <Layers size={15} />
                  <span>2. Variedad & Repetición de Platos</span>
                </h2>
                <span className="text-xs font-mono font-bold text-zinc-500">
                  {structure.dishCount} recetas distintas
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {[
                  {
                    id: 'max_efficiency' as const,
                    title: '⚡ Máxima Eficiencia',
                    desc: 'Menos recetas, lotes más grandes. Cada plato se come ~2.5 veces. Cocinado más rápido.'
                  },
                  {
                    id: 'balanced' as const,
                    title: '⭐ Equilibrado (Recomendado)',
                    desc: 'Variedad óptima. Cada receta se repite 2 veces en el ciclo. Balance perfecto.'
                  },
                  {
                    id: 'high_variety' as const,
                    title: '🌟 Alta Variedad Gourmet',
                    desc: 'Más recetas distintas. Menos repetición (1-1.5 tomas por plato). Máxima frescura.'
                  }
                ].map(v => (
                  <button
                    key={v.id}
                    onClick={() => setVarietyPreference(v.id)}
                    className={`p-3 rounded-2xl border text-left transition-all flex flex-col justify-between cursor-pointer ${
                      varietyPreference === v.id
                        ? 'bg-[#E07A5F]/15 border-[#E07A5F] text-zinc-900 dark:text-white shadow-xs'
                        : 'bg-zinc-50/80 dark:bg-zinc-800/50 border-zinc-200/80 dark:border-zinc-700/60 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100'
                    }`}
                  >
                    <div>
                      <span className={`text-xs font-black block ${varietyPreference === v.id ? 'text-[#E07A5F]' : ''}`}>
                        {v.title}
                      </span>
                      <p className="text-[10px] text-zinc-500 dark:text-zinc-400 mt-1 leading-tight">
                        {v.desc}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Estilo Culinario */}
            <div className="glass-surface rounded-3xl p-5 border border-zinc-200 dark:border-white/10 shadow-xs space-y-3">
              <h2 className="text-xs font-bold uppercase tracking-wider text-[#E07A5F] flex items-center gap-2">
                <ChefHat size={15} />
                <span>3. Estilo Gastronómico de la Sesión</span>
              </h2>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {[
                  { id: 'mediterranean' as const, label: 'Mediterránea', desc: 'Legumbres, carnes magras, verduras' },
                  { id: 'fitness' as const, label: 'Fitness & Proteico', desc: 'Aves, salmón, batata, verduras' },
                  { id: 'veggie' as const, label: '100% Vegetal', desc: 'Currys, legumbres, cremas' },
                  { id: 'lowcarb' as const, label: 'Low Carb / Keto', desc: 'Guisos sin féculas, pescados' },
                  { id: 'traditional' as const, label: 'Tradicional', desc: 'Guisos de cuchara y asados' }
                ].map(style => (
                  <button
                    key={style.id}
                    onClick={() => setDietStyle(style.id)}
                    className={`p-2.5 rounded-2xl border text-left transition-all flex flex-col justify-between cursor-pointer ${
                      dietStyle === style.id
                        ? 'bg-[#E07A5F] text-white border-[#E07A5F] shadow-xs'
                        : 'bg-zinc-50/80 dark:bg-zinc-800/50 border-zinc-200/80 dark:border-zinc-700/60 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100'
                    }`}
                  >
                    <span className="text-xs font-black block leading-tight">{style.label}</span>
                    <span className={`text-[9px] mt-1 leading-tight ${dietStyle === style.id ? 'text-white/80' : 'text-zinc-500'}`}>
                      {style.desc}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* 4. Preferencias & Despensa */}
            <div className="glass-surface rounded-3xl p-5 border border-zinc-200 dark:border-white/10 shadow-xs space-y-3">
              <h2 className="text-xs font-bold uppercase tracking-wider text-[#E07A5F] flex items-center gap-2">
                <MessageSquare size={15} />
                <span>4. Peticiones Especiales & Aprovechamiento de Despensa</span>
              </h2>

              <div className="space-y-3">
                <input
                  type="text"
                  value={cravings}
                  onChange={(e) => setCravings(e.target.value)}
                  placeholder="Ej. Mucha calabaza, sin picante, legumbres tiernas..."
                  className="w-full p-3 text-xs rounded-xl glass-surface text-zinc-900 dark:text-white focus:outline-none focus:border-[#E07A5F]"
                />

                <label className="flex items-center gap-2.5 p-3 rounded-xl bg-zinc-50/80 dark:bg-zinc-800/50 border border-zinc-200/80 dark:border-zinc-700/60 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={includeFridge}
                    onChange={(e) => setIncludeFridge(e.target.checked)}
                    className="w-4 h-4 accent-[#E07A5F] rounded"
                  />
                  <div className="text-xs">
                    <strong className="text-zinc-900 dark:text-white">Aprovechamiento Zero Waste (Descontar de Despensa)</strong>
                    <p className="text-zinc-500 dark:text-zinc-400 text-[11px]">
                      Cruzar automáticamente con el stock de tu despensa para no comprar ingredientes que ya tienes.
                    </p>
                  </div>
                </label>
              </div>
            </div>

          </div>

          {/* Right Summary Sidebar (1 col) */}
          <div className="space-y-4">
            <div className="glass-surface-elevated rounded-3xl p-6 border border-[#E07A5F]/30 space-y-5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-[#E07A5F]">
                  Matriz de Producción TouChef
                </span>
                <Sparkles size={16} className="text-[#E07A5F]" />
              </div>

              {/* LIVE METRICS BREAKDOWN */}
              <div className="space-y-2.5">
                <div className="p-3 bg-zinc-100/90 dark:bg-zinc-900/60 rounded-2xl border border-zinc-200/80 dark:border-white/10 flex justify-between items-center shadow-xs">
                  <div>
                    <span className="text-xs font-bold text-zinc-700 dark:text-zinc-300 block">Raciones Individuales:</span>
                    <span className="text-[10px] text-zinc-500">{peopleCount} personas × {structure.totalFamilyMeals} tomas</span>
                  </div>
                  <span className="text-xl font-black text-[#E07A5F] font-mono">{structure.totalIndividualServings} rac</span>
                </div>

                <div className="p-3 bg-zinc-100/90 dark:bg-zinc-900/60 rounded-2xl border border-zinc-200/80 dark:border-white/10 flex justify-between items-center shadow-xs">
                  <div>
                    <span className="text-xs font-bold text-zinc-700 dark:text-zinc-300 block">Servicios Familiares:</span>
                    <span className="text-[10px] text-zinc-500">
                      {mealCoverage === 'both' ? `${daysCount} almuerzos + ${daysCount} cenas` : `${daysCount} tomas`}
                    </span>
                  </div>
                  <span className="text-sm font-bold text-zinc-900 dark:text-white font-mono">{structure.totalFamilyMeals} tomas</span>
                </div>

                <div className="p-3 bg-zinc-100/90 dark:bg-zinc-900/60 rounded-2xl border border-zinc-200/80 dark:border-white/10 flex justify-between items-center shadow-xs">
                  <div>
                    <span className="text-xs font-bold text-zinc-700 dark:text-zinc-300 block">Recetas Coordinadas:</span>
                    <span className="text-[10px] text-zinc-500">~{structure.averageRepetition} tomas por receta</span>
                  </div>
                  <span className="text-sm font-bold text-zinc-900 dark:text-white font-mono">{structure.dishCount} platos</span>
                </div>

                <div className="p-3 bg-zinc-100/90 dark:bg-zinc-900/60 rounded-2xl border border-zinc-200/80 dark:border-white/10 flex justify-between items-center shadow-xs">
                  <span className="text-xs font-bold text-zinc-700 dark:text-zinc-300">Tiempo Sesión Paralela:</span>
                  <span className="text-sm font-bold text-[#84A98C] font-mono">~{structure.estimatedCookTimeFormatted}</span>
                </div>

                <div className="p-3 bg-zinc-100/90 dark:bg-zinc-900/60 rounded-2xl border border-zinc-200/80 dark:border-white/10 flex justify-between items-center shadow-xs">
                  <span className="text-xs font-bold text-zinc-700 dark:text-zinc-300">Tiempo Libre Ganado:</span>
                  <span className="text-sm font-bold text-[#84A98C] font-mono">+{structure.hoursSavedWeekly}h de L a V</span>
                </div>
              </div>

              {/* GENERATE CTA BUTTON */}
              <button
                onClick={handleGenerate}
                disabled={isGenerating}
                className="w-full py-4 btn-hero-copper text-white font-black text-sm rounded-2xl shadow-md transition-all flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50 cursor-pointer"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw size={16} className="animate-spin" />
                    <span>Orquestando {structure.totalIndividualServings} Raciones...</span>
                  </>
                ) : (
                  <>
                    <Sparkles size={18} />
                    <span>Planificar Sesión Inteligente</span>
                    <ArrowRight size={16} />
                  </>
                )}
              </button>

              {isGenerating && (
                <div className="space-y-2 pt-2">
                  <div className="w-full bg-zinc-800 rounded-full h-2 overflow-hidden">
                    <div 
                      className="bg-[#E07A5F] h-full rounded-full transition-all duration-300"
                      style={{ width: `${generationProgress}%` }}
                    />
                  </div>
                  <p className="text-[11px] text-zinc-400 text-center font-mono">
                    {generationStatusText}
                  </p>
                </div>
              )}
            </div>
          </div>

        </div>
      )}

      {/* STEP 2: GENERATED PLAN OVERVIEW */}
      {currentStep === 2 && generatedPlan && (
        <div className="space-y-5 animate-slide-up">
          
          <div className="glass-surface-elevated rounded-3xl p-6 border border-zinc-200 dark:border-white/10 shadow-xs space-y-5">
            
            {/* Summary Top Banner */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-100 dark:border-zinc-800 pb-5">
              <div>
                <span className="text-[10px] font-bold text-[#E07A5F] uppercase bg-[#E07A5F]/15 px-3 py-1 rounded-full border border-[#E07A5F]/25">
                  {generatedDishes.length} Recetas Coordinadas • {structure.totalIndividualServings} Raciones ({peopleCount} comensales)
                </span>
                <h2 className="text-xl font-display font-black text-zinc-900 dark:text-white mt-2">
                  {generatedPlan.title}
                </h2>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                  Tiempo de cocción en paralelo: <strong>{generatedPlan.batchCookingSummary.totalTime}</strong> • Frecuencia media: <strong>~{structure.averageRepetition} tomas por plato</strong>
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentStep(1)}
                  className="px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 text-xs font-bold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer"
                >
                  Ajustar Parámetros
                </button>

                <button
                  onClick={handleApproveAndSave}
                  className="btn-hero-copper font-bold text-xs px-5 py-2.5 rounded-xl shadow-xs transition-all flex items-center gap-2 active:scale-95 cursor-pointer"
                >
                  <Check size={16} />
                  <span>Aprobar y Generar Compra</span>
                </button>
              </div>
            </div>

            {/* Dynamic Dishes Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {generatedDishes.map((dish, idx) => {
                const isLunch = dish.category === 'legumbres' || dish.category === 'carnes' || dish.category === 'acompanamientos';
                const familyMealsForThis = Math.round(dish.servings / peopleCount);

                return (
                  <div 
                    key={dish.id || idx}
                    className="bg-zinc-50/80 dark:bg-zinc-800/60 rounded-2xl border border-zinc-200/80 dark:border-zinc-700/80 p-5 space-y-3 flex flex-col justify-between"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-1.5">
                          <span className={`text-[10px] font-black px-2.5 py-0.5 rounded-md uppercase ${
                            isLunch ? 'bg-amber-500/15 text-amber-600 dark:text-amber-400' : 'bg-indigo-500/15 text-indigo-600 dark:text-indigo-400'
                          }`}>
                            {isLunch ? '☀️ Almuerzo' : '🌙 Cena Ligera'}
                          </span>
                          <span className="text-[10px] font-bold text-zinc-400 uppercase bg-zinc-200 dark:bg-zinc-700 px-2 py-0.5 rounded">
                            {dish.cookingMethod.replace('_', ' ')}
                          </span>
                        </div>
                        <span className="text-xs font-mono font-black text-[#E07A5F]">
                          {dish.servings} raciones ({familyMealsForThis} tomas)
                        </span>
                      </div>

                      <h3 className="text-sm font-bold text-zinc-900 dark:text-white leading-snug">
                        {dish.name}
                      </h3>

                      <div className="text-xs text-zinc-500 dark:text-zinc-400 space-y-1 pt-1">
                        <p className="font-semibold text-zinc-700 dark:text-zinc-300">Ingredientes Principales ({dish.servings}p):</p>
                        <ul className="grid grid-cols-2 gap-1 text-[11px]">
                          {dish.ingredients.map((ing, i) => (
                            <li key={i} className="truncate">
                              • {ing.name}: <strong>{ing.quantity} {ing.unit}</strong>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-zinc-200/60 dark:border-zinc-700/60 text-[11px] text-zinc-500 flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <Clock size={13} className="text-[#E07A5F] shrink-0" />
                        <span>{dish.prepTime}</span>
                      </div>
                      <div className="flex items-center gap-1 text-[10px] text-zinc-400">
                        <Refrigerator size={12} className="text-[#52796F]" />
                        <span>{dish.storageAdvice}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom Final CTA */}
            <div className="p-5 bg-[#E07A5F]/10 border border-[#E07A5F]/25 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-zinc-300 space-y-0.5">
                <strong className="text-white block">¿Listo para el siguiente paso?</strong>
                <span>Al aprobar se generará tu cesta de compra optimizada descontando lo que ya tienes en la despensa.</span>
              </div>

              <button
                onClick={handleApproveAndSave}
                className="w-full sm:w-auto px-6 py-3.5 btn-hero-copper font-black text-xs rounded-2xl shadow-md transition-all flex items-center justify-center gap-2 active:scale-95 shrink-0 cursor-pointer"
              >
                <Check size={16} />
                <span>Aprobar y Generar Lista de Compra</span>
                <ArrowRight size={16} />
              </button>
            </div>

          </div>

        </div>
      )}

    </div>
  );
}
