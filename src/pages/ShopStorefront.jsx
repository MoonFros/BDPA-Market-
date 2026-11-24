import { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  ChevronRight,
  Clock,
  MapPin,
  MessageCircle,
  Navigation,
  Phone,
  Search,
  Share2,
  ShoppingBag,
  Sparkles,
  Store,
} from 'lucide-react';
import SmartImage from '../components/ui/SmartImage';
import ShopLogo from '../components/ui/ShopLogo';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import Rating from '../components/ui/Rating';
import SectionHeading from '../components/ui/SectionHeading';
import ContactDialog from '../components/ContactDialog';
import Reveal from '../components/ui/Reveal';
import { getCategory, site } from '../data/site';
import { shopBySlug, shops } from '../data/shops';
import { cn, formatNaira, pluralise } from '../lib/utils';
import { usePageMeta } from '../hooks/usePageMeta';
import { useDemoNotice } from '../hooks/useDemoNotice';
import { useToast } from '../context/ToastContext';

function ShopNotFound() {
  return (
    <div className="mx-auto flex max-w-lg flex-col items-center px-4 py-24 text-center">
      <span className="grid size-14 place-items-center rounded-full bg-canvas-deep text-ink-mute">
        <Store className="size-6" />
      </span>
      <h1 className="mt-5 font-display text-3xl font-semibold">This unit is empty</h1>
      <p className="mt-2 text-[13.5px] leading-relaxed text-ink-soft">
        We could not find that storefront in the demo directory. It may have been renamed while the
        demonstration was being prepared.
      </p>
      <Button to="/shops" className="mt-6" Icon={ArrowLeft}>
        Back to all shops
      </Button>
    </div>
  );
}

