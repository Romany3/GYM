import { SlidersHorizontal, Info, ChevronRight, User, Sparkles } from 'lucide-react';

export default function TargetSetup({ 
  targetKcal = 2450, 
  proteinGrams, 
  setProteinGrams, 
  carbsGrams, 
  setCarbsGrams, 
  fatsGrams, 
  setFatsGrams,
  isLocked,
  setIsLocked,
  selectedClient,
  onOpenClientSelector
}) {
  // 1g Protein = 4 kcal, 1g Carb = 4 kcal, 1g Fat = 9 kcal
  const proteinKcal = proteinGrams * 4;
  const carbsKcal = carbsGrams * 4;
  const fatsKcal = fatsGrams * 9;
  const totalAllocatedKcal = proteinKcal + carbsKcal + fatsKcal;
  const remainingKcal = targetKcal - totalAllocatedKcal;

  // Percentage calculations
  const totalGramsKcal = totalAllocatedKcal || 1;
  const proteinPct = Math.round((proteinKcal / totalGramsKcal) * 100);
  const carbsPct = Math.round((carbsKcal / totalGramsKcal) * 100);
  const fatsPct = Math.round((fatsKcal / totalGramsKcal) * 100);

  // SVG Gauge calculations
  const radius = 70;
  const strokeWidth = 14;
  const circumference = 2 * Math.PI * radius;
  const progressRatio = Math.min(1, Math.max(0, totalAllocatedKcal / targetKcal));
  const strokeDashoffset = circumference - (progressRatio * circumference * 0.75); // 270 deg arc

  return (
    <div className="space-y-5">
      {/* Target Setup Card */}
      <div className="bg-[#121724] border border-slate-800/90 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-serif-header text-lg font-semibold text-slate-100">
            Target Setup
          </h2>
          <button 
            className="p-1.5 text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 rounded-lg transition-colors"
            title="Macro Settings"
          >
            <SlidersHorizontal className="w-4 h-4" />
          </button>
        </div>

        {/* Radial Circle Progress Meter */}
        <div className="relative flex items-center justify-center my-6">
          <svg className="w-52 h-52 -rotate-135 transform">
            {/* Background Arc Track */}
            <circle
              cx="104"
              cy="104"
              r={radius}
              stroke="#1a2336"
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeDasharray={`${circumference * 0.75} ${circumference * 0.25}`}
              fill="transparent"
            />
            {/* Active Progress Arc */}
            <circle
              cx="104"
              cy="104"
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
                <stop offset="100%" stopColor="#6366f1" />
              </linearGradient>
            </defs>
          </svg>

          {/* Central Target Display */}
          <div className="absolute flex flex-col items-center justify-center text-center">
            <span className="text-3xl font-extrabold text-white tracking-tight">
              {targetKcal.toLocaleString()}
            </span>
            <span className="text-xs font-medium text-slate-400 mt-0.5">
              Target kcal
            </span>
          </div>
        </div>

        {/* Macro Sliders */}
        <div className="space-y-4 my-6">
          {/* PROTEIN */}
          <div>
            <div className="flex justify-between text-xs font-semibold mb-1.5">
              <span className="text-slate-400 tracking-wider">PROTEIN</span>
              <span className="text-slate-200">{proteinGrams}g ({proteinPct}%)</span>
            </div>
            <input
              type="range"
              min="50"
              max="350"
              step="5"
              disabled={isLocked}
              value={proteinGrams}
              onChange={(e) => setProteinGrams(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-400 disabled:opacity-50"
            />
          </div>

          {/* CARBS */}
          <div>
            <div className="flex justify-between text-xs font-semibold mb-1.5">
              <span className="text-slate-400 tracking-wider">CARBS</span>
              <span className="text-slate-200">{carbsGrams}g ({carbsPct}%)</span>
            </div>
            <input
              type="range"
              min="50"
              max="450"
              step="5"
              disabled={isLocked}
              value={carbsGrams}
              onChange={(e) => setCarbsGrams(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-sky-400 disabled:opacity-50"
            />
          </div>

          {/* FATS */}
          <div>
            <div className="flex justify-between text-xs font-semibold mb-1.5">
              <span className="text-slate-400 tracking-wider">FATS</span>
              <span className="text-slate-200">{fatsGrams}g ({fatsPct}%)</span>
            </div>
            <input
              type="range"
              min="20"
              max="150"
              step="5"
              disabled={isLocked}
              value={fatsGrams}
              onChange={(e) => setFatsGrams(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-400 disabled:opacity-50"
            />
          </div>
        </div>

        {/* Stats Table */}
        <div className="bg-[#0b0e17]/80 rounded-xl p-3.5 border border-slate-800/80 space-y-2 text-xs">
          <div className="flex justify-between text-slate-300">
            <span>Allocated</span>
            <span className="font-semibold text-slate-100">{totalAllocatedKcal.toLocaleString()} kcal</span>
          </div>
          <div className="flex justify-between items-center text-slate-300">
            <span>Remaining</span>
            <div className="flex items-center gap-1 font-bold text-amber-400">
              <span>{remainingKcal.toLocaleString()} kcal</span>
              <Info className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>

        {/* Auto-Generate & Lock Targets Buttons */}
        <div className="space-y-2 mt-5">
          <button
            onClick={() => {
              // Auto-calculate 30% Protein, 45% Carbs, 25% Fats
              const pGrams = Math.round((targetKcal * 0.30) / 4);
              const cGrams = Math.round((targetKcal * 0.45) / 4);
              const fGrams = Math.round((targetKcal * 0.25) / 9);
              setProteinGrams(pGrams);
              setCarbsGrams(cGrams);
              setFatsGrams(fGrams);
            }}
            disabled={isLocked}
            className="w-full py-2.5 px-3 rounded-xl font-bold text-xs bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white flex items-center justify-center gap-2 shadow-md disabled:opacity-50 transition-all cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-sky-300" />
            <span>Auto-Balance Macros</span>
          </button>

          <button
            onClick={() => setIsLocked(!isLocked)}
            className={`w-full py-2.5 rounded-xl font-semibold text-xs transition-all border ${
              isLocked
                ? 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                : 'bg-[#1b253b] hover:bg-[#23304c] text-blue-200 border-blue-500/40 shadow-lg shadow-blue-900/20'
            }`}
          >
            {isLocked ? '🔒 Targets Locked' : 'Lock Targets'}
          </button>
        </div>
      </div>

      {/* Selected Client Card */}
      <div 
        onClick={onOpenClientSelector}
        className="bg-[#121724] hover:bg-[#161c2c] border border-slate-800/90 rounded-2xl p-4 flex items-center justify-between cursor-pointer transition-all group"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-950/70 border border-blue-800/50 flex items-center justify-center text-blue-400">
            <User className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-semibold text-slate-200 group-hover:text-blue-300 transition-colors">
              {selectedClient.name}
            </h4>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Last log: 2 hours ago
            </p>
          </div>
        </div>
        <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-slate-300 group-hover:translate-x-0.5 transition-all" />
      </div>
    </div>
  );
}
