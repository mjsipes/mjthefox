# Photo Analysis Scripts

These scripts use OpenAI's GPT-4 Vision API to analyze photos and generate descriptions. They support both local files and images stored in Supabase storage.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Set your OpenAI API key as an environment variable:
```bash
export OPENAI_API_KEY="your-api-key-here"
```

3. Set your Supabase environment variables (for Supabase scripts):
```bash
export NEXT_PUBLIC_SUPABASE_URL="your-supabase-url"
export NEXT_PUBLIC_SUPABASE_ANON_KEY="your-supabase-anon-key"
```

## Usage

### Local Files

#### Basic usage:
```bash
# Using npm script (recommended)
npm run analyze-photo <image-path>
```

#### Example:
```bash
npm run analyze-photo ./public/turtle.jpeg
```

#### With custom output file:
```bash
npm run analyze-photo ./public/turtle.jpeg my-descriptions.json
```

### Supabase Storage

#### Analyze images from Supabase:
```bash
npm run analyze-supabase-photo <storage-path>
```

#### Examples:
```bash
# Analyze celestial photography
npm run analyze-supabase-photo "mj-photos/celestial/large/1-988630D794F4C95B7DCFB68989B8E113.jpg"

# Analyze travel photos
npm run analyze-supabase-photo "mj-photos/san-francisco/large/golden-gate.jpg"
npm run analyze-supabase-photo "mj-photos/kauai/large/beach-sunset.jpg"

# Analyze nature photography
npm run analyze-supabase-photo "mj-photos/yosemite/large/half-dome.jpg"
npm run analyze-supabase-photo "mj-photos/joshua-tree/large/desert-rocks.jpg"

# Analyze home and family photos
npm run analyze-supabase-photo "mj-photos/home/large/family-dinner.jpg"
```

## Output

The script will:
1. Analyze the image using OpenAI's GPT-4 Vision API
2. Generate a detailed description
3. Save the description to your Supabase `image_metadata` table

### Database Output
The script inserts/updates records in your `image_metadata` table:
```sql
-- Example result
SELECT 
  so.name as photo_path,
  im.description,
  im.created_at
FROM storage.objects so
JOIN image_metadata im ON so.id = im.image_id
WHERE so.name = 'celestial/large/1-988630D794F4C95B7DCFB68989B8E113.jpg';
```

Result:
```
photo_path: celestial/large/1-988630D794F4C95B7DCFB68989B8E113.jpg
description: The image captures a comet streaking through a star-filled night sky...
created_at: 2025-08-02T08:55:44.939Z
```

## Supported Image Formats

- JPEG (.jpg, .jpeg)
- PNG (.png)
- GIF (.gif)
- WebP (.webp)
- BMP (.bmp)

## Error Handling

The scripts include error handling for:
- Missing image files
- Invalid API keys
- Network errors
- File system errors
- Supabase storage errors 