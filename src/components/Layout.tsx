import React, { useState, useEffect } from 'react';
import { 
  Home, 
  Calendar, 
  ShoppingBag, 
  Play, 
  User, 
  Sparkles, 
  Flame, 
  ChefHat, 
  Sliders, 
  LogOut, 
  Sun, 
  Moon, 
  Globe, 
  UtensilsCrossed,
  ShieldCheck,
  Award,
  Truck,
  BookMarked,
  LayoutDashboard,
  CheckCircle2,
  ChevronRight,
  Menu,
  X,
  Plus
} from 'lucide-react';
import { TouChefLogo, TouChefIsotype } from './TouChefLogo';
import { ThemeToggle } from './ThemeToggle';
import { ViewState, BatchProject } from '../types';
import { calculateProjectMetrics } from '../lib/batchProjects';
import { User as FirebaseUser, signOut, auth } from '../lib/firebase';

interface LayoutProps {
  children: React.ReactNode;
  currentView: ViewState;
  onNavigate: (view: ViewState) => void;
  hideNav?: boolean;
  activeProject?: BatchProject | null;
  onOpenAuth?: (mode: 'login' | 'register') => void;
  onOpenChefOnboarding?: () => void;
  onOpenLegal?: (type: 'privacy' | 'terms' | 'cookies') => void;
  currentUser?: FirebaseUser | null;
  activeBookingsCount?: number;
}

