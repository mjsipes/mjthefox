import AlbumGrid from "../../components/AlbumGrid";
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
  
  return albums
    .filter(album => album.name && album.name !== '.emptyFolderPlaceholder')
    .map(album => ({
      albumName: album.name
    }));
}

export default async function Albums({
  params,
}: {
  params: Promise<{ albumName: string }>;
}) {
  const { albumName } = await params;

  return <AlbumGrid albumName={albumName} />;
}
