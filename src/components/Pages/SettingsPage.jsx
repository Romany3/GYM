import { useState } from 'react';
import { Settings, Bell, Moon, RefreshCw } from 'lucide-react';

export default function SettingsPage({ showToast, onResetAppData }) {
  const [quietHoursEnabled, setQuietHoursEnabled] = useState(true);
  const [quietStart, setQuietStart] = useState('22:00');
  const [quietEnd, setQuietEnd] = useState('07:00');
  const [notifications, setNotifications] = useState({
    exerciseRequests: true,
    checkins: true,
    newClients: true,
    expiryWarnings: true,
    directMessages: true,
  });

  const toggleNotification = (key) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleResetData = () => {
    if (window.confirm('Are you sure you want to reset back to demo defaults?')) {
      if (onResetAppData) onResetAppData();
      if (showToast) showToast('Reset all app data to demo defaults!', 'info');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif-header text-3xl font-bold text-white tracking-tight">
          System Settings
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Manage coach profile settings, granular notification preferences, and quiet hours.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        {/* Coach Account Profile Card */}
        <div className="bg-[#121724] border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5">
          <h3 className="text-sm font-bold text-slate-200 border-b border-slate-800 pb-3 flex items-center gap-2">
            <Settings className="w-4 h-4 text-blue-400" />
            <span>Coach Account Profile</span>
          </h3>

          <div className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-400 font-semibold mb-1">Coach Name</label>
              <input
                type="text"
                defaultValue="Alex Thorne"
                className="w-full bg-[#171e2e] text-slate-200 p-2.5 rounded-xl border border-slate-700/60 focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-slate-400 font-semibold mb-1">Title & Role</label>
              <input
                type="text"
                defaultValue="HEAD PERFORMANCE COACH"
                className="w-full bg-[#171e2e] text-slate-200 p-2.5 rounded-xl border border-slate-700/60 focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-slate-400 font-semibold mb-1">Contact Email</label>
              <input
                type="email"
                defaultValue="alex.thorne@fitarch.app"
                className="w-full bg-[#171e2e] text-slate-200 p-2.5 rounded-xl border border-slate-700/60 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Granular Notifications & Quiet Hours Card */}
        <div className="bg-[#121724] border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5">
          <h3 className="text-sm font-bold text-slate-200 border-b border-slate-800 pb-3 flex items-center gap-2">
            <Bell className="w-4 h-4 text-amber-400" />
            <span>Notification & Quiet Hours Controls</span>
          </h3>

          {/* Quiet Hours Section */}
          <div className="p-4 bg-[#171e2e] border border-slate-800 rounded-xl space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Moon className="w-4 h-4 text-indigo-400" />
                <div>
                  <h4 className="text-xs font-semibold text-slate-200">Quiet Hours (Do Not Disturb)</h4>
                  <p className="text-[10px] text-slate-400">Mute client push alerts during rest hours</p>
                </div>
              </div>
              <input
                type="checkbox"
                checked={quietHoursEnabled}
                onChange={(e) => setQuietHoursEnabled(e.target.checked)}
                className="w-4 h-4 rounded text-blue-500 bg-slate-900 border-slate-700 focus:ring-0 cursor-pointer"
              />
            </div>

            {quietHoursEnabled && (
              <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Start Time</label>
                  <input
                    type="time"
                    value={quietStart}
                    onChange={(e) => setQuietStart(e.target.value)}
                    className="w-full bg-[#121724] text-slate-200 p-2 rounded-lg border border-slate-700/60"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">End Time</label>
                  <input
                    type="time"
                    value={quietEnd}
                    onChange={(e) => setQuietEnd(e.target.value)}
                    className="w-full bg-[#121724] text-slate-200 p-2 rounded-lg border border-slate-700/60"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Granular Toggles List */}
          <div className="space-y-3.5 text-xs">
            <h4 className="text-xs font-semibold text-slate-300">Event Alerts Preferences</h4>

            {[
              { key: 'exerciseRequests', label: 'Exercise Substitution Requests', detail: 'Notify when client requests machine/injury swap' },
              { key: 'checkins', label: 'Weekly Check-in Submissions', detail: 'Notify when client completes weekly form' },
              { key: 'newClients', label: 'New Client Registration', detail: 'Notify when client activates portal account' },
              { key: 'expiryWarnings', label: 'Subscription Expiration Alerts', detail: 'Alert 7 days before client plan renewal' },
            ].map((item) => (
              <div key={item.key} className="flex items-center justify-between p-2.5 bg-[#171e2e]/60 rounded-xl border border-slate-800/80">
                <div>
                  <p className="font-semibold text-slate-200">{item.label}</p>
                  <p className="text-[10px] text-slate-400">{item.detail}</p>
                </div>
                <input
                  type="checkbox"
                  checked={notifications[item.key]}
                  onChange={() => toggleNotification(item.key)}
                  className="w-4 h-4 rounded text-blue-500 bg-slate-900 border-slate-700 focus:ring-0 cursor-pointer"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between pt-2">
        <button
          onClick={handleResetData}
          className="py-3 px-5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 font-bold text-xs rounded-xl flex items-center gap-2 transition-all cursor-pointer"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Reset App Data to Defaults</span>
        </button>

        <button
          onClick={() => showToast && showToast('Saved system & notification settings!')}
          className="py-3 px-8 bg-gradient-to-r from-blue-400 via-sky-300 to-blue-300 hover:from-blue-300 hover:to-sky-200 text-slate-950 font-bold text-xs rounded-xl shadow-lg transition-all cursor-pointer"
        >
          Save All Settings
        </button>
      </div>
    </div>
  );
}

