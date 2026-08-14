import { useState } from 'react';
import { 
  Check, 
  X, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  Search, 
  RefreshCw,
  Dumbbell,
  AlertCircle
} from 'lucide-react';

export default function ExerciseSwapRequestsPage({ showToast }) {
  const [activeFilter, setActiveFilter] = useState('PENDING');
  const [searchQuery, setSearchQuery] = useState('');

  // Sample Exercise Substitution Requests Queue
  const [requests, setRequests] = useState([
    {
      id: 'req1',
      clientName: 'Sarah Connor',
      clientAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80',
      programName: 'Push Hypertrophy Split - Day 2',
      originalExercise: 'Barbell Bench Press',
      targetMuscle: 'Chest',
      reasonCategory: 'Joint Pain',
      reasonNote: 'Left shoulder discomfort during heavy pressing.',
      suggestedAlternative: 'Incline Dumbbell Press (Neutral Grip)',
      requestedTime: '18 mins ago',
      status: 'PENDING',
    },
    {
      id: 'req2',
      clientName: 'Marcus Jensen',
      clientAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      programName: 'Leg Day Volume Protocol',
      originalExercise: 'Hack Squat Machine',
      targetMuscle: 'Quads',
      reasonCategory: 'Equipment Missing',
      reasonNote: 'Gym hack squat machine is under maintenance today.',
      suggestedAlternative: 'Leg Press (Mid-Foot Stance)',
      requestedTime: '1 hour ago',
      status: 'PENDING',
    },
    {
      id: 'req3',
      clientName: 'Elena Rodriguez',
      clientAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80',
      programName: 'Pull & Back Specialization',
      originalExercise: 'Lat Pulldown (Wide Grip)',
      targetMuscle: 'Lats',
      reasonCategory: 'Equipment Busy',
      reasonNote: 'Cable tower occupied during peak hour.',
      suggestedAlternative: 'Chest-Supported Dumbbell Row',
      requestedTime: '3 hours ago',
      status: 'APPROVED',
    },
    {
      id: 'req4',
      clientName: 'David Miller',
      clientAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
      programName: 'Upper Body Power Split',
      originalExercise: 'Overhead Barbell Press',
      targetMuscle: 'Shoulders',
      reasonCategory: 'Injury History',
      reasonNote: 'Rotator cuff tightness.',
      suggestedAlternative: 'Seated Dumbbell Shoulder Press',
      requestedTime: '1 day ago',
      status: 'REJECTED',
    },
  ]);

  const pendingCount = requests.filter((r) => r.status === 'PENDING').length;
  const approvedCount = requests.filter((r) => r.status === 'APPROVED').length;
  const rejectedCount = requests.filter((r) => r.status === 'REJECTED').length;

  const handleApprove = (id, altName) => {
    setRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: 'APPROVED' } : r))
    );
    if (showToast) showToast(`Approved swap to ${altName}! Program updated.`);
  };

  const handleReject = (id, clientName) => {
    setRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: 'REJECTED' } : r))
    );
    if (showToast) showToast(`Rejected swap request for ${clientName}`, 'info');
  };

  const filteredRequests = requests.filter((r) => {
    const matchesFilter = activeFilter === 'ALL' || r.status === activeFilter;
    const matchesSearch =
      r.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.originalExercise.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.suggestedAlternative.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold text-amber-400 bg-amber-950 px-2.5 py-0.5 rounded border border-amber-800/60 uppercase tracking-widest">
              EXERCISE SUBSTITUTION QUEUE
            </span>
            {pendingCount > 0 && (
              <span className="text-xs font-bold text-amber-300 bg-amber-950 px-2 py-0.5 rounded-full border border-amber-800/60 animate-pulse">
                {pendingCount} Pending Review
              </span>
            )}
          </div>
          <h1 className="font-serif-header text-3xl font-bold text-white tracking-tight mt-1">
            Exercise Change Requests
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Review client substitution requests inside their routines — approve an alternative exercise or reject request.
          </p>
        </div>
      </div>

      {/* 3 Summary Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Card 1: Pending Review */}
        <div className="bg-[#121724] border border-amber-500/30 rounded-2xl p-5 shadow-lg space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400 font-semibold">
            <span className="uppercase tracking-wider">UNDER REVIEW</span>
            <Clock className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-3xl font-extrabold text-white font-mono">{pendingCount}</div>
          <span className="text-[11px] text-amber-400 font-semibold">Requires coach review</span>
        </div>

        {/* Card 2: Approved Swaps */}
        <div className="bg-[#121724] border border-slate-800 rounded-2xl p-5 shadow-lg space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400 font-semibold">
            <span className="uppercase tracking-wider">APPROVED SWAPS</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-3xl font-extrabold text-white font-mono">{approvedCount}</div>
          <span className="text-[11px] text-emerald-400 font-semibold">Routines updated</span>
        </div>

        {/* Card 3: Rejected */}
        <div className="bg-[#121724] border border-slate-800 rounded-2xl p-5 shadow-lg space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400 font-semibold">
            <span className="uppercase tracking-wider">REJECTED</span>
            <XCircle className="w-4 h-4 text-pink-400" />
          </div>
          <div className="text-3xl font-extrabold text-white font-mono">{rejectedCount}</div>
          <span className="text-[11px] text-slate-400 font-semibold">Kept original exercise</span>
        </div>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#121724] border border-slate-800 p-4 rounded-2xl shadow-lg">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by client name or exercise..."
            className="w-full bg-[#171e2e] text-slate-200 text-xs rounded-xl pl-10 pr-3.5 py-2.5 border border-slate-700/60 focus:outline-none focus:border-amber-500"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto bg-[#171e2e] p-1 rounded-xl border border-slate-800 text-xs font-semibold scrollbar-none">
          {['PENDING', 'APPROVED', 'REJECTED', 'ALL'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveFilter(tab)}
              className={`px-3.5 py-1.5 rounded-lg whitespace-nowrap transition-all cursor-pointer ${
                activeFilter === tab
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {tab === 'PENDING' ? `Under Review (${pendingCount})` : tab}
            </button>
          ))}
        </div>
      </div>

      {/* Requests Feed / Queue */}
      <div className="space-y-4">
        {filteredRequests.length === 0 ? (
          <div className="bg-[#121724] border border-slate-800 rounded-2xl p-12 text-center space-y-3 shadow-xl">
            <div className="w-14 h-14 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center mx-auto text-slate-500">
              <RefreshCw className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-200">No Change Requests Found</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              Exercise substitution requests sent by clients from their daily workout portal will appear here for 1-click review.
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
              {/* Header: Client & Status */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-3">
                <div className="flex items-center gap-3">
                  <img
                    src={req.clientAvatar}
                    alt={req.clientName}
                    className="w-10 h-10 rounded-full object-cover ring-2 ring-blue-500/40"
                  />
                  <div>
                    <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                      {req.clientName}
                      <span className="text-[10px] font-semibold text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
                        {req.programName}
                      </span>
                    </h3>
                    <span className="text-[11px] text-slate-400 font-mono">
                      Requested: {req.requestedTime}
                    </span>
                  </div>
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
                    {req.status === 'PENDING' ? 'Under Review' : req.status}
                  </span>
                </div>
              </div>

              {/* Movement Swap Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                {/* Left: Original Prescribed Exercise */}
                <div className="bg-[#171e2e] border border-slate-800 p-3.5 rounded-xl space-y-1.5">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    CURRENT PRESCRIBED MOVEMENT
                  </span>
                  <div className="flex items-center gap-2">
                    <Dumbbell className="w-4 h-4 text-slate-400" />
                    <span className="font-bold text-slate-200 text-sm">{req.originalExercise}</span>
                    <span className="text-[10px] font-semibold text-blue-400 bg-blue-950 px-2 py-0.5 rounded border border-blue-800/60">
                      {req.targetMuscle}
                    </span>
                  </div>
                  <div className="pt-1 text-[11px] text-amber-300 font-semibold flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>Reason ({req.reasonCategory}): "{req.reasonNote}"</span>
                  </div>
                </div>

                {/* Right: Suggested Alternative */}
                <div className="bg-[#162133] border border-blue-500/30 p-3.5 rounded-xl space-y-1.5">
                  <span className="text-[10px] font-bold text-blue-400 uppercase tracking-wider block">
                    SUGGESTED ALTERNATIVE EXERCISE
                  </span>
                  <div className="flex items-center gap-2">
                    <RefreshCw className="w-4 h-4 text-emerald-400" />
                    <span className="font-bold text-emerald-300 text-sm">{req.suggestedAlternative}</span>
                  </div>
                  <p className="text-[11px] text-slate-400 pt-1">
                    Same biomechanical vector & muscle activation.
                  </p>
                </div>
              </div>

              {/* Action Buttons for Pending Requests */}
              {req.status === 'PENDING' && (
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-2.5 pt-2 border-t border-slate-800/80">
                  <button
                    onClick={() => handleReject(req.id, req.clientName)}
                    className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-bold transition-all cursor-pointer border border-slate-700"
                  >
                    <X className="w-4 h-4 text-pink-400" />
                    <span>Reject Request</span>
                  </button>

                  <button
                    onClick={() => handleApprove(req.id, req.suggestedAlternative)}
                    className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-5 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-md shadow-emerald-500/20"
                  >
                    <Check className="w-4 h-4" />
                    <span>Approve & Update Routine</span>
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
