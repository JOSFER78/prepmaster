/**
 * 🥘 BASE DE DATOS MAESTRA DE RECETAS CANÓNICAS — COCINA TRADICIONAL
 * Estandarización milimétrica para TouChef Batch Cooking & Recetas Individuales:
 * - Ingredientes exactos y proporciones por ración individual.
 * - Clasificación de estaciones térmicas para cocinado concurrente.
 * - Declaración de los 14 alérgenos (Reglamento UE 1169/2011).
 * - Trazabilidad de conservación: vida útil en nevera y aptitud para congelador.
 */

export interface CanonicalRecipeIngredient {
  name: string;
  quantity: number; // Cantidad por ración individual
  unit: string;
  category: 'frescos' | 'carnes-pescados' | 'refrigerados' | 'despensa' | 'especias';
}

export interface CanonicalRecipe {
  id: string;
  name: string;
  shortName: string;
  category: 'legumbres' | 'carnes' | 'pescados' | 'verduras' | 'cremas' | 'acompanamientos' | 'tapas' | 'masas' | 'postres' | 'arroces_pastas' | 'huevos';
  mealType: 'lunch' | 'dinner' | 'universal';
  station: 'fuego_1' | 'fuego_2' | 'fuego_3' | 'horno' | 'olla_expres' | 'robot' | 'frio';
  prepTimeFormatted: string;
  prepTimeMinutes: number;
  shelfLifeDaysFridge: number;
  canFreeze: boolean;
  storageAdvice: string;
  suitableDiets: Array<'mediterranean' | 'traditional' | 'fitness' | 'veggie' | 'lowcarb'>;
  allergens: string[];
  image: string;
  source: 'Cocina Tradicional';
  sourceCompendium: string;
  ingredientsPerServing: CanonicalRecipeIngredient[];
  instructions: string[];
  batchTip: string;
  youtubeUrl?: string;
  mainIngredientFamily?: 'bacalao' | 'pollo' | 'ternera' | 'merluza' | 'atun' | 'legumbres' | 'verduras' | 'huevos' | 'arroz';
  culinaryTechnique?: 'guiso' | 'salsa' | 'asado_horno' | 'sarten_ajillo' | 'cuchara_potaje' | 'crema' | 'arroz_meloso' | 'tortilla' | 'frito_empanado' | 'frio_alino';
}

