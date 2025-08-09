"use client";

import { useEffect } from "react";
import supabaseLoader from "@/utils/supabase/supabase-image-loader";

type AlbumImageMetadata = { name: string; url: string };

export function usePrefetchAlbumImages(
  albumImageMetadata: AlbumImageMetadata[],
  options?: { width?: number; quality?: number }
) {
  const targetWidth = Math.min(options?.width ?? 1600, 2400);
  const targetQuality = options?.quality ?? 95;

  useEffect(() => {
    if (!albumImageMetadata || albumImageMetadata.length === 0) return;

    // Compute DPR-aware widths to better match <Image /> requests
    const dpr = typeof window !== "undefined" ? Math.min(2, window.devicePixelRatio || 1) : 1;
    const widths = Array.from(new Set([
      Math.round(Math.min(targetWidth, 2400)),
      Math.round(Math.min(targetWidth * dpr, 2400)),
    ])).filter(Boolean) as number[];

    // Fire-and-forget image prefetch using the same loader as <Image />
    albumImageMetadata.forEach((meta) => {
      widths.forEach((w) => {
        const url = supabaseLoader({
          src: meta.url,
          width: w,
          quality: targetQuality,
        } as any);
        const img = new Image();
        img.decoding = "async";
        (img as any).fetchPriority = 'low';
        img.loading = "eager";
        img.src = url;
      });
    });
  }, [albumImageMetadata, targetQuality, targetWidth]);
}


