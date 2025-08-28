npx supabase gen types typescript --project-id gjbeonnspjcwyrpgcnuz --schema public > utils/supabase/database.types.ts


creative things to work on = experiment with sora / dalle in chatgpt / upscaling apis / openai api +

## technical
best way to serve (width, quality, staticprops, prefetching)
squarespace store?

## todo
pick images or responses
set up a cron job - create a function that takes metadata roq, if no description it makes a description, then a function that takes a image, and if no metadata_row it creates a metadatarow. then a function which for all images, makes a metadata row, and a function which for all metadata rows, if no description it makes a ddescription

save metadata 
parent, model, prompt?

image name/album <-> image id <-> image url
image -> all children
image -> root parent


for all images, check if they have metadata, otherwise create a metadata row
for all metadata rows, if no description, generate description

upsacle with const HF_MODEL = "stabilityai/stable-diffusion-x4-upscaler";