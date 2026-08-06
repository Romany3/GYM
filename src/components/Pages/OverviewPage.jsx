import React, { useState } from 'react';
import { 
  Users, 
  Calendar, 
  Banknote, 
  TrendingUp, 
  Megaphone, 
  AlertCircle, 
  CreditCard, 
  Clock, 
  Dumbbell, 
  Utensils, 
  MessageSquare, 
  ChevronRight, 
  MapPin, 
  Video, 
  UserCheck
} from 'lucide-react';

export default function OverviewPage({ 
  onNavigate, 
  onOpenAnnouncement, 
  showToast 
}) {
  const [activityFilter, setActivityFilter] = useState('All');

  const activities = [
    {
      id: 'a1',
      type: 'Workouts',
      user: 'Elena Rodriguez',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80',
      action: 'completed Advanced Hypertrophy W3-D4',
      time: '14m ago',
      details: [
        { label: '54m', icon: Clock },
        { label: '410 kcal', icon: 'flame' },
        { label: '★ PR: Deadlift', badge: true },
      ],
    },
    {
      id: 'a2',
      type: 'Nutrition',
      user: 'David Chen',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
      action: 'logged a nutrition entry: "High protein breakfast"',
      time: '2h ago',
      progress: {
        text: 'Proteins: 45g / 55g target',
        pct: 82,
      },
    },
    {
      id: 'a3',
      type: 'Check-ins',
      user: 'Mike Harrison',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
      action: 'sent a check-in photo',
      time: '5h ago',
      photo: '/mike_checkin.png',
    },
  ];

  const filteredActivities = activities.filter((act) =>
    activityFilter === 'All' ? true : act.type === activityFilter
  );

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif-header text-3xl font-bold text-white tracking-tight">
            Dashboard Overview
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Real-time client telemetry, critical alerts, and facility bookings.
          </p>
        </div>

        <button
          onClick={onOpenAnnouncement}
          className="flex items-center justify-center gap-2 py-2.5 px-4 bg-gradient-to-r from-blue-300 via-sky-200 to-blue-200 hover:from-blue-200 hover:to-sky-100 text-slate-950 font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer"
        >
          <Megaphone className="w-4 h-4 text-slate-950" />
          <span>Send Announcement to All Clients</span>
        </button>
      </div>

      {/* 4 KPI Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Active Clients */}
        <div className="bg-[#121724] border border-slate-800 rounded-2xl p-5 shadow-lg space-y-3">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-400">
            <span className="tracking-wider uppercase">ACTIVE CLIENTS</span>
            <div className="w-8 h-8 rounded-lg bg-blue-950/60 border border-blue-800/50 flex items-center justify-center text-blue-400">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-3xl font-extrabold text-white">128</span>
            <span className="text-[10px] font-bold text-slate-300 bg-slate-800 px-2 py-0.5 rounded-full border border-slate-700">
              +12% vs LY
            </span>
          </div>
        </div>

        {/* Card 2: Sessions (This Week) */}
        <div className="bg-[#121724] border border-slate-800 rounded-2xl p-5 shadow-lg space-y-3">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-400">
            <span className="tracking-wider uppercase">SESSIONS (THIS WEEK)</span>
            <div className="w-8 h-8 rounded-lg bg-blue-950/60 border border-blue-800/50 flex items-center justify-center text-blue-400">
              <Calendar className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-3xl font-extrabold text-white">342</span>
            <span className="text-[10px] font-bold text-slate-400 bg-slate-800 px-2 py-0.5 rounded-full border border-slate-700">
              Target: 400
            </span>
          </div>
        </div>

        {/* Card 3: Monthly Revenue */}
        <div className="bg-[#121724] border border-slate-800 rounded-2xl p-5 shadow-lg space-y-3">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-400">
            <span className="tracking-wider uppercase">MONTHLY REVENUE</span>
            <div className="w-8 h-8 rounded-lg bg-blue-950/60 border border-blue-800/50 flex items-center justify-center text-blue-400">
              <Banknote className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-3xl font-extrabold text-white">$12.4k</span>
            <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/70 px-2 py-0.5 rounded-full border border-emerald-800/60">
              Record High
            </span>
          </div>
        </div>

        {/* Card 4: Adherence Rate */}
        <div className="bg-[#121724] border border-slate-800 rounded-2xl p-5 shadow-lg space-y-3">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-400">
            <span className="tracking-wider uppercase">ADHERENCE RATE</span>
            <div className="w-8 h-8 rounded-lg bg-blue-950/60 border border-blue-800/50 flex items-center justify-center text-blue-400">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-3xl font-extrabold text-white">94.2%</span>
            <span className="text-[10px] font-bold text-amber-400 bg-amber-950/70 px-2 py-0.5 rounded-full border border-amber-800/60">
              -2.1%
            </span>
          </div>
        </div>
      </div>

      {/* Main 2-Column Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column (Col 8): Action Required Alerts & Recent Activity */}
        <div className="lg:col-span-8 space-y-6">
          {/* Action Required Alerts Panel */}
          <div className="bg-[#121724] border border-slate-800/90 rounded-2xl p-5 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800/80">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-pink-400" />
                <h2 className="font-serif-header text-lg font-semibold text-slate-100">
                  Action Required Alerts
                </h2>
              </div>
              <span className="bg-pink-950/80 text-pink-300 border border-pink-800/60 font-bold text-[10px] tracking-wider px-2.5 py-0.5 rounded-full uppercase">
                2 Critical Alerts
              </span>
            </div>

            {/* Alert Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Alert Card 1: Jason Stark */}
              <div className="bg-[#171e2e] border border-red-900/60 rounded-xl p-4 space-y-3 relative overflow-hidden">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80"
                      alt="Jason Stark"
                      className="w-10 h-10 rounded-xl object-cover border border-slate-700"
                    />
                    <div>
                      <h4 className="text-xs font-bold text-slate-100">Jason Stark</h4>
                      <span className="text-[9px] font-bold text-red-400 uppercase tracking-widest">
                        AT RISK
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-slate-400">
                  No activity logs for <strong className="text-slate-200">4 days</strong>. Last check-in: Monday.
                </p>

                <div className="grid grid-cols-2 gap-2 pt-1">
                  <button
                    onClick={() => showToast && showToast('Nudge notification sent to Jason Stark')}
                    className="py-1.5 bg-[#1f293d] hover:bg-[#28354f] border border-blue-500/40 text-blue-300 font-bold text-[11px] rounded-lg transition-all cursor-pointer"
                  >
                    NUDGE CLIENT
                  </button>
                  <button
                    onClick={() => onNavigate && onNavigate('clients')}
                    className="py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-[11px] rounded-lg transition-all cursor-pointer"
                  >
                    VIEW LOGS
                  </button>
                </div>
              </div>

              {/* Alert Card 2: Renewal Due */}
              <div className="bg-[#171e2e] border border-slate-700/60 rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-blue-400">
                      <CreditCard className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-100">Renewal Due</h4>
                      <span className="text-[9px] font-bold text-slate-400 tracking-wider">
                        3 DAYS LEFT
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-slate-400">
                  Sarah Jenkins subscription expires on Friday. Automatic renewal pending.
                </p>

                <div className="pt-1">
                  <button
                    onClick={() => showToast && showToast('Invoice preview opened for Sarah Jenkins', 'info')}
                    className="w-full py-1.5 bg-[#1b2539] hover:bg-[#23304a] border border-slate-700 text-slate-200 font-bold text-[11px] rounded-lg transition-all cursor-pointer"
                  >
                    VIEW INVOICE
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity Panel */}
          <div className="bg-[#121724] border border-slate-800/90 rounded-2xl p-5 shadow-xl space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800/80">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-400" />
                <h2 className="font-serif-header text-lg font-semibold text-slate-100">
                  Recent Activity
                </h2>
              </div>

              {/* Filter Pills */}
              <div className="flex items-center gap-2 text-xs">
                <div className="flex items-center bg-[#131926] p-1 rounded-xl border border-slate-800 font-semibold">
                  {['All', 'Workouts', 'Nutrition', 'Check-ins'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActivityFilter(tab)}
                      className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                        activityFilter === tab
                          ? 'bg-blue-600/40 text-blue-200 border border-blue-500/40'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => showToast && showToast('Viewing all client logs', 'info')}
                  className="text-[11px] text-slate-400 hover:text-blue-300 font-semibold flex items-center gap-1 ml-2 transition-colors cursor-pointer"
                >
                  <span>View All</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Activity Items List */}
            <div className="space-y-4">
              {filteredActivities.map((act) => (
                <div
                  key={act.id}
                  className="bg-[#161c2a] border border-slate-700/50 rounded-xl p-4 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img
                        src={act.avatar}
                        alt={act.user}
                        className="w-9 h-9 rounded-full object-cover border border-slate-700"
                      />
                      <div>
                        <h4 className="text-xs font-bold text-slate-200">
                          {act.user} <span className="font-normal text-slate-400">{act.action}</span>
                        </h4>
                      </div>
                    </div>
                    <span className="text-[10px] text-slate-500 font-mono">{act.time}</span>
                  </div>

                  {/* Workout Details */}
                  {act.details && (
                    <div className="flex items-center gap-3 text-[11px] pl-12">
                      <span className="bg-[#1c2538] text-slate-300 px-2.5 py-0.5 rounded-md border border-slate-700">
                        ⏱ 54m
                      </span>
                      <span className="bg-[#1c2538] text-slate-300 px-2.5 py-0.5 rounded-md border border-slate-700">
                        🔥 410 kcal
                      </span>
                      <span className="bg-blue-950 text-blue-300 font-bold px-2.5 py-0.5 rounded-md border border-blue-800">
                        ★ PR: Deadlift
                      </span>
                    </div>
                  )}

                  {/* Nutrition Progress */}
                  {act.progress && (
                    <div className="space-y-1.5 pl-12">
                      <div className="flex justify-between text-[11px] text-slate-400 font-medium">
                        <span>{act.progress.text}</span>
                      </div>
                      <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                        <div
                          style={{ width: `${act.progress.pct}%` }}
                          className="h-full bg-blue-400 rounded-full"
                        />
                      </div>
                    </div>
                  )}

                  {/* Photo Check-in */}
                  {act.photo && (
                    <div className="pl-12 pt-1">
                      <div className="w-24 h-24 rounded-xl overflow-hidden border border-slate-700/60">
                        <img
                          src={act.photo}
                          alt="Check-in"
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side Column (Col 4): Weekly Adherence & Upcoming Sessions */}
        <div className="lg:col-span-4 space-y-6">
          {/* Weekly Adherence Card */}
          <div className="bg-[#121724] border border-slate-800/90 rounded-2xl p-5 shadow-xl space-y-4">
            <h3 className="font-serif-header text-lg font-semibold text-slate-100">
              Weekly Adherence
            </h3>

            {/* Days Bar Chart */}
            <div className="h-28 flex items-end justify-between px-2 pt-4 border-b border-slate-800 pb-3">
              {[
                { day: 'MON', val: 70 },
                { day: 'TUE', val: 85 },
                { day: 'WED', val: 95, active: true },
                { day: 'THU', val: 80 },
                { day: 'FRI', val: 90 },
                { day: 'SAT', val: 75 },
                { day: 'SUN', val: 88 },
              ].map((item) => (
                <div key={item.day} className="flex flex-col items-center gap-1.5">
                  <div
                    style={{ height: `${item.val * 0.7}px` }}
                    className={`w-3.5 rounded-t-md transition-all ${
                      item.active
                        ? 'bg-blue-400 shadow-md shadow-blue-500/40'
                        : 'bg-slate-800 hover:bg-slate-700'
                    }`}
                  />
                  <span className="text-[9px] font-mono text-slate-500">{item.day}</span>
                </div>
              ))}
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              Overall adherence is <strong className="text-slate-100">8% higher</strong> than last week. Wednesday dip correlated with system maintenance.
            </p>
          </div>

          {/* Upcoming Sessions Card */}
          <div className="bg-[#121724] border border-slate-800/90 rounded-2xl p-5 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800/80">
              <h3 className="font-serif-header text-lg font-semibold text-slate-100">
                Upcoming Sessions
              </h3>
              <span className="bg-slate-800 text-slate-300 font-bold text-[10px] tracking-wider px-2 py-0.5 rounded-full border border-slate-700 uppercase">
                TODAY
              </span>
            </div>

            {/* Sessions Feed */}
            <div className="space-y-4">
              {/* Session 1 */}
              <div className="space-y-1.5">
                <span className="text-xs font-mono font-bold text-slate-300">14:00</span>
                <div className="bg-[#161c2a] border border-slate-700/60 rounded-xl p-3 space-y-1">
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                    1:1 PERSONAL TRAINING
                  </span>
                  <h4 className="text-xs font-bold text-slate-100">
                    Marcus Vane x Jason Stark
                  </h4>
                  <div className="flex items-center gap-1 text-[11px] text-slate-400 pt-0.5">
                    <MapPin className="w-3 h-3 text-blue-400" />
                    <span>Central Park Gym</span>
                  </div>
                </div>
              </div>

              {/* Session 2 */}
              <div className="space-y-1.5">
                <span className="text-xs font-mono font-bold text-slate-300">15:30</span>
                <div className="bg-[#161c2a] border border-slate-700/60 rounded-xl p-3 space-y-1">
                  <span className="text-[9px] font-bold text-blue-300 uppercase tracking-widest">
                    VIDEO CHECK-IN
                  </span>
                  <h4 className="text-xs font-bold text-slate-100">
                    Remote Session: Sarah J.
                  </h4>
                  <div className="flex items-center gap-1 text-[11px] text-slate-400 pt-0.5">
                    <Video className="w-3 h-3 text-blue-400" />
                    <span>Zoom: fit-meet-293</span>
                  </div>
                </div>
              </div>

              {/* Session 3 */}
              <div className="space-y-1.5">
                <span className="text-xs font-mono font-bold text-slate-300">17:00</span>
                <div className="bg-[#161c2a] border border-slate-700/60 rounded-xl p-3 space-y-1">
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                    SMALL GROUP
                  </span>
                  <h4 className="text-xs font-bold text-slate-100">
                    Late Afternoon Strength
                  </h4>
                  <div className="flex items-center gap-1 text-[11px] text-slate-400 pt-0.5">
                    <UserCheck className="w-3 h-3 text-blue-400" />
                    <span>4/6 Clients Confirmed</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
