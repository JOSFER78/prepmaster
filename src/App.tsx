import { useState } from 'react';
import { ViewState, GeneratedMenuPlan } from './types';
import { Layout } from './components/Layout';
import { HomeView } from './views/HomeView';
import { PlannerView } from './views/PlannerView';
import { RecipeView } from './views/RecipeView';
import { BatchSessionView } from './views/BatchSessionView';
import { AIGeneratorView } from './views/AIGeneratorView';
import { ShoppingListView } from './views/ShoppingListView';
import { InteractiveCookView } from './views/InteractiveCookView';
import { ReferenceRAGView } from './views/ReferenceRAGView';
import { ProfileView } from './views/ProfileView';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewState>({ name: 'home' });
  const [activeApprovedPlan, setActiveApprovedPlan] = useState<GeneratedMenuPlan | null>(null);

  return (
    <Layout 
      currentView={currentView} 
      onNavigate={setCurrentView} 
      hideNav={currentView.name === 'recipe' || currentView.name === 'batch-session' || currentView.name === 'interactive-cook'}
    >
      {currentView.name === 'home' && <HomeView onNavigate={setCurrentView} />}
      
      {currentView.name === 'profile' && <ProfileView />}

      {currentView.name === 'planner' && (
        <PlannerView onNavigate={setCurrentView} currentMenuPlan={activeApprovedPlan} />
      )}
      
      {currentView.name === 'recipe' && <RecipeView onNavigate={setCurrentView} />}
      
      {currentView.name === 'batch-session' && <BatchSessionView onNavigate={setCurrentView} />}
      
      {currentView.name === 'ai-generator' && (
        <AIGeneratorView 
          onMenuApproved={setActiveApprovedPlan} 
          onNavigateToShopping={() => setCurrentView({ name: 'shopping-list' })} 
        />
      )}

      {currentView.name === 'shopping-list' && (
        <ShoppingListView 
          currentMenuPlan={activeApprovedPlan}
          onNavigateToInteractiveCook={() => setCurrentView({ name: 'interactive-cook' })}
          onNavigateToGenerator={() => setCurrentView({ name: 'ai-generator' })}
        />
      )}

      {currentView.name === 'interactive-cook' && (
        <InteractiveCookView 
          dishName={currentView.dishName} 
          onBack={() => setCurrentView({ name: 'home' })} 
        />
      )}

      {currentView.name === 'reference-rag' && <ReferenceRAGView />}

      {currentView.name === 'explore' && <ReferenceRAGView />}
    </Layout>
  );
}
