"use client";

import { useEffect, useCallback } from "react";
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
  const { albumImageMetadata } = useAlbumImagesMetadata(albumName);
  const router = useRouter();

  const navigateToImage = useCallback((direction: 'prev' | 'next') => {
    const currentIndex = albumImageMetadata.findIndex(img => img.name === imageName);
    if (currentIndex === -1) return;

    let targetIndex: number;
    if (direction === 'prev') {
      targetIndex = currentIndex === 0 ? albumImageMetadata.length - 1 : currentIndex - 1;
    } else {
      targetIndex = currentIndex === albumImageMetadata.length - 1 ? 0 : currentIndex + 1;
    }
    
    router.push(`/${albumName}/${albumImageMetadata[targetIndex].name}`);
  }, [albumImageMetadata, albumName, imageName, router]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const currentIndex = albumImageMetadata.findIndex(img => img.name === imageName);
      
      if (currentIndex === -1) return;

      switch (event.key) {
        case 'ArrowLeft':
          console.log('ArrowLeft');
          event.preventDefault();
          navigateToImage('prev');
          break;
        
        case 'ArrowRight':
          console.log('ArrowRight');
          event.preventDefault();
          navigateToImage('next');
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
  }, [imageName, albumImageMetadata, albumName, router, navigateToImage]);

  const imagePath = `mj-photos/${albumName}/large/${imageName}`;

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] p-4 relative">
      <div className="absolute left-0 top-0 w-1/3 h-full cursor-w-resize" onClick={() => navigateToImage('prev')} />
      <div className="absolute right-0 top-0 w-1/3 h-full cursor-e-resize" onClick={() => navigateToImage('next')} />
      <Image
        loader={supabaseLoader as ImageLoader}
        src={imagePath}
        alt={`${imageName} from ${albumName}`}
        width={1600}
        height={1200}
        className="max-w-full max-h-[calc(100vh-6rem)] object-contain invert"
        quality={95}
        priority
      />
    </div>
  );
}
