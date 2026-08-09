import { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import TargetSetup from './components/TargetSetup';
import DailyPlanCreator from './components/DailyPlanCreator';
import LogReview from './components/LogReview';
import AddMealModal from './components/Modals/AddMealModal';
import AddExerciseModal from './components/Modals/AddExerciseModal';
import QuickAddClientModal from './components/Modals/QuickAddClientModal';
import FeedbackModal from './components/Modals/FeedbackModal';
import AnnouncementModal from './components/Modals/AnnouncementModal';
import ClientCredentialsModal from './components/Modals/ClientCredentialsModal';
import ExerciseChangeRequestModal from './components/Modals/ExerciseChangeRequestModal';
import BatchAssignModal from './components/Modals/BatchAssignModal';
import OverviewPage from './Pages/OverviewPage';
import ClientsPage from './Pages/ClientsPage';
import FoodLibraryPage from './Pages/FoodLibraryPage';
import AnalyticsPage from './Pages/AnalyticsPage';
import WorkoutBuilderPage from './Pages/WorkoutBuilderPage';
import SettingsPage from './Pages/SettingsPage';
import AiMealGeneratorPage from './Pages/AiMealGeneratorPage';
import NotificationsPage from './Pages/NotificationsPage';
import ExerciseSwapRequestsPage from './Pages/ExerciseSwapRequestsPage';
import FoodSwapRequestsPage from './Pages/FoodSwapRequestsPage';
import CoachChatPage from './Pages/CoachChatPage';
import TrainerSubscriptionPage from './Pages/TrainerSubscriptionPage';
import CoachAuthPage from './Pages/CoachAuthPage';
import ClientAuthPage from './Pages/ClientAuthPage';
import ClientPortalPage from './Pages/ClientPortalPage';
import { CheckCircle2, Monitor } from 'lucide-react';

export default function App() {
  // Master Application Mode State ('coach_panel' | 'coach_auth' | 'client_auth' | 'client_portal')
  const [appMode, setAppMode] = useState('coach_panel');
  const [currentClientData, setCurrentClientData] = useState({
    id: 'c1',
    name: 'Marcus Jensen',
    email: 'marcus@fitarch.com',
    tier: 'PRO ATHLETE',
    targetKcal: 2450,
    passkey: 'FA-9B2X71',
  });

  // Master Active Tab Routing State (For Coach Panel)
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Coach Subscription State
  const [coachSubscription, setCoachSubscription] = useState({
    planId: 'pro_25',
    planName: 'Pro Trainer',
    maxClients: 25,
    priceEgp: 300,
    isTrial: false,
  });

  // Toast Notification State
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  // Clients Data
  const [clients, setClients] = useState([
    {
      id: 'c1',
      code: '#MJ-0942',
      name: 'Marcus Jensen',
      email: 'marcus@fitarch.com',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      goal: 'Hypertrophy Phase 2',
      plan: 'Pro Tier - 12 Wk',
      planType: 'pro',
      lastActive: 'Today',
      compliance: 92,
      status: 'ACTIVE',
      joined: 'Active since Jan 2024',
      streak: 14,
      sessions: 48,
      passkey: 'FA-9B2X71',
      note: 'Marcus is responding well to the volume increase in Phase 2. Slight impingement reported in left shoulder during overhead press.',
      lastUpdated: 'Yesterday',
      tier: 'PRO ATHLETE',
      targetKcal: 2450
    },
    {
      id: 'c2',
      code: '#SC-1104',
      name: 'Sarah Connor',
      email: 'sarah@fitarch.com',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80',
      goal: 'Endurance Prep',
      plan: 'Basic - 4 Wk',
      planType: 'basic',
      lastActive: '2 days ago',
      compliance: 45,
      status: 'AT RISK',
      joined: 'Active since Feb 2024',
      streak: 3,
      sessions: 18,
      passkey: 'FA-3K8P99',
      note: 'Compliance dropped this week due to business travel. Needs encouragement for hotel room mobility & bodyweight workouts.',
      lastUpdated: '3 days ago',
      tier: 'ELITE ATHLETE',
      targetKcal: 2100
    },
    {
      id: 'c3',
      code: '#DM-8832',
      name: 'David Miller',
      email: 'david@fitarch.com',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
      goal: 'Weight Loss',
      plan: 'Onboarding',
      planType: 'onboarding',
      lastActive: 'Just now',
      compliance: 80,
      status: 'ONBOARDING',
      joined: 'Joined Today',
      streak: 1,
      sessions: 2,
      passkey: 'FA-7L2M11',
      note: 'Initial intake call completed. Target daily calorie deficit set to 500 kcal.',
      lastUpdated: 'Today',
      tier: 'STANDARD',
      targetKcal: 2800
    },
    {
      id: 'c4',
      code: '#ER-2291',
      name: 'Elena Rodriguez',
      email: 'elena@fitarch.com',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80',
      goal: 'Strength Building',
      plan: 'Pro Tier - 12 Wk',
      planType: 'pro',
      lastActive: 'Yesterday',
      compliance: 88,
      status: 'ACTIVE',
      joined: 'Active since Nov 2023',
      streak: 21,
      sessions: 64,
      passkey: 'FA-88K2P0',
      note: 'Hit a new deadlift personal record (225 lbs x 5 reps). Excellent recovery metrics.',
      lastUpdated: 'Yesterday',
      tier: 'PRO ATHLETE',
      targetKcal: 2200
    },
    {
      id: 'c5',
      code: '#ML-4410',
      name: 'Michael Lee',
      email: 'michael@fitarch.com',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
      goal: 'Marathon Prep',
      plan: 'Basic - 8 Wk',
      planType: 'basic',
      lastActive: '3 days ago',
      compliance: 75,
      status: 'ACTIVE',
      joined: 'Active since Dec 2023',
      streak: 9,
      sessions: 32,
      passkey: 'FA-11M9L4',
      note: 'Long weekend run (18 miles) logged successfully. Hydration & carb loading protocol followed.',
      lastUpdated: '4 days ago',
      tier: 'STANDARD',
      targetKcal: 2900
    }
  ]);
  const [selectedClientIndex, setSelectedClientIndex] = useState(0);
  const selectedClient = clients[selectedClientIndex] || clients[0];

  // Target Setup State (Nutrition)
  const [proteinGrams, setProteinGrams] = useState(180);
  const [carbsGrams, setCarbsGrams] = useState(240);
  const [fatsGrams, setFatsGrams] = useState(80);
  const [isLocked, setIsLocked] = useState(false);

  // Day State (Nutrition)
  const [selectedDay, setSelectedDay] = useState('Mon');

  // Meals State (Nutrition)
  const [meals, setMeals] = useState({
    breakfast: {
      items: [
        {
          id: 'b1',
          name: 'Classic Scrambled Eggs',
          description: '3 Large Eggs, Spinach, 1/4 Avocado',
          protein: 35,
          carbs: 20,
          fats: 12,
          kcal: 420,
        },
      ],
    },
    lunch: {
      items: [
        {
          id: 'l1',
          name: 'Grilled Salmon & Quinoa',
          description: '150g Salmon, 1/2 cup Quinoa, Roasted Asparagus',
          protein: 45,
          carbs: 60,
          fats: 22,
          kcal: 650,
        },
      ],
    },
    dinner: { items: [] },
    snacks: { items: [] },
  });

  // Exercises State (Nutrition)
  const [exercises, setExercises] = useState([
    { id: 'e1', category: 'STRENGTH', name: 'Leg Day - Hypertrophy', detail: 'Estimated Burn: 350 kcal', burnKcal: 350 },
    { id: 'e2', category: 'CARDIO', name: 'LISS: Fasted Walk', detail: '30 Mins @ 4.5km/h', burnKcal: 100 },
  ]);

  // Log Review Timeline Items (Nutrition)
  const [logItems] = useState([
    {
      id: 'log1',
      time: '08:30 AM',
      status: 'planned',
      title: 'Classic Scrambled Eggs',
      note: 'Added a bit of extra spinach today. Felt great.',
    },
    {
      id: 'log2',
      time: '11:15 AM',
      status: 'off-plan',
      title: 'Starbucks Latte + Muffin',
      details: 'Sugar: 45g | Kcal: 520',
    },
    {
      id: 'log3',
      time: '01:45 PM',
      status: 'planned',
      title: 'Grilled Salmon & Quinoa',
      image: '/salmon_quinoa.png',
    },
  ]);

  // Modals Visibility
  const [isAddMealOpen, setIsAddMealOpen] = useState(false);
  const [activeMealCategory, setActiveMealCategory] = useState('breakfast');
  const [isAddExerciseOpen, setIsAddExerciseOpen] = useState(false);
  const [isQuickAddClientOpen, setIsQuickAddClientOpen] = useState(false);
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const [isAnnouncementOpen, setIsAnnouncementOpen] = useState(false);

  // New Modals State
  const [isCredentialsOpen, setIsCredentialsOpen] = useState(false);
  const [createdClientCredentials, setCreatedClientCredentials] = useState(null);
  const [isChangeRequestsOpen, setIsChangeRequestsOpen] = useState(false);
  const [changeRequests, setChangeRequests] = useState([
    {
      id: 'req1',
      clientName: 'Sarah Connor',
      originalExercise: 'Barbell Squat',
      suggestedReplacement: 'Leg Press (Machine)',
      reasonCategory: 'Knee Strain',
      reasonNote: 'Slight patellar discomfort under heavy axial load',
      requestedAt: '15 mins ago',
    },
    {
      id: 'req2',
      clientName: 'Marcus Jensen',
      originalExercise: 'Cable Crossover',
      suggestedReplacement: 'Dumbbell Flyes',
      reasonCategory: 'Equipment Missing',
      reasonNote: 'Gym cable crossover machine is undergoing maintenance',
      requestedAt: '45 mins ago',
    },
  ]);
  const [isBatchAssignOpen, setIsBatchAssignOpen] = useState(false);
  const [batchAssignProgramTitle, setBatchAssignProgramTitle] = useState('Hypertrophy Split 4-Day Protocol');

  // Handlers
  const handleOpenAddMeal = (mealCategory) => {
    setActiveMealCategory(mealCategory);
    setIsAddMealOpen(true);
  };

  const handleAddMealItem = (category, item) => {
    setMeals((prev) => ({
      ...prev,
      [category]: {
        items: [...(prev[category]?.items || []), item],
      },
    }));
    showToast(`Added ${item.name} to ${category.toUpperCase()}`);
  };

  const handleDeleteMealItem = (category, itemId) => {
    setMeals((prev) => ({
      ...prev,
      [category]: {
        items: prev[category].items.filter((i) => i.id !== itemId),
      },
    }));
    showToast(`Removed item from ${category.toUpperCase()}`, 'info');
  };

  const handleAddExercise = (newExercise) => {
    setExercises((prev) => [...prev, newExercise]);
    showToast(`Added ${newExercise.name} to daily workouts`);
  };

  const handleDeleteExercise = (id) => {
    setExercises((prev) => prev.filter((e) => e.id !== id));
    showToast('Removed exercise', 'info');
  };

  const handleQuickAddClient = (newClient) => {
    setClients((prev) => [...prev, newClient]);
    setSelectedClientIndex(clients.length);
    setCreatedClientCredentials(newClient);
    setIsCredentialsOpen(true);
    showToast(`Added new client: ${newClient.name}`);
  };

  const handleApproveChangeRequest = (reqId, replacement) => {
    setChangeRequests((prev) => prev.filter((r) => r.id !== reqId));
    showToast(`Approved "${replacement}" substitution!`);
  };

  const handleRejectChangeRequest = (reqId) => {
    setChangeRequests((prev) => prev.filter((r) => r.id !== reqId));
    showToast('Rejected exercise change request', 'info');
  };

  const handleOpenBatchAssign = (programTitle = 'Current Training Routine') => {
    setBatchAssignProgramTitle(programTitle);
    setIsBatchAssignOpen(true);
  };

  const handleCycleClient = () => {
    const nextIdx = (selectedClientIndex + 1) % clients.length;
    setSelectedClientIndex(nextIdx);
    showToast(`Switched client to ${clients[nextIdx].name}`, 'info');
  };

  // Render Coach Login / Register Screen
  if (appMode === 'coach_auth') {
    return (
      <div className="flex flex-col min-h-screen">
        {/* Mode Switcher Demo Bar */}
        <div className="bg-[#121724] border-b border-slate-800 py-2 px-4 flex items-center justify-between text-xs font-semibold select-none z-50">
          <span className="text-blue-300 font-bold flex items-center gap-1.5">
            <Monitor className="w-4 h-4" /> Demo Mode Switcher:
          </span>
          <div className="flex items-center gap-2">
            <button onClick={() => setAppMode('coach_panel')} className="px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300">🏋️ Coach Panel</button>
            <button onClick={() => setAppMode('coach_auth')} className="px-3 py-1 rounded-lg bg-blue-600 text-white font-bold">🔐 Coach Sign In</button>
            <button onClick={() => setAppMode('client_auth')} className="px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300">🔑 Client Passkey Login</button>
            <button onClick={() => setAppMode('client_portal')} className="px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300">📱 Client Portal View</button>
          </div>
        </div>
        <CoachAuthPage 
          onLoginSuccess={() => setAppMode('coach_panel')} 
          onSwitchToClientAuth={() => setAppMode('client_auth')}
        />
      </div>
    );
  }

  // Render Client Passkey Activation Login Screen
  if (appMode === 'client_auth') {
    return (
      <div className="flex flex-col min-h-screen">
        {/* Mode Switcher Demo Bar */}
        <div className="bg-[#121724] border-b border-slate-800 py-2 px-4 flex items-center justify-between text-xs font-semibold select-none z-50">
          <span className="text-blue-300 font-bold flex items-center gap-1.5">
            <Monitor className="w-4 h-4" /> Demo Mode Switcher:
          </span>
          <div className="flex items-center gap-2">
            <button onClick={() => setAppMode('coach_panel')} className="px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300">🏋️ Coach Panel</button>
            <button onClick={() => setAppMode('coach_auth')} className="px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300">🔐 Coach Sign In</button>
            <button onClick={() => setAppMode('client_auth')} className="px-3 py-1 rounded-lg bg-blue-600 text-white font-bold">🔑 Client Passkey Login</button>
            <button onClick={() => setAppMode('client_portal')} className="px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300">📱 Client Portal View</button>
          </div>
        </div>
        <ClientAuthPage
          onClientLoginSuccess={(clientInfo) => {
            setCurrentClientData(clientInfo);
            setAppMode('client_portal');
          }}
          onSwitchToCoachAuth={() => setAppMode('coach_auth')}
        />
      </div>
    );
  }

  // Render Single-Client Portal Workspace View
  if (appMode === 'client_portal') {
    return (
      <div className="flex flex-col min-h-screen">
        {/* Mode Switcher Demo Bar */}
        <div className="bg-[#121724] border-b border-slate-800 py-2 px-4 flex items-center justify-between text-xs font-semibold select-none z-50">
          <span className="text-blue-300 font-bold flex items-center gap-1.5">
            <Monitor className="w-4 h-4" /> Demo Mode Switcher:
          </span>
          <div className="flex items-center gap-2">
            <button onClick={() => setAppMode('coach_panel')} className="px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300">🏋️ Coach Panel</button>
            <button onClick={() => setAppMode('coach_auth')} className="px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300">🔐 Coach Sign In</button>
            <button onClick={() => setAppMode('client_auth')} className="px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300">🔑 Client Passkey Login</button>
            <button onClick={() => setAppMode('client_portal')} className="px-3 py-1 rounded-lg bg-blue-600 text-white font-bold">📱 Client Portal View</button>
          </div>
        </div>
        <ClientPortalPage
          clientData={currentClientData}
          onLogout={() => setAppMode('client_auth')}
          showToast={showToast}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0b0e17] text-slate-200 flex flex-col antialiased selection:bg-blue-500 selection:text-white">
      {/* Top Application Mode Demo Switcher Bar */}
      <div className="bg-[#121724] border-b border-slate-800 py-2 px-4 flex items-center justify-between text-xs font-semibold select-none z-50">
        <span className="text-blue-300 font-bold flex items-center gap-1.5">
          <Monitor className="w-4 h-4 text-blue-400" /> Demo Mode Switcher:
        </span>
        <div className="flex items-center gap-2">
          <button onClick={() => setAppMode('coach_panel')} className="px-3 py-1 rounded-lg bg-blue-600 text-white font-bold cursor-pointer">🏋️ Coach Panel</button>
          <button onClick={() => setAppMode('coach_auth')} className="px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 cursor-pointer">🔐 Coach Sign In</button>
          <button onClick={() => setAppMode('client_auth')} className="px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 cursor-pointer">🔑 Client Passkey Login</button>
          <button onClick={() => setAppMode('client_portal')} className="px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 cursor-pointer">📱 Client Portal View</button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row flex-1">
        {/* Toast Notification Banner */}
        {toast && (
          <div className="fixed top-12 right-5 z-50 animate-in fade-in slide-in-from-top-3 duration-300">
            <div className={`flex items-center gap-3 px-4 py-3 rounded-xl border shadow-xl text-xs font-semibold ${
              toast.type === 'warning'
                ? 'bg-amber-950/90 border-amber-800 text-amber-200'
                : toast.type === 'info'
                ? 'bg-slate-900/90 border-slate-700 text-slate-200'
                : 'bg-emerald-950/90 border-emerald-800 text-emerald-200'
            }`}>
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>{toast.message}</span>
            </div>
          </div>
        )}

        {/* Shared Master Sidebar */}
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onQuickAddClient={() => setIsQuickAddClientOpen(true)}
          isMobileOpen={isMobileSidebarOpen}
          onCloseMobile={() => setIsMobileSidebarOpen(false)}
        />

      {/* Main App Workspace */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Shared Master Header */}
        <Header
          activeTab={activeTab}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedClient={selectedClient}
          onOpenMobileSidebar={() => setIsMobileSidebarOpen(true)}
          onNavigate={setActiveTab}
        />

        {/* Dynamic Page Router Content */}
        <main className="p-4 sm:p-6 md:p-8 flex-1">
          {/* 1. NUTRITION ENGINE PAGE */}
          {activeTab === 'nutrition-engine' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              <section className="lg:col-span-3">
                <TargetSetup
                  targetKcal={selectedClient.targetKcal}
                  proteinGrams={proteinGrams}
                  setProteinGrams={setProteinGrams}
                  carbsGrams={carbsGrams}
                  setCarbsGrams={setCarbsGrams}
                  fatsGrams={fatsGrams}
                  setFatsGrams={setFatsGrams}
                  isLocked={isLocked}
                  setIsLocked={setIsLocked}
                  selectedClient={selectedClient}
                  onOpenClientSelector={handleCycleClient}
                />
              </section>

              <section className="lg:col-span-6">
                <DailyPlanCreator
                  selectedDay={selectedDay}
                  setSelectedDay={setSelectedDay}
                  meals={meals}
                  onAddItem={handleOpenAddMeal}
                  onEditItem={(cat, item) => showToast(`Editing ${item.name}`, 'info')}
                  onDeleteItem={handleDeleteMealItem}
                  onAddCustomMeal={() => handleOpenAddMeal('breakfast')}
                  exercises={exercises}
                  onAddExercise={() => setIsAddExerciseOpen(true)}
                  onDeleteExercise={handleDeleteExercise}
                  onDuplicateDays={() => showToast('Plan duplicated across Mon - Sun!')}
                />
              </section>

              <section className="lg:col-span-3">
                <LogReview
                  logItems={logItems}
                  onApproveLog={() => showToast(`Approved today's log for ${selectedClient.name}!`)}
                  onOpenFeedback={() => setIsFeedbackOpen(true)}
                  onFlagDay={() => showToast('Flagged Oct 24th for review', 'warning')}
                />
              </section>
            </div>
          )}

          {/* 2. OVERVIEW PAGE */}
          {activeTab === 'overview' && (
            <OverviewPage
              onNavigate={setActiveTab}
              onOpenAnnouncement={() => setIsAnnouncementOpen(true)}
              showToast={showToast}
            />
          )}

          {/* 4. CLIENTS PAGE */}
          {activeTab === 'clients' && (
            <ClientsPage
              clients={clients}
              onSelectClient={setSelectedClientIndex}
              onQuickAddClient={() => setIsQuickAddClientOpen(true)}
              onOpenClientCredentials={(clientData) => {
                setCreatedClientCredentials(clientData);
                setIsCredentialsOpen(true);
              }}
              onNavigate={setActiveTab}
              showToast={showToast}
            />
          )}

          {/* 4.5. COACH CHAT PAGE */}
          {activeTab === 'coach-chat' && (
            <CoachChatPage showToast={showToast} />
          )}

          {/* 5. FOOD LIBRARY PAGE */}
          {activeTab === 'food-library' && (
            <FoodLibraryPage showToast={showToast} />
          )}

          {/* 5.5. AI MEAL TEMPLATE GENERATOR PAGE */}
          {activeTab === 'ai-meal-generator' && (
            <AiMealGeneratorPage showToast={showToast} />
          )}

          {/* 6. WORKOUT BUILDER PAGE */}
          {activeTab === 'workout-builder' && (
            <WorkoutBuilderPage 
              showToast={showToast}
              onOpenBatchAssignModal={handleOpenBatchAssign}
            />
          )}

          {/* 7. EXERCISE CHANGE REQUESTS PAGE */}
          {activeTab === 'exercise-swaps' && (
            <ExerciseSwapRequestsPage showToast={showToast} />
          )}

          {/* 7.1. FOOD SWAP REQUESTS PAGE */}
          {activeTab === 'food-swaps' && (
            <FoodSwapRequestsPage showToast={showToast} />
          )}

          {/* 7. ANALYTICS PAGE */}
          {activeTab === 'analytics' && (
            <AnalyticsPage showToast={showToast} />
          )}

          {/* 8. NOTIFICATIONS PAGE */}
          {activeTab === 'notifications' && (
            <NotificationsPage
              onNavigate={setActiveTab}
              onOpenChangeRequests={() => setIsChangeRequestsOpen(true)}
              showToast={showToast}
            />
          )}

          {/* 9. SETTINGS PAGE */}
          {activeTab === 'settings' && (
            <SettingsPage showToast={showToast} />
          )}

          {/* 10. TRAINER SUBSCRIPTION PLANS PAGE */}
          {activeTab === 'subscription-plans' && (
            <TrainerSubscriptionPage
              currentSubscription={coachSubscription}
              activeClientCount={clients.length}
              onSelectPlan={(newPlan) => {
                setCoachSubscription(newPlan);
                showToast(`Switched to ${newPlan.planName} (${newPlan.priceEgp} EGP/mo for ${newPlan.maxClients} clients)!`);
              }}
              showToast={showToast}
            />
          )}
        </main>
      </div>
    </div>

      {/* Global Shared Modals */}
      <AddMealModal
        isOpen={isAddMealOpen}
        onClose={() => setIsAddMealOpen(false)}
        onAdd={handleAddMealItem}
        mealCategory={activeMealCategory}
      />

      <AddExerciseModal
        isOpen={isAddExerciseOpen}
        onClose={() => setIsAddExerciseOpen(false)}
        onAdd={handleAddExercise}
      />

      <QuickAddClientModal
        isOpen={isQuickAddClientOpen}
        onClose={() => setIsQuickAddClientOpen(false)}
        onAddClient={handleQuickAddClient}
        currentSubscription={coachSubscription}
        currentClientCount={clients.length}
        onNavigateToSubscription={() => setActiveTab('subscription-plans')}
      />

      <ClientCredentialsModal
        isOpen={isCredentialsOpen}
        onClose={() => setIsCredentialsOpen(false)}
        clientData={createdClientCredentials}
        showToast={showToast}
      />

      <ExerciseChangeRequestModal
        isOpen={isChangeRequestsOpen}
        onClose={() => setIsChangeRequestsOpen(false)}
        requests={changeRequests}
        onApprove={handleApproveChangeRequest}
        onReject={handleRejectChangeRequest}
      />

      <BatchAssignModal
        isOpen={isBatchAssignOpen}
        onClose={() => setIsBatchAssignOpen(false)}
        clients={clients}
        programTitle={batchAssignProgramTitle}
        onConfirmBatch={(clientIds, title) => showToast(`Assigned ${title} to ${clientIds.length} client(s)!`)}
        showToast={showToast}
      />

      <FeedbackModal
        isOpen={isFeedbackOpen}
        onClose={() => setIsFeedbackOpen(false)}
        onSubmitFeedback={() => showToast(`Feedback sent to ${selectedClient.name}`)}
        clientName={selectedClient.name}
      />

      <AnnouncementModal
        isOpen={isAnnouncementOpen}
        onClose={() => setIsAnnouncementOpen(false)}
        showToast={showToast}
      />
    </div>
  );
}
