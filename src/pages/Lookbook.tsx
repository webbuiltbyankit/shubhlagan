import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight } from 'lucide-react';
import { products } from '../lib/catalog';
import { Breadcrumbs } from '../components/Breadcrumbs';

export const Lookbook: React.FC = () => {
  // Select distinct SKUs for visual presentation
  const lookbookItems = [
    { product: products[0], layout: 'tall', note: 'Vibrant Yellow draped silhouette' },
    { product: products[9], layout: 'wide', note: 'Rich Crimson tone with detailed embroidery' },
    { product: products[12], layout: 'tall', note: 'Structured weave and border piping' },
    { product: products[14], layout: 'square', note: 'Contrast floral detailing' },
    { product: products[2], layout: 'tall', note: 'Lustrous festive finish' },
    { product: products[4], layout: 'wide', note: 'Fluid georgette movement' }
  ].filter(item => item.product !== undefined);

  return (
    <div className="lookbook-page" style={{ paddingBottom: '80px' }}>
      <div className="container" style={{ maxWidth: '1100px' }}>
        <Breadcrumbs items={[{ label: 'Lookbook' }]} />

        {/* Header */}
        <div style={{ textAlign: 'center', margin: '24px 0 48px 0' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
            <Sparkles size={16} style={{ color: 'var(--color-gold)' }} />
            <span style={{ fontSize: '0.78rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--color-gold-muted)', fontWeight: 600 }}>
              Visual Drape Archive
            </span>
          </div>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.4rem, 4vw, 3.4rem)', marginBottom: '12px' }}>
            Saree Lookbook
          </h1>
          <p style={{ fontSize: '1rem', color: 'var(--color-text-muted)', maxWidth: '640px', margin: '0 auto', lineHeight: 1.7 }}>
            An editorial visual gallery celebrating drape proportions, textile textures, and intricate border craftsmanship across our authentic collection.
          </p>
        </div>

        {/* Masonry-Style Lookbook Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '32px'
          }}
        >
          {lookbookItems.map((item) => {
            const p = item.product;
            return (
              <div
                key={p.id}
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  border: '1px solid var(--color-border)',
                  boxShadow: 'var(--shadow-subtle)',
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2px', backgroundColor: '#F0E9E3' }}>
                  <picture style={{ display: 'block', width: '100%', height: '280px' }}>
                    <source srcSet={p.images[0].replace(/\.jpg$/, '.webp')} type="image/webp" />
                    <img
                      src={p.images[0]}
                      alt={`${p.name} full drape`}
                      loading="lazy"
                      decoding="async"
                      style={{ display: 'block', width: '100%', height: '280px', objectFit: 'cover' }}
                    />
                  </picture>
                  <picture style={{ display: 'block', width: '100%', height: '280px' }}>
                    <source srcSet={p.images[1].replace(/\.jpg$/, '.webp')} type="image/webp" />
                    <img
                      src={p.images[1]}
                      alt={`${p.name} texture detail`}
                      loading="lazy"
                      decoding="async"
                      style={{ display: 'block', width: '100%', height: '280px', objectFit: 'cover' }}
                    />
                  </picture>
                </div>

                <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--color-gold-muted)', fontWeight: 600 }}>
                      {p.category} • {p.id}
                    </span>
                    <span style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--color-oxblood)' }}>
                      {p.formattedPrice}
                    </span>
                  </div>

                  <h3 style={{ fontFamily: 'var(--font-sans)', fontSize: '1.05rem', fontWeight: 600 }}>
                    {p.name}
                  </h3>

                  <p style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)', margin: 0 }}>
                    {item.note}
                  </p>

                  <div style={{ marginTop: '10px' }}>
                    <Link
                      to={`/product/${p.slug}`}
                      className="btn-link"
                      style={{ fontSize: '0.85rem', fontWeight: 600 }}
                    >
                      <span>Explore this saree</span>
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div style={{ textAlign: 'center', marginTop: '60px' }}>
          <Link to="/shop" className="btn btn-primary" style={{ padding: '14px 32px' }}>
            <span>Explore Complete 17-Garment Catalog</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
};
