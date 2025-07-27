import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";

/**
 * Custom hook to fetch and cache album image metadata from Supabase storage.
 * 
 * Fetches image metadata from the 'mj-photos' bucket in the specified album's 'large' folder.
 * Caches results in sessionStorage to avoid repeated API calls.
 * Returns array of image objects with name and url properties.
 * 
 * @param albumName - The name of the album to fetch images from
 * @returns Object containing images array and loading state
 */
export function useAlbumImagesMetadata(albumName: string) {
  const [albumImageMetadata, setAlbumImageMetadata] = useState<{name: string, url: string}[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cached = sessionStorage.getItem(`album-grid-${albumName}`);

    if (cached) {
      const cachedMetadata = JSON.parse(cached);
      setAlbumImageMetadata(cachedMetadata);
      setLoading(false);
    } else {
      const supabase = createClient();
      supabase.storage
        .from("mj-photos")
        .list(`${albumName}/large`)
        .then(({ data, error }) => {
          if (error) {
            console.error("Storage Error:", error);
          }
          const metadata = data?.map((item) => ({
            name: item.name,
            url: `mj-photos/${albumName}/large/${item.name}`,
          })) || [];
          
          setAlbumImageMetadata(metadata);
          sessionStorage.setItem(`album-grid-${albumName}`, JSON.stringify(metadata));
          setLoading(false);
        });
    }
  }, [albumName]);

  return { albumImageMetadata, loading };
} 