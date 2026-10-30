import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatINR } from '../lib/catalog';

export const MiniCartDrawer: React.FC = () => {
  const { items, isMiniCartOpen, setIsMiniCartOpen, updateQuantity, removeFromCart, subtotal, cartCount, totalMrpSavings, getItemProduct } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMiniCartOpen) {
        setIsMiniCartOpen(false);
      }
    };
    if (isMiniCartOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMiniCartOpen, setIsMiniCartOpen]);

  if (!isMiniCartOpen) return null;

  const handleCheckout = () => {
    setIsMiniCartOpen(false);
    navigate('/checkout');
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        backgroundColor: 'rgba(28, 30, 33, 0.65)',
        backdropFilter: 'blur(3px)',
        display: 'flex',
        justifyContent: 'flex-end'
      }}
      onClick={() => setIsMiniCartOpen(false)}
      role="dialog"
      aria-modal="true"
      aria-label="Shopping Bag"
    >
      <div
        style={{
          width: '100%',
          maxWidth: '440px',
          height: '100%',
          backgroundColor: '#FFFFFF',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: 'var(--shadow-drawer)',
          animation: 'slideInRight 220ms ease'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          style={{
            padding: '20px 24px',
            borderBottom: '1px solid var(--color-border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <ShoppingBag size={20} style={{ color: 'var(--color-oxblood)' }} />
            <h3 style={{ fontSize: '1.15rem', fontFamily: 'var(--font-sans)', fontWeight: 600 }}>
              Shopping Bag ({cartCount})
            </h3>
          </div>
          <button
            onClick={() => setIsMiniCartOpen(false)}
            aria-label="Close bag drawer"
            style={{ color: 'var(--color-text-muted)' }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        {items.length === 0 ? (
          <div
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '32px',
              textAlign: 'center'
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
                marginBottom: '16px',
                color: 'var(--color-text-light)'
              }}
            >
              <ShoppingBag size={28} />
            </div>
            <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem', marginBottom: '8px' }}>
              Your bag is empty
            </h4>
            <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', marginBottom: '20px' }}>
              Explore our curated selection of 17 sarees across six authentic fabrics.
            </p>
            <Link
              to="/shop"
              onClick={() => setIsMiniCartOpen(false)}
              className="btn btn-primary"
            >
              Browse All Sarees
            </Link>
          </div>
        ) : (
          <>
            <div
              style={{
                flex: 1,
                overflowY: 'auto',
                padding: '20px 24px',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px'
              }}
            >
              {items.map((item) => {
                const product = getItemProduct(item.productId);
                if (!product) return null;

                return (
                  <div
                    key={item.productId}
                    style={{
                      display: 'flex',
                      gap: '14px',
                      paddingBottom: '16px',
                      borderBottom: '1px solid var(--color-border-subtle)'
                    }}
                  >
                    <Link
                      to={`/product/${product.slug}`}
                      onClick={() => setIsMiniCartOpen(false)}
                      style={{ flexShrink: 0 }}
                    >
                      <img
                        src={product.thumbnail}
                        alt={product.name}
                        style={{
                          width: '74px',
                          height: '92px',
                          objectFit: 'cover',
                          borderRadius: '2px',
                          backgroundColor: '#F5EFEB'
                        }}
                      />
                    </Link>

                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                      <div>
                        <div style={{ fontSize: '0.72rem', color: 'var(--color-text-light)', textTransform: 'uppercase' }}>
                          {product.category}
                        </div>
                        <h4
                          style={{
                            fontSize: '0.9rem',
                            fontFamily: 'var(--font-sans)',
                            fontWeight: 500,
                            lineHeight: 1.3,
                            marginTop: '2px'
                          }}
                        >
                          <Link
                            to={`/product/${product.slug}`}
                            onClick={() => setIsMiniCartOpen(false)}
                            style={{ color: 'inherit' }}
                          >
                            {product.name}
                          </Link>
                        </h4>
                        <div style={{ fontSize: '0.92rem', fontWeight: 600, color: 'var(--color-oxblood)', marginTop: '4px' }}>
                          {product.formattedPrice}
                        </div>
                      </div>

                      {/* Quantity & Delete */}
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '8px' }}>
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
                            style={{ padding: '4px 8px', color: 'var(--color-text-muted)' }}
                          >
                            <Minus size={13} />
                          </button>
                          <span style={{ fontSize: '0.82rem', minWidth: '24px', textAlign: 'center', fontWeight: 600 }}>
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                            disabled={item.quantity >= 10}
                            aria-label="Increase quantity"
                            style={{ padding: '4px 8px', color: 'var(--color-text-muted)' }}
                          >
                            <Plus size={13} />
                          </button>
                        </div>

                        <button
                          onClick={() => removeFromCart(item.productId)}
                          aria-label={`Remove ${product.name} from bag`}
                          style={{
                            color: 'var(--color-text-light)',
                            padding: '4px'
                          }}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Footer Summary */}
            <div
              style={{
                padding: '20px 24px',
                borderTop: '1px solid var(--color-border)',
                backgroundColor: 'var(--color-surface-subtle)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>Estimated Subtotal</span>
                <span style={{ fontSize: '1.15rem', fontWeight: 600, color: 'var(--color-text-main)' }}>
                  {formatINR(subtotal)}
                </span>
              </div>

              {totalMrpSavings > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', fontSize: '0.82rem', color: 'var(--color-oxblood)' }}>
                  <span>Difference from MRP</span>
                  <span>- {formatINR(totalMrpSavings)}</span>
                </div>
              )}

              <p style={{ fontSize: '0.74rem', color: 'var(--color-text-light)', marginBottom: '16px' }}>
                *Shipping and taxes are illustrative in this demo and not charged.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <button
                  onClick={handleCheckout}
                  className="btn btn-primary"
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  <span>Continue to Demo Checkout</span>
                  <ArrowRight size={16} />
                </button>

                <Link
                  to="/cart"
                  onClick={() => setIsMiniCartOpen(false)}
                  className="btn btn-ghost"
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  View Full Bag
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

