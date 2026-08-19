import { BatchDish, BatchShoppingItem } from '../types';
import { initializeDishPortions } from './batchProjects';

export interface BatchCalculationConfig {
  peopleCount: number;
  daysCount: number;
  mealCoverage: 'lunches' | 'dinners' | 'both';
  dietStyle: 'mediterranean' | 'fitness' | 'veggie' | 'lowcarb' | 'traditional';
  varietyPreference?: 'high_variety' | 'balanced' | 'max_efficiency';
  cravings?: string;
  includeFridge?: boolean;
}

export interface DishAllocation {
  mealType: 'lunch' | 'dinner' | 'universal';
  familyMeals: number; // Número de tomas familiares (ej: 2 tomas)
  servings: number;    // familyMeals * peopleCount (ej: 2 * 2 = 4 raciones)
}

export interface BatchStructureResult {
  peopleCount: number;
  daysCount: number;
  mealCoverage: 'lunches' | 'dinners' | 'both';
  tomasPerDay: number;
  totalFamilyMeals: number;      // Días * Tomas/día (ej: 10 * 2 = 20 tomas familiares)
  totalIndividualServings: number; // totalFamilyMeals * peopleCount (ej: 20 * 2 = 40 raciones)
  dishCount: number;             // Número de recetas diferentes (ej: 8 platos)
  lunchDishCount: number;        // Platos de comida
  dinnerDishCount: number;       // Platos de cena
  averageRepetition: number;     // Tomas medias por plato (ej: 2.0 tomas)
  allocations: DishAllocation[];
  estimatedCookTimeMinutes: number;
  estimatedCookTimeFormatted: string;
  hoursSavedWeekly: number;
}

/**
 * Calcula la estructura matemática y gastronómica óptima para un lote de Batch Cooking
 */
