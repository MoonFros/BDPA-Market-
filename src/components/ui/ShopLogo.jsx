import { cn } from '../../lib/utils';

const sizes = {
  sm: 'size-9 rounded-xl text-[13px]',
  md: 'size-12 rounded-2xl text-base',
  lg: 'size-16 rounded-[1.25rem] text-xl',
  xl: 'size-20 rounded-[1.5rem] text-2xl',
};

/** Monogram identity tile — keeps storefronts distinct without needing logo files. */
export default function ShopLogo({ shop, size = 'md', className, ring = true }) {
  return (
    <span
      className={cn(
        'inline-grid shrink-0 place-items-center font-display font-semibold tracking-tight',
        sizes[size],
        ring && 'ring-1 ring-black/[0.06]',
        className,
      )}
      style={{
        background: shop.accentSoft,
        color: shop.accentInk,
        boxShadow: size === 'xl' ? '0 18px 36px -22px rgba(21,33,27,.45)' : undefined,
      }}
      aria-hidden="true"
    >
      {shop.monogram}
    </span>
  );
}
