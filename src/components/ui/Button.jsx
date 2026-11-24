import { Link } from 'react-router-dom';
import { cn } from '../../lib/utils';

const base =
  'group/btn inline-flex items-center justify-center gap-2 rounded-full font-semibold whitespace-nowrap transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2';

const variants = {
  primary:
    'bg-brand text-white shadow-[0_10px_24px_-14px_rgba(14,107,79,0.9)] hover:bg-brand-dark hover:shadow-[0_16px_30px_-14px_rgba(14,107,79,0.75)] active:scale-[0.985]',
  dark: 'bg-ink text-canvas hover:bg-brand-deep active:scale-[0.985]',
  outline:
    'border border-ink/15 bg-white/70 text-ink hover:border-brand/40 hover:bg-white hover:text-brand-dark active:scale-[0.985]',
  ghost: 'text-ink hover:bg-ink/[0.055]',
  soft: 'bg-brand-soft text-brand-dark hover:bg-brand/15',
  white: 'bg-white text-ink shadow-soft hover:bg-canvas hover:shadow-lift',
  'white-outline': 'border border-white/35 text-white hover:bg-white/10',
  accent:
    'bg-[var(--accent)] text-white shadow-[0_12px_28px_-16px_var(--accent)] hover:brightness-110 active:scale-[0.985]',
};

const sizes = {
  sm: 'h-9 px-4 text-[13px]',
  md: 'h-11 px-5 text-sm',
  lg: 'h-12 px-6 text-[15px]',
  xl: 'h-14 px-7 text-base',
  icon: 'size-10 p-0',
};

export default function Button({
  as,
  to,
  href,
  children,
  className,
  variant = 'primary',
  size = 'md',
  Icon,
  IconRight,
  icon,
  iconRight,
  ...props
}) {
  const classes = cn(base, variants[variant], sizes[size], className);
  const StartIcon = Icon || icon;
  const EndIcon = IconRight || iconRight;

  const content = (
    <>
      {StartIcon && <StartIcon className="size-[1.05em] shrink-0" strokeWidth={2} aria-hidden="true" />}
      {children}
      {EndIcon && (
        <EndIcon
          className="size-[1.05em] shrink-0 transition-transform duration-200 group-hover/btn:translate-x-0.5"
          strokeWidth={2}
          aria-hidden="true"
        />
      )}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {content}
      </a>
    );
  }

  const Tag = as || 'button';
  return (
    <Tag className={classes} {...props}>
      {content}
    </Tag>
  );
}
