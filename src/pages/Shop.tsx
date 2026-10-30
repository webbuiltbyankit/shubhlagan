import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, X, RotateCcw } from 'lucide-react';
import { products, getCategories, getAllShades, getPriceBounds, formatINR, filterAndSortProducts } from '../lib/catalog';
import { ProductCard } from '../components/ProductCard';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { SortOption } from '../types';

export const Shop: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categories = getCategories();
  const allShades = getAllShades();
  const bounds = getPriceBounds();

  // Mobile filter drawer state
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Read URL params
  const activeFabrics = useMemo(() => {
    const raw = searchParams.get('fabrics');
    return raw ? raw.split(',').filter(Boolean) : [];
  }, [searchParams]);

  const activeShades = useMemo(() => {
    const raw = searchParams.get('shades');
    return raw ? raw.split(',').filter(Boolean) : [];
  }, [searchParams]);

  const minPrice = useMemo(() => {
    const val = searchParams.get('minPrice');
    return val ? Number(val) : bounds.min;
  }, [searchParams, bounds.min]);

  const maxPrice = useMemo(() => {
    const val = searchParams.get('maxPrice');
    return val ? Number(val) : bounds.max;
  }, [searchParams, bounds.max]);

  const currentSort = (searchParams.get('sort') as SortOption) || 'featured';

  // Helper to update search params
  const updateParams = (updates: Record<string, string | null>) => {
    const newParams = new URLSearchParams(searchParams);
    Object.entries(updates).forEach(([key, val]) => {
      if (val === null || val === '') {
        newParams.delete(key);
      } else {
        newParams.set(key, val);
      }
    });
    setSearchParams(newParams);
  };

  const toggleFabric = (fabric: string) => {
    const next = activeFabrics.includes(fabric)
      ? activeFabrics.filter((f) => f !== fabric)
      : [...activeFabrics, fabric];
    updateParams({ fabrics: next.length ? next.join(',') : null });
  };

  const toggleShade = (shade: string) => {
    const next = activeShades.includes(shade)
      ? activeShades.filter((s) => s !== shade)
      : [...activeShades, shade];
    updateParams({ shades: next.length ? next.join(',') : null });
  };

  const handlePriceChange = (min: number, max: number) => {
    updateParams({
      minPrice: min > bounds.min ? String(min) : null,
      maxPrice: max < bounds.max ? String(max) : null
    });
  };

  const handleSortChange = (sort: SortOption) => {
    updateParams({ sort: sort === 'featured' ? null : sort });
  };

  const clearAllFilters = () => {
    setSearchParams(new URLSearchParams());
  };

  // Filter products
  const filteredProducts = useMemo(() => {
    return filterAndSortProducts({
      fabrics: activeFabrics,
      shades: activeShades,
      minPrice,
      maxPrice,
      sort: currentSort
    });
  }, [activeFabrics, activeShades, minPrice, maxPrice, currentSort]);

  const hasActiveFilters = activeFabrics.length > 0 || activeShades.length > 0 || minPrice > bounds.min || maxPrice < bounds.max;

  return (
    <div className="shop-page" style={{ paddingBottom: '80px' }}>
      <div className="container">
        <Breadcrumbs items={[{ label: 'All Sarees' }]} />

        {/* Header */}
        <div style={{ margin: '16px 0 24px 0' }}>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.4rem', marginBottom: '6px' }}>
            All Sarees
          </h1>
          <p style={{ fontSize: '0.92rem', color: 'var(--color-text-muted)' }}>
            Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'saree' : 'sarees'} across our six signature fabric collections.
          </p>
        </div>

        {/* Horizontal Fabric Quick Tabs (Prompt 131) */}
        <div
          style={{
            display: 'flex',
            gap: '8px',
            overflowX: 'auto',
            paddingBottom: '16px',
            marginBottom: '24px',
            scrollbarWidth: 'none'
          }}
        >
          <button
            onClick={() => updateParams({ fabrics: null })}
            className={`badge ${activeFabrics.length === 0 ? 'badge-discount' : ''}`}
            style={{ padding: '8px 16px', fontSize: '0.82rem', cursor: 'pointer', whiteSpace: 'nowrap' }}
          >
            All Fabrics ({products.length})
          </button>
          {categories.map((c) => {
            const isActive = activeFabrics.includes(c.name);
            return (
              <button
                key={c.slug}
                onClick={() => toggleFabric(c.name)}
                className={`badge ${isActive ? 'badge-discount' : ''}`}
                style={{ padding: '8px 16px', fontSize: '0.82rem', cursor: 'pointer', whiteSpace: 'nowrap' }}
              >
                {c.title} ({c.count})
              </button>
            );
          })}
        </div>

        {/* Active Filter Chips (Prompt 147) */}
        {hasActiveFilters && (
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 16px',
              backgroundColor: 'var(--color-surface-subtle)',
              borderRadius: '6px',
              marginBottom: '24px'
            }}
          >
            <span style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', color: 'var(--color-text-muted)' }}>
              Active Filters:
            </span>
            {activeFabrics.map((f) => (
              <span
                key={f}
                className="badge"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '4px 8px', cursor: 'pointer' }}
                onClick={() => toggleFabric(f)}
              >
                <span>{f}</span>
                <X size={12} />
              </span>
            ))}
            {activeShades.map((s) => (
              <span
                key={s}
                className="badge"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '4px 8px', cursor: 'pointer' }}
                onClick={() => toggleShade(s)}
              >
                <span>{s}</span>
                <X size={12} />
              </span>
            ))}
            {(minPrice > bounds.min || maxPrice < bounds.max) && (
              <span
                className="badge"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '4px 8px', cursor: 'pointer' }}
                onClick={() => handlePriceChange(bounds.min, bounds.max)}
              >
                <span>Price: {formatINR(minPrice)} - {formatINR(maxPrice)}</span>
                <X size={12} />
              </span>
            )}
            <button
              onClick={clearAllFilters}
              style={{
                fontSize: '0.78rem',
                color: 'var(--color-oxblood)',
                fontWeight: 600,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                marginLeft: '8px'
              }}
            >
              <RotateCcw size={12} />
              <span>Clear All</span>
            </button>
          </div>
        )}

        {/* Main Grid & Sidebar Layout */}
        <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: '32px' }} className="shop-layout">
          {/* Desktop Filter Sidebar */}
          <aside className="shop-sidebar">
            <div
              style={{
                backgroundColor: '#FFFFFF',
                border: '1px solid var(--color-border)',
                borderRadius: '6px',
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                gap: '24px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <h3 style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Filter Sarees
                </h3>
                {hasActiveFilters && (
                  <button onClick={clearAllFilters} style={{ fontSize: '0.78rem', color: 'var(--color-oxblood)' }}>
                    Reset
                  </button>
                )}
              </div>

              {/* Fabric Filter */}
              <div>
                <h4 style={{ fontFamily: 'var(--font-sans)', fontSize: '0.82rem', fontWeight: 600, marginBottom: '12px' }}>
                  Fabric
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {categories.map((cat) => (
                    <label key={cat.name} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.86rem', cursor: 'pointer' }}>
                      <input
                        type="checkbox"
                        checked={activeFabrics.includes(cat.name)}
                        onChange={() => toggleFabric(cat.name)}
                        style={{ accentColor: 'var(--color-oxblood)' }}
                      />
                      <span style={{ flex: 1 }}>{cat.title}</span>
                      <span style={{ fontSize: '0.75rem', color: 'var(--color-text-light)' }}>({cat.count})</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Shade Filter */}
              <div>
                <h4 style={{ fontFamily: 'var(--font-sans)', fontSize: '0.82rem', fontWeight: 600, marginBottom: '12px' }}>
                  Color / Shade
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '180px', overflowY: 'auto' }}>
                  {allShades.map((shade) => (
                    <label key={shade} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.86rem', cursor: 'pointer' }}>
                      <input
                        type="checkbox"
                        checked={activeShades.includes(shade)}
                        onChange={() => toggleShade(shade)}
                        style={{ accentColor: 'var(--color-oxblood)' }}
                      />
                      <span style={{ flex: 1 }}>{shade}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Filter */}
              <div>
                <h4 style={{ fontFamily: 'var(--font-sans)', fontSize: '0.82rem', fontWeight: 600, marginBottom: '12px' }}>
                  Price Range
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', color: 'var(--color-text-muted)' }}>
                    <span>{formatINR(minPrice)}</span>
                    <span>{formatINR(maxPrice)}</span>
                  </div>
                  <input
                    type="range"
                    min={bounds.min}
                    max={bounds.max}
                    step={100}
                    value={maxPrice}
                    onChange={(e) => handlePriceChange(minPrice, Number(e.target.value))}
                    style={{ accentColor: 'var(--color-oxblood)', width: '100%' }}
                  />
                </div>
              </div>
            </div>
          </aside>

          {/* Product Results Column */}
          <div>
            {/* Sort Bar */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '12px',
                paddingBottom: '16px',
                marginBottom: '20px',
                borderBottom: '1px solid var(--color-border)'
              }}
            >
              <button
                onClick={() => setIsMobileFilterOpen(true)}
                className="btn btn-ghost mobile-filter-btn"
                style={{ display: 'none', padding: '8px 14px', fontSize: '0.82rem' }}
              >
                <SlidersHorizontal size={15} />
                <span>Filters {hasActiveFilters ? `(${activeFabrics.length + activeShades.length})` : ''}</span>
              </button>

              <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }} className="results-count-label">
                Showing <strong>{filteredProducts.length}</strong> {filteredProducts.length === 1 ? 'saree' : 'sarees'}
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)' }}>Sort by:</span>
                <select
                  value={currentSort}
                  onChange={(e) => handleSortChange(e.target.value as SortOption)}
                  className="form-select"
                  style={{ width: 'auto', padding: '6px 12px', fontSize: '0.85rem' }}
                >
                  <option value="featured">Featured Edit</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="name-asc">Name: A to Z</option>
                </select>
              </div>
            </div>

            {/* Grid */}
            {filteredProducts.length === 0 ? (
              <div
                style={{
                  textAlign: 'center',
                  padding: '60px 20px',
                  backgroundColor: '#FFFFFF',
                  border: '1px solid var(--color-border)',
                  borderRadius: '6px'
                }}
              >
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', marginBottom: '8px' }}>
                  No matching sarees found
                </h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', marginBottom: '20px' }}>
                  Try relaxing your price range or clearing fabric filters to view all available sarees.
                </p>
                <button onClick={clearAllFilters} className="btn btn-primary">
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))',
                  gap: '24px'
                }}
              >
                {filteredProducts.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      {isMobileFilterOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 99999,
            backgroundColor: 'rgba(28, 30, 33, 0.65)',
            backdropFilter: 'blur(3px)',
            display: 'flex',
            justifyContent: 'flex-end'
          }}
          onClick={() => setIsMobileFilterOpen(false)}
        >
          <div
            style={{
              width: '85%',
              maxWidth: '340px',
              height: '100%',
              backgroundColor: '#FFFFFF',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: 'var(--shadow-drawer)',
              padding: '20px',
              overflowY: 'auto'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '16px', borderBottom: '1px solid var(--color-border)', marginBottom: '16px' }}>
              <h3 style={{ fontFamily: 'var(--font-sans)', fontSize: '1rem', fontWeight: 600 }}>Filters</h3>
              <button onClick={() => setIsMobileFilterOpen(false)} style={{ color: 'var(--color-text-muted)' }}>
                <X size={20} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', flex: 1 }}>
              {/* Fabrics */}
              <div>
                <h4 style={{ fontSize: '0.85rem', fontWeight: 600, marginBottom: '8px' }}>Fabric</h4>
                {categories.map((c) => (
                  <label key={c.name} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '6px 0', fontSize: '0.86rem' }}>
                    <input
                      type="checkbox"
                      checked={activeFabrics.includes(c.name)}
                      onChange={() => toggleFabric(c.name)}
                      style={{ accentColor: 'var(--color-oxblood)' }}
                    />
                    <span>{c.title} ({c.count})</span>
                  </label>
                ))}
              </div>

              {/* Shades */}
              <div>
                <h4 style={{ fontSize: '0.85rem', fontWeight: 600, marginBottom: '8px' }}>Color / Shade</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', maxHeight: '140px', overflowY: 'auto' }}>
                  {allShades.map((shade) => (
                    <label key={shade} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '4px 0', fontSize: '0.86rem' }}>
                      <input
                        type="checkbox"
                        checked={activeShades.includes(shade)}
                        onChange={() => toggleShade(shade)}
                        style={{ accentColor: 'var(--color-oxblood)' }}
                      />
                      <span>{shade}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price */}
              <div>
                <h4 style={{ fontSize: '0.85rem', fontWeight: 600, marginBottom: '8px' }}>Max Price</h4>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', marginBottom: '6px' }}>
                  <span>Up to:</span>
                  <strong>{formatINR(maxPrice)}</strong>
                </div>
                <input
                  type="range"
                  min={bounds.min}
                  max={bounds.max}
                  step={100}
                  value={maxPrice}
                  onChange={(e) => handlePriceChange(minPrice, Number(e.target.value))}
                  style={{ accentColor: 'var(--color-oxblood)', width: '100%' }}
                />
              </div>
            </div>

            <div style={{ paddingTop: '16px', borderTop: '1px solid var(--color-border)', display: 'flex', gap: '8px' }}>
              <button onClick={clearAllFilters} className="btn btn-ghost" style={{ flex: 1 }}>
                Reset
              </button>
              <button onClick={() => setIsMobileFilterOpen(false)} className="btn btn-primary" style={{ flex: 1 }}>
                Apply
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 860px) {
          .shop-layout {
            grid-template-columns: 1fr !important;
          }
          .shop-sidebar {
            display: none !important;
          }
          .mobile-filter-btn {
            display: inline-flex !important;
          }
        }
      `}</style>
    </div>
  );
};
