import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, MessageSquare, Upload, Trash2, Calendar, User, FileText, Image as ImageIcon } from 'lucide-react';

interface NewInteractionModalProps {
  projectId: string;
  isOpen: boolean;
  onClose: () => void;
}

export const NewInteractionModal: React.FC<NewInteractionModalProps> = ({ projectId, isOpen, onClose }) => {
  const { addInteraction, profiles, currentUser } = useApp();

  const [customerName, setCustomerName] = useState('');
  const [customerRole, setCustomerRole] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [handlerId, setHandlerId] = useState(currentUser?.id || profiles[0]?.id || '');
  const [interactionType, setInteractionType] = useState('User Interview');
  const [handlerReport, setHandlerReport] = useState('');
  const [clientNotes, setClientNotes] = useState('');
  const [attachments, setAttachments] = useState<string[]>([]);

  if (!isOpen) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    if (attachments.length + files.length > 5) {
      alert('You can attach up to 5 documents or screenshots per interaction.');
      return;
    }

    Array.from(files).forEach(file => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          setAttachments(prev => [...prev.slice(0, 4), reader.result as string]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const removeAttachment = (index: number) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !handlerReport.trim()) return;

    const handler = profiles.find(p => p.id === handlerId) || currentUser;

    addInteraction({
      project_id: projectId,
      customer_name: customerName.trim(),
      customer_role: customerRole.trim() || 'Prospective User',
      date,
      handler_id: handlerId,
      handler_name: handler.full_name,
      handler_report: handlerReport.trim(),
      client_notes: clientNotes.trim(),
      attachment_urls: attachments,
      interaction_type: interactionType,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-lg glass-dropdown rounded-3xl p-6 sm:p-7 shadow-2xl border border-black/10 dark:border-white/15 animate-slide-up my-8">
        <div className="flex items-center justify-between pb-3.5 border-b border-black/5 dark:border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-purple-500/15 text-purple-400 flex items-center justify-center">
              <MessageSquare className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900 dark:text-white">Log Customer Interaction</h2>
              <p className="text-[11px] text-slate-400">Capture founder discoveries, quotes, and artifacts</p>
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

        <form onSubmit={handleSubmit} className="mt-4 space-y-3.5">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Customer / Stakeholder *
              </label>
              <input
                type="text"
                required
                placeholder="e.g., Sarah Jenkins"
                value={customerName}
                onChange={e => setCustomerName(e.target.value)}
                className="w-full px-3 py-2 rounded-xl text-xs bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-trackaa-green/40"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Role / Title
              </label>
              <input
                type="text"
                placeholder="e.g., VP Product, Solo Founder"
                value={customerRole}
                onChange={e => setCustomerRole(e.target.value)}
                className="w-full px-3 py-2 rounded-xl text-xs bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-trackaa-green/40"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2.5">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Interaction Date
              </label>
              <input
                type="date"
                value={date}
                onChange={e => setDate(e.target.value)}
                className="w-full px-2.5 py-2 rounded-xl text-xs bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-trackaa-green/40"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Session Format
              </label>
              <select
                value={interactionType}
                onChange={e => setInteractionType(e.target.value)}
                className="w-full px-2.5 py-2 rounded-xl text-xs bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-trackaa-green/40"
              >
                <option value="User Interview">User Interview</option>
                <option value="Demo & Pitch">Demo & Pitch</option>
                <option value="Q&A Session">Q&A Session</option>
                <option value="Support / Feedback">Support / Feedback</option>
                <option value="Investor Update">Investor Update</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Handled By
              </label>
              <select
                value={handlerId}
                onChange={e => setHandlerId(e.target.value)}
                className="w-full px-2.5 py-2 rounded-xl text-xs bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-trackaa-green/40"
              >
                {profiles.map(p => (
                  <option key={p.id} value={p.id}>
                    {p.full_name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Founder & Handler Insights *
            </label>
            <textarea
              required
              rows={2}
              placeholder="What were key takeaways, problem validations, or feature objections?"
              value={handlerReport}
              onChange={e => setHandlerReport(e.target.value)}
              className="w-full px-3 py-2 rounded-xl text-xs bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-trackaa-green/40"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Direct Customer Quotes / Verbatim Notes
            </label>
            <textarea
              rows={2}
              placeholder='e.g., "If you could automate our weekly sync, we would pay $200/mo."'
              value={clientNotes}
              onChange={e => setClientNotes(e.target.value)}
              className="w-full px-3 py-2 rounded-xl text-xs bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-trackaa-green/40"
            />
          </div>

          {/* Multi-File Uploader (Up to 5 files) */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                Attachments & Screenshots ({attachments.length}/5)
              </label>
              <span className="text-[11px] text-slate-400">Images or PDF docs</span>
            </div>

            <div className="space-y-2">
              {/* Attachment Preview Grid */}
              {attachments.length > 0 && (
                <div className="grid grid-cols-5 gap-2">
                  {attachments.map((src, idx) => (
                    <div key={idx} className="relative group rounded-xl overflow-hidden aspect-square border border-white/10 bg-black/20">
                      <img src={src} alt={`Attachment ${idx + 1}`} className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => removeAttachment(idx)}
                        className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center text-rose-400 transition-opacity"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {attachments.length < 5 && (
                <label className="flex items-center justify-center gap-2 p-3 rounded-xl border border-dashed border-slate-300 dark:border-slate-700 hover:border-trackaa-green/60 bg-black/5 dark:bg-white/5 cursor-pointer text-xs text-slate-500 hover:text-trackaa-green transition-all">
                  <Upload className="w-4 h-4" />
                  <span>Attach screenshot or document ({5 - attachments.length} remaining)</span>
                  <input
                    type="file"
                    multiple
                    accept="image/*,application/pdf"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
              )}
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
              className="px-4 py-1.5 rounded-xl bg-purple-500 text-white font-bold text-xs hover:bg-purple-600 shadow-md transition-all"
            >
              Log Session
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
