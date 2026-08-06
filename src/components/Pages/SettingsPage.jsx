import React from 'react';
import { Settings, Shield, Bell, Key, User } from 'lucide-react';

export default function SettingsPage({ showToast }) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif-header text-3xl font-bold text-white tracking-tight">
          System Settings
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Manage coach profile settings, facility integrations, and notifications.
        </p>
      </div>

      <div className="bg-[#121724] border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6 max-w-2xl">
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-slate-200 border-b border-slate-800 pb-3">
            Coach Account Profile
          </h3>

          <div className="grid grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-slate-400 font-semibold mb-1">Coach Name</label>
              <input
                type="text"
                defaultValue="Alex Thorne"
                className="w-full bg-[#171e2e] text-slate-200 p-2.5 rounded-xl border border-slate-700/60"
              />
            </div>
            <div>
              <label className="block text-slate-400 font-semibold mb-1">Title</label>
              <input
                type="text"
                defaultValue="HEAD COACH"
                className="w-full bg-[#171e2e] text-slate-200 p-2.5 rounded-xl border border-slate-700/60"
              />
            </div>
          </div>
        </div>

        <button
          onClick={() => showToast && showToast('Saved system settings!')}
          className="py-2.5 px-6 bg-blue-500 hover:bg-blue-600 text-white font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer"
        >
          Save Settings
        </button>
      </div>
    </div>
  );
}
