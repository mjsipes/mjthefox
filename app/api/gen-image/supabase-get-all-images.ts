// npx tsx --env-file=.env app/api/gen-image/supabase-get-all-images.ts
// node --env-file=.env --import=tsx app/api/gen-image/supabase-get-all-images.ts

import { SupabaseClient } from "@supabase/supabase-js";

export async function getSupabaseImages(supabase: SupabaseClient) {
  const { data } = await supabase.storage
    .from('mj-photos')
    .list('celestial/large');
  return data;
}