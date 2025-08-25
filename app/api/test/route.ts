import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

// Mini function: Get Supabase photos
async function getSupabasePhotos(folder: string = 'celestial/large') {
  try {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);
    
    const { data: images, error } = await supabase.storage
      .from('mj-photos')
      .list(folder, {
        limit: 100,
        offset: 0,
        sortBy: { column: 'name', order: 'asc' }
      });

    if (error) {
      console.log('Error fetching images:', error);
      return { images: [], error: error.message };
    }
    console.log('Images:', images);
    return { images: images || [], error: null };
  } catch (error) {
    console.log('Unexpected error in getSupabasePhotos:', error);
    return { images: [], error: 'Failed to fetch images' };
  }
}

export async function GET(request: Request) {
  // Test the function and see console output
  const photosResult = await getSupabasePhotos();
  console.log('Photos result:', photosResult);
  
  return NextResponse.json({ message: "test", results:photosResult });
}
