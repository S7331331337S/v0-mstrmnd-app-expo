import { create } from "zustand";
import { defaultAgents } from "../lib/ai/agents";
import { runPipeline } from "../lib/pipeline/runtime";

export interface Project {
  id: string;
  name: string;
  thumbnail?: string;
  createdAt: Date;
  updatedAt: Date;
  status: "ready" | "building" | "error";
  version: number;
  isFavorite: boolean;
}

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  isThinking?: boolean;
  version?: number;
}

interface AppState {
  projects: Project[];
  currentProject: Project | null;
  messages: Message[];
  credits: number;
  maxCredits: number;
  user: { name: string } | null;
  isOnboarded: boolean;

  runLogs: string[];
  runDemoPipeline: () => Promise<void>;

  setCurrentProject: (project: Project | null) => void;
  addProject: (project: Project) => void;
  toggleFavorite: (id: string) => void;
  addMessage: (message: Message) => void;
  clearMessages: () => void;
  setOnboarded: (value: boolean) => void;
}

export const useAppStore = create<AppState>((set, get) => ({
  projects: [],
  currentProject: null,
  messages: [],
  credits: 3.73,
  maxCredits: 5,
  user: { name: "mstrmnd" },
  isOnboarded: true,

  runLogs: [],

  runDemoPipeline: async () => {
    const result = await runPipeline(
      {
        id: "demo",
        nodes: [
          { id: "1", type: "agent", agentId: "director-agent" },
          { id: "2", type: "agent", agentId: "prompt-agent" },
        ],
      },
      defaultAgents
    );

    set({ runLogs: result.logs });
  },

  setCurrentProject: (project) => set({ currentProject: project }),
  addProject: (project) =>
    set((state) => ({ projects: [project, ...state.projects] })),
  toggleFavorite: (id) =>
    set((state) => ({
      projects: state.projects.map((p) =>
        p.id === id ? { ...p, isFavorite: !p.isFavorite } : p
      ),
    })),
  addMessage: (message) =>
    set((state) => ({ messages: [...state.messages, message] })),
  clearMessages: () => set({ messages: [] }),
  setOnboarded: (value) => set({ isOnboarded: value }),
}));
