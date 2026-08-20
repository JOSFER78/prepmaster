import React, { useState, useMemo, useEffect, useRef } from 'react';
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
  Info,
  Send,
  Bot,
  User as UserIcon,
  Loader2,
  Wand2,
  ListPlus,
  Mic,
  MicOff,
  Plus,
  Trash2,
  Tag,
  Volume2
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
  CanonicalRecipe,
  matchCarmenRecipesByPrompt 
} from '../data/recipesCarmenDatabase';
import {
  detectIngredientFamilies,
  getAlternativeRecipesFor,
  buildSmartMultiStationBatch,
  IngredientFamilyGroup
} from '../lib/carmenVariationsEngine';
import { 
  sendChatMessageToFreeLLM, 
  generateStructuredAIProposal, 
  extractRecipeIdsFromAIText,
  requestAISwapRecipe,
  QUICK_ACTION_PROMPTS,
  AIChatMessage,
  AIPlanProposal 
} from '../services/aiAssistantService';

interface AIGeneratorViewProps {
  onMenuApproved: (plan: GeneratedMenuPlan) => void;
  onNavigateToShopping: () => void;
  initialContext?: MealPlanConfig | null;
  onBatchProjectCreated?: (project: BatchProject) => void;
  onHireChefForBatch?: (project: BatchProject, servicePackage?: ChefServicePackage) => void;
  onHireChefOpenPreferences?: (prefs: {
    peopleCount: number;
    daysCount: number;
    dietStyle: string;
    allergens: string[];
    directives: string;
  }) => void;
  onCookMyself?: (project: BatchProject) => void;
}

type ProjectMode = 'batch_cooking' | 'single_recipe';

// Ingredientes y proteínas populares para interacción táctil y rápida
const POPULAR_INGREDIENTS = [
  { id: 'bacalao', label: 'Bacalao desalado', icon: '🐟', query: 'bacalao' },
  { id: 'pollo', label: 'Contramuslos de Pollo', icon: '🍗', query: 'pollo contramuslos' },
  { id: 'ternera', label: 'Ternera para guiso', icon: '🥩', query: 'ternera' },
  { id: 'lentejas', label: 'Lentejas pardinas', icon: '🍲', query: 'lentejas' },
  { id: 'garbanzos', label: 'Garbanzos / Vigilia', icon: '🥣', query: 'garbanzos' },
  { id: 'merluza', label: 'Merluza en salsa', icon: '🐠', query: 'merluza' },
  { id: 'calabacin', label: 'Calabacín / Cremas', icon: '🥦', query: 'calabacin crema' },
  { id: 'pisto', label: 'Pisto Manchego', icon: '🍅', query: 'pisto' },
  { id: 'carrilleras', label: 'Carrilleras ibéricas', icon: '🍖', query: 'carrilleras' },
  { id: 'albondigas', label: 'Albóndigas caseras', icon: '🧆', query: 'albondigas' },
  { id: 'tortilla', label: 'Tortilla de patatas', icon: '🍳', query: 'tortilla' },
  { id: 'espinacas', label: 'Espinacas frescas', icon: '🥬', query: 'espinacas' },
  { id: 'croquetas', label: 'Croquetas caseras', icon: '🥟', query: 'croquetas' },
  { id: 'arroz', label: 'Arroz caldoso marinero', icon: '🍚', query: 'arroz' }
];

