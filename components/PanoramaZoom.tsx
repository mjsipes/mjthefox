"use client";

import { useState, useEffect, useRef, useCallback } from 'react';

interface PanoramaZoomProps {
  imageSrc?: string;
  className?: string;
}

const PanoramaZoom = ({ 
  imageSrc = "https://gjbeonnspjcwyrpgcnuz.supabase.co/storage/v1/object/public/mj-photos/home/large/pano.jpg",
  className = ""
}: PanoramaZoomProps) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 });
  
  const containerRef = useRef<HTMLDivElement>(null);
  const panoramaRef = useRef<HTMLImageElement>(null);
  const zoomRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>(0);

  // Zoom factor for the strip
  const ZOOM_FACTOR = 3;

  // Auto-scroll animation
  const animate = useCallback(() => {
    if (!isHovering && imageLoaded && containerRef.current) {
      setScrollPosition(prev => {
        const containerWidth = containerRef.current!.clientWidth;
        const maxScroll = Math.max(0, imageDimensions.width - containerWidth);
        return prev >= maxScroll ? 0 : prev + 1;
      });
    }
    animationRef.current = requestAnimationFrame(animate);
  }, [isHovering, imageLoaded, imageDimensions.width]);

  useEffect(() => {
    animationRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [animate]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || !imageLoaded) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const containerWidth = rect.width;
    
    // Calculate scroll position based on mouse position
    const maxScroll = Math.max(0, imageDimensions.width - containerWidth);
    const scrollPercent = x / containerWidth;
    const newScrollPosition = scrollPercent * maxScroll;
    
    setScrollPosition(Math.max(0, Math.min(maxScroll, newScrollPosition)));
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
    if (panoramaRef.current) {
      setImageDimensions({
        width: panoramaRef.current.naturalWidth,
        height: panoramaRef.current.naturalHeight
      });
    }
  };

  // Calculate bounding box dimensions and position
  const getBoundingBoxStyle = () => {
    if (!containerRef.current || !imageLoaded) return {};
    
    const containerWidth = containerRef.current.clientWidth;
    const displayedImageWidth = containerWidth;
    
    // The bounding box represents what portion of the image is visible in the zoom strip
    // Zoom strip shows 1/ZOOM_FACTOR of the image width
    const boxWidth = displayedImageWidth / ZOOM_FACTOR;
    
    // Calculate position based on scroll position
    const maxScroll = Math.max(0, imageDimensions.width - containerWidth);
    const scrollPercent = maxScroll > 0 ? scrollPosition / maxScroll : 0;
    const maxBoxPosition = displayedImageWidth - boxWidth;
    const boxLeft = scrollPercent * maxBoxPosition;
    
    return {
      left: `${boxLeft}px`,
      width: `${boxWidth}px`,
    };
  };

  // Calculate zoom strip transform
  const getZoomTransform = () => {
    if (!imageLoaded || !containerRef.current) return 'translateX(0) scale(1)';
    
    const containerWidth = containerRef.current.clientWidth;
    const maxScroll = Math.max(0, imageDimensions.width - containerWidth);
    
    // Calculate scroll percentage
    const scrollPercent = maxScroll > 0 ? scrollPosition / maxScroll : 0;
    
    // The scaled image width at ZOOM_FACTOR
    const scaledImageWidth = containerWidth * ZOOM_FACTOR;
    // Maximum translation needed to show the end of the scaled image
    const maxTranslation = scaledImageWidth - containerWidth;
    // Calculate translation based on scroll percentage
    const translateX = -(scrollPercent * maxTranslation);
    
    return `translateX(${translateX}px) scale(${ZOOM_FACTOR})`;
  };

  // Calculate actual scroll percentage for display
  const getScrollPercentage = () => {
    if (!containerRef.current || !imageLoaded) return 0;
    const containerWidth = containerRef.current.clientWidth;
    const maxScroll = Math.max(0, imageDimensions.width - containerWidth);
    return maxScroll > 0 ? Math.round((scrollPosition / maxScroll) * 100) : 0;
  };

  return (
    <div className={`w-full max-w-6xl mx-auto space-y-6 ${className}`}>
      {/* Main Panorama with Bounding Box Overlay - Keep original wide format */}
      <div
        ref={containerRef}
        className="relative w-full h-64 cursor-crosshair overflow-hidden"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        onMouseMove={handleMouseMove}
      >
        {/* Main Panorama Image */}
        <img
          ref={panoramaRef}
          src={imageSrc}
          alt="Panorama"
          className="w-full h-full object-cover block"
          onLoad={handleImageLoad}
          style={{ opacity: imageLoaded ? 1 : 0.5 }}
        />
        
        {/* Bounding Box Overlay - No transitions for immediate response */}
        {imageLoaded && (
          <div
            className="absolute top-0 h-full border-2 border-primary bg-primary/20 pointer-events-none"
            style={{
              ...getBoundingBoxStyle(),
              transition: 'none' // Remove transitions for immediate response
            }}
          />
        )}
        
        {/* Loading indicator */}
        {!imageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-panorama-zoom-bg">
            <div className="animate-pulse text-muted-foreground">Loading panorama...</div>
          </div>
        )}
      </div>

      {/* Zoomed Strip - 3:2 aspect ratio */}
      <div 
        ref={zoomRef}
        className="relative w-full overflow-hidden"
        style={{ aspectRatio: '3/2' }}
      >
        {imageLoaded ? (
          <div
            className="h-full origin-left"
            style={{ 
              transform: getZoomTransform(),
              transition: 'none' // Remove transitions for immediate response
            }}
          >
            <img
              src={imageSrc}
              alt="Zoomed panorama strip"
              className="h-full w-auto object-cover"
            />
          </div>
        ) : (
          <div className="flex items-center justify-center h-full bg-panorama-zoom-bg">
            <div className="animate-pulse text-muted-foreground">Loading zoom view...</div>
          </div>
        )}
      </div>

      {/* Status indicator */}
      <div className="text-center text-sm text-muted-foreground">
        <div className="flex items-center justify-center gap-4">
          <span className={`px-2 py-1 ${isHovering ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
            {isHovering ? "Mouse Control Active" : "Auto-Scrolling"}
          </span>
          <span>Position: {getScrollPercentage()}%</span>
          <span>Zoom: {ZOOM_FACTOR}x</span>
        </div>
      </div>
    </div>
  );
};

export default PanoramaZoom;
