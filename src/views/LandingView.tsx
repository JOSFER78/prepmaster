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
  CalendarCheck,
  Star,
  MapPin,
  UtensilsCrossed,
  Car,
  PackageCheck,
  Globe,
  Cookie,
  FileText,
  Lock,
  Truck,
  Eye
} from 'lucide-react';
import { ViewState, MealPlanConfig } from '../types';
import { useTheme } from '../lib/theme';
import { TouChefLogo } from '../components/TouChefLogo';
import { calculateBatchStructure, generateDynamicBatchDishes } from '../lib/batchEngine';
import { User as FirebaseUser } from '../lib/firebase';

interface LandingViewProps {
  onOpenAuth: (mode?: 'login' | 'register', pendingContext?: MealPlanConfig) => void;
  onEnterAsGuest: (context?: MealPlanConfig) => void;
  onNavigate: (view: ViewState) => void;
  currentUser?: FirebaseUser | null;
  onOpenLegal?: (type: 'privacy' | 'terms' | 'cookies') => void;
  initialPlanConfig?: MealPlanConfig | null;
  onPlanConfigChange?: (ctx: MealPlanConfig) => void;
}

type DietStyle = 'mediterranean' | 'fitness' | 'veggie' | 'lowcarb';
type MealCoverage = 'lunches' | 'dinners' | 'both';

