import React, { useState } from 'react';
import { 
  FileText, 
  TrendingUp, 
  ArrowUpRight, 
  ArrowDownRight, 
  DollarSign, 
  Users, 
  Activity, 
  CheckCircle2, 
  Download 
} from 'lucide-react';

export default function AnalyticsPage({ showToast }) {
  const [activeTab, setActiveTab] = useState('business');

  const handleExportPdf = () => {
    if (showToast) showToast('Exporting Business & Progress PDF Report...');
  };

  return (
    <div className="space-y-6">
      {/* Top Banner Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif-header text-3xl md:text-4xl font-bold tracking-tight text-white">
            Business <span className="italic font-normal text-blue-300">&</span> Progress Analytics
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Strategic overview of revenue metrics and client transformation data.
          </p>
        </div>

        <button
          onClick={handleExportPdf}
          className="flex items-center justify-center gap-2 py-2.5 px-4 bg-[#121826] hover:bg-[#182033] text-slate-200 border border-slate-700/80 rounded-xl text-xs font-semibold shadow-md transition-all cursor-pointer"
        >
          <FileText className="w-4 h-4 text-blue-400" />
          <span>Export PDF Report</span>
        </button>
      </div>

      {/* Sub-Navigation View Switcher Tabs */}
      <div className="border-b border-slate-800 flex items-center gap-8 text-xs font-bold">
        <button
          onClick={() => setActiveTab('business')}
          className={`pb-3 relative transition-all cursor-pointer ${
            activeTab === 'business'
              ? 'text-slate-100'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <span>Business Analytics</span>
          {activeTab === 'business' && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-400 shadow-sm shadow-blue-400/50 rounded-full" />
          )}
        </button>

        <button
          onClick={() => setActiveTab('progress')}
          className={`pb-3 relative transition-all cursor-pointer ${
            activeTab === 'progress'
              ? 'text-slate-100'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <span>Client Progress Analytics</span>
          {activeTab === 'progress' && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-400 shadow-sm shadow-blue-400/50 rounded-full" />
          )}
        </button>
      </div>

      {/* Tab 1: BUSINESS ANALYTICS VIEW */}
      {activeTab === 'business' && (
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
            <div className="pt-4 space-y-2">
              <div className="h-64 w-full relative">
                <svg className="w-full h-full overflow-visible">
                  <defs>
                    <linearGradient id="mrrGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.35" />
                      <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>

                  {/* Grid Lines */}
                  <line x1="0" y1="40" x2="100%" y2="40" stroke="#1f293d" strokeDasharray="3 3" />
                  <line x1="0" y1="100" x2="100%" y2="100" stroke="#1f293d" strokeDasharray="3 3" />
                  <line x1="0" y1="160" x2="100%" y2="160" stroke="#1f293d" strokeDasharray="3 3" />
                  <line x1="0" y1="220" x2="100%" y2="220" stroke="#1f293d" strokeDasharray="3 3" />

                  {/* Area Fill */}
                  <polygon
                    fill="url(#mrrGradient)"
                    points="0,200 70,180 140,150 210,120 280,90 350,60 420,30 420,240 0,240"
                  />

                  {/* Trend Line */}
                  <polyline
                    fill="none"
                    stroke="#60a5fa"
                    strokeWidth="3"
                    points="0,200 70,180 140,150 210,120 280,90 350,60 420,30"
                  />

                  {/* Data Points */}
                  <circle cx="0" cy="200" r="4" fill="#93c5fd" />
                  <circle cx="70" cy="180" r="4" fill="#93c5fd" />
                  <circle cx="140" cy="150" r="4" fill="#93c5fd" />
                  <circle cx="210" cy="120" r="4" fill="#93c5fd" />
                  <circle cx="280" cy="90" r="4" fill="#93c5fd" />
                  <circle cx="350" cy="60" r="4" fill="#93c5fd" />
                  <circle cx="420" cy="30" r="5" fill="#3b82f6" stroke="#ffffff" strokeWidth="2" />
                </svg>
              </div>

              {/* Month X-Axis Labels */}
              <div className="flex justify-between text-xs text-slate-500 font-mono pt-2">
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
      )}

      {/* Tab 2: CLIENT PROGRESS ANALYTICS VIEW */}
      {activeTab === 'progress' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-[#121724] border border-slate-800 rounded-2xl p-5 shadow-lg space-y-2">
              <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase">
                TOTAL TRANSFORMATIONS
              </span>
              <div className="text-3xl font-extrabold text-white">38</div>
              <span className="text-[11px] text-emerald-400 font-semibold">Completed this year</span>
            </div>

            <div className="bg-[#121724] border border-slate-800 rounded-2xl p-5 shadow-lg space-y-2">
              <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase">
                AVG. WEIGHT REDUCTION
              </span>
              <div className="text-3xl font-extrabold text-white">-12.4 lbs</div>
              <span className="text-[11px] text-blue-300 font-semibold">Per 12-week program</span>
            </div>

            <div className="bg-[#121724] border border-slate-800 rounded-2xl p-5 shadow-lg space-y-2">
              <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase">
                MACRO COMPLIANCE
              </span>
              <div className="text-3xl font-extrabold text-white">94.2%</div>
              <span className="text-[11px] text-emerald-400 font-semibold">High client adherence</span>
            </div>
          </div>

          {/* Visual Progress Photos Side-by-Side Comparator */}
          <div className="bg-[#121724] border border-slate-800/90 rounded-2xl p-6 shadow-xl space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="font-serif-header text-lg font-semibold text-slate-100">
                  Visual Transformation Comparator (Side-by-Side)
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Compare client progress photos over time across multiple view angles.
                </p>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <span className="text-slate-400 font-semibold">Client:</span>
                <span className="text-blue-300 font-bold bg-blue-950/60 px-2.5 py-1 rounded-lg border border-blue-800/40">
                  Marcus Johnson
                </span>
              </div>
            </div>

            {/* View Pose Selector */}
            <div className="flex gap-2 border-b border-slate-800 pb-3">
              <span className="px-3 py-1 bg-blue-600/30 text-blue-200 border border-blue-500/40 text-xs font-bold rounded-lg cursor-pointer">
                Front View
              </span>
              <span className="px-3 py-1 bg-[#171e2e] text-slate-400 hover:text-slate-200 text-xs font-bold rounded-lg cursor-pointer">
                Side View
              </span>
              <span className="px-3 py-1 bg-[#171e2e] text-slate-400 hover:text-slate-200 text-xs font-bold rounded-lg cursor-pointer">
                Back View
              </span>
            </div>

            {/* Photos Side-by-Side Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Before Photo */}
              <div className="bg-[#161c2a] border border-slate-800 rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between text-xs font-bold text-slate-300">
                  <span className="text-amber-400 bg-amber-950/80 px-2 py-0.5 rounded border border-amber-800/60">
                    BEFORE (Jan 10, 2024)
                  </span>
                  <span>Weight: 88.5 kg</span>
                </div>
                <div className="aspect-[4/3] rounded-xl overflow-hidden bg-slate-900 border border-slate-800 relative group">
                  <img
                    src="https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=600&q=80"
                    alt="Before Transformation"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute bottom-2 left-2 bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded-lg text-[10px] font-mono text-slate-300">
                    Body Fat: 22.4%
                  </div>
                </div>
              </div>

              {/* After Photo */}
              <div className="bg-[#161c2a] border border-slate-800 rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between text-xs font-bold text-slate-300">
                  <span className="text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800/60">
                    CURRENT (Aug 01, 2024)
                  </span>
                  <span className="text-emerald-400 font-bold">Weight: 81.2 kg (-7.3 kg)</span>
                </div>
                <div className="aspect-[4/3] rounded-xl overflow-hidden bg-slate-900 border border-slate-800 relative group">
                  <img
                    src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=600&q=80"
                    alt="Current Transformation"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute bottom-2 left-2 bg-emerald-950/80 border border-emerald-800/60 backdrop-blur-md px-2.5 py-1 rounded-lg text-[10px] font-mono text-emerald-300 font-bold">
                    Body Fat: 14.8% (-7.6%)
                  </div>
                </div>
              </div>
            </div>

            {/* Key Body Measurements Breakdown Table */}
            <div className="bg-[#0f1420] border border-slate-800/80 rounded-xl p-4 space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-3">
                Anthropometric Circumferences History (cm)
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div className="p-2.5 bg-[#161c2a] rounded-lg border border-slate-800">
                  <span className="text-[10px] text-slate-400 block">Chest</span>
                  <span className="font-bold text-slate-200">104 cm → 108 cm</span>
                  <span className="text-[10px] text-emerald-400 block mt-0.5 font-bold">+4 cm (Hypertrophy)</span>
                </div>
                <div className="p-2.5 bg-[#161c2a] rounded-lg border border-slate-800">
                  <span className="text-[10px] text-slate-400 block">Waist</span>
                  <span className="font-bold text-slate-200">89 cm → 81 cm</span>
                  <span className="text-[10px] text-emerald-400 block mt-0.5 font-bold">-8 cm (Fat Reduction)</span>
                </div>
                <div className="p-2.5 bg-[#161c2a] rounded-lg border border-slate-800">
                  <span className="text-[10px] text-slate-400 block">Arms (Flexed)</span>
                  <span className="font-bold text-slate-200">38 cm → 41 cm</span>
                  <span className="text-[10px] text-emerald-400 block mt-0.5 font-bold">+3 cm</span>
                </div>
                <div className="p-2.5 bg-[#161c2a] rounded-lg border border-slate-800">
                  <span className="text-[10px] text-slate-400 block">Thighs</span>
                  <span className="font-bold text-slate-200">60 cm → 63 cm</span>
                  <span className="text-[10px] text-emerald-400 block mt-0.5 font-bold">+3 cm</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#121724] border border-slate-800/90 rounded-2xl p-6 shadow-xl space-y-4">
            <h3 className="font-serif-header text-lg font-semibold text-slate-100">
              Client Transformation Progress & Goal Hit Rates
            </h3>

            <div className="space-y-4 pt-2">
              <div>
                <div className="flex justify-between text-xs font-semibold mb-1 text-slate-300">
                  <span>Strength & Muscle Building Goals</span>
                  <span>96% Hit Rate</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-2">
                  <div className="bg-blue-400 h-full rounded-full w-[96%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold mb-1 text-slate-300">
                  <span>Fat Loss & Body Composition</span>
                  <span>88% Hit Rate</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-2">
                  <div className="bg-sky-400 h-full rounded-full w-[88%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold mb-1 text-slate-300">
                  <span>Endurance & Athletic Conditioning</span>
                  <span>91% Hit Rate</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-2">
                  <div className="bg-indigo-400 h-full rounded-full w-[91%]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
