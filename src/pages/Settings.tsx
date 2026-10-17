import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { TrackaaLogo } from '../components/TrackaaLogo';
import {
  Sun,
  Moon,
  RotateCcw,
  Shield,
  Palette,
  Database,
  Check,
  User,
  KeyRound,
  Mail,
  Lock,
  Eye,
  EyeOff,
  CheckCircle2,
} from 'lucide-react';

export const Settings: React.FC = () => {
  const { theme, toggleTheme, resetAllData, currentUser, resetAdminPassword } = useApp();

  // Password reset state
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState('');

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError('');
    setPasswordSuccess('');

    if (!newPassword.trim()) {
      setPasswordError('Please enter a new password.');
      return;
    }

    if (newPassword.length < 6) {
      setPasswordError('Password must be at least 6 characters.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError('Passwords do not match.');
      return;
    }

    resetAdminPassword(newPassword);
    setPasswordSuccess('Admin password updated successfully.');
    setNewPassword('');
    setConfirmPassword('');
    setTimeout(() => setPasswordSuccess(''), 4000);
  };

  const handleReset = () => {
    if (window.confirm('Reset workspace data back to clean founder starter kits?')) {
      resetAllData();
      alert('Data reset successfully.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 animate-fade-in">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          System Settings & Preferences
        </h1>
        <p className="mt-1 text-xs sm:text-sm text-slate-500">
          Manage your administrator profile, security credentials, branding, and theme engine
        </p>
      </div>

      <div className="space-y-6">
        {/* Section 1: Admin Profile & Credentials */}
        <div className="rounded-3xl glass-panel p-6 sm:p-7 border border-black/5 dark:border-white/10">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-8 h-8 rounded-xl bg-trackaa-green/15 text-trackaa-green flex items-center justify-center">
              <User className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900 dark:text-white">Admin Profile & Security</h2>
              <p className="text-xs text-slate-500">
                Primary administrator account details and password management
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
            {/* Account Details */}
            <div className="p-4 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 space-y-3">
              <div className="flex items-center gap-3">
                <img
                  src={
                    currentUser.avatar_url ||
                    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80'
                  }
                  alt={currentUser.full_name}
                  className="w-12 h-12 rounded-2xl object-cover ring-2 ring-trackaa-green/30"
                />
                <div>
                  <div className="text-sm font-bold text-slate-900 dark:text-white">
                    {currentUser.full_name}
                  </div>
                  <div className="text-xs text-trackaa-green font-semibold">
                    {currentUser.role}
                  </div>
                  <span className="inline-block mt-0.5 px-2 py-0.2 rounded-full text-[9px] font-bold bg-trackaa-green text-white">
                    Superadmin
                  </span>
                </div>
              </div>

              <div className="pt-2 border-t border-black/5 dark:border-white/10 space-y-1.5 text-xs">
                <div className="flex items-center justify-between text-slate-500">
                  <span className="flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-slate-400" />
                    <span>Admin Email:</span>
                  </span>
                  <span className="font-mono font-semibold text-slate-900 dark:text-white">
                    {currentUser.email || 'Trylonofficial@gmail.com'}
                  </span>
                </div>
                <div className="flex items-center justify-between text-slate-500">
                  <span className="flex items-center gap-1.5">
                    <Shield className="w-3.5 h-3.5 text-slate-400" />
                    <span>Role Access:</span>
                  </span>
                  <span className="text-slate-800 dark:text-slate-200 font-medium">
                    Unrestricted OS Control
                  </span>
                </div>
              </div>
            </div>

            {/* Password Reset Card */}
            <div className="p-4 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2 text-xs font-bold text-slate-900 dark:text-white">
                  <KeyRound className="w-3.5 h-3.5 text-trackaa-green" />
                  <span>Password Reset</span>
                </div>
                <p className="text-[11px] text-slate-400 mb-3">
                  Update your founder password to keep your startup operations secure
                </p>

                <form onSubmit={handleResetPassword} className="space-y-2.5">
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="New password (min 6 chars)"
                      value={newPassword}
                      onChange={e => setNewPassword(e.target.value)}
                      className="w-full pl-8 pr-8 py-1.5 rounded-xl text-xs bg-white dark:bg-slate-900 border border-black/10 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-trackaa-green/40"
                    />
                    <Lock className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600 dark:hover:text-white"
                    >
                      {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    </button>
                  </div>

                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Confirm new password"
                      value={confirmPassword}
                      onChange={e => setConfirmPassword(e.target.value)}
                      className="w-full pl-8 pr-3 py-1.5 rounded-xl text-xs bg-white dark:bg-slate-900 border border-black/10 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-trackaa-green/40"
                    />
                    <Lock className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                  </div>

                  {passwordError && (
                    <p className="text-[10px] text-rose-500 font-semibold">{passwordError}</p>
                  )}

                  {passwordSuccess && (
                    <div className="flex items-center gap-1.5 text-[10px] text-emerald-500 font-semibold">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{passwordSuccess}</span>
                    </div>
                  )}

                  <div className="pt-1 flex justify-end">
                    <button
                      type="submit"
                      className="px-3 py-1.5 rounded-xl bg-trackaa-green text-white font-bold text-xs hover:bg-[#059669] shadow-glow-emerald transition-all"
                    >
                      Update Password
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Appearance & Theme */}
        <div className="rounded-3xl glass-panel p-6 sm:p-7 border border-black/5 dark:border-white/10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-xl bg-trackaa-green/15 text-trackaa-green flex items-center justify-center">
              <Palette className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900 dark:text-white">Theme Engine</h2>
              <p className="text-xs text-slate-500">Choose between Apple Dark Glass or Soft Slate Gray Light</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => theme === 'light' && toggleTheme()}
              className={`p-4 rounded-2xl border text-left flex items-center justify-between transition-all ${
                theme === 'dark'
                  ? 'bg-white/10 border-trackaa-green shadow-sm'
                  : 'bg-black/5 border-transparent text-slate-400 hover:bg-black/10'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-[#0A111E] text-slate-100 flex items-center justify-center border border-white/10">
                  <Moon className="w-4 h-4 text-trackaa-green" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white">Obsidian Dark Glass</div>
                  <div className="text-[11px] text-slate-400">Deep Navy `#0A111E` + Action Green</div>
                </div>
              </div>
              {theme === 'dark' && <Check className="w-4 h-4 text-trackaa-green" />}
            </button>

            <button
              type="button"
              onClick={() => theme === 'dark' && toggleTheme()}
              className={`p-4 rounded-2xl border text-left flex items-center justify-between transition-all ${
                theme === 'light'
                  ? 'bg-black/10 border-trackaa-green shadow-sm'
                  : 'bg-black/5 dark:bg-white/5 border-transparent text-slate-400 hover:bg-white/10'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-slate-200 text-slate-900 flex items-center justify-center border border-black/10">
                  <Sun className="w-4 h-4 text-amber-500" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white">Soft Gradient Gray</div>
                  <div className="text-[11px] text-slate-400">Toned down subtle gray `#EAEFF5` &rarr; `#D9E0E8`</div>
                </div>
              </div>
              {theme === 'light' && <Check className="w-4 h-4 text-trackaa-green" />}
            </button>
          </div>
        </div>

        {/* Section 3: Brand Identity Verification */}
        <div className="rounded-3xl glass-panel p-6 sm:p-7 border border-black/5 dark:border-white/10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-xl bg-cyan-500/15 text-cyan-400 flex items-center justify-center">
              <Shield className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900 dark:text-white">Trackaa Official Brand Mark</h2>
              <p className="text-xs text-slate-500">Official vector assets in active light and dark modes</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-white border border-slate-200 flex flex-col items-center justify-center">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Light Mode Logo</span>
              <img src="/trackaa-logo-light.png" alt="Trackaa Light" className="h-8 object-contain" />
            </div>

            <div className="p-4 rounded-2xl bg-[#0A111E] border border-white/10 flex flex-col items-center justify-center">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Dark Mode Logo</span>
              <img src="/trackaa-logo-dark.png" alt="Trackaa Dark" className="h-8 object-contain" />
            </div>
          </div>
        </div>

        {/* Section 4: Data Storage */}
        <div className="rounded-3xl glass-panel p-6 sm:p-7 border border-black/5 dark:border-white/10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-xl bg-rose-500/15 text-rose-500 flex items-center justify-center">
              <Database className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900 dark:text-white">Data Storage & Reset</h2>
              <p className="text-xs text-slate-500">Local persistent founder storage & cache management</p>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <div>
              <div className="text-xs font-semibold text-slate-900 dark:text-white">Restore Initial Demo Dataset</div>
              <p className="text-[11px] text-slate-500">Reset tasks, blockers, and financial ledger to clean state</p>
            </div>
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-rose-600 dark:text-rose-400 bg-rose-500/10 hover:bg-rose-500/20 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Data</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
