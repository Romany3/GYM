import { useState } from 'react';
import { 
  Users, 
  Calendar, 
  Banknote, 
  TrendingUp, 
  Megaphone, 
  AlertCircle, 
  CreditCard, 
  Clock, 
  ChevronRight, 
  MapPin, 
  Video, 
  UserCheck,
  ArrowUpRight,
  ArrowDownRight,
  FileText
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
          className="w-full sm:w-auto flex items-center justify-center gap-2 py-2.5 px-4 bg-gradient-to-r from-blue-300 via-sky-200 to-blue-200 hover:from-blue-200 hover:to-sky-100 text-slate-950 font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer"
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

      {/* Business & Revenue Analytics Section */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div>
            <h2 className="font-serif-header text-2xl font-bold tracking-tight text-white">
              Business <span className="italic font-normal text-blue-300">&</span> Progress Analytics
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Strategic overview of revenue metrics and client transformation data.
            </p>
          </div>

          <button
            onClick={() => showToast && showToast('Exporting Business & Progress PDF Report...')}
            className="flex items-center justify-center gap-2 py-2 px-3.5 bg-[#121826] hover:bg-[#182033] text-slate-200 border border-slate-700/80 rounded-xl text-xs font-semibold shadow-md transition-all cursor-pointer shrink-0"
          >
            <FileText className="w-4 h-4 text-blue-400" />
            <span>Export PDF Report</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Main MRR Revenue Card (Col 8) */}
          <div className="lg:col-span-8 bg-[#121724] border border-slate-800/90 rounded-2xl p-6 shadow-xl space-y-6">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">
                  MONTHLY RECURRING REVENUE (MRR)
                </span>
                <div className="font-serif-header text-4xl font-extrabold text-white mt-1">
                  $42,850.00
                </div>
              </div>

              <div className="flex items-center gap-1 text-xs font-bold text-blue-300 bg-blue-950/80 px-3 py-1 rounded-full border border-blue-800/60">
                <ArrowUpRight className="w-3.5 h-3.5" />
                <span>+12.4%</span>
              </div>
            </div>

            {/* Interactive SVG Area Chart for MRR Growth */}
            <div className="pt-2 space-y-2">
              <div className="h-56 w-full relative">
                <svg className="w-full h-full overflow-visible" viewBox="0 0 420 200" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="overviewMrrGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.35" />
                      <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>

                  {/* Grid Lines */}
                  <line x1="0" y1="35" x2="100%" y2="35" stroke="#1f293d" strokeDasharray="3 3" />
                  <line x1="0" y1="85" x2="100%" y2="85" stroke="#1f293d" strokeDasharray="3 3" />
                  <line x1="0" y1="135" x2="100%" y2="135" stroke="#1f293d" strokeDasharray="3 3" />
                  <line x1="0" y1="185" x2="100%" y2="185" stroke="#1f293d" strokeDasharray="3 3" />

                  {/* Area Fill */}
                  <polygon
                    fill="url(#overviewMrrGradient)"
                    points="0,170 70,150 140,125 210,100 280,75 350,50 420,25 420,200 0,200"
                  />

                  {/* Trend Line */}
                  <polyline
                    fill="none"
                    stroke="#60a5fa"
                    strokeWidth="3"
                    points="0,170 70,150 140,125 210,100 280,75 350,50 420,25"
                  />

                  {/* Data Points */}
                  <circle cx="0" cy="170" r="4" fill="#93c5fd" />
                  <circle cx="70" cy="150" r="4" fill="#93c5fd" />
                  <circle cx="140" cy="125" r="4" fill="#93c5fd" />
                  <circle cx="210" cy="100" r="4" fill="#93c5fd" />
                  <circle cx="280" cy="75" r="4" fill="#93c5fd" />
                  <circle cx="350" cy="50" r="4" fill="#93c5fd" />
                  <circle cx="420" cy="25" r="5" fill="#3b82f6" stroke="#ffffff" strokeWidth="2" />
                </svg>
              </div>

              {/* Month X-Axis Labels */}
              <div className="flex justify-between text-xs text-slate-500 font-mono pt-1">
                <span>Jan</span>
                <span>Feb</span>
                <span>Mar</span>
                <span>Apr</span>
                <span>May</span>
                <span>Jun</span>
                <span>Jul</span>
              </div>
            </div>
          </div>

          {/* Right Cards Column (Col 4): Churn & ARPU */}
          <div className="lg:col-span-4 space-y-6">
            {/* Card 1: Churn Rate */}
            <div className="bg-[#121724] border border-slate-800/90 rounded-2xl p-6 shadow-xl space-y-4">
              <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">
                CHURN RATE
              </span>
              <div className="text-3xl font-extrabold text-white">
                2.4%
              </div>

              <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                <div className="w-[18%] bg-blue-400 h-full rounded-full" />
              </div>

              <p className="text-xs text-emerald-400 font-semibold flex items-center gap-1 pt-1">
                <ArrowDownRight className="w-3.5 h-3.5" />
                <span>-0.8% from last month</span>
              </p>
            </div>

            {/* Card 2: ARPU */}
            <div className="bg-[#121724] border border-slate-800/90 rounded-2xl p-6 shadow-xl space-y-4">
              <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">
                ARPU (AVG. REVENUE PER USER)
              </span>
              <div className="font-serif-header text-3xl font-extrabold text-white">
                $185.00
              </div>

              <p className="text-xs text-slate-400 pt-1">
                Consistent with growth target
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main 2-Column Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column (Col 8): Action Required Alerts & Recent Activity */}
        <div className="lg:col-span-8 space-y-6">
          {/* Action Required Alerts Panel */}
          <div className="bg-[#121724] border border-slate-800/90 rounded-2xl p-5 shadow-xl space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-800/80">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400">
                  <AlertCircle className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="font-serif-header text-lg font-bold text-slate-100">
                    Action Required Alerts
                  </h2>
                  <p className="text-[11px] text-slate-400">Immediate attention needed for client retention & billing</p>
                </div>
              </div>
              <span className="bg-rose-950/90 text-rose-300 border border-rose-800/80 font-extrabold text-[10px] tracking-wider px-3 py-1 rounded-full uppercase shrink-0 shadow-sm">
                2 Critical Alerts
              </span>
            </div>

            {/* Alert Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Alert Card 1: Jason Stark */}
              <div className="bg-[#161c2a] border border-rose-900/50 hover:border-rose-700/70 rounded-2xl p-4.5 space-y-3.5 relative overflow-hidden transition-all shadow-lg group">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <img
                      src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80"
                      alt="Jason Stark"
                      className="w-10 h-10 rounded-full object-cover ring-2 ring-rose-500/40 shadow-md shrink-0"
                    />
                    <div>
                      <h4 className="text-xs font-bold text-slate-100 group-hover:text-rose-300 transition-colors">Jason Stark</h4>
                      <span className="text-[9px] font-extrabold text-rose-400 bg-rose-950/80 px-2 py-0.5 rounded border border-rose-800/60 uppercase tracking-widest">
                        AT RISK • MISSING LOGS
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  No activity logs for <strong className="text-rose-300 font-bold">4 consecutive days</strong>. Last check-in: Monday.
                </p>

                <div className="grid grid-cols-2 gap-2 pt-1">
                  <button
                    onClick={() => showToast && showToast('Nudge notification sent to Jason Stark', 'info')}
                    className="py-2 bg-rose-950/60 hover:bg-rose-900/90 border border-rose-800/80 text-rose-200 font-bold text-[11px] rounded-xl transition-all cursor-pointer shadow-sm text-center"
                  >
                    Nudge Client
                  </button>
                  <button
                    onClick={() => onNavigate && onNavigate('clients')}
                    className="py-2 bg-[#1c2436] hover:bg-[#242f47] border border-slate-700 text-slate-200 font-semibold text-[11px] rounded-xl transition-all cursor-pointer text-center"
                  >
                    View Profile
                  </button>
                </div>
              </div>

              {/* Alert Card 2: Renewal Due */}
              <div className="bg-[#161c2a] border border-amber-900/50 hover:border-amber-700/70 rounded-2xl p-4.5 space-y-3.5 relative overflow-hidden transition-all shadow-lg group">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0 shadow-md">
                      <CreditCard className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-100 group-hover:text-amber-300 transition-colors">Renewal Pending</h4>
                      <span className="text-[9px] font-extrabold text-amber-400 bg-amber-950/80 px-2 py-0.5 rounded border border-amber-800/60 uppercase tracking-wider">
                        SARAH JENKINS • 3 DAYS LEFT
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  Pro Athlete Plan subscription expires on Friday. Automatic renewal pending confirmation.
                </p>

                <div className="pt-1">
                  <button
                    onClick={() => showToast && showToast('Invoice preview opened for Sarah Jenkins', 'info')}
                    className="w-full py-2 bg-amber-950/60 hover:bg-amber-900/80 border border-amber-800/80 text-amber-200 font-bold text-[11px] rounded-xl transition-all cursor-pointer shadow-sm text-center"
                  >
                    Review Invoice & Remind
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity Panel */}
          <div className="bg-[#121724] border border-slate-800/90 rounded-2xl p-5 shadow-xl space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800/80">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="font-serif-header text-lg font-bold text-slate-100">
                    Recent Activity
                  </h2>
                  <p className="text-[11px] text-slate-400">Real-time workout & check-in feed</p>
                </div>
              </div>

              {/* Filter Pills */}
              <div className="flex items-center gap-2 text-xs overflow-x-auto scrollbar-none max-w-full pb-1 sm:pb-0">
                <div className="flex items-center bg-[#131926] p-1 rounded-xl border border-slate-800 font-semibold shrink-0">
                  {['All', 'Workouts', 'Nutrition', 'Check-ins'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActivityFilter(tab)}
                      className={`px-3 py-1 rounded-lg transition-all cursor-pointer whitespace-nowrap ${
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
                  onClick={() => {
                    if (onNavigate) onNavigate('notifications');
                    if (showToast) showToast('Opening Notifications & Activity Log', 'info');
                  }}
                  className="text-[11px] text-slate-300 hover:text-blue-300 font-bold bg-[#171e2e] hover:bg-slate-800 px-3 py-1.5 rounded-xl border border-slate-700/60 flex items-center gap-1.5 transition-all cursor-pointer shrink-0 ml-1"
                >
                  <span>View All</span>
                  <ChevronRight className="w-3.5 h-3.5 text-blue-400" />
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
