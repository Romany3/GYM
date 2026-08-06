import React, { useState } from 'react';
import { X, Clock, Check } from 'lucide-react';

export default function SetHoursModal({ isOpen, onClose, onSave, showToast }) {
  const [startHour, setStartHour] = useState('08:00 AM');
  const [endHour, setEndHour] = useState('06:00 PM');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (showToast) showToast(`Set working hours to ${startHour} - ${endHour}`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
      <div className="bg-[#121724] border border-slate-800 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between p-5 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <Clock className="w-5 h-5 text-blue-400" />
            <div>
              <h3 className="font-serif-header text-lg font-semibold text-slate-100">
                Set Available Working Hours
              </h3>
              <p className="text-xs text-slate-400">Configure daily facility availability windows</p>
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
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Start Time</label>
              <select
                value={startHour}
                onChange={(e) => setStartHour(e.target.value)}
                className="w-full bg-[#171e2e] text-slate-200 text-xs rounded-xl p-2.5 border border-slate-700/60"
              >
                <option value="06:00 AM">06:00 AM</option>
                <option value="07:00 AM">07:00 AM</option>
                <option value="08:00 AM">08:00 AM</option>
                <option value="09:00 AM">09:00 AM</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">End Time</label>
              <select
                value={endHour}
                onChange={(e) => setEndHour(e.target.value)}
                className="w-full bg-[#171e2e] text-slate-200 text-xs rounded-xl p-2.5 border border-slate-700/60"
              >
                <option value="04:00 PM">04:00 PM</option>
                <option value="05:00 PM">05:00 PM</option>
                <option value="06:00 PM">06:00 PM</option>
                <option value="08:00 PM">08:00 PM</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-[#a3c2fe] hover:bg-blue-300 text-slate-950 font-bold text-xs rounded-xl transition-all cursor-pointer shadow-md flex items-center justify-center gap-2"
          >
            <Check className="w-4 h-4" /> Save Hours
          </button>
        </form>
      </div>
    </div>
  );
}