export function AIGeneratorView({ 
  onMenuApproved, 
  onNavigateToShopping, 
  initialContext, 
  onBatchProjectCreated, 
  onHireChefForBatch,
  onHireChefOpenPreferences,
  onCookMyself
}: AIGeneratorViewProps) {
  
  // Wizard Step: 1 = Modo & Parámetros, 2 = Asistente IA & Selección (SSOT Carmen), 3 = Ficha Técnica & Ejecución
  const [wizardStep, setWizardStep] = useState<1 | 2 | 3>(1);
  const [projectMode, setProjectMode] = useState<ProjectMode>('batch_cooking');
  
  // Household parameters
  const [peopleCount, setPeopleCount] = useState<number>(initialContext?.peopleCount || 4);
  const [daysCount, setDaysCount] = useState<number>(initialContext?.daysCount || 5);
  const [mealCoverage, setMealCoverage] = useState<'lunches' | 'dinners' | 'both'>(initialContext?.mealCoverage || 'both');
  const [dietStyle, setDietStyle] = useState<'mediterranean' | 'fitness' | 'veggie' | 'lowcarb' | 'traditional'>(
    (initialContext?.dietStyle as any) || 'mediterranean'
  );
  const [varietyPreference, setVarietyPreference] = useState<'max_efficiency' | 'balanced' | 'high_variety'>('balanced');
  const [selectedAllergens, setSelectedAllergens] = useState<string[]>([]);
  const [includeFridge, setIncludeFridge] = useState<boolean>(true);
  const [userSpecificGoal, setUserSpecificGoal] = useState<string>('');

  // Single recipe mode state
  const [selectedSingleRecipe, setSelectedSingleRecipe] = useState<CanonicalRecipe | null>(CARMEN_RECIPES_DATABASE[0]);
  const [recipeSearchQuery, setRecipeSearchQuery] = useState<string>('');
  const [recipeCategoryFilter, setRecipeCategoryFilter] = useState<string>('all');

  // Step 2 submode: 'ai_copilot' vs 'manual_catalog'
  const [step2SubMode, setStep2SubMode] = useState<'ai_copilot' | 'manual_catalog'>('ai_copilot');

  // Interactive AI Copilot Chat state
  const [chatMessages, setChatMessages] = useState<AIChatMessage[]>([]);
  const [chatInput, setChatInput] = useState<string>('');
  const [isAiResponding, setIsAiResponding] = useState<boolean>(false);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  // Speech Recognition (Voz / Dictado)
  const [isListening, setIsListening] = useState<boolean>(false);
  const [speechTarget, setSpeechTarget] = useState<'step1' | 'chat'>('chat');

  // Batch manual / auto selection
  const [manuallySelectedRecipeIds, setManuallySelectedRecipeIds] = useState<string[]>([
    'carmen-lentejas-chorizo',
    'carmen-pollo-pepitoria',
    'carmen-pisto-manchego',
    'carmen-crema-calabacin-suave',
    'carmen-croquetas-jamon-iberico'
  ]);

  // Modal para añadir recetas rápidas desde el catálogo
  const [isAddRecipeModalOpen, setIsAddRecipeModalOpen] = useState<boolean>(false);
  const [quickAddSearch, setQuickAddSearch] = useState<string>('');

  // Generated state
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [generatedPlan, setGeneratedPlan] = useState<GeneratedMenuPlan | null>(null);
  const [generatedDishes, setGeneratedDishes] = useState<BatchDish[]>([]);
  const [swappingDishId, setSwappingDishId] = useState<string | null>(null);

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

  // Modal para ver/cambiar variaciones culinarias de un ingrediente o plato
  const [activeVariationsRecipeId, setActiveVariationsRecipeId] = useState<string | null>(null);

  // Live preview of matched recipes in Step 1 based on userSpecificGoal
  const step1MatchedPreview = useMemo(() => {
    if (!userSpecificGoal.trim()) return [];
    return matchCarmenRecipesByPrompt(userSpecificGoal, selectedAllergens, dietStyle, 4);
  }, [userSpecificGoal, selectedAllergens, dietStyle]);

  // Explorador de familias y variaciones culinarias canónicas de Carmen
  const detectedFamilies = useMemo(() => {
    return detectIngredientFamilies(userSpecificGoal, selectedAllergens);
  }, [userSpecificGoal, selectedAllergens]);

  // Auto-scroll chat
  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages, isAiResponding]);

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

  // Toggle ingredient chip in Step 1
  const togglePopularIngredientInStep1 = (ing: { label: string; query: string }) => {
    setUserSpecificGoal(prev => {
      const trimmed = prev.trim();
      if (!trimmed) return ing.label;
      if (trimmed.toLowerCase().includes(ing.query.toLowerCase()) || trimmed.toLowerCase().includes(ing.label.toLowerCase())) {
        return trimmed;
      }
      return `${trimmed}, ${ing.label}`;
    });
  };

  // One-click ingredient chip in Step 2: Adds/swaps matching Carmen recipe into the batch
  const handleQuickAddIngredientInStep2 = (ing: { label: string; query: string }) => {
    const matched = matchCarmenRecipesByPrompt(ing.query, selectedAllergens, dietStyle, 1);
    if (matched.length > 0) {
      const rec = matched[0];
      if (!manuallySelectedRecipeIds.includes(rec.id)) {
        setManuallySelectedRecipeIds(prev => [rec.id, ...prev.slice(0, 4)]);
        setChatMessages(prev => [
          ...prev,
          {
            role: 'assistant',
            content: `🎯 **Añadido por panel interactivo**: He incorporado **${rec.name}** (${rec.prepTimeFormatted} · Estación: ${rec.station}) a tu lote semanal para cumplir tu preferencia de *${ing.label}*.`,
            suggestedRecipes: [rec.id]
          }
        ]);
      }
    }
  };

  // Speech Recognition toggler
  const toggleSpeechRecognition = (target: 'step1' | 'chat') => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Tu navegador no tiene activado el reconocimiento de voz nativo. Puedes escribir directamente en el campo de texto.');
      return;
    }

    if (isListening) {
      setIsListening(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = 'es-ES';
      recognition.continuous = false;
      recognition.interimResults = false;

      setIsListening(true);
      setSpeechTarget(target);

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setIsListening(false);
        if (target === 'step1') {
          setUserSpecificGoal(prev => prev ? `${prev}, ${transcript}` : transcript);
        } else {
          setChatInput(transcript);
          handleSendChatMessage(transcript);
        }
      };

      recognition.onerror = () => setIsListening(false);
      recognition.onend = () => setIsListening(false);
      recognition.start();
    } catch (e) {
      console.error('Speech recognition error:', e);
      setIsListening(false);
    }
  };

  // TRANSITION STEP 1 -> STEP 2 (PERSONALIZED & DETERMINISTIC MATCHING WITH MULTI-STATION CONCURRENCY)
  const handleProceedToStep2 = () => {
    // 1. Calculate best matching recipes from Carmen for user's goal / preferences
    const baseIds = manuallySelectedRecipeIds.length > 0
      ? manuallySelectedRecipeIds
      : matchCarmenRecipesByPrompt(userSpecificGoal, selectedAllergens, dietStyle, 4).map(r => r.id);

    const matched = buildSmartMultiStationBatch(baseIds, 4, dietStyle, selectedAllergens);
    const matchedIds = matched.map(r => r.id);
    setManuallySelectedRecipeIds(matchedIds);

    // 2. Prepare personalized welcome greeting acknowledging user's input
    let welcomeContent = '';
    if (userSpecificGoal.trim()) {
      welcomeContent = `¡Oído cocina! He analizado tu petición: **"${userSpecificGoal}"** para **${peopleCount} personas** durante **${daysCount} días** (${structure.totalIndividualServings} raciones en estilo ${dietStyle}).\n\nHe configurado tu lote equilibrando estaciones térmicas concurrentes (horno, olla y fuegos) con recetas canónicas de Carmen:${selectedAllergens.length > 0 ? `\n• Alérgenos excluidos: ${selectedAllergens.join(', ')}` : ''}\n\n${matched.map(r => `• **${r.name}** (${r.prepTimeFormatted} · Estación: *${r.station}*)`).join('\n')}\n\n💡 **Variaciones Culinarias**: Puedes pulsar en *"🔄 Variantes"* sobre cualquier plato para cambiar su técnica gastronómica (ej. salsa, guiso, ajillo, horno o cazuela) o pedirme sugerencias en el chat.`;
    } else {
      welcomeContent = `¡Hola! Soy tu **Copiloto Culinario TouChef con IA**, entrenado con las recetas y técnicas de *Cocina con Carmen* y compendios de cocción simultánea.\n\nHe configurado tu menú de **Batch Cooking Semanal** para **${peopleCount} personas** durante **${daysCount} días** (${structure.totalIndividualServings} raciones en estilo ${dietStyle}).${selectedAllergens.length > 0 ? ` He excluido automáticamente: ${selectedAllergens.join(', ')}.` : ''}\n\n${matched.map(r => `• **${r.name}** (${r.prepTimeFormatted} · Estación: *${r.station}*)`).join('\n')}\n\nPuedes seleccionar ingredientes en los paneles interactivos, cambiar variantes de técnicas en cada plato o pedirme ajustes por chat.`;
    }

    const initialMsg: AIChatMessage = {
      role: 'assistant',
      content: welcomeContent,
      suggestedRecipes: matchedIds
    };
    setChatMessages([initialMsg]);
    setWizardStep(2);
  };

  // SEND MESSAGE TO AI COPILOT (WITH DIRECT INGREDIENT INTERPRETATION)
  const handleSendChatMessage = async (presetText?: string) => {
    const textToSend = presetText || chatInput.trim();
    if (!textToSend || isAiResponding) return;

    const userMsg: AIChatMessage = { role: 'user', content: textToSend };
    const newHistory = [...chatMessages, userMsg];
    setChatMessages(newHistory);
    setChatInput('');
    setIsAiResponding(true);

    // Análisis heurístico inmediato de ingredientes solicitados por el usuario
    const instantMatches = matchCarmenRecipesByPrompt(textToSend, selectedAllergens, dietStyle, 2);
    if (instantMatches.length > 0 && textToSend.length > 3) {
      const lower = textToSend.toLowerCase();
      if (
        lower.includes('añad') || lower.includes('pon') || lower.includes('cambi') || 
        lower.includes('quiero') || lower.includes('incluy') || lower.includes('bacalao') || 
        lower.includes('pollo') || lower.includes('pescado') || lower.includes('carne') || 
        lower.includes('lentejas') || lower.includes('verdura') || lower.includes('ternera')
      ) {
        const newIdToAdd = instantMatches[0].id;
        if (!manuallySelectedRecipeIds.includes(newIdToAdd)) {
          setManuallySelectedRecipeIds(prev => [newIdToAdd, ...prev.slice(0, 4)]);
        }
      }
    }

    try {
      const aiReplyText = await sendChatMessageToFreeLLM(newHistory);
      const suggestedRecipeIds = extractRecipeIdsFromAIText(aiReplyText);

      setChatMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: aiReplyText,
          suggestedRecipes: suggestedRecipeIds.length > 0 ? suggestedRecipeIds : (instantMatches.length > 0 ? instantMatches.map(r => r.id) : undefined)
        }
      ]);
    } catch (err: any) {
      console.error('AI Copilot error:', err);
      const fallbackDishes = instantMatches.length > 0 ? instantMatches : matchCarmenRecipesByPrompt(textToSend, selectedAllergens, dietStyle, 3);
      setChatMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: `He procesado tu indicación ("${textToSend}"). Te sugiero incorporar estas opciones de Carmen compatibles:\n\n${fallbackDishes.map(r => `• **${r.name}** (${r.prepTimeFormatted})`).join('\n')}`,
          suggestedRecipes: fallbackDishes.map(r => r.id)
        }
      ]);
    } finally {
      setIsAiResponding(false);
    }
  };

  // APPLY AI STRUCTURED PROPOSAL
  const handleApplyAIAutoProposal = async () => {
    setIsGenerating(true);
    setIsAiResponding(true);

    try {
      const proposal: AIPlanProposal = await generateStructuredAIProposal(
        userSpecificGoal || 'Menú equilibrado y tradicional',
        peopleCount,
        daysCount,
        selectedAllergens
      );

      if (proposal.selectedRecipeIds && proposal.selectedRecipeIds.length > 0) {
        setManuallySelectedRecipeIds(proposal.selectedRecipeIds);
        
        const confirmationMsg: AIChatMessage = {
          role: 'assistant',
          content: `✨ **¡Propuesta de Menú IA Formulada con Éxito!**\n\n📌 **${proposal.title}**\n${proposal.philosophy}\n\n**Recetas seleccionadas del catálogo de Carmen:**\n${proposal.selectedRecipeIds.map(id => {
            const rec = CARMEN_RECIPES_DATABASE.find(r => r.id === id);
            return `• **${rec?.name || id}** (${proposal.servingsPerDish?.[id] || peopleCount * 2} raciones)`;
          }).join('\n')}\n\n💡 *Consejos de concurrencia:*\n${proposal.variationsAndTips?.map(t => `• ${t}`).join('\n') || 'Optimizado para cocción en 2 horas.'}`,
          suggestedRecipes: proposal.selectedRecipeIds
        };
        setChatMessages(prev => [...prev, confirmationMsg]);
      }
    } catch (error) {
      console.error('Error applying AI auto proposal:', error);
    } finally {
      setIsGenerating(false);
      setIsAiResponding(false);
    }
  };

  // SWAP SPECIFIC RECIPE WITH AI
  const handleSwapRecipeWithAI = async (recipeId: string) => {
    setSwappingDishId(recipeId);
    setIsAiResponding(true);
    try {
      const res = await requestAISwapRecipe(
        manuallySelectedRecipeIds,
        recipeId,
        userSpecificGoal || 'Sustituir por otra opción compatible y deliciosa',
        selectedAllergens
      );
      if (res.newRecipeId) {
        setManuallySelectedRecipeIds(prev => prev.map(id => id === recipeId ? res.newRecipeId : id));
        const oldName = CARMEN_RECIPES_DATABASE.find(r => r.id === recipeId)?.name || recipeId;
        const newName = CARMEN_RECIPES_DATABASE.find(r => r.id === res.newRecipeId)?.name || res.newRecipeId;
        setChatMessages(prev => [
          ...prev,
          {
            role: 'assistant',
            content: `🔄 He sustituido **${oldName}** por **${newName}** en tu menú.\n*${res.reason}*`,
            suggestedRecipes: [res.newRecipeId]
          }
        ]);
      }
    } catch (err) {
      console.error('Error swapping recipe:', err);
    } finally {
      setSwappingDishId(null);
      setIsAiResponding(false);
    }
  };

  // REMOVE RECIPE FROM ACTIVE BATCH
  const handleRemoveRecipeFromBatch = (recipeId: string) => {
    if (manuallySelectedRecipeIds.length <= 1) {
      alert('Tu lote debe contener al menos 1 receta para poder cocinar.');
      return;
    }
    setManuallySelectedRecipeIds(prev => prev.filter(id => id !== recipeId));
  };

  // ADD RECIPE DIRECTLY TO ACTIVE BATCH
  const handleAddRecipeDirectly = (recipeId: string) => {
    if (!manuallySelectedRecipeIds.includes(recipeId)) {
      setManuallySelectedRecipeIds(prev => [...prev, recipeId]);
    }
    setIsAddRecipeModalOpen(false);
  };

  // APPLY SUGGESTED RECIPES FROM AI
  const handleApplySuggestedRecipes = (recipeIds: string[]) => {
    setManuallySelectedRecipeIds(recipeIds);
    setStep2SubMode('manual_catalog');
  };

  // BUILD FINAL BATCH OR RECIPE DISHES & GO TO STEP 3
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
      const targetServingsPerDish = Math.max(2, Math.ceil(structure.totalIndividualServings / Math.max(1, manuallySelectedRecipeIds.length)));
      const dishes: BatchDish[] = manuallySelectedRecipeIds.map(id => {
        const rec = CARMEN_RECIPES_DATABASE.find(r => r.id === id) || CARMEN_RECIPES_DATABASE[0];
        return createDishFromCanonicalRecipe(rec, targetServingsPerDish);
      });

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
    <div className="w-full space-y-6 sm:space-y-8 animate-fade-in pb-20 text-zinc-900 dark:text-zinc-100">
      
      {/* ========================================================================= */}
      {/* WIZARD PROGRESS HEADER                                                    */}
      {/* ========================================================================= */}
      <div className="glass-surface-elevated rounded-3xl p-5 sm:p-6 border border-zinc-200/80 dark:border-white/10 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#E07A5F] text-white flex items-center justify-center font-bold text-xl shadow-md">
              <Bot size={26} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-wider bg-[#E07A5F]/15 text-[#E07A5F] px-2.5 py-0.5 rounded-full flex items-center gap-1">
                  <Sparkles size={11} /> Asistente Culinario con IA Real
                </span>
                <span className="text-[10px] font-black uppercase bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                  FreeLLM Proxy Conectado
                </span>
              </div>
              <h1 className="text-xl font-black text-zinc-900 dark:text-white mt-0.5">
                {wizardStep === 1 && '1. Tipo de Proyecto, Hogar & Petición a la IA'}
                {wizardStep === 2 && (projectMode === 'batch_cooking' ? '2. Copiloto IA & Selección de Recetas de Carmen' : '2. Copiloto IA & Receta Canónica')}
                {wizardStep === 3 && '3. Ficha Técnica, Ingredientes & Encargo de Servicio'}
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
      {/* STEP 1: PROJECT MODE, HOUSEHOLD & INTERACTIVE GOAL                         */}
      {/* ========================================================================= */}
      {wizardStep === 1 && (
        <div className="glass-surface-elevated rounded-3xl p-6 sm:p-8 border border-zinc-200/80 dark:border-white/10 shadow-xl space-y-8">
          
          {/* A. PROJECT TYPE SELECTOR */}
          <div className="space-y-3">
            <span className="text-[11px] font-black uppercase tracking-wider text-[#E07A5F] block">
              A. ¿Qué deseas preparar en este proyecto?
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
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
                  🍲 Plan Maestro de Batch Cooking Semanal
                </strong>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  La IA organiza y balancea 4-5 platos de Carmen para cocinar en 2 horas en paralelo y cubrir comidas/cenas de toda tu semana.
                </p>
              </div>

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
                  Prepara o encarga una receta canónica específica de Carmen (guiso, arroz, merluza, etc.) con raciones exactas calculadas por la IA.
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
              
              <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-2">
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

              {projectMode === 'batch_cooking' && (
                <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-2">
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

              <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-2">
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

          {/* C. PANEL INTERACTIVO DE INGREDIENTES FAVORITOS & DICTADO POR VOZ */}
          <div className="space-y-4 pt-4 border-t border-zinc-100 dark:border-zinc-800">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span className="text-[11px] font-black uppercase tracking-wider text-[#E07A5F] flex items-center gap-1.5">
                <Wand2 size={14} /> C. ¿Qué te apetece comer? (Elige ingredientes o escribe/dicta libremente)
              </span>
              <span className="text-[10px] text-zinc-400 font-medium">
                Toca cualquier botón o usa el micrófono 🎙️
              </span>
            </div>

            {/* QUICK INGREDIENT CHIPS */}
            <div className="flex flex-wrap gap-2">
              {POPULAR_INGREDIENTS.map(ing => {
                const isSelected = userSpecificGoal.toLowerCase().includes(ing.query.toLowerCase()) || userSpecificGoal.toLowerCase().includes(ing.label.toLowerCase());
                return (
                  <button
                    key={ing.id}
                    type="button"
                    onClick={() => togglePopularIngredientInStep1(ing)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs ${
                      isSelected
                        ? 'bg-[#E07A5F] text-white ring-2 ring-[#E07A5F]/40 shadow-sm scale-[1.03]'
                        : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 border border-zinc-200 dark:border-zinc-700/60'
                    }`}
                  >
                    <span>{ing.icon}</span>
                    <span>{ing.label}</span>
                    {isSelected && <Check size={12} />}
                  </button>
                );
              })}
            </div>

            {/* TEXT & VOICE INPUT */}
            <div className="relative flex items-center gap-2">
              <input
                type="text"
                placeholder="Ej: 'Quiero bacalao, contramuslos de pollo y calabacines', 'Menú rico en hierro', 'Comida tradicional andaluza'..."
                value={userSpecificGoal}
                onChange={(e) => setUserSpecificGoal(e.target.value)}
                className="w-full p-3.5 pr-12 rounded-2xl bg-zinc-50 dark:bg-zinc-800/90 border border-zinc-200 dark:border-zinc-700 text-xs font-medium text-zinc-800 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-[#E07A5F]/40 shadow-inner"
              />
              <button
                type="button"
                onClick={() => toggleSpeechRecognition('step1')}
                title={isListening && speechTarget === 'step1' ? 'Detener grabación' : 'Dictar tus preferencias por voz'}
                className={`absolute right-2.5 p-2 rounded-xl transition-all cursor-pointer ${
                  isListening && speechTarget === 'step1'
                    ? 'bg-rose-500 text-white animate-pulse shadow-md'
                    : 'bg-zinc-200 dark:bg-zinc-700 hover:bg-[#E07A5F] hover:text-white text-zinc-600 dark:text-zinc-300'
                }`}
              >
                {isListening && speechTarget === 'step1' ? <MicOff size={16} /> : <Mic size={16} />}
              </button>
            </div>

            {/* REAL-TIME PREVIEW / EXPLORADOR DE VARIACIONES CULINARIAS POR INGREDIENTE */}
            {detectedFamilies.length > 0 ? (
              <div className="p-4 rounded-2xl bg-amber-500/10 dark:bg-amber-950/20 border border-amber-500/30 space-y-4 animate-fade-in">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-[11px]">
                  <span className="font-black text-amber-700 dark:text-amber-400 flex items-center gap-1.5">
                    <Sparkles size={14} className="text-amber-500" />
                    Explorador de Variaciones de Carmen ({detectedFamilies.length} ingredientes detectados):
                  </span>
                  <span className="text-zinc-500 dark:text-zinc-400 text-[10px]">
                    Toca para preseleccionar la técnica que te apetece o deja que la IA equilibre el lote
                  </span>
                </div>

                <div className="space-y-3">
                  {detectedFamilies.map(fam => (
                    <div key={fam.familyKey} className="p-3.5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 space-y-2.5 shadow-2xs">
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="text-base">{fam.icon}</span>
                          <strong className="text-xs font-black text-zinc-900 dark:text-white">{fam.displayName}</strong>
                        </div>
                        <span className="text-[10px] font-mono text-[#E07A5F] bg-[#E07A5F]/10 px-2 py-0.5 rounded-md font-bold">
                          {fam.variations.length} técnicas disponibles
                        </span>
                      </div>
                      <p className="text-[11px] text-zinc-600 dark:text-zinc-400">{fam.description}</p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 pt-1">
                        {fam.variations.map(rec => {
                          const isSelected = manuallySelectedRecipeIds.includes(rec.id);
                          return (
                            <button
                              key={rec.id}
                              type="button"
                              onClick={() => toggleManualRecipe(rec.id)}
                              className={`p-2.5 rounded-xl border text-left flex items-start gap-2.5 transition-all cursor-pointer ${
                                isSelected
                                  ? 'bg-amber-500/15 border-amber-500 text-zinc-900 dark:text-white shadow-xs font-bold ring-1 ring-amber-500/50'
                                  : 'bg-zinc-50 dark:bg-zinc-800/60 border-zinc-200/80 dark:border-zinc-700/60 text-zinc-700 dark:text-zinc-300 hover:border-amber-500/50 hover:bg-amber-500/5'
                              }`}
                            >
                              <img src={rec.image} alt={rec.name} className="w-10 h-10 rounded-lg object-cover shrink-0 mt-0.5 shadow-2xs" />
                              <div className="min-w-0 flex-1">
                                <div className="flex items-center justify-between gap-1">
                                  <span className="text-[9px] font-black uppercase text-[#E07A5F] block truncate">
                                    {rec.culinaryTechnique || rec.category} · {rec.station}
                                  </span>
                                  {isSelected && <Check size={13} className="text-amber-500 font-black shrink-0" />}
                                </div>
                                <strong className="text-[11px] font-bold block leading-snug line-clamp-1 mt-0.5">{rec.name}</strong>
                                <span className="text-[10px] text-zinc-400 block mt-0.5">⏱️ {rec.prepTimeFormatted}</span>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              step1MatchedPreview.length > 0 && (
                <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 space-y-2 animate-fade-in">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-black text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5">
                      <CheckCircle2 size={13} /> {step1MatchedPreview.length} platos canónicos de Carmen identificados:
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                    {step1MatchedPreview.map(rec => (
                      <div key={rec.id} className="p-2 rounded-xl bg-white dark:bg-zinc-900 border border-emerald-500/20 flex items-center gap-2.5 text-xs">
                        <img src={rec.image} alt={rec.name} className="w-8 h-8 rounded-lg object-cover" />
                        <div className="min-w-0">
                          <strong className="font-bold text-zinc-900 dark:text-white block truncate text-[11px]">{rec.name}</strong>
                          <span className="text-[10px] text-zinc-400">{rec.prepTimeFormatted} · {rec.station}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )
            )}
          </div>

          {/* D. ALÉRGENOS */}
          <div className="space-y-3 pt-4 border-t border-zinc-100 dark:border-zinc-800">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-black uppercase tracking-wider text-[#E07A5F]">
                D. Alérgenos y Restricciones a Excluir
              </span>
              <label className="flex items-center gap-2 text-xs font-bold text-zinc-600 dark:text-zinc-400 cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeFridge}
                  onChange={(e) => setIncludeFridge(e.target.checked)}
                  className="accent-[#E07A5F] rounded-md"
                />
                <span>Descontar ingredientes de mi despensa</span>
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

          {/* CORTE TEMPRANO / ENCARGO DIRECTO A CHEF CON PREFERENCIAS */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/15 via-[#E07A5F]/10 to-transparent border border-amber-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500 text-stone-950 flex items-center justify-center font-black shrink-0 shadow-sm">
                <ChefHat size={20} />
              </div>
              <div>
                <strong className="text-xs font-black text-zinc-900 dark:text-white block">
                  ¿Prefieres que un Chef diseñe todo tu menú a medida?
                </strong>
                <span className="text-[11px] text-zinc-600 dark:text-zinc-400">
                  Corta aquí: publica tu encargo con estas preferencias ({userSpecificGoal || 'Menú a convenir'}) y recibe propuestas de cocineros homologados.
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                if (onHireChefOpenPreferences) {
                  onHireChefOpenPreferences({
                    peopleCount,
                    daysCount,
                    dietStyle,
                    allergens: selectedAllergens,
                    directives: userSpecificGoal
                  });
                } else {
                  handleExecuteHireChef('with_grocery');
                }
              }}
              className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-stone-950 font-black text-xs shadow-sm transition-all flex items-center justify-center gap-1.5 cursor-pointer shrink-0"
            >
              <Sparkles size={14} />
              <span>Encargar Abierto a Chefs</span>
            </button>
          </div>

          {/* STEP 1 NEXT BUTTON */}
          <div className="pt-4 flex items-center justify-between">
            <span className="text-xs text-zinc-400 font-medium">
              Paso 1 de 3 · Motor Unificado TouChef
            </span>
            <button
              onClick={handleProceedToStep2}
              className="btn-hero-copper text-white font-bold text-xs px-6 py-3 rounded-2xl flex items-center gap-2 cursor-pointer shadow-md hover:scale-[1.02] transition-transform"
            >
              <span>Abrir Copiloto IA &amp; Selección de Platos</span>
              <ArrowRight size={16} />
            </button>
          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* STEP 2: INTERACTIVE AI COPILOT & RECIPE SELECTION                          */}
      {/* ========================================================================= */}
      {wizardStep === 2 && (
        <div className="glass-surface-elevated rounded-3xl p-6 sm:p-8 border border-zinc-200/80 dark:border-white/10 shadow-xl space-y-6">
          
          {/* SUB-MODE TABS: AI COPILOT VS MANUAL CATALOG */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-zinc-100 dark:border-zinc-800">
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-[#E07A5F] flex items-center gap-1">
                <Sparkles size={12} /> SSOT: Compendios de Cocina con Carmen
              </span>
              <h3 className="text-lg font-black text-zinc-900 dark:text-white mt-0.5">
                {step2SubMode === 'ai_copilot' ? 'Copiloto Culinario IA en Vivo' : 'Explorador Canónico de Recetas'}
              </h3>
            </div>

            <div className="flex items-center gap-2 bg-zinc-100 dark:bg-zinc-800 p-1.5 rounded-2xl border border-zinc-200 dark:border-zinc-700">
              <button
                onClick={() => setStep2SubMode('ai_copilot')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  step2SubMode === 'ai_copilot'
                    ? 'btn-hero-copper text-white shadow-xs font-black'
                    : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-white'
                }`}
              >
                <Bot size={15} />
                <span>Copiloto IA Interactivo</span>
              </button>

              <button
                onClick={() => setStep2SubMode('manual_catalog')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  step2SubMode === 'manual_catalog'
                    ? 'bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white shadow-xs font-black'
                    : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-white'
                }`}
              >
                <BookOpen size={15} />
                <span>Catálogo de 15 Compendios</span>
              </button>
            </div>
          </div>

          {/* ACTIVE BATCH DISHES LIVE BOARD (WITH DIRECT SWAP & DELEGATE) */}
          {projectMode === 'batch_cooking' && (
            <div className="p-4 sm:p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-900/90 border border-zinc-200 dark:border-zinc-800 space-y-4 shadow-sm">
              
              {/* TOP BAR OF BOARD: TITLE, COUNT, HIRE CHEF BUTTON & ADD BUTTON */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-black text-zinc-800 dark:text-zinc-200 uppercase tracking-wider">
                    Platos en tu lote activo ({manuallySelectedRecipeIds.length}):
                  </span>
                  <span className="text-[10px] text-zinc-400 font-mono">
                    ~{structure.totalIndividualServings} raciones calculadas
                  </span>
                </div>
                
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setIsAddRecipeModalOpen(true)}
                    className="px-3 py-1.5 rounded-xl bg-zinc-200 dark:bg-zinc-800 hover:bg-[#E07A5F] hover:text-white text-zinc-800 dark:text-zinc-200 font-bold text-[11px] transition-all flex items-center gap-1 cursor-pointer"
                  >
                    <Plus size={13} />
                    <span>+ Añadir Plato</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleExecuteHireChef('with_grocery')}
                    className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-stone-950 font-black text-[11px] transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <ChefHat size={13} />
                    <span>Encargar al Chef</span>
                  </button>
                </div>
              </div>

              {/* QUICK INGREDIENT INTERACTIVE PANEL BAR IN STEP 2 */}
              <div className="space-y-1.5 pt-1 border-t border-zinc-200/60 dark:border-zinc-800">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase text-zinc-400 flex items-center gap-1">
                    <Tag size={11} className="text-[#E07A5F]" /> Panel interactivo: Toca para incorporar o probar ingredientes en el lote:
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {POPULAR_INGREDIENTS.map(ing => (
                    <button
                      key={ing.id}
                      type="button"
                      onClick={() => handleQuickAddIngredientInStep2(ing)}
                      className="px-2.5 py-1 rounded-lg bg-white dark:bg-zinc-800 hover:bg-[#E07A5F]/15 hover:text-[#E07A5F] border border-zinc-200 dark:border-zinc-700/70 text-[10px] font-bold text-zinc-700 dark:text-zinc-300 transition-all cursor-pointer flex items-center gap-1 shadow-2xs"
                    >
                      <span>{ing.icon}</span>
                      <span>{ing.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* CARDS OF CURRENT ACTIVE DISHES */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
                {manuallySelectedRecipeIds.map(recipeId => {
                  const rec = CARMEN_RECIPES_DATABASE.find(r => r.id === recipeId);
                  if (!rec) return null;
                  const isSwappingThis = swappingDishId === recipeId;

                  return (
                    <div
                      key={rec.id}
                      className="p-3 rounded-2xl bg-white dark:bg-zinc-800/90 border border-zinc-200 dark:border-zinc-700/80 flex flex-col justify-between space-y-2.5 shadow-sm hover:border-[#E07A5F]/50 transition-colors group relative"
                    >
                      <div className="flex items-start gap-3">
                        <img src={rec.image} alt={rec.name} className="w-12 h-12 rounded-xl object-cover shrink-0 shadow-2xs" />
                        <div className="min-w-0 flex-1">
                          <span className="text-[9px] font-black uppercase text-[#E07A5F] block truncate">
                            {rec.category} · {rec.station}
                          </span>
                          <strong className="text-xs font-black text-zinc-900 dark:text-white block line-clamp-1 mt-0.5">
                            {rec.name}
                          </strong>
                          <span className="text-[10px] text-zinc-400 block mt-0.5">
                            ⏱️ {rec.prepTimeFormatted}
                          </span>
                        </div>
                      </div>

                      <div className="pt-2 border-t border-zinc-100 dark:border-zinc-700/60 flex items-center justify-between gap-1.5">
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => setActiveVariationsRecipeId(rec.id)}
                            title="Ver técnicas y variantes alternativas de este plato o ingrediente"
                            className="px-2 py-1 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-[10px] font-bold text-amber-700 dark:text-amber-300 transition-all flex items-center gap-1 cursor-pointer"
                          >
                            <Sparkles size={11} className="text-amber-500" />
                            <span>Variantes</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => handleSwapRecipeWithAI(rec.id)}
                            disabled={isSwappingThis || isAiResponding}
                            title="Pedir a la IA sustituir este plato por otra opción compatible"
                            className="px-2 py-1 rounded-lg bg-zinc-100 dark:bg-zinc-700/80 hover:bg-[#E07A5F]/15 hover:text-[#E07A5F] text-[10px] font-bold text-zinc-600 dark:text-zinc-300 transition-all flex items-center gap-1 cursor-pointer disabled:opacity-50"
                          >
                            {isSwappingThis ? <Loader2 size={11} className="animate-spin text-[#E07A5F]" /> : <RefreshCw size={11} />}
                            <span>{isSwappingThis ? '...' : 'Swap IA'}</span>
                          </button>
                        </div>

                        <button
                          type="button"
                          onClick={() => handleRemoveRecipeFromBatch(rec.id)}
                          title="Quitar este plato de mi lote"
                          className="p-1.5 rounded-lg text-zinc-400 hover:text-rose-500 hover:bg-rose-500/10 transition-colors cursor-pointer"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ===================================================================== */}
          {/* SUB-VIEW 1: AI COPILOT CHAT INTERFACE                                 */}
          {/* ===================================================================== */}
          {step2SubMode === 'ai_copilot' && (
            <div className="space-y-4">
              
              {/* TOP ACTION BAR: INSTANT PROPOSAL GENERATOR */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-[#E07A5F]/15 via-amber-500/10 to-emerald-500/10 border border-[#E07A5F]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#E07A5F] text-white flex items-center justify-center shrink-0 shadow-sm">
                    <Wand2 size={20} />
                  </div>
                  <div>
                    <strong className="text-xs font-black text-zinc-900 dark:text-white block">
                      Generador Inteligente de Menú Equilibrado (IA)
                    </strong>
                    <span className="text-[11px] text-zinc-500">
                      Calcula platos y raciones óptimas para {peopleCount} personas y {daysCount} días.
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleApplyAIAutoProposal}
                  disabled={isGenerating || isAiResponding}
                  className="btn-hero-copper text-white text-xs font-black px-4 py-2.5 rounded-xl shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50 hover:scale-[1.02]"
                >
                  {isGenerating ? <Loader2 size={15} className="animate-spin" /> : <Sparkles size={15} />}
                  <span>Formular Propuesta Completa con IA</span>
                </button>
              </div>

              {/* CHAT MESSAGES CONTAINER */}
              <div className="h-[380px] overflow-y-auto rounded-2xl p-4 bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 space-y-4 text-xs">
                {chatMessages.map((msg, index) => (
                  <div 
                    key={index}
                    className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    {msg.role === 'assistant' && (
                      <div className="w-8 h-8 rounded-xl bg-[#E07A5F] text-white flex items-center justify-center shrink-0 font-bold shadow-xs mt-1">
                        <Bot size={16} />
                      </div>
                    )}

                    <div className={`max-w-[85%] rounded-2xl p-4 space-y-3 ${
                      msg.role === 'user'
                        ? 'bg-[#E07A5F] text-white font-medium ml-8 shadow-sm'
                        : 'bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-800 dark:text-zinc-200 shadow-xs'
                    }`}>
                      <div className="whitespace-pre-line leading-relaxed">
                        {msg.content}
                      </div>

                      {/* SUGGESTED RECIPE CARDS (IF ANY RETURNED BY AI) */}
                      {msg.suggestedRecipes && msg.suggestedRecipes.length > 0 && (
                        <div className="pt-2 border-t border-zinc-100 dark:border-zinc-700/60 space-y-2">
                          <span className="text-[10px] font-black uppercase text-[#E07A5F] block">
                            Platos de Carmen identificados en esta respuesta:
                          </span>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {msg.suggestedRecipes.map(id => {
                              const rec = CARMEN_RECIPES_DATABASE.find(r => r.id === id);
                              if (!rec) return null;
                              return (
                                <div key={rec.id} className="p-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 flex items-center gap-2.5">
                                  <img src={rec.image} alt={rec.name} className="w-10 h-10 rounded-lg object-cover shrink-0" />
                                  <div className="min-w-0 flex-1">
                                    <strong className="text-[11px] font-bold text-zinc-900 dark:text-white block truncate">
                                      {rec.name}
                                    </strong>
                                    <span className="text-[10px] text-zinc-400 block">{rec.prepTimeFormatted} · {rec.station}</span>
                                  </div>
                                </div>
                              );
                            })}
                          </div>

                          <button
                            onClick={() => handleApplySuggestedRecipes(msg.suggestedRecipes!)}
                            className="w-full py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-black text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs mt-2"
                          >
                            <CheckCircle2 size={14} />
                            <span>Cargar estos {msg.suggestedRecipes.length} platos en mi menú</span>
                          </button>
                        </div>
                      )}
                    </div>

                    {msg.role === 'user' && (
                      <div className="w-8 h-8 rounded-xl bg-zinc-200 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-200 flex items-center justify-center shrink-0 font-bold mt-1">
                        <UserIcon size={16} />
                      </div>
                    )}
                  </div>
                ))}

                {isAiResponding && (
                  <div className="flex gap-3 justify-start items-center text-zinc-400 text-xs py-2">
                    <div className="w-8 h-8 rounded-xl bg-[#E07A5F] text-white flex items-center justify-center shrink-0 font-bold shadow-xs">
                      <Bot size={16} />
                    </div>
                    <div className="p-3 rounded-2xl bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 flex items-center gap-2">
                      <Loader2 size={14} className="animate-spin text-[#E07A5F]" />
                      <span>El Copiloto Culinario está analizando y calculando...</span>
                    </div>
                  </div>
                )}
                <div ref={chatBottomRef} />
              </div>

              {/* QUICK MODIFICATION PROMPT CHIPS */}
              <div className="space-y-1.5 pt-1">
                <span className="text-[10px] font-bold text-zinc-400 flex items-center gap-1">
                  Acciones y modificaciones rápidas con el Copiloto:
                </span>
                <div className="flex flex-wrap gap-2">
                  {QUICK_ACTION_PROMPTS.map(action => (
                    <button
                      key={action.id}
                      onClick={() => handleSendChatMessage(action.prompt)}
                      disabled={isAiResponding}
                      className="px-3 py-1.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 border border-zinc-200 dark:border-zinc-700/80 text-[11px] font-bold text-zinc-700 dark:text-zinc-300 transition-all cursor-pointer shadow-2xs hover:scale-[1.02] disabled:opacity-50"
                    >
                      {action.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* CHAT INPUT BAR WITH MICROPHONE & SEND */}
              <div className="flex gap-2">
                <div className="relative flex-1 flex items-center">
                  <input
                    type="text"
                    placeholder="Pregúntale a la IA (ej: 'Añade bacalao y quita pollo', 'Ajusta raciones', '¿Cómo se conservan las lentejas?')..."
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendChatMessage();
                      }
                    }}
                    className="w-full px-4 pr-12 py-3 rounded-2xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-xs font-medium text-zinc-800 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-[#E07A5F]/40"
                  />
                  
                  <button
                    type="button"
                    onClick={() => toggleSpeechRecognition('chat')}
                    title={isListening && speechTarget === 'chat' ? 'Detener grabación' : 'Hablar al Copiloto por micrófono'}
                    className={`absolute right-2.5 p-2 rounded-xl transition-all cursor-pointer ${
                      isListening && speechTarget === 'chat'
                        ? 'bg-rose-500 text-white animate-pulse shadow-md'
                        : 'bg-zinc-200 dark:bg-zinc-700 hover:bg-[#E07A5F] hover:text-white text-zinc-600 dark:text-zinc-300'
                    }`}
                  >
                    {isListening && speechTarget === 'chat' ? <MicOff size={16} /> : <Mic size={16} />}
                  </button>
                </div>

                <button
                  onClick={() => handleSendChatMessage()}
                  disabled={!chatInput.trim() || isAiResponding}
                  className="btn-hero-copper text-white px-5 py-3 rounded-2xl font-bold text-xs flex items-center gap-2 cursor-pointer shadow-md disabled:opacity-50 transition-all"
                >
                  <Send size={15} />
                  <span className="hidden sm:inline">Enviar</span>
                </button>
              </div>

            </div>
          )}

          {/* ===================================================================== */}
          {/* SUB-VIEW 2: MANUAL CATALOG BROWSER                                    */}
          {/* ===================================================================== */}
          {step2SubMode === 'manual_catalog' && (
            <div className="space-y-4">
              
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
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 max-h-[620px] overflow-y-auto pr-1">
                {availableCarmenRecipes.map(recipe => {
                  const isSelectedSingle = projectMode === 'single_recipe' && selectedSingleRecipe?.id === recipe.id;
                  const isSelectedManual = projectMode === 'batch_cooking' && manuallySelectedRecipeIds.includes(recipe.id);

                  return (
                    <div
                      key={recipe.id}
                      onClick={() => {
                        if (projectMode === 'single_recipe') {
                          setSelectedSingleRecipe(recipe);
                        } else {
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

            </div>
          )}

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
      {/* QUICK ADD RECIPE MODAL                                                    */}
      {/* ========================================================================= */}
      {isAddRecipeModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-2xl bg-white dark:bg-zinc-900 rounded-3xl p-6 border border-zinc-200 dark:border-zinc-800 shadow-2xl space-y-4 max-h-[85vh] flex flex-col">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-100 dark:border-zinc-800">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-[#E07A5F]/20 text-[#E07A5F] flex items-center justify-center font-bold">
                  <Plus size={18} />
                </div>
                <div>
                  <h3 className="font-black text-sm text-zinc-900 dark:text-white">Añadir Receta al Lote</h3>
                  <span className="text-[11px] text-zinc-400">Recetario canónico de Cocina con Carmen</span>
                </div>
              </div>
              <button 
                onClick={() => setIsAddRecipeModalOpen(false)}
                className="p-1.5 rounded-xl text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
              >
                <X size={18} />
              </button>
            </div>

            <div className="relative">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
              <input
                type="text"
                placeholder="Buscar por plato o ingrediente (bacalao, pollo, lentejas, pisto)..."
                value={quickAddSearch}
                onChange={(e) => setQuickAddSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-xs font-medium text-zinc-800 dark:text-zinc-200 focus:outline-none"
              />
            </div>

            <div className="flex-1 overflow-y-auto space-y-2 pr-1">
              {CARMEN_RECIPES_DATABASE
                .filter(r => {
                  if (selectedAllergens.length > 0 && r.allergens.some(a => selectedAllergens.includes(a))) return false;
                  if (!quickAddSearch.trim()) return true;
                  const q = quickAddSearch.toLowerCase();
                  return r.name.toLowerCase().includes(q) || r.ingredientsPerServing.some(i => i.name.toLowerCase().includes(q));
                })
                .map(r => {
                  const isAlreadyIn = manuallySelectedRecipeIds.includes(r.id);
                  return (
                    <div key={r.id} className="p-3 rounded-2xl bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700/80 flex items-center justify-between gap-3 text-xs">
                      <div className="flex items-center gap-3 min-w-0">
                        <img src={r.image} alt={r.name} className="w-10 h-10 rounded-xl object-cover shrink-0" />
                        <div className="min-w-0">
                          <strong className="font-bold text-zinc-900 dark:text-white block truncate text-[11px]">{r.name}</strong>
                          <span className="text-[10px] text-zinc-400">{r.category} · {r.prepTimeFormatted} · {r.station}</span>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleAddRecipeDirectly(r.id)}
                        disabled={isAlreadyIn}
                        className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-all flex items-center gap-1 cursor-pointer shrink-0 ${
                          isAlreadyIn
                            ? 'bg-zinc-200 dark:bg-zinc-700 text-zinc-400 cursor-not-allowed'
                            : 'btn-hero-copper text-white shadow-2xs'
                        }`}
                      >
                        {isAlreadyIn ? <Check size={13} /> : <Plus size={13} />}
                        <span>{isAlreadyIn ? 'Ya en lote' : 'Añadir'}</span>
                      </button>
                    </div>
                  );
                })}
            </div>
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
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                {generatedDishes.map((dish) => (
                  <div key={dish.id} className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700/80 flex items-center justify-between gap-3 text-xs shadow-xs hover:border-[#E07A5F]/40 transition-colors">
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

          {/* MASTER BIFURCATION (COOK MYSELF vs HIRE CHEF CON/SIN COMPRA) */}
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
              <span>Volver a Modificar con el Copiloto IA</span>
            </button>
          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL DE VARIACIONES CULINARIAS ALTERNATIVAS (CARMEN SSOT)                */}
      {/* ========================================================================= */}
      {activeVariationsRecipeId && (() => {
        const currentRecipe = CARMEN_RECIPES_DATABASE.find(r => r.id === activeVariationsRecipeId);
        const alternatives = getAlternativeRecipesFor(activeVariationsRecipeId, selectedAllergens);

        return (
          <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl space-y-5 max-h-[88vh] overflow-y-auto">
              
              <div className="flex items-center justify-between pb-3 border-b border-zinc-100 dark:border-zinc-800">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-[#E07A5F]">
                    Variaciones &amp; Técnicas de Carmen
                  </span>
                  <h3 className="text-base font-black text-zinc-900 dark:text-white mt-0.5">
                    Alternativas para "{currentRecipe?.shortName || currentRecipe?.name}"
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveVariationsRecipeId(null)}
                  className="p-2 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              <p className="text-xs text-zinc-600 dark:text-zinc-400">
                Puedes sustituir este plato por otra preparación canónica del mismo ingrediente o categoría técnica de Carmen:
              </p>

              <div className="space-y-3">
                {alternatives.length > 0 ? (
                  alternatives.map(alt => (
                    <div
                      key={alt.id}
                      className="p-3.5 rounded-2xl bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200/80 dark:border-zinc-700/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-amber-500/50 transition-colors"
                    >
                      <div className="flex items-start sm:items-center gap-3 min-w-0 flex-1">
                        <img src={alt.image} alt={alt.name} className="w-12 h-12 rounded-xl object-cover shrink-0 shadow-2xs mt-0.5 sm:mt-0" />
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-[9px] font-black uppercase text-[#E07A5F] bg-[#E07A5F]/10 px-2 py-0.5 rounded">
                              {alt.culinaryTechnique || alt.category} · {alt.station}
                            </span>
                            <span className="text-[10px] text-zinc-400">⏱️ {alt.prepTimeFormatted}</span>
                          </div>
                          <strong className="text-xs font-bold text-zinc-900 dark:text-white block truncate mt-1">{alt.name}</strong>
                          <span className="text-[10px] text-zinc-500 block line-clamp-1 mt-0.5">{alt.batchTip}</span>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          setManuallySelectedRecipeIds(prev =>
                            prev.map(id => (id === activeVariationsRecipeId ? alt.id : id))
                          );
                          setActiveVariationsRecipeId(null);
                        }}
                        className="px-4 py-2 rounded-xl btn-hero-copper text-white text-xs font-black shrink-0 cursor-pointer shadow-xs self-end sm:self-center hover:scale-[1.02] transition-transform"
                      >
                        Elegir esta variante
                      </button>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-zinc-500 py-6 text-center">No hay otras variantes disponibles con los filtros y alérgenos actuales.</p>
                )}
              </div>

            </div>
          </div>
        );
      })()}

    </div>
  );
}
