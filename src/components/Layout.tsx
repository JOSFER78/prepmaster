import React, { useState, useEffect } from 'react';
import { 
  Home, 
  Sparkles, 
  Layers, 
  ShoppingBag, 
  ChefHat, 
  X, 
  Refrigerator, 
  BookOpen, 
  User, 
  ChevronRight, 
  Crown,
  Sun,
  Moon,
  LogOut,
  Clock,
  ArrowRight,
  Menu,
  LayoutDashboard,
  UtensilsCrossed,
  SlidersHorizontal,
  Flame,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';
import { ViewState, BatchProject } from '../types';
import { auth, onAuthStateChanged, isSuperAdmin, User as FirebaseUser, signOut } from '../lib/firebase';
import { useTheme } from '../lib/theme';
import { calculateProjectMetrics } from '../lib/batchProjects';

interface LayoutProps {
  children: React.ReactNode;
  currentView: ViewState;
  onNavigate: (view: ViewState) => void;
  hideNav?: boolean;
  activeProject?: BatchProject | null;
}

export function Layout({ children, currentView, onNavigate, hideNav = false, activeProject }: LayoutProps) {
  const { theme, toggleTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setFirebaseUser(user);
    });
    return () => unsub();
  }, []);

  // Close mobile drawer on view change or window resize
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [currentView]);

  const isSuperAdminUser = isSuperAdmin(firebaseUser);

  // Metrics from active project
  const metrics = activeProject ? calculateProjectMetrics(activeProject) : null;
  const pendingShopCount = activeProject?.shoppingList 
    ? activeProject.shoppingList.filter(i => !i.isBought).length 
    : 0;

  // Active view checkers
  const isHomeActive = currentView.name === 'home';
  const isGeneratorActive = currentView.name === 'ai-generator';
  const isShoppingActive = currentView.name === 'shopping-list';
  const isCookActive = currentView.name === 'interactive-cook' || currentView.name === 'batch-session';
  const isPantryActive = currentView.name === 'reference-rag';
  const isPlannerActive = currentView.name === 'planner';
  const isRecipesActive = currentView.name === 'explore' || currentView.name === 'recipe';
  const isProfileActive = currentView.name === 'profile';

  // Check if active view is one of the secondary resources/settings
  const isSecondaryActive = isPantryActive || isPlannerActive || isRecipesActive || isProfileActive;

  // Dynamic status pill helper
  const getBatchPillInfo = () => {
    if (!activeProject) {
      return {
        label: 'Sin Lote Activo',
        subtext: 'Planificar',
        colorClass: 'bg-zinc-800/80 text-zinc-400 border-zinc-700/60',
        targetView: { name: 'ai-generator' as const }
      };
    }

    switch (activeProject.status) {
      case 'planning':
        return {
          label: 'Planificando',
          subtext: `${activeProject.dishes?.length || 0} platos`,
          colorClass: 'bg-amber-950/60 text-amber-400 border-amber-500/30',
          targetView: { name: 'ai-generator' as const }
        };
      case 'shopping':
        return {
          label: 'Compra',
          subtext: `${pendingShopCount} pendientes`,
          colorClass: 'bg-blue-950/60 text-blue-400 border-blue-500/30',
          targetView: { name: 'shopping-list' as const }
        };
      case 'ready_to_cook':
        return {
          label: 'Listo para Cocinar',
          subtext: 'Encender fuegos',
          colorClass: 'bg-emerald-950/60 text-emerald-400 border-emerald-500/40 animate-pulse',
          targetView: { name: 'interactive-cook' as const }
        };
      case 'cooking':
        return {
          label: 'En Cocina',
          subtext: 'Fuegos activos',
          colorClass: 'bg-amber-950/60 text-amber-400 border-amber-500/40 animate-pulse',
          targetView: { name: 'interactive-cook' as const }
        };
      case 'in_fridge':
        return {
          label: 'En Nevera',
          subtext: `${metrics?.remainingServings ?? 0} raciones`,
          colorClass: 'bg-emerald-950/60 text-emerald-400 border-emerald-500/30',
          targetView: { name: 'home' as const }
        };
      case 'archived':
      default:
        return {
          label: 'Lote Archivado',
          subtext: 'Crear nuevo',
          colorClass: 'bg-zinc-800 text-zinc-400 border-zinc-700',
          targetView: { name: 'ai-generator' as const }
        };
    }
  };

  const pillInfo = getBatchPillInfo();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setIsMobileMenuOpen(false);
      onNavigate({ name: 'landing' });
    } catch (e) {
      console.error('Error logging out', e);
    }
  };

  // Breadcrumb title helper
  const getBreadcrumbTitle = () => {
    switch (currentView.name) {
      case 'home': return 'Dashboard & Seguimiento de Lote';
      case 'ai-generator': return 'Generador IA de Raciones';
      case 'shopping-list': return 'Lista de Compra Descontada';
      case 'interactive-cook': return 'Cocina Simultánea en Paralelo';
      case 'planner': return 'Planificador de Volumen y Raciones';
      case 'reference-rag': return 'Despensa & Stock de Nevera';
      case 'explore':
      case 'recipe': return 'Recetario de Autor';
      case 'profile': return 'Mi Hogar & Ajustes';
      default: return 'Panel Principal';
    }
  };

  return (
    <div className="bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 flex flex-col min-h-screen font-sans transition-colors duration-200">
      
      {/* GLOBAL HEADER */}
      {!hideNav && (
        <header className="bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md shadow-xs w-full top-0 left-0 sticky z-40 border-b border-zinc-200 dark:border-zinc-800">
          <div className="flex justify-between items-center px-3 sm:px-4 py-2.5 max-w-7xl mx-auto gap-2">
            
            {/* BRAND LOGO & MOBILE HAMBURGER */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Mobile Hamburger Toggle */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-1.5 rounded-xl md:hidden text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 active:scale-95 transition-all"
                aria-label="Abrir Menú de Navegación"
              >
                <Menu size={22} />
              </button>

              <div 
                className="flex items-center gap-2 cursor-pointer select-none group" 
                onClick={() => onNavigate({ name: 'home' })}
              >
                <div className="w-8 h-8 rounded-xl bg-emerald-600 dark:bg-emerald-500 text-white flex items-center justify-center font-black shadow-xs shrink-0 group-hover:scale-105 transition-transform">
                  <ChefHat size={18} />
                </div>
                <div className="hidden sm:block">
                  <div className="flex items-center gap-1.5">
                    <h1 className="text-sm font-black text-zinc-900 dark:text-white leading-none">
                      PrepMaster
                    </h1>
                    {isSuperAdminUser && (
                      <span className="text-[9px] bg-amber-500 text-white font-black px-1.5 py-0.2 rounded-full flex items-center gap-0.5 shadow-2xs">
                        <Crown size={10} /> SUPERADMIN
                      </span>
                    )}
                  </div>
                  <p className="text-[10px] text-zinc-500 dark:text-zinc-400 font-medium truncate max-w-[120px] sm:max-w-[180px]">
                    {firebaseUser ? (firebaseUser.displayName || firebaseUser.email) : 'Batch Cooking Pro'}
                  </p>
                </div>
              </div>
            </div>

            {/* DYNAMIC ACTIVE BATCH STATUS PILL (CENTER) */}
            <button 
              onClick={() => onNavigate(pillInfo.targetView)}
              className={`flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 rounded-full border text-xs font-bold transition-all hover:scale-102 active:scale-98 shrink min-w-0 ${pillInfo.colorClass}`}
              title="Ir a la fase activa del lote"
            >
              <span className="w-2 h-2 rounded-full bg-current shrink-0"></span>
              <span className="truncate max-w-[90px] sm:max-w-[150px]">{pillInfo.label}:</span>
              <span className="font-mono text-[11px] opacity-90 hidden xs:inline truncate">{pillInfo.subtext}</span>
            </button>

            {/* HEADER RIGHT ACTIONS */}
            <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
              {/* THEME TOGGLE */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-all active:scale-95"
                title={theme === 'dark' ? 'Cambiar a Modo Claro' : 'Cambiar a Modo Oscuro'}
              >
                {theme === 'dark' ? <Sun size={16} className="text-amber-400" /> : <Moon size={16} className="text-zinc-700" />}
              </button>

              {/* PROFILE / SETTINGS TRIGGER */}
              <button
                onClick={() => onNavigate({ name: 'profile' })}
                className={`p-1.5 sm:px-3 sm:py-1.5 rounded-xl border transition-all active:scale-95 flex items-center gap-2 ${
                  isProfileActive 
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs' 
                    : 'bg-zinc-100 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 hover:border-emerald-500/50'
                }`}
                title="Ajustes y Perfil del Hogar"
              >
                <div className={`w-6 h-6 rounded-lg flex items-center justify-center font-bold text-xs ${
                  isProfileActive ? 'bg-white/20 text-white' : 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400'
                }`}>
                  <User size={14} />
                </div>
                <span className="hidden md:inline text-xs font-bold">Mi Hogar</span>
              </button>
            </div>

          </div>
        </header>
      )}

      {/* MAIN CONTAINER WITH DESKTOP SIDEBAR */}
      <div className="flex-grow w-full max-w-7xl mx-auto flex">
        
        {/* DESKTOP SIDEBAR */}
        {!hideNav && (
          <aside className="hidden md:flex flex-col justify-between w-60 p-4 border-r border-zinc-200 dark:border-zinc-800 shrink-0 sticky top-14 h-[calc(100vh-3.5rem)] overflow-y-auto">
            
            <div className="space-y-6">
              {/* SECTION 1: LOTE DE COCINA (CORE BATCH LOOP) */}
              <div className="space-y-1">
                <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 px-2 mb-1.5 flex items-center justify-between">
                  <span>Lote de Cocina</span>
                  {activeProject && (
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  )}
                </div>
                <SidebarItem 
                  icon={<LayoutDashboard size={16} />} 
                  label="Dashboard Hoy" 
                  isActive={isHomeActive} 
                  onClick={() => onNavigate({ name: 'home' })} 
                />
                <SidebarItem 
                  icon={<Sparkles size={16} />} 
                  label="Generador IA" 
                  isActive={isGeneratorActive} 
                  onClick={() => onNavigate({ name: 'ai-generator' })} 
                />
                <SidebarItem 
                  icon={<ShoppingBag size={16} />} 
                  label="Lista de Compra" 
                  badge={pendingShopCount > 0 ? `${pendingShopCount}` : undefined}
                  isActive={isShoppingActive} 
                  onClick={() => onNavigate({ name: 'shopping-list' })} 
                />
                <SidebarItem 
                  icon={<ChefHat size={16} />} 
                  label="Cocina Simultánea" 
                  isActive={isCookActive} 
                  badge={activeProject?.status === 'ready_to_cook' ? 'Listo' : (activeProject?.status === 'cooking' ? 'Fuego' : undefined)}
                  onClick={() => onNavigate({ name: 'interactive-cook' })} 
                />
              </div>

              {/* SECTION 2: RECURSOS & DESPENSA */}
              <div className="space-y-1">
                <div className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 px-2 mb-1.5">
                  Recursos & Despensa
                </div>
                <SidebarItem 
                  icon={<Refrigerator size={16} />} 
                  label="Despensa & Nevera" 
                  isActive={isPantryActive} 
                  onClick={() => onNavigate({ name: 'reference-rag' })} 
                />
                <SidebarItem 
                  icon={<Layers size={16} />} 
                  label="Plan de Raciones" 
                  isActive={isPlannerActive} 
                  onClick={() => onNavigate({ name: 'planner' })} 
                />
                <SidebarItem 
                  icon={<BookOpen size={16} />} 
                  label="Recetas de Autor" 
                  isActive={isRecipesActive} 
                  onClick={() => onNavigate({ name: 'explore' })} 
                />
              </div>
            </div>

            {/* SECTION 3: FOOTER SETTINGS */}
            <div className="border-t border-zinc-200 dark:border-zinc-800 pt-3 space-y-1">
              <SidebarItem 
                icon={<User size={16} />} 
                label="Mi Hogar & Ajustes" 
                isActive={isProfileActive} 
                onClick={() => onNavigate({ name: 'profile' })} 
              />
              <button
                onClick={() => onNavigate({ name: 'landing' })}
                className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800/60 transition-all text-left group"
              >
                <div className="flex items-center gap-2.5">
                  <ExternalLink size={15} className="group-hover:text-emerald-500 transition-colors" />
                  <span>Ver Portada / Landing</span>
                </div>
                <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>

          </aside>
        )}

        {/* MAIN VIEWPORT */}
        <main className={`flex-grow w-full ${hideNav ? '' : 'p-3 sm:p-4 md:p-6 pb-24 md:pb-6 overflow-x-hidden'}`}>
          {!hideNav && (
            <div className="hidden md:flex items-center justify-between mb-4 pb-2 border-b border-zinc-200 dark:border-zinc-800/80">
              <div className="flex items-center gap-2 text-xs font-bold text-zinc-400">
                <span>PrepMaster</span>
                <span>/</span>
                <span className="text-zinc-900 dark:text-white">{getBreadcrumbTitle()}</span>
              </div>
              {activeProject && (
                <div className="text-xs text-zinc-500 dark:text-zinc-400 flex items-center gap-2">
                  <Clock size={13} className="text-emerald-500" />
                  <span>{activeProject.title} ({activeProject.peopleCount} personas · {activeProject.daysCount} días)</span>
                </div>
              )}
            </div>
          )}
          {children}
        </main>
      </div>

      {/* MOBILE BOTTOM NAVIGATION BAR (5 ERGONOMIC TABS) */}
      {!hideNav && (
        <nav className="bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md shadow-lg fixed bottom-0 left-0 right-0 z-40 grid grid-cols-5 items-center px-1 py-1.5 md:hidden border-t border-zinc-200 dark:border-zinc-800 pb-safe">
          <NavItem 
            icon={<LayoutDashboard />} 
            label="Dashboard" 
            isActive={isHomeActive} 
            onClick={() => onNavigate({ name: 'home' })} 
          />
          <NavItem 
            icon={<Sparkles />} 
            label="Generador" 
            isActive={isGeneratorActive} 
            onClick={() => onNavigate({ name: 'ai-generator' })} 
          />
          <NavItem 
            icon={<ShoppingBag />} 
            label="Compra" 
            badge={pendingShopCount > 0 ? `${pendingShopCount}` : undefined}
            isActive={isShoppingActive} 
            onClick={() => onNavigate({ name: 'shopping-list' })} 
          />
          <NavItem 
            icon={<ChefHat />} 
            label="Cocina" 
            badge={activeProject?.status === 'ready_to_cook' ? '!' : (activeProject?.status === 'cooking' ? '🔥' : undefined)}
            isActive={isCookActive} 
            onClick={() => onNavigate({ name: 'interactive-cook' })} 
          />
          <NavItem 
            icon={<Menu />} 
            label="Menú" 
            hasIndicator={isSecondaryActive}
            isActive={isMobileMenuOpen || isSecondaryActive} 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
          />
        </nav>
      )}

      {/* MOBILE FULL NAVIGATION DRAWER (SYNCHRONIZED WITH DESKTOP SIDEBAR) */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex justify-start md:hidden bg-black/60 backdrop-blur-xs animate-fade-in">
          <div 
            className="w-full max-w-xs bg-white dark:bg-zinc-900 border-r border-zinc-200 dark:border-zinc-800 p-5 flex flex-col justify-between shadow-2xl h-full overflow-y-auto animate-slide-right"
          >
            <div className="space-y-5">
              
              {/* DRAWER HEADER */}
              <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-3.5">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold">
                    <ChefHat size={18} />
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-zinc-900 dark:text-white leading-tight">
                      PrepMaster Menú
                    </h3>
                    <p className="text-[11px] text-zinc-500 dark:text-zinc-400 truncate max-w-[160px]">
                      {firebaseUser?.displayName || firebaseUser?.email || 'Modo Local / Invitado'}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-1.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
                  aria-label="Cerrar Menú"
                >
                  <X size={18} />
                </button>
              </div>

              {/* ACTIVE PROJECT QUICK CARD */}
              {activeProject && (
                <div 
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onNavigate(pillInfo.targetView);
                  }}
                  className="p-3 bg-zinc-50 dark:bg-zinc-800/60 rounded-2xl border border-zinc-200 dark:border-zinc-700/60 space-y-1.5 cursor-pointer hover:border-emerald-500/40 transition-all"
                >
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-bold text-zinc-500 dark:text-zinc-400">Lote en Curso</span>
                    <span className={`px-2 py-0.5 rounded-full font-bold uppercase text-[9px] border ${pillInfo.colorClass}`}>
                      {activeProject.status}
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-zinc-900 dark:text-white truncate">
                    {activeProject.title}
                  </h4>
                  <div className="flex items-center gap-2 text-[10px] text-zinc-500 dark:text-zinc-400">
                    <span>{activeProject.peopleCount} comensales</span>
                    <span>•</span>
                    <span>{activeProject.daysCount} días</span>
                    <span>•</span>
                    <span>{activeProject.dishes?.length || 0} platos</span>
                  </div>
                </div>
              )}

              {/* CATEGORY 1: LOTE DE COCINA */}
              <div className="space-y-1">
                <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 px-2 mb-1">
                  Lote de Cocina
                </div>
                <DrawerLinkItem 
                  icon={<LayoutDashboard size={18} />} 
                  title="Dashboard Hoy" 
                  subtitle="Estado del lote y raciones disponibles"
                  isActive={isHomeActive} 
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onNavigate({ name: 'home' });
                  }} 
                />
                <DrawerLinkItem 
                  icon={<Sparkles size={18} />} 
                  title="Generador IA" 
                  subtitle="Crear nuevo menú semanal con IA"
                  isActive={isGeneratorActive} 
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onNavigate({ name: 'ai-generator' });
                  }} 
                />
                <DrawerLinkItem 
                  icon={<ShoppingBag size={18} />} 
                  title="Lista de Compra" 
                  subtitle="Ingredientes descontados de despensa"
                  badge={pendingShopCount > 0 ? `${pendingShopCount}` : undefined}
                  isActive={isShoppingActive} 
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onNavigate({ name: 'shopping-list' });
                  }} 
                />
                <DrawerLinkItem 
                  icon={<ChefHat size={18} />} 
                  title="Cocina Simultánea" 
                  subtitle="Paso a paso en paralelo con fuegos"
                  badge={activeProject?.status === 'ready_to_cook' ? 'Listo' : (activeProject?.status === 'cooking' ? 'Fuego' : undefined)}
                  isActive={isCookActive} 
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onNavigate({ name: 'interactive-cook' });
                  }} 
                />
              </div>

              {/* CATEGORY 2: RECURSOS & DESPENSA */}
              <div className="space-y-1">
                <div className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 px-2 mb-1">
                  Recursos & Despensa
                </div>
                <DrawerLinkItem 
                  icon={<Refrigerator size={18} />} 
                  title="Despensa & Nevera" 
                  subtitle="Stock de ingredientes y caducidades"
                  isActive={isPantryActive} 
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onNavigate({ name: 'reference-rag' });
                  }} 
                />
                <DrawerLinkItem 
                  icon={<Layers size={18} />} 
                  title="Plan de Raciones" 
                  subtitle="Distribución semanal de porciones"
                  isActive={isPlannerActive} 
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onNavigate({ name: 'planner' });
                  }} 
                />
                <DrawerLinkItem 
                  icon={<BookOpen size={18} />} 
                  title="Recetas de Autor" 
                  subtitle="Biblioteca de técnicas y platos"
                  isActive={isRecipesActive} 
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onNavigate({ name: 'explore' });
                  }} 
                />
              </div>

              {/* CATEGORY 3: SISTEMA */}
              <div className="space-y-1">
                <div className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 px-2 mb-1">
                  Ajustes & Cuenta
                </div>
                <DrawerLinkItem 
                  icon={<User size={18} />} 
                  title="Mi Hogar & Ajustes" 
                  subtitle="Comensales, dietas y perfil"
                  isActive={isProfileActive} 
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onNavigate({ name: 'profile' });
                  }} 
                />
                <DrawerLinkItem 
                  icon={<ExternalLink size={18} />} 
                  title="Ver Portada / Landing" 
                  subtitle="Calculadora y método público"
                  isActive={false} 
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onNavigate({ name: 'landing' });
                  }} 
                />
              </div>

            </div>

            {/* DRAWER FOOTER */}
            <div className="border-t border-zinc-200 dark:border-zinc-800 pt-3.5 space-y-2">
              <button
                onClick={toggleTheme}
                className="w-full flex items-center justify-between p-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-xs font-bold text-zinc-700 dark:text-zinc-300"
              >
                <span>Tema de la interfaz</span>
                <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
                  {theme === 'dark' ? <Moon size={14} /> : <Sun size={14} />}
                  {theme === 'dark' ? 'Modo Oscuro' : 'Modo Claro'}
                </span>
              </button>

              {firebaseUser && (
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-2 p-2.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-600 dark:text-rose-400 text-xs font-bold transition-all"
                >
                  <LogOut size={15} />
                  <span>Cerrar Sesión</span>
                </button>
              )}
            </div>

          </div>
          
          {/* Backdrop click area */}
          <div className="flex-1" onClick={() => setIsMobileMenuOpen(false)} />
        </div>
      )}

    </div>
  );
}

