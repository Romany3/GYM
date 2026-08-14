import { useState, useMemo } from 'react';
import { X, Key, Copy, Check, ExternalLink, ShieldCheck, Ban } from 'lucide-react';

export default function ClientCredentialsModal({ 
  isOpen, 
  onClose, 
  clientData, 
  showToast,
  revokedPasskeys = {},
  onToggleRevokePasskey
}) {
  const [copiedKey, setCopiedKey] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const { passkey, username, portalUrl } = useMemo(() => {
    if (!clientData) return { passkey: '', username: '', portalUrl: '' };
    const pk = clientData.passkey || 'FA-9B2X71';
    const un = clientData.email ? clientData.email.split('@')[0] : clientData.name.toLowerCase().replace(/\s+/g, '.');
    const url = `https://fitarch.app/client?code=${clientData.id || 'c1'}_${pk}`;
    return { passkey: pk, username: un, portalUrl: url };
  }, [clientData]);

  if (!isOpen || !clientData) return null;

  const isRevoked = !!revokedPasskeys[passkey];

  const handleCopyPasskey = () => {
    navigator.clipboard?.writeText(passkey);
    setCopiedKey(true);
    if (showToast) showToast('Client passkey copied to clipboard!');
    setTimeout(() => setCopiedKey(false), 2000);
  };

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(portalUrl);
    setCopiedLink(true);
    if (showToast) showToast('Portal invitation link copied!');
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
      <div className="bg-[#121724] border border-slate-800 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-800 bg-gradient-to-r from-blue-950/40 via-indigo-950/30 to-slate-900">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif-header text-lg font-semibold text-slate-100">
                  Client Credentials
                </h3>
                <span className={`text-[9px] font-extrabold px-2 py-0.5 rounded-full uppercase border ${
                  isRevoked
                    ? 'bg-rose-950/90 text-rose-300 border-rose-800'
                    : 'bg-emerald-950/90 text-emerald-400 border-emerald-800'
                }`}>
                  {isRevoked ? '🚫 REVOKED' : '✓ ACTIVE'}
                </span>
              </div>
              <p className="text-xs text-slate-400">Auto-generated login passkey & invite link</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-200 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4">
          {/* Status Alert Banner */}
          {isRevoked ? (
            <div className="p-3.5 bg-rose-950/40 border border-rose-800/60 rounded-xl text-xs text-rose-200 flex items-center gap-2.5">
              <Ban className="w-4 h-4 text-rose-400 shrink-0" />
              <span>
                <strong>Access Blocked:</strong> Passkey for <strong>{clientData.name}</strong> has been cancelled by coach. Client cannot log in.
              </span>
            </div>
          ) : (
            <div className="p-3.5 bg-blue-950/30 border border-blue-800/40 rounded-xl text-xs text-blue-200 flex items-center gap-2.5">
              <Key className="w-4 h-4 text-blue-400 shrink-0" />
              <span>
                Provide these credentials to <strong>{clientData.name}</strong> to grant access to the client mobile app.
              </span>
            </div>
          )}

          {/* Username */}
          <div>
            <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
              Portal Username
            </label>
            <div className="bg-[#171e2e] text-slate-200 text-xs rounded-xl px-3.5 py-2.5 border border-slate-700/60 font-mono">
              {username}
            </div>
          </div>

          {/* Temporary Passkey */}
          <div>
            <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
              Security Passkey
            </label>
            <div className="flex items-center gap-2">
              <div className={`flex-1 font-mono font-bold text-sm tracking-widest rounded-xl px-3.5 py-2.5 border ${
                isRevoked
                  ? 'bg-rose-950/50 text-rose-400 border-rose-800/60 line-through'
                  : 'bg-[#171e2e] text-blue-300 border-slate-700/60'
              }`}>
                {passkey}
              </div>
              <button
                onClick={handleCopyPasskey}
                disabled={isRevoked}
                className={`px-3 py-2.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-all ${
                  isRevoked
                    ? 'bg-slate-900 border-slate-800 text-slate-600 cursor-not-allowed'
                    : 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-200 cursor-pointer'
                }`}
              >
                {copiedKey ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-slate-400" />}
                <span>{copiedKey ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </div>

          {/* Client Portal Link */}
          <div>
            <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
              Client Portal Invite Link
            </label>
            <div className="flex items-center gap-2">
              <input
                readOnly
                type="text"
                value={portalUrl}
                className="flex-1 bg-[#171e2e] text-slate-400 text-xs rounded-xl px-3.5 py-2.5 border border-slate-700/60 truncate focus:outline-none"
              />
              <button
                onClick={handleCopyLink}
                className="px-3 py-2.5 rounded-xl bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/30 text-xs font-semibold text-blue-300 flex items-center gap-1.5 transition-all"
              >
                {copiedLink ? <Check className="w-4 h-4 text-emerald-400" /> : <ExternalLink className="w-4 h-4 text-blue-400" />}
                <span>{copiedLink ? 'Copied' : 'Link'}</span>
              </button>
            </div>
          </div>

          {/* Cancel / Revoke Passkey Control Button */}
          <div className="pt-2 border-t border-slate-800 space-y-2">
            <button
              onClick={() => onToggleRevokePasskey && onToggleRevokePasskey(passkey)}
              className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md ${
                isRevoked
                  ? 'bg-emerald-950/80 hover:bg-emerald-900 text-emerald-300 border border-emerald-800/80'
                  : 'bg-rose-950/80 hover:bg-rose-900 text-rose-300 border border-rose-800/80'
              }`}
            >
              {isRevoked ? (
                <>
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Restore & Reactivate Client Passkey</span>
                </>
              ) : (
                <>
                  <Ban className="w-4 h-4 text-rose-400" />
                  <span>Cancel & Revoke Client Passkey</span>
                </>
              )}
            </button>

            <button
              onClick={onClose}
              className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs rounded-xl transition-all"
            >
              Done & Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
