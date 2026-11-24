import { cn, scrollToId } from '../../lib/utils';

export default function Logo({ tone = 'dark', className, onClick }) {
  const light = tone === 'light';
  return (
    <button
      type="button"
      onClick={() => {
        onClick?.();
        scrollToId('site-top');
      }}
      aria-label="SAVORA — back to top"
      className={cn('group flex items-center gap-2.5 text-left', className)}
    >
      <span
        className={cn(
          'grid size-9 place-items-center rounded-full font-display text-[17px] leading-none font-semibold transition-transform duration-500 group-hover:rotate-[-6deg] sm:size-10',
          light ? 'bg-cream text-terracotta' : 'bg-terracotta text-cream',
        )}
      >
        S
      </span>
      <span className="leading-none">
        <span
          className={cn(
            'block font-display text-[16.5px] font-semibold tracking-[0.3em] sm:text-[18px]',
            light ? 'text-cream' : 'text-ink',
          )}
        >
          SAVORA
        </span>
        <span
          className={cn(
            'mt-1 block text-[7px] font-bold tracking-[0.46em] uppercase sm:text-[7.5px]',
            light ? 'text-cream/55' : 'text-ink-mute',
          )}
        >
          Benin City
        </span>
      </span>
    </button>
  );
}
