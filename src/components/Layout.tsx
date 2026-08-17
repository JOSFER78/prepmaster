import React, { useState } from 'react';
import { 
  Home, 
  Sparkles, 
  Layers, 
  ShoppingBag, 
  ChefHat, 
  Menu, 
  X, 
  Refrigerator, 
  BookOpen, 
  User, 
  ChevronRight, 
  Check,
  ChevronDown,
  ShieldCheck
} from 'lucide-react';
import { ViewState } from '../types';
import { currentUser } from '../data';

interface LayoutProps {
  children: React.ReactNode;
  currentView: ViewState;
  onNavigate: (view: ViewState) => void;
  hideNav?: boolean;
}

type MenuCategory = 'home' | 'menus' | 'shopping' | 'cook' | 'all' | null;

export function Layout({ children, currentView, onNavigate, hideNav = false }: LayoutProps) {
  const [activeCategorySheet, setActiveCategorySheet] = useState<MenuCategory>(null);

  const handleMenuNavigate = (view: ViewState) => {
    onNavigate(view);
    setActiveCategorySheet(null);
  };

  const toggleCategorySheet = (category: MenuCategory) => {
    if (activeCategorySheet === category) {
      setActiveCategorySheet(null);
    } else {
      setActiveCategorySheet(category);
    }
  };

  // Helper to get active section & current view title info for the sticky top bar
  const getSubMenuHeaderInfo = () => {
    switch (currentView.name) {
      case 'home':
        return {
          categoryLabel: 'SECCIÓN INICIO',
          viewLabel: 'Panel Resumen PrepMaster',
          icon: <Home size={14} className="text-primary" />,
          category: 'home' as MenuCategory
        };
      case 'profile':
        return {
          categoryLabel: 'INICIO & PERFIL',
          viewLabel: 'Perfil & Tokens Firebase',
          icon: <User size={14} className="text-slate-700" />,
          category: 'home' as MenuCategory
        };
      case 'ai-generator':
        return {
          categoryLabel: 'MENÚS & RACIONES',
          viewLabel: 'Generador IA por Raciones',
          icon: <Sparkles size={14} className="text-primary" />,
          category: 'menus' as MenuCategory
        };
      case 'planner':
        return {
          categoryLabel: 'MENÚS & RACIONES',
          viewLabel: 'Planificador Volumen Total',
          icon: <Layers size={14} className="text-secondary" />,
          category: 'menus' as MenuCategory
        };
      case 'explore':
      case 'recipe':
        return {
          categoryLabel: 'MENÚS & RACIONES',
          viewLabel: 'Canales & Recetas de Autor',
          icon: <BookOpen size={14} className="text-rose-700" />,
          category: 'menus' as MenuCategory
        };
      case 'shopping-list':
        return {
          categoryLabel: 'COMPRA & DESPENSA',
          viewLabel: 'Lista de Compra Consolidada',
          icon: <ShoppingBag size={14} className="text-emerald-700" />,
          category: 'shopping' as MenuCategory
        };
      case 'reference-rag':
        return {
          categoryLabel: 'COMPRA & DESPENSA',
          viewLabel: 'Stock Nevera & Despensa',
          icon: <Refrigerator size={14} className="text-indigo-700" />,
          category: 'shopping' as MenuCategory
        };
      case 'interactive-cook':
        return {
          categoryLabel: 'COCINA SIMULTÁNEA',
          viewLabel: 'Asistente de Fuegos en Vivo',
          icon: <ChefHat size={14} className="text-amber-700" />,
          category: 'cook' as MenuCategory
        };
      case 'batch-session':
        return {
          categoryLabel: 'COCINA SIMULTÁNEA',
          viewLabel: 'Sesión Batch con Timers',
          icon: <ChefHat size={14} className="text-primary" />,
          category: 'cook' as MenuCategory
        };
      default:
        return {
          categoryLabel: 'PREPMASTER',
          viewLabel: 'Panel Principal',
          icon: <Home size={14} className="text-primary" />,
          category: 'home' as MenuCategory
        };
    }
  };

  const headerInfo = getSubMenuHeaderInfo();

  const isHomeActive = currentView.name === 'home' || currentView.name === 'profile';
  const isMenusActive = currentView.name === 'ai-generator' || currentView.name === 'planner' || currentView.name === 'explore' || currentView.name === 'recipe';
  const isShoppingActive = currentView.name === 'shopping-list' || currentView.name === 'reference-rag';
  const isCookActive = currentView.name === 'interactive-cook' || currentView.name === 'batch-session';

  return (
    <div className="bg-surface text-on-surface flex flex-col min-h-screen font-sans">
      {!hideNav && (
        <header className="bg-surface/95 backdrop-blur-md shadow-xs w-full top-0 left-0 sticky z-40 border-b border-outline-variant/20">
          <div className="flex justify-between items-center px-3 py-1.5 max-w-[1280px] mx-auto">
            
            {/* LOGO & PROFILE LINK */}
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => onNavigate({ name: 'profile' })}>
              <div className="w-8 h-8 rounded-full overflow-hidden bg-surface-container-high border border-primary/30 shrink-0 relative">
                <img src={currentUser.avatar} alt="User" className="w-full h-full object-cover" />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border border-white rounded-full" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xs font-black text-primary flex items-center gap-1 leading-none">
                  PrepMaster <span className="text-[8px] bg-primary-container text-on-primary-container px-1.5 py-0.2 rounded-full font-bold">FIREBASE</span>
                </h1>
                <p className="text-[9px] text-on-surface-variant font-medium">¡Hola, {currentUser.name}!</p>
              </div>
            </div>

            {/* STICKY TOP SUBMENU INDICATOR (CLEARLY SHOWS WHERE YOU ARE IN SUBMENU) */}
            <div 
              onClick={() => toggleCategorySheet(headerInfo.category)}
              className="flex items-center gap-1.5 bg-surface-container/80 hover:bg-surface-container-high border border-outline-variant/40 px-2.5 py-1 rounded-2xl cursor-pointer transition-all active:scale-98"
            >
              <div className="w-5 h-5 rounded-lg bg-surface border border-outline-variant/30 flex items-center justify-center shrink-0">
                {headerInfo.icon}
              </div>
              <div className="text-left">
                <div className="text-[8px] font-black tracking-wider text-primary uppercase leading-none">
                  {headerInfo.categoryLabel}
                </div>
                <div className="text-[11px] font-extrabold text-on-surface leading-tight flex items-center gap-1">
                  <span>{headerInfo.viewLabel}</span>
                  <ChevronDown size={11} className="text-on-surface-variant shrink-0" />
                </div>
              </div>
            </div>

            {/* HAMBURGER & PROFILE BUTTONS */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => onNavigate({ name: 'profile' })}
                className="flex items-center gap-1 px-2 py-1 rounded-xl bg-surface-container border border-outline-variant/30 text-on-surface font-bold text-xs hover:bg-surface-container-high transition-all active:scale-95"
                title="Ver Perfil y Tokens Firebase"
              >
                <ShieldCheck size={14} className="text-emerald-700" />
                <span className="hidden md:inline text-[10px]">Perfil</span>
              </button>

              <button 
                onClick={() => toggleCategorySheet('all')}
                className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-primary text-on-primary font-bold text-xs shadow-xs hover:bg-primary/90 transition-all active:scale-95"
              >
                <Menu size={15} />
                <span className="hidden sm:inline">Menú</span>
              </button>
            </div>
          </div>
        </header>
      )}

      <main className={`flex-grow w-full max-w-[1280px] mx-auto ${hideNav ? '' : 'px-2.5 py-2 md:pl-[210px] pb-16 md:pb-2'}`}>
        {children}
      </main>

      {!hideNav && (
        <>
          {/* VERTICAL POPUP DRAWER SHEET FOR BOTTOM TABS AND HAMBURGER */}
          {activeCategorySheet && (
            <div className="fixed inset-0 z-50 flex flex-col justify-end bg-black/50 backdrop-blur-xs animate-fade-in">
              {/* Backdrop Click */}
              <div className="flex-1" onClick={() => setActiveCategorySheet(null)} />

              {/* Vertical Drawer Sheet Container (Consistent Styling Across All Categories) */}
              <div className="bg-surface border-t border-outline-variant/30 rounded-t-3xl p-4 space-y-3 shadow-xl max-h-[85vh] overflow-y-auto animate-slide-up">
                
                {/* SHEET HEADERS */}
                {activeCategorySheet === 'home' && (
                  <CategorySheetHeader 
                    icon={<Home className="text-primary" />} 
                    title="1. INICIO & MI PERFIL" 
                    subtitle="Resumen general de raciones, estado de nevera y tokens Firebase" 
                    onClose={() => setActiveCategorySheet(null)} 
                  />
                )}

                {activeCategorySheet === 'menus' && (
                  <CategorySheetHeader 
                    icon={<Sparkles className="text-primary" />} 
                    title="2. MENÚS & RACIONES" 
                    subtitle="Generación inteligente con IA por volumen total de raciones" 
                    onClose={() => setActiveCategorySheet(null)} 
                  />
                )}

                {activeCategorySheet === 'shopping' && (
                  <CategorySheetHeader 
                    icon={<ShoppingBag className="text-emerald-700" />} 
                    title="3. COMPRA & SUMINISTROS" 
                    subtitle="Lista consolidada de ingredientes y verificación de stock" 
                    onClose={() => setActiveCategorySheet(null)} 
                  />
                )}

                {activeCategorySheet === 'cook' && (
                  <CategorySheetHeader 
                    icon={<ChefHat className="text-amber-700" />} 
                    title="4. COCINA SIMULTÁNEA BATCH" 
                    subtitle="Orquestación paso a paso de fuegos paralelos y temporizadores" 
                    onClose={() => setActiveCategorySheet(null)} 
                  />
                )}

                {activeCategorySheet === 'all' && (
                  <CategorySheetHeader 
                    icon={<Menu className="text-primary" />} 
                    title="MENÚ COMPLETO PREPMASTER" 
                    subtitle="Estructura organizada con acceso directo a todas las secciones" 
                    onClose={() => setActiveCategorySheet(null)} 
                  />
                )}

                {/* OPTIONS LIST FOR ACTIVE CATEGORY */}
                <div className="space-y-1.5 py-1">
                  {/* CATEGORY: HOME */}
                  {activeCategorySheet === 'home' && (
                    <>
                      <DrawerItem
                        icon={<Home className="text-primary" />}
                        title="Panel Principal Resumen"
                        subtitle="Métricas globales de raciones en nevera y accesos directos"
                        isActive={currentView.name === 'home'}
                        onClick={() => handleMenuNavigate({ name: 'home' })}
                      />
                      <DrawerItem
                        icon={<User className="text-slate-700" />}
                        title="Perfil & Tokens Firebase"
                        subtitle="Gestión de autenticación, comensales y sesión de usuario"
                        isActive={currentView.name === 'profile'}
                        onClick={() => handleMenuNavigate({ name: 'profile' })}
                      />
                      <DrawerItem
                        icon={<Refrigerator className="text-indigo-700" />}
                        title="Stock Nevera & Despensa"
                        subtitle="Ingredientes disponibles y fechas de caducidad"
                        isActive={currentView.name === 'reference-rag'}
                        onClick={() => handleMenuNavigate({ name: 'reference-rag' })}
                      />
                    </>
                  )}

                  {/* CATEGORY: MENUS */}
                  {activeCategorySheet === 'menus' && (
                    <>
                      <DrawerItem
                        icon={<Sparkles className="text-primary" />}
                        title="Generador IA de Menús por Raciones"
                        subtitle="Calculador inteligente según antojos, comensales y nevera"
                        isActive={currentView.name === 'ai-generator'}
                        onClick={() => handleMenuNavigate({ name: 'ai-generator' })}
                      />
                      <DrawerItem
                        icon={<Layers className="text-secondary" />}
                        title="Planificador por Volumen de Raciones"
                        subtitle="Distribución y ajustes de porciones preparadas"
                        isActive={currentView.name === 'planner'}
                        onClick={() => handleMenuNavigate({ name: 'planner' })}
                      />
                      <DrawerItem
                        icon={<BookOpen className="text-rose-700" />}
                        title="Canales & Recetas de Autor"
                        subtitle="Estilos de referencia batch cooking de chefs"
                        isActive={currentView.name === 'explore'}
                        onClick={() => handleMenuNavigate({ name: 'explore' })}
                      />
                    </>
                  )}

                  {/* CATEGORY: SHOPPING */}
                  {activeCategorySheet === 'shopping' && (
                    <>
                      <DrawerItem
                        icon={<ShoppingBag className="text-emerald-700" />}
                        title="Lista de Compra Consolidada"
                        subtitle="Ingredientes agrupados por categoría restando lo que ya tienes"
                        isActive={currentView.name === 'shopping-list'}
                        onClick={() => handleMenuNavigate({ name: 'shopping-list' })}
                      />
                      <DrawerItem
                        icon={<Refrigerator className="text-indigo-700" />}
                        title="Comprobación de Inventario en Stock"
                        subtitle="Ajuste rápido de ingredientes disponibles"
                        isActive={currentView.name === 'reference-rag'}
                        onClick={() => handleMenuNavigate({ name: 'reference-rag' })}
                      />
                    </>
                  )}

                  {/* CATEGORY: COOK */}
                  {activeCategorySheet === 'cook' && (
                    <>
                      <DrawerItem
                        icon={<ChefHat className="text-amber-700" />}
                        title="Asistente de Fuegos en Vivo"
                        subtitle="Secuencia optimizada de fuegos en paralelo y comandos de voz"
                        isActive={currentView.name === 'interactive-cook'}
                        onClick={() => handleMenuNavigate({ name: 'interactive-cook' })}
                      />
                      <DrawerItem
                        icon={<Layers className="text-primary" />}
                        title="Sesión Batch Cooking con Temporizadores"
                        subtitle="Paso a paso de cocinado masivo con pantalla encendida"
                        isActive={currentView.name === 'batch-session'}
                        onClick={() => handleMenuNavigate({ name: 'batch-session' })}
                      />
                    </>
                  )}

                  {/* CATEGORY: ALL (MENU HAMBURGUESA COMPLETO) */}
                  {activeCategorySheet === 'all' && (
                    <>
                      <div className="text-[10px] font-black text-primary uppercase tracking-wider px-1 pt-1">
                        1. INICIO & PERFIL
                      </div>
                      <DrawerItem
                        icon={<Home className="text-primary" />}
                        title="Inicio - Resumen de Raciones"
                        subtitle="Vista rápida de raciones preparadas y accesos"
                        isActive={currentView.name === 'home'}
                        onClick={() => handleMenuNavigate({ name: 'home' })}
                      />
                      <DrawerItem
                        icon={<User className="text-slate-700" />}
                        title="Perfil & Tokens Firebase"
                        subtitle="Credenciales de acceso, comensales y sincronización"
                        isActive={currentView.name === 'profile'}
                        onClick={() => handleMenuNavigate({ name: 'profile' })}
                      />

                      <div className="text-[10px] font-black text-primary uppercase tracking-wider px-1 pt-2">
                        2. MENÚS & RACIONES
                      </div>
                      <DrawerItem
                        icon={<Sparkles className="text-primary" />}
                        title="Generador IA de Raciones"
                        subtitle="Crea tu menú por bloques totales sin días fijos"
                        isActive={currentView.name === 'ai-generator'}
                        onClick={() => handleMenuNavigate({ name: 'ai-generator' })}
                      />
                      <DrawerItem
                        icon={<Layers className="text-secondary" />}
                        title="Planificador de Volumen Total"
                        subtitle="Gestión del bloque global de porciones (ej: 25 rac)"
                        isActive={currentView.name === 'planner'}
                        onClick={() => handleMenuNavigate({ name: 'planner' })}
                      />
                      <DrawerItem
                        icon={<BookOpen className="text-rose-700" />}
                        title="Canales y Recetas de Autor"
                        subtitle="Inspiración y técnicas de cocinado masivo"
                        isActive={currentView.name === 'explore'}
                        onClick={() => handleMenuNavigate({ name: 'explore' })}
                      />

                      <div className="text-[10px] font-black text-primary uppercase tracking-wider px-1 pt-2">
                        3. COMPRA & SUMINISTROS
                      </div>
                      <DrawerItem
                        icon={<ShoppingBag className="text-emerald-700" />}
                        title="Lista de Compra Consolidada"
                        subtitle="Ingredientes optimizados para las raciones"
                        isActive={currentView.name === 'shopping-list'}
                        onClick={() => handleMenuNavigate({ name: 'shopping-list' })}
                      />
                      <DrawerItem
                        icon={<Refrigerator className="text-indigo-700" />}
                        title="Stock Nevera & Despensa"
                        subtitle="Control de ingredientes en casa"
                        isActive={currentView.name === 'reference-rag'}
                        onClick={() => handleMenuNavigate({ name: 'reference-rag' })}
                      />

                      <div className="text-[10px] font-black text-primary uppercase tracking-wider px-1 pt-2">
                        4. COCINA SIMULTÁNEA
                      </div>
                      <DrawerItem
                        icon={<ChefHat className="text-amber-700" />}
                        title="Asistente de Cocina Simultánea"
                        subtitle="Orquestación de fuegos paralelos y voz"
                        isActive={currentView.name === 'interactive-cook'}
                        onClick={() => handleMenuNavigate({ name: 'interactive-cook' })}
                      />
                    </>
                  )}
                </div>

                {/* Footer Action */}
                <div className="pt-2 border-t border-outline-variant/20 flex justify-center">
                  <button
                    onClick={() => setActiveCategorySheet(null)}
                    className="w-full bg-surface-container border border-outline-variant/30 text-on-surface font-bold text-xs py-2 rounded-xl active:scale-98 transition-all"
                  >
                    Cerrar Menú
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* FIXED BOTTOM NAVIGATION BAR WITH 5 DISTINCT CATEGORIES & CLEAR ACTIVE ICON */}
          <nav className="bg-surface/95 backdrop-blur-md shadow-[0_-2px_10px_rgba(0,0,0,0.08)] fixed bottom-0 w-full z-40 flex justify-around items-center px-1 py-1 md:hidden pb-safe border-t border-outline-variant/20">
            <NavItem 
              icon={<Home />} 
              label="Inicio" 
              isActive={isHomeActive || activeCategorySheet === 'home'} 
              onClick={() => toggleCategorySheet('home')} 
            />
            <NavItem 
              icon={<Sparkles />} 
              label="Plan" 
              isActive={isMenusActive || activeCategorySheet === 'menus'} 
              onClick={() => toggleCategorySheet('menus')} 
            />
            <NavItem 
              icon={<ShoppingBag />} 
              label="Compra" 
              isActive={isShoppingActive || activeCategorySheet === 'shopping'} 
              onClick={() => toggleCategorySheet('shopping')} 
            />
            <NavItem 
              icon={<ChefHat />} 
              label="Cocina" 
              isActive={isCookActive || activeCategorySheet === 'cook'} 
              onClick={() => toggleCategorySheet('cook')} 
            />
            <NavItem 
              icon={<Menu />} 
              label="Menú" 
              isActive={activeCategorySheet === 'all'} 
              onClick={() => toggleCategorySheet('all')} 
            />
          </nav>

          {/* DESKTOP SIDEBAR WITH CLEAR STRUCTURAL SECTIONS */}
          <aside className="hidden md:flex flex-col bg-surface-container w-[195px] fixed top-[49px] bottom-0 left-0 p-2.5 border-r border-outline-variant/20 z-30 overflow-y-auto">
            <div className="space-y-3">
              <div>
                <span className="text-[10px] font-black text-on-surface-variant uppercase tracking-wider px-2 block mb-1">
                  1. Inicio & Cuenta
                </span>
                <nav className="flex flex-col gap-0.5">
                  <DesktopNavItem 
                    icon={<Home />} 
                    label="Inicio Resumen" 
                    isActive={currentView.name === 'home'} 
                    onClick={() => onNavigate({ name: 'home' })} 
                  />
                  <DesktopNavItem 
                    icon={<User />} 
                    label="Perfil & Tokens" 
                    isActive={currentView.name === 'profile'} 
                    onClick={() => onNavigate({ name: 'profile' })} 
                  />
                </nav>
              </div>

              <div>
                <span className="text-[10px] font-black text-on-surface-variant uppercase tracking-wider px-2 block mb-1">
                  2. Plan Raciones
                </span>
                <nav className="flex flex-col gap-0.5">
                  <DesktopNavItem 
                    icon={<Sparkles />} 
                    label="Generar Raciones" 
                    isActive={currentView.name === 'ai-generator'} 
                    onClick={() => onNavigate({ name: 'ai-generator' })} 
                  />
                  <DesktopNavItem 
                    icon={<Layers />} 
                    label="Plan de Volumen" 
                    isActive={currentView.name === 'planner'} 
                    onClick={() => onNavigate({ name: 'planner' })} 
                  />
                  <DesktopNavItem 
                    icon={<BookOpen />} 
                    label="Recetas Autor" 
                    isActive={currentView.name === 'explore'} 
                    onClick={() => onNavigate({ name: 'explore' })} 
                  />
                </nav>
              </div>

              <div>
                <span className="text-[10px] font-black text-on-surface-variant uppercase tracking-wider px-2 block mb-1">
                  3. Suministros
                </span>
                <nav className="flex flex-col gap-0.5">
                  <DesktopNavItem 
                    icon={<ShoppingBag />} 
                    label="Lista Compra" 
                    isActive={currentView.name === 'shopping-list'} 
                    onClick={() => onNavigate({ name: 'shopping-list' })} 
                  />
                  <DesktopNavItem 
                    icon={<Refrigerator />} 
                    label="Stock Nevera" 
                    isActive={currentView.name === 'reference-rag'} 
                    onClick={() => onNavigate({ name: 'reference-rag' })} 
                  />
                </nav>
              </div>

              <div>
                <span className="text-[10px] font-black text-on-surface-variant uppercase tracking-wider px-2 block mb-1">
                  4. Ejecución
                </span>
                <nav className="flex flex-col gap-0.5">
                  <DesktopNavItem 
                    icon={<ChefHat />} 
                    label="Cocina Simultánea" 
                    isActive={currentView.name === 'interactive-cook'} 
                    onClick={() => onNavigate({ name: 'interactive-cook' })} 
                  />
                </nav>
              </div>

              <button
                onClick={() => toggleCategorySheet('all')}
                className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-bold text-primary bg-primary/10 hover:bg-primary/20 transition-colors mt-2"
              >
                <div className="flex items-center gap-2">
                  <Menu size={16} />
                  <span>Submenús</span>
                </div>
                <ChevronRight size={14} />
              </button>
            </div>
          </aside>
        </>
      )}
    </div>
  );
}

