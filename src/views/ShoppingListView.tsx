import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Refrigerator, 
  Copy, 
  Check, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  Users, 
  ChefHat,
  Filter,
  Calendar,
  Share2,
  Send,
  Plus
} from 'lucide-react';
import { BatchProject, BatchShoppingItem } from '../types';

interface ShoppingListViewProps {
  activeProject: BatchProject | null;
  onNavigateToInteractiveCook: () => void;
  onNavigateToGenerator?: () => void;
  onToggleItemBought: (itemId: string) => void;
  onAdvanceToCooking: () => void;
  onUpdateShoppingDate?: (dateStr: string) => void;
  onHireChefToCook?: () => void;
}

export function ShoppingListView({ 
  activeProject, 
  onNavigateToInteractiveCook, 
  onNavigateToGenerator,
  onToggleItemBought,
  onAdvanceToCooking,
  onUpdateShoppingDate,
  onHireChefToCook
}: ShoppingListViewProps) {
  const [copied, setCopied] = useState<boolean>(false);
  const [filter, setFilter] = useState<'all' | 'pending' | 'bought'>('all');
  const [scheduledDate, setScheduledDate] = useState<string>(
    activeProject?.plannedShoppingDate || new Date().toISOString().split('T')[0]
  );

  const items = activeProject?.shoppingList || [];
  const totalItems = items.length;
  const boughtItems = items.filter(i => i.isBought).length;
  const pendingItems = totalItems - boughtItems;
  const progressPercent = totalItems > 0 ? Math.round((boughtItems / totalItems) * 100) : 100;

  // Filter items
  const filteredItems = items.filter(item => {
    if (filter === 'pending') return !item.isBought;
    if (filter === 'bought') return item.isBought;
    return true;
  });

  // Group by category
  const categoriesMap: Record<string, BatchShoppingItem[]> = {};
  filteredItems.forEach(item => {
    const cat = item.category || 'despensa';
    if (!categoriesMap[cat]) categoriesMap[cat] = [];
    categoriesMap[cat].push(item);
  });

  const getCategoryLabel = (cat: string) => {
    switch (cat) {
      case 'frescos': return '🥬 Verduras & Frescos de Huerta';
      case 'carnes-pescados': return '🥩 Carnes, Aves & Pescados';
      case 'refrigerados': return '🧀 Refrigerados & Lácteos';
      case 'legumbres': return '🍲 Legumbres & Cereales';
      case 'despensa': return '🥫 Despensa & Caldos';
      case 'especias': return '🌿 Aceites, Salsas & Especias';
      default: return '📦 Otros Ingredientes';
    }
  };

  const getFormattedShoppingText = () => {
    if (!activeProject) return '';
    const lines = [
      `🛒 *LISTA DE COMPRA - ${activeProject.title.toUpperCase()}*`,
      `📦 ${activeProject.totalServings} raciones para ${activeProject.peopleCount} comensales (${activeProject.daysCount} días)`,
      `📅 Fecha de compra prevista: ${scheduledDate}`,
      ''
    ];

    Object.entries(categoriesMap).forEach(([cat, catItems]) => {
      const toBuy = catItems.filter(i => !i.isBought && i.toBuyQty > 0);
      if (toBuy.length > 0) {
        lines.push(`*${getCategoryLabel(cat)}*`);
        toBuy.forEach(i => {
          lines.push(`▫️ ${i.name}: ${i.toBuyQty} ${i.unit}`);
        });
        lines.push('');
      }
    });

    lines.push('✨ _Generado con TouChef Batch Cooking_');
    return lines.join('\n');
  };

  const handleCopyList = () => {
    const text = getFormattedShoppingText();
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShareWhatsApp = () => {
    const text = getFormattedShoppingText();
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setScheduledDate(val);
    if (onUpdateShoppingDate) {
      onUpdateShoppingDate(val);
    }
  };

  if (!activeProject) {
    return (
      <div className="bg-white dark:bg-zinc-900 rounded-3xl p-8 border border-zinc-200 dark:border-zinc-800 text-center space-y-4 max-w-lg mx-auto my-8">
        <div className="w-12 h-12 rounded-2xl bg-[#E07A5F]/10 text-[#E07A5F] dark:text-[#F4A261] flex items-center justify-center mx-auto">
          <ShoppingBag size={24} />
        </div>
        <div>
          <h2 className="text-base font-bold text-zinc-900 dark:text-white">No hay ningún lote de cocina activo</h2>
          <p className="text-xs text-zinc-500 mt-1">Genera un lote semanal para calcular tu lista de compra con descuento de despensa.</p>
        </div>
        {onNavigateToGenerator && (
          <button
            onClick={onNavigateToGenerator}
            className="btn-hero-copper text-white font-bold text-xs px-5 py-3 rounded-2xl shadow-xs transition-all flex items-center justify-center gap-2 mx-auto"
          >
            <Sparkles size={14} />
            <span>Generar Lote con IA</span>
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="w-full space-y-4 sm:space-y-6 animate-fade-in pb-12 text-zinc-900 dark:text-zinc-100">
      
      {/* HEADER: VINCULADO AL PROYECTO BATCH */}
      <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 p-5 sm:p-6 shadow-xs space-y-4">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-[#E07A5F]/10 text-[#E07A5F] dark:text-[#F4A261] flex items-center justify-center font-bold border border-[#E07A5F]/20 shrink-0">
              <ShoppingBag size={22} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold bg-[#E07A5F]/10 text-[#E07A5F] dark:text-[#F4A261] px-2 py-0.5 rounded uppercase">
                  Lista de Compra Optimizada
                </span>
                <span className="text-xs text-zinc-500 font-medium">
                  {activeProject.totalServings} raciones
                </span>
              </div>
              <h1 className="text-base sm:text-lg font-black text-zinc-900 dark:text-white mt-0.5">
                {activeProject.title}
              </h1>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleCopyList}
              className="glass-surface text-zinc-800 dark:text-zinc-200 font-bold text-xs px-3.5 py-2 rounded-xl transition-colors flex items-center gap-1.5 active:scale-95 cursor-pointer"
            >
              {copied ? <Check size={14} className="text-[#E07A5F]" /> : <Copy size={14} />}
              <span>{copied ? '¡Copiada!' : 'Copiar'}</span>
            </button>

            <button
              onClick={handleShareWhatsApp}
              className="bg-[#52796F]/15 hover:bg-[#52796F] text-[#84A98C] hover:text-white font-bold text-xs px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 active:scale-95 cursor-pointer"
              title="Compartir por WhatsApp"
            >
              <Send size={13} />
              <span>WhatsApp</span>
            </button>

            <button
              onClick={onAdvanceToCooking}
              className="btn-hero-copper font-bold text-xs px-4 py-2 rounded-xl shadow-xs transition-all flex items-center gap-1.5 active:scale-95 cursor-pointer"
            >
              <ChefHat size={14} />
              <span>Ir a Cocinar</span>
            </button>
          </div>
        </div>

        {/* Date Selector & Progress Row */}
        <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          
          <div className="flex items-center gap-2 text-xs">
            <Calendar size={15} className="text-[#E07A5F] shrink-0" />
            <span className="text-zinc-500 dark:text-zinc-400 font-semibold">Día de compra previsto:</span>
            <input 
              type="date" 
              value={scheduledDate} 
              onChange={handleDateChange}
              className="glass-surface text-zinc-900 dark:text-zinc-100 text-xs px-2.5 py-1 rounded-lg font-mono focus:outline-none focus:border-[#E07A5F]"
            />
          </div>

          <div className="flex items-center gap-3">
            <div className="text-xs text-right">
              <span className="font-bold text-[#E07A5F]">{boughtItems} de {totalItems}</span>
              <span className="text-zinc-400 text-[11px]"> ingredientes ({progressPercent}%)</span>
            </div>
            <div className="w-24 h-2 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-[#E07A5F] rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>

      </div>

      {/* PANTRY VS SHOPPING COMPARATIVE SUMMARY */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-between text-xs">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
              <Refrigerator size={18} />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase text-emerald-700 dark:text-emerald-400 block">
                En tu Nevera &amp; Despensa
              </span>
              <strong className="text-zinc-900 dark:text-white text-xs">
                {items.filter(i => i.isFromPantryDeduction || i.inPantryQty > 0).length} ingredientes aprovechados
              </strong>
            </div>
          </div>
          <span className="text-emerald-600 dark:text-emerald-400 font-black text-xs">
            Descontados
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-[#E07A5F]/10 border border-[#E07A5F]/20 flex items-center justify-between text-xs">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#E07A5F]/20 text-[#E07A5F] flex items-center justify-center font-bold">
              <ShoppingBag size={18} />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase text-[#E07A5F] block">
                Qué Necesitas Comprar
              </span>
              <strong className="text-zinc-900 dark:text-white text-xs">
                {items.filter(i => i.toBuyQty > 0).length} productos para el súper/mercado
              </strong>
            </div>
          </div>
          <span className="text-[#E07A5F] font-black text-xs">
            Pendientes
          </span>
        </div>
      </div>

      {/* BANNER 100% COMPLETADO */}
      {progressPercent === 100 && totalItems > 0 && (
        <div className="p-4 bg-[#E07A5F]/15 border border-[#E07A5F]/40 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-4 animate-fade-in shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#E07A5F] text-white flex items-center justify-center font-bold shrink-0">
              <CheckCircle2 size={22} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">¡Todos los ingredientes están listos!</h3>
              <p className="text-xs text-zinc-300">Has completado la compra. Es el momento perfecto para encender los fogones.</p>
            </div>
          </div>

          <button
            onClick={onAdvanceToCooking}
            className="w-full sm:w-auto px-5 py-2.5 btn-hero-copper text-white font-black text-xs rounded-xl shadow-sm transition-all flex items-center justify-center gap-1.5 active:scale-95 shrink-0"
          >
            <ChefHat size={15} />
            <span>Iniciar Cocinado Simultáneo</span>
            <ArrowRight size={14} />
          </button>
        </div>
      )}

      {/* FILTER TABS */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setFilter('all')}
          className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${
            filter === 'all' 
              ? 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 shadow-xs' 
              : 'bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400'
          }`}
        >
          Todos ({totalItems})
        </button>

        <button
          onClick={() => setFilter('pending')}
          className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${
            filter === 'pending' 
              ? 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 shadow-xs' 
              : 'bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400'
          }`}
        >
          🧺 Por Comprar ({items.filter(i => !i.isBought && i.toBuyQty > 0).length})
        </button>

        <button
          onClick={() => setFilter('bought')}
          className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${
            filter === 'bought' 
              ? 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 shadow-xs' 
              : 'bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400'
          }`}
        >
          🧊 Comprados / En Despensa ({boughtItems})
        </button>
      </div>

      {/* CATEGORIZED INGREDIENTS LIST */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {Object.keys(categoriesMap).length > 0 ? (
          Object.entries(categoriesMap).map(([categoryKey, catItems]) => (
            <div 
              key={categoryKey}
              className="bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 p-4 sm:p-5 shadow-xs space-y-3"
            >
              <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800/80 pb-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                  {getCategoryLabel(categoryKey)}
                </h3>
                <span className="text-[11px] font-mono text-zinc-400">
                  {catItems.filter(i => i.isBought).length}/{catItems.length}
                </span>
              </div>

              <div className="divide-y divide-zinc-100 dark:divide-zinc-800/60">
                {catItems.map((item) => (
                  <div 
                    key={item.id}
                    onClick={() => onToggleItemBought(item.id)}
                    className="py-2.5 flex items-center justify-between gap-3 cursor-pointer group select-none"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className={`w-5 h-5 rounded-lg border flex items-center justify-center transition-all ${
                        item.isBought 
                          ? 'bg-[#E07A5F] border-[#E07A5F] text-white' 
                          : 'border-zinc-300 dark:border-zinc-700 group-hover:border-[#E07A5F]'
                      }`}>
                        {item.isBought && <Check size={12} strokeWidth={3} />}
                      </div>

                      <div className="min-w-0">
                        <span className={`text-xs font-medium block truncate ${
                          item.isBought 
                            ? 'line-through text-zinc-400 dark:text-zinc-500' 
                            : 'text-zinc-900 dark:text-zinc-100'
                        }`}>
                          {item.name}
                        </span>

                        {item.isFromPantryDeduction && (
                          <span className="text-[10px] text-[#E07A5F] dark:text-[#F4A261] font-semibold flex items-center gap-1 mt-0.5">
                            <Refrigerator size={10} /> Descontado {item.inPantryQty} {item.unit} de tu despensa
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className={`text-xs font-mono font-bold ${
                        item.isBought ? 'text-zinc-400 dark:text-zinc-500' : 'text-zinc-900 dark:text-white'
                      }`}>
                        {item.toBuyQty > 0 ? `${item.toBuyQty} ${item.unit}` : `En casa`}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <div className="p-8 text-center bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 text-zinc-400 text-xs">
            No hay ingredientes con el filtro seleccionado.
          </div>
        )}
      </div>

    </div>
  );
}
