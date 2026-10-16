import React from 'react';
import { useApp } from '../context/AppContext';
import { TrackaaLogo } from '../components/TrackaaLogo';
import { Sun, Moon, RotateCcw, Shield, Palette, Database, Check } from 'lucide-react';

export const Settings: React.FC = () => {
  const { theme, toggleTheme, resetAllData } = useApp();

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
          Configure branding, theme engine, and data storage
        </p>
      </div>

      <div className="space-y-6">
        {/* Section 1: Appearance & Theme */}
        <div className="rounded-3xl glass-panel p-6 sm:p-7 border border-black/5 dark:border-white/10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-xl bg-trackaa-green/15 text-trackaa-green flex items-center justify-center">
              <Palette className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900 dark:text-white">Theme Engine</h2>
              <p className="text-xs text-slate-500">Choose between Apple Dark Glass or Clean Slate Light</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
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
                <div className="w-8 h-8 rounded-xl bg-slate-100 text-slate-900 flex items-center justify-center border border-black/10">
                  <Sun className="w-4 h-4 text-amber-500" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white">Clean Slate Light</div>
                  <div className="text-[11px] text-slate-400">Pure White `#FFFFFF` + Slate `#F8FAFC`</div>
                </div>
              </div>
              {theme === 'light' && <Check className="w-4 h-4 text-trackaa-green" />}
            </button>
          </div>
        </div>

        {/* Section 2: Brand Identity Verification */}
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

          <div className="grid grid-cols-2 gap-4">
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

        {/* Section 3: Data Management */}
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
