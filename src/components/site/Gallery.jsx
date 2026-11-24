import { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight, Maximize2, X } from 'lucide-react';
import SmartImage from '../ui/SmartImage';
import SectionHeading from '../ui/SectionHeading';
import Reveal from '../ui/Reveal';
import Portal from '../ui/Portal';
import { gallery, restaurant } from '../../data/restaurant';
import { cn } from '../../lib/utils';

export default function Gallery() {
  const [index, setIndex] = useState(null);
  const active = index === null ? null : gallery[index];

  useEffect(() => {
    if (index === null) return undefined;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (event) => {
      if (event.key === 'Escape') setIndex(null);
      if (event.key === 'ArrowRight') setIndex((value) => (value + 1) % gallery.length);
      if (event.key === 'ArrowLeft') setIndex((value) => (value - 1 + gallery.length) % gallery.length);
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener('keydown', onKey);
    };
  }, [index]);

  return (
    <section id="gallery" className="relative overflow-hidden bg-cream-deep">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:py-20">
        <div className="flex flex-wrap items-end justify-between gap-5">
          <Reveal>
            <SectionHeading
              eyebrow="In pictures"
              title="A room, a grill and a long afternoon."
              intro="Food, people and the quiet corners in between — photographed across a normal week at Savora."
            />
          </Reveal>
          <Reveal delay={80}>
            <span className="text-[11px] text-ink-mute">{gallery.length} photographs · sample imagery</span>
          </Reveal>
        </div>

        <div className="mt-8 grid auto-rows-[132px] grid-cols-2 gap-2.5 sm:auto-rows-[172px] sm:grid-cols-4 sm:gap-3">
          {gallery.map((item, itemIndex) => (
            <Reveal
              key={item.title}
              delay={Math.min(itemIndex, 6) * 45}
              className={cn(
                'relative',
                itemIndex === 0 && 'col-span-2 row-span-2',
              )}
            >
              <button
                type="button"
                onClick={() => setIndex(itemIndex)}
                aria-label={`Open photograph: ${item.title}`}
                className="group relative block h-full w-full overflow-hidden rounded-xl text-left sm:rounded-2xl"
              >
                <SmartImage
                  src={item.src}
                  alt={`${item.title} — ${restaurant.name}`}
                  className="h-full w-full"
                  imgClassName="transition-transform duration-[1000ms] group-hover:scale-[1.06]"
                />
                <span className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/5 to-transparent opacity-80 transition group-hover:opacity-95" />
                <span className="absolute inset-x-3 bottom-2.5">
                  <span className="block font-display text-[13px] leading-tight font-semibold text-cream sm:text-[15px]">
                    {item.title}
                  </span>
                </span>
                <span className="absolute top-2.5 right-2.5 grid size-7 place-items-center rounded-full bg-cream/20 text-cream opacity-0 backdrop-blur transition group-hover:opacity-100">
                  <Maximize2 className="size-3" />
                </span>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      {active && (
        <Portal>
        <div className="fixed inset-0 z-[95] flex flex-col bg-ink/95 backdrop-blur-md">
          <div className="flex items-center justify-between px-4 py-3 text-cream sm:px-6">
            <p className="text-[10px] font-bold tracking-[0.18em] text-cream/60 uppercase">
              {index + 1} / {gallery.length}
            </p>
            <button
              type="button"
              onClick={() => setIndex(null)}
              aria-label="Close gallery"
              className="grid size-9 place-items-center rounded-full border border-cream/25 text-cream transition hover:bg-cream/10"
            >
              <X className="size-4" />
            </button>
          </div>

          <div className="flex flex-1 items-center justify-center px-3 pb-3 sm:px-6">
            <button
              type="button"
              onClick={() => setIndex((value) => (value - 1 + gallery.length) % gallery.length)}
              aria-label="Previous photograph"
              className="mr-2 hidden size-10 shrink-0 place-items-center rounded-full border border-cream/25 text-cream transition hover:bg-cream/10 sm:grid"
            >
              <ArrowLeft className="size-4" />
            </button>
            <figure className="min-w-0 flex-1">
              <img
                key={active.src}
                src={active.src}
                alt={active.title}
                className="anim-fade mx-auto max-h-[72svh] w-auto max-w-full rounded-xl object-contain"
              />
              <figcaption className="mx-auto mt-3 max-w-lg text-center">
                <p className="font-display text-[16px] font-semibold text-cream">{active.title}</p>
                <p className="mt-1 text-[11.5px] text-cream/60">{active.caption}</p>
              </figcaption>
            </figure>
            <button
              type="button"
              onClick={() => setIndex((value) => (value + 1) % gallery.length)}
              aria-label="Next photograph"
              className="ml-2 hidden size-10 shrink-0 place-items-center rounded-full border border-cream/25 text-cream transition hover:bg-cream/10 sm:grid"
            >
              <ArrowRight className="size-4" />
            </button>
          </div>

          <div className="flex items-center justify-center gap-3 pb-5 sm:hidden">
            <button
              type="button"
              onClick={() => setIndex((value) => (value - 1 + gallery.length) % gallery.length)}
              aria-label="Previous photograph"
              className="grid size-10 place-items-center rounded-full border border-cream/25 text-cream"
            >
              <ArrowLeft className="size-4" />
            </button>
            <span className="text-[11px] text-cream/60">Use the arrows to browse</span>
            <button
              type="button"
              onClick={() => setIndex((value) => (value + 1) % gallery.length)}
              aria-label="Next photograph"
              className="grid size-10 place-items-center rounded-full border border-cream/25 text-cream"
            >
              <ArrowRight className="size-4" />
            </button>
          </div>
        </div>
        </Portal>
      )}
    </section>
  );
}
