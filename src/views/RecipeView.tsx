import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Heart, 
  Share2, 
  Clock, 
  Utensils, 
  Flame, 
  ShoppingCart, 
  Play, 
  Scissors, 
  Box, 
  Wind, 
  Refrigerator, 
  Leaf,
  CheckCircle2
} from 'lucide-react';
import { ViewState } from '../types';
import { detailedRecipe } from '../data';

export function RecipeView({ onNavigate }: { onNavigate: (view: ViewState) => void }) {
  const [activeTab, setActiveTab] = useState<'ingredientes' | 'pasos' | 'batch'>('ingredientes');
  const [isFavorite, setIsFavorite] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(`${detailedRecipe.title} - TouChef Batch Recipe`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };
  
  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 pb-12 animate-fade-in">
      
      {/* Top Header Card */}
      <div className="flex items-center justify-between p-4 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-xs">
        <button 
          onClick={() => onNavigate({ name: 'explore' })}
          className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors active:scale-95 text-xs font-bold"
        >
          <ArrowLeft size={16} />
          <span>Volver al Recetario</span>
        </button>

        <div className="flex items-center gap-2">
          <button 
            onClick={() => setIsFavorite(!isFavorite)}
            className={`p-2 rounded-xl border transition-all active:scale-95 ${
              isFavorite 
                ? 'bg-rose-500/10 border-rose-500/30 text-rose-500' 
                : 'bg-zinc-100 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400'
            }`}
            title="Guardar en Favoritos"
          >
            <Heart size={18} className={isFavorite ? 'fill-current' : ''} />
          </button>
          <button 
            onClick={handleShare}
            className="p-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-all active:scale-95"
            title="Compartir Receta"
          >
            {copied ? <CheckCircle2 size={18} className="text-[#E07A5F]" /> : <Share2 size={18} />}
          </button>
        </div>
      </div>

      {/* Hero Image */}
      <div className="relative w-full aspect-[16/9] md:h-80 rounded-3xl overflow-hidden shadow-sm border border-zinc-200 dark:border-zinc-800 bg-zinc-900">
        <img 
          src={detailedRecipe.image} 
          alt={detailedRecipe.title} 
          className="w-full h-full object-cover" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
        <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-end justify-between gap-2">
          <div>
            <div className="flex flex-wrap gap-2 mb-2">
              {detailedRecipe.tags?.map(tag => (
                <span key={tag} className="bg-[#E07A5F] text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow-xs">
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-black text-white leading-tight">
              {detailedRecipe.title}
            </h1>
          </div>
        </div>
      </div>

      {/* Meta Stats Grid */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-3.5 flex flex-col items-center justify-center text-center shadow-xs">
          <Clock className="text-[#E07A5F] mb-1" size={20} />
          <span className="text-[10px] text-zinc-500 dark:text-zinc-400 uppercase tracking-wider font-bold">Tiempo Prep</span>
          <span className="text-base font-black text-zinc-900 dark:text-white">{detailedRecipe.time}</span>
        </div>
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-3.5 flex flex-col items-center justify-center text-center shadow-xs">
          <Utensils className="text-[#E07A5F] mb-1" size={20} />
          <span className="text-[10px] text-zinc-500 dark:text-zinc-400 uppercase tracking-wider font-bold">Raciones</span>
          <span className="text-base font-black text-zinc-900 dark:text-white">{detailedRecipe.servings} porciones</span>
        </div>
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-3.5 flex flex-col items-center justify-center text-center shadow-xs">
          <Flame className="text-[#E07A5F] mb-1" size={20} />
          <span className="text-[10px] text-zinc-500 dark:text-zinc-400 uppercase tracking-wider font-bold">Calorías</span>
          <span className="text-base font-black text-zinc-900 dark:text-white">{detailedRecipe.calories || '~450'} kcal</span>
        </div>
      </div>

      {/* Description & Cook Action */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 sm:p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed flex-1">
          {detailedRecipe.description}
        </p>

        <button
          onClick={() => onNavigate({ name: 'interactive-cook', dishName: detailedRecipe.title })}
          className="btn-hero-copper text-white text-xs font-black px-5 py-3 rounded-2xl shadow-md flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.02] transition-transform shrink-0"
        >
          <Flame size={16} />
          <span>👨‍🍳 Cocinar con Asistente en Directo</span>
        </button>
      </div>

      {/* Tab Selectors */}
      <div className="flex border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 rounded-2xl p-1 shadow-xs" role="tablist">
        <button 
          onClick={() => setActiveTab('ingredientes')}
          className={`flex-1 py-2.5 text-center text-xs font-bold rounded-xl transition-all ${
            activeTab === 'ingredientes' 
              ? 'bg-[#E07A5F] text-white shadow-xs' 
              : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
          }`}
        >
          Ingredientes
        </button>
        <button 
          onClick={() => setActiveTab('pasos')}
          className={`flex-1 py-2.5 text-center text-xs font-bold rounded-xl transition-all ${
            activeTab === 'pasos' 
              ? 'bg-[#E07A5F] text-white shadow-xs' 
              : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
          }`}
        >
          Pasos Simultáneos
        </button>
        <button 
          onClick={() => setActiveTab('batch')}
          className={`flex-1 py-2.5 text-center text-xs font-bold rounded-xl transition-all ${
            activeTab === 'batch' 
              ? 'bg-[#E07A5F] text-white shadow-xs' 
              : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
          }`}
        >
          Protocolo Batch & Frío
        </button>
      </div>

      {/* Tab Contents */}
      <div className="space-y-4">
        {activeTab === 'ingredientes' && <IngredientsTab />}
        {activeTab === 'pasos' && <StepsTab />}
        {activeTab === 'batch' && <BatchCookingTab />}
      </div>

      {/* Bottom Actions */}
      <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-4 border-t border-zinc-200 dark:border-zinc-800">
        <button 
          onClick={() => onNavigate({ name: 'ai-generator' })}
          className="w-full sm:w-auto px-5 py-3 rounded-2xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-800 dark:text-zinc-200 text-xs font-bold hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-all flex items-center justify-center gap-2"
        >
          <ShoppingCart size={16} /> 
          <span>Incorporar a un Lote</span>
        </button>
        <button 
          onClick={() => onNavigate({ name: 'interactive-cook', dishName: detailedRecipe.title })}
          className="w-full sm:w-auto px-6 py-3 rounded-2xl btn-hero-copper text-xs font-black shadow-md transition-all flex items-center justify-center gap-2 active:scale-95"
        >
          <Play size={16} className="fill-current" /> 
          <span>Cocinar este Plato</span>
        </button>
      </div>

    </div>
  );
}

function IngredientsTab() {
  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-5 shadow-xs space-y-5 animate-fade-in">
      <div>
        <h3 className="text-xs font-bold uppercase tracking-wider text-[#E07A5F] dark:text-[#F4A261] mb-3">
          Vegetales & Frescos
        </h3>
        <ul className="space-y-2">
          <IngredientItem label="1 cebolla roja grande, en rodajas" amount="150g" />
          <IngredientItem label="2 pimientos morrones, picados" amount="200g" />
          <IngredientItem label="1 calabacín mediano, en cubos" amount="150g" />
        </ul>
      </div>

      <div>
        <h3 className="text-xs font-bold uppercase tracking-wider text-[#E07A5F] dark:text-[#F4A261] mb-3">
          Despensa & Granos
        </h3>
        <ul className="space-y-2">
          <IngredientItem label="Quinoa o Arroz Integral" amount="1 taza (200g)" />
          <IngredientItem label="Aceite de oliva virgen extra, sal, especias" amount="al gusto" />
        </ul>
      </div>
    </div>
  );
}

function IngredientItem({ label, amount }: { label: string, amount: string }) {
  const [checked, setChecked] = useState(false);

  return (
    <li 
      onClick={() => setChecked(!checked)}
      className={`flex items-center justify-between p-3 rounded-xl border transition-all cursor-pointer select-none ${
        checked 
          ? 'bg-[#E07A5F]/5 border-[#E07A5F]/30 text-zinc-400 line-through' 
          : 'bg-zinc-50 dark:bg-zinc-800/50 border-zinc-200 dark:border-zinc-700/60 text-zinc-800 dark:text-zinc-200 hover:border-[#E07A5F]/40'
      }`}
    >
      <div className="flex items-center gap-3">
        <div className={`w-5 h-5 rounded-md border flex items-center justify-center text-xs transition-colors ${
          checked 
            ? 'bg-[#E07A5F] border-[#E07A5F] text-white' 
            : 'border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-900'
        }`}>
          {checked && '✓'}
        </div>
        <span className="text-xs font-medium">{label}</span>
      </div>
      <span className="text-[11px] font-mono text-zinc-500 dark:text-zinc-400">{amount}</span>
    </li>
  );
}

function StepsTab() {
  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-5 shadow-xs space-y-4 animate-fade-in">
      <div className="p-4 bg-zinc-50 dark:bg-zinc-800/40 rounded-2xl border border-zinc-200 dark:border-zinc-700/60 flex items-start gap-3.5">
        <div className="w-7 h-7 rounded-xl bg-[#E07A5F] text-white flex items-center justify-center font-black text-xs shrink-0 mt-0.5">
          1
        </div>
        <div>
          <h4 className="text-xs font-bold text-zinc-900 dark:text-white mb-1">
            Preparar Vegetales y Encender Horno
          </h4>
          <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Precalienta el horno a 200°C (400°F). Corta la cebolla roja, pimientos y calabacín en trozos uniformes para asegurar un horneado parejo.
          </p>
        </div>
      </div>

      <div className="p-4 bg-zinc-50 dark:bg-zinc-800/40 rounded-2xl border border-zinc-200 dark:border-zinc-700/60 flex items-start gap-3.5">
        <div className="w-7 h-7 rounded-xl bg-[#E07A5F] text-white flex items-center justify-center font-black text-xs shrink-0 mt-0.5">
          2
        </div>
        <div>
          <h4 className="text-xs font-bold text-zinc-900 dark:text-white mb-1">
            Asado en Horno y Cocción Simultánea de Granos
          </h4>
          <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Mezcla los vegetales con aceite de oliva virgen, sal y pimienta. Hornea 25-30 min. En paralelo, pon la cazuela de quinoa a fuego medio.
          </p>
        </div>
      </div>

      <div className="p-4 bg-zinc-50 dark:bg-zinc-800/40 rounded-2xl border border-zinc-200 dark:border-zinc-700/60 flex items-start gap-3.5">
        <div className="w-7 h-7 rounded-xl bg-[#E07A5F] text-white flex items-center justify-center font-black text-xs shrink-0 mt-0.5">
          3
        </div>
        <div>
          <h4 className="text-xs font-bold text-zinc-900 dark:text-white mb-1">
            Enfriamiento Rápido y Porcionado en Tupper
          </h4>
          <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Deja templar antes de tapar herméticamente. Reparte en 4 recipientes de cristal: guarda 2 en nevera para los primeros 3 días y 2 en congelador.
          </p>
        </div>
      </div>
    </div>
  );
}

function BatchCookingTab() {
  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-5 shadow-xs space-y-4 animate-fade-in">
      <div className="p-4 bg-[#E07A5F]/10 border border-[#E07A5F]/30 rounded-2xl flex items-start gap-3.5">
        <Clock size={20} className="text-[#E07A5F] dark:text-[#F4A261] shrink-0 mt-0.5" />
        <div>
          <h4 className="text-xs font-bold text-zinc-900 dark:text-white mb-1">
            Regla de Conservación 3 + 4 Días
          </h4>
          <p className="text-xs text-zinc-700 dark:text-zinc-300 leading-relaxed">
            Días 1 a 3: Conservar en refrigerador a 4°C. Días 4 a 7: Congelar el mismo día del cocinado para preservar textura y nutrientes.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="p-3.5 bg-zinc-50 dark:bg-zinc-800/40 rounded-2xl border border-zinc-200 dark:border-zinc-700/60 space-y-1.5">
          <div className="flex items-center gap-2 text-[#E07A5F] dark:text-[#F4A261] font-bold text-xs">
            <Refrigerator size={16} />
            <span>Nevera Óptima</span>
          </div>
          <p className="text-xs text-zinc-600 dark:text-zinc-400">
            Hasta 3-4 días en envase hermético de cristal. No aliñar ensaladas hasta el momento de servir.
          </p>
        </div>

        <div className="p-3.5 bg-zinc-50 dark:bg-zinc-800/40 rounded-2xl border border-zinc-200 dark:border-zinc-700/60 space-y-1.5">
          <div className="flex items-center gap-2 text-[#E07A5F] dark:text-[#F4A261] font-bold text-xs">
            <Wind size={16} />
            <span>Regeneración</span>
          </div>
          <p className="text-xs text-zinc-600 dark:text-zinc-400">
            Regenerar en sartén o microondas con tapa a media potencia para mantener la humedad intacta.
          </p>
        </div>
      </div>
    </div>
  );
}
