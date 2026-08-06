import React from 'react';
import { 
  Dumbbell, 
  LayoutGrid, 
  Users, 
  Utensils, 
  BarChart3, 
  Calendar, 
  Settings, 
  Plus,
  X
} from 'lucide-react';

export default function Sidebar({ 
  activeTab, 
  setActiveTab, 
  onQuickAddClient,
  isMobileOpen,
  onCloseMobile
}) {
  const navItems = [
    { id: 'overview', label: 'Overview', icon: LayoutGrid },
    { id: 'clients', label: 'Clients', icon: Users },
    { id: 'workout-builder', label: 'Workout Builder', icon: Dumbbell },
    { id: 'nutrition-engine', label: 'Nutrition Engine', icon: Utensils },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'schedule', label: 'My Schedule', icon: Calendar },
    { id: 'settings', label: 'Settings', icon: Settings },
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
        className={`bg-[#0a0d16] border-r border-slate-800/80 flex flex-col justify-between select-none shrink-0 z-50 w-72 max-w-[85vw] md:w-64 fixed inset-y-0 left-0 h-full md:sticky md:top-0 md:h-screen transition-transform duration-300 ease-in-out ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        {/* Top Branding Section */}
        <div className="p-6 overflow-y-auto">
          <div className="flex items-center justify-between mb-8">
            <div className="flex flex-col">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-500 to-sky-400 flex items-center justify-center shadow-lg shadow-blue-500/20">
                  <Dumbbell className="w-5 h-5 text-white rotate-45" />
                </div>
                <span className="font-serif-header text-2xl font-bold tracking-tight text-white">
                  Fit<span className="text-blue-300 font-normal">Arch</span>
                </span>
              </div>
              <span className="text-[10px] font-bold tracking-widest text-slate-500 uppercase mt-1 pl-12">
                Elite Performance
              </span>
            </div>

            {/* Mobile Close Button */}
            <button
              onClick={onCloseMobile}
              className="md:hidden p-2 text-slate-400 hover:text-white rounded-xl bg-[#131926] border border-slate-800 transition-colors"
              aria-label="Close sidebar menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Items */}
          <nav className="space-y-1.5">
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
                  className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl text-xs font-semibold transition-all duration-200 relative group cursor-pointer ${
                    isActive
                      ? 'bg-[#141b2c] text-white shadow-inner border border-indigo-500/40'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                  }`}
                >
                  {/* Active left indicator glow bar */}
                  {isActive && (
                    <span className="absolute left-0 top-2 bottom-2 w-1 bg-gradient-to-b from-blue-400 to-indigo-500 rounded-r-full shadow-sm shadow-blue-400/50" />
                  )}
                  <Icon className={`w-4 h-4 transition-transform group-hover:scale-110 ${isActive ? 'text-blue-400' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Section: Quick Add & Trainer Profile */}
        <div className="p-6 space-y-5 border-t border-slate-800/60 bg-[#090b13]">
          {/* Quick Add Client Button */}
          <button
            onClick={() => {
              onQuickAddClient();
              if (onCloseMobile) onCloseMobile();
            }}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-blue-300 via-sky-200 to-blue-200 hover:from-blue-200 hover:to-sky-100 text-slate-950 font-semibold text-xs tracking-wide shadow-md shadow-blue-500/10 active:scale-[0.98] transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Quick Add Client</span>
          </button>

          {/* Profile Card */}
          <div className="flex items-center gap-3 pt-1">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
                alt="Alex Rivera"
                className="w-10 h-10 rounded-full object-cover ring-2 ring-blue-500/40"
              />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-[#090b13] rounded-full" />
            </div>
            <div className="overflow-hidden">
              <h4 className="text-xs font-semibold text-slate-100 truncate">Alex Rivera</h4>
              <p className="text-[11px] text-slate-400 truncate">Elite Performance</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
