import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export const BackToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll back to top of page"
      style={{
        position: 'fixed',
        bottom: '24px',
        left: '24px',
        zIndex: 900,
        width: '42px',
        height: '42px',
        borderRadius: '50%',
        backgroundColor: '#FFFFFF',
        color: '#1C1E21',
        border: '1px solid var(--color-border)',
        boxShadow: '0 4px 14px rgba(0,0,0,0.1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all var(--transition-fast)'
      }}
    >
      <ArrowUp size={18} />
    </button>
  );
};

