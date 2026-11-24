import { Link, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  ChevronRight,
  Clock,
  Copy,
  MapPin,
  MessageCircle,
  ShoppingBag,
  Sparkles,
  Store,
} from 'lucide-react';
import { useState } from 'react';
import SmartImage from '../components/ui/SmartImage';
import ShopLogo from '../components/ui/ShopLogo';
import Button from '../components/ui/Button';
import SectionHeading from '../components/ui/SectionHeading';
import ContactDialog from '../components/ContactDialog';
import ProductCard from '../components/ui/ProductCard';
import { shopBySlug } from '../data/shops';
import { getCategory } from '../data/site';
import { formatNaira } from '../lib/utils';
import { usePageMeta } from '../hooks/usePageMeta';
import { useToast } from '../context/ToastContext';

export default function ProductDetail() {
  const { shopSlug, productId } = useParams();
  const shop = shopBySlug(shopSlug);
  const product = shop?.products.find((item) => item.id === productId);
  const [contactOpen, setContactOpen] = useState(false);
  const { toast } = useToast();

  usePageMeta(
    product ? `${product.name} · ${shop.name}` : 'Listing',
    product ? `${product.description} Sample listing at ${shop.name}, BDPA Shopping Complex.` : undefined,
  );

  if (!shop || !product) {
    return (
      <div className="mx-auto flex max-w-lg flex-col items-center px-4 py-24 text-center">
        <span className="grid size-14 place-items-center rounded-full bg-canvas-deep text-ink-mute">
          <ShoppingBag className="size-6" />
        </span>
        <h1 className="mt-5 font-display text-3xl font-semibold">Listing not found</h1>
        <p className="mt-2 text-[13.5px] leading-relaxed text-ink-soft">
          This sample listing may have been removed from the demo catalogue.
        </p>
        <div className="mt-6 flex flex-col gap-2 sm:flex-row">
          {shop && <Button to={`/shops/${shop.slug}`} Icon={ArrowLeft}>Back to {shop.name}</Button>}
          <Button to="/shops" variant="outline">All shops</Button>
        </div>
      </div>
    );
  }

  const category = getCategory(shop.category);
  const related = shop.products.filter((item) => item.id !== product.id).slice(0, 4);
  const isService = shop.kind === 'service';

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast({ title: 'Link copied', description: 'You can share this demo listing link.' });
    } catch {
      toast({ title: 'Copy unavailable', description: 'This browser blocked clipboard access.', tone: 'info' });
    }
  };

  return (
    <div
      className="pb-4"
      style={{ '--accent': shop.accent, '--accent-soft': shop.accentSoft, '--accent-ink': shop.accentInk }}
    >
      <div className="mx-auto max-w-7xl px-4 pt-5 sm:px-6">
        <nav className="flex flex-wrap items-center gap-1.5 text-[11.5px] text-ink-mute" aria-label="Breadcrumb">
          <Link to="/" className="transition hover:text-ink">Home</Link>
          <ChevronRight className="size-3" />
          <Link to="/shops" className="transition hover:text-ink">Shops</Link>
          <ChevronRight className="size-3" />
          <Link to={`/shops/${shop.slug}`} className="transition hover:text-ink">{shop.name}</Link>
          <ChevronRight className="size-3" />
          <span className="max-w-[45vw] truncate font-medium text-ink">{product.name}</span>
        </nav>

        <Link
          to={`/shops/${shop.slug}`}
          className="mt-4 inline-flex items-center gap-2 text-[12px] font-semibold text-ink-soft transition hover:text-ink"
        >
          <ArrowLeft className="size-3.5" /> Back to {shop.name}
        </Link>

        <div className="mt-4 grid gap-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-10">
          <div>
            <div className="relative overflow-hidden rounded-[1.75rem] border border-line bg-white shadow-soft">
              <SmartImage
                src={product.image}
                alt={product.name}
                icon={ShoppingBag}
                eager
                className="aspect-[4/3] w-full"
                fallbackLabel="Sample product photo"
              />
              <div className="absolute inset-x-4 top-4 flex items-start justify-between gap-2">
                {product.badge ? (
                  <span className="rounded-full bg-white/92 px-2.5 py-1 text-[10.5px] font-semibold text-ink shadow-sm backdrop-blur">
                    {product.badge}
                  </span>
                ) : <span />}
                <span className="rounded-full bg-ink/55 px-2.5 py-1 text-[9.5px] font-semibold tracking-wide text-white uppercase backdrop-blur">
                  Sample listing
                </span>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-2.5">
              {[
                { icon: isService ? Sparkles : ShoppingBag, label: shop.productLabel, value: `${shop.products.length} listed` },
                { icon: Clock, label: 'Availability', value: isService ? 'By booking' : 'In shop today' },
                { icon: MapPin, label: 'Unit', value: `${shop.location.block} · ${shop.location.unit}` },
              ].map((item) => (
                <div key={item.label} className="rounded-xl border border-line bg-white px-3 py-2.5">
                  <item.icon className="size-3.5 text-ink-mute" />
                  <p className="mt-1.5 text-[9.5px] font-semibold tracking-wide text-ink-mute uppercase">
                    {item.label}
                  </p>
                  <p className="text-[11.5px] font-medium text-ink">{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:pt-1">
            <Link
              to={`/shops/${shop.slug}`}
              className="inline-flex items-center gap-2.5 rounded-full border border-line bg-white py-1.5 pr-3.5 pl-1.5 shadow-soft transition hover:border-[var(--accent)]/30"
            >
              <ShopLogo shop={shop} size="sm" ring={false} />
              <span className="text-[11.5px] font-semibold text-ink">{shop.name}</span>
              <span className="h-3 w-px bg-line" />
              <span className="text-[10.5px] font-medium text-ink-mute">{category?.name}</span>
              <ArrowRight className="size-3 text-ink-mute" />
            </Link>

            <h1 className="mt-4 font-display text-[clamp(1.9rem,4vw,2.8rem)] leading-[1.05] font-semibold">
              {product.name}
            </h1>

            <div className="mt-4 flex flex-wrap items-end gap-3">
              <p className="font-display text-[2rem] leading-none font-semibold text-ink">
                {formatNaira(product.price)}
              </p>
              <span className="pb-1 text-[12px] font-medium text-ink-mute">{product.unit}</span>
            </div>
            <p className="mt-1 text-[10.5px] font-medium tracking-wide text-ink-mute uppercase">
              Sample price · confirm with the shop
            </p>

            <p className="mt-5 text-[14px] leading-relaxed text-ink-soft">{product.description}</p>

            {product.tags?.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-1.5">
                {product.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full px-2.5 py-1 text-[10.5px] font-medium"
                    style={{ background: shop.accentSoft, color: shop.accentInk }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            <div className="mt-6 rounded-2xl border border-line bg-white p-4 shadow-soft">
              <div className="flex items-center justify-between gap-2">
                <p className="text-[10.5px] font-semibold tracking-[0.16em] text-ink-mute uppercase">
                  {isService ? 'Service details' : 'Specifications'}
                </p>
                <BadgeCheck className="size-3.5 text-ink-mute" />
              </div>
              <dl className="mt-3 grid gap-x-6 gap-y-0 sm:grid-cols-2">
                {product.specs.map((spec) => (
                  <div
                    key={spec.label}
                    className="flex items-baseline justify-between gap-3 border-b border-line-soft py-2 last:border-0"
                  >
                    <dt className="text-[11.5px] text-ink-mute">{spec.label}</dt>
                    <dd className="text-right text-[11.5px] font-semibold text-ink">{spec.value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="mt-5 grid gap-2.5 sm:grid-cols-2">
              <button
                type="button"
                onClick={() => setContactOpen(true)}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full text-[13.5px] font-semibold text-white shadow-[0_16px_30px_-18px_var(--accent)] transition hover:brightness-110"
                style={{ background: shop.accent }}
              >
                <MessageCircle className="size-4" />
                {isService ? 'Enquire about this service' : 'Contact the shop'}
              </button>
              <Button
                to={`/shops/${shop.slug}`}
                variant="outline"
                size="lg"
                className="h-12"
                Icon={Store}
              >
                Back to shop
              </Button>
            </div>

            <div className="mt-3 flex items-center justify-between gap-3">
              <p className="text-[10.5px] leading-relaxed text-ink-mute">
                Demo interaction · no order or payment is processed.
              </p>
              <button
                type="button"
                onClick={copyLink}
                className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-ink-soft transition hover:text-ink"
              >
                <Copy className="size-3.5" /> Copy link
              </button>
            </div>

            <div className="mt-5 flex items-start gap-3 rounded-xl bg-canvas-deep/70 p-3.5">
              <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-white text-ink-soft ring-1 ring-line">
                <MapPin className="size-4" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[11.5px] font-semibold text-ink">
                  Collect from {shop.location.block}, {shop.location.unit}
                </p>
                <p className="mt-0.5 text-[10.5px] leading-relaxed text-ink-soft">
                  {shop.location.detail} · {shop.openStatus.toLowerCase()}, {shop.openNote.toLowerCase()}
                </p>
              </div>
              <Link
                to={`/shops/${shop.slug}`}
                className="inline-flex shrink-0 items-center gap-1 text-[10.5px] font-semibold text-ink-soft hover:text-ink"
              >
                Storefront <ArrowUpRight className="size-3" />
              </Link>
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <section className="mt-16 border-t border-line pt-10">
            <SectionHeading
              eyebrow={`More from ${shop.name}`}
              title={isService ? 'Other services in this shop' : 'You might also like'}
              action={
                <Button to={`/shops/${shop.slug}`} variant="outline" size="sm" IconRight={ArrowRight}>
                  All {shop.productLabel.toLowerCase()}
                </Button>
              }
            />
            <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
              {related.map((item) => (
                <ProductCard key={item.id} product={{ ...item, shopSlug: shop.slug, shopName: shop.name, shopAccent: shop.accent }} showShop={false} />
              ))}
            </div>
          </section>
        )}
      </div>

      <ContactDialog open={contactOpen} onClose={() => setContactOpen(false)} shop={shop} product={product} />
    </div>
  );
}
