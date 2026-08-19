import React, { useState } from 'react';
import { 
  ChefHat, 
  DollarSign, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  TrendingUp, 
  Star, 
  ShieldCheck, 
  Users, 
  Settings, 
  Sparkles, 
  ArrowRight,
  AlertCircle,
  MessageSquare,
  Award,
  Layers,
  Check,
  X,
  FileText,
  Lock,
  Download,
  Printer,
  Radio,
  Send,
  MapPin,
  ShoppingBag
} from 'lucide-react';
import { ChefBookingRequest, ViewState } from '../types';
import { loadChefBookingsFromStorage, applyToBroadcastBooking, MOCK_CHEFS } from '../lib/chefsData';

interface ChefPortalViewProps {
  onNavigate: (view: ViewState) => void;
  onAcceptBooking?: (bookingId: string) => void;
  onRejectBooking?: (bookingId: string) => void;
}

export const ChefPortalView: React.FC<ChefPortalViewProps> = ({
  onNavigate,
  onAcceptBooking,
  onRejectBooking
}) => {
  const [activeTab, setActiveTab] = useState<'broadcast' | 'assigned' | 'calendar' | 'earnings' | 'contract' | 'pro'>('broadcast');
  const [cookingRate, setCookingRate] = useState<number>(24);
  const [groceryRate, setGroceryRate] = useState<number>(16);
  const [isProSubscriber, setIsProSubscriber] = useState<boolean>(false);
  const [selectedSlots, setSelectedSlots] = useState<string[]>(['Lunes Tarde', 'Miércoles Tarde', 'Viernes Tarde', 'Sábado Mañana']);
  const [applicationMessages, setApplicationMessages] = useState<Record<string, string>>({});
  const [appliedBookings, setAppliedBookings] = useState<Record<string, boolean>>({});

  const [bookings, setBookings] = useState<ChefBookingRequest[]>(() => loadChefBookingsFromStorage());

  const currentChef = MOCK_CHEFS[0]; // Marcos Valbuena as default active logged in chef

  // Broadcast requests looking for chefs
  const broadcastRequests = bookings.filter(b => b.isBroadcast || b.status === 'published' || b.status === 'offers_received');
  // Confirmed bookings assigned directly to this chef
  const assignedBookings = bookings.filter(b => b.status === 'confirmed' || b.status === 'in_progress');

  // Stats
  const totalGrossTransacted = bookings.reduce((acc, b) => acc + b.costBreakdown.totalClientPrice, 0);
  const totalNetEarnings = bookings.reduce((acc, b) => acc + (b.costBreakdown.chefPayoutEstimated || b.costBreakdown.totalClientPrice * 0.9), 0);

  const toggleSlot = (slot: string) => {
    setSelectedSlots(prev => 
      prev.includes(slot) ? prev.filter(s => s !== slot) : [...prev, slot]
    );
  };

  const handleApplyToBooking = (bookingId: string) => {
    const msg = applicationMessages[bookingId] || '¡Hola! Me encantaría preparar tu menú. Tengo disponibilidad completa en tu franja horaria y llevo mis propios cuchillos profesionales desinfectados.';
    const updated = applyToBroadcastBooking(bookingId, currentChef, msg);
    setBookings(updated);
    setAppliedBookings(prev => ({ ...prev, [bookingId]: true }));
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-6 animate-in fade-in duration-300">
      
      {/* Top Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-zinc-900 via-amber-950/40 to-zinc-900 border border-amber-500/30 p-6 sm:p-8 shadow-2xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-[#E07A5F] text-white flex items-center justify-center font-black text-2xl shadow-lg shadow-[#E07A5F]/20">
              <ChefHat size={32} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-wider bg-amber-500/20 text-amber-300 px-2.5 py-0.5 rounded-full border border-amber-500/30">
                  Panel del Cocinero Profesional
                </span>
                {isProSubscriber && (
                  <span className="text-[10px] font-black uppercase bg-emerald-500/20 text-emerald-300 px-2.5 py-0.5 rounded-full border border-emerald-500/30 flex items-center gap-1">
                    <Award size={11} /> TouChef Pro (3% Take)
                  </span>
                )}
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-white mt-1">
                Marcos Valbuena · Chef Verificado
              </h1>
              <p className="text-xs text-zinc-300">
                Madrid - Chamberí • 4.98 ★ (84 reseñas) • 142 servicios completados
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('pro')}
              className="px-4 py-2.5 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-300 font-bold text-xs hover:bg-amber-500/30 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Sparkles size={14} />
              <span>Suscripción Pro (3%)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-xs space-y-1">
          <span className="text-zinc-600 dark:text-zinc-400 text-xs flex items-center gap-1">
            <DollarSign size={13} className="text-emerald-600 dark:text-emerald-400" />
            Ingresos Netos Totales:
          </span>
          <div className="text-xl font-black text-emerald-600 dark:text-emerald-400 font-mono">
            {Math.round(totalNetEarnings)} €
          </div>
        </div>

        <div className="p-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-xs space-y-1">
          <span className="text-zinc-600 dark:text-zinc-400 text-xs flex items-center gap-1">
            <Radio size={13} className="text-[#E07A5F]" />
            Oportunidades en Red:
          </span>
          <div className="text-xl font-black text-zinc-900 dark:text-white font-mono">
            {broadcastRequests.length}
          </div>
        </div>

        <div className="p-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-xs space-y-1">
          <span className="text-zinc-600 dark:text-zinc-400 text-xs flex items-center gap-1">
            <Clock size={13} className="text-amber-600 dark:text-amber-400" />
            Tarifa Cocinado / h:
          </span>
          <div className="text-xl font-black text-amber-700 dark:text-amber-400 font-mono">
            {cookingRate} €/h
          </div>
        </div>

        <div className="p-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-xs space-y-1">
          <span className="text-zinc-600 dark:text-zinc-400 text-xs flex items-center gap-1">
            <ShieldCheck size={13} className="text-emerald-600 dark:text-emerald-400" />
            Comisión Promedio:
          </span>
          <div className="text-xl font-black text-amber-700 dark:text-amber-400 font-mono">
            {isProSubscriber ? '3%' : '8%'}
          </div>
        </div>
      </div>

      {/* Tabs Switcher */}
      <div className="flex items-center gap-2 border-b border-zinc-200 dark:border-zinc-800 pb-3 overflow-x-auto">
        {[
          { id: 'broadcast' as const, label: `📡 Red de Encargos Abiertos (${broadcastRequests.length})` },
          { id: 'assigned' as const, label: `📥 Servicios Confirmados (${assignedBookings.length})` },
          { id: 'calendar' as const, label: 'Disponibilidad & Tarifas' },
          { id: 'earnings' as const, label: 'Desglose de Cobros' },
          { id: 'contract' as const, label: '📜 Contrato & Legal' },
          { id: 'pro' as const, label: 'TouChef Pro (3%)' }
        ].map(t => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
              activeTab === t.id
                ? 'bg-[#E07A5F] text-white shadow-xs'
                : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* TAB 1: BROADCAST OPEN REQUESTS (POSTULARME Y ACEPTAR) */}
      {activeTab === 'broadcast' && (
        <div className="space-y-4">
          <div className="p-4 bg-amber-500/5 dark:bg-amber-500/10 rounded-2xl border border-amber-500/20 text-xs text-zinc-700 dark:text-zinc-300 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Radio size={16} className="text-[#E07A5F] animate-pulse" />
              <span>Clientes en tu zona buscando cocineros para menús semanales de Batch Cooking.</span>
            </div>
            <span className="text-[11px] font-bold text-amber-700 dark:text-amber-400">Madrid - Radio 20km</span>
          </div>

          {broadcastRequests.length > 0 ? (
            <div className="space-y-4">
              {broadcastRequests.map(req => {
                const isAlreadyApplied = appliedBookings[req.id] || req.applicants?.some(a => a.chefId === currentChef.id);

                return (
                  <div 
                    key={req.id}
                    className="p-5 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xs space-y-4 text-xs"
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-3 border-b border-zinc-200 dark:border-zinc-800">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold uppercase bg-amber-500/20 text-amber-700 dark:text-amber-300 px-2 py-0.5 rounded">
                            {req.targetDate} ({req.targetTimeSlot})
                          </span>
                          <span className="text-zinc-400">•</span>
                          <span className="text-zinc-700 dark:text-zinc-300 font-semibold flex items-center gap-1">
                            <MapPin size={12} className="text-zinc-400" />
                            {req.address}, {req.city}
                          </span>
                        </div>
                        <strong className="text-zinc-900 dark:text-white text-base block font-bold">
                          {req.mealPlanTitle} ({req.peopleCount} comensales)
                        </strong>
                      </div>

                      <div className="text-right">
                        <span className="text-[10px] text-zinc-500 dark:text-zinc-400 uppercase block font-medium">Tu Cobro Neto Estimado</span>
                        <strong className="text-emerald-600 dark:text-emerald-400 text-lg font-black font-mono">
                          +{req.costBreakdown.chefPayoutEstimated || 84} €
                        </strong>
                      </div>
                    </div>

                    {/* Dishes list */}
                    <div>
                      <span className="text-[11px] font-bold text-zinc-600 dark:text-zinc-400 block mb-1.5 uppercase tracking-wider">
                        Platos a Cocinar ({req.dishes.length}):
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                        {req.dishes.map((dish, dIdx) => (
                          <div key={dIdx} className="p-2 bg-zinc-50 dark:bg-zinc-800/60 rounded-xl border border-zinc-200 dark:border-zinc-700/60 flex items-center justify-between text-zinc-800 dark:text-zinc-200">
                            <span className="truncate">{dish.name}</span>
                            <span className="text-zinc-400 font-mono text-[10px]">{dish.servings} rac.</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Logistics tags */}
                    <div className="flex flex-wrap items-center gap-2 text-[11px]">
                      <span className="px-2 py-1 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 flex items-center gap-1 font-medium">
                        <Clock size={12} /> {req.estimatedHours}h de sesión
                      </span>
                      {req.grocerySource === 'supermarket_delivery' && (
                        <span className="px-2 py-1 rounded-lg bg-rose-500/10 text-rose-700 dark:text-rose-300 flex items-center gap-1 font-medium">
                          <ShoppingBag size={12} /> Ingredientes DIA entregados por adelantado
                        </span>
                      )}
                      {req.notes && (
                        <span className="text-zinc-500 dark:text-zinc-400 italic">
                          "{req.notes}"
                        </span>
                      )}
                    </div>

                    {/* Application form / status */}
                    <div className="pt-2 border-t border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                      {isAlreadyApplied ? (
                        <div className="p-2.5 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-500/30 rounded-xl text-emerald-800 dark:text-emerald-300 font-bold text-xs flex items-center gap-2">
                          <CheckCircle2 size={16} className="text-emerald-600 dark:text-emerald-400" />
                          <span>¡Ya has postulado a este encargo! El cliente ha recibido tu propuesta.</span>
                        </div>
                      ) : (
                        <div className="flex-1 flex flex-col sm:flex-row items-center gap-2">
                          <input
                            type="text"
                            placeholder="Escribe un mensaje de presentación al cliente (ej: Llevo cuchillos desinfectados y domino los guisos)..."
                            value={applicationMessages[req.id] || ''}
                            onChange={(e) => setApplicationMessages({ ...applicationMessages, [req.id]: e.target.value })}
                            className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-xl px-3.5 py-2 text-xs text-zinc-900 dark:text-white"
                          />
                          <button
                            onClick={() => handleApplyToBooking(req.id)}
                            className="w-full sm:w-auto px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shrink-0 shadow-xs cursor-pointer active:scale-95 transition-all"
                          >
                            <Send size={13} />
                            <span>Aceptar &amp; Postularme</span>
                          </button>
                        </div>
                      )}
                    </div>

                  </div>
                );
              })}
            </div>
          ) : (
            <div className="p-12 text-center bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl shadow-xs space-y-3">
              <ChefHat size={40} className="text-zinc-400 mx-auto" />
              <h3 className="font-bold text-zinc-900 dark:text-white text-sm">No hay encargos abiertos en este momento</h3>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 max-w-sm mx-auto">
                En cuanto los clientes de Madrid publiquen un nuevo menú semanal, aparecerá aquí al instante.
              </p>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: ASSIGNED BOOKINGS */}
      {activeTab === 'assigned' && (
        <div className="space-y-4">
          {assignedBookings.length > 0 ? (
            <div className="space-y-3">
              {assignedBookings.map(req => (
                <div 
                  key={req.id}
                  className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs"
                >
                  <div className="space-y-2 max-w-xl">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold uppercase bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 px-2 py-0.5 rounded font-bold">
                        Confirmado: {req.targetDate} ({req.targetTimeSlot})
                      </span>
                      <span className="text-zinc-400">•</span>
                      <span className="text-zinc-700 dark:text-zinc-300 font-semibold">{req.address}, {req.city}</span>
                    </div>

                    <div>
                      <strong className="text-zinc-900 dark:text-white text-sm block font-bold">
                        {req.mealPlanTitle} · Cliente: {req.customerName}
                      </strong>
                      <p className="text-zinc-600 dark:text-zinc-400 text-[11px] mt-0.5">
                        {req.notes || 'Cocinado simultáneo en fogones + horno. Fiambreras provistas por el cliente.'}
                      </p>
                    </div>
                  </div>

                  <div className="flex md:flex-col items-end justify-between md:justify-center gap-3 shrink-0 border-t md:border-t-0 pt-3 md:pt-0 border-zinc-200 dark:border-zinc-800">
                    <div className="text-right">
                      <span className="text-[10px] text-zinc-500 dark:text-zinc-400 uppercase block">Cobro Garantizado</span>
                      <strong className="text-emerald-600 dark:text-emerald-400 text-base font-black font-mono">
                        +{req.costBreakdown.chefPayoutEstimated || 84} €
                      </strong>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-12 text-center bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl shadow-xs space-y-3">
              <CheckCircle2 size={40} className="text-zinc-400 mx-auto" />
              <h3 className="font-bold text-zinc-900 dark:text-white text-sm">No tienes servicios asignados pendientes</h3>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: CALENDAR & RATES */}
      {activeTab === 'calendar' && (
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl shadow-xs p-6 space-y-6">
          <h3 className="text-sm font-bold text-zinc-900 dark:text-white pb-3 border-b border-zinc-200 dark:border-zinc-800">
            Ajuste de Tarifas y Franjas de Disponibilidad
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-4">
              <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300 block">
                Tarifa por Hora de Cocinado (€/h):
              </label>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min="18"
                  max="45"
                  step="1"
                  value={cookingRate}
                  onChange={(e) => setCookingRate(Number(e.target.value))}
                  className="flex-1 accent-[#E07A5F]"
                />
                <span className="text-lg font-black font-mono text-[#E07A5F] w-16 text-right">
                  {cookingRate} €/h
                </span>
              </div>
              <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                La tarifa recomendada en Madrid para batch cooking oscila entre 22€ y 28€/h.
              </p>
            </div>

            <div className="space-y-4">
              <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300 block">
                Tarifa por Hora de Compra en Súper (€/h):
              </label>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min="12"
                  max="30"
                  step="1"
                  value={groceryRate}
                  onChange={(e) => setGroceryRate(Number(e.target.value))}
                  className="flex-1 accent-amber-500"
                />
                <span className="text-lg font-black font-mono text-amber-700 dark:text-amber-400 w-16 text-right">
                  {groceryRate} €/h
                </span>
              </div>
              <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                Aplica si el cliente solicita que hagas la compra física de frescos en el mercado.
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800 space-y-3">
            <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300 block">
              Tus Franjas Semanales Disponibles:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                'Lunes Mañana', 'Lunes Tarde',
                'Martes Mañana', 'Martes Tarde',
                'Miércoles Mañana', 'Miércoles Tarde',
                'Jueves Mañana', 'Jueves Tarde',
                'Viernes Mañana', 'Viernes Tarde',
                'Sábado Mañana', 'Sábado Tarde',
                'Domingo Mañana', 'Domingo Tarde'
              ].map(slot => (
                <button
                  key={slot}
                  type="button"
                  onClick={() => toggleSlot(slot)}
                  className={`p-2.5 rounded-xl text-xs font-medium border transition-all cursor-pointer ${
                    selectedSlots.includes(slot)
                      ? 'bg-emerald-500/15 border-emerald-500 text-emerald-800 dark:text-emerald-300 font-bold'
                      : 'bg-zinc-50 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400'
                  }`}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: EARNINGS & ESCROW */}
      {activeTab === 'earnings' && (
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl shadow-xs p-6 space-y-4">
          <h3 className="text-sm font-bold text-zinc-900 dark:text-white pb-3 border-b border-zinc-200 dark:border-zinc-800">
            Historial de Transferencias &amp; Depósitos Escrow
          </h3>
          <div className="space-y-2">
            {bookings.map(b => (
              <div key={b.id} className="p-3.5 bg-zinc-50 dark:bg-zinc-800/60 rounded-2xl border border-zinc-200 dark:border-zinc-700 flex items-center justify-between text-xs">
                <div>
                  <strong className="text-zinc-900 dark:text-white block">{b.mealPlanTitle}</strong>
                  <span className="text-zinc-500 dark:text-zinc-400 text-[11px]">{b.targetDate} · Cliente: {b.customerName}</span>
                </div>
                <div className="text-right">
                  <strong className="text-emerald-600 dark:text-emerald-400 font-mono text-sm block">
                    +{b.costBreakdown.chefPayoutEstimated || 84} €
                  </strong>
                  <span className="text-[10px] text-zinc-500 font-bold">Comisión aplicada: {b.costBreakdown.commissionRatePercent}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: CONTRACT & LEGAL */}
      {activeTab === 'contract' && (
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl shadow-xs p-6 space-y-4 text-xs text-zinc-700 dark:text-zinc-300">
          <h3 className="text-sm font-bold text-zinc-900 dark:text-white pb-3 border-b border-zinc-200 dark:border-zinc-800 flex items-center gap-2">
            <FileText size={16} className="text-[#E07A5F]" />
            <span>Contrato Mercantil Digital &amp; Carné de Manipulador</span>
          </h3>
          <p className="leading-relaxed">
            TouChef opera como plataforma tecnológica de intermediación de servicios culinarios. Todos los cocineros de la red cuentan con carné de manipulador de alimentos verificado, seguro de responsabilidad civil y contrato mercantil firmado.
          </p>
          <div className="p-4 bg-zinc-50 dark:bg-zinc-800/60 rounded-2xl border border-zinc-200 dark:border-zinc-700 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-zinc-900 dark:text-white">Estado de la cuenta:</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
                <CheckCircle2 size={14} /> 100% Verificada &amp; Operativa
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span>Carné manipulador sanitario:</span>
              <span className="font-mono text-zinc-900 dark:text-white font-bold">SAN-MAD-2024-8831</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Póliza RC aseguradora:</span>
              <span className="font-mono text-zinc-900 dark:text-white font-bold">MAPFRE Cobertura 50.000 €</span>
            </div>
          </div>
        </div>
      )}

      {/* TAB 6: PRO */}
      {activeTab === 'pro' && (
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl shadow-xs p-6 space-y-4">
          <h3 className="text-sm font-bold text-zinc-900 dark:text-white pb-3 border-b border-zinc-200 dark:border-zinc-800 flex items-center gap-2">
            <Award size={18} className="text-amber-500" />
            <span>Plan TouChef Pro para Cocineros</span>
          </h3>
          <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Reduce tu comisión de intermediación al <strong>3% fijo</strong> en todos tus servicios por solo 19€/mes y obtén el distintivo dorado de Chef Pro.
          </p>
          <button
            onClick={() => setIsProSubscriber(!isProSubscriber)}
            className="px-5 py-2.5 rounded-xl bg-[#E07A5F] hover:bg-[#c85a32] text-white font-bold text-xs shadow-md transition-all cursor-pointer active:scale-95"
          >
            {isProSubscriber ? 'Desactivar Suscripción Pro' : 'Activar TouChef Pro (3% Fee)'}
          </button>
        </div>
      )}

    </div>
  );
};
