import { useState } from 'react';
import { 
  Utensils, 
  Plus, 
  CheckCircle2, 
  Clock, 
  XCircle, 
  Search, 
  Apple, 
  AlertCircle, 
  X,
  Send,
  RefreshCw,
  Sparkles
} from 'lucide-react';

export default function ClientFoodSwapsPage({ showToast }) {
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [isNewRequestOpen, setIsNewRequestOpen] = useState(false);

  // Client Food Swap Requests State
  const [requests, setRequests] = useState([
    {
      id: 'fs_1',
      mealCategory: 'Lunch',
      originalFood: 'Grilled Chicken Breast (200g)',
      reasonCategory: 'Food Allergy / Intolerance',
      reasonNote: 'Developing digestive discomfort with poultry this week. Need a fish or plant alternative.',
      suggestedAlternative: 'Wild Salmon Filet (180g)',
      status: 'APPROVED',
      coachResponseNote: 'Approved! Salmon filet (180g) provides equivalent protein (38g) with healthy omega-3 fats.',
      requestedDate: 'Today, 10:30 AM',
    },
    {
      id: 'fs_2',
      mealCategory: 'Breakfast',
      originalFood: 'Whole Eggs (3 Large)',
      reasonCategory: 'Missing Groceries',
      reasonNote: 'Local store was completely out of fresh eggs this morning.',
      suggestedAlternative: 'Egg Whites Container (200ml) + 1/4 Avocado',
      status: 'PENDING',
      coachResponseNote: null,
      requestedDate: 'Yesterday, 07:45 AM',
    },
    {
      id: 'fs_3',
      mealCategory: 'Snacks',
      originalFood: 'Whey Protein Isolate (1 Scoop)',
      reasonCategory: 'Taste Preference',
      reasonNote: 'Prefer whole food protein source for mid-day snack.',
      suggestedAlternative: 'Greek Yogurt 0% Fat (220g) + Honey',
      status: 'APPROVED',
      coachResponseNote: 'Approved. 220g Greek Yogurt matches your 25g protein target perfectly.',
      requestedDate: 'Aug 05, 2026',
    },
    {
      id: 'fs_4',
      mealCategory: 'Dinner',
      originalFood: 'White Basmati Rice (200g)',
      reasonCategory: 'Diet Change',
      reasonNote: 'Would like to swap white rice for sweet potatoes.',
      suggestedAlternative: 'Baked Sweet Potato (250g)',
      status: 'REJECTED',
      coachResponseNote: 'Keep white rice for immediate post-workout glycogen replenishment today. We will swap on rest days.',
      requestedDate: 'Aug 01, 2026',
    },
  ]);

  // Form State for Request Modal
  const [mealCategory, setMealCategory] = useState('Lunch');
  const [originalFood, setOriginalFood] = useState('');
  const [reasonCategory, setReasonCategory] = useState('Missing Groceries');
  const [reasonNote, setReasonNote] = useState('');
  const [suggestedAlternative, setSuggestedAlternative] = useState('');

  // Derived Metrics
  const totalCount = requests.length;
  const pendingCount = requests.filter((r) => r.status === 'PENDING').length;
  const approvedCount = requests.filter((r) => r.status === 'APPROVED').length;

  // Filtered Requests List
  const filteredRequests = requests.filter((req) => {
    const matchesFilter = activeFilter === 'ALL' || req.status === activeFilter;
    const matchesSearch = 
      req.originalFood.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.suggestedAlternative.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.mealCategory.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleSubmitNewRequest = (e) => {
    e.preventDefault();
    if (!originalFood.trim()) return;

    const newReq = {
      id: `fs_${Date.now()}`,
      mealCategory,
      originalFood,
      reasonCategory,
      reasonNote: reasonNote || 'Requesting ingredient substitution.',
      suggestedAlternative: suggestedAlternative || 'Coach Recommended Food Substitute',
      status: 'PENDING',
      coachResponseNote: null,
      requestedDate: 'Just now',
    };

    setRequests((prev) => [newReq, ...prev]);
    setIsNewRequestOpen(false);
    setOriginalFood('');
    setReasonNote('');
    setSuggestedAlternative('');

    if (showToast) showToast('Submitted food swap request to your coach!', 'success');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header Bar & Action Button */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold text-amber-400 bg-amber-950 px-2.5 py-0.5 rounded border border-amber-800/60 uppercase tracking-widest flex items-center gap-1">
              <Utensils className="w-3 h-3 text-amber-400" /> NUTRITION PROTOCOL MODIFIER
            </span>
          </div>
          <h1 className="font-serif-header text-3xl font-bold text-white tracking-tight mt-1">
            Food & Meal Substitutions
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Submit ingredient or meal swap requests for food allergies, missing groceries, or taste preferences.
          </p>
        </div>

        <button
          onClick={() => setIsNewRequestOpen(true)}
          className="py-3 px-5 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-400 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-bold text-xs rounded-xl shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 transition-all cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Request Food Swap</span>
        </button>
      </div>

      {/* Quick Overview Summary Banner Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-[#121724] border border-slate-800 rounded-2xl p-4 flex items-center gap-4 shadow-xl">
          <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <Utensils className="w-6 h-6" />
          </div>
          <div>
            <span className="text-2xl font-bold text-white font-mono">{totalCount}</span>
            <p className="text-xs text-slate-400 font-medium">Total Food Swaps</p>
          </div>
        </div>

        <div className="bg-[#121724] border border-slate-800 rounded-2xl p-4 flex items-center gap-4 shadow-xl">
          <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <Clock className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <span className="text-2xl font-bold text-amber-300 font-mono">{pendingCount}</span>
            <p className="text-xs text-slate-400 font-medium">Pending Review</p>
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
            { id: 'ALL', label: 'All Food Swaps' },
            { id: 'PENDING', label: 'Pending Review' },
            { id: 'APPROVED', label: 'Approved' },
            { id: 'REJECTED', label: 'Rejected' },
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
            placeholder="Search food or category..."
            className="w-full bg-[#171e2e] text-slate-200 text-xs rounded-xl pl-9 pr-3.5 py-2 border border-slate-700/60 focus:outline-none focus:border-amber-500"
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
            <h3 className="text-base font-bold text-slate-200">No Food Swap Requests Found</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              You currently have no food swap requests matching your filter. Click "Request Food Swap" above to request an ingredient modification.
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
              {/* Header: Prescribed Food & Status */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold text-amber-400 bg-amber-950 px-2 py-0.5 rounded font-mono">
                      {req.mealCategory}
                    </span>
                    <span className="text-[11px] text-slate-400 font-mono">
                      Submitted: {req.requestedDate}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-slate-100 mt-1 flex items-center gap-2">
                    <Apple className="w-4 h-4 text-amber-400" />
                    <span>{req.originalFood}</span>
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

              {/* Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                {/* Left: Reason & Note */}
                <div className="bg-[#171e2e] border border-slate-800 p-4 rounded-xl space-y-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    SWAP REASON ({req.reasonCategory})
                  </span>
                  <div className="text-slate-200 text-xs italic flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span>"{req.reasonNote}"</span>
                  </div>
                </div>

                {/* Right: Suggested Substitute & Coach Feedback */}
                <div className="bg-[#1c1a24] border border-amber-500/30 p-4 rounded-xl space-y-2">
                  <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block">
                    SUGGESTED FOOD SUBSTITUTE
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

      {/* Request New Food Swap Modal */}
      {isNewRequestOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#121724] border border-slate-800 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl space-y-0">
            <div className="flex items-center justify-between p-5 border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/30">
                  <Utensils className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif-header text-lg font-bold text-white">
                    Request Food & Ingredient Swap
                  </h3>
                  <p className="text-xs text-slate-400">Notify Coach Alex of food allergies or grocery substitutes</p>
                </div>
              </div>
              <button
                onClick={() => setIsNewRequestOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-200 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSubmitNewRequest} className="p-5 space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Meal Category</label>
                  <select
                    value={mealCategory}
                    onChange={(e) => setMealCategory(e.target.value)}
                    className="w-full bg-[#171e2e] text-slate-200 rounded-xl p-2.5 border border-slate-700/60 focus:outline-none focus:border-amber-500 cursor-pointer"
                  >
                    <option value="Breakfast">Breakfast</option>
                    <option value="Lunch">Lunch</option>
                    <option value="Dinner">Dinner</option>
                    <option value="Snacks">Snacks</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Reason Category</label>
                  <select
                    value={reasonCategory}
                    onChange={(e) => setReasonCategory(e.target.value)}
                    className="w-full bg-[#171e2e] text-slate-200 rounded-xl p-2.5 border border-slate-700/60 focus:outline-none focus:border-amber-500 cursor-pointer"
                  >
                    <option value="Missing Groceries">Missing Groceries / Out of Stock</option>
                    <option value="Food Allergy / Intolerance">Food Allergy / Intolerance</option>
                    <option value="Taste Preference">Taste Preference / Dislike</option>
                    <option value="Diet Change">Dietary Change</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">
                  Food / Ingredient to Replace
                </label>
                <input
                  type="text"
                  required
                  value={originalFood}
                  onChange={(e) => setOriginalFood(e.target.value)}
                  placeholder="e.g. Grilled Chicken Breast (200g)"
                  className="w-full bg-[#171e2e] text-slate-200 rounded-xl p-2.5 border border-slate-700/60 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">
                  Preferred Food Substitute (Optional)
                </label>
                <input
                  type="text"
                  value={suggestedAlternative}
                  onChange={(e) => setSuggestedAlternative(e.target.value)}
                  placeholder="e.g. Wild Salmon Filet (180g) or Tofu (250g)"
                  className="w-full bg-[#171e2e] text-slate-200 rounded-xl p-2.5 border border-slate-700/60 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">
                  Notes for Coach
                </label>
                <textarea
                  rows="3"
                  value={reasonNote}
                  onChange={(e) => setReasonNote(e.target.value)}
                  placeholder="Explain why you need the swap so Coach Alex can match macros..."
                  className="w-full bg-[#171e2e] text-slate-200 rounded-xl p-2.5 border border-slate-700/60 focus:outline-none focus:border-amber-500 resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsNewRequestOpen(false)}
                  className="py-2.5 px-4 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold rounded-xl transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="py-2.5 px-5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl shadow-lg shadow-amber-500/20 flex items-center gap-2 transition-all cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Food Request</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
