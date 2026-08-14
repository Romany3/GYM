import { 
  Sun, 
  Utensils, 
  Moon, 
  Cookie, 
  Plus, 
  Pencil, 
  Copy, 
  Dumbbell, 
  Activity, 
  X,
  Trash2,
  FileText
} from 'lucide-react';

export default function DailyPlanCreator({
  selectedDay,
  setSelectedDay,
  meals,
  onAddItem,
  onEditItem,
  onDeleteItem,
  onAddCustomMeal,
  exercises,
  onAddExercise,
  onDeleteExercise,
  onDuplicateDays,
  onOpenNutritionPdf
}) {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const mealIcons = {
    breakfast: Sun,
    lunch: Utensils,
    dinner: Moon,
    snacks: Cookie,
  };

  const calculateMealTotals = (items) => {
    return items.reduce(
      (acc, item) => ({
        p: acc.p + Number(item.protein || 0),
        c: acc.c + Number(item.carbs || 0),
        f: acc.f + Number(item.fats || 0),
        kcal: acc.kcal + Number(item.kcal || 0),
      }),
      { p: 0, c: 0, f: 0, kcal: 0 }
    );
  };

  const totalExerciseBurn = exercises.reduce((sum, ex) => sum + (ex.burnKcal || 0), 0);

  return (
    <div className="space-y-6">
      {/* Header & Delivery Mode Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#121724] border border-slate-800 p-4 rounded-2xl">
        <div>
          <h2 className="font-serif-header text-xl font-semibold text-slate-100">
            Daily Plan Creator
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Configure meal schedules & generate full nutrition program PDF.
          </p>
        </div>

        {/* Top Header Export PDF Button */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => onOpenNutritionPdf && onOpenNutritionPdf()}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-500 hover:to-rose-600 text-white border border-rose-500/50 text-xs font-bold transition-all cursor-pointer shadow-md shadow-red-950/40"
            title="Export Full Nutrition Plan PDF"
          >
            <FileText className="w-4 h-4" />
            <span>Export PDF</span>
          </button>
        </div>
      </div>

      {/* Day Selector Bar */}
      <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-1 bg-[#131926] p-1 rounded-xl border border-slate-800 overflow-x-auto scrollbar-none max-w-full">
              {days.map((day) => (
                <button
                  key={day}
                  onClick={() => setSelectedDay(day)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    selectedDay === day
                      ? 'bg-blue-500 text-white shadow-md shadow-blue-500/20'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {day}
                </button>
              ))}
            </div>

            <button
              onClick={onDuplicateDays}
              className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-blue-300 font-medium px-2 py-1 transition-colors"
              title="Copy plan to all days"
            >
              <Copy className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Duplicate to all days</span>
            </button>
          </div>

      {/* Meals List */}
      <div className="space-y-4">
        {Object.entries(meals).map(([mealKey, mealData]) => {
          const Icon = mealIcons[mealKey] || Utensils;
          const totals = calculateMealTotals(mealData.items || []);

          return (
            <div
              key={mealKey}
              className="bg-[#121724] border border-slate-800/80 rounded-2xl p-5 shadow-lg"
            >
              {/* Meal Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2.5">
                  <Icon className="w-4 h-4 text-blue-400" />
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200">
                    {mealKey}
                  </h3>
                </div>

                {/* Macro Pills */}
                <div className="flex items-center gap-2 text-[11px] font-semibold">
                  <span className="bg-slate-800/80 text-blue-300 px-2 py-0.5 rounded-md">
                    P: {totals.p}g
                  </span>
                  <span className="bg-slate-800/80 text-sky-300 px-2 py-0.5 rounded-md">
                    C: {totals.c}g
                  </span>
                  <span className="bg-slate-800/80 text-indigo-300 px-2 py-0.5 rounded-md">
                    F: {totals.f}g
                  </span>
                  <span className="text-slate-300 ml-1 font-bold">
                    {totals.kcal} kcal
                  </span>
                </div>
              </div>

              {/* Items List */}
              <div className="space-y-3">
                {mealData.items && mealData.items.length > 0 ? (
                  mealData.items.map((item, idx) => (
                    <div
                      key={item.id || idx}
                      className="bg-[#171e2e] border border-slate-700/50 rounded-xl p-3.5 flex items-center justify-between group hover:border-slate-600/80 transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-slate-800/80 border border-slate-700/60 flex items-center justify-center text-slate-400">
                          <Utensils className="w-4 h-4 text-slate-300" />
                        </div>
                        <div>
                          <h4 className="text-xs font-semibold text-slate-200">
                            {item.name}
                          </h4>
                          <p className="text-[11px] text-slate-400 mt-0.5">
                            {item.description || `${item.serving || '1 portion'}`}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => onEditItem(mealKey, item)}
                          className="p-1.5 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-lg transition-colors"
                        >
                          <Pencil className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => onDeleteItem(mealKey, item.id)}
                          className="p-1.5 text-slate-500 hover:text-red-400 hover:bg-slate-800 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))
                ) : null}

                {/* Add Item Button */}
                <button
                  onClick={() => onAddItem(mealKey)}
                  className="w-full py-2.5 border-2 border-dashed border-slate-800 hover:border-slate-700 rounded-xl text-xs font-medium text-slate-400 hover:text-slate-200 flex items-center justify-center gap-2 transition-all group"
                >
                  <Plus className="w-3.5 h-3.5 text-slate-500 group-hover:text-slate-300" />
                  <span>Add Item</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Custom Meal Action */}
      <button
        onClick={onAddCustomMeal}
        className="w-full py-3.5 bg-gradient-to-r from-blue-300 via-sky-200 to-blue-200 hover:from-blue-200 hover:to-sky-100 text-slate-950 font-bold text-xs tracking-wider uppercase rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-blue-500/10 active:scale-[0.99] transition-all"
      >
        <Plus className="w-4 h-4" />
        <span>+ ADD CUSTOM MEAL</span>
      </button>

      {/* Daily Exercises Section */}
      <div className="bg-[#121724] border border-slate-800/80 rounded-2xl p-5 shadow-lg space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Dumbbell className="w-4 h-4 text-blue-400" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              DAILY EXERCISES
            </h3>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-400 font-medium">
              Total Burned: <strong className="text-slate-100">{totalExerciseBurn} kcal</strong>
            </span>
            <button
              onClick={onAddExercise}
              className="text-xs text-blue-400 hover:text-blue-300 font-semibold flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" /> Add
            </button>
          </div>
        </div>

        {/* Exercises Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {exercises.map((ex) => (
            <div
              key={ex.id}
              className="bg-[#161c2a] border border-slate-700/50 rounded-xl p-4 flex items-center justify-between relative group"
            >
              <div>
                <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">
                  {ex.category}
                </span>
                <h4 className="text-xs font-semibold text-slate-100 mt-0.5">
                  {ex.name}
                </h4>
                <p className="text-[11px] text-slate-400 mt-1">
                  {ex.detail}
                </p>
              </div>

              {/* Icon & Remove */}
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-slate-800/60 border border-slate-700/50 flex items-center justify-center text-slate-400">
                  {ex.category === 'STRENGTH' ? (
                    <Dumbbell className="w-4 h-4 text-slate-300" />
                  ) : (
                    <Activity className="w-4 h-4 text-slate-300" />
                  )}
                </div>
                <button
                  onClick={() => onDeleteExercise(ex.id)}
                  className="p-1 text-slate-500 hover:text-slate-300 transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
