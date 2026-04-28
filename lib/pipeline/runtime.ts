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
  status: "queued" | "running" | "completed" | "failed";
  logs: string[];
  output: RunOutput;
};

export async function runPipeline(pipeline: Pipeline, agents: Agent[]): Promise<RunResult> {
  const logs: string[] = [];
  let memory = createRuntimeMemory(pipeline.goal || "Build a premium MSTRMND creative operating system output.");
  let output = createOutput();

  logs.push("Starting pipeline...");
  logs.push(`Goal: ${memory.goal}`);

  for (const node of pipeline.nodes) {
    if (node.type === "input") {
      const inputValue = node.config?.value || "Input received.";
      memory = addMemoryContext(memory, inputValue);
      logs.push(`Input: ${inputValue}`);
    }

    if (node.type === "agent" && node.agentId) {
      const agent = agents.find((a) => a.id === node.agentId);
      if (!agent) continue;

      logs.push(`Running agent: ${agent.name}`);

      const result = await generateWithGemini({
        system: agent.systemPrompt,
        prompt: memoryToPrompt(memory),
      });

      output = addStep(output, agent.name, result.text);
      memory = addMemoryOutput(memory, `${agent.name}: ${result.text}`);
      logs.push(`Completed agent: ${agent.name}`);
    }

    if (node.type === "transform") {
      const transformNote = node.config?.label || "Transform completed.";
      memory = addMemoryContext(memory, transformNote);
      logs.push(transformNote);
    }
  }

  logs.push("Pipeline complete.");

  return {
    id: Date.now().toString(),
    status: "completed",
    logs,
    output,
  };
}
