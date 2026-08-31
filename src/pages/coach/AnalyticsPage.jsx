import { useState } from 'react';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();
  const [selectedClient, setSelectedClient] = useState('Marcus Johnson');
  const [selectedPose, setSelectedPose] = useState('Front View');

  const handleExportPdf = () => {
    if (showToast) showToast(`Exporting Progress Report for ${selectedClient}...`);
  };

  const getPoseLabel = (poseStr) => {
    switch (poseStr) {
      case 'Front View': return t('analytics.frontView');
      case 'Side Profile': return t('analytics.sideProfile');
      case 'Back View': return t('analytics.backView');
      default: return poseStr;
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold text-blue-400 bg-blue-950 px-2.5 py-0.5 rounded border border-blue-800/60 uppercase tracking-widest">
              {t('analytics.badge')}
            </span>
          </div>
          <h1 className="font-serif-header text-3xl md:text-4xl font-bold tracking-tight text-white mt-1">
            {t('analytics.title')}
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            {t('analytics.subtitle')}
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Client Selector Dropdown */}
          <select
            value={selectedClient}
            onChange={(e) => setSelectedClient(e.target.value)}
            className="bg-[#121826] text-slate-200 text-xs font-semibold rounded-xl px-3.5 py-2.5 border border-slate-700/80 focus:outline-none focus:border-blue-500 cursor-pointer"
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
            <span>{t('analytics.exportPdf')}</span>
          </button>
        </div>
      </div>

      {/* 4 Summary Telemetry Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#121724] border border-slate-800 rounded-2xl p-5 shadow-lg space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-400">
            <span className="uppercase tracking-wider">{t('clients.compliance')}</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-3xl font-extrabold text-white">{t('analytics.complianceVal')}</div>
          <span className="text-[11px] text-emerald-400 font-semibold">{t('analytics.complianceDesc')}</span>
        </div>

        <div className="bg-[#121724] border border-slate-800 rounded-2xl p-5 shadow-lg space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-400">
            <span className="uppercase tracking-wider">{t('analytics.recomp')}</span>
            <TrendingUp className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-3xl font-extrabold text-white">{t('analytics.recompVal')}</div>
          <span className="text-[11px] text-blue-400 font-semibold">{t('analytics.recompDesc')}</span>
        </div>

        <div className="bg-[#121724] border border-slate-800 rounded-2xl p-5 shadow-lg space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-400">
            <span className="uppercase tracking-wider">{t('analytics.streak')}</span>
            <Activity className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-3xl font-extrabold text-white">{t('analytics.streakDays', { count: 14 })}</div>
          <span className="text-[11px] text-amber-400 font-semibold">{t('analytics.streakDesc')}</span>
        </div>

        <div className="bg-[#121724] border border-slate-800 rounded-2xl p-5 shadow-lg space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-400">
            <span className="uppercase tracking-wider">{t('analytics.prs')}</span>
            <Award className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-3xl font-extrabold text-white">{t('analytics.prsCount', { count: 8 })}</div>
          <span className="text-[11px] text-purple-400 font-semibold">{t('analytics.prsDesc')}</span>
        </div>
      </div>

      {/* Progress Comparator Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Visual Photo Comparator (Col 8) */}
        <div className="lg:col-span-8 bg-[#121724] border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
            <div>
              <h3 className="font-serif-header text-lg font-bold text-slate-100 flex items-center gap-2">
                <Camera className="w-4 h-4 text-blue-400" />
                <span>{t('analytics.comparatorTitle')}</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                {t('analytics.comparatorSubtitle')}
              </p>
            </div>

            {/* Pose Filter */}
            <div className="flex items-center gap-1 bg-[#171e2e] p-1 rounded-xl border border-slate-800 text-xs font-semibold shrink-0">
              {['Front View', 'Side Profile', 'Back View'].map((pose) => (
                <button
                  key={pose}
                  onClick={() => setSelectedPose(pose)}
                  className={`px-3 py-1 rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                    selectedPose === pose
                      ? 'bg-blue-600/40 text-blue-200 border border-blue-500/40'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {getPoseLabel(pose)}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Baseline Photo */}
            <div className="space-y-2">
              <div className="relative rounded-2xl overflow-hidden border border-slate-700/80 aspect-[4/5] bg-slate-950">
                <img
                  src="https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=600&q=80"
                  alt="Baseline"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 start-3 bg-slate-950/80 border border-slate-800 text-slate-200 text-[10px] font-bold px-2.5 py-1 rounded-lg shadow-md">
                  {t('analytics.baselineTag')}
                </div>
              </div>
            </div>

            {/* Latest Progress Photo */}
            <div className="space-y-2">
              <div className="relative rounded-2xl overflow-hidden border border-blue-500/50 aspect-[4/5] bg-slate-950 ring-2 ring-blue-500/20">
                <img
                  src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=600&q=80"
                  alt="Latest"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 start-3 bg-blue-950/90 border border-blue-800/80 text-blue-300 text-[10px] font-bold px-2.5 py-1 rounded-lg shadow-md uppercase">
                  {t('analytics.latestTag')}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Anthropometric Measurements (Col 4) */}
        <div className="lg:col-span-4 bg-[#121724] border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5">
          <h3 className="font-serif-header text-lg font-bold text-slate-100 flex items-center gap-2 border-b border-slate-800 pb-3">
            <Ruler className="w-4 h-4 text-blue-400" />
            <span>{t('analytics.tapeTitle')}</span>
          </h3>

          <div className="space-y-3 text-xs">
            <div className="p-3 bg-[#171e2e] rounded-xl border border-slate-800/80 flex items-center justify-between">
              <span className="text-slate-400 font-semibold">{t('analytics.waist')}</span>
              <span className="font-mono font-bold text-emerald-400">82 cm (-4 cm)</span>
            </div>
            <div className="p-3 bg-[#171e2e] rounded-xl border border-slate-800/80 flex items-center justify-between">
              <span className="text-slate-400 font-semibold">{t('analytics.chest')}</span>
              <span className="font-mono font-bold text-blue-400">104 cm (+3 cm)</span>
            </div>
            <div className="p-3 bg-[#171e2e] rounded-xl border border-slate-800/80 flex items-center justify-between">
              <span className="text-slate-400 font-semibold">{t('analytics.biceps')}</span>
              <span className="font-mono font-bold text-blue-400">39 cm (+1.5 cm)</span>
            </div>
            <div className="p-3 bg-[#171e2e] rounded-xl border border-slate-800/80 flex items-center justify-between">
              <span className="text-slate-400 font-semibold">{t('analytics.thigh')}</span>
              <span className="font-mono font-bold text-blue-400">61 cm (+2 cm)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
