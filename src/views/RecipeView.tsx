import { useState } from 'react';
import { ArrowLeft, Heart, Share2, Clock, Utensils, Flame, ShoppingCart, Play, Scissors, Box, Wind, Refrigerator, Leaf } from 'lucide-react';
import { ViewState } from '../types';
import { detailedRecipe } from '../data';

export function RecipeView({ onNavigate }: { onNavigate: (view: ViewState) => void }) {
  const [activeTab, setActiveTab] = useState<'ingredientes' | 'pasos' | 'batch'>('ingredientes');
  
  return (
    <div className="w-full bg-background -mx-4 px-4 md:mx-0 md:px-0">
      <header className="fixed top-0 left-0 w-full z-40 bg-surface/90 backdrop-blur-md shadow-sm">
        <div className="flex items-center px-4 py-2 h-16 max-w-[1140px] mx-auto">
          <button 
            onClick={() => onNavigate({ name: 'planner' })}
            className="p-2 -ml-2 rounded-full hover:bg-surface-container-high transition-colors active:scale-95 text-on-surface"
          >
            <ArrowLeft size={24} />
          </button>
          <div className="flex-1"></div>
          <div className="flex gap-2">
            <button className="p-2 rounded-full hover:bg-surface-container-high transition-colors active:scale-95 text-on-surface">
              <Heart size={24} />
            </button>
            <button className="p-2 rounded-full hover:bg-surface-container-high transition-colors active:scale-95 text-on-surface">
              <Share2 size={24} />
            </button>
          </div>
        </div>
      </header>

      <div className="-mx-4 md:mx-0 mt-0 md:mt-0 relative w-full aspect-[4/3] md:aspect-[21/9] md:h-96 md:rounded-b-3xl overflow-hidden shadow-sm">
        <img src={detailedRecipe.image} alt={detailedRecipe.title} className="w-full h-full object-cover" />
        <div className="absolute bottom-4 left-4 flex gap-2">
          {detailedRecipe.tags?.map(tag => (
            <span key={tag} className="bg-surface/90 backdrop-blur-sm text-on-surface text-xs font-semibold px-3 py-1.5 rounded-full shadow-sm">
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="py-6 max-w-3xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-on-surface mb-2 tracking-tight">{detailedRecipe.title}</h1>
          <p className="text-base text-on-surface-variant leading-relaxed">{detailedRecipe.description}</p>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-surface shadow-sm border border-surface-variant rounded-2xl p-4 flex flex-col items-center justify-center text-center">
            <Clock className="text-primary mb-1.5" size={24} />
            <span className="text-[10px] text-on-surface-variant uppercase tracking-wider font-bold mb-1">Tiempo Prep</span>
            <span className="text-lg font-semibold text-on-surface">{detailedRecipe.time}</span>
          </div>
          <div className="bg-surface shadow-sm border border-surface-variant rounded-2xl p-4 flex flex-col items-center justify-center text-center">
            <Utensils className="text-primary mb-1.5" size={24} />
            <span className="text-[10px] text-on-surface-variant uppercase tracking-wider font-bold mb-1">Porciones</span>
            <span className="text-lg font-semibold text-on-surface">{detailedRecipe.servings}</span>
          </div>
          <div className="bg-surface shadow-sm border border-surface-variant rounded-2xl p-4 flex flex-col items-center justify-center text-center">
            <Flame className="text-primary mb-1.5" size={24} />
            <span className="text-[10px] text-on-surface-variant uppercase tracking-wider font-bold mb-1">Calorías</span>
            <span className="text-lg font-semibold text-on-surface">{detailedRecipe.calories}</span>
          </div>
        </div>

        <div className="flex border-b border-surface-variant mb-6" role="tablist">
          <button 
            onClick={() => setActiveTab('ingredientes')}
            className={`flex-1 py-3.5 text-center text-[15px] font-semibold transition-colors relative ${activeTab === 'ingredientes' ? 'text-primary' : 'text-on-surface-variant hover:text-on-surface'}`}
          >
            Ingredientes
            {activeTab === 'ingredientes' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-t-full"></div>}
          </button>
          <button 
            onClick={() => setActiveTab('pasos')}
            className={`flex-1 py-3.5 text-center text-[15px] font-semibold transition-colors relative ${activeTab === 'pasos' ? 'text-primary' : 'text-on-surface-variant hover:text-on-surface'}`}
          >
            Pasos
            {activeTab === 'pasos' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-t-full"></div>}
          </button>
          <button 
            onClick={() => setActiveTab('batch')}
            className={`flex-1 py-3.5 text-center text-[15px] font-semibold transition-colors relative ${activeTab === 'batch' ? 'text-primary' : 'text-on-surface-variant hover:text-on-surface'}`}
          >
            Batch Cooking
            {activeTab === 'batch' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-t-full"></div>}
          </button>
        </div>

        <div className="mb-24">
          {activeTab === 'ingredientes' && <IngredientsTab />}
          {activeTab === 'pasos' && <StepsTab />}
          {activeTab === 'batch' && <BatchCookingTab />}
        </div>
      </div>

      {/* Mobile Floating Action */}
      <div className="fixed bottom-6 right-6 z-50 md:hidden">
        <button className="bg-secondary text-on-secondary shadow-lg w-16 h-16 rounded-2xl flex items-center justify-center active:scale-95 transition-transform hover:bg-secondary-container">
          <Play size={28} className="fill-current" />
        </button>
      </div>

      {/* Desktop Fixed Bottom Bar */}
      <div className="hidden md:flex fixed bottom-0 left-0 w-full bg-surface shadow-[0_-4px_16px_rgba(0,0,0,0.05)] border-t border-surface-variant z-40 py-5 px-8 justify-center gap-4">
        <button className="bg-secondary text-on-secondary font-semibold text-lg px-8 py-3.5 rounded-xl shadow-sm hover:bg-secondary-container transition-colors flex items-center gap-2">
          <Play size={24} className="fill-current" /> Iniciar Proceso de Batch
        </button>
        <button className="bg-surface border-2 border-secondary text-secondary font-semibold text-lg px-8 py-3.5 rounded-xl hover:bg-secondary/5 transition-colors flex items-center gap-2">
          <ShoppingCart size={24} /> Añadir a la Lista
        </button>
      </div>
    </div>
  );
}

function IngredientsTab() {
  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-on-surface">Vegetales</h2>
        <button className="text-secondary text-xs font-semibold flex items-center gap-1 hover:bg-secondary/10 px-3 py-1.5 rounded-full transition-colors">
          <ShoppingCart size={16} /> Añadir Todos
        </button>
      </div>
      <ul className="space-y-3 mb-8">
        <IngredientItem label="1 cebolla roja grande, en rodajas" amount="150g" />
        <IngredientItem label="2 pimientos morrones, picados" amount="200g" />
        <IngredientItem label="1 calabacín mediano, en cubos" amount="150g" />
      </ul>

      <h2 className="text-xl font-semibold text-on-surface mb-4">Despensa y Granos</h2>
      <ul className="space-y-3">
        <IngredientItem label="Quinoa" amount="1 taza" />
        <IngredientItem label="Aceite de oliva, sal, pimienta" amount="al gusto" />
      </ul>
    </div>
  );
}

function IngredientItem({ label, amount }: { label: string, amount: string }) {
  return (
    <label className="flex items-center p-4 bg-surface shadow-sm border border-surface-variant rounded-xl transition-all hover:shadow-md cursor-pointer group">
      <div className="relative flex items-center justify-center mr-4">
        <input type="checkbox" className="peer appearance-none w-5 h-5 rounded border-2 border-outline checked:bg-primary checked:border-primary transition-colors cursor-pointer" />
        <span className="absolute text-white opacity-0 peer-checked:opacity-100 pointer-events-none">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
        </span>
      </div>
      <span className="text-base text-on-surface flex-1 group-has-[:checked]:line-through group-has-[:checked]:text-outline transition-colors">{label}</span>
      <span className="text-sm text-on-surface-variant">{amount}</span>
    </label>
  );
}

function StepsTab() {
  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-8 px-4 relative max-w-md mx-auto">
        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-surface-variant -z-10 -translate-y-1/2"></div>
        <div className="flex flex-col items-center">
          <div className="w-10 h-10 rounded-full bg-secondary text-on-secondary flex items-center justify-center font-bold text-lg shadow-sm mb-2">1</div>
          <span className="text-[10px] font-bold text-secondary uppercase tracking-widest">Prep</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-10 h-10 rounded-full bg-surface-container-high border-2 border-surface-variant text-on-surface-variant flex items-center justify-center font-bold text-lg shadow-sm mb-2">2</div>
          <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Asar</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-10 h-10 rounded-full bg-surface-container-high border-2 border-surface-variant text-on-surface-variant flex items-center justify-center font-bold text-lg shadow-sm mb-2">3</div>
          <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Armar</span>
        </div>
      </div>

      <div className="space-y-6">
        <div className="bg-surface shadow-sm border-l-4 border-l-secondary border border-surface-variant rounded-xl p-5">
          <h3 className="text-lg font-semibold text-on-surface mb-2 flex items-center gap-2">
            <Scissors className="text-secondary" size={20} />
            Paso 1: Preparar Vegetales
          </h3>
          <p className="text-sm text-on-surface-variant leading-relaxed">Precalienta el horno a 200°C (400°F). Corta la cebolla roja, pimientos y calabacín en trozos uniformes para asegurar un horneado parejo.</p>
        </div>
        <div className="bg-surface shadow-sm border border-surface-variant rounded-xl p-5">
          <h3 className="text-lg font-semibold text-on-surface mb-2 flex items-center gap-2">
            <Flame className="text-on-surface-variant" size={20} />
            Paso 2: Asar y Cocinar Granos
          </h3>
          <p className="text-sm text-on-surface-variant leading-relaxed">Mezcla los vegetales con aceite de oliva, sal y pimienta. Extiende uniformemente en una bandeja de horno. Asa por 25-30 minutos hasta que estén tiernos. Mientras, cocina la quinoa según las instrucciones del paquete.</p>
        </div>
        <div className="bg-surface shadow-sm border border-surface-variant rounded-xl p-5">
          <h3 className="text-lg font-semibold text-on-surface mb-2 flex items-center gap-2">
            <Box className="text-on-surface-variant" size={20} />
            Paso 3: Porcionar para la Semana
          </h3>
          <p className="text-sm text-on-surface-variant leading-relaxed">Divide la quinoa cocida equitativamente en 4 contenedores de preparación de comidas. Cubre con los vegetales asados. Agrega una porción de hummus a cada contenedor al momento de comer.</p>
        </div>
      </div>
    </div>
  );
}

function BatchCookingTab() {
  return (
    <div className="animate-fade-in space-y-6">
      <div className="bg-secondary-container/10 border border-secondary/20 rounded-2xl p-5 flex items-start gap-4">
        <div className="bg-secondary-container text-on-secondary-container rounded-xl p-2.5 flex-shrink-0">
          <Clock size={24} />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-secondary mb-1">Guía Global de Batch Cooking (Una Mañana para Varias Personas)</h3>
          <p className="text-sm text-on-surface-variant leading-relaxed">
            Optimiza tu tiempo preparando guisos de lentejas (4-6p), ternera mechada (5p) y ensaladas (6p) en una sola sesión matutina de 2.5 horas.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="bg-surface shadow-sm border border-surface-variant rounded-xl p-5 flex flex-col gap-2">
          <h3 className="text-lg font-semibold text-on-surface flex items-center gap-2">
            <Wind className="text-primary" size={20} />
            Técnicas de Vacío (7-10 Días)
          </h3>
          <p className="text-sm text-on-surface-variant leading-relaxed">Sella al vacío raciones de carne o guisos en bolsas aptas para uso alimentario si planeas conservarlos por más de 4 días. Esto frena la oxidación y mantiene el sabor original recien cocinado.</p>
        </div>
        <div className="bg-surface shadow-sm border border-surface-variant rounded-xl p-5 flex flex-col gap-2">
          <h3 className="text-lg font-semibold text-on-surface flex items-center gap-2">
            <Refrigerator className="text-primary" size={20} />
            Sistemas de Congelación Rápida
          </h3>
          <p className="text-sm text-on-surface-variant leading-relaxed">Porciona en frío antes de congelar a -18°C. Etiqueta con fecha y descongela en nevera 24h antes de consumir para mantener textura intacta.</p>
        </div>
        <div className="bg-surface shadow-sm border border-surface-variant rounded-xl p-5 flex flex-col gap-2">
          <h3 className="text-lg font-semibold text-on-surface flex items-center gap-2">
            <Leaf className="text-primary" size={20} />
            Ensaladas Frescas Crujientes
          </h3>
          <p className="text-sm text-on-surface-variant leading-relaxed">Seca al 100% las hojas verdes tras lavar. Guarda en frasco de cristal hermético con papel absorbente en la parte superior sin aliñar.</p>
        </div>
      </div>
    </div>
  );
}
