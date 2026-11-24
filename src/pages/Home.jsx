import { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  ArrowUpRight,
  Compass,
  HeartHandshake,
  MapPin,
  MessageCircle,
  ScanSearch,
  Search,
  Sparkles,
  Star,
  Store,
} from 'lucide-react';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import SmartImage from '../components/ui/SmartImage';
import ShopCard from '../components/ui/ShopCard';
import ProductCard from '../components/ui/ProductCard';
import CategoryCard from '../components/ui/CategoryCard';
import SectionHeading from '../components/ui/SectionHeading';
import Reveal from '../components/ui/Reveal';
import ShopLogo from '../components/ui/ShopLogo';
import { benefits, categories, site, stats } from '../data/site';
import { featuredShopSlugs, getFeaturedProducts, shopBySlug, shops } from '../data/shops';
import { formatNaira, pluralise } from '../lib/utils';
import { usePageMeta } from '../hooks/usePageMeta';

const benefitIcons = {
  compass: Compass,
  'scan-search': ScanSearch,
  sparkles: Sparkles,
  'message-circle': MessageCircle,
  'heart-handshake': HeartHandshake,
};

const quickSearches = ['Jollof rice', 'iPhone', 'Dry cleaning', 'Ankara'];

function HeroSearch() {
  const [value, setValue] = useState('');
  const navigate = useNavigate();

  const submit = (event) => {
    event.preventDefault();
    navigate(value.trim() ? `/shops?q=${encodeURIComponent(value.trim())}` : '/shops');
  };

  return (
    <div className="w-full max-w-xl">
      <form
        onSubmit={submit}
        className="flex items-center gap-2 rounded-full border border-line bg-white p-1.5 pl-4 shadow-soft transition focus-within:border-brand/35 focus-within:shadow-lift sm:pl-5"
      >
        <Search className="size-[18px] shrink-0 text-ink-mute" strokeWidth={2} />
        <label htmlFor="hero-search" className="sr-only">
          What are you looking for today?
        </label>
        <input
          id="hero-search"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          placeholder="What are you looking for today?"
          className="h-11 min-w-0 flex-1 bg-transparent text-[14px] text-ink outline-none placeholder:text-ink-mute sm:text-[15px]"
        />
        <div className="hidden shrink-0 sm:block">
          <Button type="submit" size="md" className="px-5" IconRight={ArrowRight}>
            Search
          </Button>
        </div>
        <Button type="submit" size="icon" className="shrink-0 sm:hidden" aria-label="Search">
          <Search className="size-4" />
        </Button>
      </form>

      <div className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1.5 pl-1 text-[11.5px] text-ink-mute">
        <span className="font-medium">Try:</span>
        {quickSearches.map((term) => (
          <Link
            key={term}
            to={`/shops?q=${encodeURIComponent(term)}`}
            className="rounded-full border border-line/80 bg-white/60 px-2.5 py-1 font-medium text-ink-soft transition hover:border-brand/30 hover:bg-white hover:text-brand-dark"
          >
            {term}
          </Link>
        ))}
      </div>
    </div>
  );
}

