// npx tsx --env-file=.env --env-file=.env.local app/api/gen-image/test.ts

import OpenAI from "openai";
import { createClient } from "@supabase/supabase-js";
import {create_image_edit_with_responses, create_image_with_images_generate, create_image_with_responses} from "./openai-functions";

const client = new OpenAI();
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);
const prompt = "please create an artistic illustration of the following description: The image features a wide-angled view of a bay area with a prominent skyline in the distance. The foreground highlights several ships scattered across the calm waters. The cityscape is set against a backdrop of rolling hills and mountains, partly shrouded in mist, creating a layered effect. The sky is mostly clear with scattered clouds, and the overall color palette is a blend of soft blues and grays, contributing to a tranquil, serene mood. The composition captures the expanse and scale of the city and its natural surroundings, while also highlighting the busy maritime activity.";

// image_url_to_text(client, "https://gjbeonnspjcwyrpgcnuz.supabase.co/storage/v1/object/public/mj-photos/new-zealand/large/8-IMG_0416.jpg");

create_image_with_responses(prompt, client, supabase);
// create_image_with_images_generate(prompt, client, supabase);

// create_image_edit_with_responses(client, supabase, "transform into watercolor painting: ", [
//   { bucket: "mj-photos", path: "half-moon-bay/large/1-IMG_2907.jpg" },
// ]);
