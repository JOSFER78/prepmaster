export type ViewState = 
  | { name: 'landing' | 'auth' | 'home' | 'planner' | 'explore' | 'profile' | 'archive' }
  | { name: 'recipe'; id?: string }
  | { name: 'batch-session' }
  | { name: 'ai-generator' }
  | { name: 'shopping-list' }
  | { name: 'interactive-cook'; dishName?: string }
  | { name: 'reference-rag' }
  | { name: 'chefs' }
  | { name: 'chef-detail'; chefId: string }
  | { name: 'create-chef-request'; preselectedPlanId?: string }
  | { name: 'my-bookings' }
  | { name: 'supermarket-checkout'; planId?: string }
  | { name: 'chef-portal' }
  | { name: 'superadmin' };


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

export interface PlannedMeal {
  id: string;
  day: 'Lunes' | 'Martes' | 'Miércoles' | 'Jueves' | 'Viernes' | 'Sábado' | 'Domingo';
  type: 'lunch' | 'dinner';
  dishName: string;
  category: 'legumbres' | 'carnes' | 'pescados' | 'verduras' | 'cremas' | 'acompanamientos';
  servings: number;
  prepTimeMinutes: number;
  cookingMethod: 'horno' | 'fuego_1' | 'fuego_2' | 'fuego_3' | 'olla_expres' | 'robot';
  storageAdvice: 'nevera' | 'congelador';
  ingredients: { name: string; quantity: number; unit: string; category: string }[];
  instructions: string[];
  calories: number;
  protein: string;
  carbs: string;
  fats: string;
}

export interface Meal {
  id: string;
  day: 'Lunes' | 'Martes' | 'Miércoles' | 'Jueves' | 'Viernes' | 'Sábado' | 'Domingo';
  type: 'lunch' | 'dinner';
  name: string;
  category: 'legumbres' | 'carnes' | 'pescados' | 'verduras' | 'cremas' | 'acompanamientos';
  prepTime: string;
  cookingMethod: 'horno' | 'fuego_1' | 'fuego_2' | 'fuego_3' | 'olla_expres' | 'robot';
  storageAdvice: string;
  ingredients: { name: string; quantity: number; unit: string }[];
}

export interface Recipe {
  id: string;
  title: string;
  description?: string;
  time: string;
  servings?: number;
  calories?: number;
  tags?: string[];
  image?: string;
  ingredients?: { name: string; quantity: string }[];
  steps?: string[];
}

export interface DailyPlan {
  day: string;
  isPrepDay?: boolean;
  totalKcal?: number;
  macros?: { c: number; p: number; g: number };
  meals: {
    id: string;
    type: string;
    title: string;
    calories?: number;
    image?: string;
    macros?: { c: number; p: number; g: number };
  }[];
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
    image?: string;
  }[];
  ingredientGroups: {
    category: string;
    items: {
      name: string;
      baseQuantity: number;
      unit: string;
      notes?: string;
    }[];
  }[];
  timeline: {
    timeBlock: string;
    title: string;
    description: string;
    icon?: string;
    tasks: string[];
  }[];
  storageProtocols?: {
    title?: string;
    type?: string;
    technique?: string;
    description?: string;
    duration?: string;
    container?: string;
    tip?: string;
  }[];
}

