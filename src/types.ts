export type ViewState = 
  | { name: 'landing' | 'auth' | 'home' | 'planner' | 'explore' | 'profile' }
  | { name: 'recipe'; id: string }
  | { name: 'batch-session' }
  | { name: 'ai-generator' }
  | { name: 'shopping-list' }
  | { name: 'interactive-cook'; dishName?: string }
  | { name: 'reference-rag' };

export interface ReferenceChannel {
  id: string;
  name: string;
  author: string;
  style: string;
  philosophy: string;
  keyTechniques: string[];
  avatar: string;
  isCustom?: boolean;
}

export interface UserNotebook {
  id: string;
  title: string;
  channelId?: string;
  content: string;
  tags: string[];
  updatedAt: string;
}

export interface FridgeItem {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  category: 'frescos' | 'carnes-pescados' | 'refrigerados' | 'despensa' | 'especias';
  daysLeft: number;
}

export type MenuMode = 
  | 'AUTO_BATCH'       // Modo 1: Automático Puro Batch Cooking
  | 'FRIDGE_ONLY'      // Modo 2: Adaptado a Nevera/Despensa (Zero Waste)
  | 'FRIDGE_CRAVINGS'  // Modo 3: Nevera + Antojos/Peticiones Específicas
  | 'ADVANCED_DIET';   // Modo 4: Indicaciones Avanzadas (Dietas/Macros/Tiempos)

export interface MenuGenerationConfig {
  mode: MenuMode;
  peopleCount: number;
  daysCount: number;
  referenceChannelId: string;
  includeFridgeItems: boolean;
  cravingsText?: string;
  dietaryRestrictions: string[];
  maxPrepTimeHours: number;
  targetCaloriesPerDay?: number;
}

export interface GeneratedMenuItem {
  dayName: string;
  mealType: 'Almuerzo' | 'Cena' | 'Batch Prep';
  dishName: string;
  servings: number;
  prepTime: string;
  isFromFridge: boolean;
  referenceStyleApplied?: string;
  ingredients: { name: string; quantity: number; unit: string; category: string }[];
  instructions: string[];
}

export interface DailyRotationSlot {
  dayNumber: number;
  dayLabel: string;
  lunchStarter?: string;
  lunchMain: string;
  dinnerMain: string;
}

export interface GeneratedMenuPlan {
  id: string;
  title: string;
  mode: MenuMode;
  peopleCount: number;
  daysCount: number;
  referenceChannelName: string;
  items: GeneratedMenuItem[];
  dailyRotation?: DailyRotationSlot[];
  batchCookingSummary: {
    totalTime: string;
    sessionsCount: number;
    recommendedTechniques: string[];
  };
}

export interface ShoppingCategoryItem {
  id: string;
  name: string;
  requiredQty: number;
  inPantryQty: number;
  toBuyQty: number;
  unit: string;
  isBought: boolean;
  isFromPantryDeduction: boolean;
}

export interface ShoppingCategory {
  categoryName: string;
  iconName: string;
  items: ShoppingCategoryItem[];
}

export interface VisionFrameAnalysis {
  timestamp: string;
  status: 'OPTIMAL' | 'IN_PROGRESS' | 'ATTENTION_NEEDED';
  detectedStage: string;
  confidence: number;
  feedbackText: string;
  recommendedAction: string;
}

export interface IngredientGroup {
  category: string;
  items: {
    name: string;
    baseQuantity: number;
    unit: string;
    notes?: string;
  }[];
}

export interface BatchTimelineStep {
  timeBlock: string;
  title: string;
  description: string;
  icon: string;
  tasks: string[];
}

export interface StorageProtocol {
  title: string;
  technique: string;
  duration: string;
  description: string;
}

export interface BatchCookingPlan {
  id: string;
  title: string;
  description: string;
  prepTime: string;
  defaultServings: number;
  totalMealsPrepared: number;
  tags: string[];
  dishes: {
    name: string;
    servings: number;
    calories: number;
    image: string;
  }[];
  ingredientGroups: IngredientGroup[];
  timeline: BatchTimelineStep[];
  storageProtocols: StorageProtocol[];
}

