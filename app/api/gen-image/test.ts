// npx tsx --env-file=.env app/api/gen-image/test.ts "A tiny turtle on a surfboard"
// node --env-file=.env --import=tsx app/api/gen-image/test.ts "A tiny turtle on a surfboard"

import OpenAI from "openai";
import { openaiGenImage } from "./openai-functions";
import { createClient } from "@supabase/supabase-js";
import { getSupabaseImages } from "./supabase-functions";
import { SupabaseClient } from "@supabase/supabase-js";
import { generate_image_with_responses } from "./openai-functions";
import { images_as_input } from "./openai-functions";
import { create_image } from "./openai-functions";
import {create_image_edit} from "./openai-functions";
import { uploadLocalJpgToSupabase } from "./supabase-functions";
const prompt = process.argv[2] || "World";
const client = new OpenAI();
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);


// getSupabaseImages(supabase).then(console.log);

async function hi(){
  const { data, error } = await supabase.storage.getBucket("mj-photos");
  console.log(data);
}
// hi();

async function url_to_id(url: string, supabase: SupabaseClient) {

}
async function id_to_url(id: string, supabase: SupabaseClient) {}

// generate_image_with_responses(prompt, client);
// images_as_input(client);
// create_image(prompt, client);
create_image_edit(client,supabase);
// openaiGenImage(prompt, client);
