import type { GeneratedPost } from "./generate-post";

export type PostStatus = "draft" | "approved" | "scheduled" | "posted" | "failed";

export type QueuedPost = {
  id: string;
  post: GeneratedPost;
  status: PostStatus;
  scheduledAt?: string;
  publishedAt?: string;
  error?: string;
  createdAt: string;
};

export function createPostQueue(posts: GeneratedPost[]): QueuedPost[] {
  return posts.map((post, index) => ({
    id: `${Date.now()}-${index}`,
    post,
    status: "draft",
    createdAt: new Date().toISOString(),
  }));
}

export function approvePost(item: QueuedPost): QueuedPost {
  return {
    ...item,
    status: "approved",
  };
}

export function schedulePost(item: QueuedPost, scheduledAt: string): QueuedPost {
  return {
    ...item,
    status: "scheduled",
    scheduledAt,
  };
}

export function markPosted(item: QueuedPost): QueuedPost {
  return {
    ...item,
    status: "posted",
    publishedAt: new Date().toISOString(),
  };
}

export function markFailed(item: QueuedPost, error: string): QueuedPost {
  return {
    ...item,
    status: "failed",
    error,
  };
}
