
# mjthefox.com 📸✨

**Live:** [https://mjthefox.com/](https://mjthefox.com/)

**Original Squarespace (for comparison):** [https://gar-bassoon-8hk7.squarespace.com/](https://gar-bassoon-8hk7.squarespace.com/)

Happy to share my new photography website :)

Four years ago, I first built a photography site with Squarespace. This summer, I challenged myself to recreate it from scratch by studying how Squarespace loads images through Chrome DevTools and looking at how their files and URLs are organized. Using Next.js and Supabase, I rebuilt the site to achieve the same display quality. Squarespace still sets the benchmark for speed, but I’m experimenting with optimizations like metadata caching and responsive thumbnails to close the gap.

Going beyond a simple rebuild, I used AI to reinterpret my 300 personal photographs in the styles of Andy Warhol, Frida Kahlo, Henri Matisse, Pablo Picasso, Salvador Dalí, and Vincent van Gogh. 

The technical journey shaped much of the project. I used Next.js dynamic API routes to generate my pages and stored all images in Supabase Storage. To organize them, I built a metadata table that links each photo to its attributes and, when applicable, to its parent images—connections that let me track originals alongside AI reinterpretations. I designed the database to be “built for the unknown,” meaning I could preserve dead-end experiments rather than delete them, much like commenting out code instead of removing it entirely.

To streamline the image generation of 1,800 photos, I wrote Node.js scripts that handled every step: creating AI images with OpenAI, uploading them to Supabase, and writing their metadata links to the database. Performance remains the biggest challenge, so I’m continuing to test techniques like caching, storing multiple image sizes, and prefetching.


## Tech Stack
- **Frontend**: [Next.js](https://nextjs.org/) with [TypeScript](https://www.typescriptlang.org/)
- **Backend**: [Supabase](https://supabase.com/) + [Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/)
- **AI**: [OpenAI Images API](https://platform.openai.com/docs/guides/images) for style transfer
- **Hosting**: [Vercel](https://vercel.com/)
