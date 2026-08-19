import { ChefProfile, ChefBookingRequest, ChefReview, SupermarketProviderConfig } from '../types';

export const SUPERMARKET_PROVIDERS: SupermarketProviderConfig[] = [
  {
    id: 'dia',
    name: 'Supermercados DIA',
    logo: '🔴',
    minOrder: 20,
    deliveryFee: 4.99,
    freeDeliveryThreshold: 100,
    sameDayDelivery: true,
    earliestAvailableSlot: 'Hoy en 2h (JIT)',
    badge: 'Recomendado Oficial TouChef',
    directCheckoutSupported: true
  },
  {
    id: 'carrefour',
    name: 'Carrefour Express / Online',
    logo: '🔵',
    minOrder: 30,
    deliveryFee: 5.90,
    freeDeliveryThreshold: 120,
    sameDayDelivery: true,
    earliestAvailableSlot: 'Hoy 16:00 - 18:00',
    badge: 'Gran Variedad Bio',
    directCheckoutSupported: true
  },
  {
    id: 'amazon_fresh',
    name: 'Amazon Fresh',
    logo: '📦',
    minOrder: 35,
    deliveryFee: 3.99,
    freeDeliveryThreshold: 80,
    sameDayDelivery: true,
    earliestAvailableSlot: 'En 2 horas con Prime',
    badge: 'Ultra Rápido',
    directCheckoutSupported: true
  }
];

