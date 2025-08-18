// npx tsx --env-file=.env app/api/gen-image/test.ts "A tiny turtle on a surfboard"
// node --env-file=.env --import=tsx app/api/gen-image/test.ts "A tiny turtle on a surfboard"

import { createClient } from "@supabase/supabase-js";
import { openaiGenImage } from "./openai-gen-image";
import { getSupabaseImages } from "./supabase-get-all-images";
import OpenAI from "openai";

const prompt = process.argv[2] || "World";

// const supabase = createClient(
//   process.env.NEXT_PUBLIC_SUPABASE_URL!,
//   process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
// );
// getSupabaseImages(supabase).then(console.log);

const client = new OpenAI();
openaiGenImage(prompt, client)
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