export interface Recipe {
  id: string;
  title: string;
  time: string;
  calories?: number;
  image: string;
  tags?: string[];
  description?: string;
  servings?: number;
}

export interface Meal {
  id: string;
  type: 'LUNCH' | 'DINNER' | 'PREPPED LUNCH';
  title: string;
  calories?: number;
  image?: string;
  macros?: {
    c: number;
    p: number;
    g: number;
  };
}

export interface DailyPlan {
  day: string;
  dateStr?: string;
  isPrepDay?: boolean;
  totalKcal?: number;
  macros?: {
    c: number;
    p: number;
    g: number;
  };
  meals: Meal[];
}

export type UserRole = 'user' | 'superadmin';

export type BatchStatus = 
  | 'planning'            // Fase 1: Planificando raciones y platos
  | 'shopping'            // Fase 2: Lista de compra activa
  | 'ready_to_cook'       // Compra completada, listo para iniciar cocina
  | 'cooking'             // Fase 3: En sesión de cocina simultánea
  | 'in_fridge'           // Fase 4: En nevera / congelador consumiéndose
  | 'archived';           // Fase 5: Lote completado / evaluado

export interface BatchDish {
  id: string;
  name: string;
  category: 'legumbres' | 'carnes' | 'pescados' | 'verduras' | 'cremas' | 'acompanamientos';
  servings: number;
  prepTime: string;
  cookingMethod: 'horno' | 'fuego_1' | 'fuego_2' | 'fuego_3' | 'olla_expres' | 'robot';
  storageAdvice: string; // ej: 'Nevera Días 1-3' | 'Congelador tras día 3'
  isFavorite?: boolean;
  rating?: number; // 1 to 5 stars
  image?: string;
  ingredients: { name: string; quantity: number; unit: string; category: string }[];
  instructions: string[];
  // Raciones y seguimiento de conservación
  fridgePortions?: number;      // Raciones guardadas en nevera (Días 1-3)
  freezerPortions?: number;     // Raciones guardadas en congelador (Días 4-7)
  consumedPortions?: number;    // Raciones ya consumidas
  shelfLifeDaysFridge?: number; // Días óptimos en nevera
  shelfLifeMonthsFreezer?: number;
}

export interface BatchShoppingItem {
  id: string;
  name: string;
  requiredQty: number;
  inPantryQty: number;
  toBuyQty: number;
  unit: string;
  category: 'frescos' | 'carnes-pescados' | 'refrigerados' | 'despensa' | 'especias';
  isBought: boolean;
  isFromPantryDeduction: boolean;
  estimatedPriceEuros?: number;
}

export interface BatchProject {
  id: string;
  title: string;
  status: BatchStatus;
  createdAt: string;
  plannedShoppingDate?: string; // Fecha prevista para hacer la compra
  plannedCookingDate?: string;  // Fecha prevista para cocinar el lote
  cookedAt?: string;
  expiresAt?: string;
  archivedAt?: string;
  peopleCount: number;
  daysCount: number;
  mealCoverage: 'lunches' | 'dinners' | 'both';
  dietStyle: string;
  totalServings: number;
  dishes: BatchDish[];
  shoppingList: BatchShoppingItem[];
  totalCookingTime?: string;
  overallRating?: number;
  notes?: string;
  hoursSavedWeekly?: number;
  totalConsumedServings?: number;
}

export interface SimulatorContext {
  peopleCount: number;
  daysCount: number;
  mealCoverage: 'lunches' | 'dinners' | 'both';
  dietStyle: 'mediterranean' | 'fitness' | 'veggie' | 'lowcarb';
  totalServings: number;
}

export interface AppUserProfile {
  id: string;
  email: string;
  displayName: string;
  photoURL?: string;
  role: UserRole;
  isSuperAdmin: boolean;
  peopleCount: number;
  dietPreferences: string[];
  sessionToken?: string;
  simulatorContext?: SimulatorContext;
  activeProjectId?: string;
  favoriteDishIds?: string[];
  lastActivePlanId?: string;
  updatedAt?: string;
}



