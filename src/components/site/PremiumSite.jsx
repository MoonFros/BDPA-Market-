import { useState } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  CalendarCheck,
  ChefHat,
  Clock,
  Flame,
  MapPin,
  Phone,
  Sparkles,
  Star,
  UtensilsCrossed,
} from 'lucide-react';
import Button from '../ui/Button';
import Reveal from '../ui/Reveal';
import SectionHeading from '../ui/SectionHeading';
import SmartImage from '../ui/SmartImage';
import SiteHeader from './SiteHeader';
import SiteFooter from './SiteFooter';
import { ContactForm, ReservationForm } from './Forms';
import { ContactLines, DemoBand, DemoNote, HoursList, MapCard } from './SiteParts';
import { DishDialog, FeaturedDishes, MenuSection } from './Menu';
import Gallery from './Gallery';
import BasketDrawer from './BasketDrawer';
import { dishes, getDish } from '../../data/menu';
import { demoDisclaimer, images, philosophy, restaurant, story } from '../../data/restaurant';
import { formatNaira, scrollToId } from '../../lib/utils';

function Hero({ onOpenDish }) {
  const signature = getDish('jollof-grilled-chicken');

  return (
    <section id="top" className="relative isolate overflow-hidden bg-ink">
      <div className="absolute inset-0">
        <SmartImage
          src={images.hero}
          alt="The Savora dining room at evening service"
          eager
          className="h-full w-full"
          imgClassName="scale-[1.02]"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/25" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/60 via-transparent to-transparent" />
      <div className="grain absolute inset-0" aria-hidden="true" />

      <div className="relative mx-auto flex min-h-[calc(100svh-104px)] max-w-7xl flex-col justify-end px-4 pt-20 pb-8 sm:min-h-[560px] sm:px-6 sm:pb-12 lg:min-h-[660px]">
        <div className="max-w-2xl text-cream">
          <span className="anim-rise inline-flex items-center gap-2 rounded-full border border-cream/25 bg-cream/10 px-3 py-1.5 text-[9.5px] font-bold tracking-[0.18em] uppercase backdrop-blur">
            <span className="size-1.5 rounded-full bg-terracotta" />
            Contemporary Nigerian kitchen
            <span className="hidden sm:inline">· Benin City</span>
          </span>
          <h1 className="anim-rise mt-4 text-[clamp(2.6rem,7.4vw,5.1rem)] leading-[0.94] font-semibold text-cream [animation-delay:80ms]">
            An Experience
            <br />
            Worth <span className="text-[#E9B99F]">Savouring.</span>
          </h1>
          <p className="anim-rise mt-5 max-w-lg text-[14.5px] leading-relaxed text-cream/75 [animation-delay:160ms] sm:text-base">
            From carefully crafted classics to exciting new flavours, discover something special at
            Savora.
          </p>
          <div className="anim-rise mt-6 flex flex-wrap gap-2.5 [animation-delay:240ms]">
            <Button size="lg" onClick={() => scrollToId('menu')}>
              Explore Our Menu <ArrowRight className="size-4" />
            </Button>
            <Button size="lg" variant="outlineLight" onClick={() => scrollToId('reserve')}>
              <CalendarCheck className="size-4" /> Reserve a Table
            </Button>
          </div>
        </div>

        <div className="mt-9 flex flex-wrap items-center gap-x-5 gap-y-2.5 border-t border-cream/15 pt-4 text-[11px] text-cream/65">
          <span className="inline-flex items-center gap-1.5">
            <Star className="size-3.5 fill-gold text-gold" strokeWidth={0} />
            <span className="font-semibold text-cream">{restaurant.rating}</span> · {restaurant.reviews} sample reviews
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Clock className="size-3.5" /> Open today · 10:00 – 22:00
          </span>
          <span className="hidden items-center gap-1.5 sm:inline-flex">
            <UtensilsCrossed className="size-3.5" /> {dishes.length} dishes on the menu
          </span>
          <span className="inline-flex items-center gap-1.5">
            <MapPin className="size-3.5" /> GRA, Benin City
          </span>
        </div>
      </div>

      <button
        type="button"
        onClick={() => onOpenDish(signature)}
        className="group absolute right-6 bottom-14 hidden w-72 items-center gap-3 rounded-2xl border border-cream/20 bg-cream/95 p-2.5 text-left shadow-float backdrop-blur transition hover:-translate-y-1 xl:flex"
      >
        <SmartImage src={signature.image} alt={signature.name} className="size-14 shrink-0 rounded-xl" />
        <span className="min-w-0 flex-1">
          <span className="block text-[8.5px] font-bold tracking-[0.16em] text-ink-mute uppercase">
            Today’s signature
          </span>
          <span className="mt-0.5 line-clamp-2 block font-display text-[13px] leading-snug font-semibold text-ink">
            {signature.name}
          </span>
          <span className="mt-0.5 flex items-center justify-between gap-2">
            <span className="text-[11px] font-semibold text-terracotta">{formatNaira(signature.price)}</span>
            <ArrowUpRight className="size-3.5 text-ink-mute transition group-hover:text-terracotta" />
          </span>
        </span>
      </button>
    </section>
  );
}

