import { create } from "zustand";
import { defaultAgents } from "../lib/ai/agents";
import { runPipeline } from "../lib/pipeline/runtime";
import { runMultiAgentMode } from "../lib/pipeline/multi-agent";
import type { RunOutput } from "../lib/runtime/output";
import { persistRun } from "../lib/supabase/client";

interface AppState {
  runLogs: string[];
  runOutput: RunOutput | null;
  isRuntimeRunning: boolean;

  runDemoPipeline: () => Promise<void>;
  runMultiAgent: () => Promise<void>;
}

export const useAppStore = create<AppState>((set) => ({
  runLogs: [],
  runOutput: null,
  isRuntimeRunning: false,

  runDemoPipeline: async () => {
    set({ isRuntimeRunning: true, runLogs: [], runOutput: null });

    const appendLog = (log: string) => set((s) => ({ runLogs: [...s.runLogs, log] }));
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

    set({ runOutput: result.output, isRuntimeRunning: false });
  },

  runMultiAgent: async () => {
    set({ isRuntimeRunning: true, runLogs: [], runOutput: null });

    const appendLog = (log: string) => set((s) => ({ runLogs: [...s.runLogs, log] }));
    const updateOutput = (output: RunOutput) => set({ runOutput: output });

    const result = await runMultiAgentMode(defaultAgents, {
      onLog: appendLog,
      onOutput: updateOutput,
    });

    set({ runOutput: result.output, isRuntimeRunning: false });
  },
}));
