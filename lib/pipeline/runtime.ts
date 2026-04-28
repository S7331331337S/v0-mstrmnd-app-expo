import { Agent } from "../ai/agents";
import { generateWithGemini } from "../ai/gemini";

export type PipelineNode = {
  id: string;
  type: "agent" | "transform" | "input" | "output";
  agentId?: string;
  config?: any;
};

export type Pipeline = {
  id: string;
  nodes: PipelineNode[];
};

export type RunResult = {
  id: string;
  status: "queued" | "running" | "completed" | "failed";
  logs: string[];
  output?: any;
};

export async function runPipeline(pipeline: Pipeline, agents: Agent[]): Promise<RunResult> {
  const logs: string[] = [];
  let context: any = "";

  logs.push("Starting pipeline...");

  for (const node of pipeline.nodes) {
    if (node.type === "agent" && node.agentId) {
      const agent = agents.find((a) => a.id === node.agentId);
      if (!agent) continue;

      logs.push(`Running agent: ${agent.name}`);

      const result = await generateWithGemini({
        system: agent.systemPrompt,
        prompt: context || "Start task",
      });

      logs.push(result.text);
      context = result.text;
    }
  }

  return {
    id: Date.now().toString(),
    status: "completed",
    logs,
    output: context,
  };
}
