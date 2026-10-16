import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, AlertOctagon } from 'lucide-react';

interface NewBlockerModalProps {
  projectId: string;
  isOpen: boolean;
  onClose: () => void;
}

export const NewBlockerModal: React.FC<NewBlockerModalProps> = ({ projectId, isOpen, onClose }) => {
  const { addBlocker } = useApp();
  const [description, setDescription] = useState('');
  const [severity, setSeverity] = useState<'low' | 'medium' | 'high'>('high');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) return;

    addBlocker({
      project_id: projectId,
      description: description.trim(),
      severity,
      resolved: false,
      resolution: '',
    });

    setDescription('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-md glass-dropdown rounded-3xl p-6 shadow-2xl border border-black/10 dark:border-white/15 animate-slide-up">
        <div className="flex items-center justify-between pb-3 border-b border-black/5 dark:border-white/10">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-rose-500/15 text-rose-500 flex items-center justify-center">
              <AlertOctagon className="w-4 h-4" />
            </div>
            <h2 className="text-sm font-bold text-slate-900 dark:text-white">Log Venture Blocker</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-7 h-7 rounded-full flex items-center justify-center text-slate-400 hover:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-3.5">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Blocker Description *
            </label>
            <textarea
              required
              rows={3}
              placeholder="What is stopping momentum? (e.g., Stripe banking authorization pending, cloud quota hit)"
              value={description}
              onChange={e => setDescription(e.target.value)}
              className="w-full px-3 py-2 rounded-xl text-xs bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-rose-500/40"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Severity Level
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['low', 'medium', 'high'] as const).map(lvl => (
                <button
                  key={lvl}
                  type="button"
                  onClick={() => setSeverity(lvl)}
                  className={`py-2 px-3 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all border ${
                    severity === lvl
                      ? lvl === 'high'
                        ? 'bg-rose-500/20 text-rose-400 border-rose-500/40 shadow-sm'
                        : lvl === 'medium'
                        ? 'bg-amber-500/20 text-amber-400 border-amber-500/40 shadow-sm'
                        : 'bg-slate-500/20 text-slate-300 border-slate-500/40 shadow-sm'
                      : 'bg-black/5 dark:bg-white/5 border-transparent text-slate-400 hover:bg-black/10'
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-3 border-t border-black/5 dark:border-white/10">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-1.5 rounded-xl text-xs font-medium text-slate-500 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 rounded-xl bg-rose-500 text-white font-bold text-xs hover:bg-rose-600 shadow-md transition-all"
            >
              Log Blocker
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
