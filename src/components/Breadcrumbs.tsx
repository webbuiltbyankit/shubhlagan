import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  return (
    <nav
      aria-label="Breadcrumb"
      style={{
        padding: '14px 0',
        fontSize: '0.82rem',
        color: 'var(--color-text-light)'
      }}
    >
      <ol
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          listStyle: 'none',
          gap: '6px'
        }}
      >
        <li>
          <Link
            to="/"
            style={{
              color: 'var(--color-text-muted)',
              transition: 'color var(--transition-fast)'
            }}
          >
            Home
          </Link>
        </li>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <React.Fragment key={index}>
              <li aria-hidden="true" style={{ display: 'flex', alignItems: 'center' }}>
                <ChevronRight size={13} style={{ color: 'var(--color-border-dark)' }} />
              </li>
              <li>
                {isLast || !item.path ? (
                  <span
                    aria-current={isLast ? 'page' : undefined}
                    style={{
                      color: isLast ? 'var(--color-text-main)' : 'var(--color-text-muted)',
                      fontWeight: isLast ? 500 : 400
                    }}
                  >
                    {item.label}
                  </span>
                ) : (
                  <Link
                    to={item.path}
                    style={{
                      color: 'var(--color-text-muted)',
                      transition: 'color var(--transition-fast)'
                    }}
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            </React.Fragment>
          );
        })}
      </ol>
    </nav>
  );
};