export function calculateBatchStructure(config: BatchCalculationConfig): BatchStructureResult {
  const people = Math.max(1, Math.min(12, config.peopleCount || 2));
  const days = Math.max(2, Math.min(14, config.daysCount || 5));
  const coverage = config.mealCoverage || 'both';
  const preference = config.varietyPreference || 'balanced';

  const tomasPerDay = coverage === 'both' ? 2 : 1;
  const totalFamilyMeals = days * tomasPerDay;
  const totalIndividualServings = totalFamilyMeals * people;

  // Determinar número ideal de platos distintos según servicios totales y preferencia
  let targetDishes: number;
  if (coverage === 'both') {
    // Si cubre comidas y cenas, queremos platos específicos para mediodía y noche
    if (totalFamilyMeals <= 4) {
      targetDishes = 2; // 1 comida + 1 cena
    } else if (totalFamilyMeals <= 6) {
      targetDishes = preference === 'max_efficiency' ? 2 : 3;
    } else if (totalFamilyMeals <= 8) {
      targetDishes = preference === 'high_variety' ? 5 : 4; // 2 comidas + 2 cenas
    } else if (totalFamilyMeals <= 10) { // 5 días comida + cena (10 tomas)
      targetDishes = preference === 'max_efficiency' ? 4 : preference === 'high_variety' ? 6 : 5;
    } else if (totalFamilyMeals <= 14) { // 7 días comida + cena (14 tomas)
      targetDishes = preference === 'max_efficiency' ? 5 : preference === 'high_variety' ? 8 : 7;
    } else if (totalFamilyMeals <= 20) { // 10 días comida + cena (20 tomas)
      targetDishes = preference === 'max_efficiency' ? 6 : preference === 'high_variety' ? 10 : 8;
    } else {
      targetDishes = Math.min(12, Math.ceil(totalFamilyMeals / (preference === 'max_efficiency' ? 2.5 : 2)));
    }
  } else {
    // Solo comidas o solo cenas
    if (totalFamilyMeals <= 3) {
      targetDishes = 2;
    } else if (totalFamilyMeals <= 5) {
      targetDishes = preference === 'max_efficiency' ? 2 : 3;
    } else if (totalFamilyMeals <= 7) {
      targetDishes = preference === 'high_variety' ? 5 : 4;
    } else if (totalFamilyMeals <= 10) {
      targetDishes = preference === 'max_efficiency' ? 4 : 5;
    } else {
      targetDishes = Math.min(8, Math.ceil(totalFamilyMeals / 2));
    }
  }

  // Asignar tomas familiares exactas a cada plato
  const allocations: DishAllocation[] = [];
  
  if (coverage === 'both') {
    const lunchMeals = days;
    const dinnerMeals = days;
    
    const lunchDishesCount = Math.max(1, Math.ceil(targetDishes / 2));
    const dinnerDishesCount = Math.max(1, targetDishes - lunchDishesCount);

    // Repartir tomas de comida
    const lunchMealsPerDish = Math.floor(lunchMeals / lunchDishesCount);
    let lunchRemainder = lunchMeals % lunchDishesCount;

    for (let i = 0; i < lunchDishesCount; i++) {
      const familyMeals = lunchMealsPerDish + (lunchRemainder > 0 ? 1 : 0);
      if (lunchRemainder > 0) lunchRemainder--;
      allocations.push({
        mealType: 'lunch',
        familyMeals,
        servings: familyMeals * people
      });
    }

    // Repartir tomas de cena
    const dinnerMealsPerDish = Math.floor(dinnerMeals / dinnerDishesCount);
    let dinnerRemainder = dinnerMeals % dinnerDishesCount;

    for (let i = 0; i < dinnerDishesCount; i++) {
      const familyMeals = dinnerMealsPerDish + (dinnerRemainder > 0 ? 1 : 0);
      if (dinnerRemainder > 0) dinnerRemainder--;
      allocations.push({
        mealType: 'dinner',
        familyMeals,
        servings: familyMeals * people
      });
    }
  } else {
    // Solo almuerzos o solo cenas
    const mealType = coverage === 'lunches' ? 'lunch' : 'dinner';
    const mealsPerDish = Math.floor(totalFamilyMeals / targetDishes);
    let remainder = totalFamilyMeals % targetDishes;

    for (let i = 0; i < targetDishes; i++) {
      const familyMeals = mealsPerDish + (remainder > 0 ? 1 : 0);
      if (remainder > 0) remainder--;
      allocations.push({
        mealType,
        familyMeals,
        servings: familyMeals * people
      });
    }
  }

  const finalDishCount = allocations.length;
  const lunchCount = allocations.filter(a => a.mealType === 'lunch').length;
  const dinnerCount = allocations.filter(a => a.mealType === 'dinner').length;
  const averageRepetition = Number((totalFamilyMeals / finalDishCount).toFixed(1));

  // Tiempo estimado de cocinado en paralelo
  // Base 55m + 11m por plato adicional coordinado en hornos y fuegos
  const cookMinutes = Math.min(180, Math.round(55 + (finalDishCount * 11) + (people > 4 ? 15 : 0)));
  const cookHours = Math.floor(cookMinutes / 60);
  const remainingMins = cookMinutes % 60;
  const cookFormatted = cookHours > 0 ? `${cookHours}h ${remainingMins > 0 ? `${remainingMins}m` : ''}`.trim() : `${cookMinutes} min`;

  // Ahorro semanal respecto a cocinar 35 min cada día
  const dailyCookingMinutes = days * tomasPerDay * 35;
  const hoursSaved = Math.max(2, Math.round((dailyCookingMinutes - cookMinutes) / 60));

  return {
    peopleCount: people,
    daysCount: days,
    mealCoverage: coverage,
    tomasPerDay,
    totalFamilyMeals,
    totalIndividualServings,
    dishCount: finalDishCount,
    lunchDishCount: lunchCount,
    dinnerDishCount: dinnerCount,
    averageRepetition,
    allocations,
    estimatedCookTimeMinutes: cookMinutes,
    estimatedCookTimeFormatted: cookFormatted,
    hoursSavedWeekly: hoursSaved
  };
}