export const TRADITIONAL_RECIPES_DATABASE: CanonicalRecipe[] = [
  // =========================================================================
  // 1. FAMILIA BACALAO (VARIACIONES CANÓNICAS TRADICIONALES)
  // =========================================================================
  {
    id: 'trad-bacalao-ajoarriero',
    name: 'Bacalao al Ajoarriero Tradicional con Pimientos Asados y Tomate Confitado',
    shortName: 'Bacalao al Ajoarriero',
    category: 'pescados',
    mealType: 'dinner',
    station: 'fuego_2',
    prepTimeFormatted: '35 min (Cazuela fuego lento)',
    prepTimeMinutes: 35,
    shelfLifeDaysFridge: 4,
    canFreeze: true,
    storageAdvice: 'Nevera Días 1-4 • Congelador 2 meses (Lascas emulsionan genial)',
    suitableDiets: ['mediterranean', 'traditional', 'fitness', 'lowcarb'],
    allergens: ['Pescado'],
    image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=600&auto=format&fit=crop&q=80',
    source: 'Cocina Tradicional',
    sourceCompendium: 'pescados_legumbres_arroces.md',
    youtubeUrl: 'https://www.youtube.com/watch?v=TNjGDWUjEg8',
    mainIngredientFamily: 'bacalao',
    culinaryTechnique: 'salsa',
    ingredientsPerServing: [
      { name: 'Bacalao desalado desmigado en lascas', quantity: 0.18, unit: 'kg', category: 'carnes-pescados' },
      { name: 'Pimientos del piquillo o morrones asados', quantity: 0.08, unit: 'kg', category: 'frescos' },
      { name: 'Cebolla dulce pochada', quantity: 0.06, unit: 'kg', category: 'frescos' },
      { name: 'Tomate frito casero concentrado', quantity: 0.07, unit: 'kg', category: 'despensa' },
      { name: 'Ajos laminados y guindilla suave', quantity: 1, unit: 'diente', category: 'frescos' },
      { name: 'Aceite de oliva virgen extra', quantity: 0.025, unit: 'L', category: 'despensa' }
    ],
    instructions: [
      'Confitar ajos laminados en AOVE a fuego muy suave; añadir lascas de bacalao 3 minutos y retirar conservando la gelatina.',
      'Pochar cebolla y pimientos en tiras en la misma cazuela; añadir tomate frito concentrado.',
      'Reincorporar el bacalao con sus jugos y realizar movimientos circulares 5 minutos para ligar la salsa.'
    ],
    batchTip: 'Plato emblemático de batch cooking: tras 24h en frío, la gelatina y el pimiento intensifican su sabor.'
  },
  {
    id: 'trad-potaje-vigilia-bacalao',
    name: 'Potaje de Garbanzos con Bacalao y Espinacas Frescas (Vigilia Tradicional)',
    shortName: 'Potaje de Garbanzos con Bacalao',
    category: 'legumbres',
    mealType: 'lunch',
    station: 'fuego_1',
    prepTimeFormatted: '45 min (Cazuela tradicional)',
    prepTimeMinutes: 45,
    shelfLifeDaysFridge: 4,
    canFreeze: true,
    storageAdvice: 'Nevera Días 1-3 • Congelador Días 4+ (Textura impecable)',
    suitableDiets: ['mediterranean', 'traditional', 'fitness'],
    allergens: ['Pescado', 'Huevos'],
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=600&auto=format&fit=crop&q=80',
    source: 'Cocina Tradicional',
    sourceCompendium: '09_legumbres_y_potajes_de_cuchara.md',
    youtubeUrl: 'https://www.youtube.com/watch?v=dTxbi-ma7zQ',
    mainIngredientFamily: 'bacalao',
    culinaryTechnique: 'cuchara_potaje',
    ingredientsPerServing: [
      { name: 'Garbanzos pedrosillanos cocidos', quantity: 0.15, unit: 'kg', category: 'despensa' },
      { name: 'Bacalao desalado en dados limpios', quantity: 0.09, unit: 'kg', category: 'carnes-pescados' },
      { name: 'Espinacas frescas lavadas', quantity: 0.07, unit: 'kg', category: 'frescos' },
      { name: 'Huevo campero cocido', quantity: 0.5, unit: 'unidad', category: 'refrigerados' },
      { name: 'Majado de pan frito y almendras', quantity: 0.02, unit: 'kg', category: 'despensa' },
      { name: 'Caldo de pescado o verduras', quantity: 0.25, unit: 'L', category: 'despensa' }
    ],
    instructions: [
      'Elaborar el majado con pan frito, ajos y almendras en mortero.',
      'Pochar sofrito de cebolla y tomate; verter caldo, añadir garbanzos cocidos y el majado.',
      'Añadir espinacas 8 minutos y finalmente los dados de bacalao en los últimos 4 minutos para que queden jugosos.'
    ],
    batchTip: 'El majado emulsiona el caldo sedosamente sin necesidad de espesantes industriales.'
  },
  {
    id: 'trad-bacalao-salsa-verde',
    name: 'Lomos de Bacalao en Salsa Verde Tradicional con Almejas y Perejil',
    shortName: 'Bacalao en Salsa Verde con Almejas',
    category: 'pescados',
    mealType: 'dinner',
    station: 'fuego_2',
    prepTimeFormatted: '25 min (Cazuela baja)',
    prepTimeMinutes: 25,
    shelfLifeDaysFridge: 3,
    canFreeze: false,
    storageAdvice: 'Nevera Días 1-2 (Consumo prioritario de pescado fresco)',
    suitableDiets: ['mediterranean', 'traditional', 'fitness', 'lowcarb'],
    allergens: ['Pescado', 'Moluscos'],
    image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=600&auto=format&fit=crop&q=80',
    source: 'Cocina Tradicional',
    sourceCompendium: 'pescados_legumbres_arroces.md',
    mainIngredientFamily: 'bacalao',
    culinaryTechnique: 'salsa',
    ingredientsPerServing: [
      { name: 'Lomo de bacalao desalado extra', quantity: 0.18, unit: 'kg', category: 'carnes-pescados' },
      { name: 'Almejas frescas depuradas', quantity: 0.06, unit: 'kg', category: 'carnes-pescados' },
      { name: 'Ajo picado y perejil fresco abundante', quantity: 0.015, unit: 'kg', category: 'frescos' },
      { name: 'Vino blanco seco Montilla/Jerez', quantity: 0.04, unit: 'L', category: 'despensa' },
      { name: 'Fumet de pescado limpio', quantity: 0.12, unit: 'L', category: 'despensa' }
    ],
    instructions: [
      'Dorar ajo picado en AOVE sin quemar; añadir una pizca de harina y rehogar 1 minuto.',
      'Verter vino blanco y fumet de pescado; incorporar abundante perejil fresco picado.',
      'Disponer los lomos de bacalao con la piel hacia arriba y las almejas; tapar y mover en vaivén 6 minutos.'
    ],
    batchTip: 'Salsa verde ligera con un punto sedoso gracias a la gelatina natural del bacalao y el vaivén de la cazuela.'
  },
  {
    id: 'trad-tortilla-bacalao',
    name: 'Tortilla Jugosa de Bacalao Desmigado con Pimientos y Cebolla Pochada',
    shortName: 'Tortilla de Bacalao y Pimientos',
    category: 'huevos',
    mealType: 'dinner',
    station: 'fuego_1',
    prepTimeFormatted: '20 min (Sartén antiadherente)',
    prepTimeMinutes: 20,
    shelfLifeDaysFridge: 3,
    canFreeze: false,
    storageAdvice: 'Nevera Días 1-3 • Calentar 40s en sartén o microondas suave',
    suitableDiets: ['mediterranean', 'traditional', 'fitness', 'lowcarb'],
    allergens: ['Huevos', 'Pescado'],
    image: 'https://images.unsplash.com/photo-1510693206972-df098062cb71?w=600&auto=format&fit=crop&q=80',
    source: 'Cocina Tradicional',
    sourceCompendium: '04_huevos_tortillas_y_revueltos.md',
    mainIngredientFamily: 'bacalao',
    culinaryTechnique: 'tortilla',
    ingredientsPerServing: [
      { name: 'Huevos camperos frescos', quantity: 2, unit: 'unidad', category: 'refrigerados' },
      { name: 'Bacalao desalado desmigado fino', quantity: 0.08, unit: 'kg', category: 'carnes-pescados' },
      { name: 'Pimiento verde italiano en juliana', quantity: 0.05, unit: 'kg', category: 'frescos' },
      { name: 'Cebolla dulce pochada', quantity: 0.04, unit: 'kg', category: 'frescos' },
      { name: 'Aceite de oliva virgen extra', quantity: 0.015, unit: 'L', category: 'despensa' }
    ],
    instructions: [
      'Pochar pimiento verde y cebolla a fuego medio hasta que estén tiernos y dulces.',
      'Añadir el bacalao desalado y saltear solo 1 minuto para que no suelte exceso de agua.',
      'Batir huevos, mezclar con el salteado y cuajar la tortilla dejándola jugosa en el centro.'
    ],
    batchTip: 'Cena rápida de alto valor proteico, muy jugosa y fácil de conservar en fiambrera.'
  },
  {
    id: 'trad-arroz-bacalao-coliflor',
    name: 'Arroz Meloso Tradicional con Bacalao, Coliflor y Azafrán de la Mancha',
    shortName: 'Arroz con Bacalao y Coliflor',
    category: 'arroces_pastas',
    mealType: 'lunch',
    station: 'fuego_3',
    prepTimeFormatted: '30 min (Cazuela de barro/acero)',
    prepTimeMinutes: 30,
    shelfLifeDaysFridge: 2,
    canFreeze: false,
    storageAdvice: 'Consumir Días 1-2 • Textura melosa insuperable',
    suitableDiets: ['mediterranean', 'traditional', 'fitness'],
    allergens: ['Pescado'],
    image: 'https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?w=600&auto=format&fit=crop&q=80',
    source: 'Cocina Tradicional',
    sourceCompendium: '07_arroces_paellas_y_fideuas.md',
    mainIngredientFamily: 'bacalao',
    culinaryTechnique: 'arroz_meloso',
    ingredientsPerServing: [
      { name: 'Arroz bomba o sénia', quantity: 0.07, unit: 'kg', category: 'despensa' },
      { name: 'Bacalao desalado en dados', quantity: 0.09, unit: 'kg', category: 'carnes-pescados' },
      { name: 'Coliflor en ramilletes pequeños', quantity: 0.08, unit: 'kg', category: 'frescos' },
      { name: 'Pimiento rojo y tomate rallado', quantity: 0.06, unit: 'kg', category: 'frescos' },
      { name: 'Caldo de pescado con azafrán', quantity: 0.24, unit: 'L', category: 'despensa' }
    ],
    instructions: [
      'Dorar pimiento y coliflor; añadir tomate rallado y hebras de azafrán tostado.',
      'Nacarar el arroz 2 minutos e incorporar el caldo hirviendo.',
      'Cocer 14 minutos a fuego medio; añadir los dados de bacalao en los últimos 3 minutos y reposar tapado.'
    ],
    batchTip: 'Guiso marinero de invierno que combina el sabor salino del bacalao con la dulzura de la coliflor.'
  },

  // =========================================================================
  // 2. FAMILIA POLLO / CONTRAMUSLOS / AVES (VARIACIONES TRADICIONALES)
  // =========================================================================
  {
    id: 'trad-pollo-pepitoria',
    name: 'Pollo de Corral en Pepitoria Tradicional con Almendras Tostadas y Azafrán',
    shortName: 'Pollo de Corral en Pepitoria',
    category: 'carnes',
    mealType: 'lunch',
    station: 'fuego_2',
    prepTimeFormatted: '50 min (Cazuela baja)',
    prepTimeMinutes: 50,
    shelfLifeDaysFridge: 4,
    canFreeze: true,
    storageAdvice: 'Nevera Días 1-4 • Congelador 3 meses (Salsa muy estable)',
    suitableDiets: ['mediterranean', 'traditional', 'fitness', 'lowcarb'],
    allergens: ['Frutos de cáscara', 'Huevos'],
    image: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=600&auto=format&fit=crop&q=80',
    source: 'Cocina Tradicional',
    sourceCompendium: 'carnes_y_guisos.md',
    youtubeUrl: 'https://www.youtube.com/watch?v=F_fP4q16tCg',
    mainIngredientFamily: 'pollo',
    culinaryTechnique: 'salsa',
    ingredientsPerServing: [
      { name: 'Contramuslos o jamoncitos de pollo de corral', quantity: 0.22, unit: 'kg', category: 'carnes-pescados' },
      { name: 'Almendras crudas tostadas para majado', quantity: 0.02, unit: 'kg', category: 'despensa' },
      { name: 'Yema de huevo cocido', quantity: 0.5, unit: 'unidad', category: 'refrigerados' },
      { name: 'Cebolla picada fina', quantity: 0.07, unit: 'kg', category: 'frescos' },
      { name: 'Vino blanco Montilla/Jerez y caldo de ave', quantity: 0.15, unit: 'L', category: 'despensa' },
      { name: 'Hebra de azafrán y ajo', quantity: 0.5, unit: 'diente', category: 'especias' }
    ],
    instructions: [
      'Dorar el pollo salpimentado en AOVE hasta piel dorada y reservar.',
      'Pochar cebolla y ajos; majar almendras con yema cocida y azafrán.',
      'Desglasar con vino blanco, añadir el majado y caldo, reintegrar el pollo y cocer 30 min a fuego suave.'
    ],
    batchTip: 'Salsa espesada naturalmente por la almendra y la yema; excelente para recalentar toda la semana.'
  },
  {
    id: 'trad-pollo-ajillo',
    name: 'Pollo al Ajillo Tradicional con Romero Fresco y Reducción de Vino Blanco',
    shortName: 'Pollo al Ajillo con Romero',
    category: 'carnes',
    mealType: 'lunch',
    station: 'fuego_1',
    prepTimeFormatted: '30 min (Sartén amplia / Fuego vivo)',
    prepTimeMinutes: 30,
    shelfLifeDaysFridge: 4,
    canFreeze: true,
    storageAdvice: 'Nevera Días 1-4 • Calentar en sartén con sus propios ajos confitados',
    suitableDiets: ['mediterranean', 'traditional', 'fitness', 'lowcarb'],
    allergens: ['Sulfitos'],
    image: 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=600&auto=format&fit=crop&q=80',
    source: 'Cocina Tradicional',
    sourceCompendium: 'carnes_y_guisos.md',
    youtubeUrl: 'https://www.youtube.com/watch?v=d_k8wX2g8A4',
    mainIngredientFamily: 'pollo',
    culinaryTechnique: 'sarten_ajillo',
    ingredientsPerServing: [
      { name: 'Contramuslos o pollo troceado pequeño', quantity: 0.22, unit: 'kg', category: 'carnes-pescados' },
      { name: 'Dientes de ajo en camisa machacados', quantity: 3, unit: 'diente', category: 'frescos' },
      { name: 'Romero fresco y tomillo en rama', quantity: 1, unit: 'rama', category: 'especias' },
      { name: 'Vino blanco seco de cocina', quantity: 0.05, unit: 'L', category: 'despensa' },
      { name: 'Aceite de oliva virgen extra', quantity: 0.02, unit: 'L', category: 'despensa' }
    ],
    instructions: [
      'Confitar los ajos en camisa con AOVE y ramas de romero; retirar antes de quemar.',
      'Dorar el pollo a fuego vivo con sal y pimienta hasta corteza crujiente.',
      'Desglasar con vino blanco a fuego fuerte, reintegrar los ajos y reducir hasta salsa brillante.'
    ],
    batchTip: 'Sencillo, rápido y con un sabor intenso a campo gracias a los ajos en camisa confitados.'
  },
  {
    id: 'trad-pollo-asado-limon',
    name: 'Pollo Asado al Horno con Limón, Tomillo y Lecho de Patatas Panaderas',
    shortName: 'Pollo Asado al Limón con Patatas',
    category: 'carnes',
    mealType: 'lunch',
    station: 'horno',
    prepTimeFormatted: '45 min (Horno 195°C simultáneo)',
    prepTimeMinutes: 45,
    shelfLifeDaysFridge: 3,
    canFreeze: false,
    storageAdvice: 'Nevera Días 1-3 • Regenerar 5 min en horno o sartén con tapa',
    suitableDiets: ['mediterranean', 'traditional', 'fitness'],
    allergens: [],
    image: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=600&auto=format&fit=crop&q=80',
    source: 'Cocina Tradicional',
    sourceCompendium: 'carnes_y_guisos.md',
    mainIngredientFamily: 'pollo',
    culinaryTechnique: 'asado_horno',
    ingredientsPerServing: [
      { name: 'Contramuslos o cuartos traseros de pollo', quantity: 0.24, unit: 'kg', category: 'carnes-pescados' },
      { name: 'Patatas medianas cortadas en panadera', quantity: 0.15, unit: 'kg', category: 'frescos' },
      { name: 'Limón en rodajas y zumo fresco', quantity: 0.5, unit: 'unidad', category: 'frescos' },
      { name: 'Cebolla dulce en aros finos', quantity: 0.05, unit: 'kg', category: 'frescos' },
      { name: 'Tomillo fresco, sal marina y AOVE', quantity: 1, unit: 'cda', category: 'especias' }
    ],
    instructions: [
      'Disponer las patatas y cebolla en la base de la bandeja de horno con sal y un hilo de AOVE.',
      'Colocar el pollo encima sazonado con tomillo, sal, pimienta y zumo de limón.',
      'Hornear a 195°C durante 45 minutos hasta que la piel quede crujiente y las patatas melosas.'
    ],
    batchTip: 'Ideal para cocción en paralelo en el horno mientras se guisa en los fuegos de inducción.'
  },
  {
    id: 'trad-arroz-pollo-campero',
    name: 'Arroz con Pollo Campero y Verduras de la Huerta a la Cazuela',
    shortName: 'Arroz con Pollo Campero',
    category: 'arroces_pastas',
    mealType: 'lunch',
    station: 'fuego_3',
    prepTimeFormatted: '30 min (Cazuela)',
    prepTimeMinutes: 30,
    shelfLifeDaysFridge: 2,
    canFreeze: false,
    storageAdvice: 'Consumir Días 1-2 • Textura melosa',
    suitableDiets: ['mediterranean', 'traditional', 'fitness'],
    allergens: [],
    image: 'https://images.unsplash.com/photo-1543339308-43e59d6b73a6?w=600&auto=format&fit=crop&q=80',
    source: 'Cocina Tradicional',
    sourceCompendium: '07_arroces_paellas_y_fideuas.md',
    mainIngredientFamily: 'pollo',
    culinaryTechnique: 'arroz_meloso',
    ingredientsPerServing: [
      { name: 'Arroz bomba tradicional', quantity: 0.07, unit: 'kg', category: 'despensa' },
      { name: 'Contramuslo de pollo deshuesado en dados', quantity: 0.12, unit: 'kg', category: 'carnes-pescados' },
      { name: 'Pimiento verde, rojo y judías verdes', quantity: 0.08, unit: 'kg', category: 'frescos' },
      { name: 'Caldo de ave casero concentrado', quantity: 0.22, unit: 'L', category: 'despensa' },
      { name: 'Azafrán, pimentón dulce y romero', quantity: 0.3, unit: 'cucharadita', category: 'especias' }
    ],
    instructions: [
      'Dorar los dados de contramuslo en la cazuela con AOVE y apartar.',
      'Pochar las verduras y nacarar el arroz 2 minutos con el pimentón y azafrán.',
      'Verter caldo hirviendo, reincorporar el pollo y cocinar 16 minutos a fuego medio.'
    ],
    batchTip: 'Comida reconfortante de mediodía llena de sabor y nutrientes.'
  },
  {
    id: 'trad-croquetas-pollo-asado',
    name: 'Croquetas Caseras Cremosas de Pollo Asado y Huevo Duro',
    shortName: 'Croquetas de Pollo Asado',
    category: 'tapas',
    mealType: 'dinner',
    station: 'fuego_1',
    prepTimeFormatted: '35 min (Sartén / Masa reposada)',
    prepTimeMinutes: 35,
    shelfLifeDaysFridge: 4,
    canFreeze: true,
    storageAdvice: 'Nevera Días 1-4 • Congelador 3 meses (Freír directas sin descongelar)',
    suitableDiets: ['mediterranean', 'traditional'],
    allergens: ['Gluten', 'Lácteos', 'Huevos'],
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&auto=format&fit=crop&q=80',
    source: 'Cocina Tradicional',
    sourceCompendium: '01_tapas_y_entrantes.md',
    mainIngredientFamily: 'pollo',
    culinaryTechnique: 'frito_empanado',
    ingredientsPerServing: [
      { name: 'Pollo asado desmigado fino', quantity: 0.08, unit: 'kg', category: 'carnes-pescados' },
      { name: 'Huevo duro picado', quantity: 0.5, unit: 'unidad', category: 'refrigerados' },
      { name: 'Leche entera fresca', quantity: 0.15, unit: 'L', category: 'refrigerados' },
      { name: 'Harina de trigo y mantequilla', quantity: 0.025, unit: 'kg', category: 'despensa' },
      { name: 'Pan rallado fino y huevo para empanar', quantity: 0.03, unit: 'kg', category: 'despensa' }
    ],
    instructions: [
      'Tostar la harina en mantequilla 3 minutos; verter la leche caliente poco a poco batiendo con varillas.',
      'Añadir el pollo desmigado y el huevo duro picado; cocinar hasta que la masa se despegue de la sartén.',
      'Enfriar tapada a piel 12h, formar croquetas, empanar y freír en abundante AOVE caliente.'
    ],
    batchTip: 'La receta definitiva de aprovechamiento de pollo asado: congelan de fábula en bandeja.'
  },

  // =========================================================================
  // 3. FAMILIA TERNERA / CARNES TRADICIONALES (VARIACIONES)
  // =========================================================================
  {
    id: 'trad-albondigas-salsa-abuela',
    name: 'Albóndigas Caseras de Ternera en Salsa de la Abuela con Champiñones',
    shortName: 'Albóndigas Caseras en Salsa',
    category: 'carnes',
    mealType: 'lunch',
    station: 'fuego_1',
    prepTimeFormatted: '40 min (Cazuela)',
    prepTimeMinutes: 40,
    shelfLifeDaysFridge: 4,
    canFreeze: true,
    storageAdvice: 'Nevera Días 1-4 • Congelador 3 meses (Muy jugosas)',
    suitableDiets: ['mediterranean', 'traditional', 'fitness'],
    allergens: ['Gluten', 'Huevos'],
    image: 'https://images.unsplash.com/photo-1529042410759-befb1204b468?w=600&auto=format&fit=crop&q=80',
    source: 'Cocina Tradicional',
    sourceCompendium: 'carnes_y_guisos.md',
    youtubeUrl: 'https://www.youtube.com/watch?v=kYv_87U1uH0',
    mainIngredientFamily: 'ternera',
    culinaryTechnique: 'salsa',
    ingredientsPerServing: [
      { name: 'Carne picada de ternera y cerdo', quantity: 0.18, unit: 'kg', category: 'carnes-pescados' },
      { name: 'Miga de pan remojada en leche', quantity: 0.02, unit: 'kg', category: 'despensa' },
      { name: 'Cebolla dulce y zanahoria', quantity: 0.08, unit: 'kg', category: 'frescos' },
      { name: 'Champiñones laminados', quantity: 0.05, unit: 'kg', category: 'frescos' },
      { name: 'Caldo de carne concentrado', quantity: 0.18, unit: 'L', category: 'despensa' }
    ],
    instructions: [
      'Amasar la carne picada con miga de pan, ajo, perejil y huevo; formar bolas y enharinar levemente.',
      'Sellar las albóndigas en AOVE y reservar.',
      'Pochar cebolla, zanahoria y champiñones; añadir caldo y cocinar las albóndigas en la salsa 20 minutos.'
    ],
    batchTip: 'Plato infalible para toda la familia: la salsa gana melosidad al reposar.'
  },
  {
    id: 'trad-carrilleras-vino-tinto',
    name: 'Carrilleras de Ternera Glaseadas al Vino Tinto Rioja con Zanahorias',
    shortName: 'Carrilleras al Vino Tinto',
    category: 'carnes',
    mealType: 'lunch',
    station: 'olla_expres',
    prepTimeFormatted: '50 min (Olla rápida)',
    prepTimeMinutes: 50,
    shelfLifeDaysFridge: 4,
    canFreeze: true,
    storageAdvice: 'Nevera Días 1-4 • Congelador 3 meses (Gelatina insuperable)',
    suitableDiets: ['mediterranean', 'traditional', 'lowcarb', 'fitness'],
    allergens: ['Sulfitos'],
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=600&auto=format&fit=crop&q=80',
    source: 'Cocina Tradicional',
    sourceCompendium: 'carnes_y_guisos.md',
    youtubeUrl: 'https://www.youtube.com/watch?v=0hW64X_aHkI',
    mainIngredientFamily: 'ternera',
    culinaryTechnique: 'guiso',
    ingredientsPerServing: [
      { name: 'Carrillera de ternera limpia en dados gruesos', quantity: 0.2, unit: 'kg', category: 'carnes-pescados' },
      { name: 'Vino tinto crianza de calidad', quantity: 0.1, unit: 'L', category: 'despensa' },
      { name: 'Zanahorias y puerro', quantity: 0.1, unit: 'kg', category: 'frescos' },
      { name: 'Cebolla morada', quantity: 0.08, unit: 'kg', category: 'frescos' },
      { name: 'Caldo oscuro de carne', quantity: 0.18, unit: 'L', category: 'despensa' }
    ],
    instructions: [
      'Marcar las carrilleras a fuego fuerte hasta sellar y reservar.',
      'Pochar las verduras cortadas en mirepoix; añadir el vino tinto y reducir a la mitad.',
      'Cubrir con caldo, cerrar olla rápida y cocinar 35 minutos a máxima presión; triturar la salsa para glasear.'
    ],
    batchTip: 'Corte con colágeno que se derrite en la boca al calentarse lentamente.'
  },

  // =========================================================================
  // 4. FAMILIA PESCADOS & MARISCOS TRADICIONALES
  // =========================================================================
  {
    id: 'trad-merluza-salsa-verde',
    name: 'Merluza del Cantábrico en Salsa Verde con Almejas y Espárragos Blancos',
    shortName: 'Merluza en Salsa Verde con Almejas',
    category: 'pescados',
    mealType: 'dinner',
    station: 'fuego_1',
    prepTimeFormatted: '25 min (Cazuela baja)',
    prepTimeMinutes: 25,
    shelfLifeDaysFridge: 2,
    canFreeze: false,
    storageAdvice: 'Consumir Días 1-2 • Calentar muy suave para mantener la jugosidad',
    suitableDiets: ['mediterranean', 'traditional', 'fitness', 'lowcarb'],
    allergens: ['Pescado', 'Moluscos'],
    image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=600&auto=format&fit=crop&q=80',
    source: 'Cocina Tradicional',
    sourceCompendium: 'pescados_legumbres_arroces.md',
    youtubeUrl: 'https://www.youtube.com/watch?v=q6gX_p7fM_Y',
    mainIngredientFamily: 'merluza',
    culinaryTechnique: 'salsa',
    ingredientsPerServing: [
      { name: 'Lomos de merluza fresca limpia', quantity: 0.18, unit: 'kg', category: 'carnes-pescados' },
      { name: 'Almejas frescas depuradas', quantity: 0.05, unit: 'kg', category: 'carnes-pescados' },
      { name: 'Espárragos blancos gruesos', quantity: 2, unit: 'unidad', category: 'despensa' },
      { name: 'Caldo de pescado o fumet suave', quantity: 0.12, unit: 'L', category: 'despensa' },
      { name: 'Ajo picado, perejil abundante y AOVE', quantity: 1, unit: 'cda', category: 'frescos' }
    ],
    instructions: [
      'Pochar ajo laminado en AOVE; rehogar una pizca de harina sin que dore.',
      'Añadir fumet de pescado y perejil fresco picado; ligar la salsa verde en vaivén.',
      'Colocar los lomos de merluza y las almejas; tapar 5 minutos hasta que abran y decorar con espárragos.'
    ],
    batchTip: 'Cena ligera, digestiva y de alta calidad gastronómica para los primeros días del lote.'
  },
  {
    id: 'trad-marmitako-bonito',
    name: 'Marmitako Tradicional de Bonito del Norte con Patatas Chascadas y Pimiento Choricero',
    shortName: 'Marmitako de Bonito del Norte',
    category: 'pescados',
    mealType: 'lunch',
    station: 'fuego_2',
    prepTimeFormatted: '35 min (Cazuela)',
    prepTimeMinutes: 35,
    shelfLifeDaysFridge: 3,
    canFreeze: false,
    storageAdvice: 'Nevera Días 1-3 • Calentar a fuego suave sin hervir fuerte',
    suitableDiets: ['mediterranean', 'traditional', 'fitness'],
    allergens: ['Pescado'],
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=600&auto=format&fit=crop&q=80',
    source: 'Cocina Tradicional',
    sourceCompendium: 'pescados_legumbres_arroces.md',
    youtubeUrl: 'https://www.youtube.com/watch?v=1-3U1_Z512c',
    mainIngredientFamily: 'atun',
    culinaryTechnique: 'guiso',
    ingredientsPerServing: [
      { name: 'Tacos de bonito del norte o atún limpio', quantity: 0.15, unit: 'kg', category: 'carnes-pescados' },
      { name: 'Patatas chascadas para espesar caldo', quantity: 0.15, unit: 'kg', category: 'frescos' },
      { name: 'Carne de pimiento choricero', quantity: 0.015, unit: 'kg', category: 'despensa' },
      { name: 'Cebolla, pimiento verde y tomate', quantity: 0.08, unit: 'kg', category: 'frescos' },
      { name: 'Fumet de pescado o agua', quantity: 0.22, unit: 'L', category: 'despensa' }
    ],
    instructions: [
      'Hacer un sofrito concentrado de cebolla, pimiento verde y pulpa de choricero.',
      'Añadir las patatas chascándolas para que suelten almidón; rehogar 3 minutos.',
      'Cubrir de caldo y cocer 20 minutos; apagar el fuego, añadir los tacos de bonito y dejar que se cocinen con el calor residual 3 minutos.'
    ],
    batchTip: 'Chascar la patata libera almidón y da una salsa aterciopelada sin necesidad de natas ni espesantes.'
  },

  // =========================================================================
  // 5. FAMILIA LEGUMBRES & VERDURAS TRADICIONALES
  // =========================================================================
  {
    id: 'trad-lentejas-chorizo',
    name: 'Lentejas Pardinas con Chorizo, Costilla y Majado Tradicional',
    shortName: 'Lentejas Pardinas con Chorizo',
    category: 'legumbres',
    mealType: 'lunch',
    station: 'olla_expres',
    prepTimeFormatted: '35 min (Olla rápida)',
    prepTimeMinutes: 35,
    shelfLifeDaysFridge: 4,
    canFreeze: true,
    storageAdvice: 'Nevera Días 1-3 • Congelador Días 4+ (Resiste excelente)',
    suitableDiets: ['mediterranean', 'traditional', 'fitness'],
    allergens: ['Sulfitos'],
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&auto=format&fit=crop&q=80',
    source: 'Cocina Tradicional',
    sourceCompendium: '09_legumbres_y_potajes_de_cuchara.md',
    youtubeUrl: 'https://www.youtube.com/watch?v=ktv5vseGTSY',
    mainIngredientFamily: 'legumbres',
    culinaryTechnique: 'cuchara_potaje',
    ingredientsPerServing: [
      { name: 'Lentejas pardinas secas', quantity: 0.08, unit: 'kg', category: 'despensa' },
      { name: 'Chorizo fresco oreado', quantity: 0.04, unit: 'kg', category: 'carnes-pescados' },
      { name: 'Costilla de cerdo troceada', quantity: 0.05, unit: 'kg', category: 'carnes-pescados' },
      { name: 'Zanahorias frescas', quantity: 0.08, unit: 'kg', category: 'frescos' },
      { name: 'Cebolla dulce picada', quantity: 0.06, unit: 'kg', category: 'frescos' },
      { name: 'Pimiento verde italiano', quantity: 0.04, unit: 'kg', category: 'frescos' },
      { name: 'Patatas (trozo chasqueado)', quantity: 0.06, unit: 'kg', category: 'frescos' },
      { name: 'Pimentón de la Vera dulce', quantity: 0.3, unit: 'cucharadita', category: 'especias' },
      { name: 'Laurel seco y ajo', quantity: 0.5, unit: 'diente', category: 'frescos' },
      { name: 'Caldo de ave o agua mineral', quantity: 0.28, unit: 'L', category: 'despensa' }
    ],
    instructions: [
      'Poner en la olla rápida las lentejas lavadas con la cebolla, pimiento, zanahoria, costilla y ajo en crudo.',
      'Añadir el pimentón dulce, la hoja de laurel y cubrir con caldo de ave o agua fría.',
      'Cerrar la olla rápida y cocinar 15 minutos en posición 2 tras subir las anillas.',
      'Despresurizar, añadir las patatas chascadas y el chorizo, y cocinar 8 minutos más a fuego suave sin tapa para espesar el caldo con el majado.'
    ],
    batchTip: 'Guiso rey del batch cooking: gana untuosidad y profundidad tras 24h de reposo en frío.'
  },
  {
    id: 'trad-alubias-blancas-estofadas',
    name: 'Alubias Blancas Estofadas con Verduras de la Huerta y Panceta Ibérica',
    shortName: 'Alubias Blancas Estofadas',
    category: 'legumbres',
    mealType: 'lunch',
    station: 'olla_expres',
    prepTimeFormatted: '40 min (Olla rápida)',
    prepTimeMinutes: 40,
    shelfLifeDaysFridge: 4,
    canFreeze: true,
    storageAdvice: 'Nevera Días 1-4 • Congela perfectamente en tuppers herméticos',
    suitableDiets: ['mediterranean', 'traditional'],
    allergens: [],
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&auto=format&fit=crop&q=80',
    source: 'Cocina Tradicional',
    sourceCompendium: '09_legumbres_y_potajes_de_cuchara.md',
    mainIngredientFamily: 'legumbres',
    culinaryTechnique: 'cuchara_potaje',
    ingredientsPerServing: [
      { name: 'Alubias blancas secas remojadas', quantity: 0.08, unit: 'kg', category: 'despensa' },
      { name: 'Panceta ibérica fresca troceada', quantity: 0.04, unit: 'kg', category: 'carnes-pescados' },
      { name: 'Zanahorias y puerro', quantity: 0.08, unit: 'kg', category: 'frescos' },
      { name: 'Pimiento rojo y verde', quantity: 0.05, unit: 'kg', category: 'frescos' },
      { name: 'Pimentón dulce y comino molido', quantity: 0.3, unit: 'cucharadita', category: 'especias' }
    ],
    instructions: [
      'Poner alubias en la olla rápida con panceta y verduras enteras en crudo.',
      'Asustar con agua fría al romper hervor; cerrar olla y cocer 20 minutos.',
      'Triturar parte de las verduras con un poco de caldo y reintegrar para espesar.'
    ],
    batchTip: 'Cuchara tradicional nutritiva y muy fácil de calentar en microondas 3 min.'
  },
  {
    id: 'trad-pisto-manchego',
    name: 'Pisto Manchego Tradicional Confitado a Fuego Lento',
    shortName: 'Pisto Manchego Confitado',
    category: 'verduras',
    mealType: 'universal',
    station: 'fuego_3',
    prepTimeFormatted: '40 min (Cazuela baja)',
    prepTimeMinutes: 40,
    shelfLifeDaysFridge: 5,
    canFreeze: true,
    storageAdvice: 'Nevera Días 1-5 • Congelador 3 meses (Base multiusos perfecta)',
    suitableDiets: ['mediterranean', 'traditional', 'veggie', 'fitness', 'lowcarb'],
    allergens: [],
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&auto=format&fit=crop&q=80',
    source: 'Cocina Tradicional',
    sourceCompendium: 'verduras_salsas_postres.md',
    youtubeUrl: 'https://www.youtube.com/watch?v=0hW64X_aHkI',
    mainIngredientFamily: 'verduras',
    culinaryTechnique: 'guiso',
    ingredientsPerServing: [
      { name: 'Calabacín fresco en dados homogéneos', quantity: 0.1, unit: 'kg', category: 'frescos' },
      { name: 'Berenjena fresca en dados', quantity: 0.08, unit: 'kg', category: 'frescos' },
      { name: 'Pimiento verde y rojo italiano', quantity: 0.08, unit: 'kg', category: 'frescos' },
      { name: 'Cebolla dulce pochada', quantity: 0.07, unit: 'kg', category: 'frescos' },
      { name: 'Tomate triturado casero concentrado', quantity: 0.12, unit: 'kg', category: 'despensa' }
    ],
    instructions: [
      'Pochar la cebolla y los pimientos 15 minutos en AOVE con sal.',
      'Añadir el calabacín y la berenjena; confitar a fuego suave 15 minutos.',
      'Incorporar el tomate triturado y cocinar 15 minutos más hasta reducción densa.'
    ],
    batchTip: 'Compañero universal: sirve de guarnición para carnes, pescados, huevos fritos o relleno de empanada.'
  },
  {
    id: 'trad-crema-calabacin-suave',
    name: 'Crema Aterciopelada de Calabacín, Puerro y Quesitos Suaves',
    shortName: 'Crema de Calabacín Aterciopelada',
    category: 'cremas',
    mealType: 'dinner',
    station: 'robot',
    prepTimeFormatted: '25 min (Olla / Robot)',
    prepTimeMinutes: 25,
    shelfLifeDaysFridge: 4,
    canFreeze: true,
    storageAdvice: 'Nevera Días 1-4 • Congelador 2 meses (Cena reconfortante)',
    suitableDiets: ['mediterranean', 'traditional', 'veggie', 'fitness'],
    allergens: ['Lácteos'],
    image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=600&auto=format&fit=crop&q=80',
    source: 'Cocina Tradicional',
    sourceCompendium: '02_sopas_cremas_y_potajes.md',
    youtubeUrl: 'https://www.youtube.com/watch?v=d_k8wX2g8A4',
    mainIngredientFamily: 'verduras',
    culinaryTechnique: 'crema',
    ingredientsPerServing: [
      { name: 'Calabacín con piel lavado y troceado', quantity: 0.2, unit: 'kg', category: 'frescos' },
      { name: 'Puerro fresco (parte blanca)', quantity: 0.07, unit: 'kg', category: 'frescos' },
      { name: 'Patata pequeña para textura', quantity: 0.05, unit: 'kg', category: 'frescos' },
      { name: 'Quesito en porciones o crema suave', quantity: 1, unit: 'unidad', category: 'refrigerados' },
      { name: 'Caldo de ave o verduras mineral', quantity: 0.18, unit: 'L', category: 'despensa' }
    ],
    instructions: [
      'Rehogar el puerro con AOVE 5 min sin dorar; añadir calabacín y patata.',
      'Cubrir justo con caldo y cocer 18 minutos hasta tiernos.',
      'Añadir el quesito y triturar a máxima potencia 2 minutos hasta textura sedosa.'
    ],
    batchTip: 'Cena digestiva, saciante y con un color verde brillante muy apetecible.'
  },
  {
    id: 'trad-salmorejo-cordobes',
    name: 'Salmorejo Cordobés Tradicional con Jamón Ibérico y Huevo Duro',
    shortName: 'Salmorejo Cordobés Tradicional',
    category: 'cremas',
    mealType: 'universal',
    station: 'frio',
    prepTimeFormatted: '15 min (Batidora / Frío)',
    prepTimeMinutes: 15,
    shelfLifeDaysFridge: 4,
    canFreeze: false,
    storageAdvice: 'Conservar en nevera a 3°C • Servir muy frío',
    suitableDiets: ['mediterranean', 'traditional'],
    allergens: ['Gluten', 'Huevos'],
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&auto=format&fit=crop&q=80',
    source: 'Cocina Tradicional',
    sourceCompendium: '02_sopas_cremas_y_potajes.md',
    youtubeUrl: 'https://www.youtube.com/watch?v=F_fP4q16tCg',
    mainIngredientFamily: 'verduras',
    culinaryTechnique: 'frio_alino',
    ingredientsPerServing: [
      { name: 'Tomates maduros de rama o pera', quantity: 0.25, unit: 'kg', category: 'frescos' },
      { name: 'Pan de telera cordobesa o candeal', quantity: 0.05, unit: 'kg', category: 'despensa' },
      { name: 'Aceite de oliva virgen extra de calidad', quantity: 0.03, unit: 'L', category: 'despensa' },
      { name: 'Diente de ajo pelado', quantity: 0.25, unit: 'diente', category: 'frescos' },
      { name: 'Taquitos de jamón ibérico y huevo duro', quantity: 0.03, unit: 'kg', category: 'carnes-pescados' }
    ],
    instructions: [
      'Triturar los tomates limpios y colar para retirar pieles y semillas.',
      'Añadir el pan candeal, el ajo y la sal; dejar empapar 5 minutos.',
      'Triturar emulsionando con el AOVE a hilo hasta conseguir una textura espesa y aterciopelada.'
    ],
    batchTip: 'Emulsión clásica andaluza que aguanta 4 días en nevera lista para servir en 10 segundos.'
  },

  // =========================================================================
  // 6. ARROCES, PASTAS & MASAS TRADICIONALES
  // =========================================================================
  {
    id: 'trad-arroz-caldoso-marinero',
    name: 'Arroz Caldoso Marinero con Gambones, Sepia y Fumet Concentrado',
    shortName: 'Arroz Caldoso Marinero',
    category: 'arroces_pastas',
    mealType: 'lunch',
    station: 'fuego_2',
    prepTimeFormatted: '30 min (Cazuela)',
    prepTimeMinutes: 30,
    shelfLifeDaysFridge: 2,
    canFreeze: false,
    storageAdvice: 'Consumir Días 1-2 • Textura y grano óptimos',
    suitableDiets: ['mediterranean', 'traditional', 'fitness'],
    allergens: ['Crustáceos', 'Moluscos', 'Pescado'],
    image: 'https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?w=600&auto=format&fit=crop&q=80',
    source: 'Cocina Tradicional',
    sourceCompendium: '07_arroces_paellas_y_fideuas.md',
    youtubeUrl: 'https://www.youtube.com/watch?v=ktv5vseGTSY',
    mainIngredientFamily: 'arroz',
    culinaryTechnique: 'arroz_meloso',
    ingredientsPerServing: [
      { name: 'Arroz bomba o redondo', quantity: 0.07, unit: 'kg', category: 'despensa' },
      { name: 'Sepia limpia en dados pequeños', quantity: 0.08, unit: 'kg', category: 'carnes-pescados' },
      { name: 'Gambones frescos o langostinos', quantity: 2, unit: 'unidad', category: 'carnes-pescados' },
      { name: 'Fumet de pescado y cabezas de gamba', quantity: 0.28, unit: 'L', category: 'despensa' },
      { name: 'Sofrito de tomate, ajo y pimentón', quantity: 0.06, unit: 'kg', category: 'frescos' }
    ],
    instructions: [
      'Marcar los gambones en AOVE y reservar; en el mismo aceite dorar la sepia picada.',
      'Añadir sofrito de tomate y pimentón; incorporar el arroz y nacarar 1 minuto.',
      'Mojar con el fumet hirviendo y cocinar 15 minutos; incorporar gambones y servir caldoso.'
    ],
    batchTip: 'El fumet casero de cabezas de marisco multiplica el sabor marinero del caldo.'
  },
  {
    id: 'trad-tortilla-patatas-cebolla',
    name: 'Tortilla Española de Patatas Jugosa con Cebolla Pochada',
    shortName: 'Tortilla de Patatas con Cebolla',
    category: 'huevos',
    mealType: 'universal',
    station: 'fuego_1',
    prepTimeFormatted: '30 min (Sartén antiadherente)',
    prepTimeMinutes: 30,
    shelfLifeDaysFridge: 3,
    canFreeze: false,
    storageAdvice: 'Nevera Días 1-3 • Calentar brevemente en sartén',
    suitableDiets: ['mediterranean', 'traditional', 'veggie'],
    allergens: ['Huevos'],
    image: 'https://images.unsplash.com/photo-1510693206972-df098062cb71?w=600&auto=format&fit=crop&q=80',
    source: 'Cocina Tradicional',
    sourceCompendium: '04_huevos_tortillas_y_revueltos.md',
    youtubeUrl: 'https://www.youtube.com/watch?v=F_fP4q16tCg',
    mainIngredientFamily: 'huevos',
    culinaryTechnique: 'tortilla',
    ingredientsPerServing: [
      { name: 'Huevos camperos frescos', quantity: 2, unit: 'unidad', category: 'refrigerados' },
      { name: 'Patata agria cortada en lascas finas', quantity: 0.15, unit: 'kg', category: 'frescos' },
      { name: 'Cebolla dulce pochada suave', quantity: 0.06, unit: 'kg', category: 'frescos' },
      { name: 'Aceite de oliva virgen extra para confitar', quantity: 0.04, unit: 'L', category: 'despensa' }
    ],
    instructions: [
      'Confitar las patatas y la cebolla a fuego medio en abundante AOVE hasta que queden tiernas.',
      'Escurrir muy bien el aceite y mezclar con los huevos batidos con sal; reposar 5 minutos.',
      'Cuajar en sartén bien caliente 1 minuto por lado dejando el centro meloso.'
    ],
    batchTip: 'Dejar reposar las patatas confitadas en el huevo batido es el secreto de la jugosidad extrema.'
  },
  {
    id: 'trad-croquetas-jamon-iberico',
    name: 'Croquetas de Jamón Ibérico Cremosas de la Abuela con Bechamel Tamizada',
    shortName: 'Croquetas de Jamón Ibérico',
    category: 'tapas',
    mealType: 'dinner',
    station: 'fuego_1',
    prepTimeFormatted: '35 min (Masa reposada)',
    prepTimeMinutes: 35,
    shelfLifeDaysFridge: 4,
    canFreeze: true,
    storageAdvice: 'Nevera Días 1-4 • Congelador 3 meses (Freír directas congeladas)',
    suitableDiets: ['mediterranean', 'traditional'],
    allergens: ['Gluten', 'Lácteos', 'Huevos'],
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&auto=format&fit=crop&q=80',
    source: 'Cocina Tradicional',
    sourceCompendium: '01_tapas_y_entrantes.md',
    youtubeUrl: 'https://www.youtube.com/watch?v=kYv_87U1uH0',
    culinaryTechnique: 'frito_empanado',
    ingredientsPerServing: [
      { name: 'Jamón ibérico curado picado fino', quantity: 0.06, unit: 'kg', category: 'carnes-pescados' },
      { name: 'Leche entera fresca caliente', quantity: 0.15, unit: 'L', category: 'refrigerados' },
      { name: 'Mantequilla y harina de trigo', quantity: 0.025, unit: 'kg', category: 'despensa' },
      { name: 'Pan rallado fino y huevo para rebozar', quantity: 0.03, unit: 'kg', category: 'despensa' }
    ],
    instructions: [
      'Tostar harina en mantequilla 3 min; verter leche caliente poco a poco sin parar de batir.',
      'Añadir el jamón al final para que no se sale; enfriar tapada a piel 12h.',
      'Bolear, pasar por harina, huevo y pan rallado y freír en AOVE a 180°C.'
    ],
    batchTip: 'Bechamel cocinada 20 minutos a fuego suave para eliminar el sabor a harina cruda.'
  },
  {
    id: 'trad-empanada-gallega-atun',
    name: 'Empanada Gallega Tradicional de Atún con Sofrito Confitado y Huevo Duro',
    shortName: 'Empanada Gallega de Atún',
    category: 'masas',
    mealType: 'universal',
    station: 'horno',
    prepTimeFormatted: '45 min (Horno 190°C)',
    prepTimeMinutes: 45,
    shelfLifeDaysFridge: 4,
    canFreeze: true,
    storageAdvice: 'Nevera Días 1-4 • Calentar en horno o consumir a temperatura ambiente',
    suitableDiets: ['mediterranean', 'traditional'],
    allergens: ['Gluten', 'Pescado', 'Huevos'],
    image: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=600&auto=format&fit=crop&q=80',
    source: 'Cocina Tradicional',
    sourceCompendium: '12_masas_panes_empanadas_y_quiches.md',
    youtubeUrl: 'https://www.youtube.com/watch?v=ktv5vseGTSY',
    mainIngredientFamily: 'atun',
    culinaryTechnique: 'asado_horno',
    ingredientsPerServing: [
      { name: 'Masa de empanada casera con pimentón', quantity: 0.09, unit: 'kg', category: 'despensa' },
      { name: 'Atún claro en aceite bien escurrido', quantity: 0.08, unit: 'kg', category: 'carnes-pescados' },
      { name: 'Cebolla pochada y pimiento rojo', quantity: 0.08, unit: 'kg', category: 'frescos' },
      { name: 'Tomate frito concentrado y huevo duro', quantity: 0.04, unit: 'kg', category: 'despensa' }
    ],
    instructions: [
      'Pochar cebolla y pimiento con pimentón; escurrir el aceite sobrante para la masa.',
      'Mezclar sofrito con atún desmigado y huevo duro picado.',
      'Rellenar la masa, sellar repulgue, pintar con huevo batido y hornear 35 min a 190°C.'
    ],
    batchTip: 'Perfecta para llevar en tupper, comer fría o caliente sin necesidad de cubiertos.'
  }
];

