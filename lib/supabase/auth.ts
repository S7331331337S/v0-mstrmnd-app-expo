import { Session, User } from "@supabase/supabase-js";
import { getSupabaseClient } from "./client";

export type AuthState = {
  user: User | null;
  session: Session | null;
  loading: boolean;
};

export async function signInWithEmail(email: string, password: string) {
  const client = getSupabaseClient();
  if (!client) return { error: { message: "Supabase not configured." } };
  return client.auth.signInWithPassword({ email, password });
}

export async function signUpWithEmail(email: string, password: string) {
  const client = getSupabaseClient();
  if (!client) return { error: { message: "Supabase not configured." } };
  return client.auth.signUp({ email, password });
}

export async function signOut() {
  const client = getSupabaseClient();
  if (!client) return;
  await client.auth.signOut();
}

export async function getSession() {
  const client = getSupabaseClient();
  if (!client) return null;
  const { data } = await client.auth.getSession();
  return data.session;
}

export function onAuthStateChange(
  callback: (session: Session | null) => void
) {
  const client = getSupabaseClient();
  if (!client) return () => {};
  const { data } = client.auth.onAuthStateChange((_event, session) => {
    callback(session);
  });
  return () => data.subscription.unsubscribe();
}
