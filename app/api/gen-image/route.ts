import { NextResponse } from "next/server";
import { openaiGenImage } from "./openai-gen-image";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const prompt = searchParams.get('prompt') || 'World';

  const result = await openaiGenImage(prompt);

  return NextResponse.json(result);
}
