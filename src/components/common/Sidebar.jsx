import { 
  Dumbbell, 
  LayoutGrid, 
  Users, 
  Utensils, 
  Apple,
  Sparkles,
  RefreshCw,
  BarChart3, 
  CreditCard,
  Bell,
  MessageSquare,
  Settings, 
  Plus,
  X
} from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function Sidebar({ 
  activeTab, 
  setActiveTab, 
  onQuickAddClient,
  isMobileOpen,
  onCloseMobile
}) {
  const { t } = useTranslation();

  const navItems = [
    { id: 'overview', label: t('nav.overview'), icon: LayoutGrid },
    { id: 'clients', label: t('nav.clients'), icon: Users },
    { id: 'coach-chat', label: t('nav.coachChat'), icon: MessageSquare },
    { id: 'workout-builder', label: t('nav.workoutBuilder'), icon: Dumbbell },
    { id: 'exercise-swaps', label: t('nav.exerciseSwaps'), icon: RefreshCw },
    { id: 'food-swaps', label: t('nav.foodSwaps'), icon: Utensils },
    { id: 'nutrition-engine', label: t('nav.nutritionEngine'), icon: Utensils },
    { id: 'food-library', label: t('nav.foodLibrary'), icon: Apple },
    { id: 'ai-meal-generator', label: t('nav.aiMealGenerator'), icon: Sparkles },
    { id: 'analytics', label: t('nav.analytics'), icon: BarChart3 },
    { id: 'notifications', label: t('nav.notifications'), icon: Bell },
    { id: 'subscription-plans', label: t('nav.subscriptionPlans'), icon: CreditCard },
    { id: 'settings', label: t('nav.settings'), icon: Settings },
  ];

  return (
    <>
      {/* Mobile Dark Backdrop Overlay */}
      <div 
        className={`fixed inset-0 bg-black/75 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300 ${
          isMobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onCloseMobile}
      />

      {/* Main Sidebar (Desktop Sticky Sidebar + Mobile Drawer) */}
      <aside 
        className={`bg-[#0a0d16] border-r border-slate-800/80 rtl:border-r-0 rtl:border-l flex flex-col justify-between select-none shrink-0 z-50 w-72 max-w-[85vw] md:w-72 fixed inset-y-0 start-0 h-full md:sticky md:top-0 md:h-screen transition-transform duration-300 ease-in-out ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full rtl:translate-x-full md:translate-x-0 rtl:md:translate-x-0'
        }`}
      >
        {/* Top Branding Section */}
        <div className="p-6 overflow-y-auto">
          <div className="flex items-center justify-between mb-8">
            <div className="flex flex-col">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-500 to-sky-400 flex items-center justify-center shadow-lg shadow-blue-500/20 shrink-0">
                  <Dumbbell className="w-5 h-5 text-white rotate-45" />
                </div>
                <span className="font-serif-header text-2xl font-bold tracking-tight text-white">
                  Fit<span className="text-blue-300 font-normal">Arch</span>
                </span>
              </div>
              <span className="text-[10px] font-bold tracking-widest text-blue-400 uppercase mt-1 ps-12">
                ELITE PERFORMANCE
              </span>
            </div>

            {/* Mobile Sidebar Close Button */}
            <button
              onClick={onCloseMobile}
              className="md:hidden p-1.5 text-slate-400 hover:text-slate-200 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Main Navigation Link Stack */}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    if (onCloseMobile) onCloseMobile();
                  }}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium text-xs transition-all duration-200 cursor-pointer ${
                    isActive 
                      ? 'bg-blue-600/15 text-blue-300 border border-blue-500/30 shadow-md font-semibold' 
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 border border-transparent'
                  }`}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-blue-400' : 'text-slate-400'}`} />
                  <span className="truncate">{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Client Quick Action Card */}
        <div className="p-4 m-4 bg-[#121724] border border-slate-800/90 rounded-2xl shadow-inner">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-200">{t('clients.newAthlete')}</span>
            <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/80 px-1.5 py-0.5 rounded border border-emerald-800/60 uppercase">
              {t('clients.fastOnboarding')}
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mb-3 leading-relaxed">
            {t('clients.onboardingDesc')}
          </p>
          <button
            onClick={() => {
              if (onQuickAddClient) onQuickAddClient();
              if (onCloseMobile) onCloseMobile();
            }}
            className="w-full py-2 px-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-blue-950/50 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>{t('clients.addClient')}</span>
          </button>
        </div>
      </aside>
    </>
  );
}
