import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { AssetCategory, AssetType } from '../types';
import { X, FolderLock, Upload, Link as LinkIcon, FileText, Tag } from 'lucide-react';

interface NewAssetModalProps {
  projectId: string;
  isOpen: boolean;
  onClose: () => void;
}

export const NewAssetModal: React.FC<NewAssetModalProps> = ({ projectId, isOpen, onClose }) => {
  const { addAsset, currentUser } = useApp();

  const [assetType, setAssetType] = useState<AssetType>('file');
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<AssetCategory>('pitch_deck');
  const [externalUrl, setExternalUrl] = useState('');
  const [fileUrl, setFileUrl] = useState('');
  const [fileName, setFileName] = useState('');
  const [fileSize, setFileSize] = useState<number | undefined>(undefined);
  const [fileExtension, setFileExtension] = useState<string | undefined>(undefined);
  const [tagsInput, setTagsInput] = useState('');

  if (!isOpen) return null;

  const handleFilePick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      setFileSize(file.size);
      const ext = file.name.split('.').pop()?.toUpperCase() || 'FILE';
      setFileExtension(ext);

      const reader = new FileReader();
      reader.onload = () => {
        setFileUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const tags = tagsInput
      .split(',')
      .map(t => t.trim())
      .filter(Boolean);

    addAsset({
      project_id: projectId,
      title: title.trim(),
      category,
      asset_type: assetType,
      file_url: assetType === 'file' ? fileUrl || 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf' : undefined,
      external_url: assetType === 'link' ? externalUrl.trim() : undefined,
      file_size: fileSize,
      file_extension: fileExtension,
      tags: tags.length > 0 ? tags : undefined,
      created_by: currentUser.id,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-md glass-dropdown rounded-3xl p-6 shadow-2xl border border-black/10 dark:border-white/15 animate-slide-up">
        <div className="flex items-center justify-between pb-3.5 border-b border-black/5 dark:border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-cyan-500/15 text-cyan-400 flex items-center justify-center">
              <FolderLock className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900 dark:text-white">Store in Asset Vault</h2>
              <p className="text-[11px] text-slate-400">Preserve critical startup artifacts & documents</p>
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

        {/* Type Toggle: File vs External Link */}
        <div className="mt-4 flex p-1 rounded-xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10">
          <button
            type="button"
            onClick={() => setAssetType('file')}
            className={`flex-1 flex items-center justify-center gap-2 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              assetType === 'file'
                ? 'bg-white dark:bg-white/15 text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Upload Document</span>
          </button>
          <button
            type="button"
            onClick={() => setAssetType('link')}
            className={`flex-1 flex items-center justify-center gap-2 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              assetType === 'link'
                ? 'bg-white dark:bg-white/15 text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <LinkIcon className="w-3.5 h-3.5" />
            <span>External Link</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-3.5">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Asset Title *
            </label>
            <input
              type="text"
              required
              placeholder="e.g., Pitch Deck Oct 2026, SAFE Agreement, Figma Mockup"
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="w-full px-3 py-2 rounded-xl text-xs bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-trackaa-green/40"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Asset Category
            </label>
            <select
              value={category}
              onChange={e => setCategory(e.target.value as AssetCategory)}
              className="w-full px-3 py-2 rounded-xl text-xs bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-trackaa-green/40"
            >
              <option value="pitch_deck">Pitch Deck & Investor Materials</option>
              <option value="legal">Legal & Compliance (SAFE, Incorporation)</option>
              <option value="brand">Brand, Logos & Design Kit</option>
              <option value="product">Product Specs, PRDs & Architecture</option>
              <option value="links">Essential Hyperlinks & Hubs</option>
              <option value="other">Other Documents</option>
            </select>
          </div>

          {assetType === 'file' ? (
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Select File (PDF, PNG, SVG, ZIP, DOCX)
              </label>
              <label className="flex flex-col items-center justify-center p-4 rounded-xl border border-dashed border-slate-300 dark:border-slate-700 hover:border-trackaa-green/60 bg-black/5 dark:bg-white/5 cursor-pointer text-center">
                <Upload className="w-5 h-5 text-slate-400 mb-1" />
                <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
                  {fileName ? fileName : 'Choose a file or drop here'}
                </span>
                <span className="text-[10px] text-slate-400 mt-0.5">Up to 25MB</span>
                <input
                  type="file"
                  onChange={handleFilePick}
                  className="hidden"
                />
              </label>
            </div>
          ) : (
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Resource Destination URL *
              </label>
              <div className="relative">
                <input
                  type="url"
                  required
                  placeholder="https://notion.so/..., https://figma.com/..."
                  value={externalUrl}
                  onChange={e => setExternalUrl(e.target.value)}
                  className="w-full pl-8 pr-3 py-2 rounded-xl text-xs bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-trackaa-green/40"
                />
                <LinkIcon className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Tags (comma separated)
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="e.g., SAFE, Seed, Delaware, Design"
                value={tagsInput}
                onChange={e => setTagsInput(e.target.value)}
                className="w-full pl-8 pr-3 py-2 rounded-xl text-xs bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-trackaa-green/40"
              />
              <Tag className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
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
              className="px-4 py-1.5 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs hover:bg-cyan-400 shadow-md transition-all"
            >
              Save Asset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
