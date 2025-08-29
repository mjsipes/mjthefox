# mjthefox.com 📸✨

**Live App: https://mjthefox.com/**
https://mjthefox.vercel.app/
https://mjthefox.com/
https://gar-bassoon-8hk7.squarespace.com/


## The Journey Behind the Tech
4 years ago i created a photo website
now it is my coming of age / time to create from scratch
used nextjs / supabase
image quality and size versus image speed tradeoff
-supabase transformations / nextjs Image components / supabase nextjs image loader
-prefetching html versus remote links, getstaticprops, squarespace does a great job at this, hard to replicate and not good documentation online for best practices. struggled with trying to use the framework versus going rogue
- openai images versus responses endpoint
- caching in browser / network tab / hard reloads
- image format / using file system . basae64.
- image transformations on the fly = wrong

creating a nondestructive database that grows with my project. we do not know how this app will transform, but never deleting from the database ex? large and small.
prefetching

cool idea of style transfer for images

## Tech Stack
- **Frontend**: [Next.js](https://nextjs.org/) with [TypeScript](https://www.typescriptlang.org/)
- **Backend**: [Supabase](https://supabase.com/) + [Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/)
- **AI**: [OpenAI Images API](https://platform.openai.com/docs/guides/images) for style transfer
- **Hosting**: [Vercel](https://vercel.com/)

## Technical Challenges & Solutions

### The Image Performance Puzzle: Quality vs Speed
[This seems like your biggest technical story - expand on:]
- Supabase transformations vs Next.js Image components
- Browser caching strategies and network optimization
- Image format decisions and file system vs base64
- Why "image transformations on the fly = wrong"

### Prefetching Strategy: Framework vs Custom Solutions
[Expand on your struggles with:]
- getStaticProps implementation
- HTML prefetching vs remote links
- Learning from Squarespace's approach
- When to use the framework vs "going rogue"

### Database Architecture: Building for the Unknown
[Expand on your "nondestructive database" philosophy:]
- Why you never delete data
- Planning for app evolution
- Database design decisions

### AI Integration: Images vs Text Endpoints
[Detail your OpenAI integration choices and learnings]

## What I'm Proud Of
- **Performance Optimization**: [Specific metrics/improvements]
- **Custom Image Pipeline**: [Your unique approach]
- **Style Transfer Experiments**: [Cool AI features]









