"use client";

import { useEffect } from "react";
import Image, { ImageLoader } from "next/image";
import { useRouter } from "next/navigation";
import supabaseLoader from "@/utils/supabase/supabase-image-loader";
import { useAlbumImagesMetadata } from "@/hooks/use-album-images-metadata";

export default function ImageView({
  albumName,
  imageName,
}: {
  albumName: string;
  imageName: string;
}) {
  const { albumImageMetadata, loading } = useAlbumImagesMetadata(albumName);
  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const currentIndex = albumImageMetadata.findIndex(img => img.name === imageName);
      
      if (currentIndex === -1) return;

      switch (event.key) {
        case 'ArrowLeft':
          console.log('ArrowLeft');
          event.preventDefault();
          const prevIndex = currentIndex === 0 ? albumImageMetadata.length - 1 : currentIndex - 1;
          router.push(`/${albumName}/${albumImageMetadata[prevIndex].name}`);
          break;
        
        case 'ArrowRight':
          console.log('ArrowRight');
          event.preventDefault();
          const nextIndex = currentIndex === albumImageMetadata.length - 1 ? 0 : currentIndex + 1;
          router.push(`/${albumName}/${albumImageMetadata[nextIndex].name}`);
          break;
        
        case 'Escape':
          console.log('Escape');
          event.preventDefault();
          router.push(`/${albumName}`);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [imageName, albumImageMetadata, albumName, router]);

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  const imagePath = `mj-photos/${albumName}/large/${imageName}`;

  return (
    <div className="flex items-center justify-center min-h-screen p-8">
      <Image
        loader={supabaseLoader as ImageLoader}
        src={imagePath}
        alt={`${imageName} from ${albumName}`}
        width={1600}
        height={1200}
        className="max-w-full max-h-screen object-contain"
        quality={85}
        priority
        sizes="100vw"
      />
    </div>
  );
}
