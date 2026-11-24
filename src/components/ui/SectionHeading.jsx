import { cn } from '../../lib/utils';

export default function SectionHeading({ eyebrow, title, description, action, align = 'left', className }) {
  return (
    <div
      className={cn(
        'flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between',
        align === 'center' && 'sm:flex-col sm:items-center sm:text-center',
        className,
      )}
    >
      <div className={cn('max-w-2xl', align === 'center' && 'mx-auto')}>
        {eyebrow && (
          <p className="mb-3 flex items-center gap-2 text-[11px] font-semibold tracking-[0.18em] text-brand uppercase">
            <span className="h-px w-6 bg-brand/40" />
            {eyebrow}
          </p>
        )}
        <h2 className="text-[clamp(1.75rem,3.4vw,2.6rem)] leading-[1.08] font-semibold">{title}</h2>
        {description && <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">{description}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
