import { useState } from 'react';
import { SlidersHorizontal, Info, User, Sparkles, Lock, Unlock, Edit2, Check, ChevronDown, Search } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function TargetSetup({ 
  targetKcal: propTargetKcal = 2450, 
  proteinGrams, 
  setProteinGrams, 
  carbsGrams, 
  setCarbsGrams, 
  fatsGrams, 
  setFatsGrams,
  isLocked,
  setIsLocked,
  selectedClient,
  clients = [],
  onSelectClient,
  onUpdateTargetKcal
}) {
  const { t } = useTranslation();
  const [localTargetKcal, setLocalTargetKcal] = useState(propTargetKcal);
  const [isEditingKcal, setIsEditingKcal] = useState(false);
  const [showPresets, setShowPresets] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [clientSearchQuery, setClientSearchQuery] = useState('');

  const effectiveTargetKcal = localTargetKcal || propTargetKcal;

  // Default Clients Roster Fallback if not passed
  const clientsList = clients.length > 0 ? clients : [
    { id: 'c1', name: 'Marcus Jensen', targetKcal: 2450, tier: 'PRO ATHLETE' },
    { id: 'c2', name: 'Sarah Connor', targetKcal: 2100, tier: 'PRO ATHLETE' },
    { id: 'c3', name: 'David Miller', targetKcal: 2800, tier: 'STANDARD' },
    { id: 'c4', name: 'Elena Rodriguez', targetKcal: 1950, tier: 'VIP' },
    { id: 'c5', name: 'Michael Lee', targetKcal: 2900, tier: 'STANDARD' },
  ];

  const filteredClientList = clientsList.filter((c) =>
    c.name?.toLowerCase().includes(clientSearchQuery.toLowerCase())
  );

  // 1g Protein = 4 kcal, 1g Carb = 4 kcal, 1g Fat = 9 kcal
  const proteinKcal = proteinGrams * 4;
  const carbsKcal = carbsGrams * 4;
  const fatsKcal = fatsGrams * 9;
  const totalAllocatedKcal = proteinKcal + carbsKcal + fatsKcal;
  const remainingKcal = effectiveTargetKcal - totalAllocatedKcal;

  // Percentage calculations
  const totalGramsKcal = totalAllocatedKcal || 1;
  const proteinPct = Math.round((proteinKcal / totalGramsKcal) * 100);
  const carbsPct = Math.round((carbsKcal / totalGramsKcal) * 100);
  const fatsPct = Math.round((fatsKcal / totalGramsKcal) * 100);

  // SVG Gauge calculations
  const radius = 70;
  const strokeWidth = 14;
  const circumference = 2 * Math.PI * radius;
  const progressRatio = Math.min(1, Math.max(0, totalAllocatedKcal / (effectiveTargetKcal || 1)));
  const strokeDashoffset = circumference - (progressRatio * circumference * 0.75); // 270 deg arc

  const handleApplyPreset = (pRatio, cRatio, fRatio) => {
    if (isLocked) return;
    const pGrams = Math.round((effectiveTargetKcal * pRatio) / 4);
    const cGrams = Math.round((effectiveTargetKcal * cRatio) / 4);
    const fGrams = Math.round((effectiveTargetKcal * fRatio) / 9);
    setProteinGrams(pGrams);
    setCarbsGrams(cGrams);
    setFatsGrams(fGrams);
  };

  const handleKcalSubmit = (val) => {
    const num = Math.max(500, Math.min(10000, Number(val) || 2450));
    setLocalTargetKcal(num);
    if (onUpdateTargetKcal) onUpdateTargetKcal(num);
    setIsEditingKcal(false);
  };

  return (
    <div className="space-y-5 select-none">
      {/* Main Target Setup Card */}
      <div className="bg-[#121724] border border-slate-800/90 rounded-3xl p-5 sm:p-6 shadow-2xl relative overflow-hidden backdrop-blur-xl space-y-5">
        {/* Ambient Top Radial Glow */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="font-serif-header text-xl font-bold text-slate-100 tracking-tight">
              {t('targetSetup.title')}
            </h2>
            {isLocked && (
              <span className="text-[10px] font-bold text-slate-400 bg-slate-800 px-2 py-0.5 rounded-full border border-slate-700 flex items-center gap-1">
                <Lock className="w-3 h-3 text-amber-400" /> {t('common.locked')}
              </span>
            )}
          </div>
          
          <button 
            onClick={() => setShowPresets(!showPresets)}
            className={`p-2 rounded-xl transition-all cursor-pointer border ${
              showPresets
                ? 'bg-blue-600/30 text-blue-300 border-blue-500/50'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 border-slate-800'
            }`}
            title="Toggle Quick Ratio Presets"
          >
            <SlidersHorizontal className="w-4 h-4" />
          </button>
        </div>

        {/* Quick Ratio Presets Drawer */}
        {showPresets && (
          <div className="p-3 bg-[#171e2e]/90 border border-slate-700/60 rounded-2xl space-y-2 text-xs animate-in fade-in zoom-in-95 duration-200">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              {t('targetSetup.presets.title')}
            </span>
            <div className="grid grid-cols-2 gap-1.5 font-semibold text-[11px]">
              <button
                disabled={isLocked}
                onClick={() => handleApplyPreset(0.30, 0.45, 0.25)}
                className="p-2 bg-slate-900/80 hover:bg-blue-950/80 text-slate-200 hover:text-blue-300 rounded-xl border border-slate-700/50 cursor-pointer transition-all disabled:opacity-40"
              >
                {t('targetSetup.presets.balanced')}
              </button>
              <button
                disabled={isLocked}
                onClick={() => handleApplyPreset(0.40, 0.40, 0.20)}
                className="p-2 bg-slate-900/80 hover:bg-blue-950/80 text-slate-200 hover:text-blue-300 rounded-xl border border-slate-700/50 cursor-pointer transition-all disabled:opacity-40"
              >
                {t('targetSetup.presets.highProtein')}
              </button>
              <button
                disabled={isLocked}
                onClick={() => handleApplyPreset(0.25, 0.15, 0.60)}
                className="p-2 bg-slate-900/80 hover:bg-blue-950/80 text-slate-200 hover:text-blue-300 rounded-xl border border-slate-700/50 cursor-pointer transition-all disabled:opacity-40"
              >
                {t('targetSetup.presets.keto')}
              </button>
              <button
                disabled={isLocked}
                onClick={() => handleApplyPreset(0.25, 0.55, 0.20)}
                className="p-2 bg-slate-900/80 hover:bg-blue-950/80 text-slate-200 hover:text-blue-300 rounded-xl border border-slate-700/50 cursor-pointer transition-all disabled:opacity-40"
              >
                {t('targetSetup.presets.bulking')}
              </button>
            </div>
          </div>
        )}

        {/* Radial Circle Progress Meter with Editable Target Kcal */}
        <div className="relative flex items-center justify-center my-2">
          <svg className="w-52 h-52 sm:w-56 sm:h-56 -rotate-135 transform overflow-visible">
            {/* Background Arc Track */}
            <circle
              cx="112"
              cy="112"
              r={radius}
              stroke="#182032"
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeDasharray={`${circumference * 0.75} ${circumference * 0.25}`}
              fill="transparent"
            />
            {/* Active Progress Arc */}
            <circle
              cx="112"
              cy="112"
              r={radius}
              stroke="url(#gradientArc)"
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              fill="transparent"
              className="transition-all duration-500 ease-out"
            />
            <defs>
              <linearGradient id="gradientArc" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="50%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#818cf8" />
              </linearGradient>
            </defs>
          </svg>

          {/* Central Target Display & Direct Edit Box */}
          <div className="absolute flex flex-col items-center justify-center text-center">
            {isEditingKcal ? (
              <div className="flex items-center gap-1">
                <input
                  type="number"
                  autoFocus
                  step="50"
                  value={localTargetKcal}
                  onChange={(e) => setLocalTargetKcal(Number(e.target.value))}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleKcalSubmit(e.target.value);
                  }}
                  className="w-28 bg-slate-900 text-white font-extrabold text-2xl text-center p-1 rounded-xl border border-blue-500 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => handleKcalSubmit(localTargetKcal)}
                  className="p-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg cursor-pointer"
                >
                  <Check className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div 
                onClick={() => !isLocked && setIsEditingKcal(true)}
                className="group cursor-pointer flex items-center justify-center gap-1.5"
                title="Click to edit target calories"
              >
                <span className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-sans group-hover:text-blue-300 transition-colors">
                  {effectiveTargetKcal.toLocaleString()}
                </span>
                {!isLocked && (
                  <Edit2 className="w-3.5 h-3.5 text-slate-500 group-hover:text-blue-400 opacity-0 group-hover:opacity-100 transition-all" />
                )}
              </div>
            )}

            <span className="text-xs font-semibold text-slate-400 mt-1">
              Target kcal
            </span>
          </div>
        </div>

        {/* Macro Sliders & Direct Gram/Percentage Editors */}
        <div className="space-y-4 my-4">
          {/* PROTEIN */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="text-blue-400 tracking-wider">PROTEIN</span>
              <div className="flex items-center gap-1.5 font-mono">
                <input
                  type="number"
                  disabled={isLocked}
                  value={proteinGrams}
                  onChange={(e) => setProteinGrams(Math.max(0, Number(e.target.value)))}
                  className="w-14 bg-[#171e2e] text-slate-100 text-right px-1.5 py-0.5 rounded border border-slate-700 focus:outline-none focus:border-blue-500 text-xs font-bold disabled:opacity-50"
                />
                <span className="text-slate-400">g</span>
                <span className="text-slate-500 font-normal">({proteinPct}%)</span>
              </div>
            </div>
            <input
              type="range"
              min="20"
              max="400"
              step="5"
              disabled={isLocked}
              value={proteinGrams}
              onChange={(e) => setProteinGrams(Number(e.target.value))}
              className="w-full h-2 bg-[#171e2e] rounded-lg appearance-none cursor-pointer accent-blue-500 disabled:opacity-50"
            />
          </div>

          {/* CARBS */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="text-sky-400 tracking-wider">CARBS</span>
              <div className="flex items-center gap-1.5 font-mono">
                <input
                  type="number"
                  disabled={isLocked}
                  value={carbsGrams}
                  onChange={(e) => setCarbsGrams(Math.max(0, Number(e.target.value)))}
                  className="w-14 bg-[#171e2e] text-slate-100 text-right px-1.5 py-0.5 rounded border border-slate-700 focus:outline-none focus:border-sky-500 text-xs font-bold disabled:opacity-50"
                />
                <span className="text-slate-400">g</span>
                <span className="text-slate-500 font-normal">({carbsPct}%)</span>
              </div>
            </div>
            <input
              type="range"
              min="20"
              max="500"
              step="5"
              disabled={isLocked}
              value={carbsGrams}
              onChange={(e) => setCarbsGrams(Number(e.target.value))}
              className="w-full h-2 bg-[#171e2e] rounded-lg appearance-none cursor-pointer accent-sky-400 disabled:opacity-50"
            />
          </div>

          {/* FATS */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="text-indigo-400 tracking-wider">FATS</span>
              <div className="flex items-center gap-1.5 font-mono">
                <input
                  type="number"
                  disabled={isLocked}
                  value={fatsGrams}
                  onChange={(e) => setFatsGrams(Math.max(0, Number(e.target.value)))}
                  className="w-14 bg-[#171e2e] text-slate-100 text-right px-1.5 py-0.5 rounded border border-slate-700 focus:outline-none focus:border-indigo-500 text-xs font-bold disabled:opacity-50"
                />
                <span className="text-slate-400">g</span>
                <span className="text-slate-500 font-normal">({fatsPct}%)</span>
              </div>
            </div>
            <input
              type="range"
              min="10"
              max="200"
              step="5"
              disabled={isLocked}
              value={fatsGrams}
              onChange={(e) => setFatsGrams(Number(e.target.value))}
              className="w-full h-2 bg-[#171e2e] rounded-lg appearance-none cursor-pointer accent-indigo-400 disabled:opacity-50"
            />
          </div>
        </div>

        {/* Telemetry Summary Stats Box */}
        <div className="bg-[#0e1320] rounded-2xl p-4 border border-slate-800/90 space-y-2.5 text-xs shadow-inner">
          <div className="flex justify-between text-slate-300">
            <span className="font-semibold">{t('targetSetup.allocated')}</span>
            <span className="font-bold text-slate-100 font-mono">{totalAllocatedKcal.toLocaleString()} kcal</span>
          </div>
          <div className="flex justify-between items-center text-slate-300 pt-1 border-t border-slate-800/60">
            <span className="font-semibold">{t('targetSetup.remaining')}</span>
            <div className="flex items-center gap-1.5 font-bold font-mono">
              {remainingKcal === 0 ? (
                <span className="text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded-full border border-emerald-800/60">
                  {t('targetSetup.balanced')}
                </span>
              ) : remainingKcal > 0 ? (
                <span className="text-amber-400 flex items-center gap-1">
                  {t('targetSetup.underTarget', { kcal: remainingKcal.toLocaleString() })}
                  <Info className="w-3.5 h-3.5 text-amber-400" />
                </span>
              ) : (
                <span className="text-rose-400 bg-rose-950 px-2 py-0.5 rounded-full border border-rose-800/60">
                  {t('targetSetup.overTarget', { kcal: Math.abs(remainingKcal).toLocaleString() })}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2.5 pt-1">
          <button
            onClick={() => handleApplyPreset(0.30, 0.45, 0.25)}
            disabled={isLocked}
            className="w-full py-3 px-4 rounded-2xl font-bold text-xs bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white flex items-center justify-center gap-2 shadow-lg shadow-indigo-950/40 disabled:opacity-50 transition-all cursor-pointer hover:scale-[1.01]"
          >
            <Sparkles className="w-4 h-4 text-sky-300 animate-pulse" />
            <span>{t('common.autoBalance')}</span>
          </button>

          <button
            onClick={() => setIsLocked(!isLocked)}
            className={`w-full py-2.5 px-4 rounded-2xl font-bold text-xs transition-all border flex items-center justify-center gap-2 cursor-pointer ${
              isLocked
                ? 'bg-slate-800 text-amber-300 border-slate-700 hover:bg-slate-700 shadow-sm'
                : 'bg-[#171e2e] hover:bg-[#1e273b] text-slate-200 border-slate-700/70'
            }`}
          >
            {isLocked ? (
              <>
                <Lock className="w-4 h-4 text-amber-400" />
                <span>{t('common.locked')}</span>
              </>
            ) : (
              <>
                <Unlock className="w-4 h-4 text-blue-400" />
                <span>{t('common.lockTargets')}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Interactive Client Selector Dropdown Menu Card */}
      <div className="relative z-20">
        <div 
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className={`bg-[#121724] hover:bg-[#161c2c] border rounded-2xl p-4 flex items-center justify-between cursor-pointer transition-all group shadow-lg ${
            isDropdownOpen ? 'border-blue-500/70 ring-2 ring-blue-500/20' : 'border-slate-800/90'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-950/70 border border-blue-800/50 flex items-center justify-center text-blue-400 shrink-0 shadow-inner">
              <User className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-xs font-bold text-slate-100 group-hover:text-blue-300 transition-colors">
                  {selectedClient?.name || 'Select Client'}
                </h4>
                <span className="text-[9px] font-bold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded-full border border-emerald-800/60 uppercase">
                  {selectedClient?.tier || 'ACTIVE'}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5 flex items-center gap-1">
                <span>Target: {selectedClient?.targetKcal || 2450} kcal</span>
                <span>•</span>
                <span className="text-blue-400 font-semibold">{t('targetSetup.clientSelect.clickToSelect')}</span>
              </p>
            </div>
          </div>
          <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180 text-blue-400' : ''}`} />
        </div>

        {/* Dropdown Menu Popup */}
        {isDropdownOpen && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-[#0e1320] border border-slate-700/80 rounded-2xl p-3 shadow-2xl z-30 space-y-2.5 animate-in fade-in zoom-in-95 duration-200 max-h-80 flex flex-col">
            {/* Search Input Box */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute start-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                autoFocus
                value={clientSearchQuery}
                onChange={(e) => setClientSearchQuery(e.target.value)}
                placeholder={t('targetSetup.clientSelect.searchPlaceholder')}
                className="w-full bg-[#171e2e] text-slate-200 text-xs ps-8 pe-3 py-2 rounded-xl border border-slate-700/60 focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* Clients List */}
            <div className="overflow-y-auto space-y-1 flex-1 pr-0.5 scrollbar-none">
              {filteredClientList.map((client, idx) => {
                const isSelected = selectedClient?.name === client.name;
                const originalIndex = clientsList.findIndex((c) => c.name === client.name);

                return (
                  <div
                    key={client.id || idx}
                    onClick={() => {
                      if (onSelectClient) onSelectClient(originalIndex >= 0 ? originalIndex : idx);
                      setIsDropdownOpen(false);
                    }}
                    className={`p-2.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                      isSelected
                        ? 'bg-blue-950/60 border-blue-600/60 text-white font-bold'
                        : 'bg-[#141a2a]/60 hover:bg-[#182033] border-slate-800/80 text-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="relative shrink-0">
                        <div className="w-8 h-8 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 font-bold text-xs">
                          {client.name?.charAt(0) || 'C'}
                        </div>
                        <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-emerald-500 border border-slate-900" />
                      </div>
                      <div className="truncate">
                        <h5 className="text-xs truncate">{client.name}</h5>
                        <span className="text-[10px] text-slate-400 font-mono block">
                          {client.targetKcal} kcal • {client.tier || 'PRO'}
                        </span>
                      </div>
                    </div>

                    {isSelected && (
                      <Check className="w-4 h-4 text-blue-400 shrink-0" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
