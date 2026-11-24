import { cn } from '../../lib/utils';

export default function SectionHeading({
  eyebrow,
  title,
  intro,
  align = 'left',
  tone = 'dark',
  className,
  children,
}) {
  const light = tone === 'light';
  return (
    <div
      className={cn(
        'flex flex-col gap-4',
        align === 'center' && 'items-center text-center',
        className,
      )}
    >
      {eyebrow && (
        <span className={cn('eyebrow', light ? 'text-cream/70' : 'text-terracotta')}>{eyebrow}</span>
      )}
      <h2
        className={cn(
          'max-w-2xl text-[clamp(1.9rem,4.4vw,3.1rem)] leading-[1.06] font-semibold',
          light && 'text-cream',
        )}
      >
        {title}
      </h2>
      {intro && (
        <p
          className={cn(
            'max-w-xl text-[14px] leading-relaxed sm:text-[15px]',
            light ? 'text-cream/70' : 'text-ink-soft',
            align === 'center' && 'mx-auto',
          )}
        >
          {intro}
        </p>
      )}
      {children}
    </div>
  );
}
