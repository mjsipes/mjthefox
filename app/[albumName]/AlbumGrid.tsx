"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import supabaseLoader from "@/lib/supabase-image-loader";
import { ImageLoader } from "next/image";

export default function AlbumGrid({
  albumName,
}: {
  albumName: string;
}) {
  const [images, setImages] = useState<{ name: string; url: string }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cached = sessionStorage.getItem(`album-grid-${albumName}`);

    if (cached) {
      setImages(JSON.parse(cached));
      setLoading(false);
    } else {
      const supabase = createClient();
      const BUCKET = "mj-photos";
      
      supabase.storage
        .from(BUCKET)
        .list(`${albumName}/large`)
        .then(({ data, error }) => {
          if (error) {
            console.error("Storage Error:", error);
          }
          
          const publicUrls = data?.map((item) => ({
            name: item.name,
            url: `${BUCKET}/${albumName}/large/${item.name}`,
          })) || [];
          
          setImages(publicUrls);
          sessionStorage.setItem(`album-grid-${albumName}`, JSON.stringify(publicUrls));
          setLoading(false);
        });
    }
  }, [albumName]);

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="grid grid-cols-2 gap-4 p-4">
      {images.length === 0 ? (
        <p className="text-center text-gray-500 col-span-2">No images found.</p>
      ) : (
        images.map((item, i) => (
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
              quality={85}
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover w-full h-auto"
            />
          </Link>
        ))
      )}
    </div>
  );
}
