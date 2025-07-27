"use client";

import Image, { ImageLoader } from "next/image";
import supabaseLoader from "@/utils/supabase/supabase-image-loader";


export default function Home() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <div className="relative w-full">
        <Image
          loader={supabaseLoader as ImageLoader}
          src={`mj-photos/home/small/pano.jpg`}
          width={1600}
          height={1000}
          quality={90}
          alt="Switzerland Pano"
          sizes="100vw"
          className="w-full h-auto object-cover"
          priority
        />
        {/* PhotoCarousel will be re-enabled later */}
      </div>
    </div>
  );
}
