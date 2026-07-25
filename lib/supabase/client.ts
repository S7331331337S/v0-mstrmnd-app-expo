<<<<<<< HEAD
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  createClient,
  type Session,
  type SupabaseClient,
  type User,
} from "@supabase/supabase-js";
=======
import { createClient, SupabaseClient } from "@supabase/supabase-js";
>>>>>>> origin/main

type RuntimeSupabaseConfig = {
  url?: string;
  anonKey?: string;
};

<<<<<<< HEAD
export type AuthUser = {
  id: string;
  email: string;
  name: string;
};

export type ProjectRecord = {
  id: string;
  user_id: string;
  name: string;
  description: string | null;
  agents_config: Record<string, unknown> | null;
  created_at: string;
  updated_at: string;
};

export type RunRecord = {
  id: string;
  project_id: string;
  pipeline_id: string | null;
  status: string;
  logs: string[];
  output: unknown;
  usage: Record<string, unknown> | null;
  created_at: string;
};

type SupabaseResult<T> = {
  ok: boolean;
  data?: T;
  skipped?: boolean;
  reason?: string;
  error?: string;
};

let client: SupabaseClient | null = null;

export function getSupabaseConfig(): RuntimeSupabaseConfig {
  const env = (globalThis as { process?: { env?: Record<string, string | undefined> } }).process
    ?.env;
  return {
    url: env?.EXPO_PUBLIC_SUPABASE_URL,
    anonKey: env?.EXPO_PUBLIC_SUPABASE_ANON_KEY,
=======
export function getSupabaseConfig(): RuntimeSupabaseConfig {
  return {
    url: process.env.EXPO_PUBLIC_SUPABASE_URL,
    anonKey: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY,
>>>>>>> origin/main
  };
}

export function hasSupabaseConfig() {
  const config = getSupabaseConfig();
  return Boolean(config.url && config.anonKey);
}

<<<<<<< HEAD
export function getSupabaseClient() {
  if (!hasSupabaseConfig()) {
    return null;
  }

  if (client) {
    return client;
  }

  const config = getSupabaseConfig();
  client = createClient(config.url!, config.anonKey!, {
    auth: {
      storage: AsyncStorage,
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: false,
    },
  });

  return client;
}

function toAuthUser(user: User | null): AuthUser | null {
  if (!user?.id || !user.email) {
    return null;
  }

  const fromMeta =
    typeof user.user_metadata?.name === "string"
      ? user.user_metadata.name
      : typeof user.user_metadata?.full_name === "string"
      ? user.user_metadata.full_name
      : undefined;

  const emailPrefix = user.email.split("@")[0]?.trim();

  return {
    id: user.id,
    email: user.email,
    name: fromMeta || emailPrefix || "User",
  };
}

export async function getSession(): Promise<SupabaseResult<Session | null>> {
  const supabase = getSupabaseClient();
  if (!supabase) {
    return {
      ok: false,
      skipped: true,
      reason: "Supabase env vars missing.",
    };
  }

  const { data, error } = await supabase.auth.getSession();
  if (error) {
    return { ok: false, error: error.message };
  }

  return { ok: true, data: data.session };
}

export async function signUpWithPassword(payload: {
  email: string;
  password: string;
  name?: string;
}): Promise<SupabaseResult<AuthUser | null>> {
  const supabase = getSupabaseClient();
  if (!supabase) {
    return {
      ok: false,
      skipped: true,
      reason: "Supabase env vars missing.",
    };
  }

  const { data, error } = await supabase.auth.signUp({
    email: payload.email,
    password: payload.password,
    options: {
      data: {
        name: payload.name,
      },
    },
  });

  if (error) {
    return { ok: false, error: error.message };
  }

  return { ok: true, data: toAuthUser(data.user) };
}

export async function signInWithPassword(payload: {
  email: string;
  password: string;
}): Promise<SupabaseResult<AuthUser>> {
  const supabase = getSupabaseClient();
  if (!supabase) {
    return {
      ok: false,
      skipped: true,
      reason: "Supabase env vars missing.",
    };
  }

  const { data, error } = await supabase.auth.signInWithPassword(payload);
  if (error) {
    return { ok: false, error: error.message };
  }

  const user = toAuthUser(data.user);
  if (!user) {
    return { ok: false, error: "No user returned from Supabase." };
  }

  return { ok: true, data: user };
}

export async function signOut(): Promise<SupabaseResult<null>> {
  const supabase = getSupabaseClient();
  if (!supabase) {
    return {
      ok: false,
      skipped: true,
      reason: "Supabase env vars missing.",
    };
  }

  const { error } = await supabase.auth.signOut();
  if (error) {
    return { ok: false, error: error.message };
  }

  return { ok: true, data: null };
}

export function onAuthStateChange(callback: (session: Session | null) => void) {
  const supabase = getSupabaseClient();
  if (!supabase) {
    return () => {};
  }

  const { data } = supabase.auth.onAuthStateChange((_event, session) => {
    callback(session);
  });

  return () => {
    data.subscription.unsubscribe();
  };
}

export async function createProject(payload: {
  userId: string;
  name: string;
  description?: string;
  agentsConfig?: Record<string, unknown>;
}): Promise<SupabaseResult<ProjectRecord>> {
  const supabase = getSupabaseClient();
  if (!supabase) {
    return {
      ok: false,
      skipped: true,
      reason: "Supabase env vars missing.",
    };
  }

  const { data, error } = await supabase
    .from("projects")
    .insert({
      user_id: payload.userId,
      name: payload.name,
      description: payload.description ?? null,
      agents_config: payload.agentsConfig ?? null,
    })
    .select("*")
    .single();

  if (error) {
    return { ok: false, error: error.message };
  }

  return { ok: true, data };
}

export async function listProjects(userId?: string): Promise<SupabaseResult<ProjectRecord[]>> {
  const supabase = getSupabaseClient();
  if (!supabase) {
    return {
      ok: false,
      skipped: true,
      reason: "Supabase env vars missing.",
    };
  }

  let query = supabase.from("projects").select("*").order("updated_at", { ascending: false });
  if (userId) {
    query = query.eq("user_id", userId);
  }

  const { data, error } = await query;
  if (error) {
    return { ok: false, error: error.message };
  }

  return { ok: true, data: data ?? [] };
}

export async function updateProject(payload: {
  projectId: string;
  name?: string;
  description?: string | null;
  agentsConfig?: Record<string, unknown> | null;
}): Promise<SupabaseResult<ProjectRecord>> {
  const supabase = getSupabaseClient();
  if (!supabase) {
    return {
      ok: false,
      skipped: true,
      reason: "Supabase env vars missing.",
    };
  }

  const updatePayload: Record<string, unknown> = {};
  if (typeof payload.name === "string") {
    updatePayload.name = payload.name;
  }
  if (typeof payload.description !== "undefined") {
    updatePayload.description = payload.description;
  }
  if (typeof payload.agentsConfig !== "undefined") {
    updatePayload.agents_config = payload.agentsConfig;
  }

  const { data, error } = await supabase
    .from("projects")
    .update(updatePayload)
    .eq("id", payload.projectId)
    .select("*")
    .single();

  if (error) {
    return { ok: false, error: error.message };
  }

  return { ok: true, data };
}

export async function deleteProject(projectId: string): Promise<SupabaseResult<null>> {
  const supabase = getSupabaseClient();
  if (!supabase) {
    return {
      ok: false,
      skipped: true,
      reason: "Supabase env vars missing.",
    };
  }

  const { error } = await supabase.from("projects").delete().eq("id", projectId);
  if (error) {
    return { ok: false, error: error.message };
  }

  return { ok: true, data: null };
}

export async function persistRun(payload: {
  projectId: string;
  pipelineId?: string;
  status: string;
  logs: string[];
  output: unknown;
  usage?: Record<string, unknown>;
}): Promise<SupabaseResult<RunRecord>> {
  const supabase = getSupabaseClient();
  if (!supabase) {
=======
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
>>>>>>> origin/main
    return {
      ok: false,
      skipped: true,
      reason: "Supabase env vars missing.",
    };
  }

<<<<<<< HEAD
  const { data, error } = await supabase
    .from("runs")
    .insert({
      project_id: payload.projectId,
      pipeline_id: payload.pipelineId ?? null,
=======
  const { data, error } = await client
    .from("runs")
    .insert({
      pipeline_id: payload.pipelineId,
>>>>>>> origin/main
      status: payload.status,
      logs: payload.logs,
      output: payload.output,
      usage: payload.usage ?? null,
    })
<<<<<<< HEAD
    .select("*")
    .single();

  if (error) {
    return { ok: false, error: error.message };
  }

  return { ok: true, data };
}

export async function getRuns(payload: {
  projectId: string;
  limit?: number;
}): Promise<SupabaseResult<RunRecord[]>> {
  const supabase = getSupabaseClient();
  if (!supabase) {
    return {
      ok: false,
      skipped: true,
      reason: "Supabase env vars missing.",
    };
  }

  const { data, error } = await supabase
    .from("runs")
    .select("*")
    .eq("project_id", payload.projectId)
    .order("created_at", { ascending: false })
    .limit(payload.limit ?? 25);

  if (error) {
    return { ok: false, error: error.message };
  }

  return { ok: true, data: data ?? [] };
}

export function userFromSession(session: Session | null) {
  return toAuthUser(session?.user ?? null);
=======
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
>>>>>>> origin/main
}
