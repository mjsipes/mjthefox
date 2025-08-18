// npx tsx --env-file=.env app/api/gen-image/test.ts "A tiny turtle on a surfboard"
// node --env-file=.env --import=tsx app/api/gen-image/test.ts "A tiny turtle on a surfboard"

import OpenAI from "openai";
import { openaiGenImage } from "./openai-functions";
import { createClient } from "@supabase/supabase-js";
import { getSupabaseImages } from "./supabase-functions";

const prompt = process.argv[2] || "World";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
// getSupabaseImages(supabase).then(console.log);
async function hi(){

  const { data, error } = await supabase.storage.getBucket("mj-photos");
  console.log(data);
}

hi();
// const client = new OpenAI();
// openaiGenImage(prompt, client);
