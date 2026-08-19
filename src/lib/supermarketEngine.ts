import { BatchProject, BatchShoppingItem, SupermarketProviderConfig } from '../types';

export type SubstitutionPolicy = 'auto_cheapest' | 'require_approval' | 'refund';

export interface DeliverySlot {
  id: string;
  providerId: 'dia' | 'carrefour' | 'amazon_fresh';
  label: string;            // ej: "15:00 - 17:00"
  startHour: number;        // 15
  endHour: number;          // 17
  date: string;             // YYYY-MM-DD
  priceEuros: number;       // 4.99 o 0.00
  isAvailable: boolean;
  isCompatibleWithChef?: boolean;
}

export interface SupermarketBasketItem {
  id: string;
  originalShoppingItemId: string;
  name: string;
  commercialBrand: string;
  commercialPackage: string; // ej: "Bolsa 1 kg" | "Bandeja 500g" | "Malla 2 kg"
  category: string;
  quantityNeeded: number;
  packageCount: number;
  unitPriceEuros: number;
  totalPriceEuros: number;
  unit: string;
  supermarketSku: string;
  isAvailable: boolean;
  alternativeProduct?: {
    name: string;
    brand: string;
    priceEuros: number;
    differenceEuros: number;
  };
}

export interface SupermarketOrder {
  id: string;
  batchProjectId?: string;
  planTitle: string;
  provider: SupermarketProviderConfig;
  selectedSlot: DeliverySlot;
  substitutionPolicy: SubstitutionPolicy;
  items: SupermarketBasketItem[];
  itemsSubtotal: number;
  deliveryFee: number;
  totalOrderPrice: number;
  deliveryAddress: string;
  postalCode: string;
  city: string;
  status: 'draft' | 'awaiting_payment' | 'confirmed' | 'preparing' | 'out_for_delivery' | 'delivered';
  externalOrderId?: string;
  linkedChefBookingId?: string;
  createdAt: string;
  deliveredAt?: string;
}

// ----------------------------------------------------
// PRODUCT PRICING & SKU DATABASE (DIA Supermercados España)
// ----------------------------------------------------

export const DIA_PRODUCT_CATALOG: Record<string, {
  brand: string;
  pkg: string;
  unitPrice: number;
  ratioPerUnit: number; // Gramos o unidades por paquete
}> = {
  'lentejas pardinas': { brand: 'DIA Vegecampo', pkg: 'Paquete 1 kg', unitPrice: 1.89, ratioPerUnit: 1000 },
  'garbanzos pedrosillano': { brand: 'DIA Vegecampo', pkg: 'Paquete 1 kg', unitPrice: 1.95, ratioPerUnit: 1000 },
  'pechuga de pollo': { brand: 'DIA Selección Frescos', pkg: 'Bandeja 650g', unitPrice: 5.49, ratioPerUnit: 650 },
  'contramuslos de pollo': { brand: 'DIA Frescos', pkg: 'Bandeja 800g', unitPrice: 4.89, ratioPerUnit: 800 },
  'lomo de cerdo': { brand: 'DIA Frescos', pkg: 'Bandeja 500g', unitPrice: 3.99, ratioPerUnit: 500 },
  'salmón noruego': { brand: 'DIA Pescadería', pkg: '2 Lomos (300g)', unitPrice: 5.99, ratioPerUnit: 300 },
  'merluza en lomos': { brand: 'DIA Frescos', pkg: 'Bandeja 400g', unitPrice: 4.69, ratioPerUnit: 400 },
  'cebollas': { brand: 'DIA Huerta', pkg: 'Malla 2 kg', unitPrice: 2.19, ratioPerUnit: 2000 },
  'cebolla': { brand: 'DIA Huerta', pkg: 'Malla 2 kg', unitPrice: 2.19, ratioPerUnit: 2000 },
  'ajos': { brand: 'DIA Huerta', pkg: 'Malla 250g (4 cabezas)', unitPrice: 1.49, ratioPerUnit: 250 },
  'zanahorias': { brand: 'DIA Huerta', pkg: 'Bolsa 1 kg', unitPrice: 0.99, ratioPerUnit: 1000 },
  'calabacín': { brand: 'DIA Huerta', pkg: 'Bolsa 1 kg', unitPrice: 1.79, ratioPerUnit: 1000 },
  'calabaza': { brand: 'DIA Huerta', pkg: 'Trozo 800g', unitPrice: 1.99, ratioPerUnit: 800 },
  'pimientos verdes': { brand: 'DIA Huerta', pkg: 'Bolsa 500g', unitPrice: 1.49, ratioPerUnit: 500 },
  'pimientos rojos': { brand: 'DIA Huerta', pkg: 'Bolsa 500g', unitPrice: 1.89, ratioPerUnit: 500 },
  'patatas': { brand: 'DIA Huerta', pkg: 'Malla 3 kg', unitPrice: 3.49, ratioPerUnit: 3000 },
  'arroz redondo': { brand: 'DIA Bocado', pkg: 'Paquete 1 kg', unitPrice: 1.35, ratioPerUnit: 1000 },
  'arroz integral': { brand: 'DIA Bocado', pkg: 'Paquete 1 kg', unitPrice: 1.65, ratioPerUnit: 1000 },
  'quinoa': { brand: 'DIA Vital', pkg: 'Paquete 500g', unitPrice: 2.29, ratioPerUnit: 500 },
  'aceite de oliva virgen extra': { brand: 'DIA Almazara', pkg: 'Botella 1 L', unitPrice: 8.95, ratioPerUnit: 1000 },
  'huevos camperos': { brand: 'DIA Frescos', pkg: 'Docena (12 uds)', unitPrice: 2.69, ratioPerUnit: 12 },
  'tomate triturado': { brand: 'DIA Selección', pkg: 'Lata 800g', unitPrice: 1.15, ratioPerUnit: 800 },
  'caldo de pollo': { brand: 'DIA Tradición', pkg: 'Brik 1 L', unitPrice: 1.25, ratioPerUnit: 1000 },
  'caldo de verduras': { brand: 'DIA Tradición', pkg: 'Brik 1 L', unitPrice: 1.25, ratioPerUnit: 1000 }
};

