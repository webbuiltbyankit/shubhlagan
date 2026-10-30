import React, { Suspense } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { ToastProvider } from './context/ToastContext';
import { WishlistProvider } from './context/WishlistContext';
import { CartProvider } from './context/CartContext';
import { Layout } from './components/Layout';

// Eager load critical landing page
import { Home } from './pages/Home';

// Lazy load secondary routes for instant initial load time and lightweight bundle
const Shop = React.lazy(() => import('./pages/Shop').then((m) => ({ default: m.Shop })));
const CollectionPage = React.lazy(() => import('./pages/CollectionPage').then((m) => ({ default: m.CollectionPage })));
const ProductDetail = React.lazy(() => import('./pages/ProductDetail').then((m) => ({ default: m.ProductDetail })));
const SearchPage = React.lazy(() => import('./pages/SearchPage').then((m) => ({ default: m.SearchPage })));
const Wishlist = React.lazy(() => import('./pages/Wishlist').then((m) => ({ default: m.Wishlist })));
const Cart = React.lazy(() => import('./pages/Cart').then((m) => ({ default: m.Cart })));
const Checkout = React.lazy(() => import('./pages/Checkout').then((m) => ({ default: m.Checkout })));
const About = React.lazy(() => import('./pages/About').then((m) => ({ default: m.About })));
const FabricGuide = React.lazy(() => import('./pages/FabricGuide').then((m) => ({ default: m.FabricGuide })));
const Lookbook = React.lazy(() => import('./pages/Lookbook').then((m) => ({ default: m.Lookbook })));
const FAQ = React.lazy(() => import('./pages/FAQ').then((m) => ({ default: m.FAQ })));
const Shipping = React.lazy(() => import('./pages/Shipping').then((m) => ({ default: m.Shipping })));
const Returns = React.lazy(() => import('./pages/Returns').then((m) => ({ default: m.Returns })));
const Contact = React.lazy(() => import('./pages/Contact').then((m) => ({ default: m.Contact })));
const NotFound = React.lazy(() => import('./pages/NotFound').then((m) => ({ default: m.NotFound })));

const RouteFallback: React.FC = () => (
  <div
    style={{
      minHeight: '60vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'var(--color-oxblood)'
    }}
  >
    <div
      style={{
        width: '32px',
        height: '32px',
        border: '3px solid #EAD8C7',
        borderTopColor: '#621D23',
        borderRadius: '50%',
        animation: 'spin 0.7s linear infinite'
      }}
    />
  </div>
);

export const App: React.FC = () => {
  return (
    <ToastProvider>
      <WishlistProvider>
        <CartProvider>
          <HashRouter>
            <Suspense fallback={<RouteFallback />}>
              <Routes>
                <Route path="/" element={<Layout />}>
                  <Route index element={<Home />} />
                  <Route path="shop" element={<Shop />} />
                  <Route path="collections/:slug" element={<CollectionPage />} />
                  <Route path="product/:slug" element={<ProductDetail />} />
                  <Route path="search" element={<SearchPage />} />
                  <Route path="wishlist" element={<Wishlist />} />
                  <Route path="cart" element={<Cart />} />
                  <Route path="checkout" element={<Checkout />} />
                  <Route path="about" element={<About />} />
                  <Route path="fabric-guide" element={<FabricGuide />} />
                  <Route path="lookbook" element={<Lookbook />} />
                  <Route path="faq" element={<FAQ />} />
                  <Route path="shipping" element={<Shipping />} />
                  <Route path="returns" element={<Returns />} />
                  <Route path="contact" element={<Contact />} />
                  <Route path="*" element={<NotFound />} />
                </Route>
              </Routes>
            </Suspense>
          </HashRouter>
        </CartProvider>
      </WishlistProvider>
    </ToastProvider>
  );
};

export default App;


