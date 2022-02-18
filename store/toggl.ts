import {
  Client,
  Project,
  Tag,
  TogglUser,
  TogglUserWithRelatedData,
  Workspace,
} from "../types/toggl";
import { GetState, SetState, State } from "zustand";

export interface TogglState extends State {
  togglUser: TogglUser | null;
  currentWorkspace: number | -1;
  clients: Client[];
  projects: Project[];
  tags: Tag[];
  workspaces: Workspace[];
  setTogglUser: (user: TogglUser) => void;
  setCurrentWorkspace: (wid: number) => void;
  setClients: (clients: Client[]) => void;
  setProjects: (projects: Project[]) => void;
  setTags: (tags: Tag[]) => void;
  setWorkspaces: (workspaces: Workspace[]) => void;
  pushClient: (client: Client) => void;
  pushProject: (project: Project) => void;
  pushTag: (tag: Tag) => void;
  pushWorkspace: (workspace: Workspace) => void;
}

const TogglStore = (set: SetState<TogglState>, get: GetState<TogglState>) => ({
  togglUser: null,
  currentWorkspace: -1,
  clients: [],
  projects: [],
  tags: [],
  workspaces: [],
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
  },
  setCurrentWorkspace: (wid: number) => {
    set((state) => ({ ...state, currentWorkspace: wid }));
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
