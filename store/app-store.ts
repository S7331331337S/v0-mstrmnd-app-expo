import { create } from "zustand";
import type { Session } from "@supabase/supabase-js";
import { Agent, defaultAgents } from "../lib/ai/agents";
import { runPipeline, Pipeline } from "../lib/pipeline/runtime";
import { runMultiAgentMode } from "../lib/pipeline/multi-agent";
import type { RunOutput } from "../lib/runtime/output";
import { persistRun, persistProject, persistPipeline } from "../lib/supabase/client";
import { signInWithEmail, signUpWithEmail, signOut, onAuthStateChange, getSession } from "../lib/supabase/auth";
import { UsageEvent, createUsageEvent, costToCredits } from "../lib/usage/meter";

export type Project = {
  id: string;
  name: string;
  slug?: string;
  status: "ready" | "building" | "error" | "draft";
  isFavorite: boolean;
  version: number;
  createdAt: Date;
  updatedAt: Date;
};

export type AppUser = {
  id: string;
  name?: string;
  email?: string;
};

interface AppState {
  // Auth
  session: Session | null;
  user: AppUser | null;
  isAuthLoading: boolean;
  initAuth: () => () => void;
  signIn: (email: string, password: string) => Promise<{ error?: string }>;
  signUp: (email: string, password: string) => Promise<{ error?: string }>;
  signOut: () => Promise<void>;

  // Projects
  projects: Project[];
  addProject: (name: string) => Promise<Project>;
  toggleFavorite: (id: string) => void;
  updateProject: (id: string, patch: Partial<Project>) => void;
  removeProject: (id: string) => void;

  // Agents
  agents: Agent[];
  addAgent: (agent: Agent) => void;
  updateAgent: (id: string, patch: Partial<Agent>) => void;
  removeAgent: (id: string) => void;

  // Usage / credits
  credits: number;
  maxCredits: number;
  usageHistory: UsageEvent[];
  deductCredits: (amount: number) => void;
  addUsageEvent: (event: UsageEvent) => void;

  // Runtime
  runLogs: string[];
  runOutput: RunOutput | null;
  isRuntimeRunning: boolean;
  runDemoPipeline: (projectId?: string) => Promise<void>;
  runMultiAgent: (projectId?: string) => Promise<void>;
}

// Seed projects for initial state
const SEED_PROJECTS: Project[] = [
  {
    id: "1",
    name: "Brand Campaign",
    slug: "brand-campaign",
    status: "ready",
    isFavorite: true,
    version: 3,
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
  },
  {
    id: "2",
    name: "Product Launch",
    slug: "product-launch",
    status: "building",
    isFavorite: false,
    version: 1,
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 30 * 60 * 1000),
  },
  {
    id: "3",
    name: "Social Media Kit",
    slug: "social-media-kit",
    status: "draft",
    isFavorite: false,
    version: 1,
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 5 * 60 * 1000),
  },
];

