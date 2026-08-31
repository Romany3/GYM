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

  const isAr = typeof window !== 'undefined' && document.documentElement.lang === 'ar';

  // Food Swap Requests State
  const [requests, setRequests] = useState([
    {
      id: 'fs_1',
      originalFoodEn: 'Grilled Chicken Breast (200g)',
      originalFoodAr: 'صدر دجاج مشوي (200ج)',
      mealCategory: 'Lunch',
      reasonCategoryEn: 'Food Allergy / Intolerance',
      reasonCategoryAr: 'حساسية / عدم تحمل طعام',
      reasonNoteEn: 'Developing digestive discomfort with poultry this week. Need a fish or plant alternative.',
      reasonNoteAr: 'شعور بانزعاج في الهضم مع الدواجن هذا الأسبوع. أحتاج إلى بديل سمك أو نباتي.',
      suggestedAlternativeEn: 'Wild Salmon Filet (180g)',
      suggestedAlternativeAr: 'شريحة سلمون بري (180ج)',
      status: 'PENDING',
      coachResponseNoteEn: null,
      coachResponseNoteAr: null,
      requestedDateEn: 'Today, 10:30 AM',
      requestedDateAr: 'اليوم، 10:30 صباحاً',
    },
    {
      id: 'fs_2',
      originalFoodEn: 'Whole Eggs (3 Large)',
      originalFoodAr: 'بيض كامل (3 قطع كبيرة)',
      mealCategory: 'Breakfast',
      reasonCategoryEn: 'Missing Groceries',
      reasonCategoryAr: 'عدم توفر مكونات',
      reasonNoteEn: 'Local store was completely out of fresh eggs this morning.',
      reasonNoteAr: 'المتجر المحلي كان خالياً تماماً من البيض الطازج هذا الصباح.',
      suggestedAlternativeEn: 'Egg Whites Container (200ml) + 1/4 Avocado',
      suggestedAlternativeAr: 'بياض بيض (200 مل) + 1/4 أفوكادو',
      status: 'PENDING',
      coachResponseNoteEn: null,
      coachResponseNoteAr: null,
      requestedDateEn: 'Yesterday, 07:45 AM',
      requestedDateAr: 'أمس، 07:45 صباحاً',
    },
    {
      id: 'fs_3',
      originalFoodEn: 'Whey Protein Isolate (1 Scoop)',
      originalFoodAr: 'واي بروتين إيزوليت (مكيال واحد)',
      mealCategory: 'Snacks',
      reasonCategoryEn: 'Taste Preference',
      reasonCategoryAr: 'تفضيل شخصي',
      reasonNoteEn: 'Prefer whole food protein source for mid-day snack.',
      reasonNoteAr: 'أفضل مصدر بروتين طبيعي لوجبة منتصف اليوم.',
      suggestedAlternativeEn: 'Greek Yogurt 0% Fat (220g) + Honey',
      suggestedAlternativeAr: 'زبادي يوناني خالي الدسم (220ج) + عسل',
      status: 'APPROVED',
      coachResponseNoteEn: 'Approved. 220g Greek Yogurt matches your 25g protein target perfectly.',
      coachResponseNoteAr: 'تمت الموافقة. 220ج زبادي يوناني تطابق مستهدف 25ج بروتين تماماً.',
      requestedDateEn: 'Aug 05, 2026',
      requestedDateAr: '05 أغسطس 2026',
    },
    {
      id: 'fs_4',
      originalFoodEn: 'White Basmati Rice (200g)',
      originalFoodAr: 'أرز بسمتي أبيض (200ج)',
      mealCategory: 'Dinner',
      reasonCategoryEn: 'Diet Change',
      reasonCategoryAr: 'تغيير النظام',
      reasonNoteEn: 'Would like to swap white rice for sweet potatoes today.',
      reasonNoteAr: 'أود استبدال الأرز الأبيض بالبطاطا الحلوة اليوم.',
      suggestedAlternativeEn: 'Baked Sweet Potato (250g)',
      suggestedAlternativeAr: 'بطاطا حلوة مشوية (250ج)',
      status: 'REJECTED',
      coachResponseNoteEn: 'Keep white rice for immediate post-workout glycogen replenishment today. We will swap on rest days.',
      coachResponseNoteAr: 'حافظ على الأرز الأبيض لتعويض الجليكوجين فوراً بعد التمرين. سنقوم بالتبديل في أيام الراحة.',
      requestedDateEn: 'Aug 01, 2026',
      requestedDateAr: '01 أغسطس 2026',
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
      originalFoodEn: selectedFoodName,
      originalFoodAr: selectedFoodName,
      mealCategory,
      reasonCategoryEn: reasonCategory,
      reasonCategoryAr: reasonCategory,
      reasonNoteEn: reasonNote || 'Requested ingredient substitution to match daily macro goals.',
      reasonNoteAr: reasonNote || 'طلب استبدال مكونات لمطابقة الأهداف الغذائية.',
      suggestedAlternativeEn: suggestedAlternative,
      suggestedAlternativeAr: suggestedAlternative,
      status: 'PENDING',
      coachResponseNoteEn: null,
      coachResponseNoteAr: null,
      requestedDateEn: 'Just now',
      requestedDateAr: 'الآن',
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
    const orig = isAr ? req.originalFoodAr : req.originalFoodEn;
    const alt = isAr ? req.suggestedAlternativeAr : req.suggestedAlternativeEn;
    const note = isAr ? req.reasonNoteAr : req.reasonNoteEn;

    const matchesSearch = 
      orig.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top Banner Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold text-amber-400 bg-amber-950 px-2.5 py-0.5 rounded border border-amber-800/60 uppercase tracking-widest flex items-center gap-1">
              <Apple className="w-3 h-3 text-amber-400" /> {t('clientPortal.foodSwapsBadge')}
            </span>
          </div>
          <h1 className="font-serif-header text-3xl font-bold text-white tracking-tight mt-1">
            {t('clientPortal.foodSwaps')}
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            {t('clientPortal.foodSwapsSubtitle')}
          </p>
        </div>

        <button
          onClick={() => setIsNewRequestOpen(true)}
          className="flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs rounded-xl shadow-lg shadow-amber-500/20 transition-all cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4 text-slate-950" />
          <span>{t('clientPortal.requestFoodSwap')}</span>
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
          <span className="text-[11px] text-amber-400 font-semibold">{t('clientPortal.awaitingCoach')}</span>
        </div>

        <div className="bg-[#121724] border border-slate-800 rounded-2xl p-5 shadow-lg space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400 font-semibold">
            <span className="uppercase tracking-wider">{t('swaps.approvedSwaps')}</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-3xl font-extrabold text-white font-mono">{approvedCount}</div>
          <span className="text-[11px] text-emerald-400 font-semibold">{t('clientPortal.activeMealProtocol')}</span>
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
            placeholder={t('clientPortal.searchFoodSwaps')}
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
          filteredRequests.map((req) => {
            const dateLabel = isAr ? req.requestedDateAr : req.requestedDateEn;
            const origFood = isAr ? req.originalFoodAr : req.originalFoodEn;
            const reasonCat = isAr ? req.reasonCategoryAr : req.reasonCategoryEn;
            const reasonNoteStr = isAr ? req.reasonNoteAr : req.reasonNoteEn;
            const altFood = isAr ? req.suggestedAlternativeAr : req.suggestedAlternativeEn;
            const coachNote = isAr ? req.coachResponseNoteAr : req.coachResponseNoteEn;

            return (
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
                    <span className="text-xs font-bold text-slate-200">
                      {t('clientPortal.requestedOn', { date: dateLabel })}
                    </span>
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
                      {t('clientPortal.originalPrescribedFood')}
                    </span>
                    <div className="flex items-center gap-2">
                      <Utensils className="w-4 h-4 text-amber-400" />
                      <span className="font-bold text-slate-200 text-sm">{origFood}</span>
                      <span className="text-[10px] font-semibold text-blue-400 bg-blue-950 px-2 py-0.5 rounded border border-blue-800/60">
                        {req.mealCategory}
                      </span>
                    </div>
                    <div className="pt-1 text-[11px] text-amber-300 font-semibold flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{t('swaps.reason')} ({reasonCat}): "{reasonNoteStr}"</span>
                    </div>
                  </div>

                  {/* Suggested Alternative Food */}
                  <div className="bg-[#162133] border border-blue-500/30 p-3.5 rounded-xl space-y-1.5">
                    <span className="text-[10px] font-bold text-blue-400 uppercase tracking-wider block">
                      {t('clientPortal.suggestedAlternativeFood')}
                    </span>
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-emerald-400" />
                      <span className="font-bold text-emerald-300 text-sm">{altFood}</span>
                    </div>
                  </div>
                </div>

                {/* Coach Review Note */}
                {coachNote && (
                  <div className="p-3 bg-[#171e2e] border border-slate-800 rounded-xl text-xs text-slate-300">
                    <strong className="text-blue-400 font-bold block mb-0.5">
                      {isAr ? 'ملاحظة قرار المدرب:' : 'Coach Decision Note:'}
                    </strong>
                    "{coachNote}"
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
