import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  Compass,
  Eye,
  HeartHandshake,
  MapPin,
  ShieldCheck,
  Sparkles,
  Store,
  Users,
} from 'lucide-react';
import Button from '../components/ui/Button';
import Reveal from '../components/ui/Reveal';
import SmartImage from '../components/ui/SmartImage';
import SectionHeading from '../components/ui/SectionHeading';
import { categories, howItWorks, site, stats } from '../data/site';
import { shops, allProducts } from '../data/shops';
import { usePageMeta } from '../hooks/usePageMeta';

const pillars = [
  {
    icon: Eye,
    title: 'Visibility for every business',
    text: 'A shop tucked at the back of Block D deserves the same first impression as the one beside the entrance. A shared platform levels that field.',
  },
  {
    icon: Compass,
    title: 'Convenience for customers',
    text: 'Prices, photos, opening hours and contact details in one place — so a trip to the complex starts with a decision, not a search.',
  },
  {
    icon: Sparkles,
    title: 'A digital presence, simply',
    text: 'No website, no designer, no monthly hosting bill. Each shop gets a branded page managed from one familiar dashboard.',
  },
];

const truths = [
  'This entire website is a frontend demonstration — there is no database, login or payment system behind it.',
  'All eight businesses, their owners, unit numbers, phone lines, prices and statistics are fictional sample content.',
  'WhatsApp, call, directions and seller dashboard actions are previews that clearly state they are not connected.',
  'Photography and storefront identities are original sample artwork created to show how the platform could look.',
];

