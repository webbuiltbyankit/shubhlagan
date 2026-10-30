import React from 'react';
import { ExternalLink, Sparkles } from 'lucide-react';
import { InstagramIcon } from '../components/icons/InstagramIcon';
import { contentConfig } from '../lib/contentConfig';
import { getAssetUrl } from '../lib/catalog';
import { Breadcrumbs } from '../components/Breadcrumbs';

export const About: React.FC = () => {
  return (
    <div className="about-page" style={{ paddingBottom: '80px' }}>
      <div className="container" style={{ maxWidth: '960px' }}>
        <Breadcrumbs items={[{ label: 'About Shubhlagn' }]} />

        {/* Hero Section */}
        <div style={{ textAlign: 'center', margin: '24px 0 48px 0' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
            <Sparkles size={16} style={{ color: 'var(--color-gold)' }} />
            <span style={{ fontSize: '0.78rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--color-gold-muted)', fontWeight: 600 }}>
              Boutique Heritage & Drape Aesthetics
            </span>
          </div>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.4rem, 4vw, 3.4rem)', lineHeight: 1.2, marginBottom: '16px' }}>
            A Celebration of Timeless Indian Drapes
          </h1>
          <p style={{ fontSize: '1.05rem', color: 'var(--color-text-muted)', maxWidth: '680px', margin: '0 auto', lineHeight: 1.7 }}>
            At Shubhlagn Sarees, we curate ethnic attire that honors tradition while embracing modern wearable grace. Every saree in our edit is thoughtfully composed for ceremonies, weddings, and celebratory moments.
          </p>
        </div>

        {/* Visual Dual Image Showcase */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px',
            marginBottom: '56px'
          }}
        >
          <div style={{ borderRadius: '8px', overflow: 'hidden', border: '1px solid var(--color-border)', backgroundColor: '#F5EFEB' }}>
            <img
              src={getAssetUrl('/images/products/SHL-0010_main.jpg')}
              alt="Rich Red embroidered saree drape"
              style={{ width: '100%', height: '420px', objectFit: 'cover' }}
            />
          </div>
          <div style={{ borderRadius: '8px', overflow: 'hidden', border: '1px solid var(--color-border)', backgroundColor: '#F5EFEB' }}>
            <img
              src={getAssetUrl('/images/products/SHL-0001_main.jpg')}
              alt="Vibrant Yellow festive saree drape"
              style={{ width: '100%', height: '420px', objectFit: 'cover' }}
            />
          </div>
        </div>

        {/* Brand Story Narrative */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            border: '1px solid var(--color-border)',
            borderRadius: '8px',
            padding: '40px',
            marginBottom: '48px',
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
            lineHeight: 1.8,
            fontSize: '0.98rem',
            color: 'var(--color-text-muted)'
          }}
        >
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', color: 'var(--color-text-main)' }}>
            The Shubhlagn Philosophy
          </h2>

          <p>
            The saree is not merely an ensemble; it is a fluid, expressive art form woven with cultural reverence and subtle luxury. Shubhlagn Sarees focuses on balanced fabric selections—balancing texture, sheen, pallu weight, and border proportions so that each drape sits effortlessly on the body.
          </p>

          <p>
            Our current digital collection encompasses six distinctive fabrics: textured Fandy, fluid Georgette, dignified Silk, gossamer Chiffon, fine Chinon, and crisp Crepe. Each piece is cataloged with authentic drape photography and accompanied by an unstitched 0.80m matching blouse piece.
          </p>

          <div
            style={{
              borderLeft: '3px solid var(--color-oxblood)',
              padding: '16px 20px',
              backgroundColor: 'var(--color-surface-subtle)',
              fontStyle: 'italic',
              color: 'var(--color-text-main)'
            }}
          >
            "A well-chosen saree transforms an auspicious gathering into an unforgettable memory."
          </div>

          <p>
            We adhere strictly to transparent catalog standards: genuine prices, verified fabric classifications, and unembellished garment descriptions without inflated claims.
          </p>
        </div>

        {/* Instagram & Social Verification */}
        <div
          style={{
            backgroundColor: 'var(--color-surface-subtle)',
            border: '1px solid var(--color-border)',
            borderRadius: '8px',
            padding: '32px',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '24px'
          }}
        >
          <div>
            <div style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-gold-muted)', fontWeight: 600, marginBottom: '6px' }}>
              Connect With Us
            </div>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', marginBottom: '8px' }}>
              Follow on Instagram
            </h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', margin: 0 }}>
              View regular new saree showcases, drape reels, and styling highlights at {contentConfig.instagramHandle}.
            </p>
          </div>

          <a
            href={contentConfig.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
          >
            <InstagramIcon size={18} />
            <span>Visit @shubhlagn_sarees</span>
            <ExternalLink size={14} />
          </a>
        </div>
      </div>
    </div>
  );
};
