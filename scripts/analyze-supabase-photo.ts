import OpenAI from 'openai';
import fs from 'fs-extra';
import path from 'path';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();


class SupabasePhotoAnalyzer {
  private openai: OpenAI;
  private supabase: any;

  constructor(apiKey: string, supabaseUrl: string, supabaseKey: string) {
    this.openai = new OpenAI({
      apiKey: apiKey,
    });
    
    this.supabase = createClient(supabaseUrl, supabaseKey);
  }

  async analyzePhotoFromUrl(imageUrl: string): Promise<string> {
    try {
      console.log(`Analyzing image from URL: ${imageUrl}`);

      const response = await this.openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "user",
            content: [
              {
                type: "text",
                text: "Please provide a detailed description of this image. Focus on the main subjects, composition, colors, mood, and any notable details. Keep the description concise but informative."
              },
              {
                type: "image_url",
                image_url: {
                  url: imageUrl
                }
              }
            ]
          }
        ],
        max_tokens: 300
      });

      return response.choices[0]?.message?.content || 'No description generated';
    } catch (error) {
      console.error('Error analyzing photo:', error);
      throw error;
    }
  }

  getSupabaseImageUrl(storagePath: string): string {
    const pathParts = storagePath.split('/');
    const bucket = pathParts[0];
    const filePath = pathParts.slice(1).join('/');
    
    const { data } = this.supabase.storage
      .from(bucket)
      .getPublicUrl(filePath);
    
    return data.publicUrl;
  }


  async getStorageObjectId(storagePath: string): Promise<string> {
    try {
      const pathParts = storagePath.split('/');
      const bucket = pathParts[0];
      const filePath = pathParts.slice(1).join('/');

      // Use a SQL query to get the storage object ID
      // Note: We need to use the storage schema, not public
      const { data, error } = await this.supabase
        .rpc('get_storage_object_id', {
          p_bucket: bucket,
          p_name: filePath
        });

      if (error) {
        throw new Error(`Failed to get storage object ID: ${error.message}`);
      }

      if (!data) {
        throw new Error(`Storage object not found: ${storagePath}`);
      }

      return data;
    } catch (error) {
      console.error('Error getting storage object ID:', error);
      throw error;
    }
  }

  async saveDescriptionToDatabase(storagePath: string, description: string): Promise<void> {
    try {
      // Get the storage object ID
      const imageId = await this.getStorageObjectId(storagePath);
      console.log(`Storage object ID: ${imageId}`);

      // Check if metadata already exists
      const { data: existing, error: selectError } = await this.supabase
        .from('image_metadata')
        .select('image_id')
        .eq('image_id', imageId)
        .single();

      if (selectError && selectError.code !== 'PGRST116') { // PGRST116 = no rows found
        throw new Error(`Error checking existing metadata: ${selectError.message}`);
      }

      if (existing) {
        // Update existing record
        const { error: updateError } = await this.supabase
          .from('image_metadata')
          .update({ description })
          .eq('image_id', imageId);

        if (updateError) {
          throw new Error(`Failed to update description: ${updateError.message}`);
        }

        console.log(`Description updated for storage object: ${imageId}`);
      } else {
        // Insert new record
        const { error: insertError } = await this.supabase
          .from('image_metadata')
          .insert({
            image_id: imageId,
            description
          });

        if (insertError) {
          throw new Error(`Failed to insert description: ${insertError.message}`);
        }

        console.log(`Description inserted for storage object: ${imageId}`);
      }
    } catch (error) {
      console.error('Error saving description to database:', error);
      throw error;
    }
  }

  async analyzeAndSaveFromSupabase(storagePath: string): Promise<void> {
    try {
      const filename = path.basename(storagePath);
      console.log(`Analyzing Supabase image: ${filename}`);
      
      // Get the public URL for the image
      const imageUrl = this.getSupabaseImageUrl(storagePath);
      console.log(`Image URL: ${imageUrl}`);
      
      // Analyze the image directly from URL
      const description = await this.analyzePhotoFromUrl(imageUrl);
      console.log(`Generated description: ${description}`);
      
      // Save description to database
      await this.saveDescriptionToDatabase(storagePath, description);
      
      console.log('Analysis complete!');
    } catch (error) {
      console.error('Error in analyzeAndSaveFromSupabase:', error);
      throw error;
    }
  }

  async listImagesInBucket(bucketName: string, folder?: string): Promise<string[]> {
    try {
      const { data, error } = await this.supabase.storage
        .from(bucketName)
        .list(folder || '');

      if (error) {
        throw new Error(`Failed to list images: ${error.message}`);
      }

      return data.map((file: any) => `${bucketName}/${folder ? folder + '/' : ''}${file.name}`);
    } catch (error) {
      console.error('Error listing images:', error);
      throw error;
    }
  }
}

// Main execution function
async function main() {
  // Get command line arguments
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    console.log('Usage: npx tsx scripts/analyze-supabase-photo.ts <storage-path>');
    console.log('Example: npx tsx scripts/analyze-supabase-photo.ts "mj-photos/celestial/large/image.jpg"');
    console.log('Example: npx tsx scripts/analyze-supabase-photo.ts "mj-photos/san-francisco/large/photo.jpeg"');
    process.exit(1);
  }

  const storagePath = args[0];
  
  // Get required environment variables
  const apiKey = process.env.OPENAI_API_KEY;
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!apiKey) {
    console.error('Error: OPENAI_API_KEY environment variable is required');
    console.log('Please set your OpenAI API key:');
    console.log('export OPENAI_API_KEY="your-api-key-here"');
    process.exit(1);
  }

  if (!supabaseUrl || !supabaseKey) {
    console.error('Error: Supabase environment variables are required');
    console.log('Please set your Supabase URL and key:');
    console.log('export NEXT_PUBLIC_SUPABASE_URL="your-supabase-url"');
    console.log('export NEXT_PUBLIC_SUPABASE_ANON_KEY="your-supabase-anon-key"');
    process.exit(1);
  }

  const analyzer = new SupabasePhotoAnalyzer(apiKey, supabaseUrl, supabaseKey);
  
  try {
    await analyzer.analyzeAndSaveFromSupabase(storagePath);
  } catch (error) {
    console.error('Failed to analyze photo:', error);
    process.exit(1);
  }
}

// Run the script if called directly
if (require.main === module) {
  main();
}

export { SupabasePhotoAnalyzer }; 