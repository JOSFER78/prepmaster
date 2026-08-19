import { BatchProject, BatchDish, BatchShoppingItem } from '../types';
import { db, auth } from './firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { initializeDishPortions } from './batchProjects';

const FAVORITE_BATCHES_STORAGE_KEY = 'touchef_favorite_batches_v1';
const FAVORITE_DISHES_STORAGE_KEY = 'touchef_favorite_dishes_v1';

export const DEFAULT_FAVORITE_DISHES: BatchDish[] = [
  {
    id: 'fav-dish-1',
    name: 'Lentejas Pardinas Tradicionales con Verduras de la Huerta',
    category: 'legumbres',
    servings: 8,
    prepTime: '45 min',
    cookingMethod: 'olla_expres',
    storageAdvice: 'Nevera Días 1-3 · Congelador Días 4-7',
    isFavorite: true,
    rating: 5,
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&auto=format&fit=crop&q=80',
    ingredients: [
      { name: 'Lentejas pardinas', quantity: 500, unit: 'g', category: 'despensa' },
      { name: 'Zanahorias', quantity: 3, unit: 'ud', category: 'frescos' },
      { name: 'Puerro', quantity: 1, unit: 'ud', category: 'frescos' },
      { name: 'Pimiento verde', quantity: 1, unit: 'ud', category: 'frescos' },
      { name: 'Laurel y Pimentón de la Vera', quantity: 1, unit: 'cda', category: 'especias' }
    ],
    instructions: [
      'Picar las verduras en brunoise fina.',
      'Rehogar 5 minutos con aceite de oliva virgen extra y pimentón.',
      'Añadir las lentejas pardinas lavadas y cubrir con caldo de verduras.',
      'Cerrar olla rápida y cocinar 18 minutos tras subir la válvula.'
    ]
  },
  {
    id: 'fav-dish-2',
    name: 'Ternera Estofada Muy Tierna en Salsa Reducida de Vino Tinto',
    category: 'carnes',
    servings: 8,
    prepTime: '60 min',
    cookingMethod: 'fuego_1',
    storageAdvice: 'Nevera Días 1-3 · Congelador Días 4-7',
    isFavorite: true,
    rating: 5,
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=500&auto=format&fit=crop&q=80',
    ingredients: [
      { name: 'Aguja de ternera en dados', quantity: 1000, unit: 'g', category: 'carnes-pescados' },
      { name: 'Cebollas dulces', quantity: 2, unit: 'ud', category: 'frescos' },
      { name: 'Zanahorias en rodajas', quantity: 3, unit: 'ud', category: 'frescos' },
      { name: 'Vino tinto Rioja', quantity: 250, unit: 'ml', category: 'despensa' },
      { name: 'Caldo de carne concentrado', quantity: 500, unit: 'ml', category: 'despensa' }
    ],
    instructions: [
      'Sellar los dados de ternera a fuego vivo hasta dorar y reservar.',
      'Pochado lento de cebolla y zanahorias durante 25 minutos.',
      'Desglasar con vino tinto y reducir a la mitad.',
      'Reincorporar la carne, añadir caldo y cocer a fuego lento durante 45 minutos.'
    ]
  },
  {
    id: 'fav-dish-3',
    name: 'Pollo de Corral Asado al Limón con Patatas y Romero',
    category: 'carnes',
    servings: 6,
    prepTime: '50 min',
    cookingMethod: 'horno',
    storageAdvice: 'Nevera Días 1-3',
    isFavorite: true,
    rating: 5,
    image: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=500&auto=format&fit=crop&q=80',
    ingredients: [
      { name: 'Muslos y contramuslos de pollo de corral', quantity: 1200, unit: 'g', category: 'carnes-pescados' },
      { name: 'Patatas medianas', quantity: 4, unit: 'ud', category: 'frescos' },
      { name: 'Limones', quantity: 2, unit: 'ud', category: 'frescos' },
      { name: 'Romero fresco y tomillo', quantity: 3, unit: 'ramas', category: 'especias' },
      { name: 'Ajo en camisa', quantity: 6, unit: 'dientes', category: 'frescos' }
    ],
    instructions: [
      'Cortar patatas en panadera y disponer en bandeja de horno.',
      'Colocar el pollo encima sazonado con sal, pimienta, romero y zumo de limón.',
      'Hornear a 195°C durante 45 minutos con ventilador hasta piel crujiente.'
    ]
  },
  {
    id: 'fav-dish-4',
    name: 'Crema Suave de Calabaza Asada y Puerro Confitado',
    category: 'cremas',
    servings: 10,
    prepTime: '35 min',
    cookingMethod: 'robot',
    storageAdvice: 'Nevera Días 1-4 · Congelador Días 4-7',
    isFavorite: true,
    rating: 5,
    image: 'https://images.unsplash.com/photo-1476718406336-bb5a9690ee2a?w=500&auto=format&fit=crop&q=80',
    ingredients: [
      { name: 'Calabaza cacahuete', quantity: 1000, unit: 'g', category: 'frescos' },
      { name: 'Puerros (parte blanca)', quantity: 2, unit: 'ud', category: 'frescos' },
      { name: 'Patata', quantity: 1, unit: 'ud', category: 'frescos' },
      { name: 'Aceite de oliva virgen extra', quantity: 40, unit: 'ml', category: 'despensa' },
      { name: 'Nuez moscada', quantity: 1, unit: 'pizca', category: 'especias' }
    ],
    instructions: [
      'Rehogar puerro en el vaso del robot o cazuela.',
      'Añadir calabaza y patata en dados con agua justa para cubrir.',
      'Cocer 22 minutos a 100°C y triturar a máxima potencia durante 2 minutos hasta textura sedosa.'
    ]
  },
  {
    id: 'fav-dish-5',
    name: 'Lomos de Merluza Fresca con Pisto Manchego Confitado',
    category: 'pescados',
    servings: 6,
    prepTime: '30 min',
    cookingMethod: 'fuego_2',
    storageAdvice: 'Nevera Días 1-2 (Consumo prioritario)',
    isFavorite: true,
    rating: 5,
    image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=500&auto=format&fit=crop&q=80',
    ingredients: [
      { name: 'Lomos de merluza limpia', quantity: 800, unit: 'g', category: 'carnes-pescados' },
      { name: 'Calabacín', quantity: 2, unit: 'ud', category: 'frescos' },
      { name: 'Berenjena', quantity: 1, unit: 'ud', category: 'frescos' },
      { name: 'Pimientos rojo y verde', quantity: 2, unit: 'ud', category: 'frescos' },
      { name: 'Tomate triturado natural', quantity: 400, unit: 'g', category: 'despensa' }
    ],
    instructions: [
      'Confitar verduras de pisto a fuego lento 25 minutos.',
      'Marcar los lomos de merluza en sartén 2 minutos por lado.',
      'Emplatar sobre la base de pisto templado.'
    ]
  },
  {
    id: 'fav-dish-6',
    name: 'Salmón Noruego al Horno con Brócoli y Salsa de Eneldo',
    category: 'pescados',
    servings: 6,
    prepTime: '25 min',
    cookingMethod: 'horno',
    storageAdvice: 'Nevera Días 1-2',
    isFavorite: true,
    rating: 5,
    image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=500&auto=format&fit=crop&q=80',
    ingredients: [
      { name: 'Lomos de salmón fresco', quantity: 800, unit: 'g', category: 'carnes-pescados' },
      { name: 'Brócoli en ramilletes', quantity: 500, unit: 'g', category: 'frescos' },
      { name: 'Yogur griego natural', quantity: 125, unit: 'g', category: 'refrigerados' },
      { name: 'Eneldo fresco y mostaza Dijon', quantity: 1, unit: 'cda', category: 'especias' }
    ],
    instructions: [
      'Disponer salmón y brócoli en bandeja con aceite de oliva.',
      'Hornear a 180°C durante 16 minutos.',
      'Acompañar de la salsa fría de yogur y eneldo.'
    ]
  }
];

