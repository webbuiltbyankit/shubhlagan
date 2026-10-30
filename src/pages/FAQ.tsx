import React, { useState } from 'react';
import { ChevronDown, HelpCircle, ShieldCheck } from 'lucide-react';
import { Breadcrumbs } from '../components/Breadcrumbs';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FAQItem[] = [
    {
      category: 'Catalog & Garments',
      question: 'How many sarees are featured in the catalog?',
      answer: 'The catalog features exactly 17 authentic sarees across six fabric collections: Fandy (7), Georgette (4), Silk (3), Chiffon (1), Chinon (1), and Crepe (1). Every garment includes two verified high-resolution photographs showing full drape and fine embroidery detail.'
    },
    {
      category: 'Catalog & Garments',
      question: 'Does the saree include a matching blouse piece?',
      answer: 'Yes. Every saree in our catalog provides standard dimensions of 5.5 meters for the saree drape plus an unstitched 0.80 meter matching blouse fabric piece.'
    },
    {
      category: 'Catalog & Garments',
      question: 'What are the recommended washing and care instructions?',
      answer: 'All sarees in our catalog have a recommended specification of Dry Clean Only. Because fine embroidery and delicate border piping require careful preservation, handwashing or washing machines are not advised.'
    },
    {
      category: 'Demo Experience',
      question: 'Do I need an account to save sarees or test the checkout?',
      answer: 'No account, password, or sign-in is required. All wishlist items and shopping bag selections reside securely in your browser session using standard local storage.'
    },
    {
      category: 'Demo Experience',
      question: 'Can I place a real order or make a real payment here?',
      answer: 'No. This website is a frontend showcase and prototype developed for Google Antigravity. The checkout flow is non-transactional and collects zero credit card, bank, or UPI credentials.'
    },
    {
      category: 'Policies & Fulfillment',
      question: 'When will real ordering and nationwide shipping go live?',
      answer: 'Commercial delivery rates, pin code serviceability, payment gateway options, and return terms are subject to final store owner confirmation before public commercial launch.'
    }
  ];

  return (
    <div className="faq-page" style={{ paddingBottom: '80px' }}>
      <div className="container" style={{ maxWidth: '820px' }}>
        <Breadcrumbs items={[{ label: 'Help & FAQ' }]} />

        {/* Header */}
        <div style={{ textAlign: 'center', margin: '24px 0 40px 0' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
            <HelpCircle size={16} style={{ color: 'var(--color-gold-muted)' }} />
            <span style={{ fontSize: '0.78rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--color-gold-muted)', fontWeight: 600 }}>
              Assistance & Transparency
            </span>
          </div>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.4rem, 4vw, 3.2rem)', marginBottom: '12px' }}>
            Frequently Asked Questions
          </h1>
          <p style={{ fontSize: '1rem', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
            Helpful information regarding our saree collections, draping dimensions, and frontend showcase operation.
          </p>
        </div>

        {/* Accordions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                style={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid var(--color-border)',
                  borderRadius: '6px',
                  overflow: 'hidden'
                }}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  style={{
                    width: '100%',
                    padding: '20px 24px',
                    textAlign: 'left',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '16px',
                    fontWeight: 600,
                    fontSize: '0.98rem',
                    color: isOpen ? 'var(--color-oxblood)' : 'var(--color-text-main)'
                  }}
                  aria-expanded={isOpen}
                >
                  <div>
                    <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--color-gold-muted)', marginBottom: '4px' }}>
                      {faq.category}
                    </div>
                    <span>{faq.question}</span>
                  </div>
                  <ChevronDown
                    size={18}
                    style={{
                      transform: isOpen ? 'rotate(180deg)' : 'none',
                      transition: 'transform 200ms ease',
                      flexShrink: 0
                    }}
                  />
                </button>

                {isOpen && (
                  <div
                    style={{
                      padding: '0 24px 20px 24px',
                      fontSize: '0.9rem',
                      color: 'var(--color-text-muted)',
                      lineHeight: 1.7,
                      borderTop: '1px solid var(--color-border-subtle)'
                    }}
                  >
                    <p style={{ marginTop: '14px', margin: 0 }}>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Demo safety block */}
        <div
          style={{
            marginTop: '48px',
            backgroundColor: 'var(--color-surface-subtle)',
            border: '1px solid var(--color-border)',
            borderRadius: '8px',
            padding: '24px',
            display: 'flex',
            gap: '14px',
            alignItems: 'flex-start'
          }}
        >
          <ShieldCheck size={20} style={{ color: 'var(--color-oxblood)', flexShrink: 0, marginTop: '2px' }} />
          <div style={{ fontSize: '0.86rem', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
            <strong>Have inquiries about specific sarees or owner details? </strong>
            Visit our <a href="/contact" style={{ color: 'var(--color-oxblood)', fontWeight: 600 }}>Contact page</a> to connect directly with the official Shubhlagn Sarees Instagram channel.
          </div>
        </div>
      </div>
    </div>
  );
};

