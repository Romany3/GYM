import { useState } from 'react';
import { 
  Info, 
  User, 
  Check, 
  ChevronDown, 
  Search,
  Flame,
  Dumbbell,
  Wheat,
  Droplet
} from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function TargetSetup({ 
  targetKcal: propTargetKcal = 2450, 
  proteinGrams, 
  setProteinGrams, 
  carbsGrams, 
  setCarbsGrams, 
  fatsGrams, 
  setFatsGrams,
  selectedClient,
  clients = [],
  onSelectClient,
  onUpdateTargetKcal
}) {
  const { t } = useTranslation();
  const [localTargetKcal, setLocalTargetKcal] = useState(propTargetKcal);
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
  const proteinKcal = (proteinGrams || 0) * 4;
  const carbsKcal = (carbsGrams || 0) * 4;
  const fatsKcal = (fatsGrams || 0) * 9;
  const totalAllocatedKcal = proteinKcal + carbsKcal + fatsKcal;
  const remainingKcal = effectiveTargetKcal - totalAllocatedKcal;

  // Percentage calculations
  const totalGramsKcal = totalAllocatedKcal || 1;
  const proteinPct = Math.round((proteinKcal / totalGramsKcal) * 100) || 0;
  const carbsPct = Math.round((carbsKcal / totalGramsKcal) * 100) || 0;
  const fatsPct = Math.round((fatsKcal / totalGramsKcal) * 100) || 0;

  const handleKcalChange = (newVal) => {
    const val = Math.max(0, Number(newVal) || 0);
    setLocalTargetKcal(val);
    if (onUpdateTargetKcal) onUpdateTargetKcal(val);
  };

  const handleKcalStep = (delta) => {
    const val = Math.max(500, effectiveTargetKcal + delta);
    setLocalTargetKcal(val);
    if (onUpdateTargetKcal) onUpdateTargetKcal(val);
  };

  // Sync target calories to sum of macros
  const handleSyncTargetToAllocated = () => {
    if (totalAllocatedKcal > 0) {
      setLocalTargetKcal(totalAllocatedKcal);
      if (onUpdateTargetKcal) onUpdateTargetKcal(totalAllocatedKcal);
    }
  };

  return (
    <div className="space-y-5 select-none">
      {/* Main Target Setup Card */}
      <div className="bg-[#121724] border border-slate-800/90 rounded-3xl p-5 sm:p-6 shadow-2xl relative overflow-hidden backdrop-blur-xl space-y-6">
        {/* Ambient Radial Background Glow */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Header Title */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800/80">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-950/80 border border-blue-800/60 flex items-center justify-center text-blue-400">
              <Flame className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <h2 className="font-serif-header text-lg font-bold text-slate-100 tracking-tight">
                {t('targetSetup.title')}
              </h2>
              <p className="text-[11px] text-slate-400">
                Direct manual input for target calories & macros
              </p>
            </div>
          </div>
        </div>

        {/* 1. TARGET CALORIES DIRECT INPUT BLOCK */}
        <div className="bg-[#171e2e]/90 p-4 rounded-2xl border border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
              <span>{t('targetSetup.targetKcal')}</span>
            </label>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => handleKcalStep(-100)}
                className="px-2 py-0.5 bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-mono rounded-lg border border-slate-700/60 cursor-pointer"
              >
                -100
              </button>
              <button
                type="button"
                onClick={() => handleKcalStep(-50)}
                className="px-2 py-0.5 bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-mono rounded-lg border border-slate-700/60 cursor-pointer"
              >
                -50
              </button>
              <button
                type="button"
                onClick={() => handleKcalStep(50)}
                className="px-2 py-0.5 bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-mono rounded-lg border border-slate-700/60 cursor-pointer"
              >
                +50
              </button>
              <button
                type="button"
                onClick={() => handleKcalStep(100)}
                className="px-2 py-0.5 bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-mono rounded-lg border border-slate-700/60 cursor-pointer"
              >
                +100
              </button>
            </div>
          </div>

          <div className="relative flex items-center">
            <input
              type="number"
              step="10"
              value={effectiveTargetKcal}
              onChange={(e) => handleKcalChange(e.target.value)}
              className="w-full bg-[#121724] text-white text-xl font-bold font-mono px-4 py-2.5 rounded-xl border border-slate-700/80 focus:outline-none focus:border-blue-500"
              placeholder="e.g. 2450"
            />
            <span className="absolute end-4 text-xs font-bold text-slate-400 font-mono pointer-events-none">
              kcal
            </span>
          </div>
        </div>

        {/* 2. DIRECT MACRO GRAM INPUTS (PROTEIN, CARBS, FATS) */}
        <div className="space-y-3.5">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
            Macro Targets (Manual Gram Entry)
          </span>

          {/* PROTEIN INPUT */}
          <div className="bg-[#171e2e]/70 p-3.5 rounded-2xl border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Dumbbell className="w-4 h-4 text-blue-400" />
                <span className="text-xs font-bold text-blue-400 tracking-wider">PROTEIN</span>
              </div>
              <span className="text-[11px] text-slate-400 font-mono">
                {proteinKcal} kcal <span className="text-slate-500">({proteinPct}%)</span>
              </span>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="number"
                value={proteinGrams}
                onChange={(e) => setProteinGrams(Math.max(0, Number(e.target.value)))}
                className="w-full bg-[#121724] text-white font-bold font-mono text-base px-3 py-2 rounded-xl border border-slate-700/80 focus:outline-none focus:border-blue-500"
                placeholder="0"
              />
              <span className="text-xs font-bold text-slate-400 font-mono shrink-0">g</span>
            </div>
          </div>

          {/* CARBS INPUT */}
          <div className="bg-[#171e2e]/70 p-3.5 rounded-2xl border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Wheat className="w-4 h-4 text-sky-400" />
                <span className="text-xs font-bold text-sky-400 tracking-wider">CARBS</span>
              </div>
              <span className="text-[11px] text-slate-400 font-mono">
                {carbsKcal} kcal <span className="text-slate-500">({carbsPct}%)</span>
              </span>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="number"
                value={carbsGrams}
                onChange={(e) => setCarbsGrams(Math.max(0, Number(e.target.value)))}
                className="w-full bg-[#121724] text-white font-bold font-mono text-base px-3 py-2 rounded-xl border border-slate-700/80 focus:outline-none focus:border-sky-500"
                placeholder="0"
              />
              <span className="text-xs font-bold text-slate-400 font-mono shrink-0">g</span>
            </div>
          </div>

          {/* FATS INPUT */}
          <div className="bg-[#171e2e]/70 p-3.5 rounded-2xl border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Droplet className="w-4 h-4 text-indigo-400" />
                <span className="text-xs font-bold text-indigo-400 tracking-wider">FATS</span>
              </div>
              <span className="text-[11px] text-slate-400 font-mono">
                {fatsKcal} kcal <span className="text-slate-500">({fatsPct}%)</span>
              </span>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="number"
                value={fatsGrams}
                onChange={(e) => setFatsGrams(Math.max(0, Number(e.target.value)))}
                className="w-full bg-[#121724] text-white font-bold font-mono text-base px-3 py-2 rounded-xl border border-slate-700/80 focus:outline-none focus:border-indigo-500"
                placeholder="0"
              />
              <span className="text-xs font-bold text-slate-400 font-mono shrink-0">g</span>
            </div>
          </div>
        </div>

        {/* 3. CALORIE & MACRO TELEMETRY SUMMARY BOX */}
        <div className="bg-[#0e1320] rounded-2xl p-4 border border-slate-800/90 space-y-3 text-xs shadow-inner">
          <div className="flex justify-between items-center text-slate-300">
            <span className="font-semibold">{t('targetSetup.allocated')}</span>
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-100 font-mono text-sm">
                {totalAllocatedKcal.toLocaleString()} kcal
              </span>
              {totalAllocatedKcal !== effectiveTargetKcal && (
                <button
                  type="button"
                  onClick={handleSyncTargetToAllocated}
                  className="px-2 py-0.5 bg-blue-950 text-blue-300 hover:bg-blue-900 border border-blue-800/60 rounded text-[10px] font-bold cursor-pointer"
                  title="Set Target kcal equal to sum of macros"
                >
                  Set as Target
                </button>
              )}
            </div>
          </div>

          <div className="flex justify-between items-center text-slate-300 pt-2 border-t border-slate-800/60">
            <span className="font-semibold">{t('targetSetup.remaining')}</span>
            <div className="flex items-center gap-1.5 font-bold font-mono">
              {remainingKcal === 0 ? (
                <span className="text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-800/60 flex items-center gap-1">
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  {t('targetSetup.balanced')}
                </span>
              ) : remainingKcal > 0 ? (
                <span className="text-amber-400 bg-amber-950/60 px-2.5 py-1 rounded-full border border-amber-800/60 flex items-center gap-1">
                  <Info className="w-3.5 h-3.5 text-amber-400" />
                  {t('targetSetup.underTarget', { kcal: remainingKcal.toLocaleString() })}
                </span>
              ) : (
                <span className="text-rose-400 bg-rose-950/80 px-2.5 py-1 rounded-full border border-rose-800/60">
                  {t('targetSetup.overTarget', { kcal: Math.abs(remainingKcal).toLocaleString() })}
                </span>
              )}
            </div>
          </div>
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
