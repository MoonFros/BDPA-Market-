import { useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  ArrowLeft,
  ChevronDown,
  LayoutGrid,
  List,
  MapPin,
  Search,
  SlidersHorizontal,
  Store,
  X,
} from 'lucide-react';
import ShopCard, { ShopRow } from '../components/ui/ShopCard';
import Button from '../components/ui/Button';
import { categories, getCategory } from '../data/site';
import { shops } from '../data/shops';
import { cn, pluralise } from '../lib/utils';
import { usePageMeta } from '../hooks/usePageMeta';

const sortOptions = [
  { id: 'az', label: 'Name A – Z' },
  { id: 'za', label: 'Name Z – A' },
  { id: 'products', label: 'Most listings' },
  { id: 'rating', label: 'Highest rated' },
];

function matchesQuery(shop, query) {
  if (!query) return true;
  const category = getCategory(shop.category);
  const haystack = [
    shop.name,
    shop.tagline,
    shop.description,
    category?.name,
    ...shop.highlights,
    ...shop.sections,
    ...shop.products.map((product) => `${product.name} ${product.section} ${product.tags?.join(' ') || ''}`),
  ]
    .join(' ')
    .toLowerCase();
  return query
    .toLowerCase()
    .split(/\s+/)
    .every((token) => haystack.includes(token));
}

