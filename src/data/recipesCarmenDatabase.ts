/**
 * 🥘 BASE DE DATOS MAESTRA DE RECETAS CANÓNICAS — COCINA CON CARMEN
 * Fuente Única de Verdad (SSOT) indexada desde `docs/fuentes/01_recetas_cocina_con_carmen/`
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
  category: 'legumbres' | 'carnes' | 'pescados' | 'verduras' | 'cremas' | 'acompanamientos' | 'tapas' | 'masas' | 'postres' | 'arroces_pastas';
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
  source: 'Cocina con Carmen';
  sourceCompendium: string; // Archivo markdown de origen en docs/fuentes/
  ingredientsPerServing: CanonicalRecipeIngredient[];
  instructions: string[];
  batchTip: string;
  youtubeUrl?: string;
}

export const CARMEN_RECIPES_DATABASE: CanonicalRecipe[] = [
  // =========================================================================
  // 1. LEGUMBRES Y GUISOS DE CUCHARA (09_legumbres_y_potajes_de_cuchara.md)
  // =========================================================================
  {
    id: 'carmen-lentejas-chorizo',
    name: 'Lentejas Pardinas con Chorizo, Costilla y el Majado Secreto de Carmen',
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
    source: 'Cocina con Carmen',
    sourceCompendium: '09_legumbres_y_potajes_de_cuchara.md',
    youtubeUrl: 'https://www.youtube.com/watch?v=ktv5vseGTSY',
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
    id: 'carmen-potaje-vigilia-bacalao',
    name: 'Potaje de Garbanzos con Bacalao y Espinacas Frescas (Vigilia de Carmen)',
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
    source: 'Cocina con Carmen',
    sourceCompendium: '09_legumbres_y_potajes_de_cuchara.md',
    ingredientsPerServing: [
      { name: 'Garbanzos pedrosillanos cocidos', quantity: 0.15, unit: 'kg', category: 'despensa' },
      { name: 'Bacalao desalado en dados', quantity: 0.08, unit: 'kg', category: 'carnes-pescados' },
      { name: 'Espinacas frescas lavadas', quantity: 0.07, unit: 'kg', category: 'frescos' },
      { name: 'Huevo campero cocido', quantity: 0.5, unit: 'unidad', category: 'refrigerados' },
      { name: 'Pan frito y almendras para majado', quantity: 0.02, unit: 'kg', category: 'despensa' },
      { name: 'Caldo de pescado o verduras', quantity: 0.25, unit: 'L', category: 'despensa' }
    ],
    instructions: [
      'Dorar ajos y rebanada de pan en AOVE; majar en mortero con almendras tostadas y pimentón.',
      'En la misma cazuela pochar cebolla y tomate; verter el caldo y añadir los garbanzos cocidos.',
      'Incorporar el majado y las espinacas frescas; cocer 10 minutos a fuego suave.',
      'Añadir los tacos de bacalao en los últimos 4 minutos y decorar con huevo duro picado.'
    ],
    batchTip: 'El majado tradicional emulsiona el caldo de forma sedosa sin necesidad de harinas industriales.'
  },
  {
    id: 'carmen-alubias-blancas-estofadas',
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
    source: 'Cocina con Carmen',
    sourceCompendium: '09_legumbres_y_potajes_de_cuchara.md',
    ingredientsPerServing: [
      { name: 'Alubias blancas secas', quantity: 0.08, unit: 'kg', category: 'despensa' },
      { name: 'Panceta ibérica fresca', quantity: 0.04, unit: 'kg', category: 'carnes-pescados' },
      { name: 'Zanahoria y puerro', quantity: 0.08, unit: 'kg', category: 'frescos' },
      { name: 'Pimiento rojo y verde', quantity: 0.05, unit: 'kg', category: 'frescos' },
      { name: 'Pimentón dulce y comino', quantity: 0.3, unit: 'cucharadita', category: 'especias' }
    ],
    instructions: [
      'Poner alubias remojadas en la olla con panceta, puerro, zanahoria y pimientos en crudo.',
      'Asustar con un chorrito de agua fría al romper a hervir para que no se despellejen.',
      'Cerrar olla y cocer 20 minutos; abrir, triturar las verduras con un poco de caldo y reintegrar para ligar.'
    ],
    batchTip: 'Las alubias son excepcionales para congelar en raciones individuales listas para calentar en microondas 3 min.'
  },

  // =========================================================================
  // 2. AVES, CARNES Y GUISOS TRADICIONALES (carnes_y_guisos.md)
  // =========================================================================
  {
    id: 'carmen-pollo-pepitoria',
    name: 'Pollo de Corral en Pepitoria Tradicional con Majado de Almendras (Carmen)',
    shortName: 'Pollo en Pepitoria Tradicional',
    category: 'carnes',
    mealType: 'lunch',
    station: 'fuego_2',
    prepTimeFormatted: '50 min (Cazuela baja)',
    prepTimeMinutes: 50,
    shelfLifeDaysFridge: 4,
    canFreeze: true,
    storageAdvice: 'Nevera Días 1-4 • Congelador Días 4+ (Salsa brillante y untuosa)',
    suitableDiets: ['mediterranean', 'traditional', 'fitness'],
    allergens: ['Frutos de cáscara', 'Huevos', 'Sulfitos'],
    image: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=600&auto=format&fit=crop&q=80',
    source: 'Cocina con Carmen',
    sourceCompendium: 'carnes_y_guisos.md',
    youtubeUrl: 'https://www.youtube.com/watch?v=YKqSq5d_ERY',
    ingredientsPerServing: [
      { name: 'Pollo troceado de campo (muslo y contramuslo)', quantity: 0.22, unit: 'kg', category: 'carnes-pescados' },
      { name: 'Almendras crudas sin piel tostadas', quantity: 0.02, unit: 'kg', category: 'despensa' },
      { name: 'Yemas de huevo cocido', quantity: 0.5, unit: 'unidad', category: 'refrigerados' },
      { name: 'Vino blanco seco (Manzanilla/Montilla)', quantity: 0.05, unit: 'L', category: 'despensa' },
      { name: 'Caldo de pollo casero reducido', quantity: 0.2, unit: 'L', category: 'despensa' },
      { name: 'Azafrán en hebra español', quantity: 0.2, unit: 'cucharadita', category: 'especias' },
      { name: 'Cebolla picada fina y ajo', quantity: 0.06, unit: 'kg', category: 'frescos' }
    ],
    instructions: [
      'Salpimentar y enharinar muy sutilmente el pollo; dorar en AOVE en cazuela amplia hasta sellado dorado.',
      'Retirar el pollo; en la misma grasa pochar la cebolla y los ajos a fuego suave 10 minutos.',
      'Majar en mortero las almendras tostadas con las yemas duras y el azafrán tostado.',
      'Desglasar la cazuela con el vino blanco; reincorporar el pollo, el caldo caliente y el majado noble.',
      'Cocinar tapado 30 minutos a fuego suave hasta que la carne esté tierna y la salsa melosa.'
    ],
    batchTip: 'Una de las recetas más agradecidas para batch cooking: el azafrán y las almendras maduran 24h en nevera logrando un sabor insuperable.'
  },
  {
    id: 'carmen-albondigas-salsa-abuela',
    name: 'Albóndigas Caseras en Salsa de la Abuela con Sofrito y Vino Blanco',
    shortName: 'Albóndigas en Salsa de la Abuela',
    category: 'carnes',
    mealType: 'lunch',
    station: 'fuego_1',
    prepTimeFormatted: '40 min (Cazuela)',
    prepTimeMinutes: 40,
    shelfLifeDaysFridge: 4,
    canFreeze: true,
    storageAdvice: 'Nevera Días 1-4 • Congelador Días 4+ (Resistencia térmica perfecta)',
    suitableDiets: ['mediterranean', 'traditional', 'fitness'],
    allergens: ['Gluten', 'Huevos', 'Sulfitos'],
    image: 'https://images.unsplash.com/photo-1529042410759-befb1204b468?w=600&auto=format&fit=crop&q=80',
    source: 'Cocina con Carmen',
    sourceCompendium: 'carnes_y_guisos.md',
    ingredientsPerServing: [
      { name: 'Carne picada mixta de ternera y cerdo', quantity: 0.18, unit: 'kg', category: 'carnes-pescados' },
      { name: 'Miga de pan remojada en leche', quantity: 0.02, unit: 'kg', category: 'despensa' },
      { name: 'Huevo campero batido', quantity: 0.3, unit: 'unidad', category: 'refrigerados' },
      { name: 'Cebolla, ajo y perejil fresco', quantity: 0.06, unit: 'kg', category: 'frescos' },
      { name: 'Zanahorias para la salsa', quantity: 0.05, unit: 'kg', category: 'frescos' },
      { name: 'Vino blanco y caldo de carne', quantity: 0.15, unit: 'L', category: 'despensa' }
    ],
    instructions: [
      'Amasar la carne con el huevo, la miga escurrida, ajo, perejil y sal; formar bolas y enharinar levemente.',
      'Sellar las albóndigas en sartén con AOVE bien caliente y reservar en la cazuela.',
      'Preparar la salsa pochando cebolla, zanahoria y ajo; triturar con el vino y el caldo.',
      'Verter la salsa sobre las albóndigas y dar un chup-chup suave de 15 minutos.'
    ],
    batchTip: 'Prepara el doble de raciones: las albóndigas con su salsa resisten la congelación durante 3 meses sin perder un ápice de jugosidad.'
  },
  {
    id: 'carmen-carrilleras-vino-tinto',
    name: 'Carrilleras de Cerdo Ibérico Estofadas al Vino Tinto Reducido (Carmen)',
    shortName: 'Carrilleras al Vino Tinto',
    category: 'carnes',
    mealType: 'lunch',
    station: 'olla_expres',
    prepTimeFormatted: '45 min (Olla rápida)',
    prepTimeMinutes: 45,
    shelfLifeDaysFridge: 5,
    canFreeze: true,
    storageAdvice: 'Nevera Días 1-4 • Congelador Días 5+ (Colágeno meloso insuperable)',
    suitableDiets: ['mediterranean', 'traditional', 'lowcarb'],
    allergens: ['Sulfitos'],
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=600&auto=format&fit=crop&q=80',
    source: 'Cocina con Carmen',
    sourceCompendium: 'carnes_y_guisos.md',
    ingredientsPerServing: [
      { name: 'Carrilleras de cerdo ibérico limpias', quantity: 0.22, unit: 'kg', category: 'carnes-pescados' },
      { name: 'Vino tinto con cuerpo (Ribera/Rioja)', quantity: 0.12, unit: 'L', category: 'despensa' },
      { name: 'Puerro, zanahoria y cebolla dulce', quantity: 0.1, unit: 'kg', category: 'frescos' },
      { name: 'Fondo oscuro de carne casero', quantity: 0.15, unit: 'L', category: 'despensa' },
      { name: 'Ajo, romero y tomillo fresco', quantity: 0.5, unit: 'rama', category: 'frescos' }
    ],
    instructions: [
      'Marcar las carrilleras a fuego vivo en la olla rápida con AOVE hasta sellado oscuro; retirar.',
      'Pochar las hortalizas troceadas hasta caramelización profunda (12 min).',
      'Añadir las hierbas, el vino tinto y reducir a la mitad; reincorporar la carne y el fondo.',
      'Cerrar la olla rápida y cocinar 35 minutos en posición 2; triturar y colar la salsa sedosa.'
    ],
    batchTip: 'Al enfriarse en nevera forma una gelatina natural brillante que se funde en boca al regenerar en microondas o cazuela.'
  },
  {
    id: 'carmen-pollo-ajillo',
    name: 'Pollo al Ajillo Tradicional con Romero y Reducción de Vino Blanco',
    shortName: 'Pollo al Ajillo Tradicional',
    category: 'carnes',
    mealType: 'dinner',
    station: 'fuego_1',
    prepTimeFormatted: '30 min (Sartén amplia)',
    prepTimeMinutes: 30,
    shelfLifeDaysFridge: 4,
    canFreeze: true,
    storageAdvice: 'Nevera Días 1-4 • Calentar en sartén tapada o microondas',
    suitableDiets: ['mediterranean', 'traditional', 'fitness', 'lowcarb'],
    allergens: ['Sulfitos'],
    image: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=600&auto=format&fit=crop&q=80',
    source: 'Cocina con Carmen',
    sourceCompendium: 'carnes_y_guisos.md',
    ingredientsPerServing: [
      { name: 'Pollo troceado menudo de campo', quantity: 0.25, unit: 'kg', category: 'carnes-pescados' },
      { name: 'Dientes de ajo con su camisa chascados', quantity: 4, unit: 'diente', category: 'frescos' },
      { name: 'Vino blanco seco', quantity: 0.06, unit: 'L', category: 'despensa' },
      { name: 'Aceite de oliva virgen extra', quantity: 0.03, unit: 'L', category: 'especias' },
      { name: 'Romero fresco y guindilla opcional', quantity: 0.5, unit: 'rama', category: 'frescos' }
    ],
    instructions: [
      'Dorar los ajos en AOVE a fuego suave para aromatizar el aceite; retirar y reservar.',
      'Freír el pollo salpimentado a fuego medio-alto hasta que esté bien dorado y crujiente.',
      'Reincorporar los ajos, añadir el vino blanco y el romero; evaporar el alcohol a fuego vivo y glasear.'
    ],
    batchTip: 'Rápido, aromático y saciante. Acompáñalo de un poco de arroz blanco o patatas al vapor.'
  },

  // =========================================================================
  // 3. PESCADOS Y MARISCOS DE LONJA (pescados_legumbres_arroces.md)
  // =========================================================================
  {
    id: 'carmen-merluza-salsa-verde',
    name: 'Merluza en Salsa Verde Tradicional con Almejas de Carril y Gambones (Carmen)',
    shortName: 'Merluza en Salsa Verde con Almejas',
    category: 'pescados',
    mealType: 'dinner',
    station: 'fuego_2',
    prepTimeFormatted: '25 min (Cazuela de barro/baja)',
    prepTimeMinutes: 25,
    shelfLifeDaysFridge: 3,
    canFreeze: false,
    storageAdvice: 'Consumir Días 1-2 • No congelar una vez cocinada para preservar jugosidad',
    suitableDiets: ['mediterranean', 'traditional', 'fitness', 'lowcarb'],
    allergens: ['Pescado', 'Moluscos', 'Crustáceos', 'Sulfitos'],
    image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=600&auto=format&fit=crop&q=80',
    source: 'Cocina con Carmen',
    sourceCompendium: 'pescados_legumbres_arroces.md',
    ingredientsPerServing: [
      { name: 'Lomos de merluza fresca del Cantábrico', quantity: 0.18, unit: 'kg', category: 'carnes-pescados' },
      { name: 'Almejas finas lavadas', quantity: 0.08, unit: 'kg', category: 'carnes-pescados' },
      { name: 'Gambones o langostinos frescos', quantity: 2, unit: 'unidad', category: 'carnes-pescados' },
      { name: 'Fumet de pescado casero', quantity: 0.15, unit: 'L', category: 'despensa' },
      { name: 'Perejil fresco picadísimo y ajo', quantity: 0.02, unit: 'kg', category: 'frescos' },
      { name: 'Vino blanco Fino o Rueda', quantity: 0.04, unit: 'L', category: 'despensa' },
      { name: 'Harina de trigo para ligar salsa verde', quantity: 0.01, unit: 'kg', category: 'despensa' }
    ],
    instructions: [
      'Pochar ajos laminados en AOVE; añadir la cucharada de harina y cocinar 1 minuto.',
      'Verter el vino blanco y el fumet caliente batiendo suavemente para ligar la salsa verde emulsionada.',
      'Añadir abundante perejil fresco picado.',
      'Colocar los lomos de merluza sazonados con la piel hacia abajo y repartir las almejas y gambones.',
      'Tapar la cazuela y cocinar 5-6 minutos a fuego suave agitando en vaivén hasta que las almejas se abran.'
    ],
    batchTip: 'Planifícala para consumir el primer o segundo día del ciclo de batch cooking para disfrutar del pescado en su punto óptimo.'
  },
  {
    id: 'carmen-bacalao-ajoarriero',
    name: 'Bacalao al Ajoarriero Tradicional con Pimientos Asados y Tomate Confitado',
    shortName: 'Bacalao al Ajoarriero Tradicional',
    category: 'pescados',
    mealType: 'universal',
    station: 'fuego_3',
    prepTimeFormatted: '30 min (Cazuela)',
    prepTimeMinutes: 30,
    shelfLifeDaysFridge: 4,
    canFreeze: true,
    storageAdvice: 'Nevera Días 1-4 • Acepta congelación moderada',
    suitableDiets: ['mediterranean', 'traditional', 'fitness'],
    allergens: ['Pescado'],
    image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=600&auto=format&fit=crop&q=80',
    source: 'Cocina con Carmen',
    sourceCompendium: 'pescados_legumbres_arroces.md',
    ingredientsPerServing: [
      { name: 'Bacalao desalado desmigado limpio', quantity: 0.16, unit: 'kg', category: 'carnes-pescados' },
      { name: 'Pimientos del piquillo o asados en tiras', quantity: 0.08, unit: 'kg', category: 'despensa' },
      { name: 'Tomate frito casero reducido', quantity: 0.08, unit: 'kg', category: 'despensa' },
      { name: 'Cebolla, ajo y guindilla', quantity: 0.05, unit: 'kg', category: 'frescos' },
      { name: 'Aceite de oliva virgen extra', quantity: 0.03, unit: 'L', category: 'especias' }
    ],
    instructions: [
      'Pochar a fuego manso la cebolla picada y los ajos en AOVE.',
      'Añadir las tiras de pimiento asado y el tomate casero; sofreír 10 minutos.',
      'Incorporar el bacalao desalado y cocinar a fuego suave 6 minutos integrando la gelatina del pescado.'
    ],
    batchTip: 'Gana melosidad de un día para otro. Excelente sobre tostas de pan rústico o acompañado de patata hervida.'
  },
  {
    id: 'carmen-marmitako-bonito',
    name: 'Marmitako Tradicional de Bonito del Norte con Patatas Chascadas',
    shortName: 'Marmitako de Bonito del Norte',
    category: 'pescados',
    mealType: 'lunch',
    station: 'fuego_1',
    prepTimeFormatted: '35 min (Cazuela)',
    prepTimeMinutes: 35,
    shelfLifeDaysFridge: 3,
    canFreeze: false,
    storageAdvice: 'Nevera Días 1-3 • Consumir recién regenerado a fuego suave',
    suitableDiets: ['mediterranean', 'traditional', 'fitness'],
    allergens: ['Pescado'],
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=600&auto=format&fit=crop&q=80',
    source: 'Cocina con Carmen',
    sourceCompendium: 'pescados_legumbres_arroces.md',
    ingredientsPerServing: [
      { name: 'Bonito o atún fresco en dados', quantity: 0.15, unit: 'kg', category: 'carnes-pescados' },
      { name: 'Patatas agrias chascadas', quantity: 0.18, unit: 'kg', category: 'frescos' },
      { name: 'Pimiento choricero o carne de ñora', quantity: 0.02, unit: 'kg', category: 'despensa' },
      { name: 'Cebolla, pimiento verde y tomate', quantity: 0.08, unit: 'kg', category: 'frescos' },
      { name: 'Fumet de pescado casero', quantity: 0.3, unit: 'L', category: 'despensa' }
    ],
    instructions: [
      'Hacer un sofrito paciente con cebolla, pimiento verde y carne de pimiento choricero.',
      'Añadir las patatas chascadas a cuchillo para liberar almidón; rehogar 3 minutos.',
      'Cubrir con fumet caliente y cocer 20 minutos hasta que la patata esté blanda.',
      'Apagar el fuego, añadir los dados de bonito y tapar; se cocinan con el calor residual en 3 min sin secarse.'
    ],
    batchTip: 'El punto del bonito queda jugoso como mantequilla gracias al apagado fuera del fuego.'
  },

  // =========================================================================
  // 4. VERDURAS, PISTOS Y HUERTA (10_verduras_pistos_y_platos_horticolas.md)
  // =========================================================================
  {
    id: 'carmen-pisto-manchego',
    name: 'Pisto Manchego Tradicional con Pochado Escalonado en AOVE (Carmen)',
    shortName: 'Pisto Manchego Tradicional',
    category: 'verduras',
    mealType: 'dinner',
    station: 'fuego_3',
    prepTimeFormatted: '45 min (Sartén honda / Cazuela)',
    prepTimeMinutes: 45,
    shelfLifeDaysFridge: 6,
    canFreeze: true,
    storageAdvice: 'Nevera Días 1-6 • Congelador Días 6+ (Conserva estructura perfecta)',
    suitableDiets: ['mediterranean', 'traditional', 'veggie', 'fitness', 'lowcarb'],
    allergens: [],
    image: 'https://images.unsplash.com/photo-1572449043416-55f4685c9bb7?w=600&auto=format&fit=crop&q=80',
    source: 'Cocina con Carmen',
    sourceCompendium: '10_verduras_pistos_y_platos_horticolas.md',
    ingredientsPerServing: [
      { name: 'Calabacín con piel en cubos', quantity: 0.1, unit: 'kg', category: 'frescos' },
      { name: 'Berenjena fresca en cubos', quantity: 0.08, unit: 'kg', category: 'frescos' },
      { name: 'Pimiento rojo y verde en trozos', quantity: 0.08, unit: 'kg', category: 'frescos' },
      { name: 'Cebolla dulce pochada', quantity: 0.08, unit: 'kg', category: 'frescos' },
      { name: 'Tomate triturado reducido lentamente', quantity: 0.12, unit: 'kg', category: 'despensa' },
      { name: 'Aceite de oliva virgen extra', quantity: 0.03, unit: 'L', category: 'especias' }
    ],
    instructions: [
      'Pochado escalonado: primero cebolla y pimientos a fuego medio en AOVE 10 min.',
      'Añadir la berenjena y el calabacín; sofreír 12 minutos hasta que estén tiernos.',
      'Incorporar el tomate triturado y una pizca de sal; cocinar a fuego suave 20 minutos tapado.',
      'Dejar reposar para que los jugos se concentren y caramelicen naturalmente.'
    ],
    batchTip: 'Comodín absoluto del batch cooking: dura casi una semana en nevera y sirve de base para huevos, arroz, pasta o carnes.'
  },
  {
    id: 'carmen-espinacas-garbanzos-sevillana',
    name: 'Espinacas con Garbanzos al Estilo Sevillano y Majado de Pan y Comino',
    shortName: 'Espinacas con Garbanzos Sevillanas',
    category: 'verduras',
    mealType: 'dinner',
    station: 'fuego_2',
    prepTimeFormatted: '25 min (Sartén)',
    prepTimeMinutes: 25,
    shelfLifeDaysFridge: 4,
    canFreeze: true,
    storageAdvice: 'Nevera Días 1-4 • Congela muy bien en porciones',
    suitableDiets: ['mediterranean', 'traditional', 'veggie', 'fitness'],
    allergens: ['Gluten'],
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=600&auto=format&fit=crop&q=80',
    source: 'Cocina con Carmen',
    sourceCompendium: '10_verduras_pistos_y_platos_horticolas.md',
    ingredientsPerServing: [
      { name: 'Espinacas frescas o descongeladas', quantity: 0.15, unit: 'kg', category: 'frescos' },
      { name: 'Garbanzos cocidos escurridos', quantity: 0.1, unit: 'kg', category: 'despensa' },
      { name: 'Pan frito para majado', quantity: 0.02, unit: 'kg', category: 'despensa' },
      { name: 'Ajos, pimentón dulce y comino molido', quantity: 0.5, unit: 'cucharadita', category: 'especias' },
      { name: 'Vinagre de Jerez suave', quantity: 0.01, unit: 'L', category: 'despensa' }
    ],
    instructions: [
      'Freír ajos y rebanada de pan; majar en mortero con el comino, el pimentón y unas gotas de vinagre.',
      'Saltear las espinacas cocidas en AOVE; añadir los garbanzos y el majado noble.',
      'Mezclar todo a fuego suave 8 minutos para que los aromas se fundan en una pasta untuosa.'
    ],
    batchTip: 'Un clásico de las tapas andaluzas de Carmen: rico en hierro, fibra y proteína vegetal.'
  },
  {
    id: 'carmen-crema-calabacin-suave',
    name: 'Crema de Calabacín Aterciopelada de Carmen (con Quesitos y Patata)',
    shortName: 'Crema de Calabacín Aterciopelada',
    category: 'cremas',
    mealType: 'dinner',
    station: 'olla_expres',
    prepTimeFormatted: '20 min (Olla rápida / Batidora)',
    prepTimeMinutes: 20,
    shelfLifeDaysFridge: 4,
    canFreeze: false,
    storageAdvice: 'Nevera Días 1-4 • Servir caliente con picatostes crujientes',
    suitableDiets: ['mediterranean', 'traditional', 'veggie', 'fitness'],
    allergens: ['Lácteos'],
    image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=600&auto=format&fit=crop&q=80',
    source: 'Cocina con Carmen',
    sourceCompendium: '02_sopas_cremas_y_potajes.md',
    ingredientsPerServing: [
      { name: 'Calabacines verdes frescos troceados', quantity: 0.25, unit: 'kg', category: 'frescos' },
      { name: 'Puerro o cebolla dulce', quantity: 0.06, unit: 'kg', category: 'frescos' },
      { name: 'Patata suave', quantity: 0.06, unit: 'kg', category: 'frescos' },
      { name: 'Quesito en porciones o crema suave', quantity: 1, unit: 'unidad', category: 'refrigerados' },
      { name: 'Aceite de oliva virgen extra', quantity: 0.02, unit: 'L', category: 'especias' },
      { name: 'Agua o caldo suave', quantity: 0.15, unit: 'L', category: 'despensa' }
    ],
    instructions: [
      'Rehogar el puerro y calabacín en AOVE 5 minutos en la olla rápida.',
      'Añadir la patata y el agua justa (sin cubrir del todo para evitar cremas aguadas).',
      'Cocinar 6 minutos en olla a presión; abrir, incorporar los quesitos y triturar a máxima potencia 3 minutos.'
    ],
    batchTip: 'Cena ligera digestiva por excelencia. Se conserva perfecta en botellas herméticas de cristal.'
  },
  {
    id: 'carmen-salmorejo-cordobes',
    name: 'Salmorejo Cordobés Tradicional de Carmen con Emulsión de AOVE',
    shortName: 'Salmorejo Cordobés Tradicional',
    category: 'cremas',
    mealType: 'universal',
    station: 'frio',
    prepTimeFormatted: '15 min (Batidora / Robot)',
    prepTimeMinutes: 15,
    shelfLifeDaysFridge: 4,
    canFreeze: false,
    storageAdvice: 'Nevera Días 1-4 • Servir bien frío con huevo y jamón ibérico',
    suitableDiets: ['mediterranean', 'traditional', 'veggie'],
    allergens: ['Gluten', 'Huevos'],
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&auto=format&fit=crop&q=80',
    source: 'Cocina con Carmen',
    sourceCompendium: '02_sopas_cremas_y_potajes.md',
    ingredientsPerServing: [
      { name: 'Tomates maduros tipo pera o rama', quantity: 0.25, unit: 'kg', category: 'frescos' },
      { name: 'Pan de telera o candeal del día anterior', quantity: 0.05, unit: 'kg', category: 'despensa' },
      { name: 'Aceite de oliva virgen extra de calidad', quantity: 0.03, unit: 'L', category: 'especias' },
      { name: 'Diente de ajo sin germen', quantity: 0.25, unit: 'diente', category: 'frescos' },
      { name: 'Jamón ibérico y huevo duro para guarnición', quantity: 0.03, unit: 'kg', category: 'carnes-pescados' }
    ],
    instructions: [
      'Triturar los tomates limpios; colar para retirar pieles y semillas.',
      'Añadir el pan troceado y dejar que empape 5 minutos con el ajo y la sal.',
      'Triturar a velocidad máxima mientras se vierte el AOVE en hilo fino para lograr una emulsión densa y sedosa.',
      'Refrigerar al menos 2 horas antes de servir decorado con huevo duro y jamón.'
    ],
    batchTip: 'Emulsión 100% natural sin aditivos. Imprescindible en el menú semanal mediterráneo.'
  },

  // =========================================================================
  // 5. ARROCES, PASTAS Y GRATINADOS (07_arroces_paellas_y_fideuas.md / 08)
  // =========================================================================
  {
    id: 'carmen-arroz-caldoso-marinero',
    name: 'Arroz Caldoso Marinero con Sepia, Gambón y Fumet Casero (Carmen)',
    shortName: 'Arroz Caldoso Marinero',
    category: 'arroces_pastas',
    mealType: 'lunch',
    station: 'fuego_1',
    prepTimeFormatted: '30 min (Cazuela)',
    prepTimeMinutes: 30,
    shelfLifeDaysFridge: 2,
    canFreeze: false,
    storageAdvice: 'Consumir en los primeros 2 días • No congelar el arroz cocido',
    suitableDiets: ['mediterranean', 'traditional', 'fitness'],
    allergens: ['Crustáceos', 'Pescado', 'Moluscos'],
    image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=600&auto=format&fit=crop&q=80',
    source: 'Cocina con Carmen',
    sourceCompendium: '07_arroces_paellas_y_fideuas.md',
    ingredientsPerServing: [
      { name: 'Arroz bomba tradicional', quantity: 0.08, unit: 'kg', category: 'despensa' },
      { name: 'Sepia limpia troceada', quantity: 0.09, unit: 'kg', category: 'carnes-pescados' },
      { name: 'Gambones frescos', quantity: 2, unit: 'unidad', category: 'carnes-pescados' },
      { name: 'Fumet de pescado de roca casero', quantity: 0.35, unit: 'L', category: 'despensa' },
      { name: 'Sofrito de tomate, pimiento y ñora', quantity: 0.05, unit: 'kg', category: 'frescos' },
      { name: 'Azafrán en hebra y ajo', quantity: 0.3, unit: 'cucharadita', category: 'especias' }
    ],
    instructions: [
      'Marcar los gambones y la sepia en AOVE en cazuela amplia; reservar.',
      'Pochar el sofrito con la ñora y el azafrán; añadir el arroz y nacarar 2 minutos.',
      'Verter el fumet hirviendo y cocinar a fuego vivo 10 min y 6 min a fuego medio-bajo.',
      'Incorporar los mariscos en el último minuto; reposar 3 minutos tapado.'
    ],
    batchTip: 'En batch cooking, elabora el fumet y el sofrito concentrado; añade el arroz el día que lo vayas a comer para punto perfecto.'
  },
  {
    id: 'carmen-lasana-bolonesa-tradicional',
    name: 'Lasaña Boloñesa Tradicional Gratinada con Tres Carnes (Carmen)',
    shortName: 'Lasaña Boloñesa Gratinada',
    category: 'arroces_pastas',
    mealType: 'lunch',
    station: 'horno',
    prepTimeFormatted: '50 min (Horno)',
    prepTimeMinutes: 50,
    shelfLifeDaysFridge: 4,
    canFreeze: true,
    storageAdvice: 'Nevera Días 1-3 • Congelador Días 4+ (En recipientes herméticos)',
    suitableDiets: ['mediterranean', 'traditional'],
    allergens: ['Gluten', 'Huevos', 'Lácteos', 'Sulfitos'],
    image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=600&auto=format&fit=crop&q=80',
    source: 'Cocina con Carmen',
    sourceCompendium: '08_pastas_gratinados_y_lasanas.md',
    ingredientsPerServing: [
      { name: 'Placas de pasta de lasaña al huevo', quantity: 3, unit: 'unidad', category: 'despensa' },
      { name: 'Carne picada mixta (ternera y cerdo)', quantity: 0.14, unit: 'kg', category: 'carnes-pescados' },
      { name: 'Salsa bechamel suave casera con nuez moscada', quantity: 0.15, unit: 'L', category: 'refrigerados' },
      { name: 'Tomate frito casero reducido', quantity: 0.08, unit: 'kg', category: 'despensa' },
      { name: 'Queso rallado especial gratinar', quantity: 0.03, unit: 'kg', category: 'refrigerados' },
      { name: 'Cebolla, zanahoria y vino tinto', quantity: 0.05, unit: 'kg', category: 'frescos' }
    ],
    instructions: [
      'Elaborar el ragú boloñés cocinando la carne con el sofrito de verduras y vino tinto 35 min.',
      'Montar capas alternas de pasta, ragú y bechamel en fuente de cristal apta para horno.',
      'Cubrir con bechamel abundante y queso rallado; hornear a 190°C durante 25 min hasta gratinado dorado.'
    ],
    batchTip: 'Se porciona de maravilla en frío. Congela raciones individuales para almuerzos rápidos de entre semana.'
  },

  // =========================================================================
  // 6. TAPAS, HUEVOS Y MASAS (01_tapas_y_entrantes.md / 04 / 12)
  // =========================================================================
  {
    id: 'carmen-croquetas-jamon-iberico',
    name: 'Croquetas de Jamón Ibérico Extremadamente Cremosas de la Abuela (Carmen)',
    shortName: 'Croquetas de Jamón Ibérico',
    category: 'tapas',
    mealType: 'universal',
    station: 'fuego_2',
    prepTimeFormatted: '35 min (+ reposo frío)',
    prepTimeMinutes: 35,
    shelfLifeDaysFridge: 4,
    canFreeze: true,
    storageAdvice: 'Congelar en crudo en bandeja • Freír directas del congelador',
    suitableDiets: ['mediterranean', 'traditional'],
    allergens: ['Gluten', 'Huevos', 'Lácteos'],
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=600&auto=format&fit=crop&q=80',
    source: 'Cocina con Carmen',
    sourceCompendium: '01_tapas_y_entrantes.md',
    youtubeUrl: 'https://www.youtube.com/watch?v=ktv5vseGTSY',
    ingredientsPerServing: [
      { name: 'Jamón ibérico en taquitos finos', quantity: 0.05, unit: 'kg', category: 'carnes-pescados' },
      { name: 'Leche entera fresca infusionada con hueso', quantity: 0.18, unit: 'L', category: 'refrigerados' },
      { name: 'Mantequilla y harina de trigo (roux)', quantity: 0.03, unit: 'kg', category: 'refrigerados' },
      { name: 'Huevo y pan rallado crujiente', quantity: 0.5, unit: 'ración', category: 'despensa' },
      { name: 'Aceite de oliva para fritura', quantity: 0.05, unit: 'L', category: 'especias' }
    ],
    instructions: [
      'Cocinar el roux con mantequilla y harina 6 min a fuego suave para quitar el sabor a crudo.',
      'Añadir la leche caliente poco a poco batiendo enérgicamente con varillas.',
      'Incorporar el jamón picado en el último minuto; enfriar masa tapada a piel 12h.',
      'Bolear las croquetas, pasar por harina, huevo y pan rallado; congelar o freír a 180°C.'
    ],
    batchTip: 'Prepara 30 croquetas el día del batch cooking y congélalas: tendrás cenas rápidas gourmet listas en 5 minutos.'
  },
  {
    id: 'carmen-tortilla-patatas-cebolla',
    name: 'Tortilla de Patatas Tradicional con Cebolla Confitada y Punto Jugoso (Carmen)',
    shortName: 'Tortilla de Patatas con Cebolla',
    category: 'tapas',
    mealType: 'universal',
    station: 'fuego_1',
    prepTimeFormatted: '30 min (Sartén)',
    prepTimeMinutes: 30,
    shelfLifeDaysFridge: 3,
    canFreeze: false,
    storageAdvice: 'Nevera Días 1-3 • Consumir templada o fría',
    suitableDiets: ['mediterranean', 'traditional', 'veggie'],
    allergens: ['Huevos'],
    image: 'https://images.unsplash.com/photo-1541832676-9b763b0239ab?w=600&auto=format&fit=crop&q=80',
    source: 'Cocina con Carmen',
    sourceCompendium: '04_huevos_tortillas_y_revueltos.md',
    ingredientsPerServing: [
      { name: 'Patatas agrias cortadas en láminas', quantity: 0.2, unit: 'kg', category: 'frescos' },
      { name: 'Huevos camperos frescos clase L', quantity: 2, unit: 'unidad', category: 'refrigerados' },
      { name: 'Cebolla dulce pochada', quantity: 0.08, unit: 'kg', category: 'frescos' },
      { name: 'Aceite de oliva virgen extra para confitar', quantity: 0.04, unit: 'L', category: 'especias' }
    ],
    instructions: [
      'Confitar las patatas y cebolla en abundante AOVE a fuego medio-bajo hasta que estén tiernas y melosas.',
      'Escurrir bien el aceite y mezclar con los huevos batidos con sal; dejar reposar 10 minutos para que el huevo empape la patata.',
      'Cuajar en sartén caliente con unas gotas de aceite 1 minuto por cada lado para conseguir un centro jugoso.'
    ],
    batchTip: 'Corta en porciones y guarda en nevera. Perfecta para cenas, almuerzos de oficina o meriendas.'
  },
  {
    id: 'carmen-empanada-gallega-atun',
    name: 'Masa de Empanada Gallega Tradicional con Relleno de Atún y Pimientos',
    shortName: 'Empanada Gallega de Atún',
    category: 'masas',
    mealType: 'universal',
    station: 'horno',
    prepTimeFormatted: '45 min (Horno 190°C)',
    prepTimeMinutes: 45,
    shelfLifeDaysFridge: 5,
    canFreeze: true,
    storageAdvice: 'Nevera Días 1-4 • Congela perfecta horneada',
    suitableDiets: ['mediterranean', 'traditional'],
    allergens: ['Gluten', 'Pescado', 'Huevos'],
    image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=600&auto=format&fit=crop&q=80',
    source: 'Cocina con Carmen',
    sourceCompendium: '12_masas_panes_empanadas_y_quiches.md',
    ingredientsPerServing: [
      { name: 'Harina de trigo de fuerza', quantity: 0.08, unit: 'kg', category: 'despensa' },
      { name: 'Atún en conserva escurrido', quantity: 0.07, unit: 'kg', category: 'despensa' },
      { name: 'Cebolla, pimiento rojo y tomate sofrito', quantity: 0.09, unit: 'kg', category: 'frescos' },
      { name: 'Huevo cocido picado', quantity: 0.5, unit: 'unidad', category: 'refrigerados' },
      { name: 'Aceite de oliva del sofrito para amasar', quantity: 0.02, unit: 'L', category: 'especias' }
    ],
    instructions: [
      'Elaborar la masa incorporando el aceite templado del propio sofrito para máxima fragancia.',
      'Estirar la base, disponer el relleno frío de sofrito, atún y huevo duro.',
      'Cubrir con la tapa de masa, sellar los bordes, hacer chimenea central y pintar con huevo batido.',
      'Hornear a 190°C durante 35 minutos hasta dorado crujiente.'
    ],
    batchTip: 'Ideal para comer fría o templada a lo largo de toda la semana.'
  },

  // =========================================================================
  // 7. POSTRES Y DULCES TRADICIONALES (13_postres_de_cuchara_y_flanes.md)
  // =========================================================================
  {
    id: 'carmen-arroz-con-leche',
    name: 'Arroz con Leche Cremoso de la Abuela con Canela de Ceilán y Cítricos (Carmen)',
    shortName: 'Arroz con Leche Cremoso',
    category: 'postres',
    mealType: 'universal',
    station: 'fuego_3',
    prepTimeFormatted: '45 min (Cazuela)',
    prepTimeMinutes: 45,
    shelfLifeDaysFridge: 5,
    canFreeze: false,
    storageAdvice: 'Nevera Días 1-5 • Servir frío con canela espolvoreada',
    suitableDiets: ['mediterranean', 'traditional', 'veggie'],
    allergens: ['Lácteos'],
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&auto=format&fit=crop&q=80',
    source: 'Cocina con Carmen',
    sourceCompendium: '13_postres_de_cuchara_y_flanes.md',
    ingredientsPerServing: [
      { name: 'Arroz redondo de grano corto', quantity: 0.04, unit: 'kg', category: 'despensa' },
      { name: 'Leche entera fresca de caserío', quantity: 0.25, unit: 'L', category: 'refrigerados' },
      { name: 'Azúcar blanco', quantity: 0.03, unit: 'kg', category: 'despensa' },
      { name: 'Rama de canela de Ceilán y piel de limón', quantity: 0.5, unit: 'unidad', category: 'especias' },
      { name: 'Mantequilla fresca para mantecar', quantity: 0.01, unit: 'kg', category: 'refrigerados' }
    ],
    instructions: [
      'Hervir el arroz en un vaso de agua 3 minutos para abrir el grano.',
      'Añadir la leche caliente infusionada con la canela y la piel de cítricos.',
      'Cocer a fuego muy suave removiendo constantemente con cuchara de madera 35 minutos.',
      'Incorporar el azúcar y la mantequilla en los últimos 5 minutos; enfriar en fuentes individuales.'
    ],
    batchTip: 'Postre estrella semanal: la textura se vuelve aún más untuosa y aromática tras 24h en nevera.'
  },
  {
    id: 'carmen-flan-huevo-tradicional',
    name: 'Flan de Huevo Tradicional de la Abuela al Baño María con Caramelo Casero',
    shortName: 'Flan de Huevo Tradicional',
    category: 'postres',
    mealType: 'universal',
    station: 'horno',
    prepTimeFormatted: '50 min (Horno Baño María)',
    prepTimeMinutes: 50,
    shelfLifeDaysFridge: 5,
    canFreeze: false,
    storageAdvice: 'Nevera Días 1-5 • Servir desmoldado con su caramelo',
    suitableDiets: ['mediterranean', 'traditional', 'veggie'],
    allergens: ['Huevos', 'Lácteos'],
    image: 'https://images.unsplash.com/photo-1541832676-9b763b0239ab?w=600&auto=format&fit=crop&q=80',
    source: 'Cocina con Carmen',
    sourceCompendium: '13_postres_de_cuchara_y_flanes.md',
    ingredientsPerServing: [
      { name: 'Huevos camperos frescos', quantity: 1, unit: 'unidad', category: 'refrigerados' },
      { name: 'Leche entera fresca', quantity: 0.12, unit: 'L', category: 'refrigerados' },
      { name: 'Azúcar para mezcla y caramelo rubio', quantity: 0.03, unit: 'kg', category: 'despensa' },
      { name: 'Vaina de vainilla natural', quantity: 0.2, unit: 'unidad', category: 'especias' }
    ],
    instructions: [
      'Preparar el caramelo rubio con azúcar y unas gotas de agua en sartén; verter en las flaneras.',
      'Batir los huevos con el azúcar suavemente sin meter aire; verter la leche tibia infusionada con vainilla.',
      'Llenar las flaneras y hornear al baño maría a 160°C durante 45 minutos hasta cuajar.',
      'Enfriar por completo en nevera antes de desmoldar.'
    ],
    batchTip: 'Textura sedosa sin agujeros gracias al control térmico a baja temperatura.'
  }
];

/**
 * Obtiene recetas canónicas filtradas por tipo de comida y estilo dietético
 */
