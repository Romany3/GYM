import { useState } from 'react';
import { 
  ArrowLeft, 
  User, 
  Key, 
  MessageSquare, 
  Calendar, 
  TrendingDown, 
  Dumbbell, 
  Utensils, 
  ClipboardCheck, 
  RefreshCw, 
  Plus, 
  Trash2, 
  Save, 
  CheckCircle2, 
  AlertTriangle, 
  Activity, 
  Flame, 
  Award, 
  Clock, 
  FileText, 
  Video, 
  Check, 
  Sparkles,
  ChevronRight,
  ExternalLink,
  ShieldCheck,
  Send,
  Eye,
  Camera
} from 'lucide-react';

export default function ClientDetailsPage({ 
  client, 
  onBack, 
  showToast,
  onNavigate,
  onOpenClientCredentials
}) {
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'workout' | 'nutrition' | 'daily-logs' | 'swaps'

  // Default fallback client if none passed
  const activeClient = client || {
    id: 'c1',
    code: '#MJ-0942',
    name: 'Marcus Johnson',
    email: 'marcus@fitarch.com',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    goal: 'Hypertrophy Phase 2',
    plan: 'Pro Tier - 12 Wk',
    status: 'ACTIVE',
    passkey: 'FA-9B2X71',
    joined: 'Jan 2024',
    compliance: 92,
    streak: 14,
    sessions: 48,
    weight: 84.5,
    targetWeight: 80.0,
    height: 182,
    targetKcal: 2650,
    proteinG: 195,
    carbsG: 280,
    fatsG: 70,
    note: 'Marcus is responding well to the volume increase in Phase 2. Slight impingement reported in left shoulder during overhead press.'
  };

  // State for editable Coach Private Notes
  const [coachNote, setCoachNote] = useState(activeClient.note || '');

  // State for Nutrition Targets
  const [nutritionTargets, setNutritionTargets] = useState({
    kcal: activeClient.targetKcal || 2650,
    protein: activeClient.proteinG || 195,
    carbs: activeClient.carbsG || 280,
    fats: activeClient.fatsG || 70,
  });

  // State for assigned workout days
  const [workoutDays, setWorkoutDays] = useState([
    {
      id: 'd1',
      title: 'Day 1: Chest & Shoulders (Power)',
      exercises: [
        { id: 'e1', name: 'Barbell Incline Bench Press', sets: 4, reps: '8-10', rest: 90, tempo: '3-1-1-0', notes: 'Keep shoulder blades retracted. Touch upper chest smoothly.' },
        { id: 'e2', name: 'Seated DB Overhead Press', sets: 3, reps: '10-12', rest: 60, tempo: '2-0-1-0', notes: 'Neutral grip option available if shoulder fatigues.' },
        { id: 'e3', name: 'Cable Lateral Raises', sets: 4, reps: '15', rest: 45, tempo: '2-1-1-0', notes: 'Slight forward lean, drive with elbows.' }
      ]
    },
    {
      id: 'd2',
      title: 'Day 2: Back & Rear Delts (Hypertrophy)',
      exercises: [
        { id: 'e4', name: 'Lat Pulldown (Neutral Grip)', sets: 4, reps: '10-12', rest: 75, tempo: '3-0-1-1', notes: 'Squeeze lats at bottom for 1 full second.' },
        { id: 'e5', name: 'Chest Supported Row', sets: 3, reps: '10', rest: 60, tempo: '2-1-1-0', notes: 'Pull to lower chest level.' }
      ]
    },
    {
      id: 'd3',
      title: 'Day 3: Quads & Calves',
      exercises: [
        { id: 'e6', name: 'Barbell Goblet Squat', sets: 4, reps: '10', rest: 90, tempo: '3-1-1-0', notes: 'Maintain upright torso. Knees out over toes.' },
        { id: 'e7', name: 'Leg Extensions', sets: 3, reps: '15', rest: 45, tempo: '2-1-1-0', notes: 'Peak contraction at top.' }
      ]
    }
  ]);

  const [selectedDayId, setSelectedDayId] = useState('d1');

  // Selected Day's Workout Routine
  const currentDay = workoutDays.find(d => d.id === selectedDayId) || workoutDays[0];

  // Daily Log Selection (Client submissions feed)
  const [selectedLogDate, setSelectedLogDate] = useState('2026-08-14');
  const [coachFeedbackInput, setCoachFeedbackInput] = useState('');

  const dailyLogsData = {
    '2026-08-14': {
      date: 'Today - Aug 14, 2026',
      workoutLogged: true,
      workoutName: 'Day 1: Chest & Shoulders (Power)',
      workoutDuration: '54 mins',
      rpeScore: '8.5 / 10',
      clientWorkoutNotes: 'Hit 85kg on Incline Bench for 4 sets of 8. Felt strong! Left shoulder felt totally fine with the warm-up protocol.',
      completedExercises: [
        { name: 'Barbell Incline Bench Press', loggedSets: '4 sets x 85 kg (8, 8, 8, 8 reps)', status: 'COMPLETED' },
        { name: 'Seated DB Overhead Press', loggedSets: '3 sets x 26 kg (12, 11, 10 reps)', status: 'COMPLETED' },
        { name: 'Cable Lateral Raises', loggedSets: '4 sets x 12 kg (15, 15, 14, 14 reps)', status: 'COMPLETED' }
      ],
      nutritionLogged: true,
      loggedKcal: 2580,
      loggedProtein: 192,
      loggedCarbs: 275,
      loggedFats: 68,
      loggedMeals: [
        { name: 'Meal 1: Breakfast', food: '4 Eggs + 100g Oats + 1 Banana + Honey', kcal: 680, photo: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=400&q=80' },
        { name: 'Meal 2: Lunch', food: '200g Grilled Chicken Breast + 200g Jasmine Rice + Steamed Broccoli', kcal: 720, photo: null },
        { name: 'Meal 3: Pre-Workout', food: '1 Scoop Whey Protein + Rice Cakes + Peanut Butter', kcal: 420, photo: null },
        { name: 'Meal 4: Dinner', food: '200g Salmon Fillet + Sweet Potato Mash + Mixed Greens', kcal: 760, photo: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=400&q=80' }
      ],
      checkin: {
        sleepHours: '7.8 hrs',
        energyLevel: '8 / 10',
        soreness: 'Moderate (Chest)',
        stress: 'Low',
        waterIntake: '3.5 Liters'
      },
      coachFeedback: 'Outstanding work on the incline bench press! Keep pushing that progressive overload.'
    },
    '2026-08-13': {
      date: 'Yesterday - Aug 13, 2026',
      workoutLogged: true,
      workoutName: 'Day 2: Back & Rear Delts',
      workoutDuration: '62 mins',
      rpeScore: '7.5 / 10',
      clientWorkoutNotes: 'Focused on lat squeeze. Great pump throughout.',
      completedExercises: [
        { name: 'Lat Pulldown (Neutral Grip)', loggedSets: '4 sets x 70 kg (12, 12, 10, 10 reps)', status: 'COMPLETED' },
        { name: 'Chest Supported Row', loggedSets: '3 sets x 32 kg (10, 10, 10 reps)', status: 'COMPLETED' }
      ],
      nutritionLogged: true,
      loggedKcal: 2640,
      loggedProtein: 198,
      loggedCarbs: 282,
      loggedFats: 71,
      loggedMeals: [
        { name: 'Meal 1: Breakfast', food: 'Oats & Protein Shake', kcal: 550, photo: null },
        { name: 'Meal 2: Lunch', food: 'Steak & Potato Bowl', kcal: 850, photo: null },
        { name: 'Meal 3: Dinner', food: 'Chicken Breast Salad', kcal: 650, photo: null }
      ],
      checkin: {
        sleepHours: '8.2 hrs',
        energyLevel: '9 / 10',
        soreness: 'Low',
        stress: 'Low',
        waterIntake: '4.0 Liters'
      },
      coachFeedback: null
    }
  };

  const currentLog = dailyLogsData[selectedLogDate] || dailyLogsData['2026-08-14'];

  // Swap requests data for this client
  const [swapRequests, setSwapRequests] = useState([
    {
      id: 'sw1',
      type: 'EXERCISE',
      date: 'Aug 13, 2026',
      target: 'Seated DB Overhead Press',
      reason: 'Slight discomfort when pressing dumbbells vertically past ears.',
      proposed: 'Incline DB Press (30 Degree Angle)',
      status: 'PENDING'
    },
    {
      id: 'sw2',
      type: 'FOOD',
      date: 'Aug 12, 2026',
      target: 'Jasmine Rice (200g)',
      reason: 'Out of jasmine rice at home.',
      proposed: 'Boiled Sweet Potato (250g)',
      status: 'APPROVED'
    }
  ]);

  const handleSaveCoachNotes = () => {
    if (showToast) showToast('Saved coach notes successfully!');
  };

  const handleSaveNutritionTargets = () => {
    if (showToast) showToast('Updated client daily macro targets!');
  };

  const handleSendCoachFeedback = () => {
    if (!coachFeedbackInput.trim()) return;
    if (showToast) showToast(`Sent feedback to ${activeClient.name}`);
    setCoachFeedbackInput('');
  };

  const handleApproveSwap = (id) => {
    setSwapRequests(prev => prev.map(s => s.id === id ? { ...s, status: 'APPROVED' } : s));
    if (showToast) showToast('Approved substitution request');
  };

  return (
    <div className="space-y-6 pb-12 animate-fade-in text-slate-100">
      {/* Top Navigation Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#121724] border border-slate-800/90 rounded-2xl p-4 sm:p-5 shadow-xl">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="p-2.5 bg-[#171e2e] hover:bg-slate-800 text-slate-300 border border-slate-700/60 rounded-xl transition-all cursor-pointer flex items-center gap-2 text-xs font-semibold"
            title="Back to Clients List"
          >
            <ArrowLeft className="w-4 h-4 text-blue-400" />
            <span>Back to Clients</span>
          </button>

          <div className="flex items-center gap-3">
            {activeClient.avatar ? (
              <img
                src={activeClient.avatar}
                alt={activeClient.name}
                className="w-12 h-12 rounded-full object-cover ring-2 ring-blue-500/40 shadow-md"
              />
            ) : (
              <div className="w-12 h-12 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-slate-200">
                {activeClient.name.substring(0, 2).toUpperCase()}
              </div>
            )}
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-serif-header text-xl sm:text-2xl font-black text-slate-100">
                  {activeClient.name}
                </h1>
                <span className="text-xs font-mono text-slate-400 bg-slate-900/80 px-2 py-0.5 rounded border border-slate-800">
                  {activeClient.code}
                </span>
                <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase border ${
                  activeClient.status === 'ACTIVE' 
                    ? 'bg-emerald-950/80 text-emerald-400 border-emerald-800/60' 
                    : 'bg-rose-950/80 text-rose-400 border-rose-800/60'
                }`}>
                  {activeClient.status}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5 flex items-center gap-2">
                <span>{activeClient.email}</span>
                <span>•</span>
                <span className="text-blue-400 font-semibold">{activeClient.goal}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Quick Action Header Buttons */}
        <div className="flex items-center gap-2 self-end sm:self-center">
          <button
            onClick={() => {
              if (onOpenClientCredentials) {
                onOpenClientCredentials(activeClient);
              } else if (showToast) {
                showToast(`Passkey: ${activeClient.passkey}`);
              }
            }}
            className="px-3 py-2 bg-blue-950/80 hover:bg-blue-900 text-blue-300 border border-blue-800/60 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-sm"
          >
            <Key className="w-3.5 h-3.5 text-blue-400" />
            <span>Passkey</span>
          </button>

          <button
            onClick={() => {
              if (onNavigate) onNavigate('coach-chat');
              if (showToast) showToast(`Opening chat with ${activeClient.name}`);
            }}
            className="px-3 py-2 bg-[#171e2e] hover:bg-slate-800 text-blue-300 border border-slate-700/60 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <MessageSquare className="w-3.5 h-3.5 text-blue-400" />
            <span>Message</span>
          </button>

          <button
            onClick={() => {
              if (onNavigate) onNavigate('workout-builder');
              if (showToast) showToast('Opening Workout Builder Export');
            }}
            className="px-3.5 py-2 bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-500 hover:to-rose-600 text-white border border-rose-500/50 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-md shadow-red-900/30 transition-all cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Export PDF</span>
          </button>
        </div>
      </div>

      {/* Main Tab Navigation Bar */}
      <div className="flex items-center gap-2 border-b border-slate-800/90 pb-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'overview'
              ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30 border border-blue-500'
              : 'bg-[#121724] text-slate-400 hover:bg-slate-800 hover:text-slate-200 border border-slate-800/80'
          }`}
        >
          <User className="w-4 h-4" />
          <span>360° Profile & Overview</span>
        </button>

        <button
          onClick={() => setActiveTab('workout')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'workout'
              ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30 border border-blue-500'
              : 'bg-[#121724] text-slate-400 hover:bg-slate-800 hover:text-slate-200 border border-slate-800/80'
          }`}
        >
          <Dumbbell className="w-4 h-4" />
          <span>Workout Program & Routines</span>
        </button>

        <button
          onClick={() => setActiveTab('nutrition')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'nutrition'
              ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30 border border-blue-500'
              : 'bg-[#121724] text-slate-400 hover:bg-slate-800 hover:text-slate-200 border border-slate-800/80'
          }`}
        >
          <Utensils className="w-4 h-4" />
          <span>Nutrition & Macro Plan</span>
        </button>

        <button
          onClick={() => setActiveTab('daily-logs')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap relative ${
            activeTab === 'daily-logs'
              ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30 border border-blue-500'
              : 'bg-[#121724] text-slate-400 hover:bg-slate-800 hover:text-slate-200 border border-slate-800/80'
          }`}
        >
          <ClipboardCheck className="w-4 h-4 text-emerald-400" />
          <span>Daily Logs & Client Reviews</span>
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
        </button>

        <button
          onClick={() => setActiveTab('swaps')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'swaps'
              ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30 border border-blue-500'
              : 'bg-[#121724] text-slate-400 hover:bg-slate-800 hover:text-slate-200 border border-slate-800/80'
          }`}
        >
          <RefreshCw className="w-4 h-4 text-amber-400" />
          <span>Swap Requests</span>
          {swapRequests.filter(s => s.status === 'PENDING').length > 0 && (
            <span className="px-1.5 py-0.5 bg-amber-500 text-slate-950 font-black text-[10px] rounded-full">
              {swapRequests.filter(s => s.status === 'PENDING').length}
            </span>
          )}
        </button>
      </div>

      {/* Tab 1: 360° Profile & Overview */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Key Stats & Weight Progress */}
          <div className="lg:col-span-8 space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-[#121724] border border-slate-800/90 rounded-2xl p-4 shadow-lg">
                <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase block">CURRENT WEIGHT</span>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="text-2xl font-black text-slate-100">{activeClient.weight}</span>
                  <span className="text-xs font-bold text-slate-400">kg</span>
                </div>
                <span className="text-[10px] text-emerald-400 font-semibold mt-1 block">↓ 3.2 kg since start</span>
              </div>

              <div className="bg-[#121724] border border-slate-800/90 rounded-2xl p-4 shadow-lg">
                <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase block">GOAL WEIGHT</span>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="text-2xl font-black text-blue-400">{activeClient.targetWeight}</span>
                  <span className="text-xs font-bold text-slate-400">kg</span>
                </div>
                <span className="text-[10px] text-slate-400 font-semibold mt-1 block">Target Deficit</span>
              </div>

              <div className="bg-[#121724] border border-slate-800/90 rounded-2xl p-4 shadow-lg">
                <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase block">COMPLIANCE</span>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="text-2xl font-black text-emerald-400">{activeClient.compliance}%</span>
                </div>
                <span className="text-[10px] text-emerald-400 font-semibold mt-1 block">High Consistency</span>
              </div>

              <div className="bg-[#121724] border border-slate-800/90 rounded-2xl p-4 shadow-lg">
                <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase block">ACTIVE STREAK</span>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="text-2xl font-black text-amber-400">{activeClient.streak}</span>
                  <span className="text-xs font-bold text-slate-400">days</span>
                </div>
                <span className="text-[10px] text-amber-400 font-semibold mt-1 block">🔥 On Fire</span>
              </div>
            </div>

            {/* Weight Progress Line Graph */}
            <div className="bg-[#121724] border border-slate-800/90 rounded-2xl p-5 shadow-lg space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <TrendingDown className="w-5 h-5 text-blue-400" />
                  <h3 className="font-serif-header text-base font-bold text-slate-100">Weight Loss Progress (kg)</h3>
                </div>
                <span className="text-xs text-slate-400 bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-800">Last 5 Months</span>
              </div>

              <div className="pt-4">
                <svg className="w-full h-36 overflow-visible" viewBox="0 0 400 120" preserveAspectRatio="none">
                  <line x1="0" y1="30" x2="100%" y2="30" stroke="#1e293b" strokeDasharray="4 4" />
                  <line x1="0" y1="70" x2="100%" y2="70" stroke="#1e293b" strokeDasharray="4 4" />
                  <line x1="0" y1="110" x2="100%" y2="110" stroke="#1e293b" strokeDasharray="4 4" />

                  <text x="0" y="26" fill="#64748b" fontSize="10">88 kg</text>
                  <text x="0" y="66" fill="#64748b" fontSize="10">86 kg</text>
                  <text x="0" y="106" fill="#64748b" fontSize="10">84 kg</text>

                  <polyline
                    fill="none"
                    stroke="#3b82f6"
                    strokeWidth="3"
                    points="50,30 120,45 190,75 260,65 330,100"
                  />
                  <circle cx="50" cy="30" r="5" fill="#60a5fa" />
                  <circle cx="120" cy="45" r="5" fill="#60a5fa" />
                  <circle cx="190" cy="75" r="5" fill="#60a5fa" />
                  <circle cx="260" cy="65" r="5" fill="#60a5fa" />
                  <circle cx="330" cy="100" r="6" fill="#22c55e" stroke="#ffffff" strokeWidth="2" />
                </svg>
                <div className="flex justify-between text-xs text-slate-400 pt-2 font-mono px-4">
                  <span>Apr</span>
                  <span>May</span>
                  <span>Jun</span>
                  <span>Jul</span>
                  <span>Aug (Current)</span>
                </div>
              </div>
            </div>

            {/* Progress Photos Comparison */}
            <div className="bg-[#121724] border border-slate-800/90 rounded-2xl p-5 shadow-lg space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Camera className="w-5 h-5 text-blue-400" />
                  <h3 className="font-serif-header text-base font-bold text-slate-100">Progress Photos Comparison</h3>
                </div>
                <span className="text-xs text-blue-400 font-semibold cursor-pointer hover:underline">View All Photos (8)</span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="relative rounded-xl overflow-hidden border border-slate-700/80 aspect-[4/3] group">
                  <img
                    src="https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=600&q=80"
                    alt="Day 1"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute bottom-2 left-2 bg-slate-950/90 border border-slate-800 px-3 py-1 rounded-lg text-xs font-bold text-slate-200">
                    Jan 10, 2024 (Baseline - 87.7 kg)
                  </div>
                </div>

                <div className="relative rounded-xl overflow-hidden border border-slate-700/80 aspect-[4/3] group">
                  <img
                    src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=600&q=80"
                    alt="Current"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute bottom-2 left-2 bg-blue-950/90 border border-blue-700 px-3 py-1 rounded-lg text-xs font-bold text-blue-300">
                    Aug 14, 2026 (Latest - 84.5 kg)
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Coach Private Notes & Profile Specs */}
          <div className="lg:col-span-4 space-y-6">
            {/* Coach Private Notes Box */}
            <div className="bg-[#121724] border border-slate-800/90 rounded-2xl p-5 shadow-lg space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <h3 className="font-serif-header text-sm font-bold text-slate-100 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-blue-400" />
                  <span>Coach Private Notes</span>
                </h3>
                <span className="text-[10px] text-slate-500 font-mono">Private</span>
              </div>

              <textarea
                value={coachNote}
                onChange={(e) => setCoachNote(e.target.value)}
                rows={6}
                className="w-full bg-[#171e2e] border border-slate-700/70 rounded-xl p-3.5 text-xs text-slate-200 focus:outline-none focus:border-blue-500 leading-relaxed resize-none"
                placeholder="Write private coach notes about injury history, modifications, athlete feedback..."
              />

              <button
                onClick={handleSaveCoachNotes}
                className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-md shadow-blue-600/30 transition-all cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>Save Notes</span>
              </button>
            </div>

            {/* Profile Biological Details */}
            <div className="bg-[#121724] border border-slate-800/90 rounded-2xl p-5 shadow-lg space-y-4">
              <h3 className="font-serif-header text-sm font-bold text-slate-100 pb-3 border-b border-slate-800">
                Biological Specs & Program Tier
              </h3>

              <div className="space-y-3 text-xs">
                <div className="flex justify-between py-1.5 border-b border-slate-800/50">
                  <span className="text-slate-400">Current Program</span>
                  <span className="font-bold text-blue-400">{activeClient.plan}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-800/50">
                  <span className="text-slate-400">Height</span>
                  <span className="font-bold text-slate-200">{activeClient.height} cm</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-800/50">
                  <span className="text-slate-400">Daily Step Target</span>
                  <span className="font-bold text-slate-200">10,000 steps</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-800/50">
                  <span className="text-slate-400">Water Target</span>
                  <span className="font-bold text-slate-200">3.5 Liters / Day</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-800/50">
                  <span className="text-slate-400">Client Passkey</span>
                  <span className="font-mono font-bold text-blue-300">{activeClient.passkey}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Workout Program & Routine Editor */}
      {activeTab === 'workout' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#121724] border border-slate-800/90 rounded-2xl p-4 shadow-lg">
            <div>
              <h3 className="font-serif-header text-lg font-bold text-slate-100">
                Assigned Workout Split
              </h3>
              <p className="text-xs text-slate-400">
                Modify routines, sets, reps, rest periods, or tempo for {activeClient.name}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  if (onNavigate) onNavigate('workout-builder');
                }}
                className="px-3.5 py-2 bg-[#171e2e] hover:bg-slate-800 border border-slate-700 text-slate-200 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4 text-blue-400" />
                <span>Open Full Workout Builder</span>
              </button>

              <button
                onClick={() => showToast && showToast('Saved workout program changes!')}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-md shadow-blue-600/30 transition-all cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>Save Workout Changes</span>
              </button>
            </div>
          </div>

          {/* Routine Day Selector Tabs */}
          <div className="flex items-center gap-3 overflow-x-auto pb-2">
            {workoutDays.map((day) => (
              <button
                key={day.id}
                onClick={() => setSelectedDayId(day.id)}
                className={`px-4 py-3 rounded-xl text-xs font-bold transition-all cursor-pointer border flex items-center gap-2 whitespace-nowrap ${
                  selectedDayId === day.id
                    ? 'bg-red-950/80 text-red-300 border-red-700/80 shadow-md shadow-red-950/50'
                    : 'bg-[#121724] text-slate-400 border-slate-800/80 hover:bg-slate-800 hover:text-slate-200'
                }`}
              >
                <Dumbbell className="w-4 h-4 text-red-400" />
                <span>{day.title}</span>
                <span className="px-2 py-0.5 bg-slate-900 text-slate-300 rounded text-[10px] font-mono">
                  {day.exercises.length} ex
                </span>
              </button>
            ))}
          </div>

          {/* Selected Routine Exercise List */}
          <div className="bg-[#121724] border border-slate-800/90 rounded-2xl p-5 shadow-lg space-y-4">
            <h4 className="font-serif-header text-base font-bold text-slate-100 flex items-center justify-between pb-3 border-b border-slate-800">
              <span>Exercises in {currentDay.title}</span>
              <button
                onClick={() => {
                  const newEx = {
                    id: `e-${Date.now()}`,
                    name: 'New Custom Exercise',
                    sets: 3,
                    reps: '10-12',
                    rest: 60,
                    tempo: '2-0-1-0',
                    notes: 'Controlled form'
                  };
                  setWorkoutDays(prev => prev.map(d => d.id === selectedDayId ? { ...d, exercises: [...d.exercises, newEx] } : d));
                  if (showToast) showToast('Added new exercise');
                }}
                className="px-3 py-1.5 bg-red-950/70 hover:bg-red-900 text-red-300 border border-red-800/60 rounded-lg text-xs font-bold flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Exercise to Routine</span>
              </button>
            </h4>

            <div className="space-y-4">
              {currentDay.exercises.map((ex, idx) => (
                <div
                  key={ex.id}
                  className="bg-[#171e2e] border border-slate-700/60 rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-red-950 text-red-400 font-extrabold flex items-center justify-center text-xs border border-red-800/50">
                      {idx + 1}
                    </span>
                    <div>
                      <input
                        type="text"
                        value={ex.name}
                        onChange={(e) => {
                          const nameVal = e.target.value;
                          setWorkoutDays(prev => prev.map(d => d.id === selectedDayId ? {
                            ...d,
                            exercises: d.exercises.map(item => item.id === ex.id ? { ...item, name: nameVal } : item)
                          } : d));
                        }}
                        className="font-bold text-sm text-slate-100 bg-transparent border-b border-dashed border-slate-600 focus:outline-none focus:border-red-500 px-1"
                      />
                      <p className="text-xs text-slate-400 mt-1">{ex.notes}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 flex-wrap">
                    <div className="bg-[#111622] px-3 py-1.5 rounded-lg border border-slate-800 text-xs flex items-center gap-2">
                      <span className="text-slate-500 font-bold">Sets:</span>
                      <input
                        type="number"
                        value={ex.sets}
                        onChange={(e) => {
                          const val = Number(e.target.value);
                          setWorkoutDays(prev => prev.map(d => d.id === selectedDayId ? {
                            ...d,
                            exercises: d.exercises.map(item => item.id === ex.id ? { ...item, sets: val } : item)
                          } : d));
                        }}
                        className="w-10 bg-transparent text-slate-100 font-extrabold focus:outline-none text-center"
                      />
                    </div>

                    <div className="bg-[#111622] px-3 py-1.5 rounded-lg border border-slate-800 text-xs flex items-center gap-2">
                      <span className="text-slate-500 font-bold">Reps:</span>
                      <input
                        type="text"
                        value={ex.reps}
                        onChange={(e) => {
                          const val = e.target.value;
                          setWorkoutDays(prev => prev.map(d => d.id === selectedDayId ? {
                            ...d,
                            exercises: d.exercises.map(item => item.id === ex.id ? { ...item, reps: val } : item)
                          } : d));
                        }}
                        className="w-14 bg-transparent text-slate-100 font-extrabold focus:outline-none text-center"
                      />
                    </div>

                    <div className="bg-[#111622] px-3 py-1.5 rounded-lg border border-slate-800 text-xs flex items-center gap-2">
                      <span className="text-slate-500 font-bold">Rest:</span>
                      <input
                        type="number"
                        value={ex.rest}
                        onChange={(e) => {
                          const val = Number(e.target.value);
                          setWorkoutDays(prev => prev.map(d => d.id === selectedDayId ? {
                            ...d,
                            exercises: d.exercises.map(item => item.id === ex.id ? { ...item, rest: val } : item)
                          } : d));
                        }}
                        className="w-12 bg-transparent text-red-400 font-extrabold focus:outline-none text-center"
                      />
                      <span className="text-[10px] text-slate-500">sec</span>
                    </div>

                    <button
                      onClick={() => {
                        setWorkoutDays(prev => prev.map(d => d.id === selectedDayId ? {
                          ...d,
                          exercises: d.exercises.filter(item => item.id !== ex.id)
                        } : d));
                        if (showToast) showToast('Removed exercise from plan');
                      }}
                      className="p-2 text-rose-400 hover:bg-rose-950/60 rounded-lg transition-colors cursor-pointer"
                      title="Remove exercise"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Nutrition & Macro Plan Editor */}
      {activeTab === 'nutrition' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#121724] border border-slate-800/90 rounded-2xl p-4 shadow-lg">
            <div>
              <h3 className="font-serif-header text-lg font-bold text-slate-100">
                Daily Macro Targets & Meal Plan
              </h3>
              <p className="text-xs text-slate-400">
                Adjust target calories, macronutrients, and meal splits for {activeClient.name}
              </p>
            </div>

            <button
              onClick={handleSaveNutritionTargets}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-md shadow-blue-600/30 transition-all cursor-pointer self-start sm:self-center"
            >
              <Save className="w-4 h-4" />
              <span>Save Nutrition Targets</span>
            </button>
          </div>

          {/* Macro Calculator Controls */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="bg-[#121724] border border-slate-800/90 rounded-2xl p-4 shadow-lg space-y-2">
              <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase block">DAILY CALORIES</span>
              <div className="flex items-center justify-between">
                <input
                  type="number"
                  value={nutritionTargets.kcal}
                  onChange={(e) => setNutritionTargets(prev => ({ ...prev, kcal: Number(e.target.value) }))}
                  className="text-2xl font-black text-blue-400 bg-transparent border-b border-blue-500/50 w-24 focus:outline-none"
                />
                <span className="text-xs font-bold text-slate-400">kcal</span>
              </div>
            </div>

            <div className="bg-[#121724] border border-slate-800/90 rounded-2xl p-4 shadow-lg space-y-2">
              <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase block">PROTEIN</span>
              <div className="flex items-center justify-between">
                <input
                  type="number"
                  value={nutritionTargets.protein}
                  onChange={(e) => setNutritionTargets(prev => ({ ...prev, protein: Number(e.target.value) }))}
                  className="text-2xl font-black text-rose-400 bg-transparent border-b border-rose-500/50 w-20 focus:outline-none"
                />
                <span className="text-xs font-bold text-slate-400">grams</span>
              </div>
            </div>

            <div className="bg-[#121724] border border-slate-800/90 rounded-2xl p-4 shadow-lg space-y-2">
              <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase block">CARBOHYDRATES</span>
              <div className="flex items-center justify-between">
                <input
                  type="number"
                  value={nutritionTargets.carbs}
                  onChange={(e) => setNutritionTargets(prev => ({ ...prev, carbs: Number(e.target.value) }))}
                  className="text-2xl font-black text-amber-400 bg-transparent border-b border-amber-500/50 w-20 focus:outline-none"
                />
                <span className="text-xs font-bold text-slate-400">grams</span>
              </div>
            </div>

            <div className="bg-[#121724] border border-slate-800/90 rounded-2xl p-4 shadow-lg space-y-2">
              <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase block">FATS</span>
              <div className="flex items-center justify-between">
                <input
                  type="number"
                  value={nutritionTargets.fats}
                  onChange={(e) => setNutritionTargets(prev => ({ ...prev, fats: Number(e.target.value) }))}
                  className="text-2xl font-black text-emerald-400 bg-transparent border-b border-emerald-500/50 w-20 focus:outline-none"
                />
                <span className="text-xs font-bold text-slate-400">grams</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Daily Client Reviews & Logs Feed */}
      {activeTab === 'daily-logs' && (
        <div className="space-y-6">
          {/* Header & Log Date Picker */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#121724] border border-slate-800/90 rounded-2xl p-4 shadow-lg">
            <div>
              <h3 className="font-serif-header text-lg font-bold text-slate-100 flex items-center gap-2">
                <ClipboardCheck className="w-5 h-5 text-emerald-400" />
                <span>Daily Log & Review Submissions</span>
              </h3>
              <p className="text-xs text-slate-400">
                Review daily workouts, logged meals, food photos, and wellness scores sent by {activeClient.name}
              </p>
            </div>

            {/* Date Switcher */}
            <div className="flex items-center gap-2">
              {['2026-08-14', '2026-08-13'].map((dStr) => (
                <button
                  key={dStr}
                  onClick={() => setSelectedLogDate(dStr)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                    selectedLogDate === dStr
                      ? 'bg-blue-600 text-white border-blue-500 shadow-md shadow-blue-600/30'
                      : 'bg-[#171e2e] text-slate-400 border-slate-700 hover:text-slate-200'
                  }`}
                >
                  {dStr === '2026-08-14' ? 'Today (Aug 14)' : 'Yesterday (Aug 13)'}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Column: Workout Logged & Meals Logged Feed */}
            <div className="lg:col-span-8 space-y-6">
              {/* Daily Workout Log Card */}
              <div className="bg-[#121724] border border-slate-800/90 rounded-2xl p-5 shadow-lg space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <Dumbbell className="w-5 h-5 text-red-400" />
                    <div>
                      <h4 className="font-serif-header text-sm font-bold text-slate-100">
                        {currentLog.workoutName}
                      </h4>
                      <span className="text-[10px] text-slate-400">Duration: {currentLog.workoutDuration} • RPE: {currentLog.rpeScore}</span>
                    </div>
                  </div>

                  <span className="px-2.5 py-1 bg-emerald-950/80 text-emerald-400 border border-emerald-800/60 rounded-full text-[10px] font-bold">
                    ✓ LOGGED BY CLIENT
                  </span>
                </div>

                {/* Client Workout Notes */}
                <div className="bg-[#171e2e] border border-slate-700/60 rounded-xl p-3 text-xs text-slate-300 italic">
                  💬 Client Note: "{currentLog.clientWorkoutNotes}"
                </div>

                {/* Exercises Completed Breakdown */}
                <div className="space-y-2">
                  <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase block">COMPLETED SETS & WEIGHTS</span>
                  {currentLog.completedExercises.map((ex, i) => (
                    <div key={i} className="flex items-center justify-between bg-[#171e2e] p-3 rounded-xl border border-slate-800 text-xs">
                      <span className="font-bold text-slate-200">{ex.name}</span>
                      <span className="font-mono text-emerald-400 font-semibold">{ex.loggedSets}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Daily Food Log & Photos Card */}
              <div className="bg-[#121724] border border-slate-800/90 rounded-2xl p-5 shadow-lg space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <Utensils className="w-5 h-5 text-amber-400" />
                    <div>
                      <h4 className="font-serif-header text-sm font-bold text-slate-100">Logged Meals & Food Photos</h4>
                      <span className="text-[10px] text-slate-400">
                        Logged: {currentLog.loggedKcal} kcal (Protein: {currentLog.loggedProtein}g • Carbs: {currentLog.loggedCarbs}g • Fats: {currentLog.loggedFats}g)
                      </span>
                    </div>
                  </div>

                  <span className="px-2.5 py-1 bg-amber-950/80 text-amber-300 border border-amber-800/60 rounded-full text-[10px] font-bold">
                    DAILY NUTRITION
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {currentLog.loggedMeals.map((meal, mIdx) => (
                    <div key={mIdx} className="bg-[#171e2e] border border-slate-700/60 rounded-xl p-3.5 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs text-blue-300">{meal.name}</span>
                        <span className="text-[10px] font-mono text-slate-400">{meal.kcal} kcal</span>
                      </div>
                      <p className="text-xs text-slate-300">{meal.food}</p>

                      {meal.photo && (
                        <div className="relative rounded-lg overflow-hidden border border-slate-700 aspect-video mt-2">
                          <img src={meal.photo} alt={meal.name} className="w-full h-full object-cover" />
                          <span className="absolute bottom-1 right-1 bg-slate-950/80 px-2 py-0.5 rounded text-[9px] font-bold text-slate-200">
                            Photo Uploaded
                          </span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Check-in Scorecard & Coach Feedback */}
            <div className="lg:col-span-4 space-y-6">
              {/* Daily Wellness Check-in */}
              <div className="bg-[#121724] border border-slate-800/90 rounded-2xl p-5 shadow-lg space-y-4">
                <h4 className="font-serif-header text-sm font-bold text-slate-100 pb-3 border-b border-slate-800">
                  Daily Wellness Check-In
                </h4>

                <div className="space-y-3 text-xs">
                  <div className="flex justify-between py-1.5 border-b border-slate-800/50">
                    <span className="text-slate-400">Sleep Duration</span>
                    <span className="font-bold text-blue-400">{currentLog.checkin.sleepHours}</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-slate-800/50">
                    <span className="text-slate-400">Energy Level</span>
                    <span className="font-bold text-emerald-400">{currentLog.checkin.energyLevel}</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-slate-800/50">
                    <span className="text-slate-400">Muscle Soreness</span>
                    <span className="font-bold text-amber-400">{currentLog.checkin.soreness}</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-slate-800/50">
                    <span className="text-slate-400">Stress Score</span>
                    <span className="font-bold text-slate-200">{currentLog.checkin.stress}</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-slate-800/50">
                    <span className="text-slate-400">Water Logged</span>
                    <span className="font-bold text-blue-300">{currentLog.checkin.waterIntake}</span>
                  </div>
                </div>
              </div>

              {/* Coach Feedback Note Editor */}
              <div className="bg-[#121724] border border-slate-800/90 rounded-2xl p-5 shadow-lg space-y-4">
                <h4 className="font-serif-header text-sm font-bold text-slate-100 flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-blue-400" />
                  <span>Coach Response & Review</span>
                </h4>

                {currentLog.coachFeedback && (
                  <div className="bg-blue-950/60 border border-blue-800/60 rounded-xl p-3 text-xs text-blue-200">
                    <span className="font-bold text-blue-400 block mb-1">Previous Coach Feedback:</span>
                    "{currentLog.coachFeedback}"
                  </div>
                )}

                <textarea
                  value={coachFeedbackInput}
                  onChange={(e) => setCoachFeedbackInput(e.target.value)}
                  rows={4}
                  className="w-full bg-[#171e2e] border border-slate-700/70 rounded-xl p-3 text-xs text-slate-200 focus:outline-none focus:border-blue-500 resize-none"
                  placeholder="Write feedback for client on today's workout and food log..."
                />

                <button
                  onClick={handleSendCoachFeedback}
                  className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-md shadow-blue-600/30 transition-all cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Feedback Note</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 5: Swap Requests */}
      {activeTab === 'swaps' && (
        <div className="bg-[#121724] border border-slate-800/90 rounded-2xl p-5 shadow-lg space-y-4">
          <h3 className="font-serif-header text-lg font-bold text-slate-100 flex items-center gap-2">
            <RefreshCw className="w-5 h-5 text-amber-400" />
            <span>Exercise & Food Substitution Requests</span>
          </h3>

          <div className="space-y-4 pt-2">
            {swapRequests.map((req) => (
              <div key={req.id} className="bg-[#171e2e] border border-slate-700/60 rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      req.type === 'EXERCISE' ? 'bg-red-950 text-red-400 border border-red-800' : 'bg-amber-950 text-amber-300 border border-amber-800'
                    }`}>
                      {req.type} SWAP
                    </span>
                    <span className="text-xs text-slate-400 font-mono">{req.date}</span>
                  </div>
                  <h4 className="font-bold text-sm text-slate-100">Original: {req.target}</h4>
                  <p className="text-xs text-slate-300">Proposed Swap: <span className="font-bold text-emerald-400">{req.proposed}</span></p>
                  <p className="text-xs text-slate-400 italic">Reason: "{req.reason}"</p>
                </div>

                <div>
                  {req.status === 'PENDING' ? (
                    <button
                      onClick={() => handleApproveSwap(req.id)}
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-md shadow-emerald-600/30 cursor-pointer"
                    >
                      <Check className="w-4 h-4" />
                      <span>Approve Swap</span>
                    </button>
                  ) : (
                    <span className="px-3 py-1 bg-emerald-950 text-emerald-400 border border-emerald-800 rounded-lg text-xs font-bold">
                      ✓ APPROVED
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
