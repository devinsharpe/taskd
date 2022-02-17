import {
  Client,
  ClientGroup,
  Project,
  Tag,
  TimeEntry,
  TogglUser,
  TogglUserWithRelatedData,
  Workspace,
} from "../types/toggl";
import { GetState, SetState, State } from "zustand";

export interface TogglState extends State {
  togglUser: TogglUser | null;
  currentWorkspace: number | -1;
  clientGroups: ClientGroup[];
  clients: Client[];
  projects: Project[];
  tags: Tag[];
  timeEntries: TimeEntry[];
  workspaces: Workspace[];
  buildClientGroups: () => void;
  setTogglUser: (user: TogglUser) => void;
  setCurrentWorkspace: (wid: number) => void;
  setClients: (clients: Client[]) => void;
  setProjects: (projects: Project[]) => void;
  setTags: (tags: Tag[]) => void;
  setTimeEntries: (entries: TimeEntry[]) => void;
  setWorkspaces: (workspaces: Workspace[]) => void;
  pushClient: (client: Client) => void;
  pushProject: (project: Project) => void;
  pushTag: (tag: Tag) => void;
  pushWorkspace: (workspace: Workspace) => void;
}

const TogglStore = (set: SetState<TogglState>, get: GetState<TogglState>) => ({
  togglUser: null,
  currentWorkspace: -1,
  clientGroups: [],
  clients: [],
  projects: [],
  tags: [],
  timeEntries: [],
  workspaces: [],
  buildClientGroups: () => {
    const clientGroupsDraft = get()
      .clients.map((client) => ({
        id: client.id!,
        name: client.name,
        projects: get().projects.filter((project) => project.cid === client.id),
      }))
      .sort((a, b) => (a.name > b.name ? 1 : -1));
    clientGroupsDraft.push({
      id: -1,
      name: "No Client",
      projects: get().projects.filter((project) => project.cid === undefined),
    });
    set((state) => ({ ...state, clientGroups: clientGroupsDraft }));
  },
  setTogglUser: (user: TogglUserWithRelatedData) => {
    set((state) => ({
      ...state,
      togglUser: user,
      currentWorkspace: user.default_wid,
      clients: user.clients ? user.clients : get().clients,
      projects: user.projects ? user.projects : get().projects,
      tags: user.tags ? user.tags : get().tags,
      workspaces: user.workspaces ? user.workspaces : get().workspaces,
    }));
    get().buildClientGroups();
  },
  setCurrentWorkspace: (wid: number) => {
    set((state) => ({ ...state, currentWorkspace: wid }));
  },
  setClients: (clientsArr: Client[]) => {
    set((state) => ({ ...state, clients: clientsArr }));
    get().buildClientGroups();
  },
  setProjects: (projectsArr: Project[]) => {
    set((state) => ({ ...state, projects: projectsArr }));
    get().buildClientGroups();
  },
  setTags: (tagsArr: Tag[]) => {
    set((state) => ({ ...state, tags: tagsArr }));
  },
  setTimeEntries: (entries: TimeEntry[]) => {
    set((state) => ({ ...state, timeEntries: entries }));
  },
  setWorkspaces: (workspacesArr: Workspace[]) => {
    set((state) => ({ ...state, workspaces: workspacesArr }));
  },
  pushClient: (client: Client) => {
    set((state) => ({ ...state, clients: [...state.clients, client] }));
    get().buildClientGroups();
  },
  pushProject: (project: Project) => {
    set((state) => ({ ...state, projects: [...state.projects, project] }));
    get().buildClientGroups();
  },
  pushTag: (tag: Tag) => {
    set((state) => ({ ...state, tags: [...state.tags, tag] }));
  },
  pushWorkspace: (workspace: Workspace) => {
    set((state) => ({
      ...state,
      workspaces: [...state.workspaces, workspace],
    }));
  },
});

export default TogglStore;
