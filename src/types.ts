export type ViewState = 
  | { name: 'home' | 'planner' | 'explore' | 'profile' }
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