// ----------------------------------------------------
// BASKET BUILDER & CONVERTER
// ----------------------------------------------------

export function buildSupermarketBasket(shoppingList: BatchShoppingItem[]): SupermarketBasketItem[] {
  return shoppingList
    .filter(item => !item.isBought && item.toBuyQty > 0)
    .map(item => {
      const key = item.name.toLowerCase().trim();
      const match = DIA_PRODUCT_CATALOG[key] || {
        brand: 'DIA Básico',
        pkg: `Unidad estándar (${item.unit})`,
        unitPrice: item.estimatedPriceEuros || 2.49,
        ratioPerUnit: 1
      };

      const packageCount = Math.max(1, Math.ceil(item.toBuyQty / (match.ratioPerUnit || 1)));
      const totalPriceEuros = Math.round(packageCount * match.unitPrice * 100) / 100;

      return {
        id: `dia-item-${item.id}`,
        originalShoppingItemId: item.id,
        name: item.name,
        commercialBrand: match.brand,
        commercialPackage: match.pkg,
        category: item.category,
        quantityNeeded: item.toBuyQty,
        packageCount,
        unitPriceEuros: match.unitPrice,
        totalPriceEuros,
        unit: item.unit,
        supermarketSku: `DIA-${item.id.slice(0, 6).toUpperCase()}`,
        isAvailable: true,
        alternativeProduct: {
          name: `${item.name} (Opción Gourmet DIA Selección)`,
          brand: 'DIA Selección',
          priceEuros: Math.round((match.unitPrice * 1.2) * 100) / 100,
          differenceEuros: Math.round((match.unitPrice * 0.2) * 100) / 100
        }
      };
    });
}

// ----------------------------------------------------
// REVERSE-TIMING SCHEDULER ALGORITHM
// Regla: latestDeliveryTime <= cookStart - deliveryBuffer (2h)
// ----------------------------------------------------

export interface ReverseTimingAnalysis {
  cookStartTime: string;            // ej: "18:00"
  deliveryBufferHours: number;      // 2
  latestAcceptableDelivery: string; // "16:00"
  isSlotCompatible: boolean;
  recommendedSlotLabel: string;
  compatibilityMessage: string;
}

