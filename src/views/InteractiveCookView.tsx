import React, { useState, useEffect, useMemo } from 'react';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  CheckCircle2, 
  Clock, 
  Flame, 
  ArrowRight, 
  ArrowLeft, 
  Refrigerator, 
  Star, 
  Sparkles, 
  Layers, 
  Check, 
  RotateCcw,
  Snowflake,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  Mic,
  Zap,
  Award,
  Utensils,
  UtensilsCrossed,
  HelpCircle,
  Users,
  Search,
  FileText,
  Video,
  ListOrdered,
  ChefHat,
  Sliders,
  Scale,
  BellRing,
  Info,
  Maximize2,
  X
} from 'lucide-react';
import { BatchProject, BatchDish } from '../types';
import { 
  TRADITIONAL_RECIPES_DATABASE, 
  CanonicalRecipe,
  getFilteredTraditionalRecipes 
} from '../data/recipesTraditionalDatabase';

interface InteractiveCookViewProps {
  dishName?: string;
  recipeId?: string;
  selectedRecipeIds?: string[];
  peopleCount?: number;
  activeProject?: BatchProject | null;
  onBack: () => void;
  onFinishCooking?: () => void;
}

// Sonido nativo de alerta de temporizador usando Web Audio API
function playTimerAlertSound() {
  if (typeof window === 'undefined') return;
  try {
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(880, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(440, ctx.currentTime + 0.4);
    gain.gain.setValueAtTime(0.25, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.4);
  } catch (e) {}
}

export function InteractiveCookView({ 
  dishName,
  recipeId,
  selectedRecipeIds,
  peopleCount: initialPeopleCount,
  activeProject, 
  onBack,
  onFinishCooking 
}: InteractiveCookViewProps) {

  // 1. DETERMINE INITIAL RECIPES & ACTIVE RECIPE SELECTION
  const initialRecipes = useMemo<CanonicalRecipe[]>(() => {
    // A. If recipeId passed
    if (recipeId) {
      const found = TRADITIONAL_RECIPES_DATABASE.find(r => r.id === recipeId);
      if (found) return [found];
    }
    // B. If selectedRecipeIds passed
    if (selectedRecipeIds && selectedRecipeIds.length > 0) {
      const matched = TRADITIONAL_RECIPES_DATABASE.filter(r => selectedRecipeIds.includes(r.id));
      if (matched.length > 0) return matched;
    }
    // C. If activeProject passed
    if (activeProject && activeProject.dishes && activeProject.dishes.length > 0) {
      const matchedFromProject: CanonicalRecipe[] = [];
      for (const d of activeProject.dishes) {
        const found = TRADITIONAL_RECIPES_DATABASE.find(r => 
          r.name.toLowerCase() === d.name.toLowerCase() || 
          r.id === d.id
        );
        if (found) {
          matchedFromProject.push(found);
        } else {
          // Synthetic fallback based on dish
          matchedFromProject.push({
            id: d.id,
            name: d.name,
            shortName: d.name.split(' ')[0],
            category: (d.category as any) || 'carnes',
            mealType: 'lunch',
            station: (d.cookingMethod as any) || 'fuego_1',
            prepTimeFormatted: d.prepTime,
            prepTimeMinutes: parseInt(d.prepTime.match(/\d+/)?.[0] || '30', 10),
            shelfLifeDaysFridge: d.shelfLifeDaysFridge || 4,
            canFreeze: (d.freezerPortions ?? 0) > 0,
            storageAdvice: d.storageAdvice,
            suitableDiets: ['mediterranean'],
            allergens: [],
            image: d.image || '/assets/fuentes/cocina_tradicional/pollo_al_ajillo_portada.jpg',
            source: 'Cocina Tradicional',
            sourceCompendium: 'compendio_batch.md',
            ingredientsPerServing: d.ingredients.map(ing => ({
              name: ing.name,
              quantity: parseFloat((ing.quantity / (activeProject?.peopleCount || 4)).toFixed(2)) || 0.25,
              unit: ing.unit,
              category: 'frescos'
            })),
            instructions: [
              `Preparar y cortar en dados los ingredientes de ${d.name}.`,
              `Poner en la estación ${d.cookingMethod} con un hilo de AOVE y pochar a fuego medio.`,
              `Añadir el elemento principal, rectificar de sal y cocinar durante el tiempo indicado.`,
              `Dejar reposar 5 minutos, atemperar y envasar en recipiente de cristal hermético.`
            ],
            batchTip: d.storageAdvice
          });
        }
      }
      if (matchedFromProject.length > 0) return matchedFromProject;
    }
    // D. If dishName passed
    if (dishName) {
      const found = TRADITIONAL_RECIPES_DATABASE.find(r => r.name.toLowerCase().includes(dishName.toLowerCase()));
      if (found) return [found];
    }
    // E. Default starter selection from canonical database (e.g. Pollo en salsa tradicional)
    return [TRADITIONAL_RECIPES_DATABASE[0]];
  }, [recipeId, selectedRecipeIds, activeProject, dishName]);

  // STATE: Active recipes in the session
  const [cookingSessionRecipes, setCookingSessionRecipes] = useState<CanonicalRecipe[]>(initialRecipes);
  
  // STATE: Active focused single recipe (for Single Mode)
  const [focusedRecipeId, setFocusedRecipeId] = useState<string>(cookingSessionRecipes[0]?.id || TRADITIONAL_RECIPES_DATABASE[0].id);

  // STATE: Cooking Mode: 'batch_parallel' vs 'single_recipe'
  const [cookMode, setCookMode] = useState<'batch_parallel' | 'single_recipe'>(
    cookingSessionRecipes.length > 1 ? 'batch_parallel' : 'single_recipe'
  );

  // STATE: Servings / Comensales (Dynamic scaling)
  const [servings, setServings] = useState<number>(() => {
    if (initialPeopleCount) return initialPeopleCount;
    if (activeProject?.peopleCount) return activeProject.peopleCount;
    return 4;
  });

  // STATE: Navigation & Steps
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [completedSteps, setCompletedSteps] = useState<Record<number, boolean>>({});
  const [checkedIngredients, setCheckedIngredients] = useState<Record<string, boolean>>({});

  // STATE: Interactive Timers
  const [stepTimerSeconds, setStepTimerSeconds] = useState<number>(600); // 10 min default
  const [isStepTimerRunning, setIsStepTimerRunning] = useState<boolean>(false);

  // STATE: Speech & Modals
  const [isPlayingVoice, setIsPlayingVoice] = useState<boolean>(false);
  const [activeInfographicModal, setActiveInfographicModal] = useState<string | null>(null);
  const [isRecipePickerOpen, setIsRecipePickerOpen] = useState<boolean>(false);
  const [recipeSearchQuery, setRecipeSearchQuery] = useState<string>('');

  const currentFocusedRecipe = useMemo(() => {
    return cookingSessionRecipes.find(r => r.id === focusedRecipeId) || 
           TRADITIONAL_RECIPES_DATABASE.find(r => r.id === focusedRecipeId) || 
           cookingSessionRecipes[0];
  }, [cookingSessionRecipes, focusedRecipeId]);

  // Screen Wake Lock API (keeps screen on during cooking)
  useEffect(() => {
    if ('wakeLock' in navigator) {
      try {
        (navigator as any).wakeLock.request('screen').catch(() => {});
      } catch (e) {}
    }
  }, []);

  // Stop Speech on unmount
  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // FORMAT TIME mm:ss
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // STEP TIMER TICK
  useEffect(() => {
    let interval: any = null;
    if (isStepTimerRunning) {
      interval = setInterval(() => {
        setStepTimerSeconds(prev => {
          if (prev <= 1) {
            playTimerAlertSound();
            setIsStepTimerRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isStepTimerRunning]);

  // EXTRACT DYNAMIC STEPS FOR SINGLE RECIPE OR PARALLEL BATCH
  const stepsList = useMemo(() => {
    if (cookMode === 'single_recipe' && currentFocusedRecipe) {
      return currentFocusedRecipe.instructions.map((text, idx) => {
        // Detect minutes in step
        const matchMin = text.match(/(\d+)\s*(?:minutos|min|m\b)/i);
        const detectedSeconds = matchMin ? parseInt(matchMin[1], 10) * 60 : 300;

        // Associate photo step
        let photo = currentFocusedRecipe.image;
        if (idx === 0 && currentFocusedRecipe.stepPhotos?.ingredientes) {
          photo = currentFocusedRecipe.stepPhotos.ingredientes;
        } else if (idx === currentFocusedRecipe.instructions.length - 1 && currentFocusedRecipe.stepPhotos?.resultadoFinal) {
          photo = currentFocusedRecipe.stepPhotos.resultadoFinal;
        } else if (currentFocusedRecipe.stepPhotos?.elaboracion) {
          photo = currentFocusedRecipe.stepPhotos.elaboracion;
        }

        return {
          id: `step_${idx}`,
          stepNumber: idx + 1,
          title: idx === 0 
            ? `Paso 1: Mise en Place & Pesaje (${servings} raciones)` 
            : idx === currentFocusedRecipe.instructions.length - 1 
            ? `Paso ${idx + 1}: Emplatado, Textura & Conservación` 
            : `Paso ${idx + 1}: Elaboración en ${currentFocusedRecipe.station}`,
          instruction: text,
          durationSeconds: detectedSeconds,
          station: currentFocusedRecipe.station,
          photoUrl: photo,
          dishName: currentFocusedRecipe.name
        };
      });
    }

    // BATCH PARALLEL ORCHESTRATION PHASES
    const dishCount = cookingSessionRecipes.length;
    const names = cookingSessionRecipes.map(r => r.name).join(', ');
    const stationsUsed = Array.from(new Set(cookingSessionRecipes.map(r => r.station)));

    return [
      {
        id: 'phase_1_mise_en_place',
        stepNumber: 1,
        title: `1. Mise en Place Conjunta & Pesaje Escalonado (${servings} Comensales)`,
        instruction: `Pesar y cortar todos los ingredientes para los ${dishCount} platos (${names}). Separar verduras en cuencos por técnica (sofrito, guiso, asado) y racionar carnes/pescados adaptados a ${servings} personas antes de encender ningún fuego.`,
        durationSeconds: 900,
        station: 'Mesado y Tablas de Corte',
        photoUrl: cookingSessionRecipes[0]?.stepPhotos?.ingredientes || cookingSessionRecipes[0]?.image,
        dishName: 'Todos los platos del lote'
      },
      {
        id: 'phase_2_thermal_start',
        stepNumber: 2,
        title: `2. Encendido Concurrente de Estaciones (${stationsUsed.join(' + ')})`,
        instruction: `Arranque simultáneo: Precalentar el horno a 190°C si hay asados. Poner las ollas y sartenes a fuego medio-alto con AOVE para dorar las proteínas y sellar los jugos de cada preparación.`,
        durationSeconds: 600,
        station: 'Fuegos, Horno y Olla Simultáneos',
        photoUrl: cookingSessionRecipes[0]?.stepPhotos?.elaboracion || cookingSessionRecipes[0]?.image,
        dishName: 'Arranque multi-estación'
      },
      {
        id: 'phase_3_parallel_cooking',
        stepNumber: 3,
        title: `3. Cocción Activa, Desglasado y Adición de Caldos`,
        instruction: `Incorporar sofritos, verduras pochadas y fondos caseros según cada plato. Tapar la olla express si corresponde y regular el fuego a chup-chup constante para conseguir texturas melosas.`,
        durationSeconds: 1500,
        station: 'Cocción Concurrente',
        photoUrl: cookingSessionRecipes[1]?.stepPhotos?.elaboracion || cookingSessionRecipes[0]?.image,
        dishName: 'Guisos, Asados y Planchas'
      },
      {
        id: 'phase_4_binding_seasoning',
        stepNumber: 4,
        title: `4. Ligazón de Salsas, Majados y Punto de Sal`,
        instruction: `Añadir majados de ajo/perejil/frutos secos si aplica. Mover cazuelas en vaivén para emulsionar salsas verdes o pil-pil. Probar y ajustar punto de sal y pimienta.`,
        durationSeconds: 420,
        station: 'Ligazón & Reposo',
        photoUrl: cookingSessionRecipes[0]?.stepPhotos?.resultadoFinal || cookingSessionRecipes[0]?.image,
        dishName: 'Toques finales'
      },
      {
        id: 'phase_5_chilling_packaging',
        stepNumber: 5,
        title: `5. Abatimiento Rápido Cook & Chill y Envasado Hermético`,
        instruction: `Atemperar 15 min. Rellenar recipientes de cristal herméticos con cierre estanco. Rotular fechas y consumir Días 1-3 en nevera (4°C) o congelar raciones de los días posteriores.`,
        durationSeconds: 600,
        station: 'Envasado y Conservación',
        photoUrl: cookingSessionRecipes[cookingSessionRecipes.length - 1]?.stepPhotos?.resultadoFinal || cookingSessionRecipes[0]?.image,
        dishName: 'Batch Cooking Finalizado'
      }
    ];
  }, [cookMode, currentFocusedRecipe, cookingSessionRecipes, servings]);

  // CURRENT ACTIVE STEP OBJECT
  const activeStep = stepsList[currentStepIndex] || stepsList[0];

  // Auto-sync step timer when step changes
  useEffect(() => {
    if (activeStep) {
      setStepTimerSeconds(activeStep.durationSeconds);
      setIsStepTimerRunning(false);
    }
  }, [currentStepIndex, cookMode, focusedRecipeId]);

  // SPEECH TEXT-TO-SPEECH
  const handleToggleVoice = () => {
    if (!('speechSynthesis' in window)) return;
    if (isPlayingVoice) {
      window.speechSynthesis.cancel();
      setIsPlayingVoice(false);
      return;
    }

    const textToRead = `${activeStep.title}. ${activeStep.instruction}. Tiempo estimado: ${Math.round(activeStep.durationSeconds / 60)} minutos.`;
    const utterance = new SpeechSynthesisUtterance(textToRead);
    utterance.lang = 'es-ES';
    utterance.rate = 0.95;
    utterance.onend = () => setIsPlayingVoice(false);
    utterance.onerror = () => setIsPlayingVoice(false);

    window.speechSynthesis.speak(utterance);
    setIsPlayingVoice(true);
  };

  // STEP NAVIGATION CONTROLS
  const handleNextStep = () => {
    setCompletedSteps(prev => ({ ...prev, [currentStepIndex]: true }));
    if (currentStepIndex < stepsList.length - 1) {
      setCurrentStepIndex(prev => prev + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(prev => prev - 1);
    }
  };

  const handleResetStep = () => {
    setStepTimerSeconds(activeStep.durationSeconds);
    setIsStepTimerRunning(false);
  };

  // ADD / SWITCH RECIPE IN SESSION
  const handleSelectRecipeForSession = (recipe: CanonicalRecipe) => {
    if (!cookingSessionRecipes.some(r => r.id === recipe.id)) {
      setCookingSessionRecipes(prev => [...prev, recipe]);
    }
    setFocusedRecipeId(recipe.id);
    setIsRecipePickerOpen(false);
    setCurrentStepIndex(0);
  };

  // SCALED INGREDIENTS CALCULATION
  const activeRecipeIngredients = useMemo(() => {
    if (cookMode === 'single_recipe' && currentFocusedRecipe) {
      return currentFocusedRecipe.ingredientsPerServing.map(ing => {
        const scaledQty = parseFloat((ing.quantity * servings).toFixed(2));
        let displayAmount = `${scaledQty} ${ing.unit}`;
        if (ing.unit === 'kg' && scaledQty < 1) {
          displayAmount = `${Math.round(scaledQty * 1000)} g`;
        }
        return {
          id: `${currentFocusedRecipe.id}_${ing.name}`,
          name: ing.name,
          amountText: displayAmount,
          category: ing.category,
          recipeName: currentFocusedRecipe.name
        };
      });
    }

    // COMBINED INGREDIENTS FOR ALL RECIPES IN BATCH
    const combined: Array<{ id: string; name: string; amountText: string; category: string; recipeName: string }> = [];
    cookingSessionRecipes.forEach(rec => {
      rec.ingredientsPerServing.forEach(ing => {
        const scaledQty = parseFloat((ing.quantity * servings).toFixed(2));
        let displayAmount = `${scaledQty} ${ing.unit}`;
        if (ing.unit === 'kg' && scaledQty < 1) {
          displayAmount = `${Math.round(scaledQty * 1000)} g`;
        }
        combined.push({
          id: `${rec.id}_${ing.name}`,
          name: ing.name,
          amountText: displayAmount,
          category: ing.category,
          recipeName: rec.name
        });
      });
    });
    return combined;
  }, [cookMode, currentFocusedRecipe, cookingSessionRecipes, servings]);

  // FILTERED RECIPES FOR QUICK PICKER MODAL
  const filteredCatalogRecipes = useMemo(() => {
    return getFilteredTraditionalRecipes({
      searchQuery: recipeSearchQuery
    });
  }, [recipeSearchQuery]);

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6 animate-fade-in pb-20 text-zinc-900 dark:text-zinc-100">
      
      {/* ========================================================================= */}
      {/* 1. TOP COCKPIT HEADER BAR                                                 */}
      {/* ========================================================================= */}
      <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-md flex flex-wrap items-center justify-between gap-4">
        
        <div className="flex items-center gap-3.5 min-w-0">
          <button
            onClick={onBack}
            className="p-2.5 rounded-2xl bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:text-white transition-colors cursor-pointer"
            title="Volver"
          >
            <ArrowLeft size={18} />
          </button>

          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[10px] font-black uppercase tracking-wider bg-[#E07A5F]/15 text-[#E07A5F] border border-[#E07A5F]/30 px-2.5 py-0.5 rounded-full flex items-center gap-1.5">
                <Flame size={12} className="text-[#E07A5F] animate-pulse" />
                Modo Cocina en Directo · Paso a Paso
              </span>
              <span className="text-[10px] text-zinc-400 font-mono">
                {cookMode === 'batch_parallel' 
                  ? `Lote Concurrente (${cookingSessionRecipes.length} recetas)` 
                  : `Receta Individual (${currentFocusedRecipe?.source})`}
              </span>
            </div>

            <h1 className="text-xl sm:text-2xl font-black text-zinc-900 dark:text-white mt-1 truncate">
              {cookMode === 'batch_parallel' 
                ? (activeProject?.title || 'Workout Batch Cooking Concurrente')
                : currentFocusedRecipe?.name}
            </h1>
          </div>
        </div>

        {/* TOP CONTROLS: SERVINGS SLIDER & ACTION BUTTONS */}
        <div className="flex items-center gap-3 flex-wrap">
          
          {/* COMENSALES SCALE PILL */}
          <div className="p-1.5 rounded-2xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 flex items-center gap-1.5 shadow-2xs">
            <Users size={14} className="text-[#E07A5F] ml-1.5" />
            <span className="text-xs font-black text-zinc-700 dark:text-zinc-300">
              {servings} {servings === 1 ? 'persona' : 'personas'}
            </span>
            <div className="flex items-center gap-1 ml-1">
              {[1, 2, 4, 5, 6, 8].map(cnt => (
                <button
                  key={cnt}
                  type="button"
                  onClick={() => setServings(cnt)}
                  className={`w-6 h-6 rounded-lg text-[10px] font-black transition-all cursor-pointer ${
                    servings === cnt 
                      ? 'bg-[#E07A5F] text-white shadow-xs' 
                      : 'hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-500'
                  }`}
                >
                  {cnt}
                </button>
              ))}
            </div>
          </div>

          {/* VOICE READER BUTTON */}
          <button
            type="button"
            onClick={handleToggleVoice}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              isPlayingVoice 
                ? 'bg-rose-500 text-white animate-pulse shadow-md' 
                : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:text-white border border-zinc-200 dark:border-zinc-700'
            }`}
            title="Lector de Paso por Voz"
          >
            {isPlayingVoice ? <VolumeX size={15} /> : <Volume2 size={15} />}
            <span className="hidden sm:inline">{isPlayingVoice ? 'Detener Voz' : 'Leer Paso'}</span>
          </button>

          {/* FINISH BUTTON */}
          {onFinishCooking && (
            <button
              type="button"
              onClick={onFinishCooking}
              className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-black text-xs shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Check size={15} strokeWidth={3} />
              <span>Finalizar Cocina</span>
            </button>
          )}
        </div>

      </div>

      {/* ========================================================================= */}
      {/* 2. MODE SELECTOR BAR (BATCH PARALELO VS RECETA INDIVIDUAL / SELECTOR)       */}
      {/* ========================================================================= */}
      <div className="p-3.5 rounded-2xl bg-zinc-100/90 dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => { setCookMode('batch_parallel'); setCurrentStepIndex(0); }}
            className={`px-3.5 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-2 cursor-pointer ${
              cookMode === 'batch_parallel'
                ? 'bg-[#E07A5F] text-white shadow-xs'
                : 'bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700 hover:border-[#E07A5F]/50'
            }`}
          >
            <Layers size={14} />
            <span>Batch Cooking en Paralelo ({cookingSessionRecipes.length} platos)</span>
          </button>

          <button
            type="button"
            onClick={() => { setCookMode('single_recipe'); setCurrentStepIndex(0); }}
            className={`px-3.5 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-2 cursor-pointer ${
              cookMode === 'single_recipe'
                ? 'bg-[#E07A5F] text-white shadow-xs'
                : 'bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700 hover:border-[#E07A5F]/50'
            }`}
          >
            <ChefHat size={14} />
            <span>Receta Individual Paso a Paso</span>
          </button>
        </div>

        {/* RECIPE SWITCHER DROPDOWN / QUICK PICKER */}
        <div className="flex items-center gap-2">
          {cookMode === 'single_recipe' && (
            <select
              value={focusedRecipeId}
              onChange={(e) => { setFocusedRecipeId(e.target.value); setCurrentStepIndex(0); }}
              className="px-3 py-2 rounded-xl bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-xs font-bold text-zinc-800 dark:text-zinc-200 focus:outline-none cursor-pointer"
            >
              {cookingSessionRecipes.map(rec => (
                <option key={rec.id} value={rec.id}>
                  {rec.name} ({rec.station})
                </option>
              ))}
            </select>
          )}

          <button
            type="button"
            onClick={() => setIsRecipePickerOpen(true)}
            className="px-3 py-2 rounded-xl bg-amber-500/15 text-amber-700 dark:text-amber-300 hover:bg-amber-500/25 border border-amber-500/30 text-xs font-black transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs"
          >
            <Search size={13} className="text-amber-500" />
            <span>Explorar / Cambiar Receta (247 Canónicas)</span>
          </button>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* 3. STEP PROGRESS BAR & CONTROLLER                                         */}
      {/* ========================================================================= */}
      <div className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="text-xs font-black text-zinc-900 dark:text-white uppercase tracking-wider">
            Progreso del Cocinado:
          </span>
          <span className="text-xs font-bold text-[#E07A5F] bg-[#E07A5F]/10 px-2.5 py-0.5 rounded-full">
            Paso {currentStepIndex + 1} de {stepsList.length}
          </span>
        </div>

        {/* STEP PILLS */}
        <div className="flex items-center gap-1.5 overflow-x-auto py-1">
          {stepsList.map((step, idx) => {
            const isCompleted = completedSteps[idx];
            const isCurrent = idx === currentStepIndex;

            return (
              <button
                key={step.id}
                type="button"
                onClick={() => setCurrentStepIndex(idx)}
                className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 cursor-pointer shrink-0 ${
                  isCurrent 
                    ? 'bg-[#E07A5F] text-white shadow-xs scale-105 ring-2 ring-[#E07A5F]/40'
                    : isCompleted
                    ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30'
                    : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-500 hover:text-zinc-900 dark:hover:text-white'
                }`}
              >
                {isCompleted && !isCurrent ? <Check size={12} strokeWidth={3} /> : <span>{idx + 1}</span>}
                <span className="hidden md:inline truncate max-w-[100px]">{step.station}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 4. MAIN INTERACTIVE STEP WORKOUT COCKPIT (CARD & ACTIONS)                  */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* LEFT / CENTER: ACTIVE STEP INSTRUCTION CARD (8 COLS) */}
        <div className="lg:col-span-8 space-y-5">
          
          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-lg space-y-6 relative overflow-hidden">
            
            {/* BACKGROUND ACCENT BADGE */}
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-500/30 text-[10px] font-black uppercase">
                  {activeStep.dishName}
                </span>
                <span className="text-[10px] font-mono text-[#E07A5F] bg-[#E07A5F]/10 px-2.5 py-1 rounded-full font-bold">
                  Estación: {activeStep.station}
                </span>
              </div>

              {currentFocusedRecipe?.infografia && (
                <button
                  type="button"
                  onClick={() => setActiveInfographicModal(currentFocusedRecipe.infografia!)}
                  className="px-2.5 py-1 rounded-xl bg-amber-500/15 text-amber-700 dark:text-amber-300 hover:bg-amber-500/25 text-[11px] font-black transition-all flex items-center gap-1 cursor-pointer"
                >
                  <FileText size={13} className="text-amber-500" />
                  <span>Infografía Técnica</span>
                </button>
              )}
            </div>

            {/* STEP TITLE */}
            <h2 className="text-xl sm:text-2xl font-black text-zinc-900 dark:text-white leading-tight">
              {activeStep.title}
            </h2>

            {/* STEP PHOTO PREVIEW */}
            {activeStep.photoUrl && (
              <div className="relative h-56 sm:h-64 rounded-2xl overflow-hidden bg-zinc-950 shadow-inner group">
                <img 
                  src={activeStep.photoUrl} 
                  alt={activeStep.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent flex items-end p-4">
                  <span className="text-xs text-white/90 font-medium">
                    📸 Seguimiento visual de proceso · Medidas calculadas para {servings} comensales
                  </span>
                </div>
              </div>
            )}

            {/* STEP INSTRUCTION CONTENT */}
            <div className="p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-800/70 border border-zinc-200/80 dark:border-zinc-700/80 space-y-3">
              <span className="text-[10px] font-black uppercase tracking-wider text-[#E07A5F] flex items-center gap-1">
                <Zap size={13} /> Instrucción Técnica en Directo:
              </span>
              <p className="text-base sm:text-lg text-zinc-800 dark:text-zinc-100 font-medium leading-relaxed">
                {activeStep.instruction}
              </p>
            </div>

            {/* STEP COUNTDOWN TIMER BAR */}
            <div className="p-4 rounded-2xl bg-zinc-100 dark:bg-zinc-800/90 border border-zinc-200 dark:border-zinc-700 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-[#E07A5F]/15 text-[#E07A5F] flex items-center justify-center font-black">
                  <Clock size={24} />
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase text-zinc-400 block">Temporizador de Paso</span>
                  <span className="text-2xl sm:text-3xl font-mono font-black text-zinc-900 dark:text-white">
                    {formatTime(stepTimerSeconds)}
                  </span>
                </div>
              </div>

              {/* TIMER CONTROLS */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsStepTimerRunning(!isStepTimerRunning)}
                  className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 cursor-pointer shadow-xs ${
                    isStepTimerRunning 
                      ? 'bg-amber-500 text-stone-950 hover:bg-amber-400' 
                      : 'bg-[#E07A5F] text-white hover:bg-[#E07A5F]/90'
                  }`}
                >
                  {isStepTimerRunning ? <Pause size={15} /> : <Play size={15} />}
                  <span>{isStepTimerRunning ? 'Pausar' : 'Iniciar Tiempo'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setStepTimerSeconds(s => s + 60)}
                  className="px-2.5 py-2 rounded-xl bg-white dark:bg-zinc-700 text-zinc-700 dark:text-zinc-200 hover:bg-zinc-200 dark:hover:bg-zinc-600 text-xs font-bold transition-all cursor-pointer"
                  title="Añadir 1 minuto"
                >
                  +1 min
                </button>

                <button
                  type="button"
                  onClick={() => setStepTimerSeconds(s => s + 300)}
                  className="px-2.5 py-2 rounded-xl bg-white dark:bg-zinc-700 text-zinc-700 dark:text-zinc-200 hover:bg-zinc-200 dark:hover:bg-zinc-600 text-xs font-bold transition-all cursor-pointer"
                  title="Añadir 5 minutos"
                >
                  +5 min
                </button>

                <button
                  type="button"
                  onClick={handleResetStep}
                  className="p-2 rounded-xl bg-white dark:bg-zinc-700 text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-all cursor-pointer"
                  title="Reiniciar temporizador"
                >
                  <RotateCcw size={15} />
                </button>
              </div>
            </div>

            {/* STEP NAVIGATION BUTTONS */}
            <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between gap-3">
              <button
                type="button"
                disabled={currentStepIndex === 0}
                onClick={handlePrevStep}
                className="px-4 py-2.5 rounded-xl text-xs font-bold bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 disabled:opacity-40 transition-all cursor-pointer disabled:cursor-not-allowed flex items-center gap-1.5"
              >
                <ArrowLeft size={15} />
                <span>Paso Anterior</span>
              </button>

              <button
                type="button"
                onClick={handleNextStep}
                className="btn-hero-copper text-white text-xs font-black px-6 py-2.5 rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer hover:scale-[1.02]"
              >
                <span>{currentStepIndex === stepsList.length - 1 ? '✓ Completar Último Paso' : 'Siguiente Paso'}</span>
                <ArrowRight size={15} />
              </button>
            </div>

          </div>

        </div>

        {/* RIGHT: SCALED INGREDIENTS & MISE EN PLACE PANEL (4 COLS) */}
        <div className="lg:col-span-4 space-y-5">
          
          <div className="p-5 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-md space-y-4">
            
            <div className="flex items-center justify-between pb-2 border-b border-zinc-100 dark:border-zinc-800">
              <div className="flex items-center gap-2">
                <Scale size={16} className="text-[#E07A5F]" />
                <h3 className="text-xs font-black uppercase tracking-wider text-zinc-900 dark:text-white">
                  Medidas &amp; Ingredientes ({servings}p)
                </h3>
              </div>
              <span className="text-[10px] font-mono text-zinc-400 font-bold">
                {activeRecipeIngredients.length} ingredientes
              </span>
            </div>

            <p className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-snug">
              Cantidades adaptadas exactamente a <strong>{servings} comensales</strong>. Marca cada casilla al pesar y colocar en tu mise en place:
            </p>

            {/* INGREDIENTS CHECKLIST */}
            <div className="space-y-2 max-h-[420px] overflow-y-auto pr-1">
              {activeRecipeIngredients.map(ing => {
                const isChecked = checkedIngredients[ing.id];
                return (
                  <div
                    key={ing.id}
                    onClick={() => setCheckedIngredients(prev => ({ ...prev, [ing.id]: !prev[ing.id] }))}
                    className={`p-2.5 rounded-xl border text-xs flex items-center justify-between gap-2 transition-all cursor-pointer select-none ${
                      isChecked 
                        ? 'bg-emerald-500/10 border-emerald-500/30 text-zinc-400 line-through' 
                        : 'bg-zinc-50 dark:bg-zinc-800/80 border-zinc-200/80 dark:border-zinc-700/80 text-zinc-800 dark:text-zinc-200 hover:border-[#E07A5F]/40'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0 flex-1">
                      <input
                        type="checkbox"
                        checked={!!isChecked}
                        onChange={() => {}}
                        className="accent-emerald-500 rounded cursor-pointer"
                      />
                      <span className="truncate font-bold">{ing.name}</span>
                    </div>

                    <span className="font-mono font-black text-xs text-[#E07A5F] bg-[#E07A5F]/10 px-2 py-0.5 rounded-md shrink-0">
                      {ing.amountText}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* BATCH STORAGE ADVICE CARD */}
            {currentFocusedRecipe && (
              <div className="p-3.5 rounded-2xl bg-amber-500/10 dark:bg-amber-950/20 border border-amber-500/30 space-y-1 text-xs">
                <span className="text-[10px] font-black uppercase text-amber-700 dark:text-amber-400 flex items-center gap-1">
                  <Refrigerator size={12} /> Conservación Batch:
                </span>
                <p className="text-[11px] text-zinc-600 dark:text-zinc-300">
                  {currentFocusedRecipe.storageAdvice} (Aguanta {currentFocusedRecipe.shelfLifeDaysFridge} días en nevera a 4°C).
                </p>
              </div>
            )}

          </div>

        </div>

      </div>

      {/* ========================================================================= */}
      {/* 5. MODAL EXPLORADOR / SELECTOR DE 247 RECETAS CANÓNICAS                   */}
      {/* ========================================================================= */}
      {isRecipePickerOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 max-w-3xl w-full shadow-2xl space-y-4 max-h-[85vh] flex flex-col">
            
            <div className="flex items-center justify-between pb-3 border-b border-zinc-100 dark:border-zinc-800">
              <div>
                <h3 className="text-base font-black text-zinc-900 dark:text-white">
                  Seleccionar Receta Canónica para Cocinar en Directo
                </h3>
                <span className="text-[11px] text-zinc-400">
                  Elige entre 247 recetas de Cocina Tradicional y Karlos Arguiñano con fotos y medidas
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsRecipePickerOpen(false)}
                className="p-2 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* SEARCH BAR */}
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" size={16} />
              <input
                type="text"
                placeholder="Buscar por ingrediente (pollo, bacalao, merluza, ternera, arroz...)"
                value={recipeSearchQuery}
                onChange={(e) => setRecipeSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-xs font-bold text-zinc-800 dark:text-zinc-200 focus:outline-none"
              />
            </div>

            {/* RECIPES LIST */}
            <div className="flex-1 overflow-y-auto space-y-2 pr-1">
              {filteredCatalogRecipes.slice(0, 40).map(rec => (
                <div
                  key={rec.id}
                  onClick={() => handleSelectRecipeForSession(rec)}
                  className="p-3 rounded-2xl bg-zinc-50 dark:bg-zinc-800/70 hover:bg-amber-500/10 border border-zinc-200/80 dark:border-zinc-700/80 hover:border-amber-500/40 flex items-center justify-between gap-3 transition-all cursor-pointer"
                >
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <img src={rec.image} alt={rec.name} className="w-12 h-12 rounded-xl object-cover shrink-0 shadow-2xs" />
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-[9px] font-black uppercase text-[#E07A5F] bg-[#E07A5F]/10 px-2 py-0.5 rounded">
                          {rec.source} · {rec.station}
                        </span>
                        <span className="text-[10px] text-zinc-400">⏱️ {rec.prepTimeFormatted}</span>
                      </div>
                      <strong className="text-xs font-bold text-zinc-900 dark:text-white block truncate mt-0.5">{rec.name}</strong>
                    </div>
                  </div>

                  <button
                    type="button"
                    className="px-3 py-1.5 rounded-xl btn-hero-copper text-white text-xs font-black shrink-0 cursor-pointer shadow-2xs"
                  >
                    Cocinar Este Plato
                  </button>
                </div>
              ))}
            </div>

          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 6. MODAL DE INFOGRAFÍA TÉCNICA                                            */}
      {/* ========================================================================= */}
      {activeInfographicModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 max-w-4xl w-full shadow-2xl space-y-4 max-h-[92vh] flex flex-col">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-100 dark:border-zinc-800">
              <div>
                <h3 className="font-black text-sm text-zinc-900 dark:text-white">Infografía Técnica Oficial TouChef</h3>
                <span className="text-[11px] text-zinc-400">Diagrama visual de cocción y temperaturas</span>
              </div>
              <button 
                onClick={() => setActiveInfographicModal(null)}
                className="p-2 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-auto rounded-2xl bg-zinc-950 flex items-center justify-center p-2 min-h-[400px]">
              <img 
                src={activeInfographicModal} 
                alt="Infografía Técnica" 
                className="max-h-[70vh] w-auto object-contain rounded-xl shadow-2xl" 
              />
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