function ValuesBand() {
  return (
    <div className="border-y border-olive-deep/40 bg-olive text-cream">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-x-6 gap-y-2 px-4 py-3 text-[9px] font-bold tracking-[0.22em] uppercase sm:px-6 sm:text-[10px]">
        <span>Charcoal grill</span>
        <span className="text-cream/60">Seasonal produce</span>
        <span>Small-batch sauces</span>
        <span className="text-cream/60">18 dishes</span>
        <span>Benin City</span>
      </div>
    </div>
  );
}

function GrillStory() {
  return (
    <section className="relative overflow-hidden bg-cream">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:py-20">
        <div className="grid items-center gap-9 lg:grid-cols-2 lg:gap-14">
          <Reveal>
            <div className="relative">
              <SmartImage
                src={images.chef}
                alt="A chef finishing a plate at the pass"
                className="aspect-[4/3] rounded-[1.6rem] shadow-soft sm:aspect-[5/4]"
              />
              <div className="absolute -bottom-4 -right-2 flex items-center gap-2 rounded-2xl border border-line bg-paper px-3 py-2 shadow-lift sm:-right-4">
                <span className="grid size-8 place-items-center rounded-full bg-terracotta-soft text-terracotta">
                  <Flame className="size-4" />
                </span>
                <div>
                  <p className="text-[8.5px] font-bold tracking-[0.14em] text-ink-mute uppercase">
                    Grill lit at
                  </p>
                  <p className="text-[12px] font-semibold">10:00 every morning</p>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={70}>
            <SectionHeading
              eyebrow="From the grill"
              title="Charcoal, patience and a little smoke."
              intro="Most of what leaves this kitchen passes over fire at some point — the chicken, the fish, the plantain, even the peppers for the jollof."
            />
            <ul className="mt-5 space-y-3">
              {[
                ['Marinated overnight', 'Ginger, garlic, paprika and scotch bonnet — nothing rushed.'],
                ['Grilled to order', 'Cooked when you order it, never held under a lamp.'],
                ['Finished at the pass', 'Pepper glaze, lime and herbs, added in the last thirty seconds.'],
              ].map(([title, copy], index) => (
                <li key={title} className="flex gap-3">
                  <span className="rule-number mt-0.5 text-terracotta">0{index + 1}</span>
                  <div>
                    <p className="text-[13px] font-semibold">{title}</p>
                    <p className="text-[12px] leading-relaxed text-ink-soft">{copy}</p>
                  </div>
                </li>
              ))}
            </ul>
            <Button variant="dark" size="md" className="mt-6" onClick={() => scrollToId('menu')}>
              See grills & BBQ <ArrowRight className="size-4" />
            </Button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="border-y border-line bg-cream-deep/60">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:py-20">
        <div className="grid items-start gap-9 lg:grid-cols-[1fr_0.95fr] lg:gap-14">
          <Reveal>
            <div className="relative pb-12 sm:pb-16">
              <SmartImage
                src={images.interior}
                alt="The Savora dining room"
                className="aspect-[4/3] rounded-[1.6rem] shadow-soft"
              />
              <div className="absolute -right-1 bottom-0 hidden w-36 sm:block sm:w-44">
                <SmartImage
                  src={images.ambience}
                  alt="Warm light over the terrace tables"
                  className="aspect-[4/3] rounded-2xl border-4 border-cream-deep shadow-lift"
                />
              </div>
              <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-cream/95 px-3 py-1.5 text-[9px] font-bold tracking-[0.14em] text-ink uppercase shadow-soft">
                <BadgeCheck className="size-3 text-terracotta" /> Est. {restaurant.established}
              </span>
            </div>
          </Reveal>

          <Reveal delay={80}>
            <SectionHeading eyebrow={story.eyebrow} title="A dining room built around the table." />
            <div className="mt-4 space-y-3 text-[13.5px] leading-relaxed text-ink-soft">
              {story.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 20)}>{paragraph}</p>
              ))}
            </div>

            <div className="mt-6 space-y-4 border-t border-line pt-5">
              {philosophy.map((item) => (
                <div key={item.number} className="flex gap-3.5">
                  <span className="rule-number mt-0.5 text-terracotta">{item.number}</span>
                  <div>
                    <p className="text-[13px] font-semibold">{item.title}</p>
                    <p className="mt-0.5 text-[12px] leading-relaxed text-ink-soft">{item.copy}</p>
                  </div>
                </div>
              ))}
            </div>

            <p className="mt-5 font-display text-[15px] italic text-ink-soft">
              “Good food, great moments — and a reason to come back.”
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Reservation() {
  return (
    <section id="reserve" className="relative overflow-hidden bg-olive-deep text-cream">
      <div className="grain absolute inset-0" aria-hidden="true" />
      <div
        className="pointer-events-none absolute -top-24 right-0 size-[26rem] rounded-full bg-olive/50 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:py-20">
        <div className="grid gap-9 lg:grid-cols-[0.95fr_1.05fr] lg:gap-14">
          <Reveal>
            <SectionHeading
              tone="light"
              eyebrow="Reservations"
              title="Reserve a table."
              intro="Lunch, dinner, a birthday in the private room — tell us what you need and the team will confirm by phone."
            />

            <div className="mt-6 rounded-2xl border border-cream/15 bg-cream/[0.06] p-4 backdrop-blur-sm">
              <p className="text-[9px] font-bold tracking-[0.18em] text-cream/45 uppercase">
                Opening hours
              </p>
              <HoursList tone="light" className="mt-1.5" />
              <p className="mt-2 text-[10.5px] text-cream/45">{restaurant.openNote}</p>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-[11px] text-cream/60">
              <span className="inline-flex items-center gap-1.5">
                <Phone className="size-3.5" /> {restaurant.phone} <span className="text-cream/35">(demo)</span>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Sparkles className="size-3.5 text-gold" /> Private dining for up to 24
              </span>
            </div>
          </Reveal>

          <Reveal delay={90}>
            <div className="rounded-[1.5rem] border border-cream/20 bg-cream p-5 text-ink shadow-float sm:p-7">
              <div className="mb-4 flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-display text-xl font-semibold sm:text-2xl">Request a table</h3>
                  <p className="mt-1 text-[11.5px] text-ink-soft">
                    Enquiry form — the restaurant confirms availability.
                  </p>
                </div>
                <span className="hidden shrink-0 rounded-full bg-olive-soft px-2.5 py-1 text-[9px] font-bold tracking-[0.12em] text-olive uppercase sm:block">
                  Demo
                </span>
              </div>
              <ReservationForm />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="border-t border-line bg-paper">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:py-20">
        <div className="grid gap-9 lg:grid-cols-2 lg:gap-14">
          <Reveal>
            <SectionHeading
              eyebrow="Visit & contact"
              title="Find us in GRA."
              intro="On Adesuwa Road, a short drive from Ring Road. Parking is behind the building; the terrace entrance is on the left."
            />
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-line bg-cream/50 p-4">
                <ContactLines withIcons />
              </div>
              <div className="rounded-2xl border border-line bg-cream/50 p-4">
                <p className="text-[9px] font-bold tracking-[0.18em] text-ink-mute uppercase">
                  Opening hours
                </p>
                <HoursList className="mt-1" />
              </div>
            </div>
            <MapCard className="mt-4 h-56" />
          </Reveal>

          <Reveal delay={80}>
            <div className="rounded-[1.5rem] border border-line bg-cream/50 p-5 shadow-soft sm:p-7">
              <ContactForm />
            </div>
            <div className="mt-3">
              <DemoNote>{demoDisclaimer}</DemoNote>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export default function PremiumSite() {
  const [selectedDish, setSelectedDish] = useState(null);

  return (
    <div className="anim-fade">
      <div id="site-top" style={{ scrollMarginTop: 0 }} />
      <DemoBand />
      <SiteHeader variant="premium" />
      <main>
        <Hero onOpenDish={setSelectedDish} />
        <ValuesBand />
        <FeaturedDishes onOpenDish={setSelectedDish} />
        <MenuSection onOpenDish={setSelectedDish} />
        <GrillStory />
        <About />
        <Gallery />
        <Reservation />
        <Contact />
      </main>
      <SiteFooter variant="premium" />
      <DishDialog dish={selectedDish} onClose={() => setSelectedDish(null)} />
      <BasketDrawer />
    </div>
  );
}
