import { SupabaseClient } from "@supabase/supabase-js";
import { OpenAI } from "openai";
import { create_image_edit_with_images_api } from "./openai-functions";
import {
  getImageId_from_image_path,
  getImagePath_from_image_id,
  getImageId_from_url,
} from "./supabase-functions";

export async function lets_get_this_bread(
  client: OpenAI,
  supabase: SupabaseClient,
  image_bucket: string,
  image_path: string,
  artists: string[]
) {
  const { data, error } = await supabase.storage
    .from(image_bucket)
    .list(image_path, {
      limit: 100,
      offset: 0,
      sortBy: { column: "name", order: "asc" },
    });
  if (error) {
    console.error("lgtb error:", error);
    return;
  }
  console.log("lgtb data:", data);

  for (const image of data) {
    await lgtb(client, supabase, image.id, artists);
  }
}

export async function lgtb(
  client: OpenAI,
  supabase: SupabaseClient,
  image_id: string,
  artists: string[]
) {
  for (const artist of artists) {
    // if no image already exists for this image and artist, create it
    const { data: existing, error: fetchError } = await supabase
      .from("image_metadata")
      .select("image_id")
      .eq("parent_id", image_id)
      .eq("artist", artist)
      .single();
    if (existing) {
      console.log(
        "lgtb image already exists for this artist:",
        image_id,
        artist
      );
      continue;
    }
    console.log("lgtb no existing image found for:", image_id, artist);
    const image_path = await getImagePath_from_image_id(supabase, image_id);
    if (!image_path) {
      console.error("lgtb image path not found:", image_id);
      continue;
    }
    console.log("lgtb creating image for:", image_id, artist);
    const new_image_result = await create_image_edit_with_images_api(
      client,
      supabase,
      `transform into style of ${artist}: `,
      [{ bucket: image_path.bucket_id, path: image_path.name }]
    );
    if (!new_image_result) {
      console.error("lgtb new image result not found:", image_id, artist);
      continue;
    }
    const new_image_id = await getImageId_from_url(
      supabase,
      new_image_result.publicUrl
    );
    if (!new_image_id) {
      console.error("lgtb new image id not found:", image_id, artist);
      continue;
    }
    console.log("lgtb creating image metadata for:", image_id, artist);
    const { data, error } = await supabase.from("image_metadata").insert({
      image_id: new_image_id,
      parent_id: image_id,
      artist: artist,
    });
    if (error) {
      console.error("lgtb insert error:", error);
    }
    console.log("lgtb inserted image metadata:", data);
  }
}
