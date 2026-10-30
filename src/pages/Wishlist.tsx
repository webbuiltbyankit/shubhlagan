import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { getProductById } from '../lib/catalog';
import { Breadcrumbs } from '../components/Breadcrumbs';

export const Wishlist: React.FC = () => {
  const { wishlistIds, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();

  const savedProducts = wishlistIds
    .map((id) => getProductById(id))
    .filter((p): p is NonNullable<typeof p> => p !== undefined);

  const handleMoveToBag = (productId: string) => {
    addToCart(productId, 1);
  };

  return (
    <div className="wishlist-page" style={{ paddingBottom: '80px' }}>
      <div className="container">
        <Breadcrumbs items={[{ label: 'Wishlist' }]} />

        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'baseline',
            justifyContent: 'space-between',
            gap: '12px',
            margin: '16px 0 24px 0'
          }}
        >
          <div>
            <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.4rem', marginBottom: '6px' }}>
              Saved Sarees
            </h1>
            <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)' }}>
              {savedProducts.length} {savedProducts.length === 1 ? 'garment' : 'garments'} saved for later consideration.
            </p>
          </div>

          {savedProducts.length > 0 && (
            <button
              onClick={clearWishlist}
              style={{
                fontSize: '0.82rem',
                color: 'var(--color-oxblood)',
                textDecoration: 'underline'
              }}
            >
              Clear Entire Wishlist
            </button>
          )}
        </div>

        {/* Demo note */}
        <div
          style={{
            backgroundColor: 'var(--color-surface-subtle)',
            border: '1px solid var(--color-border)',
            borderRadius: '6px',
            padding: '12px 18px',
            marginBottom: '32px',
            fontSize: '0.82rem',
            color: 'var(--color-text-muted)'
          }}
        >
          <strong>Browser-Local Storage: </strong>
          Your saved selections are stored securely in your browser's local memory. You can revisit them at any time during this session without creating an account.
        </div>

        {/* Saved Items or Empty State */}
        {savedProducts.length === 0 ? (
          <div
            style={{
              textAlign: 'center',
              padding: '80px 20px',
              backgroundColor: '#FFFFFF',
              border: '1px solid var(--color-border)',
              borderRadius: '8px'
            }}
          >
            <div
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                backgroundColor: 'var(--color-surface-subtle)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px auto',
                color: 'var(--color-text-light)'
              }}
            >
              <Heart size={28} />
            </div>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', marginBottom: '8px' }}>
              Your wishlist is currently empty
            </h2>
            <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', maxWidth: '440px', margin: '0 auto 24px auto' }}>
              Tap the heart icon on any saree to save it to your personal shortlist while exploring our fabric collections.
            </p>
            <Link to="/shop" className="btn btn-primary">
              <span>Browse All Sarees</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
              gap: '24px'
            }}
          >
            {savedProducts.map((product) => (
              <div
                key={product.id}
                style={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid var(--color-border)',
                  borderRadius: '6px',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                <Link to={`/product/${product.slug}`} style={{ display: 'block', aspectRatio: '4 / 5', backgroundColor: '#F5EFEB' }}>
                  <picture style={{ display: 'block', width: '100%', height: '100%' }}>
                    <source srcSet={product.images[0].replace(/\.jpg$/, '.webp')} type="image/webp" />
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      loading="lazy"
                      decoding="async"
                      style={{ display: 'block', width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </picture>
                </Link>

                <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', flexGrow: 1, justifyContent: 'space-between', gap: '12px' }}>
                  <div>
                    <div style={{ fontSize: '0.74rem', color: 'var(--color-text-light)', textTransform: 'uppercase' }}>
                      {product.category} • {product.id}
                    </div>
                    <h3 style={{ fontSize: '0.95rem', fontFamily: 'var(--font-sans)', fontWeight: 600, marginTop: '4px' }}>
                      <Link to={`/product/${product.slug}`} style={{ color: 'inherit' }}>
                        {product.name}
                      </Link>
                    </h3>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginTop: '6px' }}>
                      <span style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-oxblood)' }}>
                        {product.formattedPrice}
                      </span>
                      {product.formattedMrp && (
                        <span style={{ fontSize: '0.82rem', color: 'var(--color-text-light)', textDecoration: 'line-through' }}>
                          {product.formattedMrp}
                        </span>
                      )}
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '8px', borderTop: '1px solid var(--color-border-subtle)', paddingTop: '12px' }}>
                    <button
                      onClick={() => handleMoveToBag(product.id)}
                      className="btn btn-primary"
                      style={{ flex: 1, padding: '10px 14px', fontSize: '0.8rem', gap: '6px' }}
                    >
                      <ShoppingBag size={14} />
                      <span>Move to Bag</span>
                    </button>
                    <button
                      onClick={() => removeFromWishlist(product.id)}
                      aria-label="Remove item"
                      className="btn btn-ghost"
                      style={{ padding: '10px', color: 'var(--color-text-light)' }}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