function CategorySheetHeader({ icon, title, subtitle, onClose }: { icon: React.ReactNode, title: string, subtitle: string, onClose: () => void }) {
  return (
    <div className="flex items-center justify-between border-b border-outline-variant/20 pb-2.5">
      <div className="flex items-center gap-2">
        <div className="w-9 h-9 rounded-xl bg-surface border border-outline-variant/30 flex items-center justify-center shrink-0">
          {React.cloneElement(icon as React.ReactElement, { size: 20 })}
        </div>
        <div>
          <h2 className="text-xs font-black text-on-surface leading-tight">{title}</h2>
          <p className="text-[10px] text-on-surface-variant leading-none mt-0.5">{subtitle}</p>
        </div>
      </div>
      <button
        onClick={onClose}
        className="w-7 h-7 rounded-full bg-surface-container border border-outline-variant/30 flex items-center justify-center text-on-surface hover:bg-surface-container-high transition-colors"
      >
        <X size={16} />
      </button>
    </div>
  );
}

function NavItem({ icon, label, isActive, onClick }: { icon: React.ReactNode, label: string, isActive: boolean, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={`flex flex-col items-center justify-center rounded-xl px-2.5 py-1 active:scale-95 transition-all duration-150 ${
        isActive ? 'bg-primary-container text-on-primary-container font-black shadow-2xs' : 'text-on-surface-variant hover:text-on-surface'
      }`}
    >
      {React.cloneElement(icon as React.ReactElement, { size: 19, strokeWidth: isActive ? 2.5 : 2 })}
      <span className="text-[9px] mt-0.5 leading-none font-bold">{label}</span>
    </button>
  );
}

