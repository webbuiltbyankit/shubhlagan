import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShieldCheck, ArrowLeft, CheckCircle2, AlertCircle, ShoppingBag, ExternalLink, RotateCcw } from 'lucide-react';
import { InstagramIcon } from '../components/icons/InstagramIcon';
import { useCart } from '../context/CartContext';
import { formatINR } from '../lib/catalog';
import { contentConfig } from '../lib/contentConfig';
import { Breadcrumbs } from '../components/Breadcrumbs';

export const Checkout: React.FC = () => {
  const { items, subtotal, cartCount, clearCart, getItemProduct } = useCart();
  const navigate = useNavigate();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [landmark, setLandmark] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('Gujarat');
  const [pincode, setPincode] = useState('');
  const [paymentChoice, setPaymentChoice] = useState('upi');

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isCompleted, setIsCompleted] = useState(false);

  // If bag is empty and demo is not completed, show guarded state
  if (items.length === 0 && !isCompleted) {
    return (
      <div className="container" style={{ padding: '80px 0', textAlign: 'center' }}>
        <div style={{ width: '64px', height: '64px', borderRadius: '50%', backgroundColor: 'var(--color-surface-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px auto', color: 'var(--color-text-light)' }}>
          <ShoppingBag size={28} />
        </div>
        <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', marginBottom: '8px' }}>
          Your Bag is Empty
        </h2>
        <p style={{ color: 'var(--color-text-muted)', marginBottom: '24px' }}>
          Please add at least one saree to your bag before proceeding to demo checkout.
        </p>
        <Link to="/shop" className="btn btn-primary">
          Explore All Sarees
        </Link>
      </div>
    );
  }

  const validate = () => {
    const errs: { [key: string]: string } = {};
    if (!fullName.trim()) errs.fullName = 'Full name is required';
    if (!email.trim()) {
      errs.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errs.email = 'Please enter a valid email address';
    }
    if (phone.trim() && !/^\d{10}$/.test(phone.trim().replace(/\D/g, ''))) {
      errs.phone = 'Please enter a valid 10-digit Indian phone number';
    }
    if (!address.trim()) errs.address = 'Street address is required';
    if (!city.trim()) errs.city = 'City is required';
    if (!pincode.trim() || !/^\d{6}$/.test(pincode.trim())) {
      errs.pincode = 'Please enter a valid 6-digit postal code';
    }
    setErrors(errs);
    if (Object.keys(errs).length > 0) {
      const firstKey = Object.keys(errs)[0];
      const el = document.getElementById(firstKey);
      if (el) el.focus();
      return false;
    }
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setIsCompleted(true);
      window.scrollTo(0, 0);
    }
  };

  // Completion View (Prompt 234)
  if (isCompleted) {
    return (
      <div className="container" style={{ padding: '60px 0', maxWidth: '680px' }}>
        <div
          style={{
            backgroundColor: '#FFFFFF',
            border: '1px solid var(--color-border)',
            borderRadius: '8px',
            padding: '40px 32px',
            textAlign: 'center',
            boxShadow: 'var(--shadow-card)'
          }}
        >
          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              backgroundColor: '#EEF6F1',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 20px auto',
              color: '#2E6B48'
            }}
          >
            <CheckCircle2 size={36} />
          </div>

          <span className="badge badge-gold" style={{ marginBottom: '12px' }}>
            Interactive Frontend Simulation
          </span>

          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.4rem', marginBottom: '8px' }}>
            Demo Completed — No Order Placed
          </h1>

          <p style={{ fontSize: '0.92rem', color: 'var(--color-text-muted)', lineHeight: 1.6, marginBottom: '28px' }}>
            Thank you, <strong>{fullName}</strong>. This simulation confirms that the client-side form validation, order summaries, and item calculations work seamlessly. No payment was charged, and no personal data was sent to any server.
          </p>

          {/* Review of simulated order */}
          <div
            style={{
              backgroundColor: 'var(--color-surface-subtle)',
              border: '1px solid var(--color-border)',
              borderRadius: '6px',
              padding: '20px',
              textAlign: 'left',
              marginBottom: '28px',
              fontSize: '0.88rem'
            }}
          >
            <div style={{ fontWeight: 600, marginBottom: '12px', color: 'var(--color-text-main)', borderBottom: '1px solid var(--color-border)', paddingBottom: '8px' }}>
              Simulated Order Breakdown
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
              <span style={{ color: 'var(--color-text-muted)' }}>Customer Contact:</span>
              <span>{fullName} ({email})</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
              <span style={{ color: 'var(--color-text-muted)' }}>Delivery Destination:</span>
              <span>{city}, {state} - {pincode}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
              <span style={{ color: 'var(--color-text-muted)' }}>Total Garments:</span>
              <span>{cartCount} sarees</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 600, color: 'var(--color-oxblood)', borderTop: '1px solid var(--color-border)', paddingTop: '8px', marginTop: '8px' }}>
              <span>Total Simulated Amount:</span>
              <span>{formatINR(subtotal)}</span>
            </div>
          </div>

          {/* Action options */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <Link to="/shop" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
              Return to Boutique Catalog
            </Link>

            <button
              onClick={() => {
                clearCart();
                navigate('/shop');
              }}
              className="btn btn-ghost"
              style={{ width: '100%', justifyContent: 'center' }}
            >
              <RotateCcw size={15} />
              <span>Clear Demo Bag & Restart</span>
            </button>

            <a
              href={contentConfig.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-link"
              style={{ justifyContent: 'center', marginTop: '12px' }}
            >
              <InstagramIcon size={15} />
              <span>Connect with {contentConfig.brandName} on Instagram</span>
              <ExternalLink size={12} />
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page" style={{ paddingBottom: '80px' }}>
      <div className="container" style={{ maxWidth: '1080px' }}>
        <Breadcrumbs
          items={[
            { label: 'Shopping Bag', path: '/cart' },
            { label: 'Demo Checkout' }
          ]}
        />

        <div style={{ margin: '16px 0 28px 0' }}>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.4rem', marginBottom: '6px' }}>
            Demo Checkout
          </h1>
          <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>
            Experience the three-part customer flow. No personal details are stored permanently or transmitted.
          </p>
        </div>

        {/* Demo Notice Warning Box */}
        <div
          style={{
            backgroundColor: '#F7EEEE',
            borderLeft: '4px solid var(--color-oxblood)',
            padding: '16px 20px',
            borderRadius: '4px',
            marginBottom: '32px',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '12px'
          }}
        >
          <AlertCircle size={20} style={{ color: 'var(--color-oxblood)', flexShrink: 0, marginTop: '2px' }} />
          <div style={{ fontSize: '0.86rem', color: '#4D151A', lineHeight: 1.5 }}>
            <strong>Illustrative Prototype Notice: </strong>
            This is an interactive frontend demo for Google Antigravity. No actual orders will be fulfilled, and no card or UPI transactions can be made.
          </div>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '40px' }} className="checkout-grid">
            {/* Left Form: Contact, Delivery, Payment */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
              {/* 1. Contact Information */}
              <div style={{ backgroundColor: '#FFFFFF', border: '1px solid var(--color-border)', borderRadius: '8px', padding: '24px' }}>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', marginBottom: '16px' }}>
                  1. Contact Information
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }} className="form-two-col">
                  <div className="form-group" style={{ gridColumn: 'span 2' }}>
                    <label className="form-label" htmlFor="fullName">Full Name *</label>
                    <input
                      id="fullName"
                      type="text"
                      className={`form-input ${errors.fullName ? 'invalid' : ''}`}
                      placeholder="e.g. Radhika Sharma"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                    />
                    {errors.fullName && <div className="form-error">{errors.fullName}</div>}
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="email">Email Address *</label>
                    <input
                      id="email"
                      type="email"
                      className={`form-input ${errors.email ? 'invalid' : ''}`}
                      placeholder="radhika@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    {errors.email && <div className="form-error">{errors.email}</div>}
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="phone">Phone Number (Optional)</label>
                    <input
                      id="phone"
                      type="tel"
                      inputMode="numeric"
                      className={`form-input ${errors.phone ? 'invalid' : ''}`}
                      placeholder="10-digit mobile number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                    {errors.phone && <div className="form-error">{errors.phone}</div>}
                  </div>
                </div>
              </div>

              {/* 2. Delivery Address */}
              <div style={{ backgroundColor: '#FFFFFF', border: '1px solid var(--color-border)', borderRadius: '8px', padding: '24px' }}>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', marginBottom: '16px' }}>
                  2. Delivery Address
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }} className="form-two-col">
                  <div className="form-group" style={{ gridColumn: 'span 2' }}>
                    <label className="form-label" htmlFor="street">Street Address *</label>
                    <input
                      id="street"
                      type="text"
                      className={`form-input ${errors.address ? 'invalid' : ''}`}
                      placeholder="Flat, House no., Apartment, Street"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                    {errors.address && <div className="form-error">{errors.address}</div>}
                  </div>

                  <div className="form-group" style={{ gridColumn: 'span 2' }}>
                    <label className="form-label" htmlFor="landmark">Landmark (Optional)</label>
                    <input
                      id="landmark"
                      type="text"
                      className="form-input"
                      placeholder="Nearby temple, metro station, etc."
                      value={landmark}
                      onChange={(e) => setLandmark(e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="city">City *</label>
                    <input
                      id="city"
                      type="text"
                      className={`form-input ${errors.city ? 'invalid' : ''}`}
                      placeholder="e.g. Surat, Mumbai, Delhi"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                    />
                    {errors.city && <div className="form-error">{errors.city}</div>}
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="state">State *</label>
                    <select
                      id="state"
                      className="form-select"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                    >
                      <option value="Gujarat">Gujarat</option>
                      <option value="Maharashtra">Maharashtra</option>
                      <option value="Rajasthan">Rajasthan</option>
                      <option value="Delhi">Delhi</option>
                      <option value="Karnataka">Karnataka</option>
                      <option value="Tamil Nadu">Tamil Nadu</option>
                      <option value="Uttar Pradesh">Uttar Pradesh</option>
                      <option value="Other">Other States</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="pincode">Postal PIN Code *</label>
                    <input
                      id="pincode"
                      type="text"
                      maxLength={6}
                      inputMode="numeric"
                      className={`form-input ${errors.pincode ? 'invalid' : ''}`}
                      placeholder="6-digit PIN"
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value)}
                    />
                    {errors.pincode && <div className="form-error">{errors.pincode}</div>}
                  </div>

                  <div className="form-group">
                    <label className="form-label">Country</label>
                    <input
                      type="text"
                      className="form-input"
                      value="India (Preset)"
                      disabled
                      style={{ backgroundColor: 'var(--color-surface-subtle)', cursor: 'not-allowed' }}
                    />
                  </div>
                </div>
              </div>

              {/* 3. Non-Operational Payment Illustration (Prompts 228-229) */}
              <div style={{ backgroundColor: '#FFFFFF', border: '1px solid var(--color-border)', borderRadius: '8px', padding: '24px' }}>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', marginBottom: '8px' }}>
                  3. Payment Method (Illustrative Only)
                </h3>
                <p style={{ fontSize: '0.84rem', color: 'var(--color-text-muted)', marginBottom: '16px' }}>
                  No card numbers, CVV, or UPI PINs are ever asked. Select a conceptual method for this preview.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <label
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '12px 16px',
                      border: paymentChoice === 'upi' ? '2px solid var(--color-oxblood)' : '1px solid var(--color-border)',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      backgroundColor: paymentChoice === 'upi' ? 'var(--color-oxblood-light)' : '#FFFFFF'
                    }}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="upi"
                      checked={paymentChoice === 'upi'}
                      onChange={() => setPaymentChoice('upi')}
                      style={{ accentColor: 'var(--color-oxblood)' }}
                    />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>UPI / Net Banking (Demo Placeholder)</div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>
                        Google Pay, PhonePe, Paytm simulation
                      </div>
                    </div>
                  </label>

                  <label
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '12px 16px',
                      border: paymentChoice === 'cod' ? '2px solid var(--color-oxblood)' : '1px solid var(--color-border)',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      backgroundColor: paymentChoice === 'cod' ? 'var(--color-oxblood-light)' : '#FFFFFF'
                    }}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={paymentChoice === 'cod'}
                      onChange={() => setPaymentChoice('cod')}
                      style={{ accentColor: 'var(--color-oxblood)' }}
                    />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>Cash on Delivery (Demo Placeholder)</div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>
                        Subject to store confirmation before public sales
                      </div>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            {/* Right Column: Order Review Panel (Prompt 230) */}
            <div>
              <div
                style={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid var(--color-border)',
                  borderRadius: '8px',
                  padding: '24px',
                  position: 'sticky',
                  top: '90px'
                }}
              >
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', marginBottom: '16px' }}>
                  Review Selected Sarees
                </h3>

                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px',
                    maxHeight: '260px',
                    overflowY: 'auto',
                    marginBottom: '16px',
                    paddingRight: '6px'
                  }}
                >
                  {items.map((item) => {
                    const product = getItemProduct(item.productId);
                    if (!product) return null;

                    return (
                      <div key={item.productId} style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                        <img
                          src={product.thumbnail}
                          alt={product.name}
                          style={{ width: '48px', height: '60px', objectFit: 'cover', borderRadius: '2px', backgroundColor: '#F5EFEB' }}
                        />
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontSize: '0.82rem', fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {product.name}
                          </div>
                          <div style={{ fontSize: '0.74rem', color: 'var(--color-text-muted)' }}>
                            Qty: {item.quantity} • {product.formattedPrice}
                          </div>
                        </div>
                        <div style={{ fontSize: '0.88rem', fontWeight: 600 }}>
                          {formatINR(product.price * item.quantity)}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="divider" style={{ margin: '12px 0' }} />

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.88rem', marginBottom: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--color-text-muted)' }}>Subtotal:</span>
                    <span style={{ fontWeight: 600 }}>{formatINR(subtotal)}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--color-text-muted)' }}>Delivery Fee:</span>
                    <span style={{ fontStyle: 'italic', color: 'var(--color-text-light)' }}>Free Demo Preview</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.15rem', fontWeight: 700, color: 'var(--color-oxblood)', marginTop: '6px' }}>
                    <span>Simulated Total:</span>
                    <span>{formatINR(subtotal)}</span>
                  </div>
                </div>

                {/* Non-Transactional Finish Button (Prompt 233) */}
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ width: '100%', justifyContent: 'center', height: '48px' }}
                >
                  <ShieldCheck size={18} />
                  <span>Preview Order Summary</span>
                </button>

                <div style={{ textAlign: 'center', marginTop: '12px' }}>
                  <Link to="/cart" className="btn-link" style={{ fontSize: '0.8rem' }}>
                    <ArrowLeft size={14} />
                    <span>Return to bag</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .checkout-grid {
            grid-template-columns: 1fr !important;
          }
          .form-two-col {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};