export const useAppStore = create<AppState>((set, get) => ({
  // Auth
  session: null,
  user: null,
  isAuthLoading: true,

  initAuth: () => {
    // Restore existing session asynchronously
    getSession().then((session) => {
      if (session) {
        set({
          session,
          user: {
            id: session.user.id,
            email: session.user.email,
            name: session.user.user_metadata?.name,
          },
          isAuthLoading: false,
        });
      } else {
        set({ isAuthLoading: false });
      }
    });

    // Subscribe to auth changes
    return onAuthStateChange((session) => {
      set({
        session,
        user: session
          ? {
              id: session.user.id,
              email: session.user.email,
              name: session.user.user_metadata?.name,
            }
          : null,
      });
    });
  },

  signIn: async (email, password) => {
    const { error } = await signInWithEmail(email, password);
    if (error) return { error: error.message };
    return {};
  },

  signUp: async (email, password) => {
    const { error } = await signUpWithEmail(email, password);
    if (error) return { error: error.message };
    return {};
  },

  signOut: async () => {
    await signOut();
    set({ session: null, user: null });
  },

  // Projects
  projects: SEED_PROJECTS,

  addProject: async (name) => {
    const project: Project = {
      id: Date.now().toString(),
      name,
      slug: name.toLowerCase().replace(/\s+/g, "-"),
      status: "draft",
      isFavorite: false,
      version: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    set((s) => ({ projects: [project, ...s.projects] }));
    // Persist to Supabase if configured
    await persistProject({ name: project.name, slug: project.slug });
    return project;
  },

  toggleFavorite: (id) =>
    set((s) => ({
      projects: s.projects.map((p) =>
        p.id === id ? { ...p, isFavorite: !p.isFavorite, updatedAt: new Date() } : p
      ),
    })),

  updateProject: (id, patch) =>
    set((s) => ({
      projects: s.projects.map((p) =>
        p.id === id ? { ...p, ...patch, updatedAt: new Date() } : p
      ),
    })),

  removeProject: (id) =>
    set((s) => ({ projects: s.projects.filter((p) => p.id !== id) })),

  // Agents
  agents: defaultAgents,

  addAgent: (agent) =>
    set((s) => ({ agents: [...s.agents, agent] })),

  updateAgent: (id, patch) =>
    set((s) => ({
      agents: s.agents.map((a) => (a.id === id ? { ...a, ...patch } : a)),
    })),

  removeAgent: (id) =>
    set((s) => ({ agents: s.agents.filter((a) => a.id !== id) })),

  // Usage / credits
  credits: 50.0,
  maxCredits: 100,
  usageHistory: [],

  deductCredits: (amount) =>
    set((s) => ({ credits: Math.max(0, s.credits - amount) })),

  addUsageEvent: (event) => {
    const cost = costToCredits(event.estimatedCost);
    set((s) => ({
      usageHistory: [...s.usageHistory, event],
      credits: Math.max(0, s.credits - cost),
    }));
  },

  // Runtime
  runLogs: [],
  runOutput: null,
  isRuntimeRunning: false,

  runDemoPipeline: async (projectId) => {
    set({ isRuntimeRunning: true, runLogs: [], runOutput: null });

    const appendLog = (log: string) => set((s) => ({ runLogs: [...s.runLogs, log] }));
    const updateOutput = (output: RunOutput) => set({ runOutput: output });
    const { agents } = get();

    const pipeline: Pipeline = {
      id: "demo",
      goal: "Generate a high-end creative output using multi-agent reasoning.",
      nodes: [
        { id: "input", type: "input", config: { value: "User initiated creative task." } },
        { id: "1", type: "agent", agentId: "director-agent" },
        { id: "2", type: "agent", agentId: "prompt-agent" },
        { id: "3", type: "agent", agentId: "dev-agent" },
      ],
    };

    const result = await runPipeline(pipeline, agents, { onLog: appendLog, onOutput: updateOutput });

    // Persist run
    await persistRun({
      pipelineId: result.pipelineId,
      projectId,
      status: result.status,
      logs: result.logs,
      output: result.output,
      usage: result.usage,
    });

    // Track usage
    if (result.usage?.provider) {
      const event = createUsageEvent(
        result.usage.provider,
        result.usage.model ?? "unknown",
        result.usage.inputTokens ?? 0,
        result.usage.outputTokens ?? 0
      );
      get().addUsageEvent(event);
    }

    set({ runOutput: result.output, isRuntimeRunning: false });
  },

  runMultiAgent: async (projectId) => {
    set({ isRuntimeRunning: true, runLogs: [], runOutput: null });

    const appendLog = (log: string) => set((s) => ({ runLogs: [...s.runLogs, log] }));
    const updateOutput = (output: RunOutput) => set({ runOutput: output });
    const { agents } = get();

    const result = await runMultiAgentMode(agents, {
      onLog: appendLog,
      onOutput: updateOutput,
    });

    // Persist run
    await persistRun({
      pipelineId: result.pipelineId,
      projectId,
      status: result.status,
      logs: result.logs,
      output: result.output,
      usage: result.usage,
    });

    // Track usage
    if (result.usage?.provider) {
      const event = createUsageEvent(
        result.usage.provider,
        result.usage.model ?? "unknown",
        result.usage.inputTokens ?? 0,
        result.usage.outputTokens ?? 0
      );
      get().addUsageEvent(event);
    }

    set({ runOutput: result.output, isRuntimeRunning: false });
  },
}));
