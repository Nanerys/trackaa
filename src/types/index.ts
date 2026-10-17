export type StartupStage =
  | 'idea'
  | 'validation'
  | 'building'
  | 'beta'
  | 'public_beta'
  | 'launched'
  | 'seed'
  | 'series_a'
  | 'series_b'
  | 'series_c'
  | 'series_d';

// Dynamic Status Ladder Rungs (from Struggling to Exceeding Expectations)
export type StatusLadderRung =
  | 'behind'     // Behind Schedule / Struggling
  | 'friction'   // Needs Attention / Friction
  | 'on_track'   // On Track / Steady
  | 'velocity'   // Gaining Velocity
  | 'exceeding'; // Exceeding Expectations

// Legacy alias for compatibility
export type StartupStatus = StatusLadderRung | 'not-started' | 'in-progress' | 'blocked' | 'complete';

export type PriorityLevel = 'low' | 'medium' | 'high' | 'critical';

// Role-Based Access Control (RBAC) Permissions
export interface UserPermissions {
  canViewRoadmap: boolean;
  canEditRoadmap: boolean;
  canViewFeedback: boolean;
  canEditFeedback: boolean;
  canViewFinances: boolean;
  canEditFinances: boolean;
  canViewVault: boolean;
  canEditVault: boolean;
  canManageTasks: boolean;
  canManageBlockers: boolean;
  canCreateSubgroups: boolean;
  canDirectMessage: boolean;
}

export type ActiveStatus = 'online' | 'offline' | 'away';

export interface Profile {
  id: string;
  full_name: string;
  email: string;
  role: string;
  department?: string;
  // Organizational hierarchy breadcrumbs (e.g. "Mirabel > Trackaa > PM2 > Dev team >")
  hierarchy_path?: string;
  avatar_url?: string;
  active_status?: ActiveStatus;
  // Counter icon over their head showing unread messages left for you
  unread_count?: number;
  permissions?: UserPermissions;
  temporary_password?: string;
  is_admin?: boolean;
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
  interaction_type: string;
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

// Comms / Slack-Like Unified Communication Types
export type AttachmentType = 'task' | 'finance' | 'blocker' | 'interaction' | 'asset' | 'common_ref';

export interface ChatAttachment {
  type: AttachmentType;
  id: string;
  title: string;
  subtitle?: string;
  metadata?: string;
}

export interface ChatMessage {
  id: string;
  startup_id: string;
  channel_id?: string; // e.g. 'common-room' or sub-group id
  dm_user_id?: string; // Target user ID for DMs
  sender_id: string;
  sender_name: string;
  sender_avatar?: string;
  sender_hierarchy?: string;
  text: string;
  timestamp: string;
  attachment?: ChatAttachment;
}

export interface ChatChannel {
  id: string;
  startup_id: string;
  name: string;
  description: string;
  is_common_room: boolean;
  is_subgroup: boolean;
  created_by: string;
  member_ids: string[];
}
