import { useState } from 'react';
import { 
  Users, 
  ShieldCheck, 
  AlertTriangle, 
  Search, 
  Plus, 
  MessageSquare, 
  Key, 
  TrendingDown, 
  Calendar,
  ChevronLeft,
  ChevronRight,
  Eye,
  Ban
} from 'lucide-react';

export default function ClientsPage({ 
  onQuickAddClient, 
  onOpenClientCredentials,
  showToast,
  onNavigate,
  clients: externalClients,
  onUpdateClients,
  revokedPasskeys = {},
  onToggleRevokePasskey
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [selectedClientIndex, setSelectedClientIndex] = useState(0);
  const [isNoteEditing, setIsNoteEditing] = useState(false);

  const defaultClientData = [
    {
      id: 'c1',
      code: '#MJ-0942',
      name: 'Marcus Johnson',
      email: 'marcus@fitarch.com',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      goal: 'Hypertrophy Phase 2',
      plan: 'Pro Tier - 12 Wk',
      planType: 'pro',
      lastActive: 'Today',
      compliance: 92,
      status: 'ACTIVE',
      joined: 'Active since Jan 2024',
      streak: 14,
      sessions: 48,
      note: 'Marcus is responding well to the volume increase in Phase 2. Slight impingement reported in left shoulder during overhead press. Modified next week\'s programming to substitute with incline DB press and added specific rotator cuff mobility work.',
      lastUpdated: 'Yesterday',
    },
    {
      id: 'c2',
      code: '#SJ-1104',
      name: 'Sarah Jenkins',
      email: 'sarah@fitarch.com',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80',
      goal: 'Endurance Prep',
      plan: 'Basic - 4 Wk',
      planType: 'basic',
      lastActive: '2 days ago',
      compliance: 45,
      status: 'AT RISK',
      joined: 'Active since Feb 2024',
      streak: 3,
      sessions: 18,
      note: 'Compliance dropped this week due to business travel. Needs encouragement for hotel room mobility & bodyweight workouts.',
      lastUpdated: '3 days ago',
    },
    {
      id: 'c3',
      code: '#DT-8832',
      name: 'David Thompson',
      email: 'david@fitarch.com',
      initials: 'DT',
      goal: 'Weight Loss',
      plan: 'Onboarding',
      planType: 'onboarding',
      lastActive: 'Just now',
      compliance: null,
      status: 'ONBOARDING',
      joined: 'Joined Today',
      streak: 1,
      sessions: 2,
      note: 'Initial intake call completed. Target daily calorie deficit set to 500 kcal.',
      lastUpdated: 'Today',
    },
    {
      id: 'c4',
      code: '#ER-2291',
      name: 'Elena Rodriguez',
      email: 'elena@fitarch.com',
      initials: 'ER',
      goal: 'Strength Building',
      plan: 'Pro Tier - 12 Wk',
      planType: 'pro',
      lastActive: 'Yesterday',
      compliance: 88,
      status: 'ACTIVE',
      joined: 'Active since Nov 2023',
      streak: 21,
      sessions: 64,
      note: 'Hit a new deadlift personal record (225 lbs x 5 reps). Excellent recovery metrics.',
      lastUpdated: 'Yesterday',
    },
    {
      id: 'c5',
      code: '#ML-4410',
      name: 'Michael Lee',
      email: 'michael@fitarch.com',
      initials: 'ML',
      goal: 'Marathon Prep',
      plan: 'Basic - 8 Wk',
      planType: 'basic',
      lastActive: '3 days ago',
      compliance: 75,
      status: 'ACTIVE',
      joined: 'Active since Dec 2023',
      streak: 9,
      sessions: 32,
      note: 'Long weekend run (18 miles) logged successfully. Hydration & carb loading protocol followed.',
      lastUpdated: '4 days ago',
    },
  ];

  const currentClients = externalClients && externalClients.length > 0 ? externalClients : defaultClientData;
  const [localClients, setLocalClients] = useState(null);
  const clientDataList = localClients || currentClients;

  // Filtering
  const filteredClients = clientDataList.filter((c) => {
    const matchesSearch = (c.name || '').toLowerCase().includes(searchQuery.toLowerCase()) || (c.code || '').toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'ALL' || c.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const selectedClient = clientDataList[selectedClientIndex] || clientDataList[0] || {};
  const [customNoteText, setCustomNoteText] = useState('');
  const [activeEditingIndex, setActiveEditingIndex] = useState(null);
  const noteText = activeEditingIndex === selectedClientIndex ? customNoteText : (selectedClient.note || '');

  const handleStartNoteEditing = () => {
    setCustomNoteText(selectedClient.note || '');
    setActiveEditingIndex(selectedClientIndex);
    setIsNoteEditing(true);
  };

  const handleSaveNote = () => {
    const updatedList = clientDataList.map((c, i) =>
      i === selectedClientIndex ? { ...c, note: noteText } : c
    );
    setLocalClients(updatedList);
    if (onUpdateClients) onUpdateClients(updatedList);
    setIsNoteEditing(false);
    setActiveEditingIndex(null);
    if (showToast) showToast('Updated trainer note');
  };

  return (
    <div className="space-y-6">
      {/* Header Controls Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="font-serif-header text-3xl font-bold text-white tracking-tight">
          Clients Directory
        </h1>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          {/* Search Bar */}
          <div className="relative w-full sm:w-56">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search clients..."
              className="w-full bg-[#131926] text-slate-200 text-xs rounded-xl pl-9 pr-3 py-2 border border-slate-700/60 focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full sm:w-auto bg-[#131926] text-slate-300 text-xs font-semibold rounded-xl px-3 py-2 border border-slate-700/60 focus:outline-none focus:border-blue-500 cursor-pointer"
          >
            <option value="ALL">Status: All</option>
            <option value="ACTIVE">Active</option>
            <option value="AT RISK">At Risk</option>
            <option value="ONBOARDING">Onboarding</option>
            <option value="FROZEN">Frozen / Suspended</option>
          </select>

          {/* Add New Client Button */}
          <button
            onClick={onQuickAddClient}
            className="w-full sm:w-auto flex items-center justify-center gap-2 py-2 px-4 bg-gradient-to-r from-blue-300 via-sky-200 to-blue-200 hover:from-blue-200 hover:to-sky-100 text-slate-950 font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Client</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Total Clients */}
        <div className="bg-[#121724] border border-slate-800 rounded-2xl p-5 shadow-lg flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold tracking-wider text-slate-400 uppercase">
              TOTAL CLIENTS
            </span>
            <div className="text-3xl font-extrabold text-white mt-1">42</div>
          </div>
          <div className="w-10 h-10 rounded-full bg-slate-800/80 border border-slate-700/60 flex items-center justify-center text-blue-400">
            <Users className="w-5 h-5" />
          </div>
        </div>

        {/* Active Subscriptions */}
        <div className="bg-[#121724] border border-slate-800 rounded-2xl p-5 shadow-lg flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold tracking-wider text-slate-400 uppercase">
              ACTIVE SUBSCRIPTIONS
            </span>
            <div className="text-3xl font-extrabold text-white mt-1">35</div>
          </div>
          <div className="w-10 h-10 rounded-full bg-slate-800/80 border border-slate-700/60 flex items-center justify-center text-blue-400">
            <ShieldCheck className="w-5 h-5" />
          </div>
        </div>

        {/* At Risk */}
        <div className="bg-[#121724] border border-slate-800 rounded-2xl p-5 shadow-lg flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold tracking-wider text-slate-400 uppercase">
              AT RISK
            </span>
            <div className="text-3xl font-extrabold text-red-400 mt-1">3</div>
          </div>
          <div className="w-10 h-10 rounded-full bg-red-950/40 border border-red-900/60 flex items-center justify-center text-red-400">
            <AlertTriangle className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Main 2-Column Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Table Matrix (Col 8) */}
        <div className="lg:col-span-8 bg-[#121724] border border-slate-800/90 rounded-2xl p-6 shadow-xl space-y-4">
          {/* CLIENT CARDS GRID (Unified Responsive Layout for All Screen Sizes) */}
          <div className="space-y-3.5">
            {filteredClients.map((client, idx) => {
              const isSelected = selectedClient.id === client.id;
              return (
                <div
                  key={client.id}
                  onClick={() => {
                    setSelectedClientIndex(idx);
                    setCustomNoteText(client.note || '');
                  }}
                  className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer space-y-3.5 ${
                    isSelected
                      ? 'bg-[#182133] border-blue-500/60 shadow-xl shadow-blue-950/25 ring-1 ring-blue-500/30'
                      : 'bg-[#141b2c] border-slate-800/90 hover:border-slate-700/80 hover:bg-[#161e31]'
                  }`}
                >
                  {/* Top Header: Avatar, Name, Code & Status */}
                  <div className="flex flex-wrap sm:flex-nowrap items-center justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      {client.avatar ? (
                        <img
                          src={client.avatar}
                          alt={client.name}
                          className="w-11 h-11 rounded-full object-cover ring-2 ring-slate-700/80 shrink-0"
                        />
                      ) : (
                        <div className="w-11 h-11 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-slate-300 text-xs shrink-0">
                          {client.initials}
                        </div>
                      )}
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
                          <h4 className="font-bold text-sm sm:text-base text-slate-100 truncate">{client.name}</h4>
                          <span className="text-[10px] text-slate-400 font-mono bg-slate-800/80 px-2 py-0.5 rounded border border-slate-700/60 shrink-0">
                            {client.code}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 mt-0.5 truncate">{client.email}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 flex-wrap shrink-0">
                      {revokedPasskeys[client.passkey || 'FA-9B2X71'] && (
                        <span className="text-[10px] font-extrabold tracking-wider uppercase px-2 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-800">
                          🚫 REVOKED
                        </span>
                      )}
                      <span
                        className={`text-[10px] font-bold tracking-wider uppercase px-3 py-1 rounded-full border ${
                          client.status === 'ACTIVE'
                            ? 'bg-blue-950/80 border-blue-800 text-blue-300 shadow-sm'
                            : client.status === 'AT RISK'
                            ? 'bg-red-950/80 border-red-900 text-red-300 shadow-sm'
                            : 'bg-amber-950/80 border-amber-800 text-amber-300 shadow-sm'
                        }`}
                      >
                        {client.status}
                      </span>
                    </div>
                  </div>

                  {/* Client Details Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs pt-3 border-t border-slate-800/80">
                    <div className="min-w-0">
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Goal</span>
                      <span className="font-semibold text-slate-200 truncate block mt-0.5">{client.goal}</span>
                    </div>
                    <div className="min-w-0">
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Current Plan</span>
                      <span
                        className={`font-semibold truncate block mt-0.5 ${
                          client.planType === 'pro'
                            ? 'text-blue-300'
                            : client.planType === 'onboarding'
                            ? 'text-amber-400'
                            : 'text-slate-400'
                        }`}
                      >
                        {client.plan}
                      </span>
                    </div>
                    <div className="min-w-0">
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Compliance</span>
                      {client.compliance !== null ? (
                        <div className="flex items-center gap-2 mt-1">
                          <div className="w-16 bg-slate-800 rounded-full h-1.5 overflow-hidden shrink-0">
                            <div
                              style={{ width: `${client.compliance}%` }}
                              className={`h-full rounded-full ${
                                client.compliance < 50 ? 'bg-red-500' : 'bg-blue-400'
                              }`}
                            />
                          </div>
                          <span className="text-xs font-bold text-slate-200">{client.compliance}%</span>
                        </div>
                      ) : (
                        <span className="text-slate-500 mt-0.5 block">--</span>
                      )}
                    </div>
                    <div className="min-w-0">
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Last Active</span>
                      <span className="text-slate-300 font-semibold block mt-0.5">{client.lastActive}</span>
                    </div>
                  </div>

                  {/* Actions Row */}
                  <div className="flex flex-wrap sm:flex-nowrap items-center justify-start sm:justify-end gap-2 pt-3 border-t border-slate-800/80">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (onNavigate) onNavigate('client-details', client);
                        if (showToast) showToast(`Opening details for ${client.name}`);
                      }}
                      className="flex-1 sm:flex-initial px-3 py-1.5 bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-500 hover:to-rose-600 text-white border border-rose-500/50 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-md shadow-red-900/30 transition-all cursor-pointer"
                      title="View Client Details, Programs & Daily Reviews"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Details</span>
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (onOpenClientCredentials) {
                          onOpenClientCredentials(client);
                        } else if (showToast) {
                          showToast(`Passkey for ${client.name}: ${client.passkey || 'FA-9B2X71'}`);
                        }
                      }}
                      className="flex-1 sm:flex-initial px-3 py-1.5 bg-blue-950/70 hover:bg-blue-900/90 text-blue-300 border border-blue-800/60 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-sm"
                      title="View Client Passkey & Invite Link"
                    >
                      <Key className="w-3.5 h-3.5 text-blue-400" />
                      <span>Passkey</span>
                    </button>

                    {/* Cancel / Restore Passkey Action Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        const pk = client.passkey || 'FA-9B2X71';
                        if (onToggleRevokePasskey) onToggleRevokePasskey(pk);
                      }}
                      className={`flex-1 sm:flex-initial px-3 py-1.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer border shadow-sm ${
                        revokedPasskeys[client.passkey || 'FA-9B2X71']
                          ? 'bg-emerald-950/80 hover:bg-emerald-900 text-emerald-300 border-emerald-800/80'
                          : 'bg-rose-950/80 hover:bg-rose-900 text-rose-300 border-rose-800/80'
                      }`}
                      title={revokedPasskeys[client.passkey || 'FA-9B2X71'] ? "Reactivate client login passkey" : "Cancel & Revoke client login passkey"}
                    >
                      {revokedPasskeys[client.passkey || 'FA-9B2X71'] ? (
                        <>
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Restore Passkey</span>
                        </>
                      ) : (
                        <>
                          <Ban className="w-3.5 h-3.5 text-rose-400" />
                          <span>Cancel Passkey</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (onNavigate) onNavigate('coach-chat');
                        if (showToast) showToast(`Opening chat with ${client.name}`);
                      }}
                      className="flex-1 sm:flex-initial px-3 py-1.5 bg-[#171e2e] hover:bg-slate-800 text-blue-300 border border-slate-700/60 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                      title="Chat with Athlete"
                    >
                      <MessageSquare className="w-3.5 h-3.5 text-blue-400" />
                      <span>Message</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Table Footer Pagination */}
          <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
            <span>Showing 1-5 of 42 clients</span>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => showToast && showToast('Previous Page', 'info')}
                className="px-3 py-1 bg-[#171e2e] hover:bg-slate-800 border border-slate-700/60 rounded-lg font-semibold flex items-center gap-1 cursor-pointer"
              >
                <ChevronLeft className="w-3.5 h-3.5" /> Prev
              </button>
              <button 
                onClick={() => showToast && showToast('Next Page', 'info')}
                className="px-3 py-1 bg-[#171e2e] hover:bg-slate-800 border border-slate-700/60 rounded-lg font-semibold flex items-center gap-1 cursor-pointer"
              >
                Next <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Client Detail Side Drawer (Col 4) */}
        <div className="lg:col-span-4 bg-[#121724] border border-slate-800/90 rounded-2xl p-5 shadow-xl space-y-6">
          {/* Drawer Header */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-800/80">
            <div className="flex items-center gap-3">
              {selectedClient.avatar ? (
                <img
                  src={selectedClient.avatar}
                  alt={selectedClient.name}
                  className="w-11 h-11 rounded-full object-cover ring-2 ring-blue-500/40"
                />
              ) : (
                <div className="w-11 h-11 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-slate-200">
                  {selectedClient.initials}
                </div>
              )}
              <div>
                <h3 className="font-serif-header text-lg font-bold text-slate-100">
                  {selectedClient.name}
                </h3>
                <div className="flex items-center gap-2 text-[10px] mt-0.5">
                  <span className="bg-blue-950 text-blue-300 font-bold px-2 py-0.5 rounded uppercase border border-blue-800/60">
                    PRO TIER
                  </span>
                  <span className="text-slate-400">{selectedClient.joined}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Top Metrics Grid */}
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="bg-[#171e2e] border border-slate-700/50 rounded-xl p-3">
              <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase block">
                COMPLIANCE
              </span>
              <span className="text-xl font-extrabold text-blue-400 mt-1 block">
                {selectedClient.compliance ? `${selectedClient.compliance}%` : '--'}
              </span>
            </div>

            <div className="bg-[#171e2e] border border-slate-700/50 rounded-xl p-3">
              <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase block">
                STREAK
              </span>
              <span className="text-xl font-extrabold text-blue-400 mt-1 block">
                {selectedClient.streak}
              </span>
            </div>

            <div className="bg-[#171e2e] border border-slate-700/50 rounded-xl p-3">
              <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase block">
                SESSIONS
              </span>
              <span className="text-xl font-extrabold text-blue-400 mt-1 block">
                {selectedClient.sessions}
              </span>
            </div>
          </div>

          {/* Weight Progress Chart Card */}
          <div className="bg-[#161c2a] border border-slate-700/60 rounded-xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <TrendingDown className="w-4 h-4 text-blue-400" />
                <h4 className="text-xs font-bold text-slate-200">Weight Progress</h4>
              </div>
              <select className="bg-[#111622] text-slate-300 text-[10px] font-semibold rounded-lg px-2 py-1 border border-slate-700/60">
                <option>Last 3 Months</option>
                <option>Last 6 Months</option>
              </select>
            </div>

            {/* SVG Weight Line Graph */}
            <div className="pt-3">
              <svg className="w-full h-24 overflow-visible" viewBox="0 0 270 90" preserveAspectRatio="none">
                {/* Grid Lines */}
                <line x1="0" y1="20" x2="100%" y2="20" stroke="#252e42" strokeDasharray="3 3" />
                <line x1="0" y1="50" x2="100%" y2="50" stroke="#252e42" strokeDasharray="3 3" />
                <line x1="0" y1="80" x2="100%" y2="80" stroke="#252e42" strokeDasharray="3 3" />

                {/* Y-Axis Labels */}
                <text x="0" y="18" fill="#64748b" fontSize="9">190</text>
                <text x="0" y="48" fill="#64748b" fontSize="9">185</text>
                <text x="0" y="78" fill="#64748b" fontSize="9">180</text>

                {/* Line Path */}
                <polyline
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="2.5"
                  points="35,25 90,40 145,65 200,55 255,80"
                />

                {/* Dots */}
                <circle cx="35" cy="25" r="4" fill="#60a5fa" />
                <circle cx="90" cy="40" r="4" fill="#60a5fa" />
                <circle cx="145" cy="65" r="4" fill="#60a5fa" />
                <circle cx="200" cy="55" r="4" fill="#60a5fa" />
                <circle cx="255" cy="80" r="4" fill="#60a5fa" />
              </svg>

              {/* X-Axis Labels */}
              <div className="flex justify-between text-[10px] text-slate-500 pt-1 font-mono px-2">
                <span>Jan</span>
                <span>Feb</span>
                <span>Mar</span>
                <span>Apr</span>
                <span>May</span>
              </div>
            </div>
          </div>

          {/* Progress Photos Card */}
          <div className="bg-[#161c2a] border border-slate-700/60 rounded-xl p-4 space-y-3">
            <h4 className="text-xs font-bold text-slate-200">Progress Photos</h4>
            <div className="grid grid-cols-2 gap-3">
              {/* Photo 1 */}
              <div className="relative rounded-xl overflow-hidden border border-slate-700/60 aspect-square group">
                <img
                  src="https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=400&q=80"
                  alt="Jan Progress"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute bottom-2 left-2 text-[10px] font-bold text-slate-100 bg-slate-950/80 px-2 py-0.5 rounded">
                  Jan 12, 2024
                </span>
              </div>

              {/* Photo 2 */}
              <div className="relative rounded-xl overflow-hidden border border-slate-700/60 aspect-square group">
                <img
                  src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=400&q=80"
                  alt="May Progress"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-2 right-2 text-[9px] font-extrabold text-slate-950 bg-blue-300 px-2 py-0.5 rounded-full uppercase">
                  LATEST
                </span>
                <span className="absolute bottom-2 left-2 text-[10px] font-bold text-slate-100 bg-slate-950/80 px-2 py-0.5 rounded">
                  May 05, 2024
                </span>
              </div>
            </div>
          </div>

          {/* Trainer Notes Card */}
          <div className="bg-[#161c2a] border border-slate-700/60 rounded-xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-slate-200">Trainer Notes</h4>
              <button
                onClick={() => {
                  if (isNoteEditing) {
                    setIsNoteEditing(false);
                    setActiveEditingIndex(null);
                  } else {
                    handleStartNoteEditing();
                  }
                }}
                className="text-[11px] font-semibold text-blue-400 hover:text-blue-300 transition-colors"
              >
                {isNoteEditing ? 'Cancel' : 'Edit Note'}
              </button>
            </div>

            {isNoteEditing ? (
              <div className="space-y-2">
                <textarea
                  rows="4"
                  value={noteText}
                  onChange={(e) => setCustomNoteText(e.target.value)}
                  className="w-full bg-[#111622] text-slate-200 text-xs rounded-lg p-2.5 border border-slate-700 focus:outline-none"
                />
                <button
                  onClick={handleSaveNote}
                  className="py-1.5 px-3 bg-blue-500 hover:bg-blue-600 text-white font-bold text-xs rounded-lg transition-all"
                >
                  Save Note
                </button>
              </div>
            ) : (
              <p className="text-xs text-slate-300/90 leading-relaxed bg-[#111622] p-3 rounded-lg border border-slate-800">
                "{selectedClient.note}"
              </p>
            )}

            <div className="text-[10px] text-slate-500 pt-1">
              Last updated: {selectedClient.lastUpdated}
            </div>
          </div>

          {/* Action Footer Buttons */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => {
                if (onNavigate) onNavigate('coach-chat');
                if (showToast) showToast(`Opening chat with ${selectedClient.name}`);
              }}
              className="py-2.5 bg-[#171e2e] hover:bg-[#1f293d] border border-slate-700 text-slate-200 font-semibold text-xs rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <MessageSquare className="w-3.5 h-3.5" /> Message
            </button>

            <button
              onClick={() => {
                if (onNavigate) onNavigate('nutrition-engine');
                if (showToast) showToast(`Navigated to Nutrition Engine for ${selectedClient.name}`);
              }}
              className="py-2.5 bg-gradient-to-r from-blue-300 via-sky-200 to-blue-200 hover:from-blue-200 hover:to-sky-100 text-slate-950 font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md"
            >
              <Calendar className="w-3.5 h-3.5 text-slate-950" /> Adjust Plan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
