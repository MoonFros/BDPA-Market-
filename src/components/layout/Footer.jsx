import { Link } from 'react-router-dom';
import { ArrowUpRight, Instagram, MapPin, MessageCircle, Phone, Store } from 'lucide-react';
import BrandMark from './BrandMark';
import { categories, site } from '../../data/site';
import { useDemoNotice } from '../../hooks/useDemoNotice';

const footerLink = 'text-[13px] text-ink-soft transition-colors hover:text-brand-dark';

export default function Footer() {
  const notifyDemo = useDemoNotice();

  return (
    <footer className="mt-24 border-t border-line bg-canvas-deep/50">
      <div className="mx-auto max-w-7xl px-4 pt-14 pb-28 sm:px-6 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr_1.1fr]">
          <div>
            <BrandMark />
            <p className="mt-4 max-w-xs text-[13px] leading-relaxed text-ink-soft">
              One digital roof for every shop in BDPA Shopping Complex — discover businesses, browse products
              and connect with the people who run them.
            </p>
            <div className="mt-5 inline-flex items-start gap-2.5 rounded-xl border border-line bg-white/60 px-3 py-2.5">
              <MapPin className="mt-0.5 size-4 shrink-0 text-brand" />
              <div>
                <p className="text-[12px] font-semibold text-ink">BDPA Shopping Complex</p>
                <p className="text-[11px] text-ink-soft">Benin City, Edo State, Nigeria</p>
              </div>
            </div>
          </div>

          <div>
            <p className="text-[10.5px] font-semibold tracking-[0.16em] text-ink-mute uppercase">Explore</p>
            <ul className="mt-4 space-y-2.5">
              <li><Link to="/" className={footerLink}>Home</Link></li>
              <li><Link to="/shops" className={footerLink}>All shops</Link></li>
              <li><Link to="/categories" className={footerLink}>Categories</Link></li>
              <li><Link to="/shops?sort=products" className={footerLink}>Most stocked shops</Link></li>
            </ul>
          </div>

          <div>
            <p className="text-[10.5px] font-semibold tracking-[0.16em] text-ink-mute uppercase">Categories</p>
            <ul className="mt-4 space-y-2.5">
              {categories.slice(0, 5).map((category) => (
                <li key={category.id}>
                  <Link to={`/shops?category=${category.id}`} className={footerLink}>
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-[10.5px] font-semibold tracking-[0.16em] text-ink-mute uppercase">The platform</p>
            <ul className="mt-4 space-y-2.5">
              <li><Link to="/about" className={footerLink}>About BDPA Market</Link></li>
              <li>
                <Link to="/owners" className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-brand transition hover:text-brand-dark">
                  <Store className="size-3.5" /> For shop owners
                  <ArrowUpRight className="size-3" />
                </Link>
              </li>
              <li>
                <button type="button" onClick={notifyDemo} className="inline-flex items-center gap-1.5 text-[13px] text-ink-soft transition hover:text-brand-dark">
                  <MessageCircle className="size-3.5" /> WhatsApp enquiries
                </button>
              </li>
              <li>
                <button type="button" onClick={notifyDemo} className="inline-flex items-center gap-1.5 text-[13px] text-ink-soft transition hover:text-brand-dark">
                  <Phone className="size-3.5" /> {site.whatsappDemo}
                </button>
              </li>
              <li>
                <button type="button" onClick={notifyDemo} className="inline-flex items-center gap-1.5 text-[13px] text-ink-soft transition hover:text-brand-dark">
                  <Instagram className="size-3.5" /> Social links
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 rounded-2xl border border-amber-200/60 bg-amber-50/60 px-4 py-3 text-[11.5px] leading-relaxed text-amber-900/90">
          <span className="font-semibold">Demonstration notice — </span>
          {site.disclaimer}
        </div>

        <div className="mt-8 flex flex-col gap-3 border-t border-line pt-6 text-[11px] text-ink-mute sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} BDPA Market concept · Frontend demonstration only.</p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <Link to="/about" className="transition hover:text-ink">About</Link>
            <Link to="/owners" className="transition hover:text-ink">Seller portal preview</Link>
            <span className="inline-flex items-center gap-1.5">
              <span className="size-1.5 rounded-full bg-brand" /> Built for BDPA, Benin City
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
