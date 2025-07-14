"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

const images = [
  "https://gjbeonnspjcwyrpgcnuz.supabase.co/storage/v1/object/public/mj-photos/project-nuance/2-IMG_8468.jpg",
  "https://gjbeonnspjcwyrpgcnuz.supabase.co/storage/v1/object/public/mj-photos/project-nuance/1-IMG_8466.jpg",
];

const images2 = [
    "https://gjbeonnspjcwyrpgcnuz.supabase.co/storage/v1/object/public/mj-photos/project-nuance/IMG_7066.jpg",
    "https://gjbeonnspjcwyrpgcnuz.supabase.co/storage/v1/object/public/mj-photos/project-nuance/IMG_7067.jpg",
  ];

export default function A() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const handleSpace = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        setIndex((prev) => 1 - prev);
      }
    };
    window.addEventListener("keydown", handleSpace);
    return () => window.removeEventListener("keydown", handleSpace);
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <Image
        src={images2[index]}
        alt="Project Nuance"
        width={1200}
        height={800}
        priority
      />
    </div>
  );
}
