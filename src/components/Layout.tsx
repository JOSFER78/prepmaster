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
  Calendar,
  Clock,
  ArrowRight,
  Info
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
  const [isProfileDrawerOpen, setIsProfileDrawerOpen] = useState(false);
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setFirebaseUser(user);
    });
    return () => unsub();
  }, []);

  const isSuperAdminUser = isSuperAdmin(firebaseUser);

  // Metrics from active project
  const metrics = activeProject ? calculateProjectMetrics(activeProject) : null;
  const pendingShopCount = activeProject?.shoppingList ? activeProject.shoppingList.filter(i => !i.isBought).length : 0;

  // Dynamic status pill helper
  const getBatchPillInfo = () => {
    if (!activeProject) {
      return {
        label: 'Sin Lote Activo',
        subtext: 'Planificar',
        colorClass: 'bg-zinc-800 text-zinc-400 border-zinc-700',
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
          colorClass: 'bg-emerald-950/60 text-emerald-400 border-emerald-500/30 animate-pulse',
          targetView: { name: 'interactive-cook' as const }
        };
      case 'cooking':
        return {
          label: 'En Cocina',
          subtext: 'Fuegos activos',
          colorClass: 'bg-amber-950/60 text-amber-400 border-amber-500/30 animate-pulse',
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

  // Active tab checkers
  const isHomeActive = currentView.name === 'home';
  const isGeneratorActive = currentView.name === 'ai-generator';
  const isShoppingActive = currentView.name === 'shopping-list';
  const isCookActive = currentView.name === 'interactive-cook' || currentView.name === 'batch-session';

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setIsProfileDrawerOpen(false);
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
      case 'profile': return 'Perfil, Hogar y Ajustes';
      default: return 'Panel Principal';
    }
  };

  return (
    <div className="bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 flex flex-col min-h-screen font-sans transition-colors duration-200">
      
      {/* GLOBAL HEADER */}
      {!hideNav && (
        <header className="bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md shadow-xs w-full top-0 left-0 sticky z-40 border-b border-zinc-200 dark:border-zinc-800">
          <div className="flex justify-between items-center px-4 py-2.5 max-w-7xl mx-auto">
            
            {/* BRAND LOGO */}
            <div 
              className="flex items-center gap-2.5 cursor-pointer select-none group" 
              onClick={() => onNavigate({ name: 'home' })}
            >
              <div className="w-8 h-8 rounded-xl bg-emerald-600 dark:bg-emerald-500 text-white flex items-center justify-center font-black shadow-xs shrink-0 group-hover:scale-105 transition-transform">
                <ChefHat size={18} />
              </div>
              <div>
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
                <p className="text-[10px] text-zinc-500 dark:text-zinc-400 font-medium truncate max-w-[120px] sm:max-w-[200px]">
                  {firebaseUser ? (firebaseUser.displayName || firebaseUser.email) : 'Batch Cooking Pro'}
                </p>
              </div>
            </div>

            {/* DYNAMIC ACTIVE BATCH STATUS PILL (CENTER) */}
            <button 
              onClick={() => onNavigate(pillInfo.targetView)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-bold transition-all hover:scale-102 active:scale-98 ${pillInfo.colorClass}`}
              title="Ir a la fase activa del lote"
            >
              <span className="w-2 h-2 rounded-full bg-current"></span>
              <span className="truncate max-w-[110px] sm:max-w-[180px]">{pillInfo.label}:</span>
              <span className="font-mono text-[11px] opacity-90">{pillInfo.subtext}</span>
            </button>

            {/* HEADER RIGHT ACTIONS */}
            <div className="flex items-center gap-2">
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
                onClick={() => setIsProfileDrawerOpen(true)}
                className="p-1.5 sm:px-3 sm:py-1.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 hover:border-emerald-500/50 transition-all active:scale-95 flex items-center gap-2"
                title="Ajustes y Perfil"
              >
                <div className="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold text-xs">
                  <User size={14} />
                </div>
                <span className="hidden md:inline text-xs font-bold">Hogar</span>
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
              {/* SECTION 1: LOTE ACTIVO (CORE LOOP) */}
              <div className="space-y-1">
                <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 px-2 mb-1 flex items-center justify-between">
                  <span>Lote de Cocina</span>
                  {activeProject && (
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  )}
                </div>
                <SidebarItem 
                  icon={<Home size={16} />} 
                  label="Dashboard Hoy" 
                  isActive={currentView.name === 'home'} 
                  onClick={() => onNavigate({ name: 'home' })} 
                />
                <SidebarItem 
                  icon={<Sparkles size={16} />} 
                  label="Generador IA" 
                  isActive={currentView.name === 'ai-generator'} 
                  onClick={() => onNavigate({ name: 'ai-generator' })} 
                />
                <SidebarItem 
                  icon={<ShoppingBag size={16} />} 
                  label="Lista de Compra" 
                  badge={pendingShopCount > 0 ? `${pendingShopCount}` : undefined}
                  isActive={currentView.name === 'shopping-list'} 
                  onClick={() => onNavigate({ name: 'shopping-list' })} 
                />
                <SidebarItem 
                  icon={<ChefHat size={16} />} 
                  label="Cocina Simultánea" 
                  isActive={currentView.name === 'interactive-cook' || currentView.name === 'batch-session'} 
                  onClick={() => onNavigate({ name: 'interactive-cook' })} 
                />
              </div>

              {/* SECTION 2: RECURSOS & BIBLIOTECA */}
              <div className="space-y-1">
                <div className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 px-2 mb-1">
                  Recursos
                </div>
                <SidebarItem 
                  icon={<Layers size={16} />} 
                  label="Plan de Raciones" 
                  isActive={currentView.name === 'planner'} 
                  onClick={() => onNavigate({ name: 'planner' })} 
                />
                <SidebarItem 
                  icon={<Refrigerator size={16} />} 
                  label="Despensa & Nevera" 
                  isActive={currentView.name === 'reference-rag'} 
                  onClick={() => onNavigate({ name: 'reference-rag' })} 
                />
                <SidebarItem 
                  icon={<BookOpen size={16} />} 
                  label="Recetas de Autor" 
                  isActive={currentView.name === 'explore' || currentView.name === 'recipe'} 
                  onClick={() => onNavigate({ name: 'explore' })} 
                />
              </div>
            </div>

            {/* SECTION 3: FOOTER SETTINGS */}
            <div className="border-t border-zinc-200 dark:border-zinc-800 pt-3 space-y-1">
              <SidebarItem 
                icon={<User size={16} />} 
                label="Mi Hogar & Ajustes" 
                isActive={currentView.name === 'profile'} 
                onClick={() => onNavigate({ name: 'profile' })} 
              />
              <button
                onClick={() => onNavigate({ name: 'landing' })}
                className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800/60 transition-all text-left"
              >
                <span>Ver Portada / Landing</span>
                <ArrowRight size={14} />
              </button>
            </div>

          </aside>
        )}

        {/* MAIN VIEWPORT */}
        <main className={`flex-grow w-full ${hideNav ? '' : 'p-4 md:p-6 pb-24 md:pb-6 overflow-x-hidden'}`}>
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

      {/* MOBILE BOTTOM NAVIGATION BAR (4 CORE DIRECT TABS) */}
      {!hideNav && (
        <nav className="bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md shadow-lg fixed bottom-0 left-0 right-0 z-40 flex justify-around items-center px-2 py-2 md:hidden border-t border-zinc-200 dark:border-zinc-800 pb-safe">
          <NavItem 
            icon={<Home />} 
            label="Inicio" 
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
            isActive={isCookActive} 
            onClick={() => onNavigate({ name: 'interactive-cook' })} 
          />
        </nav>
      )}

      {/* PROFILE & SETTINGS SIDE DRAWER */}
      {isProfileDrawerOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs animate-fade-in">
          <div className="flex-1" onClick={() => setIsProfileDrawerOpen(false)} />

          <div className="w-full max-w-sm bg-white dark:bg-zinc-900 border-l border-zinc-200 dark:border-zinc-800 p-6 flex flex-col justify-between shadow-2xl h-full overflow-y-auto animate-slide-left">
            
            <div className="space-y-6">
              {/* DRAWER HEADER */}
              <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold text-sm">
                    <User size={20} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-zinc-900 dark:text-white">
                      {firebaseUser?.displayName || 'Mi Hogar'}
                    </h3>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">
                      {firebaseUser?.email || 'Modo Local / Invitado'}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsProfileDrawerOpen(false)}
                  className="p-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
                >
                  <X size={18} />
                </button>
              </div>

              {/* QUICK STATS */}
              {activeProject && (
                <div className="p-3.5 bg-zinc-50 dark:bg-zinc-800/60 rounded-2xl border border-zinc-200 dark:border-zinc-700/60 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-zinc-700 dark:text-zinc-300">Lote Activo</span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold uppercase text-[10px]">
                      {activeProject.status}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="p-2 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-700/40">
                      <span className="text-[10px] text-zinc-400 block">Comensales</span>
                      <span className="font-black text-zinc-900 dark:text-white">{activeProject.peopleCount} personas</span>
                    </div>
                    <div className="p-2 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-700/40">
                      <span className="text-[10px] text-zinc-400 block">Días Cubiertos</span>
                      <span className="font-black text-zinc-900 dark:text-white">{activeProject.daysCount} días</span>
                    </div>
                  </div>
                </div>
              )}

              {/* NAVIGATION LINKS IN DRAWER (NON-DUPLICATE ITEMS) */}
              <div className="space-y-2">
                <DrawerItem
                  icon={<User size={18} />}
                  title="Preferencias de Hogar & Dieta"
                  subtitle="Comensales, alergias y macros"
                  onClick={() => {
                    setIsProfileDrawerOpen(false);
                    onNavigate({ name: 'profile' });
                  }}
                />
                <DrawerItem
                  icon={<Refrigerator size={18} />}
                  title="Despensa & Stock RAG"
                  subtitle="Inventario de ingredientes en casa"
                  onClick={() => {
                    setIsProfileDrawerOpen(false);
                    onNavigate({ name: 'reference-rag' });
                  }}
                />
                <DrawerItem
                  icon={<Layers size={18} />}
                  title="Planificador de Volumen"
                  subtitle="Ajuste manual de raciones"
                  onClick={() => {
                    setIsProfileDrawerOpen(false);
                    onNavigate({ name: 'planner' });
                  }}
                />
                <DrawerItem
                  icon={<BookOpen size={18} />}
                  title="Recetario de Autor"
                  subtitle="Canales y técnicas de cocina"
                  onClick={() => {
                    setIsProfileDrawerOpen(false);
                    onNavigate({ name: 'explore' });
                  }}
                />
                <DrawerItem
                  icon={<Sparkles size={18} />}
                  title="Portada y Método Batch"
                  subtitle="Calculadora de ahorro pública"
                  onClick={() => {
                    setIsProfileDrawerOpen(false);
                    onNavigate({ name: 'landing' });
                  }}
                />
              </div>
            </div>

            {/* DRAWER FOOTER */}
            <div className="border-t border-zinc-200 dark:border-zinc-800 pt-4 space-y-3">
              <button
                onClick={toggleTheme}
                className="w-full flex items-center justify-between p-3 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-xs font-bold text-zinc-700 dark:text-zinc-300"
              >
                <span>Tema de la interfaz</span>
                <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                  {theme === 'dark' ? 'Modo Oscuro' : 'Modo Claro'}
                </span>
              </button>

              {firebaseUser && (
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-2 p-3 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-600 dark:text-rose-400 text-xs font-bold transition-all"
                >
                  <LogOut size={16} />
                  <span>Cerrar Sesión</span>
                </button>
              )}
            </div>

          </div>
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
      className={`flex flex-col items-center justify-center rounded-2xl px-3 py-1 relative active:scale-95 transition-all ${
        isActive 
          ? 'text-emerald-600 dark:text-emerald-400 font-black' 
          : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200'
      }`}
    >
      <div className="relative">
        {React.cloneElement(icon as React.ReactElement<any>, { size: 22, strokeWidth: isActive ? 2.5 : 2 })}
        {badge && (
          <span className="absolute -top-1 -right-2 bg-emerald-500 text-zinc-950 text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
            {badge}
          </span>
        )}
      </div>
      <span className="text-[10px] mt-1 leading-none font-bold">{label}</span>
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
      className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition-all w-full text-left ${
        isActive 
          ? 'bg-emerald-600 text-white shadow-xs' 
          : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-white'
      }`}
    >
      <div className="flex items-center gap-2.5">
        {React.cloneElement(icon as React.ReactElement<any>, { size: 16, strokeWidth: isActive ? 2.5 : 2 })}
        <span>{label}</span>
      </div>
      {badge && (
        <span className={`text-[10px] font-black px-1.5 py-0.5 rounded-md ${
          isActive ? 'bg-white/20 text-white' : 'bg-emerald-500/20 text-emerald-400'
        }`}>
          {badge}
        </span>
      )}
    </button>
  );
}

function DrawerItem({ 
  icon, 
  title, 
  subtitle, 
  onClick 
}: { 
  icon: React.ReactNode, 
  title: string, 
  subtitle: string, 
  onClick: () => void 
}) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center justify-between p-3 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/50 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all text-left group"
    >
      <div className="flex items-center gap-3 min-w-0">
        <div className="w-8 h-8 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 flex items-center justify-center shrink-0 text-emerald-600 dark:text-emerald-400 group-hover:scale-105 transition-transform">
          {icon}
        </div>
        <div className="min-w-0">
          <h4 className="text-xs font-bold text-zinc-900 dark:text-white leading-tight truncate">{title}</h4>
          <p className="text-[10px] text-zinc-500 dark:text-zinc-400 truncate mt-0.5">{subtitle}</p>
        </div>
      </div>
      <ChevronRight size={16} className="text-zinc-400 group-hover:translate-x-0.5 transition-transform shrink-0" />
    </button>
  );
}
