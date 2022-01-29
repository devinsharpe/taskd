export interface TogglUser {
  api_token: string;
  default_wid: number;
  email: string;
  fullname: string;
  jquery_timeofday_format: string;
  jquery_date_format: string;
  timeofday_format: string;
  date_format: string;
  store_start_and_stop_time: boolean;
  beginning_of_week: number;
  language: string;
  image_url: string;
  sidebar_piechart: boolean;
  readonly at: Date;
  new_blog_post: {
    title: string;
    url: string;
  };
  send_product_emails: boolean;
  send_weekly_report: boolean;
  send_timer_notifications: boolean;
  openid_enabled: boolean;
  timezone: string;
}

export interface TimeEntry {
  id?: number;
  wid: number;
  pid: number;
  start?: string;
  stop?: string;
  readonly duration?: number;
  description: string;
  created_with: string;
  tags: string[];
  duronly: boolean;
  readonly at: Date;
}

export interface Project {
  id?: number;
  name: string;
  wid: number;
  cid?: number;
  active: boolean;
  is_private: boolean;
  template?: boolean;
  template_id?: number;
  readonly at?: Date;
  color: string;
  readonly created_at: Date;
}

export interface ProjectUser {
  id?: number;
  pid: number;
  wid: number;
  uid: number;
  manager: boolean;
  readonly at?: Date;
}

export interface Tag {
  id?: number;
  wid: number;
  name: string;
}

export interface Workspace {
  id?: number;
  name: string;
  premium: boolean;
  admin: boolean;
  only_admins_may_create_projects: boolean;
  rounded: -1 | 0 | 1;
  rounding_minutes: number;
  readonly at: Date;
}

export interface WorkspaceGroup {
  id?: number;
  wid: number;
  name: string;
  readonly at: Date;
}

export interface WorkspaceUser {
  id: number;
  uid: number;
  admin: boolean;
  active: boolean;
  invite_url: string;
}

export interface Client {
  id?: number;
  wid: number;
  name: string;
  notes?: string;
  readonly at: Date;
}

export interface TogglUserWithRelatedData extends TogglUser {
  time_entries?: TimeEntry[];
  projects?: Project[];
  tags?: Tag[];
  workspaces?: Workspace[];
  clients?: Client[];
}
