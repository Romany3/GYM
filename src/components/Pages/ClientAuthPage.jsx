import { useState } from 'react';
import { Key, ArrowRight, ShieldCheck, UserCheck } from 'lucide-react';

export default function ClientAuthPage({ onClientLoginSuccess, onSwitchToCoachAuth, defaultPasskey = 'FA-9B2X71' }) {
  const [passkey, setPasskey] = useState(defaultPasskey);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!passkey.trim()) {
      setErrorMsg('Please enter your unique invitation passkey.');
      return;
    }
    // Authenticate and load client single-profile
    onClientLoginSuccess({
      passkey: passkey.trim(),
      clientName: 'Marcus Jensen',
      coachName: 'Alex Thorne',
      tier: 'PRO ATHLETE',
      targetKcal: 2450,
      joined: 'Jan 2024',
    });
  };

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-200 flex flex-col justify-center items-center p-4 relative overflow-hidden select-none">
      {/* Ambient background lighting */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-sky-600/15 rounded-full blur-3xl pointer-events-none" />

      {/* Glassmorphism Client Passkey Card */}
      <div className="w-full max-w-md bg-[#0f1422]/90 border border-slate-800/90 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl relative z-10 space-y-6 animate-in fade-in zoom-in-95 duration-300">
        {/* Coach Badge Header */}
        <div className="flex flex-col items-center text-center">
          <div className="relative mb-3">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
              alt="Coach Alex Thorne"
              className="w-16 h-16 rounded-full object-cover ring-4 ring-blue-500/40 shadow-xl"
            />
            <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-blue-600 border-2 border-[#0f1422] flex items-center justify-center text-white">
              <ShieldCheck className="w-3.5 h-3.5" />
            </div>
          </div>

          <span className="text-[10px] font-bold tracking-widest text-blue-400 uppercase bg-blue-950/80 px-2.5 py-0.5 rounded-full border border-blue-800/60 mb-1">
            FITARCH ATHLETE PORTAL
          </span>
          <h1 className="font-serif-header text-xl font-bold tracking-tight text-white">
            Client Login with Passkey
          </h1>
          <p className="text-xs text-slate-400 mt-1 max-w-xs">
            Enter your unique invitation passkey sent by Coach Alex Thorne to enter your portal.
          </p>
        </div>

        {/* Passkey Input Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block text-slate-300 font-semibold mb-1 text-center">
              Your Unique Client Passkey
            </label>
            <div className="relative">
              <Key className="w-4 h-4 text-blue-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={passkey}
                onChange={(e) => {
                  setPasskey(e.target.value.toUpperCase());
                  setErrorMsg('');
                }}
                placeholder="e.g. FA-9B2X71"
                className="w-full bg-[#171e2e] text-blue-300 font-mono font-bold text-center text-sm tracking-widest rounded-xl pl-10 pr-3.5 py-3 border border-slate-700/60 focus:outline-none focus:border-blue-500 uppercase"
              />
            </div>
            {errorMsg && <p className="text-[11px] text-red-400 text-center mt-1">{errorMsg}</p>}
          </div>

          {/* Quick Demo Passkey Selector */}
          <div className="p-3 bg-blue-950/30 border border-blue-800/40 rounded-xl text-[11px] text-slate-300 space-y-1.5">
            <div className="flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-blue-400 shrink-0" />
              <span>Click a demo client passkey below or type yours:</span>
            </div>
            <div className="flex gap-2 font-mono text-[10px]">
              <button
                type="button"
                onClick={() => setPasskey('FA-9B2X71')}
                className="px-2 py-1 bg-blue-900/40 hover:bg-blue-800/60 text-blue-200 rounded border border-blue-700/50 cursor-pointer"
              >
                FA-9B2X71 (Marcus)
              </button>
              <button
                type="button"
                onClick={() => setPasskey('FA-3K88P2')}
                className="px-2 py-1 bg-blue-900/40 hover:bg-blue-800/60 text-blue-200 rounded border border-blue-700/50 cursor-pointer"
              >
                FA-3K88P2 (Sarah)
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 bg-gradient-to-r from-blue-400 via-sky-300 to-blue-300 hover:from-blue-300 hover:to-sky-200 text-slate-950 font-bold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Enter My Training Portal</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Switch to Coach Sign In Link */}
        <div className="text-center pt-1 border-t border-slate-800/80">
          <button
            type="button"
            onClick={onSwitchToCoachAuth}
            className="text-xs text-blue-400 hover:text-blue-300 font-semibold transition-colors cursor-pointer"
          >
            Are you a Coach? Sign in to Coach Panel →
          </button>
        </div>
      </div>
    </div>
  );
}
