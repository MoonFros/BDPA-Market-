import { useEffect, useState } from 'react';
import { ChevronDown, Menu, ShoppingBag, X, CalendarCheck, ArrowRight } from 'lucide-react';
import Logo from './Logo';
import Button from '../ui/Button';
import Portal from '../ui/Portal';
import { useBasket } from '../../context/BasketContext';
import { useDemo } from '../../context/DemoContext';
import { packageById } from '../../data/packages';
import { restaurant } from '../../data/restaurant';
import { cn, scrollToId } from '../../lib/utils';

const NAV = {
  essential: [
    { label: 'Home', id: 'site-top' },
    { label: 'About', id: 'about' },
    { label: 'Contact', id: 'contact' },
  ],
  premium: [
    { label: 'Home', id: 'site-top' },
    { label: 'Our Menu', id: 'menu' },
    { label: 'About', id: 'about' },
    { label: 'Gallery', id: 'gallery' },
    { label: 'Contact', id: 'contact' },
  ],
};

export default function SiteHeader({ variant = 'essential' }) {
  const premium = variant === 'premium';
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { setSwitchOpen, setCompareOpen, pkg } = useDemo();
  const { count, openBasket } = useBasket();
  const current = packageById(pkg);
  const links = NAV[variant];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return undefined;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (event) => event.key === 'Escape' && setMenuOpen(false);
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener('keydown', onKey);
    };
  }, [menuOpen]);

  const go = (id) => {
    setMenuOpen(false);
    window.setTimeout(() => scrollToId(id), 70);
  };

  return (
    <>
      <header
        className={cn(
          'sticky top-0 z-50 border-b transition-all duration-300',
          scrolled
            ? 'border-line bg-cream/95 shadow-[0_12px_30px_-26px_rgba(25,22,18,0.6)] backdrop-blur-xl'
            : 'border-line/60 bg-cream/85 backdrop-blur-md',
        )}
      >
        <div className="mx-auto flex h-[64px] max-w-7xl items-center gap-1.5 px-3 sm:h-[72px] sm:gap-3 sm:px-6">
          <Logo />

          <nav className="ml-4 hidden items-center gap-5 lg:flex xl:gap-7" aria-label="Primary">
            {links.map((link) => (
              <button
                key={link.id}
                type="button"
                onClick={() => go(link.id)}
                className="group relative text-[12.5px] font-semibold text-ink-soft transition hover:text-ink"
              >
                {link.label}
                <span className="absolute -bottom-1.5 left-0 h-px w-full origin-left scale-x-0 bg-terracotta transition-transform duration-300 group-hover:scale-x-100" />
              </button>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-1 sm:gap-2">
            <button
              type="button"
              onClick={() => setSwitchOpen(true)}
              aria-label={`Switch package — currently ${current.name}`}
              className="inline-flex items-center gap-1 rounded-full border border-line bg-paper/85 px-2 py-1.5 text-[10px] font-bold tracking-[0.08em] text-ink-soft uppercase transition hover:border-terracotta/40 hover:text-ink sm:gap-1.5 sm:px-2.5 sm:tracking-[0.12em]"
            >
              <span className="size-1.5 rounded-full bg-terracotta" />
              <span className="hidden sm:inline">Package&nbsp;</span>
              {current.number}
              <ChevronDown className="size-3" />
            </button>

            {premium && (
              <button
                type="button"
                onClick={openBasket}
                aria-label={`Open order basket, ${count} ${count === 1 ? 'item' : 'items'}`}
                className="relative grid size-9 place-items-center rounded-full border border-line bg-paper/85 text-ink transition hover:border-terracotta/40 hover:text-terracotta sm:size-10"
              >
                <ShoppingBag className="size-4" />
                {count > 0 && (
                  <span className="absolute -top-1 -right-1 grid min-w-4 place-items-center rounded-full bg-terracotta px-1 text-[9px] leading-4 font-bold text-cream">
                    {count}
                  </span>
                )}
              </button>
            )}

            <div className="hidden sm:block">
              <Button
                size="sm"
                variant={premium ? 'dark' : 'primary'}
                onClick={() => go(premium ? 'menu' : 'contact')}
              >
                {premium ? 'Order Now' : 'Get in Touch'}
              </Button>
            </div>

            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              aria-expanded={menuOpen}
              className="grid size-9 place-items-center rounded-full border border-line bg-paper/85 text-ink transition hover:border-ink/30 sm:size-10 lg:hidden"
            >
              <Menu className="size-[18px]" />
            </button>
          </div>
        </div>
      </header>

      {menuOpen && (
        <Portal>
        <div className="fixed inset-0 z-[80] flex h-[100dvh] flex-col bg-cream lg:hidden">
          <div className="flex h-[64px] items-center justify-between border-b border-line px-4 sm:h-[72px] sm:px-6">
            <Logo onClick={() => setMenuOpen(false)} />
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
              className="grid size-10 place-items-center rounded-full border border-line bg-paper text-ink"
            >
              <X className="size-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto overscroll-contain px-5 pb-10 sm:px-6">
            <nav className="mt-4 flex flex-col" aria-label="Mobile">
              {links.map((link, index) => (
                <button
                  key={link.id}
                  type="button"
                  onClick={() => go(link.id)}
                  className="flex items-center justify-between gap-4 border-b border-line py-4 text-left"
                >
                  <span className="font-display text-[27px] leading-none font-semibold">{link.label}</span>
                  <span className="rule-number text-ink-mute">0{index + 1}</span>
                </button>
              ))}
            </nav>

            <div className="mt-6 grid gap-2">
              {premium ? (
                <>
                  <Button size="lg" onClick={() => go('menu')}>
                    Order Now <ArrowRight className="size-4" />
                  </Button>
                  <Button variant="outline" size="lg" onClick={() => go('reserve')}>
                    <CalendarCheck className="size-4" /> Reserve a Table
                  </Button>
                  <Button variant="ghost" size="md" onClick={() => { setMenuOpen(false); openBasket(); }}>
                    <ShoppingBag className="size-4" /> View basket{count > 0 ? ` (${count})` : ''}
                  </Button>
                </>
              ) : (
                <Button size="lg" onClick={() => go('contact')}>
                  Get in Touch <ArrowRight className="size-4" />
                </Button>
              )}
            </div>

            <div className="mt-7 rounded-2xl border border-line bg-paper p-4">
              <p className="text-[9.5px] font-bold tracking-[0.18em] text-ink-mute uppercase">
                Previewing package
              </p>
              <button
                type="button"
                onClick={() => { setMenuOpen(false); setSwitchOpen(true); }}
                className="mt-1.5 flex w-full items-center justify-between gap-3 text-left"
              >
                <span className="font-display text-lg leading-tight font-semibold">{current.name}</span>
                <ChevronDown className="size-4 shrink-0 text-ink-mute" />
              </button>
              <button
                type="button"
                onClick={() => { setMenuOpen(false); setCompareOpen(true); }}
                className="mt-2 text-[11.5px] font-semibold text-terracotta"
              >
                Compare features
              </button>
            </div>

            <div className="mt-6 space-y-1.5 text-[11.5px] leading-relaxed text-ink-soft">
              <p>{restaurant.address}</p>
              <p>
                {restaurant.phone} <span className="text-ink-mute">· demo number</span>
              </p>
              <p>{restaurant.email}</p>
            </div>
          </div>
        </div>
        </Portal>
      )}
    </>
  );
}
