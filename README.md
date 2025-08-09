## Mjsipes Photography — Rebuilding My Photo Site

I’ve had a photo website since freshman year of college, originally built on Squarespace. It’s been great, but I’ve reached a point where I want to recreate it myself and push beyond the platform limits.

- **Squarespace site**: [mjthefox.com](https://mjthefox.com/)  
- **New build (WIP)**: [mjthefox.vercel.app](https://mjthefox.vercel.app/)

## Why Rebuild

- **Step 1**: Replicate my existing Squarespace site on my own stack
- **Step 2**: Add features I couldn’t do on Squarespace (custom prefetching strategies, image loader tweaks, dynamic layouts, etc.)

## Stack

- **Framework**: Next.js (App Router, TypeScript)
- **Storage/Auth/CDN**: Supabase
- **UI**: Tailwind + shadcn/ui
- **Hosting**: Vercel

## The Biggest Challenge: Image Delivery That Feels Instant

Squarespace is exceptionally good at serving and prefetching images—clicking between photos feels immediate. Recreating that feel taught me a lot about storage, caching, and responsive images.

What I built:
- **Supabase Storage + Next Image** connected via a custom loader at `utils/supabase/supabase-image-loader.js`
- **Render API** URLs that resize and compress on the edge
- **Album-level prefetching** using hooks like `hooks/use-prefetch-album-images.ts` and a global prefetcher component

This has been a fun feedback loop: tweak code → visually see photos load slower/faster or more/less pixelated → iterate. I’ve spent a lot of time racing my Squarespace site in the Network tab to see which loads faster.

## Image Pipeline (Short Version)

- Source files live in Supabase Storage (bucket: `mj-photos`)
- Next.js `<Image />` uses a custom loader to hit Supabase’s Render endpoint
- Prefetchers warm thumbnails and common DPR sizes ahead of navigation

## Local Dev

1. Clone the repo and install deps
   ```bash
   npm install
   ```
2. Create `.env.local` with your Supabase project values
   ```bash
   NEXT_PUBLIC_SUPABASE_URL=...
   NEXT_PUBLIC_SUPABASE_ANON_KEY=...
   ```
3. Run the dev server
   ```bash
   npm run dev
   ```

Optional: set your Supabase bucket name to `mj-photos` or update references accordingly.

## Live Links

- Squarespace: [mjthefox.com](https://mjthefox.com/)
- New Next.js + Supabase build: [mjthefox.vercel.app](https://mjthefox.vercel.app/)

## What’s Next

- Smarter prefetch strategies per album/device
- Progressive enhancements for low-bandwidth scenarios
- Feature parity with Squarespace galleries, then surpass it
