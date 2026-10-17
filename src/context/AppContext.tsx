import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Startup,
  Task,
  Blocker,
  RoadmapMilestone,
  CustomerInteraction,
  StartupAsset,
  StartupFinance,
  Profile,
  StartupStatus,
  StartupStage,
  StatusLadderRung,
  ChatChannel,
  ChatMessage,
  StatusReport,
  UserPermissions,
  ActiveStatus,
} from '../types';
import {
  initialStartups,
  initialTasks,
  initialBlockers,
  initialMilestones,
  initialInteractions,
  initialAssets,
  initialFinances,
  initialProfiles,
  initialChannels,
  initialMessages,
  initialStatusReports,
  defaultAdminPermissions,
  defaultMemberPermissions,
} from '../data/mockData';

interface AppContextType {
  // Data
  startups: Startup[];
  tasks: Task[];
  blockers: Blocker[];
  milestones: RoadmapMilestone[];
  interactions: CustomerInteraction[];
  assets: StartupAsset[];
  finances: StartupFinance[];
  profiles: Profile[];
  channels: ChatChannel[];
  messages: ChatMessage[];
  statusReports: StatusReport[];
  
  // Active selection
  currentStartupId: string;
  setCurrentStartupId: (id: string) => void;
  currentStartup: Startup | undefined;

  // Theme & Auth
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  isAuthenticated: boolean;
  currentUser: Profile;
  login: (email: string, name?: string) => void;
  logout: () => void;
  resetAdminPassword: (newPass: string) => void;

  // Startup Actions
  addStartup: (startup: Omit<Startup, 'id' | 'created_at'>) => string;
  updateStartup: (id: string, updates: Partial<Startup>) => void;
  quickUpdateStatus: (id: string, status: StartupStatus) => void;
  updateStartupStage: (id: string, stage: StartupStage) => void;
  deleteStartup: (id: string) => void;
  updateStartupSettings: (
    id: string,
    updates: {
      name?: string;
      description?: string;
      logo_url?: string;
      website_url?: string;
      settings_access_user_ids?: string[];
    }
  ) => void;

  // Task Actions
  addTask: (task: Omit<Task, 'id' | 'created_at'>) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  toggleTask: (id: string) => void;
  deleteTask: (id: string) => void;

  // Blocker Actions
  addBlocker: (blocker: Omit<Blocker, 'id' | 'created_at'>) => void;
  resolveBlocker: (id: string, resolution: string) => void;
  deleteBlocker: (id: string) => void;

  // Milestone Actions
  addMilestone: (milestone: Omit<RoadmapMilestone, 'id'>) => void;
  updateMilestone: (id: string, updates: Partial<RoadmapMilestone>) => void;
  updateMilestoneStatus: (id: string, status: RoadmapMilestone['status']) => void;
  toggleMilestoneCondition: (milestoneId: string, conditionId: string) => void;
  addMilestoneCondition: (milestoneId: string, text: string) => void;
  deleteMilestone: (id: string) => void;

  // Status Bulletin Reports (Post-it notes)
  addStatusReport: (content: string, color?: StatusReport['color'], startupId?: string) => void;
  deleteStatusReport: (id: string) => void;

  // Interaction Actions
  addInteraction: (interaction: Omit<CustomerInteraction, 'id' | 'created_at'>) => void;
  deleteInteraction: (id: string) => void;

  // Asset Actions
  addAsset: (asset: Omit<StartupAsset, 'id' | 'created_at'>) => void;
  deleteAsset: (id: string) => void;

  // Finance Actions
  addFinance: (finance: Omit<StartupFinance, 'id' | 'created_at'>) => void;
  deleteFinance: (id: string) => void;

  // Comms Actions
  sendMessage: (msg: Omit<ChatMessage, 'id' | 'timestamp'>) => void;
  createSubgroup: (name: string, description: string) => ChatChannel;
  toggleUserActiveStatus: (status: ActiveStatus) => void;
  clearUnreadForUser: (userId: string) => void;

  // Team & RBAC
  inviteMember: (data: {
    email: string;
    full_name: string;
    role: string;
    department?: string;
    temporary_password?: string;
    permissions: UserPermissions;
  }) => Profile;

  // Financial Metrics
  getTotalCapitalIn: (projectId: string) => number;
  getTotalExpenses: (projectId: string) => number;
  getNetCash: (projectId: string) => number;
  getMonthlyBurnRate: (projectId: string) => number;
  getEstimatedRunwayMonths: (projectId: string) => number;

