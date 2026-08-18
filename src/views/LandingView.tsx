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
  const [calcPeople, setCalcPeople] = useState<number>(initialSimulatorContext?.peopleCount || 4);
  const [calcDays, setCalcDays] = useState<number>(initialSimulatorContext?.daysCount || 5);
  const [mealCoverage, setMealCoverage] = useState<MealCoverage>(initialSimulatorContext?.mealCoverage || 'both');
  const [dietStyle, setDietStyle] = useState<DietStyle>(initialSimulatorContext?.dietStyle || 'mediterranean');

  // Multiplier for services
  const servingsMultiplier = mealCoverage === 'both' ? 2 : 1;
  const totalServings = calcPeople * calcDays * servingsMultiplier;

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

  // Realistic 1-Single-Day Cooking Time calculation
  // Real parallel cooking: oven + 3/4 burners + pressure cooker
  const calculateCookingMinutes = () => {
    if (totalServings <= 12) return 75; // 1h 15m
    if (totalServings <= 24) return 90; // 1h 30m
    if (totalServings <= 40) return 110; // 1h 50m
    if (totalServings <= 60) return 135; // 2h 15m
    if (totalServings <= 84) return 160; // 2h 40m
    return Math.min(195, 160 + Math.round((totalServings - 84) * 0.8)); // max ~3h 15m
  };

  const cookingMinutes = calculateCookingMinutes();
  const formatHours = (mins: number) => {
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    if (m === 0) return `${h}h`;
    return `${h}h ${m}m`;
  };

  // Time saved between Mon-Fri (assuming 45 min per traditional meal preparation + washing)
  const traditionalCookingMinutesWeekly = calcDays * servingsMultiplier * 45;
  const hoursSavedWeekly = Math.max(2, Math.round((traditionalCookingMinutesWeekly - cookingMinutes) / 60));
  const dailyMealsPrepared = calcDays * servingsMultiplier;

  // Dynamic dishes for 1 single batch cooking session
  const getBatchDishes = () => {
    const dishCount = totalServings >= 48 ? 6 : 4;
    const perDish = Math.ceil(totalServings / dishCount);

    switch (dietStyle) {
      case 'fitness':
        return [
          { name: 'Pechuga de pollo mechada al curry con arroz basmati', servings: perDish, note: '42g proteína / rac', storage: 'Nevera (Días 1-3)' },
          { name: 'Lomos de salmón salvaje al horno con batata asada', servings: perDish, note: 'Omega 3 & Antiinflamatorio', storage: 'Nevera (Días 1-3)' },
          { name: 'Ternera magra estofada con verduras y champiñones', servings: perDish, note: 'Bajo en grasa saturada', storage: 'Congelador (Días 4+)' },
          { name: 'Quinoa tricolor con garbanzos tostados y semillas', servings: perDish, note: 'Carbohidratos complejos', storage: 'Nevera (Días 1-3)' },
          ...(dishCount === 6 ? [
            { name: 'Hamburguesas caseras de pavo y espinacas', servings: perDish, note: 'Proteína limpia', storage: 'Congelador (Días 4+)' },
            { name: 'Crema proteica de calabaza asada y cáñamo', servings: perDish, note: 'Cena ligera', storage: 'Congelador (Días 4+)' }
          ] : [])
        ];
      case 'veggie':
        return [
          { name: 'Curry cremoso de garbanzos con espinacas y leche de coco', servings: perDish, note: 'Proteína vegetal completa', storage: 'Nevera (Días 1-3)' },
          { name: 'Lasaña de berenjena asada, lentejas y bechamel de avena', servings: perDish, note: 'Alto en fibra', storage: 'Congelador (Días 4+)' },
          { name: 'Tofu marinado a la plancha con fideos integrales y verduras', servings: perDish, note: 'Perfil aminoácido óptimo', storage: 'Nevera (Días 1-3)' },
          { name: 'Crema aterciopelada de calabaza asada con jengibre y puerro', servings: perDish, note: 'Cena ligera digestiva', storage: 'Nevera (Días 1-3)' },
          ...(dishCount === 6 ? [
            { name: 'Guiso tradicional de alubias blancas con verduras', servings: perDish, note: 'Guiso artesanal', storage: 'Congelador (Días 4+)' },
            { name: 'Bowl de quinoa con edamames, aguacate y tahini', servings: perDish, note: 'Cena fresca', storage: 'Nevera (Días 1-3)' }
          ] : [])
        ];
      case 'lowcarb':
        return [
          { name: 'Lomo de cerdo asado con judías verdes y ajo confitado', servings: perDish, note: '< 5g carbohidratos', storage: 'Nevera (Días 1-3)' },
          { name: 'Merluza en salsa verde con almejas y espárragos trigueros', servings: perDish, note: 'Pescado blanco al horno', storage: 'Nevera (Días 1-3)' },
          { name: 'Hamburguesas de pavo y espinacas con calabacín a la plancha', servings: perDish, note: 'Sin harinas ni aditivos', storage: 'Congelador (Días 4+)' },
          { name: 'Crema de coliflor y puerro asado con nueces y parmesano', servings: perDish, note: 'Grasas saludables', storage: 'Nevera (Días 1-3)' },
          ...(dishCount === 6 ? [
            { name: 'Muslos de pollo al horno con limón y romero', servings: perDish, note: 'Proteína magra', storage: 'Congelador (Días 4+)' },
            { name: 'Ternera salteada con pimientos y champiñones', servings: perDish, note: 'Keto friendly', storage: 'Congelador (Días 4+)' }
          ] : [])
        ];
      case 'mediterranean':
      default:
        return [
          { name: 'Lentejas pardinas tradicionales con verduras de la huerta', servings: perDish, note: 'Guiso artesanal', storage: 'Nevera (Días 1-3)' },
          { name: 'Ternera estofada muy tierna en su propio jugo con zanahorias', servings: perDish, note: 'Óptima para congelar', storage: 'Congelador (Días 4+)' },
          { name: 'Lomos de merluza fresca con lecho de patatas panaderas', servings: perDish, note: 'Pescado blanco al horno', storage: 'Nevera (Días 1-3)' },
          { name: 'Crema suave de calabaza, puerro pochado y AOVE virgen extra', servings: perDish, note: 'Cena ligera digestiva', storage: 'Nevera (Días 1-3)' },
          ...(dishCount === 6 ? [
            { name: 'Garbanzos guisados con espinacas y bacalao desalado', servings: perDish, note: 'Legumbre marina', storage: 'Congelador (Días 4+)' },
            { name: 'Muslos de pollo asados al limón con patata y cebolla', servings: perDish, note: 'Asado tradicional', storage: 'Congelador (Días 4+)' }
          ] : [])
        ];
    }
  };

  const batchDishes = getBatchDishes();

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 flex flex-col font-sans antialiased transition-colors duration-200">
      
      {/* NAVBAR WITH DARK/LIGHT TOGGLE */}
      <header className="sticky top-0 z-40 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800 transition-colors">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          
          {/* Brand Logo */}
          <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-9 h-9 rounded-xl bg-emerald-600 dark:bg-emerald-500 text-white flex items-center justify-center font-black shadow-sm">
              <ChefHat size={20} />
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-base font-black tracking-tight text-zinc-900 dark:text-white">
                TouChef
              </span>
              <span className="text-[10px] bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                Batch IA
              </span>
            </div>
          </div>

          {/* Nav links */}
          <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-zinc-600 dark:text-zinc-400">
            <a href="#simulador" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors flex items-center gap-1">
              <Sparkles size={13} className="text-emerald-600 dark:text-emerald-400" /> Simulador
            </a>
            <a href="#metodo" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Método</a>
            <a href="#caracteristicas" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Características</a>
            <a href="#faq" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Preguntas</a>
          </nav>

          {/* Right Action buttons & Theme Switcher */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 transition-all active:scale-95 border border-zinc-200 dark:border-zinc-700"
              title={theme === 'dark' ? 'Cambiar a Modo Claro' : 'Cambiar a Modo Oscuro'}
            >
              {theme === 'dark' ? <Sun size={16} className="text-amber-400" /> : <Moon size={16} className="text-zinc-700" />}
            </button>

            <button
              onClick={() => onOpenAuth('login')}
              className="text-xs font-bold text-zinc-700 dark:text-zinc-300 hover:text-emerald-600 dark:hover:text-emerald-400 px-3 py-2 rounded-xl transition-colors"
            >
              Iniciar Sesión
            </button>

            <button
              onClick={() => onOpenAuth('register')}
              className="bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-all shadow-xs active:scale-95 flex items-center gap-1.5"
            >
              <span>Comenzar</span>
              <ArrowRight size={13} />
            </button>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative pt-12 pb-12 md:pt-18 md:pb-16 px-4 overflow-hidden">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-emerald-500/10 dark:bg-emerald-500/15 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="max-w-4xl mx-auto text-center space-y-5">
          <div className="inline-flex items-center gap-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-3.5 py-1.5 rounded-full text-xs font-semibold text-zinc-700 dark:text-zinc-300 shadow-xs">
            <CalendarCheck size={14} className="text-emerald-600 dark:text-emerald-400" />
            <span>Cocina 1 Solo Día a la Semana • Come Toda la Semana</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-zinc-900 dark:text-white tracking-tight leading-[1.12]">
            Cocina en <span className="text-emerald-600 dark:text-emerald-400">1 única sesión</span>.<br />
            Olvídate de cocinar de lunes a viernes.
          </h1>

          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto font-normal leading-relaxed">
            Sin tener que pensar cada noche qué cenar ni fregar sartenes a diario. TouChef calcula tus raciones exactas, aprovecha lo que tienes en la despensa y te guía en una sesión simultánea de horno y fuegos paralelos.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-3">
            <a
              href="#simulador"
              className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 text-white font-bold text-sm px-6 py-3.5 rounded-2xl shadow-sm hover:shadow-md transition-all active:scale-98 flex items-center justify-center gap-2"
            >
              <Sparkles size={16} />
              <span>Calcular Mi Lote Semanal</span>
            </a>

            <button
              onClick={() => onEnterAsGuest(getSimulatorContext())}
              className="w-full sm:w-auto bg-white hover:bg-zinc-100 dark:bg-zinc-900 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200 font-bold text-sm px-6 py-3.5 rounded-2xl transition-all active:scale-98 flex items-center justify-center gap-2 shadow-xs"
            >
              <Play size={14} className="text-emerald-600 dark:text-emerald-400" />
              <span>Explorar como Invitado</span>
            </button>
          </div>
        </div>
      </section>

      {/* SIMULADOR DE 1 SOLA SESIÓN (TIEMPO REAL, SIN AHORRO FICTICIO) */}
      <section id="simulador" className="py-12 md:py-16 bg-zinc-100/60 dark:bg-zinc-900/40 border-y border-zinc-200 dark:border-zinc-800 px-4 scroll-mt-14">
        <div className="max-w-5xl mx-auto space-y-6">
          
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-1.5 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20 text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              <Sparkles size={12} /> Simulador de Lote Semanal
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-zinc-900 dark:text-white tracking-tight">
              Calcula Tu Sesión Única de Batch Cooking
            </h2>
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
              Ajusta comensales, días y comidas para ver el volumen exacto y el tiempo de tu sesión de cocina.
            </p>
          </div>

          {/* SIMULATOR CARD */}
          <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12">
            
            {/* LEFT COLUMN: CONTROLS (5 COLS) */}
            <div className="p-6 md:p-8 space-y-5 lg:col-span-5 border-b lg:border-b-0 lg:border-r border-zinc-200 dark:border-zinc-800">
              
              {/* 1. Comensales */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-zinc-900 dark:text-zinc-100">1. Personas en casa:</span>
                  <span className="font-black text-emerald-700 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-lg border border-emerald-500/20">
                    {calcPeople} {calcPeople === 1 ? 'persona' : 'personas'}
                  </span>
                </div>
                
                <div className="grid grid-cols-4 gap-1.5">
                  {[1, 2, 4, 7].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setCalcPeople(num)}
                      className={`py-1.5 text-xs font-bold rounded-xl border transition-all ${
                        calcPeople === num
                          ? 'bg-emerald-600 dark:bg-emerald-500 text-white border-emerald-600 dark:border-emerald-500 shadow-sm'
                          : 'bg-zinc-50 dark:bg-zinc-800/60 border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800'
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
                  className="w-full accent-emerald-600 dark:accent-emerald-500 h-2 bg-zinc-200 dark:bg-zinc-800 rounded-lg cursor-pointer"
                />
              </div>

              {/* 2. Días de cobertura */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-zinc-900 dark:text-zinc-100">2. Días de cobertura semanal:</span>
                  <span className="font-black text-emerald-700 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-lg border border-emerald-500/20">
                    {calcDays} días
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-1.5">
                  {[3, 5, 6].map((days) => (
                    <button
                      key={days}
                      type="button"
                      onClick={() => setCalcDays(days)}
                      className={`py-1.5 text-xs font-bold rounded-xl border transition-all ${
                        calcDays === days
                          ? 'bg-emerald-600 dark:bg-emerald-500 text-white border-emerald-600 dark:border-emerald-500 shadow-sm'
                          : 'bg-zinc-50 dark:bg-zinc-800/60 border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800'
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
                  className="w-full accent-emerald-600 dark:accent-emerald-500 h-2 bg-zinc-200 dark:bg-zinc-800 rounded-lg cursor-pointer"
                />
              </div>

              {/* 3. Servicios a cubrir */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-900 dark:text-zinc-100 block">
                  3. ¿Qué servicios quieres tener listos?
                </label>
                <div className="grid grid-cols-3 gap-1.5">
                  <button
                    type="button"
                    onClick={() => setMealCoverage('lunches')}
                    className={`py-1.5 px-2 text-[11px] font-bold rounded-xl border transition-all text-center ${
                      mealCoverage === 'lunches'
                        ? 'bg-emerald-600 dark:bg-emerald-500 text-white border-emerald-600 dark:border-emerald-500 shadow-sm'
                        : 'bg-zinc-50 dark:bg-zinc-800/60 border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                    }`}
                  >
                    Solo Comidas
                  </button>
                  <button
                    type="button"
                    onClick={() => setMealCoverage('dinners')}
                    className={`py-1.5 px-2 text-[11px] font-bold rounded-xl border transition-all text-center ${
                      mealCoverage === 'dinners'
                        ? 'bg-emerald-600 dark:bg-emerald-500 text-white border-emerald-600 dark:border-emerald-500 shadow-sm'
                        : 'bg-zinc-50 dark:bg-zinc-800/60 border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                    }`}
                  >
                    Solo Cenas
                  </button>
                  <button
                    type="button"
                    onClick={() => setMealCoverage('both')}
                    className={`py-1.5 px-2 text-[11px] font-bold rounded-xl border transition-all text-center ${
                      mealCoverage === 'both'
                        ? 'bg-emerald-600 dark:bg-emerald-500 text-white border-emerald-600 dark:border-emerald-500 shadow-sm'
                        : 'bg-zinc-50 dark:bg-zinc-800/60 border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                    }`}
                  >
                    Comidas & Cenas
                  </button>
                </div>
              </div>

              {/* 4. Estilo de alimentación */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-900 dark:text-zinc-100 block">
                  4. Estilo de cocina:
                </label>
                <div className="grid grid-cols-2 gap-1.5">
                  {[
                    { id: 'mediterranean', label: 'Mediterránea' },
                    { id: 'fitness', label: 'Proteica / Fitness' },
                    { id: 'veggie', label: 'Plant-Based' },
                    { id: 'lowcarb', label: 'Baja en Carbos' }
                  ].map((diet) => (
                    <button
                      key={diet.id}
                      type="button"
                      onClick={() => setDietStyle(diet.id as DietStyle)}
                      className={`py-1.5 px-2 text-xs font-bold rounded-xl border transition-all truncate text-center ${
                        dietStyle === diet.id
                          ? 'bg-emerald-600 dark:bg-emerald-500 text-white border-emerald-600 dark:border-emerald-500 shadow-sm'
                          : 'bg-zinc-50 dark:bg-zinc-800/60 border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                      }`}
                    >
                      {diet.label}
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* RIGHT COLUMN: RESULTS (7 COLS) */}
            <div className="p-6 md:p-8 bg-zinc-50/70 dark:bg-zinc-950/60 space-y-5 lg:col-span-7 flex flex-col justify-between">
              
              <div className="space-y-4">
                
                {/* Header Summary */}
                <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-3">
                  <div>
                    <span className="text-[10px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                      Tu Sesión Única Semanal
                    </span>
                    <h3 className="text-base font-black text-zinc-900 dark:text-white">
                      Lote de {totalServings} Raciones ({dailyMealsPrepared} tomas familiares)
                    </h3>
                  </div>
                  <span className="text-[10px] font-bold bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20 px-2.5 py-0.5 rounded-full uppercase">
                    1 Solo Día de Cocina
                  </span>
                </div>

                {/* 3 Metric Cards (Focused on Time and Life Quality) */}
                <div className="grid grid-cols-3 gap-2.5">
                  <div className="bg-white dark:bg-zinc-900 p-3 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-xs space-y-0.5">
                    <div className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase">Raciones</div>
                    <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400 leading-none">{totalServings}</div>
                    <div className="text-[10px] text-zinc-500">{calcPeople} pers × {calcDays} días</div>
                  </div>

                  <div className="bg-white dark:bg-zinc-900 p-3 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-xs space-y-0.5">
                    <div className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase">Tiempo Sesión</div>
                    <div className="text-xl font-black text-zinc-900 dark:text-white leading-none">
                      {formatHours(cookingMinutes)}
                    </div>
                    <div className="text-[10px] text-zinc-500">1 sola vez</div>
                  </div>

                  <div className="bg-white dark:bg-zinc-900 p-3 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-xs space-y-0.5">
                    <div className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase">Tiempo Libre</div>
                    <div className="text-xl font-black text-emerald-600 dark:text-emerald-400 leading-none">
                      +{hoursSavedWeekly}h
                    </div>
                    <div className="text-[10px] text-zinc-500">de Lunes a Viernes</div>
                  </div>
                </div>

                {/* Dishes Prepared in this Single Session */}
                <div className="space-y-2">
                  <div className="text-xs font-bold text-zinc-800 dark:text-zinc-200 flex items-center justify-between">
                    <span>Preparaciones que cocinarás en la sesión:</span>
                    <span className="text-[10px] text-zinc-500 font-medium">Horno + 4 fuegos simultáneos</span>
                  </div>

                  <div className="space-y-1.5">
                    {batchDishes.map((dish, i) => (
                      <div 
                        key={i}
                        className="bg-white dark:bg-zinc-900 p-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 flex items-center justify-between text-xs shadow-2xs"
                      >
                        <div className="min-w-0 pr-2">
                          <span className="font-bold text-zinc-900 dark:text-white block truncate">{dish.name}</span>
                          <span className="text-[10px] text-zinc-500 dark:text-zinc-400">{dish.note} • {dish.storage}</span>
                        </div>
                        <span className="font-mono text-[11px] font-black text-emerald-700 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-lg border border-emerald-500/20 shrink-0">
                          {dish.servings} rac.
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Key real life benefits (No arbitrary money claims) */}
                <div className="bg-white dark:bg-zinc-900 p-3 rounded-2xl border border-zinc-200 dark:border-zinc-800 text-xs space-y-1.5">
                  <div className="flex items-center gap-2 font-bold text-zinc-900 dark:text-white">
                    <Check size={14} className="text-emerald-600 dark:text-emerald-400 shrink-0" />
                    <span><strong>Friegas y recoges la cocina 1 sola vez</strong> en toda la semana</span>
                  </div>
                  <div className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400 text-[11px]">
                    <Check size={14} className="text-emerald-600 dark:text-emerald-400 shrink-0" />
                    <span>Cero decisiones de "¿Qué comemos hoy?" entre semana</span>
                  </div>
                  <div className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400 text-[11px]">
                    <Check size={14} className="text-emerald-600 dark:text-emerald-400 shrink-0" />
                    <span>Conservación natural: Primeros 3 días en nevera a 4°C, resto al congelador</span>
                  </div>
                </div>

              </div>

              {/* Primary Call To Action */}
              <div className="pt-2">
                <button
                  onClick={handleLaunchPlan}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 text-white font-bold text-sm py-3.5 px-4 rounded-2xl transition-all shadow-md active:scale-98 flex items-center justify-center gap-2"
                >
                  <Sparkles size={16} />
                  <span>Generar Mi Sesión de {totalServings} Raciones y Lista de Compra</span>
                  <ArrowRight size={15} />
                </button>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* MÉTODO & PILARES */}
      <section id="metodo" className="py-16 px-4">
        <div className="max-w-5xl mx-auto space-y-12">
          <div className="text-center space-y-2 max-w-xl mx-auto">
            <span className="text-xs font-bold uppercase text-emerald-600 dark:text-emerald-400 tracking-wider">El Método TouChef</span>
            <h2 className="text-2xl sm:text-4xl font-black text-zinc-900 dark:text-white">
              De la Planificación a la Mesa
            </h2>
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
              Un flujo de 4 pasos para ahorrar tiempo y cocinar con tranquilidad.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white dark:bg-zinc-900 p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 space-y-2.5 shadow-xs">
              <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold text-sm border border-emerald-500/20">
                1
              </div>
              <h3 className="text-sm font-bold text-zinc-900 dark:text-white">Volumen Modular</h3>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Calcula el número de comidas globales sin atarte a calendarios rígidos de qué comer cada día.
              </p>
            </div>

            <div className="bg-white dark:bg-zinc-900 p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 space-y-2.5 shadow-xs">
              <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold text-sm border border-emerald-500/20">
                2
              </div>
              <h3 className="text-sm font-bold text-zinc-900 dark:text-white">Descuento de Nevera</h3>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Deduce automáticamente lo que ya tienes en casa para comprar solo lo estrictamente necesario.
              </p>
            </div>

            <div className="bg-white dark:bg-zinc-900 p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 space-y-2.5 shadow-xs">
              <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold text-sm border border-emerald-500/20">
                3
              </div>
              <h3 className="text-sm font-bold text-zinc-900 dark:text-white">Cocina Simultánea</h3>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Asistente de pasos entrelazados para coordinar horno, fuegos y cortes en paralelo.
              </p>
            </div>

            <div className="bg-white dark:bg-zinc-900 p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 space-y-2.5 shadow-xs">
              <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold text-sm border border-emerald-500/20">
                4
              </div>
              <h3 className="text-sm font-bold text-zinc-900 dark:text-white">Conservación</h3>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Protocolos claros de frío y congelación para mantener el sabor y textura de cada plato.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section id="faq" className="py-12 bg-zinc-100/60 dark:bg-zinc-900/40 border-t border-zinc-200 dark:border-zinc-800 px-4">
        <div className="max-w-2xl mx-auto space-y-6">
          <h2 className="text-xl font-bold text-zinc-900 dark:text-white text-center">
            Preguntas Frecuentes
          </h2>

          <div className="space-y-3 text-xs">
            <div className="bg-white dark:bg-zinc-900 p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 space-y-1">
              <h3 className="font-bold text-zinc-900 dark:text-white">¿Cuánto tiempo se tarda en cocinar la sesión?</h3>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Entre 1h 30m y 2h 30m según el número de comensales. Al usar 4 fuegos y el horno en paralelo con los pasos sincronizados, todo se cocina de una sola vez.
              </p>
            </div>

            <div className="bg-white dark:bg-zinc-900 p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 space-y-1">
              <h3 className="font-bold text-zinc-900 dark:text-white">¿Cómo se conservan las comidas para toda la semana?</h3>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Las preparaciones de los primeros 3 días se guardan en la nevera a 4°C. Las raciones para los días posteriores se congelan directamente al terminar la sesión para conservar intactos sabor y nutrientes.
              </p>
            </div>

            <div className="bg-white dark:bg-zinc-900 p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 space-y-1">
              <h3 className="font-bold text-zinc-900 dark:text-white">¿Puedo usar la aplicación gratis?</h3>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Sí, puedes usar TouChef sin coste como invitado o registrarte para sincronizar tus planes en la nube con Firebase.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8 border-t border-zinc-200 dark:border-zinc-800 text-center text-xs text-zinc-500 dark:text-zinc-400 space-y-2 bg-white dark:bg-zinc-950">
        <div className="flex items-center justify-center gap-1.5 font-bold text-zinc-900 dark:text-white">
          <ChefHat size={16} className="text-emerald-600 dark:text-emerald-400" />
          <span>TouChef Batch</span>
        </div>
        <p className="text-[11px]">
          Planificador inteligente de menús por volumen de raciones & Cocina Simultánea.
        </p>
        <div className="text-[10px] text-zinc-400 dark:text-zinc-600">
          © 2026 TouChef. Conectado a Firebase Auth & Firestore.
        </div>
      </footer>

    </div>
  );
}