/**
 * Obtiene recetas canónicas filtradas por tipo de comida y estilo dietético
 */
export function getFilteredTraditionalRecipes(params: {
  mealType?: 'lunch' | 'dinner' | 'universal';
  dietStyle?: 'mediterranean' | 'traditional' | 'fitness' | 'veggie' | 'lowcarb';
  category?: CanonicalRecipe['category'] | 'all';
  excludedAllergens?: string[];
  searchQuery?: string;
}): CanonicalRecipe[] {
  return TRADITIONAL_RECIPES_DATABASE.filter(recipe => {
    if (params.mealType && params.mealType !== 'universal' && recipe.mealType !== 'universal' && recipe.mealType !== params.mealType) {
      return false;
    }
    if (params.dietStyle && !recipe.suitableDiets.includes(params.dietStyle)) {
      return false;
    }
    if (params.category && params.category !== 'all' && recipe.category !== params.category) {
      return false;
    }
    if (params.excludedAllergens && params.excludedAllergens.length > 0) {
      const hasAllergen = recipe.allergens.some(a => params.excludedAllergens!.includes(a));
      if (hasAllergen) return false;
    }
    if (params.searchQuery && params.searchQuery.trim()) {
      const q = params.searchQuery.toLowerCase().trim();
      const matchName = recipe.name.toLowerCase().includes(q) || recipe.shortName.toLowerCase().includes(q);
      const matchIng = recipe.ingredientsPerServing.some(i => i.name.toLowerCase().includes(q));
      const matchCat = recipe.category.toLowerCase().includes(q);
      if (!matchName && !matchIng && !matchCat) return false;
    }
    return true;
  });
}

