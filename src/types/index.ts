export type StartupStage = 'idea' | 'building' | 'beta' | 'launched' | 'scaling';

export type StartupStatus = 'not-started' | 'in-progress' | 'blocked' | 'complete';

export type PriorityLevel = 'low' | 'medium' | 'high' | 'critical';

export interface Profile {
  id: string;
  full_name: string;
  email: string;
  role: string;
  avatar_url?: string;
  active_task_count?: number;
}

export interface Startup {
  id: string;
  name: string;
  description: string;
  stage: StartupStage;
  status: StartupStatus;
  priority: PriorityLevel;
  due_date?: string;
  logo_url?: string;
  website_url?: string;
  archived: boolean;
  created_at: string;
  updated_at?: string;
}

export interface Task {
  id: string;
  project_id: string;
  title: string;
  due_date: string;
  completed: boolean;
  priority: PriorityLevel;
  assigned_to?: string; // Profile ID
  created_at: string;
}

export interface Blocker {
  id: string;
  project_id: string;
  description: string;
  severity: 'low' | 'medium' | 'high';
  resolved: boolean;
  resolution?: string;
  created_at: string;
  resolved_at?: string;
}

export interface RoadmapMilestone {
  id: string;
  project_id: string;
  title: string;
  description: string;
  start_date: string;
  end_date: string;
  status: 'planned' | 'in_progress' | 'achieved' | 'delayed';
}

export interface CustomerInteraction {
  id: string;
  project_id: string;
  customer_name: string;
  customer_role: string;
  date: string;
  handler_id: string;
  handler_name: string;
  handler_report: string;
  client_notes: string;
  attachment_urls: string[]; // Up to 5 files/screenshots
  interaction_type: string; // Interview, Demo, Q&A, Training, etc.
  created_at: string;
}

export type AssetCategory = 'pitch_deck' | 'legal' | 'brand' | 'product' | 'links' | 'other';
export type AssetType = 'file' | 'link';

export interface StartupAsset {
  id: string;
  project_id: string;
  title: string;
  category: AssetCategory;
  asset_type: AssetType;
  file_url?: string;
  external_url?: string;
  file_size?: number;
  file_extension?: string;
  tags?: string[];
  created_by?: string;
  created_at: string;
}

export type TransactionType = 'income' | 'expense';
export type FinanceCategory = 
  | 'investment' 
  | 'grant' 
  | 'revenue' 
  | 'founder_capital'
  | 'payroll' 
  | 'tooling' 
  | 'marketing' 
  | 'legal' 
  | 'cloud_infra'
  | 'other';

export interface StartupFinance {
  id: string;
  project_id: string;
  transaction_type: TransactionType;
  category: FinanceCategory;
  amount: number;
  currency: string;
  transaction_date: string;
  description: string;
  receipt_url?: string;
  created_by?: string;
  created_at: string;
}
