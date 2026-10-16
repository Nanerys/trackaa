import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Users, Mail, CheckSquare, Upload, Plus, Shield, Sparkles } from 'lucide-react';

export const TeamMembers: React.FC = () => {
  const { profiles, tasks } = useApp();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Team & Collaborators
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-black/5 dark:bg-white/10 text-slate-700 dark:text-slate-300">
              {profiles.length} Members
            </span>
          </div>
          <p className="mt-1 text-xs sm:text-sm text-slate-500">
            Workload allocation and team capacity across your startups
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {profiles.map(member => {
          const memberTasks = tasks.filter(t => t.assigned_to === member.id && !t.completed);
          const completedTasks = tasks.filter(t => t.assigned_to === member.id && t.completed);

          return (
            <div
              key={member.id}
              className="rounded-3xl glass-panel p-6 border border-black/5 dark:border-white/10 shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start gap-4 mb-4">
                  <div className="relative group">
                    <img
                      src={member.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80'}
                      alt={member.full_name}
                      className="w-14 h-14 rounded-2xl object-cover ring-2 ring-trackaa-green/40 shadow-sm"
                    />
                    <label className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 rounded-2xl flex items-center justify-center cursor-pointer transition-opacity">
                      <Upload className="w-4 h-4 text-white" />
                      <input type="file" accept="image/*" className="hidden" />
                    </label>
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="text-base font-bold text-slate-900 dark:text-white truncate">
                      {member.full_name}
                    </h3>
                    <div className="flex items-center gap-1.5 mt-0.5 text-xs text-trackaa-green font-medium">
                      <Shield className="w-3 h-3" />
                      <span>{member.role}</span>
                    </div>
                    <div className="flex items-center gap-1 mt-1 text-xs text-slate-400 truncate">
                      <Mail className="w-3 h-3 flex-shrink-0" />
                      <span className="truncate">{member.email}</span>
                    </div>
                  </div>
                </div>

                {/* Capacity & Task Meter */}
                <div className="p-3 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 mb-4">
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="font-semibold text-slate-600 dark:text-slate-300">
                      Workload Capacity
                    </span>
                    <span className={`font-bold ${
                      memberTasks.length >= 4 ? 'text-amber-500' : 'text-emerald-500'
                    }`}>
                      {memberTasks.length >= 4 ? 'Busy' : 'Available'}
                    </span>
                  </div>

                  <div className="w-full h-1.5 rounded-full bg-black/10 dark:bg-white/10 overflow-hidden">
                    <div
                      style={{ width: `${Math.min(memberTasks.length * 25, 100)}%` }}
                      className={`h-full rounded-full transition-all ${
                        memberTasks.length >= 4 ? 'bg-amber-500' : 'bg-trackaa-green'
                      }`}
                    />
                  </div>

                  <div className="flex justify-between text-[11px] text-slate-400 mt-2">
                    <span>{memberTasks.length} pending execution</span>
                    <span>{completedTasks.length} completed</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-black/5 dark:border-white/10 flex items-center justify-between text-xs text-slate-400">
                <span>Direct Collaborator</span>
                <span className="text-trackaa-green font-semibold">Active</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
