import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Key, 
  ArrowRight, 
  ArrowLeft,
  ShieldCheck, 
  Sparkles, 
  CheckCircle2, 
  Dumbbell, 
  Copy, 
  Check, 
  Globe, 
  Lock,
  Zap,
  Activity
} from 'lucide-react';

export default function ClientAuthPage({ 
  onClientLoginSuccess, 
  onSwitchToCoachAuth,
  defaultPasskey = 'FA-9B2X71',
  revokedPasskeys = {}
}) {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === 'ar';

  const [passkey, setPasskey] = useState(defaultPasskey);
  const [errorMsg, setErrorMsg] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const toggleLanguage = () => {
    const nextLang = i18n.language === 'ar' ? 'en' : 'ar';
    i18n.changeLanguage(nextLang);
  };

  const handleQuickFill = (keyVal) => {
    setPasskey(keyVal);
    setErrorMsg('');
  };

  const handleCopyDemoKey = () => {
    navigator.clipboard.writeText('FA-9B2X71');
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const cleanKey = passkey.trim().toUpperCase();
    if (!cleanKey) {
      setErrorMsg(isRtl ? 'يرجى إدخال رمز الدعوة الخاص بك' : 'Please enter your unique invitation passkey.');
      return;
    }

    if (revokedPasskeys[cleanKey]) {
      setErrorMsg(
        isRtl 
          ? '🚫 تم رفض الوصول: تم إلغاء هذا الرمز بواسطة المدرب. يرجى التواصل مع كابتن الفريق.'
          : '🚫 Access Denied: Your passkey has been revoked by Coach Alex. Contact your trainer.'
      );
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      onClientLoginSuccess({
        passkey: cleanKey,
        clientName: 'Marcus Jensen',
        coachName: 'Alex Thorne',
        tier: 'PRO ATHLETE',
        targetKcal: 2450,
        joined: 'Jan 2024',
      });
      setIsLoading(false);
    }, 350);
  };

  return (
    <div className="min-h-screen bg-[#060810] text-slate-100 flex flex-col justify-between items-center p-4 sm:p-6 relative overflow-hidden select-none font-sans">
      {/* Background Architectural Mesh & Subtle Lighting */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.12) 1px, transparent 0)`,
          backgroundSize: '32px 32px'
        }}
      />
      
      {/* Dynamic ambient gradients */}
      <div className="absolute -top-40 -right-40 w-[550px] h-[550px] bg-gradient-to-br from-blue-600/18 via-indigo-600/10 to-transparent rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-[550px] h-[550px] bg-gradient-to-tr from-cyan-600/12 via-blue-700/10 to-transparent rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Top Navbar Header */}
      <header className="w-full max-w-5xl flex items-center justify-between z-20 pt-2 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/25 border border-blue-400/30">
            <Dumbbell className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="text-[13px] font-black tracking-wider text-white uppercase flex items-center gap-1.5 font-mono">
              FITARCH <span className="text-blue-400 text-xs">//</span> ATHLETE
            </div>
            <div className="text-[10px] text-slate-400 font-medium tracking-wide">
              {isRtl ? 'بوابة الرياضيين الخاصة' : 'Private Performance Protocol'}
            </div>
          </div>
        </div>

        {/* Language switcher & status */}
        <div className="flex items-center gap-2.5">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-[#0d1220] border border-slate-800 text-[11px] text-slate-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>{isRtl ? 'سيرفر التدريب مباشر' : 'Live Athlete Node'}</span>
          </div>

          <button
            type="button"
            onClick={toggleLanguage}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#0f1526] hover:bg-[#16203a] border border-slate-700/60 text-xs font-semibold text-slate-300 hover:text-white transition-all cursor-pointer shadow-sm"
            title="Toggle Language"
          >
            <Globe className="w-3.5 h-3.5 text-blue-400" />
            <span>{isRtl ? 'English' : 'العربية'}</span>
          </button>
        </div>
      </header>

      {/* Main Center Card */}
      <main className="w-full max-w-lg z-20 my-auto py-4">
        <div className="bg-[#0b101d]/90 border border-slate-700/70 rounded-3xl p-6 sm:p-9 shadow-[0_20px_70px_rgba(0,0,0,0.7),0_0_50px_rgba(37,99,235,0.14)] backdrop-blur-2xl relative overflow-hidden space-y-7">
          
          {/* Top Decorative Border Highlight */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-80" />

          {/* Coach Profile Card Header */}
          <div className="p-4 rounded-2xl bg-[#0f1629]/90 border border-slate-800/90 shadow-inner flex items-center justify-between gap-4">
            <div className="flex items-center gap-3.5 min-w-0">
              <div className="relative shrink-0">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
                  alt="Coach Alex Thorne"
                  className="w-14 h-14 rounded-2xl object-cover ring-2 ring-blue-500/40 shadow-md"
                />
                <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 border-2 border-[#0b101d] rounded-full" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <h2 className="text-sm font-extrabold text-white truncate">
                    Coach Alex Thorne
                  </h2>
                  <ShieldCheck className="w-4 h-4 text-blue-400 shrink-0" />
                </div>
                <p className="text-[11px] text-slate-400 font-medium truncate mt-0.5">
                  {isRtl ? 'كابتن الإعداد البدني والتغذية' : 'Head Strength & Nutrition Director'}
                </p>
                <div className="inline-flex items-center gap-1 text-[10px] font-bold text-blue-300 mt-1">
                  <Sparkles className="w-2.5 h-2.5 text-blue-400" />
                  <span>{isRtl ? 'دعوة رياضية رسمية' : 'Verified Roster Invitation'}</span>
                </div>
              </div>
            </div>

            <div className="hidden sm:flex flex-col items-end shrink-0 border-s border-slate-800 ps-4">
              <span className="text-[9px] uppercase font-mono tracking-wider text-slate-400">STATUS</span>
              <span className="text-[11px] font-bold text-emerald-400 flex items-center gap-1 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                {isRtl ? 'استقبال نشط' : 'Active Intake'}
              </span>
            </div>
          </div>

          {/* Title and Instruction */}
          <div className="text-center space-y-1.5">
            <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white">
              {isRtl ? 'تسجيل دخول بوابة الرياضي' : 'Athlete Portal Passkey'}
            </h1>
            <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
              {isRtl 
                ? 'أدخل رمز الدعوة المكون من 8 خانات والممنوح لك من الكابتن لمزامنة جدول تمارينك وخطة الوجبات الغذائية.'
                : 'Enter your exclusive 8-character invitation passkey provided by Coach Alex to sync your customized training & nutrition protocols.'}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold px-1">
                <label className="text-slate-300 flex items-center gap-1.5 font-bold">
                  <Key className="w-3.5 h-3.5 text-blue-400" />
                  <span>{isRtl ? 'رمز الدعوة (Passkey)' : 'Invitation Passkey'}</span>
                </label>
                <span className="text-[11px] font-mono text-slate-400">
                  {passkey.length}/12
                </span>
              </div>

              {/* Styled Key Input */}
              <div className="relative group">
                <div className="absolute inset-y-0 start-0 ps-3.5 flex items-center pointer-events-none">
                  <Lock className="w-4 h-4 text-blue-400 group-focus-within:text-cyan-400 transition-colors" />
                </div>
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
                  className="w-full bg-[#12192c] text-white font-mono text-center text-lg sm:text-xl tracking-widest font-black py-3.5 ps-10 pe-10 rounded-2xl border border-slate-700/80 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 focus:outline-none transition-all shadow-inner uppercase placeholder:text-slate-600"
                />

                {passkey && (
                  <button
                    type="button"
                    onClick={() => setPasskey('')}
                    className="absolute inset-y-0 end-0 pe-3.5 flex items-center text-xs font-bold text-slate-400 hover:text-white transition-colors cursor-pointer"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>

            {/* Quick Demo Fill Pill */}
            <div className="flex items-center justify-between gap-2 p-2.5 rounded-xl bg-[#0e1424] border border-slate-800/80 text-xs">
              <div className="flex items-center gap-1.5 text-slate-400">
                <Zap className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span className="text-[11px]">
                  {isRtl ? 'رمز تجريبي سريع:' : 'Demo Passkey:'}
                </span>
                <button
                  type="button"
                  onClick={() => handleQuickFill('FA-9B2X71')}
                  className="font-mono font-bold text-blue-300 hover:text-blue-200 bg-blue-950/80 hover:bg-blue-900/80 px-2 py-0.5 rounded border border-blue-800/70 transition-all cursor-pointer"
                >
                  FA-9B2X71
                </button>
              </div>

              <button
                type="button"
                onClick={handleCopyDemoKey}
                className="text-[11px] font-semibold text-slate-400 hover:text-slate-200 flex items-center gap-1 cursor-pointer transition-colors"
                title="Copy demo passkey"
              >
                {isCopied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">{isRtl ? 'تم النسخ' : 'Copied'}</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>{isRtl ? 'نسخ' : 'Copy'}</span>
                  </>
                )}
              </button>
            </div>

            {/* Error Message */}
            {errorMsg && (
              <div className="p-3 bg-rose-950/80 border border-rose-800/80 text-rose-200 text-xs font-medium rounded-xl leading-relaxed animate-in fade-in duration-200">
                {errorMsg}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 sm:py-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:from-blue-500 hover:via-indigo-500 hover:to-cyan-400 text-white font-extrabold text-sm sm:text-base rounded-2xl shadow-xl shadow-blue-600/30 hover:shadow-blue-500/40 flex items-center justify-center gap-2.5 transition-all cursor-pointer active:scale-[0.99] border border-blue-400/40 group"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span>{isRtl ? 'الدخول إلى بوابة الرياضي' : 'Access Athlete Portal'}</span>
                  {isRtl ? (
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                  ) : (
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  )}
                </>
              )}
            </button>
          </form>

          {/* Switch to Coach Login */}
          <div className="pt-2 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
            <span className="text-slate-400">
              {isRtl ? 'هل أنت المدرب؟' : 'Are you a Coach?'}
            </span>
            <button
              type="button"
              onClick={onSwitchToCoachAuth}
              className="font-bold text-blue-400 hover:text-cyan-300 flex items-center gap-1.5 transition-colors cursor-pointer group"
            >
              <span>{isRtl ? 'تسجيل دخول لوحة التحكم الرئيسية' : 'Head Coach Dashboard Login'}</span>
              {isRtl ? (
                <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
              ) : (
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              )}
            </button>
          </div>
        </div>
      </main>

      {/* Security & Feature Badges Footer */}
      <footer className="w-full max-w-md z-20 py-2 flex items-center justify-center gap-4 sm:gap-6 text-[11px] text-slate-400 font-medium">
        <div className="flex items-center gap-1.5">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
          <span>{isRtl ? 'بيانات مشفرة' : 'Encrypted Key'}</span>
        </div>
        <span className="w-1 h-1 rounded-full bg-slate-700" />
        <div className="flex items-center gap-1.5">
          <Activity className="w-3.5 h-3.5 text-blue-400" />
          <span>{isRtl ? 'مزامنة برامج فورية' : 'Instant Protocol Sync'}</span>
        </div>
        <span className="w-1 h-1 rounded-full bg-slate-700" />
        <div className="flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
          <span>{isRtl ? 'إشراف مباشر' : 'Direct Coach Feed'}</span>
        </div>
      </footer>
    </div>
  );
}
