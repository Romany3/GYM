import { useState } from 'react';
import { 
  Dumbbell, 
  Utensils, 
  Calendar, 
  MessageSquare, 
  CheckCircle2, 
  Play, 
  RefreshCw, 
  Upload, 
  Send, 
  X, 
  Sun,
  Moon,
  Cookie,
  FileText,
  Bell,
  Check,
  Menu,
  Search,
  LogOut,
  ArrowLeftRight,
  Apple,
  Image as ImageIcon,
  Trash2,
  ExternalLink,
  ClipboardCheck
} from 'lucide-react';
import WatchVideoModal from '@/components/modals/WatchVideoModal';
import ClientSubstitutionsPage from './ClientSubstitutionsPage';
import ClientFoodSwapsPage from './ClientFoodSwapsPage';

export default function ClientPortalPage({ clientData, onLogout, showToast, onSubmitDailyLog, onSubmitWeeklyCheckin }) {
  const [activeTab, setActiveTab] = useState('daily-checkin'); // 'daily-checkin' | 'food-swaps' | 'substitutions' | 'notifications'
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isChatOpen, setIsChatOpen] = useState(false);

  const getClientHeaderTitle = () => {
    switch (activeTab) {
      case 'daily-checkin':
        return 'Daily Check-In & Training Protocol';
      case 'food-swaps':
        return 'Food & Meal Substitutions';
      case 'substitutions':
        return 'Exercise Substitutions & Swaps';
      case 'notifications':
        return 'Client Notification Center';
      default:
        return 'Athlete Portal';
    }
  };
  const [chatMessages, setChatMessages] = useState([
    { id: 1, sender: 'coach', text: 'Hey Marcus! Great job on hitting 225 lbs on deadlifts yesterday. How are your knees feeling today?', time: '09:15 AM' },
    { id: 2, sender: 'client', text: 'Knees feel great coach! Ready for today\'s push session.', time: '09:20 AM' },
  ]);

  // Client Notifications Filter & Master State
  const [clientNotifFilter, setClientNotifFilter] = useState('ALL');
  const [clientNotifications, setClientNotifications] = useState([
    {
      id: 'cn1',
      type: 'exercise_swap',
      title: 'Exercise Swap Approved',
      message: 'Coach Alex Thorne approved your substitution request for Barbell Squat with Leg Press Machine.',
      time: '20 mins ago',
      unread: true,
      category: 'EXERCISE',
      actionLabel: 'View Exercise Swaps',
      targetTab: 'substitutions',
    },
    {
      id: 'cn2',
      type: 'workout_assigned',
      title: 'New Workout Protocol Assigned',
      message: 'Push Hypertrophy Week 4 split was assigned to your daily workout schedule.',
      time: '2 hours ago',
      unread: true,
      category: 'WORKOUT',
      actionLabel: "Open Today's Workout",
      targetTab: 'workout',
    },
    {
      id: 'cn3',
      type: 'food_swap',
      title: 'Food Swap Approved',
      message: 'Coach Alex approved your request to substitute Brown Rice with Sweet Potato.',
      time: '5 hours ago',
      unread: true,
      category: 'NUTRITION',
      actionLabel: 'View Food Swaps',
      targetTab: 'food-swaps',
    },
    {
      id: 'cn4',
      type: 'coach_feedback',
      title: 'Coach Feedback on Progress Photo',
      message: 'Great shoulder width progress! Keep protein target at 180g.',
      time: '1 day ago',
      unread: false,
      category: 'COACH',
      actionLabel: 'Open Coach Chat',
      targetTab: 'chat',
    },
    {
      id: 'cn5',
      type: 'checkin',
      title: 'Weekly Check-In Due',
      message: 'Your Sunday progress evaluation form and photos are due today.',
      time: '2 days ago',
      unread: false,
      category: 'CHECKIN',
      actionLabel: 'Complete Check-In',
      targetTab: 'checkin',
    },
  ]);

  // Exercise Swap Request Modal State
  const [isSwapModalOpen, setIsSwapModalOpen] = useState(false);
  const [selectedExerciseToSwap, setSelectedExerciseToSwap] = useState(null);
  const [swapReasonCategory, setSwapReasonCategory] = useState('Equipment Missing');
  const [swapReasonNote, setSwapReasonNote] = useState('');

  // Video Modal State
  const [selectedVideoExercise, setSelectedVideoExercise] = useState(null);
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  // Today's Exercises Logging State
  const [exercises, setExercises] = useState([
    {
      id: 'ex1',
      name: 'Barbell Bench Press',
      target: 'Chest',
      sets: '4',
      reps: '8-10',
      tempo: '2-1-1-0',
      videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
      loggedSets: [
        { setNum: 1, reps: 8, weight: 90, rpe: 8, completed: true },
        { setNum: 2, reps: 8, weight: 90, rpe: 8.5, completed: true },
        { setNum: 3, reps: 8, weight: 90, rpe: 9, completed: false },
        { setNum: 4, reps: 7, weight: 90, rpe: 9.5, completed: false },
      ],
    },
    {
      id: 'ex2',
      name: 'Incline Dumbbell Press',
      target: 'Upper Chest',
      sets: '3',
      reps: '10-12',
      tempo: '3-0-1-0',
      videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
      loggedSets: [
        { setNum: 1, reps: 10, weight: 32, rpe: 8, completed: false },
        { setNum: 2, reps: 10, weight: 32, rpe: 8.5, completed: false },
        { setNum: 3, reps: 10, weight: 32, rpe: 9, completed: false },
      ],
    },
    {
      id: 'ex3',
      name: 'Tricep Rope Pushdowns',
      target: 'Triceps',
      sets: '4',
      reps: '12-15',
      tempo: '2-0-1-1',
      videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
      loggedSets: [
        { setNum: 1, reps: 12, weight: 25, rpe: 7.5, completed: false },
        { setNum: 2, reps: 12, weight: 25, rpe: 8, completed: false },
        { setNum: 3, reps: 12, weight: 25, rpe: 8.5, completed: false },
      ],
    },
  ]);

  // Meals Checklist State (with full macro tracking: Protein, Carbs, Fats)
  const [meals, setMeals] = useState({
    breakfast: { title: 'Breakfast', icon: Sun, items: [{ name: 'Scrambled Eggs (3 eggs) & Toast', kcal: 520, protein: 38, carbs: 54, fats: 18, eaten: true }] },
    lunch: { title: 'Lunch', icon: Utensils, items: [{ name: 'Grilled Chicken (200g) & Rice', kcal: 750, protein: 58, carbs: 78, fats: 24, eaten: true }] },
    dinner: { title: 'Dinner', icon: Moon, items: [{ name: 'Salmon Filet & Sweet Potato', kcal: 720, protein: 54, carbs: 76, fats: 22, eaten: false }] },
    snacks: { title: 'Snacks', icon: Cookie, items: [{ name: 'Whey Protein Scoop & Almonds', kcal: 460, protein: 30, carbs: 32, fats: 16, eaten: false }] },
  });

  // Weekly Checkin State
  const [energyScore, setEnergyScore] = useState(8);
  const [sleepScore, setSleepScore] = useState(7);

  // Daily Log Submission State
  const [extraActivitiesNotes, setExtraActivitiesNotes] = useState('');
  const [isDailyLogSubmittedToday, setIsDailyLogSubmittedToday] = useState(false);
  const [submittedTimestamp, setSubmittedTimestamp] = useState(null);

  // Weekly Progress Evaluation State & Photos
  const [isWeeklyEvaluationSubmitted, setIsWeeklyEvaluationSubmitted] = useState(false);
  const [weeklySubmittedTimestamp, setWeeklySubmittedTimestamp] = useState(null);
  const [progressPhotos, setProgressPhotos] = useState({
    front: null,
    side: null,
    back: null,
  });

  const handlePhotoUpload = (pose, event) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProgressPhotos((prev) => ({ ...prev, [pose]: e.target.result }));
        if (showToast) showToast(`Uploaded ${pose.toUpperCase()} view photo!`);
      };
      reader.readAsDataURL(file);
    }
  };

  // 1. Submit Daily Log (Meals, Workouts, Extra Notes)
  const handleDailyLogSubmit = () => {
    const eatenMealsList = [];
    let totalKcalLogged = 0;
    let totalProteinLogged = 0;
    let totalCarbsLogged = 0;
    let totalFatsLogged = 0;

    Object.keys(meals).forEach((catKey) => {
      const cat = meals[catKey];
      cat.items.forEach((item) => {
        if (item.eaten) {
          eatenMealsList.push({
            name: item.name,
            kcal: item.kcal,
            protein: item.protein || 0,
            carbs: item.carbs || 0,
            fats: item.fats || 0,
            category: cat.title,
          });
          totalKcalLogged += item.kcal || 0;
          totalProteinLogged += item.protein || 0;
          totalCarbsLogged += item.carbs || 0;
          totalFatsLogged += item.fats || 0;
        }
      });
    });

    const completedExercisesList = exercises.map((ex) => {
      const completedSetsCount = ex.loggedSets.filter((s) => s.completed).length;
      const setsSummary = ex.loggedSets.map((s) => `${s.weight || 0}kg x ${s.reps || 0} (${s.completed ? '✓' : 'x'})`).join(', ');
      return {
        name: ex.name,
        target: ex.target,
        completedSets: completedSetsCount,
        totalSets: ex.loggedSets.length,
        loggedSets: setsSummary,
        isFullyCompleted: completedSetsCount === ex.loggedSets.length && ex.loggedSets.length > 0,
      };
    });

    const nowStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const payload = {
      type: 'daily_log',
      clientId: clientData?.id || 'c1',
      clientName: clientData?.name || 'Marcus Jensen',
      date: new Date().toISOString().split('T')[0],
      submittedAt: nowStr,
      eatenMealsCount: eatenMealsList.length,
      eatenMeals: eatenMealsList,
      totalKcalLogged,
      totalProteinLogged,
      totalCarbsLogged,
      totalFatsLogged,
      completedExercisesCount: completedExercisesList.filter((e) => e.completedSets > 0).length,
      completedExercises: completedExercisesList,
      extraNotes: extraActivitiesNotes,
    };

    setIsDailyLogSubmittedToday(true);
    setSubmittedTimestamp(nowStr);

    if (onSubmitDailyLog) {
      onSubmitDailyLog(payload);
    } else if (showToast) {
      showToast('Daily details & workout log submitted to Coach Alex Thorne!');
    }
  };

  // 2. Submit Weekly Evaluation Form & Photos
  const handleWeeklyEvaluationSubmit = () => {
    const nowStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const payload = {
      type: 'weekly_evaluation',
      clientId: clientData?.id || 'c1',
      clientName: clientData?.name || 'Marcus Jensen',
      date: new Date().toISOString().split('T')[0],
      submittedAt: nowStr,
      checkin: {
        sleepHours: `${sleepScore} hrs`,
        energyLevel: `${energyScore} / 10`,
      },
      progressPhotos,
    };

    setIsWeeklyEvaluationSubmitted(true);
    setWeeklySubmittedTimestamp(nowStr);

    if (onSubmitWeeklyCheckin) {
      onSubmitWeeklyCheckin(payload);
    } else if (showToast) {
      showToast('Weekly progress evaluation & photos submitted to Coach Alex Thorne!');
    }
  };

  const handleScrollToWeeklyForm = (e) => {
    if (e) e.preventDefault();
    const elem = document.getElementById('weekly-form-section');
    if (elem) {
      const headerOffset = 100;
      const elementPosition = elem.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  // Handlers
  const handleToggleSet = (exId, setIdx) => {
    setExercises((prev) =>
      prev.map((ex) => {
        if (ex.id !== exId) return ex;
        const newLogged = [...ex.loggedSets];
        newLogged[setIdx] = { ...newLogged[setIdx], completed: !newLogged[setIdx].completed };
        return { ...ex, loggedSets: newLogged };
      })
    );
  };

  const handleToggleWholeExercise = (exId) => {
    setExercises((prev) =>
      prev.map((ex) => {
        if (ex.id !== exId) return ex;
        const allDone = ex.loggedSets.every((s) => s.completed);
        const newLogged = ex.loggedSets.map((s) => ({ ...s, completed: !allDone }));
        return { ...ex, loggedSets: newLogged };
      })
    );
    if (showToast) showToast('Updated exercise completion status!');
  };

  const handleUpdateSetField = (exId, setIdx, field, value) => {
    setExercises((prev) =>
      prev.map((ex) => {
        if (ex.id !== exId) return ex;
        const newLogged = [...ex.loggedSets];
        newLogged[setIdx] = { ...newLogged[setIdx], [field]: Number(value) };
        return { ...ex, loggedSets: newLogged };
      })
    );
  };

  const handleOpenSwapModal = (exercise) => {
    setSelectedExerciseToSwap(exercise);
    setIsSwapModalOpen(true);
  };

  const handleSubmitSwapRequest = () => {
    if (!selectedExerciseToSwap) return;
    if (showToast) showToast(`Submitted swap request for ${selectedExerciseToSwap.name} to Coach!`);
    setIsSwapModalOpen(false);
    setSelectedExerciseToSwap(null);
    setSwapReasonNote('');
  };

  const handleToggleMeal = (catKey, itemIdx) => {
    setMeals((prev) => {
      const catItems = [...prev[catKey].items];
      catItems[itemIdx] = { ...catItems[itemIdx], eaten: !catItems[itemIdx].eaten };
      return { ...prev, [catKey]: { ...prev[catKey], items: catItems } };
    });
  };

  const [newMessageText, setNewMessageText] = useState('');
  const [clientChatImage, setClientChatImage] = useState(null);
  const [clientLightboxImage, setClientLightboxImage] = useState(null);

  const handleClientImageFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setClientChatImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSendMessage = () => {
    if (!newMessageText.trim() && !clientChatImage) return;
    setChatMessages((prev) => [
      ...prev,
      { 
        id: Date.now(), 
        sender: 'client', 
        text: newMessageText, 
        image: clientChatImage || null,
        time: 'Just now' 
      },
    ]);
    setNewMessageText('');
    setClientChatImage(null);
  };

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-200 flex flex-col md:flex-row antialiased selection:bg-blue-500 selection:text-white">
      {/* Mobile Dark Backdrop Overlay */}
      <div 
        className={`fixed inset-0 bg-black/75 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300 ${
          isMobileSidebarOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsMobileSidebarOpen(false)}
      />

      {/* Client Master Sidebar (Sticky Desktop + Mobile Drawer) */}
      <aside 
        className={`bg-[#0a0d16] border-r border-slate-800/80 flex flex-col justify-between select-none shrink-0 z-50 w-72 max-w-[85vw] md:w-72 fixed inset-y-0 left-0 h-full md:sticky md:top-0 md:h-screen transition-transform duration-300 ease-in-out ${
          isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        {/* Top Branding & Athlete Profile Header */}
        <div className="p-6 overflow-y-auto space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-500 to-sky-400 flex items-center justify-center shadow-lg shadow-blue-500/20">
                  <Dumbbell className="w-5 h-5 text-white rotate-45" />
                </div>
                <span className="font-serif-header text-2xl font-bold tracking-tight text-white">
                  Fit<span className="text-blue-300 font-normal">Arch</span>
                </span>
              </div>
              <span className="text-[10px] font-bold tracking-widest text-blue-400 uppercase mt-1 pl-12">
                ATHLETE PORTAL
              </span>
            </div>

            {/* Mobile Close X Button */}
            <button
              onClick={() => setIsMobileSidebarOpen(false)}
              className="md:hidden p-2 text-slate-400 hover:text-white rounded-xl bg-[#131926] border border-slate-800 transition-colors"
              aria-label="Close sidebar menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Items */}
          <nav className="space-y-1.5">
            {[
              { id: 'daily-checkin', label: 'Daily Check-In & Protocol', icon: ClipboardCheck },
              { id: 'food-swaps', label: 'Food Swaps', icon: Apple },
              { id: 'substitutions', label: 'Exercise Swaps', icon: ArrowLeftRight },
              { id: 'notifications', label: 'Notifications', icon: Bell },
            ].map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setIsMobileSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl text-xs font-semibold transition-all duration-200 relative group cursor-pointer ${
                    isActive
                      ? 'bg-[#141b2c] text-white shadow-inner border border-indigo-500/40'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                  }`}
                >
                  {/* Active left indicator glow bar */}
                  {isActive && (
                    <span className="absolute left-0 top-2 bottom-2 w-1 bg-gradient-to-b from-blue-400 to-indigo-500 rounded-r-full shadow-sm shadow-blue-400/50" />
                  )}
                  <Icon className={`w-4 h-4 transition-transform group-hover:scale-110 shrink-0 ${isActive ? 'text-blue-400' : 'text-slate-400'}`} />
                  <span className="whitespace-nowrap">{item.label}</span>
                </button>
              );
            })}

            <button
              onClick={() => {
                setIsChatOpen(!isChatOpen);
                setIsMobileSidebarOpen(false);
              }}
              className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-semibold text-slate-400 hover:text-slate-200 hover:bg-slate-900/60 transition-all cursor-pointer"
            >
              <div className="flex items-center gap-3.5">
                <MessageSquare className="w-4 h-4 text-blue-400" />
                <span>Coach Chat</span>
              </div>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            </button>
          </nav>
        </div>

        {/* Bottom Connected Coach & Athlete Info Section */}
        <div className="p-6 space-y-4 border-t border-slate-800/60 bg-[#090b13]">
          <div className="p-3 bg-[#111624] border border-slate-800 rounded-xl space-y-1">
            <span className="text-[10px] text-slate-400 block font-semibold">Personal Coach</span>
            <p className="text-xs font-bold text-slate-200 flex items-center justify-between">
              Alex Thorne
              <span className="text-[9px] font-bold text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800/60">
                PRO
              </span>
            </p>
          </div>

          {/* Athlete Profile Badge */}
          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-3">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
                  alt="Marcus Jensen"
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-blue-500/40"
                />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-[#090b13] rounded-full" />
              </div>
              <div className="overflow-hidden">
                <h4 className="text-xs font-semibold text-slate-100 truncate">{clientData?.name || 'Marcus Jensen'}</h4>
                <p className="text-[11px] text-blue-400 font-mono truncate">{clientData?.tier || 'PRO ATHLETE'}</p>
              </div>
            </div>
            {onLogout && (
              <button
                onClick={onLogout}
                title="Log out of client portal"
                className="p-2 text-slate-400 hover:text-rose-400 rounded-lg hover:bg-slate-800 transition-colors"
              >
                <LogOut className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </aside>

      {/* Main Workspace Content Wrapper */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Coach-Styled Header Navbar */}
        <header className="h-20 px-4 md:px-8 border-b border-slate-800/80 bg-[#0b0e17]/90 backdrop-blur-md flex items-center justify-between sticky top-0 z-30">
          {/* Title & Mobile Hamburger Button */}
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <button
              onClick={() => setIsMobileSidebarOpen(true)}
              className="md:hidden p-2 text-slate-400 hover:text-white bg-[#131926] hover:bg-slate-800/60 rounded-xl border border-slate-800 transition-all cursor-pointer shrink-0"
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5 text-blue-400" />
            </button>

            <h1 className="font-serif-header text-lg sm:text-xl md:text-2xl font-semibold tracking-wide text-slate-100 truncate">
              {getClientHeaderTitle()}
            </h1>
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-2 sm:gap-4 md:gap-6 shrink-0">
            {/* Search Bar */}
            <div className="relative w-28 sm:w-48 md:w-64">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search workout, meals..."
                className="w-full bg-[#131926] text-slate-200 text-xs placeholder:text-slate-500 rounded-xl pl-9 pr-3 py-2 border border-slate-700/50 focus:outline-none focus:border-blue-500/60 transition-all"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-1.5 sm:gap-3">
              {/* Notification Bell Button */}
              <button
                onClick={() => setActiveTab('notifications')}
                className={`relative p-2 sm:p-2.5 rounded-xl border transition-all cursor-pointer ${
                  activeTab === 'notifications'
                    ? 'bg-blue-600 text-white border-blue-500 shadow-md'
                    : 'text-slate-400 hover:text-slate-200 bg-[#131926] hover:bg-slate-800/60 border-slate-800'
                }`}
                title="Notifications"
              >
                <Bell className="w-4 h-4 text-amber-400" />
                {clientNotifications.some((n) => n.unread) && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-amber-400 rounded-full ring-2 ring-[#0b0e17] animate-pulse" />
                )}
              </button>

              {/* Direct Coach Chat Trigger */}
              <button
                onClick={() => setIsChatOpen(!isChatOpen)}
                className="p-2 sm:p-2.5 text-slate-400 hover:text-slate-200 bg-[#131926] hover:bg-slate-800/60 rounded-xl border border-slate-800 transition-all cursor-pointer relative"
                title="Coach Chat"
              >
                <MessageSquare className="w-4 h-4 text-blue-400" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-emerald-400 rounded-full ring-2 ring-[#0b0e17] animate-pulse" />
              </button>
            </div>
          </div>
        </header>

        {/* Main Client Content Area */}
        <main className="p-4 sm:p-6 md:p-8 flex-1 space-y-6 w-full">
        {/* TAB 0: MASTER UNIFIED DAILY CHECK-IN & PROTOCOL VIEW */}
        {activeTab === 'daily-checkin' && (
          <div className="space-y-8">
            {/* Top Header & Weekly Reminder Banner */}
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-blue-950/80 via-indigo-950/60 to-slate-900 border border-blue-500/40 rounded-2xl p-5 md:p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-blue-300 bg-blue-900/60 px-2.5 py-0.5 rounded border border-blue-700/60">
                      DAILY ATHLETE PROTOCOL & CHECK-IN
                    </span>
                    {isDailyLogSubmittedToday ? (
                      <span className="text-[10px] font-extrabold text-emerald-400 bg-emerald-950/90 px-2.5 py-0.5 rounded-full border border-emerald-800/80 flex items-center gap-1">
                        ✓ SUBMITTED TODAY ({submittedTimestamp})
                      </span>
                    ) : (
                      <span className="text-[10px] font-extrabold text-amber-400 bg-amber-950/90 px-2.5 py-0.5 rounded-full border border-amber-800/80 flex items-center gap-1 animate-pulse">
                        • PENDING TODAY'S SUBMISSION
                      </span>
                    )}
                    {(progressPhotos.front || progressPhotos.side || progressPhotos.back) && (
                      <span className="text-[10px] font-extrabold text-sky-400 bg-sky-950/90 px-2.5 py-0.5 rounded-full border border-sky-800/80 flex items-center gap-1">
                        📷 PHOTOS ATTACHED
                      </span>
                    )}
                  </div>
                  <h2 className="font-serif-header text-xl sm:text-2xl font-bold text-white mt-1.5">
                    Daily Check-In & Training Protocol
                  </h2>
                  <p className="text-xs text-slate-300 mt-0.5">
                    Execute your daily workout protocol, check off prescribed meals, and submit your daily log to Coach Alex Thorne.
                  </p>
                </div>

                <button
                  onClick={handleDailyLogSubmit}
                  className="px-5 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-400 hover:to-indigo-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-blue-500/25 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer shrink-0"
                >
                  <Send className="w-4 h-4" />
                  <span>{isDailyLogSubmittedToday ? 'Resubmit Daily Log Only' : 'Submit Daily Log Only'}</span>
                </button>
              </div>

              {/* Weekly Evaluation Reminder Alert Box */}
              <div className="bg-gradient-to-r from-amber-950/80 via-slate-900 to-slate-900 border border-amber-500/40 rounded-2xl p-4 shadow-lg flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
                    <Bell className="w-5 h-5 animate-bounce" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-amber-200 flex items-center gap-2">
                      <span>Weekly Evaluation & Progress Photos Reminder</span>
                      <span className="px-2 py-0.5 bg-amber-900/80 text-amber-300 rounded text-[9px] uppercase font-mono">Due Every Sunday</span>
                    </h4>
                    <p className="text-[11px] text-slate-300 mt-0.5">
                      Don't forget to submit your weekly progress photos (Front, Side, Back) and rate your weekly energy & sleep quality below.
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleScrollToWeeklyForm}
                  className="px-3.5 py-2 bg-amber-950 hover:bg-amber-900 text-amber-300 border border-amber-700/60 rounded-xl text-xs font-bold transition-all shrink-0 whitespace-nowrap cursor-pointer flex items-center gap-1 shadow-md hover:shadow-amber-500/20 active:scale-95"
                >
                  Jump to Weekly Form ↓
                </button>
              </div>
            </div>

            {/* Section 1: Prescribed Workout Protocol (Full Details) */}
            <div className="bg-[#121724] border border-slate-800/90 rounded-2xl p-5 md:p-6 shadow-xl space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-red-950/80 border border-red-800/60 flex items-center justify-center text-red-400">
                    <Dumbbell className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-red-400 bg-red-950/90 px-2 py-0.5 rounded border border-red-800/60">
                        DAY 02 PROTOCOL
                      </span>
                      <h3 className="font-serif-header text-lg font-bold text-white">Push Hypertrophy Split</h3>
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Target: Chest, Upper Chest, Shoulders & Triceps • Est. Duration: 45 Mins
                    </p>
                  </div>
                </div>

                <span className="text-xs font-mono font-semibold text-slate-300 bg-[#171e2e] px-3 py-1.5 rounded-xl border border-slate-700/60">
                  {exercises.filter(ex => ex.loggedSets.some(s => s.completed)).length} / {exercises.length} Exercises Completed
                </span>
              </div>

              <div className="space-y-4">
                {exercises.map((ex) => {
                  const isAllSetsComplete = ex.loggedSets.length > 0 && ex.loggedSets.every((s) => s.completed);
                  return (
                    <div
                      key={ex.id}
                      className={`border rounded-2xl p-4 sm:p-5 shadow-lg space-y-4 transition-all ${
                        isAllSetsComplete
                          ? 'bg-[#101c18] border-emerald-500/60 shadow-emerald-950/20'
                          : 'bg-[#171e2e] border-slate-700/60'
                      }`}
                    >
                      {/* Exercise Header */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-3">
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <h4 className="text-sm font-bold text-slate-100">{ex.name}</h4>
                            <span className="text-[10px] font-semibold text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
                              {ex.target}
                            </span>
                            {isAllSetsComplete && (
                              <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/90 px-2 py-0.5 rounded border border-emerald-800/60 flex items-center gap-1">
                                <CheckCircle2 className="w-3 h-3" /> Completed
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-slate-400 mt-1">
                            Prescribed: <strong className="text-slate-200">{ex.sets} Sets x {ex.reps} Reps</strong> • Tempo: <span className="font-mono text-blue-300 font-bold">{ex.tempo}</span>
                          </p>
                        </div>

                        {/* Quick Action Controls */}
                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            onClick={() => handleToggleWholeExercise(ex.id)}
                            className={`flex items-center gap-1 px-2.5 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                              isAllSetsComplete
                                ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                                : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700'
                            }`}
                          >
                            <Check className="w-3.5 h-3.5" />
                            <span>{isAllSetsComplete ? 'Done ✅' : 'Check All'}</span>
                          </button>

                          <button
                            onClick={() => {
                              setSelectedVideoExercise(ex);
                              setIsVideoOpen(true);
                            }}
                            className="flex items-center gap-1 px-2.5 py-1.5 bg-blue-950/60 hover:bg-blue-900/80 text-blue-300 border border-blue-800/60 text-xs font-semibold rounded-xl transition-all cursor-pointer"
                          >
                            <Play className="w-3.5 h-3.5" />
                            <span>Demo</span>
                          </button>

                          <button
                            onClick={() => handleOpenSwapModal(ex)}
                            className="flex items-center gap-1 px-2.5 py-1.5 bg-amber-950/60 hover:bg-amber-900/80 text-amber-300 border border-amber-800/60 text-xs font-semibold rounded-xl transition-all cursor-pointer"
                          >
                            <RefreshCw className="w-3.5 h-3.5" />
                            <span>Swap</span>
                          </button>
                        </div>
                      </div>

                      {/* Set Logger Inputs */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
                        {ex.loggedSets.map((set, setIdx) => (
                          <div
                            key={setIdx}
                            className={`p-3 rounded-xl border space-y-2 transition-all ${
                              set.completed
                                ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-100'
                                : 'bg-[#121724] border-slate-800 text-slate-300'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-xs text-blue-300">Set {set.setNum}</span>
                              <button
                                onClick={() => handleToggleSet(ex.id, setIdx)}
                                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1 cursor-pointer ${
                                  set.completed
                                    ? 'bg-emerald-500 text-slate-950 shadow-sm'
                                    : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700'
                                }`}
                              >
                                <Check className="w-3 h-3" />
                                <span>{set.completed ? 'Done' : 'Mark'}</span>
                              </button>
                            </div>

                            <div className="grid grid-cols-2 gap-2 text-xs">
                              <div>
                                <span className="text-[10px] text-slate-400 block font-semibold">Weight (kg)</span>
                                <input
                                  type="number"
                                  disabled={set.completed}
                                  value={set.weight}
                                  onChange={(e) => handleUpdateSetField(ex.id, setIdx, 'weight', e.target.value)}
                                  className={`w-full font-bold rounded-lg px-2 py-1 border text-center transition-all ${
                                    set.completed
                                      ? 'bg-emerald-950/60 text-emerald-300 border-emerald-700/60 cursor-not-allowed opacity-80'
                                      : 'bg-[#1b2336] text-slate-100 border-slate-700/60 focus:outline-none focus:border-blue-500'
                                  }`}
                                />
                              </div>
                              <div>
                                <span className="text-[10px] text-slate-400 block font-semibold">Reps</span>
                                <input
                                  type="number"
                                  disabled={set.completed}
                                  value={set.reps}
                                  onChange={(e) => handleUpdateSetField(ex.id, setIdx, 'reps', e.target.value)}
                                  className={`w-full font-bold rounded-lg px-2 py-1 border text-center transition-all ${
                                    set.completed
                                      ? 'bg-emerald-950/60 text-emerald-300 border-emerald-700/60 cursor-not-allowed opacity-80'
                                      : 'bg-[#1b2336] text-slate-100 border-slate-700/60 focus:outline-none focus:border-blue-500'
                                  }`}
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Section 2: Nutrition & Prescribed Meals Plan (Full Details) */}
            <div className="bg-[#121724] border border-slate-800/90 rounded-2xl p-5 md:p-6 shadow-xl space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-950/80 border border-amber-800/60 flex items-center justify-center text-amber-400">
                    <Utensils className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-serif-header text-lg font-bold text-white">Nutrition & Prescribed Meal Plan</h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Daily Target: {clientData?.targetKcal || 2450} kcal • Protein: 180g • Carbs: 240g • Fats: 80g
                    </p>
                  </div>
                </div>

                <span className="text-xs font-mono font-semibold text-amber-300 bg-amber-950/80 px-3 py-1.5 rounded-xl border border-amber-800/60">
                  {Object.values(meals).flatMap(c => c.items).filter(i => i.eaten).length} / {Object.values(meals).flatMap(c => c.items).length} Meals Eaten
                </span>
              </div>

              {/* Daily Macro Progress Summary Bars (Fully Dynamic Tracking) */}
              {(() => {
                const eatenItems = Object.values(meals).flatMap(c => c.items).filter(i => i.eaten);
                const loggedKcal = eatenItems.reduce((acc, curr) => acc + (curr.kcal || 0), 0);
                const loggedProtein = eatenItems.reduce((acc, curr) => acc + (curr.protein || 0), 0);
                const loggedCarbs = eatenItems.reduce((acc, curr) => acc + (curr.carbs || 0), 0);
                const loggedFats = eatenItems.reduce((acc, curr) => acc + (curr.fats || 0), 0);

                const targetKcal = clientData?.targetKcal || 2450;
                const targetProtein = clientData?.targetProtein || 180;
                const targetCarbs = clientData?.targetCarbs || 240;
                const targetFats = clientData?.targetFats || 80;

                return (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#171e2e] border border-slate-700/60 rounded-xl p-4">
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase font-bold block">CALORIES</span>
                      <span className="text-sm font-black text-slate-100">
                        {loggedKcal} / {targetKcal} kcal
                      </span>
                      <div className="w-full h-1.5 bg-slate-800 rounded-full mt-1.5 overflow-hidden">
                        <div
                          className="h-full bg-blue-500 rounded-full transition-all duration-300"
                          style={{ width: `${Math.min(100, Math.round((loggedKcal / targetKcal) * 100))}%` }}
                        />
                      </div>
                    </div>

                    <div>
                      <span className="text-[10px] text-slate-400 uppercase font-bold block">PROTEIN</span>
                      <span className="text-sm font-black text-rose-400">{loggedProtein}g / {targetProtein}g</span>
                      <div className="w-full h-1.5 bg-slate-800 rounded-full mt-1.5 overflow-hidden">
                        <div
                          className="h-full bg-rose-500 rounded-full transition-all duration-300"
                          style={{ width: `${Math.min(100, Math.round((loggedProtein / targetProtein) * 100))}%` }}
                        />
                      </div>
                    </div>

                    <div>
                      <span className="text-[10px] text-slate-400 uppercase font-bold block">CARBS</span>
                      <span className="text-sm font-black text-amber-400">{loggedCarbs}g / {targetCarbs}g</span>
                      <div className="w-full h-1.5 bg-slate-800 rounded-full mt-1.5 overflow-hidden">
                        <div
                          className="h-full bg-amber-500 rounded-full transition-all duration-300"
                          style={{ width: `${Math.min(100, Math.round((loggedCarbs / targetCarbs) * 100))}%` }}
                        />
                      </div>
                    </div>

                    <div>
                      <span className="text-[10px] text-slate-400 uppercase font-bold block">FATS</span>
                      <span className="text-sm font-black text-emerald-400">{loggedFats}g / {targetFats}g</span>
                      <div className="w-full h-1.5 bg-slate-800 rounded-full mt-1.5 overflow-hidden">
                        <div
                          className="h-full bg-emerald-500 rounded-full transition-all duration-300"
                          style={{ width: `${Math.min(100, Math.round((loggedFats / targetFats) * 100))}%` }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })()}

              {/* Meal Checklist Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.keys(meals).map((catKey) => {
                  const cat = meals[catKey];
                  const IconComp = cat.icon;
                  return (
                    <div key={catKey} className="bg-[#171e2e] border border-slate-700/60 rounded-xl p-4 space-y-3">
                      <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                        <span className="font-bold text-xs text-blue-300 flex items-center gap-2">
                          {IconComp && <IconComp className="w-4 h-4 text-amber-400" />}
                          {cat.title}
                        </span>
                        <span className="text-[10px] font-mono text-slate-400 font-semibold">
                          {cat.items.reduce((a, b) => a + (b.kcal || 0), 0)} kcal
                        </span>
                      </div>

                      {cat.items.map((item, iIdx) => (
                        <div
                          key={iIdx}
                          onClick={() => handleToggleMeal(catKey, iIdx)}
                          className={`flex items-center justify-between p-3 rounded-lg border text-xs cursor-pointer transition-all ${
                            item.eaten
                              ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-100 shadow-sm'
                              : 'bg-[#121724] border-slate-800 text-slate-300 hover:border-slate-700'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-5 h-5 rounded-md flex items-center justify-center border transition-all ${
                              item.eaten ? 'bg-emerald-500 border-emerald-400 text-slate-950' : 'border-slate-600 bg-slate-900'
                            }`}>
                              {item.eaten && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                            </div>
                            <div>
                              <span className={item.eaten ? 'line-through text-slate-300 font-medium' : 'font-semibold'}>
                                {item.name}
                              </span>
                              <div className="text-[10px] font-mono flex items-center gap-1.5 mt-0.5">
                                <span className="text-rose-400 font-semibold">P: {item.protein || 0}g</span>
                                <span className="text-slate-600">•</span>
                                <span className="text-amber-400 font-semibold">C: {item.carbs || 0}g</span>
                                <span className="text-slate-600">•</span>
                                <span className="text-emerald-400 font-semibold">F: {item.fats || 0}g</span>
                              </div>
                            </div>
                          </div>
                          <span className="font-mono text-xs text-slate-300 font-bold shrink-0">{item.kcal} kcal</span>
                        </div>
                      ))}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Section 3: Weekly Evaluation Form & Progress Photos (Design Matched to User Image) */}
            <div id="weekly-form-section" className="scroll-mt-28 bg-[#121724] border border-slate-800/90 rounded-2xl p-5 md:p-6 shadow-xl space-y-6">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div>
                  <h3 className="font-serif-header text-xl font-bold text-white tracking-tight">
                    Weekly Evaluation Form
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Rate your weekly energy and sleep quality, and upload your 3 weekly progress photos.
                  </p>
                </div>
                <span className="text-[10px] font-extrabold text-amber-300 bg-amber-950 px-2.5 py-1 rounded-full border border-amber-800/60">
                  REQUIRED EVERY SUNDAY
                </span>
              </div>

              {/* Sliders Area (Styled like reference image) */}
              <div className="space-y-6 pt-1">
                {/* Energy & Vitality */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span className="text-slate-300">Energy & Vitality (1–10)</span>
                    <span className="text-blue-400 font-extrabold font-mono text-sm">{energyScore} / 10</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={energyScore}
                    onChange={(e) => setEnergyScore(e.target.value)}
                    className="w-full h-2 bg-slate-800 rounded-lg accent-blue-400 cursor-pointer"
                  />
                </div>

                {/* Sleep Quality */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span className="text-slate-300">Sleep Quality (1–10)</span>
                    <span className="text-sky-400 font-extrabold font-mono text-sm">{sleepScore} / 10</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={sleepScore}
                    onChange={(e) => setSleepScore(e.target.value)}
                    className="w-full h-2 bg-slate-800 rounded-lg accent-sky-400 cursor-pointer"
                  />
                </div>
              </div>

              {/* Upload Weekly Progress Photos Section (Matching 3-Card Layout in reference image) */}
              <div className="space-y-3 pt-4 border-t border-slate-800">
                <h4 className="text-xs font-bold text-slate-200">Upload Weekly Progress Photos</h4>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { pose: 'front', title: 'FRONT VIEW' },
                    { pose: 'side', title: 'SIDE VIEW' },
                    { pose: 'back', title: 'BACK VIEW' },
                  ].map(({ pose, title }) => {
                    const hasPhoto = Boolean(progressPhotos[pose]);
                    return (
                      <label
                        key={pose}
                        className={`relative border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all flex flex-col items-center justify-center min-h-[120px] ${
                          hasPhoto
                            ? 'border-emerald-500/80 bg-emerald-950/20'
                            : 'border-slate-800 hover:border-blue-500/60 bg-[#171e2e]'
                        }`}
                      >
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handlePhotoUpload(pose, e)}
                          className="hidden"
                        />

                        {hasPhoto ? (
                          <div className="relative w-full h-24 rounded-lg overflow-hidden border border-emerald-500/60">
                            <img src={progressPhotos[pose]} alt={title} className="w-full h-full object-cover" />
                            <span className="absolute bottom-1 right-1 bg-slate-950/90 text-emerald-400 px-2 py-0.5 rounded text-[9px] font-bold">
                              ✓ Uploaded
                            </span>
                          </div>
                        ) : (
                          <>
                            <Upload className="w-6 h-6 text-slate-400 mb-2 group-hover:scale-110 transition-transform" />
                            <span className="text-xs font-bold tracking-wider text-slate-300 uppercase">
                              {title}
                            </span>
                          </>
                        )}
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Dedicated Submit Button for Weekly Evaluation & Photos */}
              <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 bg-[#171e2e] p-4 rounded-xl border border-slate-700/60">
                <div>
                  <h5 className="text-xs font-bold text-slate-100 flex items-center gap-2 flex-wrap">
                    <span>Weekly Evaluation Submission</span>
                    {isWeeklyEvaluationSubmitted ? (
                      <span className="text-[10px] text-emerald-400 font-extrabold bg-emerald-950 px-2 py-0.5 rounded-full border border-emerald-800">
                        ✓ SUBMITTED THIS WEEK ({weeklySubmittedTimestamp})
                      </span>
                    ) : (
                      <span className="text-[10px] text-amber-400 font-bold bg-amber-950/80 px-2 py-0.5 rounded-full border border-amber-800">
                        PENDING SUNDAY SUBMISSION
                      </span>
                    )}
                  </h5>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Submits your weekly Energy score, Sleep score, and 3 progress photos to Coach Alex.
                  </p>
                </div>

                <button
                  onClick={handleWeeklyEvaluationSubmit}
                  className="w-full sm:w-auto px-5 py-2.5 bg-gradient-to-r from-amber-500 via-amber-600 to-amber-500 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-extrabold text-xs rounded-xl shadow-lg shadow-amber-500/25 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer shrink-0"
                >
                  <Calendar className="w-4 h-4" />
                  <span>{isWeeklyEvaluationSubmitted ? 'Resubmit Weekly Evaluation' : 'Submit Weekly Evaluation & Photos'}</span>
                </button>
              </div>
            </div>

            {/* Section 4: Extra Activities & Daily Notes for Coach */}
            <div className="bg-[#121724] border border-slate-800/90 rounded-2xl p-5 md:p-6 shadow-xl space-y-3">
              <h3 className="font-serif-header text-sm font-bold text-slate-100 flex items-center gap-2 border-b border-slate-800 pb-2.5">
                <FileText className="w-4 h-4 text-blue-400" />
                <span>Extra Activities & Daily Notes for Coach</span>
              </h3>
              <p className="text-xs text-slate-400">
                Log any extra cardio, steps, off-plan foods, or physical comments for Coach Alex:
              </p>
              <textarea
                value={extraActivitiesNotes}
                onChange={(e) => setExtraActivitiesNotes(e.target.value)}
                rows={4}
                className="w-full bg-[#171e2e] border border-slate-700/70 rounded-xl p-3.5 text-xs text-slate-200 focus:outline-none focus:border-blue-500 resize-none placeholder:text-slate-500"
                placeholder="e.g. Completed 30 min fasted walk (8,500 steps). Shoulder felt great during bench press. Drank extra water today..."
              />
            </div>

            {/* Section 5: Master Daily Check-In Submit Card */}
            <div className="bg-[#121724] border border-slate-800/90 rounded-2xl p-5 md:p-6 shadow-xl text-center space-y-3">
              <p className="text-xs text-slate-300 font-medium">
                Today's eaten meals checklist, completed workout sets, and extra notes will be sent directly to Coach Alex. <span className="text-slate-400 font-normal">(Weekly Evaluation Form is submitted separately above).</span>
              </p>
              <button
                onClick={handleDailyLogSubmit}
                className="w-full py-3.5 bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-600 hover:from-blue-400 hover:to-indigo-400 text-white font-bold text-sm rounded-xl shadow-lg shadow-blue-500/25 active:scale-[0.99] transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>{isDailyLogSubmittedToday ? 'Resubmit Daily Check-In Only' : 'Submit Daily Check-In Only'}</span>
              </button>
            </div>
          </div>
        )}

        {/* TAB 1: FOOD SWAPS VIEW */}
        {activeTab === 'food-swaps' && <ClientFoodSwapsPage showToast={showToast} />}

        {/* TAB 2: EXERCISE SUBSTITUTIONS VIEW */}
        {activeTab === 'substitutions' && <ClientSubstitutionsPage showToast={showToast} />}

        {/* TAB 3: CLIENT NOTIFICATIONS VIEW */}
        {activeTab === 'notifications' && (
          <div className="bg-[#121724] border border-slate-800/90 rounded-2xl p-5 md:p-6 shadow-xl space-y-5">
            {/* Header & Quick Action Buttons */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                  <Bell className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-serif-header text-lg font-bold text-slate-100">
                      Notifications & Activity Log
                    </h3>
                    {clientNotifications.filter((n) => n.unread).length > 0 && (
                      <span className="text-[10px] font-bold text-amber-300 bg-amber-950 px-2 py-0.5 rounded-full border border-amber-800">
                        {clientNotifications.filter((n) => n.unread).length} Unread
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Click any notification action to navigate directly to the requested section.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setClientNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
                    if (showToast) showToast('Marked all notifications as read!');
                  }}
                  className="px-3 py-1.5 bg-[#171e2e] hover:bg-slate-800 text-blue-300 border border-slate-700/60 rounded-xl text-xs font-semibold transition-all cursor-pointer"
                >
                  Mark all as read
                </button>
              </div>
            </div>

            {/* Filter Pills Bar */}
            <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-1">
              {['ALL', 'UNREAD', 'WORKOUT', 'EXERCISE', 'NUTRITION', 'CHECKIN', 'COACH'].map((cat) => {
                const isActive = clientNotifFilter === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setClientNotifFilter(cat)}
                    className={`px-3 py-1 rounded-xl text-xs font-semibold transition-all shrink-0 cursor-pointer ${
                      isActive
                        ? 'bg-blue-600/40 text-blue-200 border border-blue-500/40 shadow-sm'
                        : 'bg-[#171e2e] text-slate-400 hover:text-slate-200 border border-slate-800'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>

            {/* Notifications List */}
            {clientNotifications.length === 0 ? (
              <div className="text-center py-10 text-slate-500 space-y-2">
                <Bell className="w-8 h-8 mx-auto text-slate-600" />
                <p className="text-xs">No notifications in your inbox.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {clientNotifications
                  .filter((n) => {
                    if (clientNotifFilter === 'ALL') return true;
                    if (clientNotifFilter === 'UNREAD') return n.unread;
                    return n.category === clientNotifFilter;
                  })
                  .map((n) => {
                    const getIcon = () => {
                      switch (n.category) {
                        case 'EXERCISE':
                          return <RefreshCw className="w-4 h-4 text-amber-400" />;
                        case 'NUTRITION':
                          return <Apple className="w-4 h-4 text-emerald-400" />;
                        case 'WORKOUT':
                          return <Dumbbell className="w-4 h-4 text-blue-400" />;
                        case 'COACH':
                          return <MessageSquare className="w-4 h-4 text-sky-400" />;
                        case 'CHECKIN':
                          return <Calendar className="w-4 h-4 text-indigo-400" />;
                        default:
                          return <Bell className="w-4 h-4 text-blue-400" />;
                      }
                    };

                    return (
                      <div
                        key={n.id}
                        className={`p-4 rounded-2xl border transition-all space-y-3 ${
                          n.unread
                            ? 'bg-[#162035] border-blue-500/40 shadow-md ring-1 ring-blue-500/20'
                            : 'bg-[#141b2c] border-slate-800/80 hover:border-slate-700'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-start gap-3">
                            <div className="w-9 h-9 rounded-xl bg-slate-800/80 border border-slate-700 flex items-center justify-center shrink-0 mt-0.5">
                              {getIcon()}
                            </div>
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <h4 className="text-xs font-bold text-slate-100">{n.title}</h4>
                                {n.unread && (
                                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                                )}
                              </div>
                              <p className="text-xs text-slate-300 leading-relaxed">{n.message}</p>
                              <span className="text-[10px] text-slate-500 font-mono block">
                                {n.time}
                              </span>
                            </div>
                          </div>

                          <button
                            onClick={() => {
                              setClientNotifications((prev) => prev.filter((item) => item.id !== n.id));
                              if (showToast) showToast('Notification removed', 'info');
                            }}
                            className="p-1 text-slate-500 hover:text-red-400 rounded-lg transition-colors cursor-pointer shrink-0"
                            title="Remove Notification"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Action Navigation Trigger */}
                        <div className="flex items-center justify-end pt-2 border-t border-slate-800/60">
                          <button
                            onClick={() => {
                              setClientNotifications((prev) =>
                                prev.map((item) => (item.id === n.id ? { ...item, unread: false } : item))
                              );
                              if (n.targetTab === 'chat') {
                                setIsChatOpen(true);
                                if (showToast) showToast('Opening chat with Coach Alex...');
                              } else {
                                setActiveTab(n.targetTab);
                                if (showToast) showToast(`Navigating to ${n.actionLabel}...`);
                              }
                            }}
                            className="px-3 py-1.5 bg-blue-950/70 hover:bg-blue-900/90 text-blue-300 border border-blue-800/60 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer shadow-sm"
                          >
                            <span>{n.actionLabel}</span>
                            <ExternalLink className="w-3.5 h-3.5 text-blue-400" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
              </div>
            )}
          </div>
        )}
      </main>
    </div>

      {/* Floating Direct Coach Chat Drawer */}
      {isChatOpen && (
        <div className="fixed bottom-3 right-3 left-3 sm:left-auto sm:right-4 sm:w-96 bg-[#0f1422] border border-slate-800 rounded-2xl shadow-2xl z-50 overflow-hidden animate-in slide-in-from-bottom-5 duration-200">
          <div className="flex items-center justify-between p-4 border-b border-slate-800 bg-[#141b2c]">
            <div className="flex items-center gap-2.5">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
                alt="Coach Alex"
                className="w-8 h-8 rounded-full object-cover ring-2 ring-blue-500/40"
              />
              <div>
                <h4 className="text-xs font-bold text-slate-100">Coach Alex Thorne</h4>
                <span className="text-[10px] text-emerald-400 font-semibold">Online & Active</span>
              </div>
            </div>
            <button onClick={() => setIsChatOpen(false)} className="p-1 text-slate-400 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages */}
          <div className="p-4 h-64 overflow-y-auto space-y-3 text-xs">
            {chatMessages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'client' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`p-3 rounded-xl max-w-[85%] ${
                    msg.sender === 'client'
                      ? 'bg-blue-600 text-white rounded-br-none'
                      : 'bg-[#1b2336] text-slate-200 border border-slate-800 rounded-bl-none'
                  }`}
                >
                  {msg.text && <p>{msg.text}</p>}
                  {msg.image && (
                    <div className={`${msg.text ? 'mt-2' : ''} group relative overflow-hidden rounded-lg border border-slate-700/80 cursor-pointer`}>
                      <img
                        src={msg.image}
                        alt="Attachment"
                        onClick={() => setClientLightboxImage(msg.image)}
                        className="max-h-48 object-cover rounded-lg"
                      />
                    </div>
                  )}
                </div>
                <span className="text-[9px] text-slate-500 mt-1">{msg.time}</span>
              </div>
            ))}
          </div>

          {clientChatImage && (
            <div className="px-3 py-1.5 bg-[#0c101c] border-t border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img src={clientChatImage} alt="Attachment" className="w-8 h-8 object-cover rounded border border-blue-500/60" />
                <span className="text-[10px] text-blue-300">Image attached</span>
              </div>
              <button onClick={() => setClientChatImage(null)} className="text-rose-400 text-xs">
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* Input */}
          <div className="p-3 border-t border-slate-800 flex items-center gap-2 bg-[#0c101c]">
            <label className="p-2 bg-[#171e2e] hover:bg-slate-800 text-slate-300 border border-slate-700/60 rounded-xl cursor-pointer" title="Attach Photo">
              <ImageIcon className="w-4 h-4 text-amber-400" />
              <input type="file" accept="image/*" onChange={handleClientImageFileChange} className="hidden" />
            </label>
            <input
              type="text"
              placeholder="Type message to coach..."
              value={newMessageText}
              onChange={(e) => setNewMessageText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              className="flex-1 bg-[#171e2e] text-slate-200 text-xs rounded-xl px-3 py-2 border border-slate-700/60 focus:outline-none"
            />
            <button
              onClick={handleSendMessage}
              className="p-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Client Lightbox Image Modal */}
      {clientLightboxImage && (
        <div
          onClick={() => setClientLightboxImage(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md animate-in fade-in duration-200"
        >
          <div className="relative max-w-3xl max-h-[85vh] overflow-hidden rounded-2xl border border-slate-800 shadow-2xl">
            <img src={clientLightboxImage} alt="Enlarged preview" className="w-full h-full object-contain" />
            <button
              onClick={() => setClientLightboxImage(null)}
              className="absolute top-4 right-4 p-2 bg-slate-900/80 text-slate-200 hover:text-white rounded-full border border-slate-700"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* Exercise Swap Request Modal */}
      {isSwapModalOpen && selectedExerciseToSwap && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-[#121724] border border-slate-800 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-serif-header text-base font-bold text-slate-100">
                Request Substitution for {selectedExerciseToSwap.name}
              </h3>
              <button onClick={() => setIsSwapModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-400 font-semibold mb-1">Reason Category</label>
                <select
                  value={swapReasonCategory}
                  onChange={(e) => setSwapReasonCategory(e.target.value)}
                  className="w-full bg-[#171e2e] text-slate-200 p-2.5 rounded-xl border border-slate-700/60"
                >
                  <option value="Equipment Missing">Equipment Missing in Gym</option>
                  <option value="Joint Pain">Joint Pain / Discomfort</option>
                  <option value="Injury Recovery">Injury Recovery</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-400 font-semibold mb-1">Notes for Coach (Optional)</label>
                <textarea
                  rows="2"
                  placeholder="e.g. Cable machine cable broke, need DB alternative"
                  value={swapReasonNote}
                  onChange={(e) => setSwapReasonNote(e.target.value)}
                  className="w-full bg-[#171e2e] text-slate-200 p-2.5 rounded-xl border border-slate-700/60"
                />
              </div>

              <button
                onClick={handleSubmitSwapRequest}
                className="w-full py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold rounded-xl shadow-md"
              >
                Send Swap Request to Coach
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Video Modal */}
      {isVideoOpen && selectedVideoExercise && (
        <WatchVideoModal
          isOpen={isVideoOpen}
          onClose={() => setIsVideoOpen(false)}
          exercise={selectedVideoExercise}
        />
      )}
    </div>
  );
}
