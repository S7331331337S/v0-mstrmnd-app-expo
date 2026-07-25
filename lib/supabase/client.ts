import { createClient, SupabaseClient } from "@supabase/supabase-js";

type RuntimeSupabaseConfig = {
  url?: string;
  anonKey?: string;
};

export function getSupabaseConfig(): RuntimeSupabaseConfig {
  return {
    url: process.env.EXPO_PUBLIC_SUPABASE_URL,
    anonKey: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY,
  };
}

export function hasSupabaseConfig() {
  const config = getSupabaseConfig();
  return Boolean(config.url && config.anonKey);
}

let _client: SupabaseClient | null = null;

export function getSupabaseClient(): SupabaseClient | null {
  if (_client) return _client;
  const config = getSupabaseConfig();
  if (!config.url || !config.anonKey) return null;
  _client = createClient(config.url, config.anonKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    },
  });
  return _client;
}

export async function persistRun(payload: {
  pipelineId: string;
  projectId?: string;
  status: string;
  logs: string[];
  output: unknown;
  usage?: {
    provider?: string;
    model?: string;
    inputTokens?: number;
    outputTokens?: number;
    estimatedCost?: number;
  };
}) {
  const client = getSupabaseClient();
  if (!client) {
    return {
      ok: false,
      skipped: true,
      reason: "Supabase env vars missing.",
    };
  }

  const { data, error } = await client
    .from("runs")
    .insert({
      pipeline_id: payload.pipelineId,
      status: payload.status,
      logs: payload.logs,
      output: payload.output,
      usage: payload.usage ?? null,
    })
    .select("id")
    .single();

  if (error) {
    return { ok: false, skipped: false, reason: error.message };
  }

  return { ok: true, skipped: false, id: data.id };
}

export async function persistProject(payload: {
  name: string;
  slug?: string;
  organizationId?: string;
}) {
  const client = getSupabaseClient();
  if (!client) {
    return { ok: false, skipped: true, reason: "Supabase env vars missing." };
  }

  const { data, error } = await client
    .from("projects")
    .insert({
      name: payload.name,
      slug: payload.slug ?? payload.name.toLowerCase().replace(/\s+/g, "-"),
      organization_id: payload.organizationId ?? null,
    })
    .select("id")
    .single();

  if (error) {
    return { ok: false, skipped: false, reason: error.message };
  }

  return { ok: true, skipped: false, id: data.id };
}

export async function persistPipeline(payload: {
  projectId: string;
  graph: unknown;
}) {
  const client = getSupabaseClient();
  if (!client) {
    return { ok: false, skipped: true, reason: "Supabase env vars missing." };
  }

  const { data, error } = await client
    .from("pipelines")
    .insert({
      project_id: payload.projectId,
      graph: payload.graph,
    })
    .select("id")
    .single();

  if (error) {
    return { ok: false, skipped: false, reason: error.message };
  }

  return { ok: true, skipped: false, id: data.id };
}

export async function persistAgent(payload: {
  projectId: string;
  name: string;
  role: string;
  provider: string;
  model: string;
  tools: string[];
  config?: Record<string, unknown>;
}) {
  const client = getSupabaseClient();
  if (!client) {
    return { ok: false, skipped: true, reason: "Supabase env vars missing." };
  }

  const { data, error } = await client
    .from("agents")
    .insert({
      project_id: payload.projectId,
      name: payload.name,
      role: payload.role,
      provider: payload.provider,
      model: payload.model,
      tools: payload.tools,
      config: payload.config ?? null,
    })
    .select("id")
    .single();

  if (error) {
    return { ok: false, skipped: false, reason: error.message };
  }

  return { ok: true, skipped: false, id: data.id };
}