export interface GeneratedMenuPlan {
  id: string;
  title: string;
  philosophy?: string;
  mode?: string;
  peopleCount?: number;
  daysCount?: number;
  referenceChannelName?: string;
  items?: any[];
  macrosTarget?: {
    protein: string;
    carbs: string;
    fats: string;
  };
  batchCookingSummary?: {
    totalTime: string;
    sessionsCount?: number;
    parallelSteps?: string[];
    recommendedTechniques?: string[];
  };
  meals?: Meal[];
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
  category: 'legumbres' | 'carnes' | 'pescados' | 'verduras' | 'cremas' | 'acompanamientos' | 'tapas' | 'masas' | 'postres' | 'arroces_pastas' | 'huevos';
  servings: number;
  prepTime: string;
  cookingMethod: 'horno' | 'fuego_1' | 'fuego_2' | 'fuego_3' | 'olla_expres' | 'robot' | 'frio';
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

export interface MealPlanConfig {
  peopleCount: number;
  daysCount: number;
  mealCoverage: 'lunches' | 'dinners' | 'both';
  dietStyle: 'mediterranean' | 'fitness' | 'veggie' | 'lowcarb';
  totalServings: number;
}

export interface KitchenEquipmentItem {
  id: string;
  name: string;
  category: 'fuegos' | 'hornos_robots' | 'utensilios' | 'conservacion';
  description: string;
  available: boolean;
  countOrCapacity?: string;
  image: string;
  brandOrNotes?: string;
}

export interface KitchenProfile {
  stoveType: 'induccion' | 'vitro' | 'gas' | 'mixta';
  burnersCount: number;
  hasOven: boolean;
  hasAirfryer: boolean;
  hasPressureCooker: boolean;
  hasKitchenRobot: boolean;
  kitchenRobotModel?: string;
  hasMicrowave: boolean;
  hasVacuumSealer: boolean;
  glassContainersCount: number;
  freezerDrawersCount: number;
  equipmentList: KitchenEquipmentItem[];
  preferredBatchDay?: string;
  preferredShoppingDay?: string;
  preferredSupermarkets?: string[];
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
  allergies?: string[];
  goals?: string[];
  kitchenProfile?: KitchenProfile;
  sessionToken?: string;
  mealPlanConfig?: MealPlanConfig;
  activeProjectId?: string;
  favoriteDishIds?: string[];
  lastActivePlanId?: string;
  updatedAt?: string;
}

// ----------------------------------------------------
// TOUCHEF MARKETPLACE & CHEF TYPES
// ----------------------------------------------------

export interface ChefServicePricing {
  cookingHourRate: number;         // €/hora de cocina base
  groceryShoppingHourRate: number; // €/hora por gestionar la compra
  assistantHourRate: number;       // €/hora por llevar ayudante
  travelFee: number;               // Suplemento desplazamiento (€)
  travelRadiusKm: number;          // Radio de cobertura en km
  toolsIncluded: boolean;          // ¿Lleva cuchillos y herramientas propias?
  toolsExtraFee: number;           // Suplemento por equipo propio si aplica (€)
  cleaningIncluded: boolean;       // ¿Incluye recogida/limpieza básica de cocina?
  cleaningHourRate?: number;       // Tarifa por hora de limpieza si se desglosa
}

export interface ChefReview {
  id: string;
  authorName: string;
  authorAvatar?: string;
  rating: number;                  // 1 a 5 estrellas
  date: string;
  comment: string;
  dishNameOrType?: string;
  isVerifiedBooking: boolean;
}

export interface ChefProfile {
  id: string;
  email?: string;
  name: string;
  slug: string;
  title: string;                   // ej: "Especialista en Batch Cooking & Mediterránea"
  avatar: string;
  coverImage?: string;
  bio: string;
  rating: number;
  reviewsCount: number;
  completedBookingsCount: number;
  locationCity: string;            // ej: "Madrid - Chamberí"
  zones: string[];                 // ej: ["Chamberí", "Salamanca", "Retiro", "Pozuelo"]
  isVerified: boolean;
  yearsExperience: number;
  specialties: string[];           // ["Batch Cooking", "Mediterránea", "Sin Gluten", "Fitness High Protein", "Familiar"]
  pricing: ChefServicePricing;
  availabilityDays: string[];      // ["Lunes", "Miércoles", "Viernes", "Domingos"]
  timeSlots: string[];             // ["Mañanas (09:00 - 14:00)", "Tardes (16:00 - 21:00)"]
  badges: string[];                // ["Chef Verificado", "Higiene Certificada", "Superhost", "Top Batch Cooker"]
  hasFoodHandlerCertificate: boolean; // Certificado manipulador de alimentos
  foodHandlerCertificateNumber?: string;
  allergenManagementCertified: boolean; // Certificación control 14 alérgenos UE
  haccpCompliance: boolean;        // Cumplimiento protocolo APPCC de conservación
  featuredDishes: {
    name: string;
    image: string;
    category: string;
    prepTime: string;
  }[];
  reviews: ChefReview[];
}

export type ChefBookingStatus = 
  | 'draft'                        // Solicitud en borrador
  | 'published'                    // Publicada esperando ofertas/confirmación
  | 'offers_received'              // Con ofertas de cocineros
  | 'awaiting_grocery'             // Esperando confirmación de ingredientes/supermercado
  | 'confirmed'                    // Chef confirmado y franja reservada
  | 'chef_arriving'                // Cocinero en camino
  | 'in_progress'                  // Sesión de cocina activa
  | 'completed'                    // Finalizada y evaluada
  | 'cancelled';

export type ChefServicePackage = 
  | 'cooking_only'                 // 1. Solo Cocina (Cliente tiene comida y herramientas)
  | 'with_tools'                   // 2. Cocina + Herramientas Profesionales del Chef
  | 'with_grocery'                 // 3. Cocina + Compra de Supermercado + Herramientas
  | 'full_pack_with_assistant';    // 4. Servicio Completo con Ayudante

export interface ChefApplication {
  id: string;
  chefId: string;
  chefName: string;
  chefAvatar: string;
  chefRating: number;
  chefHourlyRate: number;
  chefSpecialties: string[];
  appliedAt: string;
  message: string;
  proposedMenu?: string; // Menú personalizado propuesto por el chef en solicitudes abiertas
  status: 'pending' | 'accepted' | 'declined';
}

export interface ChefBookingRequest {
  id: string;
  customerId: string;
  customerName: string;
  customerPhone?: string;
  address: string;
  postalCode: string;
  city: string;
  batchProjectId?: string;
  mealPlanTitle: string;
  dishes: { name: string; servings: number }[];
  peopleCount: number;
  targetDate: string;
  targetTimeSlot: string;
  estimatedHours: number;
  
