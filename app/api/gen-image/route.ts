import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { getSupabaseImages } from "./supabase-functions";
import OpenAI from "openai";
import { openaiGenImage } from "./openai-functions";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const prompt = searchParams.get("prompt") || "World";

  // const client = new OpenAI();
  // const result = await openaiGenImage(prompt, client);
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  const result = await getSupabaseImages(supabase);

  return NextResponse.json(result);
}
