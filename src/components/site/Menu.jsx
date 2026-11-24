import { useMemo, useState } from 'react';
import { Flame, Minus, Plus, Search, ShoppingBag, Sparkles, UtensilsCrossed, X } from 'lucide-react';
import Button from '../ui/Button';
import Modal from '../ui/Modal';
import SmartImage from '../ui/SmartImage';
import SectionHeading from '../ui/SectionHeading';
import Reveal from '../ui/Reveal';
import { useBasket } from '../../context/BasketContext';
import {
  categoryCounts,
  categoryLabel,
  dishes,
  featuredDishes,
  menuCategories,
} from '../../data/menu';
import { cn, formatNaira } from '../../lib/utils';

export function SpiceLevel({ level, className }) {
  if (!level) return null;
  return (
    <span
      className={cn('inline-flex items-center gap-0.5 text-terracotta', className)}
      title={`Spice level ${level} of 3`}
    >
      {[1, 2, 3].map((index) => (
        <Flame
          key={index}
          className={cn('size-3', index > level && 'text-line')}
          strokeWidth={2.2}
        />
      ))}
      <span className="sr-only">Spice level {level} of 3</span>
    </span>
  );
}

export function DishCard({ dish, onOpen }) {
  const { add } = useBasket();

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[1.35rem] border border-line bg-paper transition-all duration-300 hover:-translate-y-1 hover:border-ink/15 hover:shadow-lift">
      <button
        type="button"
        onClick={() => onOpen(dish)}
        className="relative block w-full overflow-hidden text-left"
        aria-label={`View ${dish.name}`}
      >
        <SmartImage
          src={dish.image}
          alt={dish.name}
          className="aspect-[4/3] w-full"
          imgClassName="transition-transform duration-[900ms] group-hover:scale-[1.05]"
        />
        <span className="absolute top-3 left-3 rounded-full bg-paper/95 px-2.5 py-1 text-[9px] font-bold tracking-[0.14em] text-ink uppercase backdrop-blur">
          {categoryLabel(dish.category)}
        </span>
        {dish.tags[0] && (
          <span className="absolute top-3 right-3 rounded-full bg-terracotta px-2.5 py-1 text-[9px] font-bold tracking-[0.1em] text-cream uppercase">
            {dish.tags[0]}
          </span>
        )}
      </button>

      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-display text-[16.5px] leading-snug font-semibold">
            <button type="button" onClick={() => onOpen(dish)} className="text-left hover:text-terracotta">
              {dish.name}
            </button>
          </h3>
          <SpiceLevel level={dish.spice} className="mt-1 shrink-0" />
        </div>
        <p className="mt-1 line-clamp-2 text-[12px] leading-relaxed text-ink-soft">{dish.description}</p>

        <div className="mt-auto flex items-center justify-between gap-2 pt-3.5">
          <span className="font-display text-[16px] font-semibold text-ink">{formatNaira(dish.price)}</span>
          <button
            type="button"
            onClick={() => add(dish)}
            className="inline-flex h-8 items-center gap-1.5 rounded-full bg-ink px-3 text-[11px] font-semibold text-cream transition hover:bg-terracotta"
          >
            <Plus className="size-3.5" strokeWidth={2.5} /> Add
          </button>
        </div>
      </div>
    </article>
  );
}

