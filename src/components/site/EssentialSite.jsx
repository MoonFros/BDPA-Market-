import {
  ArrowRight,
  BadgeCheck,
  ChefHat,
  Clock,
  MapPin,
  Sparkles,
  ShoppingBag,
  UtensilsCrossed,
} from 'lucide-react';
import Button from '../ui/Button';
import Reveal from '../ui/Reveal';
import SectionHeading from '../ui/SectionHeading';
import SmartImage from '../ui/SmartImage';
import SiteHeader from './SiteHeader';
import SiteFooter from './SiteFooter';
import { ContactForm } from './Forms';
import { ContactLines, DemoBand, DemoNote, HoursList, MapCard, RatingBadge } from './SiteParts';
import { images, restaurant, services, story } from '../../data/restaurant';
import { scrollToId } from '../../lib/utils';

const icons = { dineIn: UtensilsCrossed, chef: ChefHat, bag: ShoppingBag, sparkles: Sparkles };

function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div
        className="pointer-events-none absolute -top-24 -right-24 size-[24rem] rounded-full bg-terracotta-soft/50 blur-3xl"
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-7xl px-4 pt-8 pb-14 sm:px-6 sm:pt-10 lg:pt-14 lg:pb-20">
        <div className="grid items-center gap-9 lg:grid-cols-[1.04fr_0.96fr] lg:gap-12">
          <div className="anim-rise">
            <span className="eyebrow text-terracotta">Contemporary kitchen · Benin City</span>
            <h1 className="mt-4 text-[clamp(2.35rem,5.6vw,3.85rem)] leading-[1] font-semibold">
              Made With Passion.
              <br />
              <span className="text-terracotta">Served With Love.</span>
            </h1>
            <p className="mt-5 max-w-md text-[14.5px] leading-relaxed text-ink-soft sm:text-base">
              Discover great food, warm hospitality and unforgettable dining experiences at Savora.
            </p>
            <div className="mt-6 flex flex-wrap gap-2.5">
              <Button size="lg" onClick={() => scrollToId('contact')}>
                Contact Us <ArrowRight className="size-4" />
              </Button>
              <Button size="lg" variant="outline" onClick={() => scrollToId('about')}>
                Discover Our Story
              </Button>
            </div>
            <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 text-[11.5px] text-ink-soft">
              <RatingBadge />
              <span className="inline-flex items-center gap-1.5">
                <Clock className="size-3.5 text-ink-mute" /> Open today · 10:00 – 22:00
              </span>
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="size-3.5 text-ink-mute" /> GRA, Benin City
              </span>
            </div>
          </div>

          <div className="anim-rise [animation-delay:140ms]">
            <div className="relative">
              <div className="absolute -inset-2.5 rounded-[2rem] border border-line/80 bg-paper/40 sm:-inset-3" />
              <SmartImage
                src={images.interior}
                alt="The Savora dining room in Benin City"
                eager
                className="relative aspect-[4/3] rounded-[1.6rem] shadow-soft"
              />
              <div className="absolute -bottom-4 left-4 rounded-2xl border border-line bg-paper/95 px-3.5 py-2.5 shadow-lift backdrop-blur sm:left-6">
                <p className="text-[8.5px] font-bold tracking-[0.16em] text-ink-mute uppercase">
                  Good to know
                </p>
                <p className="mt-0.5 text-[12px] font-semibold">Open today until 22:00</p>
              </div>
              <div className="absolute -top-3 right-3 rounded-full border border-line bg-paper/95 px-3 py-1.5 text-[10px] font-semibold shadow-soft sm:right-5">
                Est. {restaurant.established}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FactsStrip() {
  const items = [
    { label: 'Find us', value: '12 Adesuwa Road, GRA', sub: 'Benin City, Edo State' },
    { label: 'Open', value: 'Mon – Sat · 10:00', sub: 'Sunday from 12:00' },
    { label: 'Call', value: restaurant.phone, sub: 'Demo number' },
    { label: 'Write', value: restaurant.email, sub: 'Demo address' },
  ];

  return (
    <section className="border-y border-line bg-paper/70">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-y-6 px-4 py-6 sm:px-6 lg:grid-cols-4 lg:divide-x lg:divide-line">
        {items.map((item) => (
          <div key={item.label} className="px-1 lg:px-6 lg:first:pl-0">
            <p className="text-[9px] font-bold tracking-[0.18em] text-ink-mute uppercase">{item.label}</p>
            <p className="mt-1 text-[12.5px] font-semibold text-ink">{item.value}</p>
            <p className="mt-0.5 text-[11px] text-ink-mute">{item.sub}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:py-20">
      <div className="grid items-center gap-9 lg:grid-cols-2 lg:gap-14">
        <Reveal className="order-2 lg:order-1">
          <div className="relative">
            <SmartImage
              src={images.chef}
              alt="A chef plating a dish in the Savora kitchen"
              className="aspect-[4/3] rounded-[1.6rem] shadow-soft sm:aspect-[5/4]"
            />
            <div className="absolute -right-2 -bottom-5 hidden w-40 rounded-2xl border border-line bg-paper p-3 shadow-lift sm:block">
              <p className="font-display text-2xl leading-none font-semibold text-terracotta">
                {restaurant.established}
              </p>
              <p className="mt-1 text-[10px] leading-snug text-ink-soft">
                Serving Benin City since the first eight tables.
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={80} className="order-1 lg:order-2">
          <SectionHeading eyebrow={story.eyebrow} title={story.title} />
          <div className="mt-4 space-y-3 text-[13.5px] leading-relaxed text-ink-soft">
            {story.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 24)}>{paragraph}</p>
            ))}
          </div>
          <ul className="mt-5 space-y-2">
            {story.bullets.map((bullet) => (
              <li key={bullet} className="flex items-start gap-2 text-[12.5px] text-ink">
                <BadgeCheck className="mt-0.5 size-4 shrink-0 text-olive" />
                {bullet}
              </li>
            ))}
          </ul>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Button variant="dark" size="md" onClick={() => scrollToId('contact')}>
              Plan a visit
            </Button>
            <button
              type="button"
              onClick={() => scrollToId('visit')}
              className="inline-flex items-center gap-1.5 text-[12.5px] font-semibold text-ink-soft transition hover:text-terracotta"
            >
              Find us on the map <ArrowRight className="size-3.5" />
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section id="services" className="border-y border-line bg-cream-deep/50">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:py-20">
        <Reveal>
          <SectionHeading
            eyebrow="What we offer"
            title="More than a table for two."
            intro="Dine in, take away or take over the private room — the same kitchen, the same standard."
          />
        </Reveal>

        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
          {services.map((service, index) => {
            const Icon = icons[service.icon] ?? UtensilsCrossed;
            return (
              <Reveal key={service.title} delay={index * 70} className="h-full">
                <article className="group flex h-full flex-col rounded-2xl border border-line bg-paper p-5 transition hover:-translate-y-1 hover:border-ink/15 hover:shadow-lift">
                  <span className="grid size-10 place-items-center rounded-full bg-terracotta-soft text-terracotta transition group-hover:bg-terracotta group-hover:text-cream">
                    <Icon className="size-4.5" strokeWidth={1.8} />
                  </span>
                  <h3 className="mt-4 font-display text-[17px] leading-snug font-semibold">
                    {service.title}
                  </h3>
                  <p className="mt-1.5 text-[12px] leading-relaxed text-ink-soft">{service.copy}</p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Visit() {
  return (
    <section id="visit" className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:py-20">
      <Reveal>
        <SectionHeading
          eyebrow="Find us"
          title="Come hungry. Stay a while."
          intro="We are on Adesuwa Road in GRA — a short drive from Ring Road, with parking behind the building."
        />
      </Reveal>

      <div className="mt-8 grid gap-4 lg:grid-cols-3">
        <Reveal delay={40} className="h-full">
          <div className="flex h-full flex-col rounded-2xl border border-line bg-paper p-5">
            <p className="text-[9px] font-bold tracking-[0.18em] text-ink-mute uppercase">Opening hours</p>
            <h3 className="mt-1.5 font-display text-xl font-semibold">When the kitchen is open</h3>
            <HoursList className="mt-3" />
            <p className="mt-auto pt-3 text-[10.5px] text-ink-mute">{restaurant.openNote}</p>
          </div>
        </Reveal>

        <Reveal delay={90} className="lg:col-span-1">
          <MapCard className="h-64 lg:h-full" />
        </Reveal>

        <Reveal delay={140} className="h-full">
          <div className="flex h-full flex-col rounded-2xl border border-line bg-paper p-5">
            <p className="text-[9px] font-bold tracking-[0.18em] text-ink-mute uppercase">Get in touch</p>
            <h3 className="mt-1.5 font-display text-xl font-semibold">Talk to a person</h3>
            <div className="mt-4">
              <ContactLines />
            </div>
            <Button size="sm" className="mt-4 w-full" onClick={() => scrollToId('contact')}>
              Send an enquiry <ArrowRight className="size-3.5" />
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="border-t border-line bg-paper">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:py-20">
        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
          <Reveal>
            <SectionHeading
              eyebrow="Contact"
              title="Say hello."
              intro="A question about the menu, a table for twelve, or a private event — send a note and we will get back to you."
            />
            <div className="mt-6 rounded-2xl border border-line bg-cream/60 p-4">
              <ContactLines />
            </div>
            <div className="mt-4">
              <DemoNote>This is a demonstration website — the form below does not send messages.</DemoNote>
            </div>
          </Reveal>

          <Reveal delay={80}>
            <div className="rounded-[1.5rem] border border-line bg-cream/50 p-5 shadow-soft sm:p-7">
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export default function EssentialSite() {
  return (
    <div className="anim-fade">
      <div id="site-top" style={{ scrollMarginTop: 0 }} />
      <DemoBand />
      <SiteHeader variant="essential" />
      <main>
        <Hero />
        <FactsStrip />
        <About />
        <Services />
        <Visit />
        <Contact />
      </main>
      <SiteFooter variant="essential" />
    </div>
  );
}
