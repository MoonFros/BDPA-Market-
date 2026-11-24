import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import MobileTabBar from './MobileTabBar';
import SearchDialog from './SearchDialog';

function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' in window ? 'instant' : 'auto' });
  }, [pathname, hash]);

  return null;
}

export default function Layout() {
  const [searchOpen, setSearchOpen] = useState(false);
  const { pathname } = useLocation();

  return (
    <div className="flex min-h-dvh flex-col">
      <ScrollManager />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[120] focus:rounded-full focus:bg-brand focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
      >
        Skip to content
      </a>
      <Header onOpenSearch={() => setSearchOpen(true)} />
      <main id="main" className="flex-1 pb-16 md:pb-0">
        <div key={pathname} className="animate-fade-in">
          <Outlet />
        </div>
      </main>
      <Footer />
      <MobileTabBar />
      <SearchDialog open={searchOpen} onClose={() => setSearchOpen(false)} />
    </div>
  );
}
