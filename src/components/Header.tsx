import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Heart, ShoppingBag, Menu, ChevronDown, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { getCategories } from '../lib/catalog';
import { contentConfig } from '../lib/contentConfig';
import { SearchModal } from './SearchModal';
import { MobileDrawer } from './MobileDrawer';
import { MiniCartDrawer } from './MiniCartDrawer';
import { HowItWorksModal } from './HowItWorksModal';

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isHowItWorksOpen, setIsHowItWorksOpen] = useState(false);
  const [isFabricMenuOpen, setIsFabricMenuOpen] = useState(false);

  const { cartCount, setIsMiniCartOpen } = useCart();
  const { wishlistIds } = useWishlist();
  const location = useLocation();
  const categories = getCategories();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on page change
  useEffect(() => {
    setIsFabricMenuOpen(false);
  }, [location.pathname]);

  return (
    <>
      {/* 1. Announcement Strip */}
      <div
        style={{
          backgroundColor: '#621D23',
          color: '#FAF6F0',
          padding: '8px var(--gutter-mobile)',
          fontSize: '0.78rem',
          letterSpacing: '0.04em',
          textAlign: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '12px'
        }}
      >
        <span>{contentConfig.tagline}</span>
        <span style={{ opacity: 0.5 }}>•</span>
        <button
          onClick={() => setIsHowItWorksOpen(true)}
          style={{
            background: 'rgba(255, 255, 255, 0.15)',
            border: 'none',
            color: '#FFFFFF',
            padding: '2px 8px',
            borderRadius: '2px',
            fontSize: '0.72rem',
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px'
          }}
        >
          <Sparkles size={11} style={{ color: '#D4AF37' }} />
          <span>Demo Overview</span>
        </button>
      </div>

      {/* 2. Main Sticky Navigation Header */}
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 1000,
          backgroundColor: '#FFFFFF',
          borderBottom: isScrolled ? '1px solid var(--color-border)' : '1px solid var(--color-border-subtle)',
          boxShadow: isScrolled ? '0 2px 10px rgba(0, 0, 0, 0.04)' : 'none',
          transition: 'box-shadow var(--transition-fast), border-color var(--transition-fast)'
        }}
      >
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '74px' }}>
          {/* Mobile Hamburger Menu Toggle */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              onClick={() => setIsDrawerOpen(true)}
              aria-label="Open navigation menu"
              className="mobile-nav-toggle"
              style={{
                display: 'none',
                padding: '8px',
                color: 'var(--color-text-main)'
              }}
            >
              <Menu size={22} />
            </button>

            {/* Brand Logo & Wordmark */}
            <Link
              to="/"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                textDecoration: 'none'
              }}
            >
              <img
                src="/brand/profile_logo_900.jpg"
                alt="Shubhlagn Sarees Identity"
                className="header-brand-logo"
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '3px',
                  objectFit: 'cover',
                  border: '1px solid var(--color-border-subtle)'
                }}
              />
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: 'clamp(1.15rem, 3.5vw, 1.45rem)',
                    fontWeight: 600,
                    letterSpacing: '-0.01em',
                    color: 'var(--color-oxblood)',
                    lineHeight: 1
                  }}
                >
                  {contentConfig.brandName}
                </span>
                <span
                  className="brand-subtitle"
                  style={{
                    fontSize: '0.66rem',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: 'var(--color-gold-muted)',
                    fontWeight: 600,
                    marginTop: '2px'
                  }}
                >
                  Boutique Drapes
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav
            className="desktop-nav"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '24px',
              height: '100%'
            }}
            aria-label="Main Navigation"
          >
            <Link
              to="/"
              style={{
                fontSize: '0.88rem',
                fontWeight: location.pathname === '/' ? 600 : 500,
                color: location.pathname === '/' ? 'var(--color-oxblood)' : 'var(--color-text-main)',
                padding: '6px 0'
              }}
            >
              Home
            </Link>

            <Link
              to="/shop"
              style={{
                fontSize: '0.88rem',
                fontWeight: location.pathname === '/shop' ? 600 : 500,
                color: location.pathname === '/shop' ? 'var(--color-oxblood)' : 'var(--color-text-main)',
                padding: '6px 0'
              }}
            >
              Shop All
            </Link>

            {/* Shop By Fabric Mega Dropdown */}
            <div
              style={{ position: 'relative', height: '100%', display: 'flex', alignItems: 'center' }}
              onMouseEnter={() => setIsFabricMenuOpen(true)}
              onMouseLeave={() => setIsFabricMenuOpen(false)}
            >
              <button
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  fontSize: '0.88rem',
                  fontWeight: location.pathname.startsWith('/collections') ? 600 : 500,
                  color: location.pathname.startsWith('/collections') ? 'var(--color-oxblood)' : 'var(--color-text-main)',
                  padding: '6px 0'
                }}
                aria-expanded={isFabricMenuOpen}
              >
                <span>Shop by Fabric</span>
                <ChevronDown size={14} style={{ transform: isFabricMenuOpen ? 'rotate(180deg)' : 'none', transition: 'transform 200ms ease' }} />
              </button>

              {isFabricMenuOpen && (
                <div
                  style={{
                    position: 'absolute',
                    top: '70px',
                    left: '-60px',
                    width: '520px',
                    backgroundColor: '#FFFFFF',
                    border: '1px solid var(--color-border)',
                    borderRadius: '6px',
                    boxShadow: 'var(--shadow-elevated)',
                    padding: '16px',
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '12px',
                    zIndex: 1001,
                    animation: 'fadeInUp 150ms ease'
                  }}
                >
                  {categories.map((cat) => (
                    <Link
                      key={cat.slug}
                      to={`/collections/${cat.slug}`}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        padding: '8px',
                        borderRadius: '4px',
                        backgroundColor: 'var(--color-surface-subtle)',
                        transition: 'background var(--transition-fast)'
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#EFE8E1')}
                      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'var(--color-surface-subtle)')}
                    >
                      <img
                        src={cat.coverImage}
                        alt={cat.title}
                        style={{ width: '48px', height: '48px', objectFit: 'cover', borderRadius: '3px' }}
                      />
                      <div>
                        <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-main)' }}>
                          {cat.title}
                        </div>
                        <div style={{ fontSize: '0.74rem', color: 'var(--color-text-light)' }}>
                          {cat.count} sarees
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              to="/about"
              style={{
                fontSize: '0.88rem',
                fontWeight: location.pathname === '/about' ? 600 : 500,
                color: location.pathname === '/about' ? 'var(--color-oxblood)' : 'var(--color-text-main)',
                padding: '6px 0'
              }}
            >
              About
            </Link>

            <Link
              to="/lookbook"
              style={{
                fontSize: '0.88rem',
                fontWeight: location.pathname === '/lookbook' ? 600 : 500,
                color: location.pathname === '/lookbook' ? 'var(--color-oxblood)' : 'var(--color-text-main)',
                padding: '6px 0'
              }}
            >
              Lookbook
            </Link>

            <Link
              to="/fabric-guide"
              style={{
                fontSize: '0.88rem',
                fontWeight: location.pathname === '/fabric-guide' ? 600 : 500,
                color: location.pathname === '/fabric-guide' ? 'var(--color-oxblood)' : 'var(--color-text-main)',
                padding: '6px 0'
              }}
            >
              Fabric Guide
            </Link>
          </nav>

          {/* Right Action Controls: Search, Wishlist, Cart */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              onClick={() => setIsSearchOpen(true)}
              aria-label="Search sarees catalog"
              className="btn-icon"
              title="Search"
            >
              <Search size={20} />
            </button>

            <Link
              to="/wishlist"
              className="btn-icon"
              aria-label={`Wishlist (${wishlistIds.length} items)`}
              title="Wishlist"
              style={{ position: 'relative' }}
            >
              <Heart size={20} fill={wishlistIds.length > 0 ? 'var(--color-oxblood)' : 'none'} color={wishlistIds.length > 0 ? 'var(--color-oxblood)' : 'currentColor'} />
              {wishlistIds.length > 0 && (
                <span
                  style={{
                    position: 'absolute',
                    top: '4px',
                    right: '4px',
                    backgroundColor: 'var(--color-oxblood)',
                    color: '#FFFFFF',
                    fontSize: '0.65rem',
                    fontWeight: 700,
                    width: '18px',
                    height: '18px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  {wishlistIds.length}
                </span>
              )}
            </Link>

            <button
              onClick={() => setIsMiniCartOpen(true)}
              aria-label={`Shopping bag (${cartCount} items)`}
              className="btn-icon"
              title="Shopping Bag"
              style={{ position: 'relative' }}
            >
              <ShoppingBag size={20} />
              {cartCount > 0 && (
                <span
                  style={{
                    position: 'absolute',
                    top: '4px',
                    right: '4px',
                    backgroundColor: 'var(--color-oxblood)',
                    color: '#FFFFFF',
                    fontSize: '0.65rem',
                    fontWeight: 700,
                    width: '18px',
                    height: '18px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Modals & Drawers */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      <MobileDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onOpenHowItWorks={() => setIsHowItWorksOpen(true)}
      />
      <MiniCartDrawer />
      <HowItWorksModal isOpen={isHowItWorksOpen} onClose={() => setIsHowItWorksOpen(false)} />

      {/* Responsive Header CSS */}
      <style>{`
        @media (max-width: 900px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-nav-toggle {
            display: inline-flex !important;
          }
        }
        @media (max-width: 480px) {
          .brand-subtitle {
            display: none !important;
          }
          .header-brand-logo {
            width: 36px !important;
            height: 36px !important;
          }
        }
      `}</style>
    </>
  );
};

