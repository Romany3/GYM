import { useState } from 'react';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();
  const [activeFilter, setActiveFilter] = useState('ALL');

  const [notifications, setNotifications] = useState([
    {
      id: 'n0',
      type: 'daily_log',
      titleEn: 'Daily Log & Meal Report Submitted',
      titleAr: 'تم تقديم السجل اليومي والوجبات',
      messageEn: 'Marcus Jensen submitted today\'s Daily Log (4 prescribed meals eaten, 3 workouts completed, Note: "Felt strong on bench press").',
      messageAr: 'قام Marcus Jensen بتقديم السجل اليومي اليوم (تناول 4 وجبات محددة، وأكمل 3 تمارين).',
      timeKey: 'justNow',
      unread: true,
      category: 'LOG',
      actionKey: 'notifications.reviewDailyLog',
      actionType: 'client-details',
    },
    {
      id: 'n1',
      type: 'exercise_swap',
      titleEn: 'Exercise Substitution Request',
      titleAr: 'طلب استبدال تمرين',
      messageEn: 'Sarah Connor requested to swap Barbell Squat due to knee discomfort.',
      messageAr: 'طلبت Sarah Connor استبدال تمرين السكوات بسبب آلام الركبة.',
      timeKey: 'minsAgo',
      timeVal: 12,
      unread: true,
      category: 'SWAP',
      actionKey: 'notifications.reviewRequest',
      actionType: 'swap',
    },
    {
      id: 'n2',
      type: 'checkin',
      titleEn: 'Weekly Check-In Submitted',
      titleAr: 'تم تقديم المتابعة الأسبوعية',
      messageEn: 'Marcus Johnson completed his Week 4 evaluation form & uploaded 3 progress photos.',
      messageAr: 'أكمل Marcus Johnson نموذج تقييم الأسبوع 4 ورفع 3 صور للتقدم.',
      timeKey: 'minsAgo',
      timeVal: 45,
      unread: true,
      category: 'CHECKIN',
      actionKey: 'notifications.viewProgressPhotos',
      actionType: 'client-details',
    },
    {
      id: 'n3',
      type: 'client_new',
      titleEn: 'New Client Invitation Activated',
      titleAr: 'تم تفعيل دعوة زبون جديد',
      messageEn: 'David Miller logged into the Client Portal for the first time using passkey FA-8X92K1.',
      messageAr: 'قام David Miller بتسجيل الدخول إلى بوابة الزبائن لأول مرة باستخدام الرمز FA-8X92K1.',
      timeKey: 'hoursAgo',
      timeVal: 2,
      unread: true,
      category: 'CLIENT',
      actionKey: 'notifications.openClientProfile',
      actionType: 'clients',
    },
    {
      id: 'n4',
      type: 'alert',
      titleEn: 'At-Risk Inactivity Warning',
      titleAr: 'تحذير زبون في خطر الانقطاع',
      messageEn: 'Jason Stark has not logged any workouts or meals for 4 consecutive days.',
      messageAr: 'لم يقم Jason Stark بتسجيل أي تمارين أو وجبات لمدة 4 أيام متتالية.',
      timeKey: 'hoursAgo',
      timeVal: 5,
      unread: false,
      category: 'ALERT',
      actionKey: 'notifications.nudgeClient',
      actionType: 'nudge',
    },
  ]);

  const unreadCount = notifications.filter((n) => n.unread).length;

  const handleMarkAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
    if (showToast) showToast('Marked all notifications as read', 'info');
  };

  const handleClearAll = () => {
    setNotifications([]);
    if (showToast) showToast('Cleared notification log', 'info');
  };

  const handleNotificationAction = (notif) => {
    if (notif.actionType === 'swap' && onOpenChangeRequests) {
      onOpenChangeRequests();
    } else if (notif.actionType && onNavigate) {
      onNavigate(notif.actionType);
    } else if (notif.actionType === 'nudge' && showToast) {
      showToast(`Nudge notification sent to client`, 'info');
    }
  };

  const filteredNotifications = notifications.filter((n) => {
    if (activeFilter === 'UNREAD') return n.unread;
    if (activeFilter === 'SWAP') return n.category === 'SWAP';
    if (activeFilter === 'CHECKIN') return n.category === 'CHECKIN' || n.category === 'LOG';
    if (activeFilter === 'ALERT') return n.category === 'ALERT';
    return true;
  });

  const isAr = typeof window !== 'undefined' && document.documentElement.lang === 'ar';

  const getTimeLabel = (notif) => {
    if (notif.timeKey === 'justNow') return t('notifications.justNow');
    if (notif.timeKey === 'minsAgo') return t('notifications.minsAgo', { count: notif.timeVal });
    if (notif.timeKey === 'hoursAgo') return t('notifications.hoursAgo', { count: notif.timeVal });
    return notif.timeKey;
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold text-blue-400 bg-blue-950 px-2.5 py-0.5 rounded border border-blue-800/60 uppercase tracking-widest flex items-center gap-1">
              <Bell className="w-3 h-3 text-blue-400" /> {t('notifications.badge')}
            </span>
            {unreadCount > 0 && (
              <span className="text-xs font-bold text-amber-300 bg-amber-950 px-2 py-0.5 rounded-full border border-amber-800/60">
                {t('notifications.unreadCount', { count: unreadCount })}
              </span>
            )}
          </div>
          <h1 className="font-serif-header text-3xl font-bold text-white tracking-tight mt-1">
            {t('notifications.title')}
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            {t('notifications.subtitle')}
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleMarkAllAsRead}
            disabled={unreadCount === 0}
            className="px-3.5 py-2 bg-[#171e2e] hover:bg-slate-800 disabled:opacity-50 text-slate-200 text-xs font-semibold rounded-xl border border-slate-700/60 flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <CheckCheck className="w-4 h-4 text-blue-400" />
            <span>{t('notifications.markAllRead')}</span>
          </button>

          <button
            onClick={handleClearAll}
            disabled={notifications.length === 0}
            className="px-3.5 py-2 bg-[#171e2e] hover:bg-rose-950/60 disabled:opacity-50 text-slate-200 hover:text-rose-300 text-xs font-semibold rounded-xl border border-slate-700/60 flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <Trash2 className="w-4 h-4 text-rose-400" />
            <span>{t('notifications.clearLog')}</span>
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto bg-[#121724] border border-slate-800 p-2 rounded-2xl shadow-lg text-xs font-semibold scrollbar-none">
        {['ALL', 'UNREAD', 'SWAP', 'CHECKIN', 'ALERT'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveFilter(tab)}
            className={`px-4 py-2 rounded-xl whitespace-nowrap transition-all cursor-pointer ${
              activeFilter === tab
                ? 'bg-blue-600 text-white font-bold shadow-md'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
            }`}
          >
            {tab === 'ALL'
              ? t('overview.all')
              : tab === 'UNREAD'
              ? t('notifications.unreadOnly', { count: unreadCount })
              : tab === 'SWAP'
              ? t('notifications.changeRequests')
              : tab === 'CHECKIN'
              ? t('notifications.logsPhotos')
              : t('notifications.criticalAlerts')}
          </button>
        ))}
      </div>

      {/* Feed List */}
      <div className="space-y-3">
        {filteredNotifications.length === 0 ? (
          <div className="bg-[#121724] border border-slate-800 rounded-2xl p-12 text-center space-y-3 shadow-xl">
            <div className="w-14 h-14 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center mx-auto text-slate-500">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-200">No Notifications</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              You are all caught up! Real-time alerts for athlete check-ins and requests will appear here.
            </p>
          </div>
        ) : (
          filteredNotifications.map((notif) => {
            const title = isAr ? notif.titleAr : notif.titleEn;
            const message = isAr ? notif.messageAr : notif.messageEn;
            return (
              <div
                key={notif.id}
                className={`bg-[#121724] border rounded-2xl p-4.5 shadow-xl transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                  notif.unread
                    ? 'border-blue-500/40 bg-gradient-to-r from-blue-950/20 via-[#121724] to-[#121724]'
                    : 'border-slate-800/80 opacity-90'
                }`}
              >
                <div className="flex items-start gap-3.5 min-w-0">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border ${
                      notif.category === 'SWAP'
                        ? 'bg-amber-950/60 border-amber-800/60 text-amber-400'
                        : notif.category === 'ALERT'
                        ? 'bg-rose-950/60 border-rose-800/60 text-rose-400'
                        : notif.category === 'CLIENT'
                        ? 'bg-emerald-950/60 border-emerald-800/60 text-emerald-400'
                        : 'bg-blue-950/60 border-blue-800/60 text-blue-400'
                    }`}
                  >
                    {notif.category === 'SWAP' ? (
                      <RefreshCw className="w-4 h-4" />
                    ) : notif.category === 'ALERT' ? (
                      <AlertTriangle className="w-4 h-4" />
                    ) : notif.category === 'CLIENT' ? (
                      <UserPlus className="w-4 h-4" />
                    ) : (
                      <Calendar className="w-4 h-4" />
                    )}
                  </div>

                  <div className="min-w-0 space-y-0.5">
                    <div className="flex items-center gap-2">
                      <h4 className="text-xs font-bold text-slate-100 truncate">{title}</h4>
                      {notif.unread && (
                        <span className="w-2 h-2 bg-blue-400 rounded-full shrink-0 animate-pulse" />
                      )}
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">{message}</p>
                    <span className="text-[10px] text-slate-500 font-mono block pt-0.5">
                      {getTimeLabel(notif)}
                    </span>
                  </div>
                </div>

                {notif.actionKey && (
                  <button
                    onClick={() => handleNotificationAction(notif)}
                    className="py-2 px-3.5 bg-[#171e2e] hover:bg-slate-800 text-blue-300 hover:text-white border border-slate-700/60 rounded-xl text-xs font-semibold transition-all cursor-pointer shrink-0 text-center"
                  >
                    {t(notif.actionKey)}
                  </button>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
