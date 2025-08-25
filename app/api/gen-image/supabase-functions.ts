import { SupabaseClient } from "@supabase/supabase-js";

export async function uploadB64ImageToSupabase(
  supabase: SupabaseClient,
  filename: string,
  base64: string
) {
  console.log("uploadB64ImageToSupabase filename:", filename)
  const buffer = Buffer.from(base64, "base64");
  const { data, error } = await supabase.storage
    .from("mj-photos")
    .upload(`ai/${filename}.jpg`, buffer, {
      contentType: "image/jpeg",
      upsert: true,
    });
  console.log("uploadB64ImageToSupabase data:", data)
  console.log("uploadB64ImageToSupabase error:", error)
  return data;
}
