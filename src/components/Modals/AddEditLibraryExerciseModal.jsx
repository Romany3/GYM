import React, { useState, useEffect } from 'react';
import { X, Dumbbell, Video, Plus, Check } from 'lucide-react';

export default function AddEditLibraryExerciseModal({ 
  isOpen, 
  onClose, 
  onSave, 
  exerciseToEdit 
}) {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Chest');
  const [type, setType] = useState('COMPOUND');
  const [videoUrl, setVideoUrl] = useState('');
  const [recommendation, setRecommendation] = useState('Recommended: 3x10');
  const [image, setImage] = useState('/bench_press.png');

  useEffect(() => {
    if (exerciseToEdit) {
      setName(exerciseToEdit.name || '');
      setCategory(exerciseToEdit.category || 'Chest');
      setType(exerciseToEdit.type || 'COMPOUND');
      setVideoUrl(exerciseToEdit.videoUrl || '');
      setRecommendation(exerciseToEdit.recommendation || 'Recommended: 3x10');
      setImage(exerciseToEdit.image || '/bench_press.png');
    } else {
      setName('');
      setCategory('Chest');
      setType('COMPOUND');
      setVideoUrl('https://www.w3schools.com/html/mov_bbb.mp4');
      setRecommendation('Recommended: 3x10');
      setImage('/bench_press.png');
    }
  }, [exerciseToEdit, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    onSave({
      id: exerciseToEdit ? exerciseToEdit.id : Date.now().toString(),
      name,
      category,
      type,
      videoUrl: videoUrl || 'https://www.w3schools.com/html/mov_bbb.mp4',
      recommendation: recommendation || 'Recommended: 3x10',
      image: image || '/bench_press.png',
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
      <div className="bg-[#121724] border border-slate-800 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between p-5 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <Dumbbell className="w-5 h-5 text-blue-400" />
            <div>
              <h3 className="font-serif-header text-lg font-semibold text-slate-100">
                {exerciseToEdit ? 'Edit Exercise & Video' : 'Add New Exercise to Library'}
              </h3>
              <p className="text-xs text-slate-400">Configure muscle category and technique video link</p>
            </div>
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
            <label className="block text-xs font-semibold text-slate-300 mb-1">Exercise Title</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Incline Dumbbell Press"
              className="w-full bg-[#171e2e] text-slate-200 text-xs rounded-xl px-3.5 py-2.5 border border-slate-700/60 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Muscle Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-[#171e2e] text-slate-200 text-xs rounded-xl px-3 py-2.5 border border-slate-700/60 focus:outline-none focus:border-blue-500 cursor-pointer"
              >
                <option value="Chest">Chest</option>
                <option value="Back">Back</option>
                <option value="Legs">Legs</option>
                <option value="Arms">Arms</option>
                <option value="Shoulders">Shoulders</option>
                <option value="Core">Core</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Type</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full bg-[#171e2e] text-slate-200 text-xs rounded-xl px-3 py-2.5 border border-slate-700/60 focus:outline-none focus:border-blue-500 cursor-pointer"
              >
                <option value="COMPOUND">COMPOUND</option>
                <option value="ISOLATION">ISOLATION</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Demonstration Video Link (URL)</label>
            <div className="relative">
              <Video className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="url"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                placeholder="https://example.com/video.mp4"
                className="w-full bg-[#171e2e] text-slate-200 text-xs rounded-xl pl-10 pr-3.5 py-2.5 border border-slate-700/60 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Recommended Sets & Reps</label>
            <input
              type="text"
              value={recommendation}
              onChange={(e) => setRecommendation(e.target.value)}
              placeholder="Recommended: 3x8-10"
              className="w-full bg-[#171e2e] text-slate-200 text-xs rounded-xl px-3.5 py-2.5 border border-slate-700/60 focus:outline-none focus:border-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-blue-500 hover:bg-blue-600 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md shadow-blue-500/20 mt-2"
          >
            <Check className="w-4 h-4" />
            <span>{exerciseToEdit ? 'Save Changes' : 'Add to Library'}</span>
          </button>
        </form>
      </div>
    </div>
  );
}
