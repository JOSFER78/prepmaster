import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Layers, 
  ShoppingBag, 
  ChefHat, 
  X, 
  Refrigerator, 
  BookMarked,
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
  Plus,
  Flame,
  ExternalLink,
  BookOpen,
  PlusCircle,
  Utensils,
  ChevronDown
} from 'lucide-react';
import { TouChefLogo, TouChefIsotype } from './TouChefLogo';
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
  onOpenAuth?: (mode?: 'login' | 'register') => void;
  currentUser?: FirebaseUser | null;
}

export function Layout({ 
  children, 
  currentView, 
  onNavigate, 
  hideNav = false, 
  activeProject,
  onOpenAuth,
  currentUser: propUser
}: LayoutProps) {
  const { theme, toggleTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(propUser || null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setFirebaseUser(user);
    });
    return () => unsub();
  }, []);

  // Close modals on view navigation
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsCreateModalOpen(false);
    setIsUserMenuOpen(false);
  }, [currentView]);


  const isSuperAdminUser = isSuperAdmin(firebaseUser);

  // Metrics from active project
  const metrics = activeProject ? calculateProjectMetrics(activeProject) : null;
  const pendingShopCount = activeProject?.shoppingList 
    ? activeProject.shoppingList.filter(i => !i.isBought).length 
    : 0;

  // Active view checkers
  const isHomeActive = currentView.name === 'home';
  const isArchiveActive = currentView.name === 'explore' || currentView.name === 'archive' || currentView.name === 'recipe';
  const isPantryActive = currentView.name === 'reference-rag';
  const isPlannerActive = currentView.name === 'planner';
  const isProfileActive = currentView.name === 'profile';
  const isShoppingActive = currentView.name === 'shopping-list';
  const isCookActive = currentView.name === 'interactive-cook' || currentView.name === 'batch-session';
  const isGeneratorActive = currentView.name === 'ai-generator';

  // Dynamic status pill helper
  const getBatchPillInfo = () => {
    if (!activeProject) {
      return {
        label: 'Sin Lote Activo',
        subtext: 'Crear nuevo',
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
          label: 'Compra Pendiente',
          subtext: `${pendingShopCount} ítems`,
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
      case 'home': return 'Dashboard & Seguimiento Diario';
      case 'explore':
      case 'archive': return 'Mi Archivo, Lotes & Recetas';
      case 'ai-generator': return 'Generador IA de Raciones';
      case 'shopping-list': return 'Lista de Compra Descontada';
      case 'interactive-cook': return 'Cocina Simultánea en Paralelo';
      case 'planner': return 'Planificador de Volumen y Raciones';
      case 'reference-rag': return 'Despensa & Stock de Nevera';
      case 'recipe': return 'Detalle de Receta';
      case 'profile': return 'Mi Hogar & Ajustes';
      default: return 'Panel Principal';
    }
  };

  return (
    <div className="bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 flex flex-col min-h-dvh font-sans transition-colors duration-200 bg-noise">
      
      {/* GLOBAL STICKY HEADER 2026 */}
      {!hideNav && (
        <header className="glass-surface w-full top-0 left-0 sticky z-40 border-b border-zinc-200/80 dark:border-white/10">
          <div className="flex justify-between items-center px-3 sm:px-4 py-2.5 max-w-7xl mx-auto gap-2">
            
            {/* BRAND LOGO & MOBILE HAMBURGER */}
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-1.5 rounded-xl md:hidden text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 active:scale-95 transition-all"
                aria-label="Abrir Menú de Navegación"
              >
                <Menu size={22} />
              </button>

              <div 
                className="cursor-pointer select-none group flex items-center gap-2" 
                onClick={() => onNavigate({ name: 'home' })}
              >
                <TouChefLogo size="md" showWordmark={true} />
                {isSuperAdminUser && (
                  <span className="hidden lg:inline-flex text-[9px] bg-amber-500 text-white font-black px-1.5 py-0.2 rounded-full items-center gap-0.5 shadow-2xs">
                    <Crown size={10} /> ADMIN
                  </span>
                )}
              </div>
            </div>

            {/* DYNAMIC ACTIVE BATCH STATUS PILL (CENTER) */}
            <button 
              onClick={() => onNavigate(pillInfo.targetView)}
              className={`flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 rounded-full border text-xs font-bold transition-all hover:scale-102 active:scale-98 shrink min-w-0 font-mono tabular-nums ${pillInfo.colorClass}`}
              title="Ir a la fase activa de la sesión"
            >
              <span className="w-2 h-2 rounded-full bg-current shrink-0"></span>
              <span className="truncate max-w-[90px] sm:max-w-[150px]">{pillInfo.label}:</span>
              <span className="font-mono text-[11px] opacity-90 hidden xs:inline truncate">{pillInfo.subtext}</span>
            </button>

            {/* HEADER RIGHT ACTIONS */}
            <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
              {/* DESKTOP QUICK CREATE BUTTON */}
              <button
                onClick={() => setIsCreateModalOpen(true)}
                className="hidden lg:flex items-center gap-1.5 btn-hero-copper text-xs font-black px-3.5 py-1.5 rounded-xl shadow-xs transition-all active:scale-95 cursor-pointer"
              >
                <Plus size={14} />
                <span>Planificar Sesión</span>
              </button>

              {/* THEME TOGGLE */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-all active:scale-95"
                title={theme === 'dark' ? 'Cambiar a Modo Claro' : 'Cambiar a Modo Oscuro'}
              >
                {theme === 'dark' ? <Sun size={16} className="text-amber-400" /> : <Moon size={16} className="text-zinc-700" />}
              </button>

              {/* USER ACCOUNT BUTTON & DROPDOWN */}
              <div className="relative">
                {firebaseUser && !firebaseUser.isAnonymous ? (
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="p-1 sm:pl-1.5 sm:pr-2.5 sm:py-1 rounded-2xl border border-zinc-200 dark:border-zinc-700/80 bg-zinc-100/80 dark:bg-zinc-800/80 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-all flex items-center gap-2 active:scale-95 shadow-2xs cursor-pointer"
                    title="Cuenta de Usuario & Ajustes"
                  >
                    {/* Real Google Avatar or Fallback */}
                    <div className="w-7 h-7 rounded-xl overflow-hidden bg-emerald-600 text-white flex items-center justify-center font-bold text-xs shrink-0 border border-emerald-500/30">
                      {firebaseUser.photoURL ? (
                        <img 
                          src={firebaseUser.photoURL} 
                          alt={firebaseUser.displayName || 'Google Avatar'} 
                          className="w-full h-full object-cover"
                          crossOrigin="anonymous"
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <span>{(firebaseUser.displayName || firebaseUser.email || 'U').charAt(0).toUpperCase()}</span>
                      )}
                    </div>

                    <div className="flex flex-col text-left leading-tight">
                      <span className="text-xs font-black text-zinc-900 dark:text-white truncate max-w-[85px] sm:max-w-[120px]">
                        {firebaseUser.displayName || firebaseUser.email?.split('@')[0]}
                      </span>
                      <span className="text-[9px] font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-0.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                        Cuenta
                      </span>
                    </div>

                    <ChevronDown size={14} className={`text-zinc-400 transition-transform ${isUserMenuOpen ? 'rotate-180' : ''}`} />
                  </button>
                ) : (
                  <button
                    onClick={() => onOpenAuth ? onOpenAuth('login') : onNavigate({ name: 'profile' })}
                    className="btn-hero-copper text-white text-xs font-black px-3.5 py-1.5 rounded-xl shadow-xs transition-all active:scale-95 flex items-center gap-1.5 cursor-pointer"
                    title="Iniciar sesión en TouChef"
                  >
                    <User size={14} />
                    <span>Acceder</span>
                  </button>
                )}

                {/* USER ACCOUNT DROPDOWN MODAL / MENU */}
                {isUserMenuOpen && firebaseUser && (
                  <>
                    <div 
                      className="fixed inset-0 z-40" 
                      onClick={() => setIsUserMenuOpen(false)} 
                    />
                    
                    <div className="absolute right-0 mt-2 w-72 sm:w-80 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl shadow-xl z-50 p-4 space-y-3.5 animate-fade-in text-zinc-900 dark:text-zinc-100">
                      
                      {/* User Card Header with Google Photo */}
                      <div className="flex items-center gap-3 p-3 bg-zinc-50 dark:bg-zinc-800/60 rounded-2xl border border-zinc-200/80 dark:border-zinc-700/60">
                        <div className="w-12 h-12 rounded-2xl overflow-hidden bg-emerald-600 text-white flex items-center justify-center font-black text-lg shrink-0 shadow-xs border border-emerald-500/30">
                          {firebaseUser.photoURL ? (
                            <img 
                              src={firebaseUser.photoURL} 
                              alt={firebaseUser.displayName || 'Google'} 
                              className="w-full h-full object-cover"
                              crossOrigin="anonymous"
                              referrerPolicy="no-referrer"
                            />
                          ) : (
                            <span>{(firebaseUser.displayName || firebaseUser.email || 'U').charAt(0).toUpperCase()}</span>
                          )}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5">
                            <h4 className="text-xs font-black text-zinc-900 dark:text-white truncate">
                              {firebaseUser.displayName || 'Usuario TouChef'}
                            </h4>
                            {isSuperAdminUser ? (
                              <span className="text-[8px] font-black bg-amber-500 text-white px-1.5 py-0.2 rounded-full">
                                ADMIN
                              </span>
                            ) : (
                              <span className="text-[8px] font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-1.5 py-0.2 rounded-full">
                                PRO
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-zinc-500 dark:text-zinc-400 truncate mt-0.5">
                            {firebaseUser.email}
                          </p>
                          <span className="text-[9px] text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1 mt-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                            Google OAuth Conectado
                          </span>
                        </div>
                      </div>

                      {/* Quick App Preferences */}
                      <div className="space-y-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 px-1">
                          Ajustes de la Aplicación
                        </span>
                        
                        <button
                          onClick={toggleTheme}
                          className="w-full flex items-center justify-between p-2 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800/80 text-xs font-bold text-zinc-700 dark:text-zinc-300 transition-colors"
                        >
                          <span className="flex items-center gap-2">
                            {theme === 'dark' ? <Sun size={15} className="text-amber-400" /> : <Moon size={15} className="text-zinc-600" />}
                            <span>Tema de la Interfaz</span>
                          </span>
                          <span className="text-[11px] text-zinc-400 font-normal">
                            {theme === 'dark' ? 'Modo Oscuro' : 'Modo Claro'}
                          </span>
                        </button>

                        <div className="flex items-center justify-between p-2 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800/80 text-xs font-bold text-zinc-700 dark:text-zinc-300 transition-colors">
                          <span className="flex items-center gap-2">
                            <Sparkles size={15} className="text-emerald-500" />
                            <span>Sincronización Nube</span>
                          </span>
                          <span className="text-[10px] bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded-md font-bold">
                            Firestore ✓
                          </span>
                        </div>
                      </div>

                      {/* Direct Link to My Household & Kitchen */}
                      <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800">
                        <button
                          onClick={() => {
                            setIsUserMenuOpen(false);
                            onNavigate({ name: 'profile' });
                          }}
                          className="w-full flex items-center justify-between p-2.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 text-xs font-bold transition-all"
                        >
                          <span className="flex items-center gap-2">
                            <ChefHat size={16} className="text-emerald-500" />
                            <span>Configuración de Mi Hogar & Cocina</span>
                          </span>
                          <ChevronRight size={14} />
                        </button>
                      </div>

                      {/* Logout Button */}
                      <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800">
                        <button
                          onClick={() => {
                            setIsUserMenuOpen(false);
                            handleLogout();
                          }}
                          className="w-full flex items-center justify-center gap-2 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-600 dark:text-rose-400 text-xs font-bold transition-all active:scale-95"
                        >
                          <LogOut size={14} />
                          <span>Cerrar Sesión</span>
                        </button>
                      </div>

                    </div>
                  </>
                )}
              </div>


            </div>

          </div>
        </header>
      )}

      {/* MAIN CONTAINER WITH STICKY DESKTOP SIDEBAR */}
      <div className="flex-1 w-full max-w-7xl mx-auto flex">
        
        {/* DESKTOP SIDEBAR */}
        {!hideNav && (
          <aside className="hidden md:flex flex-col justify-between w-64 p-4 border-r border-zinc-200/80 dark:border-white/10 shrink-0 sticky top-14 h-[calc(100dvh-3.5rem)] overflow-y-auto glass-surface">
            
            <div className="space-y-5">
              {/* PRIMARY CREATE CTA */}
              <button
                onClick={() => setIsCreateModalOpen(true)}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-2xl btn-hero-copper text-xs font-black shadow-md transition-all active:scale-95 select-none cursor-pointer"
              >
                <Plus size={16} />
                <span>+ Planificar Sesión</span>
              </button>

              {/* SECTION 1: NAVEGACIÓN PRINCIPAL */}
              <div className="space-y-1">
                <div className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 px-2 mb-1">
                  Menú Principal
                </div>
                
                <SidebarItem 
                  icon={<LayoutDashboard size={17} />} 
                  label="Dashboard Hoy" 
                  isActive={isHomeActive} 
                  onClick={() => onNavigate({ name: 'home' })} 
                />

                <SidebarItem 
                  icon={<BookMarked size={17} />} 
                  label="Mi Archivo & Favoritos" 
                  isActive={isArchiveActive} 
                  onClick={() => onNavigate({ name: 'explore' })} 
                />

                <SidebarItem 
                  icon={<Refrigerator size={17} />} 
                  label="Despensa & Nevera" 
                  isActive={isPantryActive} 
                  onClick={() => onNavigate({ name: 'reference-rag' })} 
                />

                <SidebarItem 
                  icon={<Layers size={17} />} 
                  label="Plan de Raciones" 
                  isActive={isPlannerActive} 
                  onClick={() => onNavigate({ name: 'planner' })} 
                />
              </div>

              {/* SECTION 2: LOTE ACTIVO EN CURSO (CONTEXTUAL) */}
              {activeProject && (
                <div className="space-y-1 pt-2 border-t border-zinc-200/80 dark:border-zinc-800/80">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 px-2 mb-1 flex items-center justify-between">
                    <span>Lote en Curso</span>
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  </div>

                  {activeProject.status === 'shopping' && (
                    <SidebarItem 
                      icon={<ShoppingBag size={17} />} 
                      label="Lista de Compra" 
                      badge={pendingShopCount > 0 ? `${pendingShopCount}` : 'Listo'}
                      isActive={isShoppingActive} 
                      onClick={() => onNavigate({ name: 'shopping-list' })} 
                    />
                  )}

                  {(activeProject.status === 'ready_to_cook' || activeProject.status === 'cooking') && (
                    <SidebarItem 
                      icon={<ChefHat size={17} />} 
                      label="Cocina Simultánea" 
                      badge={activeProject.status === 'ready_to_cook' ? 'Listo' : 'Fuegos 🔥'}
                      isActive={isCookActive} 
                      onClick={() => onNavigate({ name: 'interactive-cook' })} 
                    />
                  )}

                  {activeProject.status === 'in_fridge' && (
                    <SidebarItem 
                      icon={<Refrigerator size={17} />} 
                      label="Raciones en Nevera" 
                      badge={`${metrics?.remainingServings ?? 0} rac`}
                      isActive={isHomeActive} 
                      onClick={() => onNavigate({ name: 'home' })} 
                    />
                  )}
                </div>
              )}
            </div>

            {/* SECTION 3: FOOTER SETTINGS */}
            <div className="border-t border-zinc-200 dark:border-zinc-800 pt-3 space-y-1">
              <SidebarItem 
                icon={<User size={17} />} 
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

        {/* MAIN VIEWPORT CONTAINER */}
        <main className={`flex-1 min-w-0 ${hideNav ? '' : 'p-3 sm:p-4 md:p-6 pb-24 md:pb-6'}`}>
          {!hideNav && (
            <div className="hidden md:flex items-center justify-between mb-4 pb-2 border-b border-zinc-200 dark:border-zinc-800/80">
              <div className="flex items-center gap-2 text-xs font-bold text-zinc-400">
                <span>TouChef</span>
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

      {/* MOBILE BOTTOM NAVIGATION BAR (5 CORE DIRECT TABS) */}
      {!hideNav && (
        <nav className="glass-surface fixed bottom-0 left-0 right-0 z-40 grid grid-cols-5 items-center px-1 py-1.5 md:hidden border-t border-zinc-200/80 dark:border-white/10 pb-safe">
          <NavItem 
            icon={<LayoutDashboard />} 
            label="Dashboard" 
            isActive={isHomeActive} 
            onClick={() => onNavigate({ name: 'home' })} 
          />
          <NavItem 
            icon={<BookMarked />} 
            label="Archivo" 
            isActive={isArchiveActive} 
            onClick={() => onNavigate({ name: 'explore' })} 
          />
          {/* CENTER ELEVATED CREATE BUTTON */}
          <div className="flex flex-col items-center justify-center">
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="w-12 h-12 rounded-2xl btn-hero-copper flex items-center justify-center shadow-lg active:scale-90 transition-transform -mt-3.5 cursor-pointer"
              aria-label="Planificar nueva sesión o receta"
            >
              <Plus size={24} strokeWidth={3} />
            </button>
            <span className="text-[10px] mt-0.5 leading-none font-bold text-zinc-500 dark:text-zinc-400">Crear</span>
          </div>
          <NavItem 
            icon={<Refrigerator />} 
            label="Despensa" 
            isActive={isPantryActive} 
            onClick={() => onNavigate({ name: 'reference-rag' })} 
          />
          <NavItem 
            icon={<User />} 
            label="Mi Hogar" 
            isActive={isProfileActive} 
            onClick={() => onNavigate({ name: 'profile' })} 
          />
        </nav>
      )}

      {/* CREATE SELECTOR MODAL (+ NUEVA SESIÓN INTELIGENTE / + NUEVA RECETA) */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-fade-in">
          <div 
            className="w-full max-w-md glass-surface-elevated rounded-3xl p-6 sm:p-7 shadow-2xl space-y-5 animate-scale-in border border-zinc-200 dark:border-white/15 text-zinc-900 dark:text-zinc-100"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-3.5">
              <div className="flex items-center gap-2.5">
                <TouChefIsotype size={32} />
                <div>
                  <h3 className="text-base font-black tracking-tight">
                    Planificar en TouChef
                  </h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    Elige el modo de creación
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setIsCreateModalOpen(false)}
                className="w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-500 flex items-center justify-center transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-3">
              {/* OPTION 1: NUEVA SESIÓN INTELIGENTE */}
              <div
                onClick={() => {
                  setIsCreateModalOpen(false);
                  onNavigate({ name: 'ai-generator' });
                }}
                className="p-4 rounded-2xl border border-[#E07A5F]/40 bg-[#E07A5F]/5 hover:bg-[#E07A5F]/10 hover:border-[#E07A5F] transition-all cursor-pointer group flex items-start gap-3.5 shadow-2xs"
              >
                <div className="w-10 h-10 rounded-xl bg-[#E07A5F] text-white flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform shadow-xs">
                  <Sparkles size={20} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-black text-zinc-900 dark:text-white">
                      Sesión Inteligente de Cocina
                    </h4>
                    <span className="text-[10px] bg-[#E07A5F] text-white font-black px-2 py-0.5 rounded-full">
                      Recomendado
                    </span>
                  </div>
                  <p className="text-xs text-zinc-600 dark:text-zinc-300 mt-1 leading-relaxed">
                    Calcula raciones exactas, cruza tu despensa viva y sincroniza tus fuentes de calor en paralelo.
                  </p>
                </div>
              </div>

              {/* OPTION 2: NUEVA RECETA INDIVIDUAL */}
              <div
                onClick={() => {
                  setIsCreateModalOpen(false);
                  onNavigate({ name: 'explore' });
                }}
                className="p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/40 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all cursor-pointer group flex items-start gap-3.5"
              >
                <div className="w-10 h-10 rounded-xl bg-zinc-800 text-emerald-400 border border-zinc-700 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <Utensils size={20} />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-black text-zinc-900 dark:text-white">
                    Nueva Receta o Nota RAG
                  </h4>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 leading-relaxed">
                    Añade un plato individual o importa recetas desde un archivo Markdown a tu recetario personal.
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsCreateModalOpen(false)}
              className="w-full py-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-xs font-bold text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      {/* MOBILE FULL NAVIGATION DRAWER */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex justify-start md:hidden bg-black/60 backdrop-blur-xs animate-fade-in">
          <div 
            className="w-full max-w-xs bg-white dark:bg-zinc-900 border-r border-zinc-200 dark:border-zinc-800 p-5 flex flex-col justify-between shadow-2xl h-full overflow-y-auto animate-slide-right"
          >
            <div className="space-y-5">
              
              {/* DRAWER HEADER */}
              <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-3.5">
                <div className="flex items-center gap-2">
                  <TouChefLogo size="sm" showWordmark={true} />
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
                  </div>
                </div>
              )}

              {/* MAIN ITEMS */}
              <div className="space-y-1">
                <div className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 px-2 mb-1">
                  Navegación
                </div>
                <DrawerLinkItem 
                  icon={<LayoutDashboard size={18} />} 
                  title="Dashboard Hoy" 
                  subtitle="Estado del día y seguimiento"
                  isActive={isHomeActive} 
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onNavigate({ name: 'home' });
                  }} 
                />
                <DrawerLinkItem 
                  icon={<BookMarked size={18} />} 
                  title="Mi Archivo & Favoritos" 
                  subtitle="Lotes y recetas guardadas"
                  isActive={isArchiveActive} 
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onNavigate({ name: 'explore' });
                  }} 
                />
                <DrawerLinkItem 
                  icon={<Refrigerator size={18} />} 
                  title="Despensa & Nevera" 
                  subtitle="Stock de alimentos en casa"
                  isActive={isPantryActive} 
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onNavigate({ name: 'reference-rag' });
                  }} 
                />
                <DrawerLinkItem 
                  icon={<Layers size={18} />} 
                  title="Plan de Raciones" 
                  subtitle="Distribución semanal de comidas"
                  isActive={isPlannerActive} 
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onNavigate({ name: 'planner' });
                  }} 
                />
              </div>

              {/* CONTEXTUAL BATCH ACTIONS */}
              {activeProject && (
                <div className="space-y-1 pt-2 border-t border-zinc-200 dark:border-zinc-800">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 px-2 mb-1">
                    Fases del Lote
                  </div>
                  {activeProject.status === 'shopping' && (
                    <DrawerLinkItem 
                      icon={<ShoppingBag size={18} />} 
                      title="Lista de Compra" 
                      subtitle="Ingredientes descontados"
                      badge={pendingShopCount > 0 ? `${pendingShopCount}` : undefined}
                      isActive={isShoppingActive} 
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        onNavigate({ name: 'shopping-list' });
                      }} 
                    />
                  )}
                  {(activeProject.status === 'ready_to_cook' || activeProject.status === 'cooking') && (
                    <DrawerLinkItem 
                      icon={<ChefHat size={18} />} 
                      title="Cocina Simultánea" 
                      subtitle="Fuegos y temporizadores"
                      badge={activeProject.status === 'ready_to_cook' ? 'Listo' : 'Fuego'}
                      isActive={isCookActive} 
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        onNavigate({ name: 'interactive-cook' });
                      }} 
                    />
                  )}
                </div>
              )}

              {/* SETTINGS */}
              <div className="space-y-1 pt-2 border-t border-zinc-200 dark:border-zinc-800">
                <div className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 px-2 mb-1">
                  Ajustes
                </div>
                <DrawerLinkItem 
                  icon={<User size={18} />} 
                  title="Mi Hogar & Ajustes" 
                  subtitle="Comensales, dietas y cuenta"
                  isActive={isProfileActive} 
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onNavigate({ name: 'profile' });
                  }} 
                />
                <DrawerLinkItem 
                  icon={<ExternalLink size={18} />} 
                  title="Ver Portada / Landing" 
                  subtitle="Calculadora y método"
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
                <span>Tema</span>
                <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
                  {theme === 'dark' ? <Moon size={14} /> : <Sun size={14} />}
                  {theme === 'dark' ? 'Oscuro' : 'Claro'}
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
      className={`flex flex-col items-center justify-center rounded-2xl py-1 relative active:scale-95 transition-all select-none cursor-pointer ${
        isActive 
          ? 'text-[#E07A5F] font-black' 
          : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200'
      }`}
    >
      <div className="relative">
        {React.cloneElement(icon as React.ReactElement<any>, { size: 20, strokeWidth: isActive ? 2.5 : 2 })}
        {badge && (
          <span className="absolute -top-1.5 -right-2 bg-[#E07A5F] text-white text-[9px] font-black min-w-[16px] h-4 px-1 rounded-full flex items-center justify-center shadow-xs">
            {badge}
          </span>
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
      className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all w-full text-left select-none cursor-pointer ${
        isActive 
          ? 'bg-[#E07A5F] text-white shadow-xs font-black' 
          : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-white'
      }`}
    >
      <div className="flex items-center gap-2.5 truncate">
        {React.cloneElement(icon as React.ReactElement<any>, { size: 16, strokeWidth: isActive ? 2.5 : 2 })}
        <span className="truncate">{label}</span>
      </div>
      {badge && (
        <span className={`text-[10px] font-black px-1.5 py-0.5 rounded-md shrink-0 ml-1.5 ${
          isActive ? 'bg-white/20 text-white' : 'bg-[#E07A5F]/20 text-[#E07A5F]'
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
      className={`w-full flex items-center justify-between p-2.5 rounded-xl border transition-all text-left select-none cursor-pointer ${
        isActive
          ? 'bg-[#E07A5F]/15 border-[#E07A5F]/40 text-[#E07A5F]'
          : 'border-zinc-200 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-800/30 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300'
      }`}
    >
      <div className="flex items-center gap-2.5 min-w-0">
        <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
          isActive 
            ? 'bg-[#E07A5F] text-white' 
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
              <span className="text-[9px] font-black px-1.5 py-0.2 bg-[#E07A5F]/20 text-[#E07A5F] rounded-md">
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
