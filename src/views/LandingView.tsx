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
  Eye,
  Compass,
  Mic,
  BookOpen,
  Smartphone,
  Zap,
  Award,
  Download
} from 'lucide-react';
import { ViewState, MealPlanConfig } from '../types';
import { useTheme } from '../lib/theme';
import { TouChefLogo } from '../components/TouChefLogo';
import { calculateBatchStructure, generateDynamicBatchDishes } from '../lib/batchEngine';
import { User as FirebaseUser } from '../lib/firebase';

interface LandingViewProps {
  onOpenAuth: (mode?: 'login' | 'register', pendingContext?: MealPlanConfig) => void;
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
    if (!currentUser) {
      onOpenAuth('register', ctx);
      return;
    }
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
          <nav className="hidden md:flex items-center gap-5 lg:gap-6 text-xs font-semibold text-zinc-600 dark:text-zinc-400">
            <a href="#que-hacer" className="hover:text-[#E07A5F] dark:hover:text-[#F4A261] transition-colors">
              ¿Qué quieres hacer?
            </a>
            <a href="#ventajas" className="hover:text-[#E07A5F] dark:hover:text-[#F4A261] transition-colors flex items-center gap-1">
              <Zap size={13} className="text-amber-500" /> Ventajas &amp; Capturas
            </a>
            <a href="#modos" className="hover:text-[#E07A5F] dark:hover:text-[#F4A261] transition-colors">
              3 Formas de Uso
            </a>
            <a href="#planificador" className="hover:text-[#E07A5F] dark:hover:text-[#F4A261] transition-colors flex items-center gap-1">
              <Sparkles size={13} className="text-[#E07A5F]" /> Planificador
            </a>
            <a href="#descargar-apk" className="hover:text-emerald-500 transition-colors flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-bold">
              <Smartphone size={13} /> App Android (APK)
            </a>
            <a href="#faq" className="hover:text-[#E07A5F] dark:hover:text-[#F4A261] transition-colors">
              FAQ
            </a>
          </nav>

          {/* Right Action buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            
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
              onClick={() => onOpenAuth('login', getPlanConfig())}
              className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-zinc-200 dark:bg-zinc-800 hover:bg-zinc-300 dark:hover:bg-zinc-700 text-zinc-900 dark:text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Lock size={15} className="text-[#E07A5F]" />
              <span>Ya tengo cuenta · Iniciar Sesión</span>
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

      {/* SECCIÓN VENTAJAS, CAPTURAS & COPYWRITING EXCLUSIVO */}
      <section id="ventajas" className="py-20 px-4 sm:px-8 bg-linear-to-b from-transparent via-amber-500/5 to-transparent border-b border-zinc-200 dark:border-zinc-800">
        <div className="max-w-6xl mx-auto space-y-16">
          
