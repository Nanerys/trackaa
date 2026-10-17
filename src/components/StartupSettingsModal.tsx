import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Startup } from '../types';
import {
  X,
  Settings,
  Shield,
  Users,
  Globe,
  Image as ImageIcon,
  Check,
  AlertTriangle,
  Lock,
} from 'lucide-react';

interface StartupSettingsModalProps {
  startup: Startup;
  isOpen: boolean;
  onClose: () => void;
}

export const StartupSettingsModal: React.FC<StartupSettingsModalProps> = ({
  startup,
  isOpen,
  onClose,
}) => {
  const { updateStartupSettings, profiles, currentUser } = useApp();

  const [name, setName] = useState(startup.name);
  const [description, setDescription] = useState(startup.description);
  const [logoUrl, setLogoUrl] = useState(startup.logo_url || '');
  const [websiteUrl, setWebsiteUrl] = useState(startup.website_url || '');
  const [settingsAccessIds, setSettingsAccessIds] = useState<string[]>(
    startup.settings_access_user_ids || [currentUser.id]
  );
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    if (startup) {
      setName(startup.name);
      setDescription(startup.description);
      setLogoUrl(startup.logo_url || '');
      setWebsiteUrl(startup.website_url || '');
      setSettingsAccessIds(startup.settings_access_user_ids || [currentUser.id]);
    }
  }, [startup, currentUser.id]);

  if (!isOpen) return null;

  const handleToggleMemberAccess = (memberId: string) => {
    setSettingsAccessIds(prev =>
      prev.includes(memberId) ? prev.filter(id => id !== memberId) : [...prev, memberId]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    updateStartupSettings(startup.id, {
      name: name.trim(),
      description: description.trim(),
      logo_url: logoUrl.trim() || undefined,
      website_url: websiteUrl.trim() || undefined,
      settings_access_user_ids: settingsAccessIds,
    });

    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-lg glass-dropdown rounded-3xl p-6 sm:p-7 shadow-2xl border border-black/10 dark:border-white/15 animate-slide-up my-6 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-3.5 border-b border-black/5 dark:border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-trackaa-green/15 text-trackaa-green flex items-center justify-center">
              <Settings className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900 dark:text-white">
                Startup Settings: {startup.name}
              </h2>
              <p className="text-[11px] text-slate-400">
                Configure venture profile and delegate settings permissions
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-7 h-7 rounded-full flex items-center justify-center text-slate-400 hover:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          {/* Section 1: Core Details */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Startup Name *
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl text-xs bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-trackaa-green/40"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Startup Overview / Description
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={e => setDescription(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl text-xs bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-slate-900 dark:text-white resize-none focus:outline-none focus:ring-2 focus:ring-trackaa-green/40 leading-relaxed"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Website URL
              </label>
              <div className="relative">
                <input
                  type="url"
                  placeholder="https://example.com"
                  value={websiteUrl}
                  onChange={e => setWebsiteUrl(e.target.value)}
                  className="w-full pl-8 pr-3 py-2 rounded-xl text-xs bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-trackaa-green/40"
                />
                <Globe className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Logo Image URL
              </label>
              <div className="relative">
                <input
                  type="url"
                  placeholder="https://..."
                  value={logoUrl}
                  onChange={e => setLogoUrl(e.target.value)}
                  className="w-full pl-8 pr-3 py-2 rounded-xl text-xs bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-trackaa-green/40"
                />
                <ImageIcon className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
              </div>
            </div>
          </div>

          {/* Section 2: Team Member Settings Access Delegation */}
          <div className="pt-2">
            <div className="flex items-center gap-2 mb-1.5">
              <Shield className="w-4 h-4 text-trackaa-green" />
              <label className="text-xs font-bold text-slate-900 dark:text-white">
                Delegate Settings Access
              </label>
            </div>
            <p className="text-[11px] text-slate-400 mb-3">
              Select team members who are permitted to edit this startup's name, overview, and configurations:
            </p>

            <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
              {profiles.map(member => {
                const hasAccess = settingsAccessIds.includes(member.id);
                const isCurrent = member.id === currentUser.id;

                return (
                  <div
                    key={member.id}
                    onClick={() => handleToggleMemberAccess(member.id)}
                    className={`flex items-center justify-between p-2.5 rounded-xl border cursor-pointer transition-all ${
                      hasAccess
                        ? 'bg-trackaa-green/10 border-trackaa-green/40 text-slate-900 dark:text-white'
                        : 'bg-black/5 dark:bg-white/5 border-black/5 dark:border-white/10 text-slate-500 hover:bg-black/10'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <img
                        src={member.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=128&q=80'}
                        alt={member.full_name}
                        className="w-6 h-6 rounded-full object-cover"
                      />
                      <div>
                        <div className="text-xs font-semibold flex items-center gap-1.5">
                          <span>{member.full_name}</span>
                          {isCurrent && (
                            <span className="text-[10px] text-trackaa-green font-bold">(You)</span>
                          )}
                          {member.is_admin && (
                            <span className="text-[9px] px-1.5 py-0.2 rounded bg-slate-200 dark:bg-white/10 text-slate-700 dark:text-slate-300">
                              Admin
                            </span>
                          )}
                        </div>
                        <div className="text-[10px] text-slate-400">{member.role}</div>
                      </div>
                    </div>

                    <div
                      className={`w-5 h-5 rounded-lg border flex items-center justify-center transition-all ${
                        hasAccess
                          ? 'bg-trackaa-green border-trackaa-green text-white'
                          : 'border-slate-400'
                      }`}
                    >
                      {hasAccess && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-between pt-4 border-t border-black/5 dark:border-white/10">
            <span className="text-[11px] text-slate-400">
              {settingsAccessIds.length} member{settingsAccessIds.length === 1 ? '' : 's'} with settings access
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-3.5 py-1.5 rounded-xl text-xs font-medium text-slate-500 hover:text-slate-700 dark:hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={savedSuccess}
                className="px-4 py-1.5 rounded-xl bg-trackaa-green text-white font-bold text-xs hover:bg-[#059669] shadow-glow-emerald transition-all flex items-center gap-1.5"
              >
                {savedSuccess ? (
                  <>
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                    <span>Saved!</span>
                  </>
                ) : (
                  <span>Save Settings</span>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