export function Layout({ 
  children, 
  currentView, 
  onNavigate, 
  hideNav = false,
  activeProject = null,
  onOpenAuth,
  onOpenChefOnboarding,
  onOpenLegal,
  currentUser,
  activeBookingsCount = 0
}: LayoutProps) {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);

  useEffect(() => {
    setIsUserMenuOpen(false);
    setIsMobileDrawerOpen(false);
  }, [currentView]);

  if (hideNav) {
    return <main className="min-h-screen bg-[#FBF9F5] dark:bg-[#0C0D0E] transition-colors">{children}</main>;
  }

  const metrics = activeProject ? calculateProjectMetrics(activeProject) : null;

  // Active Hubs Checkers
  const isTodayActive = currentView.name === 'home' || currentView.name === 'interactive-cook' || currentView.name === 'batch-session';
  const isPlannerActive = currentView.name === 'planner' || currentView.name === 'ai-generator' || currentView.name === 'recipe';
  const isChefsDiaActive = currentView.name === 'chefs' || (currentView as any).name === 'chef-directory' || currentView.name === 'shopping-list' || currentView.name === 'supermarket-checkout' || currentView.name === 'my-bookings' || currentView.name === 'chef-portal';
  const isKitchenActive = currentView.name === 'profile' || currentView.name === 'reference-rag' || currentView.name === 'superadmin';

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onNavigate({ name: 'landing' });
    } catch (e) {
      console.error('Logout error:', e);
      onNavigate({ name: 'landing' });
    }
  };

  // Status pill helper
  const getDynamicIslandPill = () => {
    if (!activeProject) {
      return {
        label: 'Sin lote activo',
        color: 'bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700',
        actionView: { name: 'ai-generator' as const }
      };
    }

    switch (activeProject.status) {
      case 'planning':
        return {
          label: `Planificando (${activeProject.totalServings} rac)`,
          color: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20',
          actionView: { name: 'ai-generator' as const }
        };
      case 'shopping':
        return {
          label: `Compra (${metrics?.boughtShopItems || 0}/${metrics?.totalShopItems || 0})`,
          color: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20',
          actionView: { name: 'shopping-list' as const }
        };
      case 'ready_to_cook':
        return {
          label: '🔥 Fuegos Listos',
          color: 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 animate-pulse',
          actionView: { name: 'interactive-cook' as const }
        };
      case 'cooking':
        return {
          label: '🔥 Cocina en Marcha',
          color: 'bg-[#E07A5F]/15 text-[#E07A5F] border border-[#E07A5F]/30 animate-pulse',
          actionView: { name: 'interactive-cook' as const }
        };
      case 'in_fridge':
        return {
          label: `❄️ En Nevera (${metrics?.remainingServings || 0} rac)`,
          color: 'bg-[#52796F]/15 text-[#52796F] dark:text-[#84A98C] border border-[#52796F]/30',
          actionView: { name: 'home' as const }
        };
      default:
        return {
          label: `${activeProject.totalServings} rac`,
          color: 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600',
          actionView: { name: 'home' as const }
        };
    }
  };

  const dynamicPill = getDynamicIslandPill();

  return (
    <div className="min-h-screen bg-[#FBF9F5] dark:bg-[#0C0D0E] text-zinc-900 dark:text-zinc-100 flex flex-col font-sans transition-colors">

      {/* 1. TOP HEADER (CLEAN & SPACIOUS) */}
      <header className="sticky top-0 z-40 bg-[#FBF9F5]/95 dark:bg-[#0C0D0E]/95 backdrop-blur-md border-b border-zinc-200/80 dark:border-white/10 transition-colors">
        <div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          
          {/* Logo & Portada Link */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => onNavigate({ name: 'home' })}
              className="flex items-center gap-2 text-left focus:outline-hidden group cursor-pointer"
              title="Ir al Inicio"
            >
              <TouChefLogo size="md" />
            </button>

            <button
              onClick={() => onNavigate({ name: 'landing' })}
              className="text-xs font-bold text-zinc-500 dark:text-zinc-400 hover:text-[#E07A5F] px-2.5 py-1 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 transition-colors cursor-pointer hidden sm:inline"
              title="Ver Portada Pública"
            >
              Ver Portada
            </button>
          </div>

          {/* Right Area: Dynamic Status Pill + Theme + User Profile */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Dynamic Status Pill */}
            <button
              onClick={() => onNavigate(dynamicPill.actionView)}
              className={`text-xs font-bold px-3.5 py-1.5 rounded-full transition-all cursor-pointer hidden md:flex items-center gap-2 ${dynamicPill.color}`}
            >
              <span className="w-2 h-2 rounded-full bg-current animate-pulse" />
              <span>{dynamicPill.label}</span>
            </button>

            <ThemeToggle />

            {/* User Profile / Auth */}
            <div className="relative">
              {currentUser ? (
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="w-9 h-9 rounded-full bg-[#E07A5F]/20 text-[#E07A5F] dark:text-[#F4A261] border border-[#E07A5F]/30 flex items-center justify-center font-bold text-xs hover:ring-2 hover:ring-[#E07A5F]/40 transition-all cursor-pointer overflow-hidden"
                  title={currentUser.displayName || currentUser.email || 'Mi Cuenta'}
                >
                  {currentUser.photoURL ? (
                    <img src={currentUser.photoURL} alt="Avatar" className="w-full h-full object-cover" />
                  ) : (
                    <span>{(currentUser.displayName || currentUser.email || 'U')[0].toUpperCase()}</span>
                  )}
                </button>
              ) : (
                <button
                  onClick={() => onOpenAuth && onOpenAuth('login')}
                  className="text-xs font-bold px-3 py-1.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-200 hover:bg-zinc-50 transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <User size={14} />
                  <span>Acceder</span>
                </button>
              )}

              {/* User Dropdown */}
              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-60 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-2 shadow-2xl z-50 animate-in fade-in space-y-1">
                  <div className="p-2.5 border-b border-zinc-100 dark:border-zinc-800">
                    <strong className="text-xs font-bold text-zinc-900 dark:text-white block truncate">
                      {currentUser?.displayName || 'Usuario'}
                    </strong>
                    <span className="text-[10px] text-zinc-400 block truncate">{currentUser?.email}</span>
                  </div>

                  <button
                    onClick={() => { setIsUserMenuOpen(false); onNavigate({ name: 'profile' }); }}
                    className="w-full flex items-center gap-2 p-2 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800 text-xs text-zinc-700 dark:text-zinc-300 font-bold transition-colors cursor-pointer"
                  >
                    <UtensilsCrossed size={14} className="text-[#E07A5F]" />
                    <span>Mi Cocina & Ajustes</span>
                  </button>

                  <button
                    onClick={() => { setIsUserMenuOpen(false); onNavigate({ name: 'my-bookings' }); }}
                    className="w-full flex items-center gap-2 p-2 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800 text-xs text-zinc-700 dark:text-zinc-300 font-bold transition-colors cursor-pointer"
                  >
                    <Sparkles size={14} className="text-amber-500" />
                    <span>Mis Reservas</span>
                  </button>

                  <button
                    onClick={() => { setIsUserMenuOpen(false); onNavigate({ name: 'superadmin' }); }}
                    className="w-full flex items-center gap-2 p-2 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800 text-xs text-zinc-700 dark:text-zinc-300 font-bold transition-colors cursor-pointer"
                  >
                    <ShieldCheck size={14} className="text-emerald-400" />
                    <span>SuperAdmin</span>
                  </button>

                  <div className="pt-1 border-t border-zinc-100 dark:border-zinc-800">
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 p-2 rounded-xl text-rose-600 dark:text-rose-400 hover:bg-rose-500/10 text-xs font-bold transition-colors cursor-pointer"
                    >
                      <LogOut size={14} />
                      <span>Cerrar Sesión</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setIsMobileDrawerOpen(!isMobileDrawerOpen)}
              className="lg:hidden p-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 cursor-pointer"
              aria-label="Abrir Menú"
            >
              {isMobileDrawerOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

          </div>

        </div>
      </header>

      {/* 2. MAIN BODY (DESKTOP SIDEBAR + FLUID CONTENT) */}
      <div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 w-full flex-1 flex gap-6 lg:gap-8 pt-5 pb-24 lg:pb-8">
        
        {/* DESKTOP SIDEBAR (4 MASTER HUBS) */}
        <aside className="hidden lg:flex flex-col w-64 lg:w-68 xl:w-72 shrink-0 gap-4">
          
          <div className="bg-white dark:bg-zinc-900 rounded-3xl p-4 sm:p-5 border border-zinc-200/80 dark:border-zinc-800 shadow-xs space-y-3 sticky top-20">
            
            <div className="px-2 pb-1">
              <span className="text-[10px] font-black uppercase tracking-wider text-zinc-400 block">
                Navegación Maestra
              </span>
              <p className="text-[11px] text-zinc-500 mt-0.5">4 Destinos Inteligentes</p>
            </div>

            {/* HUB 1: HOY / EN VIVO */}
            <MasterHubNavItem 
              icon={<Flame size={18} className="text-[#E07A5F]" />} 
              label="1. Hoy / En Vivo" 
              subtitle="Lote activo, nevera y fuegos"
              badge={activeProject?.status === 'cooking' ? 'En Fuego' : (activeProject ? `${metrics?.remainingServings || 0} rac` : undefined)}
              isActive={isTodayActive} 
              onClick={() => onNavigate({ name: 'home' })} 
            />

            {/* HUB 2: PLANIFICADOR & MENÚ */}
            <MasterHubNavItem 
              icon={<Sparkles size={18} className="text-[#F4A261]" />} 
              label="2. Planificador & Menú" 
              subtitle="IA, raciones y balance semanal"
              badge="IA 2026"
              isActive={isPlannerActive} 
              onClick={() => onNavigate({ name: 'ai-generator' })} 
            />

            {/* HUB 3: CHEFS & COMPRA DIA */}
            <MasterHubNavItem 
              icon={<ChefHat size={18} className="text-amber-400" />} 
              label="3. Chefs & Compra DIA" 
              subtitle="Chefs a domicilio y súper DIA"
              badge={activeBookingsCount > 0 ? `${activeBookingsCount}` : 'DIA JIT'}
              isActive={isChefsDiaActive} 
              onClick={() => onNavigate({ name: 'chefs' })} 
            />

            {/* HUB 4: MI COCINA & AJUSTES */}
            <MasterHubNavItem 
              icon={<UtensilsCrossed size={18} className="text-emerald-400" />} 
              label="4. Mi Cocina & Ajustes" 
              subtitle="Hogar, fogones, contrato y despensa"
              isActive={isKitchenActive} 
              onClick={() => onNavigate({ name: 'profile' })} 
            />

          </div>

        </aside>

        {/* MAIN VIEWPORT */}
        <main className="flex-1 min-w-0 w-full">
          {children}
        </main>

      </div>

      {/* 3. MOBILE BOTTOM TAB BAR (NO SQUEEZED TOP HEADERS - ONLY FOR AUTHENTICATED USERS) */}
      {currentUser && (
        <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#FBF9F5]/95 dark:bg-[#0C0D0E]/95 backdrop-blur-md border-t border-zinc-200/80 dark:border-white/10 px-2 py-2 flex items-center justify-around">
          <MobileTabItem 
            icon={<Flame size={18} />} 
            label="Hoy" 
            isActive={isTodayActive} 
            onClick={() => onNavigate({ name: 'home' })} 
          />
          <MobileTabItem 
            icon={<Sparkles size={18} />} 
            label="Planificador" 
            isActive={isPlannerActive} 
            onClick={() => onNavigate({ name: 'ai-generator' })} 
          />
          <MobileTabItem 
            icon={<ChefHat size={18} className="text-amber-400" />} 
            label="Chefs & DIA" 
            isActive={isChefsDiaActive} 
            badge={activeBookingsCount > 0 ? `${activeBookingsCount}` : undefined}
            onClick={() => onNavigate({ name: 'chefs' })} 
          />
          <MobileTabItem 
            icon={<UtensilsCrossed size={18} />} 
            label="Mi Cocina" 
            isActive={isKitchenActive} 
            onClick={() => onNavigate({ name: 'profile' })} 
          />
        </nav>
      )}

      {/* 4. MOBILE DRAWER */}
      {isMobileDrawerOpen && currentUser && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
          <div className="w-72 bg-white dark:bg-zinc-900 h-full p-6 shadow-2xl flex flex-col justify-between border-l border-zinc-200 dark:border-zinc-800 space-y-6 overflow-y-auto">
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-zinc-100 dark:border-zinc-800">
                <TouChefLogo size="md" />
                <button onClick={() => setIsMobileDrawerOpen(false)} className="text-zinc-400 hover:text-white p-1">
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-2">
                <MasterHubNavItem 
                  icon={<Flame size={18} className="text-[#E07A5F]" />} 
                  label="1. Hoy / En Vivo" 
                  subtitle="Lote activo y fuegos"
                  isActive={isTodayActive} 
                  onClick={() => { setIsMobileDrawerOpen(false); onNavigate({ name: 'home' }); }} 
                />
                <MasterHubNavItem 
                  icon={<Sparkles size={18} className="text-[#F4A261]" />} 
                  label="2. Planificador & Menú" 
                  subtitle="IA y raciones semanales"
                  isActive={isPlannerActive} 
                  onClick={() => { setIsMobileDrawerOpen(false); onNavigate({ name: 'ai-generator' }); }} 
                />
                <MasterHubNavItem 
                  icon={<ChefHat size={18} className="text-amber-400" />} 
                  label="3. Chefs & Compra DIA" 
                  subtitle="Chefs a domicilio y súper DIA"
                  isActive={isChefsDiaActive} 
                  onClick={() => { setIsMobileDrawerOpen(false); onNavigate({ name: 'chefs' }); }} 
                />
                <MasterHubNavItem 
                  icon={<UtensilsCrossed size={18} className="text-emerald-400" />} 
                  label="4. Mi Cocina & Ajustes" 
                  subtitle="Hogar, fogones y contrato"
                  isActive={isKitchenActive} 
                  onClick={() => { setIsMobileDrawerOpen(false); onNavigate({ name: 'profile' }); }} 
                />
              </div>
            </div>

            <div className="text-xs text-zinc-500 text-center">TouChef 2026</div>
          </div>
        </div>
      )}

    </div>
  );
}

