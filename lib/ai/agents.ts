export type AgentProvider = "openai" | "anthropic" | "google" | "local";

export type AgentTool =
  | "files"
  | "web"
  | "figma"
  | "vercel"
  | "github"
  | "supabase"
  | "media";

export type Agent = {
  id: string;
  name: string;
  role: string;
  provider: AgentProvider;
  model: string;
  tools: AgentTool[];
  systemPrompt: string;
};

export const defaultAgents: Agent[] = [
  {
    id: "director-agent",
    name: "Director Agent",
    role: "Creative direction and narrative sequencing",
    provider: "openai",
    model: "primary-reasoning-model",
    tools: ["files", "web", "media"],
    systemPrompt:
      "Convert project context into clear creative decisions, shot logic, and production-ready direction.",
  },
  {
    id: "prompt-agent",
    name: "Prompt Engineer",
    role: "Generate visual prompts and asset instructions",
    provider: "google",
    model: "visual-reasoning-model",
    tools: ["files", "media"],
    systemPrompt:
      "Generate precise cinematic prompts for images, video, and design assets.",
  },
  {
    id: "dev-agent",
    name: "Dev Agent",
    role: "Code implementation and deployment support",
    provider: "openai",
    model: "code-reasoning-model",
    tools: ["github", "vercel", "supabase"],
    systemPrompt:
      "Turn product specs into clean implementation plans, code tasks, and deployable app updates.",
  },
];
