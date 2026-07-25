export type UsageEvent = {
  provider: string;
  model: string;
  inputTokens: number;
  outputTokens: number;
  estimatedCost: number;
  timestamp: number;
};

export type UsageSummary = {
  totalInputTokens: number;
  totalOutputTokens: number;
  totalCost: number;
  events: UsageEvent[];
};

// Cost per 1M tokens (USD) — approximate Gemini 2.5 Flash pricing
const COST_PER_1M: Record<string, { input: number; output: number }> = {
  "gemini-2.5-flash": { input: 0.075, output: 0.3 },
  "gemini-2.0-flash": { input: 0.1, output: 0.4 },
  default: { input: 0.1, output: 0.4 },
};

export function estimateCost(
  provider: string,
  model: string,
  inputTokens: number,
  outputTokens: number
): number {
  const rates = COST_PER_1M[model] ?? COST_PER_1M.default;
  return (inputTokens / 1_000_000) * rates.input + (outputTokens / 1_000_000) * rates.output;
}

export function createUsageEvent(
  provider: string,
  model: string,
  inputTokens: number,
  outputTokens: number
): UsageEvent {
  return {
    provider,
    model,
    inputTokens,
    outputTokens,
    estimatedCost: estimateCost(provider, model, inputTokens, outputTokens),
    timestamp: Date.now(),
  };
}

export function summarizeUsage(events: UsageEvent[]): UsageSummary {
  return events.reduce(
    (acc, e) => ({
      totalInputTokens: acc.totalInputTokens + e.inputTokens,
      totalOutputTokens: acc.totalOutputTokens + e.outputTokens,
      totalCost: acc.totalCost + e.estimatedCost,
      events: [...acc.events, e],
    }),
    { totalInputTokens: 0, totalOutputTokens: 0, totalCost: 0, events: [] as UsageEvent[] }
  );
}

// Convert estimated cost in USD to credits (1 credit = $0.01)
export function costToCredits(usdCost: number): number {
  return usdCost * 100;
}