export const MOCK_CHEFS: ChefProfile[] = [
  {
    id: 'chef-marcos-valbuena',
    name: 'Marcos Valbuena',
    slug: 'marcos-valbuena',
    title: 'Chef Especialista en Batch Cooking Tradicional & Guisos Lentos',
    avatar: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=400&auto=format&fit=crop&q=80',
    bio: 'Ex-jefe de partida con 12 años de experiencia. Graduado en Basque Culinary Center. Especialista en orquestación de caldos reducidos, legumbres con fundamento y carnes mechadas a baja temperatura.',
    rating: 4.98,
    reviewsCount: 84,
    completedBookingsCount: 142,
    locationCity: 'Madrid',
    zones: ['Chamberí', 'Salamanca', 'Retiro', 'Pozuelo', 'Majadahonda'],
    isVerified: true,
    yearsExperience: 12,
    specialties: ['Batch Cooking Tradicional', 'Guisos Lentos', 'Sin Gluten', 'Caldo Hueso 24h'],
    pricing: {
      cookingHourRate: 24,
      groceryShoppingHourRate: 16,
      travelFee: 0,
      travelRadiusKm: 20,
      toolsIncluded: true,
      toolsExtraFee: 0,
      cleaningIncluded: true
    },
    availabilityDays: ['Viernes', 'Sábados', 'Domingos', 'Lunes'],
    timeSlots: ['Mañanas (09:00 - 13:30)', 'Tardes (15:30 - 20:00)'],
    badges: ['SuperChef', 'Manipulador Certificado', 'Seguro RC 50k€', 'Basque Culinary Center'],
    featuredDishes: [
      { name: 'Lentejas pardinas con sofrito lento de 40 min', image: '', category: 'Legumbres', prepTime: '45m' },
      { name: 'Ternera mechada en su propio jugo', image: '', category: 'Carnes', prepTime: '90m' },
      { name: 'Merluza fresca en salsa verde', image: '', category: 'Pescados', prepTime: '30m' },
      { name: 'Crema suave de calabaza asada', image: '', category: 'Cremas', prepTime: '35m' }
    ],
    reviews: [
      {
        id: 'rev-1',
        authorName: 'Carmen R.',
        rating: 5,
        date: '12 Ago 2026',
        comment: 'Marcos nos dejó 40 raciones organizadas en tuppers de borosilicato y la cocina más limpia que cuando llegó. Sabor espectacular.',
        dishNameOrType: 'Familiar 5 Días (40 raciones)',
        isVerifiedBooking: true
      },
      {
        id: 'rev-2',
        authorName: 'Javier M.',
        rating: 5,
        date: '05 Ago 2026',
        comment: 'Puntualidad absoluta y comida con calidad de restaurante Michelin. Mis hijos comen verduras sin protestar.',
        dishNameOrType: 'Mediterráneo Equilibrado',
        isVerifiedBooking: true
      }
    ]
  },
  {
    id: 'chef-clara-santamaria',
    name: 'Clara Santamaría',
    slug: 'clara-santamaria',
    title: 'Chef Nutricionista · Batch Cooking Fitness & High Protein (Macros)',
    avatar: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&auto=format&fit=crop&q=80',
    bio: 'Graduada en CETT Barcelona con posgrado en Nutrición Deportiva. Especialista en meal prep de alto rendimiento, pesado al gramo de macros y carnes magras.',
    rating: 4.96,
    reviewsCount: 112,
    completedBookingsCount: 198,
    locationCity: 'Barcelona',
    zones: ['Eixample', 'Sarrià-Sant Gervasi', 'Gràcia', 'Sant Cugat', 'Les Corts'],
    isVerified: true,
    yearsExperience: 9,
    specialties: ['Fitness & Macros', 'High Protein', 'Keto & Low Carb', 'Antiinflamatoria'],
    pricing: {
      cookingHourRate: 26,
      groceryShoppingHourRate: 18,
      travelFee: 5,
      travelRadiusKm: 25,
      toolsIncluded: true,
      toolsExtraFee: 0,
      cleaningIncluded: true
    },
    availabilityDays: ['Sábados', 'Domingos', 'Lunes', 'Martes'],
    timeSlots: ['Mañanas (08:30 - 13:00)', 'Tardes (16:00 - 20:30)'],
    badges: ['SuperChef', 'Manipulador Certificado', 'CETT Barcelona', 'Especialista Macros'],
    featuredDishes: [
      { name: 'Pechugas de corral marinadas con salvia y limón', image: '', category: 'Aves', prepTime: '30m' },
      { name: 'Salmón salvaje confitado con arroz jazmín', image: '', category: 'Pescados', prepTime: '25m' },
      { name: 'Lasaña proteica de láminas de calabacín', image: '', category: 'Bajas Calorías', prepTime: '40m' },
      { name: 'Bowl de quinoa con garbanzos crujientes', image: '', category: 'Veggie', prepTime: '20m' }
    ],
    reviews: [
      {
        id: 'rev-3',
        authorName: 'Sergio L.',
        rating: 5,
        date: '15 Ago 2026',
        comment: 'Ahorro 8 horas a la semana y cumplo mis macros al 100%. Clara es una profesional de otro nivel.',
        dishNameOrType: 'Fitness 4 Días (16 raciones)',
        isVerifiedBooking: true
      }
    ]
  },
  {
    id: 'chef-alejandro-ribera',
    name: 'Alejandro Ribera',
    slug: 'alejandro-ribera',
    title: 'Chef Mediterráneo · Arroces Secos, Pescados & Huertas de Temporada',
    avatar: 'https://images.unsplash.com/photo-1581299894007-aaa50297cf16?w=400&auto=format&fit=crop&q=80',
    bio: 'Formado en la Escuela de Hostelería de Valencia. Pasión por los productos de huerta de proximidad, caldos de morralla y sofritos confitados.',
    rating: 4.93,
    reviewsCount: 67,
    completedBookingsCount: 94,
    locationCity: 'Valencia',
    zones: ['Ruzafa', 'El Carmen', 'Cabañal', 'L’Horta Nord', 'Campanar'],
    isVerified: true,
    yearsExperience: 7,
    specialties: ['Mediterránea', 'Pescados & Mariscos', 'Arroces & Fideuàs', 'Verduras Huerta'],
    pricing: {
      cookingHourRate: 22,
      groceryShoppingHourRate: 15,
      travelFee: 0,
      travelRadiusKm: 15,
      toolsIncluded: true,
      toolsExtraFee: 0,
      cleaningIncluded: true
    },
    availabilityDays: ['Viernes', 'Sábados', 'Domingos'],
    timeSlots: ['Mañanas (09:00 - 14:00)', 'Tardes (16:00 - 21:00)'],
    badges: ['Manipulador Certificado', 'Escuela Valencia', 'Seguro RC 50k€'],
    featuredDishes: [
      { name: 'Suquet de merluza con gambón y patatas', image: '', category: 'Pescados', prepTime: '40m' },
      { name: 'Fideuà de verduras confitadas', image: '', category: 'Arroces', prepTime: '35m' },
      { name: 'Pollo de corral en pepitoria clásica', image: '', category: 'Aves', prepTime: '50m' },
      { name: 'Menestra de verduras de l’Horta', image: '', category: 'Verduras', prepTime: '30m' }
    ],
    reviews: [
      {
        id: 'rev-4',
        authorName: 'Marta G.',
        rating: 5,
        date: '08 Ago 2026',
        comment: 'Alejandro cocina como los ángeles. Los tuppers nos duraron frescos toda la semana.',
        dishNameOrType: 'Mediterráneo Tradicional',
        isVerifiedBooking: true
      }
    ]
  }
];

