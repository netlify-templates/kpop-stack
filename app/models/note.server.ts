import { supabase } from "./user.server";

export async function getNoteListItems({ userId }: { userId: string }) {
  const { data } = await supabase
    .from("notes")
    .select("id, title")
    .eq("profile_id", userId);

  return data;
}
