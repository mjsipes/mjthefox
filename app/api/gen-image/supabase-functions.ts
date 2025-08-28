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

export async function getImageId_from_url(supabase: SupabaseClient, image_url: string) {
  //take image url, convert to bucket and path
  //get image_id
}
export async function getImageId_from_image_path(supabase: SupabaseClient, image_bucket: string, image_path: string) {
  //get image_id
}
export async function getImageUrl_from_image_id(supabase: SupabaseClient, image_id: string) {
  //get image bucket and path
  const {data ,error} = await supabase.rpc("get_image_bucket_and_path_from_image_id", {image_id: image_id});
  if (error) {
    console.error("getImageUrl_from_image_id error:", error);
    return null;
  }
  console.log("getImageUrl_from_image_id data:", data)
  //get image url
  const { data: data1 } = await supabase.storage.from(data[0].bucket_id).getPublicUrl(data[0].name);
  console.log("getImageUrl_from_image_id data1:", data1)
  return data1.publicUrl;
}
export async function getImageUrl_from_image_path(supabase: SupabaseClient, image_bucket: string, image_path: string) {
  //get image url
  const { data } = await supabase.storage.from(image_bucket).getPublicUrl(image_path);
  return data.publicUrl;
}
export async function getImagePath_from_image_id(supabase: SupabaseClient, image_id: string) {
}
export async function getImagePath_from_image_url(supabase: SupabaseClient, image_url: string) {
}

export async function createMetadataRow_from_image_url(supabase: SupabaseClient, image_url: string) {
  //take image url, convert to bucket and path
  //get image_id
  //create metadata row if it doesn't exist
}
export async function createMetadataRow_from_image_path(supabase: SupabaseClient, image_bucket: string, image_path: string) {
  //get image_id
  //create metadata row if it doesn't exist
}
export async function createMetadataRow_from_image_id(supabase: SupabaseClient, image_id: string) {
  //create metadata row if it doesn't exist
}
export async function createMetadataRow_for_all_images(supabase: SupabaseClient) {
  //for each image, call createMetadataRow
}

export async function createDescription_from_image_url(supabase: SupabaseClient, image_url: string) {
  //first call createMetadataRow
  //create a description by calling image_url_to_text
}
export async function createDescription_from_image_path(supabase: SupabaseClient, image_bucket: string, image_path: string) {
  //first call createMetadataRow
  //get image url
  //create a description by calling image_url_to_text
}
export async function createDescription_from_image_id(supabase: SupabaseClient, image_id: string) {
  //first call createMetadataRow
  //get image_url
  //create a description by calling image_url_to_text
}
export async function createDescription_for_all_images(supabase: SupabaseClient) {
  //call createMetadataRow_for_all_images
  //for each image, call createDescription
}