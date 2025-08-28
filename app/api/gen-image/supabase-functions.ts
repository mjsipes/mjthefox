import { SupabaseClient } from "@supabase/supabase-js";
import OpenAI from "openai";
import { image_url_to_text } from "./openai-functions";

export async function uploadB64ImageToSupabase(
  supabase: SupabaseClient,
  filename: string,
  base64: string,
  parent_id: string | null = null
) {
  console.log("uploadB64ImageToSupabase filename:", filename)
  const buffer = Buffer.from(base64, "base64");
  const { data, error } = await supabase.storage
    .from("mj-photos")
    .upload(`ai/${filename}.jpg`, buffer, {
      contentType: "image/jpeg",
      upsert: true,
    });
  if (error) {
    console.log("uploadB64ImageToSupabase error:", error)
    return null;
  }
  console.log("uploadB64ImageToSupabase data:", data)
  const {data: data1,error: error1} = await supabase.from("image_metadata").insert({
    image_id: data.id,
    parent_id: parent_id,
  }).select("*");
  if (error1) {
    console.error("uploadB64ImageToSupabase metadata error:", error1);
  }
  console.log("uploadB64ImageToSupabase metadata data:", data1)
  return data;
}

export async function getImageId_from_url(supabase: SupabaseClient, image_url: string) {
  //take image url, convert to bucket and path
  const {bucket, path} = await getImagePath_from_image_url(supabase, image_url);
  const {data,error} = await supabase.rpc("get_image_id_from_image_path", {image_bucket: bucket, image_path: path});
  if (error) {
    console.error("getImageId_from_url error:", error);
    return null;
  }
  console.log("getImageId_from_url data:", data)
  return data;
}
export async function getImageId_from_image_path(supabase: SupabaseClient, image_bucket: string, image_path: string) {

  //get image_id
  const {data,error} = await supabase.rpc("get_image_id_from_image_path", {image_bucket: image_bucket, image_path: image_path});
  if (error) {
    console.error("getImageId_from_image_path error:", error);
    return null;
  }
  console.log("getImageId_from_image_id data:", data)
  return data;
}
export async function getImageUrl_from_image_id(supabase: SupabaseClient, image_id: string) {
  //get image bucket and path
  const pathData = await getImagePath_from_image_id(supabase, image_id);
  if (!pathData) throw new Error("getImageUrl_from_image_id: no path data");

  const { bucket_id, name } = pathData;
  //get image url
  const { data: data } = await supabase.storage.from(bucket_id).getPublicUrl(name);
  console.log("getImageUrl_from_image_id data1:", data)
  return data.publicUrl;
}
export async function getImageUrl_from_image_path(supabase: SupabaseClient, image_bucket: string, image_path: string) {
  //get image url
  const { data } = await supabase.storage.from(image_bucket).getPublicUrl(image_path);
  console.log("getImageUrl_from_image_path data:", data)
  return data.publicUrl;
}
export async function getImagePath_from_image_id(
  supabase: SupabaseClient,
  image_id: string
) {
  const { data, error } = await supabase.rpc(
    "get_image_bucket_and_path_from_image_id",
    { image_id }
  );
  if (error) {
    console.error("getImagePath_from_image_id error:", error);
    return null;
  }
  console.log("getImagePath_from_image_id data:", data);
  return { bucket_id: data[0].bucket_id, name: data[0].name };
}

export async function getImagePath_from_image_url(supabase: SupabaseClient, image_url: string) {
  console.log("getImagePath_from_image_url image_url:", image_url)
  const u = new URL(image_url);
  const parts = u.pathname.split("/");
  const bucket = parts[5]; // after "public"
  const path = parts.slice(6).join("/");
  console.log("getImagePath_from_image_url bucket:", bucket)
  console.log("getImagePath_from_image_url path:", path)
  return {bucket, path};
}

