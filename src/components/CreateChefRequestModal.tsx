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
  Users,
  Wrench,
  UserCheck,
  PackageCheck
} from 'lucide-react';
import { ChefProfile, BatchProject, ChefBookingRequest, ChefServicePackage } from '../types';
import { APPROVED_CHEFS, calculateBookingQuote, BOOTSTRAP_CHEF_PROFILE } from '../lib/chefsData';
import { saveBooking } from '../services/bookingService';
import { auth } from '../lib/firebase';

interface CreateChefRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (booking: ChefBookingRequest) => void;
  activeProject?: BatchProject | null;
  selectedChef?: ChefProfile | null;
  initialServicePackage?: ChefServicePackage;
  isOpenPreferencesRequest?: boolean;
  initialDirectives?: string;
  initialDietStyle?: string;
  initialPeopleCount?: number;
  initialAllergies?: string[];
}

export const CreateChefRequestModal: React.FC<CreateChefRequestModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  activeProject,
  selectedChef,
  initialServicePackage = 'with_grocery',
  isOpenPreferencesRequest = false,
  initialDirectives = '',
  initialDietStyle = 'mediterranean',
  initialPeopleCount = 4,
  initialAllergies = []
}) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [isOpenPreferences, setIsOpenPreferences] = useState<boolean>(isOpenPreferencesRequest || !activeProject?.dishes?.length);
  const [dietaryDirectives, setDietaryDirectives] = useState<string>(initialDirectives || 'Platos saludables y equilibrados para toda la semana. Priorizar verduras de temporada y guisos ligeros.');
  const [dietStyle, setDietStyle] = useState<string>(initialDietStyle || 'mediterranean');
  const [selectedAllergensList, setSelectedAllergensList] = useState<string[]>(initialAllergies || []);
  const [peopleCount, setPeopleCount] = useState<number>(initialPeopleCount || activeProject?.peopleCount || 4);

  const [selectionMode, setSelectionMode] = useState<'broadcast' | 'direct'>(selectedChef ? 'direct' : 'broadcast');
  const [targetChefId, setTargetChefId] = useState<string>(selectedChef?.id || 'any');
  
  // Paquetes de servicio (Solo Cocina, Con Herramientas, Con Compra DIA, Con Ayudante)
  const [servicePackage, setServicePackage] = useState<ChefServicePackage>(initialServicePackage);
  
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
  const [notes, setNotes] = useState<string>('Tengo vitrocerámica de 3 fuegos y horno eléctrico. Fiambreras de cristal preparadas.');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  useEffect(() => {
    if (initialServicePackage) {
      setServicePackage(initialServicePackage);
    }
  }, [initialServicePackage]);

  useEffect(() => {
    if (selectedChef) {
      setSelectionMode('direct');
      setTargetChefId(selectedChef.id);
    }
  }, [selectedChef]);

  useEffect(() => {
    if (isOpenPreferencesRequest) {
      setIsOpenPreferences(true);
    }
    if (initialDirectives) {
      setDietaryDirectives(initialDirectives);
    }
    if (initialPeopleCount) {
      setPeopleCount(initialPeopleCount);
    }
    if (initialAllergies && initialAllergies.length > 0) {
      setSelectedAllergensList(initialAllergies);
    }
  }, [isOpenPreferencesRequest, initialDirectives, initialPeopleCount, initialAllergies]);

  if (!isOpen) return null;

  const assignedChef = selectionMode === 'direct' && targetChefId !== 'any'
    ? APPROVED_CHEFS.find(c => c.id === targetChefId) || selectedChef || BOOTSTRAP_CHEF_PROFILE
    : BOOTSTRAP_CHEF_PROFILE;

  const dishes = !isOpenPreferences && activeProject?.dishes ? activeProject.dishes.map(d => ({ name: d.name, servings: d.servings })) : [];
  const planTitle = isOpenPreferences
    ? `Encargo Abierto: Menú a Medida (${dietStyle})`
    : (activeProject?.title || 'Menú Semanal Batch Cooking Tradicional (Carmen)');

  // Configuración de complementos según el paquete elegido
  const includeGrocery = servicePackage === 'with_grocery' || servicePackage === 'full_pack_with_assistant';
  const bringTools = servicePackage !== 'cooking_only';
  const hasAssistant = servicePackage === 'full_pack_with_assistant';
  const estimatedIngredientsCost = includeGrocery ? Math.round(peopleCount * 5 * 2.8 * 100) / 100 : 0;

  const quote = calculateBookingQuote({
    chefHourlyRate: assignedChef.pricing.cookingHourRate,
    hours,
    includeGrocery,
    groceryHourlyRate: assignedChef.pricing.groceryShoppingHourRate,
    groceryHours: 1.5,
    bringTools,
    toolsFee: bringTools ? (assignedChef.pricing.toolsExtraFee || 0) : 0,
    hasAssistant,
    assistantHours: hours,
    travelFee: assignedChef.pricing.travelFee,
    cleaningFee: 0,
    estimatedIngredients: estimatedIngredientsCost,
    completedBookingsWithChef: 0
  });

  const handleSubmit = async () => {
    setIsSubmitting(true);
    const isBroadcastMode = selectionMode === 'broadcast';
    const currentUid = auth.currentUser?.uid || `user_${Date.now()}`;
    const currentEmail = auth.currentUser?.email || 'tisute@gmail.com';
    const currentName = auth.currentUser?.displayName || (currentEmail.split('@')[0]);

    const newRequest: ChefBookingRequest = {
      id: `TC-REQ-${Date.now().toString().slice(-6)}`,
      customerId: currentUid,
      customerName: currentName,
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
      isOpenPreferencesRequest: isOpenPreferences,
      dietaryDirectives: isOpenPreferences ? dietaryDirectives : undefined,
      dietStyle: isOpenPreferences ? dietStyle : undefined,
      allergies: selectedAllergensList,
      servicePackage,
      includeGroceryShopping: includeGrocery,
      includeCleaning: true,
      bringChefTools: bringTools,
      hasAssistant,
      assistantHours: hasAssistant ? hours : 0,
      grocerySource: includeGrocery ? 'chef' : 'client',
      supermarketProvider: includeGrocery ? 'dia' : undefined,
      isBroadcast: isBroadcastMode,
      chefId: !isBroadcastMode ? assignedChef.id : undefined,
      chefName: !isBroadcastMode ? assignedChef.name : undefined,
      chefAvatar: !isBroadcastMode ? assignedChef.avatar : undefined,
      applicants: [],
      costBreakdown: {
        cookingCost: quote.cookingCost,
        groceryServiceCost: quote.groceryCost,
        toolsCost: quote.toolsCost,
        assistantCost: quote.assistantCost,
        travelCost: quote.travelCost,
        cleaningCost: quote.cleaningCost,
        ingredientsEstimatedCost: quote.ingredientsEstimatedCost,
        platformServiceFee: quote.platformServiceFee,
        totalClientPrice: quote.totalClientPrice,
        chefPayoutEstimated: quote.chefPayoutEstimated,
        commissionRatePercent: quote.commissionRate
      },
      status: isBroadcastMode ? 'published' : 'confirmed',
      notes,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    try {
      await saveBooking(newRequest);
      onSuccess(newRequest);
      onClose();
    } catch (err) {
      console.error('Error creating booking request:', err);
      // Fallback local
      onSuccess(newRequest);
      onClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200 overflow-y-auto">
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl my-8">
        
        {/* Header */}
        <div className="p-6 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between bg-zinc-50 dark:bg-zinc-950/80">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-500 border border-amber-500/30 flex items-center justify-center">
              <ChefHat size={24} />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider bg-amber-500/20 text-amber-600 dark:text-amber-300 px-2.5 py-0.5 rounded-full">
                {selectionMode === 'broadcast' ? 'Difusión a la Red de Cocineros' : 'Contratación Directa'}
              </span>
              <h2 className="text-lg font-black text-zinc-900 dark:text-white mt-0.5">
                Encargar Batch Cooking a Domicilio
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-zinc-500 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          
          {/* 1. Modalidad de Difusión */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider">
              1. Modalidad de Encargo
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setSelectionMode('broadcast')}
                className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                  selectionMode === 'broadcast'
                    ? 'border-amber-500 bg-amber-500/10 text-zinc-900 dark:text-white shadow-md'
                    : 'border-zinc-200 dark:border-zinc-800 text-zinc-500 hover:border-zinc-300 dark:hover:border-zinc-700'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <Radio size={16} className={selectionMode === 'broadcast' ? 'text-amber-500' : 'text-zinc-400'} />
                  <span className="font-bold text-sm">Lanzar a la Red (Recomendado)</span>
                </div>
                <p className="text-xs opacity-75">
                  Recibe ofertas y mensajes de varios cocineros homologados de tu zona.
                </p>
              </button>

              <button
                type="button"
                onClick={() => setSelectionMode('direct')}
                className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                  selectionMode === 'direct'
                    ? 'border-amber-500 bg-amber-500/10 text-zinc-900 dark:text-white shadow-md'
                    : 'border-zinc-200 dark:border-zinc-800 text-zinc-500 hover:border-zinc-300 dark:hover:border-zinc-700'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <ChefHat size={16} className={selectionMode === 'direct' ? 'text-amber-500' : 'text-zinc-400'} />
                  <span className="font-bold text-sm">Chef Específico</span>
                </div>
                <p className="text-xs opacity-75">
                  Asignar directamente a {assignedChef.name}.
                </p>
              </button>
            </div>
          </div>

          {/* 2. Selector de Paquete de Servicio (Las 4 Modalidades) */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider">
              2. ¿Qué incluye tu encargo? (Elige la modalidad)
            </label>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Opción 1: Solo Cocina */}
              <button
                type="button"
                onClick={() => setServicePackage('cooking_only')}
                className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                  servicePackage === 'cooking_only'
                    ? 'border-amber-500 bg-amber-500/10 text-zinc-900 dark:text-white shadow-md ring-1 ring-amber-500'
                    : 'border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:border-zinc-300'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-sm flex items-center gap-1.5">
                      <ChefHat size={15} className="text-amber-500" />
                      1. Solo Cocina
                    </span>
                    <span className="text-xs font-mono font-bold text-amber-500">
                      {assignedChef.pricing.cookingHourRate}€/h
                    </span>
                  </div>
                  <p className="text-xs opacity-80 mt-1">
                    Tú pones todos los ingredientes y los utensilios de cocina. El chef solo cocina y deja todo listo en tus tuppers.
                  </p>
                </div>
                <div className="mt-3 text-[11px] text-zinc-500 flex items-center gap-2">
                  <span>✓ Ahorro máximo</span>
                </div>
              </button>

              {/* Opción 2: Cocina + Herramientas Pro */}
              <button
                type="button"
                onClick={() => setServicePackage('with_tools')}
                className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                  servicePackage === 'with_tools'
                    ? 'border-amber-500 bg-amber-500/10 text-zinc-900 dark:text-white shadow-md ring-1 ring-amber-500'
                    : 'border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:border-zinc-300'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-sm flex items-center gap-1.5">
                      <Wrench size={15} className="text-amber-500" />
                      2. Cocina + Cuchillería Pro
                    </span>
                    <span className="text-xs font-mono font-bold text-amber-500">
                      {assignedChef.pricing.cookingHourRate}€/h
                    </span>
                  </div>
                  <p className="text-xs opacity-80 mt-1">
                    El chef lleva sus propios cuchillos profesionales afilados y desinfectados para mayor rapidez de corte. Tú pones la comida.
                  </p>
                </div>
                <div className="mt-3 text-[11px] text-zinc-500 flex items-center gap-2">
                  <span>✓ Eficiencia y cortes perfectos</span>
                </div>
              </button>

              {/* Opción 3: Cocina + Compra + Herramientas Pro (Pack Estrella) */}
              <button
                type="button"
                onClick={() => setServicePackage('with_grocery')}
                className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between relative ${
                  servicePackage === 'with_grocery'
                    ? 'border-amber-500 bg-amber-500/10 text-zinc-900 dark:text-white shadow-md ring-2 ring-amber-500'
                    : 'border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:border-zinc-300'
                }`}
              >
                <span className="absolute -top-2.5 right-3 bg-amber-500 text-zinc-950 font-black text-[9px] uppercase px-2 py-0.5 rounded-full shadow-sm">
                  ★ Más Solicitado
                </span>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-sm flex items-center gap-1.5">
                      <ShoppingBag size={15} className="text-amber-500" />
                      3. Cocina + Compra Total
                    </span>
                    <span className="text-xs font-mono font-bold text-amber-500">
                      Todo Incluido
                    </span>
                  </div>
                  <p className="text-xs opacity-80 mt-1">
                    Cero preocupaciones: indicas lo que quiere tu familia y el chef compra los ingredientes frescos en DIA, lleva sus herramientas y cocina todo.
                  </p>
                </div>
                <div className="mt-3 text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
                  ✓ Comodidad 100% · Cero colas de súper
                </div>
              </button>

              {/* Opción 4: Servicio Completo con Ayudante */}
              <button
                type="button"
                onClick={() => setServicePackage('full_pack_with_assistant')}
                className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                  servicePackage === 'full_pack_with_assistant'
                    ? 'border-amber-500 bg-amber-500/10 text-zinc-900 dark:text-white shadow-md ring-1 ring-amber-500'
                    : 'border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:border-zinc-300'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-sm flex items-center gap-1.5">
                      <Users size={15} className="text-amber-500" />
                      4. Pack con Ayudante
                    </span>
                    <span className="text-xs font-mono font-bold text-amber-500">
                      +{assignedChef.pricing.assistantHourRate}€/h
                    </span>
                  </div>
                  <p className="text-xs opacity-80 mt-1">
                    Chef + Ayudante de cocina para cocinar grandes volúmenes (30+ raciones) en tiempo récord de ~90 min con limpieza exhaustiva.
                  </p>
                </div>
                <div className="mt-3 text-[11px] text-zinc-500">
                  ✓ Ideal para familias numerosas / eventos
                </div>
              </button>
            </div>
          </div>

          {/* 3. Menú o Directivas del Encargo */}
          <div className="p-4 rounded-2xl bg-zinc-100 dark:bg-zinc-950/50 border border-zinc-200 dark:border-zinc-800/80 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span className="text-xs font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles size={14} className="text-amber-500" />
                3. {isOpenPreferences ? 'Pautas y Directivas para el Chef (Menú Abierto)' : `Recetas a Elaborar (${dishes.length} platos · ${peopleCount} comensales)`}
              </span>
              
              <button
                type="button"
                onClick={() => setIsOpenPreferences(!isOpenPreferences)}
                className="text-[11px] font-bold text-amber-600 dark:text-amber-400 hover:underline cursor-pointer text-left"
              >
                {isOpenPreferences ? '← Cambiar a Menú con Platos Concretos' : '✨ ¿Prefieres que el Chef diseñe el menú?'}
              </button>
            </div>

            {isOpenPreferences ? (
              <div className="space-y-3 pt-1">
                <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl text-xs text-amber-900 dark:text-amber-300">
                  <strong>💡 Modalidad Encargo Abierto:</strong> No necesitas seleccionar recetas. Los cocineros de tu zona recibirán tus pautas y te contestarán con un menú personalizado y su presupuesto para que elijas al que más te guste.
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-bold text-zinc-500 uppercase block mb-1">
                      Comensales / Personas
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={12}
                      value={peopleCount}
                      onChange={(e) => setPeopleCount(Math.max(1, Number(e.target.value)))}
                      className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl px-3 py-2 text-xs font-bold text-zinc-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-zinc-500 uppercase block mb-1">
                      Estilo Culinario Base
                    </label>
                    <select
                      value={dietStyle}
                      onChange={(e) => setDietStyle(e.target.value)}
                      className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl px-3 py-2 text-xs font-bold text-zinc-900 dark:text-white"
                    >
                      <option value="mediterranean">Mediterránea de Carmen</option>
                      <option value="traditional">Tradicional y Guisos de la Abuela</option>
                      <option value="fitness">Fitness High Protein</option>
                      <option value="veggie">Vegetariana & Legumbres</option>
                      <option value="lowcarb">Low Carb & Pescados</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-zinc-500 uppercase block mb-1">
                    Directivas nutricionales y gustos para el Chef:
                  </label>
                  <textarea
                    rows={2}
                    value={dietaryDirectives}
                    onChange={(e) => setDietaryDirectives(e.target.value)}
                    placeholder="Ej: 'Cocíname lo que consideres sano, pero no quiero nada de leche, ni nata, ni carne roja. Nos encantan las legumbres y el pescado fresco'..."
                    className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-2.5 text-xs text-zinc-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                  />
                </div>
              </div>
            ) : (
              <div>
                {dishes.length > 0 ? (
                  <div className="space-y-1.5 pt-1">
                    {dishes.map((dish, i) => (
                      <div key={i} className="flex items-center justify-between text-xs py-1 border-b border-zinc-200/50 dark:border-zinc-800/50 last:border-0">
                        <span className="font-medium text-zinc-800 dark:text-zinc-200">▫️ {dish.name}</span>
                        <span className="font-mono text-zinc-500">{dish.servings} raciones</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="py-2 text-center text-xs text-zinc-500 space-y-1">
                    <span>⚠️ No tienes ningún menú formulado todavía.</span>
                    <p className="text-[11px] text-zinc-400">Puedes usar la modalidad de <strong>Encargo Abierto</strong> para que el chef diseñe la propuesta por ti.</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* 4. Fecha, Franja Horaria y Dirección */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-zinc-600 dark:text-zinc-400">Fecha del Servicio</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl px-3 py-2 text-sm text-zinc-900 dark:text-white"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-zinc-600 dark:text-zinc-400">Franja Horaria</label>
              <select
                value={timeSlot}
                onChange={(e) => setTimeSlot(e.target.value)}
                className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl px-3 py-2 text-sm text-zinc-900 dark:text-white"
              >
                <option value="Mañanas (09:30 - 13:00)">Mañanas (09:30 - 13:00)</option>
                <option value="Mediodía (12:00 - 15:30)">Mediodía (12:00 - 15:30)</option>
                <option value="Tardes (16:30 - 20:00)">Tardes (16:30 - 20:00)</option>
              </select>
            </div>

            <div className="space-y-1 sm:col-span-2">
              <label className="text-xs font-bold text-zinc-600 dark:text-zinc-400">Dirección del Domicilio</label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Calle, número, piso y puerta"
                className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl px-3 py-2 text-sm text-zinc-900 dark:text-white"
              />
            </div>
          </div>

          {/* 5. Desglose Económico Transparente */}
          <div className="p-4 rounded-2xl bg-amber-500/5 border border-amber-500/20 space-y-2">
            <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400 font-bold uppercase">
              <span>Desglose de Cotización Transparente</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-normal">0% Comisión en Comida</span>
            </div>

            <div className="space-y-1 text-xs pt-1">
              <div className="flex justify-between text-zinc-700 dark:text-zinc-300">
                <span>Cocina ({hours}h × {assignedChef.pricing.cookingHourRate}€/h):</span>
                <span className="font-mono">{quote.cookingCost} €</span>
              </div>
              {includeGrocery && (
                <div className="flex justify-between text-zinc-700 dark:text-zinc-300">
                  <span>Gestión de compra en supermercado:</span>
                  <span className="font-mono">{quote.groceryCost} €</span>
                </div>
              )}
              {hasAssistant && (
                <div className="flex justify-between text-zinc-700 dark:text-zinc-300">
                  <span>Ayudante de cocina ({hours}h × {assignedChef.pricing.assistantHourRate}€/h):</span>
                  <span className="font-mono">{quote.assistantCost} €</span>
                </div>
              )}
              {includeGrocery && (
                <div className="flex justify-between text-zinc-700 dark:text-zinc-300">
                  <span>Ingredientes frescos estimados:</span>
                  <span className="font-mono">{quote.ingredientsEstimatedCost} €</span>
                </div>
              )}
              <div className="flex justify-between text-zinc-700 dark:text-zinc-300">
                <span>Desplazamiento a {city}:</span>
                <span className="font-mono">{quote.travelCost} €</span>
              </div>
              <div className="flex justify-between text-zinc-500 pt-1 border-t border-zinc-200 dark:border-zinc-800">
                <span>Protección y Fee de Servicio ({quote.commissionRate}%):</span>
                <span className="font-mono">{quote.platformServiceFee} €</span>
              </div>
              <div className="flex justify-between text-sm font-black text-zinc-900 dark:text-white pt-1 border-t border-amber-500/30">
                <span>Total Estimado del Servicio:</span>
                <span className="font-mono text-base text-amber-600 dark:text-amber-400">{quote.totalClientPrice} €</span>
              </div>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between bg-zinc-50 dark:bg-zinc-950/80">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl text-sm font-bold text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            Cancelar
          </button>

          <button
            type="button"
            disabled={isSubmitting}
            onClick={handleSubmit}
            className="btn-hero-copper px-6 py-2.5 rounded-xl text-sm font-black text-white flex items-center gap-2 shadow-lg disabled:opacity-50 cursor-pointer"
          >
            <Send size={16} />
            <span>{isSubmitting ? 'Publicando...' : selectionMode === 'broadcast' ? 'Publicar Encargo a la Red' : 'Confirmar Reserva Directa'}</span>
          </button>
        </div>

      </div>
    </div>
  );
};
