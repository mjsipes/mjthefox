npx supabase gen types typescript --project-id gjbeonnspjcwyrpgcnuz --schema public > utils/supabase/database.types.ts


creative things to work on = experiment with sora / dalle in chatgpt / upscaling apis / openai api +

## technical
best way to serve (width, quality, staticprops, prefetching)
squarespace store?

## todo
set up a cron job for createDescription_for_all_images

create new function to programmatically create for. we will need to add a column to metadata for the style

given a directory in mj-photos, for each image in that directory, for each artist provided in artist array, if ai photo has not been made for that photo with that artist, create the image with image edit, upload to supabase, save parent and style to metadata

Andy Warhol
Frida Kahlo
Henri Matisse
Pablo Picasso
Salvador Dalí
Vincent van Gogh

think about how we want to display these images

upsacle with const HF_MODEL = "stabilityai/stable-diffusion-x4-upscaler";