// Catálogo maestro de recetas clasificadas para el generador
interface RecipeBlueprint {
  name: string;
  category: 'legumbres' | 'carnes' | 'pescados' | 'verduras' | 'cremas' | 'acompanamientos';
  type: 'lunch' | 'dinner' | 'universal';
  suitableDiets: Array<'mediterranean' | 'fitness' | 'veggie' | 'lowcarb' | 'traditional'>;
  station: 'fuego_1' | 'fuego_2' | 'fuego_3' | 'horno' | 'olla_expres';
  prepTime: string;
  storageAdvice: string;
  shelfLifeDaysFridge: number;
  ingredientsPerServing: { name: string; quantity: number; unit: string; category: string }[];
  instructions: string[];
}

const RECIPE_BLUEPRINTS: RecipeBlueprint[] = [
  // LUNCHES - GUISOS, LEGUMBRES, ARROCES Y CARNES
  {
    name: 'Lentejas pardinas tradicionales con verduras de la huerta y laurel',
    category: 'legumbres',
    type: 'lunch',
    suitableDiets: ['mediterranean', 'traditional', 'veggie'],
    station: 'fuego_1',
    prepTime: '35 min (Cazuela fuego medio)',
    storageAdvice: 'Nevera Días 1-3 • Congelador Días 4+',
    shelfLifeDaysFridge: 4,
    ingredientsPerServing: [
      { name: 'Lentejas pardinas secas', quantity: 0.08, unit: 'kg', category: 'despensa' },
      { name: 'Zanahorias', quantity: 0.08, unit: 'kg', category: 'frescos' },
      { name: 'Cebolla dulce', quantity: 0.06, unit: 'kg', category: 'frescos' },
      { name: 'Pimiento verde', quantity: 0.04, unit: 'kg', category: 'frescos' },
      { name: 'Caldo de verduras o ave', quantity: 0.25, unit: 'L', category: 'despensa' },
      { name: 'Pimentón de la Vera y laurel', quantity: 0.2, unit: 'cucharadita', category: 'especias' }
    ],
    instructions: [
      'Pochar la cebolla, ajo, pimiento y zanahoria con AOVE durante 10 min.',
      'Añadir las lentejas lavadas, el pimentón y el laurel.',
      'Cubrir con caldo y cocinar a fuego lento 30 minutos hasta que estén tiernas.',
      'Repartir en recipientes herméticos para nevera y congelador.'
    ]
  },
  {
    name: 'Ternera estofada muy tierna en su propio jugo con zanahorias',
    category: 'carnes',
    type: 'lunch',
    suitableDiets: ['mediterranean', 'fitness', 'lowcarb', 'traditional'],
    station: 'olla_expres',
    prepTime: '45 min (Olla exprés / Fuego lento)',
    storageAdvice: 'Óptima para congelar • Sabor mejora con reposo',
    shelfLifeDaysFridge: 4,
    ingredientsPerServing: [
      { name: 'Ternera magra para guisar cortada en dados', quantity: 0.18, unit: 'kg', category: 'carnes-pescados' },
      { name: 'Zanahorias en rodajas', quantity: 0.1, unit: 'kg', category: 'frescos' },
      { name: 'Cebolla pochada', quantity: 0.08, unit: 'kg', category: 'frescos' },
      { name: 'Vino tinto o caldo concentrado', quantity: 0.08, unit: 'L', category: 'despensa' },
      { name: 'Tomate triturado natural', quantity: 0.05, unit: 'kg', category: 'despensa' }
    ],
    instructions: [
      'Sellar los dados de ternera a fuego vivo en la cazuela con AOVE.',
      'Añadir la cebolla picada y las zanahorias; sofreír 8 minutos.',
      'Verter el vino tinto, desglasar el fondo y añadir el tomate triturado.',
      'Cerrar olla exprés 25 min o cocer a fuego suave 50 min hasta deshebrarse.'
    ]
  },
  {
    name: 'Pollo de corral asado al limón con romero y patatas panaderas',
    category: 'carnes',
    type: 'lunch',
    suitableDiets: ['mediterranean', 'fitness', 'traditional'],
    station: 'horno',
    prepTime: '40 min (Horno 190°C)',
    storageAdvice: 'Nevera Días 1-3 • Jugos concentrados',
    shelfLifeDaysFridge: 3,
    ingredientsPerServing: [
      { name: 'Contramuslos o pechuga de pollo de corral', quantity: 0.2, unit: 'kg', category: 'carnes-pescados' },
      { name: 'Patatas en rodajas panaderas', quantity: 0.15, unit: 'kg', category: 'frescos' },
      { name: 'Limón y romero fresco', quantity: 0.3, unit: 'unidad', category: 'frescos' },
      { name: 'Aceite de oliva virgen extra', quantity: 0.02, unit: 'L', category: 'especias' }
    ],
    instructions: [
      'Disponer las patatas en la base de la bandeja de horno con sal y AOVE.',
      'Colocar el pollo salpimentado encima con rodajas de limón y ramas de romero.',
      'Hornear a 190°C durante 40 minutos hasta piel dorada y patatas tiernas.'
    ]
  },
  {
    name: 'Curry cremoso de garbanzos, espinacas tiernas y leche de coco',
    category: 'legumbres',
    type: 'lunch',
    suitableDiets: ['mediterranean', 'veggie', 'fitness'],
    station: 'fuego_2',
    prepTime: '25 min (Sartén honda)',
    storageAdvice: 'Nevera Días 1-4 • Apto congelador',
    shelfLifeDaysFridge: 4,
    ingredientsPerServing: [
      { name: 'Garbanzos cocidos lavados', quantity: 0.15, unit: 'kg', category: 'despensa' },
      { name: 'Espinacas frescas', quantity: 0.08, unit: 'kg', category: 'frescos' },
      { name: 'Leche de coco cremosa', quantity: 0.08, unit: 'L', category: 'despensa' },
      { name: 'Pasta de curry amarillo o garam masala', quantity: 0.5, unit: 'cucharadita', category: 'especias' },
      { name: 'Cebolla y jengibre rallado', quantity: 0.05, unit: 'kg', category: 'frescos' }
    ],
    instructions: [
      'Sofreír cebolla picada y jengibre con la pasta de curry 3 minutos.',
      'Verter la leche de coco y llevar a ebullición suave.',
      'Añadir los garbanzos y las espinacas; cocinar 10 min a fuego medio.',
      'Rectificar de sal y dejar reposar antes de guardar.'
    ]
  },
  {
    name: 'Arroz meloso de verduras de temporada con dados de pavo al romero',
    category: 'acompanamientos',
    type: 'lunch',
    suitableDiets: ['mediterranean', 'fitness', 'traditional'],
    station: 'fuego_3',
    prepTime: '25 min (Cazuela)',
    storageAdvice: 'Consumir Días 1-2 • Textura óptima',
    shelfLifeDaysFridge: 2,
    ingredientsPerServing: [
      { name: 'Arroz bomba o integral', quantity: 0.07, unit: 'kg', category: 'despensa' },
      { name: 'Pechuga de pavo en dados', quantity: 0.12, unit: 'kg', category: 'carnes-pescados' },
      { name: 'Calabacín y judías verdes', quantity: 0.1, unit: 'kg', category: 'frescos' },
      { name: 'Caldo de ave artesano', quantity: 0.22, unit: 'L', category: 'refrigerados' }
    ],
    instructions: [
      'Dorar el pavo en cazuela y retirar.',
      'Pocher verduras y nacarar el arroz 2 minutos.',
      'Mojar con el caldo hirviendo y cocer 16 minutos a fuego medio.'
    ]
  },
  {
    name: 'Chili suave de ternera magra, alubias rojas y maíz dulce',
    category: 'carnes',
    type: 'lunch',
    suitableDiets: ['fitness', 'mediterranean', 'traditional'],
    station: 'fuego_1',
    prepTime: '30 min (Olla)',
    storageAdvice: 'Congelador 3 meses • Muy resistente',
    shelfLifeDaysFridge: 4,
    ingredientsPerServing: [
      { name: 'Carne picada de ternera magra', quantity: 0.15, unit: 'kg', category: 'carnes-pescados' },
      { name: 'Alubias rojas cocidas', quantity: 0.1, unit: 'kg', category: 'despensa' },
      { name: 'Pimiento rojo y cebolla', quantity: 0.08, unit: 'kg', category: 'frescos' },
      { name: 'Tomate frito casero con comino', quantity: 0.08, unit: 'kg', category: 'despensa' }
    ],
    instructions: [
      'Dorar la carne picada con cebolla y pimiento picados.',
      'Añadir tomate, alubias rojas y comino molido.',
      'Cocinar 20 minutos a fuego suave para integrar los sabores.'
    ]
  },

  // DINNERS - CENAS LIGERAS, PESCADOS, CREMAS Y SALTEADOS
  {
    name: 'Crema suave de calabaza, puerro pochado y AOVE virgen extra',
    category: 'cremas',
    type: 'dinner',
    suitableDiets: ['mediterranean', 'fitness', 'veggie', 'lowcarb', 'traditional'],
    station: 'fuego_2',
    prepTime: '25 min (Olla + Batidora)',
    storageAdvice: 'Nevera Días 1-4 • Cena digestiva',
    shelfLifeDaysFridge: 4,
    ingredientsPerServing: [
      { name: 'Calabaza cacahuete pelada', quantity: 0.2, unit: 'kg', category: 'frescos' },
      { name: 'Puerro (parte blanca)', quantity: 0.08, unit: 'kg', category: 'frescos' },
      { name: 'Patata o boniato', quantity: 0.05, unit: 'kg', category: 'frescos' },
      { name: 'Aceite de oliva virgen extra', quantity: 0.02, unit: 'L', category: 'especias' }
    ],
    instructions: [
      'Rehogar el puerro con AOVE 5 min sin que tome color.',
      'Añadir la calabaza en dados y la patata; cubrir justo de agua o caldo.',
      'Cocer 20 min y triturar a máxima potencia hasta textura sedosa.'
    ]
  },
  {
    name: 'Lomos de merluza fresca con lecho de patatas panaderas y cebolla',
    category: 'pescados',
    type: 'dinner',
    suitableDiets: ['mediterranean', 'traditional', 'fitness'],
    station: 'horno',
    prepTime: '30 min (Horno 180°C)',
    storageAdvice: 'Consumir Días 1-2 (Pescado blanco fresco)',
    shelfLifeDaysFridge: 2,
    ingredientsPerServing: [
      { name: 'Lomos de merluza fresca sin espinas', quantity: 0.18, unit: 'kg', category: 'carnes-pescados' },
      { name: 'Patatas finas panaderas', quantity: 0.12, unit: 'kg', category: 'frescos' },
      { name: 'Cebolla juliana dulce', quantity: 0.06, unit: 'kg', category: 'frescos' },
      { name: 'Vino blanco y perejil fresco', quantity: 0.03, unit: 'L', category: 'despensa' }
    ],
    instructions: [
      'Pre-hornear las patatas y cebolla con vino blanco 18 min a 180°C.',
      'Colocar los lomos de merluza encima con sal y perejil picado.',
      'Hornear 10-12 min adicionales hasta punto jugoso.'
    ]
  },
  {
    name: 'Salmón horneado con espárragos trigueros y vinagreta de limón',
    category: 'pescados',
    type: 'dinner',
    suitableDiets: ['mediterranean', 'fitness', 'lowcarb'],
    station: 'horno',
    prepTime: '20 min (Horno 200°C)',
    storageAdvice: 'Consumo Días 1-2 • Rico en Omega-3',
    shelfLifeDaysFridge: 2,
    ingredientsPerServing: [
      { name: 'Lomo de salmón fresco', quantity: 0.18, unit: 'kg', category: 'carnes-pescados' },
      { name: 'Espárragos trigueros verdes', quantity: 0.1, unit: 'kg', category: 'frescos' },
      { name: 'Limón y eneldo fresco', quantity: 0.3, unit: 'unidad', category: 'frescos' },
      { name: 'Aceite de oliva virgen extra', quantity: 0.015, unit: 'L', category: 'especias' }
    ],
    instructions: [
      'Disponer el salmón y los espárragos en bandeja con papel sulfurizado.',
      'Aliñar con AOVE, sal y zumo de limón.',
      'Hornear a 200°C durante 14 minutos.'
    ]
  },
  {
    name: 'Salteado wok de pavo, brócoli al vapor y champiñones Portobello',
    category: 'carnes',
    type: 'dinner',
    suitableDiets: ['fitness', 'mediterranean', 'lowcarb'],
    station: 'fuego_1',
    prepTime: '20 min (Wok / Sartén)',
    storageAdvice: 'Nevera Días 1-3 • Ligero y proteico',
    shelfLifeDaysFridge: 3,
    ingredientsPerServing: [
      { name: 'Pechuga o solomillo de pavo en tiras', quantity: 0.16, unit: 'kg', category: 'carnes-pescados' },
      { name: 'Brócoli en ramilletes', quantity: 0.12, unit: 'kg', category: 'frescos' },
      { name: 'Champiñones Portobello laminados', quantity: 0.08, unit: 'kg', category: 'frescos' },
      { name: 'Salsa de soja baja en sal y sésamo', quantity: 0.02, unit: 'L', category: 'despensa' }
    ],
    instructions: [
      'Blanquear el brócoli 3 min en agua hirviendo y escurrir.',
      'Saltear el pavo a fuego vivo en wok con AOVE 4 min.',
      'Añadir champiñones y brócoli; saltear 3 min más con salsa de soja.'
    ]
  },
  {
    name: 'Crema de calabacín y puerro pochado con queso crema ligero',
    category: 'cremas',
    type: 'dinner',
    suitableDiets: ['mediterranean', 'fitness', 'veggie', 'lowcarb'],
    station: 'fuego_2',
    prepTime: '20 min (Olla)',
    storageAdvice: 'Nevera Días 1-4 • Cena digestiva',
    shelfLifeDaysFridge: 4,
    ingredientsPerServing: [
      { name: 'Calabacines con piel', quantity: 0.25, unit: 'kg', category: 'frescos' },
      { name: 'Puerro pochado', quantity: 0.06, unit: 'kg', category: 'frescos' },
      { name: 'Queso crema bajo en grasa o AOVE', quantity: 0.03, unit: 'kg', category: 'refrigerados' },
      { name: 'Caldo de verduras ligero', quantity: 0.15, unit: 'L', category: 'despensa' }
    ],
    instructions: [
      'Pochar puerro en dados con AOVE 5 min.',
      'Añadir calabacines cortados y caldo.',
      'Cocinar 15 min y triturar con el queso crema hasta emulsionar.'
    ]
  },
  {
    name: 'Pisto tradicional de verduras asadas con virutas de jamón ibérico',
    category: 'verduras',
    type: 'dinner',
    suitableDiets: ['mediterranean', 'traditional', 'lowcarb', 'fitness'],
    station: 'horno',
    prepTime: '35 min (Horno)',
    storageAdvice: 'Nevera Días 1-5 • Base multiusos',
    shelfLifeDaysFridge: 5,
    ingredientsPerServing: [
      { name: 'Calabacín y berenjena', quantity: 0.15, unit: 'kg', category: 'frescos' },
      { name: 'Pimiento rojo y verde', quantity: 0.1, unit: 'kg', category: 'frescos' },
      { name: 'Tomate triturado natural', quantity: 0.08, unit: 'kg', category: 'despensa' },
      { name: 'Jamón ibérico en taquitos', quantity: 0.03, unit: 'kg', category: 'carnes-pescados' }
    ],
    instructions: [
      'Cortar todas las verduras en dados homogéneos.',
      'Hornear en bandeja amplia con AOVE y sal 30 min a 190°C.',
      'Mezclar con el tomate y servir con virutas de jamón.'
    ]
  }
];

