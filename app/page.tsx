"use client";

import Image from "next/image";
// import { ImageLoader } from "next/image";
// import supabaseLoader from "@/utils/supabase/supabase-image-loader";
// import PanoramaZoom from "@/components/PanoramaZoom";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 items-center justify-center">
      {/* <Image
        loader={supabaseLoader as ImageLoader}
        src={`mj-photos/home/large/pano.jpg`}
        width={1600}
        height={1000}
        quality={85}
        alt="Switzerland Pano"
        sizes="100vw"
        className="w-full h-auto object-cover"
        priority
      /> */}
      <Image
        src="/favicon.ico"
        alt="fox"
        className="aspect-square size-8"
        width={32}
        height={32}
        />
        <p>Landing page coming soon...</p>

      {/* <PanoramaZoom /> */}
    </div>
  );
}
