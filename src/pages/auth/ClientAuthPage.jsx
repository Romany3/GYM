import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Key, ArrowRight, ShieldCheck, UserCheck, Lock, Sparkles } from 'lucide-react';

export default function ClientAuthPage({ 
  onClientLoginSuccess, 
  onSwitchToCoachAuth,
  defaultPasskey = 'FA-9B2X71',
  revokedPasskeys = {}
}) {
  const { t } = useTranslation();
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
            <div className="flex items-center justify-center gap-1.5 text-[10px] font-bold text-blue-400 uppercase tracking-widest bg-blue-950/80 px-2.5 py-0.5 rounded-full border border-blue-800/60">
              <Sparkles className="w-3 h-3 text-blue-400" />
              <span>COACH ALEX THORNE • ATHLETE PORTAL</span>
            </div>
            <h1 className="font-serif-header text-2xl font-black tracking-tight text-white mt-2">
              {t('auth.clientPasskeyTitle')}
            </h1>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              Enter your unique 8-character invitation passkey provided by your trainer to access your daily protocols.
            </p>
          </div>
        </div>

        {/* Passkey Input Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-300 block text-center uppercase tracking-wider">
              {t('auth.enterPasskey')}
            </label>
            <div className="relative">
              <Key className="absolute start-4 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-400" />
              <input
                type="text"
                required
                maxLength={12}
                value={passkey}
                onChange={(e) => {
                  setPasskey(e.target.value.toUpperCase());
                  setErrorMsg('');
                }}
                placeholder="FA-9B2X71"
                className="w-full bg-[#131a2e] text-blue-200 font-mono text-center text-lg tracking-widest font-black py-3.5 ps-11 pe-4 rounded-2xl border-2 border-blue-500/50 focus:outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-500/20 shadow-inner uppercase transition-all"
              />
            </div>
          </div>

          {errorMsg && (
            <div className="p-3 bg-rose-950/80 border border-rose-800 text-rose-200 text-xs font-semibold rounded-xl text-center leading-relaxed">
              {errorMsg}
            </div>
          )}

          <button
            type="submit"
            className="w-full py-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 hover:from-blue-500 hover:to-indigo-500 text-white font-black text-sm rounded-2xl shadow-xl shadow-blue-600/30 flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-98"
          >
            <span>Access Athlete Portal</span>
            <ArrowRight className="w-4 h-4 rtl:rotate-180" />
          </button>
        </form>

        {/* Footer Navigation Switch */}
        <div className="pt-4 border-t border-slate-800/80 text-center">
          <button
            type="button"
            onClick={onSwitchToCoachAuth}
            className="text-xs text-slate-400 hover:text-blue-400 font-semibold transition-colors cursor-pointer"
          >
            Are you a Coach? Head Coach Dashboard Login →
          </button>
        </div>
      </div>
    </div>
  );
}
