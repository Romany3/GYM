import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Apple, 
  Plus, 
  CheckCircle2, 
  Clock, 
  XCircle, 
  Search, 
  Utensils, 
  AlertCircle, 
  X,
  Send,
  RefreshCw,
  Sparkles
} from 'lucide-react';

export default function ClientFoodSwapsPage({ showToast, activeMeals = [] }) {
  const { t } = useTranslation();
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [isNewRequestOpen, setIsNewRequestOpen] = useState(false);

  // Food Swap Requests State
  const [requests, setRequests] = useState([
    {
      id: 'fs_1',
      originalFood: 'Grilled Chicken Breast (200g)',
      mealCategory: 'Lunch',
      reasonCategory: 'Food Allergy / Intolerance',
      reasonNote: 'Developing digestive discomfort with poultry this week. Need a fish or plant alternative.',
      suggestedAlternative: 'Wild Salmon Filet (180g)',
      status: 'PENDING',
      coachResponseNote: null,
      requestedDate: 'Today, 10:30 AM',
    },
    {
      id: 'fs_2',
      originalFood: 'Whole Eggs (3 Large)',
      mealCategory: 'Breakfast',
      reasonCategory: 'Missing Groceries',
      reasonNote: 'Local store was completely out of fresh eggs this morning.',
      suggestedAlternative: 'Egg Whites Container (200ml) + 1/4 Avocado',
      status: 'PENDING',
      coachResponseNote: null,
      requestedDate: 'Yesterday, 07:45 AM',
    },
    {
      id: 'fs_3',
      originalFood: 'Whey Protein Isolate (1 Scoop)',
      mealCategory: 'Snacks',
      reasonCategory: 'Taste Preference',
      reasonNote: 'Prefer whole food protein source for mid-day snack.',
      suggestedAlternative: 'Greek Yogurt 0% Fat (220g) + Honey',
      status: 'APPROVED',
      coachResponseNote: 'Approved. 220g Greek Yogurt matches your 25g protein target perfectly.',
      requestedDate: 'Aug 05, 2026',
    },
    {
      id: 'fs_4',
      originalFood: 'White Basmati Rice (200g)',
      mealCategory: 'Dinner',
      reasonCategory: 'Diet Change',
      reasonNote: 'Would like to swap white rice for sweet potatoes today.',
      suggestedAlternative: 'Baked Sweet Potato (250g)',
      status: 'REJECTED',
      coachResponseNote: 'Keep white rice for immediate post-workout glycogen replenishment today. We will swap on rest days.',
      requestedDate: 'Aug 01, 2026',
    },
  ]);

  // Form State for Request Modal
  const [selectedFoodName, setSelectedFoodName] = useState(
    activeMeals[0]?.name || 'Grilled Chicken Breast (200g)'
  );
  const [mealCategory, setMealCategory] = useState('Lunch');
  const [reasonCategory, setReasonCategory] = useState('Missing Groceries');
  const [reasonNote, setReasonNote] = useState('');
  const [suggestedAlternative, setSuggestedAlternative] = useState('');

  const pendingCount = requests.filter((r) => r.status === 'PENDING').length;
  const approvedCount = requests.filter((r) => r.status === 'APPROVED').length;

  const handleCreateRequest = (e) => {
    e.preventDefault();
    if (!suggestedAlternative.trim()) return;

    const newReq = {
      id: 'fs_' + Date.now(),
      originalFood: selectedFoodName,
      mealCategory,
      reasonCategory,
      reasonNote: reasonNote || 'Requested ingredient substitution to match daily macro goals.',
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
      showToast(`Submitted food swap request for ${selectedFoodName}!`, 'success');
    }
  };

  const filteredRequests = requests.filter((req) => {
    const matchesFilter = activeFilter === 'ALL' || req.status === activeFilter;
    const matchesSearch = 
      req.originalFood.toLowerCase().includes(searchQuery.toLowerCase()) ||
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
            <span className="text-[10px] font-bold text-amber-400 bg-amber-950 px-2.5 py-0.5 rounded border border-amber-800/60 uppercase tracking-widest flex items-center gap-1">
              <Apple className="w-3 h-3 text-amber-400" /> NUTRITION PROTOCOL SUBSTITUTIONS
            </span>
          </div>
          <h1 className="font-serif-header text-3xl font-bold text-white tracking-tight mt-1">
            {t('clientPortal.foodSwaps')}
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Request ingredient substitutions due to food allergies, missing groceries, or taste preferences.
          </p>
        </div>

        <button
          onClick={() => setIsNewRequestOpen(true)}
          className="flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs rounded-xl shadow-lg shadow-amber-500/20 transition-all cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4 text-slate-950" />
          <span>Request Food Swap</span>
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
          <span className="text-[11px] text-emerald-400 font-semibold">Active in daily meal protocol</span>
        </div>

        <div className="bg-[#121724] border border-slate-800 rounded-2xl p-5 shadow-lg space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400 font-semibold">
            <span className="uppercase tracking-wider">{t('swaps.rejected')}</span>
            <XCircle className="w-4 h-4 text-rose-400" />
          </div>
          <div className="text-3xl font-extrabold text-white font-mono">
            {requests.filter((r) => r.status === 'REJECTED').length}
          </div>
          <span className="text-[11px] text-slate-400 font-semibold">{t('swaps.keptOriginalFood')}</span>
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
            placeholder="Search food swap requests..."
            className="w-full bg-[#171e2e] text-slate-200 text-xs rounded-xl ps-10 pe-3.5 py-2.5 border border-slate-700/60 focus:outline-none focus:border-amber-500"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto bg-[#171e2e] p-1 rounded-xl border border-slate-800 text-xs font-semibold scrollbar-none">
          {['ALL', 'PENDING', 'APPROVED', 'REJECTED'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveFilter(tab)}
              className={`px-3.5 py-1.5 rounded-lg whitespace-nowrap transition-all cursor-pointer ${
                activeFilter === tab
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-md'
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
            <h3 className="text-base font-bold text-slate-200">{t('swaps.noFoodRequests')}</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              You have not submitted any food substitution requests under this filter category.
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

              {/* Food Comparison Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                {/* Original Food */}
                <div className="bg-[#171e2e] border border-slate-800 p-3.5 rounded-xl space-y-1.5">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    {t('swaps.currentFood')}
                  </span>
                  <div className="flex items-center gap-2">
                    <Utensils className="w-4 h-4 text-amber-400" />
                    <span className="font-bold text-slate-200 text-sm">{req.originalFood}</span>
                    <span className="text-[10px] font-semibold text-blue-400 bg-blue-950 px-2 py-0.5 rounded border border-blue-800/60">
                      {req.mealCategory}
                    </span>
                  </div>
                  <div className="pt-1 text-[11px] text-amber-300 font-semibold flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{t('swaps.reason')} ({req.reasonCategory}): "{req.reasonNote}"</span>
                  </div>
                </div>

                {/* Suggested Alternative Food */}
                <div className="bg-[#162133] border border-blue-500/30 p-3.5 rounded-xl space-y-1.5">
                  <span className="text-[10px] font-bold text-blue-400 uppercase tracking-wider block">
                    {t('swaps.suggestedAlternativeFood')}
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
                <Apple className="w-5 h-5 text-amber-400" />
                <span>Request Food Substitution</span>
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
                  Select Meal & Item to Substitute
                </label>
                <select
                  value={selectedFoodName}
                  onChange={(e) => setSelectedFoodName(e.target.value)}
                  className="w-full bg-[#171e2e] text-slate-200 text-xs rounded-xl p-2.5 border border-slate-700 focus:outline-none focus:border-amber-500 cursor-pointer"
                >
                  {activeMeals.length > 0 ? (
                    activeMeals.map((m) => (
                      <option key={m.id || m.name} value={m.name}>
                        {m.name} ({m.mealCategory || 'Meal'})
                      </option>
                    ))
                  ) : (
                    <>
                      <option value="Grilled Chicken Breast (200g)">Grilled Chicken Breast (200g)</option>
                      <option value="Whole Eggs (3 Large)">Whole Eggs (3 Large)</option>
                      <option value="Whey Protein Isolate (1 Scoop)">Whey Protein Isolate (1 Scoop)</option>
                      <option value="White Basmati Rice (200g)">White Basmati Rice (200g)</option>
                    </>
                  )}
                </select>
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-400 block mb-1">
                  Meal Category
                </label>
                <select
                  value={mealCategory}
                  onChange={(e) => setMealCategory(e.target.value)}
                  className="w-full bg-[#171e2e] text-slate-200 text-xs rounded-xl p-2.5 border border-slate-700 focus:outline-none focus:border-amber-500 cursor-pointer"
                >
                  <option value="Breakfast">{t('dailyPlan.meals.breakfast')}</option>
                  <option value="Lunch">{t('dailyPlan.meals.lunch')}</option>
                  <option value="Dinner">{t('dailyPlan.meals.dinner')}</option>
                  <option value="Snacks">{t('dailyPlan.meals.snacks')}</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-400 block mb-1">
                  Reason for Substitution
                </label>
                <select
                  value={reasonCategory}
                  onChange={(e) => setReasonCategory(e.target.value)}
                  className="w-full bg-[#171e2e] text-slate-200 text-xs rounded-xl p-2.5 border border-slate-700 focus:outline-none focus:border-amber-500 cursor-pointer"
                >
                  <option value="Missing Groceries">Missing Groceries / Store Out of Stock</option>
                  <option value="Food Allergy / Intolerance">Food Allergy / Digestive Intolerance</option>
                  <option value="Taste Preference">Taste Preference</option>
                  <option value="Diet Change">Dietary Adjustment Request</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-400 block mb-1">
                  Suggested Alternative Ingredient
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Wild Salmon Filet or Greek Yogurt"
                  value={suggestedAlternative}
                  onChange={(e) => setSuggestedAlternative(e.target.value)}
                  className="w-full bg-[#171e2e] text-slate-200 text-xs rounded-xl p-2.5 border border-slate-700 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-400 block mb-1">
                  Additional Notes for Coach
                </label>
                <textarea
                  rows="3"
                  placeholder="Describe your grocery situation or dietary preference..."
                  value={reasonNote}
                  onChange={(e) => setReasonNote(e.target.value)}
                  className="w-full bg-[#171e2e] text-slate-200 text-xs rounded-xl p-2.5 border border-slate-700 focus:outline-none focus:border-amber-500"
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
                  className="px-5 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs rounded-xl transition-all cursor-pointer shadow-md shadow-amber-500/20 flex items-center gap-1.5"
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
