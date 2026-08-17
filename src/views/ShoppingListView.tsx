import React, { useState } from 'react';
import { ShoppingBag, Refrigerator, Copy, Check, Sparkles, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';
import { ShoppingCategory, ShoppingCategoryItem, GeneratedMenuPlan } from '../types';
import { initialFridgeStock } from '../data';

interface ShoppingListViewProps {
  currentMenuPlan?: GeneratedMenuPlan | null;
  onNavigateToInteractiveCook: () => void;
  onNavigateToGenerator?: () => void;
}

export function ShoppingListView({ currentMenuPlan, onNavigateToInteractiveCook, onNavigateToGenerator }: ShoppingListViewProps) {
  const [subStep, setSubStep] = useState<1 | 2 | 3 | 4>(1); // 1: Control Despensa, 2: Diferencial Neto, 3: Lista por Pasillos, 4: Exportar / Avanzar
  const [copied, setCopied] = useState<boolean>(false);
  const [filterBought, setFilterBought] = useState<'ALL' | 'PENDING' | 'BOUGHT'>('ALL');

  // Build shopping categories with automatic pantry deduction
  const [categories, setCategories] = useState<ShoppingCategory[]>(() => {
    const defaultConsolidated = [
      { name: 'Lentejas pardinas', qty: 500, unit: 'g', cat: 'Despensa & Secos' },
      { name: 'Ternera para mechada', qty: 1200, unit: 'g', cat: 'Carnes & Pescados' },
      { name: 'Lomos de merluza fresca', qty: 800, unit: 'g', cat: 'Carnes & Pescados' },
      { name: 'Cebollas dulces', qty: 6, unit: 'unidades', cat: 'Frescos & Verduras' },
      { name: 'Zanahorias', qty: 8, unit: 'unidades', cat: 'Frescos & Verduras' },
      { name: 'Pimientos verdes y rojos', qty: 4, unit: 'unidades', cat: 'Frescos & Verduras' },
      { name: 'Mix de lechugas y rúculla', qty: 400, unit: 'g', cat: 'Frescos & Verduras' },
      { name: 'Garbanzos en conserva', qty: 800, unit: 'g', cat: 'Despensa & Secos' },
      { name: 'Caldo de ave artesano', qty: 2, unit: 'litros', cat: 'Refrigerados' },
      { name: 'Ajo y Perejil fresco', qty: 1, unit: 'manojo', cat: 'Frescos & Verduras' },
      { name: 'Aceite de Oliva Virgen Extra', qty: 1, unit: 'litro', cat: 'Especias & Aceites' },
      { name: 'Vino blanco seco (Chacolí)', qty: 1, unit: 'botella', cat: 'Despensa & Secos' }
    ];

    const categoryMap: Record<string, ShoppingCategoryItem[]> = {
      'Frescos & Verduras': [],
      'Carnes & Pescados': [],
      'Refrigerados & Lácteos': [],
      'Despensa & Secos': [],
      'Especias & Aceites': []
    };

    defaultConsolidated.forEach((ing, idx) => {
      const matchedFridge = initialFridgeStock.find(f => 
        f.name.toLowerCase().includes(ing.name.toLowerCase()) || ing.name.toLowerCase().includes(f.name.toLowerCase())
      );

      const inPantryQty = matchedFridge ? matchedFridge.quantity : 0;
      const requiredQty = ing.qty;
      const toBuyQty = Math.max(0, requiredQty - inPantryQty);

      const item: ShoppingCategoryItem = {
        id: `shop-${idx}`,
        name: ing.name,
        requiredQty,
        inPantryQty,
        toBuyQty,
        unit: ing.unit,
        isBought: toBuyQty === 0,
        isFromPantryDeduction: inPantryQty > 0
      };

      if (categoryMap[ing.cat]) {
        categoryMap[ing.cat].push(item);
      } else {
        categoryMap['Despensa & Secos'].push(item);
      }
    });

    return Object.entries(categoryMap).map(([categoryName, items]) => ({
      categoryName,
      iconName: categoryName,
      items
    }));
  });

  const toggleItemBought = (catIndex: number, itemIndex: number) => {
    setCategories(prev => {
      const updated = [...prev];
      const item = updated[catIndex].items[itemIndex];
      item.isBought = !item.isBought;
      return updated;
    });
  };

  const handleCopyList = () => {
    const textLines = ['🛒 *LISTA DE LA COMPRA FINAL - PREPMASTER (Consolidada con Descuentos de Nevera)*\n'];
    categories.forEach(cat => {
      const itemsToBuy = cat.items.filter(i => i.toBuyQty > 0 && !i.isBought);
      if (itemsToBuy.length > 0) {
        textLines.push(`📌 *${cat.categoryName}*`);
        itemsToBuy.forEach(i => {
          textLines.push(`• ${i.name}: ${i.toBuyQty} ${i.unit}`);
        });
        textLines.push('');
      }
    });

    navigator.clipboard.writeText(textLines.join('\n'));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const itemsInPantry = categories.reduce((sum, c) => sum + c.items.filter(i => i.isFromPantryDeduction).length, 0);

  return (
    <div className="space-y-3 animate-fade-in pb-2">
      {/* Strict Sequence Notice Banner if Menu not validated */}
      {!currentMenuPlan && (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-3 flex items-center justify-between gap-3 shadow-2xs">
          <div className="flex items-center gap-2.5">
            <AlertCircle className="text-amber-700 shrink-0" size={20} />
            <div>
              <p className="text-xs font-bold text-amber-950">Menú de Raciones en Estado de Borrador</p>
              <p className="text-[11px] text-amber-800">
                La lista de la compra se calcula sobre un menú validado. Se muestra un cálculo estimado de 25 raciones.
              </p>
            </div>
          </div>
          {onNavigateToGenerator && (
            <button
              onClick={onNavigateToGenerator}
              className="bg-amber-700 text-white font-bold text-xs px-3 py-1.5 rounded-xl shadow-2xs hover:bg-amber-800 shrink-0 flex items-center gap-1"
            >
              <Sparkles size={12} />
              Validar Mi Menú
            </button>
          )}
        </div>
      )}

      {/* Header Stepper Bar */}
      <div className="bg-gradient-to-r from-emerald-50 via-surface to-primary/10 rounded-2xl p-2.5 border border-outline-variant/30 space-y-1.5 shadow-xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-emerald-700 text-white font-black flex items-center justify-center text-xs">
              2
            </div>
            <div>
              <h1 className="text-xs font-bold text-on-surface leading-none">
                {subStep === 1 ? 'Paso 1: Consulta de Despensa & Nevera' :
                 subStep === 2 ? 'Paso 2: Diferencial Neto Ahorrado' :
                 subStep === 3 ? 'Paso 3: Lista Consolidada por Pasillos' :
                 'Paso 4: Exportar Lista & Avanzar a Cocina'}
              </h1>
              <p className="text-[10px] text-on-surface-variant mt-0.5">
                Cálculo diferencial tras validar 25 raciones consolidadas
              </p>
            </div>
          </div>
        </div>

        {/* 4 Step Navigation Pills */}
        <div className="flex items-center justify-between gap-1 pt-1 border-t border-outline-variant/20">
          <span className="text-[9px] font-bold text-on-surface-variant uppercase">Lista de Compra:</span>
          <div className="flex items-center gap-1 flex-1 justify-end">
            {[
              { num: 1, label: 'Despensa' },
              { num: 2, label: 'Descuento' },
              { num: 3, label: 'Lista' },
              { num: 4, label: 'Exportar' }
            ].map((s) => (
              <button
                key={s.num}
                onClick={() => setSubStep(s.num as any)}
                className={`px-2 py-0.5 rounded-md text-[10px] font-bold transition-all ${
                  subStep === s.num 
                    ? 'bg-emerald-700 text-white shadow-xs' 
                    : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
                }`}
              >
                2.{s.num} {s.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Sub-step 2.1: Refrigerator & Pantry Inventory Query */}
      {subStep === 1 && (
        <div className="bg-surface rounded-2xl p-3 border border-outline-variant/30 space-y-2.5 shadow-xs animate-fade-in">
          <div className="flex items-center justify-between border-b border-outline-variant/20 pb-1.5">
            <h3 className="text-xs font-bold text-on-surface flex items-center gap-1.5">
              <Refrigerator className="text-emerald-700" size={16} />
              1. Inventario Registrado en Nevera / Despensa
            </h3>
            <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
              {initialFridgeStock.length} Insumos Activos
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
            {initialFridgeStock.map((item, idx) => (
              <div key={idx} className="bg-emerald-50/60 border border-emerald-200/50 p-2 rounded-xl text-xs flex justify-between items-center">
                <span className="font-medium text-emerald-950 truncate">{item.name}</span>
                <strong className="text-emerald-800 shrink-0 ml-1">{item.quantity} {item.unit}</strong>
              </div>
            ))}
          </div>

          <div className="flex justify-end pt-1 border-t border-outline-variant/20">
            <button onClick={() => setSubStep(2)} className="bg-emerald-700 text-white py-1.5 px-3 rounded-xl font-bold text-xs flex items-center gap-1 shadow-xs hover:bg-emerald-800 transition-all">
              Calcular Diferencial Neto
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      )}

      {/* Sub-step 2.2: Automatic Pantry Deduction Summary */}
      {subStep === 2 && (
        <div className="bg-surface rounded-2xl p-3 border border-outline-variant/30 space-y-3 shadow-xs animate-fade-in">
          <div className="bg-emerald-50 border border-emerald-200 p-3.5 rounded-2xl flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold shrink-0">
              <ShieldCheck size={22} />
            </div>
            <div>
              <h3 className="text-xs font-bold text-emerald-950">2. Diferencial Neto Calculado con Éxito</h3>
              <p className="text-[11px] text-emerald-800 mt-0.5">
                Se han descontado <strong>{itemsInPantry} ingredientes</strong> ya existentes en tu nevera para evitar compras duplicadas.
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between pt-1 border-t border-outline-variant/20">
            <button onClick={() => setSubStep(1)} className="bg-surface-container border border-outline-variant/30 text-on-surface py-1.5 px-3 rounded-xl font-bold text-xs">
              ← Volver
            </button>
            <button onClick={() => setSubStep(3)} className="bg-emerald-700 text-white py-1.5 px-3 rounded-xl font-bold text-xs flex items-center gap-1 shadow-xs hover:bg-emerald-800 transition-all">
              Ver Lista Final por Pasillos
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      )}

      {/* Sub-step 2.3: Final Consolidated Shopping List */}
      {subStep === 3 && (
        <div className="space-y-2.5 animate-fade-in">
          <div className="flex items-center justify-between bg-surface-container/60 p-2 rounded-xl border border-outline-variant/30 text-xs">
            <span className="font-bold text-on-surface">Filtro de Compra:</span>
            <div className="flex bg-surface p-0.5 rounded-lg border border-outline-variant/30 text-[10px] font-bold">
              <button onClick={() => setFilterBought('ALL')} className={`px-2 py-0.5 rounded ${filterBought === 'ALL' ? 'bg-emerald-700 text-white' : 'text-on-surface-variant'}`}>Todos</button>
              <button onClick={() => setFilterBought('PENDING')} className={`px-2 py-0.5 rounded ${filterBought === 'PENDING' ? 'bg-emerald-700 text-white' : 'text-on-surface-variant'}`}>Pendientes</button>
              <button onClick={() => setFilterBought('BOUGHT')} className={`px-2 py-0.5 rounded ${filterBought === 'BOUGHT' ? 'bg-emerald-700 text-white' : 'text-on-surface-variant'}`}>Comprados</button>
            </div>
          </div>

          <div className="space-y-2">
            {categories.map((cat, catIdx) => {
              const visibleItems = cat.items.filter(item => {
                if (filterBought === 'PENDING') return !item.isBought;
                if (filterBought === 'BOUGHT') return item.isBought;
                return true;
              });

              if (visibleItems.length === 0) return null;

              return (
                <div key={cat.categoryName} className="bg-surface rounded-2xl p-2.5 border border-outline-variant/30 space-y-2">
                  <div className="flex items-center justify-between border-b border-outline-variant/20 pb-1">
                    <h3 className="font-bold text-xs text-on-surface flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-600" />
                      {cat.categoryName}
                    </h3>
                    <span className="text-[10px] text-on-surface-variant font-semibold">{visibleItems.length} productos</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-1.5">
                    {visibleItems.map((item) => {
                      const actualIndex = cat.items.findIndex(i => i.id === item.id);
                      return (
                        <div
                          key={item.id}
                          onClick={() => toggleItemBought(catIdx, actualIndex)}
                          className={`p-2 rounded-xl border flex items-center justify-between gap-2 cursor-pointer transition-all ${
                            item.isBought
                              ? 'bg-surface-container-low/50 border-outline-variant/20 opacity-60 line-through'
                              : 'bg-surface border-outline-variant/40 hover:border-emerald-600/40'
                          }`}
                        >
                          <div className="flex items-center gap-2 min-w-0">
                            <div className={`w-5 h-5 rounded border flex items-center justify-center shrink-0 ${
                              item.isBought ? 'bg-emerald-700 border-emerald-700 text-white' : 'border-outline-variant bg-surface'
                            }`}>
                              {item.isBought && <Check size={12} strokeWidth={3} />}
                            </div>
                            <div className="min-w-0">
                              <p className="text-xs font-bold text-on-surface truncate">{item.name}</p>
                              {item.isFromPantryDeduction ? (
                                <span className="text-[9px] font-semibold text-emerald-800 bg-emerald-100 px-1.5 py-0.2 rounded inline-block">
                                  En Nevera: {item.inPantryQty} {item.unit} → Comprar {item.toBuyQty} {item.unit}
                                </span>
                              ) : (
                                <span className="text-[10px] text-on-surface-variant">Comprar: <strong>{item.requiredQty} {item.unit}</strong></span>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-between pt-1 border-t border-outline-variant/20">
            <button onClick={() => setSubStep(2)} className="bg-surface-container border border-outline-variant/30 text-on-surface py-1.5 px-3 rounded-xl font-bold text-xs">
              ← Anterior
            </button>
            <button onClick={() => setSubStep(4)} className="bg-emerald-700 text-white py-1.5 px-3 rounded-xl font-bold text-xs flex items-center gap-1 shadow-xs hover:bg-emerald-800 transition-all">
              Exportar Lista (2.4)
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      )}

      {/* Sub-step 2.4: Export & Proceed to Interactive Cook */}
      {subStep === 4 && (
        <div className="bg-surface rounded-2xl p-4 border border-outline-variant/30 text-center space-y-3 animate-fade-in shadow-xs">
          <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto">
            <ShoppingBag size={20} />
          </div>
          <div>
            <h2 className="text-sm font-bold text-on-surface">2.4 ¡Lista de la Compra Ajustada!</h2>
            <p className="text-xs text-on-surface-variant max-w-sm mx-auto mt-0.5">
              Copia la lista consolidada para WhatsApp o avanza directamente al cocinado simultáneo del lote.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
            <button
              onClick={handleCopyList}
              className="bg-surface-container-high border border-outline-variant/40 hover:bg-surface-container-highest text-on-surface px-3 py-2 rounded-xl font-bold text-xs flex items-center gap-1.5"
            >
              {copied ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
              {copied ? '¡Copiado!' : 'Copiar para WhatsApp'}
            </button>

            <button
              onClick={onNavigateToInteractiveCook}
              className="bg-primary text-on-primary px-4 py-2 rounded-xl font-bold text-xs flex items-center gap-1.5 shadow-md hover:bg-primary/90 transition-all"
            >
              <Sparkles size={14} />
              Iniciar Cocinado Simultáneo (3)
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
