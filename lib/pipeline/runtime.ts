import { Agent } from "../ai/agents";

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
  logs.push("Starting pipeline...");

  for (const node of pipeline.nodes) {
    if (node.type === "agent" && node.agentId) {
      const agent = agents.find((a) => a.id === node.agentId);
      if (!agent) continue;
      logs.push("Running agent: " + agent.name);
      await new Promise((r) => setTimeout(r, 300));
      logs.push("Completed agent: " + agent.name);
    }
  }

  return {
    id: Date.now().toString(),
    status: "completed",
    logs,
    output: { message: "Pipeline finished" },
  };
}
