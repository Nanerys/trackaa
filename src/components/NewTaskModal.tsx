import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PriorityLevel, TaskAttachment } from '../types';
import {
  X,
  CheckSquare,
  Calendar,
  User,
  Paperclip,
  Flag,
  Tag,
  Link as LinkIcon,
  Plus,
  Trash2,
} from 'lucide-react';

interface NewTaskModalProps {
  projectId: string;
  isOpen: boolean;
  onClose: () => void;
}

export const NewTaskModal: React.FC<NewTaskModalProps> = ({ projectId, isOpen, onClose }) => {
  const { addTask, profiles, milestones } = useApp();
  const [title, setTitle] = useState('');
  const [dueDate, setDueDate] = useState(new Date().toISOString().split('T')[0]);
  const [priority, setPriority] = useState<PriorityLevel>('medium');
  const [assignedTo, setAssignedTo] = useState(profiles[0]?.id || '');
  const [taggedMembers, setTaggedMembers] = useState<string[]>([]);
  const [milestoneId, setMilestoneId] = useState('');
  const [milestoneConditionId, setMilestoneConditionId] = useState('');
  const [attachments, setAttachments] = useState<TaskAttachment[]>([]);

  // Temp attachment inputs
  const [newAttTitle, setNewAttTitle] = useState('');
  const [newAttUrl, setNewAttUrl] = useState('');
  const [newAttType, setNewAttType] = useState<'link' | 'file'>('link');

  if (!isOpen) return null;

  const handleToggleTag = (memberId: string) => {
    setTaggedMembers(prev =>
      prev.includes(memberId) ? prev.filter(id => id !== memberId) : [...prev, memberId]
    );
  };

  const handleAddAttachment = () => {
    if (!newAttTitle.trim() || !newAttUrl.trim()) return;
    const newAtt: TaskAttachment = {
      id: `att-${Date.now()}`,
      type: newAttType,
      title: newAttTitle.trim(),
      url: newAttUrl.trim(),
    };
    setAttachments(prev => [...prev, newAtt]);
    setNewAttTitle('');
    setNewAttUrl('');
  };

  const handleRemoveAttachment = (attId: string) => {
    setAttachments(prev => prev.filter(a => a.id !== attId));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    addTask({
      project_id: projectId,
      title: title.trim(),
      due_date: dueDate,
      completed: false,
      priority,
      assigned_to: assignedTo || undefined,
      tagged_member_ids: taggedMembers.length > 0 ? taggedMembers : undefined,
      milestone_id: milestoneId || undefined,
      milestone_condition_id: milestoneConditionId || undefined,
      attachments: attachments.length > 0 ? attachments : undefined,
    });

    setTitle('');
    setDueDate(new Date().toISOString().split('T')[0]);
    setPriority('medium');
    setTaggedMembers([]);
    setMilestoneId('');
    setMilestoneConditionId('');
    setAttachments([]);
    onClose();
  };

  const startupMilestones = milestones.filter(m => m.project_id === projectId);
  const selectedMilestone = startupMilestones.find(m => m.id === milestoneId);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-lg glass-dropdown rounded-3xl p-6 sm:p-7 shadow-2xl border border-black/10 dark:border-white/15 animate-slide-up my-6 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-3.5 border-b border-black/5 dark:border-white/10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-trackaa-green/15 text-trackaa-green flex items-center justify-center">
              <CheckSquare className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900 dark:text-white">Create Founder Task</h2>
              <p className="text-[11px] text-slate-400">Tag collaborators, attach links/docs, and link to milestones</p>
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
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Task Title *
            </label>
            <input
              type="text"
              required
              placeholder="e.g., File Delaware franchise tax report"
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl text-xs bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-trackaa-green/40"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Due Date
              </label>
              <div className="relative">
                <input
                  type="date"
                  value={dueDate}
                  onChange={e => setDueDate(e.target.value)}
                  className="w-full pl-8 pr-3 py-2 rounded-xl text-xs bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-trackaa-green/40"
                />
                <Calendar className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Priority
              </label>
              <select
                value={priority}
                onChange={e => setPriority(e.target.value as PriorityLevel)}
                className="w-full px-3 py-2 rounded-xl text-xs bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-trackaa-green/40"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="critical">Critical</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Primary Assignee
            </label>
            <div className="relative">
              <select
                value={assignedTo}
                onChange={e => setAssignedTo(e.target.value)}
                className="w-full pl-8 pr-3 py-2 rounded-xl text-xs bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-trackaa-green/40"
              >
                <option value="">Unassigned</option>
                {profiles.map(p => (
                  <option key={p.id} value={p.id}>
                    {p.full_name} ({p.role})
                  </option>
                ))}
              </select>
              <User className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
            </div>
          </div>

          {/* Tag Team Members */}
          <div>
            <div className="flex items-center gap-1.5 mb-1.5">
              <Tag className="w-3.5 h-3.5 text-slate-400" />
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Tag Team Members (@Collaborators)
              </label>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {profiles.map(p => {
                const isTagged = taggedMembers.includes(p.id);
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => handleToggleTag(p.id)}
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-[11px] font-medium transition-all ${
                      isTagged
                        ? 'bg-trackaa-green text-white shadow-sm'
                        : 'bg-black/5 dark:bg-white/5 text-slate-600 dark:text-slate-400 hover:bg-black/10'
                    }`}
                  >
                    <span>@{p.full_name.split(' ')[0]}</span>
                    {isTagged && <X className="w-3 h-3" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Link to Roadmap Milestone */}
          <div className="p-3.5 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 space-y-2.5">
            <div className="flex items-center gap-1.5">
              <Flag className="w-3.5 h-3.5 text-trackaa-green" />
              <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                Link to Milestone & Condition
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <select
                value={milestoneId}
                onChange={e => {
                  setMilestoneId(e.target.value);
                  setMilestoneConditionId('');
                }}
                className="w-full px-2.5 py-1.5 rounded-xl text-xs bg-white dark:bg-slate-900 border border-black/10 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-trackaa-green/40"
              >
                <option value="">No milestone linked</option>
                {startupMilestones.map(m => (
                  <option key={m.id} value={m.id}>
                    {m.title}
                  </option>
                ))}
              </select>

              {selectedMilestone && selectedMilestone.conditions && selectedMilestone.conditions.length > 0 && (
                <select
                  value={milestoneConditionId}
                  onChange={e => setMilestoneConditionId(e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded-xl text-xs bg-white dark:bg-slate-900 border border-black/10 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-trackaa-green/40"
                >
                  <option value="">Specific condition (optional)</option>
                  {selectedMilestone.conditions.map(c => (
                    <option key={c.id} value={c.id}>
                      {c.text}
                    </option>
                  ))}
                </select>
              )}
            </div>
          </div>

          {/* Attach Documents & Links */}
          <div className="p-3.5 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 space-y-2.5">
            <div className="flex items-center gap-1.5">
              <Paperclip className="w-3.5 h-3.5 text-trackaa-green" />
              <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                Attachments (Links & Documents)
              </span>
            </div>

            {attachments.length > 0 && (
              <div className="space-y-1.5 mb-2">
                {attachments.map(att => (
                  <div
                    key={att.id}
                    className="flex items-center justify-between px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-black/5 dark:border-white/10 text-xs"
                  >
                    <div className="flex items-center gap-2 truncate">
                      <LinkIcon className="w-3 h-3 text-trackaa-green flex-shrink-0" />
                      <span className="font-medium text-slate-800 dark:text-slate-200 truncate">{att.title}</span>
                      <span className="text-[10px] text-slate-400 truncate max-w-[140px]">({att.url})</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveAttachment(att.id)}
                      className="text-slate-400 hover:text-rose-400 ml-2"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                placeholder="Attachment label (e.g. PRD Doc)"
                value={newAttTitle}
                onChange={e => setNewAttTitle(e.target.value)}
                className="flex-1 px-2.5 py-1.5 rounded-xl text-xs bg-white dark:bg-slate-900 border border-black/10 dark:border-white/10 text-slate-900 dark:text-white"
              />
              <input
                type="url"
                placeholder="https://..."
                value={newAttUrl}
                onChange={e => setNewAttUrl(e.target.value)}
                className="flex-1 px-2.5 py-1.5 rounded-xl text-xs bg-white dark:bg-slate-900 border border-black/10 dark:border-white/10 text-slate-900 dark:text-white"
              />
              <button
                type="button"
                onClick={handleAddAttachment}
                className="px-3 py-1.5 rounded-xl bg-black/10 dark:bg-white/10 hover:bg-black/15 text-xs font-semibold text-slate-800 dark:text-slate-200 flex items-center justify-center gap-1"
              >
                <Plus className="w-3 h-3" />
                <span>Attach</span>
              </button>
            </div>
          </div>

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
              className="px-4 py-1.5 rounded-xl bg-trackaa-green text-white font-bold text-xs hover:bg-[#059669] shadow-glow-emerald transition-all"
            >
              Add Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
