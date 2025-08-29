# mjthefox.com 📸✨

**Live App: https://mjthefox.com/**
https://mjthefox.vercel.app/
https://mjthefox.com/
https://gar-bassoon-8hk7.squarespace.com/


## The Journey Behind the Tech
4 years ago i created a photo website.
with squarespace
coming of age to code from scratch
supabase + nextjs
two step process for my app. step 
1: recreate my squarespace website. 
2: add to it in ways I was incapable of previously
spent a lot of time wrestling with quality vs speed and prefetching to match squarespace in speed and quality
give squarespace props
my app is still not at that point
did have a very beutiful display so happy about that.
then decided to explore ways I would want to improve on my website
love ai gen images, dallee might have been my first exposure to gen-ai and drew me away from photography softmore year and closer to my computer science + ml study.
openai has two options: images endpoint and responses endpoint
talk about databse archtecture, building for the unkown,
success i did it!


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

creating a nondestructive database that grows with my project. we do not know how this app will transform, but never deleting from the database ex? large and small.

### AI Integration: Images vs Responses Endpoints
[Detail your OpenAI integration choices and learnings]

## What I'm Proud Of
- **Performance Optimization**: [Specific metrics/improvements]
- **Custom Image Pipeline**: [Your unique approach]
cool idea of style transfer for images
better understanding of caching in browser / network tab / hard reloads



## Whats Next
- image format / using file system . basae64.