// Master Hub Sidebar Nav Item
function MasterHubNavItem({
  icon,
  label,
  subtitle,
  badge,
  isActive,
  onClick
}: {
  icon: React.ReactNode;
  label: string;
  subtitle?: string;
  badge?: string;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full p-3.5 rounded-2xl text-left transition-all flex items-center justify-between group cursor-pointer ${
        isActive 
          ? 'btn-hero-copper text-white shadow-md' 
          : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800/70'
      }`}
    >
      <div className="flex items-center gap-3 min-w-0 pr-1">
        <div className={`p-2 rounded-xl shrink-0 ${isActive ? 'bg-white/20 text-white' : 'bg-zinc-100 dark:bg-zinc-800'}`}>
          {icon}
        </div>
        <div className="min-w-0">
          <strong className="text-xs block font-bold truncate">{label}</strong>
          {subtitle && (
            <span className={`text-[10px] block truncate ${isActive ? 'text-white/80' : 'text-zinc-400'}`}>
              {subtitle}
            </span>
          )}
        </div>
      </div>

      {badge && (
        <span className={`text-[9px] font-black px-2 py-0.5 rounded-md uppercase tracking-wider shrink-0 ${
          isActive ? 'bg-white/20 text-white' : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-400'
        }`}>
          {badge}
        </span>
      )}
    </button>
  );
}

// Mobile Bottom Nav Bar Item
function MobileTabItem({ 
  icon, 
  label, 
  isActive, 
  badge,
  onClick 
}: { 
  icon: React.ReactNode; 
  label: string; 
  isActive: boolean; 
  badge?: string;
  onClick: () => void; 
}) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center justify-center p-1.5 rounded-xl text-[10px] font-bold transition-all relative cursor-pointer ${
        isActive ? 'text-[#E07A5F] dark:text-[#F4A261]' : 'text-zinc-400'
      }`}
    >
      <div className="relative">
        {icon}
        {badge && (
          <span className="absolute -top-1 -right-2 w-4 h-4 bg-amber-500 text-stone-950 rounded-full text-[9px] font-black flex items-center justify-center">
            {badge}
          </span>
        )}
      </div>
      <span className="mt-0.5 text-[9px]">{label}</span>
    </button>
  );
}
