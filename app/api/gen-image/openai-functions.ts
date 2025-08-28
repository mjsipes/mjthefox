/* eslint-disable @typescript-eslint/no-explicit-any */
import OpenAI from "openai";
import { toFile } from "openai";
import { uploadB64ImageToSupabase } from "./supabase-functions";
import { SupabaseClient } from "@supabase/supabase-js";

export async function image_url_to_text(openai: OpenAI, image_url: string) {
  console.log("image_url_to_text url:", image_url);
  const response = await openai.responses.create({
    model: "gpt-4.1-mini",
    input: [
      {
        role: "user",
        content: [
          { type: "input_text", text: "what's in this image?" },
          {
            type: "input_image",
            image_url:
              image_url,
            detail: "high",
          },
        ],
      },
    ],
  });
  console.log("image_url_to_text response:", response.output_text);
  return response.output_text;
}

export async function create_image_with_images_generate(
  prompt: string,
  client: OpenAI,
  supabase: SupabaseClient
) {
  console.log("create_image_with_images_generate prompt:", prompt);
  const img = await client.images.generate({
    model: "gpt-image-1",
    prompt: prompt,
    n: 1,
    size: "1536x1024",
    // response_format: "b64_json",
  });
  console.log("create_image_with_images_generate img:", img);

  const image_base64 = img.data?.[0]?.b64_json;
  if (image_base64) {
    const filename = `${Date.now()}`;
    const uploadResponse = await uploadB64ImageToSupabase(supabase, filename, image_base64);
    if (uploadResponse) {
      const { data } = supabase.storage.from("mj-photos").getPublicUrl(uploadResponse.path);
      console.log("create_image_with_images_generate image url:", data.publicUrl);
      return uploadResponse.id;
    }
  }
}


// https://platform.openai.com/docs/guides/tools-image-generation
export async function create_image_with_responses(
  prompt: string,
  openai: OpenAI,
  supabase: SupabaseClient
) {
  console.log("create_image_with_responses prompt:", prompt);
  const response = await openai.responses.create({
    model: "gpt-4.1-mini",
    input: prompt,
    tools: [{ type: "image_generation" }],
  });
  console.log("create_image_with_responses response:", response);

  const imageData = response.output
    .filter((output) => output.type === "image_generation_call")
    .map((output) => output.result)
    .filter((result): result is string => result !== null); // ✅ removes null

  if (imageData.length > 0) {
    const imageBase64 = imageData[0]; // now guaranteed string
    const filename = `${Date.now()}`;
    const uploadResponse = await uploadB64ImageToSupabase(
      supabase,
      filename,
      imageBase64
    );
    if (uploadResponse) {
      const { data } = supabase.storage.from("mj-photos").getPublicUrl(uploadResponse.path);
      console.log("create_image_with_responses image url:", data.publicUrl);
    }
  }
}

type ImageRef = { bucket: string; path: string };
export async function create_image_edit_with_responses(
  client: OpenAI,
  supabase: SupabaseClient,
  prompt: string,
  refs: ImageRef[],
) {
  if (!refs.length) throw new Error("No input images provided.");

  // 1) Download refs from Supabase -> data URLs (no temp files)
  const dataUrls = await Promise.all(
    refs.map(async ({ bucket, path }) => {
      const { data: blob, error } = await supabase.storage.from(bucket).download(path);
      if (error || !blob) {
        throw new Error(`Download failed for ${bucket}/${path}: ${error?.message || "unknown"}`);
      }
      const ab = await blob.arrayBuffer();
      const b64 = Buffer.from(ab).toString("base64");
      const mime = blob.type && blob.type.length > 0 ? blob.type : "image/png";
      console.log("create_image_edit_with_responses mime:", mime);
      return `data:${mime};base64,${b64}`;
    })
  );

  // 2) Call Responses API with image_generation tool
  const response = await client.responses.create({
    model: "gpt-4.1",
    input: [{ 
      role: "user", 
      content: [
        { type: "input_text", text: prompt },
        ...dataUrls.map((image_url) => ({ type: "input_image" as const, image_url, detail: "high" as const })),
      ]
    }],
    tools: [{ type: "image_generation" }],
  });

  // 4) Align with your exact extraction pattern
  const imageData = response.output
    .filter((output: any) => output.type === "image_generation_call")
    .map((output: any) => output.result)
    .filter((result: unknown): result is string => result !== null);

  if (imageData.length > 0) {
    const imageBase64 = imageData[0]; // guaranteed string by the filter
    const filename = `${Date.now()}`;
    const uploadResponse = await uploadB64ImageToSupabase(
      supabase,
      filename,
      imageBase64,
    );
    if (uploadResponse) {
      const { data } = supabase.storage
        .from("mj-photos")
        .getPublicUrl(uploadResponse.path);
      console.log("create_image_with_responses image url:", data.publicUrl);
      return { path: uploadResponse.path, publicUrl: data.publicUrl };
    }
  } else {
    // If the model responded with text instead of an image, surface it
    const msg = response.output?.map((o: any) => o.content || "").join("\n");
    throw new Error(`No image returned. Model said: ${msg || "(no content)"}`);
  }
}

export async function create_image_edit_with_images_api(
  client: OpenAI,
  supabase: SupabaseClient,
  prompt: string,
  refs: ImageRef[],
) {
  if (!refs.length) throw new Error("No input images provided.");

  // 1) Download refs from Supabase -> Files (no temp files)
  const files = await Promise.all(
    refs.map(async ({ bucket, path }) => {
      const { data: blob, error } = await supabase.storage.from(bucket).download(path);
      if (error || !blob) {
        throw new Error(`Download failed for ${bucket}/${path}: ${error?.message || "unknown"}`);
      }
      const ab = await blob.arrayBuffer();
      const mime = blob.type && blob.type.length > 0 ? blob.type : "image/png";
      const filename = path.split("/").pop() || "input.png";
      return await toFile(new Blob([ab], { type: mime }), filename, { type: mime });
    })
  );

  // 2) Call Images API
  const response = await client.images.edit({
    model: "gpt-image-1",
    image: files,
    prompt,
    size: "1536x1024",
  });

  // 3) Grab base64 result
  const image_base64 = response.data?.[0]?.b64_json;
  if (!image_base64) throw new Error("No image returned from Images API.");

  // 4) Use the shared helper for consistency
  const filename = `${Date.now()}.png`;
  const uploadResponse = await uploadB64ImageToSupabase(supabase, filename, image_base64);
  if (!uploadResponse) throw new Error("Upload to Supabase failed.");

  const { data } = supabase.storage.from("mj-photos").getPublicUrl(uploadResponse.path);
  console.log("create_image_edit_with_images_api image url:", data.publicUrl);

  return { path: uploadResponse.path, publicUrl: data.publicUrl };
}
