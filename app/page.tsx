"use client";

import Image, { ImageLoader } from "next/image";
import supabaseLoader from "@/utils/supabase/supabase-image-loader";
import PanoramaZoom from "@/components/PanoramaZoom";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <PanoramaZoom />
      {/* PhotoCarousel will be re-enabled later */}
    </div>
  );
}
