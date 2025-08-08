/**
 * Image Generator using OpenAI's API
 * 
 * This script generates new images from text prompts using OpenAI's image generation API.
 * 
 * Requirements:
 * - OPENAI_API_KEY must be set in your .env file
 * 
 * Usage:
 *   npx tsx scripts/image-generate.ts "A cute baby sea otter"
 *   npx tsx scripts/image-generate.ts "A majestic mountain landscape at sunset"
 * 
 * The script will:
 * 1. Take a text prompt as a command line argument
 * 2. Generate an image using OpenAI's DALL-E 3 model
 * 3. Output the image URL (valid for ~2 hours)
 * 
 * To modify:
 * - Change the model (dall-e-3, dall-e-2, etc.)
 * - Adjust the size or number of images
 */

import OpenAI from "openai";
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const client = new OpenAI();

async function main() {
  // Get prompt from command line arguments
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    console.log('Usage: npx tsx scripts/image-generate.ts "your prompt here"');
    console.log('Example: npx tsx scripts/image-generate.ts "A cute baby sea otter"');
    process.exit(1);
  }

  const prompt = args.join(' '); // Join all arguments as the prompt
  console.log(`🎨 Generating image for prompt: "${prompt}"`);

  try {
    const img = await client.images.generate({
      model: "gpt-image-1",
      prompt: prompt,
      n: 1,
      size: "1024x1024"
    });

    if (!img.data[0]) {
      throw new Error('No image data received from OpenAI');
    }

    const firstImage = img.data[0];
    
    if (firstImage.url) {
      console.log('✅ Generated image URL:', firstImage.url);
    } else if (firstImage.b64_json) {
      console.log('⚠️ Received base64 format instead of URL. The image was generated but no URL is available.');
    } else {
      throw new Error('No valid image format received from OpenAI');
    }
    
    console.log(`📝 Prompt used: "${prompt}"`);
    
  } catch (error) {
    console.error('❌ Error generating image:', error);
    process.exit(1);
  }
}

main();