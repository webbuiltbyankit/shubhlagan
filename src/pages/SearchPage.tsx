import React, { useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import { filterAndSortProducts } from '../lib/catalog';
import { ProductCard } from '../components/ProductCard';
import { Breadcrumbs } from '../components/Breadcrumbs';

export const SearchPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';

  const results = useMemo(() => {
    if (!query.trim()) return [];
    return filterAndSortProducts({ query });
  }, [query]);

  return (
    <div className="search-page" style={{ paddingBottom: '80px' }}>
      <div className="container">
        <Breadcrumbs items={[{ label: 'Search Results' }]} />

        <div style={{ margin: '16px 0 28px 0' }}>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.4rem', marginBottom: '8px' }}>
            {query ? `Search results for "${query}"` : 'Search Catalog'}
          </h1>
          <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>
            Found {results.length} {results.length === 1 ? 'matching saree' : 'matching sarees'} in our verified catalog.
          </p>
        </div>

        {/* Quick query bar */}
        <div style={{ maxWidth: '540px', marginBottom: '32px' }}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const form = e.currentTarget;
              const input = form.elements.namedItem('search') as HTMLInputElement;
              if (input && input.value) {
                setSearchParams({ q: input.value.trim() });
              }
            }}
            style={{ display: 'flex', gap: '8px' }}
          >
            <input
              name="search"
              type="search"
              defaultValue={query}
              placeholder="Search by fabric, color, or name..."
              className="form-input"
              style={{ flex: 1 }}
            />
            <button type="submit" className="btn btn-primary" style={{ padding: '0 20px' }}>
              <Search size={18} />
            </button>
          </form>
        </div>

        {results.length === 0 ? (
          <div
            style={{
              textAlign: 'center',
              padding: '60px 20px',
              backgroundColor: '#FFFFFF',
              border: '1px solid var(--color-border)',
              borderRadius: '8px'
            }}
          >
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', marginBottom: '8px' }}>
              No matches found for "{query}"
            </h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', marginBottom: '20px' }}>
              Check spelling or try broader terms like "Silk", "Fandy", "Yellow", or "Georgette".
            </p>
            <Link to="/shop" className="btn btn-primary">
              View All 17 Sarees
            </Link>
          </div>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
              gap: '24px'
            }}
          >
            {results.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
