import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Task, PriorityLevel, TaskAttachment } from '../types';
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

interface EditTaskModalProps {
  task: Task | null;
  isOpen: boolean;
  onClose: () => void;
}

export const EditTaskModal: React.FC<EditTaskModalProps> = ({ task, isOpen, onClose }) => {
  const { updateTask, profiles, milestones } = useApp();

  const [title, setTitle] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState<PriorityLevel>('medium');
  const [assignedTo, setAssignedTo] = useState('');
  const [taggedMembers, setTaggedMembers] = useState<string[]>([]);
  const [milestoneId, setMilestoneId] = useState('');
  const [milestoneConditionId, setMilestoneConditionId] = useState('');
  const [attachments, setAttachments] = useState<TaskAttachment[]>([]);

  // Temp attachment inputs
  const [newAttTitle, setNewAttTitle] = useState('');
  const [newAttUrl, setNewAttUrl] = useState('');
  const [newAttType, setNewAttType] = useState<'link' | 'file'>('link');

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDueDate(task.due_date);
      setPriority(task.priority);
      setAssignedTo(task.assigned_to || '');
      setTaggedMembers(task.tagged_member_ids || []);
      setMilestoneId(task.milestone_id || '');
      setMilestoneConditionId(task.milestone_condition_id || '');
      setAttachments(task.attachments || []);
    }
  }, [task]);

  if (!isOpen || !task) return null;

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

    updateTask(task.id, {
      title: title.trim(),
      due_date: dueDate,
      priority,
      assigned_to: assignedTo || undefined,
      tagged_member_ids: taggedMembers,
      milestone_id: milestoneId || undefined,
      milestone_condition_id: milestoneConditionId || undefined,
      attachments,
    });

    onClose();
  };

  const startupMilestones = milestones.filter(m => m.project_id === task.project_id);
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
              <h2 className="text-sm font-bold text-slate-900 dark:text-white">Edit Task</h2>
              <p className="text-[11px] text-slate-400">Tag teammates, attach docs, and link to milestones</p>
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
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl text-xs bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-trackaa-green/40"
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
              Assigned Lead
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
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Tag Collaborators (@)
            </label>
            <div className="flex flex-wrap gap-1.5 p-2 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10">
              {profiles.map(p => {
                const isTagged = taggedMembers.includes(p.id);
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => handleToggleTag(p.id)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
                      isTagged
                        ? 'bg-trackaa-green text-white shadow-sm'
                        : 'bg-black/5 dark:bg-white/5 text-slate-500 hover:text-white'
                    }`}
                  >
                    <span>@{p.full_name.split(' ')[0]}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Attach to Roadmap Milestone & Conditions */}
          <div className="p-3 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 space-y-2.5">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800 dark:text-slate-200">
              <Flag className="w-3.5 h-3.5 text-trackaa-green" />
              <span>Attach to Roadmap Milestone</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <select
                value={milestoneId}
                onChange={e => {
                  setMilestoneId(e.target.value);
                  setMilestoneConditionId('');
                }}
                className="w-full px-2.5 py-1.5 rounded-lg text-xs bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-slate-900 dark:text-white"
              >
                <option value="">No Milestone Linked</option>
                {startupMilestones.map(m => (
                  <option key={m.id} value={m.id}>
                    {m.title}
                  </option>
                ))}
              </select>

              {selectedMilestone?.conditions && selectedMilestone.conditions.length > 0 && (
                <select
                  value={milestoneConditionId}
                  onChange={e => setMilestoneConditionId(e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded-lg text-xs bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-slate-900 dark:text-white"
                >
                  <option value="">Fulfill Condition (Optional)</option>
                  {selectedMilestone.conditions.map(c => (
                    <option key={c.id} value={c.id}>
                      {c.text}
                    </option>
                  ))}
                </select>
              )}
            </div>
          </div>

          {/* Attach Links & Documents */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Attached Links & Artifacts ({attachments.length})
            </label>

            {attachments.length > 0 && (
              <div className="space-y-1.5 mb-2">
                {attachments.map(att => (
                  <div
                    key={att.id}
                    className="flex items-center justify-between p-2 rounded-xl bg-black/5 dark:bg-white/5 text-xs"
                  >
                    <div className="flex items-center gap-2 truncate">
                      <Paperclip className="w-3.5 h-3.5 text-trackaa-green" />
                      <span className="font-medium truncate">{att.title}</span>
                      <span className="text-[10px] text-slate-400 font-mono">({att.type})</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveAttachment(att.id)}
                      className="text-slate-400 hover:text-rose-500"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Title (e.g. Figma Spec, PRD link)"
                value={newAttTitle}
                onChange={e => setNewAttTitle(e.target.value)}
                className="w-1/3 px-2.5 py-1.5 rounded-xl text-xs bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-slate-900 dark:text-white placeholder:text-slate-400"
              />
              <input
                type="url"
                placeholder="URL (https://...)"
                value={newAttUrl}
                onChange={e => setNewAttUrl(e.target.value)}
                className="flex-1 px-2.5 py-1.5 rounded-xl text-xs bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-slate-900 dark:text-white placeholder:text-slate-400"
              />
              <button
                type="button"
                onClick={handleAddAttachment}
                className="px-3 py-1.5 rounded-xl bg-black/10 dark:bg-white/10 hover:bg-trackaa-green hover:text-white text-xs font-semibold transition-colors flex items-center gap-1"
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
              className="px-3.5 py-1.5 rounded-xl text-xs font-medium text-slate-500 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 rounded-xl bg-trackaa-green text-white font-bold text-xs hover:bg-[#059669] shadow-glow-emerald transition-all"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
