"use client";

import { use, useEffect, useCallback } from "react";
import Image, { ImageLoader } from "next/image";
import { useRouter } from "next/navigation";
import supabaseLoader from "@/utils/supabase/supabase-image-loader";
import { useAlbumImagesMetadata } from "@/hooks/use-album-images-metadata";
import { useInvert } from "@/components/invert-provider";
import { useArtistImage } from "@/hooks/use-artist-image";

export default function ImagePage({
  params,
}: {
  params: Promise<{ albumName: string; imageName: string }>;
}) {
  const { albumName, imageName } = use(params);
  return <ImageViewContent albumName={albumName} imageName={imageName} />;
}

function ImageViewContent({
  albumName,
  imageName,
}: {
  albumName: string;
  imageName: string;
}) {
  const { albumImageMetadata } = useAlbumImagesMetadata(albumName);
  const router = useRouter();
  const { inverted } = useInvert();
  
  const imagePath = `mj-photos/${albumName}/large/${imageName}`;
  const { imageUrl } = useArtistImage(imagePath);

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

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] p-4">
      <div className="relative inline-block border border-transparent hover:border-sipes-green">
        <Image
          loader={supabaseLoader as ImageLoader}
          src={imageUrl || imagePath}
          alt={`${imageName} from ${albumName}`}
          width={1600}
          height={1200}
          className={`max-w-full max-h-[calc(100vh-6rem)] object-contain ${inverted ? 'invert' : ''}`}
          quality={95}
          priority
        />
        <div className="absolute left-0 top-0 w-1/3 h-full cursor-w-resize z-10" onClick={() => navigateToImage('prev')} />
        <div className="absolute right-0 top-0 w-1/3 h-full cursor-e-resize z-10" onClick={() => navigateToImage('next')} />
      </div>
    </div>
  );
}
