import { Agent } from "../ai/agents";
import { generateWithGemini } from "../ai/gemini";
import { createRuntimeMemory, addMemoryContext, addMemoryOutput, memoryToPrompt } from "../runtime/memory";
import { addStep, createOutput, RunOutput } from "../runtime/output";

export type MultiAgentEvents = {
  onLog?: (log: string) => void;
  onOutput?: (output: RunOutput) => void;
};

export type MultiAgentResult = {
  id: string;
  pipelineId: string;
  status: "completed" | "failed";
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

export async function runMultiAgentMode(agents: Agent[], events: MultiAgentEvents = {}): Promise<MultiAgentResult> {
  const logs: string[] = [];
  let output = createOutput();
  let memory = createRuntimeMemory("Create a premium MSTRMND creative operating system result with stronger strategy, sharper execution, and polished final direction.");

  const log = (value: string) => {
    logs.push(value);
    events.onLog?.(value);
  };

  const emit = () => events.onOutput?.(output);

  const director = agents.find((agent) => agent.id === "director-agent") || agents[0];
  const critic = agents.find((agent) => agent.id === "dev-agent") || agents[1] || director;
  const refiner = agents.find((agent) => agent.id === "prompt-agent") || agents[2] || director;

  log("Starting multi-agent mode...");
  log("Phase 1: proposal");

  const proposal = await generateWithGemini({
    system: director.systemPrompt,
    prompt: memoryToPrompt(memory),
  });
  output = addStep(output, director.name + " Proposal", proposal.text);
  memory = addMemoryOutput(memory, director.name + " proposal: " + proposal.text);
  emit();

  log("Phase 2: critique");
  memory = addMemoryContext(memory, "Critique the proposal. Identify gaps, risks, weak spots, and missing implementation detail.");
  const critique = await generateWithGemini({
    system: critic.systemPrompt,
    prompt: memoryToPrompt(memory),
  });
  output = addStep(output, critic.name + " Critique", critique.text);
  memory = addMemoryOutput(memory, critic.name + " critique: " + critique.text);
  emit();

  log("Phase 3: refinement");
  memory = addMemoryContext(memory, "Refine the proposal using the critique. Produce the strongest final version.");
  const refinement = await generateWithGemini({
    system: refiner.systemPrompt,
    prompt: memoryToPrompt(memory),
  });
  output = addStep(output, refiner.name + " Final Refinement", refinement.text);
  memory = addMemoryOutput(memory, refiner.name + " final: " + refinement.text);
  emit();

  log("Multi-agent mode complete.");

  return {
    id: Date.now().toString(),
    pipelineId: "multi-agent",
    status: "completed",
    logs,
    output,
    usage: {
      provider: "google",
      model: "gemini-2.5-flash",
    },
  };
}
