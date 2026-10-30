import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, ArrowRight, Home } from 'lucide-react';

export const NotFound: React.FC = () => {
  return (
    <div
      className="not-found-page"
      style={{
        padding: '100px 16px',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <div
        style={{
          width: '72px',
          height: '72px',
          borderRadius: '50%',
          backgroundColor: 'var(--color-surface-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--color-oxblood)',
          marginBottom: '20px'
        }}
      >
        <Compass size={36} />
      </div>

      <span className="badge badge-gold" style={{ marginBottom: '12px' }}>
        404 Page Not Found
      </span>

      <h1
        style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 'clamp(2.4rem, 4vw, 3.4rem)',
          marginBottom: '12px',
          color: 'var(--color-text-main)'
        }}
      >
        This Drape Could Not Be Found
      </h1>

      <p
        style={{
          fontSize: '1rem',
          color: 'var(--color-text-muted)',
          maxWidth: '460px',
          margin: '0 auto 32px auto',
          lineHeight: 1.6
        }}
      >
        The page or product you are seeking may have moved, or the URL might be mistyped. Explore our 17 verified sarees in the catalog.
      </p>

      <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', justifyContent: 'center' }}>
        <Link to="/" className="btn btn-secondary" style={{ gap: '8px' }}>
          <Home size={16} />
          <span>Return to Home</span>
        </Link>

        <Link to="/shop" className="btn btn-primary" style={{ gap: '8px' }}>
          <span>Browse All Sarees</span>
          <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
};

