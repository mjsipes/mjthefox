// npx tsx --env-file=.env --env-file=.env.local app/api/gen-image/test.ts

import OpenAI from "openai";
import { createClient } from "@supabase/supabase-js";
import {create_image_edit_with_responses, create_image_with_images_generate, create_image_with_responses, create_image_edit_with_images_api, image_url_to_text} from "./openai-functions";
import {getImageId_from_image_path, getImageUrl_from_image_id, getImageId_from_url, getImageUrl_from_image_path, getImagePath_from_image_id, getImagePath_from_image_url, createMetadataRow_from_image_url, createMetadataRow_for_all_images, createDescription_from_image_url, createDescription_for_all_images} from "./supabase-functions";
const client = new OpenAI();
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);
const prompt = "please draw: This image appears to be a highly stylized, pop art-inspired depiction of a beach scene. The colors are vivid and unnatural, with a large red sky, a yellow beach, and blue water with some darker shades. The horizon separates the yellow beach and blue water from the intense red sky. The image has a textured, dotted pattern throughout, reminiscent of techniques used in comic book art or works by artists like Roy Lichtenstein. The overall style emphasizes bold, contrasting colors and graphic elements.";

// image_url_to_text(client, "https://gjbeonnspjcwyrpgcnuz.supabase.co/storage/v1/object/public/mj-photos/ai/gpt4-responses-1756165177075.jpg");

// create_image_with_responses(prompt, client, supabase);
// create_image_with_images_generate(prompt, client, supabase);

// create_image_edit_with_responses(client, supabase, "transform into style of monet: ", [
//   { bucket: "mj-photos", path: "half-moon-bay/large/1-IMG_2907.jpg" },
// ]);
// create_image_edit_with_images_api(client, supabase, "transform into style of monet: ", [
//   { bucket: "mj-photos", path: "half-moon-bay/large/1-IMG_2907.jpg" },
// ]);

// getImageId_from_url(supabase, "https://gjbeonnspjcwyrpgcnuz.supabase.co/storage/v1/object/public/mj-photos/ai/basket.png");
// getImageId_from_image_path(supabase, "mj-photos", "ai/basket.png");
// getImageUrl_from_image_id(supabase, "1bf594fa-b5fb-4e69-85cb-3bbd1988ed89"); 
// getImageUrl_from_image_path(supabase, "mj-photos", "ai/basket.png");
// getImagePath_from_image_id(supabase, "1bf594fa-b5fb-4e69-85cb-3bbd1988ed89");
// getImagePath_from_image_url(supabase, "https://gjbeonnspjcwyrpgcnuz.supabase.co/storage/v1/object/public/mj-photos/ai/basket.png");

// createMetadataRow_from_image_url(supabase, "https://gjbeonnspjcwyrpgcnuz.supabase.co/storage/v1/object/public/mj-photos/cloud-9/large/14-IMG_2089.jpg");

// createMetadataRow_for_all_images(supabase); 

// createDescription_from_image_url(client, supabase, "https://gjbeonnspjcwyrpgcnuz.supabase.co/storage/v1/object/public/mj-photos/cloud-9/large/14-IMG_2089.jpg");

createDescription_for_all_images(client, supabase);