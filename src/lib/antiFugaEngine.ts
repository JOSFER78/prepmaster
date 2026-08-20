import { ChefBookingRequest, ChefProfile, KitchenProfile } from '../types';

export interface TierCommissionResult {
  bookingCountWithChef: number;
  tierLabel: string;
  commissionPercent: number;
  cookingHours: number;
  cookingHourRate: number;
  cookingCost: number;
  groceryCost: number;
  toolsFee: number;
  assistantCost: number;
  travelFee: number;
  cleaningFee: number;
  ingredientsEstimatedCost: number;
  commissionableBase: number;
  platformFee: number;
  chefNetPayout: number;
  totalClientPrice: number;
  clientSavingsVsFlatCommission: number;
  loyaltyDiscountEuros: number;
}

export function calculateAntiFugaQuote(params: {
  chef: ChefProfile;
  hours: number;
  includeGrocery: boolean;
  groceryHours?: number;
  bringTools?: boolean;
  hasAssistant?: boolean;
  assistantHours?: number;
  includeCleaning?: boolean;
  ingredientsCost?: number;
  completedBookingsWithChef?: number;
  isChefProSubscriber?: boolean;
  isClientPlusSubscriber?: boolean;
}): TierCommissionResult {
  const bookingCount = params.completedBookingsWithChef || 0;
  
  // 1. TIER COMMISSION RATE DECREASING SCALE
  let tierLabel = 'Primera Reserva (Matching & Verificación)';
  let commissionPercent = 15;

  if (params.isChefProSubscriber) {
    tierLabel = 'Plan Chef Pro (Suscripción + 3%)';
    commissionPercent = 3;
  } else if (bookingCount >= 4) {
    tierLabel = 'Fidelidad Nivel 3 (5+ Reservas - Retención Máxima)';
    commissionPercent = 5;
  } else if (bookingCount >= 1) {
    tierLabel = 'Fidelidad Nivel 2 (2-4 Reservas - Tarifa Reducida)';
    commissionPercent = 8;
  }

  // Client Plus discount if subscribed
  if (params.isClientPlusSubscriber && commissionPercent > 5) {
    commissionPercent -= 2;
    tierLabel += ' + Descuento TouChef Plus (-2%)';
  }

  // 2. DISAGGREGATED COSTS
  const cookingCost = (params.chef.pricing?.cookingHourRate || 25) * params.hours;
  const groceryCost = params.includeGrocery 
    ? (params.chef.pricing?.groceryShoppingHourRate || 18) * (params.groceryHours || 1)
    : 0;
  const toolsFee = (params.bringTools && params.chef.pricing?.toolsExtraFee) ? params.chef.pricing.toolsExtraFee : 0;
  const assistantCost = (params.hasAssistant && params.chef.pricing?.assistantHourRate) 
    ? params.chef.pricing.assistantHourRate * (params.assistantHours || params.hours) 
    : 0;
  const travelFee = params.chef.pricing?.travelFee || 0;
  const cleaningFee = (params.includeCleaning && params.chef.pricing?.cleaningHourRate) ? params.chef.pricing.cleaningHourRate : 0;
  const ingredientsCost = params.ingredientsCost || 0;

  // 3. ZERO COMMISSION ON RAW INGREDIENTS (0% sobre el coste de la comida)
  const commissionableBase = cookingCost + groceryCost + toolsFee + assistantCost + travelFee + cleaningFee;
  
  const platformFee = Math.round(commissionableBase * (commissionPercent / 100) * 100) / 100;
  const chefNetPayout = Math.round((commissionableBase - platformFee) * 100) / 100;
  const totalClientPrice = Math.round((commissionableBase + ingredientsCost) * 100) / 100;

  // Savings comparison vs traditional 20% flat take
  const flatFeeAt20 = commissionableBase * 0.20;
  const clientSavingsVsFlatCommission = Math.max(0, Math.round((flatFeeAt20 - platformFee) * 100) / 100);
  const loyaltyDiscountEuros = Math.max(0, Math.round((commissionableBase * (0.15 - (commissionPercent / 100))) * 100) / 100);

  return {
    bookingCountWithChef: bookingCount,
    tierLabel,
    commissionPercent,
    cookingHours: params.hours,
    cookingHourRate: params.chef.pricing?.cookingHourRate || 25,
    cookingCost,
    groceryCost,
    toolsFee,
    assistantCost,
    travelFee,
    cleaningFee,
    ingredientsEstimatedCost: ingredientsCost,
    commissionableBase,
    platformFee,
    chefNetPayout,
    totalClientPrice,
    clientSavingsVsFlatCommission,
    loyaltyDiscountEuros
  };
}

// ----------------------------------------------------
// HOUSEHOLD KITCHEN MEMORY DEFAULTS
// ----------------------------------------------------

export interface HouseholdMemory {
  stoveType: 'induccion' | 'vitro' | 'gas' | 'mixta';
  burnersCount: number;
  ovenAvailable: boolean;
  kitchenRobotAvailable: boolean;
  kitchenRobotModel?: string;
  glassTupperwareCount: number;
  allergiesOrIntolerances: string[];
  dietaryPreferences: string[];
  kitchenRulesNotes: string;
  lastUsedChefNotes?: string;
}

export function getDefaultHouseholdMemory(): HouseholdMemory {
  return {
    stoveType: 'vitro',
    burnersCount: 3,
    ovenAvailable: true,
    kitchenRobotAvailable: false,
    glassTupperwareCount: 8,
    allergiesOrIntolerances: ['Sin alérgenos graves declarados'],
    dietaryPreferences: ['Mediterránea Tradicional', 'Equilibrada'],
    kitchenRulesNotes: 'Frigorífico con 2 baldas despejadas para fiambreras. Zona de reciclaje bajo el fregadero.'
  };
}
