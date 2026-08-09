import { useState } from 'react';
import { 
  Utensils, 
  Check, 
  X, 
  Clock, 
  Search, 
  RefreshCw,
  Sparkles,
  Apple,
  AlertCircle
} from 'lucide-react';

export default function FoodSwapRequestsPage({ showToast }) {
  const [activeFilter, setActiveFilter] = useState('PENDING');
  const [searchQuery, setSearchQuery] = useState('');

  // Sample Food Substitution Requests Queue for Coach
  const [requests, setRequests] = useState([
    {
      id: 'fs_1',
      clientName: 'Marcus Johnson',
      clientAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      programName: 'Hypertrophy Phase 2',
      mealCategory: 'Lunch',
      originalFood: 'Grilled Chicken Breast (200g)',
      reasonCategory: 'Food Allergy / Intolerance',
      reasonNote: 'Developing digestive discomfort with poultry this week. Need a fish or plant alternative.',
      suggestedAlternative: 'Wild Salmon Filet (180g)',
      requestedTime: 'Today, 10:30 AM',
      status: 'PENDING',
      coachResponseNote: null,
    },
    {
      id: 'fs_2',
      clientName: 'Sarah Jenkins',
      clientAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80',
      programName: 'Endurance Prep',
      mealCategory: 'Breakfast',
      originalFood: 'Whole Eggs (3 Large)',
      reasonCategory: 'Missing Groceries',
      reasonNote: 'Local store was completely out of fresh eggs this morning.',
      suggestedAlternative: 'Egg Whites Container (200ml) + 1/4 Avocado',
      requestedTime: 'Yesterday, 07:45 AM',
      status: 'PENDING',
      coachResponseNote: null,
    },
    {
      id: 'fs_3',
      clientName: 'David Thompson',
      clientAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
      programName: 'Weight Loss Cutting',
      mealCategory: 'Snacks',
      originalFood: 'Whey Protein Isolate (1 Scoop)',
      reasonCategory: 'Taste Preference',
      reasonNote: 'Prefer whole food protein source for mid-day snack.',
      suggestedAlternative: 'Greek Yogurt 0% Fat (220g) + Honey',
      requestedTime: 'Aug 05, 2026',
      status: 'APPROVED',
      coachResponseNote: 'Approved. 220g Greek Yogurt matches your 25g protein target perfectly.',
    },
    {
      id: 'fs_4',
      clientName: 'Elena Rodriguez',
      clientAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
      programName: 'Strength Building',
      mealCategory: 'Dinner',
      originalFood: 'White Basmati Rice (200g)',
      reasonCategory: 'Diet Change',
      reasonNote: 'Would like to swap white rice for sweet potatoes today.',
      suggestedAlternative: 'Baked Sweet Potato (250g)',
      requestedTime: 'Aug 01, 2026',
      status: 'REJECTED',
      coachResponseNote: 'Keep white rice for immediate post-workout glycogen replenishment today. We will swap on rest days.',
    },
  ]);

  // Response Modal State
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [responseModalType, setResponseModalType] = useState(null); // 'APPROVE' | 'REJECT'
  const [coachNoteInput, setCoachNoteInput] = useState('');
  const [modifiedAlternativeInput, setModifiedAlternativeInput] = useState('');

  // Filtering
  const filteredRequests = requests.filter((req) => {
    const matchesFilter = activeFilter === 'ALL' || req.status === activeFilter;
    const matchesSearch = 
      req.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.originalFood.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.suggestedAlternative.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const pendingCount = requests.filter((r) => r.status === 'PENDING').length;
  const approvedCount = requests.filter((r) => r.status === 'APPROVED').length;

  const handleOpenApproveModal = (req) => {
    setSelectedRequest(req);
    setResponseModalType('APPROVE');
    setCoachNoteInput(`Approved! ${req.suggestedAlternative} matches target macros nicely.`);
    setModifiedAlternativeInput(req.suggestedAlternative);
  };

  const handleOpenRejectModal = (req) => {
    setSelectedRequest(req);
    setResponseModalType('REJECT');
    setCoachNoteInput('Keep current prescribed ingredient to maintain exact macro ratio targets for this training phase.');
  };

  const handleConfirmResponse = () => {
    if (!selectedRequest) return;

    const newStatus = responseModalType === 'APPROVE' ? 'APPROVED' : 'REJECTED';
    const finalSubstitute = modifiedAlternativeInput.trim() || selectedRequest.suggestedAlternative;

    setRequests((prev) =>
      prev.map((r) =>
        r.id === selectedRequest.id
          ? { 
              ...r, 
              status: newStatus, 
              coachResponseNote: coachNoteInput,
              suggestedAlternative: finalSubstitute
            }
          : r
      )
    );

    if (showToast) {
      showToast(
        newStatus === 'APPROVED'
          ? `Approved food swap for ${selectedRequest.clientName}!`
          : `Declined food swap for ${selectedRequest.clientName}.`,
        newStatus === 'APPROVED' ? 'success' : 'info'
      );
    }

    setSelectedRequest(null);
    setResponseModalType(null);
    setCoachNoteInput('');
    setModifiedAlternativeInput('');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header Controls Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold text-amber-400 bg-amber-950 px-2.5 py-0.5 rounded border border-amber-800/60 uppercase tracking-widest flex items-center gap-1">
              <Utensils className="w-3 h-3 text-amber-400" /> CLIENT NUTRITION QUEUE
            </span>
          </div>
          <h1 className="font-serif-header text-3xl font-bold text-white tracking-tight mt-1">
            Food Swap Requests
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Review, approve, or adjust ingredient and meal substitutions submitted by your clients.
          </p>
        </div>

        {/* Pending Badge */}
        {pendingCount > 0 && (
          <div className="flex items-center gap-2 bg-amber-950/60 border border-amber-500/40 px-4 py-2 rounded-xl text-amber-300 text-xs font-bold shrink-0">
            <Clock className="w-4 h-4 text-amber-400 animate-spin" />
            <span>{pendingCount} Request(s) Awaiting Review</span>
          </div>
        )}
      </div>

      {/* Filter Tabs & Search Controls */}
      <div className="bg-[#121724] border border-slate-800 rounded-2xl p-4 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          {[
            { id: 'PENDING', label: `Pending Review (${pendingCount})` },
            { id: 'APPROVED', label: `Approved (${approvedCount})` },
            { id: 'REJECTED', label: 'Rejected' },
            { id: 'ALL', label: `All Requests (${requests.length})` },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                activeFilter === tab.id
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
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
            placeholder="Search client or food..."
            className="w-full bg-[#171e2e] text-slate-200 text-xs rounded-xl pl-9 pr-3.5 py-2 border border-slate-700/60 focus:outline-none focus:border-amber-500"
          />
        </div>
      </div>

      {/* Requests Feed Queue */}
      <div className="space-y-4">
        {filteredRequests.length === 0 ? (
          <div className="bg-[#121724] border border-slate-800 rounded-2xl p-12 text-center space-y-3 shadow-xl">
            <div className="w-14 h-14 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center mx-auto text-slate-500">
              <RefreshCw className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-200">No Food Swap Requests Found</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              Ingredient substitution requests sent by clients from their athlete portal will appear here for 1-click review.
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
              {/* Header: Client Info & Status */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-3">
                <div className="flex items-center gap-3">
                  <img
                    src={req.clientAvatar}
                    alt={req.clientName}
                    className="w-10 h-10 rounded-full object-cover ring-2 ring-amber-500/40"
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

              {/* Food Swap Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                {/* Left: Original Prescribed Food & Client Reason */}
                <div className="bg-[#171e2e] border border-slate-800 p-3.5 rounded-xl space-y-1.5">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    CURRENT PRESCRIBED INGREDIENT ({req.mealCategory})
                  </span>
                  <div className="flex items-center gap-2">
                    <Apple className="w-4 h-4 text-amber-400" />
                    <span className="font-bold text-slate-200 text-sm">{req.originalFood}</span>
                  </div>
                  <div className="pt-1 text-[11px] text-amber-300 font-semibold flex items-start gap-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                    <span>Reason ({req.reasonCategory}): "{req.reasonNote}"</span>
                  </div>
                </div>

                {/* Right: Suggested Alternative & Coach Feedback */}
                <div className="bg-[#1c1a24] border border-amber-500/30 p-3.5 rounded-xl space-y-1.5">
                  <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block">
                    SUGGESTED FOOD SUBSTITUTE
                  </span>
                  <div className="flex items-center gap-2">
                    <RefreshCw className="w-4 h-4 text-emerald-400" />
                    <span className="font-bold text-emerald-300 text-sm">{req.suggestedAlternative}</span>
                  </div>
                  {req.coachResponseNote && (
                    <p className="text-[11px] text-slate-300 pt-1 border-t border-slate-800">
                      <strong>Coach Note:</strong> {req.coachResponseNote}
                    </p>
                  )}
                </div>
              </div>

              {/* 1-Click Action Buttons for Pending Requests */}
              {req.status === 'PENDING' && (
                <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-800/80">
                  <button
                    onClick={() => handleOpenRejectModal(req)}
                    className="py-2 px-4 bg-rose-950/60 hover:bg-rose-900/80 text-rose-300 border border-rose-800/60 font-bold text-xs rounded-xl flex items-center gap-1.5 transition-all cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                    <span>Decline Swap</span>
                  </button>

                  <button
                    onClick={() => handleOpenApproveModal(req)}
                    className="py-2 px-5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl shadow-md shadow-emerald-500/20 flex items-center gap-1.5 transition-all cursor-pointer"
                  >
                    <Check className="w-4 h-4" />
                    <span>Approve Food Swap</span>
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Response Confirmation Modal */}
      {responseModalType && selectedRequest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#121724] border border-slate-800 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl space-y-4 p-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-serif-header text-base font-bold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>{responseModalType === 'APPROVE' ? 'Approve Food Swap' : 'Decline Food Swap'}</span>
              </h3>
              <button
                onClick={() => setResponseModalType(null)}
                className="text-slate-400 hover:text-slate-200 text-xs"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-400 font-semibold mb-1">
                  Food Substitute ({selectedRequest.originalFood} → ?)
                </label>
                <input
                  type="text"
                  value={modifiedAlternativeInput}
                  onChange={(e) => setModifiedAlternativeInput(e.target.value)}
                  className="w-full bg-[#171e2e] text-slate-200 text-xs rounded-xl p-2.5 border border-slate-700/60 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-semibold mb-1">
                  Coach Note to {selectedRequest.clientName}
                </label>
                <textarea
                  rows="3"
                  value={coachNoteInput}
                  onChange={(e) => setCoachNoteInput(e.target.value)}
                  className="w-full bg-[#171e2e] text-slate-200 text-xs rounded-xl p-2.5 border border-slate-700/60 focus:outline-none focus:border-amber-400 resize-none"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
              <button
                onClick={() => setResponseModalType(null)}
                className="py-2 px-4 bg-slate-800 text-slate-300 font-bold text-xs rounded-xl"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmResponse}
                className={`py-2 px-5 font-bold text-xs rounded-xl shadow-md ${
                  responseModalType === 'APPROVE'
                    ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950'
                    : 'bg-rose-600 hover:bg-rose-500 text-white'
                }`}
              >
                Confirm {responseModalType === 'APPROVE' ? 'Approval' : 'Decline'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
