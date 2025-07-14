import { useEffect, useRef, useState } from "react";
import Image from "next/image";

interface ZoomablePanImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  priority?: boolean;
}

export default function ZoomablePanImage({ src, alt, width, height, priority }: ZoomablePanImageProps) {
  const [zoom, setZoom] = useState(1);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "w") setZoom(z => Math.min(z * 1.01, 10));
      if (e.key === "s") setZoom(z => Math.max(z / 1.01, 1));
      if (e.key === "ArrowLeft") setX(x => x + 10);
      if (e.key === "ArrowRight") setX(x => x - 10);
      if (e.key === "ArrowUp") setY(y => y + 10);
      if (e.key === "ArrowDown") setY(y => y - 10);
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        width: width,
        height: height,
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#aff",
      }}
    >
      <div
        style={{
          transform: `scale(${zoom}) translate(${x / zoom}px, ${y / zoom}px)`,
          transition: "transform 0.1s",
        }}
      >
        <Image src={src} alt={alt} width={width} height={height} priority={priority} />
      </div>
    </div>
  );
} 