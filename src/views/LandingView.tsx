import { useState } from 'react';
import { 
  ChefHat, 
  Clock, 
  ArrowRight, 
  Check, 
  Users, 
  ShieldCheck, 
  TrendingUp, 
  Play,
  Layers,
  ShoppingBag,
  Flame,
  CheckCircle2,
  Sparkles,
  Sun,
  Moon,
  Utensils,
  Refrigerator,
  Sparkle,
  CalendarCheck
} from 'lucide-react';
import { ViewState, SimulatorContext } from '../types';
import { useTheme } from '../lib/theme';
import { TouChefLogo, TouChefIsotype } from '../components/TouChefLogo';
import { calculateBatchStructure, generateDynamicBatchDishes } from '../lib/batchEngine';

interface LandingViewProps {
  onOpenAuth: (mode?: 'login' | 'register', pendingContext?: SimulatorContext) => void;
  onEnterAsGuest: (context?: SimulatorContext) => void;
  onNavigate: (view: ViewState) => void;
  initialSimulatorContext?: SimulatorContext | null;
  onSimulatorContextChange?: (ctx: SimulatorContext) => void;
}

type DietStyle = 'mediterranean' | 'fitness' | 'veggie' | 'lowcarb';
type MealCoverage = 'lunches' | 'dinners' | 'both';

