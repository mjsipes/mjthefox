const projectId = 'gjbeonnspjcwyrpgcnuz' // your supabase project id

export default function supabaseLoader({ src, width, quality }) {
  const MAX_WIDTH = 2400
  const w = Math.min(width || MAX_WIDTH, MAX_WIDTH)
  const q = quality ?? 95
  return `https://${projectId}.supabase.co/storage/v1/render/image/public/${src}?width=${w}&quality=${q}&resize=contain`
}