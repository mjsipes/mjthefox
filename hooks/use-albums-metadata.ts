import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";

/**
 * Custom hook to fetch and cache albums metadata from Supabase storage.
 * 
 * Fetches all albums from the 'mj-photos' bucket and gets the first image from each album.
 * Caches results in sessionStorage to avoid repeated API calls.
 * Returns array of album objects with name, firstImageUrl properties.
 * 
 * @returns Object containing albums array and loading state
 */
export function useAlbumsMetadata() {
  console.log("useAlbumsMetadata called");
  const [albumsMetadata, setAlbumsMetadata] = useState<{name: string, firstImageUrl: string}[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cached = sessionStorage.getItem('albums-metadata');
  
    if (cached) {
      const cachedMetadata = JSON.parse(cached);
      setAlbumsMetadata(cachedMetadata);
      setLoading(false);
    } else {
      const supabase = createClient();
      
      // First, get all folders (albums) from the root of mj-photos bucket
      supabase.storage
        .from("mj-photos")
        .list('', { limit: 100 })
        .then(async ({ data, error }) => {
          if (error) {
            console.error("Storage Error:", error);
            setLoading(false);
            return;
          }

          // Filter out files, keep only folders
          const folders = (data || []).filter(item => !item.name.includes('.'));
          
          // For each folder, get the first image from the large subfolder
          const albumPromises = folders.map(async (folder) => {
            const { data: images, error: imagesError } = await supabase.storage
              .from("mj-photos")
              .list(`${folder.name}/large`, { limit: 1, sortBy: { column: 'name', order: 'asc' } });
            
            if (imagesError || !images || images.length === 0) {
              return null;
            }

            const firstImage = images[0];
            return {
              name: folder.name,
              firstImageUrl: `mj-photos/${folder.name}/large/${firstImage.name}`
            };
          });

          const albums = await Promise.all(albumPromises);
          const validAlbums = albums.filter(album => album !== null) as {name: string, firstImageUrl: string}[];
          
          setAlbumsMetadata(validAlbums);
          sessionStorage.setItem('albums-metadata', JSON.stringify(validAlbums));
          setLoading(false);
        });
    }
  }, []);

  console.log("albumsMetadata: ", albumsMetadata);

  return { albumsMetadata, loading };
}
