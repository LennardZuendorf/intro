'use client';

// Note: Media type from BaseHub is directly available as string URLs
import ImageCard from './image-card';

// Interface for BaseHub media (simple string URLs)
interface ProfileImageProps {
  image?: string | null;
  alt?: string;
  className?: string;
  aspectRatio?: 'square' | 'portrait' | 'landscape' | string;
  fallbackImage?: string;
  caption?: string;
  hideCaption?: boolean;
}

export const ProfileImage = ({
  image,
  alt = 'Profile Image',
  className,
  aspectRatio = 'square',
  fallbackImage = '/images/placeholder-avatar.png',
  caption = '',
  hideCaption = true
}: ProfileImageProps) => {
  // Default fallback SVG encoded as data URL
  const defaultFallback =
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23ccc'%3E%3Cpath d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z'/%3E%3C/svg%3E";

  // Process image source (BaseHub provides string URLs)
  const getImageDetails = () => {
    return {
      src: image || fallbackImage || defaultFallback,
      altText: alt
    };
  };

  const { src, altText } = getImageDetails();

  // Map aspect ratio to ImageCard's expected format
  const getAspectRatioString = () => {
    switch (aspectRatio) {
      case 'square':
        return 'aspect-square';
      case 'portrait':
        return 'aspect-[3/4]';
      case 'landscape':
        return 'aspect-[4/3]';
      default:
        return aspectRatio.startsWith('aspect-') ? aspectRatio : 'aspect-square';
    }
  };

  return (
    <ImageCard
      imageUrl={src}
      alt={altText}
      className={className}
      aspectRatio={getAspectRatioString()}
      fullHeight={true}
      hideCaption={hideCaption}
      caption={caption}
    />
  );
};
