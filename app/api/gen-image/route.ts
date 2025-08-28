import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import OpenAI from "openai";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const prompt = searchParams.get("prompt") || "World";

  // const client = new OpenAI();
  // const result = await openaiGenImage(prompt, client);
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  return NextResponse.json({ message: "Hello, world!" });
}