export function LandingView({ 
  onOpenAuth, 
  onEnterAsGuest, 
  onNavigate,
  initialSimulatorContext,
  onSimulatorContextChange
}: LandingViewProps) {
  const { theme, toggleTheme } = useTheme();

  // Simulator State
  const [calcPeople, setCalcPeople] = useState<number>(initialSimulatorContext?.peopleCount || 2);
  const [calcDays, setCalcDays] = useState<number>(initialSimulatorContext?.daysCount || 5);
  const [mealCoverage, setMealCoverage] = useState<MealCoverage>(initialSimulatorContext?.mealCoverage || 'both');
  const [dietStyle, setDietStyle] = useState<DietStyle>(initialSimulatorContext?.dietStyle || 'mediterranean');

  // Dynamic Batch Engine Calculation
  const structure = calculateBatchStructure({
    peopleCount: calcPeople,
    daysCount: calcDays,
    mealCoverage,
    dietStyle,
    varietyPreference: 'balanced'
  });

  const totalServings = structure.totalIndividualServings;
  const dynamicBatchDishes = generateDynamicBatchDishes({
    peopleCount: calcPeople,
    daysCount: calcDays,
    mealCoverage,
    dietStyle,
    varietyPreference: 'balanced'
  });

  // Build simulator context
  const getSimulatorContext = (): SimulatorContext => ({
    peopleCount: calcPeople,
    daysCount: calcDays,
    mealCoverage,
    dietStyle,
    totalServings
  });

  const handleLaunchPlan = () => {
    const ctx = getSimulatorContext();
    if (onSimulatorContextChange) onSimulatorContextChange(ctx);
    onEnterAsGuest(ctx);
    onNavigate({ name: 'ai-generator' });
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 flex flex-col font-sans antialiased transition-colors duration-200">
      
      {/* NAVBAR WITH DARK/LIGHT TOGGLE */}
      <header className="sticky top-0 z-40 glass-surface border-b border-zinc-200/80 dark:border-white/10 transition-colors">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          
          {/* Brand Logo */}
          <div className="cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <TouChefLogo size="md" showWordmark={true} />
          </div>

          {/* Nav links */}
          <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-zinc-600 dark:text-zinc-400">
            <a href="#simulador" className="hover:text-[#E07A5F] dark:hover:text-[#F4A261] transition-colors flex items-center gap-1">
              <Sparkles size={13} className="text-[#E07A5F]" /> Simulador
            </a>
            <a href="#metodo" className="hover:text-[#E07A5F] dark:hover:text-[#F4A261] transition-colors">Método de Eficiencia</a>
            <a href="#caracteristicas" className="hover:text-[#E07A5F] dark:hover:text-[#F4A261] transition-colors">Sistema Operativo</a>
            <a href="#faq" className="hover:text-[#E07A5F] dark:hover:text-[#F4A261] transition-colors">Preguntas</a>
          </nav>

          {/* Right Action buttons & Theme Switcher */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800/80 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 transition-all active:scale-95 border border-zinc-200 dark:border-zinc-700/80"
              title={theme === 'dark' ? 'Cambiar a Modo Claro' : 'Cambiar a Modo Oscuro'}
            >
              {theme === 'dark' ? <Sun size={16} className="text-amber-400" /> : <Moon size={16} className="text-zinc-700" />}
            </button>

            <button
              onClick={() => onOpenAuth('login')}
              className="text-xs font-bold text-zinc-700 dark:text-zinc-300 hover:text-[#E07A5F] dark:hover:text-[#F4A261] px-3 py-2 rounded-xl transition-colors cursor-pointer"
            >
              Iniciar Sesión
            </button>

            <button
              onClick={() => onOpenAuth('register')}
              className="btn-hero-copper font-bold text-xs px-4 py-2.5 rounded-xl transition-all shadow-xs active:scale-95 flex items-center gap-1.5 cursor-pointer"
            >
              <span>Comenzar</span>
              <ArrowRight size={13} />
            </button>
          </div>
        </div>
      </header>

      {/* HERO SECTION 2026 */}
      <section className="relative pt-12 pb-12 md:pt-18 md:pb-16 px-4 overflow-hidden">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#E07A5F]/15 dark:bg-[#E07A5F]/20 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="max-w-4xl mx-auto text-center space-y-5">
          <div className="inline-flex items-center gap-2 glass-surface px-4 py-1.5 rounded-full text-xs font-semibold text-zinc-700 dark:text-zinc-300 shadow-xs border border-zinc-200 dark:border-white/10">
            <Sparkles size={14} className="text-[#E07A5F]" />
            <span>Cocina 1 Solo Día a la Semana • Come con Calidad de Restaurante Cada Día</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-display font-black text-zinc-900 dark:text-[#F4F1DE] tracking-tight leading-[1.12]">
            Alta eficiencia culinaria para tu semana.<br />
            <span className="text-[#E07A5F]">Cocina en 1 única sesión.</span>
          </h1>

          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto font-normal leading-relaxed">
            Sin pensar cada noche qué cenar ni limpiar sartenes a diario. TouChef orquesta tus fuegos simultáneos, cruza tu despensa viva y calcula raciones al milímetro.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-3">
            <a
              href="#simulador"
              className="w-full sm:w-auto btn-hero-copper font-bold text-sm px-6 py-3.5 rounded-2xl shadow-sm hover:shadow-md transition-all active:scale-98 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Sparkles size={16} />
              <span>Calcular Mi Sesión Semanal</span>
            </a>

            <button
              onClick={() => onEnterAsGuest(getSimulatorContext())}
              className="w-full sm:w-auto glass-surface hover:bg-zinc-100 dark:hover:bg-zinc-800/80 border border-zinc-200 dark:border-white/10 text-zinc-800 dark:text-zinc-200 font-bold text-sm px-6 py-3.5 rounded-2xl transition-all active:scale-98 flex items-center justify-center gap-2 shadow-xs cursor-pointer"
            >
              <Play size={14} className="text-[#E07A5F]" />
              <span>Explorar como Invitado</span>
            </button>
          </div>
        </div>
      </section>

      {/* SIMULATOR SECTION 2026 */}
      <section id="simulador" className="py-12 md:py-16 px-4">
        <div className="max-w-5xl mx-auto space-y-8">
          
          <div className="text-center space-y-2 max-w-xl mx-auto">
            <span className="text-xs font-bold uppercase text-[#E07A5F] tracking-wider">Simulador de Alta Eficiencia</span>
            <h2 className="text-2xl sm:text-4xl font-display font-black text-zinc-900 dark:text-[#F4F1DE] tracking-tight">
              Calcula Tu Sesión Única de Cocina
            </h2>
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
              Ajusta comensales, días y régimen para obtener el volumen exacto de raciones y tiempo de fuegos.
            </p>
          </div>

          {/* SIMULATOR CARD */}
          <div className="glass-surface-elevated rounded-3xl border border-zinc-200 dark:border-white/10 shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12">
            
            {/* LEFT COLUMN: CONTROLS (5 COLS) */}
            <div className="p-6 md:p-8 space-y-5 lg:col-span-5 border-b lg:border-b-0 lg:border-r border-zinc-200 dark:border-zinc-800">
              
              {/* 1. Comensales */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-zinc-900 dark:text-zinc-100">1. Personas en el hogar:</span>
                  <span className="font-mono font-black text-[#E07A5F] bg-[#E07A5F]/10 px-2.5 py-0.5 rounded-lg border border-[#E07A5F]/25">
                    {calcPeople} {calcPeople === 1 ? 'persona' : 'personas'}
                  </span>
                </div>
                
                <div className="grid grid-cols-4 gap-1.5">
                  {[1, 2, 4, 7].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setCalcPeople(num)}
                      className={`py-2 text-xs font-bold rounded-xl border transition-all cursor-pointer active:scale-95 ${
                        calcPeople === num
                          ? 'bg-[#E07A5F] text-white border-[#E07A5F] shadow-sm shadow-[#E07A5F]/30'
                          : 'bg-zinc-50 dark:bg-zinc-800/60 border-zinc-200 dark:border-zinc-700/80 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                      }`}
                    >
                      {num === 7 ? '7+' : `${num}p`}
                    </button>
                  ))}
                </div>

                <input 
                  type="range" 
                  min={1} 
                  max={8} 
                  value={calcPeople} 
                  onChange={(e) => setCalcPeople(parseInt(e.target.value))} 
                  className="w-full accent-[#E07A5F] h-2 bg-zinc-200 dark:bg-zinc-800 rounded-lg cursor-pointer"
                />
              </div>

              {/* 2. Días de cobertura */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-zinc-900 dark:text-zinc-100">2. Días de cobertura semanal:</span>
                  <span className="font-mono font-black text-[#E07A5F] bg-[#E07A5F]/10 px-2.5 py-0.5 rounded-lg border border-[#E07A5F]/25">
                    {calcDays} días
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-1.5">
                  {[3, 5, 6].map((days) => (
                    <button
                      key={days}
                      type="button"
                      onClick={() => setCalcDays(days)}
                      className={`py-2 text-xs font-bold rounded-xl border transition-all cursor-pointer active:scale-95 ${
                        calcDays === days
                          ? 'bg-[#E07A5F] text-white border-[#E07A5F] shadow-sm shadow-[#E07A5F]/30'
                          : 'bg-zinc-50 dark:bg-zinc-800/60 border-zinc-200 dark:border-zinc-700/80 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                      }`}
                    >
                      {days} días
                    </button>
                  ))}
                </div>

                <input 
                  type="range" 
                  min={3} 
                  max={7} 
                  value={calcDays} 
                  onChange={(e) => setCalcDays(parseInt(e.target.value))} 
                  className="w-full accent-[#E07A5F] h-2 bg-zinc-200 dark:bg-zinc-800 rounded-lg cursor-pointer"
                />
              </div>

              {/* 3. Servicios a cubrir */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-900 dark:text-zinc-100 block">
                  3. Tomas diarias a resolver:
                </label>
                <div className="grid grid-cols-3 gap-1.5">
                  <button
                    type="button"
                    onClick={() => setMealCoverage('lunches')}
                    className={`py-2 px-2 text-[11px] font-bold rounded-xl border transition-all text-center cursor-pointer active:scale-95 ${
                      mealCoverage === 'lunches'
                        ? 'bg-[#E07A5F] text-white border-[#E07A5F] shadow-sm shadow-[#E07A5F]/30'
                        : 'bg-zinc-50 dark:bg-zinc-800/60 border-zinc-200 dark:border-zinc-700/80 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                    }`}
                  >
                    Almuerzos
                  </button>
                  <button
                    type="button"
                    onClick={() => setMealCoverage('dinners')}
                    className={`py-2 px-2 text-[11px] font-bold rounded-xl border transition-all text-center cursor-pointer active:scale-95 ${
                      mealCoverage === 'dinners'
                        ? 'bg-[#E07A5F] text-white border-[#E07A5F] shadow-sm shadow-[#E07A5F]/30'
                        : 'bg-zinc-50 dark:bg-zinc-800/60 border-zinc-200 dark:border-zinc-700/80 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                    }`}
                  >
                    Cenas
                  </button>
                  <button
                    type="button"
                    onClick={() => setMealCoverage('both')}
                    className={`py-2 px-2 text-[11px] font-bold rounded-xl border transition-all text-center cursor-pointer active:scale-95 ${
                      mealCoverage === 'both'
                        ? 'bg-[#E07A5F] text-white border-[#E07A5F] shadow-sm shadow-[#E07A5F]/30'
                        : 'bg-zinc-50 dark:bg-zinc-800/60 border-zinc-200 dark:border-zinc-700/80 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                    }`}
                  >
                    Cobertura Total
                  </button>
                </div>
              </div>

              {/* 4. Estilo de alimentación */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-900 dark:text-zinc-100 block">
                  4. Estilo gastronómico:
                </label>
                <div className="grid grid-cols-2 gap-1.5">
                  {[
                    { id: 'mediterranean', label: 'Mediterránea' },
                    { id: 'fitness', label: 'Alto en Proteína' },
                    { id: 'veggie', label: '100% Vegetal' },
                    { id: 'lowcarb', label: 'Low Carb' }
                  ].map((diet) => (
                    <button
                      key={diet.id}
                      type="button"
                      onClick={() => setDietStyle(diet.id as DietStyle)}
                      className={`py-2 px-2 text-xs font-bold rounded-xl border transition-all truncate text-center cursor-pointer active:scale-95 ${
                        dietStyle === diet.id
                          ? 'bg-[#E07A5F] text-white border-[#E07A5F] shadow-sm shadow-[#E07A5F]/30'
                          : 'bg-zinc-50 dark:bg-zinc-800/60 border-zinc-200 dark:border-zinc-700/80 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                      }`}
                    >
                      {diet.label}
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* RIGHT COLUMN: RESULTS (7 COLS) */}
            <div className="p-6 md:p-8 bg-zinc-50/50 dark:bg-[#0E0F12]/80 space-y-5 lg:col-span-7 flex flex-col justify-between">
              
              <div className="space-y-4">
                
                {/* Header Summary */}
                <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-3">
                  <div>
                    <span className="text-[10px] font-black text-[#E07A5F] uppercase tracking-wider">
                      Tu Hoja de Producción
                    </span>
                    <h3 className="text-base font-display font-black text-zinc-900 dark:text-white">
                      Lote de {structure.totalIndividualServings} Raciones ({structure.totalFamilyMeals} tomas familiares)
                    </h3>
                  </div>
                  <span className="text-[10px] font-bold bg-[#E07A5F]/15 text-[#E07A5F] border border-[#E07A5F]/30 px-2.5 py-0.5 rounded-full uppercase">
                    {structure.dishCount} Recetas Coordinadas
                  </span>
                </div>

                {/* 3 Metric Cards */}
                <div className="grid grid-cols-3 gap-2.5">
                  <div className="glass-surface p-3.5 rounded-2xl border border-zinc-200 dark:border-white/10 shadow-xs space-y-0.5">
                    <div className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase">Raciones</div>
                    <div className="text-2xl font-mono font-black text-[#E07A5F] leading-none tabular-nums">{structure.totalIndividualServings}</div>
                    <div className="text-[10px] text-zinc-500">{calcPeople} pers × {structure.totalFamilyMeals} tomas</div>
                  </div>

                  <div className="glass-surface p-3.5 rounded-2xl border border-zinc-200 dark:border-white/10 shadow-xs space-y-0.5">
                    <div className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase">Tiempo Sesión</div>
                    <div className="text-xl font-mono font-black text-zinc-900 dark:text-white leading-none tabular-nums">
                      {structure.estimatedCookTimeFormatted}
                    </div>
                    <div className="text-[10px] text-zinc-500">fuegos simultáneos</div>
                  </div>

                  <div className="glass-surface p-3.5 rounded-2xl border border-zinc-200 dark:border-white/10 shadow-xs space-y-0.5">
                    <div className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase">Tiempo Ganado</div>
                    <div className="text-xl font-mono font-black text-[#84A98C] leading-none tabular-nums">
                      +{structure.hoursSavedWeekly}h
                    </div>
                    <div className="text-[10px] text-zinc-500">libres de L a V</div>
                  </div>
                </div>

                {/* Dishes Prepared */}
                <div className="space-y-2">
                  <div className="text-xs font-bold text-zinc-800 dark:text-zinc-200 flex items-center justify-between">
                    <span>Orquestación térmica de la sesión ({dynamicBatchDishes.length} recetas):</span>
                    <span className="text-[10px] text-zinc-500 font-medium">Horno + 4 fuegos paralelos</span>
                  </div>

                  <div className="space-y-1.5 max-h-60 overflow-y-auto pr-1">
                    {dynamicBatchDishes.map((dish, i) => {
                      const isLunch = dish.category === 'legumbres' || dish.category === 'carnes' || dish.category === 'acompanamientos';
                      const familyMeals = Math.round(dish.servings / calcPeople);
                      return (
                        <div 
                          key={dish.id || i}
                          className="glass-surface p-2.5 rounded-xl border border-zinc-200 dark:border-white/10 flex items-center justify-between text-xs shadow-2xs"
                        >
                          <div className="min-w-0 pr-2">
                            <div className="flex items-center gap-1.5 mb-0.5">
                              <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded ${
                                isLunch ? 'bg-amber-500/15 text-amber-600 dark:text-amber-400' : 'bg-indigo-500/15 text-indigo-600 dark:text-indigo-400'
                              }`}>
                                {isLunch ? 'Almuerzo' : 'Cena'}
                              </span>
                              <span className="font-bold text-zinc-900 dark:text-white truncate">{dish.name}</span>
                            </div>
                            <span className="text-[10px] text-zinc-500 dark:text-zinc-400">
                              {dish.cookingMethod.replace('_', ' ')} • {dish.storageAdvice}
                            </span>
                          </div>
                          <span className="font-mono text-[11px] font-black text-[#E07A5F] bg-[#E07A5F]/10 px-2 py-0.5 rounded-lg border border-[#E07A5F]/20 shrink-0 tabular-nums">
                            {dish.servings} rac ({familyMeals} tomas)
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Key real life benefits */}
                <div className="glass-surface p-3 rounded-2xl border border-zinc-200 dark:border-white/10 text-xs space-y-1.5">
                  <div className="flex items-center gap-2 font-bold text-zinc-900 dark:text-white">
                    <Check size={14} className="text-[#E07A5F] shrink-0" />
                    <span><strong>Friegas y recoges la cocina 1 sola vez</strong> en toda la semana</span>
                  </div>
                  <div className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400 text-[11px]">
                    <Check size={14} className="text-[#E07A5F] shrink-0" />
                    <span>Cero decisiones de "¿Qué cenamos hoy?" al terminar la jornada</span>
                  </div>
                  <div className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400 text-[11px]">
                    <Check size={14} className="text-[#84A98C] shrink-0" />
                    <span>Conservación bio-organoléptica: días 1-3 en nevera (4°C), días 4+ al congelador</span>
                  </div>
                </div>

              </div>

              {/* Primary Call To Action */}
              <div className="pt-2">
                <button
                  onClick={handleLaunchPlan}
                  className="w-full btn-hero-copper font-bold text-sm py-3.5 px-4 rounded-2xl transition-all shadow-md active:scale-98 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Sparkles size={16} />
                  <span>Planificar Sesión de {structure.totalIndividualServings} Raciones ({structure.dishCount} Platos)</span>
                  <ArrowRight size={15} />
                </button>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* MÉTODO & PILARES DE ALTA EFICIENCIA */}
      <section id="metodo" className="py-16 px-4">
        <div className="max-w-5xl mx-auto space-y-12">
          <div className="text-center space-y-2 max-w-xl mx-auto">
            <span className="text-xs font-bold uppercase text-[#E07A5F] tracking-wider">El Método TouChef</span>
            <h2 className="text-2xl sm:text-4xl font-display font-black text-zinc-900 dark:text-[#F4F1DE]">
              Los 4 Pilares de la Cocina de Alta Eficiencia
            </h2>
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
              Un flujo riguroso para ahorrar tiempo, optimizar tus compras y cocinar con maestría.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div className="glass-surface p-5 rounded-2xl space-y-2.5 shadow-xs border border-zinc-200 dark:border-white/10">
              <div className="w-8 h-8 rounded-xl bg-[#E07A5F]/15 text-[#E07A5F] flex items-center justify-center font-black text-sm border border-[#E07A5F]/30">
                1
              </div>
              <h3 className="text-sm font-bold text-zinc-900 dark:text-white">Orquestación Térmica</h3>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Alinea los tiempos de horno, olla exprés y placas para producir 4-6 platos completos en una sola ventana de 90 min.
              </p>
            </div>

            <div className="glass-surface p-5 rounded-2xl space-y-2.5 shadow-xs border border-zinc-200 dark:border-white/10">
              <div className="w-8 h-8 rounded-xl bg-[#52796F]/15 text-[#84A98C] flex items-center justify-center font-black text-sm border border-[#52796F]/30">
                2
              </div>
              <h3 className="text-sm font-bold text-zinc-900 dark:text-white">Cesta Descontada</h3>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Tu lista de la compra descuenta automáticamente lo que ya tienes en la despensa. Cero compras duplicadas.
              </p>
            </div>

            <div className="glass-surface p-5 rounded-2xl space-y-2.5 shadow-xs border border-zinc-200 dark:border-white/10">
              <div className="w-8 h-8 rounded-xl bg-[#E07A5F]/15 text-[#E07A5F] flex items-center justify-center font-black text-sm border border-[#E07A5F]/30">
                3
              </div>
              <h3 className="text-sm font-bold text-zinc-900 dark:text-white">Preservación Organoléptica</h3>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Protocolos de enfriamiento rápido y almacenamiento para que el plato del viernes mantenga el sabor y textura del primer día.
              </p>
            </div>

            <div className="glass-surface p-5 rounded-2xl space-y-2.5 shadow-xs border border-zinc-200 dark:border-white/10">
              <div className="w-8 h-8 rounded-xl bg-[#52796F]/15 text-[#84A98C] flex items-center justify-center font-black text-sm border border-[#52796F]/30">
                4
              </div>
              <h3 className="text-sm font-bold text-zinc-900 dark:text-white">Cero Carga Mental</h3>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Llega a casa y ten la cena familiar lista en 3 minutos de regeneración térmica sin sartenes sucias.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section id="faq" className="py-12 bg-zinc-100/60 dark:bg-zinc-900/40 border-t border-zinc-200 dark:border-zinc-800 px-4">
        <div className="max-w-2xl mx-auto space-y-6">
          <h2 className="text-xl font-display font-bold text-zinc-900 dark:text-white text-center">
            Preguntas Frecuentes
          </h2>

          <div className="space-y-3 text-xs">
            <div className="glass-surface p-4 rounded-2xl space-y-1 border border-zinc-200 dark:border-white/10">
              <h3 className="font-bold text-zinc-900 dark:text-white">¿Cuánto tiempo se tarda en cocinar la sesión?</h3>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Entre 60 y 90 minutos según el número de comensales. Al sincronizar 4 fuegos, olla rápida y horno en paralelo con los pasos asistidos, todo se cocina en un único bloque.
              </p>
            </div>

            <div className="glass-surface p-4 rounded-2xl space-y-1 border border-zinc-200 dark:border-white/10">
              <h3 className="font-bold text-zinc-900 dark:text-white">¿Cómo se conservan las comidas para toda la semana?</h3>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Las preparaciones de los primeros 3 días se guardan en la nevera a 4°C en recipientes herméticos. Las raciones para los días posteriores se congelan directamente al terminar la sesión para conservar intactos sabor y nutrientes.
              </p>
            </div>

            <div className="glass-surface p-4 rounded-2xl space-y-1 border border-zinc-200 dark:border-white/10">
              <h3 className="font-bold text-zinc-900 dark:text-white">¿Puedo usar la aplicación gratis?</h3>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Sí, puedes usar TouChef sin coste como invitado o registrarte para sincronizar tus planes en la nube con Firebase.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER 2026 */}
      <footer className="py-10 border-t border-zinc-200/80 dark:border-white/10 text-center text-xs text-zinc-500 dark:text-zinc-400 space-y-3 bg-white dark:bg-[#0C0D0E]">
        <div className="flex justify-center">
          <TouChefLogo size="sm" showWordmark={true} showTagline={true} />
        </div>
        <p className="text-[11px] max-w-md mx-auto">
          Sistema de Cocina Inteligente &amp; Alta Eficiencia Familiar. Orquestación de fuegos simultáneos.
        </p>
        <div className="text-[10px] text-zinc-400 dark:text-zinc-600">
          © 2026 TouChef. Conectado a Firebase Auth &amp; Firestore.
        </div>
      </footer>

    </div>
  );
}
