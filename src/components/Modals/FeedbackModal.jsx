import { useState } from 'react';
import { X, MessageSquare, Send } from 'lucide-react';

export default function FeedbackModal({ isOpen, onClose, onSubmitFeedback, clientName }) {
  const [note, setNote] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!note.trim()) return;
    onSubmitFeedback(note);
    setNote('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
      <div className="bg-[#121724] border border-slate-800 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between p-5 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <MessageSquare className="w-5 h-5 text-blue-400" />
            <div>
              <h3 className="font-serif-header text-lg font-semibold text-slate-100">
                Send Feedback to {clientName}
              </h3>
              <p className="text-xs text-slate-400">Direct coach feedback on daily food log</p>
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
            <label className="block text-xs font-semibold text-slate-300 mb-1">Feedback Note / Recommendation</label>
            <textarea
              required
              rows="4"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="e.g. Great job hitting protein target! Let's swap the afternoon sugary latte for a green tea tomorrow."
              className="w-full bg-[#171e2e] text-slate-200 text-xs rounded-xl p-3.5 border border-slate-700/60 focus:outline-none focus:border-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-blue-500 hover:bg-blue-600 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-all shadow-md shadow-blue-500/20"
          >
            <Send className="w-4 h-4" />
            <span>Send Feedback to Client</span>
          </button>
        </form>
      </div>
    </div>
  );
}
