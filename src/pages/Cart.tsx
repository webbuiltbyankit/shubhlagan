import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Trash2, Plus, Minus, ArrowRight, ShieldCheck, ArrowLeft } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatINR } from '../lib/catalog';
import { Breadcrumbs } from '../components/Breadcrumbs';

export const Cart: React.FC = () => {
  const { items, subtotal, cartCount, totalMrpSavings, updateQuantity, removeFromCart, clearCart, getItemProduct } = useCart();
  const navigate = useNavigate();

  return (
    <div className="cart-page" style={{ paddingBottom: '80px' }}>
      <div className="container">
        <Breadcrumbs items={[{ label: 'Shopping Bag' }]} />

        <div style={{ margin: '16px 0 28px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.4rem', marginBottom: '6px' }}>
              Shopping Bag
            </h1>
            <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>
              {cartCount} {cartCount === 1 ? 'item' : 'items'} in your local demo session.
            </p>
          </div>

          {items.length > 0 && (
            <button
              onClick={clearCart}
              style={{ fontSize: '0.82rem', color: 'var(--color-oxblood)', textDecoration: 'underline' }}
            >
              Clear Entire Bag
            </button>
          )}
        </div>

        {items.length === 0 ? (
          <div
            style={{
              textAlign: 'center',
              padding: '80px 20px',
              backgroundColor: '#FFFFFF',
              border: '1px solid var(--color-border)',
              borderRadius: '8px'
            }}
          >
            <div
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                backgroundColor: 'var(--color-surface-subtle)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px auto',
                color: 'var(--color-text-light)'
              }}
            >
              <ShoppingBag size={28} />
            </div>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', marginBottom: '8px' }}>
              Your bag is currently empty
            </h2>
            <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', maxWidth: '440px', margin: '0 auto 24px auto' }}>
              Select a saree from any of our six fabric collections to test the local bag calculations and checkout preview.
            </p>
            <Link to="/shop" className="btn btn-primary">
              <span>Explore Collection</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: '36px' }} className="cart-grid">
            {/* Bag Lines List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {items.map((item) => {
                const product = getItemProduct(item.productId);
                if (!product) return null;

                const lineTotal = product.price * item.quantity;

                return (
                  <div
                    key={item.productId}
                    style={{
                      backgroundColor: '#FFFFFF',
                      border: '1px solid var(--color-border)',
                      borderRadius: '6px',
                      padding: '20px',
                      display: 'flex',
                      gap: '20px',
                      alignItems: 'center'
                    }}
                    className="cart-item-row"
                  >
                    <Link to={`/product/${product.slug}`} style={{ flexShrink: 0 }}>
                      <img
                        src={product.thumbnail}
                        alt={product.name}
                        loading="lazy"
                        decoding="async"
                        style={{
                          width: '90px',
                          height: '112px',
                          objectFit: 'cover',
                          borderRadius: '4px',
                          backgroundColor: '#F5EFEB'
                        }}
                      />
                    </Link>

                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--color-text-light)' }}>
                        {product.category} • SKU: {product.id}
                      </div>

                      <h3 style={{ fontFamily: 'var(--font-sans)', fontSize: '1.02rem', fontWeight: 600 }}>
                        <Link to={`/product/${product.slug}`} style={{ color: 'inherit' }}>
                          {product.name}
                        </Link>
                      </h3>

                      <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
                        Color: {product.primaryColor}
                      </div>

                      <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginTop: '2px' }}>
                        <span style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--color-oxblood)' }}>
                          {product.formattedPrice}
                        </span>
                        {product.formattedMrp && (
                          <span style={{ fontSize: '0.82rem', color: 'var(--color-text-light)', textDecoration: 'line-through' }}>
                            {product.formattedMrp}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Quantity controls & Line total */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '12px' }}>
                      <span style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-text-main)' }}>
                        {formatINR(lineTotal)}
                      </span>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            border: '1px solid var(--color-border)',
                            borderRadius: '4px'
                          }}
                        >
                          <button
                            onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                            aria-label="Decrease quantity"
                            style={{ padding: '6px 10px', color: 'var(--color-text-muted)' }}
                          >
                            <Minus size={14} />
                          </button>
                          <span style={{ minWidth: '28px', textAlign: 'center', fontSize: '0.88rem', fontWeight: 600 }}>
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                            disabled={item.quantity >= 10}
                            aria-label="Increase quantity"
                            style={{ padding: '6px 10px', color: 'var(--color-text-muted)' }}
                          >
                            <Plus size={14} />
                          </button>
                        </div>

                        <button
                          onClick={() => removeFromCart(item.productId)}
                          aria-label={`Remove ${product.name}`}
                          style={{ color: 'var(--color-text-light)', padding: '6px' }}
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}

              <div style={{ marginTop: '8px' }}>
                <Link to="/shop" className="btn-link" style={{ fontSize: '0.88rem', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                  <ArrowLeft size={16} />
                  <span>Continue Browsing Sarees</span>
                </Link>
              </div>
            </div>

            {/* Order Summary Sticky Card */}
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
                  Order Summary
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.9rem', marginBottom: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--color-text-muted)' }}>Total Items</span>
                    <span style={{ fontWeight: 600 }}>{cartCount}</span>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--color-text-muted)' }}>Estimated Subtotal</span>
                    <span style={{ fontWeight: 600 }}>{formatINR(subtotal)}</span>
                  </div>

                  {totalMrpSavings > 0 && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-oxblood)' }}>
                      <span>Difference from MRP</span>
                      <span>- {formatINR(totalMrpSavings)}</span>
                    </div>
                  )}

                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--color-text-muted)' }}>Shipping / Delivery</span>
                    <span style={{ fontStyle: 'italic', color: 'var(--color-text-light)', fontSize: '0.82rem' }}>
                      Calculated in real store
                    </span>
                  </div>

                  <div className="divider" style={{ margin: '8px 0' }} />

                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.15rem', fontWeight: 700 }}>
                    <span>Estimated Total</span>
                    <span style={{ color: 'var(--color-oxblood)' }}>{formatINR(subtotal)}</span>
                  </div>
                </div>

                <div
                  style={{
                    backgroundColor: 'var(--color-surface-subtle)',
                    padding: '12px',
                    borderRadius: '4px',
                    fontSize: '0.78rem',
                    color: 'var(--color-text-muted)',
                    marginBottom: '20px',
                    lineHeight: 1.5
                  }}
                >
                  <ShieldCheck size={14} style={{ color: 'var(--color-oxblood)', verticalAlign: 'middle', marginRight: '4px' }} />
                  <strong>Demo Mode: </strong>
                  No real orders are processed or payments charged.
                </div>

                <button
                  onClick={() => navigate('/checkout')}
                  className="btn btn-primary"
                  style={{ width: '100%', justifyContent: 'center', height: '48px' }}
                >
                  <span>Continue to Demo Checkout</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 860px) {
          .cart-grid {
            grid-template-columns: 1fr !important;
          }
          .cart-item-row {
            flex-direction: column !important;
            align-items: flex-start !important;
          }
        }
      `}</style>
    </div>
  );
};

