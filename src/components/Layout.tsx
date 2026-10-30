import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { BackToTop } from './BackToTop';

export const Layout: React.FC = () => {
  const { pathname } = useLocation();

  // Scroll restoration on navigation to new route (except when filter query changes only)
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <main id="main-content" style={{ flexGrow: 1 }}>
        <Outlet />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
};
