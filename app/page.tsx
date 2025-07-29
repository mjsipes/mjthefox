"use client";

import Image, { ImageLoader } from "next/image";
import supabaseLoader from "@/utils/supabase/supabase-image-loader";
import PanoramaZoom from "@/components/PanoramaZoom";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
              <Image
          loader={supabaseLoader as ImageLoader}
          src={`mj-photos/home/large/pano.jpg`}
          width={1600}
          height={1000}
          quality={90}
          alt="Switzerland Pano"
          sizes="100vw"
          className="w-full h-auto object-cover"
          priority
        />
      <PanoramaZoom />
    </div>
  );
}
