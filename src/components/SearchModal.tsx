import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, ArrowRight } from 'lucide-react';
import { products, getCategories } from '../lib/catalog';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setHighlightedIndex(-1);
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      document.body.style.overflow = '';
      setQuery('');
      setHighlightedIndex(-1);
    }
  }, [isOpen]);

  const cleanQuery = query.toLowerCase().trim();

  const matchingCategories = cleanQuery
    ? getCategories().filter((cat) => cat.title.toLowerCase().includes(cleanQuery))
    : [];

  const matchingProducts = cleanQuery
    ? products
        .filter((p) => {
          const haystack = `${p.name} ${p.id} ${p.category} ${p.fabric} ${p.primaryColor}`.toLowerCase();
          return haystack.includes(cleanQuery);
        })
        .slice(0, 5)
    : [];

  const totalSuggestions = matchingCategories.length + matchingProducts.length;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowDown' && totalSuggestions > 0) {
        e.preventDefault();
        setHighlightedIndex((prev) => (prev + 1) % totalSuggestions);
      } else if (e.key === 'ArrowUp' && totalSuggestions > 0) {
        e.preventDefault();
        setHighlightedIndex((prev) => (prev <= 0 ? totalSuggestions - 1 : prev - 1));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, totalSuggestions]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (highlightedIndex >= 0 && highlightedIndex < matchingCategories.length) {
      handleSelectCategory(matchingCategories[highlightedIndex].slug);
      return;
    }
    if (highlightedIndex >= matchingCategories.length && highlightedIndex < totalSuggestions) {
      const prodIndex = highlightedIndex - matchingCategories.length;
      handleSelectProduct(matchingProducts[prodIndex].slug);
      return;
    }
    if (cleanQuery) {
      navigate(`/search?q=${encodeURIComponent(cleanQuery)}`);
      onClose();
    }
  };

  const handleSelectProduct = (slug: string) => {
    navigate(`/product/${slug}`);
    onClose();
  };

  const handleSelectCategory = (slug: string) => {
    navigate(`/collections/${slug}`);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        backgroundColor: 'rgba(28, 30, 33, 0.75)',
        backdropFilter: 'blur(6px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '24px 16px',
        overflowY: 'auto'
      }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Search Catalog"
    >
      <div
        style={{
          width: '100%',
          maxWidth: '680px',
          backgroundColor: '#FFFFFF',
          borderRadius: '8px',
          boxShadow: '0 20px 40px rgba(0,0,0,0.25)',
          overflow: 'hidden',
          marginTop: '40px'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <form
          onSubmit={handleSubmit}
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: '16px 20px',
            borderBottom: '1px solid var(--color-border)',
            gap: '12px'
          }}
        >
          <Search size={22} style={{ color: 'var(--color-oxblood)' }} />
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by saree, fabric, color, or SKU..."
            style={{
              flex: 1,
              border: 'none',
              outline: 'none',
              fontSize: '1rem',
              color: 'var(--color-text-main)',
              fontFamily: 'inherit',
              minWidth: 0
            }}
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              aria-label="Clear query"
              style={{ color: 'var(--color-text-light)', padding: '4px' }}
            >
              <X size={18} />
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close search"
            style={{
              padding: '6px 12px',
              fontSize: '0.82rem',
              color: 'var(--color-text-main)',
              backgroundColor: 'var(--color-surface-subtle)',
              border: '1px solid var(--color-border)',
              borderRadius: '4px',
              marginLeft: '4px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              cursor: 'pointer'
            }}
          >
            <X size={16} />
            <span>Close</span>
          </button>
        </form>

        {/* Live suggestions */}
        <div style={{ maxHeight: '60vh', overflowY: 'auto', padding: '16px 20px' }}>
          {!cleanQuery && (
            <div>
              <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-text-light)', marginBottom: '12px', fontWeight: 600 }}>
                Popular Fabrics
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {getCategories().map((c) => (
                  <button
                    key={c.slug}
                    onClick={() => handleSelectCategory(c.slug)}
                    className="badge"
                    style={{ padding: '6px 12px', fontSize: '0.82rem', cursor: 'pointer' }}
                  >
                    {c.title} ({c.count})
                  </button>
                ))}
              </div>
            </div>
          )}

          {cleanQuery && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {matchingCategories.length > 0 && (
                <div>
                  <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-text-light)', marginBottom: '8px', fontWeight: 600 }}>
                    Collections
                  </div>
                  {matchingCategories.map((c, idx) => {
                    const isHighlighted = highlightedIndex === idx;
                    return (
                      <div
                        key={c.slug}
                        onClick={() => handleSelectCategory(c.slug)}
                        style={{
                          padding: '8px 12px',
                          cursor: 'pointer',
                          borderRadius: '4px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          backgroundColor: isHighlighted ? 'var(--color-oxblood-light)' : 'var(--color-surface-subtle)',
                          border: isHighlighted ? '1px solid var(--color-oxblood)' : '1px solid transparent',
                          marginBottom: '6px'
                        }}
                      >
                        <span style={{ fontWeight: 500, fontSize: '0.9rem' }}>{c.title}</span>
                        <span style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>{c.count} sarees</span>
                      </div>
                    );
                  })}
                </div>
              )}

              {matchingProducts.length > 0 ? (
                <div>
                  <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-text-light)', marginBottom: '8px', fontWeight: 600 }}>
                    Matching Sarees ({matchingProducts.length})
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {matchingProducts.map((p, idx) => {
                      const isHighlighted = highlightedIndex === (matchingCategories.length + idx);
                      return (
                        <div
                          key={p.id}
                          onClick={() => handleSelectProduct(p.slug)}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            padding: '8px',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            backgroundColor: isHighlighted ? 'var(--color-oxblood-light)' : 'transparent',
                            border: isHighlighted ? '1px solid var(--color-oxblood)' : '1px solid transparent',
                            transition: 'background var(--transition-fast)'
                          }}
                          onMouseEnter={(e) => {
                            if (!isHighlighted) e.currentTarget.style.backgroundColor = 'var(--color-surface-subtle)';
                          }}
                          onMouseLeave={(e) => {
                            if (!isHighlighted) e.currentTarget.style.backgroundColor = 'transparent';
                          }}
                        >
                          <img
                            src={p.thumbnail}
                            alt={p.name}
                            loading="lazy"
                            decoding="async"
                            style={{ width: '48px', height: '60px', objectFit: 'cover', borderRadius: '2px' }}
                          />
                          <div style={{ flex: 1 }}>
                            <div style={{ fontSize: '0.88rem', fontWeight: 500, color: 'var(--color-text-main)' }}>
                              {p.name}
                            </div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                              {p.id} • {p.category} • {p.primaryColor}
                            </div>
                          </div>
                          <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--color-oxblood)' }}>
                            {p.formattedPrice}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <button
                    onClick={handleSubmit}
                    className="btn btn-ghost"
                    style={{ width: '100%', marginTop: '12px', justifyContent: 'center' }}
                  >
                    <span>View all matching results</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              ) : (
                matchingCategories.length === 0 && (
                  <div style={{ textAlign: 'center', padding: '24px 0', color: 'var(--color-text-muted)' }}>
                    <p style={{ fontSize: '0.95rem', marginBottom: '6px' }}>No sarees found matching "{query}"</p>
                    <p style={{ fontSize: '0.8rem', color: 'var(--color-text-light)' }}>
                      Try searching for fabrics like "Fandy", "Silk", or shades like "Yellow", "Blue".
                    </p>
                  </div>
                )
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

