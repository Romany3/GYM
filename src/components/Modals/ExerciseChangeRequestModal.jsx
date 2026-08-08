import React, { useState } from 'react';
import { X, RefreshCw, CheckCircle, XCircle, Dumbbell, AlertTriangle, ArrowRight } from 'lucide-react';

export default function ExerciseChangeRequestModal({ isOpen, onClose, requests = [], onApprove, onReject }) {
  const [selectedRequestId, setSelectedRequestId] = useState(requests[0]?.id || null);
  const [replacementName, setReplacementName] = useState('');

  if (!isOpen) return null;

  const currentRequest = requests.find((r) => r.id === selectedRequestId) || requests[0];

  const handleApprove = () => {
    if (!currentRequest) return;
    const finalReplacement = replacementName.trim() || currentRequest.suggestedReplacement || 'Leg Press (Machine)';
    onApprove(currentRequest.id, finalReplacement);
    setReplacementName('');
    if (requests.length <= 1) {
      onClose();
    }
  };

  const handleReject = () => {
    if (!currentRequest) return;
    onReject(currentRequest.id);
    if (requests.length <= 1) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
      <div className="bg-[#121724] border border-slate-800 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-800 bg-gradient-to-r from-amber-950/30 via-slate-900 to-slate-900">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <RefreshCw className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif-header text-lg font-semibold text-slate-100">
                Exercise Substitution Requests
              </h3>
              <p className="text-xs text-slate-400">Review & approve client exercise swap requests</p>
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
        <div className="p-5 space-y-5">
          {requests.length === 0 ? (
            <div className="text-center py-8">
              <CheckCircle className="w-10 h-10 text-emerald-400 mx-auto mb-2 opacity-80" />
              <p className="text-sm font-semibold text-slate-200">All requests cleared!</p>
              <p className="text-xs text-slate-400 mt-1">There are no pending exercise substitution requests.</p>
            </div>
          ) : (
            <>
              {/* Requests Selector Tabs */}
              {requests.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
                  {requests.map((req) => (
                    <button
                      key={req.id}
                      onClick={() => {
                        setSelectedRequestId(req.id);
                        setReplacementName('');
                      }}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                        (currentRequest?.id === req.id)
                          ? 'bg-amber-500/20 border border-amber-500/40 text-amber-300'
                          : 'bg-slate-900 text-slate-400 hover:bg-slate-800'
                      }`}
                    >
                      {req.clientName} ({req.originalExercise})
                    </button>
                  ))}
                </div>
              )}

              {/* Current Request Detail Card */}
              {currentRequest && (
                <div className="bg-[#171e2e] border border-slate-800 rounded-xl p-4 space-y-3.5">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-bold tracking-wider text-amber-400 uppercase bg-amber-950/60 border border-amber-800/60 px-2 py-0.5 rounded-md">
                        {currentRequest.reasonCategory || 'Equipment Missing'}
                      </span>
                      <h4 className="text-sm font-semibold text-slate-100 mt-1.5">
                        Client: <span className="text-blue-300">{currentRequest.clientName}</span>
                      </h4>
                    </div>
                    <span className="text-[11px] text-slate-400">{currentRequest.requestedAt || '10 mins ago'}</span>
                  </div>

                  {/* Exercise Swap Comparison */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    <div className="p-3 bg-red-950/20 border border-red-900/30 rounded-xl">
                      <span className="text-[10px] font-bold text-red-400 uppercase">Original Exercise</span>
                      <p className="text-xs font-bold text-slate-200 mt-0.5">{currentRequest.originalExercise}</p>
                      <p className="text-[11px] text-slate-400 mt-1 italic font-mono">"{currentRequest.reasonNote}"</p>
                    </div>

                    <div className="p-3 bg-emerald-950/20 border border-emerald-900/30 rounded-xl">
                      <span className="text-[10px] font-bold text-emerald-400 uppercase">Suggested Substitution</span>
                      <p className="text-xs font-bold text-slate-200 mt-0.5">{currentRequest.suggestedReplacement}</p>
                      <span className="inline-block text-[10px] text-emerald-300 bg-emerald-900/40 px-1.5 py-0.5 rounded mt-1">
                        Same Muscle Target
                      </span>
                    </div>
                  </div>

                  {/* Custom Replacement Input */}
                  <div>
                    <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                      Override Replacement Exercise (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder={`Default: ${currentRequest.suggestedReplacement}`}
                      value={replacementName}
                      onChange={(e) => setReplacementName(e.target.value)}
                      className="w-full bg-[#121724] text-slate-200 text-xs rounded-xl px-3.5 py-2.5 border border-slate-700/60 focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-3 pt-2">
                    <button
                      onClick={handleApprove}
                      className="flex-1 py-2.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 transition-all"
                    >
                      <CheckCircle className="w-4 h-4" />
                      <span>Approve Substitution</span>
                    </button>
                    <button
                      onClick={handleReject}
                      className="py-2.5 px-4 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs rounded-xl flex items-center justify-center gap-2 border border-slate-700 transition-all"
                    >
                      <XCircle className="w-4 h-4 text-red-400" />
                      <span>Reject</span>
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
