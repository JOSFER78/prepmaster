import { ChefProfile, ChefBookingRequest, ChefServicePricing, TierCommissionResult } from '../types';
import { calculateAntiFugaQuote } from './antiFugaEngine';

// =========================================================================
// 1. CHEF BOOTSTRAP POLICY & REAL CHEF DATA STORE
// =========================================================================
// Prohibición estricta de Mocks: No se permiten perfiles ficticios ni fake reviews en producción.
// El directorio inicia en 0 cocineros hasta que exista un cocinero realmente homologado.
// Cocinero Oficial Homologado Inicial: usajosefernan@gmail.com

export const APPROVED_BOOTSTRAP_CHEF_EMAIL = 'usajosefernan@gmail.com';

/**
 * Perfil base del único cocinero homologado de bootstrap (usajosefernan@gmail.com).
 * Se activa cuando el usuario con este email inicia sesión o es aprobado por el Superadmin.
 */
export const BOOTSTRAP_CHEF_PROFILE: ChefProfile = {
  id: 'chef-jose-fernandez',
  slug: 'jose-fernandez',
  title: 'Especialista en Batch Cooking Mediterráneo & Guisos Saludables',
  name: 'José Fernández',
  avatar: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=400&auto=format&fit=crop&q=80',
  bio: 'Chef profesional especializado en Batch Cooking mediterráneo saludable, guisos tradicionales optimizados y cocina alta en proteína. Manipulador de alimentos certificado con más de 10 años de experiencia en cocinas de Madrid.',
  rating: 5.0,
  reviewsCount: 0,
  completedBookingsCount: 0,
  locationCity: 'Madrid (Chamberí)',
  zones: ['Chamberí', 'Salamanca', 'Retiro', 'Centro', 'Chamartín', 'Moncloa'],
  isVerified: true,
  yearsExperience: 10,
  specialties: ['Batch Cooking', 'Mediterránea Tradicional', 'Fitness High Protein', 'Legumbres & Guisos'],
  pricing: {
    cookingHourRate: 25.0,
    groceryShoppingHourRate: 18.0,
    travelFee: 5.0,
    travelRadiusKm: 15,
    toolsIncluded: true,
    toolsExtraFee: 0.0,
    cleaningIncluded: true,
    cleaningHourRate: 0.0
  },
  reviews: []
};

// Array en memoria dinámico de cocineros aprobados (inicializado desde Firestore o LocalStorage)
export const APPROVED_CHEFS: ChefProfile[] = [BOOTSTRAP_CHEF_PROFILE];

// Alias para compatibilidad transitoria de imports, referenciando exclusivamente la lista de aprobados
export const MOCK_CHEFS: ChefProfile[] = APPROVED_CHEFS;

// Claves de almacenamiento
export const CHEF_BOOKINGS_STORAGE_KEY = 'touchef_chef_bookings_v2';
export const APPROVED_CHEFS_STORAGE_KEY = 'touchef_approved_chefs_v2';

/**
 * Carga la lista de cocineros aprobados desde almacenamiento local / Firestore.
 */
export function loadApprovedChefsFromStorage(): ChefProfile[] {
  try {
    const raw = localStorage.getItem(APPROVED_CHEFS_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.error('Error loading approved chefs from storage:', e);
  }
  return [BOOTSTRAP_CHEF_PROFILE];
}

/**
 * Guarda los cocineros aprobados en almacenamiento persistente.
 */
export function saveApprovedChefsToStorage(chefs: ChefProfile[]): void {
  try {
    localStorage.setItem(APPROVED_CHEFS_STORAGE_KEY, JSON.stringify(chefs));
  } catch (e) {
    console.error('Error saving approved chefs to storage:', e);
  }
}

/**
 * Carga las reservas de cocinero del usuario. Inicia en [] si no hay reservas reales.
 */
export function loadChefBookingsFromStorage(): ChefBookingRequest[] {
  try {
    const raw = localStorage.getItem(CHEF_BOOKINGS_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        return parsed;
      }
    }
  } catch (e) {
    console.error('Error loading chef bookings from storage:', e);
  }
  return [];
}