export const DEFAULT_FAVORITE_BATCHES: BatchProject[] = [
  {
    id: 'fav-batch-familiar-med',
    title: 'Menú Batch Cooking Familiar Mediterráneo (40 Raciones)',
    status: 'archived',
    createdAt: '2026-08-01T10:00:00Z',
    peopleCount: 4,
    daysCount: 5,
    mealCoverage: 'both',
    dietStyle: 'Mediterránea Tradicional',
    totalServings: 40,
    totalCookingTime: '3h 15m',
    overallRating: 5,
    notes: 'Lote estrella para familias: equilibrado en legumbres, pescados frescos y verduras de temporada.',
    dishes: DEFAULT_FAVORITE_DISHES.slice(0, 5).map(d => initializeDishPortions(d, 5)),
    shoppingList: [
      { id: 's1', name: 'Lentejas pardinas 1kg', requiredQty: 1, inPantryQty: 0, toBuyQty: 1, unit: 'paquete', category: 'despensa', isBought: false, isFromPantryDeduction: false },
      { id: 's2', name: 'Aguja de ternera fresca', requiredQty: 1, inPantryQty: 0, toBuyQty: 1, unit: 'kg', category: 'carnes-pescados', isBought: false, isFromPantryDeduction: false },
      { id: 's3', name: 'Muslos de pollo de corral', requiredQty: 1.2, inPantryQty: 0, toBuyQty: 1.2, unit: 'kg', category: 'carnes-pescados', isBought: false, isFromPantryDeduction: false },
      { id: 's4', name: 'Calabaza cacahuete', requiredQty: 1, inPantryQty: 0, toBuyQty: 1, unit: 'kg', category: 'frescos', isBought: false, isFromPantryDeduction: false },
      { id: 's5', name: 'Lomos de merluza fresca', requiredQty: 0.8, inPantryQty: 0, toBuyQty: 0.8, unit: 'kg', category: 'carnes-pescados', isBought: false, isFromPantryDeduction: false }
    ]
  },
  {
    id: 'fav-batch-fitness-macros',
    title: 'Batch High-Protein & Macros Limpios (32 Raciones)',
    status: 'archived',
    createdAt: '2026-08-05T10:00:00Z',
    peopleCount: 2,
    daysCount: 7,
    mealCoverage: 'both',
    dietStyle: 'Fitness High-Protein',
    totalServings: 32,
    totalCookingTime: '2h 45m',
    overallRating: 5,
    notes: 'Alto en proteína (140g/día), bajo en grasa saturada y carbohidratos complejos medidos.',
    dishes: [DEFAULT_FAVORITE_DISHES[1], DEFAULT_FAVORITE_DISHES[2], DEFAULT_FAVORITE_DISHES[5], DEFAULT_FAVORITE_DISHES[3]].map(d => initializeDishPortions(d, 7)),
    shoppingList: [
      { id: 's6', name: 'Salmón fresco noruego', requiredQty: 1, inPantryQty: 0, toBuyQty: 1, unit: 'kg', category: 'carnes-pescados', isBought: false, isFromPantryDeduction: false },
      { id: 's7', name: 'Pechuga de pavo de corral', requiredQty: 1.5, inPantryQty: 0, toBuyQty: 1.5, unit: 'kg', category: 'carnes-pescados', isBought: false, isFromPantryDeduction: false },
      { id: 's8', name: 'Brócoli fresco y bimi', requiredQty: 1, inPantryQty: 0, toBuyQty: 1, unit: 'kg', category: 'frescos', isBought: false, isFromPantryDeduction: false }
    ]
  }
];

