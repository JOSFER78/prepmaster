import { useState } from 'react';
import { ShoppingCart, Play, Clock, Users, ShieldCheck, Sparkles, Plus, Minus, Layers, CheckCircle2 } from 'lucide-react';
import { ViewState, GeneratedMenuPlan } from '../types';

export function PlannerView({ 
  onNavigate, 
  currentMenuPlan 
}: { 
  onNavigate: (view: ViewState) => void; 
  currentMenuPlan?: GeneratedMenuPlan | null;
}) {
  const initialBatch = currentMenuPlan ? currentMenuPlan.items.map((item, idx) => ({
    id: `item_${idx}`,
    blockName: item.dayName || `Menú Simultáneo ${idx + 1}`,
    dishTitle: item.dishName,
    servings: item.servings,
    kcalPerServing: 380 + (idx * 30),
    prepTime: item.prepTime || '25 min (Batch)',
    preservation: '7 a 10 días a 2°C (Apto Congelador)',
    image: [
      'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1476718406336-bb5a9690ee2a?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1543339308-43e59d6b73a6?auto=format&fit=crop&q=80&w=600'
    ][idx % 6],
    macros: { c: 45, p: 32, g: 12 }
  })) : [
    {
      id: 'default_1',
      blockName: 'Menú Batch 1: Guisos & Legumbres',
      dishTitle: 'Lentejas Pardinas Estofadas con Verduras de la Huerta',
      servings: 8,
      kcalPerServing: 420,
      prepTime: '35 min (Batch)',
      preservation: '7 a 10 días a 2°C (Apto Congelador)',
      image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&q=80&w=600',
      macros: { c: 52, p: 24, g: 8 }
    },
    {
      id: 'default_2',
      blockName: 'Menú Batch 2: Proteína Mechada',
      dishTitle: 'Ternera Mechada con Reducción de Vino y Verduras',
      servings: 8,
      kcalPerServing: 510,
      prepTime: '45 min (Batch)',
      preservation: '8 días a 2°C (Apto Congelador)',
      image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=600',
      macros: { c: 12, p: 48, g: 18 }
    },
    {
      id: 'default_3',
      blockName: 'Menú Batch 3: Pescado de la Lonja',
      dishTitle: 'Merluza en Salsa Verde Casera con Almejas',
      servings: 5,
      kcalPerServing: 340,
      prepTime: '20 min (Batch)',
      preservation: '3 a 4 días a 2°C en refrigerador',
      image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&q=80&w=600',
      macros: { c: 8, p: 38, g: 10 }
    },
    {
      id: 'default_4',
      blockName: 'Menú Batch 4: Cremas & Entrantes',
      dishTitle: 'Crema Ligera de Calabaza, Puerro y Jengibre',
      servings: 4,
      kcalPerServing: 180,
      prepTime: '15 min (Batch)',
      preservation: '7 días a 2°C',
      image: 'https://images.unsplash.com/photo-1476718406336-bb5a9690ee2a?auto=format&fit=crop&q=80&w=600',
      macros: { c: 22, p: 5, g: 6 }
    }
  ];

  const [batchItems, setBatchItems] = useState(initialBatch);

  const totalServingsCount = batchItems.reduce((sum, item) => sum + item.servings, 0);
  const people = currentMenuPlan?.peopleCount || 4;

  const updateServings = (id: string, delta: number) => {
    setBatchItems(prev => prev.map(item => {
      if (item.id === id) {
        const newServings = Math.max(1, item.servings + delta);
        return { ...item, servings: newServings };
      }
      return item;
    }));
  };

  return (
    <div className="w-full space-y-3 animate-fade-in pb-2">
      {/* Header Banner - Raciones Totales Focused */}
      <div className="bg-surface rounded-2xl p-3.5 border border-outline-variant/30 shadow-xs flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
        <div>
          <div className="flex items-center gap-1.5 mb-1">
            <span className="bg-primary/20 text-primary text-[9px] font-extrabold px-2 py-0.2 rounded-full uppercase flex items-center gap-1">
              <Sparkles size={11} /> Plan de Raciones Totales
            </span>
            <span className="text-[10px] font-bold text-on-surface-variant flex items-center gap-1">
              <Users size={12} className="text-primary" /> {people} Comensales
            </span>
          </div>
          <h1 className="text-base md:text-xl font-extrabold text-on-surface">
            Gestión de Volumen Global: <span className="text-primary">{totalServingsCount} Raciones Totales</span>
          </h1>
          <p className="text-xs text-on-surface-variant mt-0.5">
            Planificación simplificada sin divisiones rígidas por días. Organizada por bloques de cocinado simultáneo batch.
          </p>
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <button 
            onClick={() => onNavigate({ name: 'shopping-list' })}
            className="flex-1 md:flex-none flex items-center justify-center gap-1.5 bg-emerald-100 text-emerald-900 border border-emerald-300 px-3 py-2 rounded-xl text-xs font-bold shadow-2xs hover:bg-emerald-200 transition-colors"
          >
            <ShoppingCart size={16} />
            Lista de Compra ({totalServingsCount} rac)
          </button>
          <button 
            onClick={() => onNavigate({ name: 'interactive-cook' })}
            className="flex-1 md:flex-none flex items-center justify-center gap-1.5 bg-primary text-on-primary px-3.5 py-2 rounded-xl text-xs font-bold shadow-2xs hover:bg-primary/90 transition-colors active:scale-95"
          >
            <Play size={16} className="fill-current" />
            Cocina Simultánea
          </button>
        </div>
      </div>

      {/* Raciones Totales Summary Bar */}
      <div className="bg-surface-container/60 border border-outline-variant/30 p-2.5 rounded-2xl flex flex-wrap items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-black">
            <Layers size={18} />
          </div>
          <div>
            <span className="font-extrabold text-on-surface">{batchItems.length} Menús Simultáneos Configurados</span>
            <span className="text-[10px] text-on-surface-variant block">Ajusta el volumen exacto de raciones con los controles directos (+/-)</span>
          </div>
        </div>

        <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-full flex items-center gap-1">
          <CheckCircle2 size={13} /> Conservación óptima 7-10 días a 2°C
        </span>
      </div>

      {/* Batch Blocks List (Strict Raciones Totales Layout) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
        {batchItems.map((item) => (
          <div key={item.id} className="bg-surface rounded-2xl border border-outline-variant/30 p-3 flex gap-3 items-center shadow-2xs hover:border-primary/40 transition-all">
            <img 
              src={item.image} 
              alt={item.dishTitle} 
              className="w-20 h-20 rounded-xl object-cover shrink-0 shadow-2xs" 
            />
            <div className="min-w-0 flex-1 space-y-1.5">
              <div className="flex justify-between items-center gap-1">
                <span className="text-[10px] font-extrabold text-primary bg-primary-container/30 px-2 py-0.2 rounded-full uppercase truncate">
                  {item.blockName}
                </span>

                {/* Direct Portion Counter */}
                <div className="flex items-center gap-1 bg-surface-container border border-outline-variant/30 rounded-lg px-1 py-0.5 shrink-0">
                  <button
                    onClick={() => updateServings(item.id, -1)}
                    className="w-5 h-5 rounded-md bg-surface flex items-center justify-center text-on-surface hover:bg-primary/20 transition-colors"
                    title="Reducir raciones"
                  >
                    <Minus size={12} />
                  </button>
                  <span className="text-xs font-black text-on-surface px-1 min-w-[20px] text-center">
                    {item.servings}
                  </span>
                  <button
                    onClick={() => updateServings(item.id, 1)}
                    className="w-5 h-5 rounded-md bg-primary text-on-primary flex items-center justify-center hover:bg-primary/90 transition-colors"
                    title="Aumentar raciones"
                  >
                    <Plus size={12} />
                  </button>
                </div>
              </div>

              <h3 className="text-xs font-bold text-on-surface line-clamp-1">{item.dishTitle}</h3>

              <div className="flex flex-wrap items-center gap-2 text-[10px] text-on-surface-variant font-medium">
                <span className="flex items-center gap-1">
                  <Clock size={12} className="text-secondary" /> {item.prepTime}
                </span>
                <span>•</span>
                <span>{item.kcalPerServing} kcal/ración</span>
                <span>•</span>
                <span className="text-emerald-800 font-bold flex items-center gap-0.5">
                  <ShieldCheck size={12} /> {item.preservation}
                </span>
              </div>

              <div className="flex gap-1.5 text-[9px] font-bold text-on-surface-variant">
                <span className="bg-surface-container px-1.5 py-0.2 rounded">Carb: {item.macros.c}g</span>
                <span className="bg-surface-container px-1.5 py-0.2 rounded">Prot: {item.macros.p}g</span>
                <span className="bg-surface-container px-1.5 py-0.2 rounded">Grasa: {item.macros.g}g</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

