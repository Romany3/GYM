import { Bell, Mail, Menu } from 'lucide-react';

export default function Header({ 
  activeTab, 
  onOpenMobileSidebar,
  onNavigate
}) {
  const getHeaderTitle = () => {
    switch (activeTab) {
      case 'overview':
        return 'Performance Overview';
      case 'clients':
        return 'Client Directory';
      case 'coach-chat':
        return 'Athlete Direct Messaging';
      case 'workout-builder':
        return 'Workout Builder Engine';
      case 'exercise-swaps':
        return 'Exercise Change Requests Queue';
      case 'food-swaps':
        return 'Client Food Swap Requests Queue';
      case 'subscription-plans':
        return 'Subscription & Capacity Management';
      case 'nutrition-engine':
        return 'Nutrition Dashboard';
      case 'food-library':
        return 'Master Food Library';
      case 'ai-meal-generator':
        return 'AI Automated Meal Generator';
      case 'analytics':
        return 'Performance Analytics';
      case 'notifications':
        return 'Notification Center';
      case 'settings':
        return 'System Settings';
      default:
        return 'Dashboard';
    }
  };

  return (
    <header className="h-20 px-4 md:px-8 border-b border-slate-800/80 bg-[#0b0e17]/90 backdrop-blur-md flex items-center justify-between sticky top-0 z-30">
      {/* Title & Mobile Hamburger Button */}
      <div className="flex items-center gap-2 sm:gap-3 min-w-0">
        <button
          onClick={onOpenMobileSidebar}
          className="md:hidden p-2 text-slate-400 hover:text-white bg-[#131926] hover:bg-slate-800/60 rounded-xl border border-slate-800 transition-all cursor-pointer shrink-0"
          aria-label="Open menu"
        >
          <Menu className="w-5 h-5 text-blue-400" />
        </button>

        <h1 className="font-serif-header text-lg sm:text-xl md:text-2xl font-semibold tracking-wide text-slate-100 truncate">
          {getHeaderTitle()}
        </h1>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-2 sm:gap-4 md:gap-6 shrink-0">

        {/* Coach Subscription & Capacity Badge */}
        <button
          onClick={() => onNavigate && onNavigate('subscription-plans')}
          className="hidden xl:flex items-center gap-3 px-3 py-1.5 rounded-xl bg-[#131926] hover:bg-slate-800/80 border border-blue-500/20 shadow-sm cursor-pointer transition-all text-left"
          title="Manage Subscription & Client Capacity"
        >
          <div className="flex flex-col text-right">
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/80 px-1.5 py-0.2 rounded border border-emerald-800/60 uppercase">
                PRO COACH
              </span>
              <span className="text-xs font-semibold text-slate-200">18 / 25 Clients</span>
            </div>
            <span className="text-[10px] text-slate-400">21 Days Left • Upgrade</span>
          </div>
          <div className="w-12 bg-slate-800 h-1.5 rounded-full overflow-hidden border border-slate-700">
            <div className="bg-gradient-to-r from-blue-500 to-indigo-500 h-full w-[72%]" />
          </div>
        </button>

        {/* Icons */}
        <div className="flex items-center gap-1.5 sm:gap-3">
          <button 
            onClick={() => onNavigate && onNavigate('notifications')}
            className="relative p-2 sm:p-2.5 text-slate-400 hover:text-slate-200 bg-[#131926] hover:bg-slate-800/60 rounded-xl border border-slate-800 transition-all cursor-pointer"
            title="Notifications & Change Requests"
          >
            <Bell className="w-4 h-4 text-amber-400" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-amber-400 rounded-full ring-2 ring-[#0b0e17] animate-pulse" />
          </button>

          <button 
            onClick={() => onNavigate && onNavigate('coach-chat')}
            className="p-2 sm:p-2.5 text-slate-400 hover:text-slate-200 bg-[#131926] hover:bg-slate-800/60 rounded-xl border border-slate-800 transition-all cursor-pointer"
            title="Athlete Messages"
          >
            <Mail className="w-4 h-4 text-blue-400" />
          </button>
        </div>
      </div>
    </header>
  );
}
