import React, { useState } from 'react';
import { 
  Apple, 
  Search, 
  Plus, 
  Filter, 
  Flame, 
  Wheat, 
  Droplet, 
  Egg,
  Utensils,
  X,
  CheckCircle2,
  Tag
} from 'lucide-react';

export default function FoodLibraryPage({ showToast }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [isAddFoodOpen, setIsAddFoodOpen] = useState(false);

  // New Food Form State
  const [newFoodName, setNewFoodName] = useState('');
  const [newFoodCategory, setNewFoodCategory] = useState('Protein Sources');
  const [newFoodKcal, setNewFoodKcal] = useState(165);
  const [newFoodProtein, setNewFoodProtein] = useState(31);
  const [newFoodCarbs, setNewFoodCarbs] = useState(0);
  const [newFoodFats, setNewFoodFats] = useState(3.6);
  const [newFoodTiming, setNewFoodTiming] = useState('Lunch/Dinner');

  // Pre-loaded Calibrated Food Database (Per 100g)
  const [foodItems, setFoodItems] = useState([
    { id: 'f1', name: 'Chicken Breast (Raw / Skinless)', category: 'Protein Sources', kcal: 165, protein: 31, carbs: 0, fats: 3.6, timing: 'Lunch/Dinner' },
    { id: 'f2', name: 'Egg White (Boiled)', category: 'Protein Sources', kcal: 52, protein: 11, carbs: 0.7, fats: 0.2, timing: 'Breakfast/Snack' },
    { id: 'f3', name: 'Whole Eggs (Large)', category: 'Protein Sources', kcal: 155, protein: 13, carbs: 1.1, fats: 11, timing: 'Breakfast' },
    { id: 'f4', name: 'Salmon Filet (Raw)', category: 'Protein Sources', kcal: 208, protein: 20, carbs: 0, fats: 13, timing: 'Lunch/Dinner' },
    { id: 'f5', name: 'Egyptian Lean Beef (90/10)', category: 'Protein Sources', kcal: 176, protein: 26, carbs: 0, fats: 8, timing: 'Lunch/Dinner' },
    { id: 'f6', name: 'Cottage Cheese (Jebna Arish)', category: 'Protein Sources', kcal: 98, protein: 11, carbs: 3.4, fats: 4.3, timing: 'Breakfast/Snack' },
    { id: 'f7', name: 'Whey Protein Isolate (Powder)', category: 'Protein Sources', kcal: 370, protein: 88, carbs: 2.5, fats: 1.2, timing: 'Snack' },
    
    { id: 'f8', name: 'White Rice (Cooked)', category: 'Carbs & Grains', kcal: 130, protein: 2.7, carbs: 28, fats: 0.3, timing: 'Lunch/Dinner' },
    { id: 'f9', name: 'Brown Rice (Cooked)', category: 'Carbs & Grains', kcal: 111, protein: 2.6, carbs: 23, fats: 0.9, timing: 'Lunch/Dinner' },
    { id: 'f10', name: 'Rolled Oats (Dry)', category: 'Carbs & Grains', kcal: 389, protein: 16.9, carbs: 66, fats: 6.9, timing: 'Breakfast' },
    { id: 'f11', name: 'Sweet Potato (Baked)', category: 'Carbs & Grains', kcal: 90, protein: 2, carbs: 21, fats: 0.2, timing: 'Lunch/Dinner' },
    { id: 'f12', name: 'Egyptian Whole Wheat Baladi Bread', category: 'Carbs & Grains', kcal: 247, protein: 9, carbs: 50, fats: 1.5, timing: 'Breakfast/Lunch' },
    
    { id: 'f13', name: 'Raw Almonds', category: 'Fats & Nuts', kcal: 579, protein: 21, carbs: 22, fats: 50, timing: 'Snack' },
    { id: 'f14', name: 'Extra Virgin Olive Oil', category: 'Fats & Nuts', kcal: 884, protein: 0, carbs: 0, fats: 100, timing: 'All Meals' },
    { id: 'f15', name: 'Natural Peanut Butter', category: 'Fats & Nuts', kcal: 588, protein: 25, carbs: 20, fats: 50, timing: 'Snack' },
    { id: 'f16', name: 'Avocado', category: 'Fats & Nuts', kcal: 160, protein: 2, carbs: 8.5, fats: 15, timing: 'Breakfast/Lunch' },

    { id: 'f17', name: 'Fresh Banana', category: 'Fruits & Vegetables', kcal: 89, protein: 1.1, carbs: 23, fats: 0.3, timing: 'Pre-Workout/Breakfast' },
    { id: 'f18', name: 'Green Apples', category: 'Fruits & Vegetables', kcal: 52, protein: 0.3, carbs: 14, fats: 0.2, timing: 'Snack' },
    { id: 'f19', name: 'Raw Spinach', category: 'Fruits & Vegetables', kcal: 23, protein: 2.9, carbs: 3.6, fats: 0.4, timing: 'All Meals' },
    { id: 'f20', name: 'Broccoli (Steamed)', category: 'Fruits & Vegetables', kcal: 35, protein: 2.4, carbs: 7.2, fats: 0.4, timing: 'Lunch/Dinner' },
  ]);

  const categories = ['All', 'Protein Sources', 'Carbs & Grains', 'Fats & Nuts', 'Fruits & Vegetables'];

  const filteredFoods = foodItems.filter((food) => {
    const matchesSearch = food.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'All' || food.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAddFood = (e) => {
    e.preventDefault();
    if (!newFoodName.trim()) return;
    const newItem = {
      id: Date.now().toString(),
      name: newFoodName.trim(),
      category: newFoodCategory,
      kcal: Number(newFoodKcal),
      protein: Number(newFoodProtein),
      carbs: Number(newFoodCarbs),
      fats: Number(newFoodFats),
      timing: newFoodTiming,
    };
    setFoodItems((prev) => [newItem, ...prev]);
    setIsAddFoodOpen(false);
    setNewFoodName('');
    if (showToast) showToast(`Added "${newItem.name}" to Master Food Library!`);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950 px-2.5 py-0.5 rounded border border-emerald-800/60 uppercase tracking-widest">
              NUTRITION ENGINE DATABASE
            </span>
            <span className="text-xs text-slate-400 font-mono">{foodItems.length} Verified Items</span>
          </div>
          <h1 className="font-serif-header text-3xl font-bold text-white tracking-tight mt-1">
            Master Food Library
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Calibrated macronutrient database per 100g for building custom meal plans.
          </p>
        </div>

        {/* Top Header Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsAddFoodOpen(true)}
            className="flex items-center gap-2 py-2.5 px-4 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold text-xs rounded-xl shadow-lg transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Custom Food Item</span>
          </button>
        </div>
      </div>

      {/* Search & Category Filter Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#121724] border border-slate-800 p-4 rounded-2xl shadow-lg">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search foods by name (e.g. Chicken, Oats, Almonds)..."
            className="w-full bg-[#171e2e] text-slate-200 text-xs rounded-xl pl-10 pr-3.5 py-2.5 border border-slate-700/60 focus:outline-none focus:border-emerald-500"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto bg-[#171e2e] p-1 rounded-xl border border-slate-800 text-xs font-semibold scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-all ${
                activeCategory === cat
                  ? 'bg-emerald-500 text-slate-950 font-bold shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Foods Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredFoods.map((item) => (
          <div
            key={item.id}
            className="bg-[#121724] border border-slate-800/90 hover:border-emerald-500/40 rounded-2xl p-4 shadow-lg flex flex-col justify-between space-y-4 transition-all group"
          >
            <div>
              <div className="flex items-start justify-between gap-2 mb-2">
                <span className="text-[10px] font-bold text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800 truncate">
                  {item.category}
                </span>
                <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800/60 shrink-0">
                  {item.timing}
                </span>
              </div>
              <h3 className="font-bold text-sm text-slate-100 group-hover:text-emerald-300 transition-colors line-clamp-2">
                {item.name}
              </h3>
            </div>

            {/* Per 100g Macro Grid */}
            <div className="space-y-2 pt-2 border-t border-slate-800/80">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400 flex items-center gap-1 font-semibold">
                  <Flame className="w-3.5 h-3.5 text-amber-400" /> Calories:
                </span>
                <span className="font-bold text-slate-100 font-mono">{item.kcal} kcal</span>
              </div>

              <div className="grid grid-cols-3 gap-1.5 text-[11px] font-semibold pt-1">
                <div className="p-1.5 bg-[#171e2e] rounded-lg border border-slate-800 text-center">
                  <span className="text-[9px] text-blue-400 block font-bold">PROTEIN</span>
                  <span className="text-slate-200 font-mono font-bold">{item.protein}g</span>
                </div>
                <div className="p-1.5 bg-[#171e2e] rounded-lg border border-slate-800 text-center">
                  <span className="text-[9px] text-sky-400 block font-bold">CARBS</span>
                  <span className="text-slate-200 font-mono font-bold">{item.carbs}g</span>
                </div>
                <div className="p-1.5 bg-[#171e2e] rounded-lg border border-slate-800 text-center">
                  <span className="text-[9px] text-indigo-400 block font-bold">FATS</span>
                  <span className="text-slate-200 font-mono font-bold">{item.fats}g</span>
                </div>
              </div>
              <p className="text-[10px] text-slate-500 text-center pt-0.5">Values calculated per 100g portion</p>
            </div>
          </div>
        ))}
      </div>

      {/* Add Custom Food Modal */}
      {isAddFoodOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-[#121724] border border-slate-800 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-5 border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <Apple className="w-5 h-5 text-emerald-400" />
                <div>
                  <h3 className="font-serif-header text-lg font-semibold text-slate-100">
                    Add Custom Food Item
                  </h3>
                  <p className="text-xs text-slate-400">Calibrate macros per 100g portion</p>
                </div>
              </div>
              <button
                onClick={() => setIsAddFoodOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-200 rounded-lg hover:bg-slate-800 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddFood} className="p-5 space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Food Item Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Quinoa (Cooked) or Tuna Filet"
                  value={newFoodName}
                  onChange={(e) => setNewFoodName(e.target.value)}
                  className="w-full bg-[#171e2e] text-slate-200 rounded-xl px-3.5 py-2.5 border border-slate-700/60 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Category</label>
                  <select
                    value={newFoodCategory}
                    onChange={(e) => setNewFoodCategory(e.target.value)}
                    className="w-full bg-[#171e2e] text-slate-200 rounded-xl px-3.5 py-2.5 border border-slate-700/60"
                  >
                    <option value="Protein Sources">Protein Sources</option>
                    <option value="Carbs & Grains">Carbs & Grains</option>
                    <option value="Fats & Nuts">Fats & Nuts</option>
                    <option value="Fruits & Vegetables">Fruits & Vegetables</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Meal Timing Tag</label>
                  <select
                    value={newFoodTiming}
                    onChange={(e) => setNewFoodTiming(e.target.value)}
                    className="w-full bg-[#171e2e] text-slate-200 rounded-xl px-3.5 py-2.5 border border-slate-700/60"
                  >
                    <option value="Breakfast">Breakfast</option>
                    <option value="Lunch/Dinner">Lunch/Dinner</option>
                    <option value="Snack">Snack</option>
                    <option value="All Meals">All Meals</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Calories (kcal per 100g)</label>
                  <input
                    type="number"
                    value={newFoodKcal}
                    onChange={(e) => setNewFoodKcal(e.target.value)}
                    className="w-full bg-[#171e2e] text-slate-200 rounded-xl px-3.5 py-2.5 border border-slate-700/60"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Protein (g per 100g)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={newFoodProtein}
                    onChange={(e) => setNewFoodProtein(e.target.value)}
                    className="w-full bg-[#171e2e] text-slate-200 rounded-xl px-3.5 py-2.5 border border-slate-700/60"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Carbs (g per 100g)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={newFoodCarbs}
                    onChange={(e) => setNewFoodCarbs(e.target.value)}
                    className="w-full bg-[#171e2e] text-slate-200 rounded-xl px-3.5 py-2.5 border border-slate-700/60"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Fats (g per 100g)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={newFoodFats}
                    onChange={(e) => setNewFoodFats(e.target.value)}
                    className="w-full bg-[#171e2e] text-slate-200 rounded-xl px-3.5 py-2.5 border border-slate-700/60"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold rounded-xl shadow-md transition-all mt-2 cursor-pointer"
              >
                Save Food to Master Library
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
