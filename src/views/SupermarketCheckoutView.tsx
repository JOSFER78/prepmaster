import React, { useState, useMemo } from 'react';
import { 
  ShoppingBag, 
  Clock, 
  ShieldCheck, 
  MapPin, 
  Calendar, 
  ArrowRight, 
  CheckCircle2, 
  AlertTriangle, 
  ExternalLink, 
  Sparkles, 
  Check, 
  ChefHat, 
  Info,
  ChevronRight,
  RotateCcw,
  Store,
  Truck
} from 'lucide-react';
import { BatchProject, ViewState, SupermarketProviderConfig } from '../types';
import { SUPERMARKET_PROVIDERS } from '../lib/chefsData';
import { 
  buildSupermarketBasket, 
  evaluateReverseTiming, 
  generateAvailableDeliverySlots, 
  SupermarketBasketItem,
  DeliverySlot,
  SubstitutionPolicy,
  SupermarketOrder
} from '../lib/supermarketEngine';
import { saveSupermarketOrder } from '../services/supermarketService';

interface SupermarketCheckoutViewProps {
  activeProject: BatchProject | null;
  onNavigate: (view: ViewState) => void;
  onOrderConfirmed?: (order: SupermarketOrder) => void;
}

export const SupermarketCheckoutView: React.FC<SupermarketCheckoutViewProps> = ({
  activeProject,
  onNavigate,
  onOrderConfirmed
}) => {
  const [selectedProviderId, setSelectedProviderId] = useState<'dia' | 'carrefour' | 'mercadona' | 'alcampo' | 'amazon_fresh'>('dia');
  const [deliveryDate, setDeliveryDate] = useState<string>(() => {
    return activeProject?.plannedShoppingDate || new Date().toISOString().split('T')[0];
  });
  const [targetCookSlot, setTargetCookSlot] = useState<string>('18:00 - 21:00');
  const [selectedSlotId, setSelectedSlotId] = useState<string>('dia-slot-3'); // 15:00 - 17:00
  const [substitutionPolicy, setSubstitutionPolicy] = useState<SubstitutionPolicy>('auto_cheapest');
  const [deliveryAddress, setDeliveryAddress] = useState<string>('Calle Mayor 14, 3º B');
  const [postalCode, setPostalCode] = useState<string>('28013');
  const [city, setCity] = useState<string>('Madrid');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [orderCompleted, setOrderCompleted] = useState<SupermarketOrder | null>(null);

  const selectedProvider = SUPERMARKET_PROVIDERS.find(p => p.id === selectedProviderId) || SUPERMARKET_PROVIDERS[0];

  // Build basket from active project shopping list
  const initialBasket = useMemo(() => {
    return activeProject ? buildSupermarketBasket(activeProject.shoppingList) : [];
  }, [activeProject]);

  const [basketItems, setBasketItems] = useState<SupermarketBasketItem[]>(initialBasket);

  // Available slots for selected date
  const availableSlots = useMemo(() => {
    return generateAvailableDeliverySlots(deliveryDate, targetCookSlot);
  }, [deliveryDate, targetCookSlot]);

  const selectedSlot = availableSlots.find(s => s.id === selectedSlotId) || availableSlots[0];

  // Timing analysis
  const timingAnalysis = useMemo(() => {
    return evaluateReverseTiming({
      cookTimeSlot: targetCookSlot,
      deliverySlotStartHour: selectedSlot.startHour,
      deliverySlotEndHour: selectedSlot.endHour,
      bufferHours: 2
    });
  }, [targetCookSlot, selectedSlot]);

  // Order totals
  const itemsSubtotal = useMemo(() => {
    return Math.round(basketItems.reduce((acc, item) => acc + item.totalPriceEuros, 0) * 100) / 100;
  }, [basketItems]);

  const isFreeDelivery = selectedProvider.freeDeliveryThreshold 
    ? itemsSubtotal >= selectedProvider.freeDeliveryThreshold 
    : false;

  const deliveryFee = isFreeDelivery ? 0 : selectedProvider.deliveryFee;
  const totalOrderPrice = Math.round((itemsSubtotal + deliveryFee) * 100) / 100;

  const handleToggleAlternative = (itemId: string) => {
    setBasketItems(prev => prev.map(item => {
      if (item.id === itemId && item.alternativeProduct) {
        return {
          ...item,
          name: item.alternativeProduct.name,
          commercialBrand: item.alternativeProduct.brand,
          unitPriceEuros: item.alternativeProduct.priceEuros,
          totalPriceEuros: Math.round(item.packageCount * item.alternativeProduct.priceEuros * 100) / 100
        };
      }
      return item;
    }));
  };

  const handleConfirmSupermarketOrder = async () => {
    setIsSubmitting(true);
    const order: SupermarketOrder = {
      id: `dia-order-${Date.now()}`,
      batchProjectId: activeProject?.id,
      planTitle: activeProject?.title || 'Compra Batch Cooking',
      provider: selectedProvider as any,
      selectedSlot,
      substitutionPolicy,
      items: basketItems,
      itemsSubtotal,
      deliveryFee,
      totalOrderPrice,
      deliveryAddress,
      postalCode,
      city,
      status: 'confirmed',
      externalOrderId: `DIA-ES-${Math.floor(100000 + Math.random() * 900000)}`,
      createdAt: new Date().toISOString()
    };

    try {
      await saveSupermarketOrder(order);
    } catch (e) {
      console.warn('Firestore supermarket order save warning:', e);
    }

    setIsSubmitting(false);
    setOrderCompleted(order);
    if (onOrderConfirmed) {
      onOrderConfirmed(order);
    }
  };

  const handleOpenExternalDIA = () => {
    window.open('https://www.dia.es/compra-online', '_blank');
  };

  if (!activeProject) {
    return (
      <div className="max-w-2xl mx-auto py-12 px-4 text-center space-y-4">
        <div className="w-16 h-16 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center mx-auto">
          <ShoppingBag size={28} />
        </div>
        <h2 className="text-xl font-bold text-zinc-900 dark:text-white">No hay ninguna lista de ingredientes activa</h2>
        <p className="text-xs text-zinc-600 dark:text-zinc-400">
          Genera un menú semanal con IA para crear automáticamente la cesta coordinada con Supermercados DIA.
        </p>
        <button
          onClick={() => onNavigate({ name: 'ai-generator' })}
          className="btn-hero-copper text-xs font-bold px-5 py-2.5 rounded-xl"
        >
          Generar Menú con IA
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-6 animate-in fade-in duration-300">
      
      {/* SUCCESS CONFIRMATION MODAL / BANNER */}
      {orderCompleted ? (
        <div className="bg-white dark:bg-zinc-900 border-2 border-emerald-500/40 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl animate-in zoom-in-95">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center shrink-0">
              <CheckCircle2 size={32} />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider bg-emerald-500/20 text-emerald-300 px-2.5 py-0.5 rounded-full">
                Pedido Coordinado con Éxito
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-zinc-900 dark:text-white mt-1">
                Compra Programada en Supermercados DIA
              </h2>
              <p className="text-xs text-zinc-700 dark:text-zinc-300">
                Nº de Localizador: <span className="font-mono font-bold text-amber-400">{orderCompleted.externalOrderId}</span>
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 bg-zinc-50 dark:bg-zinc-800 rounded-2xl border border-zinc-200 dark:border-zinc-800 text-xs">
            <div>
              <span className="text-zinc-600 dark:text-zinc-400 block">Franja de Entrega DIA:</span>
              <strong className="text-zinc-900 dark:text-white text-sm">{orderCompleted.selectedSlot.date} ({orderCompleted.selectedSlot.label})</strong>
            </div>
            <div>
              <span className="text-zinc-600 dark:text-zinc-400 block">Dirección de Entrega:</span>
              <strong className="text-zinc-900 dark:text-white truncate block">{orderCompleted.deliveryAddress}, {orderCompleted.city}</strong>
            </div>
            <div>
              <span className="text-zinc-600 dark:text-zinc-400 block">Total Compra ({orderCompleted.items.length} productos):</span>
              <strong className="text-amber-400 text-base font-black">{orderCompleted.totalOrderPrice} €</strong>
            </div>
          </div>

          {/* Connect with Chef Prompt */}
          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500 text-stone-950 flex items-center justify-center font-bold shrink-0">
                <ChefHat size={20} />
              </div>
              <div className="text-xs">
                <strong className="text-amber-200 block">¿Quieres que un cocinero prepare esta compra en tu cocina?</strong>
                <span className="text-zinc-600 dark:text-zinc-400 text-[11px]">La compra llegará antes de las {orderCompleted.selectedSlot.endHour}:00, perfecta para una sesión de tarde.</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => onNavigate({ name: 'chefs' })}
                className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs shadow-md transition-all flex items-center gap-1.5"
              >
                <ChefHat size={14} />
                <span>Reservar Chef para este Lote</span>
              </button>
            </div>
          </div>

          <div className="flex justify-between items-center pt-2">
            <button
              onClick={() => onNavigate({ name: 'shopping-list' })}
              className="text-xs text-zinc-600 dark:text-zinc-400 hover:text-white"
            >
              ← Volver a Lista de Compra
            </button>
            <button
              onClick={() => onNavigate({ name: 'home' })}
              className="px-5 py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-white font-bold text-xs"
            >
              Ir al Dashboard
            </button>
          </div>
        </div>
      ) : (
        <>
          {/* HEADER HERO */}
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-stone-900 via-rose-950/40 to-stone-900 border border-rose-500/20 p-6 sm:p-8 shadow-xl">
            <div className="relative z-10 space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-bold uppercase tracking-wider">
                <Truck size={14} />
                <span>Logística Inteligente de Ingredientes Frescos</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white">
                Cesta Automatizada en <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-amber-300">Supermercados DIA</span>
              </h1>
              <p className="text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 max-w-2xl leading-relaxed">
                Mapeo exacto de los ingredientes para tu menú de {activeProject.totalServings} raciones. El algoritmo calcula la franja óptima para que la compra llegue antes de cocinar.
              </p>
            </div>
          </div>

          {/* 2-COLUMN MAIN WORKFLOW */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* LEFT COLUMN: PROVIDER, TIMING & BASKET (7 COLS) */}
            <div className="lg:col-span-7 space-y-5">
              
              {/* 1. Provider Switcher */}
              <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 space-y-3">
                <div className="text-xs font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-400 flex items-center justify-between">
                  <span>1. Supermercado Seleccionado</span>
                  <span className="text-rose-700 dark:text-rose-400 font-bold text-[11px]">Entrega el mismo día</span>
                </div>

                <div className="grid grid-cols-3 gap-2.5">
                  {SUPERMARKET_PROVIDERS.map(prov => (
                    <button
                      key={prov.id}
                      onClick={() => setSelectedProviderId(prov.id)}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        selectedProviderId === prov.id
                          ? 'bg-rose-500/15 border-rose-500 text-rose-700 dark:text-rose-300 shadow-xs font-bold'
                          : 'bg-zinc-50 dark:bg-zinc-800/60 border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:border-zinc-200 dark:border-zinc-700'
                      }`}
                    >
                      <div className="font-bold text-xs">{prov.logo}</div>
                      <div className="text-[10px] text-zinc-600 dark:text-zinc-400 mt-1">Envío: {prov.deliveryFee} €</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* 2. Reverse-Timing Slot Visualizer */}
              <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400 flex items-center gap-1.5 font-bold">
                    <Clock size={15} />
                    <span>2. Algoritmo de Franja Temporal Inversa</span>
                  </div>
                  <span className="text-[10px] font-mono bg-amber-500/15 text-amber-800 dark:text-amber-300 font-bold px-2 py-0.5 rounded">
                    Margen de Seguridad: 2 horas
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-bold text-zinc-600 dark:text-zinc-400 block mb-1">Fecha de la compra:</label>
                    <input
                      type="date"
                      value={deliveryDate}
                      onChange={(e) => setDeliveryDate(e.target.value)}
                      className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl p-2.5 text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-zinc-600 dark:text-zinc-400 block mb-1">Hora inicio cocinado (o Chef):</label>
                    <select
                      value={targetCookSlot}
                      onChange={(e) => setTargetCookSlot(e.target.value)}
                      className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl p-2.5 text-xs text-white"
                    >
                      <option value="12:00 - 15:00">Mediodía (12:00)</option>
                      <option value="16:00 - 19:00">Tarde Temprana (16:00)</option>
                      <option value="18:00 - 21:00">Tarde-Noche (18:00)</option>
                      <option value="19:00 - 22:00">Noche (19:00)</option>
                    </select>
                  </div>
                </div>

                {/* Live Compatibility Banner */}
                <div className={`p-3 rounded-xl border text-xs flex items-center gap-2.5 ${
                  timingAnalysis.isSlotCompatible 
                    ? 'bg-emerald-950/30 border-emerald-500/30 text-emerald-300' 
                    : 'bg-rose-950/30 border-rose-500/30 text-rose-300'
                }`}>
                  {timingAnalysis.isSlotCompatible ? <CheckCircle2 size={16} /> : <AlertTriangle size={16} />}
                  <span>{timingAnalysis.compatibilityMessage}</span>
                </div>

                {/* Slots Grid */}
                <div>
                  <label className="text-[11px] font-bold text-zinc-600 dark:text-zinc-400 block mb-1.5">Seleccionar Franja DIA:</label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {availableSlots.map(slot => (
                      <button
                        key={slot.id}
                        onClick={() => setSelectedSlotId(slot.id)}
                        className={`p-2.5 rounded-xl border text-left transition-all ${
                          selectedSlotId === slot.id
                            ? 'bg-amber-500/15 border-amber-500 text-amber-900 dark:text-amber-200 font-bold shadow-xs'
                            : 'bg-zinc-50 dark:bg-zinc-800/60 border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:border-zinc-200 dark:border-zinc-700'
                        }`}
                      >
                        <div className="text-xs">{slot.label}</div>
                        <div className="text-[10px] text-stone-500 flex items-center justify-between mt-1">
                          <span>{slot.priceEuros} €</span>
                          {slot.isCompatibleWithChef && <span className="text-emerald-400 font-bold">✓ Óptimo</span>}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* 3. Basket Ingredients List */}
              <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-zinc-200 dark:border-zinc-800">
                  <div className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 flex items-center gap-2">
                    <Store size={15} className="text-rose-400" />
                    <span>3. Cesta Asistida DIA ({basketItems.length} artículos)</span>
                  </div>
                  <span className="text-xs font-mono font-bold text-amber-400">
                    Subtotal: {itemsSubtotal} €
                  </span>
                </div>

                <div className="space-y-2 max-h-96 overflow-y-auto pr-1">
                  {basketItems.map(item => (
                    <div
                      key={item.id}
                      className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-800 flex items-center justify-between gap-3 text-xs"
                    >
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <strong className="text-zinc-900 dark:text-white truncate font-bold">{item.name}</strong>
                          <span className="text-[10px] bg-stone-800 text-zinc-600 dark:text-zinc-400 px-1.5 py-0.2 rounded font-mono">
                            {item.supermarketSku}
                          </span>
                        </div>
                        <div className="text-[11px] text-zinc-600 dark:text-zinc-400 mt-0.5">
                          {item.commercialBrand} • {item.commercialPackage} ({item.packageCount} pack × {item.unitPriceEuros}€)
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <div className="font-bold font-mono text-amber-300">{item.totalPriceEuros} €</div>
                        {item.alternativeProduct && (
                          <button
                            onClick={() => handleToggleAlternative(item.id)}
                            className="text-[10px] text-zinc-600 dark:text-zinc-400 hover:text-amber-400 transition-colors underline"
                          >
                            Opción Gourmet (+{item.alternativeProduct.differenceEuros}€)
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* RIGHT COLUMN: SUBSTITUTIONS & CHECKOUT (5 COLS) */}
            <div className="lg:col-span-5 space-y-5">
              
              {/* Substitution Policy Selector */}
              <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 space-y-3">
                <div className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                  Política de Sustituciones
                </div>
                <p className="text-[11px] text-zinc-600 dark:text-zinc-400">
                  Si algún fresco o marca se agota en tienda durante la preparación del pedido:
                </p>

                <div className="space-y-2">
                  {[
                    { id: 'auto_cheapest' as const, title: '⚡ Sustituir por equivalente más barato', desc: 'Mantiene el menú sin retrasos.' },
                    { id: 'require_approval' as const, title: '📱 Preguntarme antes de sustituir', desc: 'Aviso por notificación/SMS.' },
                    { id: 'refund' as const, title: '💰 No sustituir y reembolsar importe', desc: 'Devolución directa en tarjeta.' }
                  ].map(pol => (
                    <label
                      key={pol.id}
                      className={`p-3 rounded-xl border flex items-start gap-2.5 cursor-pointer transition-all ${
                        substitutionPolicy === pol.id
                          ? 'bg-amber-500/10 border-amber-500/50 text-white'
                          : 'bg-zinc-50 dark:bg-zinc-800/60 border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400'
                      }`}
                    >
                      <input
                        type="radio"
                        name="substitution"
                        checked={substitutionPolicy === pol.id}
                        onChange={() => setSubstitutionPolicy(pol.id)}
                        className="mt-0.5 accent-amber-500"
                      />
                      <div className="text-xs">
                        <strong className="block text-stone-200">{pol.title}</strong>
                        <span className="text-[11px] text-stone-500">{pol.desc}</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Delivery Address & Contact */}
              <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 space-y-3">
                <div className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5">
                  <MapPin size={14} className="text-rose-400" />
                  <span>Dirección de Entrega</span>
                </div>

                <div className="space-y-2 text-xs">
                  <input
                    type="text"
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    placeholder="Dirección completa"
                    className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl p-2.5 text-white"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                      placeholder="C.P. (28013)"
                      className="bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl p-2.5 text-white"
                    />
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="Ciudad"
                      className="bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl p-2.5 text-white"
                    />
                  </div>
                </div>
              </div>

              {/* Order Breakdown Card */}
              <div className="bg-white dark:bg-zinc-900 border-2 border-rose-500/30 shadow-xl rounded-2xl p-5 space-y-4 shadow-xl">
                <div className="flex items-center justify-between pb-3 border-b border-zinc-200 dark:border-zinc-800">
                  <span className="text-xs font-bold uppercase text-zinc-600 dark:text-zinc-400">Resumen del Pedido</span>
                  <span className="text-xs bg-rose-500/15 text-rose-700 dark:text-rose-300 font-bold px-2 py-0.5 rounded-full font-bold">
                    DIA Online
                  </span>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex justify-between text-zinc-700 dark:text-zinc-300">
                    <span>Artículos de Cesta ({basketItems.length})</span>
                    <span className="font-mono text-zinc-900 dark:text-white font-bold">{itemsSubtotal} €</span>
                  </div>
                  <div className="flex justify-between text-zinc-700 dark:text-zinc-300">
                    <span>Gastos de Entrega Franja ({selectedSlot.label})</span>
                    <span className="font-mono text-zinc-900 dark:text-white font-bold">{deliveryFee === 0 ? 'GRATIS' : `${deliveryFee} €`}</span>
                  </div>
                  {isFreeDelivery && (
                    <div className="text-[10px] text-emerald-400">
                      ✓ Envío gratuito alcanzado (superior a {selectedProvider.freeDeliveryThreshold} €)
                    </div>
                  )}
                  <div className="pt-3 border-t border-zinc-200 dark:border-zinc-800 flex justify-between items-center text-sm font-black">
                    <span className="text-zinc-900 dark:text-white font-bold">Total a Pagar:</span>
                    <span className="text-amber-400 text-xl font-mono">{totalOrderPrice} €</span>
                  </div>
                </div>

                <div className="space-y-2 pt-2">
                  <button
                    onClick={handleConfirmSupermarketOrder}
                    disabled={isSubmitting}
                    className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-rose-500 to-amber-500 hover:from-rose-400 hover:to-amber-400 text-stone-950 font-black text-xs shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <span>Sincronizando con DIA...</span>
                    ) : (
                      <>
                        <Check size={16} />
                        <span>Confirmar y Programar Entrega</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={handleOpenExternalDIA}
                    className="w-full py-2.5 px-4 rounded-xl bg-stone-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 hover:text-white font-bold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <ExternalLink size={14} />
                    <span>Abrir Web Oficial DIA</span>
                  </button>
                </div>
              </div>

            </div>

          </div>
        </>
      )}

    </div>
  );
};
