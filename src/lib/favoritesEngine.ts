import { BatchProject, BatchDish, BatchShoppingItem } from '../types';
import { db, auth } from './firebase';
import { doc, setDoc } from 'firebase/firestore';
import { initializeDishPortions } from './batchProjects';
import { TRADITIONAL_RECIPES_DATABASE } from '../data/recipesTraditionalDatabase';
import { createDishFromCanonicalRecipe } from './batchEngine';

const FAVORITE_BATCHES_STORAGE_KEY = 'touchef_favorite_batches_v3';
const FAVORITE_DISHES_STORAGE_KEY = 'touchef_favorite_dishes_v3';

// Platos favoritos canónicos generados 100% desde las recetas reales de Cocina Tradicional
export const DEFAULT_FAVORITE_DISHES: BatchDish[] = [
  'trad-lentejas-chorizo',
  'trad-pollo-pepitoria',
  'trad-bacalao-ajoarriero',
  'trad-crema-calabacin-suave',
  'trad-pisto-manchego'
].map(id => {
  const rec = TRADITIONAL_RECIPES_DATABASE.find(r => r.id === id) || TRADITIONAL_RECIPES_DATABASE[0];
  const dish = createDishFromCanonicalRecipe(rec, 4);
  dish.isFavorite = true;
  dish.rating = 5;
  return dish;
});

export const DEFAULT_FAVORITE_BATCHES: BatchProject[] = [];

let inMemoryFavoriteBatches: BatchProject[] = [];
let inMemoryFavoriteDishes: BatchDish[] = DEFAULT_FAVORITE_DISHES;

export function loadFavoriteBatchesFromStorage(): BatchProject[] {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem(FAVORITE_BATCHES_STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      } catch (e) {
        console.error('Error loading favorite batches:', e);
      }
    }
  }
  return inMemoryFavoriteBatches;
}

export function loadFavoriteDishesFromStorage(): BatchDish[] {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem(FAVORITE_DISHES_STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      } catch (e) {
        console.error('Error loading favorite dishes:', e);
      }
    }
  }
  return inMemoryFavoriteDishes;
}

export function saveFavoriteBatchesToStorage(batches: BatchProject[], userId?: string): void {
  inMemoryFavoriteBatches = batches;
  if (typeof window !== 'undefined') {
    localStorage.setItem(FAVORITE_BATCHES_STORAGE_KEY, JSON.stringify(batches));
  }

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
  if (typeof window !== 'undefined') {
    localStorage.setItem(FAVORITE_DISHES_STORAGE_KEY, JSON.stringify(dishes));
  }

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
  const title = customTitle || `Lote Favorito (${totalServings} raciones) · ${dateStr}`;

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
    totalCookingTime: '2h 30m',
    overallRating: 5,
    notes: `Lote compuesto con ${selectedDishes.length} recetas de Cocina Tradicional.`,
    dishes: dishesWithPortions,
    shoppingList,
    totalConsumedServings: 0
  };
}
