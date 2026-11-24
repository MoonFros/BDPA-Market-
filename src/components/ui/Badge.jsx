import { cn } from '../../lib/utils';

const tones = {
  neutral: 'bg-canvas-deep text-ink-soft ring-line',
  brand: 'bg-brand-soft text-brand-dark ring-brand/15',
  white: 'bg-white/85 text-ink ring-white/60 backdrop-blur',
  accent: 'bg-[var(--accent-soft)] text-[var(--accent-ink)] ring-[var(--accent)]/15',
  dark: 'bg-ink/85 text-canvas ring-white/10 backdrop-blur',
  outline: 'bg-transparent text-ink-soft ring-ink/15',
};

export default function Badge({ children, tone = 'neutral', className, dot = false }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] leading-none font-semibold tracking-[0.02em] ring-1 ring-inset',
        tones[tone],
        className,
      )}
    >
      {dot && <span className="size-1.5 rounded-full bg-current opacity-70" />}
      {children}
    </span>
  );
}
