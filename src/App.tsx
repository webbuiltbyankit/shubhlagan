import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastProvider } from './context/ToastContext';
import { WishlistProvider } from './context/WishlistContext';
import { CartProvider } from './context/CartContext';
import { Layout } from './components/Layout';

// Pages
import { Home } from './pages/Home';
import { Shop } from './pages/Shop';
import { CollectionPage } from './pages/CollectionPage';
import { ProductDetail } from './pages/ProductDetail';
import { SearchPage } from './pages/SearchPage';
import { Wishlist } from './pages/Wishlist';
import { Cart } from './pages/Cart';
import { Checkout } from './pages/Checkout';
import { About } from './pages/About';
import { FabricGuide } from './pages/FabricGuide';
import { Lookbook } from './pages/Lookbook';
import { FAQ } from './pages/FAQ';
import { Shipping } from './pages/Shipping';
import { Returns } from './pages/Returns';
import { Contact } from './pages/Contact';
import { NotFound } from './pages/NotFound';

export const App: React.FC = () => {
  return (
    <ToastProvider>
      <WishlistProvider>
        <CartProvider>
          <BrowserRouter>
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
          </BrowserRouter>
        </CartProvider>
      </WishlistProvider>
    </ToastProvider>
  );
};

export default App;

