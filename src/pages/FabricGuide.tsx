import React from 'react';
import { Link } from 'react-router-dom';
import { Feather, ShieldCheck, ArrowRight } from 'lucide-react';
import { getCategories } from '../lib/catalog';
import { Breadcrumbs } from '../components/Breadcrumbs';

export const FabricGuide: React.FC = () => {
  const categories = getCategories();

  const fabricDetails: { [key: string]: { feel: string; occasion: string; drapingTip: string } } = {
    'Fandy Sarees': {
      feel: 'Textured with subtle structured body that holds pleats firmly throughout long ceremonies.',
      occasion: 'Festivals, sangeets, poojas, and auspicious celebrations.',
      drapingTip: 'Ensure well-aligned pleats at the waist; the structured weave prevents pleat sagging.'
    },
    'Georgette Sarees': {
      feel: 'Lightweight, springy, and fluid with a graceful natural flow that drapes closely to the body.',
      occasion: 'Cocktails, daytime receptions, family gatherings, and evening dinners.',
      drapingTip: 'Use fine dress pins on the shoulder pallu so the fluid material glides without slipping.'
    },
    'Silk Sarees': {
      feel: 'Smooth, lustrous finish with dignified weight and heirloom-level visual radiance.',
      occasion: 'Weddings, formal ethnic galas, and religious ceremonies.',
      drapingTip: 'Iron on low silk heat with a protective muslin press cloth to protect metallic border threads.'
    },
    'Chiffon Sarees': {
      feel: 'Feather-light, gossamer, and sheer with a delicate airy softness against the skin.',
      occasion: 'Intimate gatherings, summer festivities, and celebratory brunches.',
      drapingTip: 'Keep pleats wider to showcase the delicate translucent texture.'
    },
    'Chinon Sarees': {
      feel: 'Subtle crepe sheen combined with rich textile body that catches the evening light.',
      occasion: 'Formal receptions, festive dinners, and milestone parties.',
      drapingTip: 'Pair with an unstitched tailored blouse for a balanced contemporary silhouette.'
    },
    'Crepe Sarees': {
      feel: 'Distinctive crimped texture, non-creasing, and crisp structured fall with minimal clinging.',
      occasion: 'Semi-formal celebrations, cultural gatherings, and day events.',
      drapingTip: 'Naturally resists creasing, making it ideal for travel and long event days.'
    }
  };

  return (
    <div className="fabric-guide-page" style={{ paddingBottom: '80px' }}>
      <div className="container" style={{ maxWidth: '980px' }}>
        <Breadcrumbs items={[{ label: 'Fabric Guide' }]} />

        {/* Header */}
        <div style={{ textAlign: 'center', margin: '24px 0 48px 0' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
            <Feather size={16} style={{ color: 'var(--color-gold-muted)' }} />
            <span style={{ fontSize: '0.78rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--color-gold-muted)', fontWeight: 600 }}>
              Textile Knowledge & Drape Notes
            </span>
          </div>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.4rem, 4vw, 3.2rem)', marginBottom: '14px' }}>
            The Shubhlagn Fabric & Drape Guide
          </h1>
          <p style={{ fontSize: '1rem', color: 'var(--color-text-muted)', maxWidth: '640px', margin: '0 auto', lineHeight: 1.7 }}>
            A guide to understanding the distinctive textures, weights, and styling nuances of the six fabrics present in our catalog.
          </p>
        </div>

        {/* Fabric Grid */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', marginBottom: '60px' }}>
          {categories.map((cat) => {
            const extra = fabricDetails[cat.name];
            return (
              <div
                key={cat.slug}
                style={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid var(--color-border)',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                  alignItems: 'center'
                }}
              >
                <div style={{ height: '260px', overflow: 'hidden', backgroundColor: '#F5EFEB' }}>
                  <picture style={{ display: 'block', width: '100%', height: '100%' }}>
                    <source srcSet={cat.coverImage.replace(/\.jpg$/, '.webp')} type="image/webp" />
                    <img
                      src={cat.coverImage}
                      alt={cat.title}
                      loading="lazy"
                      decoding="async"
                      style={{ display: 'block', width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </picture>
                </div>

                <div style={{ padding: '28px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', color: 'var(--color-text-main)' }}>
                      {cat.title}
                    </h3>
                    <span className="badge">{cat.count} {cat.count === 1 ? 'saree' : 'sarees'}</span>
                  </div>

                  <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
                    {cat.description}
                  </p>

                  {extra && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.84rem', marginTop: '4px' }}>
                      <div>
                        <strong>Tactile Feel: </strong> {extra.feel}
                      </div>
                      <div>
                        <strong>Occasion Fit: </strong> {extra.occasion}
                      </div>
                      <div>
                        <strong>Draping Tip: </strong> {extra.drapingTip}
                      </div>
                    </div>
                  )}

                  <div style={{ marginTop: '8px' }}>
                    <Link to={`/collections/${cat.slug}`} className="btn-link" style={{ fontSize: '0.86rem', fontWeight: 600 }}>
                      <span>View {cat.title} ({cat.count})</span>
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Universal Care Guide Section */}
        <div
          style={{
            backgroundColor: 'var(--color-surface-subtle)',
            border: '1px solid var(--color-border)',
            borderRadius: '8px',
            padding: '36px',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <ShieldCheck size={24} style={{ color: 'var(--color-oxblood)' }} />
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem' }}>
              Universal Saree Care Guide
            </h2>
          </div>

          <p style={{ fontSize: '0.94rem', color: 'var(--color-text-muted)', lineHeight: 1.7 }}>
            All sarees in the Shubhlagn catalog carry the certified instruction: <strong>Dry Clean Only recommended</strong>. Follow these proven principles to keep your garments pristine for years:
          </p>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '20px',
              marginTop: '8px'
            }}
          >
            <div style={{ backgroundColor: '#FFFFFF', padding: '20px', borderRadius: '6px', border: '1px solid var(--color-border)' }}>
              <h4 style={{ fontFamily: 'var(--font-sans)', fontSize: '0.95rem', fontWeight: 600, marginBottom: '8px', color: 'var(--color-oxblood)' }}>
                1. Professional Cleaning
              </h4>
              <p style={{ fontSize: '0.84rem', color: 'var(--color-text-muted)', margin: 0, lineHeight: 1.6 }}>
                Avoid machine washing or harsh chemical detergents. Professional dry cleaning protects embroidered threads and fine piping.
              </p>
            </div>

            <div style={{ backgroundColor: '#FFFFFF', padding: '20px', borderRadius: '6px', border: '1px solid var(--color-border)' }}>
              <h4 style={{ fontFamily: 'var(--font-sans)', fontSize: '0.95rem', fontWeight: 600, marginBottom: '8px', color: 'var(--color-oxblood)' }}>
                2. Storage in Muslin
              </h4>
              <p style={{ fontSize: '0.84rem', color: 'var(--color-text-muted)', margin: 0, lineHeight: 1.6 }}>
                Store garments wrapped in breathable, unbleached cotton or muslin cloth. Avoid synthetic plastic covers which trap humidity.
              </p>
            </div>

            <div style={{ backgroundColor: '#FFFFFF', padding: '20px', borderRadius: '6px', border: '1px solid var(--color-border)' }}>
              <h4 style={{ fontFamily: 'var(--font-sans)', fontSize: '0.95rem', fontWeight: 600, marginBottom: '8px', color: 'var(--color-oxblood)' }}>
                3. Gentle Steaming
              </h4>
              <p style={{ fontSize: '0.84rem', color: 'var(--color-text-muted)', margin: 0, lineHeight: 1.6 }}>
                Use a vertical garment steamer rather than a direct heavy flatiron. For borders, iron strictly on the reverse side with a cloth barrier.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