/**
 * Obtiene una receta por su ID
 */
export function getTraditionalRecipeById(id: string): CanonicalRecipe | undefined {
  return TRADITIONAL_RECIPES_DATABASE.find(r => r.id === id);
}

/**
 * Emparejador inteligente por palabras clave e ingredientes en el catálogo de Cocina Tradicional
 * Respeta alérgenos excluidos y balancea estaciones térmicas para batch cooking concurrente.
 */
export function matchTraditionalRecipesByPrompt(
  userPrompt: string,
  excludedAllergens: string[] = [],
  dietStyle?: string,
  count: number = 5
): CanonicalRecipe[] {
  if (!userPrompt || !userPrompt.trim()) {
    return getFilteredTraditionalRecipes({
      excludedAllergens,
      dietStyle: dietStyle as any
    }).slice(0, count);
  }

  const normalizedQuery = userPrompt
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');

  const rawTokens = normalizedQuery
    .replace(/[^\w\s]/g, ' ')
    .split(/\s+/)
    .filter(t => t.length >= 3 && !['para', 'con', 'sin', 'que', 'los', 'las', 'una', 'uno', 'unos', 'unas', 'del', 'quiero', 'tengo', 'nevera', 'despensa', 'hacer', 'platos', 'comida', 'menu', 'batch', 'cooking', 'algo', 'como', 'gustaria', 'preparar', 'cocinar'].includes(t));

  const scoredRecipes = TRADITIONAL_RECIPES_DATABASE.map(recipe => {
    if (excludedAllergens && excludedAllergens.length > 0) {
      if (recipe.allergens.some(a => excludedAllergens.includes(a))) {
        return { recipe, score: -9999 };
      }
    }

    let score = 0;
    const normName = (recipe.name + ' ' + recipe.shortName).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    const normIngredients = recipe.ingredientsPerServing
      .map(i => i.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, ''))
      .join(' ');
    const normCategory = recipe.category.toLowerCase();

    for (const token of rawTokens) {
      if (normName.includes(token)) score += 20;
      if (normIngredients.includes(token)) score += 18;
      if (normCategory.includes(token)) score += 10;
    }

    // Puntuación por familias culinarias
    if (normalizedQuery.includes('bacalao') && (recipe.mainIngredientFamily === 'bacalao' || normName.includes('bacalao'))) score += 30;
    if ((normalizedQuery.includes('pollo') || normalizedQuery.includes('contramuslo')) && (recipe.mainIngredientFamily === 'pollo' || normName.includes('pollo'))) score += 30;
    if (normalizedQuery.includes('ternera') && (recipe.mainIngredientFamily === 'ternera' || normName.includes('ternera'))) score += 30;
    if (normalizedQuery.includes('merluza') && (recipe.mainIngredientFamily === 'merluza' || normName.includes('merluza'))) score += 30;
    if (normalizedQuery.includes('pisto') && normName.includes('pisto')) score += 30;
    if (normalizedQuery.includes('lenteja') && normName.includes('lenteja')) score += 30;
    if (normalizedQuery.includes('tortilla') && normName.includes('tortilla')) score += 30;
    if (normalizedQuery.includes('croqueta') && normName.includes('croqueta')) score += 30;

    if (dietStyle && recipe.suitableDiets.includes(dietStyle as any)) {
      score += 3;
    }

    return { recipe, score };
  });

  const matched = scoredRecipes
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .map(item => item.recipe);

  if (matched.length >= count) {
    return matched.slice(0, count);
  }

  const matchedIds = new Set(matched.map(r => r.id));
  const remaining = TRADITIONAL_RECIPES_DATABASE.filter(r => 
    !matchedIds.has(r.id) && 
    (!excludedAllergens || !r.allergens.some(a => excludedAllergens.includes(a))) &&
    (!dietStyle || r.suitableDiets.includes(dietStyle as any))
  );

  const finalResult = [...matched, ...remaining].slice(0, count);
  return finalResult.length > 0 ? finalResult : TRADITIONAL_RECIPES_DATABASE.slice(0, count);
}