          {/* Header */}
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E07A5F]/15 border border-[#E07A5F]/30 text-[#E07A5F] text-xs font-black uppercase tracking-wider">
              <Zap size={14} />
              <span>Tecnología Culinaria de Vanguardia</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-zinc-900 dark:text-white tracking-tight">
              Diseñado para Ahorrarte 6 Horas a la Semana y Comer Mejor que Nunca
            </h2>
            <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Mira por dentro cómo TouChef combina inteligencia artificial, recetas canónicas tradicionales y coordinación termodinámica para que cocinar sea rápido, placentero y sin estrés.
            </p>
          </div>

          {/* Metric Highlights Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white dark:bg-zinc-900 p-5 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-xs text-center space-y-1">
              <span className="text-2xl sm:text-3xl font-mono font-black text-[#E07A5F]">247</span>
              <strong className="text-xs text-zinc-900 dark:text-white block">Recetas Canónicas Técnicas</strong>
              <p className="text-[11px] text-zinc-500">Con gramajes exactos y fotos en 3 pasos</p>
            </div>
            <div className="bg-white dark:bg-zinc-900 p-5 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-xs text-center space-y-1">
              <span className="text-2xl sm:text-3xl font-mono font-black text-emerald-500">&lt;120m</span>
              <strong className="text-xs text-zinc-900 dark:text-white block">Batch Cooking Completo</strong>
              <p className="text-[11px] text-zinc-500">14 raciones semanales listas al unísono</p>
            </div>
            <div className="bg-white dark:bg-zinc-900 p-5 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-xs text-center space-y-1">
              <span className="text-2xl sm:text-3xl font-mono font-black text-amber-500">-35%</span>
              <strong className="text-xs text-zinc-900 dark:text-white block">Ahorro en Supermercado DIA</strong>
              <p className="text-[11px] text-zinc-500">Cero ingredientes sobrantes en despensa</p>
            </div>
            <div className="bg-white dark:bg-zinc-900 p-5 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-xs text-center space-y-1">
              <span className="text-2xl sm:text-3xl font-mono font-black text-rose-500">100%</span>
              <strong className="text-xs text-zinc-900 dark:text-white block">Seguridad &amp; Alérgenos</strong>
              <p className="text-[11px] text-zinc-500">Normativa europea UE 1169 y Cook &amp; Chill</p>
            </div>
          </div>

          {/* Feature 1: Asistente en Directo por Voz */}
          <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 p-6 sm:p-10 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 space-y-5">
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 font-bold text-xs">
                  🎙️ Control por Voz Manos Libres
                </span>
                <span className="px-3 py-1 rounded-full bg-[#E07A5F]/10 text-[#E07A5F] font-bold text-xs">
                  🔥 4 Fuegos + Horno en Paralelo
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-display font-black text-zinc-900 dark:text-white">
                1. Asistente de Cocina en Directo: Tu Copiloto Culinario en Tiempo Real
              </h3>
              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Olvídate de manchar la pantalla del móvil o tablet con aceite mientras cocinas. Nuestro Asistente de Cocina escucha tus órdenes por voz, sincroniza hasta 5 temporizadores térmicos y te canta en qué momento exacto añadir cada ingrediente o bajar el fuego.
              </p>
              <div className="space-y-2.5 text-xs text-zinc-700 dark:text-zinc-300">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                  <span><strong>Comandos por voz instantáneos:</strong> «Siguiente paso», «¿A qué fuego va la salsa?», «Añade 3 minutos al fuego 2».</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                  <span><strong>Cronometraje dinámico por fuego:</strong> Nunca más se te pasará un arroz o se quemará un sofrito mientras atiendes otra cazuela.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                  <span><strong>Pautas de abatimiento Cook &amp; Chill:</strong> Tiempos exactos para enfriar y cerrar tus táperes garantizando máxima jugosidad y seguridad.</span>
                </div>
              </div>
              <button
                onClick={() => handleLaunchPlan('cook')}
                className="btn-hero-copper text-white font-bold text-xs px-5 py-3 rounded-xl shadow-xs transition-all inline-flex items-center gap-2 cursor-pointer"
              >
                <Flame size={15} />
                <span>Probar Asistente de Cocinado</span>
              </button>
            </div>

            <div className="lg:col-span-6">
              <div className="relative rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-700 shadow-2xl group">
                <img 
                  src="/assets/showcase/asistente_en_directo_preview.jpg" 
                  alt="Asistente de Cocina en Directo TouChef con ondas de voz y temporizadores" 
                  className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute bottom-3 left-3 right-3 bg-zinc-950/80 backdrop-blur-md text-white px-4 py-2.5 rounded-xl text-xs flex items-center justify-between border border-white/10">
                  <span className="font-bold flex items-center gap-1.5">
                    <Mic size={14} className="text-cyan-400 animate-pulse" /> Modo Escucha Activa
                  </span>
                  <span className="font-mono text-amber-400 font-bold">4 fuegos activos</span>
                </div>
              </div>
            </div>
          </div>

          {/* Feature 2: 247 Recetas Canónicas & 3 Pasos */}
          <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 p-6 sm:p-10 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 lg:order-2 space-y-5">
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold text-xs">
                  🥘 174 Recetas Tradicionales
                </span>
                <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold text-xs">
                  👨‍🍳 73 Recetas Karlos Arguiñano
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-display font-black text-zinc-900 dark:text-white">
                2. Catálogo Canónico Técnico: Fotos en 3 Pasos &amp; Gramajes Exactos
              </h3>
              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Sin ambigüedades ni medidas al ojo. Cada una de nuestras 247 recetas incluye mise en place en gramos y mililitros, fotos secuenciales (1. Ingredientes, 2. Elaboración en cazuela, 3. Resultado final en táper), cálculo nutricional del Plato de Harvard y 69 infografías de elaboración.
              </p>
              <div className="space-y-2.5 text-xs text-zinc-700 dark:text-zinc-300">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                  <span><strong>Sistema Fotográfico 3 Pasos:</strong> Conoce visualmente el corte de verdura, el punto de pochado y la textura de la salsa antes de empezar.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                  <span><strong>Nutrición Inteligente:</strong> Desglose automático de macronutrientes, calorías por ración y balance vegetal vs. proteico.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                  <span><strong>Consejos de Conservación:</strong> Indicaciones específicas de cuántos días aguanta cada plato en nevera o si admite congelación.</span>
                </div>
              </div>
              <button
                onClick={() => currentUser ? onNavigate({ name: 'ai-generator' }) : onOpenAuth('register', getPlanConfig())}
                className="px-5 py-3 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-900 dark:text-white font-bold text-xs transition-all inline-flex items-center gap-2 cursor-pointer shadow-xs"
              >
                <BookOpen size={15} className="text-amber-500" />
                <span>Explorar Catálogo de 247 Recetas</span>
              </button>
            </div>

            <div className="lg:col-span-6 lg:order-1">
              <div className="relative rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-700 shadow-2xl group">
                <img 
                  src="/assets/showcase/batch_recetas_canonicas_preview.jpg" 
                  alt="Catálogo de Recetas Canónicas y Planificador Batch Cooking TouChef" 
                  className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute bottom-3 left-3 right-3 bg-zinc-950/80 backdrop-blur-md text-white px-4 py-2.5 rounded-xl text-xs flex items-center justify-between border border-white/10">
                  <span className="font-bold flex items-center gap-1.5">
                    <Sparkles size={14} className="text-[#E07A5F]" /> 247 Recetas Técnicas
                  </span>
                  <span className="font-bold text-emerald-400">Fotos Paso a Paso</span>
                </div>
              </div>
            </div>
          </div>

          {/* Feature 3: Marketplace de Chefs & DIA Supermercados */}
          <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 p-6 sm:p-10 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 space-y-5">
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400 font-bold text-xs">
                  🛒 Integración DIA Supermercados
                </span>
                <span className="px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold text-xs">
                  👨‍🍳 Chefs Verificados a Domicilio
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-display font-black text-zinc-900 dark:text-white">
                3. Máxima Flexibilidad: Compra en DIA o Deja que un Chef Cocine por Ti
              </h3>
              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Tú decides cada semana: si tienes tiempo, generas tu lista agrupada por pasillos y sincronizas la cesta en Supermercados DIA para recogerla o recibirla en casa. Si tu semana es una locura, contratas a un cocinero verificado con carné sanitario que cocina en tu casa y te deja todo envasado.
              </p>
              <div className="space-y-2.5 text-xs text-zinc-700 dark:text-zinc-300">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                  <span><strong>Ahorro Real de hasta un 35%:</strong> La optimización cruzada de ingredientes evita que compres de más o tires comida caducada.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                  <span><strong>Cocineros Profesionales de Confianza:</strong> Perfiles verificados, valoraciones reales de clientes y cobertura de seguro.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                  <span><strong>App Android y Web Sincronizada:</strong> Acceso en vivo en touchef.web.app o desde la APK oficial instalada en tu smartphone.</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  onClick={() => handleLaunchPlan('chef')}
                  className="bg-amber-500 hover:bg-amber-400 text-stone-950 font-black text-xs px-5 py-3 rounded-xl shadow-xs transition-all inline-flex items-center gap-2 cursor-pointer"
                >
                  <ChefHat size={15} />
                  <span>Ver Cocineros Disponibles</span>
                </button>
                <button
                  onClick={() => handleLaunchPlan('supermarket')}
                  className="bg-rose-500/10 hover:bg-rose-500 hover:text-white text-rose-600 dark:text-rose-400 font-bold text-xs px-5 py-3 rounded-xl transition-all inline-flex items-center gap-2 cursor-pointer"
                >
                  <Truck size={15} />
                  <span>Cesta Inteligente DIA</span>
                </button>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-700 shadow-2xl group">
                <img 
                  src="/assets/showcase/marketplace_chefs_dia_preview.jpg" 
                  alt="Marketplace de Chefs a Domicilio y Sincronización DIA Supermercados" 
                  className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute bottom-3 left-3 right-3 bg-zinc-950/80 backdrop-blur-md text-white px-4 py-2.5 rounded-xl text-xs flex items-center justify-between border border-white/10">
                  <span className="font-bold flex items-center gap-1.5">
                    <ShieldCheck size={14} className="text-emerald-400" /> Chefs Sanitariamente Certificados
                  </span>
                  <span className="font-bold text-rose-400">Sincronizado con DIA</span>
                </div>
              </div>
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

      {/* SECCIÓN OFICIAL DESCARGA APK ANDROID */}
      <section id="descargar-apk" className="py-16 px-4 sm:px-8 bg-gradient-to-b from-zinc-100/80 to-white dark:from-zinc-900/60 dark:to-zinc-950 border-t border-zinc-200 dark:border-zinc-800">
        <div className="max-w-5xl mx-auto space-y-8">
          
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-bold">
              <Smartphone size={14} />
              <span>APP NATIVA DISPONIBLE · ANDROID 8.0 A 15+</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-display font-black text-zinc-900 dark:text-white">
              TouChef en tu Smartphone Android
            </h2>
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed">
              Descarga e instala directamente la aplicación oficial (APK v1.0.0). Cocina con el modo fuegos interactivo, sincroniza tus pedidos con DIA y gestiona tus reservas de cocineros desde la palma de tu mano.
            </p>
          </div>

          <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 p-6 sm:p-10 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-5">
              <div className="flex items-center gap-3.5">
                {/* SVG Android Logo */}
                <div className="w-13 h-13 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0">
                  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.523 15.3414c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.551 0 .9993.4482.9993.9993.0001.5511-.4483.9997-.9993.9997m-11.046 0c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.5511 0 .9993.4482.9993.9993 0 .5511-.4482.9997-.9993.9997m11.4045-6.02l1.9973-3.4592a.416.416 0 00-.1521-.5676.416.416 0 00-.5676.1521l-2.0223 3.503C15.5833 8.3554 13.8436 8 12 8s-3.5833.3554-5.1368.9507L4.8409 5.4477a.416.416 0 00-.5676-.1521.416.416 0 00-.1521.5676l1.9973 3.4592C2.6889 10.9867 0 14.7397 0 19.12h24c0-4.3803-2.6889-8.1333-6.1185-9.7986"/>
                  </svg>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <strong className="text-lg sm:text-xl font-display font-black text-zinc-900 dark:text-white">
                      TouChef App Android
                    </strong>
                    <span className="px-2 py-0.5 rounded-md bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 font-black text-[10px] uppercase">
                      v1.0.0 Oficial
                    </span>
                  </div>
                  <span className="text-xs text-zinc-500 dark:text-zinc-400 block">
                    Paquete: app.touchef.app · Build 100 · 132 MB
                  </span>
                </div>
              </div>

              <div className="space-y-2.5 text-xs text-zinc-700 dark:text-zinc-300">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                  <span><strong>Modo Cocina en Vivo:</strong> Temporizadores secuenciales paso a paso que mantienen la pantalla encendida mientras cocinas.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                  <span><strong>Sincronización Total en la Nube:</strong> Mismo lote de cocina, despensa y reservas compartidas entre web y app móvil.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                  <span><strong>Instalación Segura:</strong> Binario certificado y firmado, libre de anuncios y con verificación de integridad SHA-256.</span>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap gap-3 items-center">
                <a
                  href="/download/touchef_v1.0.0.apk"
                  download="touchef_v1.0.0.apk"
                  className="btn-hero-copper text-white font-black text-xs sm:text-sm px-6 py-3.5 rounded-2xl shadow-xl transition-all inline-flex items-center gap-2.5 hover:scale-[1.02] active:scale-95 cursor-pointer"
                >
                  <Download size={18} />
                  <span>Descargar APK Oficial (132 MB)</span>
                </a>

                <a
                  href="/download/touchef_v1.0.0.zip"
                  download="touchef_v1.0.0.zip"
                  className="px-4 py-3.5 rounded-2xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-200 font-bold text-xs transition-all inline-flex items-center gap-2 cursor-pointer"
                  title="Descargar paquete ZIP con instalador"
                >
                  <span>Descargar ZIP</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-5 bg-zinc-50 dark:bg-zinc-950/70 rounded-2xl p-5 border border-zinc-200/80 dark:border-zinc-800 space-y-3.5">
              <strong className="text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-white flex items-center gap-2">
                <ShieldCheck size={16} className="text-emerald-500" />
                Guía Rápida de Instalación (3 Pasos)
              </strong>
              
              <ol className="space-y-3 text-xs text-zinc-600 dark:text-zinc-400">
                <li className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-black text-[11px] flex items-center justify-center shrink-0 mt-0.5">1</span>
                  <span>Pulsa en <strong>Descargar APK</strong> para guardar el instalador en tu smartphone Android.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-black text-[11px] flex items-center justify-center shrink-0 mt-0.5">2</span>
                  <span>Si el móvil muestra una alerta, selecciona <strong>"Permitir descargar / Instalar desde esta fuente"</strong>.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-black text-[11px] flex items-center justify-center shrink-0 mt-0.5">3</span>
                  <span>Abre el archivo descargado, pulsa <strong>Instalar</strong> e inicia sesión en TouChef.</span>
                </li>
              </ol>

              <div className="pt-2 border-t border-zinc-200 dark:border-zinc-800 text-[10px] text-zinc-500 dark:text-zinc-400 flex items-center justify-between">
                <span>SHA-256 Verificado</span>
                <span className="font-mono text-[9px] text-zinc-400">FA:D9:05:86:4C...</span>
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
                <li className="pt-1">
                  <a 
                    href="#descargar-apk" 
                    className="hover:text-emerald-500 font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5 cursor-pointer"
                  >
                    <Smartphone size={13} />
                    <span>Descargar APK Android (v1.0.0)</span>
                  </a>
                </li>
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
