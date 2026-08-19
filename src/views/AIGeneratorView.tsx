import React, { useState, useMemo, useEffect } from 'react';
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
  SlidersHorizontal,
  Search,
  BookOpen,
  ArrowLeft,
  Layers,
  FileText,
  BadgeCheck,
  CheckSquare,
  Square,
  HelpCircle,
  Video,
  Info
} from 'lucide-react';
import { 
  GeneratedMenuPlan, 
  MealPlanConfig, 
  BatchProject, 
  BatchDish, 
  BatchShoppingItem,
  ChefServicePackage 
} from '../types';
import { initialFridgeStock } from '../data';
import { PlanActionBridge } from '../components/PlanActionBridge';
import { 
  calculateBatchStructure, 
  generateDynamicBatchDishes,
  createDishFromCanonicalRecipe 
} from '../lib/batchEngine';
import { 
  CARMEN_RECIPES_DATABASE, 
  getFilteredCarmenRecipes, 
  CanonicalRecipe 
} from '../data/recipesCarmenDatabase';

interface AIGeneratorViewProps {
  onMenuApproved: (plan: GeneratedMenuPlan) => void;
  onNavigateToShopping: () => void;
  initialContext?: MealPlanConfig | null;
  onBatchProjectCreated?: (project: BatchProject) => void;
  onHireChefForBatch?: (project: BatchProject, servicePackage?: ChefServicePackage) => void;
  onCookMyself?: (project: BatchProject) => void;
}

type ProjectMode = 'batch_cooking' | 'single_recipe';

