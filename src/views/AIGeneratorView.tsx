import React, { useState } from 'react';
import { Sparkles, Utensils, Refrigerator, HeartHandshake, Sliders, ChefHat, Check, ArrowRight, ShieldCheck, Flame, BookOpen, Search, RefreshCw, MessageSquare, Send, Clock, ThumbsUp } from 'lucide-react';
import { MenuMode, GeneratedMenuPlan, DailyRotationSlot } from '../types';
import { referenceChannels, initialFridgeStock } from '../data';

interface AIGeneratorViewProps {
  onMenuApproved: (plan: GeneratedMenuPlan) => void;
  onNavigateToShopping: () => void;
}

export function AIGeneratorView({ onMenuApproved, onNavigateToShopping }: AIGeneratorViewProps) {
  // 5x5 Multi-Step Navigation: Phase 1 (1.1 - 1.5), Phase 2 (2.1 - 2.5)
  const [currentStep, setCurrentStep] = useState<1 | 2>(1);
  const [phase1SubStep, setPhase1SubStep] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [phase2SubStep, setPhase2SubStep] = useState<1 | 2 | 3 | 4 | 5>(1);

  const [selectedMode, setSelectedMode] = useState<MenuMode>('AUTO_BATCH');
  const [peopleCount, setPeopleCount] = useState<number>(4);
  const [daysCount, setDaysCount] = useState<number>(5);
  const [cuisineStyle, setCuisineStyle] = useState<'HEALTHY' | 'BALANCED' | 'TRADITIONAL' | 'PROTEIN'>('BALANCED');
  const [budgetLevel, setBudgetLevel] = useState<'ECONOMIC' | 'BALANCED' | 'GOURMET'>('ECONOMIC');
  const [cravings, setCravings] = useState<string>('Guisos reconfortantes y verduras de temporada');
  const [useExternalSearch, setUseExternalSearch] = useState<boolean>(true);
  const [selectedDiet, setSelectedDiet] = useState<string[]>(['Saludable', 'Bajo en Sal']);

  // Dynamic Time Calculation Formula
  const totalServings = peopleCount * daysCount; // e.g. 4 * 5 = 20 raciones
  const suggestedPrepTimeHours = Math.round((totalServings * 0.11) * 10) / 10; // e.g. 2.2 hrs
  const [maxTimeHours] = useState<number>(suggestedPrepTimeHours);

  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [generationProgress, setGenerationProgress] = useState<number>(0);
  const [generationStatusText, setGenerationStatusText] = useState<string>('');
  const [generatedPlan, setGeneratedPlan] = useState<GeneratedMenuPlan | null>(null);
  const [phase2ViewMode, setPhase2ViewMode] = useState<'ROTATION' | 'BATCH'>('BATCH');

  // Interactive feedback state in Step 2
  const [userFeedbackText, setUserFeedbackText] = useState<string>('');
  const [isRefining, setIsRefining] = useState<boolean>(false);
  const [refinementHistory, setRefinementHistory] = useState<string[]>([]);

  const getCuisineStyleLabel = () => {
    switch (cuisineStyle) {
      case 'HEALTHY': return 'Más Saludable & Nutritivo';
      case 'BALANCED': return 'Equilibrado & Variado';
      case 'TRADITIONAL': return 'Tradicional & Reconfortante';
      case 'PROTEIN': return 'Proteico & Rendimiento';
    }
  };

  const getBudgetLabel = () => {
    switch (budgetLevel) {
      case 'ECONOMIC': return 'Más Económico (Ahorro Máximo)';
      case 'BALANCED': return 'Estándar Equilibrado';
      case 'GOURMET': return 'Gourmet / Premium';
    }
  };

  const toggleDiet = (diet: string) => {
    setSelectedDiet(prev => 
      prev.includes(diet) ? prev.filter(d => d !== diet) : [...prev, diet]
    );
  };

  // Auto-generate initial plan with realistic multi-step processing sequence
  const handleGenerate = () => {
    setIsGenerating(true);
    setGenerationProgress(15);
    setGenerationStatusText(`🔍 Consultando parámetros (${peopleCount} personas × ${daysCount} días = ${totalServings} raciones totales)...`);

    // Step 2: 700ms
    setTimeout(() => {
      setGenerationProgress(38);
      setGenerationStatusText(`🥗 Evaluando perfil nutricional: ${getCuisineStyleLabel()} (${getBudgetLabel()})...`);
    }, 700);

    // Step 3: 1500ms
    setTimeout(() => {
      setGenerationProgress(62);
      setGenerationStatusText(`🧊 Cruzando inventario de nevera y restricciones (${selectedDiet.join(', ') || 'Sin restricciones'})...`);
    }, 1500);

    // Step 4: 2300ms
    setTimeout(() => {
      setGenerationProgress(84);
      setGenerationStatusText(`🔥 Orquestando bloques de cocinado en lote (Batch Cooking) y tiempos de fuego...`);
    }, 2300);

    // Step 5: 3100ms
    setTimeout(() => {
      setGenerationProgress(98);
      setGenerationStatusText(`✨ Consolidando el menú óptimo con desglose de raciones y conservación...`);
    }, 3100);

    // Complete at 3600ms
    setTimeout(() => {
      // Dynamic recipe master pools
      const starterPool = [
        {
          id: 'ensalada_tomate',
          keywords: ['tomate', 'tomates', 'ensalada', 'ensaladas', 'campera', 'ventresca'],
          name: 'Ensalada Campera de Tomates Roscados, Ventresca de Atún y Cebolleta',
          tech: 'Aliño en frío con AOVE virgen extra, vinagre de Jerez de reserva y sal escamada.',
          ingredientsBuilder: (portion: number) => [
            { name: 'Tomates de huerta maduros', quantity: Math.round(250 * portion), unit: 'g', category: 'frescos' },
            { name: 'Ventresca de atún de calidad', quantity: Math.round(60 * portion), unit: 'g', category: 'carnes-pescados' },
            { name: 'Cebolleta fresca y aceitunas', quantity: Math.max(1, Math.round(0.5 * portion)), unit: 'ud', category: 'frescos' }
          ],
          instructions: ['Trocear tomates en gajos gruesos.', 'Añadir ventresca, cebolleta y aliñar con AOVE y vinagre de Jerez.']
        },
        {
          id: 'salmorejo',
          keywords: ['salmorejo', 'gazpacho', 'tomate', 'tomates', 'frio', 'frío'],
          name: 'Salmorejo Cordobés Tradicional con Huevo Duro y Virutas de Jamón',
          tech: 'Emulsión en frío de tomate pera maduro, pan candeal y AOVE virgen extra.',
          ingredientsBuilder: (portion: number) => [
            { name: 'Tomate pera maduro', quantity: Math.round(250 * portion), unit: 'g', category: 'frescos' },
            { name: 'Pan candeal del día anterior', quantity: Math.round(50 * portion), unit: 'g', category: 'despensa' },
            { name: 'Jamón ibérico y huevo duro', quantity: Math.round(25 * portion), unit: 'g', category: 'carnes-pescados' }
          ],
          instructions: ['Triturar tomates con pan remojado y ajo.', 'Emulsionar a hilo continuo con AOVE.']
        },
        {
          id: 'crema_calabaza',
          keywords: ['calabaza', 'crema', 'sopa', 'entrante', 'puerro'],
          name: 'Crema Ligera de Calabaza, Puerro y Jengibre con Picatostes',
          tech: 'Horneado previo de calabaza para potenciar el dulzor natural y emulsión fina.',
          ingredientsBuilder: (portion: number) => [
            { name: 'Calabaza cacahuete y puerros', quantity: Math.round(200 * portion), unit: 'g', category: 'frescos' },
            { name: 'Jengibre fresco y AOVE', quantity: Math.max(1, Math.round(0.2 * portion)), unit: 'ud', category: 'frescos' }
          ],
          instructions: ['Asar calabaza y puerro a 190°C.', 'Triturar con caldo vegetal y jengibre hasta emulsión fina.']
        },
        {
          id: 'crema_calabacin',
          keywords: ['calabacin', 'calabacín', 'verdura', 'verduras'],
          name: 'Crema Suave de Calabacín con Quesitos y Aceite de Albahaca',
          tech: 'Cocción corta de calabacín con piel para preservar clorofila y color verde vivo.',
          ingredientsBuilder: (portion: number) => [
            { name: 'Calabacín verde con piel', quantity: Math.round(220 * portion), unit: 'g', category: 'frescos' },
            { name: 'Quesitos o nata suave', quantity: Math.max(1, Math.round(0.8 * portion)), unit: 'ud', category: 'refrigerados' }
          ],
          instructions: ['Cocer calabacines 10 min.', 'Triturar con quesitos y aceite de albahaca.']
        },
        {
          id: 'sopa_pescado',
          keywords: ['sopa', 'pescado', 'marisco', 'mariscos', 'fumet'],
          name: 'Sopa de Pescado de Roca y Mariscos con Picatostes al Ajo',
          tech: 'Fumet concentrado de cabezas de gamba y espinas de pescado frito.',
          ingredientsBuilder: (portion: number) => [
            { name: 'Caldo de pescado de roca', quantity: Math.round(0.25 * portion * 10) / 10, unit: 'L', category: 'refrigerados' },
            { name: 'Gambas peladas y tacos de merluza', quantity: Math.round(60 * portion), unit: 'g', category: 'carnes-pescados' }
          ],
          instructions: ['Sofreír cabezas de gambas y reducir fumet.', 'Cocer tropiezos de marisco 5 min.']
        },
        {
          id: 'ensalada_templada',
          keywords: ['ensalada', 'ensaladas', 'pimiento', 'pimientos', 'queso', 'cabra'],
          name: 'Ensalada Templada de Verduras Asadas y Queso de Cabra',
          tech: 'Asado en juliana de pimientos, berenjenas y cebollas al horno.',
          ingredientsBuilder: (portion: number) => [
            { name: 'Pimientos y berenjenas asadas', quantity: Math.round(150 * portion), unit: 'g', category: 'frescos' },
            { name: 'Rulo de queso de cabra', quantity: Math.round(30 * portion), unit: 'g', category: 'refrigerados' }
          ],
          instructions: ['Horneado de verduras 35 min.', 'Montar con medallón de queso caramelizado.']
        },
        {
          id: 'gazpacho',
          keywords: ['gazpacho', 'tomate', 'tomates', 'pepino'],
          name: 'Gazpacho Andaluz Tradicional con Tropezones de Pepino y Pimiento',
          tech: 'Triturado fino en frío de hortalizas frescas de temporada.',
          ingredientsBuilder: (portion: number) => [
            { name: 'Tomate maduro y pepino', quantity: Math.round(250 * portion), unit: 'g', category: 'frescos' },
            { name: 'Aceite de oliva virgen extra', quantity: Math.round(20 * portion), unit: 'ml', category: 'despensa' }
          ],
          instructions: ['Triturar tomates, pepino, pimiento y ajo.', 'Emulsionar con vinagre y AOVE.']
        }
      ];

      const mainPool = [
        {
          id: 'merluza',
          keywords: ['merluza', 'pescado', 'salsa verde', 'mariscos'],
          name: 'Lomos de Merluza de Pincho en Salsa Verde con Almejas de Carril',
          tech: 'Velouté ligada en vaivén con AOVE, ajo tierno y perejil fresco.',
          ingredientsBuilder: (portion: number) => [
            { name: 'Lomos de merluza de pincho', quantity: Math.round(180 * portion), unit: 'g', category: 'carnes-pescados' },
            { name: 'Almejas frescas', quantity: Math.round(50 * portion), unit: 'g', category: 'carnes-pescados' },
            { name: 'Perejil y ajo tierno', quantity: Math.max(1, Math.round(0.3 * portion)), unit: 'manojo', category: 'frescos' }
          ],
          instructions: ['Dorar ajos en AOVE.', 'Incorporar caldo, vino blanco y cocer lomos en vaivén 4 min.']
        },
        {
          id: 'bacalao_tomate',
          keywords: ['bacalao', 'tomate', 'tomates', 'pescado'],
          name: 'Bacalao Confitado con Tomate Casero Frito y Pimientos Asados',
          tech: 'Confitado a 65°C en AOVE con ajos en camisa y salsa de tomate casero.',
          ingredientsBuilder: (portion: number) => [
            { name: 'Lomos de bacalao desalado', quantity: Math.round(180 * portion), unit: 'g', category: 'carnes-pescados' },
            { name: 'Tomate frito artesanal y pimientos', quantity: Math.round(150 * portion), unit: 'g', category: 'despensa' }
          ],
          instructions: ['Confitar bacalao en aceite a fuego suave.', 'Servir sobre cama de tomate artesano y pimientos.']
        },
        {
          id: 'carrilleras',
          keywords: ['carrillera', 'carrillada', 'carne', 'ternera', 'vino'],
          name: 'Carrilleras Melosas de Ternera al Vino Tinto y Cebollitas Glaseadas',
          tech: 'Estofado a fuego lento (2.5h) con vino tinto y mirepoix.',
          ingredientsBuilder: (portion: number) => [
            { name: 'Carrilleras de ternera limpias', quantity: Math.round(220 * portion), unit: 'g', category: 'carnes-pescados' },
            { name: 'Vino tinto de calidad / Jerez', quantity: Math.round(0.12 * portion * 10) / 10, unit: 'L', category: 'despensa' },
            { name: 'Cebolla dulce y zanahorias', quantity: Math.max(1, Math.round(0.8 * portion)), unit: 'ud', category: 'frescos' }
          ],
          instructions: ['Dorar carrilleras a fuego vivo.', 'Pochar verduras y estofar con vino tinto 2.5h.']
        },
        {
          id: 'pollo_salsa',
          keywords: ['pollo', 'ave', 'ajo', 'guiso'],
          name: 'Pollo de Caserío en Salsa Tradicional con Ajos y Vino de Montilla',
          tech: 'Dorar piezas con ajos en camisa y desglasar con vino fino de Jerez.',
          ingredientsBuilder: (portion: number) => [
            { name: 'Pollo troceado de caserío', quantity: Math.round(0.3 * portion * 10) / 10, unit: 'kg', category: 'carnes-pescados' },
            { name: 'Dientes de ajo y vino fino', quantity: Math.max(1, Math.round(0.5 * portion)), unit: 'ud', category: 'despensa' }
          ],
          instructions: ['Sellar pollo a fuego fuerte.', 'Añadir ajos, vino de Montilla y reducir salsa.']
        },
        {
          id: 'lasana',
          keywords: ['lasaña', 'lasana', 'canelones', 'pasta', 'carne'],
          name: 'Lasaña Rústica Artesana de Carne Estofada y Bechamel de Nuez Moscada',
          tech: 'Relleno estofado a fuego lento y capas de pasta fresca horneada en fuente.',
          ingredientsBuilder: (portion: number) => [
            { name: 'Carne picada de ternera y cerdo', quantity: Math.round(150 * portion), unit: 'g', category: 'carnes-pescados' },
            { name: 'Placas de lasaña artesana', quantity: Math.round(3 * portion), unit: 'ud', category: 'despensa' },
            { name: 'Queso curado para gratinar', quantity: Math.round(25 * portion), unit: 'g', category: 'refrigerados' }
          ],
          instructions: ['Cocinar boloñesa casera.', 'Montar capas con bechamel suave y gratinar.']
        },
        {
          id: 'lentejas',
          keywords: ['lenteja', 'lentejas', 'legumbre', 'guiso', 'verduras'],
          name: 'Lentejas Pardinas Caramelizadas con Chacolí y Verduras de Temporada',
          tech: 'Sofrito de cebolla pochada 40 min a fuego lento con desglasado.',
          ingredientsBuilder: (portion: number) => [
            { name: 'Lentejas pardinas', quantity: Math.round(80 * portion), unit: 'g', category: 'despensa' },
            { name: 'Cebolla dulce y pimiento', quantity: Math.max(1, Math.round(0.6 * portion)), unit: 'ud', category: 'frescos' }
          ],
          instructions: ['Caramelizar base de verduras.', 'Agregar lentejas y caldo hirviendo.']
        },
        {
          id: 'salmon',
          keywords: ['salmon', 'salmón', 'pescado', 'eneldo'],
          name: 'Lomos de Salmón Frito al Eneldo con Zumo de Limón y Cítricos',
          tech: 'Marcado a fuego fuerte dejando el interior jugoso a baja temperatura.',
          ingredientsBuilder: (portion: number) => [
            { name: 'Lomos de salmón fresco', quantity: Math.round(180 * portion), unit: 'g', category: 'carnes-pescados' },
            { name: 'Eneldo fresco y limón', quantity: Math.max(1, Math.round(0.4 * portion)), unit: 'ud', category: 'frescos' }
          ],
          instructions: ['Dorar la piel hasta dejarla crujiente.', 'Añadir eneldo picado y zumo de limón.']
        },
        {
          id: 'arroz',
          keywords: ['arroz', 'paella', 'verduras', 'socarrat'],
          name: 'Arroz Socarrat de Verduras de la Huerta y Caldo Concentrado',
          tech: 'Socarrat controlado con sofrito de pimientos y salmorreta casera.',
          ingredientsBuilder: (portion: number) => [
            { name: 'Arroz bomba artesano', quantity: Math.round(85 * portion), unit: 'g', category: 'despensa' },
            { name: 'Caldo concentrado de verduras', quantity: Math.round(0.25 * portion * 10) / 10, unit: 'L', category: 'refrigerados' }
          ],
          instructions: ['Marcar el arroz con el sofrito.', 'Cocer con caldo de verduras 16 min.']
        },
        {
          id: 'garbanzos',
          keywords: ['garbanzo', 'garbanzos', 'legumbre', 'espinacas'],
          name: 'Garbanzos Salteados con Pimentón de la Vera, Espinacas y Magro',
          tech: 'Tostado de legumbre en sartén ancha con sofrito de ajos picados.',
          ingredientsBuilder: (portion: number) => [
            { name: 'Garbanzos cocidos', quantity: Math.round(180 * portion), unit: 'g', category: 'despensa' },
            { name: 'Espinacas frescas y pimentón', quantity: Math.round(50 * portion), unit: 'g', category: 'frescos' }
          ],
          instructions: ['Sofreír ajos y pimentón sin quemar.', 'Saltear garbanzos con espinacas 5 min.']
        },
        {
          id: 'albondigas',
          keywords: ['albondiga', 'albóndiga', 'albondigas', 'albóndigas', 'carne'],
          name: 'Albóndigas Artesanas de Ternera en Salsa Velouté de Almendras',
          tech: 'Picado tradicional con huevo, miga en leche y velouté de frutos secos.',
          ingredientsBuilder: (portion: number) => [
            { name: 'Carne picada de ternera', quantity: Math.round(180 * portion), unit: 'g', category: 'carnes-pescados' },
            { name: 'Almendras tostadas para la salsa', quantity: Math.round(20 * portion), unit: 'g', category: 'despensa' }
          ],
          instructions: ['Formar albóndigas y dorar en sartén.', 'Cocer en salsa de almendras 15 min.']
        },
        {
          id: 'solomillo',
          keywords: ['solomillo', 'cerdo', 'carne', 'whisky'],
          name: 'Solomillo de Cerdo Ibérico al Whisky con Patatas Panadera',
          tech: 'Marcado de medallones de solomillo y reducción de salsa de ajo y whisky.',
          ingredientsBuilder: (portion: number) => [
            { name: 'Solomillo de cerdo ibérico', quantity: Math.round(180 * portion), unit: 'g', category: 'carnes-pescados' },
            { name: 'Ajo, caldo y whisky', quantity: Math.round(30 * portion), unit: 'ml', category: 'despensa' }
          ],
          instructions: ['Marcar medallones a fuego fuerte.', 'Reducir la salsa de whisky y servir con patatas.']
        },
        {
          id: 'croquetas',
          keywords: ['croqueta', 'croquetas', 'jamon', 'jamón'],
          name: 'Croquetas Cremosas Artesanas de Jamón Ibérico y Sofrito de Ave',
          tech: 'Roux infusionado con hueso de jamón y cocido 35 min a fuego suave.',
          ingredientsBuilder: (portion: number) => [
            { name: 'Jamón ibérico picado', quantity: Math.round(30 * portion), unit: 'g', category: 'carnes-pescados' },
            { name: 'Harina, mantequilla y leche', quantity: Math.round(100 * portion), unit: 'g', category: 'despensa' }
          ],
          instructions: ['Infusionar la leche con hueso de jamón.', 'Cocer bechamel 35 min y empanar.']
        }
      ];

      // Parse user cravings against both starter & main catalog
      const lowerCravings = cravings.toLowerCase();
      const matchedMains = mainPool.filter(dish => 
        dish.keywords.some(kw => lowerCravings.includes(kw))
      );
      const matchedStarters = starterPool.filter(dish => 
        dish.keywords.some(kw => lowerCravings.includes(kw))
      );

      // Extract custom unhandled words from user cravings (e.g. if user asked for custom dishes)
      const cravingTerms = lowerCravings
        .split(/[,ye&]+|\by\b/i)
        .map(t => t.trim())
        .filter(t => t.length > 2 && !['para', 'con', 'las', 'los', 'del', 'una', 'un', 'gustaria', 'gustaría'].includes(t));

      const customDishesFromTerms: typeof mainPool = [];
      cravingTerms.forEach((term, index) => {
        const isMatchedInStarters = matchedStarters.some(s => s.keywords.some(k => term.includes(k) || k.includes(term)));
        const isMatchedInMains = matchedMains.some(m => m.keywords.some(k => term.includes(k) || k.includes(term)));

        if (!isMatchedInStarters && !isMatchedInMains) {
          const capitalizedTerm = term.charAt(0).toUpperCase() + term.slice(1);
          customDishesFromTerms.push({
            id: `custom_craving_${index}`,
            keywords: [term],
            name: `${capitalizedTerm} Especial de Autor estilo Batch Cooking`,
            tech: `Elaboración personalizada de ${term} en lote para conservación perfecta.`,
            ingredientsBuilder: (portion: number) => [
              { name: `Ingredientes frescos para ${term}`, quantity: Math.round(150 * portion), unit: 'g', category: 'frescos' },
              { name: 'AOVE y Especias de la casa', quantity: Math.round(10 * portion), unit: 'ml', category: 'despensa' }
            ],
            instructions: [`Preparar y dorar ${term} a fuego adecuado.`, 'Envasar en recipientes herméticos de cristal.']
          });
        }
      });

      // Number of distinct main dishes & starters needed to avoid repetition across N days
      // For 7 days, we want 6 distinct main dishes + 3-4 starters (totaling 9-10 distinct recipe blocks)
      const numMainsNeeded = Math.max(
        matchedMains.length + customDishesFromTerms.length, 
        daysCount >= 6 ? 6 : (daysCount >= 4 ? 5 : 3)
      );
      const numStartersNeeded = Math.max(
        matchedStarters.length, 
        daysCount >= 5 ? 3 : 2
      );

      // Build main dishes list: start with matched + custom terms, fill with mainPool
      const selectedMains = [...matchedMains, ...customDishesFromTerms];
      for (const dish of mainPool) {
        if (selectedMains.length >= numMainsNeeded) break;
        if (!selectedMains.some(d => d.id === dish.id)) {
          selectedMains.push(dish);
        }
      }

      // Build starters list: start with matched, fill with starterPool
      const selectedStarters = [...matchedStarters];
      for (const dish of starterPool) {
        if (selectedStarters.length >= numStartersNeeded) break;
        if (!selectedStarters.some(d => d.id === dish.id)) {
          selectedStarters.push(dish);
        }
      }

      // Calculate portion distribution across items
      const totalLunchMainServings = peopleCount * daysCount;
      const totalDinnerMainServings = peopleCount * daysCount;
      const totalStarterServings = peopleCount * daysCount;

      const mainPortionsPerDish = Math.ceil((totalLunchMainServings + totalDinnerMainServings) / selectedMains.length);
      const starterPortionsPerDish = Math.ceil(totalStarterServings / selectedStarters.length);

      // Build batch items
      const items: any[] = [];

      selectedMains.forEach((mainDish, idx) => {
        items.push({
          dayName: `Bloque Principal ${idx + 1}`,
          mealType: 'Plato Principal Batch',
          dishName: mainDish.name,
          servings: mainPortionsPerDish,
          prepTime: '30 min (Batch)',
          isFromFridge: true,
          referenceStyleApplied: mainDish.tech,
          ingredients: mainDish.ingredientsBuilder(mainPortionsPerDish),
          instructions: mainDish.instructions
        });
      });

      selectedStarters.forEach((starterDish, idx) => {
        items.push({
          dayName: `Entrante / Crema / Ensalada ${idx + 1}`,
          mealType: 'Entrante Batch',
          dishName: starterDish.name,
          servings: starterPortionsPerDish,
          prepTime: '20 min (Batch)',
          isFromFridge: true,
          referenceStyleApplied: starterDish.tech,
          ingredients: starterDish.ingredientsBuilder(starterPortionsPerDish),
          instructions: starterDish.instructions
        });
      });

      // Build Daily Rotation Matrix for each day (Día 1 ... Día N)
      const dailyRotation: DailyRotationSlot[] = [];
      for (let day = 1; day <= daysCount; day++) {
        const lunchStarter = selectedStarters[(day - 1) % selectedStarters.length].name;
        const lunchMain = selectedMains[(day - 1) % selectedMains.length].name;
        // Offset dinner main by +3 so lunch main and dinner main are completely different dishes on the same day!
        const dinnerMain = selectedMains[(day - 1 + 3) % selectedMains.length].name;

        dailyRotation.push({
          dayNumber: day,
          dayLabel: `Día ${day}`,
          lunchStarter,
          lunchMain,
          dinnerMain
        });
      }

      let title = '';
      if (cravings.trim().length > 0) {
        title = `Menú Personalizado (${cravings}) - ${peopleCount} Pers. × ${daysCount} Días (${totalServings} Raciones)`;
      } else if (selectedMode === 'AUTO_BATCH') {
        title = `Plan Batch Cooking (${peopleCount} Pers. × ${daysCount} Días - ${totalServings} Raciones)`;
      } else if (selectedMode === 'FRIDGE_ONLY') {
        title = `Menú Zero Waste (${peopleCount} Pers. × ${daysCount} Días - ${totalServings} Raciones)`;
      } else if (selectedMode === 'FRIDGE_CRAVINGS') {
        title = `Menú Nevera + Antojos (${peopleCount} Pers. × ${daysCount} Días - ${totalServings} Raciones)`;
      } else {
        title = `Menú Nutricional (${peopleCount} Pers. × ${daysCount} Días - ${totalServings} Raciones)`;
      }

      const newPlan: GeneratedMenuPlan = {
        id: `plan-${Date.now()}`,
        title,
        mode: selectedMode,
        peopleCount,
        daysCount,
        referenceChannelName: `${getCuisineStyleLabel()} (${getBudgetLabel()})`,
        items,
        dailyRotation,
        batchCookingSummary: {
          totalTime: `${maxTimeHours} horas`,
          sessionsCount: 1,
          recommendedTechniques: [
            `Sazón e Identidad: ${getCuisineStyleLabel()}`,
            `Distribución inteligente: ${items.length} elaboraciones en lote combinadas día a día`,
            'Envasado en recipientes individuales o familiares herméticos a 2°C'
          ]
        }
      };

      setGeneratedPlan(newPlan);
      setIsGenerating(false);
      setCurrentStep(2);
      setPhase2SubStep(1);
    }, 3600);
  };

  const handleApplyFeedback = (customText?: string) => {
    const textToApply = customText || userFeedbackText;
    if (!textToApply.trim() || !generatedPlan) return;

    setIsRefining(true);

    setTimeout(() => {
      const updatedItems = [...generatedPlan.items];

      if (textToApply.toLowerCase().includes('pescado') || textToApply.toLowerCase().includes('merluza')) {
        updatedItems[0] = {
          dayName: 'Bloque Principal 1 (Ajustado)',
          mealType: 'Batch Prep',
          dishName: 'Bacalao Confitado con Tomate Casero y Pimientos de Carmen',
          servings: Math.ceil(totalServings * 0.40),
          prepTime: '30 min',
          isFromFridge: true,
          referenceStyleApplied: 'Confitado a 65°C en AOVE infusionado con ajos en camisa.',
          ingredients: [
            { name: 'Lomos de bacalao desalado', quantity: 200 * 8, unit: 'g', category: 'carnes-pescados' },
            { name: 'Tomate frito casero', quantity: 500, unit: 'g', category: 'despensa' }
          ],
          instructions: ['Confitar a fuego muy suave y cubrir con sofrito de tomate artesanal.']
        };
      } else if (textToApply.toLowerCase().includes('verdura') || textToApply.toLowerCase().includes('saludable')) {
        updatedItems[1] = {
          dayName: 'Bloque Principal 2 (Ajustado)',
          mealType: 'Batch Prep',
          dishName: 'Parmentier de Boniatos Asados y Verduras de Temporada',
          servings: Math.floor(totalServings * 0.30),
          prepTime: '25 min',
          isFromFridge: true,
          referenceStyleApplied: 'Asado en bloque a 200°C con especias antiinflamatorias.',
          ingredients: [
            { name: 'Boniato y Calabaza', quantity: 1, unit: 'kg', category: 'frescos' },
            { name: 'Aceite de oliva virgen extra', quantity: 50, unit: 'ml', category: 'despensa' }
          ],
          instructions: ['Hornear en bandeja amplia y empaquetar porciones individuales.']
        };
      }

      setGeneratedPlan({
        ...generatedPlan,
        items: updatedItems,
        title: `${generatedPlan.title} (Ajustado: "${textToApply.slice(0, 25)}...")`
      });

      setRefinementHistory(prev => [textToApply, ...prev]);
      setUserFeedbackText('');
      setIsRefining(false);
    }, 700);
  };

  const dietsList = ['Saludable', 'Sin Gluten', 'Sin Lactosa', 'Bajo en Sal', 'Keto / Low Carb', 'Proteico'];

  return (
    <div className="space-y-2.5 animate-fade-in pb-2">
      {/* Top Phase Header with 5-Substep Pills */}
      <div className="bg-gradient-to-r from-primary/10 via-surface to-secondary/10 rounded-2xl p-2 border border-outline-variant/30 space-y-1.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-primary text-on-primary font-black flex items-center justify-center text-xs">
              {currentStep === 1 ? `1.${phase1SubStep}` : `2.${phase2SubStep}`}
            </div>
            <div>
              <h1 className="text-xs font-bold text-on-surface leading-none">
                {currentStep === 1 ? (
                  phase1SubStep === 1 ? '1.1: Estilo de Cocina, Salud & Presupuesto' :
                  phase1SubStep === 2 ? '1.2: Modalidad de Procesamiento Batch' :
                  phase1SubStep === 3 ? '1.3: Antojos & Filtros Dieta' :
                  phase1SubStep === 4 ? '1.4: Comensales & Días' :
                  '1.5: Resumen Parámetros & Generar'
                ) : (
                  phase2SubStep === 1 ? '2.1: Resumen de Raciones Totales' :
                  phase2SubStep === 2 ? '2.2: Técnicas de Conservación & Sazón' :
                  phase2SubStep === 3 ? '2.3: Desglose de Ingredientes' :
                  phase2SubStep === 4 ? '2.4: Ajuste por Voz / Texto' :
                  '2.5: Aprobación del Menú'
                )}
              </h1>
              <p className="text-[10px] text-on-surface-variant mt-0.5">
                {currentStep === 1 ? `Fase 1: Configuración Parámetros (Sub-paso ${phase1SubStep} de 5)` : `Fase 2: Plan de Menú Inteligente (Sub-paso ${phase2SubStep} de 5)`}
              </p>
            </div>
          </div>

          {currentStep === 2 && (
            <button
              onClick={() => { setCurrentStep(1); setPhase1SubStep(1); }}
              className="text-[10px] font-bold text-primary bg-surface border border-primary/30 px-2 py-0.5 rounded-lg hover:bg-primary-container/20 transition-colors"
            >
              ← Volver a Fase 1
            </button>
          )}
        </div>

        {/* 5 Sub-step Pill Navigation */}
        <div className="flex items-center justify-between gap-1 pt-1 border-t border-outline-variant/20">
          <span className="text-[9px] font-bold text-on-surface-variant uppercase">
            {currentStep === 1 ? 'Fase 1' : 'Fase 2'}:
          </span>
          <div className="flex items-center gap-1 flex-1 justify-end">
            {[1, 2, 3, 4, 5].map((s) => {
              const active = currentStep === 1 ? phase1SubStep === s : phase2SubStep === s;
              return (
                <button
                  key={s}
                  onClick={() => currentStep === 1 ? setPhase1SubStep(s as any) : setPhase2SubStep(s as any)}
                  className={`px-2 py-0.5 rounded-md text-[10px] font-bold transition-all ${
                    active 
                      ? 'bg-primary text-on-primary shadow-xs' 
                      : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
                  }`}
                >
                  {currentStep}.{s}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* PHASE 1: CONFIGURATION (5 Clean Sub-Steps) */}
      {currentStep === 1 && (
        <div className="space-y-2">
          {/* Sub-step 1.1: Kitchen Style & Budget Selection */}
          {phase1SubStep === 1 && (
            <div className="bg-surface rounded-2xl p-3 border border-outline-variant/30 space-y-3 shadow-xs animate-fade-in">
              <div className="flex items-center justify-between border-b border-outline-variant/20 pb-1.5">
                <label className="text-xs font-bold text-on-surface flex items-center gap-1.5">
                  <Utensils className="text-primary" size={15} />
                  1.1 Configura tu Estilo de Cocina, Salud & Presupuesto
                </label>
                <span className="text-[10px] text-emerald-800 font-bold bg-emerald-100 px-2 py-0.5 rounded-full">
                  Preferencias del Hogar
                </span>
              </div>

              {/* Cuisine & Healthiness Style */}
              <div className="space-y-1.5">
                <span className="text-[11px] font-bold text-on-surface block">1. Estilo de Menú & Nivel de Salud:</span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                  {[
                    { id: 'HEALTHY', name: 'Más Saludable', desc: 'Limpio, ligero, sin ultraprocesados', icon: '🥗' },
                    { id: 'BALANCED', name: 'Equilibrado', desc: 'Variado, nutritivo y de temporada', icon: '⚖️' },
                    { id: 'TRADITIONAL', name: 'Tradicional', desc: 'Guisos sabrosos de toda la vida', icon: '🍲' },
                    { id: 'PROTEIN', name: 'Proteico', desc: 'Alto en proteína para vida activa', icon: '💪' }
                  ].map((style) => {
                    const isSelected = cuisineStyle === style.id;
                    return (
                      <button
                        key={style.id}
                        onClick={() => setCuisineStyle(style.id as any)}
                        className={`p-2 rounded-xl border text-left transition-all ${
                          isSelected 
                            ? 'border-primary bg-primary-container/25 ring-1 ring-primary/30 shadow-xs' 
                            : 'border-outline-variant/40 bg-surface hover:bg-surface-container-high'
                        }`}
                      >
                        <div className="flex items-center gap-1">
                          <span className="text-sm">{style.icon}</span>
                          <span className="text-xs font-bold text-on-surface truncate">{style.name}</span>
                        </div>
                        <p className="text-[9px] text-on-surface-variant mt-0.5 line-clamp-1">{style.desc}</p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Budget Level */}
              <div className="space-y-1.5 pt-1 border-t border-outline-variant/20">
                <span className="text-[11px] font-bold text-on-surface block">2. Nivel de Presupuesto Estimado:</span>
                <div className="grid grid-cols-3 gap-1.5">
                  {[
                    { id: 'ECONOMIC', name: 'Más Económico', desc: 'Máximo ahorro y productos de estación', icon: '💶' },
                    { id: 'BALANCED', name: 'Estándar Ajustado', desc: 'Excelente relación calidad-precio', icon: '⚖️' },
                    { id: 'GOURMET', name: 'Gourmet / Premium', desc: 'Cortes seleccionados e ingredientes top', icon: '🌟' }
                  ].map((b) => {
                    const isSelected = budgetLevel === b.id;
                    return (
                      <button
                        key={b.id}
                        onClick={() => setBudgetLevel(b.id as any)}
                        className={`p-2 rounded-xl border text-left transition-all ${
                          isSelected 
                            ? 'border-secondary bg-secondary/15 ring-1 ring-secondary/30 shadow-xs' 
                            : 'border-outline-variant/40 bg-surface hover:bg-surface-container-high'
                        }`}
                      >
                        <div className="flex items-center gap-1">
                          <span className="text-sm">{b.icon}</span>
                          <span className="text-xs font-bold text-on-surface truncate">{b.name}</span>
                        </div>
                        <p className="text-[9px] text-on-surface-variant mt-0.5 line-clamp-1">{b.desc}</p>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="flex items-center justify-between pt-1 border-t border-outline-variant/20">
                <span className="text-[10px] text-on-surface-variant">
                  Configuración: <strong>{getCuisineStyleLabel()}</strong> • <strong>{getBudgetLabel()}</strong>
                </span>
                <button
                  onClick={() => setPhase1SubStep(2)}
                  className="bg-primary text-on-primary py-1.5 px-3 rounded-xl font-bold text-xs flex items-center gap-1 shadow-xs hover:bg-primary/90 transition-all"
                >
                  Siguiente (1.2 Modalidad)
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          )}

          {/* Sub-step 1.2: Processing Mode */}
          {phase1SubStep === 2 && (
            <div className="bg-surface rounded-2xl p-3 border border-outline-variant/30 space-y-2.5 shadow-xs animate-fade-in">
              <label className="text-xs font-bold text-on-surface flex items-center gap-1.5">
                <Sliders className="text-primary" size={15} />
                1.2 Selecciona la Modalidad de Procesamiento
              </label>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
                <button
                  onClick={() => setSelectedMode('AUTO_BATCH')}
                  className={`p-2.5 rounded-xl border text-left transition-all ${
                    selectedMode === 'AUTO_BATCH'
                      ? 'border-primary bg-primary-container/25 shadow-xs ring-1 ring-primary/30'
                      : 'border-outline-variant/40 bg-surface hover:bg-surface-container-high'
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    <Utensils size={14} className="text-primary shrink-0" />
                    <h3 className="font-bold text-xs text-on-surface truncate">1. Automático Puro</h3>
                  </div>
                  <p className="text-[10px] text-on-surface-variant mt-1 line-clamp-1">
                    Batch Cooking equilibrado en raciones.
                  </p>
                </button>

                <button
                  onClick={() => setSelectedMode('FRIDGE_ONLY')}
                  className={`p-2.5 rounded-xl border text-left transition-all ${
                    selectedMode === 'FRIDGE_ONLY'
                      ? 'border-primary bg-primary-container/25 shadow-xs ring-1 ring-primary/30'
                      : 'border-outline-variant/40 bg-surface hover:bg-surface-container-high'
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    <Refrigerator size={14} className="text-secondary shrink-0" />
                    <h3 className="font-bold text-xs text-on-surface truncate">2. Adaptado Nevera</h3>
                  </div>
                  <p className="text-[10px] text-on-surface-variant mt-1 line-clamp-1">
                    Prioriza {initialFridgeStock.length} productos en stock.
                  </p>
                </button>

                <button
                  onClick={() => setSelectedMode('FRIDGE_CRAVINGS')}
                  className={`p-2.5 rounded-xl border text-left transition-all ${
                    selectedMode === 'FRIDGE_CRAVINGS'
                      ? 'border-primary bg-primary-container/25 shadow-xs ring-1 ring-primary/30'
                      : 'border-outline-variant/40 bg-surface hover:bg-surface-container-high'
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    <HeartHandshake size={14} className="text-tertiary shrink-0" />
                    <h3 className="font-bold text-xs text-on-surface truncate">3. Nevera + Antojos</h3>
                  </div>
                  <p className="text-[10px] text-on-surface-variant mt-1 line-clamp-1">
                    Combina stock con peticiones del autor.
                  </p>
                </button>

                <button
                  onClick={() => setSelectedMode('ADVANCED_DIET')}
                  className={`p-2.5 rounded-xl border text-left transition-all ${
                    selectedMode === 'ADVANCED_DIET'
                      ? 'border-primary bg-primary-container/25 shadow-xs ring-1 ring-primary/30'
                      : 'border-outline-variant/40 bg-surface hover:bg-surface-container-high'
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    <Flame size={14} className="text-emerald-700 shrink-0" />
                    <h3 className="font-bold text-xs text-on-surface truncate">4. Avanzado / Dieta</h3>
                  </div>
                  <p className="text-[10px] text-on-surface-variant mt-1 line-clamp-1">
                    Filtros nutricionales y macronutrientes.
                  </p>
                </button>
              </div>

              <div className="flex items-center justify-between gap-2 pt-1 border-t border-outline-variant/20">
                <button onClick={() => setPhase1SubStep(1)} className="bg-surface-container border border-outline-variant/30 text-on-surface py-1.5 px-3 rounded-xl font-bold text-xs">
                  ← Anterior
                </button>
                <button onClick={() => setPhase1SubStep(3)} className="bg-primary text-on-primary py-1.5 px-3 rounded-xl font-bold text-xs flex items-center gap-1 shadow-xs hover:bg-primary/90 transition-all">
                  Siguiente (1.3 Antojos)
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          )}

          {/* Sub-step 1.3: Cravings & Diet filters */}
          {phase1SubStep === 3 && (
            <div className="bg-surface rounded-2xl p-3 border border-outline-variant/30 space-y-2.5 shadow-xs animate-fade-in">
              <label className="text-xs font-bold text-on-surface flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <HeartHandshake className="text-primary" size={15} />
                  1.3 Antojos de Autor & Restricciones Dietéticas
                </span>
                {cravings.trim() && (
                  <span className="text-[10px] bg-primary/10 text-primary border border-primary/20 px-2 py-0.5 rounded-full font-bold">
                    ✓ Antojos Activos
                  </span>
                )}
              </label>

              <div className="space-y-2">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[11px] font-bold text-on-surface block">Antojos o Recetas Específicas:</span>
                    <span className="text-[10px] text-on-surface-variant">Puedes combinar varios con 'y' o comas</span>
                  </div>
                  <input
                    type="text"
                    value={cravings}
                    onChange={(e) => setCravings(e.target.value)}
                    placeholder="Ej. Merluza en salsa verde y carrilleras al vino tinto..."
                    className="w-full bg-surface-container border border-primary/30 rounded-xl px-3 py-2 text-xs text-on-surface font-medium focus:outline-none focus:ring-1 focus:ring-primary shadow-2xs"
                  />
                  
                  {/* Quick Suggestion Chips */}
                  <div className="mt-2 space-y-1">
                    <span className="text-[10px] font-bold text-on-surface-variant block">Sugerencias rápidas de autor (pulsa para añadir):</span>
                    <div className="flex flex-wrap gap-1">
                      {[
                        { label: '🐟 Merluza en salsa verde', keyword: 'merluza' },
                        { label: '🍅 Tomates y Ensalada', keyword: 'tomates y ensalada' },
                        { label: '🥩 Carrilleras al vino tinto', keyword: 'carrilleras' },
                        { label: '🍲 Salmorejo cordobés', keyword: 'salmorejo' },
                        { label: '🍝 Lasaña rústica', keyword: 'lasaña' },
                        { label: '🍣 Salmón al eneldo', keyword: 'salmón' },
                        { label: '🍗 Pollo al ajo', keyword: 'pollo' },
                        { label: '🐟 Bacalao con tomate', keyword: 'bacalao con tomate' }
                      ].map((item) => {
                        const isAdded = cravings.toLowerCase().includes(item.keyword.split(' ')[0]);
                        return (
                          <button
                            key={item.label}
                            onClick={() => {
                              if (!isAdded) {
                                setCravings(prev => prev.trim() ? `${prev}, ${item.keyword}` : item.keyword);
                              }
                            }}
                            className={`px-2 py-1 rounded-lg text-[10px] font-semibold border transition-all ${
                              isAdded 
                                ? 'bg-primary/15 border-primary text-primary font-bold' 
                                : 'bg-surface-container border-outline-variant/30 text-on-surface-variant hover:bg-surface-container-high'
                            }`}
                          >
                            {item.label} {isAdded ? '✓' : '+'}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <div className="pt-1.5 border-t border-outline-variant/20">
                  <span className="text-[11px] font-bold text-on-surface block mb-1">Filtros Saludables / Alergias:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {dietsList.map((diet) => {
                      const active = selectedDiet.includes(diet);
                      return (
                        <button
                          key={diet}
                          onClick={() => toggleDiet(diet)}
                          className={`px-2.5 py-1 rounded-full text-xs font-semibold transition-colors ${
                            active ? 'bg-primary text-on-primary' : 'bg-surface-container-high text-on-surface-variant'
                          }`}
                        >
                          {diet}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between gap-2 pt-1 border-t border-outline-variant/20">
                <button onClick={() => setPhase1SubStep(2)} className="bg-surface-container border border-outline-variant/30 text-on-surface py-1.5 px-3 rounded-xl font-bold text-xs">
                  ← Anterior
                </button>
                <button onClick={() => setPhase1SubStep(4)} className="bg-primary text-on-primary py-1.5 px-3 rounded-xl font-bold text-xs flex items-center gap-1 shadow-xs hover:bg-primary/90 transition-all">
                  Siguiente (1.4 Comensales)
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          )}

          {/* Sub-step 1.4: Dinamic Servings & Time Calculation */}
          {phase1SubStep === 4 && (
            <div className="bg-surface rounded-2xl p-3 border border-outline-variant/30 space-y-2.5 shadow-xs animate-fade-in">
              <label className="text-xs font-bold text-on-surface flex items-center gap-1.5">
                <Clock className="text-primary" size={15} />
                1.4 Cálculo Dinámico de Raciones y Horas
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div className="flex items-center justify-between bg-surface-container rounded-xl p-2 border border-outline-variant/30">
                  <span className="text-xs font-bold text-on-surface px-1">Comensales:</span>
                  <div className="flex items-center gap-1.5">
                    <button onClick={() => setPeopleCount(Math.max(1, peopleCount - 1))} className="w-7 h-7 flex items-center justify-center font-bold text-on-surface bg-surface rounded-lg text-sm">-</button>
                    <span className="w-14 text-center font-bold text-xs">{peopleCount} p.</span>
                    <button onClick={() => setPeopleCount(peopleCount + 1)} className="w-7 h-7 flex items-center justify-center font-bold text-on-surface bg-surface rounded-lg text-sm">+</button>
                  </div>
                </div>

                <div className="flex items-center justify-between bg-surface-container rounded-xl p-2 border border-outline-variant/30">
                  <span className="text-xs font-bold text-on-surface px-1">Días Cubiertos:</span>
                  <div className="flex items-center gap-1.5">
                    <button onClick={() => setDaysCount(Math.max(1, daysCount - 1))} className="w-7 h-7 flex items-center justify-center font-bold text-on-surface bg-surface rounded-lg text-sm">-</button>
                    <span className="w-14 text-center font-bold text-xs">{daysCount} días</span>
                    <button onClick={() => setDaysCount(Math.min(7, daysCount + 1))} className="w-7 h-7 flex items-center justify-center font-bold text-on-surface bg-surface rounded-lg text-sm">+</button>
                  </div>
                </div>
              </div>

              <div className="bg-primary-container/20 border border-primary/30 rounded-xl p-2.5 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold text-primary uppercase block">Tiempo Estimado en Cocina</span>
                  <p className="text-lg font-black text-primary leading-none mt-0.5">
                    ~{suggestedPrepTimeHours} Horas <span className="text-xs font-normal text-on-surface-variant">({Math.round(suggestedPrepTimeHours * 60)} min)</span>
                  </p>
                </div>
                <span className="text-xs font-extrabold text-on-surface bg-surface px-2.5 py-1 rounded-full border border-primary/30">
                  {totalServings} Raciones Totales
                </span>
              </div>

              <div className="flex items-center justify-between gap-2 pt-1 border-t border-outline-variant/20">
                <button onClick={() => setPhase1SubStep(3)} className="bg-surface-container border border-outline-variant/30 text-on-surface py-1.5 px-3 rounded-xl font-bold text-xs">
                  ← Anterior
                </button>
                <button onClick={() => setPhase1SubStep(5)} className="bg-primary text-on-primary py-1.5 px-3 rounded-xl font-bold text-xs flex items-center gap-1 shadow-xs hover:bg-primary/90 transition-all">
                  Siguiente (1.5 Resumen)
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          )}

          {/* Sub-step 1.5: Final Parameter Check & Generate */}
          {phase1SubStep === 5 && (
            <div className="bg-surface rounded-2xl p-3.5 border border-outline-variant/30 space-y-3 shadow-xs animate-fade-in">
              <label className="text-xs font-bold text-on-surface flex items-center gap-1.5">
                <Sparkles className="text-primary" size={15} />
                1.5 Confirmación de Parámetros & Generación
              </label>

              {isGenerating ? (
                <div className="bg-gradient-to-br from-primary-container/30 via-surface to-secondary-container/30 p-4 rounded-2xl border border-primary/30 space-y-3 text-center animate-fade-in shadow-xs">
                  <div className="relative w-12 h-12 mx-auto flex items-center justify-center">
                    <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping" />
                    <div className="w-10 h-10 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold shadow-md">
                      <Sparkles size={20} className="animate-spin" />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-xs font-extrabold text-on-surface px-1">
                      <span>Procesando Menú RAG</span>
                      <span className="text-primary bg-primary-container/60 px-2 py-0.5 rounded-full text-[10px]">
                        {generationProgress}%
                      </span>
                    </div>

                    <div className="w-full bg-surface-container-high rounded-full h-2 overflow-hidden border border-outline-variant/30">
                      <div 
                        className="bg-primary h-full transition-all duration-500 ease-out rounded-full"
                        style={{ width: `${generationProgress}%` }}
                      />
                    </div>
                  </div>

                  <p className="text-xs font-bold text-primary min-h-[32px] flex items-center justify-center px-2 animate-fade-in">
                    {generationStatusText}
                  </p>

                  <div className="flex justify-center gap-3 text-[10px] text-on-surface-variant font-medium pt-1 border-t border-outline-variant/20">
                    <span>👥 {peopleCount} Comensales</span>
                    <span>•</span>
                    <span>📅 {daysCount} Días ({totalServings} Raciones)</span>
                    <span>•</span>
                    <span>🍳 ~{suggestedPrepTimeHours}h Batch</span>
                  </div>
                </div>
              ) : (
                <>
                  <div className="bg-surface-container/60 rounded-xl p-2.5 border border-outline-variant/30 text-xs space-y-1.5">
                    <div className="flex justify-between border-b border-outline-variant/20 pb-1">
                      <span className="text-on-surface-variant">Estilo de Menú:</span>
                      <strong className="text-on-surface">{getCuisineStyleLabel()}</strong>
                    </div>
                    <div className="flex justify-between border-b border-outline-variant/20 pb-1">
                      <span className="text-on-surface-variant">Presupuesto:</span>
                      <strong className="text-on-surface">{getBudgetLabel()}</strong>
                    </div>
                    <div className="flex justify-between border-b border-outline-variant/20 pb-1">
                      <span className="text-on-surface-variant">Modalidad:</span>
                      <strong className="text-on-surface">{selectedMode}</strong>
                    </div>
                    <div className="flex justify-between border-b border-outline-variant/20 pb-1">
                      <span className="text-on-surface-variant">Antojos Específicos:</span>
                      <strong className="text-primary font-bold">{cravings.trim() ? cravings : 'Ninguno (Generación Automática)'}</strong>
                    </div>
                    <div className="flex justify-between border-b border-outline-variant/20 pb-1">
                      <span className="text-on-surface-variant">Volumen Calculado:</span>
                      <strong className="text-primary font-bold">{totalServings} Raciones (~{suggestedPrepTimeHours}h)</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-on-surface-variant">Filtros Activos:</span>
                      <strong className="text-on-surface">{selectedDiet.join(', ') || 'Sin restricciones'}</strong>
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-2 pt-1 border-t border-outline-variant/20">
                    <button onClick={() => setPhase1SubStep(4)} className="bg-surface-container border border-outline-variant/30 text-on-surface py-2 px-3 rounded-xl font-bold text-xs">
                      ← Anterior
                    </button>
                    <button
                      onClick={handleGenerate}
                      className="flex-1 bg-primary text-on-primary py-2.5 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs hover:bg-primary/90 transition-all"
                    >
                      <Sparkles size={15} />
                      ✨ Generar Menú RAG ({totalServings} Raciones)
                    </button>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      )}

      {/* PHASE 2: PLAN REVIEW & VALIDATION (5 Clean Sub-Steps) */}
      {currentStep === 2 && generatedPlan && (
        <div className="space-y-2 animate-fade-in">
          {/* Sub-step 2.1: Servings Breakdown & Intelligent Rotation */}
          {phase2SubStep === 1 && (
            <div className="bg-surface rounded-2xl p-3 border border-outline-variant/30 space-y-3 shadow-xs animate-fade-in">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-outline-variant/20 pb-2 gap-2">
                <div>
                  <h2 className="text-xs font-black text-on-surface flex items-center gap-1.5">
                    <Sparkles size={16} className="text-primary" />
                    2.1 Planificación de Rotación Semanal ({peopleCount} Personas × {daysCount} Días = {totalServings} Raciones)
                  </h2>
                  <p className="text-[11px] text-on-surface-variant mt-0.5">
                    Combinación calculada de los {generatedPlan.items.length} bloques cocinados para alternar comidas y cenas sin repetición monótona.
                  </p>
                </div>

                {/* View Mode Toggle */}
                <div className="flex bg-surface-container border border-outline-variant/30 p-0.5 rounded-xl text-xs font-bold shrink-0">
                  <button
                    onClick={() => setPhase2ViewMode('ROTATION')}
                    className={`px-3 py-1 rounded-lg transition-all ${
                      phase2ViewMode === 'ROTATION'
                        ? 'bg-primary text-on-primary shadow-2xs font-extrabold'
                        : 'text-on-surface-variant hover:text-on-surface'
                    }`}
                  >
                    📅 Parrilla Día a Día
                  </button>
                  <button
                    onClick={() => setPhase2ViewMode('BATCH')}
                    className={`px-3 py-1 rounded-lg transition-all ${
                      phase2ViewMode === 'BATCH'
                        ? 'bg-primary text-on-primary shadow-2xs font-extrabold'
                        : 'text-on-surface-variant hover:text-on-surface'
                    }`}
                  >
                    📦 Bloques Batch ({generatedPlan.items.length})
                  </button>
                </div>
              </div>

              {/* TAB 1: ROTATION MATRIX */}
              {phase2ViewMode === 'ROTATION' && generatedPlan.dailyRotation && (
                <div className="space-y-2.5">
                  <div className="bg-primary/10 border border-primary/20 rounded-xl p-2.5 flex items-start gap-2">
                    <ShieldCheck className="text-primary shrink-0 mt-0.5" size={16} />
                    <p className="text-[11px] text-on-surface leading-tight font-medium">
                      <strong>Rotación Inteligente Activa:</strong> El plan distribuye automáticamente los {generatedPlan.items.length} platos preparados en lote para que ningún comensal repita el mismo plato el mismo día.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                    {generatedPlan.dailyRotation.map((slot) => (
                      <div key={slot.dayNumber} className="bg-surface-container/60 border border-outline-variant/40 rounded-xl p-2.5 space-y-2 hover:border-primary/40 transition-colors shadow-2xs">
                        <div className="flex items-center justify-between border-b border-outline-variant/20 pb-1">
                          <span className="text-[10px] font-black text-primary bg-primary-container/40 px-2 py-0.5 rounded-md uppercase">
                            {slot.dayLabel}
                          </span>
                          <span className="text-[9px] font-bold text-on-surface-variant">
                            {peopleCount} personas
                          </span>
                        </div>

                        {/* Lunch */}
                        <div className="space-y-1 bg-surface p-2 rounded-lg border border-outline-variant/20">
                          <div className="flex items-center gap-1 text-[10px] font-extrabold text-amber-800 uppercase">
                            <span>☀️ Comida (Almuerzo)</span>
                          </div>
                          {slot.lunchStarter && (
                            <div className="text-[10px] text-on-surface-variant leading-tight">
                              <span className="text-primary font-bold">1º Entrante:</span> {slot.lunchStarter}
                            </div>
                          )}
                          <div className="text-[11px] font-bold text-on-surface leading-tight">
                            <span className="text-primary font-bold">2º Principal:</span> {slot.lunchMain}
                          </div>
                        </div>

                        {/* Dinner */}
                        <div className="space-y-1 bg-surface p-2 rounded-lg border border-outline-variant/20">
                          <div className="flex items-center gap-1 text-[10px] font-extrabold text-indigo-800 uppercase">
                            <span>🌙 Cena (Opción Ligera)</span>
                          </div>
                          <div className="text-[11px] font-bold text-on-surface leading-tight">
                            <span className="text-primary font-bold">Principal:</span> {slot.dinnerMain}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 2: BATCH BLOCKS */}
              {(phase2ViewMode === 'BATCH' || !generatedPlan.dailyRotation) && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                  {generatedPlan.items.map((item, idx) => (
                    <div key={idx} className="bg-surface-container/60 border border-outline-variant/40 rounded-xl p-2 flex flex-col justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-[9px] font-extrabold text-primary uppercase bg-primary-container/40 px-1.5 py-0.2 rounded">
                            {item.dayName}
                          </span>
                          <span className="text-[10px] font-black text-on-surface bg-surface px-2 py-0.5 rounded-full border border-outline-variant/30">
                            {item.servings} Raciones
                          </span>
                        </div>
                        <h4 className="font-bold text-xs text-on-surface leading-tight truncate">{item.dishName}</h4>
                        <p className="text-[10px] text-on-surface-variant line-clamp-2">
                          {item.referenceStyleApplied}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex justify-end pt-1 border-t border-outline-variant/20">
                <button onClick={() => setPhase2SubStep(2)} className="bg-primary text-on-primary py-1.5 px-3 rounded-xl font-bold text-xs flex items-center gap-1 shadow-xs hover:bg-primary/90 transition-all">
                  Siguiente (2.2 Técnicas Culinarias)
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          )}

          {/* Sub-step 2.2: Author Techniques Applied */}
          {phase2SubStep === 2 && (
            <div className="bg-surface rounded-2xl p-3 border border-outline-variant/30 space-y-2 shadow-xs animate-fade-in">
              <h2 className="text-xs font-bold text-on-surface flex items-center gap-1.5">
                <ChefHat className="text-primary" size={15} />
                2.2 Técnicas Culinarias & Sazón Aplicadas
              </h2>

              <div className="space-y-2">
                {generatedPlan.items.map((item, idx) => (
                  <div key={idx} className="bg-surface-container/60 p-2.5 rounded-xl border border-outline-variant/30 space-y-1">
                    <h4 className="text-xs font-bold text-primary">{item.dishName}</h4>
                    <p className="text-[11px] text-on-surface leading-tight">
                      <strong>Técnica de Sazón:</strong> {item.referenceStyleApplied}
                    </p>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between pt-1 border-t border-outline-variant/20">
                <button onClick={() => setPhase2SubStep(1)} className="bg-surface-container border border-outline-variant/30 text-on-surface py-1.5 px-3 rounded-xl font-bold text-xs">
                  ← Anterior
                </button>
                <button onClick={() => setPhase2SubStep(3)} className="bg-primary text-on-primary py-1.5 px-3 rounded-xl font-bold text-xs flex items-center gap-1 shadow-xs hover:bg-primary/90 transition-all">
                  Siguiente (2.3 Ingredientes)
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          )}

          {/* Sub-step 2.3: Ingredients List Overview */}
          {phase2SubStep === 3 && (
            <div className="bg-surface rounded-2xl p-3 border border-outline-variant/30 space-y-2 shadow-xs animate-fade-in">
              <h2 className="text-xs font-bold text-on-surface flex items-center gap-1.5">
                <Utensils className="text-primary" size={15} />
                2.3 Ingredientes Consolidados para el Lote
              </h2>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                {generatedPlan.items.flatMap(i => i.ingredients).map((ing, idx) => (
                  <div key={idx} className="bg-surface-container/60 p-2 rounded-lg border border-outline-variant/30 flex items-center justify-between text-xs">
                    <span className="font-medium text-on-surface truncate">{ing.name}</span>
                    <strong className="text-primary shrink-0 ml-1">{ing.quantity} {ing.unit}</strong>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between pt-1 border-t border-outline-variant/20">
                <button onClick={() => setPhase2SubStep(2)} className="bg-surface-container border border-outline-variant/30 text-on-surface py-1.5 px-3 rounded-xl font-bold text-xs">
                  ← Anterior
                </button>
                <button onClick={() => setPhase2SubStep(4)} className="bg-primary text-on-primary py-1.5 px-3 rounded-xl font-bold text-xs flex items-center gap-1 shadow-xs hover:bg-primary/90 transition-all">
                  Siguiente (2.4 Ajuste IA)
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          )}

          {/* Sub-step 2.4: Natural Language AI Feedback */}
          {phase2SubStep === 4 && (
            <div className="bg-surface rounded-2xl p-3 border border-primary/20 shadow-xs space-y-2 animate-fade-in">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-xs text-on-surface flex items-center gap-1.5">
                  <MessageSquare className="text-primary" size={15} />
                  2.4 Ajuste Interactivo en Lenguaje Natural
                </h3>
                <span className="text-[10px] text-on-surface-variant">Ajusta platillos al instante</span>
              </div>

              <div className="flex flex-wrap gap-1.5">
                <button
                  onClick={() => handleApplyFeedback('Quiero más raciones de pescado y menos de carne')}
                  className="bg-surface-container hover:bg-primary-container/30 border border-outline-variant/40 text-on-surface text-[10px] font-semibold px-2.5 py-1 rounded-full transition-colors flex items-center gap-1"
                >
                  🐟 "+ Pescado"
                </button>
                <button
                  onClick={() => handleApplyFeedback('Añadir una crema de verduras de temporada saludable')}
                  className="bg-surface-container hover:bg-primary-container/30 border border-outline-variant/40 text-on-surface text-[10px] font-semibold px-2.5 py-1 rounded-full transition-colors flex items-center gap-1"
                >
                  🥗 "+ Verduras"
                </button>
              </div>

              <div className="flex gap-1.5">
                <input
                  type="text"
                  value={userFeedbackText}
                  onChange={(e) => setUserFeedbackText(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleApplyFeedback()}
                  placeholder="Ej. 'Sustituye X por bacalao confitado'..."
                  className="flex-1 bg-surface-container border border-outline-variant/40 rounded-xl px-3 py-1.5 text-xs text-on-surface focus:outline-none focus:ring-1 focus:ring-primary/40"
                />
                <button
                  onClick={() => handleApplyFeedback()}
                  disabled={isRefining || !userFeedbackText.trim()}
                  className="bg-primary text-on-primary px-3 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1 shadow-xs hover:bg-primary/90 transition-colors disabled:opacity-50"
                >
                  {isRefining ? <RefreshCw size={14} className="animate-spin" /> : <Send size={14} />}
                  Ajustar
                </button>
              </div>

              {refinementHistory.length > 0 && (
                <div className="pt-1">
                  <div className="flex items-center gap-1 text-[10px] font-bold text-on-surface-variant uppercase">
                    <ThumbsUp size={10} className="text-primary" /> Ajuste Aplicado: "{refinementHistory[0]}"
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between pt-1 border-t border-outline-variant/20">
                <button onClick={() => setPhase2SubStep(3)} className="bg-surface-container border border-outline-variant/30 text-on-surface py-1.5 px-3 rounded-xl font-bold text-xs">
                  ← Anterior
                </button>
                <button onClick={() => setPhase2SubStep(5)} className="bg-primary text-on-primary py-1.5 px-3 rounded-xl font-bold text-xs flex items-center gap-1 shadow-xs hover:bg-primary/90 transition-all">
                  Siguiente (2.5 Aprobar)
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          )}

          {/* Sub-step 2.5: Approve Menu & Go to Shopping */}
          {phase2SubStep === 5 && (
            <div className="bg-surface rounded-2xl p-3 border border-outline-variant/30 space-y-2.5 shadow-xs animate-fade-in text-center">
              <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto">
                <Check size={20} />
              </div>
              <div>
                <h2 className="text-sm font-bold text-on-surface">2.5 ¡Menú RAG Listo para la Compra!</h2>
                <p className="text-xs text-on-surface-variant max-w-md mx-auto mt-0.5">
                  Se consolidarán los ingredientes descontando automáticamente lo que ya tienes en tu nevera.
                </p>
              </div>

              <div className="flex items-center justify-center gap-2 pt-1">
                <button onClick={() => setPhase2SubStep(4)} className="bg-surface-container border border-outline-variant/30 text-on-surface py-2 px-3 rounded-xl font-bold text-xs">
                  ← Modificar
                </button>
                <button
                  onClick={() => {
                    onMenuApproved(generatedPlan);
                    onNavigateToShopping();
                  }}
                  className="bg-secondary text-on-secondary px-5 py-2.5 rounded-xl font-black text-xs flex items-center gap-1.5 shadow-md hover:bg-secondary/90 transition-all"
                >
                  🚀 Aprobar Menú e Ir a Fase 3 (Lista de Compra)
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