export default function ShopsPage() {
  usePageMeta(
    'Explore shops',
    'Search and filter all demo businesses inside BDPA Shopping Complex, Benin City.',
  );

  const [params, setParams] = useSearchParams();
  const query = params.get('q') || '';
  const category = params.get('category') || '';
  const sort = params.get('sort') || 'az';
  const view = params.get('view') === 'list' ? 'list' : 'grid';

  const update = (patch) => {
    const next = new URLSearchParams(params);
    Object.entries(patch).forEach(([key, value]) => {
      if (!value) next.delete(key);
      else next.set(key, value);
    });
    setParams(next, { replace: true });
  };

  const results = useMemo(() => {
    const filtered = shops
      .filter((shop) => (category ? shop.category === category : true))
      .filter((shop) => matchesQuery(shop, query));

    const sorted = [...filtered];
    if (sort === 'az') sorted.sort((a, b) => a.name.localeCompare(b.name));
    if (sort === 'za') sorted.sort((a, b) => b.name.localeCompare(a.name));
    if (sort === 'products') sorted.sort((a, b) => b.products.length - a.products.length);
    if (sort === 'rating') sorted.sort((a, b) => b.rating - a.rating);
    return sorted;
  }, [category, query, sort]);

  const activeCategory = getCategory(category);
  const hasFilters = Boolean(query || category);

  return (
    <div>
      <section className="relative overflow-hidden border-b border-line bg-canvas-deep/40">
        <div
          className="pointer-events-none absolute -top-32 right-0 size-[26rem] rounded-full bg-brand-soft/70 blur-3xl"
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-7xl px-4 pt-6 pb-10 sm:px-6 sm:pt-8 lg:pb-12">
          <nav className="flex items-center gap-2 text-[11.5px] text-ink-mute" aria-label="Breadcrumb">
            <Link to="/" className="inline-flex items-center gap-1.5 transition hover:text-ink">
              <ArrowLeft className="size-3.5" /> Home
            </Link>
            <span>/</span>
            <span className="font-medium text-ink-soft">Explore shops</span>
          </nav>

          <div className="mt-6 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="flex items-center gap-2 text-[10.5px] font-semibold tracking-[0.18em] text-brand uppercase">
                <span className="h-px w-6 bg-brand/40" /> The whole complex
              </p>
              <h1 className="mt-3 font-display text-[clamp(2rem,4.4vw,3.1rem)] leading-[1.02] font-semibold">
                Explore every shop under one roof
              </h1>
              <p className="mt-3 max-w-xl text-[14px] leading-relaxed text-ink-soft">
                Eight demo storefronts, from kitchens to laundry counters. Search by name, product or service,
                then step inside any storefront.
              </p>
            </div>

            <div className="flex shrink-0 gap-3">
              <div className="rounded-2xl border border-line bg-white/80 px-4 py-3 shadow-soft">
                <p className="font-display text-2xl leading-none font-semibold">{shops.length}</p>
                <p className="mt-1 text-[10.5px] font-medium tracking-wide text-ink-mute uppercase">Demo shops</p>
              </div>
              <div className="rounded-2xl border border-line bg-white/80 px-4 py-3 shadow-soft">
                <p className="font-display text-2xl leading-none font-semibold">
                  {shops.reduce((total, shop) => total + shop.products.length, 0)}
                </p>
                <p className="mt-1 text-[10.5px] font-medium tracking-wide text-ink-mute uppercase">Sample listings</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="z-30 border-b border-line bg-canvas/90 backdrop-blur-xl md:sticky md:top-[68px] lg:top-[76px]">
        <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:gap-4">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-ink-mute" />
              <input
                value={query}
                onChange={(event) => update({ q: event.target.value })}
                placeholder="Search shops & products"
                aria-label="Search businesses"
                className="h-11 w-full rounded-full border border-line bg-white pr-10 pl-11 text-[13.5px] text-ink shadow-[0_1px_2px_rgba(21,33,27,0.03)] outline-none transition focus:border-brand/40 focus:shadow-soft"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => update({ q: '' })}
                  className="absolute top-1/2 right-3 grid size-6 -translate-y-1/2 place-items-center rounded-full bg-canvas-deep text-ink-mute transition hover:text-ink"
                  aria-label="Clear search"
                >
                  <X className="size-3.5" />
                </button>
              )}
            </div>

            <div className="flex items-center gap-2">
              <div className="relative flex-1 lg:flex-none">
                <SlidersHorizontal className="pointer-events-none absolute top-1/2 left-3.5 size-3.5 -translate-y-1/2 text-ink-mute" />
                <select
                  value={sort}
                  onChange={(event) => update({ sort: event.target.value })}
                  aria-label="Sort shops"
                  className="h-11 w-full appearance-none rounded-full border border-line bg-white pr-9 pl-9 text-[12.5px] font-medium text-ink-soft outline-none transition focus:border-brand/40 lg:w-[11.5rem]"
                >
                  {sortOptions.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute top-1/2 right-3.5 size-3.5 -translate-y-1/2 text-ink-mute" />
              </div>

              <div className="flex h-11 items-center gap-1 rounded-full border border-line bg-white p-1">
                <button
                  type="button"
                  onClick={() => update({ view: 'grid' })}
                  aria-pressed={view === 'grid'}
                  aria-label="Grid view"
                  className={cn(
                    'grid size-9 place-items-center rounded-full transition',
                    view === 'grid' ? 'bg-brand text-white' : 'text-ink-mute hover:text-ink',
                  )}
                >
                  <LayoutGrid className="size-4" />
                </button>
                <button
                  type="button"
                  onClick={() => update({ view: 'list' })}
                  aria-pressed={view === 'list'}
                  aria-label="List view"
                  className={cn(
                    'grid size-9 place-items-center rounded-full transition',
                    view === 'list' ? 'bg-brand text-white' : 'text-ink-mute hover:text-ink',
                  )}
                >
                  <List className="size-4" />
                </button>
              </div>
            </div>
          </div>

          <div className="no-scrollbar -mx-1 mt-3 flex items-center gap-1.5 overflow-x-auto px-1 pb-0.5">
            <button
              type="button"
              onClick={() => update({ category: '' })}
              className={cn(
                'shrink-0 rounded-full border px-3.5 py-1.5 text-[12px] font-semibold transition',
                !category
                  ? 'border-brand bg-brand text-white'
                  : 'border-line bg-white text-ink-soft hover:border-brand/30 hover:text-ink',
              )}
            >
              All shops
            </button>
            {categories.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => update({ category: item.id })}
                className={cn(
                  'shrink-0 rounded-full border px-3.5 py-1.5 text-[12px] font-medium whitespace-nowrap transition',
                  category === item.id
                    ? 'border-brand bg-brand text-white'
                    : 'border-line bg-white text-ink-soft hover:border-brand/30 hover:text-ink',
                )}
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      <section className="mx-auto max-w-7xl px-4 pt-6 pb-4 sm:px-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-[12.5px] text-ink-soft">
            <span className="font-semibold text-ink">{results.length}</span>{' '}
            {results.length === 1 ? 'business' : 'businesses'}
            {activeCategory ? ` in ${activeCategory.name}` : ' in the complex'}
            {query && (
              <>
                {' '}
                for <span className="font-semibold text-ink">“{query}”</span>
              </>
            )}
          </p>
          {hasFilters && (
            <button
              type="button"
              onClick={() => setParams({ sort, view }, { replace: true })}
              className="inline-flex items-center gap-1.5 text-[11.5px] font-semibold text-ink-mute transition hover:text-ink"
            >
              <X className="size-3.5" /> Clear filters
            </button>
          )}
        </div>

        {results.length > 0 ? (
          view === 'grid' ? (
            <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:gap-5 xl:grid-cols-3">
              {results.map((shop) => (
                <ShopCard key={shop.slug} shop={shop} />
              ))}
            </div>
          ) : (
            <div className="mt-5 grid gap-3">
              {results.map((shop) => (
                <ShopRow key={shop.slug} shop={shop} />
              ))}
            </div>
          )
        ) : (
          <div className="mt-8 rounded-[1.75rem] border border-dashed border-line bg-white/60 px-6 py-16 text-center">
            <span className="mx-auto grid size-14 place-items-center rounded-full bg-canvas-deep text-ink-mute">
              <Search className="size-6" strokeWidth={1.6} />
            </span>
            <h2 className="mt-4 font-display text-2xl font-semibold">No shops match that search</h2>
            <p className="mx-auto mt-2 max-w-sm text-[13px] leading-relaxed text-ink-soft">
              We could not find a business for “{query || activeCategory?.name}”. Try a different word, or
              browse everything in the complex.
            </p>
            <div className="mt-6 flex flex-col items-center justify-center gap-2 sm:flex-row">
              <Button onClick={() => setParams({}, { replace: true })} variant="primary" Icon={Store}>
                Show all shops
              </Button>
              <Button to="/categories" variant="outline">
                Browse by category
              </Button>
            </div>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
              <span className="text-[11px] text-ink-mute">Popular:</span>
              {['Jollof', 'iPhone', 'Laundry', 'Ankara'].map((term) => (
                <button
                  key={term}
                  type="button"
                  onClick={() => setParams({ q: term }, { replace: true })}
                  className="rounded-full border border-line bg-white px-2.5 py-1 text-[11.5px] font-medium text-ink-soft transition hover:border-brand/30 hover:text-brand-dark"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        )}

        {results.length > 0 && (
          <div className="mt-12 flex flex-col items-start justify-between gap-4 rounded-[1.5rem] border border-line bg-white/70 px-5 py-5 sm:flex-row sm:items-center">
            <div className="flex items-start gap-3">
              <span className="grid size-10 shrink-0 place-items-center rounded-full bg-brand-soft text-brand">
                <MapPin className="size-4" />
              </span>
              <div>
                <p className="text-[13px] font-semibold text-ink">
                  {pluralise(results.length, 'shop')} shown
                </p>
                <p className="mt-0.5 text-[11.5px] text-ink-soft">
                  All units are inside BDPA Shopping Complex, Benin City. Unit numbers are sample data.
                </p>
              </div>
            </div>
            <Button to="/owners" variant="outline" size="sm" className="shrink-0">
              List your shop
            </Button>
          </div>
        )}
      </section>
    </div>
  );
}
