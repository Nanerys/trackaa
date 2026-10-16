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

  // Startup Actions
  addStartup: (startup: Omit<Startup, 'id' | 'created_at'>) => string;
  updateStartup: (id: string, updates: Partial<Startup>) => void;
  quickUpdateStatus: (id: string, status: StartupStatus) => void;
  deleteStartup: (id: string) => void;

  // Task Actions
  addTask: (task: Omit<Task, 'id' | 'created_at'>) => void;
  toggleTask: (id: string) => void;
  deleteTask: (id: string) => void;

  // Blocker Actions
  addBlocker: (blocker: Omit<Blocker, 'id' | 'created_at'>) => void;
  resolveBlocker: (id: string, resolution: string) => void;
  deleteBlocker: (id: string) => void;

  // Milestone Actions
  addMilestone: (milestone: Omit<RoadmapMilestone, 'id'>) => void;
  updateMilestoneStatus: (id: string, status: RoadmapMilestone['status']) => void;
  deleteMilestone: (id: string) => void;

  // Interaction Actions
  addInteraction: (interaction: Omit<CustomerInteraction, 'id' | 'created_at'>) => void;
  deleteInteraction: (id: string) => void;

  // Asset Actions
  addAsset: (asset: Omit<StartupAsset, 'id' | 'created_at'>) => void;
  deleteAsset: (id: string) => void;

  // Finance Actions
  addFinance: (finance: Omit<StartupFinance, 'id' | 'created_at'>) => void;
  deleteFinance: (id: string) => void;

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
  // Initialize state from localStorage or fallback
  const [startups, setStartups] = useState<Startup[]>(() => {
    const saved = localStorage.getItem('trackaa_startups');
    return saved ? JSON.parse(saved) : initialStartups;
  });

  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem('trackaa_tasks');
    return saved ? JSON.parse(saved) : initialTasks;
  });

  const [blockers, setBlockers] = useState<Blocker[]>(() => {
    const saved = localStorage.getItem('trackaa_blockers');
    return saved ? JSON.parse(saved) : initialBlockers;
  });

  const [milestones, setMilestones] = useState<RoadmapMilestone[]>(() => {
    const saved = localStorage.getItem('trackaa_milestones');
    return saved ? JSON.parse(saved) : initialMilestones;
  });

  const [interactions, setInteractions] = useState<CustomerInteraction[]>(() => {
    const saved = localStorage.getItem('trackaa_interactions');
    return saved ? JSON.parse(saved) : initialInteractions;
  });

  const [assets, setAssets] = useState<StartupAsset[]>(() => {
    const saved = localStorage.getItem('trackaa_assets');
    return saved ? JSON.parse(saved) : initialAssets;
  });

  const [finances, setFinances] = useState<StartupFinance[]>(() => {
    const saved = localStorage.getItem('trackaa_finances');
    return saved ? JSON.parse(saved) : initialFinances;
  });

  const [profiles] = useState<Profile[]>(initialProfiles);

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

  // Keep HTML root class aligned with theme
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

  // Persist state changes
  useEffect(() => {
    localStorage.setItem('trackaa_startups', JSON.stringify(startups));
  }, [startups]);

  useEffect(() => {
    localStorage.setItem('trackaa_tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('trackaa_blockers', JSON.stringify(blockers));
  }, [blockers]);

  useEffect(() => {
    localStorage.setItem('trackaa_milestones', JSON.stringify(milestones));
  }, [milestones]);

  useEffect(() => {
    localStorage.setItem('trackaa_interactions', JSON.stringify(interactions));
  }, [interactions]);

  useEffect(() => {
    localStorage.setItem('trackaa_assets', JSON.stringify(assets));
  }, [assets]);

  useEffect(() => {
    localStorage.setItem('trackaa_finances', JSON.stringify(finances));
  }, [finances]);

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

  // Startup actions
  const addStartup = (data: Omit<Startup, 'id' | 'created_at'>): string => {
    const id = `startup-${Date.now()}`;
    const newStartup: Startup = {
      ...data,
      id,
      created_at: new Date().toISOString(),
    };
    setStartups(prev => [newStartup, ...prev]);
    setCurrentStartupId(id);
    return id;
  };

  const updateStartup = (id: string, updates: Partial<Startup>) => {
    setStartups(prev =>
      prev.map(s => (s.id === id ? { ...s, ...updates, updated_at: new Date().toISOString() } : s))
    );
  };

  const quickUpdateStatus = (id: string, status: StartupStatus) => {
    setStartups(prev =>
      prev.map(s => (s.id === id ? { ...s, status, updated_at: new Date().toISOString() } : s))
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

  const updateMilestoneStatus = (id: string, status: RoadmapMilestone['status']) => {
    setMilestones(prev =>
      prev.map(m => (m.id === id ? { ...m, status } : m))
    );
  };

  const deleteMilestone = (id: string) => {
    setMilestones(prev => prev.filter(m => m.id !== id));
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
    // Simple average monthly estimation
    return Math.round(totalExp / 2);
  };

  const getEstimatedRunwayMonths = (projectId: string): number => {
    const netCash = getNetCash(projectId);
    const burn = getMonthlyBurnRate(projectId);
    if (burn <= 0) return 24; // Healthy baseline
    if (netCash <= 0) return 0;
    const months = netCash / burn;
    return Math.min(Math.round(months * 10) / 10, 48);
  };

  // Computed metrics
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
    setInteractions(initialInteractions);
    setAssets(initialAssets);
    setFinances(initialFinances);
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
        currentStartupId,
        setCurrentStartupId,
        currentStartup,
        theme,
        toggleTheme,
        isAuthenticated,
        currentUser,
        login,
        logout,
        addStartup,
        updateStartup,
        quickUpdateStatus,
        deleteStartup,
        addTask,
        toggleTask,
        deleteTask,
        addBlocker,
        resolveBlocker,
        deleteBlocker,
        addMilestone,
        updateMilestoneStatus,
        deleteMilestone,
        addInteraction,
        deleteInteraction,
        addAsset,
        deleteAsset,
        addFinance,
        deleteFinance,
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