function ProductTile({ shop, product }) {
  return (
    <Link
      to={`/shops/${shop.slug}/product/${product.id}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-[var(--accent)]/25 hover:shadow-lift"
    >
      <div className="relative">
        <SmartImage
          src={product.image}
          alt={product.name}
          icon={ShoppingBag}
          className="aspect-[4/3] w-full"
          imgClassName="group-hover:scale-[1.05]"
        />
        {product.badge && (
          <span className="absolute top-2.5 left-2.5 rounded-full bg-white/92 px-2 py-0.5 text-[10px] font-semibold text-ink shadow-sm backdrop-blur">
            {product.badge}
          </span>
        )}
        <span className="absolute top-2.5 right-2.5 rounded-full bg-white/90 px-2 py-0.5 text-[9.5px] font-semibold tracking-wide text-ink-soft uppercase backdrop-blur">
          {product.section}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-3.5">
        <h3 className="text-[14px] leading-snug font-semibold text-ink group-hover:text-[var(--accent-ink)]">
          {product.name}
        </h3>
        <p className="mt-1 line-clamp-2 text-[11.5px] leading-relaxed text-ink-soft">{product.description}</p>
        <div className="mt-auto flex items-end justify-between gap-2 pt-3">
          <p className="font-display text-[17px] leading-none font-semibold text-ink">
            {formatNaira(product.price)}
            <span className="ml-1 font-sans text-[10.5px] font-medium text-ink-mute">{product.unit}</span>
          </p>
          <span className="grid size-7 place-items-center rounded-full bg-canvas-deep text-ink-soft transition group-hover:bg-[var(--accent)] group-hover:text-white">
            <ArrowUpRight className="size-3.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}

function MenuSection({ shop, section, products }) {
  return (
    <div>
      <div className="flex items-center gap-3">
        <h3 className="font-display text-xl font-semibold text-ink">{section}</h3>
        <span className="h-px flex-1 bg-line" />
        <span className="text-[10.5px] font-medium tracking-wide text-ink-mute uppercase">
          {products.length} {products.length === 1 ? 'item' : 'items'}
        </span>
      </div>
      <div className="mt-3 overflow-hidden rounded-2xl border border-line bg-white shadow-soft">
        {products.map((product, index) => (
          <Link
            key={product.id}
            to={`/shops/${shop.slug}/product/${product.id}`}
            className={cn(
              'group flex gap-3.5 p-3 transition-colors hover:bg-[var(--accent-soft)]/40 sm:gap-4 sm:p-4',
              index > 0 && 'border-t border-line-soft',
            )}
          >
            <SmartImage
              src={product.image}
              alt={product.name}
              icon={ShoppingBag}
              className="size-20 shrink-0 rounded-xl sm:size-24"
              imgClassName="group-hover:scale-105"
            />
            <div className="flex min-w-0 flex-1 flex-col">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h4 className="text-[14px] leading-snug font-semibold text-ink">{product.name}</h4>
                    {product.badge && (
                      <span
                        className="rounded-full px-2 py-0.5 text-[9.5px] font-semibold"
                        style={{ background: shop.accentSoft, color: shop.accentInk }}
                      >
                        {product.badge}
                      </span>
                    )}
                  </div>
                  <p className="mt-1 line-clamp-2 text-[11.5px] leading-relaxed text-ink-soft sm:text-[12px]">
                    {product.description}
                  </p>
                </div>
                <div className="shrink-0 text-right">
                  <p className="font-display text-[15px] leading-none font-semibold text-ink">
                    {formatNaira(product.price)}
                  </p>
                  <p className="mt-0.5 text-[10px] text-ink-mute">{product.unit}</p>
                </div>
              </div>
              <div className="mt-auto flex items-center gap-1.5 pt-2">
                {product.specs.slice(0, 2).map((spec) => (
                  <span
                    key={spec.label}
                    className="rounded-full bg-canvas px-2 py-0.5 text-[9.5px] font-medium text-ink-mute"
                  >
                    {spec.value}
                  </span>
                ))}
                <span className="ml-auto inline-flex items-center gap-1 text-[10.5px] font-semibold text-ink-mute transition group-hover:text-[var(--accent-ink)]">
                  View
                  <ArrowUpRight className="size-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

function ServiceRow({ shop, product }) {
  return (
    <div className="group flex flex-col gap-4 rounded-2xl border border-line bg-white p-4 shadow-soft transition hover:border-[var(--accent)]/25 hover:shadow-lift sm:flex-row sm:items-center">
      <SmartImage
        src={product.image}
        alt={product.name}
        icon={Sparkles}
        className="aspect-[16/10] w-full shrink-0 rounded-xl sm:size-24 sm:aspect-square"
        imgClassName="group-hover:scale-105"
      />
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="text-[15px] font-semibold text-ink">{product.name}</h3>
          {product.badge && (
            <span
              className="rounded-full px-2 py-0.5 text-[9.5px] font-semibold"
              style={{ background: shop.accentSoft, color: shop.accentInk }}
            >
              {product.badge}
            </span>
          )}
          <span className="rounded-full border border-line px-2 py-0.5 text-[9.5px] font-medium text-ink-mute">
            {product.section}
          </span>
        </div>
        <p className="mt-1 text-[12px] leading-relaxed text-ink-soft">{product.description}</p>
        <div className="mt-2.5 flex flex-wrap gap-1.5">
          {product.specs.slice(0, 3).map((spec) => (
            <span key={spec.label} className="rounded-full bg-canvas px-2 py-0.5 text-[10px] text-ink-mute">
              {spec.label}: <span className="font-medium text-ink-soft">{spec.value}</span>
            </span>
          ))}
        </div>
      </div>
      <div className="flex shrink-0 items-center justify-between gap-3 border-t border-line-soft pt-3 sm:w-40 sm:flex-col sm:items-end sm:border-0 sm:pt-0">
        <div className="sm:text-right">
          <p className="font-display text-lg leading-none font-semibold text-ink">{formatNaira(product.price)}</p>
          <p className="mt-0.5 text-[10px] text-ink-mute">{product.unit}</p>
        </div>
        <Link
          to={`/shops/${shop.slug}/product/${product.id}`}
          className="inline-flex h-9 items-center gap-1.5 rounded-full px-3.5 text-[11.5px] font-semibold text-white transition hover:brightness-110"
          style={{ background: shop.accent }}
        >
          View service <ArrowUpRight className="size-3" />
        </Link>
      </div>
    </div>
  );
}

export default function ShopStorefront() {
  const { shopSlug } = useParams();
  const shop = shopBySlug(shopSlug);
  const category = shop ? getCategory(shop.category) : null;
  const [query, setQuery] = useState('');
  const [activeSection, setActiveSection] = useState('All');
  const [contactOpen, setContactOpen] = useState(false);
  const notifyDemo = useDemoNotice();
  const { toast } = useToast();

  usePageMeta(
    shop ? `${shop.name} · ${category?.name}` : 'Storefront',
    shop ? `${shop.tagline} — a demo storefront inside BDPA Shopping Complex, Benin City.` : undefined,
  );

  const filteredProducts = useMemo(() => {
    if (!shop) return [];
    const q = query.trim().toLowerCase();
    return shop.products.filter((product) => {
      const sectionMatch = activeSection === 'All' || product.section === activeSection;
      const textMatch =
        !q ||
        [product.name, product.description, product.section, ...(product.tags || [])]
          .join(' ')
          .toLowerCase()
          .includes(q);
      return sectionMatch && textMatch;
    });
  }, [shop, query, activeSection]);

  if (!shop) return <ShopNotFound />;

  const relatedShops = shops.filter((item) => item.category === shop.category && item.slug !== shop.slug);

  const share = async () => {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title: `${shop.name} · BDPA Market`, url });
        return;
      }
      await navigator.clipboard.writeText(url);
      toast({ title: 'Link copied', description: 'Shareable demo storefront link copied to clipboard.' });
    } catch {
      notifyDemo('Sharing is not available in this browser, but the page is fully navigable.');
    }
  };

  const grouped = shop.sections
    .map((section) => ({
      section,
      products: filteredProducts.filter((product) => product.section === section),
    }))
    .filter((group) => group.products.length > 0);

  return (
    <div
      className="pb-4"
      style={{
        '--accent': shop.accent,
        '--accent-soft': shop.accentSoft,
        '--accent-ink': shop.accentInk,
      }}
    >
      <div className="mx-auto max-w-7xl px-4 pt-5 sm:px-6">
        <nav className="flex flex-wrap items-center gap-1.5 text-[11.5px] text-ink-mute" aria-label="Breadcrumb">
          <Link to="/" className="transition hover:text-ink">Home</Link>
          <ChevronRight className="size-3" />
          <Link to="/shops" className="transition hover:text-ink">Shops</Link>
          <ChevronRight className="size-3" />
          <Link to={`/shops?category=${shop.category}`} className="transition hover:text-ink">
            {category?.name}
          </Link>
          <ChevronRight className="size-3" />
          <span className="font-medium text-ink">{shop.name}</span>
        </nav>

        {/* Cover */}
        <div className="relative mt-4 overflow-hidden rounded-[1.75rem] bg-canvas-deep shadow-soft">
          <SmartImage
            src={shop.cover}
            alt={`${shop.name} cover`}
            icon={Store}
            fallbackLabel={shop.name}
            eager
            className="h-[200px] w-full sm:h-[280px] lg:h-[330px]"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent" />
          <div className="absolute inset-x-4 top-4 flex flex-wrap items-center justify-between gap-2 sm:inset-x-5 sm:top-5">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1.5 text-[10.5px] font-semibold text-white ring-1 ring-white/25 backdrop-blur">
              <BadgeCheck className="size-3.5" /> Demo storefront · sample data
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1.5 text-[10.5px] font-medium text-white ring-1 ring-white/25 backdrop-blur">
              <MapPin className="size-3" /> {shop.location.block} · {shop.location.unit}
            </span>
          </div>
          <div className="absolute inset-x-4 bottom-4 flex flex-wrap items-end justify-between gap-3 sm:inset-x-5 sm:bottom-5">
            <div>
              <p className="text-[10px] font-semibold tracking-[0.16em] text-white/65 uppercase">
                {category?.name}
              </p>
              <p className="mt-0.5 hidden font-display text-lg font-semibold text-white sm:block">
                {shop.tagline}
              </p>
            </div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/90 px-2.5 py-1 text-[10.5px] font-semibold text-ink backdrop-blur">
              <span
                className={cn(
                  'size-1.5 rounded-full',
                  shop.openStatus.startsWith('Open') ? 'bg-emerald-500' : 'bg-amber-500',
                )}
              />
              {shop.openStatus} · {shop.openNote}
            </span>
          </div>
        </div>

        {/* Identity card */}
        <div className="relative z-10 -mt-10 rounded-[1.5rem] border border-line bg-white p-4 shadow-lift sm:p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-start gap-3.5 sm:gap-4">
              <ShopLogo shop={shop} size="xl" className="ring-4 ring-canvas sm:size-20" />
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="font-display text-[clamp(1.6rem,3.4vw,2.3rem)] leading-tight font-semibold text-ink">
                    {shop.name}
                  </h1>
                  <span
                    className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[9.5px] font-semibold"
                    style={{ background: shop.accentSoft, color: shop.accentInk }}
                  >
                    <BadgeCheck className="size-3" /> Demo verified
                  </span>
                </div>
                <p className="mt-1 max-w-xl text-[13px] leading-relaxed text-ink-soft">
                  {shop.tagline}. {shop.description}
                </p>
                <div className="mt-2.5 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[11.5px] text-ink-soft">
                  <Rating value={shop.rating} count={shop.reviews} />
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin className="size-3.5 text-ink-mute" /> {shop.location.block}, {shop.location.unit}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Clock className="size-3.5 text-ink-mute" /> {shop.openStatus.toLowerCase()} · {shop.openNote}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <ShoppingBag className="size-3.5 text-ink-mute" />
                    {pluralise(shop.products.length, shop.kind === 'service' ? 'service' : 'listing')}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex shrink-0 flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => setContactOpen(true)}
                className="inline-flex h-11 items-center gap-2 rounded-full px-5 text-[13px] font-semibold text-white shadow-[0_12px_26px_-16px_var(--accent)] transition hover:brightness-110"
                style={{ background: shop.accent }}
              >
                <MessageCircle className="size-4" /> WhatsApp shop
              </button>
              <Button variant="outline" size="md" Icon={Phone} onClick={() => setContactOpen(true)}>
                Contact
              </Button>
              <Button variant="ghost" size="icon" onClick={share} aria-label="Share this storefront">
                <Share2 className="size-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="mx-auto mt-8 grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-10">
        <div className="min-w-0">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="flex items-center gap-2 text-[10.5px] font-semibold tracking-[0.18em] uppercase" style={{ color: shop.accent }}>
                <span className="h-px w-6" style={{ background: shop.accent }} />
                {shop.kind === 'service' ? 'What we do' : 'Browse the shop'}
              </p>
              <h2 className="mt-2 font-display text-[clamp(1.6rem,3vw,2.2rem)] leading-tight font-semibold">
                {shop.productLabel}
              </h2>
              <p className="mt-1.5 text-[12.5px] text-ink-soft">
                {shop.kind === 'service'
                  ? 'Prices are sample starting rates — confirm the final quote with the shop.'
                  : 'Sample prices in Naira. Tap any item to see full details and specifications.'}
              </p>
            </div>
          </div>

          <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-ink-mute" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={`Search ${shop.name}…`}
                aria-label={`Search ${shop.name}`}
                className="h-10 w-full rounded-full border border-line bg-white pr-4 pl-10 text-[12.5px] text-ink outline-none transition focus:border-[var(--accent)]/50"
              />
            </div>
            <div className="no-scrollbar -mx-1 flex gap-1.5 overflow-x-auto px-1">
              {['All', ...shop.sections].map((section) => (
                <button
                  key={section}
                  type="button"
                  onClick={() => setActiveSection(section)}
                  className={cn(
                    'shrink-0 rounded-full border px-3 py-1.5 text-[11.5px] font-medium whitespace-nowrap transition',
                    activeSection === section
                      ? 'border-transparent text-white'
                      : 'border-line bg-white text-ink-soft hover:text-ink',
                  )}
                  style={activeSection === section ? { background: shop.accent } : undefined}
                >
                  {section}
                </button>
              ))}
            </div>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="mt-6 rounded-2xl border border-dashed border-line bg-white/60 px-6 py-14 text-center">
              <span className="mx-auto grid size-12 place-items-center rounded-full bg-canvas-deep text-ink-mute">
                <Search className="size-5" />
              </span>
              <p className="mt-3 text-sm font-semibold text-ink">Nothing matches that yet</p>
              <p className="mx-auto mt-1 max-w-xs text-[12.5px] text-ink-soft">
                Try another word or show everything {shop.name} has listed.
              </p>
              <Button
                variant="outline"
                size="sm"
                className="mt-4"
                onClick={() => {
                  setQuery('');
                  setActiveSection('All');
                }}
              >
                Reset filters
              </Button>
            </div>
          ) : shop.layout === 'service' ? (
            <div className="mt-5 grid gap-3">
              {filteredProducts.map((product) => (
                <ServiceRow key={product.id} shop={shop} product={product} />
              ))}
            </div>
          ) : shop.layout === 'menu' ? (
            <div className="mt-6 space-y-7">
              {grouped.map((group) => (
                <MenuSection key={group.section} shop={shop} section={group.section} products={group.products} />
              ))}
            </div>
          ) : (
            <div className="mt-5 grid grid-cols-2 gap-3.5 sm:gap-4 lg:grid-cols-3">
              {filteredProducts.map((product) => (
                <ProductTile key={product.id} shop={shop} product={product} />
              ))}
            </div>
          )}

          {/* About */}
          <Reveal className="mt-12">
            <div className="rounded-[1.5rem] border border-line bg-white p-5 shadow-soft sm:p-6">
              <div className="flex items-center gap-2 text-[10.5px] font-semibold tracking-[0.16em] uppercase" style={{ color: shop.accent }}>
                <Store className="size-3.5" /> About this shop
              </div>
              <h2 className="mt-2 font-display text-2xl font-semibold">The story behind the counter</h2>
              <p className="mt-3 max-w-2xl text-[13.5px] leading-relaxed text-ink-soft">{shop.story}</p>
              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                {shop.highlights.map((highlight) => (
                  <div key={highlight} className="flex items-start gap-2.5 rounded-xl bg-canvas px-3.5 py-3">
                    <Sparkles className="mt-0.5 size-3.5 shrink-0" style={{ color: shop.accent }} />
                    <p className="text-[11.5px] leading-relaxed font-medium text-ink-soft">{highlight}</p>
                  </div>
                ))}
              </div>
              <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-line-soft pt-4 text-[11.5px] text-ink-soft">
                <span>Established <span className="font-semibold text-ink">{shop.established}</span></span>
                <span>Typical range <span className="font-semibold text-ink">{shop.priceRange}</span></span>
                <span className="inline-flex items-center gap-1.5">
                  <BadgeCheck className="size-3.5" style={{ color: shop.accent }} /> Sample demonstration data
                </span>
              </div>
            </div>
          </Reveal>

          {relatedShops.length > 0 && (
            <Reveal className="mt-10">
              <div className="flex items-center justify-between gap-3">
                <h2 className="font-display text-xl font-semibold">More in {category?.name}</h2>
                <Link
                  to={`/shops?category=${shop.category}`}
                  className="inline-flex items-center gap-1 text-[11.5px] font-semibold text-ink-mute transition hover:text-ink"
                >
                  View all <ArrowRight className="size-3.5" />
                </Link>
              </div>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                {relatedShops.map((item) => (
                  <Link
                    key={item.slug}
                    to={`/shops/${item.slug}`}
                    className="group flex items-center gap-3 rounded-2xl border border-line bg-white p-3 shadow-soft transition hover:-translate-y-0.5 hover:shadow-lift"
                  >
                    <ShopLogo shop={item} size="md" />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[13px] font-semibold text-ink">{item.name}</p>
                      <p className="truncate text-[11px] text-ink-soft">{item.tagline}</p>
                    </div>
                    <ArrowUpRight className="size-4 shrink-0 text-ink-mute transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </Link>
                ))}
              </div>
            </Reveal>
          )}
        </div>

        {/* Sidebar */}
        <aside className="space-y-4 lg:sticky lg:top-24 lg:max-h-[calc(100dvh-7rem)] lg:overflow-y-auto lg:pb-4">
          <div className="rounded-[1.5rem] border border-line bg-white p-5 shadow-soft">
            <p className="text-[10.5px] font-semibold tracking-[0.16em] text-ink-mute uppercase">Find this shop</p>
            <div className="mt-3 flex items-start gap-3 rounded-xl bg-canvas p-3">
              <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-white text-ink-soft ring-1 ring-line">
                <MapPin className="size-4" />
              </span>
              <div className="min-w-0">
                <p className="text-[12.5px] font-semibold text-ink">
                  {shop.location.block} · {shop.location.unit}
                </p>
                <p className="mt-0.5 text-[11.5px] leading-relaxed text-ink-soft">{shop.location.detail}</p>
                <p className="mt-1 text-[10.5px] text-ink-mute">BDPA Shopping Complex, Benin City</p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="mt-3 w-full"
              Icon={Navigation}
              onClick={() =>
                notifyDemo('Directions would open a map in a live build. The complex address is sample data.')
              }
            >
              Get directions
            </Button>
          </div>

          <div className="rounded-[1.5rem] border border-line bg-white p-5 shadow-soft">
            <div className="flex items-center justify-between gap-2">
              <p className="text-[10.5px] font-semibold tracking-[0.16em] text-ink-mute uppercase">Opening hours</p>
              <span
                className={cn(
                  'inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[9.5px] font-semibold',
                  shop.openStatus.startsWith('Open')
                    ? 'bg-emerald-50 text-emerald-700'
                    : 'bg-amber-50 text-amber-700',
                )}
              >
                <span className={cn('size-1 rounded-full', shop.openStatus.startsWith('Open') ? 'bg-emerald-500' : 'bg-amber-500')} />
                {shop.openStatus}
              </span>
            </div>
            <dl className="mt-3 space-y-2">
              {shop.hours.map((entry) => (
                <div key={entry.days} className="flex items-baseline justify-between gap-3 text-[12px]">
                  <dt className="text-ink-soft">{entry.days}</dt>
                  <dd className={cn('font-medium', entry.time === 'Closed' ? 'text-ink-mute' : 'text-ink')}>
                    {entry.time}
                  </dd>
                </div>
              ))}
            </dl>
            <p className="mt-3 rounded-lg bg-canvas px-2.5 py-2 text-[10.5px] leading-relaxed text-ink-mute">
              Today · {shop.todayHours}. Hours are sample data and may differ in reality.
            </p>
          </div>

          <div className="rounded-[1.5rem] border border-line bg-white p-5 shadow-soft">
            <p className="text-[10.5px] font-semibold tracking-[0.16em] text-ink-mute uppercase">Contact</p>
            <p className="mt-2 font-display text-lg font-semibold text-ink">{shop.phone}</p>
            <p className="text-[10.5px] text-ink-mute">Sample line · not monitored</p>
            <div className="mt-3 grid gap-2">
              <button
                type="button"
                onClick={() => setContactOpen(true)}
                className="inline-flex h-10 items-center justify-center gap-2 rounded-full text-[12.5px] font-semibold text-white transition hover:brightness-110"
                style={{ background: shop.accent }}
              >
                <MessageCircle className="size-4" /> Message on WhatsApp
              </button>
              <Button variant="outline" size="sm" Icon={Phone} onClick={() => setContactOpen(true)}>
                Call the shop
              </Button>
            </div>
            <div className="mt-3 rounded-lg border border-amber-200/70 bg-amber-50/70 px-2.5 py-2 text-[10.5px] leading-relaxed text-amber-900">
              WhatsApp and calls are demonstration interactions. No message is delivered.
            </div>
          </div>

          <div className="rounded-[1.5rem] border border-line bg-canvas-deep/60 p-5">
            <div className="flex items-center gap-2">
              <Badge tone="brand" className="text-[9.5px] tracking-wide uppercase">Demo</Badge>
              <p className="text-[11.5px] font-semibold text-ink">You are viewing a sample storefront</p>
            </div>
            <p className="mt-2 text-[11px] leading-relaxed text-ink-soft">
              {site.disclaimer.split('. ')[0]}.
            </p>
            <Link
              to="/about"
              className="mt-2 inline-flex items-center gap-1 text-[11px] font-semibold text-brand hover:text-brand-dark"
            >
              About the platform <ArrowRight className="size-3" />
            </Link>
          </div>
        </aside>
      </div>

      {relatedShops.length === 0 && (
        <div className="mx-auto max-w-7xl px-4 pb-4 sm:px-6">
          <div className="mt-10 rounded-2xl border border-line bg-white p-5 text-center">
            <p className="text-[12px] text-ink-soft">
              This is the only demo shop in {category?.name}. Explore{' '}
              <Link to="/shops" className="font-semibold text-brand">all shops in the complex</Link>.
            </p>
          </div>
        </div>
      )}

      <ContactDialog open={contactOpen} onClose={() => setContactOpen(false)} shop={shop} />
    </div>
  );
}
