import { Link } from 'react-router-dom';
import { ArrowLeft, Compass, Search, Store } from 'lucide-react';
import Button from '../components/ui/Button';
import ShopLogo from '../components/ui/ShopLogo';
import { shops } from '../data/shops';
import { categories } from '../data/site';
import { usePageMeta } from '../hooks/usePageMeta';

export default function NotFound() {
  usePageMeta('Page not found');

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6 sm:py-24">
      <span className="mx-auto grid size-16 place-items-center rounded-full bg-brand-soft text-brand">
        <Compass className="size-7" strokeWidth={1.6} />
      </span>
      <p className="mt-6 text-[10.5px] font-semibold tracking-[0.18em] text-ink-mute uppercase">404 · Wrong turn</p>
      <h1 className="mt-2 font-display text-[clamp(2rem,5vw,3rem)] leading-tight font-semibold">
        This aisle does not exist.
      </h1>
      <p className="mx-auto mt-3 max-w-md text-[13.5px] leading-relaxed text-ink-soft">
        The page you were looking for is not part of the demonstration. The shops, though, are all still
        where you left them.
      </p>

      <div className="mt-7 flex flex-col items-center justify-center gap-2.5 sm:flex-row">
        <Button to="/" Icon={ArrowLeft}>Back to the homepage</Button>
        <Button to="/shops" variant="outline" Icon={Store}>Explore shops</Button>
        <Button to="/categories" variant="ghost" Icon={Search}>Categories</Button>
      </div>

      <div className="mt-12 rounded-[1.5rem] border border-line bg-white p-5 text-left shadow-soft">
        <p className="text-[10.5px] font-semibold tracking-[0.16em] text-ink-mute uppercase">Try one of these</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {shops.slice(0, 5).map((shop) => (
            <Link
              key={shop.slug}
              to={`/shops/${shop.slug}`}
              className="inline-flex items-center gap-2 rounded-full border border-line bg-canvas py-1 pr-3 pl-1 text-[11.5px] font-medium text-ink-soft transition hover:border-brand/30 hover:text-ink"
            >
              <ShopLogo shop={shop} size="sm" ring={false} className="size-7 rounded-full text-[10px]" />
              {shop.name}
            </Link>
          ))}
        </div>
        <div className="mt-4 flex flex-wrap gap-2 border-t border-line-soft pt-4">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/shops?category=${category.id}`}
              className="rounded-full bg-canvas-deep px-2.5 py-1 text-[10.5px] font-medium text-ink-soft transition hover:bg-brand-soft hover:text-brand-dark"
            >
              {category.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
