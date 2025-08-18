import { NextResponse } from "next/server";
import { getSupabasePhotos } from "../test/route";


export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const name = searchParams.get('name') || 'World';
  
  const [photosResult] = await Promise.all([
    getSupabasePhotos(),
  ]);

  return NextResponse.json({
    message: `Hello ${name}!`,
    photos: photosResult.images,
    errors: {
      photos: photosResult.error,
    }
  });
}
