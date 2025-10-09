"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import supabaseLoader from "@/utils/supabase/supabase-image-loader";
import { ImageLoader } from "next/image";
import { useAlbumImagesMetadata } from "@/hooks/use-album-images-metadata";
import { useInvert } from "@/components/invert-provider";
import { useArtistImage } from "@/hooks/use-artist-image";

function AlbumImage({ item, albumName, index }: { item: { url: string; name: string }, albumName: string, index: number }) {
  const { inverted } = useInvert();
  const { imageUrl } = useArtistImage(item.url);

  return (
    <Link
      href={`/${albumName}/${item.name}`}
      className="relative w-full block hover:opacity-90"
    >
      <Image
        loader={supabaseLoader as ImageLoader}
        src={imageUrl || item.url}
        alt={`Image ${index + 1}`}
        width={800}
        height={600}
        quality={95}
        className={`object-cover w-full h-auto ${inverted ? 'invert' : ''}`}
      />
    </Link>
  );
}

export default function AlbumGrid({
  albumName,
}: {
  albumName: string;
}) {
  const { albumImageMetadata } = useAlbumImagesMetadata(albumName);
  const router = useRouter();

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
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-4">
      {
        albumImageMetadata.map((item, i) => (
          <AlbumImage 
            key={i}
            item={item}
            albumName={albumName}
            index={i}
          />
        ))
      }
    </div>
  );
}
