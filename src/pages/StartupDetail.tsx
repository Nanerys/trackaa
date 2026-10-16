import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { StatusBadge } from '../components/StatusBadge';
import { PriorityBadge } from '../components/PriorityBadge';
import { StageBadge } from '../components/StageBadge';
import { NewTaskModal } from '../components/NewTaskModal';
import { NewBlockerModal } from '../components/NewBlockerModal';
import { NewMilestoneModal } from '../components/NewMilestoneModal';
import { NewInteractionModal } from '../components/NewInteractionModal';
import { NewAssetModal } from '../components/NewAssetModal';
import { NewFinanceModal } from '../components/NewFinanceModal';
import { AssetCategory } from '../types';
import {
  ArrowLeft,
  CheckCircle2,
  AlertOctagon,
  Calendar,
  DollarSign,
  TrendingUp,
  FolderLock,
  MessageSquare,
  Users,
  Flag,
  Globe,
  Plus,
  Trash2,
  Check,
  Download,
  ExternalLink,
  Search,
  Filter,
  FileText,
  Clock,
  Flame,
  BarChart3,
  Tag,
  Paperclip,
  CheckSquare,
} from 'lucide-react';

export const StartupDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const {
    startups,
    tasks,
    toggleTask,
    deleteTask,
    blockers,
    resolveBlocker,
    deleteBlocker,
    milestones,
    updateMilestoneStatus,
    deleteMilestone,
    interactions,
    deleteInteraction,
    assets,
    deleteAsset,
    finances,
    deleteFinance,
    profiles,
    getTotalCapitalIn,
    getTotalExpenses,
    getNetCash,
    getEstimatedRunwayMonths,
    getMonthlyBurnRate,
    getStartupProgress,
    getActiveBlockerCount,
    deleteStartup,
  } = useApp();

  const startup = startups.find(s => s.id === id) || startups[0];

  // Active tab state
  const [activeTab, setActiveTab] = useState<
    'overview' | 'tasks' | 'blockers' | 'roadmap' | 'interactions' | 'assets' | 'finances' | 'analytics' | 'team'
  >('overview');

  // Modals
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isBlockerModalOpen, setIsBlockerModalOpen] = useState(false);
  const [isMilestoneModalOpen, setIsMilestoneModalOpen] = useState(false);
  const [isInteractionModalOpen, setIsInteractionModalOpen] = useState(false);
  const [isAssetModalOpen, setIsAssetModalOpen] = useState(false);
  const [isFinanceModalOpen, setIsFinanceModalOpen] = useState(false);

  // Blocker resolution input state
  const [resolvingBlockerId, setResolvingBlockerId] = useState<string | null>(null);
  const [resolutionText, setResolutionText] = useState('');

  // Asset filtering
  const [assetCategoryFilter, setAssetCategoryFilter] = useState<string>('all');
  const [assetSearch, setAssetSearch] = useState('');

  if (!startup) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-xl font-bold">Startup not found</h2>
        <Link to="/dashboard" className="text-trackaa-green text-xs font-semibold mt-2 inline-block">
          Return to Dashboard
        </Link>
      </div>
    );
  }

  // Filtered entity sets for this startup
  const startupTasks = tasks.filter(t => t.project_id === startup.id);
  const startupBlockers = blockers.filter(b => b.project_id === startup.id);
  const startupMilestones = milestones.filter(m => m.project_id === startup.id);
  const startupInteractions = interactions.filter(i => i.project_id === startup.id);
  const startupAssets = assets.filter(a => a.project_id === startup.id);
  const startupFinances = finances.filter(f => f.project_id === startup.id);

  // Date Grouping for Tasks (Section 3.3)
  const todayStr = new Date().toISOString().split('T')[0];
  const todayTasks = startupTasks.filter(t => t.due_date === todayStr);
  const overdueTasks = startupTasks.filter(t => t.due_date < todayStr && !t.completed);
  const upcomingTasks = startupTasks.filter(t => t.due_date > todayStr || (t.due_date < todayStr && t.completed));

  // Financial calculations
  const totalIn = getTotalCapitalIn(startup.id);
  const totalBurn = getTotalExpenses(startup.id);
  const netCash = getNetCash(startup.id);
  const runwayMonths = getEstimatedRunwayMonths(startup.id);
  const monthlyBurn = getMonthlyBurnRate(startup.id);
  const progress = getStartupProgress(startup.id);
  const activeBlockers = getActiveBlockerCount(startup.id);

  // Filtered Assets
  const filteredAssets = startupAssets.filter(asset => {
    const matchesCat = assetCategoryFilter === 'all' || asset.category === assetCategoryFilter;
    const matchesSearch =
      asset.title.toLowerCase().includes(assetSearch.toLowerCase()) ||
      (asset.tags && asset.tags.some(t => t.toLowerCase().includes(assetSearch.toLowerCase())));
    return matchesCat && matchesSearch;
  });

  const handleResolveSubmit = (blockerId: string) => {
    if (!resolutionText.trim()) return;
    resolveBlocker(blockerId, resolutionText.trim());
    setResolvingBlockerId(null);
    setResolutionText('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 animate-fade-in">
      {/* Back button */}
      <div className="mb-4">
        <Link
          to="/dashboard"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Startups</span>
        </Link>
      </div>

      {/* Top Glass Header Card */}
      <div className="rounded-3xl glass-panel p-6 sm:p-8 mb-6 border border-black/5 dark:border-white/10 shadow-lg">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          {/* Left: Brand Identity */}
          <div className="flex items-start gap-4 sm:gap-5">
            {startup.logo_url ? (
              <img
                src={startup.logo_url}
                alt={startup.name}
                className="w-16 h-16 rounded-2xl object-cover ring-2 ring-black/5 dark:ring-white/10 shadow-md flex-shrink-0"
              />
            ) : (
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-trackaa-green/20 to-cyan-500/20 text-trackaa-green font-extrabold text-2xl flex items-center justify-center border border-trackaa-green/30 shadow-md flex-shrink-0">
                {startup.name.charAt(0)}
              </div>
            )}

            <div>
              <div className="flex flex-wrap items-center gap-2.5">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                  {startup.name}
                </h1>
                {/* Direct interactive status dropdown badge */}
                <StatusBadge startupId={startup.id} status={startup.status} size="md" />
                <StageBadge stage={startup.stage} size="md" />
                <PriorityBadge priority={startup.priority} size="md" />
              </div>

              {/* Sub-meta: target launch date & website */}
              <div className="flex flex-wrap items-center gap-4 mt-2 text-xs text-slate-500">
                {startup.due_date && (
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span>Target Launch: {startup.due_date}</span>
                  </span>
                )}
                {startup.website_url && (
                  <a
                    href={startup.website_url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1 text-trackaa-green hover:underline"
                  >
                    <Globe className="w-3.5 h-3.5" />
                    <span>{startup.website_url.replace('https://', '')}</span>
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Right: Quick Action Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setIsTaskModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-black/5 dark:bg-white/10 text-slate-800 dark:text-slate-200 hover:bg-black/10 transition-colors"
            >
              <CheckSquare className="w-3.5 h-3.5" />
              <span>+ Task</span>
            </button>

            <button
              type="button"
              onClick={() => setIsBlockerModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-rose-500/10 text-rose-500 hover:bg-rose-500/20 transition-colors"
            >
              <AlertOctagon className="w-3.5 h-3.5" />
              <span>+ Blocker</span>
            </button>

            <button
              type="button"
              onClick={() => setIsAssetModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-cyan-500/10 text-cyan-500 hover:bg-cyan-500/20 transition-colors"
            >
              <FolderLock className="w-3.5 h-3.5" />
              <span>+ Asset</span>
            </button>

            <button
              type="button"
              onClick={() => setIsFinanceModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold bg-trackaa-green text-slate-950 hover:bg-[#00DDA0] transition-all shadow-glow-emerald"
            >
              <DollarSign className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>+ Transaction</span>
            </button>
          </div>
        </div>

        {/* Dynamic Metric Ribbon */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-black/5 dark:border-white/10 text-center sm:text-left">
          <div className="p-3 rounded-2xl bg-black/5 dark:bg-white/5">
            <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              Execution Progress
            </div>
            <div className="text-xl font-extrabold text-slate-900 dark:text-white font-mono mt-0.5">
              {progress}%
            </div>
            <div className="text-[10px] text-slate-400 mt-0.5">
              {startupTasks.filter(t => t.completed).length}/{startupTasks.length} tasks completed
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-black/5 dark:bg-white/5">
            <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              Active Blockers
            </div>
            <div className={`text-xl font-extrabold font-mono mt-0.5 ${
              activeBlockers > 0 ? 'text-rose-500' : 'text-emerald-500'
            }`}>
              {activeBlockers}
            </div>
            <div className="text-[10px] text-slate-400 mt-0.5">
              {startupBlockers.filter(b => b.resolved).length} cleared resolutions
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-black/5 dark:bg-white/5">
            <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              Estimated Runway
            </div>
            <div className="text-xl font-extrabold text-slate-900 dark:text-white font-mono mt-0.5">
              {runwayMonths} <span className="text-xs font-sans font-normal text-slate-400">Months</span>
            </div>
            <div className="text-[10px] text-slate-400 mt-0.5">
              Net balance: ${netCash.toLocaleString()}
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-black/5 dark:bg-white/5">
            <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              Customer Sessions
            </div>
            <div className="text-xl font-extrabold text-purple-400 font-mono mt-0.5">
              {startupInteractions.length}
            </div>
            <div className="text-[10px] text-slate-400 mt-0.5">Interviews & Demos</div>
          </div>
        </div>
      </div>

      {/* Apple-style Translucent Tab Navigation */}
      <div className="flex items-center gap-1 p-1 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 mb-6 overflow-x-auto">
        {[
          { id: 'overview', label: 'Overview', icon: BarChart3 },
          { id: 'tasks', label: `Tasks (${startupTasks.length})`, icon: CheckSquare },
          { id: 'blockers', label: `Blockers (${startupBlockers.length})`, icon: AlertOctagon },
          { id: 'roadmap', label: `Roadmap (${startupMilestones.length})`, icon: Flag },
          { id: 'interactions', label: `Feedback (${startupInteractions.length})`, icon: MessageSquare },
          { id: 'assets', label: `Asset Vault (${startupAssets.length})`, icon: FolderLock },
          { id: 'finances', label: 'Finance & Runway', icon: DollarSign },
          { id: 'analytics', label: 'Analytics', icon: TrendingUp },
          { id: 'team', label: 'Team', icon: Users },
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-white dark:bg-white/15 text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-trackaa-green' : ''}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab 1: Startup Overview (Deduplicated properly per PRD Section 4.3) */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fade-in">
          <div className="lg:col-span-2 space-y-6">
            {/* Startup Overview Card */}
            <div className="rounded-3xl glass-panel p-6 border border-black/5 dark:border-white/10">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-2">
                Startup Overview
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {startup.description}
              </p>
            </div>

            {/* Next Urgent Tasks */}
            <div className="rounded-3xl glass-panel p-6 border border-black/5 dark:border-white/10">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">Next Focus Priorities</h3>
                <button
                  type="button"
                  onClick={() => setActiveTab('tasks')}
                  className="text-xs font-semibold text-trackaa-green hover:underline"
                >
                  View all tasks &rarr;
                </button>
              </div>

              <div className="space-y-2.5">
                {startupTasks.slice(0, 4).map(t => (
                  <div
                    key={t.id}
                    className="flex items-center justify-between p-3 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10"
                  >
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => toggleTask(t.id)}
                        className={`w-5 h-5 rounded-lg border flex items-center justify-center transition-all ${
                          t.completed
                            ? 'bg-trackaa-green border-trackaa-green text-slate-950'
                            : 'border-slate-400 hover:border-trackaa-green'
                        }`}
                      >
                        {t.completed && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </button>
                      <span className={`text-xs ${
                        t.completed ? 'line-through text-slate-400' : 'text-slate-800 dark:text-slate-200 font-medium'
                      }`}>
                        {t.title}
                      </span>
                    </div>
                    <PriorityBadge priority={t.priority} size="sm" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Runway Snapshot & Assets Quick Links */}
          <div className="space-y-6">
            <div className="rounded-3xl glass-panel p-6 border border-black/5 dark:border-white/10">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Runway Health
                </span>
                <Flame className="w-4 h-4 text-amber-500" />
              </div>
              <div className="text-3xl font-extrabold text-slate-900 dark:text-white font-mono">
                {runwayMonths} <span className="text-xs text-slate-400 font-sans font-normal">Months</span>
              </div>
              <div className="mt-3 text-xs text-slate-500 space-y-1">
                <div className="flex justify-between">
                  <span>Cash on Hand:</span>
                  <span className="font-mono font-semibold text-slate-800 dark:text-slate-200">
                    ${netCash.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Monthly Burn:</span>
                  <span className="font-mono font-semibold text-rose-500">
                    ${monthlyBurn.toLocaleString()}/mo
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setActiveTab('finances')}
                className="mt-4 w-full py-2 rounded-xl text-xs font-semibold bg-black/5 dark:bg-white/10 text-slate-700 dark:text-slate-300 hover:bg-black/10 transition-colors"
              >
                Open Full Ledger
              </button>
            </div>

            {/* Quick Assets */}
            <div className="rounded-3xl glass-panel p-6 border border-black/5 dark:border-white/10">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Mission-Critical Assets
                </span>
                <button
                  type="button"
                  onClick={() => setActiveTab('assets')}
                  className="text-xs font-semibold text-cyan-400 hover:underline"
                >
                  Vault &rarr;
                </button>
              </div>
              <div className="space-y-2">
                {startupAssets.slice(0, 3).map(asset => (
                  <div
                    key={asset.id}
                    className="p-2.5 rounded-xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 flex items-center justify-between text-xs"
                  >
                    <div className="flex items-center gap-2 truncate">
                      <FolderLock className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                      <span className="truncate text-slate-800 dark:text-slate-200 font-medium">
                        {asset.title}
                      </span>
                    </div>
                    {asset.asset_type === 'link' ? (
                      <a
                        href={asset.external_url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-slate-400 hover:text-cyan-400"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    ) : (
                      <span className="text-[10px] font-mono text-slate-400 uppercase">
                        {asset.file_extension}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Tasks with Date Grouping (Section 3.3) */}
      {activeTab === 'tasks' && (
        <div className="space-y-6 animate-fade-in">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">Workflow & Execution Tasks</h2>
              <p className="text-xs text-slate-500">Grouped intelligently by daily founder focus</p>
            </div>
            <button
              type="button"
              onClick={() => setIsTaskModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-trackaa-green text-slate-950 font-bold text-xs hover:bg-[#00DDA0] shadow-glow-emerald"
            >
              <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>Add Task</span>
            </button>
          </div>

          {/* Group 1: Overdue Tasks */}
          {overdueTasks.length > 0 && (
            <div className="rounded-3xl glass-panel p-5 border border-rose-500/20 bg-rose-500/5">
              <div className="flex items-center gap-2 mb-3 text-xs font-bold text-rose-500 uppercase tracking-wider">
                <Clock className="w-3.5 h-3.5" />
                <span>Overdue / Prior Days ({overdueTasks.length})</span>
              </div>
              <div className="space-y-2">
                {overdueTasks.map(t => (
                  <TaskRow key={t.id} task={t} onToggle={toggleTask} onDelete={deleteTask} profiles={profiles} />
                ))}
              </div>
            </div>
          )}

          {/* Group 2: Today's Tasks */}
          <div className="rounded-3xl glass-panel p-5 border border-black/5 dark:border-white/10">
            <div className="flex items-center gap-2 mb-3 text-xs font-bold text-trackaa-green uppercase tracking-wider">
              <CheckSquare className="w-3.5 h-3.5" />
              <span>Today's Execution ({todayTasks.length})</span>
            </div>
            {todayTasks.length === 0 ? (
              <p className="text-xs text-slate-400 py-3 text-center">No tasks scheduled for today. Great job or add one!</p>
            ) : (
              <div className="space-y-2">
                {todayTasks.map(t => (
                  <TaskRow key={t.id} task={t} onToggle={toggleTask} onDelete={deleteTask} profiles={profiles} />
                ))}
              </div>
            )}
          </div>

          {/* Group 3: Upcoming & Completed */}
          <div className="rounded-3xl glass-panel p-5 border border-black/5 dark:border-white/10">
            <div className="flex items-center gap-2 mb-3 text-xs font-bold text-slate-400 uppercase tracking-wider">
              <Calendar className="w-3.5 h-3.5" />
              <span>Upcoming & Completed ({upcomingTasks.length})</span>
            </div>
            <div className="space-y-2">
              {upcomingTasks.map(t => (
                <TaskRow key={t.id} task={t} onToggle={toggleTask} onDelete={deleteTask} profiles={profiles} />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Blockers with Resolution Audit Trail */}
      {activeTab === 'blockers' && (
        <div className="space-y-6 animate-fade-in">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">Impediment & Blocker Log</h2>
              <p className="text-xs text-slate-500">Document roadblocks and capture permanent institutional resolution narratives</p>
            </div>
            <button
              type="button"
              onClick={() => setIsBlockerModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-rose-500 text-white font-bold text-xs hover:bg-rose-600 shadow-md"
            >
              <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>Log Blocker</span>
            </button>
          </div>

          <div className="space-y-3">
            {startupBlockers.length === 0 ? (
              <div className="p-8 rounded-3xl glass-panel text-center text-xs text-slate-400">
                No blockers recorded. All systems green!
              </div>
            ) : (
              startupBlockers.map(b => (
                <div
                  key={b.id}
                  className={`rounded-2xl p-5 border transition-all ${
                    b.resolved
                      ? 'bg-emerald-500/5 border-emerald-500/20'
                      : 'bg-rose-500/5 border-rose-500/20'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <div className={`mt-0.5 w-6 h-6 rounded-lg flex items-center justify-center ${
                        b.resolved ? 'bg-emerald-500/20 text-emerald-500' : 'bg-rose-500/20 text-rose-500'
                      }`}>
                        {b.resolved ? <CheckCircle2 className="w-4 h-4" /> : <AlertOctagon className="w-4 h-4" />}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-slate-900 dark:text-white">
                            {b.description}
                          </span>
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                            b.severity === 'high'
                              ? 'bg-rose-500/20 text-rose-400'
                              : 'bg-amber-500/20 text-amber-400'
                          }`}>
                            {b.severity}
                          </span>
                        </div>

                        {/* Resolution Narrative Display */}
                        {b.resolved && b.resolution && (
                          <div className="mt-2.5 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs">
                            <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                              Resolution Narrative:
                            </span>{' '}
                            <span className="text-slate-700 dark:text-slate-300">{b.resolution}</span>
                          </div>
                        )}

                        {/* In-place Resolution Documentation Form */}
                        {!b.resolved && resolvingBlockerId === b.id && (
                          <div className="mt-3 p-3 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 space-y-2">
                            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                              How was this blocker resolved? (Audit Trail)
                            </label>
                            <input
                              type="text"
                              placeholder="e.g., Escalated to Stripe account executive; utility verification approved."
                              value={resolutionText}
                              onChange={e => setResolutionText(e.target.value)}
                              className="w-full px-3 py-1.5 rounded-lg text-xs bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
                            />
                            <div className="flex gap-2 justify-end">
                              <button
                                type="button"
                                onClick={() => setResolvingBlockerId(null)}
                                className="px-2.5 py-1 text-xs text-slate-400 hover:text-white"
                              >
                                Cancel
                              </button>
                              <button
                                type="button"
                                onClick={() => handleResolveSubmit(b.id)}
                                className="px-3 py-1 rounded-lg bg-emerald-500 text-slate-950 font-bold text-xs"
                              >
                                Save & Clear Blocker
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {!b.resolved && resolvingBlockerId !== b.id && (
                        <button
                          type="button"
                          onClick={() => {
                            setResolvingBlockerId(b.id);
                            setResolutionText('');
                          }}
                          className="px-3 py-1 rounded-xl text-xs font-semibold bg-emerald-500/15 text-emerald-500 hover:bg-emerald-500/25 transition-colors"
                        >
                          Resolve & Document
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => deleteBlocker(b.id)}
                        className="p-1.5 text-slate-400 hover:text-rose-400 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Tab 4: Roadmap Milestones */}
      {activeTab === 'roadmap' && (
        <div className="space-y-6 animate-fade-in">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">Roadmap & Timeblock Milestones</h2>
              <p className="text-xs text-slate-500">Track quarterly horizons and major release gates</p>
            </div>
            <button
              type="button"
              onClick={() => setIsMilestoneModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-trackaa-green text-slate-950 font-bold text-xs hover:bg-[#00DDA0] shadow-glow-emerald"
            >
              <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>Add Milestone</span>
            </button>
          </div>

          <div className="space-y-4">
            {startupMilestones.map(m => (
              <div
                key={m.id}
                className="rounded-3xl glass-panel p-6 border border-black/5 dark:border-white/10 hover:border-trackaa-green/40 transition-all"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2">
                  <div className="flex items-center gap-2.5">
                    <Flag className={`w-4 h-4 ${
                      m.status === 'achieved' ? 'text-trackaa-green' : 'text-slate-400'
                    }`} />
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">{m.title}</h3>
                  </div>

                  <div className="flex items-center gap-2">
                    <select
                      value={m.status}
                      onChange={e => updateMilestoneStatus(m.id, e.target.value as any)}
                      className="px-2.5 py-1 rounded-xl text-xs font-semibold bg-black/5 dark:bg-white/10 border border-black/10 dark:border-white/10 text-slate-900 dark:text-white capitalize"
                    >
                      <option value="planned">Planned</option>
                      <option value="in_progress">In Progress</option>
                      <option value="achieved">Achieved</option>
                      <option value="delayed">Delayed</option>
                    </select>

                    <button
                      type="button"
                      onClick={() => deleteMilestone(m.id)}
                      className="p-1 text-slate-400 hover:text-rose-400"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-3">
                  {m.description}
                </p>

                <div className="text-[11px] text-slate-400 font-mono">
                  {m.start_date} &rarr; {m.end_date}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 5: Customer Feedback & Discovery (Section 4.5) */}
      {activeTab === 'interactions' && (
        <div className="space-y-6 animate-fade-in">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">Customer Discovery & Feedback</h2>
              <p className="text-xs text-slate-500">
                Transcripts, quotes, handler notes, and multi-file evidence
              </p>
            </div>
            <button
              type="button"
              onClick={() => setIsInteractionModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-purple-500 text-white font-bold text-xs hover:bg-purple-600 shadow-md"
            >
              <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>Log Session</span>
            </button>
          </div>

          <div className="space-y-4">
            {startupInteractions.map(ci => (
              <div
                key={ci.id}
                className="rounded-3xl glass-panel p-6 border border-black/5 dark:border-white/10"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                        {ci.customer_name}
                      </h3>
                      <span className="text-xs text-slate-400">({ci.customer_role})</span>
                    </div>
                    <div className="flex items-center gap-3 mt-1 text-[11px] text-slate-400">
                      <span>{ci.date}</span>
                      <span>•</span>
                      <span className="font-semibold text-purple-400">{ci.interaction_type}</span>
                      <span>•</span>
                      {/* Displays Handler's Full Name instead of raw UUID (PRD 4.5) */}
                      <span className="text-slate-300">Handled by: {ci.handler_name}</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => deleteInteraction(ci.id)}
                    className="p-1.5 text-slate-400 hover:text-rose-400 self-start sm:self-auto"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="p-3.5 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 mb-3 text-xs leading-relaxed">
                  <span className="font-semibold text-slate-900 dark:text-white block mb-1">
                    Internal Insights:
                  </span>
                  <p className="text-slate-600 dark:text-slate-300">{ci.handler_report}</p>
                </div>

                {ci.client_notes && (
                  <div className="p-3 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-xs text-purple-200 italic mb-3">
                    {ci.client_notes}
                  </div>
                )}

                {/* Multi-File Attachments Preview Grid (Up to 5 files) */}
                {ci.attachment_urls && ci.attachment_urls.length > 0 && (
                  <div>
                    <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <Paperclip className="w-3 h-3" />
                      <span>Attached Artifacts ({ci.attachment_urls.length})</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {ci.attachment_urls.map((url, idx) => (
                        <a
                          key={idx}
                          href={url}
                          target="_blank"
                          rel="noreferrer"
                          className="w-16 h-16 rounded-xl overflow-hidden border border-black/10 dark:border-white/15 bg-black/20 hover:scale-105 transition-transform"
                        >
                          <img src={url} alt={`Artifact ${idx + 1}`} className="w-full h-full object-cover" />
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 6: NEW DEDICATED ASSET VAULT (PRD Feature 2) */}
      {activeTab === 'assets' && (
        <div className="space-y-6 animate-fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">Founder Asset Vault</h2>
                <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-cyan-500/15 text-cyan-400">
                  {startupAssets.length} Artifacts
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Permanent repository for SAFE notes, pitch decks, Figma specs, and links
              </p>
            </div>

            <button
              type="button"
              onClick={() => setIsAssetModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs hover:bg-cyan-400 shadow-md"
            >
              <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>Store Asset</span>
            </button>
          </div>

          {/* Asset Category Filters & Search */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
            <div className="flex items-center gap-1 p-1 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 overflow-x-auto">
              {[
                { id: 'all', label: 'All Vault' },
                { id: 'pitch_deck', label: 'Pitch Decks' },
                { id: 'legal', label: 'Legal & SAFE' },
                { id: 'brand', label: 'Brand & Design' },
                { id: 'product', label: 'Product PRDs' },
                { id: 'links', label: 'Hyperlinks' },
              ].map(cat => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setAssetCategoryFilter(cat.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                    assetCategoryFilter === cat.id
                      ? 'bg-white dark:bg-white/15 text-slate-900 dark:text-white shadow-sm font-semibold'
                      : 'text-slate-500 hover:text-white'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            <div className="relative min-w-[200px]">
              <input
                type="text"
                placeholder="Search assets or tags..."
                value={assetSearch}
                onChange={e => setAssetSearch(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 rounded-xl text-xs bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/40"
              />
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
            </div>
          </div>

          {/* Assets Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredAssets.map(asset => (
              <div
                key={asset.id}
                className="rounded-3xl glass-panel p-5 border border-black/5 dark:border-white/10 hover:border-cyan-500/40 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="w-10 h-10 rounded-2xl bg-cyan-500/15 text-cyan-400 flex items-center justify-center flex-shrink-0">
                      {asset.asset_type === 'link' ? (
                        <ExternalLink className="w-5 h-5" />
                      ) : (
                        <FileText className="w-5 h-5" />
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-black/5 dark:bg-white/10 text-slate-400">
                        {asset.category.replace('_', ' ')}
                      </span>
                      <button
                        type="button"
                        onClick={() => deleteAsset(asset.id)}
                        className="text-slate-400 hover:text-rose-400 p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-2 leading-snug">
                    {asset.title}
                  </h3>

                  {asset.tags && asset.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {asset.tags.map((t, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-cyan-500/10 text-cyan-400"
                        >
                          #{t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="pt-3 border-t border-black/5 dark:border-white/10 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400 font-mono">
                    {asset.file_extension ? `${asset.file_extension} document` : 'Live web link'}
                  </span>

                  {asset.asset_type === 'link' ? (
                    <a
                      href={asset.external_url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-semibold text-cyan-400 hover:underline"
                    >
                      <span>Open Link</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  ) : (
                    <a
                      href={asset.file_url || '#'}
                      target="_blank"
                      rel="noreferrer"
                      download
                      className="inline-flex items-center gap-1 text-xs font-semibold text-cyan-400 hover:underline"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download</span>
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 7: NEW STARTUP FINANCE & RUNWAY HUB (PRD Feature 3) */}
      {activeTab === 'finances' && (
        <div className="space-y-6 animate-fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">Startup Finance & Runway Hub</h2>
                <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/15 text-trackaa-green">
                  Live Cash Ledger
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Track capital in vs. operational burn with dynamic runway estimations
              </p>
            </div>

            <button
              type="button"
              onClick={() => setIsFinanceModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-trackaa-green text-slate-950 font-bold text-xs hover:bg-[#00DDA0] shadow-glow-emerald"
            >
              <Plus className="w-4 h-4 stroke-[2.5]" />
              <span>Record Transaction</span>
            </button>
          </div>

          {/* High Level Cash Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-3xl glass-panel border border-black/5 dark:border-white/10">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Total Capital In</span>
              <div className="text-2xl font-extrabold text-trackaa-green font-mono mt-1">
                ${totalIn.toLocaleString()}
              </div>
              <p className="text-[11px] text-slate-400 mt-1">Investments, grants, revenue</p>
            </div>

            <div className="p-5 rounded-3xl glass-panel border border-black/5 dark:border-white/10">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Total Burn (Expenses)</span>
              <div className="text-2xl font-extrabold text-rose-500 font-mono mt-1">
                ${totalBurn.toLocaleString()}
              </div>
              <p className="text-[11px] text-slate-400 mt-1">Payroll, legal, cloud, SaaS</p>
            </div>

            <div className="p-5 rounded-3xl glass-panel border border-black/5 dark:border-white/10">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Net Cash Balance</span>
              <div className="text-2xl font-extrabold text-slate-900 dark:text-white font-mono mt-1">
                ${netCash.toLocaleString()}
              </div>
              <p className="text-[11px] text-slate-400 mt-1">Liquid working capital</p>
            </div>

            <div className="p-5 rounded-3xl glass-panel border border-black/5 dark:border-white/10 bg-amber-500/5">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-500">Estimated Runway</span>
                <Flame className="w-4 h-4 text-amber-500 animate-pulse" />
              </div>
              <div className="text-2xl font-extrabold text-amber-400 font-mono mt-1">
                {runwayMonths} <span className="text-xs font-sans font-normal text-slate-400">Months</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1">Avg 30-day burn: ${monthlyBurn.toLocaleString()}</p>
            </div>
          </div>

          {/* Ledger Table */}
          <div className="rounded-3xl glass-panel p-6 border border-black/5 dark:border-white/10">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-4">Recent Transaction History</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-black/5 dark:border-white/10 text-slate-400">
                    <th className="pb-3 font-semibold">Date</th>
                    <th className="pb-3 font-semibold">Type</th>
                    <th className="pb-3 font-semibold">Category</th>
                    <th className="pb-3 font-semibold">Description</th>
                    <th className="pb-3 font-semibold text-right">Amount</th>
                    <th className="pb-3 font-semibold text-center">Receipt</th>
                    <th className="pb-3 font-semibold text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/5 dark:divide-white/5">
                  {startupFinances.map(f => (
                    <tr key={f.id} className="hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                      <td className="py-3 font-mono text-slate-400">{f.transaction_date}</td>
                      <td className="py-3">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          f.transaction_type === 'income'
                            ? 'bg-emerald-500/15 text-trackaa-green'
                            : 'bg-rose-500/15 text-rose-500'
                        }`}>
                          {f.transaction_type}
                        </span>
                      </td>
                      <td className="py-3 capitalize text-slate-700 dark:text-slate-300 font-medium">
                        {f.category.replace('_', ' ')}
                      </td>
                      <td className="py-3 text-slate-900 dark:text-white font-medium max-w-xs truncate">
                        {f.description}
                      </td>
                      <td className={`py-3 text-right font-mono font-bold ${
                        f.transaction_type === 'income' ? 'text-trackaa-green' : 'text-rose-500'
                      }`}>
                        {f.transaction_type === 'income' ? '+' : '-'}${f.amount.toLocaleString()}
                      </td>
                      <td className="py-3 text-center">
                        {f.receipt_url ? (
                          <a
                            href={f.receipt_url}
                            target="_blank"
                            rel="noreferrer"
                            className="text-trackaa-green hover:underline text-[11px]"
                          >
                            View
                          </a>
                        ) : (
                          <span className="text-slate-400">—</span>
                        )}
                      </td>
                      <td className="py-3 text-right">
                        <button
                          type="button"
                          onClick={() => deleteFinance(f.id)}
                          className="text-slate-400 hover:text-rose-400 p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Tab 8: Founder Analytics (PRD Feature 5) */}
      {activeTab === 'analytics' && (
        <div className="space-y-6 animate-fade-in">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Advanced Founder Analytics</h2>
            <p className="text-xs text-slate-500">Actionable momentum and operational delivery indicators</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-3xl glass-panel p-6 border border-black/5 dark:border-white/10">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                On-Time Delivery Rate
              </span>
              <div className="text-3xl font-extrabold text-trackaa-green font-mono mt-2">
                87.5%
              </div>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                7 of 8 tasks completed before or on the targeted milestone due date.
              </p>
            </div>

            <div className="rounded-3xl glass-panel p-6 border border-black/5 dark:border-white/10">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Blocker Clearance Velocity
              </span>
              <div className="text-3xl font-extrabold text-cyan-400 font-mono mt-2">
                1.2 Days
              </div>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                Average turnaround time to document and resolve critical blockers.
              </p>
            </div>

            <div className="rounded-3xl glass-panel p-6 border border-black/5 dark:border-white/10">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Customer Session Cadence
              </span>
              <div className="text-3xl font-extrabold text-purple-400 font-mono mt-2">
                2.5 / Wk
              </div>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                Validated weekly customer interviews logged by founders and product handlers.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 9: Team Directory */}
      {activeTab === 'team' && (
        <div className="space-y-6 animate-fade-in">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Collaborator Allocation</h2>
            <p className="text-xs text-slate-500">Team members assigned and actively executing on this venture</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {profiles.map(p => (
              <div
                key={p.id}
                className="rounded-3xl glass-panel p-5 border border-black/5 dark:border-white/10 text-center"
              >
                <img
                  src={p.avatar_url}
                  alt={p.full_name}
                  className="w-16 h-16 rounded-2xl mx-auto object-cover ring-2 ring-trackaa-green/40 mb-3"
                />
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">{p.full_name}</h3>
                <p className="text-xs text-slate-500 mb-3">{p.role}</p>
                <div className="px-3 py-1 rounded-full bg-trackaa-green/10 text-trackaa-green font-semibold text-[11px] inline-block">
                  {p.active_task_count || 1} Active Tasks
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modals */}
      <NewTaskModal projectId={startup.id} isOpen={isTaskModalOpen} onClose={() => setIsTaskModalOpen(false)} />
      <NewBlockerModal projectId={startup.id} isOpen={isBlockerModalOpen} onClose={() => setIsBlockerModalOpen(false)} />
      <NewMilestoneModal projectId={startup.id} isOpen={isMilestoneModalOpen} onClose={() => setIsMilestoneModalOpen(false)} />
      <NewInteractionModal projectId={startup.id} isOpen={isInteractionModalOpen} onClose={() => setIsInteractionModalOpen(false)} />
      <NewAssetModal projectId={startup.id} isOpen={isAssetModalOpen} onClose={() => setIsAssetModalOpen(false)} />
      <NewFinanceModal projectId={startup.id} isOpen={isFinanceModalOpen} onClose={() => setIsFinanceModalOpen(false)} />
    </div>
  );
};

// Sub-component for individual task rows
interface TaskRowProps {
  task: any;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  profiles: any[];
}

const TaskRow: React.FC<TaskRowProps> = ({ task, onToggle, onDelete, profiles }) => {
  const assignee = profiles.find(p => p.id === task.assigned_to);

  return (
    <div className="flex items-center justify-between p-3 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 hover:border-trackaa-green/40 transition-all">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => onToggle(task.id)}
          className={`w-5 h-5 rounded-lg border flex items-center justify-center transition-all ${
            task.completed
              ? 'bg-trackaa-green border-trackaa-green text-slate-950'
              : 'border-slate-400 hover:border-trackaa-green'
          }`}
        >
          {task.completed && <Check className="w-3.5 h-3.5 stroke-[3]" />}
        </button>

        <span className={`text-xs ${
          task.completed ? 'line-through text-slate-400' : 'text-slate-800 dark:text-slate-200 font-medium'
        }`}>
          {task.title}
        </span>
      </div>

      <div className="flex items-center gap-3">
        <PriorityBadge priority={task.priority} size="sm" />
        {assignee && (
          <img
            src={assignee.avatar_url}
            alt={assignee.full_name}
            title={assignee.full_name}
            className="w-5 h-5 rounded-full object-cover"
          />
        )}
        <button
          type="button"
          onClick={() => onDelete(task.id)}
          className="text-slate-400 hover:text-rose-400 transition-colors p-1"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
