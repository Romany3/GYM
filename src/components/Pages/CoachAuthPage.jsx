import { useState } from 'react';
import { 
  Dumbbell, 
  Lock, 
  Mail, 
  ArrowRight, 
  User, 
  Building 
} from 'lucide-react';

export default function CoachAuthPage({ onLoginSuccess, onSwitchToClientAuth }) {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('alex.thorne@fitarch.app');
  const [password, setPassword] = useState('password123');
  const [fullName, setFullName] = useState('Alex Thorne');
  const [brandName, setBrandName] = useState('Thorne Performance Gym');

  const handleSubmit = (e) => {
    e.preventDefault();
    onLoginSuccess({
      name: fullName || 'Alex Thorne',
      email: email,
      role: 'HEAD COACH',
      brand: brandName || 'FitArch Gym',
    });
  };

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-200 flex flex-col justify-center items-center p-4 relative overflow-hidden select-none">
      {/* Background ambient lighting effects */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />

      {/* Main Glassmorphism Auth Card */}
      <div className="w-full max-w-md bg-[#0f1422]/90 border border-slate-800/90 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl relative z-10 space-y-6 animate-in fade-in zoom-in-95 duration-300">
        {/* Branding Header */}
        <div className="flex flex-col items-center text-center">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-500 to-sky-400 flex items-center justify-center shadow-lg shadow-blue-500/20 mb-3">
            <Dumbbell className="w-7 h-7 text-white rotate-45" />
          </div>
          <h1 className="font-serif-header text-2xl font-bold tracking-tight text-white">
            Fit<span className="text-blue-300 font-normal">Arch</span> Coach Portal
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            {isRegister ? 'Create your master personal trainer account' : 'Sign in to manage client training, nutrition & analytics'}
          </p>
        </div>

        {/* Auth Mode Toggle Tabs */}
        <div className="grid grid-cols-2 bg-[#141b2c] p-1 rounded-xl border border-slate-800 text-xs font-semibold">
          <button
            type="button"
            onClick={() => setIsRegister(false)}
            className={`py-2 rounded-lg transition-all ${
              !isRegister ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Coach Sign In
          </button>
          <button
            type="button"
            onClick={() => setIsRegister(true)}
            className={`py-2 rounded-lg transition-all ${
              isRegister ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Register Account
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {isRegister && (
            <>
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Full Name</label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Coach Alex Thorne"
                    className="w-full bg-[#171e2e] text-slate-100 rounded-xl pl-10 pr-3.5 py-2.5 border border-slate-700/60 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Gym / Brand Name</label>
                <div className="relative">
                  <Building className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={brandName}
                    onChange={(e) => setBrandName(e.target.value)}
                    placeholder="Thorne Elite Performance"
                    className="w-full bg-[#171e2e] text-slate-100 rounded-xl pl-10 pr-3.5 py-2.5 border border-slate-700/60 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>
            </>
          )}

          <div>
            <label className="block text-slate-300 font-semibold mb-1">Work Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="coach@fitarch.app"
                className="w-full bg-[#171e2e] text-slate-100 rounded-xl pl-10 pr-3.5 py-2.5 border border-slate-700/60 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-[#171e2e] text-slate-100 rounded-xl pl-10 pr-3.5 py-2.5 border border-slate-700/60 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-blue-400 via-sky-300 to-blue-300 hover:from-blue-300 hover:to-sky-200 text-slate-950 font-bold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
          >
            <span>{isRegister ? 'Create Coach Account' : 'Sign In to Dashboard'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Switch to Client Sign In Link */}
        <div className="text-center pt-1 border-t border-slate-800/80">
          <button
            type="button"
            onClick={onSwitchToClientAuth}
            className="text-xs text-blue-400 hover:text-blue-300 font-semibold transition-colors cursor-pointer"
          >
            Are you a Client? Sign in with Passkey →
          </button>
        </div>
      </div>
    </div>
  );
}
