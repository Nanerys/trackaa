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
  canManageStartupSettings?: boolean;
}

export type ActiveStatus = 'online' | 'offline' | 'away';

export interface Profile {
  id: string;
  full_name: string;
  email: string;
  role: string;
  department?: string;
  hierarchy_path?: string;
  avatar_url?: string;
  active_status?: ActiveStatus;
  unread_count?: number;
  permissions?: UserPermissions;
  temporary_password?: string;
  is_admin?: boolean;
}

// Pinned Status Report (Post-it note style status update)
export interface StatusReport {
  id: string;
  startup_id: string;
  content: string; // e.g. "Meeting tomorrow 10am with investor lead", "Pushed v2.1 commit"
  author_id: string;
  author_name: string;
  author_avatar?: string;
  created_at: string;
  color?: 'amber' | 'emerald' | 'blue' | 'rose' | 'purple';
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
  settings_access_user_ids?: string[]; // Team members given access to edit startup settings
  created_at: string;
  updated_at?: string;
}

export interface TaskAttachment {
  id: string;
  type: 'link' | 'file';
  title: string;
  url: string;
}

export interface Task {
  id: string;
  project_id: string;
  title: string;
  due_date: string;
  completed: boolean;
  priority: PriorityLevel;
  assigned_to?: string; // Profile ID
  tagged_member_ids?: string[]; // Tagged collaborators
  attachments?: TaskAttachment[]; // Links and documents attached directly
  milestone_id?: string; // Attached milestone
  milestone_condition_id?: string; // Specific milestone condition fulfilled
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

export interface MilestoneCondition {
  id: string;
  text: string;
  completed: boolean;
}

export interface RoadmapMilestone {
  id: string;
  project_id: string;
  title: string;
  description: string;
  start_date: string;
  end_date: string;
  completed_date?: string; // Date milestone was achieved to show if beaten early or overdue
  status: 'planned' | 'in_progress' | 'achieved' | 'delayed';
  conditions?: MilestoneCondition[]; // Checklist of conditions needed to meet this milestone
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
  attachment_urls: string[];
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
  startup_id: string; // Scoped strictly to that startup!
  channel_id?: string; // e.g. 'common-room' or sub-group id
  dm_user_id?: string;
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
  startup_id: string; // Scoped strictly to that startup!
  name: string;
  description: string;
  is_common_room: boolean;
  is_subgroup: boolean;
  created_by: string;
  member_ids: string[];
}
