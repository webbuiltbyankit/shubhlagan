import React, { useState, useEffect } from 'react';
import { ImageOff } from 'lucide-react';

interface ProductImageProps {
  src: string;
  alt: string;
  secondarySrc?: string;
  isHovered?: boolean;
  className?: string;
  aspectRatio?: string; // default 4/5
  priority?: boolean;
}

export const ProductImage: React.FC<ProductImageProps> = ({
  src,
  alt,
  secondarySrc,
  isHovered = false,
  className = '',
  aspectRatio = '4 / 5',
  priority = false
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [shouldLoadSecondary, setShouldLoadSecondary] = useState(false);

  // Lazy-mount secondary image only after user hovers/interacts, preventing 34 concurrent image downloads
  useEffect(() => {
    if (isHovered && !shouldLoadSecondary) {
      setShouldLoadSecondary(true);
    }
  }, [isHovered, shouldLoadSecondary]);

  return (
    <div
      className={`product-image-container ${className}`}
      style={{
        position: 'relative',
        width: '100%',
        aspectRatio,
        backgroundColor: '#F5EFEB',
        overflow: 'hidden',
        borderRadius: '2px'
      }}
    >
      {hasError ? (
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#807B77',
            gap: '8px',
            padding: '16px',
            textAlign: 'center'
          }}
          role="img"
          aria-label={alt}
        >
          <ImageOff size={28} />
          <span style={{ fontSize: '0.75rem' }}>Image preview</span>
        </div>
      ) : (
        <>
          <picture style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
            <source srcSet={src.replace(/\.jpg$/, '.webp')} type="image/webp" />
            <img
              src={src}
              alt={alt}
              loading={priority ? 'eager' : 'lazy'}
              // @ts-expect-error fetchpriority attribute is supported in modern browsers
              fetchpriority={priority ? 'high' : 'low'}
              decoding="async"
              onLoad={() => setIsLoaded(true)}
              onError={() => setHasError(true)}
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center top',
                transition: 'opacity 220ms ease, transform 300ms ease',
                opacity: isLoaded ? (isHovered && secondarySrc && shouldLoadSecondary ? 0 : 1) : 0.85
              }}
            />
          </picture>
          {secondarySrc && shouldLoadSecondary && (
            <picture style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
              <source srcSet={secondarySrc.replace(/\.jpg$/, '.webp')} type="image/webp" />
              <img
                src={secondarySrc}
                alt={`${alt} alternate view`}
                loading="lazy"
                decoding="async"
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center top',
                  transition: 'opacity 220ms ease, transform 300ms ease',
                  opacity: isHovered ? 1 : 0,
                  pointerEvents: 'none'
                }}
              />
            </picture>
          )}
        </>
      )}
    </div>
  );
};


