// node --env-file=.env --import=tsx app/api/gen-image/openai-gen-image.ts
import { writeFile } from "fs/promises";
import OpenAI, { toFile } from "openai";
import fs from "fs";
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

  const imageData = response.output
    .filter((output) => output.type === "image_generation_call")
    .map((output) => output.result)
    .filter((result): result is string => result !== null); // ✅ removes null

  if (imageData.length > 0) {
    const imageBase64 = imageData[0]; // now guaranteed string
    const filename = `gpt4-responses-${Date.now()}`;
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

export async function create_image_with_images_generate(
  prompt: string,
  client: OpenAI,
  supabase: SupabaseClient
) {
  console.log("create_image_with_images_generate prompt:", prompt);
  const img = await client.images.generate({
    model: "dall-e-3",
    prompt: prompt,
    n: 1,
    size: "1024x1024",
    response_format: "b64_json",
  });
  console.log("create_image_with_images_generate img:", img);

  const image_base64 = img.data?.[0]?.b64_json;
  if (image_base64) {
    const filename = `dalle3-${Date.now()}`;
    const uploadResponse = await uploadB64ImageToSupabase(supabase, filename, image_base64);
    if (uploadResponse) {
      const { data } = supabase.storage.from("mj-photos").getPublicUrl(uploadResponse.path);
      console.log("create_image_with_images_generate image url:", data.publicUrl);
    }
  }
}

export async function create_image_edit(
  client: OpenAI,
  supabase: SupabaseClient
) {
  console.log("creating image edit");
  const imageFiles = ["horse.jpg"];

  const images = await Promise.all(
    imageFiles.map(
      async (file) =>
        await toFile(fs.createReadStream(file), null, {
          type: "image/png",
        })
    )
  );

  const rsp = await client.images.edit({
    model: "gpt-image-1",
    image: images,
    prompt: "turn this into a watercolor painting",
  });

  const image_base64 = rsp.data?.[0]?.b64_json;
  if (image_base64) {
    const filename = `gpt-image-1-${Date.now()}`;
    const uploadResponse = await uploadB64ImageToSupabase(supabase, filename, image_base64);
    if (uploadResponse) {
      const { data } = supabase.storage.from("mj-photos").getPublicUrl(uploadResponse.path);
      console.log("create_image_edit image url:", data.publicUrl);
    }
  }
}

//model: "gpt-image-1"
export async function openaiGenImage_deprecated(
  prompt: string = "World",
  client: OpenAI
) {
  const img = await client.images.generate({
    model: "gpt-image-1",
    prompt,
    n: 1,
    size: "1024x1024",
  });
  console.log("Image:", img);
  return {
    message: `Hello ${prompt}!`,
    image: img.data?.[0]?.url,
  };
}