import { useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowUpRight, CornerDownLeft, Search, ShoppingBag, Store, X } from 'lucide-react';
import { searchCatalogue, shops, allProducts } from '../../data/shops';
import { formatNaira } from '../../lib/utils';

const popular = ['Jollof rice', 'iPhone', 'Dry cleaning', 'Ankara', 'Shea butter', '5kg rice'];

export default function SearchDialog({ open, onClose }) {
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!open) {
      setQuery('');
      return;
    }
    document.body.style.overflow = 'hidden';
    const timer = window.setTimeout(() => inputRef.current?.focus(), 80);
    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
      window.clearTimeout(timer);
    };
  }, [open, onClose]);

  const results = useMemo(() => searchCatalogue(query), [query]);
  const hasQuery = query.trim().length > 0;
  const total = results.shops.length + results.products.length;
  const popularProducts = allProducts.slice(0, 4);

  const goToAll = () => {
    onClose();
    navigate(`/shops?q=${encodeURIComponent(query.trim())}`);
  };

  if (!open) return null;

  return createPortal(
    <div className="fixed inset-0 z-[95] flex items-start justify-center px-3 pt-4 sm:px-4 sm:pt-[8vh]">
      <button
        type="button"
        aria-label="Close search"
        className="animate-fade-in absolute inset-0 cursor-default bg-ink/40 backdrop-blur-[3px]"
        onClick={onClose}
        tabIndex={-1}
      />
      <div className="animate-scale-in relative flex max-h-[82vh] w-full max-w-2xl flex-col overflow-hidden rounded-[1.5rem] border border-line bg-white shadow-float">
        <div className="flex items-center gap-3 border-b border-line-soft px-4 py-3.5 sm:px-5">
          <Search className="size-5 shrink-0 text-ink-mute" />
          <input
            ref={inputRef}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter' && hasQuery) goToAll();
            }}
            placeholder="Search shops, products or services…"
            className="h-8 flex-1 bg-transparent text-[15px] text-ink outline-none"
            aria-label="Search the marketplace"
          />
          <kbd className="hidden rounded-md border border-line bg-canvas px-1.5 py-0.5 text-[10px] font-medium text-ink-mute sm:block">
            ESC
          </kbd>
          <button
            type="button"
            onClick={onClose}
            className="grid size-8 place-items-center rounded-full text-ink-mute transition hover:bg-canvas-deep hover:text-ink sm:hidden"
            aria-label="Close search"
          >
            <X className="size-4" />
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto p-3 sm:p-4">
          {!hasQuery && (
            <div className="space-y-5">
              <div>
                <p className="px-2 text-[10.5px] font-semibold tracking-[0.16em] text-ink-mute uppercase">
                  Popular searches
                </p>
                <div className="mt-2 flex flex-wrap gap-2 px-2">
                  {popular.map((term) => (
                    <button
                      key={term}
                      type="button"
                      onClick={() => setQuery(term)}
                      className="rounded-full border border-line bg-canvas px-3 py-1.5 text-[12px] font-medium text-ink-soft transition hover:border-brand/30 hover:bg-brand-mist hover:text-brand-dark"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between px-2">
                  <p className="text-[10.5px] font-semibold tracking-[0.16em] text-ink-mute uppercase">
                    Trending at BDPA
                  </p>
                  <span className="text-[10.5px] text-ink-mute">Sample catalogue</span>
                </div>
                <div className="mt-2 grid gap-1">
                  {popularProducts.slice(0, 3).map((product) => (
                    <Link
                      key={`${product.shopSlug}-${product.id}`}
                      to={`/shops/${product.shopSlug}/product/${product.id}`}
                      onClick={onClose}
                      className="flex items-center gap-3 rounded-xl px-2 py-2 transition hover:bg-canvas"
                    >
                      <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-canvas-deep text-ink-mute">
                        <ShoppingBag className="size-4" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-[13px] font-semibold text-ink">{product.name}</span>
                        <span className="block truncate text-[11px] text-ink-soft">{product.shopName}</span>
                      </span>
                      <span className="text-[12px] font-semibold text-ink">{formatNaira(product.price)}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          )}

          {hasQuery && total === 0 && (
            <div className="px-4 py-12 text-center">
              <span className="mx-auto grid size-12 place-items-center rounded-full bg-canvas-deep text-ink-mute">
                <Search className="size-5" />
              </span>
              <p className="mt-3 text-sm font-semibold text-ink">No matches for “{query.trim()}”</p>
              <p className="mx-auto mt-1 max-w-xs text-[12.5px] leading-relaxed text-ink-soft">
                Try a shorter phrase, or browse all shops in the complex.
              </p>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  navigate('/shops');
                }}
                className="mt-4 text-[12.5px] font-semibold text-brand underline underline-offset-4"
              >
                Browse every shop
              </button>
            </div>
          )}

          {hasQuery && total > 0 && (
            <div className="space-y-4">
              {results.shops.length > 0 && (
                <div>
                  <p className="px-2 text-[10.5px] font-semibold tracking-[0.16em] text-ink-mute uppercase">
                    Shops · {results.shops.length}
                  </p>
                  <div className="mt-1.5 grid gap-0.5">
                    {results.shops.slice(0, 4).map((shop) => (
                      <Link
                        key={shop.slug}
                        to={`/shops/${shop.slug}`}
                        onClick={onClose}
                        className="flex items-center gap-3 rounded-xl px-2 py-2 transition hover:bg-canvas"
                      >
                        <span
                          className="grid size-9 shrink-0 place-items-center rounded-lg font-display text-[12px] font-semibold"
                          style={{ background: shop.accentSoft, color: shop.accentInk }}
                        >
                          {shop.monogram}
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block truncate text-[13px] font-semibold text-ink">{shop.name}</span>
                          <span className="block truncate text-[11px] text-ink-soft">{shop.tagline}</span>
                        </span>
                        <Store className="size-3.5 text-ink-mute" />
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {results.products.length > 0 && (
                <div>
                  <p className="px-2 text-[10.5px] font-semibold tracking-[0.16em] text-ink-mute uppercase">
                    Products & services · {results.products.length}
                  </p>
                  <div className="mt-1.5 grid gap-0.5">
                    {results.products.slice(0, 5).map((product) => (
                      <Link
                        key={`${product.shopSlug}-${product.id}`}
                        to={`/shops/${product.shopSlug}/product/${product.id}`}
                        onClick={onClose}
                        className="flex items-center gap-3 rounded-xl px-2 py-2 transition hover:bg-canvas"
                      >
                        <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-canvas-deep text-ink-mute">
                          <ShoppingBag className="size-4" />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block truncate text-[13px] font-semibold text-ink">{product.name}</span>
                          <span className="block truncate text-[11px] text-ink-soft">{product.shopName}</span>
                        </span>
                        <span className="text-[12px] font-semibold whitespace-nowrap text-ink">
                          {formatNaira(product.price)}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              <button
                type="button"
                onClick={goToAll}
                className="flex w-full items-center justify-between gap-3 rounded-xl border border-line bg-canvas px-3.5 py-3 text-[12.5px] font-semibold text-ink transition hover:border-brand/30 hover:bg-brand-mist"
              >
                <span className="inline-flex items-center gap-2">
                  See all results in the shop directory
                  <ArrowUpRight className="size-3.5" />
                </span>
                <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-ink-mute">
                  <CornerDownLeft className="size-3" /> Enter
                </span>
              </button>

              <p className="px-2 pb-1 text-[10.5px] text-ink-mute">
                Showing {shops.length} sample shops and {allProducts.length} listings in this demo.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body,
  );
}
