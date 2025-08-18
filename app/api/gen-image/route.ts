import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

async function getSupabasePhotos() {
  try {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);
    
    const { data: images, error } = await supabase.storage
      .from('mj-photos')
      .list('celestial/large', {
        limit: 100,
        offset: 0,
        sortBy: { column: 'name', order: 'asc' }
      });

    if (error) {
      console.log('Error fetching images:', error);
      return { images: [], error: error.message };
    }

    return { images: images || [], error: null };
  } catch (error) {
    console.log('Unexpected error in getSupabasePhotos:', error);
    return { images: [], error: 'Failed to fetch images' };
  }
}

async function queryOpenAI() {
  try {
    const openaiApiKey = process.env.OPENAI_API_KEY;
    if (!openaiApiKey) {
      return { weatherInfo: null, error: 'OpenAI API key not configured' };
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openaiApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'user',
            content: 'What is the weather like today? Give me a brief, friendly response.'
          }
        ],
        max_tokens: 100
      })
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    const weatherInfo = data.choices[0]?.message?.content || 'No weather info available';
    
    return { weatherInfo, error: null };
  } catch (error) {
    console.log('Error querying OpenAI:', error);
    return { weatherInfo: null, error: 'Failed to get weather info' };
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const name = searchParams.get('name') || 'World';
  
  const [photosResult, openaiResult] = await Promise.all([
    getSupabasePhotos(),
    queryOpenAI()
  ]);

  return NextResponse.json({
    message: `Hello ${name}!`,
    photos: photosResult.images,
    weatherInfo: openaiResult.weatherInfo,
    errors: {
      photos: photosResult.error,
      openai: openaiResult.error
    }
  });
}
