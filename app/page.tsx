import Image from "next/image";
import { PhotoCarousel } from "@/components/photo-carousel";

const supabaseUrl = "https://gjbeonnspjcwyrpgcnuz.supabase.co";
const supabaseStoragePath = "/storage/v1/object/public/mj-photos";

export default function Home() {
  const carouselImages = [
    {
      src: `${supabaseUrl}${supabaseStoragePath}/home/1.jpg`,
      alt: "Switzerland Photo 1",
    },
    {
      src: `${supabaseUrl}${supabaseStoragePath}/home/2.jpg`,
      alt: "Switzerland Photo 2",
    },
    {
      src: `${supabaseUrl}${supabaseStoragePath}/home/3.jpg`,
      alt: "Switzerland Photo 3",
    },
  ];

  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <div className="relative w-full">
        <Image
          src={`${supabaseUrl}${supabaseStoragePath}/home/pano.jpg`}
          width={1200}
          height={800}
          alt="Switzerland Pano"
          className="w-full h-auto object-cover"
          priority
        />
        <PhotoCarousel images={carouselImages} />
      </div>
    </div>
  );
}
