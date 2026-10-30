import React from 'react';
import { Info, CheckCircle2 } from 'lucide-react';
import { Breadcrumbs } from '../components/Breadcrumbs';

export const Returns: React.FC = () => {
  return (
    <div className="returns-page" style={{ paddingBottom: '80px' }}>
      <div className="container" style={{ maxWidth: '820px' }}>
        <Breadcrumbs items={[{ label: 'Return & Exchange Policy' }]} />

        <div style={{ margin: '24px 0 36px 0' }}>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.4rem', marginBottom: '10px' }}>
            Returns & Exchange Guidelines
          </h1>
          <p style={{ fontSize: '0.95rem', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
            Our commitment to quality assurance, fair customer satisfaction, and authentic representation.
          </p>
        </div>

        {/* Demo Disclosure Box */}
        <div
          style={{
            backgroundColor: '#F7EEEE',
            borderLeft: '4px solid var(--color-oxblood)',
            padding: '20px',
            borderRadius: '4px',
            marginBottom: '36px',
            display: 'flex',
            gap: '14px',
            alignItems: 'flex-start'
          }}
        >
          <Info size={20} style={{ color: 'var(--color-oxblood)', flexShrink: 0, marginTop: '2px' }} />
          <div style={{ fontSize: '0.88rem', color: '#4D151A', lineHeight: 1.6 }}>
            <strong>Policy Details to be Confirmed: </strong>
            Exact commercial return windows, reverse-pickup logistics fees, and replacement terms will be published upon brand owner sign-off prior to commercial sales.
          </div>
        </div>

        <div
          style={{
            backgroundColor: '#FFFFFF',
            border: '1px solid var(--color-border)',
            borderRadius: '8px',
            padding: '32px',
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
            fontSize: '0.9rem',
            color: 'var(--color-text-muted)',
            lineHeight: 1.7
          }}
        >
          <h3 style={{ fontFamily: 'var(--font-sans)', fontSize: '1.1rem', fontWeight: 600, color: 'var(--color-text-main)' }}>
            Standard Quality & Damaged Parcel Protection
          </h3>

          <p>
            Customer trust is paramount. Every saree dispatched undergoes visual inspection for weave continuity, border embroidery attachment, and color vibrancy before leaving the packaging table.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', gap: '10px' }}>
              <CheckCircle2 size={18} style={{ color: 'var(--color-oxblood)', flexShrink: 0, marginTop: '3px' }} />
              <div>
                <strong>Parcel Opening Protocol: </strong>
                Customers are advised to record a continuous unboxing video when opening high-value ethnic garments to facilitate quick claims in the unlikely event of transit damage.
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <CheckCircle2 size={18} style={{ color: 'var(--color-oxblood)', flexShrink: 0, marginTop: '3px' }} />
              <div>
                <strong>Manufacturing Defect Resolution: </strong>
                Any garment delivered with verified manufacturing defects or wrong SKU will be replaced promptly or refunded in accordance with applicable consumer protection guidelines.
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <CheckCircle2 size={18} style={{ color: 'var(--color-oxblood)', flexShrink: 0, marginTop: '3px' }} />
              <div>
                <strong>Condition Requirements: </strong>
                Items returned must remain unworn, unwashed, and with all original brand tags, folds, and unstitched blouse pieces intact.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
