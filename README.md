# mjthefox.com 📸✨

**Live:** [https://mjthefox.com/](https://mjthefox.com/)

**Original Squarespace (for comparison):** [https://gar-bassoon-8hk7.squarespace.com/](https://gar-bassoon-8hk7.squarespace.com/)

**Github:** [https://github.com/mjsipes/mjthefox](https://github.com/mjsipes/mjthefox)

Four years ago, during COVID, I built [this Squarespace site](https://gar-bassoon-8hk7.squarespace.com/) to share my astrophotography with friends and family. Anyone who knows me knows how much I care about this collection. Over the years, I modified and expanded the site, but this summer I began a new evolution of my photo website.

This evolution meant leaving Squarespace behind and creating the site from the ground up. As a CS major, this felt like a bit of a coming-of-age project. Building from scratch was both exciting and challenging. Along the way I faced several tough decisions—like choosing between a structured or unstructured storage layout, trading off optimized image speed versus guaranteed quality, and deciding whether to lean on the OpenAI Images endpoint or the newer Responses endpoint for generation. And there are still open questions I’m experimenting with, like how best to prefetch images efficiently.

I studied how Squarespace loads images through Chrome DevTools and set that as my benchmark for speed and quality. I’ve managed to match the display quality, though Squarespace still wins on raw speed. To close the gap, I’m currently experimenting with tricks like image metadata caching, responsive thumbnails, and prefetching.

Squarespace has its strengths—beautiful templates, polished components, and incredible performance. I don’t plan to shut down my old site; instead, I see this as a passing of the torch. My new site gives me something Squarespace never could: fine-grained control over my photos and the freedom to experiment.

That freedom has already led me in new directions. Inspired by my first exposure to AI through DALL-E (which actually nudged me toward CS and machine learning), **I programmatically transformed ~300 of my personal photographs in the styles of Andy Warhol, Frida Kahlo, Henri Matisse, Pablo Picasso, Salvador Dalí, and Vincent van Gogh. In total, I generated ~1,800 images for about $120 in API credits.** I’m deeply proud of this project—it feels like a milestone in my journey, and I’m excited to share it with you.

---

## Tech Stack

* **Frontend**: [Next.js](https://nextjs.org/) with [TypeScript](https://www.typescriptlang.org/)
* **Backend**: [Supabase](https://supabase.com/) + [Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
* **Styling**: [Tailwind CSS](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/)
* **AI**: [OpenAI Images API](https://platform.openai.com/docs/guides/images) for style transfer
* **Hosting**: [Vercel](https://vercel.com/)

