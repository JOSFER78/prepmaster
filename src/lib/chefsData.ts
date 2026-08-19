import { ChefProfile, ChefBookingRequest, ChefServicePricing } from '../types';
import { calculateAntiFugaQuote, TierCommissionResult } from './antiFugaEngine';

// =========================================================================
// 1. CHEF BOOTSTRAP POLICY & REAL CHEF DATA STORE
// =========================================================================
export const APPROVED_BOOTSTRAP_CHEF_EMAIL = 'usajosefernan@gmail.com';

export const BOOTSTRAP_CHEF_PROFILE: ChefProfile = {
  id: 'chef-jose-fernandez',
  email: 'usajosefernan@gmail.com',
  slug: 'jose-fernandez',
  title: 'Especialista en Batch Cooking Mediterráneo & Guisos Saludables',
  name: 'José Fernández',
  avatar: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=400&auto=format&fit=crop&q=80',
  bio: 'Chef profesional especializado en Batch Cooking tradicional español (Cocina con Carmen) y guisos de alta conservación. Manipulador de alimentos certificado con más de 10 años de experiencia.',
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
    assistantHourRate: 15.0,
    travelFee: 5.0,
    travelRadiusKm: 15,
    toolsIncluded: true,
    toolsExtraFee: 0.0,
    cleaningIncluded: true,
    cleaningHourRate: 0.0
  },
  availabilityDays: ['Lunes', 'Miércoles', 'Viernes', 'Domingos'],
  timeSlots: ['Mañanas (09:00 - 14:00)', 'Tardes (16:00 - 21:00)'],
  badges: ['Chef Verificado', 'Higiene Certificada', 'Superhost', 'Top Batch Cooker'],
  hasFoodHandlerCertificate: true,
  foodHandlerCertificateNumber: 'CERT-MAD-2026-9882',
  allergenManagementCertified: true,
  haccpCompliance: true,
  featuredDishes: [],
  reviews: []
};

export const APPROVED_CHEFS: ChefProfile[] = [BOOTSTRAP_CHEF_PROFILE];
export const MOCK_CHEFS: ChefProfile[] = APPROVED_CHEFS;

// Claves de almacenamiento Firestore
export const CHEF_BOOKINGS_STORAGE_KEY = 'touchef_chef_bookings_v2';
export const APPROVED_CHEFS_STORAGE_KEY = 'touchef_approved_chefs_v2';

let inMemoryChefs: ChefProfile[] = [BOOTSTRAP_CHEF_PROFILE];
let inMemoryBookings: ChefBookingRequest[] = [];

export function loadApprovedChefsFromStorage(): ChefProfile[] {
  return inMemoryChefs;
}

export function saveApprovedChefsToStorage(chefs: ChefProfile[]): void {
  inMemoryChefs = chefs;
}

export function loadChefBookingsFromStorage(): ChefBookingRequest[] {
  return inMemoryBookings;
}

export function saveChefBookingsToStorage(bookings: ChefBookingRequest[]): void {
  inMemoryBookings = bookings;
}

// =========================================================================
// 2. MOTOR DE COTIZACIÓN Y COMISIONES (INTEGRADO CON ANTI-FUGA)
// =========================================================================

export interface BookingQuoteParams {
  chefHourlyRate?: number;
  hours: number;
  includeGrocery?: boolean;
  groceryHourlyRate?: number;
  groceryHours?: number;
  bringTools?: boolean;
  hasAssistant?: boolean;
  assistantHours?: number;
  travelFee?: number;
  toolsFee?: number;
  cleaningFee?: number;
  estimatedIngredients?: number;
  completedBookingsWithChef?: number;
  isChefProSubscriber?: boolean;
  isClientPlusSubscriber?: boolean;
}

export function calculateBookingQuote(params: BookingQuoteParams) {
  const dummyChef: ChefProfile = {
    ...BOOTSTRAP_CHEF_PROFILE,
    pricing: {
      ...BOOTSTRAP_CHEF_PROFILE.pricing,
      cookingHourRate: params.chefHourlyRate || 25,
      groceryShoppingHourRate: params.groceryHourlyRate || 18,
      toolsExtraFee: params.toolsFee || 0,
      travelFee: params.travelFee || 5
    }
  };

  const quote: TierCommissionResult = calculateAntiFugaQuote({
    chef: dummyChef,
    hours: params.hours,
    includeGrocery: !!params.includeGrocery,
    groceryHours: params.groceryHours || 1.0,
    bringTools: !!params.bringTools,
    hasAssistant: !!params.hasAssistant,
    assistantHours: params.assistantHours || params.hours,
    includeCleaning: (params.cleaningFee || 0) > 0,
    ingredientsCost: params.estimatedIngredients || 0,
    completedBookingsWithChef: params.completedBookingsWithChef || 0,
    isChefProSubscriber: params.isChefProSubscriber || false,
    isClientPlusSubscriber: params.isClientPlusSubscriber || false
  });

  return {
    cookingCost: quote.cookingCost,
    groceryCost: quote.groceryCost,
    toolsCost: quote.toolsFee,
    assistantCost: quote.assistantCost,
    travelCost: quote.travelFee,
    cleaningCost: quote.cleaningFee,
    ingredientsEstimatedCost: quote.ingredientsEstimatedCost,
    commissionRate: quote.commissionPercent,
    commissionTierName: quote.tierLabel,
    platformServiceFee: quote.platformFee,
    totalClientPrice: quote.totalClientPrice,
    chefPayoutEstimated: quote.chefNetPayout,
    fidelizationSavings: quote.loyaltyDiscountEuros
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
