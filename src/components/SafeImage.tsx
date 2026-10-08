import React, { useState } from 'react';

interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  fallbackSrc?: string;
  className?: string;
  aspectRatio?: string;
}

const GLOBAL_FALLBACK_IMAGES = [
  'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1584992236310-6edddc08acff?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?q=80&w=1200&auto=format&fit=crop'
];

export const SafeImage: React.FC<SafeImageProps> = ({
  src,
  alt,
  fallbackSrc = GLOBAL_FALLBACK_IMAGES[0],
  className = '',
  ...props
}) => {
  const [currentSrc, setCurrentSrc] = useState<string>(src);
  const [hasError, setHasError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const handleError = () => {
    if (!hasError) {
      setHasError(true);
      setCurrentSrc(fallbackSrc);
      setIsLoading(false);
    }
  };

  return (
    <div className={`relative overflow-hidden bg-slate-100 ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 animate-pulse" />
      )}
      <img
        src={currentSrc}
        alt={alt}
        loading="lazy"
        onLoad={() => setIsLoading(false)}
        onError={handleError}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
        {...props}
      />
    </div>
  );
};
