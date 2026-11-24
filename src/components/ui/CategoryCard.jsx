import { Link } from 'react-router-dom';
import { ArrowUpRight, ShoppingBasket, Smartphone, Store, Shirt, UtensilsCrossed, WashingMachine } from 'lucide-react';
import SmartImage from './SmartImage';
import { shops } from '../../data/shops';
import { cn } from '../../lib/utils';

const icons = {
  utensils: UtensilsCrossed,
  smartphone: Smartphone,
  'shopping-basket': ShoppingBasket,
  'washing-machine': WashingMachine,
  shirt: Shirt,
  store: Store,
};

export default function CategoryCard({ category, variant = 'tile', className }) {
  const Icon = icons[category.icon] || Store;
  const count = shops.filter((shop) => shop.category === category.id).length;

  if (variant === 'wide') {
    return (
      <Link
        to={`/shops?category=${category.id}`}
        className={cn(
          'group relative flex flex-col overflow-hidden rounded-[1.5rem] border border-line bg-white shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift',
          className,
        )}
      >
        <div className="relative">
          <SmartImage
            src={category.image}
            alt={category.name}
            icon={Icon}
            className="aspect-[16/10] w-full"
            imgClassName="group-hover:scale-[1.045]"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/55 via-ink/10 to-transparent" />
          <span className="absolute top-3 left-3 grid size-9 place-items-center rounded-full bg-white/90 text-brand-dark backdrop-blur">
            <Icon className="size-4" strokeWidth={1.8} />
          </span>
          <div className="absolute inset-x-4 bottom-3 flex items-end justify-between gap-3">
            <div>
              <h3 className="text-xl leading-tight font-semibold text-white">{category.name}</h3>
              <p className="mt-0.5 text-[11.5px] font-medium text-white/80">
                {count} {count === 1 ? 'shop' : 'shops'}
              </p>
            </div>
            <span className="grid size-9 place-items-center rounded-full bg-white/15 text-white ring-1 ring-white/25 backdrop-blur transition group-hover:bg-white group-hover:text-ink">
              <ArrowUpRight className="size-4" />
            </span>
          </div>
        </div>
        <div className="px-4 py-4">
          <p className="text-[13px] leading-relaxed text-ink-soft">{category.description}</p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {category.tags.map((tag) => (
              <span key={tag} className="rounded-full bg-canvas-deep px-2.5 py-1 text-[10.5px] font-medium text-ink-soft">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      to={`/shops?category=${category.id}`}
      className={cn(
        'group relative block overflow-hidden rounded-[1.35rem] border border-line bg-white shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift',
        className,
      )}
    >
      <SmartImage
        src={category.image}
        alt={category.name}
        icon={Icon}
        className="aspect-[4/5] w-full sm:aspect-[4/5]"
        imgClassName="group-hover:scale-[1.06]"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/25 to-transparent" />
      <div className="absolute inset-x-3 bottom-3">
        <span className="mb-2 inline-grid size-8 place-items-center rounded-full bg-white/20 text-white ring-1 ring-white/30 backdrop-blur">
          <Icon className="size-4" strokeWidth={1.8} />
        </span>
        <h3 className="text-[15px] leading-tight font-semibold text-white">{category.name}</h3>
        <div className="mt-1 flex items-center justify-between gap-2">
          <p className="text-[11px] font-medium text-white/75">
            {count} {count === 1 ? 'shop' : 'shops'}
          </p>
          <ArrowUpRight className="size-3.5 text-white/80 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
      </div>
    </Link>
  );
}