export function getFilteredCarmenRecipes(params: {
  mealType?: 'lunch' | 'dinner' | 'universal';
  dietStyle?: 'mediterranean' | 'traditional' | 'fitness' | 'veggie' | 'lowcarb';
  category?: CanonicalRecipe['category'] | 'all';
  excludedAllergens?: string[];
  searchQuery?: string;
}): CanonicalRecipe[] {
  return CARMEN_RECIPES_DATABASE.filter(recipe => {
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
export function getCarmenRecipeById(id: string): CanonicalRecipe | undefined {
  return CARMEN_RECIPES_DATABASE.find(r => r.id === id);
}

/**
 * Emparejador inteligente por palabras clave e ingredientes en el catálogo de Carmen
 * Prioriza concordancias de ingredientes (bacalao, contramuslos, ternera, etc.),
 * respeta alérgenos excluidos y balancea estaciones térmicas para batch cooking concurrente.
 */
export function matchCarmenRecipesByPrompt(
  userPrompt: string,
  excludedAllergens: string[] = [],
  dietStyle?: string,
  count: number = 5
): CanonicalRecipe[] {
  if (!userPrompt || !userPrompt.trim()) {
    return getFilteredCarmenRecipes({
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

  const scoredRecipes = CARMEN_RECIPES_DATABASE.map(recipe => {
    // Verificación estricta de alérgenos
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

    // Puntuación directa para términos comunes
    if (normalizedQuery.includes('bacalao') && normName.includes('bacalao')) score += 30;
    if (normalizedQuery.includes('contramuslo') && (normIngredients.includes('contramuslo') || normName.includes('pollo'))) score += 30;
    if (normalizedQuery.includes('pollo') && (normName.includes('pollo') || normIngredients.includes('pollo'))) score += 25;
    if (normalizedQuery.includes('pescado') && (recipe.category === 'pescados' || normIngredients.includes('pescado'))) score += 20;
    if (normalizedQuery.includes('legumbre') && recipe.category === 'legumbres') score += 20;
    if (normalizedQuery.includes('carne') && recipe.category === 'carnes') score += 20;
    if (normalizedQuery.includes('verdura') && (recipe.category === 'verduras' || recipe.category === 'cremas')) score += 20;
    if (normalizedQuery.includes('calabacin') && (normName.includes('calabacin') || normIngredients.includes('calabacin'))) score += 30;

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

  // Rellenar los huecos restantes con recetas equilibradas libres de alérgenos
  const matchedIds = new Set(matched.map(r => r.id));
  const remaining = CARMEN_RECIPES_DATABASE.filter(r => 
    !matchedIds.has(r.id) && 
    (!excludedAllergens || !r.allergens.some(a => excludedAllergens.includes(a))) &&
    (!dietStyle || r.suitableDiets.includes(dietStyle as any))
  );

  const finalResult = [...matched, ...remaining].slice(0, count);
  return finalResult.length > 0 ? finalResult : CARMEN_RECIPES_DATABASE.slice(0, count);
}
