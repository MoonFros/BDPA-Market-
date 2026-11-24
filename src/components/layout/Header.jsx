import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import {
  ArrowRight,
  ChevronDown,
  MapPin,
  Menu,
  MessageCircleQuestion,
  Search,
  Store,
  X,
} from 'lucide-react';
import BrandMark from './BrandMark';
import Button from '../ui/Button';
import { navLinks, site } from '../../data/site';
import { shops } from '../../data/shops';
import { cn } from '../../lib/utils';

const linkClass = ({ isActive }) =>
  cn(
    'relative inline-flex h-9 items-center rounded-full px-3 text-[13.5px] font-medium transition-colors',
    isActive ? 'text-brand-dark' : 'text-ink-soft hover:bg-ink/[0.045] hover:text-ink',
  );

function LocationMenu() {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (event) => {
      if (ref.current && !ref.current.contains(event.target)) setOpen(false);
    };
    const onKey = (event) => {
      if (event.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative hidden xl:block">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        className="inline-flex h-9 items-center gap-1.5 rounded-full border border-line bg-white/60 px-3 text-[12.5px] font-medium text-ink-soft transition hover:border-brand/25 hover:text-ink"
      >
        <MapPin className="size-3.5 text-brand" strokeWidth={2} />
        BDPA, Benin City
        <ChevronDown className={cn('size-3.5 transition-transform', open && 'rotate-180')} />
      </button>

      {open && (
        <div className="animate-scale-in absolute top-11 right-0 w-72 rounded-2xl border border-line bg-white p-4 shadow-lift">
          <p className="text-[10px] font-semibold tracking-[0.16em] text-ink-mute uppercase">You are browsing</p>
          <p className="mt-1.5 font-display text-base leading-snug font-semibold text-ink">
            BDPA Shopping Complex
          </p>
          <p className="mt-1 text-[12px] leading-relaxed text-ink-soft">
            {site.address}
          </p>
          <div className="mt-3 flex items-center justify-between rounded-xl bg-canvas px-3 py-2">
            <span className="text-[11.5px] font-medium text-ink-soft">
              {shops.length} demo shops · one location
            </span>
            <span className="rounded-full bg-white px-2 py-0.5 text-[9.5px] font-semibold tracking-wide text-ink-mute uppercase ring-1 ring-line">
              Sample
            </span>
          </div>
          <Link
            to="/about"
            onClick={() => setOpen(false)}
            className="mt-3 inline-flex items-center gap-1.5 text-[11.5px] font-semibold text-brand hover:text-brand-dark"
          >
            About this platform <ArrowRight className="size-3.5" />
          </Link>
        </div>
      )}
    </div>
  );
}

export default function Header({ onOpenSearch }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname, location.search]);

  useEffect(() => {
    const onKey = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        onOpenSearch();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onOpenSearch]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  return (
    <>
      <div className="hidden border-b border-line-soft bg-canvas-deep/60 lg:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-2 text-[11px] text-ink-soft">
          <p className="inline-flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-brand" />
            A frontend demonstration of a unified digital marketplace for BDPA Shopping Complex
          </p>
          <p className="inline-flex items-center gap-4">
            <span className="text-ink-mute">Sample data only</span>
            <span className="h-3 w-px bg-line" />
            <span>8 demo shops · 6 categories</span>
          </p>
        </div>
      </div>

      <header
        className={cn(
          'sticky top-0 z-50 transition-all duration-300',
          scrolled
            ? 'border-b border-line/80 bg-canvas/85 shadow-[0_10px_30px_-28px_rgba(21,33,27,0.6)] backdrop-blur-xl'
            : 'border-b border-transparent bg-canvas/60 backdrop-blur-md',
        )}
      >
        <div className="mx-auto flex h-[68px] max-w-7xl items-center gap-3 px-4 sm:px-6 lg:h-[76px]">
          <BrandMark className="mr-auto lg:mr-4" />

          <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Primary">
            {navLinks.map((link) => (
              <NavLink key={link.to} to={link.to} end={link.to === '/'} className={linkClass}>
                {({ isActive }) => (
                  <>
                    {link.label}
                    <span
                      className={cn(
                        'absolute inset-x-3 -bottom-px h-0.5 rounded-full bg-brand transition-opacity',
                        isActive ? 'opacity-100' : 'opacity-0',
                      )}
                    />
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          <div className="ml-auto flex shrink-0 items-center gap-1.5 sm:gap-2">
            <LocationMenu />

            <button
              type="button"
              onClick={onOpenSearch}
              className="hidden h-9 items-center gap-2 overflow-hidden rounded-full border border-line bg-white/70 pr-2 pl-3 text-[12.5px] whitespace-nowrap text-ink-mute transition hover:border-brand/30 hover:bg-white hover:text-ink md:flex md:w-64 lg:w-44 xl:w-64"
              aria-label="Search shops and products"
            >
              <Search className="size-3.5" />
              <span className="flex-1 truncate text-left">Search shops & products</span>
              <kbd className="hidden rounded border border-line bg-canvas px-1 py-0.5 text-[9.5px] font-medium tracking-wide text-ink-mute xl:block">
                ⌘K
              </kbd>
            </button>

            <button
              type="button"
              onClick={onOpenSearch}
              className="grid size-10 place-items-center rounded-full text-ink-soft transition hover:bg-ink/[0.05] md:hidden"
              aria-label="Search"
            >
              <Search className="size-5" />
            </button>

            <div className="hidden shrink-0 sm:block">
              <Button to="/owners" size="sm" className="h-9 px-4 text-[12.5px]" Icon={Store}>
                For Shop Owners
              </Button>
            </div>

            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              className="grid size-10 place-items-center rounded-full border border-line bg-white/70 text-ink lg:hidden"
              aria-label="Open menu"
              aria-expanded={menuOpen}
            >
              <Menu className="size-5" />
            </button>
          </div>
        </div>
      </header>

      {menuOpen && (
        <div className="fixed inset-0 z-[70] flex flex-col bg-canvas lg:hidden">
          <div className="flex h-[68px] items-center justify-between px-4">
            <BrandMark />
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              className="grid size-10 place-items-center rounded-full border border-line bg-white text-ink"
              aria-label="Close menu"
            >
              <X className="size-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-4 pb-8">
            <button
              type="button"
              onClick={() => {
                setMenuOpen(false);
                onOpenSearch();
              }}
              className="flex w-full items-center gap-3 rounded-2xl border border-line bg-white px-4 py-3.5 text-left text-sm text-ink-mute shadow-soft"
            >
              <Search className="size-4" />
              Search shops, products or services…
            </button>

            <nav className="mt-5 grid gap-1" aria-label="Mobile primary">
              {[...navLinks, { label: 'For Shop Owners', to: '/owners' }].map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === '/'}
                  className={({ isActive }) =>
                    cn(
                      'flex items-center justify-between rounded-xl px-3 py-3.5 font-display text-[22px] font-semibold transition',
                      isActive ? 'bg-brand-soft text-brand-dark' : 'text-ink hover:bg-ink/[0.04]',
                    )
                  }
                >
                  {link.label}
                  <ArrowRight className="size-4 text-ink-mute" />
                </NavLink>
              ))}
            </nav>

            <div className="mt-6 rounded-2xl border border-line bg-white p-4 shadow-soft">
              <div className="flex items-start gap-3">
                <span className="grid size-9 shrink-0 place-items-center rounded-full bg-brand-soft text-brand">
                  <MapPin className="size-4" />
                </span>
                <div>
                  <p className="text-[12.5px] font-semibold text-ink">BDPA Shopping Complex</p>
                  <p className="mt-0.5 text-[11.5px] leading-relaxed text-ink-soft">{site.address}</p>
                  <p className="mt-2 text-[10.5px] font-medium tracking-wide text-ink-mute uppercase">
                    Sample location data
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-4 flex items-start gap-2.5 rounded-xl bg-canvas-deep p-3 text-[11px] leading-relaxed text-ink-soft">
              <MessageCircleQuestion className="mt-0.5 size-4 shrink-0 text-brand" />
              This is a demonstration website. All shops, prices and contact details are sample data.
            </div>
          </div>
        </div>
      )}
    </>
  );
}