function NavItem({ 
  icon, 
  label, 
  isActive, 
  badge, 
  hasIndicator,
  onClick 
}: { 
  icon: React.ReactNode, 
  label: string, 
  isActive: boolean, 
  badge?: string, 
  hasIndicator?: boolean,
  onClick: () => void 
}) {
  return (
    <button 
      onClick={onClick}
      className={`flex flex-col items-center justify-center rounded-2xl py-1 relative active:scale-95 transition-all select-none ${
        isActive 
          ? 'text-emerald-600 dark:text-emerald-400 font-black' 
          : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200'
      }`}
    >
      <div className="relative">
        {React.cloneElement(icon as React.ReactElement<any>, { size: 20, strokeWidth: isActive ? 2.5 : 2 })}
        {badge && (
          <span className="absolute -top-1.5 -right-2 bg-emerald-500 text-zinc-950 text-[9px] font-black min-w-[16px] h-4 px-1 rounded-full flex items-center justify-center shadow-xs">
            {badge}
          </span>
        )}
        {hasIndicator && !badge && (
          <span className="absolute -top-0.5 -right-1 bg-emerald-500 w-2 h-2 rounded-full ring-2 ring-white dark:ring-zinc-900"></span>
        )}
      </div>
      <span className="text-[10px] mt-1 leading-none font-bold truncate max-w-[60px]">{label}</span>
    </button>
  );
}

