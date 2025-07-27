"use client";

import { useEffect, useState } from "react";
import Image, { ImageLoader } from "next/image";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import supabaseLoader from "@/utils/supabase/supabase-image-loader";


export default function ImageView({
  albumName,
  imageName,
}: {
  albumName: string;
  imageName: string;
}) {
  const [imageNames, setImageNames] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const cached = sessionStorage.getItem(`album-${albumName}`);

    if (cached) {
      setImageNames(JSON.parse(cached));
      setLoading(false);
    } else {
      const supabase = createClient();
      supabase.storage
        .from("mj-photos")
        .list(`${albumName}/large`)
        .then(({ data }) => {
          if (data) {
            const names = data.map((item) => item.name);
            setImageNames(names);
            sessionStorage.setItem(`album-${albumName}`, JSON.stringify(names));
          }
          setLoading(false);
        });
    }
  }, [albumName]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const currentIndex = imageNames.findIndex(name => name === imageName);
      
      if (currentIndex === -1) return;

      switch (event.key) {
        case 'ArrowLeft':
          event.preventDefault();
          const prevIndex = currentIndex === 0 ? imageNames.length - 1 : currentIndex - 1;
          router.push(`/${albumName}/${imageNames[prevIndex]}`);
          break;
        
        case 'ArrowRight':
          event.preventDefault();
          const nextIndex = currentIndex === imageNames.length - 1 ? 0 : currentIndex + 1;
          router.push(`/${albumName}/${imageNames[nextIndex]}`);
          break;
        
        case 'Escape':
          event.preventDefault();
          router.push(`/${albumName}`);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [imageName, imageNames, albumName, router]);

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
        quality={75}
        priority
        sizes="100vw"
      />
    </div>
  );
}
