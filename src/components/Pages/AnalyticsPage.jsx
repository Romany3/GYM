import { useState } from 'react';
import { 
  FileText, 
  TrendingUp, 
  Activity, 
  CheckCircle2, 
  Camera,
  Ruler,
  Award
} from 'lucide-react';

export default function AnalyticsPage({ showToast }) {
  const [selectedClient, setSelectedClient] = useState('Marcus Johnson');
  const [selectedPose, setSelectedPose] = useState('Front View');

  const handleExportPdf = () => {
    if (showToast) showToast(`Exporting Progress Report for ${selectedClient}...`);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold text-blue-400 bg-blue-950 px-2.5 py-0.5 rounded border border-blue-800/60 uppercase tracking-widest">
              ATHLETE TELEMETRY & PROGRESS
            </span>
          </div>
          <h1 className="font-serif-header text-3xl md:text-4xl font-bold tracking-tight text-white mt-1">
            Client Progress <span className="italic font-normal text-blue-300">&</span> Transformations
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            In-depth body composition telemetry, visual photo comparators, and anthropometric metrics.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Client Selector Dropdown */}
          <select
            value={selectedClient}
            onChange={(e) => setSelectedClient(e.target.value)}
            className="bg-[#121826] text-slate-200 text-xs font-semibold rounded-xl px-3.5 py-2.5 border border-slate-700/80 focus:outline-none focus:border-blue-500"
          >
            <option value="Marcus Johnson">Marcus Johnson</option>
            <option value="Elena Rodriguez">Elena Rodriguez</option>
            <option value="Sarah Connor">Sarah Connor</option>
            <option value="David Miller">David Miller</option>
          </select>

          <button
            onClick={handleExportPdf}
            className="flex items-center justify-center gap-2 py-2.5 px-4 bg-gradient-to-r from-blue-300 via-sky-200 to-blue-200 hover:from-blue-200 hover:to-sky-100 text-slate-950 font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer shrink-0"
          >
            <FileText className="w-4 h-4 text-slate-950" />
            <span>Export Client PDF Report</span>
          </button>
        </div>
      </div>

      {/* 3 Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-[#121724] border border-slate-800 rounded-2xl p-5 shadow-lg space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400 font-semibold">
            <span className="uppercase tracking-wider">TOTAL TRANSFORMATIONS</span>
            <Award className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-3xl font-extrabold text-white">38</div>
          <span className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" /> Completed this year
          </span>
        </div>

        <div className="bg-[#121724] border border-slate-800 rounded-2xl p-5 shadow-lg space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400 font-semibold">
            <span className="uppercase tracking-wider">AVG. WEIGHT REDUCTION</span>
            <TrendingUp className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-3xl font-extrabold text-white">-12.4 lbs</div>
          <span className="text-[11px] text-blue-300 font-semibold">Per 12-week program split</span>
        </div>

        <div className="bg-[#121724] border border-slate-800 rounded-2xl p-5 shadow-lg space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400 font-semibold">
            <span className="uppercase tracking-wider">MACRO COMPLIANCE</span>
            <Activity className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-3xl font-extrabold text-white">94.2%</div>
          <span className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" /> High client adherence rate
          </span>
        </div>
      </div>

      {/* Visual Progress Photos Side-by-Side Comparator */}
      <div className="bg-[#121724] border border-slate-800/90 rounded-2xl p-6 shadow-xl space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <Camera className="w-4 h-4 text-blue-400" />
              <h3 className="font-serif-header text-lg font-semibold text-slate-100">
                Visual Transformation Comparator (Side-by-Side)
              </h3>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Compare client progress photos over time across multiple view angles.
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-400 font-semibold">Selected Client:</span>
            <span className="text-blue-300 font-bold bg-blue-950/60 px-2.5 py-1 rounded-lg border border-blue-800/40">
              {selectedClient}
            </span>
          </div>
        </div>

        {/* View Pose Selector */}
        <div className="flex gap-2 border-b border-slate-800 pb-3">
          {['Front View', 'Side View', 'Back View'].map((pose) => (
            <button
              key={pose}
              onClick={() => setSelectedPose(pose)}
              className={`px-3.5 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                selectedPose === pose
                  ? 'bg-blue-600/30 text-blue-200 border border-blue-500/40 shadow-sm'
                  : 'bg-[#171e2e] text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {pose}
            </button>
          ))}
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
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-3 flex items-center gap-1.5">
            <Ruler className="w-4 h-4 text-blue-400" />
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

      {/* Goal Hit Rates Progress Bars */}
      <div className="bg-[#121724] border border-slate-800/90 rounded-2xl p-6 shadow-xl space-y-4">
        <h3 className="font-serif-header text-lg font-semibold text-slate-100">
          Client Transformation Progress & Goal Hit Rates
        </h3>

        <div className="space-y-4 pt-2">
          <div>
            <div className="flex justify-between text-xs font-semibold mb-1 text-slate-300">
              <span>Strength & Muscle Building Goals</span>
              <span className="text-blue-300 font-bold">96% Hit Rate</span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-2">
              <div className="bg-blue-400 h-full rounded-full w-[96%]" />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs font-semibold mb-1 text-slate-300">
              <span>Fat Loss & Body Composition</span>
              <span className="text-sky-300 font-bold">88% Hit Rate</span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-2">
              <div className="bg-sky-400 h-full rounded-full w-[88%]" />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs font-semibold mb-1 text-slate-300">
              <span>Endurance & Athletic Conditioning</span>
              <span className="text-indigo-300 font-bold">91% Hit Rate</span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-2">
              <div className="bg-indigo-400 h-full rounded-full w-[91%]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
