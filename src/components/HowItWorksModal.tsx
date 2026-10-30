import React, { useEffect } from 'react';
import { X, CheckCircle2, ShieldAlert, Sparkles } from 'lucide-react';
import { contentConfig } from '../lib/contentConfig';

interface HowItWorksModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HowItWorksModal: React.FC<HowItWorksModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        backgroundColor: 'rgba(28, 30, 33, 0.65)',
        backdropFilter: 'blur(4px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px'
      }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="how-it-works-title"
    >
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '8px',
          maxWidth: '560px',
          width: '100%',
          maxHeight: '90vh',
          overflowY: 'auto',
          padding: '28px',
          position: 'relative',
          boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close dialog"
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            color: 'var(--color-text-muted)'
          }}
        >
          <X size={22} />
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <Sparkles size={20} style={{ color: 'var(--color-gold)' }} />
          <span style={{ fontSize: '0.8rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--color-gold-muted)', fontWeight: 600 }}>
            Architecture Overview
          </span>
        </div>

        <h3 id="how-it-works-title" style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', marginBottom: '16px' }}>
          How This Boutique Demo Works
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', fontSize: '0.9rem', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
          <div style={{ display: 'flex', gap: '12px' }}>
            <CheckCircle2 size={18} style={{ color: 'var(--color-oxblood)', flexShrink: 0, marginTop: '3px' }} />
            <div>
              <strong style={{ color: 'var(--color-text-main)' }}>Authentic 17-Garment Catalog:</strong>
              <p style={{ margin: '4px 0 0 0' }}>
                All 17 sarees and 34 paired high-resolution photographs are loaded directly from the store's verified digital research package across 6 fabric collections (Fandy, Georgette, Silk, Chiffon, Chinon, Crepe).
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <CheckCircle2 size={18} style={{ color: 'var(--color-oxblood)', flexShrink: 0, marginTop: '3px' }} />
            <div>
              <strong style={{ color: 'var(--color-text-main)' }}>Browser-Local State:</strong>
              <p style={{ margin: '4px 0 0 0' }}>
                Bag and Wishlist actions use resilient HTML5 localStorage. No accounts, cookies, tracking tokens, or external databases are required.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <ShieldAlert size={18} style={{ color: 'var(--color-gold-muted)', flexShrink: 0, marginTop: '3px' }} />
            <div>
              <strong style={{ color: 'var(--color-text-main)' }}>Zero-Backend Safety Boundary:</strong>
              <p style={{ margin: '4px 0 0 0' }}>
                Checkout is strictly an illustrative simulation. No payment credentials or personal data are collected, saved to server, or transmitted over the wire.
              </p>
            </div>
          </div>

          <div style={{ backgroundColor: 'var(--color-surface-subtle)', padding: '14px', borderRadius: '4px', fontSize: '0.82rem', marginTop: '8px' }}>
            <strong>Store Verification Notice:</strong> Commercial delivery rates, terms, and final store operational contacts will be finalized by {contentConfig.brandName} before commercial launch.
          </div>
        </div>

        <button
          onClick={onClose}
          className="btn btn-primary"
          style={{ width: '100%', marginTop: '24px' }}
        >
          Explore Boutique
        </button>
      </div>
    </div>
  );
};

