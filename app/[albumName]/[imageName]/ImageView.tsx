"use client";

import { useEffect, useState } from "react";
import Image, { ImageLoader } from "next/image";
import { createClient } from "@/utils/supabase/client";
import { useKeyboardNavigation } from "@/hooks/use-keyboard-navigation";
import supabaseLoader from "@/lib/supabase-image-loader";


export default function ImageView({
  albumName,
  imageName,
}: {
  albumName: string;
  imageName: string;
}) {
  const [imageNames, setImageNames] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cached = sessionStorage.getItem(`album-${albumName}`);

    if (cached) {
      setImageNames(JSON.parse(cached));
      setLoading(false);
    } else {
      const supabase = createClient();
      supabase.storage
        .from("mj-photos")
        .list(`${albumName}/small`)
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

  useKeyboardNavigation({ albumName, currentImageName: imageName, imageNames });

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  const imagePath = `mj-photos/${albumName}/small/${imageName}`;

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
