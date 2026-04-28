import type { RunOutput } from "../runtime/output";

export type ContentPlatform = "x" | "linkedin" | "instagram" | "shorts";

export type GeneratedPost = {
  platform: ContentPlatform;
  title: string;
  body: string;
  cta: string;
  hashtags: string[];
};

const defaultHashtags = ["MSTRMND", "AI", "AgenticAI", "CreativeOS"];

export function generatePostFromRun(output: RunOutput, platform: ContentPlatform = "x"): GeneratedPost {
  const finalText = output.finalText || "MSTRMND ran a multi-agent system and produced a refined output.";
  const firstStep = output.steps?.[0]?.output || finalText;
  const trimmed = finalText.length > 220 ? `${finalText.slice(0, 220)}...` : finalText;

  if (platform === "linkedin") {
    return {
      platform,
      title: "MSTRMND Run",
      body: [
        "Most AI tools give you answers.",
        "MSTRMND runs a system.",
        "",
        "It plans, critiques, refines, and executes through collaborating agents.",
        "",
        `Latest run output:\n${trimmed}`,
      ].join("\n"),
      cta: "Run your system.",
      hashtags: defaultHashtags,
    };
  }

  if (platform === "instagram" || platform === "shorts") {
    return {
      platform,
      title: "Build with agents, not prompts.",
      body: [
        "MSTRMND just ran a multi-agent creative system.",
        "",
        "Plan → Critique → Refine → Execute",
        "",
        trimmed,
      ].join("\n"),
      cta: "Run your system.",
      hashtags: defaultHashtags,
    };
  }

  return {
    platform,
    title: "MSTRMND",
    body: [
      "Most AI tools give you answers.",
      "",
      "MSTRMND builds with you.",
      "",
      "It plans. It critiques. It refines. It executes.",
      "",
      trimmed,
    ].join("\n"),
    cta: "Run your system.",
    hashtags: defaultHashtags,
  };
}

export function generateContentPack(output: RunOutput) {
  return [
    generatePostFromRun(output, "x"),
    generatePostFromRun(output, "linkedin"),
    generatePostFromRun(output, "instagram"),
    generatePostFromRun(output, "shorts"),
  ];
}
