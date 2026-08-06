import React from 'react';
import { Flag, AlertTriangle, CheckCircle, MessageSquare } from 'lucide-react';

export default function LogReview({
  logItems,
  onApproveLog,
  onOpenFeedback,
  onFlagDay
}) {
  return (
    <div className="space-y-5">
      {/* Log Review Header Card */}
      <div className="bg-[#121724] border border-slate-800/90 rounded-2xl p-5 shadow-xl flex flex-col justify-between min-h-[calc(100vh-8rem)]">
        <div>
          {/* Section Header */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-800/80 mb-5">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-pink-500 rounded-full animate-pulse" />
              <h2 className="font-serif-header text-lg font-semibold text-slate-100">
                Log Review
              </h2>
            </div>
            <span className="text-xs text-slate-400 font-medium">
              Today, Oct 24th
            </span>
          </div>

          {/* Timeline Log Feed */}
          <div className="space-y-5">
            {logItems.map((log) => {
              const isOffPlan = log.status === 'off-plan';

              return (
                <div key={log.id} className="space-y-2">
                  {/* Timestamp & Status Badge */}
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400 font-mono font-medium">
                      {log.time}
                    </span>
                    <span
                      className={`font-semibold flex items-center gap-1 ${
                        isOffPlan ? 'text-amber-400' : 'text-slate-400'
                      }`}
                    >
                      {isOffPlan && <AlertTriangle className="w-3 h-3 text-amber-400" />}
                      {isOffPlan ? 'Off-Plan' : 'Planned'}
                    </span>
                  </div>

                  {/* Log Content Card */}
                  <div
                    className={`rounded-xl p-4 transition-all border ${
                      isOffPlan
                        ? 'bg-[#2a171d] border-red-900/60 text-red-100 shadow-md shadow-red-950/40'
                        : 'bg-[#161c2a] border-slate-700/60 text-slate-200'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <h4 className="text-xs font-bold tracking-wide">
                        {log.title}
                      </h4>
                      {isOffPlan && (
                        <Flag className="w-3.5 h-3.5 text-red-400 shrink-0" />
                      )}
                    </div>

                    {/* Client Note if provided */}
                    {log.note && (
                      <p className="text-[11px] italic text-slate-400 mt-2 border-l-2 border-slate-700 pl-2.5">
                        "{log.note}"
                      </p>
                    )}

                    {/* Off Plan details */}
                    {log.details && (
                      <p className="text-[11px] text-red-300/90 mt-2 font-medium">
                        {log.details}
                      </p>
                    )}

                    {/* Food Photo Preview */}
                    {log.image && (
                      <div className="mt-3 rounded-lg overflow-hidden border border-slate-700/60 max-h-32">
                        <img
                          src={log.image}
                          alt={log.title}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="pt-6 space-y-3 border-t border-slate-800/80 mt-6">
          <button
            onClick={onApproveLog}
            className="w-full py-3 bg-gradient-to-r from-blue-300 via-sky-200 to-blue-200 hover:from-blue-200 hover:to-sky-100 text-slate-950 font-bold text-xs rounded-xl shadow-lg shadow-blue-500/10 active:scale-[0.99] transition-all flex items-center justify-center gap-2"
          >
            <CheckCircle className="w-4 h-4 text-slate-950" />
            <span>Approve Log</span>
          </button>

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={onOpenFeedback}
              className="py-2.5 bg-[#171e2e] hover:bg-[#1f293d] border border-slate-700 text-slate-300 font-semibold text-xs rounded-xl flex items-center justify-center gap-2 transition-all"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Feedback</span>
            </button>

            <button
              onClick={onFlagDay}
              className="py-2.5 bg-[#20151b] hover:bg-[#2c1b24] border border-red-900/50 text-red-300 font-semibold text-xs rounded-xl flex items-center justify-center gap-2 transition-all"
            >
              <Flag className="w-3.5 h-3.5 text-red-400" />
              <span>Flag Day</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
