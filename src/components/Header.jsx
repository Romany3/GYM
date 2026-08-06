import React from 'react';
import { Search, Bell, Mail, User } from 'lucide-react';

export default function Header({ 
  activeTab, 
  searchQuery, 
  setSearchQuery, 
  selectedClient 
}) {
  const getHeaderTitle = () => {
    switch (activeTab) {
      case 'overview':
        return 'Performance Overview';
      case 'clients':
        return 'Client Directory';
      case 'workout-builder':
        return 'Workout Builder Engine';
      case 'nutrition-engine':
        return 'Nutrition Dashboard';
      case 'analytics':
        return 'Performance Analytics';
      case 'schedule':
        return 'Schedule Manager';
      case 'settings':
        return 'System Settings';
      default:
        return 'Dashboard';
    }
  };

  const getSearchPlaceholder = () => {
    switch (activeTab) {
      case 'schedule':
        return 'Search sessions...';
      case 'clients':
        return 'Search clients by name, goal...';
      case 'workout-builder':
        return 'Search exercises, routines...';
      default:
        return 'Search clients, foods...';
    }
  };

  const isScheduleView = activeTab === 'schedule';

  return (
    <header className="h-20 px-8 border-b border-slate-800/80 bg-[#0b0e17]/90 backdrop-blur-md flex items-center justify-between sticky top-0 z-10">
      {/* Title (Center/Left) */}
      <h1 className="font-serif-header text-xl md:text-2xl font-semibold tracking-wide text-slate-100">
        {getHeaderTitle()}
      </h1>

      {/* Right Controls */}
      <div className="flex items-center gap-6">
        {/* Search Bar */}
        <div className="relative w-56 md:w-72">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={getSearchPlaceholder()}
            className="w-full bg-[#131926] text-slate-200 text-xs placeholder:text-slate-500 rounded-xl pl-10 pr-4 py-2 border border-slate-700/50 focus:outline-none focus:border-blue-500/60 transition-all"
          />
        </div>

        {/* Icons */}
        <div className="flex items-center gap-3">
          <button 
            className="relative p-2.5 text-slate-400 hover:text-slate-200 bg-[#131926] hover:bg-slate-800/60 rounded-xl border border-slate-800 transition-all cursor-pointer"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-pink-500 rounded-full ring-2 ring-[#0b0e17]" />
          </button>

          <button 
            className="p-2.5 text-slate-400 hover:text-slate-200 bg-[#131926] hover:bg-slate-800/60 rounded-xl border border-slate-800 transition-all cursor-pointer"
            title="Messages"
          >
            <Mail className="w-4 h-4" />
          </button>
        </div>

        {/* Divider */}
        <div className="h-6 w-px bg-slate-800" />

        {/* User Context Badge */}
        {isScheduleView ? (
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <h4 className="text-xs font-semibold text-slate-100">Alex Thorne</h4>
              <span className="text-[10px] tracking-wider text-blue-400 font-bold uppercase">
                HEAD COACH
              </span>
            </div>
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
              alt="Alex Thorne"
              className="w-9 h-9 rounded-full object-cover ring-2 ring-blue-500/40"
            />
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <h4 className="text-xs font-semibold text-slate-200">{selectedClient.name}</h4>
              <span className="text-[10px] tracking-wider text-blue-400 font-medium uppercase">
                {selectedClient.tier || 'PRO CLIENT'}
              </span>
            </div>
            <div className="w-9 h-9 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 shadow-inner">
              <User className="w-5 h-5" />
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
