import React, { useState } from 'react';
import { X, Dumbbell, Activity } from 'lucide-react';

export default function AddExerciseModal({ isOpen, onClose, onAdd }) {
  const [category, setCategory] = useState('STRENGTH');
  const [name, setName] = useState('');
  const [detail, setDetail] = useState('');
  const [burnKcal, setBurnKcal] = useState(300);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    onAdd({
      id: Date.now().toString(),
      category,
      name,
      detail: detail || 'Custom workout',
      burnKcal: Number(burnKcal),
    });
    setName('');
    setDetail('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
      <div className="bg-[#121724] border border-slate-800 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between p-5 border-b border-slate-800">
          <div>
            <h3 className="font-serif-header text-lg font-semibold text-slate-100">
              Add Exercise Routine
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">Log strength or cardio workouts for the client</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-200 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2">Category</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setCategory('STRENGTH')}
                className={`py-2.5 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                  category === 'STRENGTH'
                    ? 'bg-blue-600/30 border-blue-500 text-blue-200'
                    : 'bg-[#171e2e] border-slate-700 text-slate-400'
                }`}
              >
                <Dumbbell className="w-4 h-4" /> STRENGTH
              </button>
              <button
                type="button"
                onClick={() => setCategory('CARDIO')}
                className={`py-2.5 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                  category === 'CARDIO'
                    ? 'bg-blue-600/30 border-blue-500 text-blue-200'
                    : 'bg-[#171e2e] border-slate-700 text-slate-400'
                }`}
              >
                <Activity className="w-4 h-4" /> CARDIO
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Exercise Title</label>
            <input
              type="text"
              required
              placeholder="e.g. Upper Body Power or Incline Treadmill"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-[#171e2e] text-slate-200 text-xs rounded-xl px-3.5 py-2.5 border border-slate-700/60 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Details / Duration</label>
            <input
              type="text"
              placeholder="e.g. 45 Mins, 4 sets x 10 reps"
              value={detail}
              onChange={(e) => setDetail(e.target.value)}
              className="w-full bg-[#171e2e] text-slate-200 text-xs rounded-xl px-3.5 py-2.5 border border-slate-700/60 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Estimated Burn (kcal)</label>
            <input
              type="number"
              value={burnKcal}
              onChange={(e) => setBurnKcal(e.target.value)}
              className="w-full bg-[#171e2e] text-slate-200 text-xs rounded-xl px-3.5 py-2.5 border border-slate-700/60 focus:outline-none focus:border-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-blue-500 hover:bg-blue-600 text-white text-xs font-bold rounded-xl transition-all shadow-md shadow-blue-500/20 mt-2"
          >
            Add Exercise
          </button>
        </form>
      </div>
    </div>
  );
}
