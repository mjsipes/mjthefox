import ImageView from "../../../components/ImageView";
import { createClient } from "@supabase/supabase-js";

export async function generateStaticParams() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
  
  // Get all albums
  const { data: albums } = await supabase
    .storage
    .from('mj-photos')
    .list('', { limit: 1000 });
  
  if (!albums) return [];
  
  const params: { albumName: string; imageName: string }[] = [];
  
  // For each album, get all images
  for (const album of albums) {
    if (album.name && album.name !== '.emptyFolderPlaceholder') {
      const { data: images } = await supabase
        .storage
        .from('mj-photos')
        .list(`${album.name}/large`, { limit: 1000 });
      
      if (images) {
        images.forEach(image => {
          if (image.name && !image.name.startsWith('.')) {
            params.push({
              albumName: album.name,
              imageName: image.name
            });
          }
        });
      }
    }
  }
  
  return params;
}

export default async function ImagePage({
  params,
}: {
  params: Promise<{ albumName: string; imageName: string }>;
}) {
  const { albumName, imageName } = await params;

  return <ImageView albumName={albumName} imageName={imageName} />;
}