function DrawerItem({ icon, title, subtitle, isActive, onClick }: { icon: React.ReactNode, title: string, subtitle: string, isActive: boolean, onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center justify-between p-2.5 rounded-2xl border transition-all text-left ${
        isActive 
          ? 'bg-primary-container/40 border-primary/40 shadow-2xs' 
          : 'bg-surface-container/60 border-outline-variant/30 hover:bg-surface-container-high active:scale-98'
      }`}
    >
      <div className="flex items-center gap-3 min-w-0">
        <div className="w-8 h-8 rounded-xl bg-surface border border-outline-variant/30 flex items-center justify-center shrink-0">
          {React.cloneElement(icon as React.ReactElement, { size: 18 })}
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-1.5">
            <h4 className="text-xs font-bold text-on-surface leading-tight truncate">{title}</h4>
            {isActive && (
              <span className="bg-primary text-on-primary text-[8px] font-black px-1.5 py-0.2 rounded-full flex items-center gap-0.5">
                <Check size={9} /> ACTIVO
              </span>
            )}
          </div>
          <p className="text-[10px] text-on-surface-variant truncate mt-0.5">{subtitle}</p>
        </div>
      </div>
      <ChevronRight size={16} className="text-on-surface-variant shrink-0" />
    </button>
  );
}

function DesktopNavItem({ icon, label, isActive, onClick }: { icon: React.ReactNode, label: string, isActive: boolean, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-bold transition-colors w-full ${
        isActive ? 'bg-primary-container text-on-primary-container' : 'text-on-surface-variant hover:bg-surface-container-highest'
      }`}
    >
      {React.cloneElement(icon as React.ReactElement, { size: 16, strokeWidth: isActive ? 2.5 : 2 })}
      {label}
    </button>
  );
}
