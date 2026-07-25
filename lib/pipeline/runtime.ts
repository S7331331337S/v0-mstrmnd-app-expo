import { Agent } from "../ai/agents";
import { generateWithGemini } from "../ai/gemini";
import {
  addMemoryContext,
  addMemoryOutput,
  createRuntimeMemory,
  memoryToPrompt,
} from "../runtime/memory";
import { addStep, createOutput, RunOutput } from "../runtime/output";

export type PipelineNode = {
  id: string;
  type: "agent" | "transform" | "input" | "output";
  agentId?: string;
  config?: any;
};

export type Pipeline = {
  id: string;
  goal?: string;
  nodes: PipelineNode[];
};

export type RunResult = {
  id: string;
  projectId?: string;
  pipelineId: string;
  status: "queued" | "running" | "waiting_for_approval" | "completed" | "failed";
  logs: string[];
  output: RunOutput;
  usage: {
    provider?: string;
    model?: string;
    inputTokens?: number;
    outputTokens?: number;
    estimatedCost?: number;
  };
};

export type PipelineRuntimeEvents = {
  onLog?: (log: string) => void;
  onOutput?: (output: RunOutput) => void;
};

export async function runPipeline(
  pipeline: Pipeline,
  agents: Agent[],
  events: PipelineRuntimeEvents = {}
): Promise<RunResult> {
  const logs: string[] = [];
  let memory = createRuntimeMemory(
    pipeline.goal || "Build a premium MSTRMND creative operating system output."
  );
  let output = createOutput();

  const log = (value: string) => {
    logs.push(value);
    events.onLog?.(value);
  };

  const emitOutput = () => {
    events.onOutput?.(output);
  };

  log("Starting pipeline...");
  log(`Goal: ${memory.goal}`);

  for (const node of pipeline.nodes) {
    if (node.type === "input") {
      const inputValue = node.config?.value || "Input received.";
      memory = addMemoryContext(memory, inputValue);
      log(`Input: ${inputValue}`);
    }

    if (node.type === "agent" && node.agentId) {
      const agent = agents.find((a) => a.id === node.agentId);
      if (!agent) continue;

      log(`Running agent: ${agent.name}`);

      const result = await generateWithGemini({
        system: agent.systemPrompt,
        prompt: memoryToPrompt(memory),
      });

      output = addStep(output, agent.name, result.text);
      memory = addMemoryOutput(memory, `${agent.name}: ${result.text}`);
      emitOutput();
      log(`Completed agent: ${agent.name}`);
    }

    if (node.type === "transform") {
      const transformNote = node.config?.label || "Transform completed.";
      memory = addMemoryContext(memory, transformNote);
      log(transformNote);
    }
  }

  log("Pipeline complete.");

  return {
    id: Date.now().toString(),
    pipelineId: pipeline.id,
    status: "completed",
    logs,
    output,
    usage: {
      provider: "google",
      model: "gemini-2.5-flash",
    },
  };
}
