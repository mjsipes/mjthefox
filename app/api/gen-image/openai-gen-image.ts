// node --env-file=.env --import=tsx app/api/gen-image/openai-gen-image.ts

import OpenAI from "openai";

const client = new OpenAI();

export async function openaiGenImage(prompt: string = "World") {
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