import { Link } from 'react-router-dom';
import { ArrowUpRight, MapPin, Store } from 'lucide-react';
import SmartImage from './SmartImage';
import ShopLogo from './ShopLogo';
import Rating from './Rating';
import { getCategory } from '../../data/site';
import { cn } from '../../lib/utils';

function ProductThumbs({ shop }) {
  const thumbs = shop.products.slice(0, 3);
  return (
    <div className="flex items-center gap-2">
      <div className="flex -space-x-2.5">
        {thumbs.map((product) => (
          <SmartImage
            key={product.id}
            src={product.image}
            alt={product.name}
            icon={Store}
            compact
            className="size-9 rounded-full ring-2 ring-white"
          />
        ))}
      </div>
      <span className="text-[11px] font-medium text-ink-mute">
        {shop.products.length} {shop.productLabel.toLowerCase()}
      </span>
    </div>
  );
}

export function ShopCard({ shop }) {
  const category = getCategory(shop.category);

  return (
    <article
      className="group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-line bg-white shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-brand/20 hover:shadow-lift"
      style={{ '--accent': shop.accent, '--accent-soft': shop.accentSoft, '--accent-ink': shop.accentInk }}
    >
      <Link to={`/shops/${shop.slug}`} className="relative block focus-visible:outline-offset-[-4px]" aria-label={`Visit ${shop.name}`}>
        <SmartImage
          src={shop.cover}
          alt={`${shop.name} storefront`}
          icon={Store}
          fallbackLabel={shop.name}
          className="aspect-[16/9] w-full"
          imgClassName="group-hover:scale-[1.045]"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/45 via-ink/5 to-transparent" />
        <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-semibold text-ink shadow-sm backdrop-blur">
          <span className="size-1.5 rounded-full" style={{ background: shop.accent }} />
          {category?.name}
        </span>
        {shop.openStatus.startsWith('Open') && (
          <span className="absolute top-4 right-4 inline-flex items-center gap-1.5 rounded-full bg-ink/60 px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur">
            <span className="size-1.5 rounded-full bg-emerald-300" />
            Open now
          </span>
        )}
        <div className="absolute bottom-0 left-5 translate-y-1/2">
          <ShopLogo shop={shop} size="lg" className="ring-4 ring-white" />
        </div>
      </Link>

      <div className="flex flex-1 flex-col px-5 pt-11 pb-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-[22px] leading-tight font-semibold text-ink">
            <Link
              to={`/shops/${shop.slug}`}
              className="transition-colors hover:text-[var(--accent-ink)] focus-visible:outline-offset-4"
            >
              {shop.name}
            </Link>
          </h3>
          <Rating value={shop.rating} count={shop.reviews} compact className="mt-1.5 shrink-0" />
        </div>

        <p className="mt-1 text-[13.5px] leading-relaxed text-ink-soft line-clamp-2-safe">{shop.tagline}</p>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {shop.highlights.slice(0, 2).map((highlight) => (
            <span
              key={highlight}
              className="rounded-full bg-canvas-deep px-2.5 py-1 text-[11px] font-medium text-ink-soft"
            >
              {highlight}
            </span>
          ))}
        </div>

        <div className="mt-auto pt-5">
          <div className="flex items-center justify-between gap-3 border-t border-line-soft pt-4">
            <ProductThumbs shop={shop} />
            <span
              className="inline-flex items-center gap-1.5 text-[12px] font-semibold transition-colors"
              style={{ color: shop.accentInk }}
            >
              View shop
              <ArrowUpRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </div>
          <p className="mt-3 inline-flex items-center gap-1.5 text-[11.5px] text-ink-mute">
            <MapPin className="size-3.5" strokeWidth={1.8} />
            {shop.location.block} · {shop.location.unit}
          </p>
        </div>
      </div>
    </article>
  );
}

export function ShopRow({ shop }) {
  const category = getCategory(shop.category);
  return (
    <article
      className="group flex flex-col gap-4 rounded-[1.5rem] border border-line bg-white p-4 shadow-soft transition-all duration-300 hover:border-brand/20 hover:shadow-lift sm:flex-row sm:items-center sm:gap-5 sm:p-5"
      style={{ '--accent': shop.accent, '--accent-soft': shop.accentSoft, '--accent-ink': shop.accentInk }}
    >
      <Link
        to={`/shops/${shop.slug}`}
        className="relative block shrink-0 overflow-hidden rounded-2xl sm:w-56"
        aria-label={`Visit ${shop.name}`}
      >
        <SmartImage
          src={shop.cover}
          alt={`${shop.name} storefront`}
          icon={Store}
          className="aspect-[16/10] w-full sm:aspect-[4/3]"
          imgClassName="group-hover:scale-[1.05]"
        />
      </Link>

      <div className="flex min-w-0 flex-1 flex-col gap-2">
        <div className="flex flex-wrap items-center gap-2">
          <span
            className="rounded-full px-2.5 py-1 text-[11px] font-semibold"
            style={{ background: shop.accentSoft, color: shop.accentInk }}
          >
            {category?.name}
          </span>
          <span className="inline-flex items-center gap-1 text-[11px] font-medium text-ink-mute">
            <MapPin className="size-3" /> {shop.location.block} · {shop.location.unit}
          </span>
          <Rating value={shop.rating} count={shop.reviews} className="ml-auto" />
        </div>
        <h3 className="text-xl font-semibold text-ink">
          <Link to={`/shops/${shop.slug}`} className="hover:text-[var(--accent-ink)]">
            {shop.name}
          </Link>
        </h3>
        <p className="text-[13px] leading-relaxed text-ink-soft line-clamp-2-safe">{shop.description}</p>
        <div className="mt-1 flex flex-wrap items-center gap-2">
          {shop.sections.slice(0, 3).map((section) => (
            <span key={section} className="rounded-full border border-line px-2.5 py-1 text-[11px] text-ink-mute">
              {section}
            </span>
          ))}
        </div>
      </div>

      <div className="flex shrink-0 items-center sm:flex-col sm:items-end sm:gap-3">
        <div className="hidden text-right sm:block">
          <p className="text-[11px] tracking-wide text-ink-mute uppercase">{shop.productLabel}</p>
          <p className="font-display text-xl text-ink">{shop.products.length}</p>
        </div>
        <Link
          to={`/shops/${shop.slug}`}
          className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-full px-5 text-sm font-semibold text-white transition hover:brightness-110 sm:w-auto"
          style={{ background: shop.accent }}
        >
          View shop
          <ArrowUpRight className="size-4" />
        </Link>
      </div>
    </article>
  );
}

export default ShopCard;
