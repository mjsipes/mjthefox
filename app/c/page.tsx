"use client";

import ZoomablePanImage from "@/components/zoomable-pan-image";

// const images = [
//   "https://gjbeonnspjcwyrpgcnuz.supabase.co/storage/v1/object/public/mj-photos/project-nuance/2-IMG_8468.jpg",
//   "https://gjbeonnspjcwyrpgcnuz.supabase.co/storage/v1/object/public/mj-photos/project-nuance/1-IMG_8466.jpg",
// ];

// const images2 = [
//     "https://gjbeonnspjcwyrpgcnuz.supabase.co/storage/v1/object/public/mj-photos/project-nuance/IMG_7066.jpg",
//     "https://gjbeonnspjcwyrpgcnuz.supabase.co/storage/v1/object/public/mj-photos/project-nuance/IMG_7067.jpg",
//   ];

  const image = "https://gjbeonnspjcwyrpgcnuz.supabase.co/storage/v1/object/public/mj-photos/project-nuance/small/1-IMG_8466.jpg"


  export default function C() {

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <ZoomablePanImage
        src={image}
        alt="Project Nuance"
        width={1200}
        height={800}
        priority
      />
    </div>
  );
}