function Hero() {
  const jollof = useMemo(
    () => shopBySlug('mama-eso-kitchen').products.find((product) => product.id === 'party-jollof'),
    [],
  );
  const avatarShops = shops.slice(0, 4);

  return (
    <section className="relative overflow-hidden">
      <div
        className="pointer-events-none absolute -top-40 -right-32 size-[34rem] rounded-full bg-brand-soft/70 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-24 -left-40 size-[26rem] rounded-full bg-sand/60 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-4 pt-8 pb-4 sm:px-6 lg:pt-14">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.02fr)_minmax(0,1fr)] lg:gap-12 xl:gap-16">
          <div className="animate-fade-up">
            <span className="inline-flex items-center gap-2 rounded-full border border-line bg-white/75 py-1.5 pr-3.5 pl-2 text-[11px] font-semibold text-ink-soft shadow-[0_1px_2px_rgba(21,33,27,0.03)]">
              <span className="grid size-5 place-items-center rounded-full bg-brand-soft text-brand">
                <MapPin className="size-3" strokeWidth={2.2} />
              </span>
              BDPA Shopping Complex · Benin City
              <span className="rounded-full bg-canvas-deep px-1.5 py-0.5 text-[9px] font-bold tracking-wide text-ink-mute uppercase">
                Demo
              </span>
            </span>

            <h1 className="mt-5 text-[clamp(2.55rem,6.2vw,4.35rem)] leading-[0.98] font-semibold tracking-[-0.02em]">
              Everything you need.
              <br />
              All in{' '}
              <span className="relative whitespace-nowrap text-brand">
                <em className="font-display italic">one place.</em>
                <svg
                  className="absolute -bottom-2 left-0 h-2.5 w-full text-brand/25"
                  viewBox="0 0 200 10"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <path d="M2 7c40-5 96-6 196-3" stroke="currentColor" strokeWidth="4" fill="none" strokeLinecap="round" />
                </svg>
              </span>
            </h1>

            <p className="mt-6 max-w-lg text-[15px] leading-relaxed text-ink-soft sm:text-base">
              {site.intro}
            </p>

            <div className="mt-7">
              <HeroSearch />
            </div>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Button to="/shops" size="lg" IconRight={ArrowRight}>
                Explore Shops
              </Button>
              <Button to="/categories" size="lg" variant="outline" Icon={Compass}>
                Browse Categories
              </Button>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3">
              <div className="flex items-center">
                {avatarShops.map((shop, index) => (
                  <span
                    key={shop.slug}
                    className="grid size-9 place-items-center rounded-full border-2 border-canvas font-display text-[11px] font-semibold"
                    style={{
                      background: shop.accentSoft,
                      color: shop.accentInk,
                      marginLeft: index === 0 ? 0 : -10,
                      zIndex: avatarShops.length - index,
                    }}
                    title={shop.name}
                    aria-hidden="true"
                  >
                    {shop.monogram}
                  </span>
                ))}
                <span className="ml-3 text-[12px] leading-tight text-ink-soft">
                  <span className="block font-semibold text-ink">{shops.length} demo storefronts</span>
                  under one roof, in one complex
                </span>
              </div>
              <span className="h-6 w-px bg-line max-sm:hidden" />
              <span className="inline-flex items-center gap-1.5 text-[12px] font-medium text-ink-soft">
                <Star className="size-3.5 fill-gold text-gold" />
                Sample ratings from 4.6 – 4.9
              </span>
            </div>
          </div>

          <div className="animate-fade-up relative [animation-delay:120ms]">
            <div className="relative">
              <div className="absolute -inset-3 -z-10 rounded-[2.6rem] border border-line/70 bg-white/40" aria-hidden="true" />
              <div className="relative overflow-hidden rounded-[2rem] bg-canvas-deep shadow-float">
                <SmartImage
                  src="/img/hero-complex.webp"
                  alt="The arcade inside BDPA Shopping Complex"
                  icon={Store}
                  eager
                  className="aspect-[4/3] w-full sm:aspect-[5/4] lg:aspect-[4/3.4]"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/5 to-transparent" />
                <div className="absolute inset-x-4 bottom-4 hidden items-end justify-between gap-3 sm:inset-x-5 sm:bottom-5 sm:flex">
                  <div>
                    <p className="text-[10px] font-semibold tracking-[0.16em] text-white/70 uppercase">
                      BDPA Shopping Complex
                    </p>
                    <p className="mt-1 font-display text-lg leading-tight font-semibold text-white sm:text-xl">
                      One address. Every shop.
                    </p>
                  </div>
                  <span className="hidden shrink-0 items-center gap-1.5 rounded-full bg-white/15 px-2.5 py-1 text-[10.5px] font-medium text-white ring-1 ring-white/25 backdrop-blur sm:inline-flex">
                    <span className="size-1.5 rounded-full bg-emerald-300" />
                    Open across the day
                  </span>
                </div>
              </div>

              <Link
                to="/shops/technest-electronics"
                className="animate-float absolute -top-4 -left-3 hidden items-center gap-2.5 rounded-2xl border border-line bg-white/95 p-3 pr-4 shadow-lift backdrop-blur transition hover:-translate-y-0.5 sm:flex lg:-left-6"
              >
                <span className="grid size-9 place-items-center rounded-xl bg-brand-soft text-brand">
                  <Store className="size-4" strokeWidth={2} />
                </span>
                <span>
                  <span className="block text-[10px] font-semibold tracking-wide text-ink-mute uppercase">
                    Inside the complex
                  </span>
                  <span className="block text-[12.5px] font-semibold text-ink">8 shops · 6 categories</span>
                </span>
              </Link>

              <Link
                to="/shops/mama-eso-kitchen/product/party-jollof"
                className="group absolute -right-1 -bottom-4 flex w-[15rem] items-center gap-3 sm:-right-5 sm:-bottom-6 sm:w-[15.5rem] lg:-right-7 sm:-right-5 sm:-bottom-6 sm:w-[15.5rem] lg:-right-7 rounded-2xl border border-line bg-white/95 p-2.5 shadow-lift backdrop-blur transition hover:-translate-y-0.5 sm:-right-5 lg:-right-7"
              >
                <SmartImage
                  src={jollof.image}
                  alt={jollof.name}
                  className="size-14 shrink-0 rounded-xl"
                  imgClassName="group-hover:scale-105"
                />
                <span className="min-w-0 flex-1">
                  <span className="line-clamp-2 block text-[12.5px] leading-tight font-semibold text-ink">{jollof.name}</span>
                  <span className="mt-0.5 flex items-center justify-between gap-2">
                    <span className="truncate text-[11px] text-ink-soft">Mama Eso Kitchen</span>
                    <span className="font-display text-[13px] font-semibold text-ink">
                      {formatNaira(jollof.price)}
                    </span>
                  </span>
                </span>
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-y-6 rounded-[1.5rem] border border-line bg-white/55 px-5 py-5 backdrop-blur sm:mt-16 sm:grid-cols-4 sm:divide-x sm:divide-line">
          {stats.map((stat) => (
            <div key={stat.label} className="px-1 sm:px-5 sm:first:pl-1">
              <p className="font-display text-2xl leading-none font-semibold text-ink sm:text-[1.75rem]">
                {stat.value}
              </p>
              <p className="mt-1.5 text-[11px] font-medium tracking-wide text-ink-soft">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CategoriesSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 pt-20 sm:px-6 lg:pt-24">
      <Reveal>
        <SectionHeading
          eyebrow="Browse by category"
          title="Start with what you need"
          description="Six everyday categories, every shop inside the complex organised around them."
          action={
            <Button to="/categories" variant="outline" size="md" IconRight={ArrowRight}>
              All categories
            </Button>
          }
        />
      </Reveal>
      <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:mt-10 lg:grid-cols-6">
        {categories.map((category, index) => (
          <Reveal key={category.id} delay={index * 55}>
            <CategoryCard category={category} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function FeaturedShops() {
  const featured = featuredShopSlugs.map((slug) => shopBySlug(slug)).filter(Boolean);

  return (
    <section className="mx-auto max-w-7xl px-4 pt-20 sm:px-6 lg:pt-24">
      <Reveal>
        <SectionHeading
          eyebrow="Inside the complex"
          title="Eight shops. Eight personalities."
          description="From a family kitchen to a phone counter — each storefront keeps its own colours, story and way of doing business."
          action={
            <Button to="/shops" variant="outline" IconRight={ArrowRight}>
              Explore all shops
            </Button>
          }
        />
      </Reveal>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:mt-10 lg:gap-5 xl:grid-cols-3">
        {featured.map((shop, index) => (
          <Reveal key={shop.slug} delay={(index % 3) * 70} className="h-full">
            <ShopCard shop={shop} />
          </Reveal>
        ))}

        <Reveal delay={70} className="h-full">
          <Link
            to="/owners"
            className="group flex h-full min-h-[320px] flex-col justify-between overflow-hidden rounded-[1.75rem] border border-dashed border-brand/30 bg-gradient-to-br from-brand-mist via-white to-sand/60 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand/50 hover:shadow-lift"
          >
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1.5 text-[10.5px] font-semibold tracking-wide text-brand-dark uppercase ring-1 ring-brand/15">
                <Sparkles className="size-3.5" /> Your shop here
              </span>
              <h3 className="mt-5 font-display text-[1.65rem] leading-tight font-semibold text-ink">
                This space could be your storefront.
              </h3>
              <p className="mt-2.5 max-w-sm text-[13px] leading-relaxed text-ink-soft">
                Upload your products, set your prices and let customers in the complex find you first. See how
                the seller portal would work.
              </p>
            </div>
            <div className="mt-6">
              <span className="inline-flex items-center gap-2 rounded-full bg-brand px-4 py-2.5 text-[12.5px] font-semibold text-white shadow-[0_12px_26px_-16px_rgba(14,107,79,0.9)] transition group-hover:bg-brand-dark">
                Preview the seller portal
                <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
              <p className="mt-3 text-[10.5px] font-medium tracking-wide text-ink-mute uppercase">
                Concept preview · no account required
              </p>
            </div>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

function FeaturedProducts() {
  const products = getFeaturedProducts();

  return (
    <section className="mt-20 border-y border-line bg-canvas-deep/35 py-16 sm:mt-24 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <SectionHeading
            eyebrow="On the shelves this week"
            title="A little of everything"
            description="Sample listings from across the complex — prices in Naira, photographs from the shops, no prices hidden until checkout."
            action={
              <div className="flex items-center gap-2 text-[11.5px] text-ink-mute">
                <span className="size-1.5 rounded-full bg-brand" />
                {products.length} featured listings
              </div>
            }
          />
        </Reveal>

        <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-x-5 md:grid-cols-3 lg:mt-10 lg:grid-cols-4">
          {products.map((product, index) => (
            <Reveal key={`${product.shopSlug}-${product.id}`} delay={(index % 4) * 60}>
              <ProductCard product={product} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhySection() {
  return (
    <section className="mx-auto max-w-7xl px-4 pt-20 sm:px-6 lg:pt-24">
      <Reveal>
        <div className="relative overflow-hidden rounded-[2rem] bg-brand-deep px-5 py-10 text-canvas sm:px-8 sm:py-12 lg:px-12 lg:py-14">
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.14]"
            style={{
              backgroundImage:
                'radial-gradient(circle at 20% 20%, #ffffff 0, transparent 42%), radial-gradient(circle at 85% 75%, #8fd6b4 0, transparent 40%)',
            }}
            aria-hidden="true"
          />
          <div className="relative grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
            <div>
              <p className="flex items-center gap-2 text-[10.5px] font-semibold tracking-[0.18em] text-white/55 uppercase">
                <span className="h-px w-6 bg-white/30" /> Why shop at BDPA
              </p>
              <h2 className="mt-4 max-w-lg font-display text-[clamp(1.8rem,3.6vw,2.8rem)] leading-[1.05] font-semibold text-white">
                One complex. Far fewer wasted trips.
              </h2>
              <p className="mt-4 max-w-xl text-[14px] leading-relaxed text-white/65">
                Walking every block to compare prices is tiring. BDPA Market puts the whole complex in one
                place so you can decide before you leave the house.
              </p>

              <div className="mt-8 grid gap-x-8 gap-y-6 sm:grid-cols-2">
                {benefits.map((benefit) => {
                  const Icon = benefitIcons[benefit.icon] || Sparkles;
                  return (
                    <div key={benefit.title} className="flex gap-3.5">
                      <span className="mt-0.5 grid size-9 shrink-0 place-items-center rounded-xl bg-white/10 text-emerald-200 ring-1 ring-white/10">
                        <Icon className="size-4" strokeWidth={1.9} />
                      </span>
                      <div>
                        <h3 className="font-sans text-[13.5px] font-semibold text-white">{benefit.title}</h3>
                        <p className="mt-1 text-[12px] leading-relaxed text-white/55">{benefit.text}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="relative">
              <div className="overflow-hidden rounded-[1.6rem] ring-1 ring-white/10">
                <SmartImage
                  src="/img/shops/shop-mama-eso.webp"
                  alt="A warm restaurant interior inside the complex"
                  className="aspect-[4/5] w-full"
                  fallbackLabel="Complex life"
                />
              </div>
              <div className="absolute -bottom-5 -left-4 max-w-[15rem] rounded-2xl border border-white/10 bg-white/95 p-3.5 text-ink shadow-float backdrop-blur sm:-left-6">
                <div className="flex items-center gap-2">
                  <ShopLogo shop={shopBySlug('mama-eso-kitchen')} size="sm" />
                  <div>
                    <p className="text-[11.5px] leading-tight font-semibold">Local businesses</p>
                    <p className="text-[10px] text-ink-soft">Real people, one walk away</p>
                  </div>
                </div>
                <p className="mt-2.5 text-[10.5px] leading-relaxed text-ink-soft">
                  Every listing belongs to a unit inside the complex — not a warehouse across the country.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function FinalCta() {
  return (
    <section className="mx-auto max-w-7xl px-4 pt-20 sm:px-6 lg:pt-24">
      <Reveal>
        <div className="relative overflow-hidden rounded-[2rem] border border-line bg-white px-5 py-12 text-center shadow-soft sm:px-8 sm:py-16">
          <div className="grain pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />
          <div
            className="pointer-events-none absolute -top-24 left-1/2 size-80 -translate-x-1/2 rounded-full bg-brand-soft/70 blur-3xl"
            aria-hidden="true"
          />
          <div className="relative mx-auto max-w-2xl">
            <Badge tone="brand" className="mb-5 px-3 py-1.5 text-[10.5px] tracking-[0.1em] uppercase">
              BDPA · Benin City
            </Badge>
            <h2 className="font-display text-[clamp(1.9rem,4.2vw,3rem)] leading-[1.05] font-semibold">
              Your next favourite shop might be closer than you think.
            </h2>
            <p className="mx-auto mt-4 max-w-md text-[14px] leading-relaxed text-ink-soft">
              Explore each storefront, see what is in stock today, and message the shop before you make the
              trip.
            </p>
            <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button to="/shops" size="lg" IconRight={ArrowRight} className="w-full sm:w-auto">
                Explore the complex
              </Button>
              <Button to="/owners" size="lg" variant="outline" Icon={Store} className="w-full sm:w-auto">
                I own a shop here
              </Button>
            </div>
            <div className="mt-7 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[11px] text-ink-mute">
              <span>{pluralise(shops.length, 'demo storefront')}</span>
              <span className="size-1 rounded-full bg-line" />
              <span>{pluralise(categories.length, 'category', 'categories')}</span>
              <span className="size-1 rounded-full bg-line" />
              <span>40 sample listings</span>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

export default function Home() {
  usePageMeta(
    'Everything you need, all in one place',
    'Discover shops, explore products and connect with businesses at BDPA Shopping Complex, Benin City.',
  );

  return (
    <>
      <Hero />
      <CategoriesSection />
      <FeaturedShops />
      <FeaturedProducts />
      <WhySection />
      <FinalCta />
    </>
  );
}
