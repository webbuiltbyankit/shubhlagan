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
  const [hasPrimaryError, setHasPrimaryError] = useState(false);
  const [isPrimaryLoaded, setIsPrimaryLoaded] = useState(false);
  const [shouldLoadSecondary, setShouldLoadSecondary] = useState(false);
  const [isSecondaryLoaded, setIsSecondaryLoaded] = useState(false);

  // Lazy-mount secondary view only when user hovers or interacts
  useEffect(() => {
    if (isHovered && secondarySrc && !shouldLoadSecondary) {
      setShouldLoadSecondary(true);
    }
  }, [isHovered, secondarySrc, shouldLoadSecondary]);

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
      {hasPrimaryError ? (
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
          {/* Base Primary Saree Photo (Always visible, never blanks out) */}
          <picture style={{ display: 'block', width: '100%', height: '100%', position: 'absolute', inset: 0 }}>
            <source srcSet={src.replace(/\.jpg$/, '.webp')} type="image/webp" />
            <img
              src={src}
              alt={alt}
              loading={priority ? 'eager' : 'lazy'}
              // @ts-expect-error fetchpriority attribute is supported in modern browsers
              fetchpriority={priority ? 'high' : 'low'}
              decoding="async"
              onLoad={() => setIsPrimaryLoaded(true)}
              onError={() => setHasPrimaryError(true)}
              style={{
                display: 'block',
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center top',
                transition: 'opacity 250ms ease, transform 300ms ease',
                opacity: isPrimaryLoaded ? 1 : 0.85
              }}
            />
          </picture>

          {/* Alternate Saree Photo (Gracefully layers on top when hovered and ready) */}
          {secondarySrc && shouldLoadSecondary && (
            <picture style={{ display: 'block', width: '100%', height: '100%', position: 'absolute', inset: 0 }}>
              <source srcSet={secondarySrc.replace(/\.jpg$/, '.webp')} type="image/webp" />
              <img
                src={secondarySrc}
                alt={`${alt} alternate view`}
                loading="lazy"
                decoding="async"
                onLoad={() => setIsSecondaryLoaded(true)}
                onError={() => setIsSecondaryLoaded(false)}
                style={{
                  display: 'block',
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center top',
                  transition: 'opacity 250ms ease, transform 300ms ease',
                  opacity: isHovered && isSecondaryLoaded ? 1 : 0,
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



