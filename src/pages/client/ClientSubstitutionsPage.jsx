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

  const isAr = typeof window !== 'undefined' && document.documentElement.lang === 'ar';

  // Substitution Requests State
  const [requests, setRequests] = useState([
    {
      id: 'sub_1',
      originalExerciseEn: 'Barbell Back Squat',
      originalExerciseAr: 'سكوات بالبار الخلفي',
      targetMuscle: 'Quadriceps',
      reasonCategoryEn: 'Joint Discomfort',
      reasonCategoryAr: 'آلام في المفاصل',
      reasonNoteEn: 'Slight patellar tendon irritation when going below parallel on heavy barbell squats.',
      reasonNoteAr: 'تهيج خفيف في وتر الركبة عند التعمق في السكوات بالبار الثقيل.',
      suggestedAlternativeEn: 'Bulgarian Split Squat (Dumbbell)',
      suggestedAlternativeAr: 'بلغاريان سبليت سكوات (دمبل)',
      status: 'APPROVED',
      coachResponseNoteEn: 'Approved. Shift to Bulgarian Split Squat 3x10-12 to reduce axial loading while keeping quad tension high.',
      coachResponseNoteAr: 'تمت الموافقة. تحول إلى البلغاريان سبليت سكوات 3×10-12 لتخفيف الحمل الفقرى مع الحفاظ على التوتر العالي.',
      requestedDateEn: 'Today, 09:15 AM',
      requestedDateAr: 'اليوم، 09:15 صباحاً',
    },
    {
      id: 'sub_2',
      originalExerciseEn: 'Incline Hammer Strength Press',
      originalExerciseAr: 'ضغط صدر علوي على جهاز الهامر',
      targetMuscle: 'Upper Chest',
      reasonCategoryEn: 'Equipment Missing',
      reasonCategoryAr: 'الجهاز غير متوفر',
      reasonNoteEn: 'Our commercial gym does not have the plate-loaded Hammer Strength incline machine.',
      reasonNoteAr: 'الصالة الرياضية لا تحتوي على جهاز الهامر للضغط العلوي.',
      suggestedAlternativeEn: 'Incline Dumbbell Chest Press',
      suggestedAlternativeAr: 'ضغط صدر علوي بالدمبل',
      status: 'PENDING',
      coachResponseNoteEn: null,
      coachResponseNoteAr: null,
      requestedDateEn: 'Yesterday, 04:30 PM',
      requestedDateAr: 'أمس، 04:30 مساءً',
    },
    {
      id: 'sub_3',
      originalExerciseEn: 'Seated Cable Row (V-Bar)',
      originalExerciseAr: 'سحب ظهر جالس بالكيبل (مسكة V)',
      targetMuscle: 'Lats & Rhomboids',
      reasonCategoryEn: 'Busy Gym Machine',
      reasonCategoryAr: 'الجهاز مشغول',
      reasonNoteEn: 'Cable tower is constantly occupied during 6 PM rush hour.',
      reasonNoteAr: 'جهاز الكيبل مشغول باستمرار خلال ساعات الذروة.',
      suggestedAlternativeEn: 'Single-Arm Dumbbell Row',
      suggestedAlternativeAr: 'سحب ظهر بالدمبل ذراع واحدة',
      status: 'APPROVED',
      coachResponseNoteEn: 'Great substitute! Focus on pulling elbow towards hip crease for maximum lat contraction.',
      coachResponseNoteAr: 'بديل ممتاز! ركز على سحب الكوع نحو الخصر لأقصى انقباض لعضلات الظهر.',
      requestedDateEn: 'Aug 06, 2026',
      requestedDateAr: '06 أغسطس 2026',
    },
    {
      id: 'sub_4',
      originalExerciseEn: 'Standing Overhead Barbell Press',
      originalExerciseAr: 'ضغط أكتاف بالبار واقفاً',
      targetMuscle: 'Shoulders',
      reasonCategoryEn: 'Injury History',
      reasonCategoryAr: 'إصابة سابقة',
      reasonNoteEn: 'Past AC joint impingement on heavy barbell overhead press.',
      reasonNoteAr: 'إصابة سابقة في مفصل الكتف عند رفع البار الثقيل فوق الرأس.',
      suggestedAlternativeEn: 'Seated Dumbbell Shoulder Press (Neutral Grip)',
      suggestedAlternativeAr: 'ضغط أكتاف بالدمبل جالساً (مسكة محايدة)',
      status: 'REJECTED',
      coachResponseNoteEn: 'Rejected overhead press. Let\'s substitute with High Incline DB Flyes to keep shoulder joint safe.',
      coachResponseNoteAr: 'تم رفض التبديل. سنستبدله بتجميع علوي بالدمبل للحفاظ على سلامة الكتف.',
      requestedDateEn: 'Aug 01, 2026',
      requestedDateAr: '01 أغسطس 2026',
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
      originalExerciseEn: selectedExerciseName,
      originalExerciseAr: selectedExerciseName,
      targetMuscle: 'Target Group',
      reasonCategoryEn: reasonCategory,
      reasonCategoryAr: reasonCategory,
      reasonNoteEn: reasonNote || 'Requested substitute exercise for personal routine optimization.',
      reasonNoteAr: reasonNote || 'طلب تمرين بديل لتحسين البرنامج التدريبي.',
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
      showToast(`Submitted exercise change request for ${selectedExerciseName}!`, 'success');
    }
  };

  const filteredRequests = requests.filter((req) => {
    const matchesFilter = activeFilter === 'ALL' || req.status === activeFilter;
    const orig = isAr ? req.originalExerciseAr : req.originalExerciseEn;
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
            <span className="text-[10px] font-bold text-blue-400 bg-blue-950 px-2.5 py-0.5 rounded border border-blue-800/60 uppercase tracking-widest flex items-center gap-1">
              <ArrowLeftRight className="w-3 h-3 text-blue-400" /> {t('clientPortal.exerciseSwapsBadge')}
            </span>
          </div>
          <h1 className="font-serif-header text-3xl font-bold text-white tracking-tight mt-1">
            {t('clientPortal.exerciseSubstitutions')}
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            {t('clientPortal.exerciseSwapsSubtitle')}
          </p>
        </div>

        <button
          onClick={() => setIsNewRequestOpen(true)}
          className="flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-400 hover:to-indigo-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-blue-500/20 transition-all cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>{t('clientPortal.requestExerciseChange')}</span>
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
          <span className="text-[11px] text-emerald-400 font-semibold">{t('clientPortal.activeWorkoutSplit')}</span>
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
            placeholder={t('clientPortal.searchChangeRequests')}
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
          filteredRequests.map((req) => {
            const dateLabel = isAr ? req.requestedDateAr : req.requestedDateEn;
            const origEx = isAr ? req.originalExerciseAr : req.originalExerciseEn;
            const reasonCat = isAr ? req.reasonCategoryAr : req.reasonCategoryEn;
            const reasonNoteStr = isAr ? req.reasonNoteAr : req.reasonNoteEn;
            const altEx = isAr ? req.suggestedAlternativeAr : req.suggestedAlternativeEn;
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

                {/* Movement Comparison Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  {/* Original Exercise */}
                  <div className="bg-[#171e2e] border border-slate-800 p-3.5 rounded-xl space-y-1.5">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      {t('clientPortal.originalPrescribedExercise')}
                    </span>
                    <div className="flex items-center gap-2">
                      <Dumbbell className="w-4 h-4 text-slate-400" />
                      <span className="font-bold text-slate-200 text-sm">{origEx}</span>
                    </div>
                    <div className="pt-1 text-[11px] text-amber-300 font-semibold flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{t('swaps.reason')} ({reasonCat}): "{reasonNoteStr}"</span>
                    </div>
                  </div>

                  {/* Suggested Alternative */}
                  <div className="bg-[#162133] border border-blue-500/30 p-3.5 rounded-xl space-y-1.5">
                    <span className="text-[10px] font-bold text-blue-400 uppercase tracking-wider block">
                      {t('clientPortal.suggestedAlternativeExercise')}
                    </span>
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-emerald-400" />
                      <span className="font-bold text-emerald-300 text-sm">{altEx}</span>
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
