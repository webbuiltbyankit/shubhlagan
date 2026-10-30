import React from 'react';
import { Info } from 'lucide-react';

interface DemoNoticeProps {
  message?: string;
  variant?: 'subtle' | 'warning' | 'box';
  className?: string;
}

export const DemoNotice: React.FC<DemoNoticeProps> = ({
  message = 'Frontend-only demo for preview. No real orders are placed, and no payments are collected.',
  variant = 'subtle',
  className = ''
}) => {
  if (variant === 'box') {
    return (
      <div
        className={`demo-notice-box ${className}`}
        style={{
          backgroundColor: '#F7EEEE',
          borderLeft: '3px solid #621D23',
          padding: '14px 18px',
          borderRadius: '4px',
          display: 'flex',
          alignItems: 'flex-start',
          gap: '12px',
          margin: '16px 0'
        }}
        role="note"
      >
        <Info size={18} style={{ color: '#621D23', marginTop: '2px', flexShrink: 0 }} />
        <div style={{ fontSize: '0.85rem', color: '#4D151A', lineHeight: 1.5 }}>
          <strong>Demo Notice: </strong> {message}
        </div>
      </div>
    );
  }

  return (
    <div
      className={`demo-notice-inline ${className}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        fontSize: '0.78rem',
        color: '#807B77',
        letterSpacing: '0.01em'
      }}
      role="note"
    >
      <Info size={14} style={{ color: '#807B77' }} />
      <span>{message}</span>
    </div>
  );
};

