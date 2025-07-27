'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { createClient } from '@/utils/supabase/client';
import { useKeyboardNavigation } from '@/hooks/use-keyboard-navigation';

export default function ImageView({
  params,
}: {
  params: { albumName: string; imageName: string };
}) {
  const { albumName, imageName } = params;
  const [imageNames, setImageNames] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if we already have the image list for this album
    const cachedImages = sessionStorage.getItem(`album-${albumName}`);
    
    if (cachedImages) {
      console.log(`Using cached images for album: ${albumName}`);
      setImageNames(JSON.parse(cachedImages));
      setLoading(false);
    } else {
      async function fetchImages() {
        console.log(`Fetching images for album: ${albumName}`);
        const supabase = createClient();
        const { data: items } = await supabase.storage
          .from("mj-photos")
          .list(`${albumName}/small`);
        
        console.log(`Found ${items?.length || 0} images in album ${albumName}:`, items?.map(item => item.name));
        
        if (items) {
          const names = items.map(item => item.name);
          setImageNames(names);
          // Cache the image list in sessionStorage
          sessionStorage.setItem(`album-${albumName}`, JSON.stringify(names));
        }
        setLoading(false);
      }

      fetchImages();
    }
  }, [albumName]);

  useKeyboardNavigation({
    currentImageName: imageName,
    imageNames,
    albumName,
  });

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  const imageUrl = `${process.env.NEXT_PUBLIC_SUPABASE_STORAGE_URL}/${albumName}/small/${imageName}`;

  return (
    <div className="flex items-center justify-center min-h-screen p-8">
      <Image
        src={imageUrl}
        alt={`${imageName} from ${albumName}`}
        width={4000}
        height={3000}
        className="max-w-full max-h-screen object-contain"
        priority
      />
    </div>
  );
}
