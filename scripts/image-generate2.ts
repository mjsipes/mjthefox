/**
 * Image Generator 2 using OpenAI's Response API
 * 
 * This script generates new images from text prompts using OpenAI's response API
 * with image generation tools.
 * 
 * Requirements:
 * - OPENAI_API_KEY must be set in your .env file
 * 
 * Usage:
 *   npx tsx scripts/image-generate2.ts "Generate an image of gray tabby cat hugging an otter with an orange scarf"
 *   npx tsx scripts/image-generate2.ts "Create a magical forest with glowing mushrooms"
 * 
 * The script will:
 * 1. Take a text input as a command line argument
 * 2. Generate an image using GPT-4.1-mini with image generation tools
 * 3. Save the result as "otter.png" locally
 * 
 * To modify:
 * - Change the model (gpt-4.1-mini, etc.)
 * - Adjust the tools or input format
 * - Change the output filename (currently "otter.png")
 */

import OpenAI from "openai";
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const openai = new OpenAI();

async function main() {
  // Get input from command line arguments
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    console.log('Usage: npx tsx scripts/image-generate2.ts "your image prompt here"');
    console.log('Example: npx tsx scripts/image-generate2.ts "Generate an image of gray tabby cat hugging an otter with an orange scarf"');
    process.exit(1);
  }

  const input = args.join(' '); // Join all arguments as the input
  console.log(`🎨 Generating image with input: "${input}"`);

  try {
    const response = await openai.responses.create({
      model: "gpt-4.1-mini",
      input: input,
      tools: [{type: "image_generation"}],
    });

    // Save the image to a file
    const imageData = response.output
      .filter((output) => output.type === "image_generation_call")
      .map((output) => output.result);

    if (imageData.length > 0) {
      const imageBase64 = imageData[0];
      if (imageBase64) {
        const fs = await import("fs");
        fs.writeFileSync("otter.png", Buffer.from(imageBase64, "base64"));
        
        console.log('✅ Generated image saved as otter.png');
      } else {
        console.log('⚠️ Image data is empty');
      }
    } else {
      console.log('⚠️ No image generation results found in response');
    }
    
  } catch (error) {
    console.error('❌ Error generating image:', error);
    
    // Provide helpful suggestions
    if (error instanceof Error) {
      console.log('\n💡 This might be because:');
      console.log('   - The responses.create() API might not be available in this SDK version');
      console.log('   - The gpt-4.1-mini model might not support this feature yet');
      console.log('   - Try using the standard image generation instead:');
      console.log('     npx tsx scripts/image-generate.ts "your prompt"');
    }
    
    process.exit(1);
  }
}

main();