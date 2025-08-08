/**
 * Image Variation Generator using OpenAI's API
 * 
 * This script downloads an image from Supabase storage, converts it to PNG format,
 * and generates variations using OpenAI's image variation API.
 * 
 * Requirements:
 * - OPENAI_API_KEY must be set in your .env file
 * - Sharp library for image processing (npm install sharp)
 * 
 * Usage:
 *   npx tsx scripts/image-variation.ts
 * 
 * The script will:
 * 1. Download the specified image from Supabase
 * 2. Convert JPEG to PNG and resize if needed (OpenAI requires PNG < 4MB)
 * 3. Generate 2 image variations using OpenAI
 * 4. Output URLs to the generated variations (valid for ~2 hours)
 * 
 * To modify:
 * - Change imageUrl to use different source images
 * - Adjust n: number of variations to generate
 * - Change size: output dimensions
 */

import OpenAI from "openai";
import dotenv from 'dotenv';
import sharp from 'sharp';

// Load environment variables from .env file
dotenv.config();

const openai = new OpenAI();

async function main() {
  const imageUrl = "https://gjbeonnspjcwyrpgcnuz.supabase.co/storage/v1/object/public/mj-photos/everything-else/plane.png";
  
  const response = await fetch(imageUrl);
  const imageBuffer = await response.arrayBuffer();
  
  // Convert to PNG and resize if needed to stay under 4MB
  const pngBuffer = await sharp(Buffer.from(imageBuffer))
    .png()
    .resize(1024, 1024, { fit: 'inside', withoutEnlargement: true })
    .toBuffer();
  
  console.log(`Converted image size: ${(pngBuffer.length / 1024 / 1024).toFixed(2)} MB`);
  
  const image = await openai.images.createVariation({
    image: new File([pngBuffer], "image.png", { type: "image/png" }),
    n: 2,
    size: "1024x1024",
  });
  
  console.log(image.data);
}

main();