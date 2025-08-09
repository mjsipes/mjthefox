"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import supabaseLoader from "@/utils/supabase/supabase-image-loader";
import { ImageLoader } from "next/image";
import { useAlbumImagesMetadata } from "@/hooks/use-album-images-metadata";
import { useInvert } from "@/components/invert-provider";
import { usePrefetchAlbumImages } from "@/hooks/use-prefetch-album-images";

export default function AlbumGrid({
  albumName,
}: {
  albumName: string;
}) {
  const { albumImageMetadata } = useAlbumImagesMetadata(albumName);
  const router = useRouter();
  const { inverted } = useInvert();
  // Prefetch large images for instant navigation within album
  usePrefetchAlbumImages(albumImageMetadata, { width: 1600 });
  // Prefetch thumbnails for fast grid renders and revisits
  usePrefetchAlbumImages(albumImageMetadata, { width: 400 });

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        router.push('/');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [router]);

  return (
    <div className="grid grid-cols-2 gap-4 p-4">
      {
        albumImageMetadata.map((item, i) => (
          <Link
            key={i}
            href={`/${albumName}/${item.name}`}
            className="relative w-full block hover:opacity-90 transition-opacity"
          >
            <Image
              loader={supabaseLoader as ImageLoader}
              src={item.url}
              alt={`Image ${i + 1}`}
              width={400}
              height={300}
              quality={95}
              className={`object-cover w-full h-auto ${inverted ? 'invert' : ''}`}
            />
          </Link>
        ))
      }
    </div>
  );
}
