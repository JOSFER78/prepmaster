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
}

export function ShoppingListView({ 
  activeProject, 
  onNavigateToInteractiveCook, 
  onNavigateToGenerator,
  onToggleItemBought,
  onAdvanceToCooking,
  onUpdateShoppingDate
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
        <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
          <ShoppingBag size={24} />
        </div>
        <div>
          <h2 className="text-base font-bold text-zinc-900 dark:text-white">No hay ningún lote de cocina activo</h2>
          <p className="text-xs text-zinc-500 mt-1">Genera un lote semanal para calcular tu lista de compra con descuento de despensa.</p>
        </div>
        {onNavigateToGenerator && (
          <button
            onClick={onNavigateToGenerator}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-5 py-3 rounded-2xl shadow-xs transition-all flex items-center justify-center gap-2 mx-auto"
          >
            <Sparkles size={14} />
            <span>Generar Lote con IA</span>
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-4 animate-fade-in pb-12 text-zinc-900 dark:text-zinc-100 max-w-4xl mx-auto">
      
      {/* HEADER: VINCULADO AL PROYECTO BATCH */}
      <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 p-5 sm:p-6 shadow-xs space-y-4">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold border border-emerald-500/20 shrink-0">
              <ShoppingBag size={22} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 px-2 py-0.5 rounded uppercase">
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
              className="bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 font-bold text-xs px-3.5 py-2 rounded-xl transition-colors flex items-center gap-1.5 active:scale-95"
            >
              {copied ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
              <span>{copied ? '¡Copiada!' : 'Copiar'}</span>
            </button>

            <button
              onClick={handleShareWhatsApp}
              className="bg-emerald-600/15 hover:bg-emerald-600 text-emerald-700 dark:text-emerald-300 hover:text-white font-bold text-xs px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 active:scale-95"
              title="Compartir por WhatsApp"
            >
              <Send size={13} />
              <span>WhatsApp</span>
            </button>

            <button
              onClick={onAdvanceToCooking}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-2 rounded-xl shadow-xs transition-all flex items-center gap-1.5 active:scale-95"
            >
              <ChefHat size={14} />
              <span>Ir a Cocinar</span>
            </button>
          </div>
        </div>

        {/* Date Selector & Progress Row */}
        <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          
          <div className="flex items-center gap-2 text-xs">
            <Calendar size={15} className="text-emerald-500 shrink-0" />
            <span className="text-zinc-500 dark:text-zinc-400 font-semibold">Día de compra previsto:</span>
            <input 
              type="date" 
              value={scheduledDate} 
              onChange={handleDateChange}
              className="bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 text-xs px-2.5 py-1 rounded-lg font-mono focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="flex items-center gap-3">
            <div className="text-xs text-right">
              <span className="font-bold text-emerald-600 dark:text-emerald-400">{boughtItems} de {totalItems}</span>
              <span className="text-zinc-400 text-[11px]"> ingredientes ({progressPercent}%)</span>
            </div>
            <div className="w-24 h-2 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-emerald-500 rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

        </div>

      </div>

      {/* BANNER 100% COMPLETADO */}
      {progressPercent === 100 && totalItems > 0 && (
        <div className="p-4 bg-emerald-950/30 border border-emerald-500/40 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-4 animate-fade-in shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500 text-zinc-950 flex items-center justify-center font-bold shrink-0">
              <CheckCircle2 size={22} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">¡Todos los ingredientes están listos!</h3>
              <p className="text-xs text-emerald-300/80">Has completado la compra. Es el momento perfecto para encender los fogones.</p>
            </div>
          </div>

          <button
            onClick={onAdvanceToCooking}
            className="w-full sm:w-auto px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-black text-xs rounded-xl shadow-sm transition-all flex items-center justify-center gap-1.5 active:scale-95 shrink-0"
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
          className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all ${
            filter === 'all' 
              ? 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 shadow-xs' 
              : 'bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400'
          }`}
        >
          Todos ({totalItems})
        </button>

        <button
          onClick={() => setFilter('pending')}
          className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all ${
            filter === 'pending' 
              ? 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 shadow-xs' 
              : 'bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400'
          }`}
        >
          Pendientes ({pendingItems})
        </button>

        <button
          onClick={() => setFilter('bought')}
          className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all ${
            filter === 'bought' 
              ? 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 shadow-xs' 
              : 'bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400'
          }`}
        >
          Comprados / En Casa ({boughtItems})
        </button>
      </div>

      {/* CATEGORIZED INGREDIENTS LIST */}
      <div className="space-y-4">
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
                          ? 'bg-emerald-500 border-emerald-500 text-white' 
                          : 'border-zinc-300 dark:border-zinc-700 group-hover:border-emerald-500'
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
                          <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1 mt-0.5">
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
