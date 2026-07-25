import { create } from "zustand";
import { defaultAgents } from "../lib/ai/agents";
import { runPipeline } from "../lib/pipeline/runtime";
import { runMultiAgentMode } from "../lib/pipeline/multi-agent";
import type { RunOutput } from "../lib/runtime/output";
import {
  createProject as createProjectRecord,
  deleteProject as deleteProjectRecord,
  getSession,
  listProjects,
  onAuthStateChange,
  persistRun,
  signInWithPassword,
  signOut,
  signUpWithPassword,
  updateProject as updateProjectRecord,
  userFromSession,
  type AuthUser,
  type ProjectRecord,
} from "../lib/supabase/client";

export type ProjectStatus = "ready" | "building" | "error" | "pending";

export type Project = {
  id: string;
  name: string;
  description?: string;
  status: ProjectStatus;
  version: string;
  isFavorite: boolean;
  createdAt: Date;
  updatedAt: Date;
  agentsConfig?: Record<string, unknown>;
};

interface AppState {
  onboarded: boolean;
  user: AuthUser | null;
  currentUser: AuthUser | null;
  isAuthenticated: boolean;
  isAuthReady: boolean;

  credits: number;
  maxCredits: number;

  projects: Project[];
  currentProject: Project | null;

  runLogs: string[];
  runOutput: RunOutput | null;
  isRuntimeRunning: boolean;

  initializeSession: () => Promise<void>;
  watchSession: () => () => void;
  signUp: (payload: { email: string; password: string; name?: string }) => Promise<{ ok: boolean; error?: string }>;
  signIn: (payload: { email: string; password: string }) => Promise<{ ok: boolean; error?: string }>;
  signOutUser: () => Promise<void>;

  refreshProjects: () => Promise<void>;
  createProject: (payload: { name: string; description?: string }) => Promise<{ ok: boolean; error?: string }>;
  updateProject: (payload: { projectId: string; name?: string; description?: string }) => Promise<{ ok: boolean; error?: string }>;
  deleteProject: (projectId: string) => Promise<{ ok: boolean; error?: string }>;
  setCurrentProject: (projectId: string) => void;
  toggleFavorite: (projectId: string) => void;

  setOnboarded: (value: boolean) => void;

  runDemoPipeline: () => Promise<void>;
  runMultiAgent: () => Promise<void>;
}

const demoProjects: Project[] = [
  {
    id: "demo-project-1",
    name: "MSTRMND Mobile Shell",
    description: "Runtime + UI shell",
    status: "ready",
    version: "1.0.0",
    isFavorite: true,
    createdAt: new Date("2026-06-10T10:00:00.000Z"),
    updatedAt: new Date("2026-07-25T08:20:00.000Z"),
  },
  {
    id: "demo-project-2",
    name: "Creator Workspace",
    description: "Agentic workspace concept",
    status: "building",
    version: "0.4.2",
    isFavorite: false,
    createdAt: new Date("2026-06-21T09:30:00.000Z"),
    updatedAt: new Date("2026-07-24T14:55:00.000Z"),
  },
  {
    id: "demo-project-3",
    name: "Pipeline Experiments",
    description: "Graph execution tests",
    status: "pending",
    version: "0.2.0",
    isFavorite: false,
    createdAt: new Date("2026-07-01T12:00:00.000Z"),
    updatedAt: new Date("2026-07-22T16:10:00.000Z"),
  },
];

function toProject(record: ProjectRecord): Project {
  return {
    id: record.id,
    name: record.name,
    description: record.description ?? undefined,
    status: "ready",
    version: "1.0.0",
    isFavorite: false,
    createdAt: new Date(record.created_at),
    updatedAt: new Date(record.updated_at),
    agentsConfig: record.agents_config ?? undefined,
  };
}

async function hydrateProjectsForUser(user: AuthUser | null) {
  if (!user) {
    return demoProjects;
  }

  const result = await listProjects(user.id);
  if (!result.ok || !result.data) {
    return demoProjects;
  }

  if (result.data.length === 0) {
    return [];
  }

  return result.data.map(toProject);
}