let inMemoryFavoriteBatches: BatchProject[] = DEFAULT_FAVORITE_BATCHES;
let inMemoryFavoriteDishes: BatchDish[] = DEFAULT_FAVORITE_DISHES;

export function loadFavoriteBatchesFromStorage(): BatchProject[] {
  return inMemoryFavoriteBatches;
}

export function loadFavoriteDishesFromStorage(): BatchDish[] {
  return inMemoryFavoriteDishes;
}

export function saveFavoriteBatchesToStorage(batches: BatchProject[], userId?: string): void {
  inMemoryFavoriteBatches = batches;

  const uid = userId || auth.currentUser?.uid;
  if (uid) {
    setDoc(doc(db, 'users', uid), {
      favoriteBatches: batches,
      updatedAt: new Date().toISOString()
    }, { merge: true }).catch(err => console.warn('Firestore favorite batches save:', err));
  }
}

export function saveFavoriteDishesToStorage(dishes: BatchDish[], userId?: string): void {
  inMemoryFavoriteDishes = dishes;

  const uid = userId || auth.currentUser?.uid;
  if (uid) {
    setDoc(doc(db, 'users', uid), {
      favoriteDishes: dishes,
      updatedAt: new Date().toISOString()
    }, { merge: true }).catch(err => console.warn('Firestore favorite dishes save:', err));
  }
}

/**
 * Creates a complete BatchProject from a customized list of favorite dishes
 */
export function composeBatchFromDishes(
  selectedDishes: BatchDish[],
  customTitle?: string,
  peopleCount: number = 4
): BatchProject {
  const totalServings = selectedDishes.reduce((acc, d) => acc + (d.servings || 4), 0);
  const now = new Date();
  const dateStr = now.toLocaleDateString('es-ES', { day: '2-digit', month: 'short' });
  const title = customTitle || `Lote Favorito Personalizado (${totalServings} raciones) · ${dateStr}`;

  const dishesWithPortions = selectedDishes.map(d => initializeDishPortions(d, 5));

  const shoppingList: BatchShoppingItem[] = selectedDishes.flatMap((d, dIdx) =>
    d.ingredients.map((ing, iIdx) => ({
      id: `shop_${Date.now()}_${dIdx}_${iIdx}`,
      name: ing.name,
      requiredQty: ing.quantity,
      inPantryQty: 0,
      toBuyQty: ing.quantity,
      unit: ing.unit,
      category: ing.category as any,
      isBought: false,
      isFromPantryDeduction: false
    }))
  );

  return {
    id: `batch_custom_${Date.now()}`,
    title,
    status: 'planning',
    createdAt: now.toISOString(),
    peopleCount,
    daysCount: 5,
    mealCoverage: 'both',
    dietStyle: 'Variada / Favoritos',
    totalServings,
    totalCookingTime: '2h 45m',
    overallRating: 5,
    notes: `Lote compuesto artesanalmente con ${selectedDishes.length} recetas favoritas.`,
    dishes: dishesWithPortions,
    shoppingList
  };
}
