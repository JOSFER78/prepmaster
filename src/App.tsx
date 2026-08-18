import { useState, useEffect } from 'react';
import { ViewState, GeneratedMenuPlan, SimulatorContext, BatchProject, BatchStatus } from './types';
import { Layout } from './components/Layout';
import { LandingView } from './views/LandingView';
import { HomeView } from './views/HomeView';
import { PlannerView } from './views/PlannerView';
import { RecipeView } from './views/RecipeView';
import { BatchSessionView } from './views/BatchSessionView';
import { AIGeneratorView } from './views/AIGeneratorView';
import { ShoppingListView } from './views/ShoppingListView';
import { InteractiveCookView } from './views/InteractiveCookView';
import { ReferenceRAGView } from './views/ReferenceRAGView';
import { ProfileView } from './views/ProfileView';
import { AuthModal } from './components/AuthModal';
import { auth, db, onAuthStateChanged, signInAnonymously, User } from './lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { 
  loadBatchProjectsFromStorage, 
  saveBatchProjectsToStorage, 
  cloneBatchProjectAsNew,
  consumeDishPortion
} from './lib/batchProjects';

export default function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [authInitialized, setAuthInitialized] = useState<boolean>(false);
  const [currentView, setCurrentView] = useState<ViewState>({ name: 'landing' });
  const [activeApprovedPlan, setActiveApprovedPlan] = useState<GeneratedMenuPlan | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'register'>('login');

  // Batch Projects System (Active Project & Batch History)
  const [batchProjects, setBatchProjects] = useState<BatchProject[]>(() => loadBatchProjectsFromStorage());

  const activeProject = batchProjects.find(p => p.status !== 'archived') || null;
  const batchHistory = batchProjects.filter(p => p.status === 'archived');

  const handleSaveProjects = (updated: BatchProject[]) => {
    setBatchProjects(updated);
    saveBatchProjectsToStorage(updated);

    if (currentUser) {
      setDoc(doc(db, 'users', currentUser.uid), {
        batchProjects: updated,
        updatedAt: new Date().toISOString()
      }, { merge: true }).catch(console.error);
    }
  };

  const handleUpdateActiveProjectStatus = (newStatus: BatchStatus) => {
    if (!activeProject) return;
    const updated = batchProjects.map(p => 
      p.id === activeProject.id ? { 
        ...p, 
        status: newStatus,
        cookedAt: newStatus === 'in_fridge' ? new Date().toISOString() : p.cookedAt,
        archivedAt: newStatus === 'archived' ? new Date().toISOString() : p.archivedAt
      } : p
    );
    handleSaveProjects(updated);
  };

  const handleToggleShoppingItem = (itemId: string) => {
    if (!activeProject) return;
    const updated = batchProjects.map(p => {
      if (p.id === activeProject.id) {
        const updatedShop = p.shoppingList.map(item => 
          item.id === itemId ? { ...item, isBought: !item.isBought } : item
        );
        const allBought = updatedShop.every(i => i.isBought);
        return { 
          ...p, 
          shoppingList: updatedShop,
          status: allBought && p.status === 'shopping' ? 'ready_to_cook' : p.status
        };
      }
      return p;
    });
    handleSaveProjects(updated);
  };

  const handleRateDish = (dishId: string, rating: number, isFavorite?: boolean) => {
    const updated = batchProjects.map(p => ({
      ...p,
      dishes: p.dishes.map(d => 
        d.id === dishId ? { ...d, rating, isFavorite: isFavorite !== undefined ? isFavorite : d.isFavorite } : d
      )
    }));
    handleSaveProjects(updated);
  };

  const handleConsumePortion = (dishId: string, count: number = 1) => {
    if (!activeProject) return;
    const updated = batchProjects.map(p => {
      if (p.id === activeProject.id) {
        const updatedDishes = p.dishes.map(d => 
          d.id === dishId ? consumeDishPortion(d, count) : d
        );
        const totalConsumed = updatedDishes.reduce((acc, d) => acc + (d.consumedPortions || 0), 0);
        return {
          ...p,
          dishes: updatedDishes,
          totalConsumedServings: totalConsumed
        };
      }
      return p;
    });
    handleSaveProjects(updated);
  };

  const handleUpdateDishServings = (dishId: string, delta: number) => {
    if (!activeProject) return;
    const updated = batchProjects.map(p => {
      if (p.id === activeProject.id) {
        const updatedDishes = p.dishes.map(d => {
          if (d.id === dishId) {
            const newServings = Math.max(1, d.servings + delta);
            return {
              ...d,
              servings: newServings,
              fridgePortions: Math.round(newServings * 0.6),
              freezerPortions: Math.max(0, newServings - Math.round(newServings * 0.6))
            };
          }
          return d;
        });
        const totalServings = updatedDishes.reduce((acc, d) => acc + d.servings, 0);
        return {
          ...p,
          dishes: updatedDishes,
          totalServings
        };
      }
      return p;
    });
    handleSaveProjects(updated);
  };

  const handleUpdateShoppingDate = (dateStr: string) => {
    if (!activeProject) return;
    const updated = batchProjects.map(p => 
      p.id === activeProject.id ? { ...p, plannedShoppingDate: dateStr } : p
    );
    handleSaveProjects(updated);
  };

  const handleRepeatBatch = (sourceBatch: BatchProject) => {
    const newProject = cloneBatchProjectAsNew(sourceBatch);
    const updated = [newProject, ...batchProjects.map(p => p.status !== 'archived' ? { ...p, status: 'archived' as const } : p)];
    handleSaveProjects(updated);
    setCurrentView({ name: 'shopping-list' });
  };

  const handleBatchProjectCreated = (newProject: BatchProject) => {
    const updated = [newProject, ...batchProjects.map(p => p.status !== 'archived' ? { ...p, status: 'archived' as const } : p)];
    handleSaveProjects(updated);
    setCurrentView({ name: 'shopping-list' });
  };

  // Shared Simulator Context (Sync between Landing & App)
  const [simulatorContext, setSimulatorContext] = useState<SimulatorContext | null>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('prepmaster_sim_context');
        if (saved) return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved sim context', e);
      }
    }
    return {
      peopleCount: 4,
      daysCount: 5,
      mealCoverage: 'both',
      dietStyle: 'mediterranean',
      totalServings: 40
    };
  });

  const handleUpdateSimulatorContext = (ctx: SimulatorContext) => {
    setSimulatorContext(ctx);
    try {
      localStorage.setItem('prepmaster_sim_context', JSON.stringify(ctx));
    } catch (e) {
      console.error('Failed to store sim context', e);
    }

    if (currentUser) {
      setDoc(doc(db, 'users', currentUser.uid), {
        simulatorContext: ctx,
        peopleCount: ctx.peopleCount,
        coverageDays: ctx.daysCount,
        updatedAt: new Date().toISOString()
      }, { merge: true }).catch(console.error);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (!authInitialized) {
        setAuthInitialized(true);
        if (user) {
          try {
            const userDoc = await getDoc(doc(db, 'users', user.uid));
            if (userDoc.exists()) {
              const data = userDoc.data();
              if (data.simulatorContext) setSimulatorContext(data.simulatorContext);
              if (data.batchProjects && Array.isArray(data.batchProjects)) {
                setBatchProjects(data.batchProjects);
              }
            }
          } catch (err) {
            console.error('Error fetching user profile:', err);
          }
          setCurrentView({ name: 'home' });
        }
      }
    });

    return () => unsubscribe();
  }, [authInitialized]);

  const handleOpenAuth = (mode: 'login' | 'register' = 'login', pendingContext?: SimulatorContext) => {
    if (pendingContext) {
      handleUpdateSimulatorContext(pendingContext);
    }
    setAuthModalMode(mode);
    setIsAuthModalOpen(true);
  };

  const handleEnterAsGuest = async (context?: SimulatorContext) => {
    if (context) {
      handleUpdateSimulatorContext(context);
    }
    try {
      if (!currentUser) {
        await signInAnonymously(auth);
      }
      setCurrentView({ name: 'home' });
    } catch (err) {
      console.error('Guest login error:', err);
      setCurrentView({ name: 'home' });
    }
  };

  const isLandingView = currentView.name === 'landing';
  const shouldHideAppNav = isLandingView;

  return (
    <>
      {isLandingView ? (
        <LandingView 
          onOpenAuth={handleOpenAuth} 
          onEnterAsGuest={handleEnterAsGuest}
          onNavigate={setCurrentView}
          initialSimulatorContext={simulatorContext}
          onSimulatorContextChange={handleUpdateSimulatorContext}
        />
      ) : (
        <Layout 
          currentView={currentView} 
          onNavigate={setCurrentView} 
          hideNav={shouldHideAppNav}
          activeProject={activeProject}
          onOpenAuth={handleOpenAuth}
          currentUser={currentUser}
        >

          {currentView.name === 'home' && (
            <HomeView 
              onNavigate={setCurrentView} 
              simulatorContext={simulatorContext}
              activeProject={activeProject}
              batchHistory={batchHistory}
              onRepeatBatch={handleRepeatBatch}
              onUpdateActiveProjectStatus={handleUpdateActiveProjectStatus}
              onRateDish={handleRateDish}
              onArchiveActiveBatch={() => handleUpdateActiveProjectStatus('archived')}
              onConsumePortion={handleConsumePortion}
            />
          )}
          
          {currentView.name === 'profile' && (
            <ProfileView onPeopleCountChange={(count) => {
              if (simulatorContext) {
                handleUpdateSimulatorContext({ ...simulatorContext, peopleCount: count });
              }
            }} />
          )}

          {currentView.name === 'planner' && (
            <PlannerView 
              onNavigate={setCurrentView} 
              currentMenuPlan={activeApprovedPlan} 
              activeProject={activeProject}
              onUpdateDishServings={handleUpdateDishServings}
            />
          )}
          
          {currentView.name === 'recipe' && <RecipeView onNavigate={setCurrentView} />}
          
          {currentView.name === 'batch-session' && <InteractiveCookView onBack={() => setCurrentView({ name: 'home' })} activeProject={activeProject} onFinishCooking={() => {
            handleUpdateActiveProjectStatus('in_fridge');
            setCurrentView({ name: 'home' });
          }} />}
          
          {currentView.name === 'ai-generator' && (
            <AIGeneratorView 
              onMenuApproved={setActiveApprovedPlan} 
              onNavigateToShopping={() => setCurrentView({ name: 'shopping-list' })} 
              initialContext={simulatorContext}
              onBatchProjectCreated={(proj) => {
                handleBatchProjectCreated(proj);
                setCurrentView({ name: 'shopping-list' });
              }}
            />
          )}

          {currentView.name === 'shopping-list' && (
            <ShoppingListView 
              activeProject={activeProject}
              onNavigateToInteractiveCook={() => setCurrentView({ name: 'interactive-cook' })}
              onNavigateToGenerator={() => setCurrentView({ name: 'ai-generator' })}
              onToggleItemBought={handleToggleShoppingItem}
              onAdvanceToCooking={() => {
                handleUpdateActiveProjectStatus('ready_to_cook');
                setCurrentView({ name: 'interactive-cook' });
              }}
              onUpdateShoppingDate={handleUpdateShoppingDate}
            />
          )}

          {currentView.name === 'interactive-cook' && (
            <InteractiveCookView 
              dishName={currentView.dishName} 
              activeProject={activeProject}
              onFinishCooking={() => {
                handleUpdateActiveProjectStatus('in_fridge');
                setCurrentView({ name: 'home' });
              }}
              onBack={() => setCurrentView({ name: 'home' })} 
            />
          )}

          {currentView.name === 'reference-rag' && <ReferenceRAGView />}

          {currentView.name === 'explore' && <ReferenceRAGView />}
        </Layout>
      )}

      {/* Global Authentication Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialMode={authModalMode}
        onSuccess={() => {
          if (simulatorContext && currentUser) {
            setDoc(doc(db, 'users', currentUser.uid), {
              simulatorContext,
              peopleCount: simulatorContext.peopleCount,
              coverageDays: simulatorContext.daysCount,
              updatedAt: new Date().toISOString()
            }, { merge: true }).catch(console.error);
          }
          setCurrentView({ name: 'home' });
        }}
      />
    </>
  );
}
