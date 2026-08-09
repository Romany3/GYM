import { useState } from 'react';
import { X, Copy, CheckSquare, Square, CheckCircle2 } from 'lucide-react';

export default function BatchAssignModal({ isOpen, onClose, clients = [], programTitle = 'Current Routine', onConfirmBatch, showToast }) {
  const [selectedClientIds, setSelectedClientIds] = useState([]);

  if (!isOpen) return null;

  const toggleClient = (id) => {
    setSelectedClientIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedClientIds.length === clients.length) {
      setSelectedClientIds([]);
    } else {
      setSelectedClientIds(clients.map((c) => c.id));
    }
  };

  const handleConfirm = () => {
    if (selectedClientIds.length === 0) {
      if (showToast) showToast('Please select at least one client', 'warning');
      return;
    }
    onConfirmBatch(selectedClientIds, programTitle);
    if (showToast) showToast(`Successfully assigned "${programTitle}" to ${selectedClientIds.length} client(s)!`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
      <div className="bg-[#121724] border border-slate-800 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-800 bg-gradient-to-r from-blue-950/30 via-slate-900 to-slate-900">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <Copy className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif-header text-lg font-semibold text-slate-100">
                Batch Assign Program
              </h3>
              <p className="text-xs text-slate-400">Duplicate plan across multiple client accounts</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-200 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4">
          <div className="p-3 bg-[#171e2e] border border-slate-800 rounded-xl text-xs text-slate-300">
            <span className="font-bold text-blue-300 block mb-0.5">Selected Program:</span>
            <span>{programTitle}</span>
          </div>

          <div className="flex items-center justify-between pt-1">
            <span className="text-xs font-semibold text-slate-400">Select Target Clients:</span>
            <button
              onClick={toggleSelectAll}
              className="text-xs text-blue-400 hover:text-blue-300 font-semibold"
            >
              {selectedClientIds.length === clients.length ? 'Deselect All' : 'Select All'}
            </button>
          </div>

          {/* Client Checkbox List */}
          <div className="max-h-56 overflow-y-auto space-y-2 pr-1">
            {clients.map((client) => {
              const isSelected = selectedClientIds.includes(client.id);
              return (
                <div
                  key={client.id}
                  onClick={() => toggleClient(client.id)}
                  className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-blue-950/30 border-blue-500/40 text-slate-100'
                      : 'bg-[#171e2e] border-slate-800/80 text-slate-400 hover:bg-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {isSelected ? (
                      <CheckSquare className="w-4 h-4 text-blue-400 shrink-0" />
                    ) : (
                      <Square className="w-4 h-4 text-slate-600 shrink-0" />
                    )}
                    <div>
                      <p className="text-xs font-semibold text-slate-200">{client.name}</p>
                      <p className="text-[10px] text-slate-400">{client.tier || 'STANDARD'}</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-slate-500">{client.targetKcal || 2400} kcal</span>
                </div>
              );
            })}
          </div>

          {/* Actions */}
          <div className="pt-2">
            <button
              onClick={handleConfirm}
              className="w-full py-3 bg-gradient-to-r from-blue-400 via-sky-300 to-blue-300 hover:from-blue-300 hover:to-sky-200 text-slate-950 font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Assign to {selectedClientIds.length} Client(s)</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
