import { useState } from 'react';
import { Key, ArrowRight, ShieldCheck, UserCheck, Lock, Sparkles } from 'lucide-react';

export default function ClientAuthPage({ 
  onClientLoginSuccess, 
  onSwitchToCoachAuth,
  defaultPasskey = 'FA-9B2X71',
  revokedPasskeys = {}
}) {
  const [passkey, setPasskey] = useState(defaultPasskey);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const cleanKey = passkey.trim().toUpperCase();
    if (!cleanKey) {
      setErrorMsg('Please enter your unique invitation passkey.');
      return;
    }

    if (revokedPasskeys[cleanKey]) {
      setErrorMsg('🚫 Access Denied: Your passkey has been CANCELLED by Coach Alex. Contact your trainer.');
      return;
    }

    // Authenticate and load client single-profile
    onClientLoginSuccess({
      passkey: cleanKey,
      clientName: 'Marcus Jensen',
      coachName: 'Alex Thorne',
      tier: 'PRO ATHLETE',
      targetKcal: 2450,
      joined: 'Jan 2024',
    });
  };

  return (
    <div className="min-h-screen bg-[#05070d] text-slate-200 flex flex-col justify-center items-center p-4 relative overflow-hidden select-none">
      {/* Multi-layered ambient lighting background */}
      <div className="absolute -top-48 -right-48 w-[500px] h-[500px] bg-blue-600/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-48 -left-48 w-[500px] h-[500px] bg-indigo-600/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-sky-500/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Glassmorphism Client Passkey Card */}
      <div className="w-full max-w-md bg-[#0b0f1b]/90 border border-slate-700/60 rounded-3xl p-7 sm:p-9 shadow-[0_0_60px_rgba(30,58,138,0.25)] backdrop-blur-2xl relative z-10 space-y-7 animate-in fade-in zoom-in-95 duration-300">
        
        {/* Coach Badge Header */}
        <div className="flex flex-col items-center text-center space-y-3">
          <div className="relative">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
                alt="Coach Alex Thorne"
                className="w-20 h-20 rounded-full object-cover ring-4 ring-blue-500/40 shadow-2xl"
              />
              <span className="absolute bottom-0 right-0 w-4 h-4 bg-emerald-500 border-2 border-[#0b0f1b] rounded-full shadow-md" />
            </div>
            <div className="absolute -bottom-2 -left-2 w-7 h-7 rounded-full bg-blue-600 border-2 border-[#0b0f1b] flex items-center justify-center text-white shadow-lg">
              <ShieldCheck className="w-4 h-4 text-blue-100" />
            </div>
          </div>

          <div>
            <span className="inline-flex items-center gap-1.5 text-[10px] font-extrabold tracking-widest text-blue-300 uppercase bg-blue-950/80 px-3 py-1 rounded-full border border-blue-800/80 shadow-inner mb-2">
              <Sparkles className="w-3 h-3 text-sky-400" /> FITARCH ATHLETE PORTAL
            </span>
            <h1 className="font-serif-header text-2xl sm:text-3xl font-black tracking-tight text-white mt-1">
              Client Portal Access
            </h1>
            <p className="text-xs text-slate-400 mt-1 max-w-xs mx-auto leading-relaxed">
              Enter your invitation passkey assigned by Coach Alex Thorne to enter your personalized dashboard.
            </p>
          </div>
        </div>

        {/* Passkey Input Form */}
        <form onSubmit={handleSubmit} className="space-y-5 text-xs">
          <div className="space-y-2">
            <label className="block text-slate-300 font-bold text-[11px] uppercase tracking-wider text-center">
              Your Unique Client Passkey
            </label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-400 flex items-center justify-center">
                <Key className="w-4 h-4" />
              </div>
              <input
                type="text"
                required
                value={passkey}
                onChange={(e) => {
                  setPasskey(e.target.value.toUpperCase());
                  setErrorMsg('');
                }}
                placeholder="e.g. FA-9B2X71"
                className="w-full bg-[#131928] text-blue-200 font-mono font-bold text-center text-base tracking-[0.25em] rounded-2xl pl-11 pr-4 py-3.5 border border-slate-700/70 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 uppercase shadow-inner placeholder:text-slate-600 transition-all"
              />
            </div>
            {errorMsg && (
              <div className="p-3 bg-rose-950/60 border border-rose-800/80 rounded-xl text-[11px] text-rose-300 font-medium text-center animate-shake">
                {errorMsg}
              </div>
            )}
          </div>

          {/* Quick Demo Passkey Selector */}
          <div className="p-4 bg-[#111625]/90 border border-slate-800 rounded-2xl text-[11px] text-slate-300 space-y-2.5 shadow-md">
            <div className="flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-blue-400 shrink-0" />
              <span className="font-semibold text-slate-200">Demo Athlete Passkeys:</span>
            </div>
            <div className="grid grid-cols-2 gap-2 font-mono text-[10px]">
              <button
                type="button"
                onClick={() => setPasskey('FA-9B2X71')}
                className="px-3 py-2 bg-blue-950/60 hover:bg-blue-900/80 text-blue-200 rounded-xl border border-blue-800/60 cursor-pointer flex items-center justify-center gap-1.5 transition-all font-bold hover:scale-[1.02]"
              >
                <Lock className="w-3 h-3 text-blue-400" />
                <span>FA-9B2X71 (Marcus)</span>
              </button>
              <button
                type="button"
                onClick={() => setPasskey('FA-3K88P2')}
                className="px-3 py-2 bg-blue-950/60 hover:bg-blue-900/80 text-blue-200 rounded-xl border border-blue-800/60 cursor-pointer flex items-center justify-center gap-1.5 transition-all font-bold hover:scale-[1.02]"
              >
                <Lock className="w-3 h-3 text-blue-400" />
                <span>FA-3K88P2 (Sarah)</span>
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-gradient-to-r from-blue-500 via-sky-400 to-indigo-500 hover:from-blue-400 hover:to-sky-300 text-slate-950 font-black text-sm rounded-2xl shadow-xl shadow-blue-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.01] active:scale-[0.99]"
          >
            <span>Enter My Training Portal</span>
            <ArrowRight className="w-4 h-4 text-slate-950 stroke-[3]" />
          </button>
        </form>

        {/* Switch to Coach Sign In Link */}
        <div className="text-center pt-2 border-t border-slate-800/80">
          <button
            type="button"
            onClick={onSwitchToCoachAuth}
            className="text-xs text-blue-400 hover:text-blue-300 font-semibold transition-colors cursor-pointer inline-flex items-center gap-1 hover:underline"
          >
            <span>Are you a Coach? Sign in to Coach Panel</span>
            <ArrowRight className="w-3.5 h-3.5 text-blue-400" />
          </button>
        </div>
      </div>
    </div>
  );
}
