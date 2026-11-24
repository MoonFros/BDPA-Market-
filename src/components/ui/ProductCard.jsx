import { Link } from 'react-router-dom';
import { ArrowUpRight, ShoppingBag } from 'lucide-react';
import SmartImage from './SmartImage';
import { formatNaira } from '../../lib/utils';

export function ProductCard({ product, showShop = true, accent }) {
  const shopAccent = accent || product.shopAccent;

  return (
    <article className="group relative flex h-full flex-col">
      <Link
        to={`/shops/${product.shopSlug}/product/${product.id}`}
        className="relative block overflow-hidden rounded-2xl border border-line bg-white shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lift focus-visible:outline-offset-4"
        aria-label={`View ${product.name}`}
      >
        <SmartImage
          src={product.image}
          alt={product.name}
          icon={ShoppingBag}
          fallbackLabel="Product photo"
          className="aspect-[4/3] w-full"
          imgClassName="group-hover:scale-[1.05]"
        />
        {product.badge && (
          <span className="absolute top-3 left-3 rounded-full bg-white/92 px-2.5 py-1 text-[10.5px] font-semibold tracking-wide text-ink shadow-sm backdrop-blur">
            {product.badge}
          </span>
        )}
        <span
          className="absolute right-3 bottom-3 grid size-9 translate-y-2 place-items-center rounded-full bg-white/95 text-ink opacity-0 shadow-sm transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
          aria-hidden="true"
        >
          <ArrowUpRight className="size-4" />
        </span>
      </Link>

      <div className="flex flex-1 flex-col px-0.5 pt-3.5">
        {showShop && (
          <Link
            to={`/shops/${product.shopSlug}`}
            className="mb-1 inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-wide uppercase"
            style={{ color: shopAccent }}
          >
            <span className="size-1 rounded-full" style={{ background: shopAccent }} />
            {product.shopName}
          </Link>
        )}
        <h3 className="text-[15px] leading-snug font-semibold text-ink">
          <Link to={`/shops/${product.shopSlug}/product/${product.id}`} className="hover:text-brand-dark">
            {product.name}
          </Link>
        </h3>
        <div className="mt-auto flex items-end justify-between gap-2 pt-2">
          <p className="font-display text-lg leading-none font-semibold text-ink">
            {formatNaira(product.price)}
            <span className="ml-1 font-sans text-[11px] font-medium text-ink-mute">{product.unit}</span>
          </p>
          <span className="text-[11px] font-medium whitespace-nowrap text-ink-mute opacity-0 transition-opacity group-hover:opacity-100">
            View product
          </span>
        </div>
      </div>
    </article>
  );
}

export function ProductRow({ product }) {
  return (
    <Link
      to={`/shops/${product.shopSlug}/product/${product.id}`}
      className="group flex items-stretch gap-4 rounded-2xl border border-line bg-white p-3 shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-lift"
    >
      <SmartImage
        src={product.image}
        alt={product.name}
        icon={ShoppingBag}
        className="aspect-square w-24 shrink-0 rounded-xl sm:w-28"
        imgClassName="group-hover:scale-105"
      />
      <div className="flex min-w-0 flex-1 flex-col justify-center py-1">
        <p className="text-[10.5px] font-semibold tracking-wide uppercase" style={{ color: product.shopAccent }}>
          {product.shopName}
        </p>
        <h3 className="mt-0.5 truncate text-[15px] font-semibold text-ink group-hover:text-brand-dark">{product.name}</h3>
        <p className="mt-0.5 line-clamp-1 text-xs text-ink-soft">{product.description}</p>
        <p className="mt-2 font-display text-base font-semibold text-ink">
          {formatNaira(product.price)}
          <span className="ml-1 font-sans text-[11px] font-medium text-ink-mute">{product.unit}</span>
        </p>
      </div>
      <ArrowUpRight className="mt-1 size-4 shrink-0 text-ink-mute transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
    </Link>
  );
}

export default ProductCard;
