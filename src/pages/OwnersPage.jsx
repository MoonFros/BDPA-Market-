import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  Banknote,
  CheckCircle2,
  ChevronDown,
  ImagePlus,
  LayoutTemplate,
  MessageSquare,
  MessagesSquare,
  PackagePlus,
  ShieldCheck,
  Sparkles,
  Store,
  TrendingUp,
  UserRound,
} from 'lucide-react';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import ShopLogo from '../components/ui/ShopLogo';
import SmartImage from '../components/ui/SmartImage';
import SectionHeading from '../components/ui/SectionHeading';
import Reveal from '../components/ui/Reveal';
import DashboardPreview from '../components/seller/DashboardPreview';
import { faqs, howItWorks, ownerFeatures, site } from '../data/site';
import { allProducts, shopBySlug, shops } from '../data/shops';
import { formatNaira, pluralise } from '../lib/utils';
import { usePageMeta } from '../hooks/usePageMeta';
import { useToast } from '../context/ToastContext';

const featureIcons = {
  'layout-template': LayoutTemplate,
  'image-plus': ImagePlus,
  'badge-naira': Banknote,
  'package-plus': PackagePlus,
  store: Store,
  'messages-square': MessagesSquare,
};

const demoShop = shopBySlug('glow-beauty-studio');
const demoProduct = demoShop.products[0];

