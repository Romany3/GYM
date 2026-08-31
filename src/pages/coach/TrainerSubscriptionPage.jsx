import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  CreditCard, 
  Check, 
  Clock, 
  ArrowRight, 
  CheckCircle2
} from 'lucide-react';

export default function TrainerSubscriptionPage({ 
  currentSubscription, 
  activeClientCount = 5, 
  onSelectPlan, 
  showToast 
}) {
  const { t } = useTranslation();
  const [selectedPlanId, setSelectedPlanId] = useState(currentSubscription?.planId || 'pro_25');

  const isAr = typeof window !== 'undefined' && document.documentElement.lang === 'ar';

  // Subscription Pricing Tiers (EGP)
  const plans = [
    {
      id: 'trial_1',
      nameEn: 'Free Trial',
      nameAr: 'تجربة مجانية',
      badgeEn: 'NEW TRAINERS',
      badgeAr: 'للمدربين الجدد',
      maxClients: 1,
      priceEgp: 0,
      periodEn: '7 Days Free',
      periodAr: '7 أيام مجاناً',
      descEn: 'Perfect for newly registered trainers trying out the platform.',
      descAr: 'مثالية للمدربين الجدد لتجربة المنصة.',
      featuresEn: [
        'Train 1 Client for 1 Week (7 Days)',
        'Full Workout & Nutrition Creator',
        'Single-Client Passkey Portal Access',
        'Standard Email Support',
      ],
      featuresAr: [
        'تدريب زبون واحد لمدة أسبوع (7 أيام)',
        'محرك كامل لإنشاء التمارين والتغذية',
        'بوابة دخول بررمز خاص لزبون واحد',
        'دعم عبر البريد الإلكتروني',
      ],
      isPopular: false,
      accentColor: 'border-slate-800 bg-[#121724]',
    },
    {
      id: 'pro_25',
      nameEn: 'Pro Trainer',
      nameAr: 'مدرب محترف',
      badgeEn: 'MOST POPULAR',
      badgeAr: 'الأكثر شعبية',
      maxClients: 25,
      priceEgp: 300,
      periodEn: '/ Month',
      periodAr: '/ شهرياً',
      descEn: 'Ideal for growing personal trainers managing up to 25 athletes.',
      descAr: 'مثالية للمدربين في مرحلة النمو لإدارة حتى 25 زبون.',
      featuresEn: [
        'Train up to 25 Active Clients per Month',
        'Full Exercise Change Requests Queue',
        'Master Food & Macro Library (Per 100g)',
        'Progress Photo Side-by-Side Comparator',
        'Direct 1-to-1 Coach Chat & PDF Plan Exports',
      ],
      featuresAr: [
        'تدريب حتى 25 زبون نشط شهرياً',
        'قائمة كاملة لطلبات تبديل التمارين',
        'مكتبة طعام شاملة ومغذيات لكل 100ج',
        'أداة مقارنة صور التقدم جنباً إلى جنب',
        'مراسلة مباشرة وتصدير ملفات PDF',
      ],
      isPopular: true,
      accentColor: 'border-blue-500/60 bg-gradient-to-b from-blue-950/30 via-[#121724] to-[#121724] shadow-blue-500/10',
    },
    {
      id: 'elite_50',
      nameEn: 'Elite Trainer',
      nameAr: 'مدرب نخبة',
      badgeEn: 'BEST VALUE',
      badgeAr: 'أفضل قيمة',
      maxClients: 50,
      priceEgp: 500,
      periodEn: '/ Month',
      periodAr: '/ شهرياً',
      descEn: 'Built for high-volume head coaches and commercial fitness facilities.',
      descAr: 'مصممة لكبار المدربين والمراكز الرياضية الكبيرة.',
      featuresEn: [
        'Train up to 50 Active Clients per Month',
        'AI Automated Meal Protocol Generator',
        'Batch Copy Workouts to Client Rosters',
        'White-Label PDF Exports & Custom Branding',
        '24/7 Priority VIP Coach Support',
      ],
      featuresAr: [
        'تدريب حتى 50 زبون نشط شهرياً',
        'مولد وجبات غذائية تلقائي بالذكاء الاصطناعي',
        'نسخ الجداول التدريبية لمجموعة زبائن',
        'تصدير PDF بشعارك الخاص والماركة',
        'دعم VIP مخصص على مدار 24/7',
      ],
      isPopular: false,
      accentColor: 'border-slate-800 bg-[#121724]',
    },
  ];

  const handleSelectPlan = (plan) => {
    setSelectedPlanId(plan.id);
    const planName = isAr ? plan.nameAr : plan.nameEn;
    if (onSelectPlan) onSelectPlan(plan);
    if (showToast) showToast(`Selected ${planName} Plan! Capacity updated.`);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950 px-2.5 py-0.5 rounded border border-emerald-800/60 uppercase tracking-widest flex items-center gap-1">
              <CreditCard className="w-3 h-3 text-emerald-400" /> {t('subscription.badge')}
            </span>
          </div>
          <h1 className="font-serif-header text-3xl font-bold text-white tracking-tight mt-1">
            {t('subscription.title')}
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            {t('subscription.subtitle')}
          </p>
        </div>
      </div>

      {/* Active Capacity Status Banner */}
      <div className="bg-[#121724] border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800 uppercase">
              {t('subscription.activePlanBanner', { tier: isAr ? 'مدرب محترف' : 'PRO TRAINER', max: 25 })}
            </span>
            <span className="text-xs font-mono text-slate-400">{t('subscription.daysRemaining', { days: 21 })}</span>
          </div>
          <h3 className="text-lg font-bold text-slate-100">
            {t('subscription.capacityUsed', { active: activeClientCount, max: 25 })}
          </h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            {t('subscription.bannerDesc')}
          </p>
        </div>

        {/* Progress Capacity Indicator */}
        <div className="w-full md:w-64 space-y-2 bg-[#171e2e] p-4 rounded-xl border border-slate-800 shrink-0">
          <div className="flex justify-between text-xs font-semibold">
            <span className="text-slate-300">{t('subscription.rosterCapacity')}</span>
            <span className="text-blue-400 font-bold">{Math.round((activeClientCount / 25) * 100)}%</span>
          </div>
          <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden border border-slate-700">
            <div
              style={{ width: `${(activeClientCount / 25) * 100}%` }}
              className="bg-gradient-to-r from-blue-500 to-indigo-500 h-full rounded-full"
            />
          </div>
          <span className="text-[10px] text-slate-400 block text-end">
            {t('subscription.slotsAvailable', { count: 25 - activeClientCount })}
          </span>
        </div>
      </div>

      {/* 3 Pricing Cards Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch pt-2">
        {plans.map((plan) => {
          const isCurrentPlan = selectedPlanId === plan.id;
          const name = isAr ? plan.nameAr : plan.nameEn;
          const badge = isAr ? plan.badgeAr : plan.badgeEn;
          const description = isAr ? plan.descAr : plan.descEn;
          const period = isAr ? plan.periodAr : plan.periodEn;
          const features = isAr ? plan.featuresAr : plan.featuresEn;

          return (
            <div
              key={plan.id}
              className={`rounded-2xl border p-6 flex flex-col justify-between relative transition-all shadow-xl ${plan.accentColor} ${
                isCurrentPlan ? 'ring-2 ring-blue-500' : ''
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[10px] font-extrabold tracking-wider uppercase text-blue-400 bg-blue-950 px-2.5 py-0.5 rounded border border-blue-800/60">
                    {badge}
                  </span>
                  {isCurrentPlan && (
                    <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" /> {t('subscription.currentActiveTier')}
                    </span>
                  )}
                </div>

                <h3 className="font-serif-header text-xl font-bold text-slate-100">{name}</h3>
                <p className="text-xs text-slate-400 mt-1 min-h-[36px]">{description}</p>

                <div className="my-6 border-y border-slate-800/80 py-4 flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold text-white font-mono">
                    {plan.priceEgp === 0 ? t('subscription.free') : `${plan.priceEgp} ${t('subscription.egp')}`}
                  </span>
                  <span className="text-xs text-slate-400 font-semibold">{period}</span>
                </div>

                {/* Feature Bullet Points */}
                <ul className="space-y-3 text-xs text-slate-300">
                  {features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-8">
                <button
                  onClick={() => handleSelectPlan(plan)}
                  className={`w-full py-3 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-md flex items-center justify-center gap-2 ${
                    isCurrentPlan
                      ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-950/50'
                      : 'bg-[#171e2e] hover:bg-slate-800 text-slate-200 border border-slate-700/80'
                  }`}
                >
                  <span>{isCurrentPlan ? t('subscription.currentActiveTier') : t('subscription.upgradeTo', { name })}</span>
                  <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
