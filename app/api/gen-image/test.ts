// npx tsx --env-file=.env --env-file=.env.local app/api/gen-image/test.ts

import OpenAI from "openai";
import { createClient } from "@supabase/supabase-js";
import {create_image_edit_with_responses} from "./openai-functions";

const client = new OpenAI();
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// image_url_to_text(client, "https://gjbeonnspjcwyrpgcnuz.supabase.co/storage/v1/object/public/mj-photos/new-zealand/large/8-IMG_0416.jpg");

// create_image_with_responses("A tiny turtle on a surfboard", client, supabase);
// create_image_with_images_generate("A tiny turtle on a surfboard", client, supabase);

create_image_edit_with_responses(client, supabase, "transform into watercolor painting: ", [
  { bucket: "mj-photos", path: "half-moon-bay/large/1-IMG_2907.jpg" },
]);