export function evaluateReverseTiming(params: {
  cookTimeSlot: string;             // ej: "18:00 - 21:00"
  deliverySlotStartHour: number;    // ej: 15
  deliverySlotEndHour: number;      // ej: 17
  bufferHours?: number;             // default 2h
}): ReverseTimingAnalysis {
  const buffer = params.bufferHours ?? 2;
  
  // Extract start hour of cooking (e.g. "18:00 - 21:00" -> 18)
  const cookStartHourMatch = params.cookTimeSlot.match(/^(\d{1,2})/);
  const cookStartHour = cookStartHourMatch ? parseInt(cookStartHourMatch[1], 10) : 18;

  const latestAcceptableHour = cookStartHour - buffer;
  const isSlotCompatible = params.deliverySlotEndHour <= cookStartHour;

  const latestDeliveryFormatted = `${String(latestAcceptableHour).padStart(2, '0')}:00`;
  const cookStartFormatted = `${String(cookStartHour).padStart(2, '0')}:00`;

  let compatibilityMessage = '';
  if (params.deliverySlotEndHour <= latestAcceptableHour) {
    compatibilityMessage = `✓ Franja óptima: DIA entrega antes de las ${latestDeliveryFormatted} (${buffer}h de margen antes de que llegue el chef a las ${cookStartFormatted}).`;
  } else if (params.deliverySlotEndHour <= cookStartHour) {
    compatibilityMessage = `⚠️ Franja ajustada: Los ingredientes llegarán a las ${params.deliverySlotEndHour}:00, justo antes del inicio de cocina a las ${cookStartFormatted}.`;
  } else {
    compatibilityMessage = `❌ Franja incompatible: El supermercado entregaría después de que empiece la sesión de cocina (${cookStartFormatted}).`;
  }

  return {
    cookStartTime: cookStartFormatted,
    deliveryBufferHours: buffer,
    latestAcceptableDelivery: latestDeliveryFormatted,
    isSlotCompatible,
    recommendedSlotLabel: `${latestAcceptableHour - 2}:00 - ${latestAcceptableHour}:00`,
    compatibilityMessage
  };
}

export function generateMockDeliverySlots(dateStr: string, cookTimeSlot: string = '18:00 - 21:00'): DeliverySlot[] {
  const baseSlots = [
    { id: 'dia-slot-1', providerId: 'dia' as const, label: '09:00 - 11:00', startHour: 9, endHour: 11, priceEuros: 4.99 },
    { id: 'dia-slot-2', providerId: 'dia' as const, label: '11:00 - 13:00', startHour: 11, endHour: 13, priceEuros: 4.99 },
    { id: 'dia-slot-3', providerId: 'dia' as const, label: '15:00 - 17:00', startHour: 15, endHour: 17, priceEuros: 4.99 },
    { id: 'dia-slot-4', providerId: 'dia' as const, label: '17:00 - 19:00', startHour: 17, endHour: 19, priceEuros: 4.99 },
    { id: 'dia-slot-5', providerId: 'dia' as const, label: '19:00 - 21:00', startHour: 19, endHour: 21, priceEuros: 4.99 }
  ];

  return baseSlots.map(slot => {
    const analysis = evaluateReverseTiming({
      cookTimeSlot,
      deliverySlotStartHour: slot.startHour,
      deliverySlotEndHour: slot.endHour,
      bufferHours: 1
    });

    return {
      ...slot,
      date: dateStr,
      isAvailable: true,
      isCompatibleWithChef: analysis.isSlotCompatible
    };
  });
}

// ----------------------------------------------------
// LOCAL STORAGE PERSISTENCE FOR SUPERMARKET ORDERS
// ----------------------------------------------------

const STORAGE_KEY_SUPERMARKET_ORDERS = 'touchef_supermarket_orders';

export function loadSupermarketOrdersFromStorage(): SupermarketOrder[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY_SUPERMARKET_ORDERS);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) return parsed;
  } catch (e) {
    console.error('Error loading supermarket orders:', e);
  }
  return [];
}

export function saveSupermarketOrderToStorage(order: SupermarketOrder): void {
  if (typeof window === 'undefined') return;
  try {
    const existing = loadSupermarketOrdersFromStorage();
    const updated = [order, ...existing.filter(o => o.id !== order.id)];
    localStorage.setItem(STORAGE_KEY_SUPERMARKET_ORDERS, JSON.stringify(updated));
  } catch (e) {
    console.error('Error saving supermarket order:', e);
  }
}