export default function AboutPage() {
  usePageMeta(
    'About the platform',
    'Why BDPA Market exists: visibility for businesses in BDPA Shopping Complex and convenience for customers.',
  );

  return (
    <div>
      <section className="relative overflow-hidden">
        <div
          className="pointer-events-none absolute -top-32 right-0 size-[28rem] rounded-full bg-brand-soft/60 blur-3xl"
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-7xl px-4 pt-6 pb-12 sm:px-6 sm:pt-8 lg:pb-16">
          <nav className="flex items-center gap-2 text-[11.5px] text-ink-mute" aria-label="Breadcrumb">
            <Link to="/" className="inline-flex items-center gap-1.5 transition hover:text-ink">
              <ArrowLeft className="size-3.5" /> Home
            </Link>
            <span>/</span>
            <span className="font-medium text-ink-soft">About</span>
          </nav>

          <div className="mt-8 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-14">
            <div className="animate-fade-up">
              <p className="flex items-center gap-2 text-[10.5px] font-semibold tracking-[0.18em] text-brand uppercase">
                <span className="h-px w-6 bg-brand/40" /> About BDPA Market
              </p>
              <h1 className="mt-4 font-display text-[clamp(2.2rem,5vw,3.6rem)] leading-[1] font-semibold">
                A digital roof over the whole complex.
              </h1>
              <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-ink-soft">
                BDPA Shopping Complex is already a small economy — kitchens, phone counters, tailors,
                grocers and cleaners working a few metres apart. What it has never had is one place online
                that shows all of them together.
              </p>
              <p className="mt-4 max-w-xl text-[14px] leading-relaxed text-ink-soft">
                This concept puts every participating shop under one address, in its own colours, with its
                own catalogue. Customers get clarity. Shop owners get discovery. The complex gets a
                directory that works after closing time.
              </p>
              <div className="mt-6 flex flex-wrap gap-2.5">
                <Button to="/shops" IconRight={ArrowRight}>Explore the shops</Button>
                <Button to="/owners" variant="outline" Icon={Store}>For shop owners</Button>
              </div>
            </div>

            <div className="animate-fade-up relative [animation-delay:100ms]">
              <div className="overflow-hidden rounded-[1.75rem] border border-line bg-white p-2 shadow-lift">
                <SmartImage
                  src="/img/hero-complex.webp"
                  alt="The covered arcade inside BDPA Shopping Complex"
                  className="aspect-[4/3] w-full rounded-[1.4rem]"
                  eager
                />
              </div>
              <div className="absolute -bottom-5 left-4 flex items-center gap-3 rounded-2xl border border-line bg-white/95 px-3.5 py-3 shadow-lift backdrop-blur sm:left-6">
                <span className="grid size-9 place-items-center rounded-xl bg-brand-soft text-brand">
                  <MapPin className="size-4" />
                </span>
                <div>
                  <p className="text-[11.5px] font-semibold text-ink">{site.complex}</p>
                  <p className="text-[10.5px] text-ink-soft">{site.city}, {site.state}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-canvas-deep/40">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-8 sm:px-6 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label}>
              <p className="font-display text-[1.9rem] leading-none font-semibold text-ink">{stat.value}</p>
              <p className="mt-1.5 text-[11px] font-medium text-ink-soft">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pt-16 sm:px-6 lg:pt-20">
        <Reveal>
          <SectionHeading
            eyebrow="Why it exists"
            title="Built around three simple goals"
            description="Not another ecommerce marketplace — a directory and storefront layer for one real place."
          />
        </Reveal>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {pillars.map((pillar, index) => (
            <Reveal key={pillar.title} delay={index * 70}>
              <div className="h-full rounded-[1.5rem] border border-line bg-white p-6 shadow-soft transition hover:-translate-y-1 hover:shadow-lift">
                <span className="grid size-11 place-items-center rounded-2xl bg-brand-soft text-brand">
                  <pillar.icon className="size-5" strokeWidth={1.8} />
                </span>
                <h3 className="mt-4 text-lg font-semibold">{pillar.title}</h3>
                <p className="mt-2 text-[13px] leading-relaxed text-ink-soft">{pillar.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pt-16 sm:px-6 lg:pt-20">
        <div className="grid gap-4 lg:grid-cols-2">
          <Reveal>
            <div className="flex h-full flex-col rounded-[1.5rem] border border-line bg-white p-6 shadow-soft sm:p-8">
              <span className="grid size-11 place-items-center rounded-2xl bg-brand-soft text-brand">
                <Users className="size-5" strokeWidth={1.8} />
              </span>
              <h3 className="mt-4 font-display text-2xl font-semibold">If you are shopping</h3>
              <p className="mt-2 text-[13.5px] leading-relaxed text-ink-soft">
                Search once, compare across shops, then call or visit. No account, no cart, no waiting for a
                delivery rider — just a clearer picture of what is already a short trip away.
              </p>
              <ul className="mt-4 space-y-2">
                {['See real photos and prices', 'Compare shops within a category', 'Contact the shop before you travel'].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-[12.5px] text-ink-soft">
                    <BadgeCheck className="mt-0.5 size-4 shrink-0 text-brand" /> {item}
                  </li>
                ))}
              </ul>
              <div className="mt-auto pt-6">
                <Button to="/shops" variant="soft" size="sm" IconRight={ArrowRight}>
                  Find a shop
                </Button>
              </div>
            </div>
          </Reveal>

          <Reveal delay={70}>
            <div className="flex h-full flex-col rounded-[1.5rem] border border-line bg-brand-deep p-6 text-canvas shadow-soft sm:p-8">
              <span className="grid size-11 place-items-center rounded-2xl bg-white/10 text-emerald-200 ring-1 ring-white/10">
                <Store className="size-5" strokeWidth={1.8} />
              </span>
              <h3 className="mt-4 font-display text-2xl font-semibold text-white">If you own a shop</h3>
              <p className="mt-2 text-[13.5px] leading-relaxed text-white/65">
                You get a storefront that looks like you, managed from a dashboard you can learn in an
                afternoon. Products, prices, photos and hours — all in your hands.
              </p>
              <ul className="mt-4 space-y-2">
                {['A branded page under BDPA Market', 'Update prices whenever the market moves', 'Enquiries straight to WhatsApp'].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-[12.5px] text-white/70">
                    <BadgeCheck className="mt-0.5 size-4 shrink-0 text-emerald-300" /> {item}
                  </li>
                ))}
              </ul>
              <div className="mt-auto pt-6">
                <Button to="/owners" variant="white" size="sm" IconRight={ArrowRight}>
                  See the seller preview
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pt-16 sm:px-6 lg:pt-20">
        <Reveal>
          <SectionHeading
            eyebrow="How it could work"
            title="From a unit number to a storefront"
            description="A simple onboarding path, repeated for every shop in the complex."
          />
        </Reveal>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {howItWorks.map((item, index) => (
            <Reveal key={item.step} delay={index * 70}>
              <div className="relative h-full overflow-hidden rounded-[1.5rem] border border-line bg-white p-6 shadow-soft">
                <span className="font-display text-[2.6rem] leading-none font-semibold text-brand/15">{item.step}</span>
                <h3 className="mt-3 text-base font-semibold">{item.title}</h3>
                <p className="mt-1.5 text-[12.5px] leading-relaxed text-ink-soft">{item.text}</p>
                <span className="absolute -right-6 -bottom-6 size-20 rounded-full bg-brand-soft/60" aria-hidden="true" />
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pt-16 sm:px-6 lg:pt-20">
        <Reveal>
          <div className="grid gap-6 rounded-[1.75rem] border border-line bg-white p-6 shadow-soft sm:p-8 lg:grid-cols-[1fr_1.1fr] lg:gap-10 lg:p-10">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-canvas-deep px-3 py-1.5 text-[10px] font-semibold tracking-wide text-ink-soft uppercase">
                <ShieldCheck className="size-3.5" /> Demo transparency
              </span>
              <h2 className="mt-4 font-display text-3xl leading-tight font-semibold">What is real here</h2>
              <p className="mt-3 text-[13.5px] leading-relaxed text-ink-soft">
                This project was built to show a concept to complex management and shop owners. Nothing on
                it represents a real tenant or a live transaction, and that is stated wherever the
                distinction matters.
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {categories.slice(0, 4).map((category) => (
                  <Link
                    key={category.id}
                    to={`/shops?category=${category.id}`}
                    className="inline-flex items-center gap-1.5 rounded-full border border-line px-3 py-1.5 text-[11px] font-medium text-ink-soft transition hover:border-brand/30 hover:text-brand-dark"
                  >
                    {category.name} <ArrowUpRight className="size-3" />
                  </Link>
                ))}
              </div>
            </div>
            <ul className="grid gap-2.5">
              {truths.map((truth) => (
                <li key={truth} className="flex items-start gap-2.5 rounded-xl bg-canvas px-3.5 py-3 text-[12px] leading-relaxed text-ink-soft">
                  <ShieldCheck className="mt-0.5 size-4 shrink-0 text-brand" />
                  {truth}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </section>

      <section className="mx-auto max-w-7xl px-4 pt-16 sm:px-6 lg:pt-20">
        <Reveal>
          <div className="flex flex-col items-start justify-between gap-5 rounded-[1.75rem] bg-brand-deep px-6 py-8 text-canvas sm:px-9 sm:py-10 lg:flex-row lg:items-center">
            <div className="flex items-start gap-4">
              <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-white/10 text-emerald-200 ring-1 ring-white/10">
                <HeartHandshake className="size-5" />
              </span>
              <div>
                <h2 className="font-display text-2xl leading-tight font-semibold text-white sm:text-3xl">
                  {shops.length} shops, {allProducts.length} listings, one community.
                </h2>
                <p className="mt-1.5 max-w-lg text-[12.5px] leading-relaxed text-white/60">
                  A sample of what the whole complex could look like online. Explore a storefront and see
                  how each business keeps its own identity.
                </p>
              </div>
            </div>
            <Button to="/shops" variant="white" size="lg" IconRight={ArrowRight} className="shrink-0">
              Explore the shops
            </Button>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
