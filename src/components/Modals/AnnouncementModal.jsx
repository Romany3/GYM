import React, { useState } from 'react';
import { X, Megaphone, Send } from 'lucide-react';

export default function AnnouncementModal({ isOpen, onClose, showToast }) {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    if (showToast) showToast('Broadcast announcement sent to 128 active clients!');
    setSubject('');
    setMessage('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
      <div className="bg-[#121724] border border-slate-800 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between p-5 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <Megaphone className="w-5 h-5 text-blue-400" />
            <div>
              <h3 className="font-serif-header text-lg font-semibold text-slate-100">
                Send Client Announcement
              </h3>
              <p className="text-xs text-slate-400">Broadcast message to all 128 active clients</p>
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
            <label className="block text-xs font-semibold text-slate-300 mb-1">Subject Title</label>
            <input
              type="text"
              required
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="e.g. New Mobility Routines & Holiday Schedule"
              className="w-full bg-[#171e2e] text-slate-200 text-xs rounded-xl px-3.5 py-2.5 border border-slate-700/60 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Announcement Message</label>
            <textarea
              required
              rows="4"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your broadcast message to all active clients..."
              className="w-full bg-[#171e2e] text-slate-200 text-xs rounded-xl p-3.5 border border-slate-700/60 focus:outline-none focus:border-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-blue-500 hover:bg-blue-600 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md shadow-blue-500/20"
          >
            <Send className="w-4 h-4" />
            <span>Send Announcement</span>
          </button>
        </form>
      </div>
    </div>
  );
}
