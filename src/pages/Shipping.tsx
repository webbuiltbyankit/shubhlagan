import React from 'react';
import { Truck, Info, Clock, MapPin } from 'lucide-react';
import { Breadcrumbs } from '../components/Breadcrumbs';

export const Shipping: React.FC = () => {
  return (
    <div className="shipping-page" style={{ paddingBottom: '80px' }}>
      <div className="container" style={{ maxWidth: '820px' }}>
        <Breadcrumbs items={[{ label: 'Shipping Information' }]} />

        <div style={{ margin: '24px 0 36px 0' }}>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.4rem', marginBottom: '10px' }}>
            Shipping & Delivery Policy
          </h1>
          <p style={{ fontSize: '0.95rem', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
            Transparent disclosure regarding fulfillment schedules, courier carriers, and territory coverage.
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
            <strong>Provisional Policy Status: </strong>
            This website is currently a frontend demonstration prototype. Exact nationwide delivery fees, dispatch timeframes, and pin code coverage will be published here upon official brand confirmation by Shubhlagn Sarees.
          </div>
        </div>

        {/* Guidelines */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            border: '1px solid var(--color-border)',
            borderRadius: '8px',
            padding: '32px',
            display: 'flex',
            flexDirection: 'column',
            gap: '28px'
          }}
        >
          <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
            <MapPin size={22} style={{ color: 'var(--color-oxblood)', flexShrink: 0 }} />
            <div>
              <h3 style={{ fontFamily: 'var(--font-sans)', fontSize: '1.05rem', fontWeight: 600, marginBottom: '6px' }}>
                Serviceable Locations
              </h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', lineHeight: 1.6, margin: 0 }}>
                Orders will be dispatched from our textile hub in Surat, Gujarat. Nationwide logistics partners (including Delhivery, Blue Dart, and Speed Post) are planned for commercial rollout.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
            <Clock size={22} style={{ color: 'var(--color-oxblood)', flexShrink: 0 }} />
            <div>
              <h3 style={{ fontFamily: 'var(--font-sans)', fontSize: '1.05rem', fontWeight: 600, marginBottom: '6px' }}>
                Dispatch & Delivery Timelines (Indicative)
              </h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', lineHeight: 1.6, margin: 0 }}>
                Standard domestic orders are generally prepared for dispatch within 2 business days. Estimated delivery transit ranges from 4 to 7 business days depending on location.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
            <Truck size={22} style={{ color: 'var(--color-oxblood)', flexShrink: 0 }} />
            <div>
              <h3 style={{ fontFamily: 'var(--font-sans)', fontSize: '1.05rem', fontWeight: 600, marginBottom: '6px' }}>
                Packaging & Garment Safety
              </h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', lineHeight: 1.6, margin: 0 }}>
                All sarees are inspected for thread perfection, individually sealed with moisture-resistant protective covers, and boxed to maintain pristine fold integrity.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
