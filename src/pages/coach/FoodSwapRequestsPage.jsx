import { useState } from 'react';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();
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
    setCoachNoteInput('Keep current prescribed meal item to stick to allocated daily macro target.');
    setModifiedAlternativeInput(req.suggestedAlternative);
  };

  const handleConfirmResponse = () => {
    if (!selectedRequest) return;

    const newStatus = responseModalType === 'APPROVE' ? 'APPROVED' : 'REJECTED';

    setRequests((prev) =>
      prev.map((r) =>
        r.id === selectedRequest.id
          ? {
              ...r,
              status: newStatus,
              suggestedAlternative: modifiedAlternativeInput || r.suggestedAlternative,
              coachResponseNote: coachNoteInput,
            }
          : r
      )
    );

    if (showToast) {
      showToast(
        newStatus === 'APPROVED'
          ? `Approved food swap for ${selectedRequest.clientName}!`
          : `Rejected food swap request for ${selectedRequest.clientName}`,
        newStatus === 'APPROVED' ? 'success' : 'info'
      );
    }

    // Close Modal
    setSelectedRequest(null);
    setResponseModalType(null);
    setCoachNoteInput('');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold text-amber-400 bg-amber-950 px-2.5 py-0.5 rounded border border-amber-800/60 uppercase tracking-widest flex items-center gap-1">
              <Utensils className="w-3 h-3 text-amber-400" /> {t('swaps.foodQueueBadge')}
            </span>
            {pendingCount > 0 && (
              <span className="text-xs font-bold text-amber-300 bg-amber-950 px-2 py-0.5 rounded-full border border-amber-800/60 animate-pulse">
                {t('swaps.pendingReviewCount', { count: pendingCount })}
              </span>
            )}
          </div>
          <h1 className="font-serif-header text-3xl font-bold text-white tracking-tight mt-1">
            {t('swaps.foodTitle')}
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            {t('swaps.foodSubtitle')}
          </p>
        </div>
      </div>

      {/* 3 KPI Metrics Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-[#121724] border border-amber-500/30 rounded-2xl p-5 shadow-lg space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400 font-semibold">
            <span className="uppercase tracking-wider">{t('swaps.underReview')}</span>
            <Clock className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-3xl font-extrabold text-white font-mono">{pendingCount}</div>
          <span className="text-[11px] text-amber-400 font-semibold">{t('swaps.requiresReview')}</span>
        </div>

        <div className="bg-[#121724] border border-slate-800 rounded-2xl p-5 shadow-lg space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400 font-semibold">
            <span className="uppercase tracking-wider">{t('swaps.approvedSwaps')}</span>
            <Apple className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-3xl font-extrabold text-white font-mono">{approvedCount}</div>
          <span className="text-[11px] text-emerald-400 font-semibold">{t('swaps.plansUpdated')}</span>
        </div>

        <div className="bg-[#121724] border border-slate-800 rounded-2xl p-5 shadow-lg space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400 font-semibold">
            <span className="uppercase tracking-wider">{t('swaps.rejected')}</span>
            <X className="w-4 h-4 text-pink-400" />
          </div>
          <div className="text-3xl font-extrabold text-white font-mono">
            {requests.filter((r) => r.status === 'REJECTED').length}
          </div>
          <span className="text-[11px] text-slate-400 font-semibold">{t('swaps.keptOriginalFood')}</span>
        </div>
      </div>

      {/* Filter Bar & Search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#121724] border border-slate-800 p-4 rounded-2xl shadow-lg">
        <div className="relative flex-1">
          <Search className="absolute start-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t('swaps.searchFoodPlaceholder')}
            className="w-full bg-[#171e2e] text-slate-200 text-xs rounded-xl ps-10 pe-3.5 py-2.5 border border-slate-700/60 focus:outline-none focus:border-amber-500"
          />
        </div>

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
              {tab === 'PENDING'
                ? `${t('swaps.underReview')} (${pendingCount})`
                : tab === 'APPROVED'
                ? t('swaps.approvedSwaps')
                : tab === 'REJECTED'
                ? t('swaps.rejected')
                : t('overview.all')}
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
              Food ingredient substitution requests submitted by clients will be listed here for quick review & approval.
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
                    {req.status === 'PENDING'
                      ? t('swaps.underReview')
                      : req.status === 'APPROVED'
                      ? t('swaps.approvedSwaps')
                      : t('swaps.rejected')}
                  </span>
                </div>
              </div>

              {/* Food Substitution Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                {/* Original Prescribed Food */}
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
                  <p className="text-[11px] text-slate-400 pt-1">
                    Isocaloric macro profile substitution request.
                  </p>
                </div>
              </div>

              {/* Coach Note if Reviewed */}
              {req.coachResponseNote && (
                <div className="p-3 bg-[#171e2e] border border-slate-800 rounded-xl text-xs text-slate-300">
                  <strong className="text-blue-400 font-bold block mb-0.5">Coach Review Note:</strong>
                  "{req.coachResponseNote}"
                </div>
              )}

              {/* Actions for Pending Requests */}
              {req.status === 'PENDING' && (
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-2.5 pt-2 border-t border-slate-800/80">
                  <button
                    onClick={() => handleOpenRejectModal(req)}
                    className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-bold transition-all cursor-pointer border border-slate-700"
                  >
                    <X className="w-4 h-4 text-pink-400" />
                    <span>{t('swaps.rejectRequest')}</span>
                  </button>

                  <button
                    onClick={() => handleOpenApproveModal(req)}
                    className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-5 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-md shadow-emerald-500/20"
                  >
                    <Check className="w-4 h-4" />
                    <span>{t('swaps.approveAndUpdateMeal')}</span>
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Review & Respond Modal */}
      {responseModalType && selectedRequest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#121724] border border-slate-800 rounded-2xl p-6 max-w-lg w-full space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-serif-header text-lg font-bold text-slate-100 flex items-center gap-2">
                {responseModalType === 'APPROVE' ? (
                  <>
                    <Check className="w-5 h-5 text-emerald-400" />
                    <span>Approve Food Substitution</span>
                  </>
                ) : (
                  <>
                    <X className="w-5 h-5 text-rose-400" />
                    <span>Reject Food Substitution</span>
                  </>
                )}
              </h3>
              <button
                onClick={() => setResponseModalType(null)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="text-[11px] font-bold text-slate-400 block mb-1">
                  Client & Prescribed Food Item
                </label>
                <div className="p-3 bg-[#171e2e] rounded-xl border border-slate-800 text-slate-200">
                  <strong>{selectedRequest.clientName}</strong> • {selectedRequest.originalFood}
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-400 block mb-1">
                  Approved Substitute Item
                </label>
                <input
                  type="text"
                  value={modifiedAlternativeInput}
                  onChange={(e) => setModifiedAlternativeInput(e.target.value)}
                  className="w-full bg-[#171e2e] text-slate-200 text-xs rounded-xl p-2.5 border border-slate-700 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-400 block mb-1">
                  Coach Guidance Note (Sent to Athlete)
                </label>
                <textarea
                  rows="3"
                  value={coachNoteInput}
                  onChange={(e) => setCoachNoteInput(e.target.value)}
                  className="w-full bg-[#171e2e] text-slate-200 text-xs rounded-xl p-2.5 border border-slate-700 focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-800">
              <button
                onClick={() => setResponseModalType(null)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs rounded-xl transition-all cursor-pointer"
              >
                {t('common.cancel')}
              </button>
              <button
                onClick={handleConfirmResponse}
                className={`px-5 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer shadow-md ${
                  responseModalType === 'APPROVE'
                    ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-emerald-950/40'
                    : 'bg-rose-600 hover:bg-rose-500 text-white shadow-rose-950/40'
                }`}
              >
                {responseModalType === 'APPROVE' ? t('common.approve') : t('common.reject')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