function StorefrontMock() {
  return (
    <div className="relative">
      <div className="overflow-hidden rounded-[1.6rem] border border-line bg-white shadow-float">
        <SmartImage
          src={demoShop.cover}
          alt="Sample storefront cover"
          className="h-28 w-full sm:h-32"
          fallbackLabel="Your storefront"
        />
        <div className="px-4 pb-4">
          <div className="-mt-7 flex items-end justify-between">
            <ShopLogo shop={demoShop} size="lg" className="ring-4 ring-white" />
            <span className="mb-1 inline-flex items-center gap-1 rounded-full bg-brand-soft px-2 py-0.5 text-[9px] font-semibold text-brand-dark">
              <span className="size-1 rounded-full bg-emerald-500" /> Live preview
            </span>
          </div>
          <p className="mt-2.5 font-display text-lg leading-tight font-semibold text-ink">{demoShop.name}</p>
          <p className="mt-0.5 text-[10.5px] leading-relaxed text-ink-soft">{demoShop.tagline}</p>
          <div className="mt-3 grid grid-cols-3 gap-1.5">
            {demoShop.products.slice(0, 3).map((product) => (
              <div key={product.id} className="overflow-hidden rounded-lg border border-line">
                <SmartImage src={product.image} alt={product.name} className="aspect-square w-full" />
                <p className="truncate px-1 py-1 text-[8px] font-semibold text-ink">{formatNaira(product.price)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="animate-float absolute -top-4 -right-2 flex items-center gap-2 rounded-xl border border-line bg-white/95 px-2.5 py-2 shadow-lift backdrop-blur sm:-right-4">
        <span className="grid size-7 place-items-center rounded-lg bg-emerald-50 text-emerald-600">
          <TrendingUp className="size-3.5" />
        </span>
        <div>
          <p className="text-[9px] leading-none font-semibold text-ink">Storefront views</p>
          <p className="mt-0.5 text-[10px] font-bold text-emerald-600">+42 this week</p>
        </div>
      </div>

      <div className="absolute -bottom-5 -left-3 flex items-center gap-2 rounded-xl border border-line bg-white/95 px-2.5 py-2 shadow-lift backdrop-blur sm:-left-5">
        <MessageSquare className="size-3.5 text-brand" />
        <p className="text-[9.5px] font-medium text-ink">
          New enquiry · <span className="text-ink-soft">2 min ago</span>
        </p>
      </div>
    </div>
  );
}

function InterestForm() {
  const [form, setForm] = useState({ name: '', shop: '', email: '' });
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();

  const submit = (event) => {
    event.preventDefault();
    if (!form.name.trim() || !form.shop.trim() || !form.email.trim()) {
      toast({ title: 'Fill in all three fields', description: 'Name, shop and email are required in this demo form.', tone: 'info' });
      return;
    }
    setSubmitted(true);
    toast({
      title: 'Interest recorded (demo)',
      description: 'Nothing was sent or stored. A live version would notify complex management.',
      tone: 'info',
    });
  };

  return (
    <div className="rounded-[1.5rem] border border-line bg-white p-5 shadow-soft sm:p-6" id="interest">
      <div className="flex items-center gap-2">
        <Badge tone="brand" className="text-[9.5px] tracking-wide uppercase">Preview</Badge>
        <span className="text-[10.5px] text-ink-mute">No account created</span>
      </div>
      <h3 className="mt-3 font-display text-2xl font-semibold">Interested in a storefront?</h3>
      <p className="mt-1.5 text-[12.5px] leading-relaxed text-ink-soft">
        Leave your details to show where the real onboarding form would sit. This demonstration does not
        submit anything.
      </p>

      {submitted ? (
        <div className="mt-4 rounded-xl border border-brand/20 bg-brand-mist p-4 text-center">
          <CheckCircle2 className="mx-auto size-6 text-brand" />
          <p className="mt-2 text-[12.5px] font-semibold text-ink">Thank you, {form.name.split(' ')[0]}</p>
          <p className="mt-1 text-[11px] leading-relaxed text-ink-soft">
            In a live build, {form.shop} would be added to the onboarding list and management would reach
            out at {form.email}.
          </p>
          <button
            type="button"
            onClick={() => {
              setSubmitted(false);
              setForm({ name: '', shop: '', email: '' });
            }}
            className="mt-3 text-[10.5px] font-semibold text-brand underline underline-offset-4"
          >
            Reset the form
          </button>
        </div>
      ) : (
        <form onSubmit={submit} className="mt-4 space-y-2.5">
          <div className="grid gap-2.5 sm:grid-cols-2">
            <input
              value={form.name}
              onChange={(event) => setForm({ ...form, name: event.target.value })}
              placeholder="Your name"
              aria-label="Your name"
              className="h-10 rounded-xl border border-line bg-canvas px-3 text-[12.5px] outline-none transition focus:border-brand/40 focus:bg-white"
            />
            <input
              value={form.shop}
              onChange={(event) => setForm({ ...form, shop: event.target.value })}
              placeholder="Shop name"
              aria-label="Shop name"
              className="h-10 rounded-xl border border-line bg-canvas px-3 text-[12.5px] outline-none transition focus:border-brand/40 focus:bg-white"
            />
          </div>
          <input
            value={form.email}
            onChange={(event) => setForm({ ...form, email: event.target.value })}
            placeholder="Email or phone number"
            aria-label="Email or phone number"
            className="h-10 w-full rounded-xl border border-line bg-canvas px-3 text-[12.5px] outline-none transition focus:border-brand/40 focus:bg-white"
          />
          <Button type="submit" className="w-full" Icon={ArrowRight}>
            Register interest (demo)
          </Button>
        </form>
      )}

      <p className="mt-3 flex items-start gap-1.5 text-[10px] leading-relaxed text-ink-mute">
        <ShieldCheck className="mt-0.5 size-3 shrink-0" />
        Sample form only. Details are not transmitted, stored or shared.
      </p>
    </div>
  );
}

function Faq() {
  const [open, setOpen] = useState(0);
  return (
    <div className="divide-y divide-line overflow-hidden rounded-[1.5rem] border border-line bg-white shadow-soft">
      {faqs.map((faq, index) => (
        <div key={faq.q}>
          <button
            type="button"
            onClick={() => setOpen(open === index ? -1 : index)}
            aria-expanded={open === index}
            className="flex w-full items-start justify-between gap-4 px-4 py-4 text-left transition hover:bg-canvas/60 sm:px-5"
          >
            <span className="text-[12.5px] font-semibold text-ink">{faq.q}</span>
            <ChevronDown
              className={`mt-0.5 size-4 shrink-0 text-ink-mute transition-transform ${open === index ? 'rotate-180' : ''}`}
            />
          </button>
          {open === index && (
            <p className="animate-fade-in px-4 pb-4 text-[12px] leading-relaxed text-ink-soft sm:px-5">{faq.a}</p>
          )}
        </div>
      ))}
    </div>
  );
}

export default function OwnersPage() {
  usePageMeta(
    'For shop owners',
    'A seller portal preview for BDPA Shopping Complex: create a storefront, upload products, update prices and receive enquiries.',
  );

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div>
      <section className="relative overflow-hidden">
        <div
          className="pointer-events-none absolute -top-40 -left-32 size-[32rem] rounded-full bg-brand-soft/70 blur-3xl"
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-7xl px-4 pt-6 pb-12 sm:px-6 sm:pt-8 lg:pb-16">
          <nav className="flex items-center gap-2 text-[11.5px] text-ink-mute" aria-label="Breadcrumb">
            <Link to="/" className="inline-flex items-center gap-1.5 transition hover:text-ink">
              <ArrowLeft className="size-3.5" /> Home
            </Link>
            <span>/</span>
            <span className="font-medium text-ink-soft">For shop owners</span>
          </nav>

          <div className="mt-8 grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16">
            <div className="animate-fade-up">
              <div className="flex flex-wrap items-center gap-2">
                <Badge tone="brand" className="px-2.5 py-1 text-[9.5px] tracking-[0.12em] uppercase">
                  Seller portal preview
                </Badge>
                <span className="rounded-full border border-line bg-white px-2.5 py-1 text-[9.5px] font-semibold tracking-wide text-ink-mute uppercase">
                  Coming soon
                </span>
              </div>
              <h1 className="mt-5 font-display text-[clamp(2.3rem,5.2vw,3.8rem)] leading-[0.98] font-semibold">
                Your business deserves to be seen.
              </h1>
              <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-ink-soft">
                Some of the best businesses in BDPA are five metres from the walkway and still invisible to
                the people driving past. A storefront on BDPA Market gives every unit a fair first
                impression — and gives you control of what customers see.
              </p>
              <div className="mt-7 flex flex-wrap gap-2.5">
                <Button size="lg" Icon={LayoutTemplate} onClick={() => scrollTo('dashboard')} IconRight={ArrowRight}>
                  Preview the dashboard
                </Button>
                <Button size="lg" variant="outline" Icon={UserRound} onClick={() => scrollTo('interest')}>
                  Register interest
                </Button>
              </div>
              <ul className="mt-7 grid gap-2.5 sm:grid-cols-2">
                {[
                  'No website or coding needed',
                  'Your own branded storefront',
                  'Update prices in seconds',
                  'Enquiries direct to WhatsApp',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-[12.5px] text-ink-soft">
                    <BadgeCheck className="mt-0.5 size-4 shrink-0 text-brand" /> {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="animate-fade-up pb-4 [animation-delay:120ms]">
              <StorefrontMock />
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-canvas-deep/40">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-8 sm:px-6 lg:grid-cols-4">
          {[
            { value: shops.length, label: 'Storefronts in this demo' },
            { value: allProducts.length, label: 'Sample listings' },
            { value: '12 min', label: 'Typical reply time' },
            { value: '1', label: 'Dashboard to manage it all' },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="font-display text-[1.8rem] leading-none font-semibold text-ink">{stat.value}</p>
              <p className="mt-1.5 text-[11px] leading-snug text-ink-soft">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pt-16 sm:px-6 lg:pt-20">
        <Reveal>
          <SectionHeading
            eyebrow="What you get"
            title="A shop page that works while you serve customers"
            description="Everything a small business needs to look established online, without learning a website builder."
          />
        </Reveal>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {ownerFeatures.map((feature, index) => {
            const Icon = featureIcons[feature.icon] || Sparkles;
            return (
              <Reveal key={feature.title} delay={(index % 3) * 60}>
                <div className="h-full rounded-[1.5rem] border border-line bg-white p-5 shadow-soft transition duration-300 hover:-translate-y-1 hover:border-brand/20 hover:shadow-lift">
                  <span className="grid size-10 place-items-center rounded-xl bg-brand-soft text-brand">
                    <Icon className="size-4.5" strokeWidth={1.8} />
                  </span>
                  <h3 className="mt-3.5 text-[15px] font-semibold">{feature.title}</h3>
                  <p className="mt-1.5 text-[12.5px] leading-relaxed text-ink-soft">{feature.text}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section id="dashboard" className="mx-auto max-w-7xl scroll-mt-24 px-4 pt-16 sm:px-6 lg:pt-20">
        <Reveal>
          <SectionHeading
            eyebrow="Inside the seller portal"
            title="A dashboard built for a busy counter"
            description="Big touch targets, plain language, and the four things you actually do every day: add products, change prices, update your profile and answer enquiries."
            action={
              <span className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-3 py-1.5 text-[10px] font-semibold tracking-wide text-amber-800 uppercase">
                <Sparkles className="size-3" /> Interactive preview
              </span>
            }
          />
        </Reveal>

        <Reveal className="mt-8" delay={60}>
          <DashboardPreview />
        </Reveal>

        <div className="mt-4 grid gap-2.5 sm:grid-cols-3">
          {[
            'Add Product opens a working preview form',
            'Profile edits stay in this browser tab',
            'No login, database or payment exists',
          ].map((note) => (
            <p key={note} className="flex items-start gap-2 rounded-xl border border-line bg-white/70 px-3 py-2.5 text-[10.5px] leading-relaxed text-ink-soft">
              <CheckCircle2 className="mt-0.5 size-3.5 shrink-0 text-brand" /> {note}
            </p>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pt-16 sm:px-6 lg:pt-20">
        <Reveal>
          <SectionHeading eyebrow="Getting started" title="Three steps to a live storefront" />
        </Reveal>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {howItWorks.map((item, index) => (
            <Reveal key={item.step} delay={index * 70}>
              <div className="relative h-full overflow-hidden rounded-[1.5rem] border border-line bg-white p-6 shadow-soft">
                <div className="flex items-center justify-between">
                  <span className="font-display text-[2.4rem] leading-none font-semibold text-brand/15">{item.step}</span>
                  <span className="grid size-8 place-items-center rounded-full bg-canvas-deep text-[10px] font-bold text-ink-soft">
                    {index + 1}/3
                  </span>
                </div>
                <h3 className="mt-3 text-base font-semibold">{item.title}</h3>
                <p className="mt-1.5 text-[12.5px] leading-relaxed text-ink-soft">{item.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pt-16 sm:px-6 lg:pt-20">
        <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:gap-10">
          <Reveal>
            <div>
              <SectionHeading
                eyebrow="Questions"
                title="The practical details"
                description="Straight answers to what shop owners ask first."
              />
              <div className="mt-6">
                <Faq />
              </div>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <div className="space-y-4">
              <InterestForm />
              <div className="rounded-[1.5rem] border border-line bg-brand-deep p-5 text-canvas">
                <div className="flex items-start gap-3">
                  <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-white/10 text-emerald-200 ring-1 ring-white/10">
                    <Store className="size-4" />
                  </span>
                  <div>
                    <p className="text-[12.5px] font-semibold text-white">Already trading in BDPA?</p>
                    <p className="mt-1 text-[11px] leading-relaxed text-white/60">
                      In the real rollout, onboarding starts at the complex management desk — your unit
                      number is your verification.
                    </p>
                    <Link
                      to="/about"
                      className="mt-2.5 inline-flex items-center gap-1 text-[10.5px] font-semibold text-emerald-200 hover:text-white"
                    >
                      Read about the platform <ArrowUpRight className="size-3" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pt-16 sm:px-6 lg:pt-20">
        <Reveal>
          <div className="relative overflow-hidden rounded-[1.75rem] bg-brand-deep px-6 py-10 text-canvas sm:px-9 sm:py-12">
            <div
              className="pointer-events-none absolute inset-0 opacity-20"
              style={{
                backgroundImage:
                  'radial-gradient(circle at 15% 20%, #ffffff 0, transparent 35%), radial-gradient(circle at 90% 80%, #8fd6b4 0, transparent 35%)',
              }}
              aria-hidden="true"
            />
            <div className="relative flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
              <div>
                <p className="text-[10px] font-semibold tracking-[0.18em] text-white/50 uppercase">
                  {pluralise(shops.length, 'demo storefront')} · {site.city}
                </p>
                <h2 className="mt-2 max-w-xl font-display text-[clamp(1.6rem,3.4vw,2.4rem)] leading-tight font-semibold text-white">
                  Let customers find you before they find your unit.
                </h2>
                <p className="mt-2 max-w-lg text-[12.5px] leading-relaxed text-white/60">
                  The seller portal is a proposal, not a live product. Everything you have seen is a
                  frontend demonstration built to start that conversation.
                </p>
              </div>
              <div className="flex shrink-0 flex-wrap gap-2.5">
                <Button variant="white" size="lg" IconRight={ArrowRight} onClick={() => scrollTo('dashboard')}>
                  Revisit the dashboard
                </Button>
                <Button variant="white-outline" size="lg" to="/shops" Icon={Store}>
                  See the shops
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}

