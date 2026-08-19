/**
 * 🥘 BASE DE DATOS MAESTRA DE RECETAS CANÓNICAS — COCINA CON CARMEN
 * Estandarización milimétrica para TouChef Batch Cooking:
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
  category: 'legumbres' | 'carnes' | 'pescados' | 'verduras' | 'cremas' | 'acompanamientos';
  mealType: 'lunch' | 'dinner' | 'universal';
  station: 'fuego_1' | 'fuego_2' | 'fuego_3' | 'horno' | 'olla_expres' | 'robot';
  prepTimeFormatted: string;
  prepTimeMinutes: number;
  shelfLifeDaysFridge: number;
  canFreeze: boolean;
  storageAdvice: string;
  suitableDiets: Array<'mediterranean' | 'traditional' | 'fitness' | 'veggie' | 'lowcarb'>;
  allergens: string[];
  image: string;
  source: 'Cocina con Carmen';
  ingredientsPerServing: CanonicalRecipeIngredient[];
  instructions: string[];
  batchTip: string;
}

export const CARMEN_RECIPES_DATABASE: CanonicalRecipe[] = [
  // =========================================================================
  // 1. LEGUMBRES Y GUISOS DE CUCHARA
  // =========================================================================
  {
    id: 'carmen-lentejas-chorizo',
    name: 'Lentejas Pardinas con Chorizo y Verduras de la Abuela (Carmen)',
    shortName: 'Lentejas con Chorizo',
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
    ingredientsPerServing: [
      { name: 'Lentejas pardinas secas', quantity: 0.08, unit: 'kg', category: 'despensa' },
      { name: 'Chorizo fresco oreado', quantity: 0.04, unit: 'kg', category: 'carnes-pescados' },
      { name: 'Zanahorias frescas', quantity: 0.08, unit: 'kg', category: 'frescos' },
      { name: 'Cebolla dulce picada', quantity: 0.06, unit: 'kg', category: 'frescos' },
      { name: 'Pimiento verde italiano', quantity: 0.04, unit: 'kg', category: 'frescos' },
      { name: 'Patatas (trozo chasqueado)', quantity: 0.06, unit: 'kg', category: 'frescos' },
      { name: 'Pimentón de la Vera dulce', quantity: 0.3, unit: 'cucharadita', category: 'especias' },
      { name: 'Laurel seco y ajo', quantity: 0.5, unit: 'diente', category: 'frescos' },
      { name: 'Caldo de ave o agua mineral', quantity: 0.28, unit: 'L', category: 'despensa' }
    ],
    instructions: [
      'Poner en la olla rápida las lentejas lavadas con la cebolla, pimiento, zanahoria y ajo en crudo.',
      'Añadir el chorizo en rodajas, la patata chasqueada para ligar el caldo, la hoja de laurel y el pimentón.',
      'Cubrir con caldo dos dedos por encima. Cerrar la olla y cocinar 18 minutos tras subir la válvula.',
      'Dejar despresurizar, rectificar de sal y reposar antes de repartir en tuppers.'
    ],
    batchTip: 'Si vas a congelar raciones, retira o aplasta la patata, ya que pierde textura con el frío.'
  },
  {
    id: 'carmen-garbanzos-espinacas-bacalao',
    name: 'Potaje de Garbanzos con Espinacas y Bacalao Confitado (Carmen)',
    shortName: 'Garbanzos con Bacalao',
    category: 'legumbres',
    mealType: 'lunch',
    station: 'fuego_1',
    prepTimeFormatted: '40 min (Cazuela)',
    prepTimeMinutes: 40,
    shelfLifeDaysFridge: 4,
    canFreeze: true,
    storageAdvice: 'Nevera Días 1-4 • Sabor se intensifica con el reposo',
    suitableDiets: ['mediterranean', 'traditional', 'fitness'],
    allergens: ['Pescado', 'Huevos'],
    image: 'https://images.unsplash.com/photo-1547496502-affa22d38842?w=600&auto=format&fit=crop&q=80',
    source: 'Cocina con Carmen',
    ingredientsPerServing: [
      { name: 'Garbanzos cocidos pedrosillanos', quantity: 0.18, unit: 'kg', category: 'despensa' },
      { name: 'Bacalao desalado en dados', quantity: 0.12, unit: 'kg', category: 'carnes-pescados' },
      { name: 'Espinacas frescas limpias', quantity: 0.08, unit: 'kg', category: 'frescos' },
      { name: 'Cebolla y pimiento para sofrito', quantity: 0.06, unit: 'kg', category: 'frescos' },
      { name: 'Tomate triturado natural', quantity: 0.05, unit: 'kg', category: 'despensa' },
      { name: 'Majado de almendras y huevo duro', quantity: 0.5, unit: 'ración', category: 'especias' },
      { name: 'Caldo de pescado o fumet suave', quantity: 0.22, unit: 'L', category: 'despensa' }
    ],
    instructions: [
      'Pochar la cebolla y el pimiento en AOVE; añadir el tomate y freír 8 minutos.',
      'Incorporar las espinacas hasta que bajen de volumen y regar con el caldo.',
      'Añadir los garbanzos y el majado noble de almendras y yema para dar cuerpo.',
      'Añadir el bacalao en los últimos 5 minutos de cocción suave para que quede jugoso.'
    ],
    batchTip: 'Guiso estrella de cuaresma: ideal para guardar en nevera ya que la salsa liga con el colágeno.'
  },

  // =========================================================================
  // 2. CARNES Y AVES GUISADAS
  // =========================================================================
  {
    id: 'carmen-pollo-pepitoria',
    name: 'Pollo de Corral en Pepitoria Tradicional con Majado de Almendras (Carmen)',
    shortName: 'Pollo en Pepitoria',
    category: 'carnes',
    mealType: 'lunch',
    station: 'fuego_2',
    prepTimeFormatted: '50 min (Cazuela fuego medio)',
    prepTimeMinutes: 50,
    shelfLifeDaysFridge: 4,
    canFreeze: true,
    storageAdvice: 'Nevera Días 1-4 • Apto congelador 3 meses',
    suitableDiets: ['mediterranean', 'traditional', 'fitness'],
    allergens: ['Huevos', 'Frutos de Cáscara', 'Sulfitos'],
    image: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=600&auto=format&fit=crop&q=80',
    source: 'Cocina con Carmen',
    ingredientsPerServing: [
      { name: 'Pollo de corral en octavos limpio', quantity: 0.25, unit: 'kg', category: 'carnes-pescados' },
      { name: 'Cebolla blanca dulce', quantity: 0.07, unit: 'kg', category: 'frescos' },
      { name: 'Almendras marconas tostadas', quantity: 0.015, unit: 'kg', category: 'despensa' },
      { name: 'Yema de huevo campero cocido', quantity: 0.5, unit: 'unidad', category: 'refrigerados' },
      { name: 'Azafrán en hebra D.O.', quantity: 0.05, unit: 'g', category: 'especias' },
      { name: 'Vino blanco fino o manzanilla', quantity: 0.05, unit: 'L', category: 'despensa' },
      { name: 'Caldo de ave casero', quantity: 0.18, unit: 'L', category: 'despensa' },
      { name: 'Aceite de oliva virgen extra', quantity: 0.015, unit: 'L', category: 'especias' }
    ],
    instructions: [
      'Dorar el pollo salpimentado en cazuela con AOVE y reservar.',
      'Pochar la cebolla despacio hasta que quede transparente y caramelizada.',
      'Desglasar con el vino blanco y dejar evaporar el alcohol.',
      'Elaborar majado con almendras, azafrán tostado y yemas de huevo duro; diluir con caldo.',
      'Reincorporar el pollo, cubrir con el caldo y guisar a fuego lento 35 minutos hasta tiernísimo.'
    ],
    batchTip: 'La salsa espesada con frutos secos y yema se conserva extraordinariamente sedosa en refrigeración.'
  },
  {
    id: 'carmen-albondigas-salsa-abuela',
    name: 'Albóndigas Caseras de Ternera en Salsa de la Abuela (Carmen)',
    shortName: 'Albóndigas en Salsa',
    category: 'carnes',
    mealType: 'lunch',
    station: 'fuego_1',
    prepTimeFormatted: '45 min (Guiso)',
    prepTimeMinutes: 45,
    shelfLifeDaysFridge: 4,
    canFreeze: true,
    storageAdvice: 'Nevera Días 1-4 • Congelador Excelente (3 meses)',
    suitableDiets: ['mediterranean', 'traditional', 'fitness'],
    allergens: ['Gluten', 'Huevos', 'Sulfitos'],
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=600&auto=format&fit=crop&q=80',
    source: 'Cocina con Carmen',
    ingredientsPerServing: [
      { name: 'Carne picada de ternera y magro', quantity: 0.18, unit: 'kg', category: 'carnes-pescados' },
      { name: 'Huevo y miga de pan con leche', quantity: 0.3, unit: 'ración', category: 'refrigerados' },
      { name: 'Cebolla y zanahorias para salsa', quantity: 0.1, unit: 'kg', category: 'frescos' },
      { name: 'Vino blanco de cocina', quantity: 0.04, unit: 'L', category: 'despensa' },
      { name: 'Caldo de carne concentrado', quantity: 0.2, unit: 'L', category: 'despensa' },
      { name: 'Guisantes finos tiernos', quantity: 0.04, unit: 'kg', category: 'frescos' }
    ],
    instructions: [
      'Amasar la carne con ajo, perejil, huevo y miga remojada; formar bolitas homogéneas.',
      'Enharinar levemente y sellar en sartén con AOVE hasta dorar; reservar.',
      'En la misma grasa, pochar cebolla y zanahoria; verter vino y reducir.',
      'Triturar la salsa para conseguir un acabado aterciopelado.',
      'Guisar las albóndigas en la salsa con guisantes durante 15 minutos.'
    ],
    batchTip: 'Una de las recetas rey del batch cooking familiar: aguanta el congelador sin perder jugosidad.'
  },
  {
    id: 'carmen-ternera-jardinera',
    name: 'Estofado de Ternera Tierna a la Jardinera con Verduras (Carmen)',
    shortName: 'Ternera a la Jardinera',
    category: 'carnes',
    mealType: 'lunch',
    station: 'olla_expres',
    prepTimeFormatted: '45 min (Olla exprés)',
    prepTimeMinutes: 45,
    shelfLifeDaysFridge: 4,
    canFreeze: true,
    storageAdvice: 'Nevera Días 1-4 • Muy tierna tras reposo',
    suitableDiets: ['mediterranean', 'traditional', 'fitness', 'lowcarb'],
    allergens: ['Sulfitos'],
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=600&auto=format&fit=crop&q=80',
    source: 'Cocina con Carmen',
    ingredientsPerServing: [
      { name: 'Aguja de ternera en dados limpios', quantity: 0.2, unit: 'kg', category: 'carnes-pescados' },
      { name: 'Zanahorias en rodajas finas', quantity: 0.08, unit: 'kg', category: 'frescos' },
      { name: 'Guisantes y judías verdes', quantity: 0.08, unit: 'kg', category: 'frescos' },
      { name: 'Cebolla pochada con ajo', quantity: 0.06, unit: 'kg', category: 'frescos' },
      { name: 'Vino tinto crianza o caldo', quantity: 0.06, unit: 'L', category: 'despensa' },
      { name: 'Tomate frito casero', quantity: 0.04, unit: 'kg', category: 'despensa' }
    ],
    instructions: [
      'Sellar la ternera a fuego vivo en olla exprés con AOVE y retirar.',
      'Hacer sofrito de cebolla, ajo y tomate frito casero.',
      'Regar con vino tinto y desglasar el fondo.',
      'Reincorporar la carne y verduras; tapar la olla y cocinar 25 min a presión.',
      'Dejar reposar para que el colágeno espese la salsa.'
    ],
    batchTip: 'Ideal para calentar en microondas o cazo en 3 minutos conservando toda la textura.'
  },

  // =========================================================================
  // 3. PESCADOS Y PRODUCTOS DEL MAR
  // =========================================================================
  {
    id: 'carmen-merluza-salsa-verde',
    name: 'Lomos de Merluza Fresca en Salsa Verde con Almejas de Carril (Carmen)',
    shortName: 'Merluza en Salsa Verde',
    category: 'pescados',
    mealType: 'dinner',
    station: 'fuego_2',
    prepTimeFormatted: '25 min (Cazuela baja)',
    prepTimeMinutes: 25,
    shelfLifeDaysFridge: 2,
    canFreeze: false,
    storageAdvice: 'Consumir Días 1-2 (Pescado fresco de consumo preferente)',
    suitableDiets: ['mediterranean', 'traditional', 'fitness'],
    allergens: ['Pescado', 'Moluscos', 'Sulfitos', 'Gluten'],
    image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=600&auto=format&fit=crop&q=80',
    source: 'Cocina con Carmen',
    ingredientsPerServing: [
      { name: 'Lomos de merluza limpia sin espinas', quantity: 0.2, unit: 'kg', category: 'carnes-pescados' },
      { name: 'Almejas frescas lavadas', quantity: 0.08, unit: 'kg', category: 'carnes-pescados' },
      { name: 'Ajo picado fino', quantity: 1, unit: 'diente', category: 'frescos' },
      { name: 'Perejil fresco abundante picado', quantity: 0.015, unit: 'kg', category: 'frescos' },
      { name: 'Harina fina de trigo (roux verde)', quantity: 0.008, unit: 'kg', category: 'despensa' },
      { name: 'Vino blanco seco o txakoli', quantity: 0.03, unit: 'L', category: 'despensa' },
      { name: 'Caldo concentrado de pescado (fumet)', quantity: 0.15, unit: 'L', category: 'despensa' }
    ],
    instructions: [
      'Dorar el ajo picado en cazuela baja con AOVE sin que se queme.',
      'Añadir la harina, cocinar 1 minuto y verter el vino blanco y fumet caliente.',
      'Mover en vaivén continuo con varilla mientras se añade el perejil para emulsionar.',
      'Colocar los lomos de merluza y las almejas; tapar 5 minutos hasta que se abran.'
    ],
    batchTip: 'Programar siempre para el Día 1 o 2 del plan de batch cooking para disfrutar del pescado en su punto óptimo.'
  },
  {
    id: 'carmen-salmon-horno-panaderas',
    name: 'Lomo de Salmón Asado con Cama de Patatas Panaderas y Romero (Carmen)',
    shortName: 'Salmón al Horno con Panaderas',
    category: 'pescados',
    mealType: 'dinner',
    station: 'horno',
    prepTimeFormatted: '30 min (Horno 190°C)',
    prepTimeMinutes: 30,
    shelfLifeDaysFridge: 2,
    canFreeze: false,
    storageAdvice: 'Consumir Días 1-2 • Rico en ácidos Omega-3',
    suitableDiets: ['mediterranean', 'traditional', 'fitness', 'lowcarb'],
    allergens: ['Pescado', 'Sulfitos'],
    image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=600&auto=format&fit=crop&q=80',
    source: 'Cocina con Carmen',
    ingredientsPerServing: [
      { name: 'Lomo de salmón fresco noruego', quantity: 0.2, unit: 'kg', category: 'carnes-pescados' },
      { name: 'Patatas en rodajas panaderas finas', quantity: 0.12, unit: 'kg', category: 'frescos' },
      { name: 'Cebolla dulce en juliana', quantity: 0.05, unit: 'kg', category: 'frescos' },
      { name: 'Vino blanco y limón', quantity: 0.02, unit: 'L', category: 'despensa' },
      { name: 'Aceite de oliva virgen extra y romero', quantity: 0.015, unit: 'L', category: 'especias' }
    ],
    instructions: [
      'Disponer las patatas y cebolla en la bandeja de horno con sal, AOVE y vino blanco.',
      'Hornear a 180°C durante 20 minutos hasta que estén casi tiernas.',
      'Colocar los lomos de salmón encima con romero y rodajas de limón.',
      'Hornear 10 minutos más a 190°C para mantener el salmón jugoso y rosado por dentro.'
    ],
    batchTip: 'Hornea las patatas al mismo tiempo que otros asados de la sesión para optimizar el consumo eléctrico.'
  },

  // =========================================================================
  // 4. VERDURAS, PISTOS Y CREMAS NUTRITIVAS
  // =========================================================================
  {
    id: 'carmen-pisto-manchego',
    name: 'Pisto Manchego Tradicional Confitado al Fuego Lento (Carmen)',
    shortName: 'Pisto Manchego',
    category: 'verduras',
    mealType: 'dinner',
    station: 'fuego_3',
    prepTimeFormatted: '40 min (Sartén honda)',
    prepTimeMinutes: 40,
    shelfLifeDaysFridge: 5,
    canFreeze: true,
    storageAdvice: 'Nevera Días 1-5 • Mejora exponencial con el reposo',
    suitableDiets: ['mediterranean', 'traditional', 'veggie', 'fitness', 'lowcarb'],
    allergens: [],
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&auto=format&fit=crop&q=80',
    source: 'Cocina con Carmen',
    ingredientsPerServing: [
      { name: 'Calabacín con piel en dados', quantity: 0.14, unit: 'kg', category: 'frescos' },
      { name: 'Berenjena fresca en dados', quantity: 0.1, unit: 'kg', category: 'frescos' },
      { name: 'Pimiento verde y rojo', quantity: 0.1, unit: 'kg', category: 'frescos' },
      { name: 'Cebolla pochada', quantity: 0.08, unit: 'kg', category: 'frescos' },
      { name: 'Tomate maduro triturado natural', quantity: 0.12, unit: 'kg', category: 'despensa' },
      { name: 'Aceite de oliva virgen extra', quantity: 0.025, unit: 'L', category: 'especias' }
    ],
    instructions: [
      'Pochar primero la cebolla y los pimientos a fuego medio en AOVE durante 12 min.',
      'Añadir la berenjena y el calabacín; sofreír 10 min hasta que tomen color.',
      'Incorporar el tomate triturado con una pizca de sal y azúcar.',
      'Confitar a fuego lento 20 min moviendo de vez en cuando hasta evaporar el agua.'
    ],
    batchTip: 'Comodín de cocina: sirve como cena ligera, guarnición de carnes o base para huevos rotos.'
  },
  {
    id: 'carmen-crema-calabaza-puerro',
    name: 'Crema Sedosa de Calabaza Asada y Puerro Confitado al AOVE (Carmen)',
    shortName: 'Crema de Calabaza y Puerro',
    category: 'cremas',
    mealType: 'dinner',
    station: 'robot',
    prepTimeFormatted: '30 min (Olla / Robot)',
    prepTimeMinutes: 30,
    shelfLifeDaysFridge: 4,
    canFreeze: true,
    storageAdvice: 'Nevera Días 1-4 • Congelador 3 meses',
    suitableDiets: ['mediterranean', 'traditional', 'veggie', 'fitness', 'lowcarb'],
    allergens: [],
    image: 'https://images.unsplash.com/photo-1476718406336-bb5a9690ee2a?w=600&auto=format&fit=crop&q=80',
    source: 'Cocina con Carmen',
    ingredientsPerServing: [
      { name: 'Calabaza cacahuete pelada', quantity: 0.22, unit: 'kg', category: 'frescos' },
      { name: 'Puerro fresco (parte blanca)', quantity: 0.08, unit: 'kg', category: 'frescos' },
      { name: 'Zanahoria fresca', quantity: 0.05, unit: 'kg', category: 'frescos' },
      { name: 'Caldo de verduras o agua', quantity: 0.2, unit: 'L', category: 'despensa' },
      { name: 'Aceite de oliva virgen extra virgen', quantity: 0.02, unit: 'L', category: 'especias' },
      { name: 'Pizca de nuez moscada y pimienta blanca', quantity: 0.2, unit: 'g', category: 'especias' }
    ],
    instructions: [
      'Rehogar los puerros en juliana con AOVE durante 8 min sin que tomen color.',
      'Añadir la calabaza y zanahoria cortadas en dados; cubrir con caldo.',
      'Cocer 20 min y triturar en caliente a máxima potencia 3 minutos con AOVE para emulsionar.',
      'Pasar por colador chino si se desea una textura de alta gastronomía.'
    ],
    batchTip: 'Cena reconfortante y muy digestiva. Conserva en tarros de cristal herméticos con el vacío térmico.'
  },
  {
    id: 'carmen-salmorejo-cordobes',
    name: 'Salmorejo Cordobés Tradicional con Huevo Campero y Jamón Ibérico (Carmen)',
    shortName: 'Salmorejo Cordobés',
    category: 'cremas',
    mealType: 'lunch',
    station: 'robot',
    prepTimeFormatted: '15 min (Robot de cocina / Batidora)',
    prepTimeMinutes: 15,
    shelfLifeDaysFridge: 4,
    canFreeze: false,
    storageAdvice: 'Nevera Días 1-4 • Servir bien frío (4°C)',
    suitableDiets: ['mediterranean', 'traditional', 'fitness'],
    allergens: ['Gluten', 'Huevos'],
    image: 'https://images.unsplash.com/photo-1541832676-9b763b0239ab?w=600&auto=format&fit=crop&q=80',
    source: 'Cocina con Carmen',
    ingredientsPerServing: [
      { name: 'Tomates maduros de pera o rama', quantity: 0.25, unit: 'kg', category: 'frescos' },
      { name: 'Pan de telera cordobesa o candeal', quantity: 0.05, unit: 'kg', category: 'despensa' },
      { name: 'Aceite de Oliva Virgen Extra Picual', quantity: 0.025, unit: 'L', category: 'especias' },
      { name: 'Diente de ajo morado sin germen', quantity: 0.25, unit: 'diente', category: 'frescos' },
      { name: 'Huevo duro picado', quantity: 0.5, unit: 'unidad', category: 'refrigerados' },
      { name: 'Jamón ibérico en taquitos', quantity: 0.025, unit: 'kg', category: 'carnes-pescados' }
    ],
    instructions: [
      'Triturar los tomates limpios hasta conseguir un puré fino y pasar por colador para quitar pieles y semillas.',
      'Añadir el pan en trozos para que se empape en el tomate durante 10 minutos.',
      'Incorporar el ajo y triturar a máxima velocidad.',
      'Emulsionar vertiendo el AOVE en hilo constante hasta lograr una textura cremosa densa.',
      'Guardar en frío y decorar con huevo duro y jamón antes de comer.'
    ],
    batchTip: 'Plato frío listo para consumir sin necesidad de calentar. Ahorro de tiempo absoluto en mediodías.'
  },

  // =========================================================================
  // 5. PASTAS, ARROCES Y GRATINADOS
  // =========================================================================
  {
    id: 'carmen-macarrones-gratinados-bechamel',
    name: 'Macarrones de la Abuela con Sofrito Casero y Bechamel Gratinada (Carmen)',
    shortName: 'Macarrones con Bechamel',
    category: 'acompanamientos',
    mealType: 'lunch',
    station: 'horno',
    prepTimeFormatted: '35 min (Horno gratinador)',
    prepTimeMinutes: 35,
    shelfLifeDaysFridge: 4,
    canFreeze: true,
    storageAdvice: 'Nevera Días 1-4 • Apto congelador en porciones',
    suitableDiets: ['mediterranean', 'traditional'],
    allergens: ['Gluten', 'Lácteos'],
    image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=600&auto=format&fit=crop&q=80',
    source: 'Cocina con Carmen',
    ingredientsPerServing: [
      { name: 'Macarrones pluma rayados', quantity: 0.08, unit: 'kg', category: 'despensa' },
      { name: 'Carne picada mixta sofrita', quantity: 0.08, unit: 'kg', category: 'carnes-pescados' },
      { name: 'Salsa de tomate casera concentrada', quantity: 0.08, unit: 'kg', category: 'despensa' },
      { name: 'Leche entera y mantequilla (Bechamel)', quantity: 0.12, unit: 'L', category: 'refrigerados' },
      { name: 'Queso rallado curado para gratinar', quantity: 0.03, unit: 'kg', category: 'refrigerados' }
    ],
    instructions: [
      'Cocer los macarrones al dente (1 minuto menos de lo indicado).',
      'Mezclar con el sofrito de carne picada y salsa de tomate casera.',
      'Elaborar la bechamel cremosa infusionada con nuez moscada.',
      'Disponer en bandeja, napar con la bechamel y cubrir con queso rallado.',
      'Gratinar a 220°C durante 10 min hasta costra dorada.'
    ],
    batchTip: 'El favorito de los niños. Si se guarda en recipientes individuales de cristal, se regenera en microondas en 2 min.'
  },
  {
    id: 'carmen-arroz-pollo-verduras',
    name: 'Arroz Meloso de Pollo de Corral y Verduras de la Huerta (Carmen)',
    shortName: 'Arroz con Pollo y Verduras',
    category: 'acompanamientos',
    mealType: 'lunch',
    station: 'fuego_1',
    prepTimeFormatted: '30 min (Cazuela)',
    prepTimeMinutes: 30,
    shelfLifeDaysFridge: 2,
    canFreeze: false,
    storageAdvice: 'Consumir Días 1-2 (Arroz fresco en su punto)',
    suitableDiets: ['mediterranean', 'traditional', 'fitness'],
    allergens: [],
    image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=600&auto=format&fit=crop&q=80',
    source: 'Cocina con Carmen',
    ingredientsPerServing: [
      { name: 'Arroz bomba tradicional', quantity: 0.08, unit: 'kg', category: 'despensa' },
      { name: 'Pollo de corral en dados dorados', quantity: 0.12, unit: 'kg', category: 'carnes-pescados' },
      { name: 'Judías verdes y pimiento rojo', quantity: 0.08, unit: 'kg', category: 'frescos' },
      { name: 'Sofrito de tomate y azafrán', quantity: 0.04, unit: 'kg', category: 'despensa' },
      { name: 'Caldo de ave artesano caliente', quantity: 0.25, unit: 'L', category: 'despensa' }
    ],
    instructions: [
      'Dorar el pollo en la cazuela con AOVE y retirar.',
      'Hacer el sofrito con las verduras y nacarar el arroz 2 minutos.',
      'Añadir el caldo hirviendo y el azafrán; cocer 15 minutos a fuego medio.',
      'Dejar reposar 5 minutos fuera del fuego antes de repartir en recipientes.'
    ],
    batchTip: 'Programa los arroces para los primeros 2 días de la semana para evitar que el grano se pase.'
  },

  // =========================================================================
  // 6. ARROCES, PASTAS Y GRATINADOS
  // =========================================================================
  {
    id: 'carmen-arroz-caldoso-marinero',
    name: 'Arroz Caldoso Marinero con Sepia, Gambón y Fumet Casero (Carmen)',
    shortName: 'Arroz Caldoso Marinero',
    category: 'pescados',
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
    category: 'carnes',
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
  // 7. TAPAS Y ENTRANTES EMBLEMÁTICOS
  // =========================================================================
  {
    id: 'carmen-croquetas-jamon-iberico',
    name: 'Croquetas de Jamón Ibérico Extremadamente Cremosas de la Abuela (Carmen)',
    shortName: 'Croquetas de Jamón Ibérico',
    category: 'carnes',
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
    category: 'acompanamientos',
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
    id: 'carmen-ensaladilla-rusa-tradicional',
    name: 'Ensaladilla Rusa Tradicional de la Abuela con Mayonesa Suave (Carmen)',
    shortName: 'Ensaladilla Rusa Tradicional',
    category: 'acompanamientos',
    mealType: 'dinner',
    station: 'fuego_2',
    prepTimeFormatted: '25 min (+ enfriado)',
    prepTimeMinutes: 25,
    shelfLifeDaysFridge: 3,
    canFreeze: false,
    storageAdvice: 'Nevera Días 1-3 • Servir bien fría',
    suitableDiets: ['mediterranean', 'traditional', 'fitness'],
    allergens: ['Huevos', 'Pescado'],
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&auto=format&fit=crop&q=80',
    source: 'Cocina con Carmen',
    ingredientsPerServing: [
      { name: 'Patatas hervidas con piel en cubitos', quantity: 0.15, unit: 'kg', category: 'frescos' },
      { name: 'Zanahorias cocidas al dente', quantity: 0.06, unit: 'kg', category: 'frescos' },
      { name: 'Atún en aceite de oliva escurrido', quantity: 0.05, unit: 'kg', category: 'despensa' },
      { name: 'Huevos cocidos picados', quantity: 1, unit: 'unidad', category: 'refrigerados' },
      { name: 'Guisantes tiernos cocidos', quantity: 0.03, unit: 'kg', category: 'frescos' },
      { name: 'Mayonesa emulsionada tradicional', quantity: 0.04, unit: 'kg', category: 'refrigerados' }
    ],
    instructions: [
      'Cocer las patatas y zanahorias enteras con su piel en agua salada; pelar y picar en dados finos.',
      'Mezclar con el atún desmigado, los guisantes y el huevo duro picado.',
      'Incorporar la mayonesa con movimientos envolventes; refrigerar al menos 3 horas antes de servir.'
    ],
    batchTip: 'Mejora de un día para otro porque la patata absorbe todos los aromas de la emulsión.'
  }
];

/**
 * Obtiene recetas canónicas filtradas por tipo de comida y estilo dietético
 */
export function getFilteredCarmenRecipes(params: {
  mealType?: 'lunch' | 'dinner' | 'universal';
  dietStyle?: 'mediterranean' | 'traditional' | 'fitness' | 'veggie' | 'lowcarb';
  excludedAllergens?: string[];
}): CanonicalRecipe[] {
  return CARMEN_RECIPES_DATABASE.filter(recipe => {
    if (params.mealType && params.mealType !== 'universal' && recipe.mealType !== 'universal' && recipe.mealType !== params.mealType) {
      return false;
    }
    if (params.dietStyle && !recipe.suitableDiets.includes(params.dietStyle)) {
      return false;
    }
    if (params.excludedAllergens && params.excludedAllergens.length > 0) {
      const hasAllergen = recipe.allergens.some(a => params.excludedAllergens!.includes(a));
      if (hasAllergen) return false;
    }
    return true;
  });
}