export async function createMetadataRow_from_image_url(supabase: SupabaseClient, image_url: string) {
  //imageurl->imageid
  const image_id = await getImageId_from_url(supabase, image_url);
  //create metadata row
  const data = await createMetadataRow_from_image_id(supabase, image_id);
  return data;
}
export async function createMetadataRow_from_image_path(supabase: SupabaseClient, image_bucket: string, image_path: string) {
  //image_bucket, image_path->image_id
  const image_id = await getImageId_from_image_path(supabase, image_bucket, image_path);
  //create metadata row
  const data = await createMetadataRow_from_image_id(supabase, image_id);
  return data;
}
export async function createMetadataRow_from_image_id(supabase: SupabaseClient, image_id: string) {
  console.log("createMetadataRow_from_image_id image_id:", image_id)
  //create metadata row
  const {data,error} = await supabase.from("image_metadata").insert({
    image_id: image_id,
  }).select("*");
  if (error) {
    console.error("createMetadataRow_from_image_id error:", error);
    return null;
  }
  console.log("createMetadataRow_from_image_id data:", data)
  return data;
}
export async function createMetadataRow_for_all_images(supabase: SupabaseClient) {
  //for each image that doesn't have a metadata row, call createMetadataRow
  const {data,error} = await supabase.rpc("get_all_large_images_without_metadata");
  if (error) {
    console.error("createMetadataRow_for_all_images error:", error);
    return null;
  }
  console.log("createMetadataRow_for_all_images data:", data)
  for (const image of data) {
    await createMetadataRow_from_image_id(supabase, image.image_id);
  }
}

export async function createDescription_from_image_url(client: OpenAI, supabase: SupabaseClient, image_url: string) {
  //image_url->image_id
  const image_id = await getImageId_from_url(supabase, image_url);
  //create metadata row
  const data = await createMetadataRow_from_image_id(supabase, image_id);
  const {data: description, error: description_error} = await supabase.from("image_metadata").select("description").eq("image_id", image_id);
  if (description_error) {
    console.error("createDescription_from_image_url error:", description_error);
    return null;
  }
  if (description[0].description) {
    console.log("createDescription_from_image_url description:", description[0].description)
    return description[0].description;
  }
  //if no description, call image_url_to_text
  const new_description = await image_url_to_text(client, image_url);
  const {data: update_data, error: update_error} = await supabase.from("image_metadata").update({description: new_description}).eq("image_id", image_id);
  return new_description;
}
export async function createDescription_from_image_path(client: OpenAI, supabase: SupabaseClient, image_bucket: string, image_path: string) {
  //image_bucket, image_path->image_id
  const image_id = await getImageId_from_image_path(supabase, image_bucket, image_path);
  const data = await createDescription_from_image_id(client, supabase, image_id);
  return data;
}
export async function createDescription_from_image_id(
  client: OpenAI,
  supabase: SupabaseClient,
  image_id: string
) {
  // Ensure a metadata row exists
  await createMetadataRow_from_image_id(supabase, image_id);
  // Fetch existing description
  const { data: existing, error: fetchError } = await supabase
    .from("image_metadata")
    .select("description")
    .eq("image_id", image_id)
    .single();
  if (fetchError) {
    console.error("createDescription_from_image_id fetch error:", fetchError);
    return null;
  }
  if (existing?.description) {
    console.log("createDescription_from_image_id existing description:", existing.description);
    return existing.description;
  }
  // Get URL for the image
  const image_url = await getImageUrl_from_image_id(supabase, image_id);
  // Generate description with OpenAI
  const new_description = await image_url_to_text(client, image_url);
  // Update metadata row
  const { error: updateError } = await supabase
    .from("image_metadata")
    .update({ description: new_description })
    .eq("image_id", image_id);
  if (updateError) {
    console.error("createDescription_from_image_id update error:", updateError);
    return null;
  }
  return new_description;
}
export async function createDescription_for_all_images(
  client: OpenAI,
  supabase: SupabaseClient
) {
  // First ensure metadata rows exist
  await createMetadataRow_for_all_images(supabase);
  // Then query images missing descriptions
  const { data, error } = await supabase
    .from("image_metadata")
    .select("image_id")
    .is("description", null);
  if (error) {
    console.error("createDescription_for_all_images error:", error);
    return null;
  }
  console.log("createDescription_for_all_images images needing descriptions:", data);
  for (const row of data) {
    await createDescription_from_image_id(client, supabase, row.image_id);
  }
}
