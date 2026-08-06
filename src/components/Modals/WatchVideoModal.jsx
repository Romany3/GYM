import React from 'react';
import { X, Play, Dumbbell } from 'lucide-react';

export default function WatchVideoModal({ isOpen, onClose, exercise }) {
  if (!isOpen || !exercise) return null;

  // Default demonstration video URL if none provided
  const videoUrl = exercise.videoUrl || 'https://www.w3schools.com/html/mov_bbb.mp4';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
      <div className="bg-[#121724] border border-slate-800 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-950/80 border border-blue-800 flex items-center justify-center text-blue-400">
              <Dumbbell className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif-header text-lg font-bold text-slate-100">
                {exercise.name}
              </h3>
              <div className="flex items-center gap-2 text-[10px] mt-0.5">
                <span className="bg-blue-950 text-blue-300 font-bold px-2 py-0.5 rounded uppercase border border-blue-800">
                  {exercise.category || 'Chest'}
                </span>
                <span className="text-slate-400">Technique Video Demo</span>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-200 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Video Player Container */}
        <div className="p-5 space-y-4">
          <div className="aspect-video bg-black rounded-xl overflow-hidden border border-slate-700/60 relative flex items-center justify-center">
            <video
              src={videoUrl}
              controls
              autoPlay
              className="w-full h-full object-cover"
            >
              Your browser does not support video playback.
            </video>
          </div>

          <div className="bg-[#161c2a] border border-slate-700/60 rounded-xl p-3.5 text-xs space-y-1">
            <span className="font-bold text-slate-200 block">Coach Coaching Tip:</span>
            <p className="text-slate-400">
              Maintain strict form through full range of motion. Control the eccentric phase for optimal muscle fiber recruitment.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
