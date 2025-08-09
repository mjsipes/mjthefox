"use client";

import { useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import supabaseLoader from "@/utils/supabase/supabase-image-loader";

export default function GlobalThumbnailPrefetcher() {
  useEffect(() => {
    let isCancelled = false;

    const run = async () => {
      try {
        const supabase = createClient();

        const { data: albums } = await supabase.storage
          .from("mj-photos")
          .list("", { limit: 100 });

        const albumFolders = (albums || []).filter((a) => !a.name.includes("."));

        for (const folder of albumFolders) {
          if (isCancelled) return;
          const { data: images } = await supabase.storage
            .from("mj-photos")
            .list(`${folder.name}/large`, { limit: 1000, sortBy: { column: "name", order: "asc" } });

          const metadata = (images || []).map((item) => ({
            name: item.name,
            url: `mj-photos/${folder.name}/large/${item.name}`,
          }));

          // Prefetch thumbnails at 400px for this album
          metadata.forEach((m) => {
            const url = supabaseLoader({ src: m.url, width: 400, quality: 95 } as any);
            const img = new Image();
            (img as any).fetchPriority = "low";
            img.decoding = "async";
            img.loading = "eager";
            img.src = url;
          });
        }
      } catch (e) {
        console.error("GlobalThumbnailPrefetcher error", e);
      }
    };

    run();
    return () => {
      isCancelled = true;
    };
  }, []);

  return null;
}


