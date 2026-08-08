import React, { useState } from 'react';
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
  Flame, 
  Award,
  ChevronRight,
  Sun,
  Moon,
  Cookie,
  UserCheck,
  FileText,
  Bell,
  Check,
  CheckCheck,
  Menu,
  Search
} from 'lucide-react';
import WatchVideoModal from '../Modals/WatchVideoModal';

export default function ClientPortalPage({ clientData, onLogout, showToast }) {
  const [activeTab, setActiveTab] = useState('workout'); // 'workout' | 'nutrition' | 'checkin' | 'notifications'
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isChatOpen, setIsChatOpen] = useState(false);

  const getClientHeaderTitle = () => {
    switch (activeTab) {
      case 'workout':
        return "Today's Workout Protocol";
      case 'nutrition':
        return 'Nutrition & Meals Plan';
      case 'checkin':
        return 'Weekly Progress Check-In';
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
  const [newMessageText, setNewMessageText] = useState('');

  // Client Notifications State
  const [clientNotifications, setClientNotifications] = useState([
    {
      id: 'cn1',
      title: 'Exercise Swap Approved',
      message: 'Coach Alex Thorne approved your substitution request for Barbell Squat.',
      time: '20 mins ago',
      unread: true,
    },
    {
      id: 'cn2',
      title: 'New Program Split Assigned',
      message: 'Push Hypertrophy Week 4 split was assigned to your schedule.',
      time: '2 hours ago',
      unread: true,
    },
    {
      id: 'cn3',
      title: 'Coach Feedback on Progress Photo',
      message: 'Great shoulder width progress! Keep protein target at 180g.',
      time: '1 day ago',
      unread: false,
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

  // Meals Checklist State
  const [meals, setMeals] = useState({
    breakfast: { title: 'Breakfast', icon: Sun, items: [{ name: 'Scrambled Eggs (3 eggs) & Toast', kcal: 420, eaten: true }] },
    lunch: { title: 'Lunch', icon: Utensils, items: [{ name: 'Grilled Chicken (200g) & Rice', kcal: 650, eaten: true }] },
    dinner: { title: 'Dinner', icon: Moon, items: [{ name: 'Salmon Filet & Sweet Potato', kcal: 580, eaten: false }] },
    snacks: { title: 'Snacks', icon: Cookie, items: [{ name: 'Whey Protein Scoop & Almonds', kcal: 280, eaten: false }] },
  });

  // Weekly Checkin State
  const [energyScore, setEnergyScore] = useState(8);
  const [sleepScore, setSleepScore] = useState(7);
  const [stressScore, setStressScore] = useState(3);
  const [uploadedPhotos, setUploadedPhotos] = useState({ front: false, side: false, back: false });

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

  const handleSubmitWorkoutReport = () => {
    if (showToast) showToast('Submitted workout report to Coach Alex Thorne!');
  };

  const handleToggleMeal = (catKey, itemIdx) => {
    setMeals((prev) => {
      const catItems = [...prev[catKey].items];
      catItems[itemIdx] = { ...catItems[itemIdx], eaten: !catItems[itemIdx].eaten };
      return { ...prev, [catKey]: { ...prev[catKey], items: catItems } };
    });
  };

  const handleSendMessage = () => {
    if (!newMessageText.trim()) return;
    setChatMessages((prev) => [
      ...prev,
      { id: Date.now(), sender: 'client', text: newMessageText, time: 'Just now' },
    ]);
    setNewMessageText('');
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
        className={`bg-[#0a0d16] border-r border-slate-800/80 flex flex-col justify-between select-none shrink-0 z-50 w-72 max-w-[85vw] md:w-64 fixed inset-y-0 left-0 h-full md:sticky md:top-0 md:h-screen transition-transform duration-300 ease-in-out ${
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
              { id: 'workout', label: "Today's Workout", icon: Dumbbell },
              { id: 'nutrition', label: 'Nutrition & Meals', icon: Utensils },
              { id: 'checkin', label: 'Weekly Check-In', icon: Calendar },
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
                  <Icon className={`w-4 h-4 transition-transform group-hover:scale-110 ${isActive ? 'text-blue-400' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
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
          <div className="flex items-center gap-3 pt-1">
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

            {/* Client Tier & Connected Coach Badge */}
            <div className="hidden lg:flex items-center gap-3 px-3 py-1.5 rounded-xl bg-[#131926] border border-blue-500/20 shadow-sm">
              <div className="flex flex-col text-right">
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-bold text-blue-400 bg-blue-950/80 px-1.5 py-0.5 rounded border border-blue-800/60 uppercase">
                    {clientData?.tier || 'PRO ATHLETE'}
                  </span>
                  <span className="text-xs font-semibold text-slate-200">{clientData?.name || 'Marcus Jensen'}</span>
                </div>
                <span className="text-[10px] text-slate-400">Coach: Alex Thorne</span>
              </div>
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
        <main className="p-4 sm:p-6 md:p-8 flex-1 space-y-6 max-w-5xl">

        {/* TAB 1: WORKOUT EXECUTION VIEW */}
        {activeTab === 'workout' && (
          <div className="space-y-6">
            {/* Workout Banner Card */}
            <div className="bg-gradient-to-r from-blue-950/60 via-indigo-950/40 to-slate-900 border border-blue-500/30 rounded-2xl p-5 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400 bg-blue-900/60 px-2 py-0.5 rounded border border-blue-700/60">
                  DAY 02 PROTOCOL
                </span>
                <h2 className="font-serif-header text-2xl font-bold text-white mt-1">
                  Push Hypertrophy Split
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Target: Chest, Shoulders & Triceps • Est. Duration: 45 Mins
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5 bg-slate-900/80 px-3 py-1.5 rounded-xl border border-slate-800 text-xs font-semibold text-amber-400">
                  <Flame className="w-4 h-4" />
                  <span>Streak: 14 Days</span>
                </div>
              </div>
            </div>

            {/* Exercise List */}
            <div className="space-y-5">
              {exercises.map((ex) => {
                const isAllSetsComplete = ex.loggedSets.length > 0 && ex.loggedSets.every((s) => s.completed);
                return (
                  <div
                    key={ex.id}
                    className={`border rounded-2xl p-5 shadow-lg space-y-4 transition-all ${
                      isAllSetsComplete
                        ? 'bg-[#101c18] border-emerald-500/60 shadow-emerald-950/20'
                        : 'bg-[#121724] border-slate-800/90'
                    }`}
                  >
                    {/* Exercise Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-sm font-bold text-slate-100">{ex.name}</h3>
                          <span className="text-[10px] font-semibold text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
                            {ex.target}
                          </span>
                          {isAllSetsComplete && (
                            <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/90 px-2 py-0.5 rounded border border-emerald-800/60 flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3" /> Completed
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-400 mt-0.5">
                          Prescribed: <strong className="text-slate-200">{ex.sets} Sets x {ex.reps} Reps</strong> • Tempo: <span className="font-mono text-blue-300">{ex.tempo}</span>
                        </p>
                      </div>

                      <div className="flex items-center gap-2 flex-wrap">
                        {/* Whole Exercise Complete Check Button */}
                        <button
                          onClick={() => handleToggleWholeExercise(ex.id)}
                          className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                            isAllSetsComplete
                              ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                              : 'bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-slate-700'
                          }`}
                          title="Mark all sets in this exercise completed"
                        >
                          <Check className="w-4 h-4" />
                          <span>{isAllSetsComplete ? 'Done ✅' : 'Check Exercise'}</span>
                        </button>

                        {/* Video Tutorial Trigger */}
                        <button
                          onClick={() => {
                            setSelectedVideoExercise(ex);
                            setIsVideoOpen(true);
                          }}
                          className="flex items-center gap-1 px-2.5 py-1.5 bg-blue-950/60 hover:bg-blue-900/80 text-blue-300 border border-blue-800/60 text-xs font-semibold rounded-xl transition-all cursor-pointer"
                        >
                          <Play className="w-3.5 h-3.5" />
                          <span>Watch Demo</span>
                        </button>

                        {/* Request Substitution Trigger */}
                        <button
                          onClick={() => handleOpenSwapModal(ex)}
                          className="flex items-center gap-1 px-2.5 py-1.5 bg-amber-950/60 hover:bg-amber-900/80 text-amber-300 border border-amber-800/60 text-xs font-semibold rounded-xl transition-all cursor-pointer"
                          title="Request machine swap or alternative"
                        >
                          <RefreshCw className="w-3.5 h-3.5" />
                          <span>Request Swap</span>
                        </button>
                      </div>
                    </div>

                    {/* Interactive Sets Table */}
                    <div className="space-y-2 text-xs">
                      <div className="grid grid-cols-5 text-[10px] font-bold text-slate-400 uppercase tracking-wider px-3">
                        <span>Set</span>
                        <span>Reps</span>
                        <span>Weight (kg)</span>
                        <span>RPE (1-10)</span>
                        <span className="text-right">Log Set</span>
                      </div>

                      {ex.loggedSets.map((set, idx) => (
                        <div
                          key={idx}
                          className={`grid grid-cols-5 items-center p-2.5 rounded-xl border transition-all ${
                            set.completed
                              ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-100 font-semibold'
                              : 'bg-[#171e2e] border-slate-800 text-slate-300'
                          }`}
                        >
                          <span className="font-bold text-slate-400">Set {set.setNum}</span>

                          <input
                            type="number"
                            value={set.reps}
                            onChange={(e) => handleUpdateSetField(ex.id, idx, 'reps', e.target.value)}
                            className="w-16 bg-[#111622] text-slate-100 text-xs p-1.5 rounded-lg border border-slate-700/60 text-center font-semibold"
                          />

                          <input
                            type="number"
                            value={set.weight}
                            onChange={(e) => handleUpdateSetField(ex.id, idx, 'weight', e.target.value)}
                            className="w-16 bg-[#111622] text-slate-100 text-xs p-1.5 rounded-lg border border-slate-700/60 text-center font-semibold"
                          />

                          <input
                            type="number"
                            step="0.5"
                            value={set.rpe}
                            onChange={(e) => handleUpdateSetField(ex.id, idx, 'rpe', e.target.value)}
                            className="w-16 bg-[#111622] text-slate-100 text-xs p-1.5 rounded-lg border border-slate-700/60 text-center font-semibold"
                          />

                          <div className="flex justify-end">
                            <button
                              onClick={() => handleToggleSet(ex.id, idx)}
                              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1 cursor-pointer ${
                                set.completed
                                  ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-md shadow-emerald-500/20'
                                  : 'bg-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-700 border border-slate-700'
                              }`}
                              title={set.completed ? 'Set completed' : 'Mark set complete'}
                            >
                              <Check className="w-3.5 h-3.5" />
                              <span>{set.completed ? 'Done' : 'Check'}</span>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Complete Workout Button */}
            <div className="pt-2">
              <button
                onClick={handleSubmitWorkoutReport}
                className="w-full py-4 bg-gradient-to-r from-blue-400 via-sky-300 to-blue-300 hover:from-blue-300 hover:to-sky-200 text-slate-950 font-bold text-sm rounded-2xl shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <CheckCircle2 className="w-5 h-5" />
                <span>Finish & Submit Workout Report to Coach</span>
              </button>
            </div>
          </div>
        )}

        {/* TAB 2: NUTRITION & MEALS VIEW */}
        {activeTab === 'nutrition' && (
          <div className="space-y-6">
            {/* Daily Macro Targets Card */}
            <div className="bg-[#121724] border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-serif-header text-lg font-bold text-white">Daily Macro Goal</h3>
                  <p className="text-xs text-slate-400">Target Calories: <strong className="text-blue-300">2,450 kcal</strong></p>
                </div>
                <button
                  onClick={() => showToast && showToast('Opening official Coach PDF meal plan...')}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-950/60 hover:bg-blue-900/80 text-blue-300 border border-blue-800/60 rounded-xl text-xs font-semibold transition-all"
                >
                  <FileText className="w-4 h-4" />
                  <span>View Coach PDF Plan</span>
                </button>
              </div>

              {/* Macro Bars */}
              <div className="grid grid-cols-3 gap-3 text-xs">
                <div className="bg-[#171e2e] p-3 rounded-xl border border-slate-800">
                  <span className="text-slate-400 font-semibold block">Protein Target</span>
                  <span className="text-sm font-bold text-slate-100">185g</span>
                </div>
                <div className="bg-[#171e2e] p-3 rounded-xl border border-slate-800">
                  <span className="text-slate-400 font-semibold block">Carbs Target</span>
                  <span className="text-sm font-bold text-slate-100">240g</span>
                </div>
                <div className="bg-[#171e2e] p-3 rounded-xl border border-slate-800">
                  <span className="text-slate-400 font-semibold block">Fats Target</span>
                  <span className="text-sm font-bold text-slate-100">70g</span>
                </div>
              </div>
            </div>

            {/* Meals List Checklist */}
            <div className="space-y-4">
              {Object.entries(meals).map(([key, cat]) => {
                const Icon = cat.icon;
                return (
                  <div key={key} className="bg-[#121724] border border-slate-800 rounded-2xl p-5 shadow-lg space-y-3">
                    <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
                      <Icon className="w-4 h-4 text-blue-400" />
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">{cat.title}</h4>
                    </div>

                    <div className="space-y-2">
                      {cat.items.map((item, idx) => (
                        <div
                          key={idx}
                          onClick={() => handleToggleMeal(key, idx)}
                          className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                            item.eaten
                              ? 'bg-emerald-950/30 border-emerald-800/50 text-emerald-200'
                              : 'bg-[#171e2e] border-slate-800 text-slate-300'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <CheckCircle2 className={`w-4 h-4 ${item.eaten ? 'text-emerald-400' : 'text-slate-600'}`} />
                            <span className={`text-xs font-semibold ${item.eaten ? 'line-through opacity-70' : ''}`}>
                              {item.name}
                            </span>
                          </div>
                          <span className="text-xs font-mono text-slate-400">{item.kcal} kcal</span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 3: WEEKLY CHECK-IN VIEW */}
        {activeTab === 'checkin' && (
          <div className="space-y-6">
            <div className="bg-[#121724] border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5">
              <h3 className="font-serif-header text-lg font-bold text-white">Weekly Evaluation Form</h3>

              <div className="space-y-4 text-xs">
                <div>
                  <div className="flex justify-between font-semibold mb-1">
                    <span className="text-slate-400">Energy & Vitality (1-10)</span>
                    <span className="text-blue-300 font-bold">{energyScore} / 10</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={energyScore}
                    onChange={(e) => setEnergyScore(e.target.value)}
                    className="w-full h-1.5 bg-slate-800 rounded-lg accent-blue-400 cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between font-semibold mb-1">
                    <span className="text-slate-400">Sleep Quality (1-10)</span>
                    <span className="text-sky-300 font-bold">{sleepScore} / 10</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={sleepScore}
                    onChange={(e) => setSleepScore(e.target.value)}
                    className="w-full h-1.5 bg-slate-800 rounded-lg accent-sky-400 cursor-pointer"
                  />
                </div>
              </div>

              {/* Progress Photos Upload Zone */}
              <div className="pt-2 border-t border-slate-800 space-y-3">
                <h4 className="text-xs font-bold text-slate-300">Upload Weekly Progress Photos</h4>

                <div className="grid grid-cols-3 gap-3">
                  {['front', 'side', 'back'].map((pose) => (
                    <div
                      key={pose}
                      className="border-2 border-dashed border-slate-800 hover:border-blue-500/50 rounded-xl p-4 text-center cursor-pointer bg-[#171e2e] transition-all"
                    >
                      <Upload className="w-6 h-6 text-slate-400 mx-auto mb-1" />
                      <span className="text-[10px] font-bold uppercase text-slate-300 block">{pose} view</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => showToast && showToast('Submitted weekly check-in form & photos to Coach Alex!')}
                className="w-full py-3 bg-gradient-to-r from-blue-400 to-indigo-400 text-slate-950 font-bold text-xs rounded-xl shadow-md cursor-pointer"
              >
                Submit Weekly Check-In
              </button>
            </div>
          </div>
        )}

        {/* TAB 4: CLIENT NOTIFICATIONS VIEW */}
        {activeTab === 'notifications' && (
          <div className="bg-[#121724] border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2">
                <Bell className="w-5 h-5 text-amber-400" />
                <h3 className="font-serif-header text-lg font-bold text-slate-100">
                  Client Alerts & Notifications
                </h3>
              </div>
              <button
                onClick={() => {
                  setClientNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
                  if (showToast) showToast('Marked all notifications as read!');
                }}
                className="text-xs text-blue-400 hover:text-blue-300 font-semibold cursor-pointer"
              >
                Mark all as read
              </button>
            </div>

            <div className="space-y-3">
              {clientNotifications.map((n) => (
                <div
                  key={n.id}
                  className={`p-4 rounded-xl border transition-all flex items-start justify-between gap-3 ${
                    n.unread
                      ? 'bg-blue-950/20 border-blue-500/40 text-slate-100'
                      : 'bg-[#171e2e] border-slate-800/80 text-slate-300'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="text-xs font-bold text-slate-100">{n.title}</h4>
                      {n.unread && (
                        <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                      )}
                    </div>
                    <p className="text-xs text-slate-300">{n.message}</p>
                    <span className="text-[10px] text-slate-500 font-mono block">{n.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>

      {/* Floating Direct Coach Chat Drawer */}
      {isChatOpen && (
        <div className="fixed bottom-4 right-4 w-96 max-w-[90vw] bg-[#0f1422] border border-slate-800 rounded-2xl shadow-2xl z-50 overflow-hidden animate-in slide-in-from-bottom-5 duration-200">
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
                  <p>{msg.text}</p>
                </div>
                <span className="text-[9px] text-slate-500 mt-1">{msg.time}</span>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-3 border-t border-slate-800 flex items-center gap-2 bg-[#0c101c]">
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
