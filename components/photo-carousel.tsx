"use client";

import Image from "next/image";

interface CarouselImage {
  src: string;
  alt: string;
}

interface PhotoCarouselProps {
  images: CarouselImage[];
  speed?: number; // pixels per second
}

export function PhotoCarousel({ images, speed = 50 }: PhotoCarouselProps) {
  // Duplicate images to create seamless loop
  const duplicatedImages = [...images, ...images];

  return (
    <div className="relative w-full overflow-hidden">
      <div className="flex h-64 md:h-96">
        <div 
          className="flex animate-slide-left"
          style={{
            animation: `slide-left ${(duplicatedImages.length * 400) / speed}s linear infinite`
          }}
        >
          {duplicatedImages.map((image, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-96 md:w-[36rem] h-full relative"
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>
      
      <style jsx>{`
        @keyframes slide-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-slide-left {
          animation: slide-left ${(duplicatedImages.length * 400) / speed}s linear infinite;
        }
      `}</style>
    </div>
  );
}
