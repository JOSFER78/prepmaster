import { Sparkles, Clock, ShieldCheck, ShoppingBag, ChefHat, Users, Flame, ArrowRight } from 'lucide-react';
import { ViewState } from '../types';
import { trendingRecipes } from '../data';

export function HomeView({ onNavigate }: { onNavigate: (view: ViewState) => void }) {
  return (
    <div className="flex flex-col gap-3 w-full animate-fade-in pb-2">
      {/* Featured Banner: Generador por Raciones */}
      <section className="w-full">
        <div 
          onClick={() => onNavigate({ name: 'ai-generator' })}
          className="cursor-pointer bg-gradient-to-r from-primary-container via-surface-container-high to-primary-container/30 border border-primary/30 rounded-2xl p-3.5 shadow-xs hover:shadow-sm transition-all group relative overflow-hidden"
        >
          <div className="flex items-center justify-between gap-3 relative z-10">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-11 h-11 rounded-xl bg-primary text-on-primary flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform">
                <Sparkles size={22} />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="bg-primary/20 text-primary text-[9px] font-extrabold px-2 py-0.2 rounded-full uppercase tracking-wider">
                    Cocina por Volumen
                  </span>
                  <span className="text-[10px] font-bold text-on-surface-variant flex items-center gap-1">
                    <Users size={12} className="text-primary" /> Sin distribución rígida por días
                  </span>
                </div>
                <h2 className="text-sm md:text-base font-extrabold text-on-surface truncate mt-0.5">Generar Menú de Raciones Totales</h2>
                <p className="text-[11px] text-on-surface-variant truncate">
                  Calcula raciones familiares consolidadas (ej. 25 raciones) ajustadas a tu hogar.
                </p>
              </div>
            </div>

            <button className="bg-primary text-on-primary font-bold text-xs px-4 py-2.5 rounded-xl shadow-xs group-hover:bg-primary/90 transition-colors shrink-0 flex items-center gap-1.5">
              <Sparkles size={14} />
              Crear Menú
            </button>
          </div>
        </div>
      </section>

      {/* 3 Streamlined Core Modules */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-2">
        <button 
          onClick={() => onNavigate({ name: 'ai-generator' })}
          className="bg-surface border border-outline-variant/30 rounded-2xl p-3 flex items-center gap-3 hover:border-primary/40 transition-all text-left active:scale-[0.98] shadow-2xs"
        >
          <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
            <Flame size={20} />
          </div>
          <div className="min-w-0">
            <h3 className="text-xs font-bold text-on-surface leading-tight">1. Propuesta de Raciones</h3>
            <p className="text-[10px] text-on-surface-variant truncate mt-0.5">Calcula raciones totales y valida</p>
          </div>
        </button>

        <button 
          onClick={() => onNavigate({ name: 'shopping-list' })}
          className="bg-surface border border-outline-variant/30 rounded-2xl p-3 flex items-center gap-3 hover:border-primary/40 transition-all text-left active:scale-[0.98] shadow-2xs"
        >
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
            <ShoppingBag size={20} />
          </div>
          <div className="min-w-0">
            <h3 className="text-xs font-bold text-on-surface leading-tight">2. Lista de Compra</h3>
            <p className="text-[10px] text-on-surface-variant truncate mt-0.5">Diferencial neto tras nevera</p>
          </div>
        </button>

        <button 
          onClick={() => onNavigate({ name: 'interactive-cook' })}
          className="bg-surface border border-outline-variant/30 rounded-2xl p-3 flex items-center gap-3 hover:border-primary/40 transition-all text-left active:scale-[0.98] shadow-2xs"
        >
          <div className="w-10 h-10 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center shrink-0">
            <ChefHat size={20} />
          </div>
          <div className="min-w-0">
            <h3 className="text-xs font-bold text-on-surface leading-tight">3. Cocina Simultánea</h3>
            <p className="text-[10px] text-on-surface-variant truncate mt-0.5">Pasos entrelazados por voz y tiempo</p>
          </div>
        </button>
      </section>

      {/* Recetas Saludables Frecuentes */}
      <section className="space-y-2 pt-1">
        <div className="flex justify-between items-center">
          <h2 className="text-xs font-bold text-on-surface flex items-center gap-1.5">
            <Clock size={14} className="text-primary" />
            Recetas Batch Recomendadas para el Lote
          </h2>
          <button onClick={() => onNavigate({ name: 'planner' })} className="text-[10px] text-primary font-bold hover:underline flex items-center gap-0.5">
            Ver Lote Completo <ArrowRight size={12} />
          </button>
        </div>
        
        <div className="flex overflow-x-auto gap-2.5 pb-1 snap-x hide-scrollbar">
          {trendingRecipes.map(recipe => (
            <div 
              key={recipe.id} 
              className="snap-start min-w-[200px] w-[200px] bg-surface rounded-xl border border-outline-variant/30 p-2 flex gap-2 items-center cursor-pointer hover:border-primary/40 transition-colors"
              onClick={() => onNavigate({ name: 'recipe', id: recipe.id })}
            >
              <img src={recipe.image} alt={recipe.title} className="w-12 h-12 rounded-lg object-cover shrink-0" />
              <div className="min-w-0 flex-1">
                <h3 className="text-[11px] font-bold text-on-surface truncate leading-tight">{recipe.title}</h3>
                <p className="text-[9px] text-on-surface-variant flex items-center gap-1 mt-0.5">
                  <Clock size={10} /> {recipe.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}


