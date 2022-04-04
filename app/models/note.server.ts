import { supabase } from "./user.server";

export async function getNoteListItems({ userId }: { userId: string }) {
  const { data } = await supabase
    .from("notes")
    .select("id, title")
    .eq("profile_id", userId);

  return data;
}

export async function createNote({ title, body, userId }) {
  const { data, error } = await supabase
    .from("notes")
    .insert([{ title, body, profile_id: userId }])
    .single();

  if (!error) {
    return data;
  }

  return null;
}

export async function deleteNote({ id, userId }) {
  const { error } = await supabase
    .from("notes")
    .delete({ returning: "minimal" })
    .match({ id, profile_id: userId });

  if (!error) {
    return {};
  }

  return null;
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
      body: data.body,
    };
  }

  return null;
}
