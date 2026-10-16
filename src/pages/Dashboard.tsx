import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { StartupStage } from '../types';
import { StatusBadge } from '../components/StatusBadge';
import { PriorityBadge } from '../components/PriorityBadge';
import { StageBadge } from '../components/StageBadge';
import { NewStartupModal } from '../components/NewStartupModal';
import {
  Plus,
  Search,
  AlertOctagon,
  Calendar,
  Flame,
  ArrowUpRight,
  TrendingUp,
  Layers,
  Sparkles,
  ExternalLink,
} from 'lucide-react';

export const Dashboard: React.FC = () => {
  const {
    startups,
    setCurrentStartupId,
    getStartupProgress,
    getActiveBlockerCount,
    getEstimatedRunwayMonths,
    profiles,
  } = useApp();

  const navigate = useNavigate();
  const [stageFilter, setStageFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isNewStartupOpen, setIsNewStartupOpen] = useState(false);

  const filteredStartups = startups.filter(s => {
    const matchesStage = stageFilter === 'all' || s.stage === stageFilter;
    const matchesSearch =
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStage && matchesSearch;
  });

  const handleCardClick = (id: string) => {
    setCurrentStartupId(id);
    navigate(`/startups/${id}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      {/* Page Title & Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Startups & Portfolio
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-black/5 dark:bg-white/10 text-slate-700 dark:text-slate-300">
              {startups.length} Ventures
            </span>
          </div>
          <p className="mt-1 text-xs sm:text-sm text-slate-500">
            Active early-stage ventures managed within your Trackaa OS
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsNewStartupOpen(true)}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-2xl bg-trackaa-green text-slate-950 font-bold text-xs hover:bg-[#00DDA0] transition-all shadow-glow-emerald active:scale-95"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>Launch New Startup</span>
        </button>
      </div>

      {/* Filter Ribbon: Search + Apple Segmented Stage Controls */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 mb-6">
        {/* Apple Segmented Stage Pills */}
        <div className="flex items-center gap-1 p-1 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 overflow-x-auto">
          {[
            { id: 'all', label: 'All Stages' },
            { id: 'idea', label: 'Idea' },
            { id: 'building', label: 'Building' },
            { id: 'beta', label: 'Beta' },
            { id: 'launched', label: 'Launched' },
            { id: 'scaling', label: 'Scaling' },
          ].map(tab => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setStageFilter(tab.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                stageFilter === tab.id
                  ? 'bg-white dark:bg-white/15 text-slate-900 dark:text-white shadow-sm font-semibold'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative min-w-[220px]">
          <input
            type="text"
            placeholder="Search startups..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 rounded-xl text-xs bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-trackaa-green/40"
          />
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
        </div>
      </div>

      {/* Startup Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStartups.map(startup => {
          const progress = getStartupProgress(startup.id);
          const activeBlockers = getActiveBlockerCount(startup.id);
          const runway = getEstimatedRunwayMonths(startup.id);

          return (
            <div
              key={startup.id}
              onClick={() => handleCardClick(startup.id)}
              className="group relative rounded-3xl glass-panel p-6 hover:scale-[1.015] hover:shadow-xl transition-all duration-300 border border-black/5 dark:border-white/10 cursor-pointer flex flex-col justify-between"
            >
              <div>
                {/* Top: Logo + Quick Status Badge + Priority */}
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    {startup.logo_url ? (
                      <img
                        src={startup.logo_url}
                        alt={startup.name}
                        className="w-11 h-11 rounded-2xl object-cover ring-1 ring-black/5 dark:ring-white/10 shadow-sm"
                      />
                    ) : (
                      <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-trackaa-green/20 to-cyan-500/20 text-trackaa-green font-extrabold text-base flex items-center justify-center border border-trackaa-green/30 shadow-sm">
                        {startup.name.charAt(0)}
                      </div>
                    )}
                    <div>
                      <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-trackaa-green transition-colors flex items-center gap-1.5">
                        <span>{startup.name}</span>
                        <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </h3>
                      <div className="flex items-center gap-2 mt-0.5">
                        <StageBadge stage={startup.stage} size="sm" />
                      </div>
                    </div>
                  </div>

                  {/* Interactive Status Badge dropdown directly on card */}
                  <div onClick={e => e.stopPropagation()}>
                    <StatusBadge startupId={startup.id} status={startup.status} size="sm" />
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed mb-5">
                  {startup.description}
                </p>

                {/* Task Execution Progress Bar */}
                <div className="mb-5">
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="font-semibold text-slate-600 dark:text-slate-300">Execution Velocity</span>
                    <span className="font-mono font-bold text-trackaa-green">{progress}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-black/5 dark:bg-white/10 overflow-hidden">
                    <div
                      style={{ width: `${progress}%` }}
                      className="h-full rounded-full bg-gradient-to-r from-trackaa-green to-[#10B981] transition-all duration-500"
                    />
                  </div>
                </div>
              </div>

              {/* Bottom Card Footer: Blockers, Runway, Team */}
              <div className="pt-4 border-t border-black/5 dark:border-white/10 flex items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-2">
                  {activeBlockers > 0 ? (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-500 font-semibold border border-rose-500/20 text-[11px]">
                      <AlertOctagon className="w-3 h-3" />
                      <span>{activeBlockers} blocker{activeBlockers > 1 ? 's' : ''}</span>
                    </span>
                  ) : (
                    <span className="text-[11px] text-emerald-500 font-medium">Unblocked</span>
                  )}

                  <span className="inline-flex items-center gap-1 text-[11px] text-slate-400">
                    <Flame className="w-3 h-3 text-amber-500" />
                    <span>{runway}mo runway</span>
                  </span>
                </div>

                {/* Assigned Member Avatars Stack */}
                <div className="flex -space-x-1.5 overflow-hidden">
                  {profiles.slice(0, 3).map(p => (
                    <img
                      key={p.id}
                      src={p.avatar_url}
                      alt={p.full_name}
                      title={p.full_name}
                      className="inline-block w-6 h-6 rounded-full ring-2 ring-white dark:ring-[#0A111E] object-cover"
                    />
                  ))}
                </div>
              </div>
            </div>
          );
        })}

        {/* Empty / Add New Startup Placeholder Card */}
        <button
          type="button"
          onClick={() => setIsNewStartupOpen(true)}
          className="rounded-3xl border-2 border-dashed border-slate-300 dark:border-slate-800 hover:border-trackaa-green/60 p-8 flex flex-col items-center justify-center text-center group transition-all duration-200 min-h-[220px]"
        >
          <div className="w-12 h-12 rounded-2xl bg-black/5 dark:bg-white/5 group-hover:bg-trackaa-green/15 text-slate-400 group-hover:text-trackaa-green flex items-center justify-center transition-all mb-3">
            <Plus className="w-6 h-6 stroke-[2]" />
          </div>
          <span className="text-sm font-bold text-slate-800 dark:text-slate-200 group-hover:text-trackaa-green transition-colors">
            Launch Another Venture
          </span>
          <span className="text-xs text-slate-400 mt-1">
            Setup tasks, asset vault, and cash runway
          </span>
        </button>
      </div>

      <NewStartupModal isOpen={isNewStartupOpen} onClose={() => setIsNewStartupOpen(false)} />
    </div>
  );
};
