import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Eye } from 'lucide-react';
import { Product } from '../types';
import { ProductImage } from './ProductImage';
import { useWishlist } from '../context/WishlistContext';

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, priority = false }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { isInWishlist, toggleWishlist } = useWishlist();
  const isFavorite = isInWishlist(product.id);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  return (
    <div
      className="product-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        backgroundColor: '#FFFFFF',
        border: '1px solid var(--color-border)',
        borderRadius: '4px',
        overflow: 'hidden',
        transition: 'transform var(--transition-fast), box-shadow var(--transition-fast)'
      }}
    >
      <Link
        to={`/product/${product.slug}`}
        style={{
          display: 'block',
          position: 'relative',
          overflow: 'hidden'
        }}
        tabIndex={0}
      >
        <ProductImage
          src={product.images[0]}
          secondarySrc={product.images[1]}
          alt={`${product.name} drape view`}
          isHovered={isHovered}
          priority={priority}
        />

        {/* Badges container */}
        <div
          style={{
            position: 'absolute',
            top: '10px',
            left: '10px',
            display: 'flex',
            flexDirection: 'column',
            gap: '6px',
            zIndex: 2
          }}
        >
          {product.discount && (
            <span className="badge badge-discount">
              {product.discount}
            </span>
          )}
          <span className="badge">
            {product.category.replace(' Sarees', '')}
          </span>
        </div>

        {/* 2 views subtle badge indicator */}
        {product.images.length > 1 && (
          <div
            style={{
              position: 'absolute',
              bottom: '10px',
              left: '10px',
              zIndex: 2,
              backgroundColor: 'rgba(255, 255, 255, 0.88)',
              backdropFilter: 'blur(4px)',
              padding: '2px 6px',
              borderRadius: '2px',
              fontSize: '0.68rem',
              color: 'var(--color-text-muted)',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            <Eye size={12} />
            <span>2 views</span>
          </div>
        )}
      </Link>

      {/* Wishlist favorite heart button */}
      <button
        onClick={handleFavoriteClick}
        aria-label={isFavorite ? `Remove ${product.name} from wishlist` : `Save ${product.name} to wishlist`}
        aria-pressed={isFavorite}
        style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          zIndex: 3,
          width: '36px',
          height: '36px',
          borderRadius: '50%',
          backgroundColor: 'rgba(255, 255, 255, 0.92)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 2px 6px rgba(0,0,0,0.08)',
          color: isFavorite ? '#621D23' : '#1C1E21',
          transition: 'transform var(--transition-fast), color var(--transition-fast)'
        }}
      >
        <Heart
          size={18}
          fill={isFavorite ? '#621D23' : 'none'}
          strokeWidth={isFavorite ? 2 : 1.75}
        />
      </button>

      {/* Product Details Content */}
      <div
        style={{
          padding: '14px',
          display: 'flex',
          flexDirection: 'column',
          flexGrow: 1,
          justifyContent: 'space-between',
          gap: '8px'
        }}
      >
        <div>
          <div
            style={{
              fontSize: '0.74rem',
              color: 'var(--color-text-light)',
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              marginBottom: '4px'
            }}
          >
            {product.id} • {product.primaryColor}
          </div>
          <h3
            style={{
              fontSize: '0.96rem',
              fontFamily: 'var(--font-sans)',
              fontWeight: 500,
              lineHeight: 1.35,
              color: 'var(--color-text-main)',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              minHeight: '2.7em'
            }}
          >
            <Link to={`/product/${product.slug}`} style={{ color: 'inherit' }}>
              {product.name}
            </Link>
          </h3>
        </div>

        {/* Pricing */}
        <div
          style={{
            display: 'flex',
            alignItems: 'baseline',
            gap: '8px',
            paddingTop: '6px',
            borderTop: '1px solid var(--color-border-subtle)'
          }}
        >
          <span
            style={{
              fontSize: '1.05rem',
              fontWeight: 600,
              color: 'var(--color-oxblood)'
            }}
          >
            {product.formattedPrice}
          </span>
          {product.formattedMrp && (
            <span
              style={{
                fontSize: '0.82rem',
                color: 'var(--color-text-light)',
                textDecoration: 'line-through'
              }}
            >
              {product.formattedMrp}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

