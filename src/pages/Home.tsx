import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Feather, Bookmark, Compass, Check } from 'lucide-react';
import { getCategories, getProductById, getAssetUrl } from '../lib/catalog';
import { SectionHeading } from '../components/SectionHeading';
import { ProductCard } from '../components/ProductCard';

export const Home: React.FC = () => {
  const categories = getCategories();

  // Curated featured SKUs (Prompt 083)
  const featuredSkus = ['SHL-0001', 'SHL-0010', 'SHL-0013', 'SHL-0015']
    .map(id => getProductById(id))
    .filter((p): p is NonNullable<typeof p> => p !== undefined);

  // Second curated grid (Prompt 094)
  const secondGridSkus = ['SHL-0003', 'SHL-0005', 'SHL-0008', 'SHL-0014']
    .map(id => getProductById(id))
    .filter((p): p is NonNullable<typeof p> => p !== undefined);

  // Spotlight SKU (Prompt 089)
  const spotlightProduct = getProductById('SHL-0013');

  // Shades for color-led discovery (Prompt 086)
  const popularShades = [
    { label: 'Vibrant Yellow', color: '#E8B923' },
    { label: 'Deep Maroon', color: '#6A1A24' },
    { label: 'Peacock Blue', color: '#1B4D68' },
    { label: 'Pastel Mint', color: '#7E9F8B' },
    { label: 'Classic Red', color: '#A3222A' },
    { label: 'Multicolor', color: '#D4AF37' }
  ];

  return (
    <div className="home-page">
      {/* 1. Hero Section (Prompts 061-080) */}
      <section
        style={{
          position: 'relative',
          backgroundColor: '#FCFAF8',
          borderBottom: '1px solid var(--color-border)',
          overflow: 'hidden',
          padding: '40px 0 60px 0'
        }}
      >
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '40px',
              alignItems: 'center'
            }}
          >
            {/* Left Content */}
            <div style={{ maxWidth: '580px' }}>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  backgroundColor: 'var(--color-surface-subtle)',
                  padding: '6px 14px',
                  borderRadius: '20px',
                  fontSize: '0.78rem',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: 'var(--color-gold-muted)',
                  fontWeight: 600,
                  marginBottom: '20px',
                  border: '1px solid var(--color-border)'
                }}
              >
                <Sparkles size={14} style={{ color: 'var(--color-gold)' }} />
                <span>The Contemporary Heritage Edit</span>
              </div>

              <h1
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(2.4rem, 4vw + 1rem, 3.8rem)',
                  fontWeight: 600,
                  lineHeight: 1.15,
                  color: 'var(--color-text-main)',
                  marginBottom: '20px',
                  letterSpacing: '-0.02em'
                }}
              >
                Intricate Drapes for Timeless Celebrations
              </h1>

              <p
                style={{
                  fontSize: 'clamp(1rem, 1.2vw, 1.12rem)',
                  color: 'var(--color-text-muted)',
                  lineHeight: 1.6,
                  marginBottom: '32px'
                }}
              >
                Discover 17 masterfully styled sarees in Fandy, Georgette, Silk, Chiffon, Chinon, and Crepe. Designed with balanced drapes, delicate borders, and authentic Indian palettes.
              </p>

              {/* Action Buttons */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', alignItems: 'center', marginBottom: '36px' }}>
                <Link to="/shop" className="btn btn-primary" style={{ padding: '14px 30px' }}>
                  <span>Explore the Collection</span>
                  <ArrowRight size={16} />
                </Link>
                <a href="#fabrics" className="btn btn-ghost" style={{ padding: '14px 24px' }}>
                  Browse by Fabric
                </a>
              </div>

              {/* Trust-Neutral Metrics */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(80px, 1fr))',
                  gap: '16px',
                  paddingTop: '24px',
                  borderTop: '1px solid var(--color-border)'
                }}
              >
                <div>
                  <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', fontWeight: 600, color: 'var(--color-oxblood)' }}>
                    17
                  </div>
                  <div style={{ fontSize: '0.76rem', color: 'var(--color-text-light)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    Curated Sarees
                  </div>
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', fontWeight: 600, color: 'var(--color-oxblood)' }}>
                    6
                  </div>
                  <div style={{ fontSize: '0.76rem', color: 'var(--color-text-light)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    Distinct Fabrics
                  </div>
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', fontWeight: 600, color: 'var(--color-oxblood)' }}>
                    2 Views
                  </div>
                  <div style={{ fontSize: '0.76rem', color: 'var(--color-text-light)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    Every Garment
                  </div>
                </div>
              </div>
            </div>

            {/* Right Hero Image Card (Garment-first photography) */}
            <div style={{ position: 'relative' }}>
              <div
                style={{
                  position: 'relative',
                  backgroundColor: '#FFFFFF',
                  padding: '12px',
                  borderRadius: '6px',
                  boxShadow: 'var(--shadow-card)',
                  border: '1px solid var(--color-border)'
                }}
              >
                <Link to="/product/yellow-fandy-saree-for-women-shl-0001" style={{ display: 'block', position: 'relative', overflow: 'hidden', borderRadius: '4px' }}>
                  <img
                    src={getAssetUrl('/images/products/SHL-0001_main.jpg')}
                    alt="Yellow Fandy Saree with embroidered border — SHL-0001"
                    loading="eager"
                    // @ts-expect-error modern browser priority hint
                    fetchpriority="high"
                    decoding="async"
                    style={{
                      width: '100%',
                      maxHeight: '520px',
                      objectFit: 'cover',
                      objectPosition: 'center top',
                      borderRadius: '4px'
                    }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '16px',
                      left: '16px',
                      right: '16px',
                      backgroundColor: 'rgba(255, 255, 255, 0.94)',
                      backdropFilter: 'blur(6px)',
                      padding: '12px 16px',
                      borderRadius: '4px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      border: '1px solid var(--color-border)'
                    }}
                  >
                    <div>
                      <div style={{ fontSize: '0.74rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--color-gold-muted)', fontWeight: 600 }}>
                        Featured Drape • SHL-0001
                      </div>
                      <div style={{ fontSize: '0.92rem', fontWeight: 600, color: 'var(--color-text-main)' }}>
                        Yellow Fandy Saree
                      </div>
                    </div>
                    <span style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--color-oxblood)' }}>
                      ₹3,799
                    </span>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Value Bar (Prompt 096) */}
      <section style={{ backgroundColor: 'var(--color-surface-subtle)', borderBottom: '1px solid var(--color-border)', padding: '24px 0' }}>
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '24px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div style={{ width: '42px', height: '42px', borderRadius: '50%', backgroundColor: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-oxblood)', border: '1px solid var(--color-border)', flexShrink: 0 }}>
                <Feather size={20} />
              </div>
              <div>
                <h4 style={{ fontSize: '0.9rem', fontFamily: 'var(--font-sans)', fontWeight: 600 }}>Explore by Fabric</h4>
                <p style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', margin: 0 }}>6 curated weaves from Fandy to pure Crepe</p>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div style={{ width: '42px', height: '42px', borderRadius: '50%', backgroundColor: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-oxblood)', border: '1px solid var(--color-border)', flexShrink: 0 }}>
                <Compass size={20} />
              </div>
              <div>
                <h4 style={{ fontSize: '0.9rem', fontFamily: 'var(--font-sans)', fontWeight: 600 }}>Examine Garment Details</h4>
                <p style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', margin: 0 }}>Two authentic paired high-resolution drape views</p>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div style={{ width: '42px', height: '42px', borderRadius: '50%', backgroundColor: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-oxblood)', border: '1px solid var(--color-border)', flexShrink: 0 }}>
                <Bookmark size={20} />
              </div>
              <div>
                <h4 style={{ fontSize: '0.9rem', fontFamily: 'var(--font-sans)', fontWeight: 600 }}>Save Favorites for Later</h4>
                <p style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', margin: 0 }}>Instant browser-local wishlist without accounts</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Explore By Fabric Gallery (Prompt 081-082) */}
      <section id="fabrics" className="section">
        <div className="container">
          <SectionHeading
            eyebrow="Curated Materials"
            title="Explore by Fabric"
            description="From lightweight georgettes to richly textured fandy and luminous silk, browse our authentic six fabric categories."
            linkText="View all 17 sarees"
            linkTo="/shop"
          />

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '24px'
            }}
          >
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                to={`/collections/${cat.slug}`}
                style={{
                  position: 'relative',
                  borderRadius: '6px',
                  overflow: 'hidden',
                  backgroundColor: '#FFFFFF',
                  border: '1px solid var(--color-border)',
                  boxShadow: 'var(--shadow-subtle)',
                  transition: 'transform var(--transition-fast), box-shadow var(--transition-fast)'
                }}
                className="category-card"
              >
                <div style={{ aspectRatio: '4 / 3', width: '100%', overflow: 'hidden', backgroundColor: '#F5EFEB' }}>
                  <img
                    src={cat.coverImage}
                    alt={cat.title}
                    loading="lazy"
                    decoding="async"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 300ms ease'
                    }}
                  />
                </div>
                <div style={{ padding: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                    <h3 style={{ fontFamily: 'var(--font-sans)', fontSize: '1.05rem', fontWeight: 600 }}>
                      {cat.title}
                    </h3>
                    <span className="badge">
                      {cat.count} {cat.count === 1 ? 'saree' : 'sarees'}
                    </span>
                  </div>
                  <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', lineHeight: 1.5, margin: 0 }}>
                    {cat.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Featured Edit Grid (Prompts 083-084) */}
      <section className="section section-subtle">
        <div className="container">
          <SectionHeading
            eyebrow="Selected Drapes"
            title="Featured Boutique Edit"
            description="A harmonious selection highlighting varied hues, subtle embroidery, and signature border patterns."
            linkText="Shop all sarees"
            linkTo="/shop"
          />

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
              gap: '24px'
            }}
          >
            {featuredSkus.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* 5. Fabric Story Split Section (Prompt 085) */}
      <section className="section">
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '48px',
              alignItems: 'center'
            }}
          >
            <div>
              <div style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-gold-muted)', fontWeight: 600, marginBottom: '8px' }}>
                Artisanal Perspective
              </div>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.4rem', marginBottom: '16px', lineHeight: 1.2 }}>
                Textile Nuance & Fine Border Detail
              </h2>
              <p style={{ fontSize: '0.96rem', color: 'var(--color-text-muted)', lineHeight: 1.7, marginBottom: '16px' }}>
                Every Shubhlagn saree balances fabric weight, tactile feel, and ornamentation. Whether it is the structured weave of our textured Fandy line or the diaphanous elegance of flowing Georgettes, the pieces are selected for effortless draping and regal appeal.
              </p>
              <p style={{ fontSize: '0.96rem', color: 'var(--color-text-muted)', lineHeight: 1.7, marginBottom: '24px' }}>
                Each garment includes an unstitched 0.80m blouse fabric tailored to complement the saree’s pallu and border piping.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '28px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.88rem' }}>
                  <Check size={16} style={{ color: 'var(--color-oxblood)' }} />
                  <span>5.5 meter full-length standard drape</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.88rem' }}>
                  <Check size={16} style={{ color: 'var(--color-oxblood)' }} />
                  <span>Includes 0.80 meter matching blouse piece</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.88rem' }}>
                  <Check size={16} style={{ color: 'var(--color-oxblood)' }} />
                  <span>Dry clean only recommended for longevity</span>
                </div>
              </div>

              <Link to="/fabric-guide" className="btn btn-primary">
                Read the Fabric Guide
              </Link>
            </div>

            <div>
              <div
                style={{
                  position: 'relative',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  border: '1px solid var(--color-border)',
                  boxShadow: 'var(--shadow-card)',
                  backgroundColor: '#F5EFEB'
                }}
              >
                <img
                  src={getAssetUrl('/images/products/SHL-0004_gallery_02.jpg')}
                  alt="Fine textile embroidery close-up view"
                  style={{ width: '100%', height: '480px', objectFit: 'cover' }}
                />
                <div
                  style={{
                    position: 'absolute',
                    bottom: '16px',
                    left: '16px',
                    backgroundColor: 'rgba(255, 255, 255, 0.92)',
                    backdropFilter: 'blur(4px)',
                    padding: '8px 14px',
                    borderRadius: '4px',
                    fontSize: '0.78rem',
                    color: 'var(--color-text-main)'
                  }}
                >
                  Close-up view of woven pallu and border detailing
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Explore by Shade (Prompt 086) */}
      <section className="section section-subtle">
        <div className="container" style={{ textAlign: 'center' }}>
          <div style={{ maxWidth: '640px', margin: '0 auto 28px auto' }}>
            <div style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-gold-muted)', fontWeight: 600, marginBottom: '8px' }}>
              Color-Led Discovery
            </div>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.2rem', marginBottom: '12px' }}>
              Explore by Palette
            </h2>
            <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>
              Filter by primary saree tones to find the perfect shade for festivals, daytime functions, or grand receptions.
            </p>
          </div>

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '12px',
              maxWidth: '800px',
              margin: '0 auto'
            }}
          >
            {popularShades.map((shade) => (
              <Link
                key={shade.label}
                to={`/shop?shade=${encodeURIComponent(shade.label)}`}
                className="btn btn-ghost"
                style={{
                  padding: '8px 18px',
                  fontSize: '0.85rem',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  backgroundColor: '#FFFFFF'
                }}
              >
                <span
                  style={{
                    width: '14px',
                    height: '14px',
                    borderRadius: '50%',
                    backgroundColor: shade.color,
                    border: '1px solid rgba(0,0,0,0.1)'
                  }}
                />
                <span>{shade.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Spotlight Garment (Prompt 089) */}
      {spotlightProduct && (
        <section className="section">
          <div className="container">
            <div
              style={{
                backgroundColor: 'var(--color-surface-subtle)',
                border: '1px solid var(--color-border)',
                borderRadius: '8px',
                padding: '32px',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '32px',
                alignItems: 'center'
              }}
            >
              <div>
                <span className="badge badge-gold" style={{ marginBottom: '12px' }}>
                  Spotlight Garment
                </span>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', marginBottom: '8px' }}>
                  {spotlightProduct.name}
                </h3>
                <div style={{ fontSize: '0.8rem', color: 'var(--color-text-light)', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  SKU: {spotlightProduct.id} • {spotlightProduct.category}
                </div>
                <p style={{ fontSize: '0.92rem', color: 'var(--color-text-muted)', lineHeight: 1.6, marginBottom: '20px' }}>
                  {spotlightProduct.fabricDetails || spotlightProduct.description.slice(0, 180) + '...'}
                </p>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', marginBottom: '24px' }}>
                  <span style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-oxblood)' }}>
                    {spotlightProduct.formattedPrice}
                  </span>
                  {spotlightProduct.formattedMrp && (
                    <span style={{ fontSize: '1rem', color: 'var(--color-text-light)', textDecoration: 'line-through' }}>
                      {spotlightProduct.formattedMrp}
                    </span>
                  )}
                  {spotlightProduct.discount && (
                    <span className="badge badge-discount">{spotlightProduct.discount}</span>
                  )}
                </div>
                <Link to={`/product/${spotlightProduct.slug}`} className="btn btn-primary">
                  View Full Garment
                </Link>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <img
                  src={spotlightProduct.images[0]}
                  alt={`${spotlightProduct.name} drape`}
                  style={{ width: '100%', height: '300px', objectFit: 'cover', borderRadius: '4px' }}
                />
                <img
                  src={spotlightProduct.images[1]}
                  alt={`${spotlightProduct.name} detail view`}
                  style={{ width: '100%', height: '300px', objectFit: 'cover', borderRadius: '4px' }}
                />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 8. Second Curated Row (Prompt 094) */}
      <section className="section section-subtle">
        <div className="container">
          <SectionHeading
            eyebrow="Signature Georgette & Fandy"
            title="Celebration Classics"
            description="Rich hues and flowing silhouettes selected for ceremonies, sangeets, and auspicious gatherings."
            linkText="View all sarees"
            linkTo="/shop"
          />

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
              gap: '24px'
            }}
          >
            {secondGridSkus.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* 9. Occasion Module (Prompt 087) & Shop by Price (Prompt 092) */}
      <section className="section">
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '36px'
            }}
          >
            {/* Occasion suggestions */}
            <div style={{ backgroundColor: '#FFFFFF', border: '1px solid var(--color-border)', borderRadius: '8px', padding: '28px' }}>
              <div style={{ fontSize: '0.76rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-gold-muted)', fontWeight: 600, marginBottom: '6px' }}>
                Styling Inspiration
              </div>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', marginBottom: '12px' }}>
                Dressing by Occasion
              </h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', marginBottom: '20px' }}>
                Curated collections tailored to traditional Indian festivities and evening celebrations.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <Link
                  to="/collections/fandy-sarees"
                  style={{ display: 'flex', justifyContent: 'space-between', padding: '12px', backgroundColor: 'var(--color-surface-subtle)', borderRadius: '4px', fontSize: '0.9rem', fontWeight: 500 }}
                >
                  <span>Festive Dressing & Sangeet</span>
                  <span style={{ color: 'var(--color-oxblood)' }}>Fandy Collection →</span>
                </Link>
                <Link
                  to="/collections/silk-sarees"
                  style={{ display: 'flex', justifyContent: 'space-between', padding: '12px', backgroundColor: 'var(--color-surface-subtle)', borderRadius: '4px', fontSize: '0.9rem', fontWeight: 500 }}
                >
                  <span>Wedding Celebrations</span>
                  <span style={{ color: 'var(--color-oxblood)' }}>Silk Collection →</span>
                </Link>
                <Link
                  to="/collections/georgette-sarees"
                  style={{ display: 'flex', justifyContent: 'space-between', padding: '12px', backgroundColor: 'var(--color-surface-subtle)', borderRadius: '4px', fontSize: '0.9rem', fontWeight: 500 }}
                >
                  <span>Effortless Evening Elegance</span>
                  <span style={{ color: 'var(--color-oxblood)' }}>Georgette Collection →</span>
                </Link>
              </div>
            </div>

            {/* Shop by price */}
            <div style={{ backgroundColor: '#FFFFFF', border: '1px solid var(--color-border)', borderRadius: '8px', padding: '28px' }}>
              <div style={{ fontSize: '0.76rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-gold-muted)', fontWeight: 600, marginBottom: '6px' }}>
                Budget Guidance
              </div>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', marginBottom: '12px' }}>
                Shop by Price Range
              </h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', marginBottom: '20px' }}>
                Authentic prices starting from ₹1,799 up to ₹4,999 across all 17 sarees in the catalog.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <Link
                  to="/shop?maxPrice=2500"
                  style={{ display: 'flex', justifyContent: 'space-between', padding: '12px', backgroundColor: 'var(--color-surface-subtle)', borderRadius: '4px', fontSize: '0.9rem', fontWeight: 500 }}
                >
                  <span>Under ₹2,500</span>
                  <span style={{ color: 'var(--color-oxblood)' }}>View Sarees →</span>
                </Link>
                <Link
                  to="/shop?minPrice=2500&maxPrice=3500"
                  style={{ display: 'flex', justifyContent: 'space-between', padding: '12px', backgroundColor: 'var(--color-surface-subtle)', borderRadius: '4px', fontSize: '0.9rem', fontWeight: 500 }}
                >
                  <span>₹2,500 – ₹3,500</span>
                  <span style={{ color: 'var(--color-oxblood)' }}>View Sarees →</span>
                </Link>
                <Link
                  to="/shop?minPrice=3500"
                  style={{ display: 'flex', justifyContent: 'space-between', padding: '12px', backgroundColor: 'var(--color-surface-subtle)', borderRadius: '4px', fontSize: '0.9rem', fontWeight: 500 }}
                >
                  <span>Above ₹3,500</span>
                  <span style={{ color: 'var(--color-oxblood)' }}>View Sarees →</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 10. Warm Footer Transition Ribbon (Prompt 098) */}
      <section style={{ backgroundColor: '#621D23', color: '#FAF6F0', padding: '48px 0', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '640px' }}>
          <div style={{ fontSize: '0.76rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: '#D4AF37', marginBottom: '8px', fontWeight: 600 }}>
            Shubhlagn Sarees
          </div>
          <h2 style={{ fontFamily: 'var(--font-serif)', color: '#FFFFFF', fontSize: '2.2rem', marginBottom: '14px' }}>
            Experience the Complete Collection
          </h2>
          <p style={{ fontSize: '0.92rem', color: '#E8DED6', lineHeight: 1.6, marginBottom: '24px' }}>
            Explore all 17 distinct designs, examine high-resolution drape photographs, and save your favorites to your personal wishlist.
          </p>
          <Link
            to="/shop"
            className="btn"
            style={{
              backgroundColor: '#FFFFFF',
              color: '#621D23',
              fontWeight: 600,
              padding: '12px 28px'
            }}
          >
            Explore All 17 Sarees
          </Link>
        </div>
      </section>
    </div>
  );
};