/**
 * Guarda las reservas en almacenamiento persistente.
 */
export function saveChefBookingsToStorage(bookings: ChefBookingRequest[]): void {
  try {
    localStorage.setItem(CHEF_BOOKINGS_STORAGE_KEY, JSON.stringify(bookings));
  } catch (e) {
    console.error('Error saving chef bookings to storage:', e);
  }
}

/**
 * Un chef homologado postula a un encargo en broadcast.
 */
export function applyToBroadcastBooking(
  bookingId: string,
  chef: ChefProfile,
  message: string
): ChefBookingRequest[] {
  const bookings = loadChefBookingsFromStorage();
  const updated = bookings.map(b => {
    if (b.id === bookingId) {
      const applicant = {
        id: `app_${chef.id}_${Date.now()}`,
        chefId: chef.id,
        chefName: chef.name,
        chefAvatar: chef.avatar,
        chefRating: chef.rating,
        chefHourlyRate: chef.pricing.cookingHourRate,
        chefSpecialties: chef.specialties,
        appliedAt: new Date().toISOString(),
        message,
        status: 'pending' as const
      };
      const existingApplicants = b.applicants || [];
      return {
        ...b,
        applicants: [...existingApplicants.filter(a => a.chefId !== chef.id), applicant],
        status: 'offers_received' as const,
        updatedAt: new Date().toISOString()
      };
    }
    return b;
  });
  saveChefBookingsToStorage(updated);
  return updated;
}

/**
 * El cliente acepta la oferta de un cocinero candidato.
 */
export function acceptChefApplication(
  bookingId: string,
  applicantId: string
): ChefBookingRequest[] {
  const bookings = loadChefBookingsFromStorage();
  const updated = bookings.map(b => {
    if (b.id === bookingId) {
      const applicant = b.applicants?.find(a => a.id === applicantId);
      if (!applicant) return b;
      return {
        ...b,
        chefId: applicant.chefId,
        chefName: applicant.chefName,
        chefAvatar: applicant.chefAvatar,
        status: 'confirmed' as const,
        updatedAt: new Date().toISOString(),
        applicants: b.applicants?.map(a => 
          a.id === applicantId ? { ...a, status: 'accepted' as const } : { ...a, status: 'rejected' as const }
        )
      };
    }
    return b;
  });
  saveChefBookingsToStorage(updated);
  return updated;
}

// =========================================================================
// 2. MOTOR DE COTIZACIÓN Y COMISIONES (INTEGRADO CON ANTI-FUGA)
// =========================================================================

export interface BookingQuoteParams {
  chefPricing: ChefServicePricing;
  estimatedCookingHours: number;
  includeGroceryShopping: boolean;
  estimatedGroceryHours?: number;
  includeTravel: boolean;
  bringOwnTools: boolean;
  requestKitchenDeepClean: boolean;
  estimatedIngredientsCost: number;
  userBookingCountWithThisChef?: number;
  isChefProSubscriber?: boolean;
  isTouChefPlusMember?: boolean;
}

export function calculateBookingQuote(params: BookingQuoteParams) {
  const quote = calculateAntiFugaQuote({
    cookingHourRate: params.chefPricing.cookingHourRate,
    cookingHours: params.estimatedCookingHours,
    includeGrocery: params.includeGroceryShopping,
    groceryHourRate: params.chefPricing.groceryHourRate,
    groceryHours: params.estimatedGroceryHours || 1.0,
    includeTravel: params.includeTravel,
    travelFee: params.chefPricing.travelFee,
    bringOwnTools: params.bringOwnTools,
    toolsFee: params.chefPricing.toolsIncludedFee,
    requestDeepClean: params.requestKitchenDeepClean,
    cleanFee: params.chefPricing.emergencyCleaningFee,
    rawIngredientsCost: params.estimatedIngredientsCost,
    userBookingsCountWithChef: params.userBookingCountWithThisChef || 0,
    isChefProSubscriber: params.isChefProSubscriber || false,
    isClientPlusMember: params.isTouChefPlusMember || false
  });

  return {
    cookingCost: quote.breakdown.cookingCost,
    groceryCost: quote.breakdown.groceryCost,
    travelFee: quote.breakdown.travelFee,
    toolsFee: quote.breakdown.toolsFee,
    cleaningFee: quote.breakdown.cleaningFee,
    serviceSubtotal: quote.breakdown.serviceLaborSubtotal,
    ingredientsCost: quote.breakdown.rawIngredientsCost,
    totalDirectCost: quote.breakdown.totalDirectExpense,
    commissionRate: quote.commission.commissionPercentage,
    commissionTierName: quote.commission.tierName,
    platformServiceFee: quote.breakdown.platformServiceFee,
    totalClientPrice: quote.breakdown.totalClientCharged,
    chefPayoutEstimated: quote.breakdown.chefNetPayout,
    fidelizationSavings: quote.commission.fidelizationSavings
  };
}

