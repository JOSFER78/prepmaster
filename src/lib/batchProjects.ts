import { BatchProject, BatchDish, BatchShoppingItem, BatchStatus } from '../types';

export const INITIAL_BATCH_PROJECTS: BatchProject[] = [];

const STORAGE_KEY = 'prepmaster_batch_projects_v2';

export function loadBatchProjectsFromStorage(): BatchProject[] {
  if (typeof window === 'undefined') return [];
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch (e) {
    console.error('Error loading batch projects from storage', e);
  }
  return [];
}

export function saveBatchProjectsToStorage(projects: BatchProject[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
  } catch (e) {
    console.error('Error saving batch projects to storage', e);
  }
}

/**
 * Distribute portions between fridge (days 1-3) and freezer (days 4+)
 */
export function initializeDishPortions(dish: BatchDish, daysCount: number = 5): BatchDish {
  const total = dish.servings || 4;
  // Standard rule: 60% in fridge for first 3 days, 40% in freezer for day 4+
  const fridgeRatio = Math.min(1, 3 / Math.max(1, daysCount));
  const fridgePortions = Math.round(total * fridgeRatio);
  const freezerPortions = Math.max(0, total - fridgePortions);
  
  return {
    ...dish,
    fridgePortions: dish.fridgePortions !== undefined ? dish.fridgePortions : fridgePortions,
    freezerPortions: dish.freezerPortions !== undefined ? dish.freezerPortions : freezerPortions,
    consumedPortions: dish.consumedPortions !== undefined ? dish.consumedPortions : 0,
    shelfLifeDaysFridge: dish.shelfLifeDaysFridge || (dish.category === 'pescados' ? 2 : 4),
    shelfLifeMonthsFreezer: dish.shelfLifeMonthsFreezer || 3
  };
}

/**
 * Consume a portion from a dish (first consumes from fridge, then from freezer)
 */
export function consumeDishPortion(dish: BatchDish, count: number = 1): BatchDish {
  let remaining = count;
  let currentFridge = dish.fridgePortions ?? Math.max(0, dish.servings - (dish.consumedPortions ?? 0));
  let currentFreezer = dish.freezerPortions ?? 0;
  let consumed = dish.consumedPortions ?? 0;

  if (currentFridge >= remaining) {
    currentFridge -= remaining;
    consumed += remaining;
    remaining = 0;
  } else {
    consumed += currentFridge;
    remaining -= currentFridge;
    currentFridge = 0;

    const fromFreezer = Math.min(currentFreezer, remaining);
    currentFreezer -= fromFreezer;
    consumed += fromFreezer;
  }

  return {
    ...dish,
    fridgePortions: currentFridge,
    freezerPortions: currentFreezer,
    consumedPortions: consumed
  };
}

/**
 * Clones a batch project as a new active shopping project
 */
export function cloneBatchProjectAsNew(sourceProject: BatchProject): BatchProject {
  const newId = `batch_proj_${Date.now()}`;
  const clonedShopping: BatchShoppingItem[] = sourceProject.dishes.flatMap(d => 
    d.ingredients.map(ing => ({
      id: `shop_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
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

  const resetDishes = sourceProject.dishes.map(d => initializeDishPortions({
    ...d,
    fridgePortions: undefined,
    freezerPortions: undefined,
    consumedPortions: 0
  }, sourceProject.daysCount));

  return {
    ...sourceProject,
    id: newId,
    title: `${sourceProject.title.replace(/\s*\(Nuevo Lote\)/g, '')} (Nuevo Lote)`,
    status: 'shopping',
    createdAt: new Date().toISOString(),
    cookedAt: undefined,
    expiresAt: undefined,
    archivedAt: undefined,
    overallRating: undefined,
    dishes: resetDishes,
    shoppingList: clonedShopping,
    totalConsumedServings: 0
  };
}

/**
 * Calculates real consumption metrics for an active project
 */
export function calculateProjectMetrics(project: BatchProject) {
  const totalPlanned = project.totalServings || project.dishes.reduce((acc, d) => acc + d.servings, 0);
  const totalConsumed = project.dishes.reduce((acc, d) => acc + (d.consumedPortions || 0), 0);
  const totalFridge = project.dishes.reduce((acc, d) => acc + (d.fridgePortions || 0), 0);
  const totalFreezer = project.dishes.reduce((acc, d) => acc + (d.freezerPortions || 0), 0);
  const remainingServings = totalFridge + totalFreezer;
  const progressPercent = totalPlanned > 0 ? Math.min(100, Math.round((totalConsumed / totalPlanned) * 100)) : 0;

  const totalShopItems = project.shoppingList?.length || 0;
  const boughtShopItems = project.shoppingList?.filter(i => i.isBought).length || 0;
  const shoppingProgressPercent = totalShopItems > 0 ? Math.round((boughtShopItems / totalShopItems) * 100) : 100;

  return {
    totalPlanned,
    totalConsumed,
    totalFridge,
    totalFreezer,
    remainingServings,
    progressPercent,
    totalShopItems,
    boughtShopItems,
    shoppingProgressPercent
  };
}
