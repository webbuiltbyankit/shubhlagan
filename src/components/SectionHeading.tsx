import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  linkText?: string;
  linkTo?: string;
  centered?: boolean;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  eyebrow,
  title,
  description,
  linkText,
  linkTo,
  centered = false
}) => {
  return (
    <div
      className="section-heading"
      style={{
        marginBottom: '32px',
        display: 'flex',
        flexDirection: centered ? 'column' : 'row',
        alignItems: centered ? 'center' : 'flex-end',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px',
        textAlign: centered ? 'center' : 'left'
      }}
    >
      <div style={{ maxWidth: centered ? '680px' : '580px' }}>
        {eyebrow && (
          <div
            style={{
              fontSize: 'var(--text-xs)',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--color-gold-muted)',
              fontWeight: 600,
              marginBottom: '6px'
            }}
          >
            {eyebrow}
          </div>
        )}
        <h2
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'var(--text-3xl)',
            fontWeight: 500,
            color: 'var(--color-text-main)',
            lineHeight: 1.2
          }}
        >
          {title}
        </h2>
        {description && (
          <p
            style={{
              fontSize: 'var(--text-sm)',
              color: 'var(--color-text-muted)',
              marginTop: '8px',
              lineHeight: 1.6
            }}
          >
            {description}
          </p>
        )}
      </div>

      {linkText && linkTo && (
        <Link
          to={linkTo}
          className="btn-link"
          style={{
            fontSize: 'var(--text-sm)',
            fontWeight: 600,
            letterSpacing: '0.02em',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          <span>{linkText}</span>
          <ArrowRight size={16} />
        </Link>
      )}
    </div>
  );
};

