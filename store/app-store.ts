import { create } from "zustand";

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
  user: {
    name: string;
    avatar?: string;
  } | null;
  isOnboarded: boolean;

  // Actions
  setCurrentProject: (project: Project | null) => void;
  addProject: (project: Project) => void;
  toggleFavorite: (id: string) => void;
  addMessage: (message: Message) => void;
  clearMessages: () => void;
  setOnboarded: (value: boolean) => void;
}

export const useAppStore = create<AppState>((set) => ({
  projects: [
    {
      id: "1",
      name: "AI Image Generator",
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      status: "ready",
      version: 2,
      isFavorite: true,
    },
    {
      id: "2",
      name: "3D Abstract City",
      createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      status: "ready",
      version: 1,
      isFavorite: true,
    },
    {
      id: "3",
      name: "Portfolio Template",
      createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      updatedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      status: "ready",
      version: 3,
      isFavorite: false,
    },
    {
      id: "4",
      name: "Chess Game",
      createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      status: "building",
      version: 1,
      isFavorite: false,
    },
    {
      id: "5",
      name: "E-commerce Dashboard",
      createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
      updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      status: "ready",
      version: 5,
      isFavorite: false,
    },
  ],
  currentProject: null,
  messages: [],
  credits: 3.73,
  maxCredits: 5,
  user: {
    name: "mstrmnd",
  },
  isOnboarded: false,

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