function SidebarItem({ 
  icon, 
  label, 
  isActive, 
  badge, 
  onClick 
}: { 
  icon: React.ReactNode, 
  label: string, 
  isActive: boolean, 
  badge?: string, 
  onClick: () => void 
}) {
  return (
    <button 
      onClick={onClick}
      className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition-all w-full text-left select-none ${
        isActive 
          ? 'bg-emerald-600 text-white shadow-xs' 
          : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-white'
      }`}
    >
      <div className="flex items-center gap-2.5 truncate">
        {React.cloneElement(icon as React.ReactElement<any>, { size: 16, strokeWidth: isActive ? 2.5 : 2 })}
        <span className="truncate">{label}</span>
      </div>
      {badge && (
        <span className={`text-[10px] font-black px-1.5 py-0.5 rounded-md shrink-0 ml-1.5 ${
          isActive ? 'bg-white/20 text-white' : 'bg-emerald-500/20 text-emerald-400'
        }`}>
          {badge}
        </span>
      )}
    </button>
  );
}

function DrawerLinkItem({ 
  icon, 
  title, 
  subtitle, 
  badge,
  isActive,
  onClick 
}: { 
  icon: React.ReactNode, 
  title: string, 
  subtitle: string, 
  badge?: string,
  isActive?: boolean,
  onClick: () => void 
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center justify-between p-2.5 rounded-xl border transition-all text-left select-none ${
        isActive
          ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-600 dark:text-emerald-400'
          : 'border-zinc-200 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-800/30 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300'
      }`}
    >
      <div className="flex items-center gap-2.5 min-w-0">
        <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
          isActive 
            ? 'bg-emerald-600 text-white' 
            : 'bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300'
        }`}>
          {icon}
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-1.5">
            <h4 className="text-xs font-bold text-zinc-900 dark:text-white leading-tight truncate">
              {title}
            </h4>
            {badge && (
              <span className="text-[9px] font-black px-1.5 py-0.2 bg-emerald-500/20 text-emerald-500 rounded-md">
                {badge}
              </span>
            )}
          </div>
          <p className="text-[10px] text-zinc-500 dark:text-zinc-400 truncate mt-0.5">
            {subtitle}
          </p>
        </div>
      </div>
      <ChevronRight size={15} className="text-zinc-400 shrink-0 ml-1" />
    </button>
  );
}
