"use client";

import Image from "next/image";
import Link from "next/link";
import supabaseLoader from "@/lib/supabase-image-loader";
import { ImageLoader } from "next/image";

export default function AlbumGrid({
  images,
  albumName,
}: {
  images: { name: string; url: string }[];
  albumName: string;
}) {
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
