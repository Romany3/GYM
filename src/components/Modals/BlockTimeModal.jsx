import React, { useState } from 'react';
import { X, Slash, Check } from 'lucide-react';

export default function BlockTimeModal({ isOpen, onClose, showToast }) {
  const [reason, setReason] = useState('Personal / Admin Work');
  const [day, setDay] = useState('MON 16');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (showToast) showToast(`Blocked time slot on ${day} for "${reason}"`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
      <div className="bg-[#121724] border border-slate-800 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between p-5 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <Slash className="w-5 h-5 text-slate-400" />
            <div>
              <h3 className="font-serif-header text-lg font-semibold text-slate-100">
                Block Out Schedule Time
              </h3>
              <p className="text-xs text-slate-400">Reserve non-booking periods or facility maintenance</p>
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
            <label className="block text-xs font-semibold text-slate-300 mb-1">Select Day</label>
            <select
              value={day}
              onChange={(e) => setDay(e.target.value)}
              className="w-full bg-[#171e2e] text-slate-200 text-xs rounded-xl p-2.5 border border-slate-700/60"
            >
              <option value="MON 16">MON 16</option>
              <option value="TUE 17">TUE 17</option>
              <option value="WED 18">WED 18</option>
              <option value="THU 19">THU 19</option>
              <option value="FRI 20">FRI 20</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Block Reason</label>
            <input
              type="text"
              required
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="e.g. Facility Maintenance, Staff Training..."
              className="w-full bg-[#171e2e] text-slate-200 text-xs rounded-xl p-2.5 border border-slate-700/60"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold text-xs rounded-xl transition-all cursor-pointer shadow-md flex items-center justify-center gap-2"
          >
            <Check className="w-4 h-4" /> Confirm Block
          </button>
        </form>
      </div>
    </div>
  );
}