// ----------------------------------------------------
// BOOKING QUOTE CALCULATION ENGINE
// ----------------------------------------------------

export interface BookingQuoteParams {
  chefHourlyRate: number;
  hours: number;
  includeGrocery: boolean;
  groceryHourlyRate?: number;
  travelFee?: number;
  toolsFee?: number;
  cleaningFee?: number;
  estimatedIngredients?: number;
  completedBookingsWithChef?: number;
}

export interface BookingQuoteResult {
  cookingCost: number;
  groceryCost: number;
  travelCost: number;
  toolsCost: number;
  cleaningCost: number;
  ingredientsCost: number;
  subtotalServices: number;
  platformFee: number;
  totalClientPrice: number;
  chefPayout: number;
  commissionRatePercent: number;
}

export function calculateBookingQuote(params: BookingQuoteParams): BookingQuoteResult {
  const cookingCost = params.chefHourlyRate * params.hours;
  const groceryCost = params.includeGrocery ? (params.groceryHourlyRate || 16) * 1.5 : 0;
  const travelCost = params.travelFee || 0;
  const toolsCost = params.toolsFee || 0;
  const cleaningCost = params.cleaningFee || 0;
  const ingredientsCost = params.estimatedIngredients || 0;
  
  const subtotalServices = cookingCost + groceryCost + travelCost + toolsCost + cleaningCost;
  
  const bookings = params.completedBookingsWithChef || 0;
  let commissionRatePercent = 15;
  if (bookings >= 10) commissionRatePercent = 5;
  else if (bookings >= 4) commissionRatePercent = 8;
  
  const platformFee = Math.round(subtotalServices * (commissionRatePercent / 100) * 100) / 100;
  const totalClientPrice = Math.round((subtotalServices + platformFee + ingredientsCost) * 100) / 100;
  const chefPayout = Math.round((subtotalServices - (subtotalServices * (commissionRatePercent * 0.6 / 100))) * 100) / 100;

  return {
    cookingCost,
    groceryCost,
    travelCost,
    toolsCost,
    cleaningCost,
    ingredientsCost,
    subtotalServices,
    platformFee,
    totalClientPrice,
    chefPayout,
    commissionRatePercent
  };
}

// ----------------------------------------------------
// LOCAL STORAGE PERSISTENCE FOR CHEF BOOKINGS
// ----------------------------------------------------

const STORAGE_KEY_CHEF_BOOKINGS = 'touchef_chef_bookings';

export function loadChefBookingsFromStorage(): ChefBookingRequest[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY_CHEF_BOOKINGS);
    if (!raw) return getInitialDemoBookings();
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) return parsed;
  } catch (e) {
    console.error('Error loading chef bookings:', e);
  }
  return getInitialDemoBookings();
}

