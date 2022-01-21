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
  at: Date;
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
  billable: boolean;
  start: Date;
  stop: Date;
  duration: number;
  description: string;
  tags: string[];
  at: Date;
}

export interface Project {
  id?: number;
  name: string;
  wid: number;
  cid?: number;
  active: boolean;
  is_private: boolean;
  template?: boolean;
  template_id?: boolean;
  at?: Date;
  color: string;
  created_at: Date;
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
  at: Date;
}

export interface Client {
  id?: number;
  wid: number;
  name: string;
  notes?: string;
  at?: Date;
}

export interface TogglUserWithRelatedData extends TogglUser {
  time_entries?: TimeEntry[];
  projects?: Project[];
  tags?: Tag[];
  workspaces?: Workspace[];
  clients?: Client[];
}