  // Solicitud abierta basada en preferencias (Corte Temprano)
  isOpenPreferencesRequest?: boolean;
  dietaryDirectives?: string;
  dietStyle?: string;
  
  // Paquete y servicios seleccionados
  servicePackage: ChefServicePackage;
  includeGroceryShopping: boolean;
  includeCleaning: boolean;
  bringChefTools: boolean;
  hasAssistant: boolean;
  assistantHours?: number;
  grocerySource: 'client' | 'chef' | 'supermarket_delivery';
  supermarketProvider?: 'dia' | 'carrefour' | 'mercadona';
  
  // Modalidad: Broadcast a la Red vs Asignación Manual Directa
  isBroadcast?: boolean; // true si se lanzó a la red para recibir ofertas de varios cocineros
  applicants?: ChefApplication[]; // cocineros que han postulado/aceptado el encargo con su mensaje
  
  // Asignación de Chef Oficial
  chefId?: string;
  chefName?: string;
  chefAvatar?: string;
  
  // Desglose de Precios y Anti-Fuga
  costBreakdown: {
    cookingCost: number;
    groceryServiceCost: number;
    toolsCost: number;
    assistantCost: number;
    travelCost: number;
    cleaningCost: number;
    ingredientsEstimatedCost: number;
    platformServiceFee: number;     // Fee transparente de servicio y protección
    totalClientPrice: number;
    chefPayoutEstimated: number;    // Lo que cobra el chef
    commissionRatePercent: number;   // 15% primera reserva, 8% repetición, 5% Pro
  };
  
  status: ChefBookingStatus;
  notes?: string;
  allergies?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface SupermarketProviderConfig {
  id: 'dia' | 'carrefour' | 'amazon_fresh';
  name: string;
  logo: string;
  minOrder: number;
  deliveryFee: number;
  freeDeliveryThreshold?: number;
  sameDayDelivery: boolean;
  earliestAvailableSlot: string; // ej: "Hoy 16:00 - 18:00"
  badge: string;                 // ej: "Recomendado Batch Cooking"
  directCheckoutSupported: boolean;
}

// ----------------------------------------------------
// NOTIFICACIONES EN TIEMPO REAL & CHAT PROTEGIDO
// ----------------------------------------------------

export type NotificationType = 
  | 'booking_broadcast_new'       // Evento 1: Nuevo encargo publicado en la zona
  | 'chef_application_received'   // Evento 2: Cocinero postula/acepta encargo
  | 'chat_message_new'            // Evento 3: Mensaje nuevo en el chat protegido
  | 'booking_confirmed_chef'      // Evento 4A: Cocinero elegido confirmado (Ganador)
  | 'booking_closed_unselected'   // Evento 4B: Cierre de encargo a candidatos no elegidos
  | 'booking_status_change';      // Cambio de estado general de la reserva

export interface AppNotification {
  id: string;
  recipientId: string;            // UID del destinatario
  recipientRole: 'client' | 'chef' | 'all_chefs';
  type: NotificationType;
  title: string;
  body: string;
  bookingId?: string;
  conversationId?: string;
  senderId: string;
  senderName: string;
  senderAvatar?: string;
  geoZone?: string;               // ej. "Madrid (Chamberí)"
  isRead: boolean;
  priority?: 'low' | 'normal' | 'high' | 'urgent';
  metadata?: Record<string, any>;
  createdAt: string;
  readAt?: string | null;
}

export interface ConversationDoc {
  id: string;
  bookingId: string;
  customerId: string;
  customerName: string;
  customerAvatar?: string;
  chefId: string;
  chefName: string;
  chefAvatar?: string;
  bookingStatus: ChefBookingStatus;
  isProtectedMode: boolean;       // true mientras bookingStatus !== 'confirmed' & !== 'completed'
  lastMessage?: {
    text: string;
    senderId: string;
    createdAt: string;
  };
  unreadCount: {
    [uid: string]: number;
  };
  createdAt: string;
  updatedAt: string;
}

export interface ChatMessageDoc {
  id: string;
  conversationId: string;
  senderId: string;
  senderRole: 'client' | 'chef' | 'system';
  recipientId: string;
  text: string;
  originalText?: string;
  hasAntiLeakViolation: boolean;
  violationTypes?: ('phone' | 'email' | 'iban' | 'bizum' | 'social_network')[];
  status: 'sending' | 'sent' | 'delivered' | 'read';
  deliveryTimestamps: {
    sentAt: string;
    deliveredAt?: string | null;
    readAt?: string | null;
  };
}

