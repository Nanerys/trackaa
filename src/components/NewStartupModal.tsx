import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { StartupStage, PriorityLevel } from '../types';
import { X, Upload, Globe, Calendar, Rocket, Sparkles } from 'lucide-react';

interface NewStartupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NewStartupModal: React.FC<NewStartupModalProps> = ({ isOpen, onClose }) => {
  const { addStartup } = useApp();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [stage, setStage] = useState<StartupStage>('building');
  const [priority, setPriority] = useState<PriorityLevel>('high');
  const [dueDate, setDueDate] = useState('');
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [logoUrl, setLogoUrl] = useState('');

  if (!isOpen) return null;

  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setLogoUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    addStartup({
      name: name.trim(),
      description: description.trim(),
      stage,
      status: 'in-progress',
      priority,
      due_date: dueDate || undefined,
      website_url: websiteUrl || undefined,
      logo_url: logoUrl || undefined,
      archived: false,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-lg glass-dropdown rounded-3xl p-6 sm:p-8 shadow-2xl border border-black/10 dark:border-white/15 animate-slide-up">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-black/5 dark:border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-trackaa-green/15 text-trackaa-green flex items-center justify-center">
              <Rocket className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">Launch New Startup</h2>
              <p className="text-xs text-slate-500">Add a portfolio venture to your Trackaa OS</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          {/* Logo & Identity */}
          <div className="flex items-center gap-4">
            <div className="relative w-14 h-14 rounded-2xl bg-black/5 dark:bg-white/5 border border-dashed border-slate-300 dark:border-slate-700 flex items-center justify-center overflow-hidden group">
              {logoUrl ? (
                <img src={logoUrl} alt="Startup Logo Preview" className="w-full h-full object-cover" />
              ) : (
                <Upload className="w-5 h-5 text-slate-400 group-hover:text-trackaa-green transition-colors" />
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageFileChange}
                className="absolute inset-0 opacity-0 cursor-pointer"
                title="Upload custom startup logo"
              />
            </div>
            <div className="flex-1">
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Startup Brand Logo
              </label>
              <p className="text-[11px] text-slate-400">Click avatar box to upload custom brand icon</p>
            </div>
          </div>

          {/* Startup Name */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Startup Name *
            </label>
            <input
              type="text"
              required
              placeholder="e.g., Kake APIs, Apex Robotics"
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl text-xs bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-trackaa-green/40"
            />
          </div>

          {/* Overview / Description */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Startup Overview
            </label>
            <textarea
              rows={3}
              placeholder="Brief description of the core value proposition and market focus..."
              value={description}
              onChange={e => setDescription(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl text-xs bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-trackaa-green/40"
            />
          </div>

          {/* Grid of Stage & Priority */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Venture Stage
              </label>
              <select
                value={stage}
                onChange={e => setStage(e.target.value as StartupStage)}
                className="w-full px-3 py-2 rounded-xl text-xs bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-trackaa-green/40"
              >
                <option value="idea">Idea Stage</option>
                <option value="building">Building</option>
                <option value="beta">Private Beta</option>
                <option value="launched">Launched</option>
                <option value="scaling">Scaling</option>
              </select>
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

          {/* Website URL & Target Launch Date */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Website / App URL
              </label>
              <div className="relative">
                <input
                  type="url"
                  placeholder="https://startup.com"
                  value={websiteUrl}
                  onChange={e => setWebsiteUrl(e.target.value)}
                  className="w-full pl-8 pr-3 py-2 rounded-xl text-xs bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-trackaa-green/40"
                />
                <Globe className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Target Launch Date
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
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-2.5 pt-4 border-t border-black/5 dark:border-white/10">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl bg-trackaa-green text-slate-950 font-bold text-xs hover:bg-[#00DDA0] shadow-glow-emerald active:scale-95 transition-all"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Create Startup</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
