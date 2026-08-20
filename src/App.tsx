import { useState, useEffect } from 'react';
import { 
  ViewState, 
  GeneratedMenuPlan, 
  MealPlanConfig, 
  BatchProject, 
  BatchStatus,
  ChefBookingRequest,
  ChefProfile,
  BatchDish,
  ChefServicePackage
} from './types';
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
import { ChefDirectoryView } from './views/ChefDirectoryView';
import { MyBookingsView } from './views/MyBookingsView';
import { SupermarketCheckoutView } from './views/SupermarketCheckoutView';
import { ChefPortalView } from './views/ChefPortalView';
import { SuperAdminView } from './views/SuperAdminView';
import { AuthModal } from './components/AuthModal';
import { CreateChefRequestModal } from './components/CreateChefRequestModal';
import { ChefDetailModal } from './components/ChefDetailModal';
import { ChefOnboardingModal } from './components/ChefOnboardingModal';
import { CookieBanner } from './components/CookieBanner';
import { LegalModals } from './components/LegalModals';
import { auth, db, onAuthStateChanged, signInAnonymously, User } from './lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { 
  cloneBatchProjectAsNew,
  consumeDishPortion
} from './lib/batchProjects';
import { 
  BOOTSTRAP_CHEF_PROFILE,
  APPROVED_CHEFS 
} from './lib/chefsData';
import { 
  loadFavoriteBatchesFromStorage, 
  loadFavoriteDishesFromStorage, 
  saveFavoriteBatchesToStorage, 
  saveFavoriteDishesToStorage 
} from './lib/favoritesEngine';
import { 
  subscribeToBookings, 
  saveBooking 
} from './services/bookingService';
import { 
  subscribeToUserBatchProjects, 
  saveBatchProject,
  deleteBatchProject
} from './services/batchProjectService';

