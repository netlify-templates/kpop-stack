import bcrypt from "bcryptjs";
import { createClient } from "@supabase/supabase-js";
import invariant from "tiny-invariant";

export type User = { id: string; email: string };

// Abstract this away
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

invariant(
  supabaseUrl,
  "SUPABASE_URL must be set in your environment variables."
);
invariant(
  supabaseAnonKey,
  "SUPABASE_ANON_KEY must be set in your environment variables."
);

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function createUser(email: string, password: string) {
  const { user } = await supabase.auth.signUp({
    email,
    password,
  });

  // get the user profile after created
  const profile = await getProfileByEmail(user?.email);

  return profile;
}

export async function getProfileById(id: string) {
  const { data, error } = await supabase
    .from("profiles")
    .select("email, id")
    .eq("id", id)
    .single();

  if (error) return null;
  if (data) return { id: data.id, email: data.email };
}

export async function getProfileByEmail(email?: string) {
  const { data, error } = await supabase
    .from("profiles")
    .select("email, id")
    .eq("email", email)
    .single();

  if (error) return null;
  if (data) return data;
}

export async function verifyLogin(email: string, password: string) {
  const { user, error } = await supabase.auth.signIn({
    email,
    password,
  });

  if (error) return undefined;
  const profile = await getProfileByEmail(user?.email);

  return profile;
}
