import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ExternalLink, ShieldCheck } from 'lucide-react';
import { InstagramIcon } from './icons/InstagramIcon';
import { getCategories } from '../lib/catalog';
import { contentConfig } from '../lib/contentConfig';

export const Footer: React.FC = () => {
  const categories = getCategories();
  const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>({
    shop: false,
    info: false,
    care: false
  });

  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  return (
    <footer
      style={{
        backgroundColor: '#FFFFFF',
        borderTop: '1px solid var(--color-border)',
        marginTop: 'auto',
        color: 'var(--color-text-main)'
      }}
    >
      <div className="container" style={{ paddingTop: '64px', paddingBottom: '48px' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '40px',
            marginBottom: '48px'
          }}
        >
          {/* Brand Intro Column */}
          <div style={{ maxWidth: '320px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <img
                src="/brand/profile_logo_900.jpg"
                alt="Shubhlagn Sarees"
                style={{ width: '40px', height: '40px', borderRadius: '4px', objectFit: 'cover' }}
              />
              <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', fontWeight: 600, color: 'var(--color-oxblood)' }}>
                {contentConfig.brandName}
              </span>
            </div>
            <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', lineHeight: 1.6, marginBottom: '20px' }}>
              Celebrating Indian craftsmanship with carefully curated sarees across timeless fabrics. Designed for memorable occasions and traditional elegance.
            </p>
            <a
              href={contentConfig.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost"
              style={{ padding: '8px 16px', fontSize: '0.8rem', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
            >
              <InstagramIcon size={16} />
              <span>{contentConfig.instagramHandle}</span>
              <ExternalLink size={12} />
            </a>
          </div>

          {/* Shop Column */}
          <div>
            <div
              className="footer-accordion-header"
              onClick={() => toggleSection('shop')}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '16px',
                cursor: 'pointer'
              }}
            >
              <h4 style={{ fontFamily: 'var(--font-sans)', fontSize: '0.82rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-text-main)' }}>
                Fabric Collections
              </h4>
              <span className="footer-accordion-icon" style={{ display: 'none' }}>
                <ChevronDown size={16} style={{ transform: openSections.shop ? 'rotate(180deg)' : 'none' }} />
              </span>
            </div>
            <ul
              className={`footer-accordion-content ${openSections.shop ? 'open' : ''}`}
              style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}
            >
              <li>
                <Link to="/shop" style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)' }}>
                  All Sarees (17)
                </Link>
              </li>
              {categories.map((c) => (
                <li key={c.slug}>
                  <Link to={`/collections/${c.slug}`} style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)' }}>
                    {c.title} ({c.count})
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Boutique Information */}
          <div>
            <div
              className="footer-accordion-header"
              onClick={() => toggleSection('info')}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '16px',
                cursor: 'pointer'
              }}
            >
              <h4 style={{ fontFamily: 'var(--font-sans)', fontSize: '0.82rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-text-main)' }}>
                Explore Boutique
              </h4>
              <span className="footer-accordion-icon" style={{ display: 'none' }}>
                <ChevronDown size={16} style={{ transform: openSections.info ? 'rotate(180deg)' : 'none' }} />
              </span>
            </div>
            <ul
              className={`footer-accordion-content ${openSections.info ? 'open' : ''}`}
              style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}
            >
              <li>
                <Link to="/about" style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)' }}>
                  About the Brand
                </Link>
              </li>
              <li>
                <Link to="/lookbook" style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)' }}>
                  Saree Lookbook
                </Link>
              </li>
              <li>
                <Link to="/fabric-guide" style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)' }}>
                  Fabric & Care Guide
                </Link>
              </li>
              <li>
                <Link to="/faq" style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)' }}>
                  Frequently Asked Questions
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Assistance / Trust Info */}
          <div>
            <div
              className="footer-accordion-header"
              onClick={() => toggleSection('care')}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '16px',
                cursor: 'pointer'
              }}
            >
              <h4 style={{ fontFamily: 'var(--font-sans)', fontSize: '0.82rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-text-main)' }}>
                Assistance & Policies
              </h4>
              <span className="footer-accordion-icon" style={{ display: 'none' }}>
                <ChevronDown size={16} style={{ transform: openSections.care ? 'rotate(180deg)' : 'none' }} />
              </span>
            </div>
            <ul
              className={`footer-accordion-content ${openSections.care ? 'open' : ''}`}
              style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}
            >
              <li>
                <Link to="/contact" style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)' }}>
                  Contact & Inquiries
                </Link>
              </li>
              <li>
                <Link to="/shipping" style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)' }}>
                  Shipping Information
                </Link>
              </li>
              <li>
                <Link to="/returns" style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)' }}>
                  Refund & Return Terms
                </Link>
              </li>
              <li>
                <Link to="/wishlist" style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)' }}>
                  My Saved Sarees
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar & Disclaimer */}
        <div
          style={{
            borderTop: '1px solid var(--color-border)',
            paddingTop: '28px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            fontSize: '0.78rem',
            color: 'var(--color-text-light)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ShieldCheck size={16} style={{ color: 'var(--color-oxblood)' }} />
            <span>
              <strong>Frontend Showcase Notice:</strong> This website is an interactive customer-facing demo developed for Google Antigravity. It operates entirely offline in browser memory and collects zero payments or real customer orders.
            </span>
          </div>

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '12px',
              paddingTop: '8px'
            }}
          >
            <div>
              © {new Date().getFullYear()} {contentConfig.brandName}. All 17 authentic garment photographs and specifications are catalog references.
            </div>
            <div style={{ display: 'flex', gap: '16px' }}>
              <Link to="/shipping" style={{ color: 'inherit' }}>Shipping Info</Link>
              <Link to="/returns" style={{ color: 'inherit' }}>Return Terms</Link>
              <Link to="/contact" style={{ color: 'inherit' }}>Contact</Link>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .footer-accordion-icon {
            display: inline-block !important;
          }
          .footer-accordion-content {
            display: none !important;
          }
          .footer-accordion-content.open {
            display: flex !important;
            padding-bottom: 16px;
          }
        }
      `}</style>
    </footer>
  );
};
