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

export async function persistRun(payload: {
  pipelineId: string;
  status: string;
  logs: string[];
  output: unknown;
}) {
  if (!hasSupabaseConfig()) {
    return {
      ok: false,
      skipped: true,
      reason: "Supabase env vars missing.",
    };
  }

  return {
    ok: false,
    skipped: true,
    reason: "Install @supabase/supabase-js, then replace this adapter with createClient().",
  };
}
