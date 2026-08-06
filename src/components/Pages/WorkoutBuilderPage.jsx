import React, { useState } from 'react';
import { 
  Play, 
  GripVertical, 
  Video, 
  Plus, 
  Save, 
  Trash2, 
  Check, 
  Pencil,
  Edit3,
  X
} from 'lucide-react';
import WatchVideoModal from '../Modals/WatchVideoModal';
import AddEditLibraryExerciseModal from '../Modals/AddEditLibraryExerciseModal';

export default function WorkoutBuilderPage({ showToast }) {
  // Category Filter State
  const [activeCategory, setActiveCategory] = useState('All');

  // Days Protocol State with editable label
  const [activeDayId, setActiveDayId] = useState('d1');
  const [days, setDays] = useState([
    { id: 'd1', label: 'Day 01: Pull' },
    { id: 'd2', label: 'Day 02: Push' },
    { id: 'd3', label: 'Day 03: Legs' },
  ]);

  // Library Exercises State
  const [libraryExercises, setLibraryExercises] = useState([
    {
      id: 'lib1',
      name: 'Barbell Bench Press',
      category: 'Chest',
      type: 'COMPOUND',
      image: '/bench_press.png',
      recommendation: 'Recommended: 3x8-10',
      videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    },
    {
      id: 'lib2',
      name: 'Lat Pulldowns',
      category: 'Back',
      type: 'ISOLATION',
      image: '/lat_pulldown.png',
      recommendation: 'Recommended: 4x12',
      videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    },
    {
      id: 'lib3',
      name: 'Goblet Squats',
      category: 'Legs',
      type: 'COMPOUND',
      image: '/goblet_squat.png',
      recommendation: 'Recommended: 3x15',
      videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    },
  ]);

  // Routine Exercises per Day State
  const [routineExercises, setRoutineExercises] = useState({
    d1: [
      {
        id: 'r1',
        num: 1,
        name: 'Pull Ups',
        superset: true,
        sets: '4',
        reps: '8-10',
        rest: '90',
        tempo: '3-0-1-0',
        notes: 'Focus on scapular retraction at the top. Add 2.5kg if 10 reps are hit comfortably.',
      },
      {
        id: 'r2',
        num: 2,
        name: 'Seated Row',
        superset: false,
        sets: '3',
        reps: '12',
        rest: '60',
        tempo: '2-0-2-0',
        notes: 'Controlled eccentric phase. Do not use momentum from lower back.',
      },
    ],
    d2: [
      {
        id: 'r3',
        num: 1,
        name: 'Barbell Bench Press',
        superset: false,
        sets: '4',
        reps: '8',
        rest: '120',
        tempo: '2-1-1-0',
        notes: 'Keep elbows tucked at 45 degrees. Touch lower sternum on each rep.',
      },
    ],
    d3: [
      {
        id: 'r4',
        num: 1,
        name: 'Goblet Squats',
        superset: false,
        sets: '3',
        reps: '15',
        rest: '90',
        tempo: '3-1-1-0',
        notes: 'Maintain upright torso. Drive knees out over toes.',
      },
    ],
  });

  // Modal States
  const [isWatchVideoOpen, setIsWatchVideoOpen] = useState(false);
  const [selectedVideoExercise, setSelectedVideoExercise] = useState(null);

  const [isAddEditLibraryOpen, setIsAddEditLibraryOpen] = useState(false);
  const [exerciseToEdit, setExerciseToEdit] = useState(null);

  // Editable day split handler
  const handleUpdateDayLabel = (id, newLabel) => {
    setDays((prev) =>
      prev.map((d) => (d.id === id ? { ...d, label: newLabel } : d))
    );
  };

  const handleDeleteDay = (id, e) => {
    e.stopPropagation();
    if (days.length <= 1) {
      if (showToast) showToast('At least one day split is required', 'warning');
      return;
    }
    setDays((prev) => {
      const updated = prev.filter((d) => d.id !== id);
      if (activeDayId === id) {
        setActiveDayId(updated[0]?.id || 'd1');
      }
      return updated;
    });
    if (showToast) showToast('Removed day split', 'info');
  };

  const handleUpdateLibraryName = (id, newName) => {
    setLibraryExercises((prev) =>
      prev.map((item) => (item.id === id ? { ...item, name: newName } : item))
    );
  };

  const handleSaveLibraryExercise = (savedItem) => {
    setLibraryExercises((prev) => {
      const exists = prev.some((item) => item.id === savedItem.id);
      if (exists) {
        return prev.map((item) => (item.id === savedItem.id ? savedItem : item));
      }
      return [...prev, savedItem];
    });

    if (showToast) showToast(`Saved exercise "${savedItem.name}" to Library`);
  };

  const handleWatchVideo = (exercise) => {
    setSelectedVideoExercise(exercise);
    setIsWatchVideoOpen(true);
  };

  const handleOpenAddLibrary = () => {
    setExerciseToEdit(null);
    setIsAddEditLibraryOpen(true);
  };

  const handleOpenEditLibrary = (item) => {
    setExerciseToEdit(item);
    setIsAddEditLibraryOpen(true);
  };

  const filteredLibrary = libraryExercises.filter((item) =>
    activeCategory === 'All' ? true : item.category === activeCategory
  );

  const activeRoutine = routineExercises[activeDayId] || [];

  const handleAddExerciseToRoutine = (exerciseName) => {
    const newEx = {
      id: Date.now().toString(),
      num: activeRoutine.length + 1,
      name: exerciseName,
      superset: false,
      sets: '3',
      reps: '10',
      rest: '60',
      tempo: '2-0-1-0',
      notes: 'Focus on smooth execution and controlled tempo.',
    };

    setRoutineExercises((prev) => ({
      ...prev,
      [activeDayId]: [...(prev[activeDayId] || []), newEx],
    }));

    if (showToast) showToast(`Added ${exerciseName} to ${days.find(d => d.id === activeDayId)?.label}`);
  };

  const handleUpdateExercise = (id, field, value) => {
    setRoutineExercises((prev) => ({
      ...prev,
      [activeDayId]: (prev[activeDayId] || []).map((ex) =>
        ex.id === id ? { ...ex, [field]: value } : ex
      ),
    }));
  };

  const handleDeleteRoutineItem = (id) => {
    setRoutineExercises((prev) => ({
      ...prev,
      [activeDayId]: (prev[activeDayId] || []).filter((ex) => ex.id !== id),
    }));
    if (showToast) showToast('Removed exercise from routine', 'info');
  };

  const handleAddDay = () => {
    const newDayNum = days.length + 1;
    const newDay = { id: `d${newDayNum}`, label: `Day 0${newDayNum}: Custom` };
    setDays((prev) => [...prev, newDay]);
    setActiveDayId(newDay.id);
    if (showToast) showToast(`Created ${newDay.label}`);
  };

  const handlePublishPlan = () => {
    if (showToast) showToast('Workout Plan published and assigned to clients!');
  };

  return (
    <div className="space-y-6">
      {/* Page Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif-header text-3xl font-bold text-white tracking-tight">
            Workout Builder Engine
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Build custom multi-day training splits, set tempos, supersets, and assign technique videos.
          </p>
        </div>
      </div>

      {/* Main 2-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Library Column (Col 5) */}
        <div className="lg:col-span-5 bg-[#121724] border border-slate-800/90 rounded-2xl p-5 shadow-xl space-y-5">
          <div className="flex items-center justify-between">
            <h2 className="font-serif-header text-xl font-semibold text-slate-100">
              Library
            </h2>

            {/* Add Exercise to Library Button */}
            <button
              onClick={handleOpenAddLibrary}
              className="flex items-center gap-1.5 py-1.5 px-3 bg-blue-600/30 hover:bg-blue-600/40 text-blue-200 border border-blue-500/40 text-xs font-bold rounded-xl transition-all cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Exercise</span>
            </button>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto bg-[#131926] p-1 rounded-xl border border-slate-800 text-xs font-semibold">
            {['All', 'Chest', 'Back', 'Legs', 'Arms', 'Shoulders', 'Core'].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1 rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                  activeCategory === cat
                    ? 'bg-blue-600/40 text-blue-200 border border-blue-500/40'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Library Cards Stack */}
          <div className="space-y-4">
            {filteredLibrary.map((item) => (
              <div
                key={item.id}
                className="bg-[#161c2a] border border-slate-700/60 rounded-xl p-4 space-y-3 group hover:border-blue-500/40 transition-all"
              >
                {/* Title & Video Trigger */}
                <div className="flex items-center justify-between gap-2">
                  <input
                    type="text"
                    value={item.name}
                    onChange={(e) => handleUpdateLibraryName(item.id, e.target.value)}
                    className="w-full text-xs font-bold text-slate-100 bg-[#111622] hover:bg-[#171e2e] focus:bg-[#171e2e] px-2 py-1 rounded-lg border border-slate-700/60 focus:border-blue-500 focus:outline-none transition-all"
                  />
                  <div className="flex items-center gap-1 shrink-0">
                    <button 
                      onClick={() => handleOpenEditLibrary(item)}
                      className="p-1 text-slate-400 hover:text-slate-200 transition-colors"
                      title="Edit Category & Video"
                    >
                      <Pencil className="w-3.5 h-3.5" />
                    </button>
                    <button 
                      onClick={() => handleWatchVideo(item)}
                      className="p-1 text-blue-400 hover:text-blue-300 transition-colors"
                      title="Watch Technique Video"
                    >
                      <Play className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[9px] font-extrabold tracking-wider uppercase px-2 py-0.5 rounded bg-blue-950 text-blue-300 border border-blue-800">
                    {item.category}
                  </span>
                  <span className="text-[9px] font-extrabold tracking-wider uppercase px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
                    {item.type}
                  </span>
                </div>

                {/* Demo Photo Preview */}
                <div 
                  onClick={() => handleAddExerciseToRoutine(item.name)}
                  className="h-32 rounded-xl overflow-hidden border border-slate-700/60 cursor-pointer relative group/img"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover/img:opacity-100 flex items-center justify-center transition-opacity">
                    <span className="text-xs font-bold text-white bg-blue-600 px-3 py-1.5 rounded-lg shadow-lg">
                      + Add to Day Routine
                    </span>
                  </div>
                </div>

                {/* Footer recommendation & Drag Handle */}
                <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                  <span>{item.recommendation}</span>
                  <button 
                    onClick={() => handleAddExerciseToRoutine(item.name)}
                    className="p-1 hover:text-slate-200 cursor-pointer"
                  >
                    <GripVertical className="w-4 h-4 text-slate-500" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Day Protocol Routine Builder Column (Col 7) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Top Bar: Days Tabs & Publish Plan Action */}
          <div className="bg-[#121724] border border-slate-800/90 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
            {/* Days Tabs (Editable Split Names!) */}
            <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto py-1">
              {days.map((d) => {
                const isActive = activeDayId === d.id;

                return (
                  <div
                    key={d.id}
                    onClick={() => setActiveDayId(d.id)}
                    className={`flex items-center gap-1.5 px-4 py-2.5 rounded-2xl border transition-all cursor-pointer group shrink-0 ${
                      isActive
                        ? 'bg-[#a3c2fe] text-slate-950 border-blue-300 font-extrabold shadow-md shadow-blue-500/20'
                        : 'bg-[#141a27] text-slate-200 border-slate-700/60 hover:bg-[#1a2233]'
                    }`}
                  >
                    <input
                      type="text"
                      value={d.label}
                      onChange={(e) => handleUpdateDayLabel(d.id, e.target.value)}
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveDayId(d.id);
                      }}
                      className={`text-xs font-bold text-center bg-transparent focus:outline-none focus:ring-1 focus:ring-blue-400/50 rounded px-1 transition-all ${
                        isActive ? 'text-slate-950 font-extrabold' : 'text-slate-100'
                      }`}
                      style={{ width: `${Math.max(d.label.length * 8, 80)}px` }}
                    />
                    {days.length > 1 && (
                      <button
                        onClick={(e) => handleDeleteDay(d.id, e)}
                        className={`p-0.5 rounded-full transition-colors opacity-0 group-hover:opacity-100 ${
                          isActive ? 'hover:bg-blue-300 text-slate-950' : 'hover:bg-slate-700 text-slate-400'
                        }`}
                        title="Delete Day Split"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                );
              })}

              <button
                onClick={handleAddDay}
                className="p-2.5 rounded-2xl bg-[#141a27] hover:bg-[#1a2233] border border-slate-700/60 text-slate-300 hover:text-white transition-all cursor-pointer shrink-0"
                title="Add Day Split"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
              <button
                onClick={() => showToast && showToast('Saved routine template', 'info')}
                className="p-2.5 bg-[#161c2a] hover:bg-[#1f283c] border border-slate-700 text-slate-300 rounded-xl transition-colors cursor-pointer"
                title="Save Template"
              >
                <Save className="w-4 h-4" />
              </button>

              <button
                onClick={handlePublishPlan}
                className="py-2.5 px-5 bg-[#a3c2fe] hover:bg-blue-300 text-slate-950 font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer"
              >
                Publish Plan
              </button>
            </div>
          </div>

          {/* Routine Exercises Stack */}
          <div className="space-y-4">
            {activeRoutine.map((ex) => (
              <div
                key={ex.id}
                className="bg-[#121724] border border-slate-800/90 rounded-2xl p-5 shadow-xl space-y-4 relative group"
              >
                {/* Exercise Item Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 flex-1 max-w-xs">
                    <span className="w-6 h-6 rounded-md bg-[#1d273a] text-slate-200 text-xs font-mono font-bold flex items-center justify-center border border-slate-700 shrink-0">
                      {ex.num}
                    </span>
                    <input
                      type="text"
                      value={ex.name}
                      onChange={(e) => handleUpdateExercise(ex.id, 'name', e.target.value)}
                      placeholder="Exercise Name"
                      className="w-full text-sm font-bold text-slate-100 bg-[#171e2e] hover:bg-[#1c2538] focus:bg-[#1c2538] px-2.5 py-1 rounded-lg border border-slate-700/60 focus:border-blue-500 focus:outline-none transition-all"
                    />
                    <button
                      onClick={() => handleWatchVideo(ex)}
                      className="p-1 text-slate-400 hover:text-blue-400 transition-colors shrink-0"
                      title="Watch Technique Video"
                    >
                      <Video className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Superset Toggle & Drag Handle */}
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-400 font-medium">Superset</span>
                      <button
                        onClick={() => handleUpdateExercise(ex.id, 'superset', !ex.superset)}
                        className={`w-9 h-5 rounded-full p-0.5 transition-colors cursor-pointer ${
                          ex.superset ? 'bg-blue-500' : 'bg-slate-700'
                        }`}
                      >
                        <div
                          className={`w-4 h-4 rounded-full bg-white transition-transform ${
                            ex.superset ? 'translate-x-4' : 'translate-x-0'
                          }`}
                        />
                      </button>
                    </div>

                    <button
                      onClick={() => handleDeleteRoutineItem(ex.id)}
                      className="text-slate-500 hover:text-red-400 transition-colors p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Inputs Grid (SETS, REPS, REST, TEMPO) */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 tracking-wider uppercase mb-1">
                      SETS
                    </label>
                    <input
                      type="text"
                      value={ex.sets}
                      onChange={(e) => handleUpdateExercise(ex.id, 'sets', e.target.value)}
                      className="w-full bg-[#171e2e] text-slate-100 font-mono text-center py-2 rounded-xl border border-slate-700/60 focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 tracking-wider uppercase mb-1">
                      REPS
                    </label>
                    <input
                      type="text"
                      value={ex.reps}
                      onChange={(e) => handleUpdateExercise(ex.id, 'reps', e.target.value)}
                      className="w-full bg-[#171e2e] text-slate-100 font-mono text-center py-2 rounded-xl border border-slate-700/60 focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 tracking-wider uppercase mb-1">
                      REST (SEC)
                    </label>
                    <input
                      type="text"
                      value={ex.rest}
                      onChange={(e) => handleUpdateExercise(ex.id, 'rest', e.target.value)}
                      className="w-full bg-[#171e2e] text-slate-100 font-mono text-center py-2 rounded-xl border border-slate-700/60 focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 tracking-wider uppercase mb-1">
                      TEMPO
                    </label>
                    <input
                      type="text"
                      value={ex.tempo}
                      onChange={(e) => handleUpdateExercise(ex.id, 'tempo', e.target.value)}
                      className="w-full bg-[#171e2e] text-slate-100 font-mono text-center py-2 rounded-xl border border-slate-700/60 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                {/* Coach Notes */}
                <div className="space-y-1">
                  <label className="block text-[10px] font-bold text-slate-400 tracking-wider uppercase">
                    PROGRESSION / COACH NOTES
                  </label>
                  <textarea
                    rows="2"
                    value={ex.notes}
                    onChange={(e) => handleUpdateExercise(ex.id, 'notes', e.target.value)}
                    className="w-full bg-[#171e2e] text-slate-200 text-xs p-3 rounded-xl border border-slate-700/60 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>
            ))}

            {/* Drop / Add Exercise Card */}
            <div
              onClick={() => handleAddExerciseToRoutine(libraryExercises[0].name)}
              className="border-2 border-dashed border-slate-800 hover:border-blue-500/60 rounded-2xl p-8 flex flex-col items-center justify-center gap-2 cursor-pointer transition-all group bg-[#0d111a]/50"
            >
              <div className="w-10 h-10 rounded-full bg-slate-800/60 flex items-center justify-center text-slate-400 group-hover:text-blue-300 transition-colors">
                <Plus className="w-5 h-5" />
              </div>
              <span className="text-xs font-semibold text-slate-400 group-hover:text-slate-200 transition-colors">
                Drag exercises from library to add to {days.find(d => d.id === activeDayId)?.label || 'Day'}
              </span>
            </div>
          </div>

          {/* Target Muscle Group Distribution Card */}
          <div className="bg-[#121724] border border-slate-800/90 rounded-2xl p-5 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800/80">
              <h3 className="font-serif-header text-sm font-semibold text-slate-100">
                Target Muscle Group Distribution
              </h3>
              <div className="flex items-center gap-4 text-[10px] font-bold">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded bg-blue-500" />
                  <span className="text-slate-400">MAJOR</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded bg-[#a3c2fe]" />
                  <span className="text-slate-400">SECONDARY</span>
                </div>
              </div>
            </div>

            {/* Muscle Distribution Metrics Grid */}
            <div className="grid grid-cols-6 gap-2 text-center text-[10px] font-bold tracking-wider text-slate-400 uppercase pt-2">
              <div>
                <div className="h-16 bg-[#171e2e] rounded-lg relative overflow-hidden flex items-end justify-center mb-2">
                  <div className="w-full bg-blue-500 h-[85%] rounded-t-md" />
                </div>
                <span>BACK</span>
              </div>
              <div>
                <div className="h-16 bg-[#171e2e] rounded-lg relative overflow-hidden flex items-end justify-center mb-2">
                  <div className="w-full bg-[#a3c2fe] h-[60%] rounded-t-md" />
                </div>
                <span>BICEPS</span>
              </div>
              <div>
                <div className="h-16 bg-[#171e2e] rounded-lg relative overflow-hidden flex items-end justify-center mb-2">
                  <div className="w-full bg-[#a3c2fe] h-[40%] rounded-t-md" />
                </div>
                <span>FOREARMS</span>
              </div>
              <div>
                <div className="h-16 bg-[#171e2e] rounded-lg relative overflow-hidden flex items-end justify-center mb-2">
                  <div className="w-full bg-[#a3c2fe] h-[30%] rounded-t-md" />
                </div>
                <span>CORE</span>
              </div>
              <div>
                <div className="h-16 bg-[#171e2e] rounded-lg relative overflow-hidden flex items-end justify-center mb-2">
                  <div className="w-full bg-slate-800 h-[0%]" />
                </div>
                <span>CHEST</span>
              </div>
              <div>
                <div className="h-16 bg-[#171e2e] rounded-lg relative overflow-hidden flex items-end justify-center mb-2">
                  <div className="w-full bg-slate-800 h-[0%]" />
                </div>
                <span>LEGS</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Video & Library Modals */}
      <WatchVideoModal
        isOpen={isWatchVideoOpen}
        onClose={() => setIsWatchVideoOpen(false)}
        exercise={selectedVideoExercise}
      />

      <AddEditLibraryExerciseModal
        isOpen={isAddEditLibraryOpen}
        onClose={() => setIsAddEditLibraryOpen(false)}
        onSave={handleSaveLibraryExercise}
        exerciseToEdit={exerciseToEdit}
      />
    </div>
  );
}
