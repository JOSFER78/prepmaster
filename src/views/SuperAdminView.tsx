import React, { useState } from 'react';
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
  Layers
} from 'lucide-react';
import { ChefBookingRequest, ViewState } from '../types';
import { loadChefBookingsFromStorage, MOCK_CHEFS } from '../lib/chefsData';
import { loadSupermarketOrdersFromStorage } from '../lib/supermarketEngine';

interface SuperAdminViewProps {
  onNavigate: (view: ViewState) => void;
}

export const SuperAdminView: React.FC<SuperAdminViewProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'bookings' | 'chefs' | 'supermarket'>('overview');
  
  const bookings = loadChefBookingsFromStorage();
  const supermarketOrders = loadSupermarketOrdersFromStorage();

  // Metrics
  const totalGMV = bookings.reduce((acc, b) => acc + b.costBreakdown.totalClientPrice, 0) +
                   supermarketOrders.reduce((acc, o) => acc + o.totalOrderPrice, 0);
  
  const platformRevenue = bookings.reduce((acc, b) => acc + b.costBreakdown.platformServiceFee, 0);
  const activeBookingsCount = bookings.filter(b => b.status === 'confirmed' || b.status === 'in_progress').length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6 animate-in fade-in duration-300 text-stone-200">
      
      {/* Top Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-stone-900 via-stone-850 to-stone-900 border border-zinc-200 dark:border-zinc-700 p-6 sm:p-8 shadow-2xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-amber-500 text-stone-950 flex items-center justify-center font-bold text-2xl shadow-lg">
              <ShieldCheck size={28} />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider bg-stone-800 text-amber-300 px-2.5 py-0.5 rounded-full">
                Centro de Operaciones Global
              </span>
              <h1 className="text-2xl font-black text-zinc-900 dark:text-white mt-1">
                SuperAdmin · TouChef Platform Matrix
              </h1>
              <p className="text-xs text-zinc-600 dark:text-zinc-400">
                Supervisión en tiempo real de transacciones, retención de depósitos, DIA delivery y validación de cocineros.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-emerald-600 dark:text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 px-3 py-1.5 rounded-xl font-bold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Sistemas Operativos 100%
            </span>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xs rounded-2xl space-y-1">
          <span className="text-zinc-600 dark:text-zinc-400 text-xs flex items-center gap-1">
            <TrendingUp size={13} className="text-[#E07A5F] dark:text-amber-400" />
            GMV Global Plataforma:
          </span>
          <div className="text-xl font-black text-[#E07A5F] dark:text-amber-400 font-mono">
            {Math.round(totalGMV)} €
          </div>
          <span className="text-[10px] text-stone-500">Reservas + Supermercados</span>
        </div>

        <div className="p-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xs rounded-2xl space-y-1">
          <span className="text-zinc-600 dark:text-zinc-400 text-xs flex items-center gap-1">
            <DollarSign size={13} className="text-emerald-600 dark:text-emerald-400" />
            Comisión Capturada (Take):
          </span>
          <div className="text-xl font-black text-emerald-600 dark:text-emerald-400 font-mono">
            {Math.round(platformRevenue)} €
          </div>
          <span className="text-[10px] text-stone-500">Take Rate medio: 8.5%</span>
        </div>

        <div className="p-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xs rounded-2xl space-y-1">
          <span className="text-zinc-600 dark:text-zinc-400 text-xs flex items-center gap-1">
            <ChefHat size={13} className="text-[#E07A5F] dark:text-amber-400" />
            Cocineros Verificados:
          </span>
          <div className="text-xl font-black text-zinc-900 dark:text-white font-mono">
            {MOCK_CHEFS.length}
          </div>
          <span className="text-[10px] text-stone-500">Madrid, Barcelona, Valencia</span>
        </div>

        <div className="p-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xs rounded-2xl space-y-1">
          <span className="text-zinc-600 dark:text-zinc-400 text-xs flex items-center gap-1">
            <ShoppingBag size={13} className="text-rose-600 dark:text-rose-400" />
            Pedidos Supermercado DIA:
          </span>
          <div className="text-xl font-black text-rose-600 dark:text-rose-400 font-mono">
            {supermarketOrders.length}
          </div>
          <span className="text-[10px] text-stone-500">Entrega franja garantizada</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-zinc-200 dark:border-zinc-700 pb-3">
        {[
          { id: 'overview' as const, label: 'Supervisión de Reservas & Escrow' },
          { id: 'chefs' as const, label: 'Verificación Sanitaria de Chefs' },
          { id: 'supermarket' as const, label: 'Cestas Supermercado DIA' }
        ].map(t => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === t.id
                ? 'bg-amber-500 text-stone-950 font-black'
                : 'bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xs text-zinc-600 dark:text-zinc-400 hover:text-white'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* TAB: OVERVIEW & ESCROW */}
      {activeTab === 'overview' && (
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xs rounded-3xl p-5 space-y-4 text-xs">
          <div className="flex justify-between items-center pb-2 border-b border-zinc-200 dark:border-zinc-700">
            <h3 className="font-bold text-zinc-900 dark:text-white text-sm font-bold">Registro Global de Reservas y Fondos en Custodia</h3>
            <span className="text-zinc-600 dark:text-zinc-400">{bookings.length} reservas registradas</span>
          </div>

          <div className="space-y-3">
            {bookings.map(b => (
              <div key={b.id} className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700/60 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-zinc-900 dark:text-white">{b.chefName}</span>
                    <span className="text-stone-500">•</span>
                    <span className="text-[#E07A5F] dark:text-amber-400">{b.targetDate} ({b.targetTimeSlot})</span>
                    <span className="text-[10px] bg-stone-800 text-zinc-700 dark:text-zinc-300 px-2 py-0.5 rounded uppercase">
                      {b.status}
                    </span>
                  </div>
                  <p className="text-zinc-600 dark:text-zinc-400 text-[11px]">{b.mealPlanTitle} — {b.address}</p>
                </div>

                <div className="flex items-center gap-4 text-right">
                  <div>
                    <span className="text-zinc-600 dark:text-zinc-400 block text-[10px]">Cliente pagó (Escrow):</span>
                    <strong className="text-zinc-900 dark:text-white text-sm font-bold font-mono">{b.costBreakdown.totalClientPrice} €</strong>
                  </div>
                  <div>
                    <span className="text-zinc-600 dark:text-zinc-400 block text-[10px]">Comisión TouChef ({b.costBreakdown.commissionRatePercent}%):</span>
                    <strong className="text-[#E07A5F] dark:text-amber-400 text-sm font-mono">{b.costBreakdown.platformServiceFee} €</strong>
                  </div>
                  <div>
                    <span className="text-zinc-600 dark:text-zinc-400 block text-[10px]">Pago Neto Chef:</span>
                    <strong className="text-emerald-600 dark:text-emerald-400 text-sm font-mono">{b.costBreakdown.chefPayoutEstimated} €</strong>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB: CHEFS VERIFICATION */}
      {activeTab === 'chefs' && (
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xs rounded-3xl p-5 space-y-4 text-xs">
          <div className="flex justify-between items-center pb-2 border-b border-zinc-200 dark:border-zinc-700">
            <h3 className="font-bold text-zinc-900 dark:text-white text-sm font-bold">Directorio de Cocineros & Documentación</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {MOCK_CHEFS.map(chef => (
              <div key={chef.id} className="p-4 bg-stone-850 rounded-2xl border border-zinc-200 dark:border-zinc-700 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <img src={chef.avatar} alt={chef.name} className="w-12 h-12 rounded-xl object-cover" />
                  <div>
                    <strong className="text-zinc-900 dark:text-white block text-sm font-bold">{chef.name}</strong>
                    <span className="text-zinc-600 dark:text-zinc-400 text-[11px]">{chef.locationCity} • {chef.pricing.cookingHourRate} €/h</span>
                    <div className="flex items-center gap-1 text-[10px] text-emerald-600 dark:text-emerald-400 mt-0.5">
                      <ShieldCheck size={12} />
                      <span>Certificado Manipulador de Alimentos Verificado</span>
                    </div>
                  </div>
                </div>

                <span className="text-xs bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 font-bold font-bold px-2.5 py-1 rounded-xl">
                  Aprobado
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB: SUPERMARKET LOGISTICS */}
      {activeTab === 'supermarket' && (
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xs rounded-3xl p-5 space-y-4 text-xs">
          <div className="flex justify-between items-center pb-2 border-b border-zinc-200 dark:border-zinc-700">
            <h3 className="font-bold text-zinc-900 dark:text-white text-sm font-bold">Envíos de Supermercados Coordinados</h3>
          </div>

          <div className="space-y-3">
            {supermarketOrders.map(order => (
              <div key={order.id} className="p-4 bg-stone-850 rounded-2xl border border-zinc-200 dark:border-zinc-700 flex justify-between items-center">
                <div>
                  <strong className="text-zinc-900 dark:text-white block font-bold">{order.planTitle} ({order.provider.name})</strong>
                  <span className="text-[11px] text-zinc-600 dark:text-zinc-400">Franja: {order.selectedSlot.date} {order.selectedSlot.label} • {order.deliveryAddress}</span>
                </div>
                <div className="text-right">
                  <span className="text-[#E07A5F] dark:text-amber-400 font-bold font-mono text-sm block">{order.totalOrderPrice} €</span>
                  <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold uppercase">{order.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