/**
 * Calcula la nueva media de valoración tras añadir una reseña real.
 */
export function calculateUpdatedChefRating(
  currentRating: number,
  currentReviewsCount: number,
  newRating: number
): { newRating: number; newReviewsCount: number } {
  if (currentReviewsCount <= 0) {
    return {
      newRating: Number(newRating.toFixed(2)),
      newReviewsCount: 1
    };
  }
  const totalScore = (currentRating * currentReviewsCount) + newRating;
  const newCount = currentReviewsCount + 1;
  const calculated = totalScore / newCount;
  return {
    newRating: Number(calculated.toFixed(2)),
    newReviewsCount: newCount
  };
}

// =========================================================================
// 3. INTEGRACIÓN CON SUPERMERCADOS ESPAÑOLES (CATÁLOGO OFICIAL)
// =========================================================================

export interface SupermarketProvider {
  id: 'dia' | 'mercadona' | 'carrefour' | 'alcampo';
  name: string;
  logo: string;
  brandColor: string;
  tagline: string;
  minOrder: number;
  deliveryFee: number;
  freeDeliveryThreshold: number;
  deliverySlots: string[];
  expressDeliveryAvailable: boolean;
  rating: number;
  isOfficialPartner: boolean;
}

export const SUPERMARKET_PROVIDERS: SupermarketProvider[] = [
  {
    id: 'dia',
    name: 'Supermercados DIA',
    logo: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=200&auto=format&fit=crop&q=80',
    brandColor: '#E20613',
    tagline: 'Partner Oficial TouChef — Cesta en 1 Clic con marcas propias DIA',
    minOrder: 20.0,
    deliveryFee: 4.99,
    freeDeliveryThreshold: 70.0,
    deliverySlots: [
      'Mañanas (08:00 - 10:00)',
      'Mediodía (11:00 - 13:00)',
      'Tarde (15:00 - 17:00)',
      'Noche (18:00 - 20:00)'
    ],
    expressDeliveryAvailable: true,
    rating: 4.8,
    isOfficialPartner: true
  },
  {
    id: 'mercadona',
    name: 'Mercadona Online',
    logo: 'https://images.unsplash.com/photo-1534723452862-4c874018d66d?w=200&auto=format&fit=crop&q=80',
    brandColor: '#007A33',
    tagline: 'Entrega estándar al día siguiente en franjas de 1 hora',
    minOrder: 50.0,
    deliveryFee: 7.21,
    freeDeliveryThreshold: 120.0,
    deliverySlots: ['Franja 1h según código postal'],
    expressDeliveryAvailable: false,
    rating: 4.7,
    isOfficialPartner: false
  },
  {
    id: 'carrefour',
    name: 'Carrefour Express / Drive',
    logo: 'https://images.unsplash.com/photo-1583258292688-d0213dc5a3a8?w=200&auto=format&fit=crop&q=80',
    brandColor: '#004F9F',
    tagline: 'Gama bio y frescos con entrega rápida en el mismo día',
    minOrder: 30.0,
    deliveryFee: 5.90,
    freeDeliveryThreshold: 100.0,
    deliverySlots: ['Entrega en 2h (Express)', 'Franjas de 2h estándar'],
    expressDeliveryAvailable: true,
    rating: 4.6,
    isOfficialPartner: false
  }
];
