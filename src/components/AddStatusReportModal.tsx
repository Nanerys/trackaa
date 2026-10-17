import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { StatusReport } from '../types';
import { X, StickyNote, Plus, Sparkles } from 'lucide-react';

interface AddStatusReportModalProps {
  startupId: string;
  isOpen: boolean;
  onClose: () => void;
}

export const AddStatusReportModal: React.FC<AddStatusReportModalProps> = ({
  startupId,
  isOpen,
  onClose,
}) => {
  const { addStatusReport, currentStartup } = useApp();
  const [content, setContent] = useState('');
  const [color, setColor] = useState<StatusReport['color']>('amber');

  if (!isOpen) return null;

  const colorOptions: { id: StatusReport['color']; label: string; bgClass: string; borderClass: string }[] = [
    { id: 'amber', label: 'Amber Sticky', bgClass: 'bg-amber-400', borderClass: 'border-amber-500' },
    { id: 'emerald', label: 'Emerald Mint', bgClass: 'bg-emerald-400', borderClass: 'border-emerald-500' },
    { id: 'blue', label: 'Sky Blue', bgClass: 'bg-sky-400', borderClass: 'border-sky-500' },
    { id: 'rose', label: 'Rose Coral', bgClass: 'bg-rose-400', borderClass: 'border-rose-500' },
    { id: 'purple', label: 'Lilac Purple', bgClass: 'bg-purple-400', borderClass: 'border-purple-500' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    addStatusReport(content.trim(), color, startupId);
    setContent('');
    setColor('amber');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-md glass-dropdown rounded-3xl p-6 shadow-2xl border border-black/10 dark:border-white/15 animate-slide-up">
        {/* Header */}
        <div className="flex items-center justify-between pb-3.5 border-b border-black/5 dark:border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-500 flex items-center justify-center">
              <StickyNote className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900 dark:text-white">Tack on Status Bulletin</h2>
              <p className="text-[11px] text-slate-400">Post a high-priority memo for the team</p>
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
          {/* Post-it Note Preview Area */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Status Memo Content *
            </label>
            <div
              className={`p-4 rounded-2xl border shadow-inner transition-colors ${
                color === 'amber'
                  ? 'bg-amber-100/90 dark:bg-amber-950/40 border-amber-300 dark:border-amber-700/50 text-amber-950 dark:text-amber-100'
                  : color === 'emerald'
                  ? 'bg-emerald-100/90 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-700/50 text-emerald-950 dark:text-emerald-100'
                  : color === 'blue'
                  ? 'bg-sky-100/90 dark:bg-sky-950/40 border-sky-300 dark:border-sky-700/50 text-sky-950 dark:text-sky-100'
                  : color === 'rose'
                  ? 'bg-rose-100/90 dark:bg-rose-950/40 border-rose-300 dark:border-rose-700/50 text-rose-950 dark:text-rose-100'
                  : 'bg-purple-100/90 dark:bg-purple-950/40 border-purple-300 dark:border-purple-700/50 text-purple-950 dark:text-purple-100'
              }`}
            >
              <textarea
                required
                rows={3}
                placeholder="e.g., Pitch meeting tomorrow at 10am with lead investor. Pushed latest commit to staging."
                value={content}
                onChange={e => setContent(e.target.value)}
                className="w-full bg-transparent resize-none text-xs focus:outline-none placeholder:text-black/40 dark:placeholder:text-white/40 leading-relaxed font-sans"
              />
            </div>
          </div>

          {/* Color Selector */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Note Paper Color
            </label>
            <div className="flex items-center gap-3">
              {colorOptions.map(opt => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setColor(opt.id)}
                  className={`w-7 h-7 rounded-full ${opt.bgClass} flex items-center justify-center transition-transform ${
                    color === opt.id ? 'ring-2 ring-offset-2 ring-slate-900 dark:ring-white scale-110' : 'opacity-70 hover:opacity-100'
                  }`}
                  title={opt.label}
                />
              ))}
            </div>
          </div>

          {/* Quick presets */}
          <div className="pt-1">
            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
              Quick Ideas
            </span>
            <div className="flex flex-wrap gap-1.5">
              {[
                'Investor pitch meeting tomorrow at 10 AM',
                'Pushed latest build commit to main',
                'Completed customer interview session',
                'Delaware tax filing completed',
              ].map(preset => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => setContent(preset)}
                  className="px-2.5 py-1 rounded-lg text-[10px] bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-slate-600 dark:text-slate-300 transition-colors"
                >
                  {preset}
                </button>
              ))}
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-end gap-2 pt-3 border-t border-black/5 dark:border-white/10">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-1.5 rounded-xl text-xs font-medium text-slate-500 hover:text-slate-700 dark:hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs shadow-md transition-all flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>Tack to Overview</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
