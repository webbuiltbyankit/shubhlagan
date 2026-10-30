import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Heart,
  ShoppingBag,
  Share2,
  Maximize2,
  X,
  Check,
  Plus,
  Minus,
  Info,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { getProductBySlug, getRelatedProducts, CATEGORY_DEFINITIONS } from '../lib/catalog';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useToast } from '../context/ToastContext';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { ProductCard } from '../components/ProductCard';

export const ProductDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const product = getProductBySlug(slug || '');

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'details' | 'specs' | 'care'>('details');
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [showStickyBar, setShowStickyBar] = useState(false);

  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { showToast } = useToast();

  useEffect(() => {
    const handleScroll = () => {
      setShowStickyBar(window.scrollY > 450);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    setSelectedImageIndex(0);
    setQuantity(1);
  }, [slug]);

  // Handle lightbox keyboard Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isLightboxOpen) {
        setIsLightboxOpen(false);
      }
    };
    if (isLightboxOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isLightboxOpen]);

  if (!product) {
    return (
      <div className="container" style={{ padding: '80px 0', textAlign: 'center' }}>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.4rem', marginBottom: '16px' }}>
          Saree Not Found
        </h1>
        <p style={{ color: 'var(--color-text-muted)', marginBottom: '24px' }}>
          The requested saree does not exist in our authentic 17-garment catalog.
        </p>
        <Link to="/shop" className="btn btn-primary">
          Browse All Sarees
        </Link>
      </div>
    );
  }

  const isFavorite = isInWishlist(product.id);
  const relatedProducts = getRelatedProducts(product.id, 4);
  const categoryDef = CATEGORY_DEFINITIONS.find((c) => c.name === product.category);
  const categorySlug = categoryDef ? categoryDef.slug : 'all';

  const handleShare = async () => {
    const shareData = {
      title: product.name,
      text: `${product.name} — ${product.formattedPrice}`,
      url: window.location.href
    };
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        // Share dismissed
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast('Product link copied to clipboard!', { type: 'success' });
    }
  };

  const handleAddToCart = () => {
    addToCart(product.id, quantity);
  };

  return (
    <div className="product-detail-page" style={{ paddingBottom: '80px' }}>
      <div className="container">
        <Breadcrumbs
          items={[
            { label: 'Shop', path: '/shop' },
            { label: product.category, path: `/collections/${categorySlug}` },
            { label: product.id }
          ]}
        />

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '48px',
            margin: '20px 0 60px 0'
          }}
        >
          {/* Left Column: Image Gallery (Prompt 162-165) */}
          <div>
            {/* Main Garment Viewer */}
            <div
              onTouchStart={(e) => setTouchStart(e.targetTouches[0].clientX)}
              onTouchMove={(e) => {
                if (touchStart === null) return;
                const currentTouch = e.targetTouches[0].clientX;
                const diff = touchStart - currentTouch;
                if (diff > 50) {
                  setSelectedImageIndex((idx) => (idx === 0 ? 1 : 0));
                  setTouchStart(null);
                } else if (diff < -50) {
                  setSelectedImageIndex((idx) => (idx === 0 ? 1 : 0));
                  setTouchStart(null);
                }
              }}
              onTouchEnd={() => setTouchStart(null)}
              style={{
                position: 'relative',
                backgroundColor: '#F5EFEB',
                borderRadius: '6px',
                overflow: 'hidden',
                aspectRatio: '4 / 5',
                border: '1px solid var(--color-border)',
                marginBottom: '16px'
              }}
            >
              <picture style={{ width: '100%', height: '100%', display: 'block' }}>
                <source srcSet={product.images[selectedImageIndex].replace(/\.jpg$/, '.webp')} type="image/webp" />
                <img
                  src={product.images[selectedImageIndex]}
                  alt={`${product.name} - drape view ${selectedImageIndex + 1}`}
                  loading="eager"
                  // @ts-expect-error modern browser priority hint
                  fetchpriority="high"
                  decoding="async"
                  style={{ width: '100%', height: '100%', objectFit: 'contain', objectPosition: 'center top' }}
                />
              </picture>

              {/* Previous / Next Chevron Buttons */}
              <button
                onClick={() => setSelectedImageIndex((i) => (i === 0 ? 1 : 0))}
                aria-label="Previous view"
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '10px',
                  transform: 'translateY(-50%)',
                  width: '34px',
                  height: '34px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255, 255, 255, 0.85)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--color-text-main)',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
                }}
              >
                <ChevronLeft size={18} />
              </button>

              <button
                onClick={() => setSelectedImageIndex((i) => (i === 0 ? 1 : 0))}
                aria-label="Next view"
                style={{
                  position: 'absolute',
                  top: '50%',
                  right: '10px',
                  transform: 'translateY(-50%)',
                  width: '34px',
                  height: '34px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255, 255, 255, 0.85)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--color-text-main)',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
                }}
              >
                <ChevronRight size={18} />
              </button>

              {/* Lightbox button */}
              <button
                onClick={() => setIsLightboxOpen(true)}
                aria-label="Expand image in full resolution viewer"
                style={{
                  position: 'absolute',
                  top: '14px',
                  right: '14px',
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--color-text-main)',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
                }}
              >
                <Maximize2 size={18} />
              </button>

              {/* 2 views label */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '14px',
                  left: '14px',
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  padding: '4px 10px',
                  borderRadius: '3px',
                  fontSize: '0.72rem',
                  color: 'var(--color-text-muted)'
                }}
              >
                View {selectedImageIndex + 1} of {product.images.length}
              </div>
            </div>

            {/* Clickable Thumbnails */}
            <div style={{ display: 'flex', gap: '12px' }}>
              {product.images.map((imgSrc, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  aria-label={`View photo ${idx + 1}`}
                  style={{
                    width: '76px',
                    height: '95px',
                    borderRadius: '4px',
                    overflow: 'hidden',
                    border: selectedImageIndex === idx ? '2px solid var(--color-oxblood)' : '1px solid var(--color-border)',
                    padding: 0,
                    backgroundColor: '#F5EFEB',
                    opacity: selectedImageIndex === idx ? 1 : 0.7,
                    transition: 'opacity 150ms ease, border-color 150ms ease'
                  }}
                >
                  <img
                    src={imgSrc.replace('/images/products/', '/images/thumbnails/').replace(/\.jpg$/, '_thumb.webp')}
                    alt={`Thumbnail ${idx + 1}`}
                    loading="lazy"
                    decoding="async"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Garment Information & Purchase Actions */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  fontSize: '0.78rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  color: 'var(--color-text-light)',
                  marginBottom: '8px'
                }}
              >
                <span style={{ fontWeight: 600, color: 'var(--color-gold-muted)' }}>{product.category}</span>
                <span>•</span>
                <span>SKU: {product.id}</span>
                <span>•</span>
                <span>{product.primaryColor}</span>
              </div>

              <h1
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(1.8rem, 2.5vw, 2.5rem)',
                  fontWeight: 600,
                  lineHeight: 1.2,
                  marginBottom: '12px'
                }}
              >
                {product.name}
              </h1>

              {/* Pricing section */}
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', marginTop: '12px' }}>
                <span style={{ fontSize: '1.8rem', fontWeight: 700, color: 'var(--color-oxblood)' }}>
                  {product.formattedPrice}
                </span>
                {product.formattedMrp && (
                  <span style={{ fontSize: '1.1rem', color: 'var(--color-text-light)', textDecoration: 'line-through' }}>
                    {product.formattedMrp}
                  </span>
                )}
                {product.discount && (
                  <span className="badge badge-discount" style={{ padding: '4px 10px', fontSize: '0.78rem' }}>
                    {product.discount}
                  </span>
                )}
              </div>
            </div>

            <div className="divider" style={{ margin: '4px 0' }} />

            {/* Availability & Demo Status */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: 'var(--color-success)' }}>
              <Check size={16} />
              <span>In Stock • Availability indicative in this demo</span>
            </div>

            {/* Quantity Selector and Primary Add to Bag */}
            <div style={{ display: 'flex', gap: '14px', alignItems: 'center', marginTop: '6px' }}>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  border: '1px solid var(--color-border)',
                  borderRadius: '4px',
                  height: '48px'
                }}
              >
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  aria-label="Decrease quantity"
                  style={{ padding: '0 14px', height: '100%', color: 'var(--color-text-muted)' }}
                >
                  <Minus size={15} />
                </button>
                <span style={{ width: '32px', textAlign: 'center', fontWeight: 600, fontSize: '0.95rem' }}>
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => Math.min(10, q + 1))}
                  disabled={quantity >= 10}
                  aria-label="Increase quantity"
                  style={{ padding: '0 14px', height: '100%', color: 'var(--color-text-muted)' }}
                >
                  <Plus size={15} />
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className="btn btn-primary"
                style={{ flex: 1, height: '48px', gap: '10px' }}
              >
                <ShoppingBag size={18} />
                <span>Add to Bag</span>
              </button>

              <button
                onClick={() => toggleWishlist(product.id)}
                aria-label={isFavorite ? 'Remove from wishlist' : 'Save to wishlist'}
                className="btn btn-ghost"
                style={{
                  width: '48px',
                  height: '48px',
                  padding: 0,
                  color: isFavorite ? 'var(--color-oxblood)' : 'inherit',
                  borderColor: isFavorite ? 'var(--color-oxblood)' : 'var(--color-border)'
                }}
              >
                <Heart size={20} fill={isFavorite ? 'var(--color-oxblood)' : 'none'} />
              </button>

              <button
                onClick={handleShare}
                aria-label="Share this saree"
                className="btn btn-ghost"
                style={{ width: '48px', height: '48px', padding: 0 }}
                title="Share this saree"
              >
                <Share2 size={18} />
              </button>
            </div>

            {/* Demo Notice Banner */}
            <div
              style={{
                backgroundColor: 'var(--color-surface-subtle)',
                border: '1px solid var(--color-border)',
                borderRadius: '6px',
                padding: '14px 18px',
                fontSize: '0.84rem',
                color: 'var(--color-text-muted)',
                lineHeight: 1.5,
                display: 'flex',
                gap: '10px',
                alignItems: 'flex-start'
              }}
            >
              <Info size={16} style={{ color: 'var(--color-oxblood)', flexShrink: 0, marginTop: '2px' }} />
              <div>
                <strong>Explore & Preview: </strong>
                Add this garment to your sample bag to try the simulated ordering flow. No payment or real submission occurs.
              </div>
            </div>

            {/* Accordion Sections: Details, Specs, Care */}
            <div style={{ marginTop: '12px' }}>
              <div style={{ display: 'flex', borderBottom: '1px solid var(--color-border)' }}>
                <button
                  onClick={() => setActiveTab('details')}
                  style={{
                    padding: '12px 18px',
                    fontSize: '0.86rem',
                    fontWeight: 600,
                    borderBottom: activeTab === 'details' ? '2px solid var(--color-oxblood)' : '2px solid transparent',
                    color: activeTab === 'details' ? 'var(--color-oxblood)' : 'var(--color-text-muted)'
                  }}
                >
                  Description
                </button>
                <button
                  onClick={() => setActiveTab('specs')}
                  style={{
                    padding: '12px 18px',
                    fontSize: '0.86rem',
                    fontWeight: 600,
                    borderBottom: activeTab === 'specs' ? '2px solid var(--color-oxblood)' : '2px solid transparent',
                    color: activeTab === 'specs' ? 'var(--color-oxblood)' : 'var(--color-text-muted)'
                  }}
                >
                  Specifications
                </button>
                <button
                  onClick={() => setActiveTab('care')}
                  style={{
                    padding: '12px 18px',
                    fontSize: '0.86rem',
                    fontWeight: 600,
                    borderBottom: activeTab === 'care' ? '2px solid var(--color-oxblood)' : '2px solid transparent',
                    color: activeTab === 'care' ? 'var(--color-oxblood)' : 'var(--color-text-muted)'
                  }}
                >
                  Care & Fabric
                </button>
              </div>

              <div style={{ padding: '16px 0', fontSize: '0.9rem', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
                {activeTab === 'details' && (
                  <div>
                    <p style={{ whiteSpace: 'pre-line' }}>{product.description}</p>
                  </div>
                )}

                {activeTab === 'specs' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '140px 1fr', padding: '6px 0', borderBottom: '1px solid var(--color-border-subtle)' }}>
                      <span style={{ fontWeight: 600, color: 'var(--color-text-main)' }}>Fabric</span>
                      <span>{product.fabric}</span>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '140px 1fr', padding: '6px 0', borderBottom: '1px solid var(--color-border-subtle)' }}>
                      <span style={{ fontWeight: 600, color: 'var(--color-text-main)' }}>Primary Color</span>
                      <span>{product.primaryColor}</span>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '140px 1fr', padding: '6px 0', borderBottom: '1px solid var(--color-border-subtle)' }}>
                      <span style={{ fontWeight: 600, color: 'var(--color-text-main)' }}>Dimensions</span>
                      <span>{product.dimensions || 'Saree: 5.5 meters, Blouse: 0.80 meter'}</span>
                    </div>
                    {product.borderDetails && (
                      <div style={{ display: 'grid', gridTemplateColumns: '140px 1fr', padding: '6px 0', borderBottom: '1px solid var(--color-border-subtle)' }}>
                        <span style={{ fontWeight: 600, color: 'var(--color-text-main)' }}>Border & Pallu</span>
                        <span>{product.borderDetails}</span>
                      </div>
                    )}
                    <div style={{ display: 'grid', gridTemplateColumns: '140px 1fr', padding: '6px 0' }}>
                      <span style={{ fontWeight: 600, color: 'var(--color-text-main)' }}>SKU Identifier</span>
                      <span>{product.id}</span>
                    </div>
                  </div>
                )}

                {activeTab === 'care' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <p>
                      <strong>Recommended Care: </strong>
                      {product.careInstructions || 'Dry Clean Only recommended'}
                    </p>
                    <p>
                      To maintain the delicate borders, metallic threads, and structured drape of our sarees, always store folded within breathable muslin covers away from direct heat and moisture.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Related Sarees Recommendations (Prompt 177) */}
        {relatedProducts.length > 0 && (
          <section style={{ marginTop: '80px', paddingTop: '40px', borderTop: '1px solid var(--color-border)' }}>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', marginBottom: '8px' }}>
              Complementary Drapes
            </h2>
            <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', marginBottom: '28px' }}>
              More handpicked sarees from our {product.category} collection and related color palettes.
            </p>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))',
                gap: '24px'
              }}
            >
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Lightbox Modal (Prompt 164) */}
      {isLightboxOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 999999,
            backgroundColor: 'rgba(28, 30, 33, 0.94)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px'
          }}
          onClick={() => setIsLightboxOpen(false)}
        >
          <div
            style={{ position: 'relative', maxWidth: '800px', maxHeight: '92vh', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsLightboxOpen(false)}
              aria-label="Close full view"
              style={{
                position: 'absolute',
                top: '-40px',
                right: '0',
                color: '#FFFFFF',
                padding: '8px'
              }}
            >
              <X size={26} />
            </button>

            <img
              src={product.images[selectedImageIndex]}
              alt={`${product.name} large preview`}
              style={{
                maxWidth: '100%',
                maxHeight: '80vh',
                objectFit: 'contain',
                borderRadius: '4px',
                boxShadow: '0 10px 40px rgba(0,0,0,0.5)'
              }}
            />

            {/* Lightbox Thumbnails Switcher */}
            <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
              {product.images.map((imgSrc, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  style={{
                    width: '56px',
                    height: '70px',
                    borderRadius: '3px',
                    overflow: 'hidden',
                    border: selectedImageIndex === idx ? '2px solid #D4AF37' : '1px solid rgba(255,255,255,0.4)',
                    padding: 0,
                    opacity: selectedImageIndex === idx ? 1 : 0.6
                  }}
                >
                  <img
                    src={imgSrc.replace('/images/products/', '/images/thumbnails/').replace(/\.jpg$/, '_thumb.webp')}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Mobile Sticky Purchase Bar (Prompt 176) */}
      {showStickyBar && (
        <div
          className="mobile-sticky-purchase-bar"
          style={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: '#FFFFFF',
            borderTop: '1px solid var(--color-border)',
            padding: '10px 16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            zIndex: 900,
            boxShadow: '0 -2px 10px rgba(0, 0, 0, 0.08)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', overflow: 'hidden' }}>
            <img
              src={product.thumbnail}
              alt=""
              style={{ width: '38px', height: '46px', objectFit: 'cover', borderRadius: '3px', flexShrink: 0 }}
            />
            <div style={{ overflow: 'hidden' }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-text-main)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {product.name}
              </div>
              <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--color-oxblood)' }}>
                {product.formattedPrice}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '8px', flexShrink: 0, marginLeft: '8px' }}>
            <button
              onClick={() => toggleWishlist(product.id)}
              aria-label="Wishlist"
              className="btn btn-ghost"
              style={{ width: '40px', height: '40px', padding: 0 }}
            >
              <Heart size={18} fill={isFavorite ? 'var(--color-oxblood)' : 'none'} color={isFavorite ? 'var(--color-oxblood)' : 'currentColor'} />
            </button>
            <button
              onClick={handleAddToCart}
              className="btn btn-primary"
              style={{ padding: '0 16px', height: '40px', fontSize: '0.8rem' }}
            >
              <ShoppingBag size={14} />
              <span>Add</span>
            </button>
          </div>
        </div>
      )}

      <style>{`
        @media (min-width: 769px) {
          .mobile-sticky-purchase-bar {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
};