export function AIGeneratorView({ 
  onMenuApproved, 
  onNavigateToShopping, 
  initialContext, 
  onBatchProjectCreated, 
  onHireChefForBatch,
  onCookMyself
}: AIGeneratorViewProps) {
  
  // Wizard Step: 1 = Modo & Parámetros, 2 = Selección de Recetas (SSOT Carmen), 3 = Ficha Técnica & Ejecución
  const [wizardStep, setWizardStep] = useState<1 | 2 | 3>(1);
  const [projectMode, setProjectMode] = useState<ProjectMode>('batch_cooking');
  
  // Household parameters
  const [selectedArchetype, setSelectedArchetype] = useState<'familiar' | 'fitness' | 'gourmet' | 'custom'>('familiar');
  const [peopleCount, setPeopleCount] = useState<number>(initialContext?.peopleCount || 4);
  const [daysCount, setDaysCount] = useState<number>(initialContext?.daysCount || 5);
  const [mealCoverage, setMealCoverage] = useState<'lunches' | 'dinners' | 'both'>(initialContext?.mealCoverage || 'both');
  const [dietStyle, setDietStyle] = useState<'mediterranean' | 'fitness' | 'veggie' | 'lowcarb' | 'traditional'>(
    (initialContext?.dietStyle as any) || 'mediterranean'
  );
  const [varietyPreference, setVarietyPreference] = useState<'max_efficiency' | 'balanced' | 'high_variety'>('balanced');
  const [selectedAllergens, setSelectedAllergens] = useState<string[]>([]);
  const [includeFridge, setIncludeFridge] = useState<boolean>(true);

  // Single recipe mode state
  const [selectedSingleRecipe, setSelectedSingleRecipe] = useState<CanonicalRecipe | null>(CARMEN_RECIPES_DATABASE[0]);
  const [recipeSearchQuery, setRecipeSearchQuery] = useState<string>('');
  const [recipeCategoryFilter, setRecipeCategoryFilter] = useState<string>('all');

  // Batch manual / auto selection
  const [batchSelectionMode, setBatchSelectionMode] = useState<'auto' | 'manual'>('auto');
  const [manuallySelectedRecipeIds, setManuallySelectedRecipeIds] = useState<string[]>([
    'carmen-lentejas-chorizo',
    'carmen-pollo-pepitoria',
    'carmen-pisto-manchego',
    'carmen-crema-calabacin-suave',
    'carmen-croquetas-jamon-iberico'
  ]);

  // Generated state
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [generatedPlan, setGeneratedPlan] = useState<GeneratedMenuPlan | null>(null);
  const [generatedDishes, setGeneratedDishes] = useState<BatchDish[]>([]);

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

  // Available filtered recipes from Carmen SSOT
  const availableCarmenRecipes = useMemo(() => {
    return getFilteredCarmenRecipes({
      category: recipeCategoryFilter === 'all' ? undefined : (recipeCategoryFilter as any),
      excludedAllergens: selectedAllergens,
      searchQuery: recipeSearchQuery
    });
  }, [recipeCategoryFilter, selectedAllergens, recipeSearchQuery]);

  const toggleAllergen = (allergen: string) => {
    setSelectedAllergens(prev => 
      prev.includes(allergen) ? prev.filter(a => a !== allergen) : [...prev, allergen]
    );
  };

  const toggleManualRecipe = (recipeId: string) => {
    setManuallySelectedRecipeIds(prev => 
      prev.includes(recipeId) ? prev.filter(id => id !== recipeId) : [...prev, recipeId]
    );
  };

  // BUILD FINAL BATCH OR RECIPE DISHES
  const handleProceedToTechnicalReview = () => {
    setIsGenerating(true);

    if (projectMode === 'single_recipe' && selectedSingleRecipe) {
      const singleDish = createDishFromCanonicalRecipe(selectedSingleRecipe, peopleCount);
      setGeneratedDishes([singleDish]);

      const plan: GeneratedMenuPlan = {
        id: `plan-recipe-${Date.now()}`,
        title: `${selectedSingleRecipe.shortName} (${peopleCount} Raciones)`,
        philosophy: `Receta tradicional maestra de Cocina con Carmen elaborada con ${peopleCount} raciones individuales ajustadas.`,
        macrosTarget: { protein: '25%', carbs: '45%', fats: '30%' },
        meals: [],
        batchCookingSummary: {
          totalTime: selectedSingleRecipe.prepTimeFormatted,
          parallelSteps: [
            'Mise en place de ingredientes con gramaje exacto de Carmen.',
            `Cocción en estación térmica principal: ${selectedSingleRecipe.station}.`,
            selectedSingleRecipe.storageAdvice
          ]
        }
      };

      setGeneratedPlan(plan);
      onMenuApproved(plan);
    } else {
      // BATCH COOKING MODE
      let dishes: BatchDish[] = [];
      if (batchSelectionMode === 'auto') {
        dishes = generateDynamicBatchDishes(
          { peopleCount, daysCount, mealCoverage, dietStyle, varietyPreference },
          selectedAllergens
        );
      } else {
        // Build from manual selection
        const targetServingsPerDish = Math.max(2, Math.ceil(structure.totalIndividualServings / Math.max(1, manuallySelectedRecipeIds.length)));
        dishes = manuallySelectedRecipeIds.map(id => {
          const rec = CARMEN_RECIPES_DATABASE.find(r => r.id === id) || CARMEN_RECIPES_DATABASE[0];
          return createDishFromCanonicalRecipe(rec, targetServingsPerDish);
        });
      }

      setGeneratedDishes(dishes);

      const plan: GeneratedMenuPlan = {
        id: `plan-batch-${Date.now()}`,
        title: `Plan Batch Cooking ${dietStyle.toUpperCase()} (${structure.totalIndividualServings} Raciones)`,
        philosophy: `Estructura optimizada para ${peopleCount} personas durante ${daysCount} días. ${dishes.length} recetas de Cocina con Carmen coordinadas en paralelo.`,
        macrosTarget: {
          protein: dietStyle === 'fitness' ? '30%' : '20%',
          carbs: dietStyle === 'lowcarb' ? '15%' : '45%',
          fats: '35%'
        },
        meals: [],
        batchCookingSummary: {
          totalTime: structure.estimatedCookTimeFormatted,
          parallelSteps: [
            'Mise en place unificada: Picar y pesar todos los ingredientes antes de encender fogones.',
            'Cocción concurrente: Olla rápida, fuegos y horno en paralelo.',
            'Envasado hermético: Nevera (días 1-3) y congelador (días 4+) en fiambreras de cristal.'
          ]
        }
      };

      setGeneratedPlan(plan);
      onMenuApproved(plan);
    }

    setIsGenerating(false);
    setWizardStep(3);
  };

  // HELPER TO CREATE THE BATCH PROJECT OBJECT
  const createBatchProjectFromState = (status: BatchProject['status'] = 'planning'): BatchProject => {
    const shoppingMap = new Map<string, BatchShoppingItem>();

    generatedDishes.forEach(dish => {
      dish.ingredients.forEach(ing => {
        const pantryMatch = includeFridge 
          ? initialFridgeStock.find(item => item.name.toLowerCase() === ing.name.toLowerCase())
          : undefined;

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
      item.toBuyQty = Math.round(needed * 100) / 100;
    });

    const totalServ = generatedDishes.reduce((acc, d) => acc + d.servings, 0);

    return {
      id: `batch-${Date.now()}`,
      title: generatedPlan ? generatedPlan.title : `Sesión Culinaria (${totalServ} raciones)`,
      status,
      createdAt: new Date().toISOString(),
      plannedShoppingDate: new Date().toISOString().split('T')[0],
      peopleCount,
      daysCount: projectMode === 'single_recipe' ? 1 : daysCount,
      mealCoverage,
      dietStyle,
      totalServings: totalServ,
      dishes: generatedDishes,
      shoppingList: Array.from(shoppingMap.values()),
      totalCookingTime: projectMode === 'single_recipe' 
        ? (selectedSingleRecipe?.prepTimeFormatted || '30 min') 
        : structure.estimatedCookTimeFormatted,
      hoursSavedWeekly: projectMode === 'single_recipe' ? 1.5 : structure.hoursSavedWeekly,
      totalConsumedServings: 0
    };
  };

  const handleExecuteCookMyself = () => {
    const project = createBatchProjectFromState('planning');
    if (onBatchProjectCreated) onBatchProjectCreated(project);
    if (onCookMyself) onCookMyself(project);
    else onNavigateToShopping();
  };

  const handleExecuteHireChef = (pkg: ChefServicePackage = 'with_grocery') => {
    const project = createBatchProjectFromState('planning');
    if (onBatchProjectCreated) onBatchProjectCreated(project);
    if (onHireChefForBatch) onHireChefForBatch(project, pkg);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8 animate-fade-in pb-20 text-zinc-900 dark:text-zinc-100">
      
      {/* ========================================================================= */}
      {/* WIZARD PROGRESS HEADER                                                    */}
      {/* ========================================================================= */}
      <div className="glass-surface-elevated rounded-3xl p-5 sm:p-6 border border-zinc-200/80 dark:border-white/10 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#E07A5F] text-white flex items-center justify-center font-bold text-xl shadow-md">
              <Sparkles size={24} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-wider bg-[#E07A5F]/15 text-[#E07A5F] px-2.5 py-0.5 rounded-full">
                  Asistente Culinario Paso a Paso
                </span>
                <span className="text-[10px] font-black uppercase bg-amber-500/15 text-amber-600 dark:text-amber-400 px-2.5 py-0.5 rounded-full border border-amber-500/30">
                  SSOT: Recetario Carmen
                </span>
              </div>
              <h1 className="text-xl font-black text-zinc-900 dark:text-white mt-0.5">
                {wizardStep === 1 && '1. Tipo de Proyecto & Dimensiones del Hogar'}
                {wizardStep === 2 && (projectMode === 'batch_cooking' ? '2. Selección de Platos para tu Lote Semanal' : '2. Selección de Receta Magistral de Carmen')}
                {wizardStep === 3 && '3. Ficha Técnica, Ingredientes & Modo de Ejecución'}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {[1, 2, 3].map(step => (
              <div
                key={step}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black transition-all ${
                  wizardStep === step 
                    ? 'btn-hero-copper text-white shadow-xs' 
                    : wizardStep > step
                      ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30'
                      : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-400'
                }`}
              >
                {wizardStep > step ? <Check size={13} /> : <span>Paso {step}</span>}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* STEP 1: PROJECT MODE & HOUSEHOLD SETUP                                    */}
      {/* ========================================================================= */}
      {wizardStep === 1 && (
        <div className="glass-surface-elevated rounded-3xl p-6 sm:p-8 border border-zinc-200/80 dark:border-white/10 shadow-xl space-y-8">
          
          {/* A. PROJECT TYPE SELECTOR (BATCH COOKING VS SINGLE RECIPE) */}
          <div className="space-y-3">
            <span className="text-[11px] font-black uppercase tracking-wider text-[#E07A5F] block">
              A. ¿Qué deseas preparar en este proyecto?
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Mode 1: Batch Cooking */}
              <div
                onClick={() => setProjectMode('batch_cooking')}
                className={`p-5 rounded-2xl border-2 cursor-pointer transition-all space-y-2.5 relative ${
                  projectMode === 'batch_cooking'
                    ? 'border-[#E07A5F] bg-[#E07A5F]/10 shadow-md'
                    : 'border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-zinc-300 dark:hover:border-zinc-700'
                }`}
              >
                {projectMode === 'batch_cooking' && (
                  <span className="absolute top-3 right-3 text-[#E07A5F]"><CheckCircle2 size={18} /></span>
                )}
                <div className="w-10 h-10 rounded-xl bg-[#E07A5F]/20 text-[#E07A5F] flex items-center justify-center font-bold">
                  <Layers size={20} />
                </div>
                <strong className="text-sm font-black text-zinc-900 dark:text-white block">
                  🍲 Plan Maestro de Batch Cooking
                </strong>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Cocina 1 solo día en paralelo para cubrir todas las comidas y cenas de tu semana. Optimización de fuegos, raciones y tuppers.
                </p>
              </div>

              {/* Mode 2: Single Recipe */}
              <div
                onClick={() => setProjectMode('single_recipe')}
                className={`p-5 rounded-2xl border-2 cursor-pointer transition-all space-y-2.5 relative ${
                  projectMode === 'single_recipe'
                    ? 'border-[#E07A5F] bg-[#E07A5F]/10 shadow-md'
                    : 'border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-zinc-300 dark:hover:border-zinc-700'
                }`}
              >
                {projectMode === 'single_recipe' && (
                  <span className="absolute top-3 right-3 text-[#E07A5F]"><CheckCircle2 size={18} /></span>
                )}
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
                  <Utensils size={20} />
                </div>
                <strong className="text-sm font-black text-zinc-900 dark:text-white block">
                  🥘 Receta Individual de Alta Cocina
                </strong>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Prepara o encarga una receta canónica específica de Carmen (guiso, arroz caldoso, merluza, lasaña) con gramajes milimétricos.
                </p>
              </div>

            </div>
          </div>

          {/* B. HOUSEHOLD CONFIGURATION */}
          <div className="space-y-4 pt-4 border-t border-zinc-100 dark:border-zinc-800">
            <span className="text-[11px] font-black uppercase tracking-wider text-[#E07A5F] block">
              B. Comensales y Dimensiones
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              
              {/* Comensales */}
              <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-850 border border-zinc-200 dark:border-zinc-800 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5">
                    <Users size={14} className="text-[#E07A5F]" /> Comensales / Personas:
                  </span>
                  <strong className="font-mono text-[#E07A5F] font-black text-sm">{peopleCount}</strong>
                </div>
                <input
                  type="range"
                  min={1}
                  max={8}
                  value={peopleCount}
                  onChange={(e) => setPeopleCount(Number(e.target.value))}
                  className="w-full accent-[#E07A5F] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-zinc-400 font-mono">
                  <span>1 pers.</span>
                  <span>4 familiar</span>
                  <span>8 comilona</span>
                </div>
              </div>

              {/* Días (solo para Batch Cooking) */}
              {projectMode === 'batch_cooking' && (
                <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-850 border border-zinc-200 dark:border-zinc-800 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5">
                      <Calendar size={14} className="text-[#E07A5F]" /> Días de Cobertura:
                    </span>
                    <strong className="font-mono text-[#E07A5F] font-black text-sm">{daysCount} días</strong>
                  </div>
                  <input
                    type="range"
                    min={2}
                    max={7}
                    value={daysCount}
                    onChange={(e) => setDaysCount(Number(e.target.value))}
                    className="w-full accent-[#E07A5F] cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-zinc-400 font-mono">
                    <span>2 días</span>
                    <span>5 laborables</span>
                    <span>7 semana</span>
                  </div>
                </div>
              )}

              {/* Estilo Culinario */}
              <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-850 border border-zinc-200 dark:border-zinc-800 space-y-2">
                <span className="font-bold text-xs text-zinc-700 dark:text-zinc-300 block">
                  Estilo Culinario Base:
                </span>
                <select
                  value={dietStyle}
                  onChange={(e) => setDietStyle(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-xs font-bold text-zinc-800 dark:text-zinc-200 focus:outline-none cursor-pointer"
                >
                  <option value="mediterranean">Mediterránea de Carmen</option>
                  <option value="traditional">Tradicional y Guisos de la Abuela</option>
                  <option value="fitness">Fitness High Protein</option>
                  <option value="veggie">Vegetariana & Legumbres</option>
                  <option value="lowcarb">Low Carb & Pescados</option>
                </select>
              </div>

            </div>
          </div>

          {/* C. ALÉRGENOS & DEDUCCIÓN DE DESPENSA */}
          <div className="space-y-3 pt-4 border-t border-zinc-100 dark:border-zinc-800">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-black uppercase tracking-wider text-[#E07A5F]">
                C. Alérgenos y Restricciones a Excluir
              </span>
              <label className="flex items-center gap-2 text-xs font-bold text-zinc-600 dark:text-zinc-400 cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeFridge}
                  onChange={(e) => setIncludeFridge(e.target.checked)}
                  className="accent-[#E07A5F] rounded-md"
                />
                <span>Descontar ingredientes existentes en mi despensa</span>
              </label>
            </div>

            <div className="flex flex-wrap gap-2">
              {[
                'Gluten',
                'Lácteos',
                'Huevos',
                'Pescado',
                'Crustáceos',
                'Moluscos',
                'Frutos de cáscara',
                'Sulfitos',
                'Soja'
              ].map(allergen => {
                const isExcluded = selectedAllergens.includes(allergen);
                return (
                  <button
                    key={allergen}
                    type="button"
                    onClick={() => toggleAllergen(allergen)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      isExcluded 
                        ? 'bg-rose-500/20 text-rose-600 dark:text-rose-400 border border-rose-500/40'
                        : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
                    }`}
                  >
                    {isExcluded ? `✕ Sin ${allergen}` : `Apto ${allergen}`}
                  </button>
                );
              })}
            </div>
          </div>

          {/* STEP 1 NEXT BUTTON */}
          <div className="pt-4 flex justify-end">
            <button
              onClick={() => setWizardStep(2)}
              className="btn-hero-copper text-white font-bold text-xs px-6 py-3 rounded-2xl flex items-center gap-2 cursor-pointer shadow-md hover:scale-[1.02] transition-transform"
            >
              <span>Continuar a Selección de Recetas</span>
              <ArrowRight size={16} />
            </button>
          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* STEP 2: RECIPES EXPLORATION & SELECTION (SSOT DOCS/FUENTES)               */}
      {/* ========================================================================= */}
      {wizardStep === 2 && (
        <div className="glass-surface-elevated rounded-3xl p-6 sm:p-8 border border-zinc-200/80 dark:border-white/10 shadow-xl space-y-6">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-zinc-100 dark:border-zinc-800">
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-[#E07A5F]">
                {projectMode === 'batch_cooking' ? 'Lote de Recetas en Concurrencia' : 'Receta Canónica de Carmen'}
              </span>
              <h3 className="text-lg font-black text-zinc-900 dark:text-white mt-0.5">
                {projectMode === 'batch_cooking' 
                  ? 'Configura las recetas de tu menú semanal' 
                  : 'Elige la receta que deseas preparar o encargar'}
              </h3>
            </div>

            {projectMode === 'batch_cooking' && (
              <div className="flex items-center gap-2 bg-zinc-100 dark:bg-zinc-800 p-1 rounded-xl">
                <button
                  onClick={() => setBatchSelectionMode('auto')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    batchSelectionMode === 'auto'
                      ? 'bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white shadow-xs'
                      : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-white'
                  }`}
                >
                  ✨ Selección Asistida por IA
                </button>
                <button
                  onClick={() => setBatchSelectionMode('manual')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    batchSelectionMode === 'manual'
                      ? 'bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white shadow-xs'
                      : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-white'
                  }`}
                >
                  📖 Selección Manual
                </button>
              </div>
            )}
          </div>

          {/* SEARCH & CATEGORY FILTERS */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
              <input
                type="text"
                placeholder="Buscar por plato, ingrediente (lentejas, pollo, merluza, calabacín)..."
                value={recipeSearchQuery}
                onChange={(e) => setRecipeSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 text-xs font-medium text-zinc-800 dark:text-zinc-200 focus:outline-none"
              />
            </div>

            <select
              value={recipeCategoryFilter}
              onChange={(e) => setRecipeCategoryFilter(e.target.value)}
              className="px-4 py-2.5 rounded-2xl bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 text-xs font-bold text-zinc-800 dark:text-zinc-200 focus:outline-none cursor-pointer"
            >
              <option value="all">Todas las Categorías (15 Compendios)</option>
              <option value="carnes">Aves &amp; Carnes Tradicionales</option>
              <option value="pescados">Pescados &amp; Mariscos de Lonja</option>
              <option value="legumbres">Legumbres &amp; Cuchara</option>
              <option value="verduras">Verduras &amp; Pistos de Huerta</option>
              <option value="cremas">Sopas &amp; Cremas</option>
              <option value="arroces_pastas">Arroces &amp; Pastas</option>
              <option value="tapas">Tapas &amp; Entrantes</option>
              <option value="masas">Masas &amp; Empanadas</option>
              <option value="postres">Postres de Cuchara</option>
            </select>
          </div>

          {/* RECIPES GRID VIEW */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[500px] overflow-y-auto pr-1">
            {availableCarmenRecipes.map(recipe => {
              const isSelectedSingle = projectMode === 'single_recipe' && selectedSingleRecipe?.id === recipe.id;
              const isSelectedManual = projectMode === 'batch_cooking' && manuallySelectedRecipeIds.includes(recipe.id);

              return (
                <div
                  key={recipe.id}
                  onClick={() => {
                    if (projectMode === 'single_recipe') {
                      setSelectedSingleRecipe(recipe);
                    } else if (batchSelectionMode === 'manual') {
                      toggleManualRecipe(recipe.id);
                    }
                  }}
                  className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex flex-col justify-between space-y-3 relative group overflow-hidden ${
                    isSelectedSingle || isSelectedManual
                      ? 'border-[#E07A5F] bg-[#E07A5F]/10 shadow-md ring-2 ring-[#E07A5F]/30'
                      : 'border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-zinc-300 dark:hover:border-zinc-700'
                  }`}
                >
                  <div className="space-y-2">
                    <div className="relative h-28 rounded-xl overflow-hidden">
                      <img src={recipe.image} alt={recipe.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                      <span className="absolute top-2 right-2 text-[10px] font-black uppercase px-2 py-0.5 rounded-md bg-stone-950/80 text-amber-300 backdrop-blur-xs">
                        {recipe.prepTimeFormatted}
                      </span>
                      <span className="absolute bottom-2 left-2 text-[9px] font-black uppercase px-2 py-0.5 rounded-md bg-stone-900/80 text-zinc-300">
                        {recipe.station}
                      </span>
                    </div>

                    <div>
                      <span className="text-[10px] font-bold text-[#E07A5F] uppercase block">
                        {recipe.category} · {recipe.sourceCompendium}
                      </span>
                      <strong className="text-xs font-black text-zinc-900 dark:text-white line-clamp-2 mt-0.5">
                        {recipe.name}
                      </strong>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between text-[11px]">
                    <span className="text-zinc-400">{recipe.shelfLifeDaysFridge}d en nevera</span>
                    {projectMode === 'single_recipe' ? (
                      <span className={`font-bold ${isSelectedSingle ? 'text-[#E07A5F]' : 'text-zinc-500'}`}>
                        {isSelectedSingle ? '✓ Seleccionada' : 'Elegir esta'}
                      </span>
                    ) : (
                      <span className={`font-bold ${isSelectedManual ? 'text-[#E07A5F]' : 'text-zinc-500'}`}>
                        {isSelectedManual ? '✓ En tu menú' : '+ Añadir'}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* STEP 2 ACTIONS */}
          <div className="pt-4 flex items-center justify-between border-t border-zinc-100 dark:border-zinc-800">
            <button
              onClick={() => setWizardStep(1)}
              className="px-4 py-2.5 rounded-xl text-xs font-bold text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white flex items-center gap-1.5 cursor-pointer"
            >
              <ArrowLeft size={16} />
              <span>Atrás</span>
            </button>

            <button
              onClick={handleProceedToTechnicalReview}
              className="btn-hero-copper text-white font-bold text-xs px-6 py-3 rounded-2xl flex items-center gap-2 cursor-pointer shadow-md hover:scale-[1.02] transition-transform"
            >
              <span>Generar Ficha Técnica &amp; Opciones de Encargo</span>
              <ArrowRight size={16} />
            </button>
          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* STEP 3: TECHNICAL SHEET & EXECUTION BIFURCATION                           */}
      {/* ========================================================================= */}
      {wizardStep === 3 && (
        <div className="space-y-6">
          
          {/* TECHNICAL SUMMARY CARD */}
          <div className="glass-surface-elevated rounded-3xl p-6 sm:p-8 border border-zinc-200/80 dark:border-white/10 shadow-xl space-y-6">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-zinc-100 dark:border-zinc-800">
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-emerald-600 dark:text-emerald-400 bg-emerald-500/15 px-2.5 py-0.5 rounded-full">
                  Ficha Técnica Consolidada (SSOT Cocina con Carmen)
                </span>
                <h2 className="text-xl font-black text-zinc-900 dark:text-white mt-1">
                  {generatedPlan?.title}
                </h2>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  {generatedPlan?.philosophy}
                </p>
              </div>

              <div className="flex items-center gap-3 font-mono text-xs">
                <div className="p-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-center">
                  <span className="text-zinc-400 block text-[10px]">Raciones</span>
                  <strong className="text-zinc-900 dark:text-white font-black text-sm">
                    {generatedDishes.reduce((a, b) => a + b.servings, 0)}
                  </strong>
                </div>
                <div className="p-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-center">
                  <span className="text-zinc-400 block text-[10px]">Recetas</span>
                  <strong className="text-zinc-900 dark:text-white font-black text-sm">
                    {generatedDishes.length}
                  </strong>
                </div>
              </div>
            </div>

            {/* DISHES LIST */}
            <div className="space-y-3">
              <span className="text-[11px] font-black uppercase tracking-wider text-[#E07A5F] block">
                Platos del Proyecto y Raciones Individuales:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {generatedDishes.map((dish, idx) => (
                  <div key={dish.id} className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-850 border border-zinc-200 dark:border-zinc-800 flex items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-3">
                      <img src={dish.image} alt={dish.name} className="w-12 h-12 rounded-xl object-cover" />
                      <div>
                        <strong className="font-bold text-zinc-900 dark:text-white block line-clamp-1">
                          {dish.name}
                        </strong>
                        <span className="text-[11px] text-zinc-500">
                          {dish.cookingMethod} · {dish.storageAdvice}
                        </span>
                      </div>
                    </div>
                    <div className="text-right font-mono font-black text-[#E07A5F] text-sm shrink-0">
                      {dish.servings} raciones
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* ===================================================================== */}
          {/* THE MASTER BIFURCATION (COOK MYSELF vs HIRE CHEF CON/SIN COMPRA)      */}
          {/* ===================================================================== */}
          <PlanActionBridge
            totalServings={generatedDishes.reduce((a, b) => a + b.servings, 0)}
            dishCount={generatedDishes.length}
            cookTime={structure.estimatedCookTimeFormatted}
            onCookMyself={handleExecuteCookMyself}
            onHireChef={handleExecuteHireChef}
            onSupermarketOrder={onNavigateToShopping}
          />

          {/* BACK BUTTON */}
          <div className="flex justify-start">
            <button
              onClick={() => setWizardStep(2)}
              className="px-4 py-2 rounded-xl text-xs font-bold text-zinc-500 hover:text-zinc-900 dark:hover:text-white flex items-center gap-1 cursor-pointer"
            >
              <ArrowLeft size={14} />
              <span>Volver a Modificar Selección</span>
            </button>
          </div>

        </div>
      )}

    </div>
  );
}
