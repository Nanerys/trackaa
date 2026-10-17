import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { UserPermissions } from '../types';
import {
  X,
  UserPlus,
  Mail,
  Lock,
  Key,
  Shield,
  Layers,
  Eye,
  Check,
  Sparkles,
  Info,
} from 'lucide-react';

interface InviteMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InviteMemberModal: React.FC<InviteMemberModalProps> = ({ isOpen, onClose }) => {
  const { inviteMember } = useApp();

  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [role, setRole] = useState('Product Associate');
  const [department, setDepartment] = useState('Dev team');
  const [tempPassword, setTempPassword] = useState('Trackaa2026!');
  const [autoGen, setAutoGen] = useState(false);

  // Granular RBAC Permissions
  const [permissions, setPermissions] = useState<UserPermissions>({
    canViewRoadmap: false, // Default restricted per user prompt
    canEditRoadmap: false,
    canViewFeedback: true, // View feedback enabled
    canEditFeedback: true,
    canViewFinances: false, // Finances restricted
    canEditFinances: false,
    canViewVault: true,
    canEditVault: false,
    canManageTasks: true,
    canManageBlockers: true,
    canCreateSubgroups: true,
    canDirectMessage: true,
  });

  if (!isOpen) return null;

  const handleGeneratePassword = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789!@#$%';
    let res = '';
    for (let i = 0; i < 10; i++) {
      res += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setTempPassword(res);
  };

