import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  ArrowLeftRight, 
  Plus, 
  CheckCircle2, 
  Clock, 
  XCircle, 
  Search, 
  Dumbbell, 
  AlertCircle, 
  X,
  Send,
  RefreshCw,
  Sparkles
} from 'lucide-react';

export default function ClientSubstitutionsPage({ showToast, activeExercises = [] }) {
  const { t } = useTranslation();
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [isNewRequestOpen, setIsNewRequestOpen] = useState(false);

  // Substitution Requests State
  const [requests, setRequests] = useState([
    {
      id: 'sub_1',
      originalExercise: 'Barbell Back Squat',
      targetMuscle: 'Quadriceps',
      reasonCategory: 'Joint Discomfort',
      reasonNote: 'Slight patellar tendon irritation when going below parallel on heavy barbell squats.',
      suggestedAlternative: 'Bulgarian Split Squat (Dumbbell)',
      status: 'APPROVED',
      coachResponseNote: 'Approved. Shift to Bulgarian Split Squat 3x10-12 to reduce axial loading while keeping quad tension high.',
      requestedDate: 'Today, 09:15 AM',
    },
    {
      id: 'sub_2',
      originalExercise: 'Incline Hammer Strength Press',
      targetMuscle: 'Upper Chest',
      reasonCategory: 'Equipment Missing',
      reasonNote: 'Our commercial gym does not have the plate-loaded Hammer Strength incline machine.',
      suggestedAlternative: 'Incline Dumbbell Chest Press',
      status: 'PENDING',
      coachResponseNote: null,
      requestedDate: 'Yesterday, 04:30 PM',
    },
    {
      id: 'sub_3',
      originalExercise: 'Seated Cable Row (V-Bar)',
      targetMuscle: 'Lats & Rhomboids',
      reasonCategory: 'Busy Gym Machine',
      reasonNote: 'Cable tower is constantly occupied during 6 PM rush hour.',
      suggestedAlternative: 'Single-Arm Dumbbell Row',
      status: 'APPROVED',
      coachResponseNote: 'Great substitute! Focus on pulling elbow towards hip crease for maximum lat contraction.',
      requestedDate: 'Aug 06, 2026',
    },
    {
      id: 'sub_4',
      originalExercise: 'Standing Overhead Barbell Press',
      targetMuscle: 'Shoulders',
      reasonCategory: 'Injury History',
      reasonNote: 'Past AC joint impingement on heavy barbell overhead press.',
      suggestedAlternative: 'Seated Dumbbell Shoulder Press (Neutral Grip)',
      status: 'REJECTED',
      coachResponseNote: 'Rejected overhead press. Let\'s substitute with High Incline DB Flyes to keep shoulder joint safe.',
      requestedDate: 'Aug 01, 2026',
    },
  ]);

  // Form State for Request Modal
  const [selectedExerciseName, setSelectedExerciseName] = useState(
    activeExercises[0]?.name || 'Barbell Back Squat'
  );
  const [reasonCategory, setReasonCategory] = useState('Joint Discomfort');
  const [reasonNote, setReasonNote] = useState('');
  const [suggestedAlternative, setSuggestedAlternative] = useState('');

  const pendingCount = requests.filter((r) => r.status === 'PENDING').length;
  const approvedCount = requests.filter((r) => r.status === 'APPROVED').length;

  const handleCreateRequest = (e) => {
    e.preventDefault();
    if (!suggestedAlternative.trim()) return;

    const newReq = {
      id: 'sub_' + Date.now(),
      originalExercise: selectedExerciseName,
      targetMuscle: 'Target Group',
      reasonCategory,
      reasonNote: reasonNote || 'Requested substitute exercise for personal routine optimization.',
      suggestedAlternative,
      status: 'PENDING',
      coachResponseNote: null,
      requestedDate: 'Just now',
    };

    setRequests([newReq, ...requests]);
    setIsNewRequestOpen(false);

    // Reset Form
    setReasonNote('');
    setSuggestedAlternative('');

    if (showToast) {
      showToast(`Submitted exercise change request for ${selectedExerciseName}!`, 'success');
    }
  };

  const filteredRequests = requests.filter((req) => {
    const matchesFilter = activeFilter === 'ALL' || req.status === activeFilter;
    const matchesSearch = 
      req.originalExercise.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.suggestedAlternative.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.reasonNote.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top Banner Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold text-blue-400 bg-blue-950 px-2.5 py-0.5 rounded border border-blue-800/60 uppercase tracking-widest flex items-center gap-1">
              <ArrowLeftRight className="w-3 h-3 text-blue-400" /> ATHLETE ROUTINE OPTIMIZATION
            </span>
          </div>
          <h1 className="font-serif-header text-3xl font-bold text-white tracking-tight mt-1">
            {t('clientPortal.exerciseSubstitutions')}
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Request movement substitutions due to joint discomfort, missing gym equipment, or time constraints.
          </p>
        </div>

        <button
          onClick={() => setIsNewRequestOpen(true)}
          className="flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-400 hover:to-indigo-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-blue-500/20 transition-all cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Request Exercise Change</span>
        </button>
      </div>

      {/* Metric Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-[#121724] border border-slate-800 rounded-2xl p-5 shadow-lg space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400 font-semibold">
            <span className="uppercase tracking-wider">{t('swaps.underReview')}</span>
            <Clock className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-3xl font-extrabold text-white font-mono">{pendingCount}</div>
          <span className="text-[11px] text-amber-400 font-semibold">Awaiting coach evaluation</span>
        </div>

        <div className="bg-[#121724] border border-slate-800 rounded-2xl p-5 shadow-lg space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400 font-semibold">
            <span className="uppercase tracking-wider">{t('swaps.approvedSwaps')}</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-3xl font-extrabold text-white font-mono">{approvedCount}</div>
          <span className="text-[11px] text-emerald-400 font-semibold">Active in daily workout split</span>
        </div>

        <div className="bg-[#121724] border border-slate-800 rounded-2xl p-5 shadow-lg space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400 font-semibold">
            <span className="uppercase tracking-wider">{t('swaps.rejected')}</span>
            <XCircle className="w-4 h-4 text-rose-400" />
          </div>
          <div className="text-3xl font-extrabold text-white font-mono">
            {requests.filter((r) => r.status === 'REJECTED').length}
          </div>
          <span className="text-[11px] text-slate-400 font-semibold">Kept original prescribed exercise</span>
        </div>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#121724] border border-slate-800 p-4 rounded-2xl shadow-lg">
        <div className="relative flex-1">
          <Search className="absolute start-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search change requests..."
            className="w-full bg-[#171e2e] text-slate-200 text-xs rounded-xl ps-10 pe-3.5 py-2.5 border border-slate-700/60 focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto bg-[#171e2e] p-1 rounded-xl border border-slate-800 text-xs font-semibold scrollbar-none">
          {['ALL', 'PENDING', 'APPROVED', 'REJECTED'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveFilter(tab)}
              className={`px-3.5 py-1.5 rounded-lg whitespace-nowrap transition-all cursor-pointer ${
                activeFilter === tab
                  ? 'bg-blue-600 text-white font-bold shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {tab === 'ALL'
                ? t('overview.all')
                : tab === 'PENDING'
                ? `${t('swaps.underReview')} (${pendingCount})`
                : tab === 'APPROVED'
                ? t('swaps.approvedSwaps')
                : t('swaps.rejected')}
            </button>
          ))}
        </div>
      </div>

      {/* Requests Feed Queue */}
      <div className="space-y-4">
        {filteredRequests.length === 0 ? (
          <div className="bg-[#121724] border border-slate-800 rounded-2xl p-12 text-center space-y-3 shadow-xl">
            <div className="w-14 h-14 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center mx-auto text-slate-500">
              <RefreshCw className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-200">No Change Requests Found</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              You have not submitted any exercise change requests under this filter category.
            </p>
          </div>
        ) : (
          filteredRequests.map((req) => (
            <div
              key={req.id}
              className={`bg-[#121724] border rounded-2xl p-5 shadow-xl transition-all space-y-4 ${
                req.status === 'PENDING'
                  ? 'border-amber-500/40 bg-gradient-to-r from-amber-950/10 via-[#121724] to-[#121724]'
                  : req.status === 'APPROVED'
                  ? 'border-emerald-800/60'
                  : 'border-slate-800/80 opacity-80'
              }`}
            >
              {/* Header Info */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-200">Requested: {req.requestedDate}</span>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full border ${
                      req.status === 'PENDING'
                        ? 'bg-amber-950/80 text-amber-300 border-amber-800/60'
                        : req.status === 'APPROVED'
                        ? 'bg-emerald-950/80 text-emerald-300 border-emerald-800/60'
                        : 'bg-slate-900 text-slate-400 border-slate-800'
                    }`}
                  >
                    {req.status === 'PENDING'
                      ? t('swaps.underReview')
                      : req.status === 'APPROVED'
                      ? t('swaps.approvedSwaps')
                      : t('swaps.rejected')}
                  </span>
                </div>
              </div>

              {/* Movement Comparison Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                {/* Original Exercise */}
                <div className="bg-[#171e2e] border border-slate-800 p-3.5 rounded-xl space-y-1.5">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    {t('swaps.currentMovement')}
                  </span>
                  <div className="flex items-center gap-2">
                    <Dumbbell className="w-4 h-4 text-slate-400" />
                    <span className="font-bold text-slate-200 text-sm">{req.originalExercise}</span>
                  </div>
                  <div className="pt-1 text-[11px] text-amber-300 font-semibold flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{t('swaps.reason')} ({req.reasonCategory}): "{req.reasonNote}"</span>
                  </div>
                </div>

                {/* Suggested Alternative */}
                <div className="bg-[#162133] border border-blue-500/30 p-3.5 rounded-xl space-y-1.5">
                  <span className="text-[10px] font-bold text-blue-400 uppercase tracking-wider block">
                    {t('swaps.suggestedAlternativeMovement')}
                  </span>
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-emerald-400" />
                    <span className="font-bold text-emerald-300 text-sm">{req.suggestedAlternative}</span>
                  </div>
                </div>
              </div>

              {/* Coach Review Note */}
              {req.coachResponseNote && (
                <div className="p-3 bg-[#171e2e] border border-slate-800 rounded-xl text-xs text-slate-300">
                  <strong className="text-blue-400 font-bold block mb-0.5">Coach Decision Note:</strong>
                  "{req.coachResponseNote}"
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* New Request Modal */}
      {isNewRequestOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#121724] border border-slate-800 rounded-2xl p-6 max-w-lg w-full space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-serif-header text-lg font-bold text-slate-100 flex items-center gap-2">
                <ArrowLeftRight className="w-5 h-5 text-blue-400" />
                <span>Request Exercise Substitution</span>
              </h3>
              <button
                onClick={() => setIsNewRequestOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateRequest} className="space-y-4 text-xs">
              <div>
                <label className="text-[11px] font-bold text-slate-400 block mb-1">
                  Select Exercise to Substitute
                </label>
                <select
                  value={selectedExerciseName}
                  onChange={(e) => setSelectedExerciseName(e.target.value)}
                  className="w-full bg-[#171e2e] text-slate-200 text-xs rounded-xl p-2.5 border border-slate-700 focus:outline-none focus:border-blue-500 cursor-pointer"
                >
                  {activeExercises.length > 0 ? (
                    activeExercises.map((ex) => (
                      <option key={ex.id || ex.name} value={ex.name}>
                        {ex.name} ({ex.category || 'Target Group'})
                      </option>
                    ))
                  ) : (
                    <>
                      <option value="Barbell Back Squat">Barbell Back Squat</option>
                      <option value="Barbell Bench Press">Barbell Bench Press</option>
                      <option value="Conventional Deadlift">Conventional Deadlift</option>
                      <option value="Overhead Barbell Press">Overhead Barbell Press</option>
                    </>
                  )}
                </select>
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-400 block mb-1">
                  Reason for Substitution
                </label>
                <select
                  value={reasonCategory}
                  onChange={(e) => setReasonCategory(e.target.value)}
                  className="w-full bg-[#171e2e] text-slate-200 text-xs rounded-xl p-2.5 border border-slate-700 focus:outline-none focus:border-blue-500 cursor-pointer"
                >
                  <option value="Joint Discomfort">Joint Discomfort / Pain</option>
                  <option value="Equipment Missing">Gym Equipment Missing</option>
                  <option value="Busy Gym Machine">Busy Machine During Peak Hours</option>
                  <option value="Injury History">Injury History Precaution</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-400 block mb-1">
                  Suggested Alternative Exercise
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Bulgarian Split Squat or Leg Press"
                  value={suggestedAlternative}
                  onChange={(e) => setSuggestedAlternative(e.target.value)}
                  className="w-full bg-[#171e2e] text-slate-200 text-xs rounded-xl p-2.5 border border-slate-700 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-400 block mb-1">
                  Additional Notes for Coach
                </label>
                <textarea
                  rows="3"
                  placeholder="Describe your discomfort level or gym equipment situation..."
                  value={reasonNote}
                  onChange={(e) => setReasonNote(e.target.value)}
                  className="w-full bg-[#171e2e] text-slate-200 text-xs rounded-xl p-2.5 border border-slate-700 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsNewRequestOpen(false)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs rounded-xl transition-all cursor-pointer"
                >
                  {t('common.cancel')}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-400 hover:to-indigo-500 text-white font-bold text-xs rounded-xl transition-all cursor-pointer shadow-md shadow-blue-500/20 flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5 rtl:rotate-180" />
                  <span>Submit Request</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
