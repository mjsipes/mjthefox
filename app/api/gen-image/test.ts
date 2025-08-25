// npx tsx --env-file=.env --env-file=.env.local app/api/gen-image/test.ts "A tiny turtle on a surfboard"
// node --env-file=.env --env-file=.env.local --import=tsx app/api/gen-image/test.ts "A tiny turtle on a surfboard"

import OpenAI from "openai";
import { SupabaseClient } from "@supabase/supabase-js";
import { createClient } from "@supabase/supabase-js";
import { getSupabaseImages } from "./supabase-functions";
import { create_image_with_responses } from "./openai-functions";
import { image_url_to_text } from "./openai-functions";
import { create_image_with_images_generate } from "./openai-functions";
import {create_image_edit_with_responses} from "./openai-functions";
import { uploadLocalJpgToSupabase } from "./supabase-functions";

const prompt = process.argv[2] || "World";
const client = new OpenAI();
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// async function url_to_id(url: string, supabase: SupabaseClient) {}
// async function id_to_url(id: string, supabase: SupabaseClient) {}

// create_image_with_responses(prompt, client, supabase);
// image_url_to_text(client, "https://gjbeonnspjcwyrpgcnuz.supabase.co/storage/v1/object/public/mj-photos/new-zealand/large/8-IMG_0416.jpg");
// create_image_with_images_generate(prompt, client, supabase);
// openaiGenImage_deprecated(prompt, client);

create_image_edit_with_responses(client, supabase, "create a cool photo montage landscape photo of the following images: ", [
  { bucket: "mj-photos", path: "half-moon-bay/large/1-IMG_2907.jpg" },
  { bucket: "mj-photos", path: "half-moon-bay/large/2-IMG_2904.jpg" },
  { bucket: "mj-photos", path: "half-moon-bay/large/3-DJI_0153.jpg" },
]);
