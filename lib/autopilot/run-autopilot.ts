import { runMultiAgentMode } from "../pipeline/multi-agent";
import { defaultAgents } from "../ai/agents";
import { generateContentPack } from "../content/generate-post";
import { selectTopPosts } from "../content/score-post";
import { publishPost } from "../content/publish";

export async function runAutopilot() {
  console.log("[AUTOPILOT] Starting run...");

  // 1. Run multi-agent system
  const result = await runMultiAgentMode(defaultAgents);

  console.log("[AUTOPILOT] System output ready");

  // 2. Generate content
  const content = generateContentPack(result.output);

  console.log("[AUTOPILOT] Generated content:", content.length);

  // 3. Score + select best
  const bestPosts = selectTopPosts(content, 2);

  console.log("[AUTOPILOT] Selected top posts:", bestPosts.length);

  // 4. Publish
  for (const post of bestPosts) {
    console.log("[AUTOPILOT] Publishing:", post.platform);
    await publishPost({
      id: `${Date.now()}`,
      post,
      status: "approved",
      createdAt: new Date().toISOString(),
    } as any);
  }

  console.log("[AUTOPILOT] Run complete");

  return {
    output: result.output,
    posts: bestPosts,
  };
}
