import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { X, Megaphone, Send } from 'lucide-react';

export default function AnnouncementModal({ isOpen, onClose, showToast }) {
  const { t } = useTranslation();
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
                {t('overview.sendAnnouncement')}
              </h3>
              <p className="text-xs text-slate-400">Broadcast message to all active clients</p>
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
            <label className="block text-xs font-semibold text-slate-300 mb-1">Announcement Message Body</label>
            <textarea
              rows="4"
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write your announcement update here..."
              className="w-full bg-[#171e2e] text-slate-200 text-xs rounded-xl p-3 border border-slate-700/60 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-xl transition-colors"
            >
              {t('common.cancel')}
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-blue-900/40 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Send className="w-3.5 h-3.5 rtl:rotate-180" />
              <span>{t('common.submit')}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
