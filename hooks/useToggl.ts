import {
  Client,
  Project,
  ProjectUser,
  Tag,
  TimeEntry,
  TogglUser,
  TogglUserWithRelatedData,
  Workspace,
  WorkspaceGroup,
  WorkspaceUser,
} from "../types/toggl";
import { add, formatISO, sub } from "date-fns";

const TOGGL_URL = "https://api.track.toggl.com/api/v8";

export declare class TogglError extends Error {
  readonly messages: string[];
  constructor(message: string[]);
}

const getToken = () => {
  if (typeof window !== "undefined") {
    return sessionStorage.getItem("taskd-toggl-token") || undefined;
  }
  return undefined;
};

const setToken = (token: string) => {
  if (typeof window !== "undefined") {
    window.sessionStorage.setItem("taskd-toggl-token", token);
  }
};

const authenticate = async (
  token: string,
  withRelatedData: boolean = false
): Promise<{ since: Date; data: TogglUserWithRelatedData } | undefined> => {
  if (typeof window !== "undefined") {
    setToken(token);
    const res = await fetch(
      `${TOGGL_URL}/me?with_related_data=${withRelatedData.toString()}`,
      {
        headers: {
          Authorization: "Basic " + window.btoa(token + ":api_token"),
          "Content-Type": "application/json",
        },
      }
    );
    if (res.ok) {
      const data = (await res.json()) as {
        since: Date;
        data: TogglUserWithRelatedData;
      };
      return data;
    }
  }
  return undefined;
};

const getHeaders = () => {
  return {
    Authorization: "Basic " + window.btoa(getToken() + ":api_token"),
    "Content-Type": "application/json",
  };
};

const togglFetch: <ReturnType, BodyType = undefined>(
  url: string,
  method?: "GET" | "POST" | "PUT" | "DELETE" | "LIST",
  body?: BodyType
) => Promise<ReturnType | undefined> = async (url, method = "GET", body) => {
  const res = await fetch(`${TOGGL_URL}${url}`, {
    method: method === "LIST" ? "GET" : method,
    headers: getHeaders(),
    body: body ? JSON.stringify(body) : undefined,
  });
  if (res.ok) {
    const data = await res.json();
    if (method === "LIST") {
      return data;
    } else if (method === "DELETE") {
      return {};
    } else {
      return data.data;
    }
  } else if (res.status === 404) {
    throw new TogglError((await res.json()) as string[]);
  } else {
    return undefined;
  }
};

const client = {
  create: async (client: Client) => {
    return togglFetch<Client, { client: Client }>(`/clients`, "POST", {
      client,
    });
  },
  delete: async (id: number) => {
    return togglFetch<undefined, Client>(`/clients/${id}`, "DELETE");
  },
  list: async () => {
    return togglFetch<Client[]>(`/clients`, "LIST");
  },
  get: async (id: number) => {
    return togglFetch<Client>(`/clients/${id}`);
  },
  update: async (client: Client & { id: number }) => {
    return togglFetch<Client, { client: Client }>(
      `/clients/${client.id}`,
      "PUT",
      { client }
    );
  },
  projects: async (clientId: number, active: true | false | "both" = true) => {
    return togglFetch<Project[]>(
      `/clients/${clientId}/projects?active=${active}`,
      "LIST"
    );
  },
};

const project = {
  create: async (project: Project) => {
    return togglFetch<Project, { project: Project }>(`/projects`, "POST", {
      project,
    });
  },
  delete: async (id: number) => {
    return togglFetch<undefined, {}>(`/projects/${id}`, "DELETE");
  },
  listUsers: async (id: number) => {
    return togglFetch<ProjectUser[]>(`/projects/${id}/project_users`, "LIST");
  },
  get: async (id: number) => {
    return togglFetch<Project>(`/projects/${id}`);
  },
  update: async (project: Project & { id: number }) => {
    return togglFetch<Project, { project: Project }>(
      `/projects/${project.id}`,
      "PUT",
      { project }
    );
  },
};

const projectUser = {
  create: async (projectUser: ProjectUser) => {
    return togglFetch<ProjectUser, { project_user: ProjectUser }>(
      `/project_users`,
      "POST",
      {
        project_user: projectUser,
      }
    );
  },
  delete: async (id: number) => {
    return togglFetch<undefined, {}>(`/project_users/${id}`, "DELETE");
  },
  update: async (projectUser: ProjectUser & { id: number }) => {
    return togglFetch<ProjectUser, { project_user: ProjectUser }>(
      `/project_users/${projectUser.id}`,
      "PUT",
      { project_user: projectUser }
    );
  },
};