export function DishDialog({ dish, onClose }) {
  const { add } = useBasket();
  const [qty, setQty] = useState(1);

  const close = () => {
    setQty(1);
    onClose();
  };

  return (
    <Modal open={Boolean(dish)} onClose={close} label={dish?.name ?? 'Dish details'} className="sm:max-w-3xl">
      {dish && (
        <div>
          <SmartImage
            src={dish.image}
            alt={dish.name}
            eager
            className="aspect-[16/10] w-full sm:aspect-[16/8]"
          />
          <div className="p-5 sm:p-7">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-cream-deep px-2.5 py-1 text-[9.5px] font-bold tracking-[0.14em] text-ink-soft uppercase">
                {categoryLabel(dish.category)}
              </span>
              {dish.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-terracotta-soft px-2.5 py-1 text-[9.5px] font-bold tracking-[0.1em] text-terracotta uppercase"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="mt-3 flex flex-wrap items-end justify-between gap-3">
              <h2 className="max-w-md text-[clamp(1.5rem,4.2vw,2.15rem)] leading-tight font-semibold">
                {dish.name}
              </h2>
              <span className="font-display text-2xl font-semibold text-terracotta">
                {formatNaira(dish.price)}
              </span>
            </div>

            <p className="mt-3 text-[13px] leading-relaxed text-ink-soft">{dish.description}</p>
            <p className="mt-2 text-[12.5px] leading-relaxed text-ink-mute">{dish.detail}</p>

            <dl className="mt-4 grid grid-cols-3 gap-2 rounded-2xl border border-line bg-cream/60 p-3 text-center">
              <div>
                <dt className="text-[9px] font-bold tracking-[0.12em] text-ink-mute uppercase">Serves</dt>
                <dd className="mt-0.5 text-[11.5px] font-semibold text-ink">{dish.serves}</dd>
              </div>
              <div className="border-x border-line">
                <dt className="text-[9px] font-bold tracking-[0.12em] text-ink-mute uppercase">Prep</dt>
                <dd className="mt-0.5 text-[11.5px] font-semibold text-ink">{dish.prep}</dd>
              </div>
              <div>
                <dt className="text-[9px] font-bold tracking-[0.12em] text-ink-mute uppercase">Spice</dt>
                <dd className="mt-1 flex justify-center">
                  <SpiceLevel level={dish.spice} />
                  {!dish.spice && <span className="text-[11.5px] font-semibold">Mild</span>}
                </dd>
              </div>
            </dl>

            <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center justify-between gap-3 rounded-full border border-line bg-paper p-1 pl-4 sm:justify-start">
                <span className="text-[10px] font-bold tracking-[0.12em] text-ink-mute uppercase">Qty</span>
                <div className="flex items-center">
                  <button
                    type="button"
                    onClick={() => setQty((value) => Math.max(1, value - 1))}
                    aria-label="Decrease quantity"
                    className="grid size-8 place-items-center rounded-full text-ink transition hover:bg-cream-deep"
                  >
                    <Minus className="size-3.5" />
                  </button>
                  <span className="w-7 text-center text-[13px] font-semibold" aria-live="polite">
                    {qty}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQty((value) => Math.min(20, value + 1))}
                    aria-label="Increase quantity"
                    className="grid size-8 place-items-center rounded-full text-ink transition hover:bg-cream-deep"
                  >
                    <Plus className="size-3.5" />
                  </button>
                </div>
              </div>
              <Button
                size="md"
                className="w-full sm:w-auto"
                onClick={() => {
                  add(dish, qty);
                  close();
                }}
              >
                <ShoppingBag className="size-4" /> Add to order · {formatNaira(dish.price * qty)}
              </Button>
            </div>

            <p className="mt-3 flex items-start gap-1.5 text-[10.5px] leading-relaxed text-ink-mute">
              <Sparkles className="mt-px size-3 shrink-0 text-olive" />
              Demonstration dish — prices and descriptions are sample data. Adding to the basket only
              updates this demo.
            </p>
          </div>
        </div>
      )}
    </Modal>
  );
}