import { CARMEN_RECIPES_DATABASE, getFilteredCarmenRecipes, CanonicalRecipe } from '../data/recipesCarmenDatabase';

/**
 * Genera el conjunto dinámico de platos ajustado a comensales, días, tomas, estilo y alérgenos
 * usando exclusivamente la base de datos de recetas de Cocina con Carmen.
 */
export function generateDynamicBatchDishes(
  config: BatchCalculationConfig,
  excludedAllergens?: string[]
): BatchDish[] {
  const structure = calculateBatchStructure(config);
  const diet = config.dietStyle || 'mediterranean';

  // Obtener recetas filtradas de Cocina con Carmen
  const lunchPool = getFilteredCarmenRecipes({
    mealType: 'lunch',
    dietStyle: diet as any,
    excludedAllergens
  });

  const dinnerPool = getFilteredCarmenRecipes({
    mealType: 'dinner',
    dietStyle: diet as any,
    excludedAllergens
  });

  // Fallback si el filtro es muy restrictivo
  const fallbackLunch = CARMEN_RECIPES_DATABASE.filter(r => r.mealType === 'lunch' || r.mealType === 'universal');
  const fallbackDinner = CARMEN_RECIPES_DATABASE.filter(r => r.mealType === 'dinner' || r.mealType === 'universal');

  const finalLunchPool = lunchPool.length > 0 ? lunchPool : fallbackLunch;
  const finalDinnerPool = dinnerPool.length > 0 ? dinnerPool : fallbackDinner;

  const generatedDishes: BatchDish[] = [];
  let lunchIdx = 0;
  let dinnerIdx = 0;

  structure.allocations.forEach((alloc, i) => {
    let recipe: CanonicalRecipe;
    if (alloc.mealType === 'lunch') {
      recipe = finalLunchPool[lunchIdx % finalLunchPool.length];
      lunchIdx++;
    } else {
      recipe = finalDinnerPool[dinnerIdx % finalDinnerPool.length];
      dinnerIdx++;
    }

    const totalServingsForThisDish = alloc.servings; // familyMeals * peopleCount

    const dish: BatchDish = {
      id: `dish_${recipe.id}_${Date.now()}_${i}`,
      name: recipe.name,
      category: recipe.category,
      servings: totalServingsForThisDish,
      prepTime: recipe.prepTimeFormatted,
      cookingMethod: recipe.station,
      storageAdvice: recipe.storageAdvice,
      isFavorite: false,
      rating: 5,
      image: recipe.image,
      shelfLifeDaysFridge: recipe.shelfLifeDaysFridge,
      shelfLifeMonthsFreezer: recipe.canFreeze ? 3 : 0,
      ingredients: recipe.ingredientsPerServing.map(ing => ({
        name: ing.name,
        quantity: Number((ing.quantity * totalServingsForThisDish).toFixed(2)),
        unit: ing.unit,
        category: ing.category as any
      })),
      instructions: recipe.instructions
    };

    const initialized = initializeDishPortions(dish, structure.daysCount);
    generatedDishes.push(initialized);
  });

  return generatedDishes;
}

/**
 * Convierte una receta canónica individual de Carmen en un BatchDish con las raciones especificadas
 */
export function createDishFromCanonicalRecipe(recipe: CanonicalRecipe, servings: number): BatchDish {
  const safeServings = Math.max(1, servings || 4);
  const dish: BatchDish = {
    id: `dish_${recipe.id}_${Date.now()}`,
    name: recipe.name,
    category: recipe.category as any,
    servings: safeServings,
    prepTime: recipe.prepTimeFormatted,
    cookingMethod: recipe.station,
    storageAdvice: recipe.storageAdvice,
    isFavorite: false,
    rating: 5,
    image: recipe.image,
    shelfLifeDaysFridge: recipe.shelfLifeDaysFridge,
    shelfLifeMonthsFreezer: recipe.canFreeze ? 3 : 0,
    ingredients: recipe.ingredientsPerServing.map(ing => ({
      name: ing.name,
      quantity: Number((ing.quantity * safeServings).toFixed(2)),
      unit: ing.unit,
      category: ing.category as any
    })),
    instructions: recipe.instructions
  };

  return initializeDishPortions(dish, 5);
}

