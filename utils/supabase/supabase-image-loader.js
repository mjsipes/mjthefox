const projectId = 'gjbeonnspjcwyrpgcnuz' // your supabase project id

export default function supabaseLoader({ src, width, quality }) {
  width = 1600;
  return `https://${projectId}.supabase.co/storage/v1/render/image/public/${src}?width=${width}&quality=${quality || 75}&resize=contain`
}