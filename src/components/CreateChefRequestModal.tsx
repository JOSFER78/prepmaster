import React, { useState, useEffect } from 'react';
import { 
  X, 
  ChefHat, 
  Calendar, 
  Clock, 
  MapPin, 
  ShieldCheck, 
  ShoppingBag, 
  Check, 
  Sparkles,
  Radio,
  Send,
  Users
} from 'lucide-react';
import { ChefProfile, BatchProject, ChefBookingRequest } from '../types';
import { MOCK_CHEFS, calculateBookingQuote } from '../lib/chefsData';

interface CreateChefRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (booking: ChefBookingRequest) => void;
  activeProject?: BatchProject | null;
  selectedChef?: ChefProfile | null;
}

export const CreateChefRequestModal: React.FC<CreateChefRequestModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  activeProject,
  selectedChef
}) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectionMode, setSelectionMode] = useState<'broadcast' | 'direct'>(selectedChef ? 'direct' : 'broadcast');
  const [targetChefId, setTargetChefId] = useState<string>(selectedChef?.id || 'any');
  const [date, setDate] = useState<string>(() => {
    const d = new Date();
    d.setDate(d.getDate() + 3);
    return d.toISOString().split('T')[0];
  });
  const [timeSlot, setTimeSlot] = useState<string>('Mañanas (09:30 - 13:00)');
  const [hours, setHours] = useState<number>(3.5);
  const [address, setAddress] = useState<string>('Calle Ponzano 24, 2º B');
  const [postalCode, setPostalCode] = useState<string>('28003');
  const [city, setCity] = useState<string>('Madrid (Chamberí)');
  const [grocerySource, setGrocerySource] = useState<'client' | 'chef' | 'supermarket_delivery'>('supermarket_delivery');
  const [includeCleaning, setIncludeCleaning] = useState<boolean>(true);
  const [bringTools, setBringTools] = useState<boolean>(true);
  const [notes, setNotes] = useState<string>('Tengo vitrocerámica de 3 fuegos y horno eléctrico. Fiambreras de cristal preparadas.');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  useEffect(() => {
    if (selectedChef) {
      setSelectionMode('direct');
      setTargetChefId(selectedChef.id);
    }
  }, [selectedChef]);

  if (!isOpen) return null;

  const assignedChef = selectionMode === 'direct' && targetChefId !== 'any'
    ? MOCK_CHEFS.find(c => c.id === targetChefId) || selectedChef || MOCK_CHEFS[0]
    : MOCK_CHEFS[0];

  const dishes = activeProject?.dishes.map(d => ({ name: d.name, servings: d.servings })) || [
    { name: 'Lentejas Pardinas Tradicionales con Verduras', servings: 8 },
    { name: 'Ternera Estofada Muy Tierna en su Jugo', servings: 8 },
    { name: 'Pollo de Corral Asado al Limón con Romero', servings: 4 },
    { name: 'Crema Suave de Calabaza y Puerro Pochado', servings: 12 },
    { name: 'Lomos de Merluza Fresca con Patatas Panaderas', servings: 8 }
  ];

  const peopleCount = activeProject?.peopleCount || 4;
  const planTitle = activeProject?.title || 'Menú Semanal Batch Cooking';

  const quote = calculateBookingQuote({
    chefHourlyRate: assignedChef.pricing.cookingHourRate,
    hours,
    includeGrocery: grocerySource === 'chef',
    groceryHourlyRate: assignedChef.pricing.groceryShoppingHourRate,
    travelFee: assignedChef.pricing.travelFee,
    toolsFee: 0,
    cleaningFee: 0,
    estimatedIngredients: grocerySource === 'supermarket_delivery' ? 48.5 : 0,
    completedBookingsWithChef: 0
  });

  const handleSubmit = () => {
    setIsSubmitting(true);
    const isBroadcastMode = selectionMode === 'broadcast';

    const newRequest: ChefBookingRequest = {
      id: `TC-REQ-${Date.now().toString().slice(-6)}`,
      customerId: 'user-demo-123',
      customerName: 'Laura Morales',
      customerPhone: '+34 612 345 678',
      address,
      postalCode,
      city,
      batchProjectId: activeProject?.id,
      mealPlanTitle: planTitle,
      dishes,
      peopleCount,
      targetDate: date,
      targetTimeSlot: timeSlot,
      estimatedHours: hours,
      includeGroceryShopping: grocerySource === 'chef',
      includeCleaning,
      bringChefTools: bringTools,
      grocerySource,
      supermarketProvider: grocerySource === 'supermarket_delivery' ? 'dia' : undefined,
      isBroadcast: isBroadcastMode,
      chefId: !isBroadcastMode ? assignedChef.id : undefined,
      chefName: !isBroadcastMode ? assignedChef.name : undefined,
      chefAvatar: !isBroadcastMode ? assignedChef.avatar : undefined,
      applicants: isBroadcastMode ? [
        {
          id: `app-marcos-${Date.now()}`,
          chefId: 'chef-marcos-valbuena',
          chefName: 'Marcos Valbuena',
          chefAvatar: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=400&auto=format&fit=crop&q=80',
          chefRating: 4.98,
          chefHourlyRate: 24,
          chefSpecialties: ['Batch Cooking Tradicional', 'Guisos Lentos', 'Sin Gluten'],
          appliedAt: new Date().toISOString(),
          message: '¡Hola! Me encantaría cocinar tu menú de 40 raciones. Tengo disponibilidad en esa franja y llevo mis propios cuchillos profesionales desinfectados.',
          status: 'pending'
        },
        {
          id: `app-clara-${Date.now()}`,
          chefId: 'chef-clara-santamaria',
          chefName: 'Clara Santamaría',
          chefAvatar: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&auto=format&fit=crop&q=80',
          chefRating: 4.96,
          chefHourlyRate: 26,
          chefSpecialties: ['Fitness & Macros', 'High Protein', 'Keto & Low Carb'],
          appliedAt: new Date().toISOString(),
          message: 'Hola! Puedo acudir a tu domicilio en Chamberí. Me encargo de dejar todo sellado en tus fiambreras de borosilicato y la cocina reluciente.',
          status: 'pending'
        }
      ] : undefined,
      costBreakdown: {
        cookingCost: quote.cookingCost,
        groceryServiceCost: quote.groceryCost,
        travelCost: quote.travelCost,
        toolsCost: quote.toolsCost,
        cleaningCost: quote.cleaningCost,
        ingredientsEstimatedCost: quote.ingredientsCost,
        platformServiceFee: quote.platformFee,
        totalClientPrice: quote.totalClientPrice,
        chefPayoutEstimated: quote.chefPayout,
        commissionRatePercent: quote.commissionRatePercent
      },
      status: isBroadcastMode ? 'offers_received' : 'confirmed',
      notes,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    setTimeout(() => {
      setIsSubmitting(false);
      onSuccess(newRequest);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        
        {/* Modal Header */}
        <div className="p-5 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between bg-zinc-50 dark:bg-zinc-950/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#E07A5F]/15 border border-[#E07A5F]/30 text-[#E07A5F] flex items-center justify-center font-bold">
              {selectionMode === 'broadcast' ? <Radio className="w-5 h-5 animate-pulse" /> : <ChefHat className="w-5 h-5" />}
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black text-zinc-900 dark:text-white">
                {step === 1 && (selectionMode === 'broadcast' ? 'Lanzar Encargo a la Red de Cocineros' : 'Elegir Cocinero & Configurar')}
                {step === 2 && 'Logística & Fecha del Servicio'}
                {step === 3 && 'Resumen & Depósito en Garantía Escrow'}
              </h2>
              <p className="text-xs text-zinc-600 dark:text-zinc-400">
                Paso {step} de 3 · {planTitle}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-zinc-500 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-zinc-800 dark:text-zinc-200">
          
          {/* STEP 1: BROADCAST VS DIRECT SELECTION */}
          {step === 1 && (
            <div className="space-y-5">
              
              {/* Mode Toggle Selector */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-400 block mb-2">
                  Modalidad de Encargo:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  
                  {/* Option 1: Broadcast to Network */}
                  <button
                    type="button"
                    onClick={() => {
                      setSelectionMode('broadcast');
                      setTargetChefId('any');
                    }}
                    className={`p-4 rounded-2xl border text-left transition-all cursor-pointer space-y-2 ${
                      selectionMode === 'broadcast'
                        ? 'bg-[#E07A5F]/15 border-[#E07A5F] text-zinc-900 dark:text-white shadow-xs'
                        : 'bg-zinc-50 dark:bg-zinc-800/60 border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 text-zinc-600 dark:text-zinc-400'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Radio size={18} className="text-[#E07A5F] animate-pulse" />
                        <span className="font-bold text-xs text-zinc-900 dark:text-white">1. Lanzar a la Red TouChef</span>
                      </div>
                      <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded-full bg-[#E07A5F]/20 text-[#E07A5F]">
                        Recomendado
                      </span>
                    </div>
                    <p className="text-[11px] text-zinc-600 dark:text-zinc-400 leading-relaxed">
                      Publica tu menú. Los cocineros disponibles de tu barrio postularán con mensajes personalizados y tú aceptas al que más te convenza.
                    </p>
                  </button>

                  {/* Option 2: Direct Chef Pick */}
                  <button
                    type="button"
                    onClick={() => {
                      setSelectionMode('direct');
                      if (targetChefId === 'any') setTargetChefId(MOCK_CHEFS[0].id);
                    }}
                    className={`p-4 rounded-2xl border text-left transition-all cursor-pointer space-y-2 ${
                      selectionMode === 'direct'
                        ? 'bg-amber-500/15 border-amber-500 text-zinc-900 dark:text-white shadow-xs'
                        : 'bg-zinc-50 dark:bg-zinc-800/60 border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 text-zinc-600 dark:text-zinc-400'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Users size={18} className="text-amber-600 dark:text-amber-400" />
                        <span className="font-bold text-xs text-zinc-900 dark:text-white">2. Elegir Cocinero Manualmente</span>
                      </div>
                    </div>
                    <p className="text-[11px] text-zinc-600 dark:text-zinc-400 leading-relaxed">
                      Si ya conoces a un chef o te gusta su perfil del directorio (Marcos, Clara, Alejandro), resérvale directamente a él.
                    </p>
                  </button>

                </div>
              </div>

              {/* Direct Chef Picker (If direct mode active) */}
              {selectionMode === 'direct' && (
                <div className="space-y-2 pt-1 animate-in fade-in duration-200">
                  <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300 block">
                    Selecciona tu Cocinero Favorito:
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    {MOCK_CHEFS.map(chef => (
                      <button
                        key={chef.id}
                        type="button"
                        onClick={() => setTargetChefId(chef.id)}
                        className={`p-3 rounded-xl border text-left flex items-center gap-3 transition-all cursor-pointer ${
                          targetChefId === chef.id
                            ? 'bg-amber-500/15 border-amber-500 text-zinc-900 dark:text-white shadow-xs'
                            : 'bg-zinc-50 dark:bg-zinc-800/60 border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:border-zinc-300 dark:hover:border-zinc-700'
                        }`}
                      >
                        <img src={chef.avatar} alt={chef.name} className="w-10 h-10 rounded-xl object-cover" />
                        <div className="min-w-0 flex-1">
                          <div className="font-bold text-xs truncate text-zinc-900 dark:text-white">{chef.name}</div>
                          <div className="text-[10px] text-amber-700 dark:text-amber-400 font-bold">{chef.pricing.cookingHourRate} €/h · ★ {chef.rating}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Grocery Logistics Options */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-400 block mb-2">
                  ¿Cómo se gestionan los ingredientes?
                </label>
                <div className="space-y-2">
                  <label className={`flex items-start gap-3 p-3.5 rounded-2xl border cursor-pointer transition-all ${
                    grocerySource === 'supermarket_delivery' ? 'bg-amber-500/10 border-amber-500' : 'bg-zinc-50 dark:bg-zinc-800/60 border-zinc-200 dark:border-zinc-800'
                  }`}>
                    <input
                      type="radio"
                      name="grocery"
                      checked={grocerySource === 'supermarket_delivery'}
                      onChange={() => setGrocerySource('supermarket_delivery')}
                      className="mt-0.5 accent-[#E07A5F]"
                    />
                    <div className="text-xs space-y-0.5">
                      <div className="font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                        <ShoppingBag className="w-3.5 h-3.5 text-rose-500" />
                        <span>Compra coordinada en Supermercados DIA (Recomendado JIT)</span>
                      </div>
                      <p className="text-zinc-600 dark:text-zinc-400 text-[11px]">
                        DIA entrega los ingredientes exactos descontando lo que ya tienes 2h antes de cocinar.
                      </p>
                    </div>
                  </label>

                  <label className={`flex items-start gap-3 p-3.5 rounded-2xl border cursor-pointer transition-all ${
                    grocerySource === 'chef' ? 'bg-amber-500/10 border-amber-500' : 'bg-zinc-50 dark:bg-zinc-800/60 border-zinc-200 dark:border-zinc-800'
                  }`}>
                    <input
                      type="radio"
                      name="grocery"
                      checked={grocerySource === 'chef'}
                      onChange={() => setGrocerySource('chef')}
                      className="mt-0.5 accent-[#E07A5F]"
                    />
                    <div className="text-xs space-y-0.5">
                      <div className="font-bold text-zinc-900 dark:text-white">El Cocinero hace la compra previa (+{assignedChef.pricing.groceryShoppingHourRate} €)</div>
                      <p className="text-zinc-600 dark:text-zinc-400 text-[11px]">
                        El chef compra los frescos en el mercado y aporta el ticket físico exacto.
                      </p>
                    </div>
                  </label>

                  <label className={`flex items-start gap-3 p-3.5 rounded-2xl border cursor-pointer transition-all ${
                    grocerySource === 'client' ? 'bg-amber-500/10 border-amber-500' : 'bg-zinc-50 dark:bg-zinc-800/60 border-zinc-200 dark:border-zinc-800'
                  }`}>
                    <input
                      type="radio"
                      name="grocery"
                      checked={grocerySource === 'client'}
                      onChange={() => setGrocerySource('client')}
                      className="mt-0.5 accent-[#E07A5F]"
                    />
                    <div className="text-xs space-y-0.5">
                      <div className="font-bold text-zinc-900 dark:text-white">Compro yo los ingredientes</div>
                      <p className="text-zinc-600 dark:text-zinc-400 text-[11px]">
                        Dispondré de todos los ingredientes en la cocina antes de la llegada del cocinero.
                      </p>
                    </div>
                  </label>
                </div>
              </div>

              {/* Free Inclusions */}
              <div className="p-3.5 bg-zinc-50 dark:bg-zinc-800/60 rounded-2xl border border-zinc-200 dark:border-zinc-800 flex items-center justify-between text-xs">
                <span className="font-bold text-zinc-700 dark:text-zinc-300">Incluido en la tarifa:</span>
                <div className="flex items-center gap-3 text-[11px] text-emerald-700 dark:text-emerald-400 font-bold">
                  <span className="flex items-center gap-1"><Check size={13} /> Cuchillos Pro Desinfectados</span>
                  <span className="flex items-center gap-1"><Check size={13} /> Cocina Impecable</span>
                </div>
              </div>

            </div>
          )}

          {/* STEP 2: DATE, TIME & ADDRESS */}
          {step === 2 && (
            <div className="space-y-4">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300 block mb-1">Fecha deseada:</label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-zinc-400 absolute left-3 top-3" />
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-xl pl-10 pr-3 py-2.5 text-xs text-zinc-900 dark:text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300 block mb-1">Franja horaria:</label>
                  <div className="relative">
                    <Clock className="w-4 h-4 text-zinc-400 absolute left-3 top-3" />
                    <select
                      value={timeSlot}
                      onChange={(e) => setTimeSlot(e.target.value)}
                      className="w-full bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-xl pl-10 pr-3 py-2.5 text-xs text-zinc-900 dark:text-white"
                    >
                      <option value="Mañanas (09:00 - 13:00)">Mañanas (09:00 - 13:00)</option>
                      <option value="Mañanas (09:30 - 13:00)">Mañanas (09:30 - 13:00)</option>
                      <option value="Tardes (15:30 - 19:30)">Tardes (15:30 - 19:30)</option>
                      <option value="Tardes (17:00 - 21:00)">Tardes (17:00 - 21:00)</option>
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300 block mb-1">Dirección del domicilio:</label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-zinc-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Ej: Calle Ponzano 24, 2º B"
                    className="w-full bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-xl pl-10 pr-3 py-2.5 text-xs text-zinc-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300 block mb-1">Código Postal:</label>
                  <input
                    type="text"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    className="w-full bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-xl px-3.5 py-2.5 text-xs text-zinc-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300 block mb-1">Ciudad / Barrio:</label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-xl px-3.5 py-2.5 text-xs text-zinc-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300 block mb-1">Notas para los cocineros:</label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={2}
                  className="w-full bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-xl p-2.5 text-xs text-zinc-900 dark:text-white"
                />
              </div>

            </div>
          )}

          {/* STEP 3: PRICE BREAKDOWN & ESCROW DEPOSIT */}
          {step === 3 && (
            <div className="space-y-4">
              
              {/* Summary Card */}
              <div className="p-4 bg-zinc-50 dark:bg-zinc-800/60 rounded-2xl border border-zinc-200 dark:border-zinc-800 space-y-2 text-xs">
                <div className="flex justify-between pb-2 border-b border-zinc-200 dark:border-zinc-700">
                  <span className="text-zinc-600 dark:text-zinc-400">Modalidad:</span>
                  <strong className="text-zinc-900 dark:text-white">
                    {selectionMode === 'broadcast' ? '📡 Publicación en Red (Ofertas Abiertas)' : `👨‍🍳 Asignación Directa: ${assignedChef.name}`}
                  </strong>
                </div>

                <div className="flex justify-between">
                  <span className="text-zinc-600 dark:text-zinc-400">{hours} horas de cocinado ({assignedChef.pricing.cookingHourRate} €/h):</span>
                  <span className="font-mono text-zinc-900 dark:text-white font-bold">{quote.cookingCost} €</span>
                </div>

                {grocerySource === 'chef' && (
                  <div className="flex justify-between">
                    <span className="text-zinc-600 dark:text-zinc-400">Servicio de compra mercado:</span>
                    <span className="font-mono text-zinc-900 dark:text-white font-bold">{quote.groceryCost} €</span>
                  </div>
                )}

                {grocerySource === 'supermarket_delivery' && (
                  <div className="flex justify-between">
                    <span className="text-zinc-600 dark:text-zinc-400">Estimación compra DIA (descontada):</span>
                    <span className="font-mono text-zinc-900 dark:text-white font-bold">{quote.ingredientsCost} €</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span className="text-zinc-600 dark:text-zinc-400">Protección TouChef (Garantía &amp; Escrow):</span>
                  <span className="font-mono text-zinc-900 dark:text-white font-bold">{quote.platformFee} €</span>
                </div>

                <div className="pt-2 border-t border-zinc-200 dark:border-zinc-700 flex justify-between items-center text-sm">
                  <strong className="text-zinc-900 dark:text-white">Total en depósito seguro:</strong>
                  <strong className="text-amber-700 dark:text-amber-400 text-xl font-black font-mono">{quote.totalClientPrice} €</strong>
                </div>
              </div>

              {/* Escrow Guarantee Banner */}
              <div className="p-3.5 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-500/30 rounded-2xl flex items-start gap-2.5 text-xs text-emerald-800 dark:text-emerald-300">
                <ShieldCheck size={18} className="shrink-0 text-emerald-600 dark:text-emerald-400 mt-0.5" />
                <div className="space-y-0.5">
                  <strong className="block font-bold">Custodia de Fondos 100% Protegida</strong>
                  <p className="text-[11px] text-emerald-700 dark:text-emerald-300/80 leading-relaxed">
                    Tu dinero no se transfiere al cocinero hasta que finalice la sesión, revise contigo las raciones y tú apruebes el resultado en la app.
                  </p>
                </div>
              </div>

            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-zinc-50 dark:bg-zinc-950/80 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
          {step > 1 ? (
            <button
              onClick={() => setStep((step - 1) as any)}
              className="px-4 py-2 rounded-xl bg-zinc-200 dark:bg-zinc-800 hover:bg-zinc-300 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 text-xs font-bold transition-all cursor-pointer"
            >
              ← Atrás
            </button>
          ) : (
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-zinc-500 hover:text-zinc-900 dark:hover:text-white text-xs font-bold transition-all cursor-pointer"
            >
              Cancelar
            </button>
          )}

          {step < 3 ? (
            <button
              onClick={() => setStep((step + 1) as any)}
              className="btn-hero-copper px-5 py-2.5 rounded-xl text-xs font-black shadow-md flex items-center gap-1.5 text-white transition-all cursor-pointer active:scale-95"
            >
              <span>Continuar</span>
              <span>→</span>
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="btn-hero-copper px-6 py-2.5 rounded-xl text-xs font-black shadow-md flex items-center gap-1.5 text-white transition-all cursor-pointer active:scale-95 disabled:opacity-50"
            >
              {isSubmitting ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  {selectionMode === 'broadcast' ? <Send size={14} /> : <Check size={14} />}
                  <span>{selectionMode === 'broadcast' ? '📡 Lanzar a la Red & Recibir Ofertas' : 'Confirmar & Reservar Chef'}</span>
                </>
              )}
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
