import { 
  Sun, 
  Utensils, 
  Moon, 
  Cookie, 
  Plus, 
  Pencil, 
  Dumbbell, 
  Activity, 
  Trash2,
  FileText
} from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function DailyPlanCreator({
  selectedDay,
  setSelectedDay,
  meals,
  onAddItem,
  onEditItem,
  onDeleteItem,
  exercises,
  onAddExercise,
  onDeleteExercise,
  onDuplicateDays,
  onOpenNutritionPdf
}) {
  const { t } = useTranslation();

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
        kcal: acc.kcal + (item.kcal || 0),
        protein: acc.protein + (item.protein || 0),
        carbs: acc.carbs + (item.carbs || 0),
        fats: acc.fats + (item.fats || 0),
      }),
      { kcal: 0, protein: 0, carbs: 0, fats: 0 }
    );
  };

  return (
    <div className="bg-[#121724] border border-slate-800/90 rounded-3xl p-6 shadow-2xl space-y-6 backdrop-blur-xl relative overflow-hidden">
      {/* Top Ambient Glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header & Main Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
        <div>
          <h2 className="font-serif-header text-xl font-bold text-slate-100 tracking-tight">
            {t('dailyPlan.title')}
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Configure target nutrition meals & exercise routines per day
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={onOpenNutritionPdf}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-gradient-to-r from-red-600 via-rose-600 to-red-700 hover:from-red-500 hover:to-rose-500 text-white font-bold text-xs shadow-lg shadow-red-950/40 transition-all cursor-pointer hover:scale-[1.02]"
            title="Export Full NutriPlan PDF Program"
          >
            <FileText className="w-4 h-4 text-red-200" />
            <span>{t('common.exportNutriPlan')}</span>
          </button>
        </div>
      </div>

      {/* Day Selector Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        {days.map((day) => (
          <button
            key={day}
            onClick={() => setSelectedDay(day)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              selectedDay === day
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/40 scale-105'
                : 'bg-[#182032] text-slate-400 hover:text-slate-200 hover:bg-[#1e2a42]'
            }`}
          >
            {t(`dailyPlan.days.${day}`)}
          </button>
        ))}
      </div>

      {/* MEALS SECTION */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
            <Utensils className="w-3.5 h-3.5 text-blue-400" />
            Daily Meal Schedule ({selectedDay})
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(meals).map(([key, category]) => {
            const Icon = mealIcons[key] || Utensils;
            const items = category.items || [];
            const totals = calculateMealTotals(items);

            return (
              <div
                key={key}
                className="bg-[#0e1320] border border-slate-800/90 rounded-2xl p-4 space-y-3 relative group hover:border-slate-700/80 transition-all shadow-md"
              >
                {/* Category Header */}
                <div className="flex items-center justify-between border-b border-slate-800/80 pb-2.5">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-xl bg-blue-950/60 border border-blue-800/40 text-blue-400">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-200 capitalize">
                        {t(`dailyPlan.meals.${key}`)}
                      </h4>
                      <div className="flex items-center gap-2 text-[10px] font-mono text-slate-400 mt-0.5">
                        <span className="text-blue-300 font-bold">{totals.kcal} kcal</span>
                        <span>•</span>
                        <span>P: {totals.protein}g</span>
                        <span>C: {totals.carbs}g</span>
                        <span>F: {totals.fats}g</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => onAddItem(key)}
                    className="p-1.5 rounded-lg bg-blue-600/20 hover:bg-blue-600 text-blue-400 hover:text-white transition-all cursor-pointer"
                    title={`Add item to ${key}`}
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Items List */}
                <div className="space-y-2">
                  {items.length === 0 ? (
                    <p className="text-[11px] text-slate-500 italic py-2 text-center">
                      No items planned yet
                    </p>
                  ) : (
                    items.map((item) => (
                      <div
                        key={item.id}
                        className="bg-[#141a28] border border-slate-800/60 rounded-xl p-2.5 flex items-center justify-between group/item hover:border-slate-700 transition-all"
                      >
                        <div className="min-w-0 flex-1 pr-2">
                          <h5 className="text-xs font-semibold text-slate-200 truncate">
                            {item.name}
                          </h5>
                          <div className="flex items-center gap-2 text-[10px] font-mono text-slate-400 mt-0.5">
                            <span className="text-slate-300 font-bold">{item.kcal} kcal</span>
                            <span>P:{item.protein}g</span>
                            <span>C:{item.carbs}g</span>
                            <span>F:{item.fats}g</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-1 opacity-80 group-hover/item:opacity-100 transition-opacity">
                          <button
                            onClick={() => onEditItem(key, item)}
                            className="p-1 text-slate-400 hover:text-blue-300 rounded cursor-pointer"
                          >
                            <Pencil className="w-3 h-3" />
                          </button>
                          <button
                            onClick={() => onDeleteItem(key, item.id)}
                            className="p-1 text-slate-400 hover:text-rose-400 rounded cursor-pointer"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* EXERCISES ROUTINE SECTION */}
      <div className="space-y-4 pt-2 border-t border-slate-800/80">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
            <Dumbbell className="w-3.5 h-3.5 text-indigo-400" />
            Target Training Protocol ({selectedDay})
          </h3>
          <button
            onClick={onAddExercise}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-600/20 hover:bg-indigo-600 text-indigo-300 hover:text-white border border-indigo-500/30 text-xs font-bold transition-all cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{t('dailyPlan.addExercise')}</span>
          </button>
        </div>

        <div className="space-y-2.5">
          {exercises.length === 0 ? (
            <div className="bg-[#0e1320] border border-slate-800/90 rounded-2xl p-6 text-center text-slate-500 text-xs">
              No exercises assigned for {selectedDay}. Click "+ Add Exercise" to build routine.
            </div>
          ) : (
            exercises.map((ex) => (
              <div
                key={ex.id}
                className="bg-[#0e1320] border border-slate-800/90 hover:border-indigo-500/40 rounded-2xl p-4 flex items-center justify-between gap-4 transition-all group shadow-md"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-indigo-950/60 border border-indigo-800/40 flex items-center justify-center text-indigo-400 shrink-0 font-bold">
                    <Activity className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[9px] font-bold text-indigo-400 bg-indigo-950 px-2 py-0.5 rounded-full border border-indigo-800/60 uppercase">
                        {ex.category}
                      </span>
                      <h4 className="text-xs font-bold text-slate-100 truncate">{ex.name}</h4>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1 font-mono">
                      {ex.detail}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-xs font-bold text-emerald-400 font-mono bg-emerald-950/60 px-2.5 py-1 rounded-xl border border-emerald-800/40">
                    -{ex.burnKcal} kcal
                  </span>
                  <button
                    onClick={() => onDeleteExercise(ex.id)}
                    className="p-1.5 text-slate-500 hover:text-rose-400 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
