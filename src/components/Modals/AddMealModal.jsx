import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { X, Plus, Search } from 'lucide-react';

const PRESET_FOODS = [
  { name: 'Oatmeal with Berries & Whey', serving: '1 bowl (80g oats, 30g whey)', protein: 32, carbs: 54, fats: 6, kcal: 400 },
  { name: 'Greek Yogurt & Honey', serving: '200g yogurt, 15g honey', protein: 20, carbs: 24, fats: 4, kcal: 210 },
  { name: 'Avocado Toast with Eggs', serving: '2 slices sourdough, 1/2 avocado, 2 eggs', protein: 18, carbs: 32, fats: 20, kcal: 380 },
  { name: 'Chicken Breast & Brown Rice', serving: '200g chicken, 150g cooked rice', protein: 46, carbs: 42, fats: 5, kcal: 400 },
  { name: 'Protein Shake (Whey + Almond Milk)', serving: '1 scoop whey, 250ml almond milk', protein: 25, carbs: 3, fats: 3, kcal: 140 },
  { name: 'Ribeye Steak & Sweet Potato', serving: '220g steak, 180g sweet potato', protein: 52, carbs: 38, fats: 24, kcal: 580 },
  { name: 'Tuna Salad Wrap', serving: '1 whole wheat wrap, 150g tuna, light mayo', protein: 35, carbs: 28, fats: 10, kcal: 340 }
];

export default function AddMealModal({ isOpen, onClose, onAdd, mealCategory }) {
  const { t } = useTranslation();
  const [search, setSearch] = useState('');
  const [customName, setCustomName] = useState('');
  const [customServing, setCustomServing] = useState('');
  const [protein, setProtein] = useState(25);
  const [carbs, setCarbs] = useState(30);
  const [fats, setFats] = useState(8);

  if (!isOpen) return null;

  const filteredPresets = PRESET_FOODS.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleAddPreset = (preset) => {
    const mealId = `preset_${preset.name.replace(/\s+/g, '_').toLowerCase()}`;
    onAdd(mealCategory, {
      id: mealId,
      name: preset.name,
      description: preset.serving,
      protein: preset.protein,
      carbs: preset.carbs,
      fats: preset.fats,
      kcal: preset.kcal,
    });
    onClose();
  };

  const handleAddCustom = (e) => {
    e.preventDefault();
    if (!customName.trim()) return;
    const p = Number(protein) || 0;
    const c = Number(carbs) || 0;
    const f = Number(fats) || 0;
    const computedKcal = p * 4 + c * 4 + f * 9;
    onAdd(mealCategory, {
      id: Date.now().toString(),
      name: customName,
      description: customServing || 'Custom portion',
      protein: p,
      carbs: c,
      fats: f,
      kcal: computedKcal,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
      <div className="bg-[#121724] border border-slate-800 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-800">
          <div>
            <h3 className="font-serif-header text-lg font-semibold text-slate-100">
              {t('modals.addMeal.title')} (<span className="uppercase text-blue-400">{mealCategory}</span>)
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">Select from library or add custom food macros</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-200 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Preset Search */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2">
              {t('foodLibrary.searchFood')}
            </label>
            <div className="relative mb-3">
              <Search className="absolute start-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={t('common.search')}
                className="w-full bg-[#171e2e] text-slate-200 text-xs rounded-xl ps-10 pe-4 py-2.5 border border-slate-700/60 focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* Presets List */}
            <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
              {filteredPresets.map((preset, idx) => (
                <div
                  key={idx}
                  onClick={() => handleAddPreset(preset)}
                  className="bg-[#171e2e] hover:bg-slate-800 border border-slate-700/50 rounded-xl p-3 flex items-center justify-between cursor-pointer transition-all"
                >
                  <div>
                    <h4 className="text-xs font-semibold text-slate-200">{preset.name}</h4>
                    <span className="text-[11px] text-slate-400">{preset.serving}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold text-blue-300">{preset.kcal} kcal</span>
                    <Plus className="w-4 h-4 text-blue-400" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative flex py-1 items-center">
            <div className="flex-grow border-t border-slate-800"></div>
            <span className="flex-shrink mx-4 text-xs font-semibold text-slate-500 uppercase">Or Add Custom Item</span>
            <div className="flex-grow border-t border-slate-800"></div>
          </div>

          {/* Custom Form */}
          <form onSubmit={handleAddCustom} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Item Name</label>
              <input
                type="text"
                required
                value={customName}
                onChange={(e) => setCustomName(e.target.value)}
                placeholder="e.g. Protein Pancake"
                className="w-full bg-[#171e2e] text-slate-200 text-xs rounded-xl px-3.5 py-2.5 border border-slate-700/60 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Serving / Portion Description</label>
              <input
                type="text"
                value={customServing}
                onChange={(e) => setCustomServing(e.target.value)}
                placeholder="e.g. 2 pancakes with maple syrup"
                className="w-full bg-[#171e2e] text-slate-200 text-xs rounded-xl px-3.5 py-2.5 border border-slate-700/60 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-semibold text-blue-400 mb-1">Protein (g)</label>
                <input
                  type="number"
                  value={protein}
                  onChange={(e) => setProtein(e.target.value)}
                  className="w-full bg-[#171e2e] text-slate-200 text-xs rounded-xl px-3 py-2 border border-slate-700/60"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-sky-400 mb-1">Carbs (g)</label>
                <input
                  type="number"
                  value={carbs}
                  onChange={(e) => setCarbs(e.target.value)}
                  className="w-full bg-[#171e2e] text-slate-200 text-xs rounded-xl px-3 py-2 border border-slate-700/60"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-indigo-400 mb-1">Fats (g)</label>
                <input
                  type="number"
                  value={fats}
                  onChange={(e) => setFats(e.target.value)}
                  className="w-full bg-[#171e2e] text-slate-200 text-xs rounded-xl px-3 py-2 border border-slate-700/60"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-blue-500 hover:bg-blue-600 text-white text-xs font-bold rounded-xl transition-all shadow-md shadow-blue-500/20"
            >
              Add Custom Food Item
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
