import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { X, UserPlus, Key } from 'lucide-react';

export default function QuickAddClientModal({ 
  isOpen, 
  onClose, 
  onAddClient,
  currentSubscription,
  currentClientCount = 18,
  onNavigateToSubscription
}) {
  const { t } = useTranslation();
  // 10 Comprehensive Fields
  const [name, setName] = useState('');
  const [country, setCountry] = useState('Egypt');
  const [phone, setPhone] = useState('+20 ');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState(25);
  const [gender, setGender] = useState('Male');
  const [heightCm, setHeightCm] = useState(178);
  const [weightKg, setWeightKg] = useState(82);
  const [goal, setGoal] = useState('Muscle Gain');
  const [duration, setDuration] = useState('3 Months');

  if (!isOpen) return null;

  const maxClients = currentSubscription?.maxClients || 25;
  const isLimitReached = currentClientCount >= maxClients;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    const generatedPasskey = `FA-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
    const calculatedTargetKcal = goal === 'Weight Loss' ? 2100 : goal === 'Muscle Gain' ? 2800 : 2450;
    
    const newClient = {
      id: Date.now().toString(),
      name: name.trim(),
      country,
      phone,
      email: email.trim() || `${name.toLowerCase().replace(/\s+/g, '')}@fitarch.app`,
      age: Number(age),
      gender,
      heightCm: Number(heightCm),
      weightKg: Number(weightKg),
      goal,
      duration,
      tier: 'PRO CLIENT',
      targetKcal: calculatedTargetKcal,
      passkey: generatedPasskey,
      status: 'Active',
      joinedDate: new Date().toISOString().split('T')[0],
    };

    onAddClient(newClient);
    setName('');
    setEmail('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
      <div className="bg-[#121724] border border-slate-800 rounded-2xl w-full max-w-xl overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200 my-8">
        {/* Limit Reached Warning Banner */}
        {isLimitReached && (
          <div className="p-4 bg-amber-950/40 border-b border-amber-800/60 flex items-center justify-between gap-3 text-xs">
            <div className="space-y-0.5">
              <span className="font-bold text-amber-300 block">Trainer Client Capacity Limit Reached</span>
              <p className="text-slate-300">
                You have reached your active plan limit ({currentClientCount} / {maxClients} clients). Upgrade plan to register more athletes.
              </p>
            </div>
            <button
              onClick={() => {
                onClose();
                if (onNavigateToSubscription) onNavigateToSubscription();
              }}
              className="px-3.5 py-2 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold rounded-xl text-xs whitespace-nowrap cursor-pointer shadow-md"
            >
              Upgrade Plan
            </button>
          </div>
        )}

        {/* Form Container */}
        <div className="flex items-center justify-between p-5 border-b border-slate-800 bg-gradient-to-r from-blue-950/40 via-indigo-950/30 to-slate-900">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <UserPlus className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif-header text-lg font-semibold text-slate-100">
                Register New Client Profile
              </h3>
              <p className="text-xs text-slate-400">Collect metrics & auto-generate client login passkey</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-200 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Multi-Column Form */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4 text-xs">
          {/* Row 1: Full Name & Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-300 mb-1">Full Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. Marcus Jensen"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-[#171e2e] text-slate-200 rounded-xl px-3.5 py-2.5 border border-slate-700/60 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-300 mb-1">Email Address</label>
              <input
                type="email"
                placeholder="marcus@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#171e2e] text-slate-200 rounded-xl px-3.5 py-2.5 border border-slate-700/60 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          {/* Row 2: Country & Phone Number */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-300 mb-1">Country</label>
              <select
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="w-full bg-[#171e2e] text-slate-200 rounded-xl px-3.5 py-2.5 border border-slate-700/60 focus:outline-none focus:border-blue-500"
              >
                <option value="Egypt">Egypt (مصر)</option>
                <option value="Saudi Arabia">Saudi Arabia (السعودية)</option>
                <option value="United Arab Emirates">United Arab Emirates (الإمارات)</option>
                <option value="Kuwait">Kuwait (الكويت)</option>
                <option value="United States">United States</option>
                <option value="United Kingdom">United Kingdom</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-300 mb-1">Phone Number</label>
              <input
                type="tel"
                placeholder="+20 100 123 4567"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-[#171e2e] text-slate-200 rounded-xl px-3.5 py-2.5 border border-slate-700/60 focus:outline-none focus:border-blue-500 font-mono"
              />
            </div>
          </div>

          {/* Row 3: Age & Gender */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-300 mb-1">Age (Years)</label>
              <input
                type="number"
                min="14"
                max="85"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="w-full bg-[#171e2e] text-slate-200 rounded-xl px-3.5 py-2.5 border border-slate-700/60"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-300 mb-1">Gender</label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full bg-[#171e2e] text-slate-200 rounded-xl px-3.5 py-2.5 border border-slate-700/60"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
          </div>

          {/* Row 4: Height & Weight */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-300 mb-1">Height (cm)</label>
              <input
                type="number"
                value={heightCm}
                onChange={(e) => setHeightCm(e.target.value)}
                className="w-full bg-[#171e2e] text-slate-200 rounded-xl px-3.5 py-2.5 border border-slate-700/60 font-mono"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-300 mb-1">Weight (kg)</label>
              <input
                type="number"
                step="0.5"
                value={weightKg}
                onChange={(e) => setWeightKg(e.target.value)}
                className="w-full bg-[#171e2e] text-slate-200 rounded-xl px-3.5 py-2.5 border border-slate-700/60 font-mono"
              />
            </div>
          </div>

          {/* Row 5: Primary Goal & Subscription Duration */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-300 mb-1">Primary Fitness Goal</label>
              <select
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                className="w-full bg-[#171e2e] text-slate-200 rounded-xl px-3.5 py-2.5 border border-slate-700/60 focus:outline-none focus:border-blue-500"
              >
                <option value="Weight Loss">Weight Loss / Fat Loss</option>
                <option value="Muscle Gain">Muscle Gain / Hypertrophy</option>
                <option value="Body Recomposition">Body Recomposition</option>
                <option value="Athletic Performance">Athletic Conditioning</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-300 mb-1">Subscription Duration</label>
              <select
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full bg-[#171e2e] text-slate-200 rounded-xl px-3.5 py-2.5 border border-slate-700/60 focus:outline-none focus:border-blue-500"
              >
                <option value="1 Month">1 Month</option>
                <option value="3 Months">3 Months</option>
                <option value="6 Months">6 Months</option>
                <option value="12 Months">12 Months (1 Year)</option>
              </select>
            </div>
          </div>

          {/* Auto Credentials Info Box */}
          <div className="p-3 bg-blue-950/20 border border-blue-900/40 rounded-xl flex items-center gap-2 text-[11px] text-blue-200">
            <Key className="w-4 h-4 text-blue-400 shrink-0" />
            <span>Submitting will automatically generate a single-client login passkey & invite link.</span>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 bg-gradient-to-r from-blue-300 via-sky-200 to-blue-200 hover:from-blue-200 hover:to-sky-100 text-slate-950 font-bold text-xs rounded-xl shadow-md transition-all mt-2 cursor-pointer"
          >
            {t('modals.quickAddClient.create')}
          </button>
        </form>
      </div>
    </div>
  );
}
