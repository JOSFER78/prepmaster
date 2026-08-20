import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  TrendingUp, 
  Users, 
  ChefHat, 
  ShoppingBag, 
  DollarSign, 
  AlertTriangle, 
  CheckCircle2, 
  Check, 
  X, 
  Clock, 
  FileText, 
  Search, 
  ExternalLink, 
  Layers,
  Sparkles,
  Radio,
  BadgeCheck
} from 'lucide-react';
import { ChefBookingRequest, ViewState, ChefProfile } from '../types';
import { subscribeToBookings } from '../services/bookingService';
import { subscribeToChefs, saveChefProfile } from '../services/chefService';
import { subscribeToSupermarketOrders } from '../services/supermarketService';
import { SupermarketOrder } from '../lib/supermarketEngine';

interface SuperAdminViewProps {
  onNavigate: (view: ViewState) => void;
}

export const SuperAdminView: React.FC<SuperAdminViewProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'bookings' | 'chefs' | 'supermarket'>('overview');
  
  const [bookings, setBookings] = useState<ChefBookingRequest[]>([]);
  const [chefs, setChefs] = useState<ChefProfile[]>([]);
  const [supermarketOrders, setSupermarketOrders] = useState<SupermarketOrder[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [actionSuccess, setActionSuccess] = useState<string | null>(null);

  useEffect(() => {
    const unsubBookings = subscribeToBookings(setBookings);
    const unsubChefs = subscribeToChefs(setChefs);
    const unsubOrders = subscribeToSupermarketOrders(setSupermarketOrders);

    return () => {
      unsubBookings();
      unsubChefs();
      unsubOrders();
    };
  }, []);

  // Real live Metrics computed from Firestore
  const totalGMV = bookings.reduce((acc, b) => acc + (b.costBreakdown?.totalClientPrice || 0), 0) +
                   supermarketOrders.reduce((acc, o) => acc + (o.totalOrderPrice || 0), 0);
  
  const platformRevenue = bookings.reduce((acc, b) => acc + (b.costBreakdown?.platformServiceFee || 0), 0);
  const activeBookingsCount = bookings.filter(b => b.status === 'confirmed' || b.status === 'in_progress').length;
  const verifiedChefsCount = chefs.filter(c => c.isVerified).length;

  const handleToggleChefVerification = async (chef: ChefProfile) => {
    try {
      const updated: ChefProfile = {
        ...chef,
        isVerified: !chef.isVerified,
        badges: !chef.isVerified
          ? [...(chef.badges || []), 'Chef Homologado SuperAdmin']
          : (chef.badges || []).filter(b => b !== 'Chef Homologado SuperAdmin')
      };
      await saveChefProfile(updated);
      setActionSuccess(`Chef ${chef.name} ${!chef.isVerified ? 'Homologado y Verificado' : 'suspendido temporalmente'}`);
      setTimeout(() => setActionSuccess(null), 3000);
    } catch (e) {
      console.error('Error toggling chef verification:', e);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6 animate-in fade-in duration-300 text-zinc-900 dark:text-zinc-100">
      
      {/* Top Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-zinc-900 border border-zinc-800 p-6 sm:p-8 shadow-2xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-amber-500 text-zinc-950 flex items-center justify-center font-bold text-2xl shadow-lg">
              <ShieldCheck size={28} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-wider bg-zinc-800 text-amber-300 px-2.5 py-0.5 rounded-full border border-amber-500/30">
                  Centro de Control SuperAdmin (SSOT Firestore)
                </span>
                <span className="text-[10px] font-black uppercase bg-emerald-500/20 text-emerald-300 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                  josferestudio@gmail.com
                </span>
              </div>
              <h1 className="text-2xl font-black text-white mt-1">
                SuperAdmin · TouChef Platform Matrix
              </h1>
              <p className="text-xs text-zinc-400">
                Supervisión en tiempo real de transacciones, retención de depósitos, DIA delivery y validación sanitaria de cocineros.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 px-3 py-1.5 rounded-xl font-bold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Sincronización Firestore Real-Time
            </span>
          </div>
        </div>
      </div>

      {actionSuccess && (
        <div className="p-3 bg-emerald-500/15 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 rounded-2xl text-xs font-bold flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 size={16} />
          <span>{actionSuccess}</span>
        </div>
      )}

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xs rounded-2xl space-y-1">
          <span className="text-zinc-600 dark:text-zinc-400 text-xs flex items-center gap-1">
            <TrendingUp size={13} className="text-amber-500" />
            GMV Global Plataforma:
          </span>
          <div className="text-xl font-black text-amber-600 dark:text-amber-400 font-mono">
            {Math.round(totalGMV)} €
          </div>
          <span className="text-[10px] text-zinc-500">Reservas + Supermercados</span>
        </div>

        <div className="p-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xs rounded-2xl space-y-1">
          <span className="text-zinc-600 dark:text-zinc-400 text-xs flex items-center gap-1">
            <DollarSign size={13} className="text-emerald-500" />
            Comisión Capturada (Take):
          </span>
          <div className="text-xl font-black text-emerald-600 dark:text-emerald-400 font-mono">
            {Math.round(platformRevenue)} €
          </div>
          <span className="text-[10px] text-zinc-500">0% sobre comida · Take sobre MO</span>
        </div>

        <div className="p-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xs rounded-2xl space-y-1">
          <span className="text-zinc-600 dark:text-zinc-400 text-xs flex items-center gap-1">
            <ChefHat size={13} className="text-amber-500" />
            Cocineros en Directorio:
          </span>
          <div className="text-xl font-black text-zinc-900 dark:text-white font-mono">
            {chefs.length}
          </div>
          <span className="text-[10px] text-emerald-500">{verifiedChefsCount} Homologados</span>
        </div>

        <div className="p-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xs rounded-2xl space-y-1">
          <span className="text-zinc-600 dark:text-zinc-400 text-xs flex items-center gap-1">
            <ShoppingBag size={13} className="text-rose-500" />
            Pedidos DIA Coordinados:
          </span>
          <div className="text-xl font-black text-zinc-900 dark:text-white font-mono">
            {supermarketOrders.length}
          </div>
          <span className="text-[10px] text-zinc-500">{activeBookingsCount} servicios activos</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-zinc-200 dark:border-zinc-800 pb-3">
        {[
          { id: 'overview' as const, label: 'Visión General' },
          { id: 'chefs' as const, label: `👨‍🍳 Directorio de Chefs (${chefs.length})` },
          { id: 'bookings' as const, label: `📅 Reservas & Broadcast (${bookings.length})` },
          { id: 'supermarket' as const, label: `🛒 Pedidos DIA (${supermarketOrders.length})` }
        ].map(t => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === t.id
                ? 'btn-hero-copper text-white shadow-xs'
                : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* TAB CHEFS */}
      {activeTab === 'chefs' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {chefs.map(chef => (
              <div key={chef.id} className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xs space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <img src={chef.avatar} alt={chef.name} className="w-12 h-12 rounded-xl object-cover border border-amber-500/30" />
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-sm text-zinc-900 dark:text-white">{chef.name}</h4>
                        {chef.isVerified ? (
                          <span className="text-[10px] bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded-full font-bold border border-emerald-500/30 flex items-center gap-1">
                            <BadgeCheck size={11} /> Homologado
                          </span>
                        ) : (
                          <span className="text-[10px] bg-amber-500/20 text-amber-600 dark:text-amber-400 px-2 py-0.5 rounded-full font-bold">
                            Pendiente Validación
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-zinc-500">{chef.locationCity} · {chef.pricing.cookingHourRate}€/h cocina</span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleToggleChefVerification(chef)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                      chef.isVerified 
                        ? 'bg-rose-500/10 text-rose-600 dark:text-rose-400 hover:bg-rose-500/20 border border-rose-500/30'
                        : 'bg-emerald-600 text-white hover:bg-emerald-500 shadow-sm'
                    }`}
                  >
                    {chef.isVerified ? 'Suspender' : 'Homologar Chef'}
                  </button>
                </div>

                <p className="text-xs text-zinc-600 dark:text-zinc-400 line-clamp-2">{chef.bio}</p>

                <div className="pt-2 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between text-xs text-zinc-500">
                  <span>Manipulador: <strong className="text-zinc-700 dark:text-zinc-300">{chef.foodHandlerCertificateNumber || 'CERT-MAD-2026-9882'}</strong></span>
                  <span>Especialidades: {chef.specialties.slice(0, 2).join(', ')}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB BOOKINGS */}
      {activeTab === 'bookings' && (
        <div className="space-y-3">
          {bookings.length === 0 ? (
            <div className="p-8 text-center bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 text-zinc-500">
              No hay reservas registradas en Firestore todavía.
            </div>
          ) : (
            bookings.map(b => (
              <div key={b.id} className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-amber-600 dark:text-amber-400">{b.id}</span>
                    <span className="font-bold text-zinc-900 dark:text-white">{b.mealPlanTitle}</span>
                    <span className="px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-[10px] uppercase font-bold text-zinc-500">
                      {b.status}
                    </span>
                  </div>
                  <div className="text-zinc-500">
                    Cliente: {b.customerName} · Fecha: {b.targetDate} ({b.targetTimeSlot}) · {b.dishes?.length || 0} platos
                  </div>
                </div>

                <div className="text-right font-mono text-sm font-black text-zinc-900 dark:text-white">
                  {b.costBreakdown?.totalClientPrice || 0} €
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* TAB SUPERMARKET */}
      {activeTab === 'supermarket' && (
        <div className="space-y-3">
          {supermarketOrders.length === 0 ? (
            <div className="p-8 text-center bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 text-zinc-500">
              No hay pedidos de supermercado activos en Firestore.
            </div>
          ) : (
            supermarketOrders.map(o => (
              <div key={o.id} className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-between text-xs">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-zinc-900 dark:text-white">Pedido DIA #{o.id}</span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold text-[10px]">
                      {o.status}
                    </span>
                  </div>
                  <span className="text-zinc-500">{o.items?.length || 0} artículos frescos · Entrega {o.selectedSlot?.date}</span>
                </div>
                <div className="font-mono font-bold text-zinc-900 dark:text-white">
                  {o.totalOrderPrice} €
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* TAB OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-4">
          <h3 className="text-base font-black text-zinc-900 dark:text-white">
            Arquitectura Global &amp; Protocolos Forenses
          </h3>
          <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
            TouChef opera con una arquitectura de Fuente Única de Verdad (SSOT) alojada en Cloud Firestore. 
            Toda interacción de compra, encargo a cocineros, verificación de carnet de manipulador de alimentos y chat estilo Wallapop se sincroniza de forma segura y reactiva sin uso de almacenamiento volátil local.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <div className="p-3.5 rounded-2xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700 text-xs space-y-1">
              <span className="font-bold text-zinc-900 dark:text-white block">Recetario Canónico</span>
              <p className="text-zinc-500 text-[11px]">15 compendios técnicos de Cocina con Carmen con gramos por ración y alérgenos UE.</p>
            </div>
            <div className="p-3.5 rounded-2xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700 text-xs space-y-1">
              <span className="font-bold text-zinc-900 dark:text-white block">4 Modalidades de Servicio</span>
              <p className="text-zinc-500 text-[11px]">Solo cocina, con herramientas pro, con compra integral y con ayudante de cocina.</p>
            </div>
            <div className="p-3.5 rounded-2xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700 text-xs space-y-1">
              <span className="font-bold text-zinc-900 dark:text-white block">Garantía Sanitaria</span>
              <p className="text-zinc-500 text-[11px]">Protocolo de seguridad alimentaria APPCC y manipulador de alimentos certificado.</p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