export function LandingView({ 
  onOpenAuth, 
  onEnterAsGuest, 
  onNavigate,
  currentUser,
  onOpenLegal,
  initialPlanConfig,
  onPlanConfigChange
}: LandingViewProps) {
  const { theme, toggleTheme } = useTheme();

  // Meal Plan Config State
  const [calcPeople, setCalcPeople] = useState<number>(initialPlanConfig?.peopleCount || 2);
  const [calcDays, setCalcDays] = useState<number>(initialPlanConfig?.daysCount || 5);
  const [mealCoverage, setMealCoverage] = useState<MealCoverage>(initialPlanConfig?.mealCoverage || 'both');
  const [dietStyle, setDietStyle] = useState<DietStyle>(initialPlanConfig?.dietStyle || 'mediterranean');

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

  // Build real plan config
  const getPlanConfig = (): MealPlanConfig => ({
    peopleCount: calcPeople,
    daysCount: calcDays,
    mealCoverage,
    dietStyle,
    totalServings
  });

  const handleLaunchPlan = (intent: 'cook' | 'chef' | 'supermarket' = 'cook') => {
    const ctx = getPlanConfig();
    if (onPlanConfigChange) onPlanConfigChange(ctx);
    onEnterAsGuest(ctx);
    if (intent === 'chef') {
      onNavigate({ name: 'chefs' });
    } else if (intent === 'supermarket') {
      onNavigate({ name: 'supermarket-checkout' });
    } else {
      onNavigate({ name: 'ai-generator' });
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 flex flex-col font-sans antialiased transition-colors duration-200">
      
      {/* NAVBAR */}
      <header className="sticky top-0 z-40 glass-surface border-b border-zinc-200/80 dark:border-white/10 transition-colors">
        <div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 h-16 flex items-center justify-between">
          
          {/* Brand Logo */}
          <div className="cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <TouChefLogo size="md" showWordmark={true} />
          </div>

            {/* Nav links */}
          <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-zinc-600 dark:text-zinc-400">
            <a href="#que-hacer" className="hover:text-[#E07A5F] dark:hover:text-[#F4A261] transition-colors">
              ¿Qué quieres hacer?
            </a>
            <a href="#modos" className="hover:text-[#E07A5F] dark:hover:text-[#F4A261] transition-colors">
              3 Formas de Uso
            </a>
            <a href="#planificador" className="hover:text-[#E07A5F] dark:hover:text-[#F4A261] transition-colors flex items-center gap-1">
              <Sparkles size={13} className="text-[#E07A5F]" /> Planificador Semanal
            </a>
            <a href="#faq" className="hover:text-[#E07A5F] dark:hover:text-[#F4A261] transition-colors">
              Preguntas Frecuentes
            </a>
          </nav>

          {/* Right Action buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Direct Demo Mode button */}
            <button
              onClick={() => onEnterAsGuest(getPlanConfig())}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white/80 dark:bg-zinc-800/80 text-xs font-bold text-zinc-700 dark:text-zinc-300 hover:text-[#E07A5F] dark:hover:text-[#F4A261] transition-all cursor-pointer shadow-2xs"
              title="Explorar la app en modo demostración con datos estándar"
            >
              <Eye size={14} className="text-amber-500" />
              <span className="hidden sm:inline">Modo Demo</span>
            </button>

            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl text-zinc-500 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-200/50 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
              aria-label="Cambiar tema"
            >
              {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
            </button>

            {currentUser ? (
              <button
                onClick={() => onNavigate({ name: 'home' })}
                className="btn-hero-copper text-white font-bold text-xs px-4 py-2 rounded-xl shadow-xs transition-all flex items-center gap-1.5 active:scale-95 cursor-pointer"
              >
                <UtensilsCrossed size={14} />
                <span>Ir a Mi Cocina</span>
              </button>
            ) : (
              <>
                <button
                  onClick={() => onOpenAuth('login', getPlanConfig())}
                  className="text-xs font-bold text-zinc-700 dark:text-zinc-300 hover:text-[#E07A5F] dark:hover:text-[#F4A261] px-3 py-2 transition-colors cursor-pointer"
                >
                  Acceder
                </button>
                <button
                  onClick={() => onOpenAuth('register', getPlanConfig())}
                  className="btn-hero-copper text-white font-bold text-xs px-4 py-2 rounded-xl shadow-xs transition-all flex items-center gap-1.5 active:scale-95 cursor-pointer"
                >
                  <span>Registrarse</span>
                  <ArrowRight size={13} />
                </button>
              </>
            )}
          </div>

        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative overflow-hidden pt-12 pb-16 md:pt-20 md:pb-24 px-4 sm:px-8">
        <div className="max-w-5xl mx-auto text-center space-y-6">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 text-xs font-bold animate-fade-in">
            <Sparkles size={14} />
            <span>TOUCHEF · Software de Cocina Inteligente &amp; Marketplace de Cocineros</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-display font-black tracking-tight text-zinc-900 dark:text-white leading-[1.1]">
            Tu menú semanal resuelto. <br />
            <span className="text-gradient-copper">Cocínalo tú o encarga a un chef.</span>
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            Genera en segundos tu menú batch cooking optimizado para tus fuegos y tuppers, compra los ingredientes en DIA o contrata a un cocinero profesional verificado que cocine en tu casa.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => onOpenAuth('register', getPlanConfig())}
              className="w-full sm:w-auto btn-hero-copper text-white font-bold text-xs sm:text-sm px-6 py-3.5 rounded-2xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
            >
              <Sparkles size={16} />
              <span>Crear Cuenta y Empezar Gratis</span>
            </button>

            <button
              onClick={() => onEnterAsGuest(getPlanConfig())}
              className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-zinc-200 dark:bg-zinc-800 hover:bg-zinc-300 dark:hover:bg-zinc-700 text-zinc-900 dark:text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Eye size={16} className="text-amber-500" />
              <span>Explorar en Modo Demo (Solo Lectura)</span>
            </button>
          </div>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-6 text-xs text-zinc-500 dark:text-zinc-400">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 size={14} className="text-emerald-500" /> Cero desperdicio
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 size={14} className="text-emerald-500" /> Cocineros con certificado sanitario
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 size={14} className="text-emerald-500" /> Sincronización con DIA Supermercados
            </span>
          </div>

        </div>
      </section>

      {/* 3 PILARS / MODOS DE USO */}
      <section id="modos" className="py-14 bg-zinc-100/50 dark:bg-zinc-900/30 border-y border-zinc-200 dark:border-zinc-800 px-4 sm:px-8">
        <div className="max-w-6xl mx-auto space-y-10">
          
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-zinc-900 dark:text-white">
              Tres formas de resolver tus comidas de la semana
            </h2>
            <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 max-w-xl mx-auto">
              Elige el nivel de delegación que necesitas cada semana según tu tiempo disponible.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Pilar 1 */}
            <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 border border-zinc-200 dark:border-zinc-800 shadow-xs space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-[#E07A5F]/15 text-[#E07A5F] flex items-center justify-center font-bold">
                  <Flame size={24} />
                </div>
                <h3 className="text-lg font-bold text-zinc-900 dark:text-white">1. Cocinas tú mismo</h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                  Planifica tu menú semanal en 90 minutos con nuestra cocina guiada interactiva y temporizadores en paralelo para 4 fuegos y horno.
                </p>
              </div>
              <button
                onClick={() => handleLaunchPlan('cook')}
                className="w-full py-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-[#E07A5F] hover:text-white text-xs font-bold transition-all cursor-pointer"
              >
                Probar Cocina Guiada
              </button>
            </div>

            {/* Pilar 2 */}
            <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 border border-rose-500/30 shadow-xs space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-rose-500/15 text-rose-500 flex items-center justify-center font-bold">
                  <Truck size={24} />
                </div>
                <h3 className="text-lg font-bold text-zinc-900 dark:text-white">2. Compra en Supermercados DIA</h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                  Convierte tu lista de compra en una cesta real de DIA y recíbela en casa con franja inversa antes de que empiece la sesión.
                </p>
              </div>
              <button
                onClick={() => handleLaunchPlan('supermarket')}
                className="w-full py-2.5 rounded-xl bg-rose-500/10 hover:bg-rose-500 hover:text-white text-rose-600 dark:text-rose-400 text-xs font-bold transition-all cursor-pointer"
              >
                Ver Integración DIA
              </button>
            </div>

            {/* Pilar 3 */}
            <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 border border-amber-500/30 shadow-xs space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/15 text-amber-500 flex items-center justify-center font-bold">
                  <ChefHat size={24} />
                </div>
                <h3 className="text-lg font-bold text-zinc-900 dark:text-white">3. Encargas a un Chef</h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                  Un cocinero profesional verificado acude a tu domicilio, prepara todos los táperes semanales y deja tu cocina impecable.
                </p>
              </div>
              <button
                onClick={() => handleLaunchPlan('chef')}
                className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-black transition-all cursor-pointer"
              >
                Contratar un Cocinero
              </button>
            </div>

          </div>

        </div>
      </section>

      {/* PLANIFICADOR SEMANAL REAL */}
      <section id="planificador" className="py-16 px-4 sm:px-8">
        <div className="max-w-5xl mx-auto space-y-8">
          
          <div className="text-center space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#E07A5F]">Planificación de Menús &amp; Raciones</span>
            <h2 className="text-2xl sm:text-4xl font-display font-black text-zinc-900 dark:text-white">
              Configura tu Plan Semanal
            </h2>
            <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 max-w-xl mx-auto">
              Configura comensales y días de cobertura para optimizar las raciones reales, el tiempo de cocinado y el menú de tu hogar.
            </p>
          </div>

          {/* PLANNER CARD */}
          <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 p-6 sm:p-8 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Controls */}
            <div className="lg:col-span-5 space-y-5">
              
              <div>
                <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300 block mb-2">
                  1. Comensales en casa: <strong className="text-[#E07A5F]">{calcPeople} personas</strong>
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {[1, 2, 4, 6].map(num => (
                    <button
                      key={num}
                      onClick={() => setCalcPeople(num)}
                      className={`py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                        calcPeople === num
                          ? 'bg-[#E07A5F] text-white border-[#E07A5F]'
                          : 'bg-zinc-50 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700'
                      }`}
                    >
                      {num} {num === 1 ? 'persona' : 'personas'}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300 block mb-2">
                  2. Días a cubrir: <strong className="text-[#E07A5F]">{calcDays} días</strong>
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[3, 5, 7].map(days => (
                    <button
                      key={days}
                      onClick={() => setCalcDays(days)}
                      className={`py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                        calcDays === days
                          ? 'bg-[#E07A5F] text-white border-[#E07A5F]'
                          : 'bg-zinc-50 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700'
                      }`}
                    >
                      {days} días
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300 block mb-2">
                  3. Estilo de Dieta:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'mediterranean' as const, label: 'Mediterránea' },
                    { id: 'fitness' as const, label: 'High Protein' },
                    { id: 'veggie' as const, label: 'Vegetariana' },
                    { id: 'lowcarb' as const, label: 'Low Carb / Keto' }
                  ].map(d => (
                    <button
                      key={d.id}
                      onClick={() => setDietStyle(d.id)}
                      className={`py-2 px-3 rounded-xl text-xs font-bold border text-left transition-all cursor-pointer ${
                        dietStyle === d.id
                          ? 'bg-[#E07A5F]/15 border-[#E07A5F] text-[#E07A5F]'
                          : 'bg-zinc-50 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-zinc-700'
                      }`}
                    >
                      {d.label}
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* Right Output & Breakdown */}
            <div className="lg:col-span-7 bg-zinc-50 dark:bg-zinc-800/50 rounded-2xl p-5 sm:p-6 border border-zinc-200 dark:border-zinc-700 flex flex-col justify-between space-y-6">
              
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-3">
                  
                  <div className="bg-white dark:bg-zinc-800 p-3 rounded-xl border border-zinc-200 dark:border-zinc-700 text-center shadow-xs">
                    <span className="text-[10px] uppercase font-bold text-zinc-500 dark:text-zinc-400 block">Raciones Totales</span>
                    <strong className="text-xl sm:text-2xl font-mono font-black text-[#E07A5F]">{totalServings}</strong>
                  </div>

                  <div className="bg-white dark:bg-zinc-800 p-3 rounded-xl border border-zinc-200 dark:border-zinc-700 text-center shadow-xs">
                    <span className="text-[10px] uppercase font-bold text-zinc-500 dark:text-zinc-400 block">Tiempo Cocinado</span>
                    <strong className="text-xl sm:text-2xl font-mono font-black text-amber-500">{structure.estimatedCookTimeMinutes}m</strong>
                  </div>

                  <div className="bg-white dark:bg-zinc-800 p-3 rounded-xl border border-zinc-200 dark:border-zinc-700 text-center shadow-xs">
                    <span className="text-[10px] uppercase font-bold text-zinc-500 dark:text-zinc-400 block">Ahorro Semanal</span>
                    <strong className="text-xl sm:text-2xl font-mono font-black text-emerald-500">+{structure.hoursSavedWeekly}h</strong>
                  </div>

                </div>

                <div className="space-y-2">
                  <span className="text-xs font-bold text-zinc-700 dark:text-zinc-300 block">
                    Menú recomendado ({dynamicBatchDishes.length} recetas coordinadas):
                  </span>
                  <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                    {dynamicBatchDishes.map((dish, i) => (
                      <div 
                        key={i}
                        className="bg-white dark:bg-zinc-800 p-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 flex items-center justify-between text-xs shadow-xs"
                      >
                        <div>
                          <strong className="text-zinc-900 dark:text-white block font-bold">{dish.name}</strong>
                          <span className="text-[10px] text-zinc-500 dark:text-zinc-400">{dish.storageAdvice}</span>
                        </div>
                        <span className="font-mono font-bold text-[#E07A5F] bg-[#E07A5F]/10 px-2 py-0.5 rounded-md">
                          {dish.servings} rac
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <button
                  onClick={() => handleLaunchPlan('cook')}
                  className="btn-hero-copper text-white font-bold text-xs py-3 px-4 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Sparkles size={15} />
                  <span>Cocinar Yo ({totalServings} rac)</span>
                </button>

                <button
                  onClick={() => handleLaunchPlan('chef')}
                  className="bg-amber-500 hover:bg-amber-400 text-stone-950 font-black text-xs py-3 px-4 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <ChefHat size={15} />
                  <span>Encargar a un Chef</span>
                </button>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* FAQ SECTION */}
      <section id="faq" className="py-14 bg-zinc-100/60 dark:bg-zinc-900/40 border-t border-zinc-200 dark:border-zinc-800 px-4 sm:px-8">
        <div className="max-w-3xl mx-auto space-y-6">
          <h2 className="text-2xl font-display font-bold text-zinc-900 dark:text-white text-center">
            Preguntas Frecuentes sobre TouChef
          </h2>

          <div className="space-y-3 text-xs">
            <div className="bg-white dark:bg-zinc-900 p-4 rounded-2xl space-y-1 border border-zinc-200 dark:border-zinc-800 shadow-xs">
              <h3 className="font-bold text-zinc-900 dark:text-white">¿Cómo funciona el servicio de cocineros a domicilio?</h3>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Generas tu menú semanal en TouChef y eliges si cocinarlo tú o contratar a un cocinero verificado. El chef acude a tu domicilio, prepara todos tus tuppers y deja tu cocina limpia.
              </p>
            </div>

            <div className="bg-white dark:bg-zinc-900 p-4 rounded-2xl space-y-1 border border-zinc-200 dark:border-zinc-800 shadow-xs">
              <h3 className="font-bold text-zinc-900 dark:text-white">¿Cómo se gestiona la compra de ingredientes?</h3>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Ofrecemos 3 opciones: tener los ingredientes ya en casa, sincronizar la cesta automática con Supermercados DIA o solicitar que el chef compre los frescos antes de cocinar.
              </p>
            </div>

            <div className="bg-white dark:bg-zinc-900 p-4 rounded-2xl space-y-1 border border-zinc-200 dark:border-zinc-800 shadow-xs">
              <h3 className="font-bold text-zinc-900 dark:text-white">¿Qué comisiones aplica TouChef?</h3>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                TouChef aplica una comisión decreciente por fidelidad (15% $\rightarrow$ 8% $\rightarrow$ 5%) sobre la mano de obra del cocinero. Los ingredientes frescos tienen 0% de comisión.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* RICH LEGAL & BRAND FOOTER */}
      <footer className="py-14 bg-white dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-800 text-xs text-zinc-600 dark:text-zinc-400">
        <div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 space-y-10">
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            
            {/* Col 1: Brand info */}
            <div className="space-y-3 md:col-span-1">
              <TouChefLogo size="md" showWordmark={true} />
              <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                Plataforma tecnológica de cocina inteligente, planificación batch cooking y marketplace de cocineros a domicilio verificados.
              </p>
              <div className="text-[11px] text-zinc-400">
                Sede Central: Madrid, España · Cobertura Nacional
              </div>
            </div>

            {/* Col 2: Plataforma */}
            <div className="space-y-2.5">
              <strong className="text-xs uppercase tracking-wider text-zinc-900 dark:text-white font-bold block">
                Plataforma
              </strong>
              <ul className="space-y-1.5 text-xs">
                <li><button onClick={() => handleLaunchPlan('cook')} className="hover:text-[#E07A5F] cursor-pointer">Generador Batch IA</button></li>
                <li><button onClick={() => handleLaunchPlan('chef')} className="hover:text-amber-500 cursor-pointer">Directorio de Cocineros</button></li>
                <li><button onClick={() => handleLaunchPlan('supermarket')} className="hover:text-rose-500 cursor-pointer">Supermercados DIA</button></li>
                <li><button onClick={() => onOpenAuth('register')} className="hover:text-[#E07A5F] cursor-pointer">Alta de Cocinero Pro</button></li>
              </ul>
            </div>

            {/* Col 3: Legal y Privacidad */}
            <div className="space-y-2.5">
              <strong className="text-xs uppercase tracking-wider text-zinc-900 dark:text-white font-bold block">
                Legal & Privacidad (RGPD)
              </strong>
              <ul className="space-y-1.5 text-xs">
                <li>
                  <button 
                    onClick={() => onOpenLegal && onOpenLegal('terms')} 
                    className="hover:text-amber-500 underline cursor-pointer text-left"
                  >
                    Términos y Condiciones de Uso
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => onOpenLegal && onOpenLegal('privacy')} 
                    className="hover:text-amber-500 underline cursor-pointer text-left"
                  >
                    Política de Privacidad
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => onOpenLegal && onOpenLegal('cookies')} 
                    className="hover:text-amber-500 underline cursor-pointer text-left"
                  >
                    Política de Cookies
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => {
                      localStorage.removeItem('touchef_cookie_consent');
                      window.location.reload();
                    }} 
                    className="text-zinc-500 hover:text-zinc-900 dark:hover:text-white text-[11px] cursor-pointer"
                  >
                    Reconfigurar Cookies
                  </button>
                </li>
              </ul>
            </div>

            {/* Col 4: Confianza y Certificación */}
            <div className="space-y-2.5">
              <strong className="text-xs uppercase tracking-wider text-zinc-900 dark:text-white font-bold block">
                Garantías y Seguridad
              </strong>
              <div className="space-y-2 text-[11px] text-zinc-500 dark:text-zinc-400">
                <div className="flex items-center gap-2">
                  <ShieldCheck size={16} className="text-emerald-500 shrink-0" />
                  <span>Certificados Sanitarios Verificados</span>
                </div>
                <div className="flex items-center gap-2">
                  <Lock size={16} className="text-amber-500 shrink-0" />
                  <span>Custodia de Fondos hasta Entrega</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck size={16} className="text-rose-500 shrink-0" />
                  <span>Logística Sincronizada Grupo DIA</span>
                </div>
              </div>
            </div>

          </div>

          <div className="pt-8 border-t border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-zinc-400">
            <span>© 2026 TouChef Technologies S.L. · Todos los derechos reservados.</span>
            <span>Diseñado con pasión para optimizar el tiempo de las familias.</span>
          </div>

        </div>
      </footer>

    </div>
  );
}