  const togglePermission = (key: keyof UserPermissions) => {
    setPermissions(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !fullName.trim()) return;

    inviteMember({
      email: email.trim(),
      full_name: fullName.trim(),
      role: role.trim(),
      department: department.trim(),
      temporary_password: tempPassword,
      permissions,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-xl glass-dropdown rounded-3xl p-6 sm:p-7 shadow-2xl border border-black/10 dark:border-white/15 animate-slide-up my-6 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-3.5 border-b border-black/5 dark:border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-trackaa-green/20 text-trackaa-green flex items-center justify-center">
              <UserPlus className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900 dark:text-white">Invite Team Member & Set Roles</h2>
              <p className="text-[11px] text-slate-500">Provide credentials and customize granular module access</p>
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
          {/* Email & Full Name */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Collaborator Email *
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="mirabel@trackaa.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full pl-8 pr-3 py-2 rounded-xl text-xs bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-trackaa-green/40"
                />
                <Mail className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Full Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g., Mirabel Kalu"
                value={fullName}
                onChange={e => setFullName(e.target.value)}
                className="w-full px-3 py-2 rounded-xl text-xs bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-trackaa-green/40"
              />
            </div>
          </div>

          {/* Role & Department (Hierarchy path) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Role Title (e.g. PM 2, Tech Lead)
              </label>
              <input
                type="text"
                placeholder="e.g., PM 2"
                value={role}
                onChange={e => setRole(e.target.value)}
                className="w-full px-3 py-2 rounded-xl text-xs bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-trackaa-green/40"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Department / Sub-Team
              </label>
              <input
                type="text"
                placeholder="e.g., Dev team, Growth, Design"
                value={department}
                onChange={e => setDepartment(e.target.value)}
                className="w-full px-3 py-2 rounded-xl text-xs bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-trackaa-green/40"
              />
            </div>
          </div>

          {/* Hierarchy preview banner */}
          <div className="p-2.5 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-[11px] text-slate-400 flex items-center gap-1.5">
            <span className="font-semibold text-slate-600 dark:text-slate-300">Comms Hierarchy:</span>
            <span className="font-mono text-trackaa-green font-medium">
              {fullName || 'Member'} &gt; Trackaa &gt; {role || 'Role'} &gt; {department || 'Team'}
            </span>
          </div>

          {/* Temporary Password */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                Temporary Password *
              </label>
              <button
                type="button"
                onClick={handleGeneratePassword}
                className="text-[11px] text-trackaa-green hover:underline flex items-center gap-1"
              >
                <Sparkles className="w-3 h-3" />
                <span>Auto-Generate Secure Password</span>
              </button>
            </div>
            <div className="relative">
              <input
                type="text"
                required
                value={tempPassword}
                onChange={e => setTempPassword(e.target.value)}
                className="w-full pl-8 pr-3 py-2 rounded-xl text-xs bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-slate-900 dark:text-white font-mono focus:outline-none focus:ring-2 focus:ring-trackaa-green/40"
              />
              <Key className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
            </div>
            <p className="text-[10px] text-slate-400 mt-1">
              User will be prompted to reset upon first login to Trackaa.
            </p>
          </div>

          {/* RBAC Granular Access Control Checklist */}
          <div>
            <div className="flex items-center justify-between mb-2 pt-2 border-t border-black/5 dark:border-white/10">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-trackaa-green" />
                <span>Granular Module Access & Permissions</span>
              </label>
              <span className="text-[10px] text-slate-400">Select what this member can see</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {/* Roadmap access */}
              <label
                onClick={() => togglePermission('canViewRoadmap')}
                className={`p-2.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                  permissions.canViewRoadmap
                    ? 'bg-trackaa-green/10 border-trackaa-green/40 text-slate-900 dark:text-white'
                    : 'bg-black/5 dark:bg-white/5 border-transparent text-slate-400'
                }`}
              >
                <div className="text-xs">
                  <div className="font-semibold">Roadmap & Milestones</div>
                  <div className="text-[10px] opacity-75">View strategic timeline gates</div>
                </div>
                <div
                  className={`w-4 h-4 rounded-md border flex items-center justify-center ${
                    permissions.canViewRoadmap
                      ? 'bg-trackaa-green border-trackaa-green text-white'
                      : 'border-slate-400'
                  }`}
                >
                  {permissions.canViewRoadmap && <Check className="w-3 h-3 stroke-[3]" />}
                </div>
              </label>

              {/* Feedback access */}
              <label
                onClick={() => togglePermission('canViewFeedback')}
                className={`p-2.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                  permissions.canViewFeedback
                    ? 'bg-trackaa-green/10 border-trackaa-green/40 text-slate-900 dark:text-white'
                    : 'bg-black/5 dark:bg-white/5 border-transparent text-slate-400'
                }`}
              >
                <div className="text-xs">
                  <div className="font-semibold">Customer Discovery</div>
                  <div className="text-[10px] opacity-75">Access interview notes & transcripts</div>
                </div>
                <div
                  className={`w-4 h-4 rounded-md border flex items-center justify-center ${
                    permissions.canViewFeedback
                      ? 'bg-trackaa-green border-trackaa-green text-white'
                      : 'border-slate-400'
                  }`}
                >
                  {permissions.canViewFeedback && <Check className="w-3 h-3 stroke-[3]" />}
                </div>
              </label>

              {/* Finance / Runway access */}
              <label
                onClick={() => togglePermission('canViewFinances')}
                className={`p-2.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                  permissions.canViewFinances
                    ? 'bg-trackaa-green/10 border-trackaa-green/40 text-slate-900 dark:text-white'
                    : 'bg-black/5 dark:bg-white/5 border-transparent text-slate-400'
                }`}
              >
                <div className="text-xs">
                  <div className="font-semibold">Finance & Cash Runway</div>
                  <div className="text-[10px] opacity-75">Inspect ledger, burn, and receipts</div>
                </div>
                <div
                  className={`w-4 h-4 rounded-md border flex items-center justify-center ${
                    permissions.canViewFinances
                      ? 'bg-trackaa-green border-trackaa-green text-white'
                      : 'border-slate-400'
                  }`}
                >
                  {permissions.canViewFinances && <Check className="w-3 h-3 stroke-[3]" />}
                </div>
              </label>

              {/* Asset Vault access */}
              <label
                onClick={() => togglePermission('canViewVault')}
                className={`p-2.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                  permissions.canViewVault
                    ? 'bg-trackaa-green/10 border-trackaa-green/40 text-slate-900 dark:text-white'
                    : 'bg-black/5 dark:bg-white/5 border-transparent text-slate-400'
                }`}
              >
                <div className="text-xs">
                  <div className="font-semibold">Founder Asset Vault</div>
                  <div className="text-[10px] opacity-75">Access pitch decks & legal SAFE docs</div>
                </div>
                <div
                  className={`w-4 h-4 rounded-md border flex items-center justify-center ${
                    permissions.canViewVault
                      ? 'bg-trackaa-green border-trackaa-green text-white'
                      : 'border-slate-400'
                  }`}
                >
                  {permissions.canViewVault && <Check className="w-3 h-3 stroke-[3]" />}
                </div>
              </label>

              {/* Tasks & Blockers */}
              <label
                onClick={() => togglePermission('canManageTasks')}
                className={`p-2.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                  permissions.canManageTasks
                    ? 'bg-trackaa-green/10 border-trackaa-green/40 text-slate-900 dark:text-white'
                    : 'bg-black/5 dark:bg-white/5 border-transparent text-slate-400'
                }`}
              >
                <div className="text-xs">
                  <div className="font-semibold">Tasks & Execution</div>
                  <div className="text-[10px] opacity-75">Manage daily sprint tasks & blockers</div>
                </div>
                <div
                  className={`w-4 h-4 rounded-md border flex items-center justify-center ${
                    permissions.canManageTasks
                      ? 'bg-trackaa-green border-trackaa-green text-white'
                      : 'border-slate-400'
                  }`}
                >
                  {permissions.canManageTasks && <Check className="w-3 h-3 stroke-[3]" />}
                </div>
              </label>

              {/* Comms & Subgroup Creation */}
              <label
                onClick={() => togglePermission('canCreateSubgroups')}
                className={`p-2.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                  permissions.canCreateSubgroups
                    ? 'bg-trackaa-green/10 border-trackaa-green/40 text-slate-900 dark:text-white'
                    : 'bg-black/5 dark:bg-white/5 border-transparent text-slate-400'
                }`}
              >
                <div className="text-xs">
                  <div className="font-semibold">Comms & Sub-Groups</div>
                  <div className="text-[10px] opacity-75">Create new sub-group channels in Comms</div>
                </div>
                <div
                  className={`w-4 h-4 rounded-md border flex items-center justify-center ${
                    permissions.canCreateSubgroups
                      ? 'bg-trackaa-green border-trackaa-green text-white'
                      : 'border-slate-400'
                  }`}
                >
                  {permissions.canCreateSubgroups && <Check className="w-3 h-3 stroke-[3]" />}
                </div>
              </label>
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-3 border-t border-black/5 dark:border-white/10">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-medium text-slate-500 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-trackaa-green text-white font-bold text-xs hover:bg-[#059669] shadow-glow-emerald transition-all"
            >
              Send Onboarding Invitation
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
