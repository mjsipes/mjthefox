npx supabase gen types typescript --project-id gjbeonnspjcwyrpgcnuz --schema public > utils/supabase/database.types.ts


## technical
best way to serve (width, quality, staticprops, prefetching, supabase image transformations)
squarespace store?
upsacle with const HF_MODEL = "stabilityai/stable-diffusion-x4-upscaler";

## todo
set up a cron job for createDescription_for_all_images

create new function: given a directory in mj-photos, for each image in that directory, for each artist provided in artist array, if ai photo has not been made for that photo with that artist, create the image with image edit, upload to supabase, save parent and artist  to metadata

Andy Warhol
Frida Kahlo
Henri Matisse
Pablo Picasso
Salvador Dalí
Vincent van Gogh

look into error handling + better prettier format

