import { Client, Project, Tag, TogglUser, Workspace } from "../types/toggl";
import { SetState, State } from "zustand";

export interface TogglState extends State {
  togglUser: TogglUser | null;
  clients: Client[];
  projects: Project[];
  tags: Tag[];
  workspaces: Workspace[];
  setTogglUser: (user: TogglUser) => void;
  setClients: (clients: Client[]) => void;
  setProjects: (projects: Project[]) => void;
  setTags: (tags: Tag[]) => void;
  setWorkspaces: (workspaces: Workspace[]) => void;
  pushClient: (client: Client) => void;
  pushProject: (project: Project) => void;
  pushTag: (tag: Tag) => void;
  pushWorkspace: (workspace: Workspace) => void;
}

const TogglStore = (set: SetState<TogglState>) => ({
  togglUser: null,
  clients: [],
  projects: [],
  tags: [],
  workspaces: [],
  setTogglUser: (user: TogglUser) => {
    set((state) => ({ ...state, togglUser: user }));
  },
  setClients: (clientsArr: Client[]) => {
    set((state) => ({ ...state, clients: clientsArr }));
  },
  setProjects: (projectsArr: Project[]) => {
    set((state) => ({ ...state, projects: projectsArr }));
  },
  setTags: (tagsArr: Tag[]) => {
    set((state) => ({ ...state, tags: tagsArr }));
  },
  setWorkspaces: (workspacesArr: Workspace[]) => {
    set((state) => ({ ...state, workspaces: workspacesArr }));
  },
  pushClient: (client: Client) => {
    set((state) => ({ ...state, clients: [...state.clients, client] }));
  },
  pushProject: (project: Project) => {
    set((state) => ({ ...state, projects: [...state.projects, project] }));
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
