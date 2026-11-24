import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ArrowUpRight, Search, Store } from 'lucide-react';
import CategoryCard from '../components/ui/CategoryCard';
import Button from '../components/ui/Button';
import SectionHeading from '../components/ui/SectionHeading';
import Reveal from '../components/ui/Reveal';
import ProductCard from '../components/ui/ProductCard';
import { categories } from '../data/site';
import { allProducts, shops } from '../data/shops';
import { usePageMeta } from '../hooks/usePageMeta';
import { formatNaira } from '../lib/utils';

export default function CategoriesPage() {
  usePageMeta(
    'Categories',
    'Browse the six shopping categories inside BDPA Shopping Complex, Benin City.',
  );

  const popular = [
    allProducts.find((item) => item.id === 'party-jollof'),
    allProducts.find((item) => item.id === 'iphone-15-128'),
    allProducts.find((item) => item.id === 'wash-dry-fold'),
    allProducts.find((item) => item.id === 'raw-shea-butter'),
  ].filter(Boolean);

  return (
    <div>
      <section className="relative overflow-hidden border-b border-line bg-canvas-deep/40">
        <div
          className="pointer-events-none absolute -top-24 left-1/3 size-[24rem] rounded-full bg-sand/70 blur-3xl"
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-7xl px-4 pt-6 pb-10 sm:px-6 sm:pt-8 lg:pb-14">
          <nav className="flex items-center gap-2 text-[11.5px] text-ink-mute" aria-label="Breadcrumb">
            <Link to="/" className="inline-flex items-center gap-1.5 transition hover:text-ink">
              <ArrowLeft className="size-3.5" /> Home
            </Link>
            <span>/</span>
            <span className="font-medium text-ink-soft">Categories</span>
          </nav>

          <div className="mt-6 grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
            <div>
              <p className="flex items-center gap-2 text-[10.5px] font-semibold tracking-[0.18em] text-brand uppercase">
                <span className="h-px w-6 bg-brand/40" /> Shop the complex your way
              </p>
              <h1 className="mt-3 max-w-xl font-display text-[clamp(2rem,4.6vw,3.3rem)] leading-[1.02] font-semibold">
                Six categories. One shopping complex.
              </h1>
              <p className="mt-3 max-w-lg text-[14px] leading-relaxed text-ink-soft">
                Food, tech, groceries, laundry, fashion and everyday provisions — organised so you can find
                a specific shop without walking every block.
              </p>
              <div className="mt-5 flex flex-wrap gap-2.5">
                <Button to="/shops" IconRight={ArrowRight}>
                  Browse all shops
                </Button>
                <Button to="/shops" variant="outline" Icon={Search}>
                  Search the directory
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2.5">
              {[
                { value: categories.length, label: 'Categories' },
                { value: shops.length, label: 'Demo shops' },
                { value: allProducts.length, label: 'Listings' },
              ].map((stat) => (
                <div key={stat.label} className="rounded-2xl border border-line bg-white/80 px-3 py-4 text-center shadow-soft">
                  <p className="font-display text-2xl leading-none font-semibold">{stat.value}</p>
                  <p className="mt-1.5 text-[10px] font-medium tracking-wide text-ink-mute uppercase">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pt-12 sm:px-6 lg:pt-16">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category, index) => {
            const count = shops.filter((shop) => shop.category === category.id).length;
            const products = allProducts.filter((product) => product.shopCategory === category.id);
            const lowest = products.length ? Math.min(...products.map((product) => product.price)) : null;
            return (
              <Reveal key={category.id} delay={(index % 3) * 60}>
                <CategoryCard category={category} variant="wide" className="h-full rounded-b-none" />
                <div className="-mt-px flex items-center justify-between gap-2 rounded-b-[1.5rem] border border-t-0 border-line bg-white px-4 py-3">
                  <p className="text-[10.5px] text-ink-mute">
                    {products.length} sample listings
                    {lowest !== null && <span> · from {formatNaira(lowest)}</span>}
                  </p>
                  <Link
                    to={`/shops?category=${category.id}`}
                    className="inline-flex items-center gap-1 text-[10.5px] font-semibold text-ink-soft transition hover:text-ink"
                  >
                    {count} {count === 1 ? 'shop' : 'shops'}
                    <ArrowUpRight className="size-3" />
                  </Link>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pt-16 sm:px-6">
        <Reveal>
          <SectionHeading
            eyebrow="Across the complex"
            title="Popular with shoppers this week"
            description="Four sample listings from different corners of BDPA — a quick way to see the variety."
            action={
              <Button to="/shops" variant="outline" size="sm" Icon={Store}>
                All shops
              </Button>
            }
          />
        </Reveal>
        <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
          {popular.map((product, index) => (
            <Reveal key={`${product.shopSlug}-${product.id}`} delay={index * 55}>
              <ProductCard product={product} />
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