export function FeaturedDishes({ onOpenDish }) {
  const { add } = useBasket();

  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:py-20">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <Reveal>
          <SectionHeading
            eyebrow="Chef's selection"
            title="Dishes worth coming back for."
            intro="Three plates that tell you most of what you need to know about this kitchen."
          />
        </Reveal>
        <Reveal delay={80}>
          <Button variant="outline" size="md" href="#menu">
            View full menu
          </Button>
        </Reveal>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-3 lg:gap-5">
        {featuredDishes.map((dish, index) => (
          <Reveal key={dish.id} delay={index * 80} className="h-full">
            <article className="group flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-line bg-paper shadow-soft transition hover:-translate-y-1 hover:shadow-lift">
              <button
                type="button"
                onClick={() => onOpenDish(dish)}
                className="relative block aspect-[4/3] w-full overflow-hidden text-left"
                aria-label={`View ${dish.name}`}
              >
                <SmartImage
                  src={dish.image}
                  alt={dish.name}
                  className="h-full w-full"
                  imgClassName="transition-transform duration-[1100ms] group-hover:scale-[1.06]"
                />
                <span className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-ink/70 to-transparent" />
                <span className="absolute bottom-3 left-3 rounded-full bg-cream/95 px-2.5 py-1 text-[9px] font-bold tracking-[0.14em] text-ink uppercase">
                  {categoryLabel(dish.category)}
                </span>
              </button>
              <div className="flex flex-1 flex-col p-4 sm:p-5">
                <h3 className="font-display text-[19px] leading-snug font-semibold">
                  <button type="button" onClick={() => onOpenDish(dish)} className="text-left hover:text-terracotta">
                    {dish.name}
                  </button>
                </h3>
                <p className="mt-1.5 line-clamp-2 text-[12.5px] leading-relaxed text-ink-soft">
                  {dish.description}
                </p>
                <div className="mt-auto flex items-center justify-between gap-2 pt-4">
                  <span className="font-display text-lg font-semibold">{formatNaira(dish.price)}</span>
                  <button
                    type="button"
                    onClick={() => add(dish)}
                    className="inline-flex h-9 items-center gap-1.5 rounded-full border border-ink/15 px-3.5 text-[11.5px] font-semibold text-ink transition hover:border-transparent hover:bg-terracotta hover:text-cream"
                  >
                    <Plus className="size-3.5" /> Add to order
                  </button>
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function MenuSection({ onOpenDish }) {
  const [active, setActive] = useState('all');
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    return dishes.filter((dish) => {
      const inCategory = active === 'all' || dish.category === active;
      if (!inCategory) return false;
      if (!term) return true;
      return [dish.name, dish.description, categoryLabel(dish.category), ...dish.tags]
        .join(' ')
        .toLowerCase()
        .includes(term);
    });
  }, [active, query]);

  const reset = () => {
    setActive('all');
    setQuery('');
  };

  return (
    <section id="menu" className="border-y border-line bg-paper">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:py-20">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <Reveal>
            <SectionHeading
              eyebrow="The full menu"
              title="Everything on the menu."
              intro="Eighteen dishes across nine sections — smoky rice, charcoal grills, pasta, small chops and something sweet to finish."
            />
          </Reveal>

          <Reveal delay={60} className="w-full lg:max-w-xs">
            <div className="relative">
              <Search className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-ink-mute" />
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                aria-label="Search the menu"
                placeholder="Search dishes, e.g. jollof"
                className="h-11 w-full rounded-full border border-line bg-cream/70 py-2.5 pr-10 pl-10 text-[13px] text-ink transition placeholder:text-ink-mute focus:border-terracotta/50 focus:bg-paper focus:ring-2 focus:ring-terracotta/10 focus:outline-none"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  aria-label="Clear search"
                  className="absolute top-1/2 right-2 grid size-7 -translate-y-1/2 place-items-center rounded-full text-ink-mute hover:bg-line-soft hover:text-ink"
                >
                  <X className="size-3.5" />
                </button>
              )}
            </div>
          </Reveal>
        </div>

        <div className="no-scrollbar -mx-4 mt-7 flex gap-2 overflow-x-auto px-4 py-1 sm:mx-0 sm:flex-wrap sm:px-0">
          {menuCategories.map((category) => {
            const count =
              category.id === 'all'
                ? dishes.length
                : categoryCounts.find((item) => item.id === category.id)?.count ?? 0;
            const selected = active === category.id;
            return (
              <button
                key={category.id}
                type="button"
                aria-pressed={selected}
                onClick={() => setActive(category.id)}
                className={cn(
                  'inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3.5 py-2 text-[11.5px] font-semibold whitespace-nowrap transition',
                  selected
                    ? 'border-ink bg-ink text-cream'
                    : 'border-line bg-cream/60 text-ink-soft hover:border-ink/25 hover:text-ink',
                )}
              >
                {category.label}
                <span className={cn('text-[9.5px] font-bold', selected ? 'text-cream/60' : 'text-ink-mute')}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        <div className="mt-4 flex items-center justify-between text-[11.5px] text-ink-mute">
          <p aria-live="polite">
            {filtered.length} {filtered.length === 1 ? 'dish' : 'dishes'}
            {query && ` for “${query}”`}
          </p>
          {(active !== 'all' || query) && (
            <button type="button" onClick={reset} className="font-semibold text-terracotta hover:underline">
              Reset filters
            </button>
          )}
        </div>

        {filtered.length ? (
          <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {filtered.map((dish, index) => (
              <Reveal key={dish.id} delay={Math.min(index, 5) * 45} className="h-full">
                <DishCard dish={dish} onOpen={onOpenDish} />
              </Reveal>
            ))}
          </div>
        ) : (
          <div className="mt-6 flex flex-col items-center rounded-[1.5rem] border border-dashed border-line bg-cream/50 px-6 py-14 text-center">
            <span className="grid size-14 place-items-center rounded-full bg-cream-deep text-ink-mute">
              <UtensilsCrossed className="size-6" />
            </span>
            <h3 className="mt-4 font-display text-xl font-semibold">No dishes match that search</h3>
            <p className="mt-1.5 max-w-sm text-[12.5px] leading-relaxed text-ink-soft">
              Try a different dish, or browse the full menu — there is usually something on the grill.
            </p>
            <Button variant="outline" size="sm" className="mt-4" onClick={reset}>
              Show all dishes
            </Button>
          </div>
        )}

        <p className="mt-8 text-center text-[10.5px] text-ink-mute">
          Sample menu · Naira prices · dishes, descriptions and photography are demonstration data.
        </p>
      </div>
    </section>
  );
}
