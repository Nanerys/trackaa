import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { RoadmapMilestone } from '../types';
import { X, Flag, Calendar } from 'lucide-react';

interface NewMilestoneModalProps {
  projectId: string;
  isOpen: boolean;
  onClose: () => void;
}

export const NewMilestoneModal: React.FC<NewMilestoneModalProps> = ({ projectId, isOpen, onClose }) => {
  const { addMilestone } = useApp();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [endDate, setEndDate] = useState(new Date(Date.now() + 86400000 * 30).toISOString().split('T')[0]);
  const [status, setStatus] = useState<RoadmapMilestone['status']>('planned');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    addMilestone({
      project_id: projectId,
      title: title.trim(),
      description: description.trim(),
      start_date: startDate,
      end_date: endDate,
      status,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-md glass-dropdown rounded-3xl p-6 shadow-2xl border border-black/10 dark:border-white/15 animate-slide-up">
        <div className="flex items-center justify-between pb-3.5 border-b border-black/5 dark:border-white/10">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-trackaa-green/15 text-trackaa-green flex items-center justify-center">
              <Flag className="w-4 h-4" />
            </div>
            <h2 className="text-sm font-bold text-slate-900 dark:text-white">Add Roadmap Milestone</h2>
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
              Milestone Objective *
            </label>
            <input
              type="text"
              required
              placeholder="e.g., Close 5 Design Partners, Public Launch"
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="w-full px-3 py-2 rounded-xl text-xs bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-trackaa-green/40"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Target Deliverables / Scope
            </label>
            <textarea
              rows={2}
              placeholder="What must be achieved to mark this milestone complete?"
              value={description}
              onChange={e => setDescription(e.target.value)}
              className="w-full px-3 py-2 rounded-xl text-xs bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-trackaa-green/40"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Start Date
              </label>
              <div className="relative">
                <input
                  type="date"
                  value={startDate}
                  onChange={e => setStartDate(e.target.value)}
                  className="w-full pl-8 pr-3 py-2 rounded-xl text-xs bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-trackaa-green/40"
                />
                <Calendar className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Target Date
              </label>
              <div className="relative">
                <input
                  type="date"
                  value={endDate}
                  onChange={e => setEndDate(e.target.value)}
                  className="w-full pl-8 pr-3 py-2 rounded-xl text-xs bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-trackaa-green/40"
                />
                <Calendar className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Current Status
            </label>
            <select
              value={status}
              onChange={e => setStatus(e.target.value as RoadmapMilestone['status'])}
              className="w-full px-3 py-2 rounded-xl text-xs bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-trackaa-green/40"
            >
              <option value="planned">Planned</option>
              <option value="in_progress">In Progress</option>
              <option value="achieved">Achieved</option>
              <option value="delayed">Delayed</option>
            </select>
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
              className="px-4 py-1.5 rounded-xl bg-trackaa-green text-slate-950 font-bold text-xs hover:bg-[#00DDA0] shadow-glow-emerald transition-all"
            >
              Add Milestone
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
