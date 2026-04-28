export type RuntimeMemory = {
  projectId?: string;
  goal: string;
  context: string[];
  outputs: string[];
};

export function createRuntimeMemory(goal: string): RuntimeMemory {
  return {
    goal,
    context: [],
    outputs: [],
  };
}

export function addMemoryContext(memory: RuntimeMemory, value: string): RuntimeMemory {
  return {
    ...memory,
    context: [...memory.context, value],
  };
}

export function addMemoryOutput(memory: RuntimeMemory, value: string): RuntimeMemory {
  return {
    ...memory,
    outputs: [...memory.outputs, value],
  };
}

export function memoryToPrompt(memory: RuntimeMemory) {
  return [
    `Goal: ${memory.goal}`,
    memory.context.length ? `Context:\n${memory.context.join("\n")}` : "",
    memory.outputs.length ? `Prior outputs:\n${memory.outputs.join("\n---\n")}` : "",
  ]
    .filter(Boolean)
    .join("\n\n");
}
