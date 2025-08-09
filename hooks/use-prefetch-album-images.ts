"use client";

import { useEffect } from "react";
import supabaseLoader from "@/utils/supabase/supabase-image-loader";

type AlbumImageMetadata = { name: string; url: string };

export function usePrefetchAlbumImages(
  albumImageMetadata: AlbumImageMetadata[],
  options?: { width?: number; quality?: number; prioritize?: string[] }
) {
  const targetWidth = Math.min(options?.width ?? 1600, 2400);
  const targetQuality = options?.quality ?? 95;
  const prioritizedNames = options?.prioritize ?? [];

  useEffect(() => {
    if (!albumImageMetadata || albumImageMetadata.length === 0) return;

    // Compute DPR-aware widths to better match <Image /> requests
    const dpr = typeof window !== "undefined" ? Math.min(2, window.devicePixelRatio || 1) : 1;
    const widths = Array.from(new Set([
      Math.round(Math.min(targetWidth, 2400)),
      Math.round(Math.min(targetWidth * dpr, 2400)),
    ])).filter(Boolean) as number[];

    const byName = new Map(albumImageMetadata.map((m) => [m.name, m]));
    const prioritized = prioritizedNames
      .map((n) => byName.get(n))
      .filter(Boolean) as AlbumImageMetadata[];
    const rest = albumImageMetadata.filter((m) => !prioritizedNames.includes(m.name));

    const prefetchList: { meta: AlbumImageMetadata; priority: 'high' | 'low' }[] = [
      ...prioritized.map((m) => ({ meta: m, priority: 'high' as const })),
      ...rest.map((m) => ({ meta: m, priority: 'low' as const })),
    ];

    // Fire-and-forget image prefetch using the same loader as <Image />
    prefetchList.forEach(({ meta, priority }) => {
      widths.forEach((w) => {
        const url = supabaseLoader({
          src: meta.url,
          width: w,
          quality: targetQuality,
        } as any);
        const img = new Image();
        img.decoding = "async";
        (img as any).fetchPriority = priority;
        img.loading = "eager";
        img.src = url;
      });
    });
  }, [albumImageMetadata, prioritizedNames, targetQuality, targetWidth]);
}


