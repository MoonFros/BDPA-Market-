import { Link } from 'react-router-dom';
import { cn } from '../../lib/utils';

export function LogoGlyph({ className }) {
  return (
    <span
      className={cn(
        'grid size-10 shrink-0 place-items-center rounded-[0.9rem] bg-brand text-canvas shadow-[0_10px_20px_-12px_rgba(14,107,79,0.9)]',
        className,
      )}
      aria-hidden="true"
    >
      <svg viewBox="0 0 24 24" className="size-5" fill="none">
        <path
          d="M4 10h16l-1.3-4.2A2 2 0 0 0 16.8 4.3H7.2a2 2 0 0 0-1.9 1.5L4 10Z"
          fill="currentColor"
        />
        <path d="M5.4 11.5h13.2v6.3a1.7 1.7 0 0 1-1.7 1.7H7.1a1.7 1.7 0 0 1-1.7-1.7v-6.3Z" fill="currentColor" opacity=".55" />
        <path d="M9.6 19.5v-4.6h4.8v4.6" fill="#0E6B4F" />
      </svg>
    </span>
  );
}

export default function BrandMark({ className, dark = false, compact = false }) {
  return (
    <Link
      to="/"
      className={cn('group flex min-w-0 items-center gap-2 rounded-xl focus-visible:outline-offset-4 sm:gap-2.5', className)}
      aria-label="BDPA Market — home"
    >
      <LogoGlyph className="size-9 transition-transform duration-300 group-hover:-rotate-3 sm:size-10" />
      <span className="flex min-w-0 flex-col leading-none">
        <span
          className={cn(
            'truncate font-display text-[16.5px] font-semibold tracking-tight sm:text-[19px]',
            dark ? 'text-white' : 'text-ink',
          )}
        >
          BDPA <span className={dark ? 'text-white/60' : 'text-brand'}>Market</span>
        </span>
        {!compact && (
          <span
            className={cn(
              'mt-1 hidden text-[9px] font-semibold tracking-[0.16em] uppercase sm:block',
              dark ? 'text-white/45' : 'text-ink-mute',
            )}
          >
            Shopping Complex · Benin City
          </span>
        )}
      </span>
    </Link>
  );
}
