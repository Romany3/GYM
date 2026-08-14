import { useState } from 'react';
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
      reasonCategory: 'Injury Prevention',
      reasonNote: 'Left shoulder feeling pinched at lock-out position.',
      suggestedAlternative: 'Seated Neutral Grip DB Press',
      status: 'REJECTED',
      coachResponseNote: 'Let us pause overhead pressing entirely for 1 week and substitute with High Cable Facepulls + Lateral Raises.',
      requestedDate: 'Aug 02, 2026',
    },
  ]);

  // New Request Form State
  const [selectedExercise, setSelectedExercise] = useState('');
  const [customExerciseName, setCustomExerciseName] = useState('');
  const [targetMuscle, setTargetMuscle] = useState('Chest');
  const [reasonCategory, setReasonCategory] = useState('Equipment Missing');
  const [reasonNote, setReasonNote] = useState('');
  const [suggestedAlternative, setSuggestedAlternative] = useState('');

  // Derived Stats
  const totalCount = requests.length;
  const pendingCount = requests.filter((r) => r.status === 'PENDING').length;
  const approvedCount = requests.filter((r) => r.status === 'APPROVED').length;

  // Filtered Requests List
  const filteredRequests = requests.filter((req) => {
    const matchesFilter = activeFilter === 'ALL' || req.status === activeFilter;
    const matchesSearch = 
      req.originalExercise.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.suggestedAlternative.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.targetMuscle.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleSubmitNewRequest = (e) => {
    e.preventDefault();
    const origName = selectedExercise === 'other' || !selectedExercise ? customExerciseName : selectedExercise;
    if (!origName.trim()) return;

    const newReq = {
      id: `sub_${Date.now()}`,
      originalExercise: origName,
      targetMuscle: targetMuscle,
      reasonCategory: reasonCategory,
      reasonNote: reasonNote || 'Requesting exercise swap for optimal execution.',
      suggestedAlternative: suggestedAlternative || 'Coach Recommended Substitute',
      status: 'PENDING',
      coachResponseNote: null,
      requestedDate: 'Just now',
    };

    setRequests((prev) => [newReq, ...prev]);
    setIsNewRequestOpen(false);
    setSelectedExercise('');
    setCustomExerciseName('');
    setReasonNote('');
    setSuggestedAlternative('');

    if (showToast) showToast('Submitted exercise substitution request to your coach!', 'success');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header Bar & Action Button */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold text-blue-400 bg-blue-950 px-2.5 py-0.5 rounded border border-blue-800/60 uppercase tracking-widest flex items-center gap-1">
              <ArrowLeftRight className="w-3 h-3 text-blue-400" /> EXERCISE PROTOCOL MODIFIER
            </span>
          </div>
          <h1 className="font-serif-header text-3xl font-bold text-white tracking-tight mt-1">
            Exercise Substitutions & Swaps
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Submit movement change requests for missing equipment, joint discomfort, or gym congestion.
          </p>
        </div>

        <button
          onClick={() => setIsNewRequestOpen(true)}
          className="py-3 px-5 bg-gradient-to-r from-blue-500 via-indigo-500 to-sky-400 hover:from-blue-400 hover:to-indigo-400 text-white font-bold text-xs rounded-xl shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2 transition-all cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Request New Swap</span>
        </button>
      </div>

      {/* Quick Overview Summary Banner Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-[#121724] border border-slate-800 rounded-2xl p-4 flex items-center gap-4 shadow-xl">
          <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
            <ArrowLeftRight className="w-6 h-6" />
          </div>
          <div>
            <span className="text-2xl font-bold text-white font-mono">{totalCount}</span>
            <p className="text-xs text-slate-400 font-medium">Total Requested Swaps</p>
          </div>
        </div>

        <div className="bg-[#121724] border border-slate-800 rounded-2xl p-4 flex items-center gap-4 shadow-xl">
          <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <Clock className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <span className="text-2xl font-bold text-amber-300 font-mono">{pendingCount}</span>
            <p className="text-xs text-slate-400 font-medium">Under Coach Review</p>
          </div>
        </div>

        <div className="bg-[#121724] border border-slate-800 rounded-2xl p-4 flex items-center gap-4 shadow-xl">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <span className="text-2xl font-bold text-emerald-300 font-mono">{approvedCount}</span>
            <p className="text-xs text-slate-400 font-medium">Approved Substitutions</p>
          </div>
        </div>
      </div>

      {/* Filter Tabs & Search Controls */}
      <div className="bg-[#121724] border border-slate-800 rounded-2xl p-4 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          {[
            { id: 'ALL', label: 'All Swaps' },
            { id: 'PENDING', label: 'Under Review' },
            { id: 'APPROVED', label: 'Approved' },
            { id: 'REJECTED', label: 'Rejected' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                activeFilter === tab.id
                  ? 'bg-blue-500 text-white shadow-md shadow-blue-500/20'
                  : 'bg-[#171e2e] text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search exercises or muscle..."
            className="w-full bg-[#171e2e] text-slate-200 text-xs rounded-xl pl-9 pr-3.5 py-2 border border-slate-700/60 focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>

      {/* Requests Feed List */}
      <div className="space-y-4">
        {filteredRequests.length === 0 ? (
          <div className="bg-[#121724] border border-slate-800 rounded-2xl p-12 text-center space-y-3 shadow-xl">
            <div className="w-14 h-14 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center mx-auto text-slate-500">
              <RefreshCw className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-200">No Substitution Requests Found</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              You currently have no exercise swap requests matching your active filter. Click "Request New Swap" above to request a movement modification.
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
                  : 'border-rose-950/60 bg-gradient-to-r from-rose-950/10 via-[#121724] to-[#121724]'
              }`}
            >
              {/* Top Header: Exercise Title & Status Badge */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold text-slate-400 bg-slate-800 px-2 py-0.5 rounded font-mono">
                      {req.targetMuscle}
                    </span>
                    <span className="text-[11px] text-slate-400 font-mono">
                      Submitted: {req.requestedDate}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-slate-100 mt-1 flex items-center gap-2">
                    <Dumbbell className="w-4 h-4 text-blue-400" />
                    <span>{req.originalExercise}</span>
                  </h3>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span
                    className={`text-[11px] font-bold tracking-wider uppercase px-3 py-1 rounded-full border flex items-center gap-1.5 ${
                      req.status === 'PENDING'
                        ? 'bg-amber-950/80 text-amber-300 border-amber-800/60'
                        : req.status === 'APPROVED'
                        ? 'bg-emerald-950/80 text-emerald-300 border-emerald-800/60'
                        : 'bg-rose-950/80 text-rose-300 border-rose-800/60'
                    }`}
                  >
                    {req.status === 'PENDING' && <Clock className="w-3.5 h-3.5 animate-spin" />}
                    {req.status === 'APPROVED' && <CheckCircle2 className="w-3.5 h-3.5" />}
                    {req.status === 'REJECTED' && <XCircle className="w-3.5 h-3.5" />}
                    <span>{req.status === 'PENDING' ? 'Under Review' : req.status}</span>
                  </span>
                </div>
              </div>

              {/* Movement Swap Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                {/* Left: Client Reason & Note */}
                <div className="bg-[#171e2e] border border-slate-800 p-4 rounded-xl space-y-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    SWAP REASON ({req.reasonCategory})
                  </span>
                  <div className="text-slate-200 text-xs italic flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span>"{req.reasonNote}"</span>
                  </div>
                </div>

                {/* Right: Suggested Alternative & Coach Feedback */}
                <div className="bg-[#162133] border border-blue-500/30 p-4 rounded-xl space-y-2">
                  <span className="text-[10px] font-bold text-blue-400 uppercase tracking-wider block">
                    ALTERNATIVE MOVEMENT PROTOCOL
                  </span>
                  <div className="flex items-center gap-2">
                    <RefreshCw className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span className="font-bold text-emerald-300 text-sm">{req.suggestedAlternative}</span>
                  </div>
                  {req.coachResponseNote && (
                    <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-300 flex items-start gap-2">
                      <Sparkles className="w-3.5 h-3.5 text-indigo-400 shrink-0 mt-0.5" />
                      <span><strong>Coach Note:</strong> {req.coachResponseNote}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Request New Substitution Modal */}
      {isNewRequestOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#121724] border border-slate-800 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl space-y-0">
            <div className="flex items-center justify-between p-5 border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/30">
                  <ArrowLeftRight className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif-header text-lg font-bold text-white">
                    Request Exercise Substitution
                  </h3>
                  <p className="text-xs text-slate-400">Notify Coach Alex of equipment or movement modifications</p>
                </div>
              </div>
              <button
                onClick={() => setIsNewRequestOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-200 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSubmitNewRequest} className="p-5 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Select Exercise to Substitute
                </label>
                <select
                  value={selectedExercise}
                  onChange={(e) => setSelectedExercise(e.target.value)}
                  className="w-full bg-[#171e2e] text-slate-200 text-xs rounded-xl p-2.5 border border-slate-700/60 focus:outline-none focus:border-blue-500 cursor-pointer"
                >
                  <option value="">-- Choose from Today's Protocol --</option>
                  {activeExercises.map((ex) => (
                    <option key={ex.id || ex.name} value={ex.name}>
                      {ex.name} ({ex.target || 'General'})
                    </option>
                  ))}
                  <option value="other">-- Custom Movement (Other) --</option>
                </select>
              </div>

              {(!selectedExercise || selectedExercise === 'other') && (
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Exercise Name
                  </label>
                  <input
                    type="text"
                    required
                    value={customExerciseName}
                    onChange={(e) => setCustomExerciseName(e.target.value)}
                    placeholder="e.g. Incline Barbell Bench Press"
                    className="w-full bg-[#171e2e] text-slate-200 text-xs rounded-xl p-2.5 border border-slate-700/60 focus:outline-none focus:border-blue-500"
                  />
                </div>
              )}

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Target Muscle</label>
                  <select
                    value={targetMuscle}
                    onChange={(e) => setTargetMuscle(e.target.value)}
                    className="w-full bg-[#171e2e] text-slate-200 text-xs rounded-xl p-2.5 border border-slate-700/60 focus:outline-none focus:border-blue-500 cursor-pointer"
                  >
                    <option value="Chest">Chest</option>
                    <option value="Back / Lats">Back / Lats</option>
                    <option value="Quadriceps">Quadriceps</option>
                    <option value="Hamstrings & Glutes">Hamstrings & Glutes</option>
                    <option value="Shoulders">Shoulders</option>
                    <option value="Arms (Biceps/Triceps)">Arms (Biceps/Triceps)</option>
                    <option value="Core">Core</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Reason Category</label>
                  <select
                    value={reasonCategory}
                    onChange={(e) => setReasonCategory(e.target.value)}
                    className="w-full bg-[#171e2e] text-slate-200 text-xs rounded-xl p-2.5 border border-slate-700/60 focus:outline-none focus:border-blue-500 cursor-pointer"
                  >
                    <option value="Equipment Missing">Equipment Missing</option>
                    <option value="Joint Discomfort">Joint / Injury Discomfort</option>
                    <option value="Busy Gym Machine">Busy Gym Machine</option>
                    <option value="Preference">Personal Preference</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Preferred Alternative Movement (Optional)
                </label>
                <input
                  type="text"
                  value={suggestedAlternative}
                  onChange={(e) => setSuggestedAlternative(e.target.value)}
                  placeholder="e.g. Bulgarian Split Squat with Dumbbells"
                  className="w-full bg-[#171e2e] text-slate-200 text-xs rounded-xl p-2.5 border border-slate-700/60 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Note to Coach
                </label>
                <textarea
                  rows="3"
                  value={reasonNote}
                  onChange={(e) => setReasonNote(e.target.value)}
                  placeholder="Explain your gym setup or joint feelings so Coach Alex can tailor the swap..."
                  className="w-full bg-[#171e2e] text-slate-200 text-xs rounded-xl p-2.5 border border-slate-700/60 focus:outline-none focus:border-blue-500 resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsNewRequestOpen(false)}
                  className="py-2.5 px-4 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs rounded-xl transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="py-2.5 px-5 bg-blue-500 hover:bg-blue-600 text-white font-bold text-xs rounded-xl shadow-lg shadow-blue-500/20 flex items-center gap-2 transition-all cursor-pointer"
                >
                  <Send className="w-4 h-4" />
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
