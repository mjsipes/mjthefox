import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const name = searchParams.get('name') || 'World';
  
  try {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);
    
    // List all files in the mj-photos bucket
    const { data: images, error } = await supabase.storage
      .from('mj-photos')
      .list(`${name}/large`, {
        limit: 100,
        offset: 0,
        sortBy: { column: 'name', order: 'asc' }
      });

    if (error) {
      console.log('Error fetching images:', error);
      return NextResponse.json({ 
        message: `Hello ${name}!`,
        images: [],
        error: error.message 
      });
    }

    return NextResponse.json({ 
      message: `Hello ${name}!`,
      images: images || []
    });
    
  } catch (error) {
    console.log('Unexpected error:', error);
    return NextResponse.json({ 
      message: `Hello ${name}!`,
      images: [],
      error: 'Failed to fetch images'
    });
  }
}
