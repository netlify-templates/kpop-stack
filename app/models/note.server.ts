import { supabase } from "./user.server";

export async function getNoteListItems({ userId }: { userId: string }) {
  const { data } = await supabase
    .from("notes")
    .select("id, title")
    .eq("profile_id", userId);

  return data;
}

export async function getNote({ id, userId }) {
  const { data, error } = await supabase
    .from("notes")
    .select("*")
    .eq("profile_id", userId)
    .eq("id", id)
    .single();

  if (!error) {
    return {
      userId: data.profile_id,
      id: data.id,
      title: data.title,
      body: data.title,
    };
  }

  return null;
}
