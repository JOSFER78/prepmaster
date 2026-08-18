import React, { useState } from 'react';
import { 
  Sparkles, 
  ChefHat, 
  Check, 
  ArrowRight, 
  ShieldCheck, 
  Flame, 
  BookOpen, 
  Search, 
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
  Sparkle
} from 'lucide-react';
import { MenuMode, GeneratedMenuPlan, SimulatorContext, BatchProject, BatchDish, BatchShoppingItem } from '../types';
import { referenceChannels, initialFridgeStock } from '../data';
import { initializeDishPortions } from '../lib/batchProjects';

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
  
  // Map dietStyle to cuisineStyle and selectedDiet
  const mapDietStyle = (diet?: string) => {
    switch (diet) {
      case 'fitness': return { style: 'PROTEIN' as const, diets: ['Proteico', 'Bajo en Grasa'] };
      case 'veggie': return { style: 'HEALTHY' as const, diets: ['Vegetariano', 'Plant-Based', 'Rico en Fibra'] };
      case 'lowcarb': return { style: 'PROTEIN' as const, diets: ['Bajo en Carbohidratos', 'Keto'] };
      case 'mediterranean':
      default: return { style: 'BALANCED' as const, diets: ['Mediterránea', 'Saludable'] };
    }
  };

  const initialDiet = mapDietStyle(initialContext?.dietStyle);

  const [currentStep, setCurrentStep] = useState<1 | 2>(1);
  const [peopleCount, setPeopleCount] = useState<number>(initialContext?.peopleCount || 4);
  const [daysCount, setDaysCount] = useState<number>(initialContext?.daysCount || 5);
  const [mealMultiplier, setMealMultiplier] = useState<number>(initialContext?.mealCoverage === 'both' ? 2 : 1);
  const [cuisineStyle, setCuisineStyle] = useState<'HEALTHY' | 'BALANCED' | 'TRADITIONAL' | 'PROTEIN'>(initialDiet.style);
  const [budgetLevel, setBudgetLevel] = useState<'ECONOMIC' | 'BALANCED' | 'GOURMET'>('ECONOMIC');
  const [cravings, setCravings] = useState<string>('Guisos reconfortantes y verduras de temporada');
  const [includeFridge, setIncludeFridge] = useState<boolean>(true);
  const [selectedDiet, setSelectedDiet] = useState<string[]>(initialDiet.diets);
  const [selectedChannelId, setSelectedChannelId] = useState<string>('c1');

  // Dynamic Total Servings
  const totalServings = peopleCount * daysCount * mealMultiplier;

  // Generation state
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [generationProgress, setGenerationProgress] = useState<number>(0);
  const [generationStatusText, setGenerationStatusText] = useState<string>('');
  const [generatedPlan, setGeneratedPlan] = useState<GeneratedMenuPlan | null>(null);

  const getCuisineStyleLabel = () => {
    switch (cuisineStyle) {
      case 'HEALTHY': return 'Saludable & Ligero (Plant-based)';
      case 'BALANCED': return 'Equilibrado & Mediterráneo';
      case 'TRADITIONAL': return 'Tradicional & Reconfortante';
      case 'PROTEIN': return 'Proteico & Fitness';
    }
  };

  const getBudgetLabel = () => {
    switch (budgetLevel) {
      case 'ECONOMIC': return 'Económico';
      case 'BALANCED': return 'Estándar';
      case 'GOURMET': return 'Gourmet';
    }
  };

  const toggleDiet = (diet: string) => {
    setSelectedDiet(prev => 
      prev.includes(diet) ? prev.filter(d => d !== diet) : [...prev, diet]
    );
  };

  // Recipe templates generator based on style
  const getDishesForStyle = (style: typeof cuisineStyle, servingsPerDish: number) => {
    switch (style) {
      case 'PROTEIN':
        return [
          {
            dayName: 'Fuego 1 · Olla',
            mealType: 'Almuerzo' as const,
            dishName: 'Guiso de Ternera Magra y Champiñones Portobello',
            servings: servingsPerDish,
            prepTime: '40 min (Cazuela / Fuego 1)',
            isFromFridge: true,
            ingredients: [
              { name: 'Ternera magra para guisar', quantity: 0.25 * servingsPerDish, unit: 'kg', category: 'carnes-pescados' },
              { name: 'Champiñones Portobello', quantity: 0.15 * servingsPerDish, unit: 'kg', category: 'frescos' },
              { name: 'Zanahorias', quantity: 0.1 * servingsPerDish, unit: 'kg', category: 'frescos' },
              { name: 'Caldo de carne desgrasado', quantity: 0.2 * servingsPerDish, unit: 'L', category: 'despensa' }
            ],
            instructions: ['Sellar la carne a fuego fuerte.', 'Añadir verduras pochadas y cubrir con caldo.', 'Cocinar 35m a fuego lento.']
          },
          {
            dayName: 'Horno · Bandeja 1',
            mealType: 'Almuerzo' as const,
            dishName: 'Pechugas de Pollo de Corral al Horno con Romero y Batata Asada',
            servings: servingsPerDish,
            prepTime: '35 min (Horno 190°C)',
            isFromFridge: true,
            ingredients: [
              { name: 'Pechuga de pollo de corral', quantity: 0.25 * servingsPerDish, unit: 'kg', category: 'carnes-pescados' },
              { name: 'Batata / Boniato', quantity: 0.2 * servingsPerDish, unit: 'kg', category: 'frescos' },
              { name: 'Aceite de oliva virgen extra', quantity: 0.02 * servingsPerDish, unit: 'L', category: 'despensa' },
              { name: 'Romero y especias', quantity: 1, unit: 'puñado', category: 'especias' }
            ],
            instructions: ['Cortar batata en dados y colocar con el pollo.', 'Rociar con AOVE y romero.', 'Hornear 35 min a 190°C.']
          },
          {
            dayName: 'Fuego 2 · Wok',
            mealType: 'Cena' as const,
            dishName: 'Salteado de Pavo, Brócoli al Vapor y Quinoa Real',
            servings: servingsPerDish,
            prepTime: '25 min (Fuego 2)',
            isFromFridge: false,
            ingredients: [
              { name: 'Solomillo de pavo en tiras', quantity: 0.2 * servingsPerDish, unit: 'kg', category: 'carnes-pescados' },
              { name: 'Brócoli fresco', quantity: 0.2 * servingsPerDish, unit: 'kg', category: 'frescos' },
              { name: 'Quinoa real', quantity: 0.08 * servingsPerDish, unit: 'kg', category: 'despensa' },
              { name: 'Salsa de soja baja en sal', quantity: 0.03 * servingsPerDish, unit: 'L', category: 'despensa' }
            ],
            instructions: ['Cocer quinoa 12 min.', 'Saltear tiras de pavo y brócoli al dente.', 'Mezclar y enfriar para tuppers.']
          },
          {
            dayName: 'Fuego 3 · Cazo',
            mealType: 'Cena' as const,
            dishName: 'Crema Proteica de Calabacín, Espinacas y Queso Ricotta',
            servings: servingsPerDish,
            prepTime: '25 min (Fuego 3)',
            isFromFridge: true,
            ingredients: [
              { name: 'Calabacines verdes', quantity: 0.3 * servingsPerDish, unit: 'kg', category: 'frescos' },
              { name: 'Espinacas baby', quantity: 0.15 * servingsPerDish, unit: 'kg', category: 'frescos' },
              { name: 'Queso Ricotta o requesón 0%', quantity: 0.1 * servingsPerDish, unit: 'kg', category: 'refrigerados' },
              { name: 'Cebolla dulce', quantity: 0.1 * servingsPerDish, unit: 'kg', category: 'frescos' }
            ],
            instructions: ['Pochar cebolla y calabacín.', 'Añadir espinacas y triturar con ricotta.', 'Envasar en tarros herméticos.']
          }
        ];

      case 'HEALTHY':
        return [
          {
            dayName: 'Fuego 1 · Olla',
            mealType: 'Almuerzo' as const,
            dishName: 'Curry Aromático de Garbanzos Pedrosillano con Espinacas',
            servings: servingsPerDish,
            prepTime: '35 min (Fuego 1)',
            isFromFridge: true,
            ingredients: [
              { name: 'Garbanzos cocidos o secos', quantity: 0.2 * servingsPerDish, unit: 'kg', category: 'legumbres' },
              { name: 'Leche de coco ligera', quantity: 0.1 * servingsPerDish, unit: 'L', category: 'despensa' },
              { name: 'Espinacas frescas', quantity: 0.15 * servingsPerDish, unit: 'kg', category: 'frescos' },
              { name: 'Curry suave en polvo', quantity: 1, unit: 'cda', category: 'especias' }
            ],
            instructions: ['Sofreír especias con cebolla y tomate.', 'Añadir garbanzos y leche de coco.', 'Incorporar espinacas al final.']
          },
          {
            dayName: 'Horno · Bandeja 1',
            mealType: 'Almuerzo' as const,
            dishName: 'Lasaña Rústica de Berenjenas, Lentejas Rojas y Bechamel de Avena',
            servings: servingsPerDish,
            prepTime: '40 min (Horno 180°C)',
            isFromFridge: true,
            ingredients: [
              { name: 'Berenjenas grandes', quantity: 0.3 * servingsPerDish, unit: 'kg', category: 'frescos' },
              { name: 'Lentejas rojas peladas', quantity: 0.1 * servingsPerDish, unit: 'kg', category: 'despensa' },
              { name: 'Tomate triturado natural', quantity: 0.2 * servingsPerDish, unit: 'L', category: 'despensa' },
              { name: 'Bebida de avena sin azúcar', quantity: 0.1 * servingsPerDish, unit: 'L', category: 'despensa' }
            ],
            instructions: ['Laminar berenjenas y marcar.', 'Hacer boloñesa vegetal de lenteja roja.', 'Montar capas y gratinar.']
          },
          {
            dayName: 'Fuego 2 · Cazuela',
            mealType: 'Cena' as const,
            dishName: 'Salteado de Tofu Firme Marinado con Verduras de Temporada',
            servings: servingsPerDish,
            prepTime: '20 min (Fuego 2)',
            isFromFridge: false,
            ingredients: [
              { name: 'Tofu firme ecológico', quantity: 0.2 * servingsPerDish, unit: 'kg', category: 'refrigerados' },
              { name: 'Pimientos rojo y verde', quantity: 0.15 * servingsPerDish, unit: 'kg', category: 'frescos' },
              { name: 'Cebolla roja', quantity: 0.1 * servingsPerDish, unit: 'kg', category: 'frescos' },
              { name: 'Semillas de sésamo tostado', quantity: 1, unit: 'puñado', category: 'especias' }
            ],
            instructions: ['Picar tofu en dados y dorar.', 'Saltear verduras crujientes.', 'Integrar con sésamo.']
          },
          {
            dayName: 'Fuego 3 · Cazo',
            mealType: 'Cena' as const,
            dishName: 'Crema Aterciopelada de Calabaza con Cúrcuma y Jengibre',
            servings: servingsPerDish,
            prepTime: '30 min (Fuego 3)',
            isFromFridge: true,
            ingredients: [
              { name: 'Calabaza cacahuete', quantity: 0.35 * servingsPerDish, unit: 'kg', category: 'frescos' },
              { name: 'Puerro pochado', quantity: 0.15 * servingsPerDish, unit: 'kg', category: 'frescos' },
              { name: 'Jengibre fresco y cúrcuma', quantity: 1, unit: 'cdta', category: 'especias' },
              { name: 'Aceite de oliva virgen extra', quantity: 0.02 * servingsPerDish, unit: 'L', category: 'despensa' }
            ],
            instructions: ['Pochar puerro con calabaza.', 'Cocer 20 min con agua justa y triturar fino.', 'Emulsionar con AOVE.']
          }
        ];

      case 'TRADITIONAL':
        return [
          {
            dayName: 'Fuego 1 · Olla',
            mealType: 'Almuerzo' as const,
            dishName: 'Alubias Blancas Estofadas con Hortalizas de Ribera',
            servings: servingsPerDish,
            prepTime: '45 min (Olla exprés / Fuego 1)',
            isFromFridge: true,
            ingredients: [
              { name: 'Alubias blancas de ribera', quantity: 0.18 * servingsPerDish, unit: 'kg', category: 'legumbres' },
              { name: 'Zanahorias y puerro', quantity: 0.2 * servingsPerDish, unit: 'kg', category: 'frescos' },
              { name: 'Pimentón de la Vera dulce', quantity: 1, unit: 'cda', category: 'especias' },
              { name: 'Laurel y ajos', quantity: 1, unit: 'unidad', category: 'especias' }
            ],
            instructions: ['Estofar alubias con hortalizas a fuego lento.', 'Añadir sofrito de pimentón y ajo.', 'Reposar antes de tuppers.']
          },
          {
            dayName: 'Fuego 2 · Cazuela',
            mealType: 'Almuerzo' as const,
            dishName: 'Carrilleras Estofadas al Vino Tinto y Laurel',
            servings: servingsPerDish,
            prepTime: '50 min (Cazuela / Fuego 2)',
            isFromFridge: true,
            ingredients: [
              { name: 'Carrilleras magras', quantity: 0.25 * servingsPerDish, unit: 'kg', category: 'carnes-pescados' },
              { name: 'Vino tinto de calidad', quantity: 0.1 * servingsPerDish, unit: 'L', category: 'despensa' },
              { name: 'Cebolla dulce y zanahoria', quantity: 0.2 * servingsPerDish, unit: 'kg', category: 'frescos' },
              { name: 'Caldo casero', quantity: 0.2 * servingsPerDish, unit: 'L', category: 'despensa' }
            ],
            instructions: ['Sellar carrilleras.', 'Pochado largo de verduras y reducción de vino.', 'Guisar hasta quedar tiernas.']
          },
          {
            dayName: 'Horno · Bandeja 1',
            mealType: 'Cena' as const,
            dishName: 'Merluza al Horno en Salsa Verde con Patatas Panaderas',
            servings: servingsPerDish,
            prepTime: '30 min (Horno 190°C)',
            isFromFridge: false,
            ingredients: [
              { name: 'Lomos de merluza fresca', quantity: 0.22 * servingsPerDish, unit: 'kg', category: 'carnes-pescados' },
              { name: 'Patatas panaderas', quantity: 0.25 * servingsPerDish, unit: 'kg', category: 'frescos' },
              { name: 'Guisantes finos', quantity: 0.1 * servingsPerDish, unit: 'kg', category: 'refrigerados' },
              { name: 'Perejil fresco y ajo', quantity: 1, unit: 'manojo', category: 'frescos' }
            ],
            instructions: ['Hornear base de patatas 15 min.', 'Añadir merluza con salsa verde y guisantes.', 'Terminar 12 min.']
          },
          {
            dayName: 'Fuego 3 · Cazuela',
            mealType: 'Cena' as const,
            dishName: 'Pisto Tradicional con Tomate Reducido y Huevos Escalfados',
            servings: servingsPerDish,
            prepTime: '35 min (Fuego 3)',
            isFromFridge: true,
            ingredients: [
              { name: 'Calabacín y berenjena', quantity: 0.3 * servingsPerDish, unit: 'kg', category: 'frescos' },
              { name: 'Pimientos verde y rojo', quantity: 0.2 * servingsPerDish, unit: 'kg', category: 'frescos' },
              { name: 'Tomate frito casero', quantity: 0.2 * servingsPerDish, unit: 'kg', category: 'despensa' },
              { name: 'Aceite de oliva virgen extra', quantity: 0.03 * servingsPerDish, unit: 'L', category: 'despensa' }
            ],
            instructions: ['Pochar verduras por orden de dureza.', 'Reducir con tomate a fuego lento.', 'Guardar en recipientes herméticos.']
          }
        ];

      case 'BALANCED':
      default:
        return [
          {
            dayName: 'Fuego 1 · Olla Exprés',
            mealType: 'Almuerzo' as const,
            dishName: 'Lentejas Pardinas con Verduras de la Huerta',
            servings: servingsPerDish,
            prepTime: '45 min (Olla exprés / Fuego 1)',
            isFromFridge: true,
            ingredients: [
              { name: 'Lentejas pardinas', quantity: 0.15 * servingsPerDish, unit: 'kg', category: 'legumbres' },
              { name: 'Zanahorias', quantity: 0.1 * servingsPerDish, unit: 'kg', category: 'frescos' },
              { name: 'Puerro', quantity: 0.1 * servingsPerDish, unit: 'kg', category: 'frescos' },
              { name: 'Pimiento verde', quantity: 0.08 * servingsPerDish, unit: 'kg', category: 'frescos' },
              { name: 'Pimentón dulce y laurel', quantity: 1, unit: 'cda', category: 'especias' }
            ],
            instructions: ['Rehogar verduras picadas.', 'Añadir lentejas y agua fría.', 'Cerrar olla exprés 18 min.']
          },
          {
            dayName: 'Fuego 2 · Cazuela',
            mealType: 'Almuerzo' as const,
            dishName: 'Ternera Magra Estofada en su Propio Jugo',
            servings: servingsPerDish,
            prepTime: '40 min (Cazuela / Fuego 2)',
            isFromFridge: true,
            ingredients: [
              { name: 'Ternera magra en dados', quantity: 0.25 * servingsPerDish, unit: 'kg', category: 'carnes-pescados' },
              { name: 'Cebolla dulce', quantity: 0.15 * servingsPerDish, unit: 'kg', category: 'frescos' },
              { name: 'Caldo de verduras', quantity: 0.2 * servingsPerDish, unit: 'L', category: 'despensa' },
              { name: 'Guisantes congelados', quantity: 0.1 * servingsPerDish, unit: 'kg', category: 'refrigerados' }
            ],
            instructions: ['Sellar dados de ternera.', 'Pochar cebolla y añadir caldo.', 'Cocinar 35 min tapado.']
          },
          {
            dayName: 'Horno · Bandeja 1',
            mealType: 'Cena' as const,
            dishName: 'Lomos de Salmón con Espárragos y Patatas Panaderas',
            servings: servingsPerDish,
            prepTime: '30 min (Horno 190°C)',
            isFromFridge: false,
            ingredients: [
              { name: 'Lomos de salmón fresco', quantity: 0.2 * servingsPerDish, unit: 'kg', category: 'carnes-pescados' },
              { name: 'Patatas medianas', quantity: 0.25 * servingsPerDish, unit: 'kg', category: 'frescos' },
              { name: 'Espárragos trigueros', quantity: 0.15 * servingsPerDish, unit: 'kg', category: 'frescos' },
              { name: 'Aceite de oliva virgen extra', quantity: 0.02 * servingsPerDish, unit: 'L', category: 'despensa' }
            ],
            instructions: ['Asar patatas 15 min.', 'Incorporar salmón y espárragos.', 'Hornear 12 min más a 190°C.']
          },
          {
            dayName: 'Fuego 3 · Cazo',
            mealType: 'Cena' as const,
            dishName: 'Crema Suave de Calabaza Asada y Puerro Pochado',
            servings: servingsPerDish,
            prepTime: '25 min (Fuego 3)',
            isFromFridge: true,
            ingredients: [
              { name: 'Calabaza pelada', quantity: 0.35 * servingsPerDish, unit: 'kg', category: 'frescos' },
              { name: 'Puerro', quantity: 0.15 * servingsPerDish, unit: 'kg', category: 'frescos' },
              { name: 'Patata', quantity: 0.1 * servingsPerDish, unit: 'kg', category: 'frescos' },
              { name: 'Aceite de oliva virgen extra', quantity: 0.02 * servingsPerDish, unit: 'L', category: 'despensa' }
            ],
            instructions: ['Hervir calabaza, puerro y patata.', 'Triturar muy fino con AOVE y sal.', 'Distribuir en recipientes de cristal.']
          }
        ];
    }
  };

  // Generate Menu Execution
  const handleGenerate = () => {
    setIsGenerating(true);
    setGenerationProgress(20);
    setGenerationStatusText(`Consultando parámetros (${peopleCount} comensales × ${daysCount} días = ${totalServings} raciones)...`);

    setTimeout(() => {
      setGenerationProgress(45);
      setGenerationStatusText(`Evaluando perfil: ${getCuisineStyleLabel()} (${getBudgetLabel()})...`);
    }, 400);

    setTimeout(() => {
      setGenerationProgress(70);
      setGenerationStatusText(`Cruzando inventario de despensa y preferencias (${cravings})...`);
    }, 900);

    setTimeout(() => {
      setGenerationProgress(90);
      setGenerationStatusText(`Optimizando 4 estaciones de cocina y tiempos en paralelo...`);
    }, 1400);

    setTimeout(() => {
      setGenerationProgress(100);
      const servingsPerDish = Math.ceil(totalServings / 4);
      const items = getDishesForStyle(cuisineStyle, servingsPerDish);

      const plan: GeneratedMenuPlan = {
        id: `plan_${Date.now()}`,
        title: `Lote Semanal ${getCuisineStyleLabel()} #${Math.floor(Math.random() * 80 + 10)}`,
        mode: 'AUTO_BATCH',
        peopleCount,
        daysCount,
        referenceChannelName: 'TouChef Batch Engine',
        items,
        batchCookingSummary: {
          totalTime: '1h 45m (Fuegos y Horno simultáneos)',
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
    }, 1800);
  };

  const handleApproveAndSave = () => {
    if (!generatedPlan) return;
    
    const categories: Array<'legumbres' | 'carnes' | 'pescados' | 'cremas' | 'verduras' | 'acompanamientos'> = [
      'legumbres', 'carnes', 'pescados', 'cremas', 'verduras', 'acompanamientos'
    ];

    const batchDishes: BatchDish[] = generatedPlan.items.map((it, idx) => {
      const dish = {
        id: `dish_${Date.now()}_${idx}`,
        name: it.dishName,
        category: categories[idx % categories.length],
        servings: it.servings || (peopleCount * daysCount),
        prepTime: it.prepTime || '35 min',
        cookingMethod: (idx === 0 ? 'fuego_1' : idx === 1 ? 'fuego_2' : idx === 2 ? 'horno' : 'fuego_3') as any,
        storageAdvice: idx === 2 ? 'Consumo Días 1-2 (Pescado)' : 'Nevera Días 1-3 / Congelador tras día 3',
        isFavorite: false,
        rating: 5,
        ingredients: it.ingredients.map(ing => ({
          name: ing.name,
          quantity: Number(ing.quantity.toFixed(2)),
          unit: ing.unit,
          category: (ing.category || 'despensa') as any
        })),
        instructions: it.instructions
      };

      return initializeDishPortions(dish, daysCount);
    });

    // Compile smart shopping list with pantry deduction
    const shoppingMap = new Map<string, BatchShoppingItem>();

    generatedPlan.items.forEach(dish => {
      dish.ingredients.forEach(ing => {
        const key = ing.name.toLowerCase().trim();
        const existing = shoppingMap.get(key);
        
        let inPantry = 0;
        if (includeFridge) {
          const pantryMatch = initialFridgeStock.find(p => 
            p.name.toLowerCase().includes(key) || key.includes(p.name.toLowerCase())
          );
          if (pantryMatch) {
            inPantry = pantryMatch.quantity;
          }
        }

        const reqQty = Number(((existing ? existing.requiredQty : 0) + ing.quantity).toFixed(2));
        const toBuy = Number(Math.max(0, reqQty - inPantry).toFixed(2));

        shoppingMap.set(key, {
          id: existing ? existing.id : `shop_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
          name: ing.name,
          requiredQty: reqQty,
          inPantryQty: inPantry,
          toBuyQty: toBuy,
          unit: ing.unit,
          category: (ing.category || 'despensa') as any,
          isBought: toBuy === 0, // Auto-marked as bought if already completely in pantry
          isFromPantryDeduction: inPantry > 0
        });
      });
    });

    const project: BatchProject = {
      id: `batch_proj_${Date.now()}`,
      title: generatedPlan.title,
      status: 'shopping',
      createdAt: new Date().toISOString(),
      peopleCount,
      daysCount,
      mealCoverage: mealMultiplier === 2 ? 'both' : 'lunches',
      dietStyle: cuisineStyle.toLowerCase(),
      totalServings,
      totalCookingTime: generatedPlan.batchCookingSummary.totalTime,
      dishes: batchDishes,
      shoppingList: Array.from(shoppingMap.values()),
      hoursSavedWeekly: Math.round(daysCount * 1.5)
    };

    if (onBatchProjectCreated) {
      onBatchProjectCreated(project);
    } else {
      onNavigateToShopping();
    }
  };

  const dietsList = ['Saludable', 'Sin Gluten', 'Sin Lactosa', 'Bajo en Sal', 'Keto / Low Carb', 'Proteico'];

  return (
    <div className="space-y-4 animate-fade-in pb-8 text-zinc-900 dark:text-zinc-100 max-w-5xl mx-auto">
      
      {/* HEADER BAR */}
      <div className="bg-white dark:bg-zinc-900 rounded-2xl p-4 border border-zinc-200 dark:border-zinc-800 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold flex items-center justify-center border border-emerald-500/20">
            <Sparkles size={20} />
          </div>
          <div>
            <h1 className="text-sm sm:text-base font-bold text-zinc-900 dark:text-white leading-tight">
              {currentStep === 1 ? 'Planificador Inteligente de Batch Cooking' : 'Plan Maestro de Cocina Generado'}
            </h1>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              {currentStep === 1 
                ? 'Calcula comensales, días y balance de fuegos paralelos' 
                : `${totalServings} raciones optimizadas para cocinar en una sola sesión`}
            </p>
          </div>
        </div>

        {/* Step Indicator */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 text-xs font-bold bg-zinc-100 dark:bg-zinc-800 px-3 py-1.5 rounded-xl border border-zinc-200 dark:border-zinc-700">
            <span className={`w-2 h-2 rounded-full ${currentStep === 1 ? 'bg-emerald-500 animate-pulse' : 'bg-emerald-500'}`} />
            <span>Paso {currentStep} de 2</span>
          </div>
        </div>
      </div>

      {/* STEP 1: PARAMS FORM */}
      {currentStep === 1 && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          
          {/* Main Form (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            
            {/* Core Metrics: People & Days */}
            <div className="bg-white dark:bg-zinc-900 rounded-3xl p-5 border border-zinc-200 dark:border-zinc-800 shadow-xs space-y-4">
              <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 flex items-center gap-2">
                <Users size={14} className="text-emerald-500" />
                <span>1. Dimensionamiento del Hogar</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* People */}
                <div className="p-3 bg-zinc-50 dark:bg-zinc-800/60 rounded-2xl border border-zinc-200 dark:border-zinc-700/60 space-y-2">
                  <span className="text-xs font-bold text-zinc-700 dark:text-zinc-300">Comensales</span>
                  <div className="flex items-center justify-between">
                    <button 
                      onClick={() => setPeopleCount(Math.max(1, peopleCount - 1))}
                      className="w-8 h-8 rounded-xl bg-white dark:bg-zinc-700 border border-zinc-200 dark:border-zinc-600 font-bold text-zinc-700 dark:text-zinc-200 flex items-center justify-center hover:bg-zinc-100"
                    >
                      -
                    </button>
                    <span className="text-lg font-black text-zinc-900 dark:text-white">{peopleCount}</span>
                    <button 
                      onClick={() => setPeopleCount(Math.min(10, peopleCount + 1))}
                      className="w-8 h-8 rounded-xl bg-white dark:bg-zinc-700 border border-zinc-200 dark:border-zinc-600 font-bold text-zinc-700 dark:text-zinc-200 flex items-center justify-center hover:bg-zinc-100"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Days */}
                <div className="p-3 bg-zinc-50 dark:bg-zinc-800/60 rounded-2xl border border-zinc-200 dark:border-zinc-700/60 space-y-2">
                  <span className="text-xs font-bold text-zinc-700 dark:text-zinc-300">Días a Cubrir</span>
                  <div className="flex items-center justify-between">
                    <button 
                      onClick={() => setDaysCount(Math.max(2, daysCount - 1))}
                      className="w-8 h-8 rounded-xl bg-white dark:bg-zinc-700 border border-zinc-200 dark:border-zinc-600 font-bold text-zinc-700 dark:text-zinc-200 flex items-center justify-center hover:bg-zinc-100"
                    >
                      -
                    </button>
                    <span className="text-lg font-black text-zinc-900 dark:text-white">{daysCount} días</span>
                    <button 
                      onClick={() => setDaysCount(Math.min(7, daysCount + 1))}
                      className="w-8 h-8 rounded-xl bg-white dark:bg-zinc-700 border border-zinc-200 dark:border-zinc-600 font-bold text-zinc-700 dark:text-zinc-200 flex items-center justify-center hover:bg-zinc-100"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Meals per day */}
                <div className="p-3 bg-zinc-50 dark:bg-zinc-800/60 rounded-2xl border border-zinc-200 dark:border-zinc-700/60 space-y-2">
                  <span className="text-xs font-bold text-zinc-700 dark:text-zinc-300">Tomas / Día</span>
                  <div className="flex gap-1.5">
                    <button
                      onClick={() => setMealMultiplier(1)}
                      className={`flex-1 py-1.5 rounded-xl text-xs font-bold transition-all ${
                        mealMultiplier === 1 
                          ? 'bg-emerald-600 text-white' 
                          : 'bg-white dark:bg-zinc-700 text-zinc-600 dark:text-zinc-300'
                      }`}
                    >
                      Comidas
                    </button>
                    <button
                      onClick={() => setMealMultiplier(2)}
                      className={`flex-1 py-1.5 rounded-xl text-xs font-bold transition-all ${
                        mealMultiplier === 2 
                          ? 'bg-emerald-600 text-white' 
                          : 'bg-white dark:bg-zinc-700 text-zinc-600 dark:text-zinc-300'
                      }`}
                    >
                      Ambas
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Culinary Style */}
            <div className="bg-white dark:bg-zinc-900 rounded-3xl p-5 border border-zinc-200 dark:border-zinc-800 shadow-xs space-y-4">
              <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 flex items-center gap-2">
                <ChefHat size={14} className="text-emerald-500" />
                <span>2. Estilo Culinario del Lote</span>
              </h2>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {[
                  { id: 'BALANCED', label: 'Mediterráneo', desc: 'Legumbres, carnes magras, pescados' },
                  { id: 'PROTEIN', label: 'Fitness & Alto en Proteína', desc: 'Aves, pescados, batata, verduras' },
                  { id: 'HEALTHY', label: 'Saludable & Plant-based', desc: 'Currys, legumbres, cremas' },
                  { id: 'TRADITIONAL', label: 'Tradicional', desc: 'Guisos clásicos de cuchara' }
                ].map(style => (
                  <button
                    key={style.id}
                    onClick={() => setCuisineStyle(style.id as any)}
                    className={`p-3 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                      cuisineStyle === style.id
                        ? 'bg-emerald-500/10 border-emerald-500 text-emerald-700 dark:text-emerald-300 shadow-xs'
                        : 'bg-zinc-50 dark:bg-zinc-800/60 border-zinc-200 dark:border-zinc-700/60 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100'
                    }`}
                  >
                    <span className="text-xs font-bold block">{style.label}</span>
                    <span className="text-[10px] text-zinc-500 dark:text-zinc-400 mt-1 leading-tight">{style.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Notes / Cravings & Zero Waste */}
            <div className="bg-white dark:bg-zinc-900 rounded-3xl p-5 border border-zinc-200 dark:border-zinc-800 shadow-xs space-y-3">
              <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 flex items-center gap-2">
                <MessageSquare size={14} className="text-emerald-500" />
                <span>3. Preferencias & Aprovechamiento de Despensa</span>
              </h2>

              <div className="space-y-3">
                <div>
                  <label className="text-xs font-semibold text-zinc-600 dark:text-zinc-400 block mb-1">
                    Peticiones especiales o ingredientes favoritos:
                  </label>
                  <input
                    type="text"
                    value={cravings}
                    onChange={(e) => setCravings(e.target.value)}
                    placeholder="Ej. Mucha calabaza, sin picante, legumbres tiernas..."
                    className="w-full p-3 text-xs rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <label className="flex items-center gap-2.5 p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700/60 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={includeFridge}
                    onChange={(e) => setIncludeFridge(e.target.checked)}
                    className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
                  />
                  <div className="text-xs">
                    <strong className="text-zinc-900 dark:text-white">Aprovechamiento Zero Waste (Descontar de Despensa)</strong>
                    <p className="text-zinc-500 dark:text-zinc-400 text-[11px]">
                      Cruzar automáticamente con el stock de tu nevera para evitar comprar ingredientes que ya tienes en casa.
                    </p>
                  </div>
                </label>
              </div>
            </div>

          </div>

          {/* Right Summary Sidebar (1 col) */}
          <div className="space-y-4">
            <div className="bg-gradient-to-br from-emerald-950/40 to-zinc-900 rounded-3xl p-6 border border-emerald-500/30 text-white space-y-5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                  Resumen de Fabricación
                </span>
                <Sparkles size={16} className="text-emerald-400" />
              </div>

              <div className="space-y-3">
                <div className="p-3 bg-black/40 rounded-2xl border border-white/10 flex justify-between items-center">
                  <span className="text-xs text-zinc-300">Raciones Totales:</span>
                  <span className="text-lg font-black text-emerald-400">{totalServings} raciones</span>
                </div>

                <div className="p-3 bg-black/40 rounded-2xl border border-white/10 flex justify-between items-center">
                  <span className="text-xs text-zinc-300">Tiempo de Cocina:</span>
                  <span className="text-sm font-bold text-white">~1h 45m (En paralelo)</span>
                </div>

                <div className="p-3 bg-black/40 rounded-2xl border border-white/10 flex justify-between items-center">
                  <span className="text-xs text-zinc-300">Ahorro Semanal:</span>
                  <span className="text-sm font-bold text-emerald-300">{Math.round(daysCount * 1.5)} horas libres</span>
                </div>
              </div>

              {/* GENERATE CTA BUTTON */}
              <button
                onClick={handleGenerate}
                disabled={isGenerating}
                className="w-full py-4 bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-black text-sm rounded-2xl shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw size={16} className="animate-spin" />
                    <span>Calculando {totalServings} Raciones...</span>
                  </>
                ) : (
                  <>
                    <Sparkles size={18} />
                    <span>Generar Plan de Lote</span>
                    <ArrowRight size={16} />
                  </>
                )}
              </button>

              {isGenerating && (
                <div className="space-y-2 pt-2">
                  <div className="w-full bg-zinc-800 rounded-full h-2 overflow-hidden">
                    <div 
                      className="bg-emerald-400 h-full rounded-full transition-all duration-300"
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
          
          <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 border border-zinc-200 dark:border-zinc-800 shadow-xs space-y-5">
            
            {/* Summary Top Banner */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-100 dark:border-zinc-800 pb-5">
              <div>
                <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase bg-emerald-500/10 px-2.5 py-0.5 rounded-full">
                  {generatedPlan.items.length} Platos Coordinados • {totalServings} Raciones
                </span>
                <h2 className="text-xl font-black text-zinc-900 dark:text-white mt-1">
                  {generatedPlan.title}
                </h2>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                  Tiempo de cocción en paralelo: <strong>{generatedPlan.batchCookingSummary.totalTime}</strong>
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentStep(1)}
                  className="px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 text-xs font-bold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                >
                  Modificar Parámetros
                </button>

                <button
                  onClick={handleApproveAndSave}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-xs transition-all flex items-center gap-2 active:scale-95"
                >
                  <Check size={16} />
                  <span>Aprobar y Crear Lote</span>
                </button>
              </div>
            </div>

            {/* Parallel Stations Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {generatedPlan.items.map((item, idx) => (
                <div 
                  key={idx}
                  className="bg-zinc-50 dark:bg-zinc-800/60 rounded-2xl border border-zinc-200 dark:border-zinc-700/80 p-5 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-500/10 px-2 py-0.5 rounded uppercase">
                      {item.dayName}
                    </span>
                    <span className="text-xs font-mono font-bold text-zinc-500">
                      {item.servings} raciones
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-zinc-900 dark:text-white leading-snug">
                    {item.dishName}
                  </h3>

                  <div className="text-xs text-zinc-500 dark:text-zinc-400 space-y-1">
                    <p className="font-semibold text-zinc-700 dark:text-zinc-300">Ingredientes Principales:</p>
                    <ul className="grid grid-cols-2 gap-1 text-[11px]">
                      {item.ingredients.map((ing, i) => (
                        <li key={i} className="truncate">
                          • {ing.name} ({ing.quantity} {ing.unit})
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-2 border-t border-zinc-200/60 dark:border-zinc-700/60 text-[11px] text-zinc-500 flex items-center gap-2">
                    <Clock size={13} className="text-emerald-500 shrink-0" />
                    <span>{item.prepTime}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Final CTA */}
            <div className="p-4 bg-emerald-950/20 border border-emerald-500/30 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-zinc-300">
                <strong>¿Listo para el siguiente paso?</strong> Al aprobar se generará la lista de compra categorizada con los descuentos de tu despensa.
              </div>

              <button
                onClick={handleApproveAndSave}
                className="w-full sm:w-auto px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 active:scale-95 shrink-0"
              >
                <Check size={16} />
                <span>Aprobar Plan y Crear Proyecto de Lote</span>
                <ArrowRight size={16} />
              </button>
            </div>

          </div>

        </div>
      )}

    </div>
  );
}