async function ensureProjectsForUser(user: AuthUser | null) {
  const projects = await hydrateProjectsForUser(user);
  if (!user || projects.length > 0) {
    return projects;
  }

  const created = await createProjectRecord({
    userId: user.id,
    name: "My First Project",
    description: "Starter workspace",
  });

  if (created.ok && created.data) {
    return [toProject(created.data)];
  }

  return projects;
}

export const useAppStore = create<AppState>((set, get) => ({
  onboarded: false,
  user: null,
  currentUser: null,
  isAuthenticated: false,
  isAuthReady: false,

  credits: 42,
  maxCredits: 100,

  projects: demoProjects,
  currentProject: demoProjects[0],

  runLogs: [],
  runOutput: null,
  isRuntimeRunning: false,

  initializeSession: async () => {
    const sessionResult = await getSession();
    const user = sessionResult.ok ? userFromSession(sessionResult.data ?? null) : null;
    const projects = await ensureProjectsForUser(user);

    set({
      user,
      currentUser: user,
      isAuthenticated: Boolean(user),
      isAuthReady: true,
      projects,
      currentProject: projects[0] ?? null,
    });
  },

  watchSession: () => {
    return onAuthStateChange(async (session) => {
      const user = userFromSession(session);
      const projects = await ensureProjectsForUser(user);
      set({
        user,
        currentUser: user,
        isAuthenticated: Boolean(user),
        projects,
        currentProject: projects[0] ?? null,
      });
    });
  },

  signUp: async ({ email, password, name }) => {
    const result = await signUpWithPassword({ email, password, name });
    if (!result.ok) {
      return { ok: false, error: result.error || result.reason || "Unable to sign up." };
    }

    if (result.data) {
      const projects = await ensureProjectsForUser(result.data);
      set({
        user: result.data,
        currentUser: result.data,
        isAuthenticated: true,
        projects,
        currentProject: projects[0] ?? null,
      });
    }

    return { ok: true };
  },

  signIn: async ({ email, password }) => {
    const result = await signInWithPassword({ email, password });
    if (!result.ok || !result.data) {
      return { ok: false, error: result.error || result.reason || "Unable to sign in." };
    }

    const projects = await ensureProjectsForUser(result.data);
    set({
      user: result.data,
      currentUser: result.data,
      isAuthenticated: true,
      projects,
      currentProject: projects[0] ?? null,
    });

    return { ok: true };
  },

  signOutUser: async () => {
    await signOut();
    set({
      user: null,
      currentUser: null,
      isAuthenticated: false,
      projects: demoProjects,
      currentProject: demoProjects[0],
    });
  },

  refreshProjects: async () => {
    const user = get().currentUser;
    const projects = await hydrateProjectsForUser(user);

    set((state) => {
      const retainedCurrentProject = state.currentProject
        ? projects.find((project) => project.id === state.currentProject?.id) ?? projects[0] ?? null
        : projects[0] ?? null;

      return {
        projects,
        currentProject: retainedCurrentProject,
      };
    });
  },

  createProject: async ({ name, description }) => {
    const trimmedName = name.trim();
    if (!trimmedName) {
      return { ok: false, error: "Project name is required." };
    }

    const state = get();
    if (!state.currentUser) {
      return { ok: false, error: "Sign in to create projects." };
    }

    const result = await createProjectRecord({
      userId: state.currentUser.id,
      name: trimmedName,
      description,
    });

    if (result.skipped) {
      const localProject: Project = {
        id: `local-${Date.now()}`,
        name: trimmedName,
        description,
        status: "pending",
        version: "0.1.0",
        isFavorite: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      set((currentState) => ({
        projects: [localProject, ...currentState.projects],
        currentProject: localProject,
      }));

      return { ok: true };
    }

    if (!result.ok || !result.data) {
      return { ok: false, error: result.error || result.reason || "Failed to create project." };
    }

    const project = toProject(result.data);
    set((currentState) => ({
      projects: [project, ...currentState.projects.filter((item) => !item.id.startsWith("demo-project-"))],
      currentProject: project,
    }));

    return { ok: true };
  },

  updateProject: async ({ projectId, name, description }) => {
    const result = await updateProjectRecord({
      projectId,
      name,
      description: typeof description === "undefined" ? undefined : description,
    });

    if (result.skipped) {
      set((state) => ({
        projects: state.projects.map((project) =>
          project.id === projectId
            ? {
                ...project,
                name: typeof name === "string" ? name : project.name,
                description: typeof description === "undefined" ? project.description : description,
                updatedAt: new Date(),
              }
            : project
        ),
        currentProject:
          state.currentProject?.id === projectId
            ? {
                ...state.currentProject,
                name: typeof name === "string" ? name : state.currentProject.name,
                description:
                  typeof description === "undefined"
                    ? state.currentProject.description
                    : description,
                updatedAt: new Date(),
              }
            : state.currentProject,
      }));
      return { ok: true };
    }

    if (!result.ok || !result.data) {
      return { ok: false, error: result.error || result.reason || "Failed to update project." };
    }

    const updatedProject = toProject(result.data);
    set((state) => ({
      projects: state.projects.map((project) => (project.id === projectId ? updatedProject : project)),
      currentProject: state.currentProject?.id === projectId ? updatedProject : state.currentProject,
    }));

    return { ok: true };
  },

  deleteProject: async (projectId) => {
    const result = await deleteProjectRecord(projectId);
    if (!result.ok && !result.skipped) {
      return { ok: false, error: result.error || result.reason || "Failed to delete project." };
    }

    set((state) => {
      const nextProjects = state.projects.filter((project) => project.id !== projectId);
      return {
        projects: nextProjects,
        currentProject:
          state.currentProject?.id === projectId ? nextProjects[0] ?? null : state.currentProject,
      };
    });

    return { ok: true };
  },

  setCurrentProject: (projectId) => {
    set((state) => ({
      currentProject: state.projects.find((project) => project.id === projectId) ?? state.currentProject,
    }));
  },

  toggleFavorite: (projectId) => {
    set((state) => ({
      projects: state.projects.map((project) =>
        project.id === projectId ? { ...project, isFavorite: !project.isFavorite } : project
      ),
      currentProject:
        state.currentProject?.id === projectId
          ? {
              ...state.currentProject,
              isFavorite: !state.currentProject.isFavorite,
            }
          : state.currentProject,
    }));
  },

  setOnboarded: (value) => set({ onboarded: value }),

  runDemoPipeline: async () => {
    set({ isRuntimeRunning: true, runLogs: [], runOutput: null });

    const appendLog = (log: string) => set((state) => ({ runLogs: [...state.runLogs, log] }));
    const updateOutput = (output: RunOutput) => set({ runOutput: output });

    const result = await runPipeline(
      {
        id: "demo",
        goal: "Generate a high-end creative output using multi-agent reasoning.",
        nodes: [
          { id: "input", type: "input", config: { value: "User initiated creative task." } },
          { id: "1", type: "agent", agentId: "director-agent" },
          { id: "2", type: "agent", agentId: "prompt-agent" },
          { id: "3", type: "agent", agentId: "dev-agent" },
        ],
      },
      defaultAgents,
      { onLog: appendLog, onOutput: updateOutput }
    );

    const projectId = get().currentProject?.id;
    if (projectId) {
      const persistResult = await persistRun({
        projectId,
        pipelineId: "demo",
        status: result.status,
        logs: result.logs,
        output: result.output,
        usage: {
          provider: "google",
          model: "gemini",
          stepCount: result.output.steps.length,
        },
      });

      if (!persistResult.ok && !persistResult.skipped) {
        appendLog(`Run persistence failed: ${persistResult.error || "Unknown error"}`);
      }

      if (persistResult.skipped) {
        appendLog(persistResult.reason || "Run persistence skipped.");
      }
    }

    set({ runOutput: result.output, isRuntimeRunning: false });
  },

  runMultiAgent: async () => {
    set({ isRuntimeRunning: true, runLogs: [], runOutput: null });

    const appendLog = (log: string) => set((state) => ({ runLogs: [...state.runLogs, log] }));
    const updateOutput = (output: RunOutput) => set({ runOutput: output });

    const result = await runMultiAgentMode(defaultAgents, {
      onLog: appendLog,
      onOutput: updateOutput,
    });

    set({ runOutput: result.output, isRuntimeRunning: false });
  },
}));
