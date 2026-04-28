export type RunOutput = {
  finalText?: string;
  steps: { agent: string; output: string }[];
};

export function createOutput(): RunOutput {
  return { steps: [] };
}

export function addStep(output: RunOutput, agent: string, text: string): RunOutput {
  return {
    ...output,
    steps: [...output.steps, { agent, output: text }],
    finalText: text,
  };
}