  // Computed Metrics
  getStartupProgress: (projectId: string) => number;
  getActiveBlockerCount: (projectId: string) => number;
  resetAllData: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [startups, setStartups] = useState<Startup[]>(() => {
    const saved = localStorage.getItem('trackaa_startups_v3');
    return saved ? JSON.parse(saved) : initialStartups;
  });

  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem('trackaa_tasks_v3');
    return saved ? JSON.parse(saved) : initialTasks;
  });

  const [blockers, setBlockers] = useState<Blocker[]>(() => {
    const saved = localStorage.getItem('trackaa_blockers_v3');
    return saved ? JSON.parse(saved) : initialBlockers;
  });

  const [milestones, setMilestones] = useState<RoadmapMilestone[]>(() => {
    const saved = localStorage.getItem('trackaa_milestones_v3');
    return saved ? JSON.parse(saved) : initialMilestones;
  });

  const [statusReports, setStatusReports] = useState<StatusReport[]>(() => {
    const saved = localStorage.getItem('trackaa_status_reports_v3');
    return saved ? JSON.parse(saved) : initialStatusReports;
  });

  const [interactions, setInteractions] = useState<CustomerInteraction[]>(() => {
    const saved = localStorage.getItem('trackaa_interactions_v3');
    return saved ? JSON.parse(saved) : initialInteractions;
  });

  const [assets, setAssets] = useState<StartupAsset[]>(() => {
    const saved = localStorage.getItem('trackaa_assets_v3');
    return saved ? JSON.parse(saved) : initialAssets;
  });

  const [finances, setFinances] = useState<StartupFinance[]>(() => {
    const saved = localStorage.getItem('trackaa_finances_v3');
    return saved ? JSON.parse(saved) : initialFinances;
  });

  const [profiles, setProfiles] = useState<Profile[]>(() => {
    const saved = localStorage.getItem('trackaa_profiles_v3');
    return saved ? JSON.parse(saved) : initialProfiles;
  });

  const [channels, setChannels] = useState<ChatChannel[]>(() => {
    const saved = localStorage.getItem('trackaa_channels_v3');
    return saved ? JSON.parse(saved) : initialChannels;
  });

  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    const saved = localStorage.getItem('trackaa_messages_v3');
    return saved ? JSON.parse(saved) : initialMessages;
  });

  const [currentStartupId, setCurrentStartupId] = useState<string>(() => {
    return initialStartups[0]?.id || '';
  });

  // Auth State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('trackaa_auth') === 'true';
  });

  const [currentUser, setCurrentUser] = useState<Profile>(initialProfiles[0]);

  // Theme State
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    const saved = localStorage.getItem('trackaa_theme');
    return (saved as 'dark' | 'light') || 'dark';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.remove('dark');
      root.classList.add('light');
    }
    localStorage.setItem('trackaa_theme', theme);
  }, [theme]);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('trackaa_startups_v3', JSON.stringify(startups));
  }, [startups]);

  useEffect(() => {
    localStorage.setItem('trackaa_tasks_v3', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('trackaa_blockers_v3', JSON.stringify(blockers));
  }, [blockers]);

  useEffect(() => {
    localStorage.setItem('trackaa_milestones_v3', JSON.stringify(milestones));
  }, [milestones]);

  useEffect(() => {
    localStorage.setItem('trackaa_status_reports_v3', JSON.stringify(statusReports));
  }, [statusReports]);

  useEffect(() => {
    localStorage.setItem('trackaa_profiles_v3', JSON.stringify(profiles));
  }, [profiles]);

  useEffect(() => {
    localStorage.setItem('trackaa_channels_v3', JSON.stringify(channels));
  }, [channels]);

  useEffect(() => {
    localStorage.setItem('trackaa_messages_v3', JSON.stringify(messages));
  }, [messages]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const login = (email: string, name?: string) => {
    setIsAuthenticated(true);
    localStorage.setItem('trackaa_auth', 'true');
    if (email) {
      setCurrentUser(prev => ({
        ...prev,
        email,
        full_name: name || email.split('@')[0],
      }));
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('trackaa_auth');
  };

  const resetAdminPassword = (newPass: string) => {
    setCurrentUser(prev => ({
      ...prev,
      temporary_password: newPass,
    }));
    setProfiles(prev =>
      prev.map(p => (p.id === currentUser.id ? { ...p, temporary_password: newPass } : p))
    );
  };

  // Startup actions
  const addStartup = (data: Omit<Startup, 'id' | 'created_at'>): string => {
    const id = `startup-${Date.now()}`;
    const newStartup: Startup = {
      ...data,
      id,
      settings_access_user_ids: [currentUser.id],
      created_at: new Date().toISOString(),
    };

    // Auto-create isolated Common Room for this startup
    const defaultCommonRoom: ChatChannel = {
      id: `common-room-${id}`,
      startup_id: id,
      name: `Common Room (${data.name})`,
      description: `The general town hall for ${data.name} members.`,
      is_common_room: true,
      is_subgroup: false,
      created_by: currentUser.id,
      member_ids: profiles.map(p => p.id),
    };

    setStartups(prev => [newStartup, ...prev]);
    setChannels(prev => [...prev, defaultCommonRoom]);
    setCurrentStartupId(id);
    return id;
  };

  const updateStartup = (id: string, updates: Partial<Startup>) => {
    setStartups(prev =>
      prev.map(s => (s.id === id ? { ...s, ...updates, updated_at: new Date().toISOString() } : s))
    );
  };

  const updateStartupSettings = (
    id: string,
    updates: {
      name?: string;
      description?: string;
      logo_url?: string;
      website_url?: string;
      settings_access_user_ids?: string[];
    }
  ) => {
    setStartups(prev =>
      prev.map(s => (s.id === id ? { ...s, ...updates, updated_at: new Date().toISOString() } : s))
    );
  };

  const quickUpdateStatus = (id: string, status: StartupStatus) => {
    setStartups(prev =>
      prev.map(s => (s.id === id ? { ...s, status, updated_at: new Date().toISOString() } : s))
    );
  };

  const updateStartupStage = (id: string, stage: StartupStage) => {
    setStartups(prev =>
      prev.map(s => (s.id === id ? { ...s, stage, updated_at: new Date().toISOString() } : s))
    );
  };

  const deleteStartup = (id: string) => {
    setStartups(prev => prev.filter(s => s.id !== id));
    if (currentStartupId === id) {
      const remaining = startups.filter(s => s.id !== id);
      if (remaining.length > 0) {
        setCurrentStartupId(remaining[0].id);
      }
    }
  };

  // Task actions
  const addTask = (data: Omit<Task, 'id' | 'created_at'>) => {
    const newTask: Task = {
      ...data,
      id: `task-${Date.now()}`,
      created_at: new Date().toISOString(),
    };
    setTasks(prev => [newTask, ...prev]);
  };

  const updateTask = (id: string, updates: Partial<Task>) => {
    setTasks(prev => prev.map(t => (t.id === id ? { ...t, ...updates } : t)));
  };

  const toggleTask = (id: string) => {
    setTasks(prev =>
      prev.map(t => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  // Blocker actions
  const addBlocker = (data: Omit<Blocker, 'id' | 'created_at'>) => {
    const newBlocker: Blocker = {
      ...data,
      id: `blocker-${Date.now()}`,
      created_at: new Date().toISOString(),
    };
    setBlockers(prev => [newBlocker, ...prev]);
  };

  const resolveBlocker = (id: string, resolution: string) => {
    setBlockers(prev =>
      prev.map(b =>
        b.id === id
          ? {
              ...b,
              resolved: true,
              resolution,
              resolved_at: new Date().toISOString(),
            }
          : b
      )
    );
  };

  const deleteBlocker = (id: string) => {
    setBlockers(prev => prev.filter(b => b.id !== id));
  };

  // Milestone actions
  const addMilestone = (data: Omit<RoadmapMilestone, 'id'>) => {
    const newMilestone: RoadmapMilestone = {
      ...data,
      id: `m-${Date.now()}`,
    };
    setMilestones(prev => [...prev, newMilestone]);
  };

  const updateMilestone = (id: string, updates: Partial<RoadmapMilestone>) => {
    setMilestones(prev => prev.map(m => (m.id === id ? { ...m, ...updates } : m)));
  };

  const updateMilestoneStatus = (id: string, status: RoadmapMilestone['status']) => {
    const isAchieved = status === 'achieved';
    setMilestones(prev =>
      prev.map(m =>
        m.id === id
          ? {
              ...m,
              status,
              completed_date: isAchieved ? new Date().toISOString().split('T')[0] : undefined,
            }
          : m
      )
    );
  };

  const toggleMilestoneCondition = (milestoneId: string, conditionId: string) => {
    setMilestones(prev =>
      prev.map(m => {
        if (m.id !== milestoneId || !m.conditions) return m;
        const updatedConditions = m.conditions.map(c =>
          c.id === conditionId ? { ...c, completed: !c.completed } : c
        );
        const allCompleted = updatedConditions.every(c => c.completed);
        return {
          ...m,
          conditions: updatedConditions,
          status: allCompleted ? 'achieved' : m.status === 'achieved' ? 'in_progress' : m.status,
          completed_date: allCompleted ? new Date().toISOString().split('T')[0] : undefined,
        };
      })
    );
  };

  const addMilestoneCondition = (milestoneId: string, text: string) => {
    if (!text.trim()) return;
    const newCondition = {
      id: `c-${Date.now()}`,
      text: text.trim(),
      completed: false,
    };
    setMilestones(prev =>
      prev.map(m => {
        if (m.id !== milestoneId) return m;
        return {
          ...m,
          conditions: [...(m.conditions || []), newCondition],
        };
      })
    );
  };

  const deleteMilestone = (id: string) => {
    setMilestones(prev => prev.filter(m => m.id !== id));
  };

  // Status Bulletin Reports (Post-it notes)
  const addStatusReport = (
    content: string,
    color: StatusReport['color'] = 'amber',
    startupId?: string
  ) => {
    if (!content.trim()) return;
    const now = new Date();
    const timeStr = `Today at ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    const newReport: StatusReport = {
      id: `rep-${Date.now()}`,
      startup_id: startupId || currentStartupId,
      content: content.trim(),
      author_id: currentUser.id,
      author_name: currentUser.full_name,
      author_avatar: currentUser.avatar_url,
      created_at: timeStr,
      color,
    };
    setStatusReports(prev => [newReport, ...prev]);
  };

  const deleteStatusReport = (id: string) => {
    setStatusReports(prev => prev.filter(r => r.id !== id));
  };

  // Interaction actions
  const addInteraction = (data: Omit<CustomerInteraction, 'id' | 'created_at'>) => {
    const newInteraction: CustomerInteraction = {
      ...data,
      id: `ci-${Date.now()}`,
      created_at: new Date().toISOString(),
    };
    setInteractions(prev => [newInteraction, ...prev]);
  };

  const deleteInteraction = (id: string) => {
    setInteractions(prev => prev.filter(i => i.id !== id));
  };

  // Asset actions
  const addAsset = (data: Omit<StartupAsset, 'id' | 'created_at'>) => {
    const newAsset: StartupAsset = {
      ...data,
      id: `asset-${Date.now()}`,
      created_at: new Date().toISOString(),
    };
    setAssets(prev => [newAsset, ...prev]);
  };

  const deleteAsset = (id: string) => {
    setAssets(prev => prev.filter(a => a.id !== id));
  };

  // Finance actions
  const addFinance = (data: Omit<StartupFinance, 'id' | 'created_at'>) => {
    const newFinance: StartupFinance = {
      ...data,
      id: `fin-${Date.now()}`,
      created_at: new Date().toISOString(),
    };
    setFinances(prev => [newFinance, ...prev]);
  };

  const deleteFinance = (id: string) => {
    setFinances(prev => prev.filter(f => f.id !== id));
  };

  // Comms actions
  const sendMessage = (msg: Omit<ChatMessage, 'id' | 'timestamp'>) => {
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newMsg: ChatMessage = {
      ...msg,
      id: `msg-${Date.now()}`,
      timestamp: timeStr,
    };
    setMessages(prev => [...prev, newMsg]);
  };

  const createSubgroup = (name: string, description: string): ChatChannel => {
    const newChan: ChatChannel = {
      id: `sub-${Date.now()}`,
      startup_id: currentStartupId,
      name: name.startsWith('#') ? name.slice(1) : name,
      description,
      is_common_room: false,
      is_subgroup: true,
      created_by: currentUser.id,
      member_ids: profiles.map(p => p.id),
    };
    setChannels(prev => [...prev, newChan]);
    return newChan;
  };

  const toggleUserActiveStatus = (status: ActiveStatus) => {
    setCurrentUser(prev => ({ ...prev, active_status: status }));
    setProfiles(prev =>
      prev.map(p => (p.id === currentUser.id ? { ...p, active_status: status } : p))
    );
  };

  const clearUnreadForUser = (userId: string) => {
    setProfiles(prev =>
      prev.map(p => (p.id === userId ? { ...p, unread_count: 0 } : p))
    );
  };

  // Team & RBAC
  const inviteMember = (data: {
    email: string;
    full_name: string;
    role: string;
    department?: string;
    temporary_password?: string;
    permissions: UserPermissions;
  }): Profile => {
    const hierarchy = `${data.full_name} > Trackaa > ${data.role} > ${data.department || 'Operations'}`;
    const newMember: Profile = {
      id: `p-${Date.now()}`,
      full_name: data.full_name,
      email: data.email,
      role: data.role,
      department: data.department || 'Team',
      hierarchy_path: hierarchy,
      avatar_url: `https://images.unsplash.com/photo-${1534528741775 + Math.floor(Math.random() * 1000)}?auto=format&fit=crop&w=256&q=80`,
      active_status: 'online',
      unread_count: 0,
      is_admin: false,
      permissions: data.permissions,
      temporary_password: data.temporary_password || Math.random().toString(36).slice(-8),
    };
    setProfiles(prev => [...prev, newMember]);
    return newMember;
  };

  // Financial calculations
  const getTotalCapitalIn = (projectId: string): number => {
    return finances
      .filter(f => f.project_id === projectId && f.transaction_type === 'income')
      .reduce((sum, f) => sum + f.amount, 0);
  };

  const getTotalExpenses = (projectId: string): number => {
    return finances
      .filter(f => f.project_id === projectId && f.transaction_type === 'expense')
      .reduce((sum, f) => sum + f.amount, 0);
  };

  const getNetCash = (projectId: string): number => {
    return getTotalCapitalIn(projectId) - getTotalExpenses(projectId);
  };

  const getMonthlyBurnRate = (projectId: string): number => {
    const expenses = finances.filter(
      f => f.project_id === projectId && f.transaction_type === 'expense'
    );
    if (expenses.length === 0) return 0;
    const totalExp = expenses.reduce((sum, f) => sum + f.amount, 0);
    return Math.round(totalExp / 2);
  };

  const getEstimatedRunwayMonths = (projectId: string): number => {
    const netCash = getNetCash(projectId);
    const burn = getMonthlyBurnRate(projectId);
    if (burn <= 0) return 24;
    if (netCash <= 0) return 0;
    const months = netCash / burn;
    return Math.min(Math.round(months * 10) / 10, 48);
  };

  const getStartupProgress = (projectId: string): number => {
    const startupTasks = tasks.filter(t => t.project_id === projectId);
    if (startupTasks.length === 0) return 0;
    const completed = startupTasks.filter(t => t.completed).length;
    return Math.round((completed / startupTasks.length) * 100);
  };

  const getActiveBlockerCount = (projectId: string): number => {
    return blockers.filter(b => b.project_id === projectId && !b.resolved).length;
  };

  const resetAllData = () => {
    setStartups(initialStartups);
    setTasks(initialTasks);
    setBlockers(initialBlockers);
    setMilestones(initialMilestones);
    setStatusReports(initialStatusReports);
    setInteractions(initialInteractions);
    setAssets(initialAssets);
    setFinances(initialFinances);
    setProfiles(initialProfiles);
    setChannels(initialChannels);
    setMessages(initialMessages);
    localStorage.clear();
  };

  const currentStartup = startups.find(s => s.id === currentStartupId) || startups[0];

  return (
    <AppContext.Provider
      value={{
        startups,
        tasks,
        blockers,
        milestones,
        interactions,
        assets,
        finances,
        profiles,
        channels,
        messages,
        statusReports,
        currentStartupId,
        setCurrentStartupId,
        currentStartup,
        theme,
        toggleTheme,
        isAuthenticated,
        currentUser,
        login,
        logout,
        resetAdminPassword,
        addStartup,
        updateStartup,
        updateStartupSettings,
        quickUpdateStatus,
        updateStartupStage,
        deleteStartup,
        addTask,
        updateTask,
        toggleTask,
        deleteTask,
        addBlocker,
        resolveBlocker,
        deleteBlocker,
        addMilestone,
        updateMilestone,
        updateMilestoneStatus,
        toggleMilestoneCondition,
        addMilestoneCondition,
        deleteMilestone,
        addStatusReport,
        deleteStatusReport,
        addInteraction,
        deleteInteraction,
        addAsset,
        deleteAsset,
        addFinance,
        deleteFinance,
        sendMessage,
        createSubgroup,
        toggleUserActiveStatus,
        clearUnreadForUser,
        inviteMember,
        getTotalCapitalIn,
        getTotalExpenses,
        getNetCash,
        getMonthlyBurnRate,
        getEstimatedRunwayMonths,
        getStartupProgress,
        getActiveBlockerCount,
        resetAllData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
