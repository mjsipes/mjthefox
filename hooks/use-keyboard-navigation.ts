import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface UseKeyboardNavigationProps {
  currentImageName: string;
  imageNames: string[];
  albumName: string;
}

export function useKeyboardNavigation({
  currentImageName,
  imageNames,
  albumName,
}: UseKeyboardNavigationProps) {
  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const currentIndex = imageNames.findIndex(name => name === currentImageName);
      
      if (currentIndex === -1) return;

      switch (event.key) {
        case 'ArrowLeft':
          event.preventDefault();
          const prevIndex = currentIndex === 0 ? imageNames.length - 1 : currentIndex - 1;
          router.push(`/${albumName}/${imageNames[prevIndex]}`);
          break;
        
        case 'ArrowRight':
          event.preventDefault();
          const nextIndex = currentIndex === imageNames.length - 1 ? 0 : currentIndex + 1;
          router.push(`/${albumName}/${imageNames[nextIndex]}`);
          break;
        
        case 'Escape':
          event.preventDefault();
          router.push(`/${albumName}`);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentImageName, imageNames, albumName, router]);
} 