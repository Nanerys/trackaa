import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { StatusBadge } from '../components/StatusBadge';
import { PriorityBadge } from '../components/PriorityBadge';
import { StageBadge } from '../components/StageBadge';
import { NewTaskModal } from '../components/NewTaskModal';
import { EditTaskModal } from '../components/EditTaskModal';
import { NewBlockerModal } from '../components/NewBlockerModal';
import { NewMilestoneModal } from '../components/NewMilestoneModal';
import { NewInteractionModal } from '../components/NewInteractionModal';
import { NewAssetModal } from '../components/NewAssetModal';
import { NewFinanceModal } from '../components/NewFinanceModal';
import { InviteMemberModal } from '../components/InviteMemberModal';
import { StartupSettingsModal } from '../components/StartupSettingsModal';
import { AddStatusReportModal } from '../components/AddStatusReportModal';
import { AssetCategory, Task, RoadmapMilestone, StatusReport } from '../types';
import {
  AbstractHeaderFlourish,
  IsometricCube,
  MemphisStickerBadge,
} from '../components/AbstractArt';
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
  Shield,
  UserPlus,
  Lock,
  Settings,
  StickyNote,
  ChevronDown,
  ChevronUp,
  LayoutGrid,
  List as ListIcon,
  CalendarDays,
  Sparkles,
  Edit2,
  Target,
  CheckCheck,
  AlertCircle,
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
    toggleMilestoneCondition,
    addMilestoneCondition,
    deleteMilestone,
    interactions,
    deleteInteraction,
    assets,
    deleteAsset,
    finances,
    deleteFinance,
    statusReports,
    deleteStatusReport,
    profiles,
    currentUser,
    setCurrentStartupId,
    getTotalCapitalIn,
    getTotalExpenses,
    getNetCash,
    getEstimatedRunwayMonths,
    getMonthlyBurnRate,
    getStartupProgress,
    getActiveBlockerCount,
  } = useApp();

  const startup = startups.find(s => s.id === id) || startups[0];

  // Active tab state
  const [activeTab, setActiveTab] = useState<
    'overview' | 'tasks' | 'blockers' | 'roadmap' | 'interactions' | 'assets' | 'finances' | 'comms_team'
  >('overview');

  // Modals
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isEditTaskModalOpen, setIsEditTaskModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [isBlockerModalOpen, setIsBlockerModalOpen] = useState(false);
  const [isMilestoneModalOpen, setIsMilestoneModalOpen] = useState(false);
  const [isInteractionModalOpen, setIsInteractionModalOpen] = useState(false);
  const [isAssetModalOpen, setIsAssetModalOpen] = useState(false);
  const [isFinanceModalOpen, setIsFinanceModalOpen] = useState(false);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [isStatusReportModalOpen, setIsStatusReportModalOpen] = useState(false);

  // Milestone view options
  const [milestoneViewMode, setMilestoneViewMode] = useState<'visual' | 'list' | 'calendar'>('visual');
  const [expandedMilestones, setExpandedMilestones] = useState<Record<string, boolean>>({});
  const [newConditionInputs, setNewConditionInputs] = useState<Record<string, string>>({});

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

  // Permissions check for current user
  const permissions = currentUser.permissions || {
    canViewRoadmap: true,
    canViewFeedback: true,
    canViewFinances: true,
    canViewVault: true,
  };

  const canManageSettings =
    currentUser.is_admin ||
    (startup.settings_access_user_ids && startup.settings_access_user_ids.includes(currentUser.id)) ||
    currentUser.permissions?.canManageStartupSettings;

  // Filtered entity sets for this startup
  const startupTasks = tasks.filter(t => t.project_id === startup.id);
  const startupBlockers = blockers.filter(b => b.project_id === startup.id);
  const startupMilestones = milestones.filter(m => m.project_id === startup.id);
  const startupInteractions = interactions.filter(i => i.project_id === startup.id);
  const startupAssets = assets.filter(a => a.project_id === startup.id);
  const startupFinances = finances.filter(f => f.project_id === startup.id);
  const startupStatusReports = statusReports.filter(r => r.startup_id === startup.id);

  // Date Grouping for Tasks
  const todayStr = new Date().toISOString().split('T')[0];
  const todayTasks = startupTasks.filter(t => t.due_date === todayStr);
  const overdueTasks = startupTasks.filter(t => t.due_date < todayStr && !t.completed);
  const upcomingTasks = startupTasks.filter(t => t.due_date > todayStr || (t.due_date < todayStr && t.completed));

  // Next Milestone for Overview
  const nextMilestone =
    startupMilestones.find(m => m.status !== 'achieved') || startupMilestones[0];
  const nextMilestoneConditions = nextMilestone?.conditions || [];
  const completedConditionsCount = nextMilestoneConditions.filter(c => c.completed).length;
  const conditionsProgress =
    nextMilestoneConditions.length > 0
      ? Math.round((completedConditionsCount / nextMilestoneConditions.length) * 100)
      : nextMilestone?.status === 'achieved'
      ? 100
      : 40;

  // Next Milestone Target Date & Days Left
  let daysUntilMilestone: number | null = null;
  let isMilestoneOverdue = false;
  if (nextMilestone) {
    const end = new Date(nextMilestone.end_date);
    const today = new Date();
    const diffTime = end.getTime() - today.getTime();
    daysUntilMilestone = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    isMilestoneOverdue = daysUntilMilestone < 0 && nextMilestone.status !== 'achieved';
  }

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

  const handleOpenEditTask = (task: Task) => {
    setEditingTask(task);
    setIsEditTaskModalOpen(true);
  };

  const toggleMilestoneExpand = (milestoneId: string) => {
    setExpandedMilestones(prev => ({
      ...prev,
      [milestoneId]: !prev[milestoneId],
    }));
  };

  const handleAddCondition = (milestoneId: string) => {
    const text = newConditionInputs[milestoneId];
    if (!text || !text.trim()) return;
    addMilestoneCondition(milestoneId, text.trim());
    setNewConditionInputs(prev => ({ ...prev, [milestoneId]: '' }));
  };

  const handleNavigateToComms = () => {
    setCurrentStartupId(startup.id);
    navigate('/comms');
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
          <span>Back to My startups</span>
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
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-trackaa-green/20 to-trackaa-navy text-trackaa-green font-extrabold text-2xl flex items-center justify-center border border-trackaa-green/30 shadow-md flex-shrink-0">
                {startup.name.charAt(0)}
              </div>
            )}

            <div>
              {/* Three Header Tags with White Text: Dynamic Ladder + Interactive Stage + Priority */}
              <div className="flex flex-wrap items-center gap-2.5">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                  {startup.name}
                </h1>
                {/* 1. Dynamic Status Ladder with Gradient & White text */}
                <StatusBadge startupId={startup.id} status={startup.status} size="md" />
                {/* 2. Interactive Stage Dropdown from Idea to Series D+ with White text */}
                <StageBadge startupId={startup.id} stage={startup.stage} size="md" />
                {/* 3. Priority Badge with White text */}
                <PriorityBadge priority={startup.priority} size="md" />
                <div className="hidden sm:block ml-1">
                  <AbstractHeaderFlourish />
                </div>
              </div>

              {/* Sub-meta: target launch date & website */}
              <div className="flex flex-wrap items-center gap-4 mt-2.5 text-xs text-slate-500">
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

          {/* Right: Quick Action Buttons & Startup Settings */}
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
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold bg-trackaa-green text-white hover:bg-[#059669] transition-all shadow-glow-emerald"
            >
              <DollarSign className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>+ Transaction</span>
            </button>

            {/* Startup Settings button (with access delegation check) */}
            {canManageSettings && (
              <button
                type="button"
                onClick={() => setIsSettingsModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-200 dark:bg-white/10 text-slate-800 dark:text-slate-200 hover:bg-slate-300 dark:hover:bg-white/20 transition-all border border-black/5 dark:border-white/10"
                title="Startup Settings & Access Delegation"
              >
                <Settings className="w-3.5 h-3.5" />
                <span>Settings</span>
              </button>
            )}
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
            <div
              className={`text-xl font-extrabold font-mono mt-0.5 ${
                activeBlockers > 0 ? 'text-rose-500' : 'text-emerald-500'
              }`}
            >
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
              Customer Feedback
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
          { id: 'roadmap', label: `Roadmap (${startupMilestones.length})`, icon: Flag, restricted: !permissions.canViewRoadmap },
          { id: 'interactions', label: `Feedback (${startupInteractions.length})`, icon: MessageSquare, restricted: !permissions.canViewFeedback },
          { id: 'assets', label: `Asset Vault (${startupAssets.length})`, icon: FolderLock, restricted: !permissions.canViewVault },
          { id: 'finances', label: 'Finance & Runway', icon: DollarSign, restricted: !permissions.canViewFinances },
          { id: 'comms_team', label: `Comms & Team (${profiles.length})`, icon: MessageSquare },
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
                  ? 'bg-trackaa-green text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : ''}`} />
              <span>{tab.label}</span>
              {tab.restricted && <Lock className="w-2.5 h-2.5 opacity-60" />}
            </button>
          );
        })}
      </div>

      {/* Tab 1: Overview */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fade-in">
          <div className="lg:col-span-2 space-y-6">
            {/* Startup Overview Card */}
            <div className="rounded-3xl glass-panel p-6 border border-black/5 dark:border-white/10">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                  Startup Overview
                </h3>
                {canManageSettings && (
                  <button
                    type="button"
                    onClick={() => setIsSettingsModalOpen(true)}
                    className="text-xs font-semibold text-trackaa-green hover:underline flex items-center gap-1"
                  >
                    <Settings className="w-3 h-3" />
                    <span>Edit in Settings</span>
                  </button>
                )}
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {startup.description}
              </p>
            </div>

            {/* Next Milestone & On-Track Velocity Card */}
            {nextMilestone && (
              <div className="rounded-3xl glass-panel p-6 border border-black/5 dark:border-white/10 relative overflow-hidden">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-trackaa-green/15 text-trackaa-green flex items-center justify-center">
                      <Target className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                        Next Milestone Target
                      </span>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                        {nextMilestone.title}
                      </h4>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {isMilestoneOverdue ? (
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-rose-500 text-white flex items-center gap-1 shadow-sm">
                        <AlertCircle className="w-3 h-3" />
                        <span>Overdue</span>
                      </span>
                    ) : daysUntilMilestone !== null && daysUntilMilestone >= 0 ? (
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-trackaa-green text-white shadow-sm">
                        {daysUntilMilestone === 0 ? 'Due Today' : `${daysUntilMilestone} days left`}
                      </span>
                    ) : null}

                    <button
                      type="button"
                      onClick={() => setActiveTab('roadmap')}
                      className="text-xs font-semibold text-trackaa-green hover:underline ml-1"
                    >
                      Roadmap &rarr;
                    </button>
                  </div>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-300 mb-3 leading-relaxed">
                  {nextMilestone.description}
                </p>

                {/* Progress Bar & Conditions Met */}
                <div className="p-4 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-700 dark:text-slate-300">
                      Milestone Readiness ({conditionsProgress}%)
                    </span>
                    <span className="text-slate-400 font-mono text-[11px]">
                      {completedConditionsCount}/{nextMilestoneConditions.length} conditions fulfilled
                    </span>
                  </div>

                  <div className="w-full h-2 rounded-full bg-black/10 dark:bg-white/10 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-trackaa-green to-emerald-400 rounded-full transition-all duration-500"
                      style={{ width: `${conditionsProgress}%` }}
                    />
                  </div>

                  {/* Conditions checklist preview */}
                  {nextMilestoneConditions.length > 0 && (
                    <div className="pt-2 border-t border-black/5 dark:border-white/10 space-y-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                        Fulfillment Checklist:
                      </span>
                      <div className="space-y-1.5">
                        {nextMilestoneConditions.map(cond => (
                          <div
                            key={cond.id}
                            onClick={() => toggleMilestoneCondition(nextMilestone.id, cond.id)}
                            className="flex items-center gap-2.5 cursor-pointer group"
                          >
                            <div
                              className={`w-4 h-4 rounded-md border flex items-center justify-center transition-all ${
                                cond.completed
                                  ? 'bg-trackaa-green border-trackaa-green text-white'
                                  : 'border-slate-400 group-hover:border-trackaa-green'
                              }`}
                            >
                              {cond.completed && <Check className="w-3 h-3 stroke-[3]" />}
                            </div>
                            <span
                              className={`text-xs ${
                                cond.completed
                                  ? 'line-through text-slate-400'
                                  : 'text-slate-700 dark:text-slate-300'
                              }`}
                            >
                              {cond.text}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Pinned Status Bulletin (Post-it note corkboard) */}
            <div className="rounded-3xl glass-panel p-6 border border-black/5 dark:border-white/10">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-amber-500/15 text-amber-500 flex items-center justify-center">
                    <StickyNote className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                        Latest Status Bulletin
                      </h3>
                      <MemphisStickerBadge icon="📌" text="Live Corkboard" color="orange" />
                    </div>
                    <p className="text-[11px] text-slate-400">
                      Tacked memos, standup headlines, and immediate updates
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsStatusReportModalOpen(true)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs shadow-sm transition-all"
                >
                  <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                  <span>+ Tack Note</span>
                </button>
              </div>

              {startupStatusReports.length === 0 ? (
                <div className="p-6 rounded-2xl border border-dashed border-black/10 dark:border-white/10 text-center">
                  <StickyNote className="w-8 h-8 text-slate-400 mx-auto mb-1.5 opacity-60" />
                  <p className="text-xs text-slate-400">
                    No status memos pinned yet. Tack on critical updates like "Meeting tomorrow 10am" or "Pushed v2.1 commit".
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {startupStatusReports.map((report, idx) => {
                    const isAuthorOrAdmin =
                      report.author_id === currentUser.id || currentUser.is_admin;
                    const rotateClass =
                      idx % 3 === 0
                        ? 'rotate-[-1deg] hover:rotate-0'
                        : idx % 3 === 1
                        ? 'rotate-[1deg] hover:rotate-0'
                        : 'rotate-[-0.5deg] hover:rotate-0';

                    const colorStyles =
                      report.color === 'emerald'
                        ? 'bg-emerald-100/95 dark:bg-emerald-950/60 border-emerald-300 dark:border-emerald-700/60 text-emerald-950 dark:text-emerald-100'
                        : report.color === 'blue'
                        ? 'bg-sky-100/95 dark:bg-sky-950/60 border-sky-300 dark:border-sky-700/60 text-sky-950 dark:text-sky-100'
                        : report.color === 'rose'
                        ? 'bg-rose-100/95 dark:bg-rose-950/60 border-rose-300 dark:border-rose-700/60 text-rose-950 dark:text-rose-100'
                        : report.color === 'purple'
                        ? 'bg-purple-100/95 dark:bg-purple-950/60 border-purple-300 dark:border-purple-700/60 text-purple-950 dark:text-purple-100'
                        : 'bg-amber-100/95 dark:bg-amber-950/60 border-amber-300 dark:border-amber-700/60 text-amber-950 dark:text-amber-100';

                    return (
                      <div
                        key={report.id}
                        className={`p-4 rounded-2xl border shadow-md transition-all duration-200 relative group flex flex-col justify-between ${rotateClass} ${colorStyles}`}
                      >
                        {/* Pin Head Icon */}
                        <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-rose-500 shadow-sm border border-rose-600 flex items-center justify-center">
                          <div className="w-1.5 h-1.5 rounded-full bg-white" />
                        </div>

                        <div>
                          <p className="text-xs font-medium leading-relaxed mb-3 mt-1 font-sans">
                            "{report.content}"
                          </p>
                        </div>

                        <div className="pt-2 border-t border-black/10 dark:border-white/10 flex items-center justify-between text-[11px] opacity-80">
                          <div className="flex items-center gap-1.5 truncate">
                            {report.author_avatar && (
                              <img
                                src={report.author_avatar}
                                alt={report.author_name}
                                className="w-4 h-4 rounded-full object-cover"
                              />
                            )}
                            <span className="font-semibold truncate">{report.author_name}</span>
                            <span>•</span>
                            <span className="truncate">{report.created_at}</span>
                          </div>

                          {isAuthorOrAdmin && (
                            <button
                              type="button"
                              onClick={() => deleteStatusReport(report.id)}
                              className="text-black/50 hover:text-rose-600 dark:text-white/50 dark:hover:text-rose-400 p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                              title="Remove bulletin"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
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
                  <TaskRow
                    key={t.id}
                    task={t}
                    onToggle={toggleTask}
                    onEdit={handleOpenEditTask}
                    onDelete={deleteTask}
                    profiles={profiles}
                    milestones={startupMilestones}
                  />
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

            {/* Quick Comms Action */}
            <div className="rounded-3xl glass-panel p-6 border border-black/5 dark:border-white/10">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  {startup.name} Comms
                </span>
                <span className="w-2 h-2 rounded-full bg-trackaa-green" />
              </div>
              <p className="text-xs text-slate-500 mb-3">
                Collaborate in the Common Room or direct message teammates with attached startup artifacts.
              </p>
              <button
                type="button"
                onClick={handleNavigateToComms}
                className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-trackaa-green text-white hover:bg-[#059669] transition-all shadow-glow-emerald"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Open {startup.name} Common Room</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Tasks */}
      {activeTab === 'tasks' && (
        <div className="space-y-6 animate-fade-in">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">Founder Tasks & Execution</h2>
              <p className="text-xs text-slate-500">Intelligent date-segregated boards with collaborator tagging</p>
            </div>
            <button
              type="button"
              onClick={() => setIsTaskModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-trackaa-green text-white font-bold text-xs hover:bg-[#059669] shadow-glow-emerald transition-all"
            >
              <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>Add Task</span>
            </button>
          </div>

          {/* Overdue Section */}
          {overdueTasks.length > 0 && (
            <div className="rounded-3xl glass-panel p-5 border border-rose-500/20 bg-rose-500/5">
              <div className="flex items-center gap-2 mb-3 text-xs font-bold text-rose-500 uppercase tracking-wider">
                <Clock className="w-3.5 h-3.5" />
                <span>Overdue ({overdueTasks.length})</span>
              </div>
              <div className="space-y-2">
                {overdueTasks.map(t => (
                  <TaskRow
                    key={t.id}
                    task={t}
                    onToggle={toggleTask}
                    onEdit={handleOpenEditTask}
                    onDelete={deleteTask}
                    profiles={profiles}
                    milestones={startupMilestones}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Today Section */}
          <div className="rounded-3xl glass-panel p-5 border border-black/5 dark:border-white/10">
            <div className="flex items-center gap-2 mb-3 text-xs font-bold text-trackaa-green uppercase tracking-wider">
              <CheckSquare className="w-3.5 h-3.5" />
              <span>Today's Execution ({todayTasks.length})</span>
            </div>
            {todayTasks.length === 0 ? (
              <p className="text-xs text-slate-400 py-3 text-center">No tasks scheduled for today.</p>
            ) : (
              <div className="space-y-2">
                {todayTasks.map(t => (
                  <TaskRow
                    key={t.id}
                    task={t}
                    onToggle={toggleTask}
                    onEdit={handleOpenEditTask}
                    onDelete={deleteTask}
                    profiles={profiles}
                    milestones={startupMilestones}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Upcoming Section */}
          <div className="rounded-3xl glass-panel p-5 border border-black/5 dark:border-white/10">
            <div className="flex items-center gap-2 mb-3 text-xs font-bold text-slate-400 uppercase tracking-wider">
              <Calendar className="w-3.5 h-3.5" />
              <span>Upcoming & Completed ({upcomingTasks.length})</span>
            </div>
            <div className="space-y-2">
              {upcomingTasks.map(t => (
                <TaskRow
                  key={t.id}
                  task={t}
                  onToggle={toggleTask}
                  onEdit={handleOpenEditTask}
                  onDelete={deleteTask}
                  profiles={profiles}
                  milestones={startupMilestones}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Blockers */}
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
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-rose-600 text-white font-bold text-xs hover:bg-rose-700 shadow-md"
            >
              <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>Log Blocker</span>
            </button>
          </div>

          <div className="space-y-3">
            {startupBlockers.map(b => (
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
                    <div
                      className={`mt-0.5 w-6 h-6 rounded-lg flex items-center justify-center ${
                        b.resolved ? 'bg-emerald-500/20 text-emerald-500' : 'bg-rose-500/20 text-rose-500'
                      }`}
                    >
                      {b.resolved ? <CheckCircle2 className="w-4 h-4" /> : <AlertOctagon className="w-4 h-4" />}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-900 dark:text-white">
                          {b.description}
                        </span>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-rose-600 text-white">
                          {b.severity}
                        </span>
                      </div>

                      {b.resolved && b.resolution && (
                        <div className="mt-2.5 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs">
                          <span className="font-semibold text-trackaa-green">
                            Resolution Narrative:
                          </span>{' '}
                          <span className="text-slate-700 dark:text-slate-300">{b.resolution}</span>
                        </div>
                      )}

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
                              className="px-3 py-1 rounded-lg bg-emerald-600 text-white font-bold text-xs"
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
                        className="px-3 py-1 rounded-xl text-xs font-semibold bg-emerald-600 text-white hover:bg-emerald-700 transition-colors"
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
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Roadmap with Multiple Visualization Styles */}
      {activeTab === 'roadmap' && (
        <div className="space-y-6 animate-fade-in">
          {!permissions.canViewRoadmap ? (
            <div className="rounded-3xl glass-panel p-8 text-center border border-amber-500/30">
              <Lock className="w-8 h-8 text-amber-500 mx-auto mb-2" />
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">Roadmap View Restricted</h3>
              <p className="text-xs text-slate-400 mt-1">
                Your role does not have permission to view strategic roadmap milestones. Contact an admin.
              </p>
            </div>
          ) : (
            <>
              {/* Header with Visualization Switcher */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                    Roadmap & Horizon Milestones
                  </h2>
                  <p className="text-xs text-slate-500">
                    Track release gates, conditions checklists, and early-beat velocity
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  {/* View Style Switcher */}
                  <div className="flex items-center p-1 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 text-xs">
                    <button
                      type="button"
                      onClick={() => setMilestoneViewMode('visual')}
                      className={`flex items-center gap-1.5 px-3 py-1 rounded-xl font-semibold transition-all ${
                        milestoneViewMode === 'visual'
                          ? 'bg-trackaa-green text-white shadow-sm'
                          : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                      }`}
                    >
                      <LayoutGrid className="w-3.5 h-3.5" />
                      <span>Visual Horizon</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setMilestoneViewMode('list')}
                      className={`flex items-center gap-1.5 px-3 py-1 rounded-xl font-semibold transition-all ${
                        milestoneViewMode === 'list'
                          ? 'bg-trackaa-green text-white shadow-sm'
                          : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                      }`}
                    >
                      <ListIcon className="w-3.5 h-3.5" />
                      <span>List View</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setMilestoneViewMode('calendar')}
                      className={`flex items-center gap-1.5 px-3 py-1 rounded-xl font-semibold transition-all ${
                        milestoneViewMode === 'calendar'
                          ? 'bg-trackaa-green text-white shadow-sm'
                          : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                      }`}
                    >
                      <CalendarDays className="w-3.5 h-3.5" />
                      <span>Calendar</span>
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => setIsMilestoneModalOpen(true)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-trackaa-green text-white font-bold text-xs hover:bg-[#059669] shadow-glow-emerald"
                  >
                    <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                    <span>Add Milestone</span>
                  </button>
                </div>
              </div>

              {/* View 1: Visual Horizon (Default) */}
              {milestoneViewMode === 'visual' && (
                <div className="space-y-4">
                  {startupMilestones.map(m => {
                    const isExpanded = !!expandedMilestones[m.id];
                    const isAchieved = m.status === 'achieved';
                    const isOverdue = !isAchieved && todayStr > m.end_date;
                    const isBeatenEarly =
                      isAchieved && m.completed_date && m.completed_date <= m.end_date;
                    const conditions = m.conditions || [];
                    const completedConditions = conditions.filter(c => c.completed).length;
                    const pct =
                      conditions.length > 0
                        ? Math.round((completedConditions / conditions.length) * 100)
                        : isAchieved
                        ? 100
                        : 25;

                    return (
                      <div
                        key={m.id}
                        className="rounded-3xl glass-panel p-6 border border-black/5 dark:border-white/10 space-y-4"
                      >
                        {/* Top Milestone Row */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                          <div className="flex items-center gap-2.5">
                            <div
                              className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                                isAchieved
                                  ? 'bg-trackaa-green/15 text-trackaa-green'
                                  : isOverdue
                                  ? 'bg-rose-500/15 text-rose-500'
                                  : 'bg-black/5 dark:bg-white/10 text-slate-400'
                              }`}
                            >
                              <Flag className="w-4 h-4" />
                            </div>
                            <div>
                              <div className="flex items-center gap-2 flex-wrap">
                                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                                  {m.title}
                                </h3>
                                {/* Status tags with pure white text */}
                                {isBeatenEarly && (
                                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-600 text-white shadow-sm">
                                    Beaten Early ({m.completed_date})
                                  </span>
                                )}
                                {isOverdue && (
                                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-600 text-white shadow-sm">
                                    Overdue Gate
                                  </span>
                                )}
                              </div>
                              <div className="text-[11px] text-slate-400 font-mono mt-0.5">
                                Set: {m.start_date} &rarr; Target: {m.end_date}
                              </div>
                            </div>
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

                        {/* Expandable Description */}
                        <div>
                          <p
                            className={`text-xs text-slate-600 dark:text-slate-300 leading-relaxed ${
                              !isExpanded ? 'line-clamp-2' : ''
                            }`}
                          >
                            {m.description}
                          </p>
                          {m.description.length > 90 && (
                            <button
                              type="button"
                              onClick={() => toggleMilestoneExpand(m.id)}
                              className="mt-1 text-[11px] font-semibold text-trackaa-green hover:underline flex items-center gap-1"
                            >
                              <span>{isExpanded ? 'View less' : 'View more'}</span>
                              {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                            </button>
                          )}
                        </div>

                        {/* Conditions Checklist Section */}
                        <div className="p-4 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 space-y-3">
                          <div className="flex items-center justify-between text-xs">
                            <span className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                              <CheckCheck className="w-3.5 h-3.5 text-trackaa-green" />
                              <span>Checklist Conditions to Meet Milestone ({pct}%)</span>
                            </span>
                            <span className="text-[11px] font-mono text-slate-400">
                              {completedConditions}/{conditions.length} completed
                            </span>
                          </div>

                          <div className="w-full h-1.5 rounded-full bg-black/10 dark:bg-white/10 overflow-hidden">
                            <div
                              className="h-full bg-trackaa-green rounded-full transition-all duration-300"
                              style={{ width: `${pct}%` }}
                            />
                          </div>

                          {/* Conditions items */}
                          <div className="space-y-2 pt-1">
                            {conditions.map(cond => (
                              <div
                                key={cond.id}
                                onClick={() => toggleMilestoneCondition(m.id, cond.id)}
                                className="flex items-center gap-2.5 cursor-pointer group p-1.5 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                              >
                                <div
                                  className={`w-4 h-4 rounded-md border flex items-center justify-center transition-all ${
                                    cond.completed
                                      ? 'bg-trackaa-green border-trackaa-green text-white'
                                      : 'border-slate-400 group-hover:border-trackaa-green'
                                  }`}
                                >
                                  {cond.completed && <Check className="w-3 h-3 stroke-[3]" />}
                                </div>
                                <span
                                  className={`text-xs ${
                                    cond.completed
                                      ? 'line-through text-slate-400'
                                      : 'text-slate-800 dark:text-slate-200'
                                  }`}
                                >
                                  {cond.text}
                                </span>
                              </div>
                            ))}
                          </div>

                          {/* Add Condition Input */}
                          <div className="flex items-center gap-2 pt-2 border-t border-black/5 dark:border-white/10">
                            <input
                              type="text"
                              placeholder="Add a required condition (e.g. Conduct 5 customer trials)..."
                              value={newConditionInputs[m.id] || ''}
                              onChange={e =>
                                setNewConditionInputs(prev => ({ ...prev, [m.id]: e.target.value }))
                              }
                              onKeyDown={e => {
                                if (e.key === 'Enter') {
                                  e.preventDefault();
                                  handleAddCondition(m.id);
                                }
                              }}
                              className="flex-1 px-3 py-1.5 rounded-xl text-xs bg-white dark:bg-slate-900 border border-black/10 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-trackaa-green/40"
                            />
                            <button
                              type="button"
                              onClick={() => handleAddCondition(m.id)}
                              className="px-3 py-1.5 rounded-xl bg-black/10 dark:bg-white/10 hover:bg-black/15 text-xs font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1"
                            >
                              <Plus className="w-3 h-3" />
                              <span>Add</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* View 2: List View */}
              {milestoneViewMode === 'list' && (
                <div className="rounded-3xl glass-panel p-5 border border-black/5 dark:border-white/10 overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-black/5 dark:border-white/10 text-slate-400 uppercase tracking-wider text-[10px]">
                        <th className="pb-3 font-semibold">Milestone</th>
                        <th className="pb-3 font-semibold">Start & Target</th>
                        <th className="pb-3 font-semibold">Conditions Met</th>
                        <th className="pb-3 font-semibold">Status / Velocity</th>
                        <th className="pb-3 font-semibold text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-black/5 dark:divide-white/5">
                      {startupMilestones.map(m => {
                        const isAchieved = m.status === 'achieved';
                        const isOverdue = !isAchieved && todayStr > m.end_date;
                        const isBeatenEarly =
                          isAchieved && m.completed_date && m.completed_date <= m.end_date;
                        const conds = m.conditions || [];
                        const done = conds.filter(c => c.completed).length;

                        return (
                          <tr key={m.id} className="hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                            <td className="py-3 pr-4 font-semibold text-slate-900 dark:text-white max-w-xs truncate">
                              <div>{m.title}</div>
                              <div className="text-[11px] text-slate-400 font-normal truncate">
                                {m.description}
                              </div>
                            </td>
                            <td className="py-3 pr-4 font-mono text-[11px] text-slate-500 whitespace-nowrap">
                              {m.start_date} &rarr; {m.end_date}
                            </td>
                            <td className="py-3 pr-4 whitespace-nowrap">
                              <span className="font-semibold text-slate-800 dark:text-slate-200">
                                {done}/{conds.length}
                              </span>{' '}
                              <span className="text-[10px] text-slate-400">fulfilled</span>
                            </td>
                            <td className="py-3 pr-4 whitespace-nowrap">
                              {isBeatenEarly ? (
                                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-600 text-white">
                                  Beaten Early
                                </span>
                              ) : isOverdue ? (
                                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-600 text-white">
                                  Overdue
                                </span>
                              ) : (
                                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-700 text-white capitalize">
                                  {m.status.replace('_', ' ')}
                                </span>
                              )}
                            </td>
                            <td className="py-3 text-right whitespace-nowrap">
                              <button
                                type="button"
                                onClick={() => deleteMilestone(m.id)}
                                className="text-slate-400 hover:text-rose-400 p-1"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}

              {/* View 3: Calendar Format */}
              {milestoneViewMode === 'calendar' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {startupMilestones.map(m => {
                    const isAchieved = m.status === 'achieved';
                    const isOverdue = !isAchieved && todayStr > m.end_date;
                    const isBeatenEarly =
                      isAchieved && m.completed_date && m.completed_date <= m.end_date;
                    const conds = m.conditions || [];
                    const done = conds.filter(c => c.completed).length;

                    return (
                      <div
                        key={m.id}
                        className={`rounded-3xl glass-panel p-5 border flex flex-col justify-between ${
                          isAchieved
                            ? 'border-emerald-500/30'
                            : isOverdue
                            ? 'border-rose-500/30'
                            : 'border-black/5 dark:border-white/10'
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider flex items-center gap-1">
                              <Calendar className="w-3 h-3 text-trackaa-green" />
                              <span>Deadline: {m.end_date}</span>
                            </span>

                            {isBeatenEarly ? (
                              <span className="px-2 py-0.2 rounded-full text-[9px] font-bold bg-emerald-600 text-white">
                                Beaten Early
                              </span>
                            ) : isOverdue ? (
                              <span className="px-2 py-0.2 rounded-full text-[9px] font-bold bg-rose-600 text-white">
                                Overdue
                              </span>
                            ) : (
                              <span className="px-2 py-0.2 rounded-full text-[9px] font-bold bg-slate-700 text-white capitalize">
                                {m.status}
                              </span>
                            )}
                          </div>

                          <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1">
                            {m.title}
                          </h3>
                          <p className="text-xs text-slate-500 line-clamp-3 mb-3">{m.description}</p>
                        </div>

                        <div className="pt-3 border-t border-black/5 dark:border-white/10 flex items-center justify-between text-xs">
                          <span className="text-slate-400 text-[11px]">
                            {done}/{conds.length} conditions
                          </span>
                          <span className="font-mono text-[10px] text-slate-400">
                            Set: {m.start_date}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </>
          )}
        </div>
      )}

      {/* Tab 5: Customer Feedback */}
      {activeTab === 'interactions' && (
        <div className="space-y-6 animate-fade-in">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">Customer Discovery & Feedback</h2>
              <p className="text-xs text-slate-500">Transcripts, quotes, handler notes, and multi-file evidence</p>
            </div>
            <button
              type="button"
              onClick={() => setIsInteractionModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-purple-600 text-white font-bold text-xs hover:bg-purple-700 shadow-md"
            >
              <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>Log Session</span>
            </button>
          </div>

          <div className="space-y-4">
            {startupInteractions.map(ci => (
              <div key={ci.id} className="rounded-3xl glass-panel p-6 border border-black/5 dark:border-white/10">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-bold text-slate-900 dark:text-white">{ci.customer_name}</h3>
                      <span className="text-xs text-slate-400">({ci.customer_role})</span>
                    </div>
                    <div className="flex items-center gap-3 mt-1 text-[11px] text-slate-400">
                      <span>{ci.date}</span>
                      <span>•</span>
                      <span className="font-semibold text-purple-400">{ci.interaction_type}</span>
                      <span>•</span>
                      <span className="text-slate-300">Handled by: {ci.handler_name}</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => deleteInteraction(ci.id)}
                    className="p-1.5 text-slate-400 hover:text-rose-400"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="p-3.5 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 mb-3 text-xs leading-relaxed">
                  <span className="font-semibold text-slate-900 dark:text-white block mb-1">Internal Insights:</span>
                  <p className="text-slate-600 dark:text-slate-300">{ci.handler_report}</p>
                </div>

                {ci.client_notes && (
                  <div className="p-3 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-xs text-purple-200 italic mb-3">
                    {ci.client_notes}
                  </div>
                )}

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
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-black/5 dark:bg-white/5 hover:bg-black/10 text-xs font-medium text-slate-700 dark:text-slate-300 border border-black/5 dark:border-white/10"
                        >
                          <ExternalLink className="w-3 h-3 text-purple-400" />
                          <span>Attachment {idx + 1}</span>
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

      {/* Tab 6: Asset Vault */}
      {activeTab === 'assets' && (
        <div className="space-y-6 animate-fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">Founder Asset Vault</h2>
              <p className="text-xs text-slate-500">Centralized storage for pitch decks, SAFE notes, incorporation docs, and brand marks</p>
            </div>
            <button
              type="button"
              onClick={() => setIsAssetModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-cyan-600 text-white font-bold text-xs hover:bg-cyan-700 shadow-md"
            >
              <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>Upload Asset</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredAssets.map(asset => (
              <div
                key={asset.id}
                className="rounded-3xl glass-panel p-5 border border-black/5 dark:border-white/10 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-black/5 dark:bg-white/10 text-cyan-400">
                      {asset.category.replace('_', ' ')}
                    </span>
                    <button
                      type="button"
                      onClick={() => deleteAsset(asset.id)}
                      className="text-slate-400 hover:text-rose-400"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <h3 className="text-xs font-bold text-slate-900 dark:text-white line-clamp-2 mb-2">
                    {asset.title}
                  </h3>
                  {asset.tags && (
                    <div className="flex flex-wrap gap-1 mb-3">
                      {asset.tags.map((tag, i) => (
                        <span key={i} className="text-[10px] text-slate-400 bg-black/5 dark:bg-white/5 px-1.5 py-0.2 rounded">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="pt-3 border-t border-black/5 dark:border-white/10 flex items-center justify-between text-xs">
                  <span className="text-[10px] text-slate-400 uppercase font-mono">
                    {asset.file_extension || 'LINK'}
                  </span>
                  <a
                    href={asset.file_url || asset.external_url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-semibold text-trackaa-green hover:underline flex items-center gap-1"
                  >
                    <span>Open</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 7: Finances & Runway */}
      {activeTab === 'finances' && (
        <div className="space-y-6 animate-fade-in">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">Startup Finances & Burn Ledger</h2>
              <p className="text-xs text-slate-500">Track capital in, expenses, net cash, and runway trajectory</p>
            </div>
            <button
              type="button"
              onClick={() => setIsFinanceModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-trackaa-green text-white font-bold text-xs hover:bg-[#059669] shadow-glow-emerald"
            >
              <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>Record Transaction</span>
            </button>
          </div>

          <div className="rounded-3xl glass-panel p-5 border border-black/5 dark:border-white/10 overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-black/5 dark:border-white/10 text-slate-400 uppercase tracking-wider text-[10px]">
                  <th className="pb-3 font-semibold">Date</th>
                  <th className="pb-3 font-semibold">Description</th>
                  <th className="pb-3 font-semibold">Category</th>
                  <th className="pb-3 font-semibold">Type</th>
                  <th className="pb-3 font-semibold text-right">Amount</th>
                  <th className="pb-3 font-semibold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/5 dark:divide-white/5">
                {startupFinances.map(f => (
                  <tr key={f.id} className="hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                    <td className="py-3 font-mono text-[11px] text-slate-400">{f.transaction_date}</td>
                    <td className="py-3 font-medium text-slate-900 dark:text-white">{f.description}</td>
                    <td className="py-3 capitalize text-slate-400">{f.category.replace('_', ' ')}</td>
                    <td className="py-3">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          f.transaction_type === 'income'
                            ? 'bg-emerald-500/20 text-emerald-400'
                            : 'bg-rose-500/20 text-rose-400'
                        }`}
                      >
                        {f.transaction_type}
                      </span>
                    </td>
                    <td
                      className={`py-3 text-right font-mono font-bold ${
                        f.transaction_type === 'income' ? 'text-emerald-400' : 'text-rose-400'
                      }`}
                    >
                      {f.transaction_type === 'income' ? '+' : '-'}${f.amount.toLocaleString()}
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
      )}

      {/* Tab 8: Comms & Team */}
      {activeTab === 'comms_team' && (
        <div className="space-y-6 animate-fade-in">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                {startup.name} Team & Communications
              </h2>
              <p className="text-xs text-slate-500">Active collaborators, roles, presence, and direct messaging</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleNavigateToComms}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-trackaa-green text-white font-bold text-xs hover:bg-[#059669] shadow-glow-emerald"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Open {startup.name} Comms Hub</span>
              </button>
              <button
                type="button"
                onClick={() => setIsInviteModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-black/5 dark:bg-white/10 text-slate-800 dark:text-white font-bold text-xs hover:bg-black/10"
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span>Invite Member</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {profiles.map(p => (
              <div
                key={p.id}
                className="rounded-3xl glass-panel p-5 border border-black/5 dark:border-white/10"
              >
                <div className="flex items-start gap-3.5 mb-3">
                  <div className="relative">
                    <img
                      src={p.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=128&q=80'}
                      alt={p.full_name}
                      className="w-12 h-12 rounded-2xl object-cover ring-2 ring-black/5 dark:ring-white/10"
                    />
                    <div
                      className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white dark:border-[#111827] ${
                        p.active_status === 'online'
                          ? 'bg-trackaa-green'
                          : p.active_status === 'away'
                          ? 'bg-amber-400'
                          : 'bg-slate-400'
                      }`}
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white truncate">{p.full_name}</h3>
                    <div className="text-xs text-trackaa-green font-medium">{p.role}</div>
                    <div className="text-[10px] text-slate-400 truncate">{p.email}</div>
                  </div>
                </div>

                <div className="p-2 rounded-xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 text-[10px] font-mono text-slate-400 truncate mb-3">
                  {p.hierarchy_path || `${p.full_name} > Trackaa > ${p.role}`}
                </div>

                <div className="pt-2 border-t border-black/5 dark:border-white/10 flex items-center justify-between text-xs">
                  <span className="text-[11px] text-slate-400">{p.is_admin ? 'Admin' : 'Member'}</span>
                  <button
                    type="button"
                    onClick={handleNavigateToComms}
                    className="text-xs font-semibold text-trackaa-green hover:underline flex items-center gap-1"
                  >
                    <span>Send Message</span>
                    <MessageSquare className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modals */}
      <NewTaskModal projectId={startup.id} isOpen={isTaskModalOpen} onClose={() => setIsTaskModalOpen(false)} />
      <EditTaskModal task={editingTask} isOpen={isEditTaskModalOpen} onClose={() => setIsEditTaskModalOpen(false)} />
      <NewBlockerModal projectId={startup.id} isOpen={isBlockerModalOpen} onClose={() => setIsBlockerModalOpen(false)} />
      <NewMilestoneModal projectId={startup.id} isOpen={isMilestoneModalOpen} onClose={() => setIsMilestoneModalOpen(false)} />
      <NewInteractionModal projectId={startup.id} isOpen={isInteractionModalOpen} onClose={() => setIsInteractionModalOpen(false)} />
      <NewAssetModal projectId={startup.id} isOpen={isAssetModalOpen} onClose={() => setIsAssetModalOpen(false)} />
      <NewFinanceModal projectId={startup.id} isOpen={isFinanceModalOpen} onClose={() => setIsFinanceModalOpen(false)} />
      <InviteMemberModal isOpen={isInviteModalOpen} onClose={() => setIsInviteModalOpen(false)} />
      <StartupSettingsModal startup={startup} isOpen={isSettingsModalOpen} onClose={() => setIsSettingsModalOpen(false)} />
      <AddStatusReportModal startupId={startup.id} isOpen={isStatusReportModalOpen} onClose={() => setIsStatusReportModalOpen(false)} />
    </div>
  );
};

// Sub-component: Upgraded TaskRow with edit trigger, tagged members, milestone tags, and attachments
interface TaskRowProps {
  task: Task;
  onToggle: (id: string) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  profiles: any[];
  milestones: RoadmapMilestone[];
}

const TaskRow: React.FC<TaskRowProps> = ({
  task,
  onToggle,
  onEdit,
  onDelete,
  profiles,
  milestones,
}) => {
  const assignee = profiles.find(p => p.id === task.assigned_to);
  const linkedMilestone = milestones.find(m => m.id === task.milestone_id);
  const taggedMembers = profiles.filter(p => task.tagged_member_ids?.includes(p.id));

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 hover:border-trackaa-green/40 transition-all gap-2.5">
      <div className="flex items-start sm:items-center gap-3 flex-1 min-w-0">
        <button
          type="button"
          onClick={() => onToggle(task.id)}
          className={`mt-0.5 sm:mt-0 w-5 h-5 rounded-lg border flex items-center justify-center flex-shrink-0 transition-all ${
            task.completed
              ? 'bg-trackaa-green border-trackaa-green text-white'
              : 'border-slate-400 hover:border-trackaa-green'
          }`}
        >
          {task.completed && <Check className="w-3.5 h-3.5 stroke-[3]" />}
        </button>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span
              className={`text-xs ${
                task.completed ? 'line-through text-slate-400' : 'text-slate-800 dark:text-slate-200 font-semibold'
              }`}
            >
              {task.title}
            </span>

            {/* Linked Milestone Tag */}
            {linkedMilestone && (
              <span className="px-2 py-0.2 rounded-md text-[10px] font-medium bg-trackaa-navy/20 dark:bg-white/10 text-trackaa-green border border-trackaa-green/20 flex items-center gap-1">
                <Flag className="w-2.5 h-2.5" />
                <span className="truncate max-w-[120px]">{linkedMilestone.title}</span>
              </span>
            )}

            {/* Attachments Indicator */}
            {task.attachments && task.attachments.length > 0 && (
              <span className="px-1.5 py-0.2 rounded text-[10px] bg-black/5 dark:bg-white/10 text-slate-400 flex items-center gap-1">
                <Paperclip className="w-2.5 h-2.5" />
                <span>{task.attachments.length}</span>
              </span>
            )}
          </div>

          {/* Tagged members preview */}
          {taggedMembers.length > 0 && (
            <div className="flex items-center gap-1 mt-1 text-[10px] text-slate-400">
              <span className="font-medium">Tagged:</span>
              {taggedMembers.map(m => (
                <span key={m.id} className="text-trackaa-green font-semibold">
                  @{m.full_name.split(' ')[0]}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2.5 self-end sm:self-center">
        {/* Priority Badge with pure white text */}
        <PriorityBadge priority={task.priority} size="sm" />

        {/* Primary Assignee */}
        {assignee && (
          <img
            src={assignee.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=128&q=80'}
            alt={assignee.full_name}
            title={`Assigned to ${assignee.full_name}`}
            className="w-5 h-5 rounded-full object-cover ring-1 ring-black/10 dark:ring-white/20"
          />
        )}

        {/* Edit Button */}
        <button
          type="button"
          onClick={() => onEdit(task)}
          className="text-slate-400 hover:text-trackaa-green transition-colors p-1"
          title="Edit Task & Attachments"
        >
          <Edit2 className="w-3.5 h-3.5" />
        </button>

        {/* Delete Button */}
        <button
          type="button"
          onClick={() => onDelete(task.id)}
          className="text-slate-400 hover:text-rose-400 transition-colors p-1"
          title="Delete Task"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
