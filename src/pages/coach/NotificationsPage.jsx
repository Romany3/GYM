import { useState } from 'react';
import { 
  RefreshCw, 
  Calendar, 
  UserPlus, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  Trash2,
  CheckCheck,
  Bell
} from 'lucide-react';

export default function NotificationsPage({ onNavigate, onOpenChangeRequests, showToast }) {
  const [activeFilter, setActiveFilter] = useState('ALL');

  const [notifications, setNotifications] = useState([
    {
      id: 'n0',
      type: 'daily_log',
      title: 'Daily Log & Meal Report Submitted',
      message: 'Marcus Jensen submitted today\'s Daily Log (4 prescribed meals eaten, 3 workouts completed, Note: "Felt strong on bench press").',
      time: 'Just now',
      unread: true,
      category: 'LOG',
      actionLabel: 'Review Daily Log',
      actionType: 'client-details',
    },
    {
      id: 'n1',
      type: 'exercise_swap',
      title: 'Exercise Substitution Request',
      message: 'Sarah Connor requested to swap Barbell Squat due to knee discomfort.',
      time: '12 mins ago',
      unread: true,
      category: 'SWAP',
      actionLabel: 'Review Request',
      actionType: 'swap',
    },
    {
      id: 'n2',
      type: 'checkin',
      title: 'Weekly Check-In Submitted',
      message: 'Marcus Johnson completed his Week 4 evaluation form & uploaded 3 progress photos.',
      time: '45 mins ago',
      unread: true,
      category: 'CHECKIN',
      actionLabel: 'View Progress Photos',
      actionType: 'client-details',
    },
    {
      id: 'n3',
      type: 'client_new',
      title: 'New Client Invitation Activated',
      message: 'David Miller logged into the Client Portal for the first time using passkey FA-8X92K1.',
      time: '2 hours ago',
      unread: true,
      category: 'CLIENT',
      actionLabel: 'Open Client Profile',
      actionType: 'clients',
    },
    {
      id: 'n4',
      type: 'expiry_warning',
      title: 'Subscription Renewal Alert',
      message: 'Elena Rodriguez subscription is scheduled to renew in 5 days.',
      time: '1 day ago',
      unread: false,
      category: 'SYSTEM',
      actionLabel: 'View Subscription',
      actionType: 'clients',
    },
    {
      id: 'n5',
      type: 'workout_log',
      title: 'Workout Log Completed',
      message: 'Michael Lee finished Push Session (12 sets, 4,200 kg total volume logged).',
      time: '2 days ago',
      unread: false,
      category: 'WORKOUT',
      actionLabel: 'Review Log',
      actionType: 'nutrition-engine',
    },
  ]);

  const unreadCount = notifications.filter((n) => n.unread).length;

  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
    if (showToast) showToast('Marked all notifications as read!');
  };

  const handleClearNotification = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
    if (showToast) showToast('Notification cleared', 'info');
  };

  const filteredNotifications = notifications.filter((n) => {
    if (activeFilter === 'ALL') return true;
    if (activeFilter === 'UNREAD') return n.unread;
    return n.category === activeFilter;
  });

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'daily_log':
        return <CheckCircle2 className="w-4 h-4 text-emerald-400" />;
      case 'exercise_swap':
        return <RefreshCw className="w-4 h-4 text-amber-400" />;
      case 'checkin':
        return <Calendar className="w-4 h-4 text-blue-400" />;
      case 'client_new':
        return <UserPlus className="w-4 h-4 text-emerald-400" />;
      case 'expiry_warning':
        return <AlertTriangle className="w-4 h-4 text-pink-400" />;
      default:
        return <CheckCircle2 className="w-4 h-4 text-sky-400" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#121724] border border-slate-800/90 rounded-3xl p-5 sm:p-6 shadow-xl">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0 shadow-lg">
            <Bell className="w-6 h-6" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2.5">
              <h1 className="font-serif-header text-xl sm:text-3xl font-bold text-white tracking-tight">
                Notifications & Activity Log
              </h1>
              {unreadCount > 0 && (
                <span className="text-xs font-extrabold text-amber-300 bg-amber-950/80 px-3 py-1 rounded-full border border-amber-800/80 shadow-sm flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                  {unreadCount} Unread
                </span>
              )}
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Click any notification action to navigate directly to the requested section.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <button
            onClick={handleMarkAllRead}
            className="w-full md:w-auto flex items-center justify-center gap-2 py-2.5 px-4 bg-[#171e2e] hover:bg-slate-800 text-slate-200 border border-slate-700/60 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-sm"
          >
            <CheckCheck className="w-4 h-4 text-emerald-400" />
            <span>Mark All as Read</span>
          </button>
        </div>
      </div>

      {/* Filter Tabs Bar */}
      <div className="flex items-center gap-1.5 overflow-x-auto bg-[#121724] p-1.5 rounded-2xl border border-slate-800 text-xs font-semibold scrollbar-none">
        {['ALL', 'UNREAD', 'LOG', 'SWAP', 'CHECKIN', 'CLIENT', 'SYSTEM'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveFilter(tab)}
            className={`px-3.5 py-1.5 rounded-xl whitespace-nowrap transition-all ${
              activeFilter === tab
                ? 'bg-blue-600 text-white font-bold shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {tab === 'ALL' ? 'All Alerts' : tab === 'UNREAD' ? `Unread (${unreadCount})` : tab}
          </button>
        ))}
      </div>

      {/* Notifications Feed */}
      <div className="space-y-3">
        {filteredNotifications.length === 0 ? (
          <div className="bg-[#121724] border border-slate-800 rounded-2xl p-8 text-center space-y-2">
            <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto opacity-80" />
            <h3 className="text-sm font-bold text-slate-200">No Notifications Found</h3>
            <p className="text-xs text-slate-400">You are all caught up on client updates & alerts!</p>
          </div>
        ) : (
          filteredNotifications.map((n) => (
            <div
              key={n.id}
              className={`bg-[#121724] border rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all hover:border-slate-700 ${
                n.unread ? 'border-blue-500/40 bg-gradient-to-r from-blue-950/20 via-slate-900 to-slate-900 shadow-md' : 'border-slate-800/80 opacity-90'
              }`}
            >
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center shrink-0">
                  {getNotificationIcon(n.type)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-bold text-slate-100">{n.title}</h4>
                    {n.unread && (
                      <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                    )}
                  </div>
                  <p className="text-xs text-slate-300 mt-1">{n.message}</p>
                  <span className="text-[10px] text-slate-500 flex items-center gap-1 mt-1 font-mono">
                    <Clock className="w-3 h-3" /> {n.time}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 shrink-0 justify-end">
                <button
                  onClick={() => {
                    if (n.actionType === 'swap' && onOpenChangeRequests) {
                      onOpenChangeRequests();
                    } else if (onNavigate) {
                      onNavigate(n.actionType);
                    }
                  }}
                  className="px-3.5 py-1.5 bg-blue-950/80 hover:bg-blue-900 text-blue-300 border border-blue-800/60 rounded-xl text-xs font-bold transition-all cursor-pointer"
                >
                  {n.actionLabel}
                </button>
                <button
                  onClick={() => handleClearNotification(n.id)}
                  className="p-2 text-slate-500 hover:text-red-400 hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
                  title="Clear notification"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
