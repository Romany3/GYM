import { useState } from 'react';
import { 
  Sparkles, 
  RefreshCw, 
  Save, 
  Sliders, 
  CheckCircle2, 
  Trash2, 
  Clock,
  FileText
} from 'lucide-react';

export default function AiMealGeneratorPage({ showToast, onOpenNutritionPdf }) {
  // Input Settings
  const [targetKcal, setTargetKcal] = useState(2000);
  const [goalPreset, setGoalPreset] = useState('Balanced'); // 'Balanced' | 'Fat Loss' | 'Hypertrophy' | 'High Protein'
  const [mealCount, setMealCount] = useState(4);
  const [proteinPct, setProteinPct] = useState(30);
  const [carbPct, setCarbPct] = useState(40);
  const [fatPct, setFatPct] = useState(30);
  const [isGenerating, setIsGenerating] = useState(false);

  // Recent AI Generations History List
  const [generationHistory, setGenerationHistory] = useState([
    { id: 'h1', name: '2000 kcal • Balanced Split', meals: 4, date: 'Today, 02:45 AM', kcal: 1980 },
    { id: 'h2', name: '2500 kcal • Hypertrophy Mass', meals: 5, date: 'Yesterday', kcal: 2490 },
    { id: 'h3', name: '1800 kcal • Fat Loss Cutting', meals: 4, date: 'Aug 07', kcal: 1810 },
  ]);

  // Master Food Library Database for AI Selector
  const foodDatabase = [
    { name: 'Oats (Rolled)', unit: 'g', kcalPer100: 389, p100: 16.9, c100: 66.3, f100: 6.9, category: 'Carbs' },
    { name: 'Whey Protein Isolate', unit: 'scoop', kcalPer100: 370, p100: 82.0, c100: 3.0, f100: 1.5, category: 'Protein' },
    { name: 'Eggs (Whole)', unit: 'large', kcalPer100: 155, p100: 13.0, c100: 1.1, f100: 11.0, category: 'Protein' },
    { name: 'Chicken Breast (Grilled)', unit: 'g', kcalPer100: 165, p100: 31.0, c100: 0.0, f100: 3.6, category: 'Protein' },
    { name: 'Basmati Rice (Cooked)', unit: 'g', kcalPer100: 130, p100: 2.7, c100: 28.0, f100: 0.3, category: 'Carbs' },
    { name: 'Olive Oil (Extra Virgin)', unit: 'tbsp', kcalPer100: 884, p100: 0.0, c100: 0.0, f100: 100.0, category: 'Fats' },
    { name: 'Avocado', unit: 'g', kcalPer100: 160, p100: 2.0, c100: 8.5, f100: 14.7, category: 'Fats' },
    { name: 'Greek Yogurt (0% Fat)', unit: 'g', kcalPer100: 59, p100: 10.0, c100: 3.6, f100: 0.4, category: 'Protein' },
    { name: 'Almonds (Raw)', unit: 'g', kcalPer100: 579, p100: 21.0, c100: 22.0, f100: 49.0, category: 'Fats' },
    { name: 'Sweet Potato (Baked)', unit: 'g', kcalPer100: 86, p100: 1.6, c100: 20.0, f100: 0.1, category: 'Carbs' },
  ];

  // Generated Plan State
  const [generatedMeals, setGeneratedMeals] = useState([
    {
      id: 'm1',
      title: 'Meal 1: High-Protein Breakfast',
      time: '08:30 AM',
      items: [
        { name: 'Oats (Rolled)', portionGrams: 80, kcal: 311, p: 13.5, c: 53.0, f: 5.5 },
        { name: 'Whey Protein Isolate', portionGrams: 35, kcal: 130, p: 28.7, c: 1.0, f: 0.5 },
        { name: 'Almonds (Raw)', portionGrams: 20, kcal: 116, p: 4.2, c: 4.4, f: 9.8 },
      ],
    },
    {
      id: 'm2',
      title: 'Meal 2: Lean Power Lunch',
      time: '01:00 PM',
      items: [
        { name: 'Chicken Breast (Grilled)', portionGrams: 180, kcal: 297, p: 55.8, c: 0.0, f: 6.5 },
        { name: 'Basmati Rice (Cooked)', portionGrams: 220, kcal: 286, p: 5.9, c: 61.6, f: 0.7 },
        { name: 'Olive Oil (Extra Virgin)', portionGrams: 10, kcal: 88, p: 0.0, c: 0.0, f: 10.0 },
      ],
    },
    {
      id: 'm3',
      title: 'Meal 3: Pre-Workout Anabolic Snack',
      time: '04:30 PM',
      items: [
        { name: 'Greek Yogurt (0% Fat)', portionGrams: 200, kcal: 118, p: 20.0, c: 7.2, f: 0.8 },
        { name: 'Sweet Potato (Baked)', portionGrams: 150, kcal: 129, p: 2.4, c: 30.0, f: 0.2 },
      ],
    },
    {
      id: 'm4',
      title: 'Meal 4: Recovery Dinner & Healthy Fats',
      time: '08:00 PM',
      items: [
        { name: 'Eggs (Whole)', portionGrams: 150, kcal: 232, p: 19.5, c: 1.6, f: 16.5 },
        { name: 'Avocado', portionGrams: 100, kcal: 160, p: 2.0, c: 8.5, f: 14.7 },
        { name: 'Basmati Rice (Cooked)', portionGrams: 80, kcal: 104, p: 2.1, c: 22.4, f: 0.2 },
      ],
    },
  ]);

  // Macro Calculation Metrics
  const calculatedMacros = generatedMeals.reduce(
    (acc, meal) => {
      meal.items.forEach((item) => {
        acc.kcal += item.kcal;
        acc.protein += item.p;
        acc.carbs += item.c;
        acc.fat += item.f;
      });
      return acc;
    },
    { kcal: 0, protein: 0, carbs: 0, fat: 0 }
  );

  const targetProteinGrams = Math.round((targetKcal * (proteinPct / 100)) / 4);
  const targetCarbGrams = Math.round((targetKcal * (carbPct / 100)) / 4);
  const targetFatGrams = Math.round((targetKcal * (fatPct / 100)) / 9);

  // AI Meal Template Generation Logic
  const handleGenerateAiPlan = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const newPlan = [];
      const mealTitles = [
        { title: 'Meal 1: Power Breakfast', time: '08:00 AM' },
        { title: 'Meal 2: Anabolic Lunch', time: '12:30 PM' },
        { title: 'Meal 3: Mid-Day Energy Snack', time: '04:00 PM' },
        { title: 'Meal 4: Recovery Dinner', time: '07:30 PM' },
        { title: 'Meal 5: Bedtime Casein / Snack', time: '10:00 PM' },
        { title: 'Meal 6: Post-Workout Shake', time: '06:00 PM' },
      ];

      for (let i = 0; i < mealCount; i++) {
        const titleObj = mealTitles[i] || { title: `Meal ${i + 1}`, time: `${8 + i * 3}:00 AM` };
        const proteinFood = foodDatabase[i % 4];
        const carbFood = foodDatabase[4 + (i % 3)];
        const fatFood = foodDatabase[7 + (i % 3)];

        const pGram = Math.round((targetProteinGrams / mealCount) * (100 / (proteinFood.p100 || 20)));
        const cGram = Math.round((targetCarbGrams / mealCount) * (100 / (carbFood.c100 || 25)));
        const fGram = Math.round((targetFatGrams / mealCount) * (100 / (fatFood.f100 || 15)));

        newPlan.push({
          id: `ai_${i}_${Date.now()}`,
          title: titleObj.title,
          time: titleObj.time,
          items: [
            {
              name: proteinFood.name,
              portionGrams: pGram,
              kcal: Math.round((pGram * proteinFood.kcalPer100) / 100),
              p: Math.round(((pGram * proteinFood.p100) / 100) * 10) / 10,
              c: Math.round(((pGram * proteinFood.c100) / 100) * 10) / 10,
              f: Math.round(((pGram * proteinFood.f100) / 100) * 10) / 10,
            },
            {
              name: carbFood.name,
              portionGrams: cGram,
              kcal: Math.round((cGram * carbFood.kcalPer100) / 100),
              p: Math.round(((cGram * carbFood.p100) / 100) * 10) / 10,
              c: Math.round(((cGram * carbFood.c100) / 100) * 10) / 10,
              f: Math.round(((cGram * carbFood.f100) / 100) * 10) / 10,
            },
            {
              name: fatFood.name,
              portionGrams: fGram,
              kcal: Math.round((fGram * fatFood.kcalPer100) / 100),
              p: Math.round(((fGram * fatFood.p100) / 100) * 10) / 10,
              c: Math.round(((fGram * fatFood.c100) / 100) * 10) / 10,
              f: Math.round(((fGram * fatFood.f100) / 100) * 10) / 10,
            },
          ],
        });
      }

      setGeneratedMeals(newPlan);
      setIsGenerating(false);

      setGenerationHistory((prev) => [
        {
          id: Date.now().toString(),
          name: `${targetKcal} kcal • ${goalPreset} Split`,
          meals: mealCount,
          date: 'Just now',
          kcal: targetKcal,
        },
        ...prev,
      ]);

      if (showToast) showToast(`Generated automated AI meal plan for ${targetKcal} kcal!`);
    }, 500);
  };

  const handleUpdateItemGram = (mealIdx, itemIdx, newGram) => {
    const gram = Math.max(5, Number(newGram));
    setGeneratedMeals((prev) => {
      const updated = [...prev];
      const items = [...updated[mealIdx].items];
      const curr = items[itemIdx];
      const baseFood = foodDatabase.find((f) => f.name === curr.name) || {
        kcalPer100: (curr.kcal / curr.portionGrams) * 100,
        p100: (curr.p / curr.portionGrams) * 100,
        c100: (curr.c / curr.portionGrams) * 100,
        f100: (curr.f / curr.portionGrams) * 100,
      };

      items[itemIdx] = {
        ...curr,
        portionGrams: gram,
        kcal: Math.round((gram * baseFood.kcalPer100) / 100),
        p: Math.round(((gram * baseFood.p100) / 100) * 10) / 10,
        c: Math.round(((gram * baseFood.c100) / 100) * 10) / 10,
        f: Math.round(((gram * baseFood.f100) / 100) * 10) / 10,
      };

      updated[mealIdx] = { ...updated[mealIdx], items };
      return updated;
    });
  };

  const handleRemoveItem = (mealIdx, itemIdx) => {
    setGeneratedMeals((prev) => {
      const updated = [...prev];
      const items = updated[mealIdx].items.filter((_, idx) => idx !== itemIdx);
      updated[mealIdx] = { ...updated[mealIdx], items };
      return updated;
    });
  };

  const handleSaveAsTemplate = () => {
    if (showToast) showToast('Saved meal plan as reusable coach template!');
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold text-red-400 bg-red-950 px-2.5 py-0.5 rounded border border-red-800/60 uppercase tracking-widest flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-red-400" /> AI AUTOMATED ENGINE
            </span>
          </div>
          <h1 className="font-serif-header text-3xl font-bold text-white tracking-tight mt-1">
            AI Meal Template Generator
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Generate full meal templates automatically from your Food Library based on target calories and macro ratios — fully customizable after generation.
          </p>
        </div>

        <button
          onClick={handleSaveAsTemplate}
          className="w-full md:w-auto py-2.5 px-5 bg-gradient-to-r from-blue-400 via-sky-300 to-blue-300 hover:from-blue-300 hover:to-sky-200 text-slate-950 font-bold text-xs rounded-xl shadow-lg flex items-center justify-center gap-2 transition-all cursor-pointer"
        >
          <Save className="w-4 h-4" />
          <span>Save as Template</span>
        </button>
      </div>

      {/* Main Top 2-Column Section (Matching Screenshot) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column (Col 4): Recent AI Generations History */}
        <div className="lg:col-span-4 bg-[#121724] border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-red-400" />
              <h3 className="font-serif-header text-sm font-bold text-slate-100">
                Recent AI Generations
              </h3>
            </div>
            <span className="text-[10px] text-slate-400 font-mono">{generationHistory.length} Saved</span>
          </div>

          <div className="space-y-2.5">
            {generationHistory.map((item) => (
              <div
                key={item.id}
                className="p-3 bg-[#171e2e] hover:bg-[#1c2538] border border-slate-800/80 rounded-xl transition-all cursor-pointer space-y-1 group"
              >
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-slate-200 group-hover:text-red-400 transition-colors">
                    {item.name}
                  </h4>
                  <span className="text-[10px] font-mono text-slate-500">{item.date}</span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-400">
                  <span>{item.meals} Meals Split</span>
                  <span className="text-emerald-400 font-bold">{item.kcal} kcal</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column (Col 8): Generation Settings Control Panel */}
        <div className="lg:col-span-8 bg-[#121724] border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
            <Sliders className="w-4 h-4 text-red-400" />
            <h3 className="font-serif-header text-base font-bold text-slate-100">
              AI Generation Settings
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            {/* Target Calories */}
            <div>
              <label className="block text-slate-400 font-semibold mb-1.5">Target Calories (kcal)</label>
              <input
                type="number"
                step="50"
                value={targetKcal}
                onChange={(e) => setTargetKcal(Number(e.target.value))}
                className="w-full bg-[#171e2e] text-slate-200 font-mono font-bold p-2.5 rounded-xl border border-slate-700/60 focus:outline-none focus:border-red-500"
              />
            </div>

            {/* Goal Preset */}
            <div>
              <label className="block text-slate-400 font-semibold mb-1.5">Goal Preset</label>
              <select
                value={goalPreset}
                onChange={(e) => setGoalPreset(e.target.value)}
                className="w-full bg-[#171e2e] text-slate-200 font-bold p-2.5 rounded-xl border border-slate-700/60 focus:outline-none focus:border-red-500"
              >
                <option value="Balanced">Balanced Split</option>
                <option value="Fat Loss">Fat Loss / Cutting</option>
                <option value="Hypertrophy">Hypertrophy / Muscle Mass</option>
                <option value="High Protein">High Protein Protocol</option>
              </select>
            </div>

            {/* Meal Count */}
            <div>
              <label className="block text-slate-400 font-semibold mb-1.5">Meals per Day</label>
              <select
                value={mealCount}
                onChange={(e) => setMealCount(Number(e.target.value))}
                className="w-full bg-[#171e2e] text-slate-200 font-bold p-2.5 rounded-xl border border-slate-700/60 focus:outline-none focus:border-red-500"
              >
                <option value={3}>3 Meals / Day</option>
                <option value={4}>4 Meals / Day</option>
                <option value={5}>5 Meals / Day</option>
                <option value={6}>6 Meals / Day</option>
              </select>
            </div>
          </div>

          {/* Custom Macro Percentages Inputs */}
          <div className="space-y-2 pt-2 border-t border-slate-800">
            <span className="text-xs font-semibold text-slate-400 block">
              Macro Distribution Percentages (Protein / Carbs / Fats)
            </span>
            <div className="grid grid-cols-3 gap-4 text-xs">
              <div className="bg-[#171e2e] p-3 rounded-xl border border-slate-800 space-y-1">
                <span className="text-[10px] text-blue-400 font-bold uppercase">PROTEIN %</span>
                <input
                  type="number"
                  value={proteinPct}
                  onChange={(e) => setProteinPct(Number(e.target.value))}
                  className="w-full bg-slate-900 text-slate-100 font-mono font-bold p-2 rounded-lg border border-slate-700/50"
                />
                <span className="text-[10px] text-slate-500 block">Target: {targetProteinGrams}g</span>
              </div>

              <div className="bg-[#171e2e] p-3 rounded-xl border border-slate-800 space-y-1">
                <span className="text-[10px] text-sky-400 font-bold uppercase">CARBS %</span>
                <input
                  type="number"
                  value={carbPct}
                  onChange={(e) => setCarbPct(Number(e.target.value))}
                  className="w-full bg-slate-900 text-slate-100 font-mono font-bold p-2 rounded-lg border border-slate-700/50"
                />
                <span className="text-[10px] text-slate-500 block">Target: {targetCarbGrams}g</span>
              </div>

              <div className="bg-[#171e2e] p-3 rounded-xl border border-slate-800 space-y-1">
                <span className="text-[10px] text-amber-400 font-bold uppercase">FAT %</span>
                <input
                  type="number"
                  value={fatPct}
                  onChange={(e) => setFatPct(Number(e.target.value))}
                  className="w-full bg-slate-900 text-slate-100 font-mono font-bold p-2 rounded-lg border border-slate-700/50"
                />
                <span className="text-[10px] text-slate-500 block">Target: {targetFatGrams}g</span>
              </div>
            </div>
          </div>

          {/* Action Trigger Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-2">
            {onOpenNutritionPdf && (
              <button
                type="button"
                onClick={onOpenNutritionPdf}
                className="w-full sm:w-auto px-5 py-3 bg-[#171e2e] hover:bg-slate-800 text-slate-200 border border-slate-700/60 font-bold rounded-xl text-xs flex items-center justify-center gap-2 cursor-pointer transition-all shadow-md"
              >
                <FileText className="w-4 h-4 text-red-400" />
                <span>Export Program PDF</span>
              </button>
            )}

            <button
              onClick={handleGenerateAiPlan}
              disabled={isGenerating}
              className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-red-600 to-rose-500 hover:from-red-500 hover:to-rose-400 text-white font-bold rounded-xl text-xs shadow-lg shadow-red-600/20 flex items-center justify-center gap-2 cursor-pointer transition-all disabled:opacity-50"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Generating AI Template...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Generate AI Template</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Macro Telemetry Summary Bar (Matching Screenshot) */}
      <div className="bg-[#121724] border border-slate-800 rounded-2xl p-5 shadow-xl space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-2">
          <h3 className="font-serif-header text-sm font-bold text-slate-200 uppercase tracking-wider">
            AI Generated Plan Macro Summary
          </h3>
          <span className="text-xs font-bold text-emerald-400 bg-emerald-950/80 px-2.5 py-0.5 rounded-full border border-emerald-800/60 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" /> Near Target — Fully Editable
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          {/* Calories */}
          <div className="bg-[#171e2e] p-3 rounded-xl border border-slate-800">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">CALORIES</span>
            <div className="font-serif-header text-2xl font-extrabold text-white mt-1">
              {Math.round(calculatedMacros.kcal * 10) / 10}
            </div>
            <span className="text-[10px] text-slate-500 block mt-0.5">Target: {targetKcal} kcal</span>
          </div>

          {/* Protein */}
          <div className="bg-[#171e2e] p-3 rounded-xl border border-slate-800">
            <span className="text-[10px] text-blue-400 font-bold uppercase tracking-wider block">PROTEIN</span>
            <div className="font-serif-header text-2xl font-extrabold text-blue-300 mt-1">
              {Math.round(calculatedMacros.protein * 10) / 10}g
            </div>
            <span className="text-[10px] text-slate-500 block mt-0.5">Target: {targetProteinGrams}g</span>
          </div>

          {/* Carbs */}
          <div className="bg-[#171e2e] p-3 rounded-xl border border-slate-800">
            <span className="text-[10px] text-sky-400 font-bold uppercase tracking-wider block">CARBS</span>
            <div className="font-serif-header text-2xl font-extrabold text-sky-300 mt-1">
              {Math.round(calculatedMacros.carbs * 10) / 10}g
            </div>
            <span className="text-[10px] text-slate-500 block mt-0.5">Target: {targetCarbGrams}g</span>
          </div>

          {/* Fat */}
          <div className="bg-[#171e2e] p-3 rounded-xl border border-slate-800">
            <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider block">FATS</span>
            <div className="font-serif-header text-2xl font-extrabold text-amber-300 mt-1">
              {Math.round(calculatedMacros.fat * 10) / 10}g
            </div>
            <span className="text-[10px] text-slate-500 block mt-0.5">Target: {targetFatGrams}g</span>
          </div>
        </div>
      </div>

      {/* Generated Meal Cards Grid */}
      <div className="space-y-4">
        <h3 className="font-serif-header text-lg font-bold text-slate-100">
          Generated Meals Breakdown & Portion Adjuster
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {generatedMeals.map((meal, mealIdx) => {
            const mealTotalKcal = meal.items.reduce((sum, item) => sum + item.kcal, 0);
            const mealTotalP = meal.items.reduce((sum, item) => sum + item.p, 0);
            const mealTotalC = meal.items.reduce((sum, item) => sum + item.c, 0);
            const mealTotalF = meal.items.reduce((sum, item) => sum + item.f, 0);

            return (
              <div
                key={meal.id}
                className="bg-[#121724] border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-2.5">
                    <div>
                      <h4 className="text-sm font-bold text-slate-100">{meal.title}</h4>
                      <span className="text-[10px] text-slate-400 font-mono">{meal.time}</span>
                    </div>

                    <div className="text-left sm:text-right">
                      <span className="text-xs font-extrabold text-white block">{mealTotalKcal} kcal</span>
                      <span className="text-[10px] font-mono text-slate-400 whitespace-nowrap">
                        P: {Math.round(mealTotalP)}g • C: {Math.round(mealTotalC)}g • F: {Math.round(mealTotalF)}g
                      </span>
                    </div>
                  </div>

                  {/* Items List */}
                  <div className="space-y-2.5 text-xs">
                    {meal.items.map((item, itemIdx) => (
                      <div
                        key={itemIdx}
                        className="bg-[#171e2e] p-3 rounded-xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5"
                      >
                        <div className="space-y-1.5 min-w-0 flex-1">
                          <span className="font-bold text-slate-200 block truncate">{item.name}</span>
                          <div className="flex flex-wrap items-center gap-1.5 text-[10px] text-slate-400 font-mono">
                            <span className="font-bold text-slate-300">{item.kcal} kcal</span>
                            <span className="text-slate-600">•</span>
                            <span className="text-blue-400 bg-blue-950/80 px-1.5 py-0.5 rounded border border-blue-800/50">P: {item.p}g</span>
                            <span className="text-sky-400 bg-sky-950/80 px-1.5 py-0.5 rounded border border-sky-800/50">C: {item.c}g</span>
                            <span className="text-amber-400 bg-amber-950/80 px-1.5 py-0.5 rounded border border-amber-800/50">F: {item.f}g</span>
                          </div>
                        </div>

                        {/* Portion Grams Input */}
                        <div className="flex items-center justify-between sm:justify-end gap-2 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-800/80 shrink-0">
                          <div className="flex items-center gap-1.5">
                            <span className="text-[11px] text-slate-400 font-semibold sm:hidden">Portion:</span>
                            <input
                              type="number"
                              step="5"
                              value={item.portionGrams}
                              onChange={(e) => handleUpdateItemGram(mealIdx, itemIdx, e.target.value)}
                              className="w-16 bg-slate-900 text-slate-100 font-mono font-bold text-xs text-center p-1.5 rounded-lg border border-slate-700 focus:outline-none focus:border-red-500"
                            />
                            <span className="text-slate-400 text-xs font-mono">g</span>
                          </div>

                          <button
                            onClick={() => handleRemoveItem(mealIdx, itemIdx)}
                            className="p-1.5 text-slate-400 hover:text-red-400 rounded-lg hover:bg-slate-800 transition-colors"
                            title="Remove Food"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
