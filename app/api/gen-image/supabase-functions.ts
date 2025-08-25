// npx tsx --env-file=.env app/api/gen-image/supabase-get-all-images.ts
// node --env-file=.env --import=tsx app/api/gen-image/supabase-get-all-images.ts

import { SupabaseClient } from "@supabase/supabase-js";
import { promises as fs } from "fs";
import { basename } from "path";

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

export async function getSupabaseImages(supabase: SupabaseClient) {
  const { data } = await supabase.storage
    .from('mj-photos')
    .list('celestial/large');
  console.log("getSupabaseImages data:", data)
  return data;
}

type Options = {
  bucket?: string;
  destDir?: string;
  filename?: string;
  upsert?: boolean;
};

export async function uploadLocalJpgToSupabase(
  supabase: SupabaseClient,
  localPath: string,
  {
    bucket = "mj-photos",
    destDir = "ai",
    filename,
    upsert = false,
  }: Options = {}
) {
  const fileBuffer = await fs.readFile(localPath);

  const name = filename ?? basename(localPath);
  const key = destDir ? `${destDir}/${name}` : name;

  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(key, fileBuffer, {
      contentType: "image/jpeg",
      cacheControl: "3600",
      upsert,
    });

  if (error) throw error;

  const { data: pub } = supabase.storage.from(bucket).getPublicUrl(key);
  return { path: key, publicUrl: pub.publicUrl };
}