export function saveChefBookingsToStorage(bookings: ChefBookingRequest[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY_CHEF_BOOKINGS, JSON.stringify(bookings));
  } catch (e) {
    console.error('Error saving chef bookings:', e);
  }
}

export function saveChefBookingRequest(booking: ChefBookingRequest): void {
  const current = loadChefBookingsFromStorage();
  const updated = [booking, ...current.filter(b => b.id !== booking.id)];
  saveChefBookingsToStorage(updated);
}

export function applyToBroadcastBooking(bookingId: string, chef: ChefProfile, message: string): ChefBookingRequest[] {
  const current = loadChefBookingsFromStorage();
  const updated = current.map(b => {
    if (b.id === bookingId) {
      const existingApplicants = b.applicants || [];
      if (existingApplicants.some(a => a.chefId === chef.id)) return b;
      const newApp = {
        id: `app-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
        chefId: chef.id,
        chefName: chef.name,
        chefAvatar: chef.avatar,
        chefRating: chef.rating,
        chefHourlyRate: chef.pricing.cookingHourRate,
        chefSpecialties: chef.specialties,
        appliedAt: new Date().toISOString(),
        message: message.trim() || 'Hola, me encantaría preparar este menú. Cuento con disponibilidad completa en tu franja.',
        status: 'pending' as const
      };
      return {
        ...b,
        status: 'offers_received' as const,
        applicants: [newApp, ...existingApplicants]
      };
    }
    return b;
  });
  saveChefBookingsToStorage(updated);
  return updated;
}

export function acceptChefApplication(bookingId: string, applicantId: string): ChefBookingRequest[] {
  const current = loadChefBookingsFromStorage();
  const updated = current.map(b => {
    if (b.id === bookingId) {
      const applicant = (b.applicants || []).find(a => a.id === applicantId);
      if (!applicant) return b;
      const updatedApplicants = (b.applicants || []).map(a => ({
        ...a,
        status: a.id === applicantId ? ('accepted' as const) : ('declined' as const)
      }));
      return {
        ...b,
        status: 'confirmed' as const,
        chefId: applicant.chefId,
        chefName: applicant.chefName,
        chefAvatar: applicant.chefAvatar,
        applicants: updatedApplicants,
        updatedAt: new Date().toISOString()
      };
    }
    return b;
  });
  saveChefBookingsToStorage(updated);
  return updated;
}

function getInitialDemoBookings(): ChefBookingRequest[] {
  return [
    {
      id: 'TC-REQ-2026-002',
      customerId: 'user-demo-1',
      customerName: 'Laura Morales',
      customerPhone: '+34 612 345 678',
      address: 'Calle Ponzano 24, 2º B',
      postalCode: '28003',
      city: 'Madrid (Chamberí)',
      mealPlanTitle: 'Menú Batch Cooking Familiar Mediterráneo (40 raciones)',
      dishes: [
        { name: 'Lentejas Pardinas Tradicionales con Verduras', servings: 8 },
        { name: 'Ternera Estofada Muy Tierna en su Jugo', servings: 8 },
        { name: 'Pollo de Corral Asado al Limón con Romero', servings: 4 },
        { name: 'Crema Suave de Calabaza y Puerro Pochado', servings: 12 },
        { name: 'Lomos de Merluza Fresca con Patatas Panaderas', servings: 8 }
      ],
      peopleCount: 4,
      targetDate: '2026-08-25',
      targetTimeSlot: 'Mañanas (09:00 - 13:00)',
      estimatedHours: 3.5,
      includeGroceryShopping: true,
      includeCleaning: true,
      bringChefTools: true,
      grocerySource: 'supermarket_delivery',
      supermarketProvider: 'dia',
      isBroadcast: true,
      status: 'offers_received',
      costBreakdown: {
        cookingCost: 84,
        groceryServiceCost: 0,
        travelCost: 0,
        toolsCost: 0,
        cleaningCost: 0,
        ingredientsEstimatedCost: 48.50,
        platformServiceFee: 12.60,
        totalClientPrice: 145.10,
        chefPayoutEstimated: 84.00,
        commissionRatePercent: 15
      },
      applicants: [
        {
          id: 'app-marcos-1',
          chefId: 'chef-marcos-valbuena',
          chefName: 'Marcos Valbuena',
          chefAvatar: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=400&auto=format&fit=crop&q=80',
          chefRating: 4.98,
          chefHourlyRate: 24,
          chefSpecialties: ['Batch Cooking Tradicional', 'Guisos Lentos', 'Sin Gluten'],
          appliedAt: '2026-08-19T14:20:00Z',
          message: '¡Hola Laura! Tengo libre esa mañana de martes. Llevo mi propio set de cuchillos desinfectados. Me especializo en legumbres y guisos lentos para que las 40 raciones queden espectaculares.',
          status: 'pending'
        },
        {
          id: 'app-clara-2',
          chefId: 'chef-clara-santamaria',
          chefName: 'Clara Santamaría',
          chefAvatar: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&auto=format&fit=crop&q=80',
          chefRating: 4.96,
          chefHourlyRate: 26,
          chefSpecialties: ['Fitness & Macros', 'High Protein', 'Keto & Low Carb'],
          appliedAt: '2026-08-19T15:10:00Z',
          message: 'Hola! Puedo acudir a las 09:00 en Chamberí. Me encargo de envasar cada ración con etiquetas de conservación y dejar tu cocina impecable.',
          status: 'pending'
        }
      ],
      notes: 'Placa de inducción de 3 fuegos y fiambreras de borosilicato disponibles.',
      allergies: ['Sin alérgenos declarados'],
      createdAt: '2026-08-19T12:00:00Z',
      updatedAt: '2026-08-19T15:10:00Z'
    },
    {
      id: 'TC-REQ-2026-001',
      customerId: 'user-demo-1',
      customerName: 'Laura Morales',
      customerPhone: '+34 612 345 678',
      address: 'Calle Velázquez 48, 3º D',
      postalCode: '28001',
      city: 'Madrid (Salamanca)',
      mealPlanTitle: 'Batch Cooking Familiar Mediterráneo (40 raciones)',
      dishes: [
        { name: 'Lentejas Pardinas con Sofrito Lento', servings: 10 },
        { name: 'Ternera Mechada con Verduras', servings: 10 },
        { name: 'Merluza en Salsa Verde con Almejas', servings: 10 },
        { name: 'Crema de Calabaza y Jengibre', servings: 10 }
      ],
      peopleCount: 4,
      targetDate: '2026-08-23',
      targetTimeSlot: 'Mañanas (09:30 - 13:00)',
      estimatedHours: 3.5,
      includeGroceryShopping: true,
      includeCleaning: true,
      bringChefTools: true,
      grocerySource: 'chef',
      supermarketProvider: 'dia',
      chefId: 'chef-marcos-valbuena',
      chefName: 'Marcos Valbuena',
      chefAvatar: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=400&auto=format&fit=crop&q=80',
      isBroadcast: false,
      costBreakdown: {
        cookingCost: 84,
        groceryServiceCost: 24,
        travelCost: 0,
        toolsCost: 0,
        cleaningCost: 0,
        ingredientsEstimatedCost: 52.40,
        platformServiceFee: 12.50,
        totalClientPrice: 172.90,
        chefPayoutEstimated: 108.00,
        commissionRatePercent: 8
      },
      status: 'confirmed',
      notes: 'Placa de inducción de 4 fuegos y horno Bosch disponible. Tuppers de vidrio listos.',
      allergies: ['Sin gluten para 1 comensal'],
      createdAt: '2026-08-18T10:30:00Z',
      updatedAt: '2026-08-18T11:15:00Z'
    }
  ];
}
