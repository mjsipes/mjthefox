"use client";
import Image from "next/image";
import { Comparison, ComparisonHandle, ComparisonItem } from '@/components/ui/kibo-ui/comparison';

// const images = [
//   "https://gjbeonnspjcwyrpgcnuz.supabase.co/storage/v1/object/public/mj-photos/project-nuance/2-IMG_8468.jpg",
//   "https://gjbeonnspjcwyrpgcnuz.supabase.co/storage/v1/object/public/mj-photos/project-nuance/1-IMG_8466.jpg",
// ];

const images2 = [
    "https://gjbeonnspjcwyrpgcnuz.supabase.co/storage/v1/object/public/mj-photos/project-nuance/IMG_7066.jpg",
    "https://gjbeonnspjcwyrpgcnuz.supabase.co/storage/v1/object/public/mj-photos/project-nuance/IMG_7067.jpg",
  ];

export default function B() {

  return (
    <Comparison className="aspect-video">
    <ComparisonItem  position="left">
      <Image
        alt="Placeholder 1"
        height={1080}
        src={images2[0]}
        unoptimized
        width={1920}
      />
    </ComparisonItem>
    <ComparisonItem position="right">
      <Image
        alt="Placeholder 2"
        height={1440}
        src={images2[1]}
        unoptimized
        width={2560}
      />
    </ComparisonItem>
    <ComparisonHandle />
  </Comparison>
  );
}