export default function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [authInitialized, setAuthInitialized] = useState<boolean>(false);
  const [currentView, setCurrentView] = useState<ViewState>({ name: 'landing' });
  const [activeApprovedPlan, setActiveApprovedPlan] = useState<GeneratedMenuPlan | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'register'>('login');

  // Legal Modals state
  const [activeLegalModal, setActiveLegalModal] = useState<'privacy' | 'terms' | 'cookies' | null>(null);

  // Batch Projects System (Active Project & Batch History - Persisted in localStorage / Firestore)
  const [batchProjects, setBatchProjects] = useState<BatchProject[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('touchef_batch_projects_v2');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed)) return parsed;
        } catch (e) {
          console.error('Error parsing stored batch projects:', e);
        }
      }
    }
    return [];
  });

  // Favorites & Vault System (Batches & Individual Dishes derived from Carmen SSOT)
  const [favoriteBatches, setFavoriteBatches] = useState<BatchProject[]>(() => loadFavoriteBatchesFromStorage());
  const [favoriteDishes, setFavoriteDishes] = useState<BatchDish[]>(() => loadFavoriteDishesFromStorage());

  // Chef Marketplace & Bookings State (Real-time Firestore)
  const [chefBookings, setChefBookings] = useState<ChefBookingRequest[]>([]);
  const [isChefBookingModalOpen, setIsChefBookingModalOpen] = useState(false);
  const [chefBookingInitialPackage, setChefBookingInitialPackage] = useState<ChefServicePackage>('with_grocery');
  const [selectedChefForBooking, setSelectedChefForBooking] = useState<ChefProfile | null>(null);
  const [selectedChefForDetailModal, setSelectedChefForDetailModal] = useState<ChefProfile | null>(null);
  const [isChefDetailModalOpen, setIsChefDetailModalOpen] = useState<boolean>(false);
  const [isChefOnboardingOpen, setIsChefOnboardingOpen] = useState<boolean>(false);

  const activeProject = batchProjects.find(p => p.status !== 'archived') || null;
  const batchHistory = batchProjects.filter(p => p.status === 'archived');

  // Suscripción reactiva en tiempo real a las reservas de Firestore
  useEffect(() => {
    const unsub = subscribeToBookings((loaded) => {
      setChefBookings(loaded);
    });
    return () => unsub();
  }, []);

  // Suscripción a proyectos del usuario activo
  useEffect(() => {
    if (!currentUser) return;
    const unsub = subscribeToUserBatchProjects(currentUser.uid, (projects) => {
      setBatchProjects(projects);
      if (typeof window !== 'undefined') {
        localStorage.setItem('touchef_batch_projects_v2', JSON.stringify(projects));
      }
    });
    return () => unsub();
  }, [currentUser]);

  useEffect(() => {
    if (currentView.name === 'create-chef-request') {
      const chefId = (currentView as any).chefId;
      if (chefId) {
        const found = APPROVED_CHEFS.find(c => c.id === chefId) || null;
        setSelectedChefForBooking(found);
      } else {
        setSelectedChefForBooking(null);
      }
      setIsChefBookingModalOpen(true);
      setCurrentView({ name: 'home' });
    }
  }, [currentView]);

  const handleSaveProjects = (updated: BatchProject[]) => {
    setBatchProjects(updated);
    if (typeof window !== 'undefined') {
      localStorage.setItem('touchef_batch_projects_v2', JSON.stringify(updated));
    }
    if (currentUser) {
      updated.forEach(p => {
        saveBatchProject(currentUser.uid, p).catch(console.error);
      });
    }
  };

  const handleDeleteBatchProject = async (projectId: string) => {
    const updated = batchProjects.filter(p => p.id !== projectId);
    setBatchProjects(updated);
    if (typeof window !== 'undefined') {
      localStorage.setItem('touchef_batch_projects_v2', JSON.stringify(updated));
    }
    if (currentUser) {
      await deleteBatchProject(currentUser.uid, projectId);
    }
  };

  const handleClearAllBatchProjects = async () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('touchef_batch_projects_v2');
      localStorage.removeItem('touchef_favorite_batches_v1');
      localStorage.removeItem('touchef_favorite_dishes_v1');
    }
    if (currentUser) {
      for (const p of batchProjects) {
        await deleteBatchProject(currentUser.uid, p.id);
      }
    }
    setBatchProjects([]);
  };

  const handleSaveChefBookings = (updated: ChefBookingRequest[]) => {
    setChefBookings(updated);
    updated.forEach(b => {
      saveBooking(b).catch(console.error);
    });
  };

  const handleCreateChefBooking = async (newBooking: ChefBookingRequest) => {
    await saveBooking(newBooking);
    setIsChefBookingModalOpen(false);
    setCurrentView({ name: 'my-bookings' });
  };

  const handleSelectChefToBook = (chef: ChefProfile) => {
    setSelectedChefForBooking(chef);
    setIsChefDetailModalOpen(false);
    setIsChefBookingModalOpen(true);
  };

  const handleOpenChefDetail = (chef: ChefProfile) => {
    setSelectedChefForDetailModal(chef);
    setIsChefDetailModalOpen(true);
  };

  const handleRepeatBooking = (booking: ChefBookingRequest) => {
    const chef = APPROVED_CHEFS.find(c => c.id === booking.chefId) || APPROVED_CHEFS[0];
    setSelectedChefForBooking(chef);
    setIsChefBookingModalOpen(true);
  };

  const [openPreferencesBookingData, setOpenPreferencesBookingData] = useState<{
    isOpenPreferences: boolean;
    directives?: string;
    dietStyle?: string;
    peopleCount?: number;
    allergens?: string[];
  } | null>(null);

  const handleOpenChefBookingForPreferences = (prefs: {
    peopleCount: number;
    daysCount: number;
    dietStyle: string;
    allergens: string[];
    directives: string;
  }) => {
    setOpenPreferencesBookingData({
      isOpenPreferences: true,
      directives: prefs.directives,
      dietStyle: prefs.dietStyle,
      peopleCount: prefs.peopleCount,
      allergens: prefs.allergens
    });
    setChefBookingInitialPackage('with_grocery');
    setSelectedChefForBooking(null);
    setIsChefBookingModalOpen(true);
  };

  const handleOpenChefBookingForActiveProject = (servicePackage: ChefServicePackage = 'with_grocery') => {
    setOpenPreferencesBookingData(null);
    setChefBookingInitialPackage(servicePackage);
    setSelectedChefForBooking(null);
    setIsChefBookingModalOpen(true);
  };

  const handleChefRegistered = (newChef: ChefProfile) => {
    APPROVED_CHEFS.unshift(newChef);
    setIsChefOnboardingOpen(false);
    setCurrentView({ name: 'chef-portal' });
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
              ingredients: d.ingredients.map(ing => ({
                ...ing,
                quantity: Math.round(((ing.quantity / d.servings) * newServings) * 10) / 10
              }))
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

  // Shared Meal Plan Config (Sync between Landing & App)
  const [activePlanConfig, setActivePlanConfig] = useState<MealPlanConfig | null>({
    peopleCount: 4,
    daysCount: 5,
    mealCoverage: 'both',
    dietStyle: 'mediterranean',
    totalServings: 40
  });

  const handleUpdatePlanConfig = (ctx: MealPlanConfig) => {
    setActivePlanConfig(ctx);

    if (currentUser) {
      setDoc(doc(db, 'users', currentUser.uid), {
        mealPlanConfig: ctx,
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
              if (data.mealPlanConfig) setActivePlanConfig(data.mealPlanConfig);
              if (data.batchProjects && Array.isArray(data.batchProjects)) {
                setBatchProjects(data.batchProjects);
              }
              if (data.chefBookings && Array.isArray(data.chefBookings)) {
                setChefBookings(data.chefBookings);
              }
            }
          } catch (err) {
            console.error('Error fetching user profile:', err);
          }
        }
      }
    });

    return () => unsubscribe();
  }, [authInitialized]);

  const handleOpenAuth = (mode: 'login' | 'register' = 'login', pendingContext?: MealPlanConfig) => {
    if (pendingContext) {
      handleUpdatePlanConfig(pendingContext);
    }
    setAuthModalMode(mode);
    setIsAuthModalOpen(true);
  };

  const handleEnterAsGuest = async (context?: MealPlanConfig) => {
    if (context) {
      handleUpdatePlanConfig(context);
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

  const handleLaunchBatchToChefNetwork = (batch: BatchProject) => {
    setSelectedChefForBooking(null);
    setIsChefBookingModalOpen(true);
  };

  const handleActivateBatchForCooking = (batch: BatchProject) => {
    const cloned = cloneBatchProjectAsNew(batch);
    const updated = [cloned, ...batchProjects.filter(p => p.id !== cloned.id)];
    handleSaveProjects(updated);
    setCurrentView({ name: 'batch-session' });
  };

  const handleUpdateFavoriteBatches = (updated: BatchProject[]) => {
    setFavoriteBatches(updated);
    saveFavoriteBatchesToStorage(updated, currentUser?.uid);
  };

  const handleUpdateFavoriteDishes = (updated: BatchDish[]) => {
    setFavoriteDishes(updated);
    saveFavoriteDishesToStorage(updated, currentUser?.uid);
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
          currentUser={currentUser}
          onOpenLegal={(type) => setActiveLegalModal(type)}
          initialPlanConfig={activePlanConfig}
          onPlanConfigChange={handleUpdatePlanConfig}
        />
      ) : (
        <Layout 
          currentView={currentView} 
          onNavigate={setCurrentView} 
          hideNav={shouldHideAppNav}
          activeProject={activeProject}
          onOpenAuth={handleOpenAuth}
          onOpenChefOnboarding={() => setIsChefOnboardingOpen(true)}
          onOpenLegal={(type) => setActiveLegalModal(type)}
          currentUser={currentUser}
          activeBookingsCount={chefBookings.filter(b => b.status === 'confirmed' || b.status === 'in_progress').length}
        >

          {currentView.name === 'home' && (
            <HomeView 
              onNavigate={setCurrentView} 
              mealPlanConfig={activePlanConfig}
              activeProject={activeProject}
              batchHistory={batchHistory}
              favoriteBatches={favoriteBatches}
              favoriteDishes={favoriteDishes}
              chefBookings={chefBookings}
              onRepeatBatch={handleRepeatBatch}
              onUpdateActiveProjectStatus={handleUpdateActiveProjectStatus}
              onRateDish={handleRateDish}
              onArchiveActiveBatch={() => handleUpdateActiveProjectStatus('archived')}
              onDeleteBatchProject={handleDeleteBatchProject}
              onClearAllBatchProjects={handleClearAllBatchProjects}
              onConsumePortion={handleConsumePortion}
              onHireChefForBatch={handleOpenChefBookingForActiveProject}
              onRepeatChefBooking={handleRepeatBooking}
              onLaunchBatchToChefNetwork={handleLaunchBatchToChefNetwork}
              onActivateBatchForCooking={handleActivateBatchForCooking}
              onUpdateFavoriteBatches={handleUpdateFavoriteBatches}
              onUpdateFavoriteDishes={handleUpdateFavoriteDishes}
            />
          )}
          
          {currentView.name === 'profile' && (
            <ProfileView 
              onPeopleCountChange={(count) => {
                if (activePlanConfig) {
                  handleUpdatePlanConfig({ ...activePlanConfig, peopleCount: count });
                }
              }} 
              onOpenChefOnboarding={() => setIsChefOnboardingOpen(true)}
              onNavigateToChefPortal={() => setCurrentView({ name: 'chef-portal' })}
              activeProject={activeProject}
              onArchiveActiveBatch={() => handleUpdateActiveProjectStatus('archived')}
              onDeleteActiveBatch={handleDeleteBatchProject}
              onClearAllBatchProjects={handleClearAllBatchProjects}
            />
          )}

          {currentView.name === 'planner' && (
            <PlannerView 
              onNavigate={setCurrentView} 
              currentMenuPlan={activeApprovedPlan} 
              activeProject={activeProject}
              onUpdateDishServings={handleUpdateDishServings}
              onHireChefForPlan={handleOpenChefBookingForActiveProject}
            />
          )}
          
          {currentView.name === 'recipe' && <RecipeView onNavigate={setCurrentView} />}
          
          {currentView.name === 'batch-session' && (
            <InteractiveCookView 
              onBack={() => setCurrentView({ name: 'home' })} 
              activeProject={activeProject} 
              onFinishCooking={() => {
                handleUpdateActiveProjectStatus('in_fridge');
                setCurrentView({ name: 'home' });
              }} 
            />
          )}
          
          {currentView.name === 'ai-generator' && (
            <AIGeneratorView 
              onMenuApproved={setActiveApprovedPlan} 
              onNavigateToShopping={() => setCurrentView({ name: 'shopping-list' })} 
              initialContext={activePlanConfig}
              onBatchProjectCreated={(proj) => {
                handleBatchProjectCreated(proj);
                setCurrentView({ name: 'shopping-list' });
              }}
              onHireChefForBatch={(proj, pkg) => {
                handleBatchProjectCreated(proj);
                handleOpenChefBookingForActiveProject(pkg || 'with_grocery');
              }}
              onHireChefOpenPreferences={handleOpenChefBookingForPreferences}
              onCookMyself={(proj) => {
                handleBatchProjectCreated(proj);
                setCurrentView({ name: 'batch-session' });
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
              onHireChefToCook={handleOpenChefBookingForActiveProject}
            />
          )}

          {currentView.name === 'supermarket-checkout' && (
            <SupermarketCheckoutView 
              activeProject={activeProject}
              onNavigate={setCurrentView}
              onOrderConfirmed={() => {
                handleUpdateActiveProjectStatus('ready_to_cook');
                setCurrentView({ name: 'home' });
              }}
            />
          )}

          {currentView.name === 'chef-portal' && (
            <ChefPortalView 
              onNavigate={setCurrentView}
              onAcceptBooking={(bookingId) => {
                const updated = chefBookings.map(b => b.id === bookingId ? { ...b, status: 'confirmed' as const } : b);
                handleSaveChefBookings(updated);
              }}
              onRejectBooking={(bookingId) => {
                const updated = chefBookings.filter(b => b.id !== bookingId);
                handleSaveChefBookings(updated);
              }}
            />
          )}

          {currentView.name === 'superadmin' && (
            <SuperAdminView onNavigate={setCurrentView} />
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

          {(currentView.name === 'chefs' || (currentView as any).name === 'chef-directory') && (
            <ChefDirectoryView 
              onNavigate={setCurrentView} 
              onSelectChefToBook={handleSelectChefToBook} 
            />
          )}

          {currentView.name === 'my-bookings' && (
            <MyBookingsView 
              bookings={chefBookings} 
              onNavigate={setCurrentView} 
              onRepeatBooking={handleRepeatBooking} 
            />
          )}

          {currentView.name === 'reference-rag' && <ReferenceRAGView />}

          {currentView.name === 'explore' && <ReferenceRAGView />}
        </Layout>
      )}

      {/* Global Create Chef Request Modal */}
      <CreateChefRequestModal
        isOpen={isChefBookingModalOpen}
        onClose={() => {
          setIsChefBookingModalOpen(false);
          setOpenPreferencesBookingData(null);
        }}
        activeProject={activeProject}
        selectedChef={selectedChefForBooking}
        initialServicePackage={chefBookingInitialPackage}
        isOpenPreferencesRequest={openPreferencesBookingData?.isOpenPreferences}
        initialDirectives={openPreferencesBookingData?.directives}
        initialDietStyle={openPreferencesBookingData?.dietStyle}
        initialPeopleCount={openPreferencesBookingData?.peopleCount}
        initialAllergies={openPreferencesBookingData?.allergens}
        onSuccess={handleCreateChefBooking}
      />

      {/* Global Chef Detail Modal */}
      <ChefDetailModal
        isOpen={isChefDetailModalOpen}
        chef={selectedChefForDetailModal}
        onClose={() => setIsChefDetailModalOpen(false)}
        onBookChef={handleSelectChefToBook}
      />

      {/* Global Chef Onboarding & Verification Modal */}
      <ChefOnboardingModal
        isOpen={isChefOnboardingOpen}
        onClose={() => setIsChefOnboardingOpen(false)}
        onChefRegistered={handleChefRegistered}
      />

      {/* Global Cookie Consent Banner */}
      <CookieBanner
        onOpenCookiesPolicy={() => setActiveLegalModal('cookies')}
        onOpenPrivacyPolicy={() => setActiveLegalModal('privacy')}
      />

      {/* Global Legal Modals (Privacy, Terms, Cookies) */}
      <LegalModals
        isOpen={!!activeLegalModal}
        type={activeLegalModal}
        onClose={() => setActiveLegalModal(null)}
      />

      {/* Global Authentication Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialMode={authModalMode}
        onOpenChefOnboarding={() => setIsChefOnboardingOpen(true)}
        onSuccess={() => {
          if (activePlanConfig && currentUser) {
            setDoc(doc(db, 'users', currentUser.uid), {
              mealPlanConfig: activePlanConfig,
              peopleCount: activePlanConfig.peopleCount,
              coverageDays: activePlanConfig.daysCount,
              updatedAt: new Date().toISOString()
            }, { merge: true }).catch(console.error);
          }
          setCurrentView({ name: 'home' });
        }}
      />
    </>
  );
}
