import React, { useState } from 'react';
import { ExternalLink, MapPin, Send, CheckCircle2 } from 'lucide-react';
import { InstagramIcon } from '../components/icons/InstagramIcon';
import { contentConfig } from '../lib/contentConfig';
import { Breadcrumbs } from '../components/Breadcrumbs';

export const Contact: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Catalog Inquiry');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validate = () => {
    const errs: { [key: string]: string } = {};
    if (!name.trim()) errs.name = 'Please provide your name';
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) errs.email = 'Please provide a valid email address';
    if (!message.trim() || message.length < 10) errs.message = 'Please enter a message of at least 10 characters';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setSubmitted(true);
    }
  };

  return (
    <div className="contact-page" style={{ paddingBottom: '80px' }}>
      <div className="container" style={{ maxWidth: '960px' }}>
        <Breadcrumbs items={[{ label: 'Contact Us' }]} />

        <div style={{ margin: '24px 0 36px 0', textAlign: 'center' }}>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.4rem, 4vw, 3.2rem)', marginBottom: '10px' }}>
            Get in Touch
          </h1>
          <p style={{ fontSize: '1rem', color: 'var(--color-text-muted)', maxWidth: '600px', margin: '0 auto', lineHeight: 1.6 }}>
            For garment styling inquiries, custom orders, or boutique questions, connect with our official channel.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '40px' }}>
          {/* Official Channel Card */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div
              style={{
                backgroundColor: '#FFFFFF',
                border: '1px solid var(--color-border)',
                borderRadius: '8px',
                padding: '32px'
              }}
            >
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', marginBottom: '16px' }}>
                Official Instagram Channel
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', lineHeight: 1.6, marginBottom: '24px' }}>
                The fastest way to reach the boutique team for live drape videos, stock availability, and private appointments is through our official verified Instagram page:
              </p>

              <a
                href={contentConfig.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', width: '100%', justifyContent: 'center' }}
              >
                <InstagramIcon size={18} />
                <span>Message {contentConfig.instagramHandle}</span>
                <ExternalLink size={14} />
              </a>
            </div>

            {/* Provisional Details Card */}
            <div
              style={{
                backgroundColor: 'var(--color-surface-subtle)',
                border: '1px solid var(--color-border)',
                borderRadius: '8px',
                padding: '24px',
                fontSize: '0.86rem',
                color: 'var(--color-text-muted)',
                lineHeight: 1.6
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600, color: 'var(--color-text-main)', marginBottom: '8px' }}>
                <MapPin size={16} style={{ color: 'var(--color-oxblood)' }} />
                <span>Textile Studio Location</span>
              </div>
              <p style={{ margin: 0, marginBottom: '12px' }}>
                Surat, Gujarat, India (Primary manufacturing & design studio).
              </p>
              <div style={{ fontSize: '0.76rem', color: 'var(--color-text-light)', borderTop: '1px solid var(--color-border)', paddingTop: '8px' }}>
                *Direct telephone lines and physical studio appointments are pending official owner confirmation before public commerce release.
              </div>
            </div>
          </div>

          {/* Interactive Demo Inquiry Form */}
          <div
            style={{
              backgroundColor: '#FFFFFF',
              border: '1px solid var(--color-border)',
              borderRadius: '8px',
              padding: '32px'
            }}
          >
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', marginBottom: '8px' }}>
              Send an Inquiry
            </h3>
            <p style={{ fontSize: '0.86rem', color: 'var(--color-text-muted)', marginBottom: '20px' }}>
              Test our frontend contact interaction form.
            </p>

            {submitted ? (
              <div
                style={{
                  backgroundColor: '#EEF6F1',
                  border: '1px solid #C3E6CD',
                  borderRadius: '6px',
                  padding: '24px',
                  textAlign: 'center'
                }}
              >
                <CheckCircle2 size={36} style={{ color: '#2E6B48', margin: '0 auto 12px auto' }} />
                <h4 style={{ fontFamily: 'var(--font-sans)', fontSize: '1.1rem', fontWeight: 600, color: '#2E6B48', marginBottom: '6px' }}>
                  Preview Message Recorded
                </h4>
                <p style={{ fontSize: '0.85rem', color: '#1B4D2E', lineHeight: 1.5, margin: 0 }}>
                  This is a demonstration preview. No actual email was sent across the internet, and no personal data was stored on a server.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setMessage('');
                  }}
                  className="btn btn-ghost"
                  style={{ marginTop: '16px', fontSize: '0.82rem' }}
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <div className="form-group">
                  <label className="form-label" htmlFor="name">Your Name *</label>
                  <input
                    id="name"
                    type="text"
                    className={`form-input ${errors.name ? 'invalid' : ''}`}
                    placeholder="Enter your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  {errors.name && <div className="form-error">{errors.name}</div>}
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="email">Email Address *</label>
                  <input
                    id="email"
                    type="email"
                    className={`form-input ${errors.email ? 'invalid' : ''}`}
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {errors.email && <div className="form-error">{errors.email}</div>}
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="subject">Subject</label>
                  <select
                    id="subject"
                    className="form-select"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                  >
                    <option value="Catalog Inquiry">Inquiry regarding a specific Saree SKU</option>
                    <option value="Fabric Information">Fabric drape & blouse queries</option>
                    <option value="Bulk / Festive Order">Festive celebration bulk inquiry</option>
                    <option value="General Question">General boutique inquiry</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="message">Message *</label>
                  <textarea
                    id="message"
                    rows={4}
                    className={`form-textarea ${errors.message ? 'invalid' : ''}`}
                    placeholder="Tell us about the sarees you are interested in..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                  {errors.message && <div className="form-error">{errors.message}</div>}
                </div>

                <div style={{ fontSize: '0.74rem', color: 'var(--color-text-light)', marginBottom: '16px' }}>
                  *Interactive demonstration mode: message validates client-side only.
                </div>

                <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                  <Send size={16} />
                  <span>Send Demo Inquiry</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
