import { Client, Project, Tag, TogglUserWithRelatedData } from "../types/toggl";

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
    return togglFetch<Client, Client>(`/clients/${client.id}`, "PUT", client);
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
    return togglFetch<undefined, Project>(`/projects/${id}`, "DELETE");
  },
  get: async (id: number) => {
    return togglFetch<Project>(`/projects/${id}`);
  },
  update: async (project: Project & { id: number }) => {
    return togglFetch<Project, Project>(
      `/projects/${project.id}`,
      "PUT",
      project
    );
  },
};

const tag = {
  create: async (tag: Tag) => {
    return togglFetch<Tag, { tag: Tag }>(`/tags/`);
  },
};

const useToggl = () => {
  return {
    authenticate,
    getToken,
    client,
    project,
    tag,
  };
};

export default useToggl;