const tag = {
  create: async (tag: Tag) => {
    return togglFetch<Tag, { tag: Tag }>(`/tags/`);
  },
  delete: async (id: number) => {
    return togglFetch<{}>(`/tags/${id}`, "DELETE");
  },
  update: async (tag: Tag & { id: number }) => {
    return togglFetch<Tag, { tag: Tag }>(`/tags/${tag.id}`, "PUT", { tag });
  },
};

const timeEntry = {
  current: async () => {
    return togglFetch<TimeEntry>(`/time_entries/current`);
  },
  create: async (entry: TimeEntry) => {
    return togglFetch<TimeEntry, { time_entry: TimeEntry }>(
      `/time_entries`,
      "POST",
      {
        time_entry: {
          ...entry,
          created_with: process.env.NEXT_PUBLIC_APP_NAME!,
        },
      }
    );
  },
  get: async (id: number) => {
    return togglFetch<TimeEntry>(`/time_entries/${id}`);
  },
  list: async (startDate?: Date, endDate?: Date) => {
    const formattedStartDate = formatISO(
      startDate ? startDate : sub(new Date(), { days: 14 })
    );
    const formattedEndDate = formatISO(
      endDate ? endDate : add(Date.parse(formattedStartDate), { days: 14 })
    );
    return togglFetch<TimeEntry[]>(
      `/time_entries?start_date=${formattedStartDate}&end_date=${formattedEndDate}`
    );
  },
  update: async (entry: TimeEntry & { id: number }) => {
    return togglFetch<TimeEntry, { time_entry: TimeEntry }>(
      `/time_entries/${entry.id}`,
      "PUT",
      {
        time_entry: {
          ...entry,
          created_with: process.env.NEXT_PUBLIC_APP_NAME!,
        },
      }
    );
  },
  start: async (entry: TimeEntry) => {
    return togglFetch<TimeEntry, { time_entry: TimeEntry }>(
      `/time_entries/start`,
      "POST",
      {
        time_entry: {
          ...entry,
          created_with: process.env.NEXT_PUBLIC_APP_NAME!,
        },
      }
    );
  },
  stop: async (id: number) => {
    return togglFetch<TimeEntry, {}>(`/time_entries/${id}/stop`, "PUT", {});
  },
};

const workspace = {
  get: async (wid: number) => {
    return togglFetch<Workspace>(`/workspaces/${wid}`);
  },
  list: async () => {
    return togglFetch<Workspace[]>(`/workspaces`, "LIST");
  },
  listClients: async (wid: number) => {
    return togglFetch<Client[]>(`/workspaces/${wid}/clients`, "LIST");
  },
  listGroups: async (wid: number) => {
    return togglFetch<WorkspaceGroup[]>(`/workspaces/${wid}/groups`, "LIST");
  },
  listProjects: async (wid: number) => {
    return togglFetch<Project[]>(`/workspaces/${wid}/projects`, "LIST");
  },
  listProjectUsers: async (wid: number) => {
    return togglFetch<ProjectUser[]>(
      `/workspaces/${wid}/project_users`,
      "LIST"
    );
  },
  listTags: async (wid: number) => {
    return togglFetch<Tag[]>(`/workspaces/${wid}/tags`, "LIST");
  },
  listUsers: async (wid: number) => {
    return togglFetch<TogglUser[]>(`/workspaces/${wid}/users`, "LIST");
  },
  listWorkspaceUsers: async (wid: number) => {
    return togglFetch<WorkspaceUser[]>(`/workspaces/${wid}/workspace_users`);
  },
  update: async (workspace: Workspace & { id: number }) => {
    return togglFetch<Workspace, { workspace: Workspace }>(
      `/workspaces/${workspace.id}`,
      "PUT",
      { workspace }
    );
  },
};

const workspace_user = {
  delete: async (id: number) => {
    return togglFetch<{}>(`/workspace_users/${id}`, "DELETE");
  },
  invite: async (wid: number, emails: string[]) => {
    return togglFetch<WorkspaceUser[], { emails: string[] }>(
      `/workspaces/${wid}/invite`,
      "POST",
      { emails }
    );
  },
  update: async (id: number, isAdmin: boolean) => {
    return togglFetch<WorkspaceUser, { workspace_user: { admin: boolean } }>(
      `/workspace_users/${id}`,
      "PUT",
      { workspace_user: { admin: isAdmin } }
    );
  },
};

const useToggl = () => {
  return {
    authenticate,
    getToken,
    client,
    project,
    projectUser,
    tag,
    timeEntry,
    workspace,
    workspace_user,
  };
};

export default useToggl;
