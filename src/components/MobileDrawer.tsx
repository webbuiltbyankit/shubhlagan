import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { X, ChevronRight, Sparkles } from 'lucide-react';
import { getCategories, getAssetUrl } from '../lib/catalog';
import { contentConfig } from '../lib/contentConfig';

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenHowItWorks: () => void;
}

export const MobileDrawer: React.FC<MobileDrawerProps> = ({ isOpen, onClose, onOpenHowItWorks }) => {
  const location = useLocation();
  const categories = getCategories();

  useEffect(() => {
    onClose();
  }, [location.pathname, onClose]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        backgroundColor: 'rgba(28, 30, 33, 0.65)',
        backdropFilter: 'blur(3px)',
        display: 'flex'
      }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Navigation Menu"
    >
      <div
        style={{
          width: '85%',
          maxWidth: '360px',
          height: '100%',
          backgroundColor: '#FFFFFF',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: 'var(--shadow-drawer)',
          overflowY: 'auto'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div
          style={{
            padding: '20px',
            borderBottom: '1px solid var(--color-border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <picture style={{ display: 'block', width: '36px', height: '36px' }}>
              <source srcSet={getAssetUrl('/brand/profile_logo_900.webp')} type="image/webp" />
              <img
                src={getAssetUrl('/brand/profile_logo_900.jpg')}
                alt="Shubhlagn Logo"
                loading="lazy"
                decoding="async"
                width="36"
                height="36"
                style={{ width: '36px', height: '36px', borderRadius: '4px', objectFit: 'cover' }}
              />
            </picture>
            <div>
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', fontWeight: 600, color: 'var(--color-oxblood)', lineHeight: 1.1 }}>
                {contentConfig.brandName}
              </div>
              <div style={{ fontSize: '0.65rem', color: 'var(--color-text-light)', letterSpacing: '0.04em' }}>
                Boutique Collection
              </div>
            </div>
          </div>
          <button onClick={onClose} aria-label="Close menu" style={{ color: 'var(--color-text-muted)', padding: '4px' }}>
            <X size={22} />
          </button>
        </div>

        {/* Navigation Links */}
        <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <Link
            to="/"
            style={{
              padding: '12px 0',
              fontSize: '1rem',
              fontWeight: 500,
              borderBottom: '1px solid var(--color-border-subtle)',
              color: location.pathname === '/' ? 'var(--color-oxblood)' : 'var(--color-text-main)'
            }}
          >
            Home
          </Link>

          <Link
            to="/shop"
            style={{
              padding: '12px 0',
              fontSize: '1rem',
              fontWeight: 500,
              borderBottom: '1px solid var(--color-border-subtle)',
              color: location.pathname === '/shop' ? 'var(--color-oxblood)' : 'var(--color-text-main)'
            }}
          >
            Shop All Sarees (17)
          </Link>

          {/* Fabric Categories */}
          <div style={{ marginTop: '14px', marginBottom: '8px' }}>
            <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-gold-muted)', fontWeight: 600, marginBottom: '8px' }}>
              Explore By Fabric
            </div>
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                to={`/collections/${cat.slug}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '9px 12px',
                  borderRadius: '4px',
                  backgroundColor: 'var(--color-surface-subtle)',
                  marginBottom: '6px',
                  fontSize: '0.88rem',
                  color: location.pathname === `/collections/${cat.slug}` ? 'var(--color-oxblood)' : 'var(--color-text-main)'
                }}
              >
                <span>{cat.title}</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--color-text-light)', fontSize: '0.78rem' }}>
                  <span>{cat.count}</span>
                  <ChevronRight size={14} />
                </div>
              </Link>
            ))}
          </div>

          <div className="divider" style={{ margin: '12px 0' }} />

          {/* Editorial Links */}
          <Link to="/about" style={{ padding: '10px 0', fontSize: '0.92rem', color: 'var(--color-text-muted)' }}>
            About Shubhlagn
          </Link>
          <Link to="/lookbook" style={{ padding: '10px 0', fontSize: '0.92rem', color: 'var(--color-text-muted)' }}>
            Saree Lookbook
          </Link>
          <Link to="/fabric-guide" style={{ padding: '10px 0', fontSize: '0.92rem', color: 'var(--color-text-muted)' }}>
            Fabric & Drape Guide
          </Link>
          <Link to="/faq" style={{ padding: '10px 0', fontSize: '0.92rem', color: 'var(--color-text-muted)' }}>
            Help & FAQ
          </Link>
          <Link to="/contact" style={{ padding: '10px 0', fontSize: '0.92rem', color: 'var(--color-text-muted)' }}>
            Contact & Inquiry
          </Link>
        </div>

        {/* Footer info in drawer */}
        <div style={{ marginTop: 'auto', padding: '20px', borderTop: '1px solid var(--color-border)', backgroundColor: 'var(--color-surface-subtle)' }}>
          <button
            onClick={() => {
              onClose();
              onOpenHowItWorks();
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.8rem',
              color: 'var(--color-gold-muted)',
              fontWeight: 600,
              marginBottom: '10px'
            }}
          >
            <Sparkles size={14} />
            <span>How This Demo Works</span>
          </button>
          <div style={{ fontSize: '0.72rem', color: 'var(--color-text-light)' }}>
            Frontend showcase for Shubhlagn Sarees. Static local prototype.
          </div>
        </div>
      </div>
    </div>
  );
};

