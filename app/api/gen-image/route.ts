import { NextResponse } from "next/server";
import { getSupabasePhotos } from "../test/route";
import OpenAI from "openai";

const client = new OpenAI();


export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const prompt = searchParams.get('prompt') || 'World';
  
  const img = await client.images.generate({
    model: "gpt-image-1",
    prompt: prompt,
    n: 1,
    size: "1024x1024",
  });
  console.log('Image:', img);
  return NextResponse.json({
    message: `Hello ${prompt}!`,
    image: img.data?.[0]?.url,
  });
}
