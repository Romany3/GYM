import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Settings, Bell, Moon, RefreshCw } from 'lucide-react';

export default function SettingsPage({ showToast, onResetAppData }) {
  const { t } = useTranslation();
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

  const getNotificationLabel = (key) => {
    switch (key) {
      case 'exerciseRequests': return t('settings.exerciseRequests');
      case 'checkins': return t('settings.checkins');
      case 'newClients': return t('settings.newClients');
      case 'expiryWarnings': return t('settings.expiryWarnings');
      case 'directMessages': return t('settings.directMessages');
      default: return key;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif-header text-3xl font-bold text-white tracking-tight">
          {t('settings.title')}
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          {t('settings.subtitle')}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        {/* Coach Account Profile Card */}
        <div className="bg-[#121724] border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5">
          <h3 className="text-sm font-bold text-slate-200 border-b border-slate-800 pb-3 flex items-center gap-2">
            <Settings className="w-4 h-4 text-blue-400" />
            <span>{t('settings.profileTitle')}</span>
          </h3>

          <div className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-400 font-semibold mb-1">{t('settings.coachName')}</label>
              <input
                type="text"
                defaultValue="Alex Thorne"
                className="w-full bg-[#171e2e] text-slate-200 p-2.5 rounded-xl border border-slate-700/60 focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-slate-400 font-semibold mb-1">{t('settings.titleRole')}</label>
              <input
                type="text"
                defaultValue="HEAD PERFORMANCE COACH"
                className="w-full bg-[#171e2e] text-slate-200 p-2.5 rounded-xl border border-slate-700/60 focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-slate-400 font-semibold mb-1">{t('settings.contactEmail')}</label>
              <input
                type="email"
                defaultValue="alex.thorne@fitarch.com"
                className="w-full bg-[#171e2e] text-slate-200 p-2.5 rounded-xl border border-slate-700/60 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Notifications & System Preferences Card */}
        <div className="bg-[#121724] border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5">
          <h3 className="text-sm font-bold text-slate-200 border-b border-slate-800 pb-3 flex items-center gap-2">
            <Bell className="w-4 h-4 text-blue-400" />
            <span>{t('settings.alertsTitle')}</span>
          </h3>

          <div className="space-y-3 text-xs">
            {Object.entries(notifications).map(([key, enabled]) => (
              <div key={key} className="flex items-center justify-between p-3 bg-[#171e2e] rounded-xl border border-slate-800">
                <span className="text-slate-200 font-medium">
                  {getNotificationLabel(key)}
                </span>
                <button
                  onClick={() => toggleNotification(key)}
                  className={`w-10 h-5 flex items-center rounded-full p-1 cursor-pointer transition-colors ${
                    enabled ? 'bg-blue-600 justify-end' : 'bg-slate-700 justify-start'
                  }`}
                >
                  <div className="w-3.5 h-3.5 bg-white rounded-full shadow-md" />
                </button>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-slate-800 space-y-3">
            <button
              onClick={handleResetData}
              className="w-full py-2.5 bg-rose-950/60 hover:bg-rose-900/80 border border-rose-800/80 text-rose-300 font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm"
            >
              <RefreshCw className="w-4 h-4 text-rose-400" />
              <span>{t('settings.resetDemoData')}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
