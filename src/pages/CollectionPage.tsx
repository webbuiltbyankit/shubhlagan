import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { getCategoryBySlug, getCategories, getProductsByCategory } from '../lib/catalog';
import { ProductCard } from '../components/ProductCard';
import { Breadcrumbs } from '../components/Breadcrumbs';

export const CollectionPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const category = getCategoryBySlug(slug || '');
  const allCategories = getCategories();

  if (!category) {
    return (
      <div className="container" style={{ padding: '80px 0', textAlign: 'center' }}>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.4rem', marginBottom: '16px' }}>
          Collection Not Found
        </h1>
        <p style={{ color: 'var(--color-text-muted)', marginBottom: '24px' }}>
          The fabric category you are looking for does not exist in our authentic catalog.
        </p>
        <Link to="/shop" className="btn btn-primary">
          Browse All Collections
        </Link>
      </div>
    );
  }

  const categoryProducts = getProductsByCategory(category.name);

  return (
    <div className="collection-page" style={{ paddingBottom: '80px' }}>
      <div className="container">
        <Breadcrumbs
          items={[
            { label: 'Shop', path: '/shop' },
            { label: category.title }
          ]}
        />

        {/* Collection Hero Header */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            border: '1px solid var(--color-border)',
            borderRadius: '8px',
            overflow: 'hidden',
            margin: '16px 0 32px 0',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            alignItems: 'center'
          }}
        >
          <div style={{ padding: '36px' }}>
            <span className="badge badge-gold" style={{ marginBottom: '12px' }}>
              Fabric Collection
            </span>
            <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.6rem', marginBottom: '10px' }}>
              {category.title}
            </h1>
            <p style={{ fontSize: '0.95rem', color: 'var(--color-text-muted)', lineHeight: 1.6, marginBottom: '20px' }}>
              {category.description}
            </p>
            <div style={{ fontSize: '0.82rem', color: 'var(--color-text-light)', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
              Showing {categoryProducts.length} {categoryProducts.length === 1 ? 'curated drape' : 'curated drapes'}
            </div>
          </div>

          <div style={{ height: '280px', overflow: 'hidden', backgroundColor: '#F5EFEB' }}>
            <picture style={{ display: 'block', width: '100%', height: '100%' }}>
              <source srcSet={category.coverImage.replace(/\.jpg$/, '.webp')} type="image/webp" />
              <img
                src={category.coverImage}
                alt={category.title}
                loading="eager"
                decoding="async"
                style={{ display: 'block', width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </picture>
          </div>
        </div>

        {/* Collection Quick Switcher Tabs */}
        <div
          style={{
            display: 'flex',
            gap: '8px',
            overflowX: 'auto',
            paddingBottom: '16px',
            marginBottom: '32px',
            borderBottom: '1px solid var(--color-border)'
          }}
        >
          <Link
            to="/shop"
            className="badge"
            style={{ padding: '8px 16px', fontSize: '0.82rem', textDecoration: 'none' }}
          >
            All Fabrics (17)
          </Link>
          {allCategories.map((c) => {
            const isCurrent = c.slug === category.slug;
            return (
              <Link
                key={c.slug}
                to={`/collections/${c.slug}`}
                className={`badge ${isCurrent ? 'badge-discount' : ''}`}
                style={{ padding: '8px 16px', fontSize: '0.82rem', textDecoration: 'none', whiteSpace: 'nowrap' }}
              >
                {c.title} ({c.count})
              </Link>
            );
          })}
        </div>

        {/* Product Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
            gap: '24px'
          }}
        >
          {categoryProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </div>
  );
};

