import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import TargetSetup from './components/TargetSetup';
import DailyPlanCreator from './components/DailyPlanCreator';
import LogReview from './components/LogReview';
import ScheduleManager from './components/Pages/ScheduleManager';
import OverviewPage from './components/Pages/OverviewPage';
import ClientsPage from './components/Pages/ClientsPage';
import WorkoutBuilderPage from './components/Pages/WorkoutBuilderPage';
import AnalyticsPage from './components/Pages/AnalyticsPage';
import SettingsPage from './components/Pages/SettingsPage';
import AddMealModal from './components/Modals/AddMealModal';
import AddExerciseModal from './components/Modals/AddExerciseModal';
import QuickAddClientModal from './components/Modals/QuickAddClientModal';
import FeedbackModal from './components/Modals/FeedbackModal';
import SetHoursModal from './components/Modals/SetHoursModal';
import BlockTimeModal from './components/Modals/BlockTimeModal';
import AnnouncementModal from './components/Modals/AnnouncementModal';
import { CheckCircle2 } from 'lucide-react';

export default function App() {
  // Master Active Tab Routing State
  const [activeTab, setActiveTab] = useState('overview'); // Defaulting to Overview page as requested
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Toast Notification State
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  // Clients Data
  const [clients, setClients] = useState([
    { id: '1', name: 'Marcus Jensen', email: 'marcus@fitarch.com', tier: 'PRO CLIENT', targetKcal: 2450 },
    { id: '2', name: 'Sarah Connor', email: 'sarah@fitarch.com', tier: 'ELITE ATHLETE', targetKcal: 2100 },
    { id: '3', name: 'David Miller', email: 'david@fitarch.com', tier: 'STANDARD', targetKcal: 2800 },
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
  const [logItems, setLogItems] = useState([
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
  const [isSetHoursOpen, setIsSetHoursOpen] = useState(false);
  const [isBlockTimeOpen, setIsBlockTimeOpen] = useState(false);
  const [isAnnouncementOpen, setIsAnnouncementOpen] = useState(false);

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
    showToast(`Added new client: ${newClient.name}`);
  };

  const handleCycleClient = () => {
    const nextIdx = (selectedClientIndex + 1) % clients.length;
    setSelectedClientIndex(nextIdx);
    showToast(`Switched client to ${clients[nextIdx].name}`, 'info');
  };

  return (
    <div className="min-h-screen bg-[#0b0e17] text-slate-200 flex flex-col md:flex-row antialiased selection:bg-blue-500 selection:text-white">
      {/* Toast Notification Banner */}
      {toast && (
        <div className="fixed top-5 right-5 z-50 animate-in fade-in slide-in-from-top-3 duration-300">
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

          {/* 2. MY SCHEDULE (SCHEDULE MANAGER) PAGE */}
          {activeTab === 'schedule' && (
            <ScheduleManager
              onSetHours={() => setIsSetHoursOpen(true)}
              onBlockTime={() => setIsBlockTimeOpen(true)}
              showToast={showToast}
            />
          )}

          {/* 3. OVERVIEW PAGE */}
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
              onNavigate={setActiveTab}
              showToast={showToast}
            />
          )}

          {/* 5. WORKOUT BUILDER PAGE */}
          {activeTab === 'workout-builder' && (
            <WorkoutBuilderPage showToast={showToast} />
          )}

          {/* 6. ANALYTICS PAGE */}
          {activeTab === 'analytics' && (
            <AnalyticsPage />
          )}

          {/* 7. SETTINGS PAGE */}
          {activeTab === 'settings' && (
            <SettingsPage showToast={showToast} />
          )}
        </main>
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
      />

      <FeedbackModal
        isOpen={isFeedbackOpen}
        onClose={() => setIsFeedbackOpen(false)}
        onSubmitFeedback={(note) => showToast(`Feedback sent to ${selectedClient.name}`)}
        clientName={selectedClient.name}
      />

      <SetHoursModal
        isOpen={isSetHoursOpen}
        onClose={() => setIsSetHoursOpen(false)}
        showToast={showToast}
      />

      <BlockTimeModal
        isOpen={isBlockTimeOpen}
        onClose={() => setIsBlockTimeOpen(false)}
        showToast={showToast}
      />

      <AnnouncementModal
        isOpen={isAnnouncementOpen}
        onClose={() => setIsAnnouncementOpen(false)}
        showToast={showToast}
      />
    </div>
  );
}
