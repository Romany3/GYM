import { useState } from 'react';
import { 
  CreditCard, 
  Check, 
  Clock, 
  ArrowRight, 
  CheckCircle2
} from 'lucide-react';

export default function TrainerSubscriptionPage({ 
  currentSubscription, 
  activeClientCount = 18, 
  onSelectPlan, 
  showToast 
}) {
  const [selectedPlanId, setSelectedPlanId] = useState(currentSubscription?.planId || 'pro_25');

  // Subscription Pricing Tiers (EGP)
  const plans = [
    {
      id: 'trial_1',
      name: 'Free Trial',
      badge: 'NEW TRAINERS',
      maxClients: 1,
      priceEgp: 0,
      period: '7 Days Free',
      description: 'Perfect for newly registered trainers trying out the platform.',
      features: [
        'Train 1 Client for 1 Week (7 Days)',
        'Full Workout & Nutrition Creator',
        'Single-Client Passkey Portal Access',
        'Standard Email Support',
      ],
      isPopular: false,
      accentColor: 'border-slate-800 bg-[#121724]',
    },
    {
      id: 'pro_25',
      name: 'Pro Trainer',
      badge: 'MOST POPULAR',
      maxClients: 25,
      priceEgp: 300,
      period: '/ Month',
      description: 'Ideal for growing personal trainers managing up to 25 athletes.',
      features: [
        'Train up to 25 Active Clients per Month',
        'Full Exercise Change Requests Queue',
        'Master Food & Macro Library (Per 100g)',
        'Progress Photo Side-by-Side Comparator',
        'Direct 1-to-1 Coach Chat & PDF Plan Exports',
      ],
      isPopular: true,
      accentColor: 'border-blue-500/60 bg-gradient-to-b from-blue-950/30 via-[#121724] to-[#121724] shadow-blue-500/10',
    },
    {
      id: 'elite_50',
      name: 'Elite Trainer',
      badge: 'BEST VALUE',
      maxClients: 50,
      priceEgp: 500,
      period: '/ Month',
      description: 'Designed for established coaches with a large client roster.',
      features: [
        'Train up to 50 Active Clients per Month',
        '1-Click Batch Program Assignment',
        'Auto-Balance Macros Generator',
        'Priority Notification Alert Queue',
        'Custom Gym & Brand Name Labeling',
      ],
      isPopular: false,
      accentColor: 'border-emerald-500/40 bg-[#121724]',
    },
    {
      id: 'master_unlimited',
      name: 'Master Enterprise',
      badge: 'UNLIMITED',
      maxClients: 999,
      priceEgp: 990,
      period: '/ Month',
      description: 'Unlimited capacity for gym owners and high-volume performance centers.',
      features: [
        'Unlimited Client Roster (No Limits)',
        'Multi-Coach Account Management',
        'Dedicated 24/7 VIP Account Manager',
        'Custom Domain & Portal Branding',
        'Advanced Revenue Analytics & MRR Tracking',
      ],
      isPopular: false,
      accentColor: 'border-indigo-500/40 bg-[#121724]',
    },
  ];

  const handleChoosePlan = (plan) => {
    setSelectedPlanId(plan.id);
    if (onSelectPlan) {
      onSelectPlan({
        planId: plan.id,
        planName: plan.name,
        maxClients: plan.maxClients,
        priceEgp: plan.priceEgp,
        isTrial: plan.id === 'trial_1',
      });
    } else if (showToast) {
      showToast(`Selected ${plan.name} (${plan.priceEgp} EGP/mo for ${plan.maxClients} clients)!`);
    }
  };

  const currentPlan = plans.find((p) => p.id === (currentSubscription?.planId || 'pro_25')) || plans[1];
  const usagePercentage = Math.min(100, Math.round((activeClientCount / (currentPlan.maxClients || 25)) * 100));

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold text-blue-400 bg-blue-950 px-2.5 py-0.5 rounded border border-blue-800/60 uppercase tracking-widest">
              MEMBERSHIP & CAPACITY MANAGEMENT
            </span>
          </div>
          <h1 className="font-serif-header text-3xl font-bold text-white tracking-tight mt-1">
            Trainer Subscription Plans
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Select a plan based on the number of clients you train each month.
          </p>
        </div>
      </div>

      {/* Current Active Plan Status Banner */}
      <div className="bg-[#121724] border border-blue-500/30 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-sky-400 flex items-center justify-center text-white shadow-lg shadow-blue-500/20 shrink-0">
              <CreditCard className="w-6 h-6" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold text-emerald-400 bg-emerald-950 px-2.5 py-0.5 rounded-md border border-emerald-800/60 uppercase">
                  ACTIVE SUBSCRIPTION
                </span>
                <h3 className="font-serif-header text-lg font-bold text-white">
                  {currentPlan.name} ({currentPlan.priceEgp === 0 ? 'Free Trial' : `${currentPlan.priceEgp} EGP/mo`})
                </h3>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Registered Trainer Roster Capacity: <strong className="text-slate-200">{activeClientCount} / {currentPlan.maxClients === 999 ? 'Unlimited' : currentPlan.maxClients} Clients Used</strong>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs text-slate-300 bg-[#171e2e] px-3 py-1.5 rounded-xl border border-slate-800 shrink-0">
            <Clock className="w-4 h-4 text-blue-400" />
            <span>Renewal: <strong className="text-white">In 21 Days</strong></span>
          </div>
        </div>

        {/* Client Utilization Progress Bar */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs font-semibold text-slate-300">
            <span>Client Roster Capacity Utilization</span>
            <span className="font-mono">{usagePercentage}% ({activeClientCount} / {currentPlan.maxClients === 999 ? '∞' : currentPlan.maxClients} Clients)</span>
          </div>
          <div className="w-full bg-slate-900 rounded-full h-2.5 p-0.5 border border-slate-800 overflow-hidden">
            <div
              style={{ width: `${usagePercentage}%` }}
              className={`h-full rounded-full transition-all duration-500 ${
                usagePercentage >= 90
                  ? 'bg-gradient-to-r from-amber-500 to-red-500'
                  : 'bg-gradient-to-r from-blue-500 to-indigo-500'
              }`}
            />
          </div>
        </div>
      </div>

      {/* Pricing Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 items-stretch">
        {plans.map((plan) => {
          const isSelected = selectedPlanId === plan.id;
          return (
            <div
              key={plan.id}
              className={`border rounded-3xl p-6 shadow-xl flex flex-col justify-between space-y-6 relative transition-all duration-200 ${plan.accentColor} ${
                isSelected ? 'ring-2 ring-blue-400 border-blue-400' : 'hover:border-slate-700'
              }`}
            >
              {plan.isPopular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-[9px] font-extrabold uppercase tracking-widest text-slate-950 bg-gradient-to-r from-blue-300 via-sky-200 to-blue-200 px-3 py-1 rounded-full shadow-md">
                  {plan.badge}
                </span>
              )}

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold tracking-widest uppercase text-slate-400 bg-slate-900 px-2.5 py-1 rounded-md border border-slate-800">
                    {plan.maxClients === 999 ? 'Unlimited' : `${plan.maxClients} Clients`}
                  </span>
                  {isSelected && (
                    <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800/60 flex items-center gap-1">
                      <Check className="w-3 h-3" /> Active
                    </span>
                  )}
                </div>

                <div>
                  <h3 className="font-serif-header text-xl font-bold text-white">
                    {plan.name}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 min-h-[36px]">
                    {plan.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-800/80">
                  <div className="flex items-baseline gap-1">
                    <span className="font-serif-header text-3xl font-extrabold text-white">
                      {plan.priceEgp}
                    </span>
                    <span className="text-xs font-bold text-blue-300">EGP</span>
                    <span className="text-xs text-slate-400 ml-1">{plan.period}</span>
                  </div>
                </div>

                {/* Feature List */}
                <div className="space-y-2.5 text-xs pt-2">
                  {plan.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => handleChoosePlan(plan)}
                className={`w-full py-3 rounded-xl font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer mt-4 ${
                  isSelected
                    ? 'bg-emerald-500 text-slate-950 hover:bg-emerald-400 shadow-emerald-500/20'
                    : plan.isPopular
                    ? 'bg-gradient-to-r from-blue-300 via-sky-200 to-blue-200 hover:from-blue-200 hover:to-sky-100 text-slate-950'
                    : 'bg-[#171e2e] hover:bg-slate-800 text-slate-200 border border-slate-700'
                }`}
              >
                <span>{isSelected ? 'Current Active Plan' : `Select ${plan.name}`}</span>
                {!isSelected && <ArrowRight className="w-4 h-4" />}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
