import type { GeneratedPost } from "./generate-post";

export type ScoredPost = GeneratedPost & {
  score: number;
  reasons: string[];
};

export function scorePost(post: GeneratedPost): ScoredPost {
  const reasons: string[] = [];
  let score = 0;

  const body = post.body.trim();
  const lower = body.toLowerCase();
  const length = body.length;
  const lineCount = body.split("\n").filter(Boolean).length;

  if (length > 80 && length < 600) {
    score += 2;
    reasons.push("good length");
  }

  if (lineCount >= 3) {
    score += 1;
    reasons.push("readable line breaks");
  }

  if (lower.includes("agent") || lower.includes("agents")) {
    score += 1;
    reasons.push("mentions agents");
  }

  if (lower.includes("execute") || lower.includes("build")) {
    score += 1;
    reasons.push("strong execution language");
  }

  if (lower.includes("prompt")) {
    score += 1;
    reasons.push("clear contrast against prompt tools");
  }

  if (post.cta.length > 0) {
    score += 1;
    reasons.push("has call to action");
  }

  if (post.hashtags.length >= 2) {
    score += 1;
    reasons.push("has platform tags");
  }

  if (length > 1200) {
    score -= 2;
    reasons.push("too long");
  }

  return {
    ...post,
    score,
    reasons,
  };
}

export function selectTopPosts(posts: GeneratedPost[], limit = 2) {
  return posts
    .map(scorePost)
    .filter((post) => post.score >= 4)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}
