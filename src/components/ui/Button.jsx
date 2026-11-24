import { cn } from '../../lib/utils';

const variants = {
  primary:
    'bg-terracotta text-cream shadow-[0_16px_30px_-18px_rgba(141,58,32,0.9)] hover:bg-terracotta-deep hover:-translate-y-0.5',
  olive: 'bg-olive text-cream shadow-[0_16px_30px_-20px_rgba(59,70,42,0.9)] hover:bg-olive-deep hover:-translate-y-0.5',
  dark: 'bg-ink text-cream hover:bg-ink/85 hover:-translate-y-0.5',
  light: 'bg-paper text-ink shadow-soft hover:bg-white hover:-translate-y-0.5',
  outline: 'border border-ink/20 text-ink hover:border-ink/50 hover:bg-ink hover:text-cream',
  outlineLight: 'border border-cream/35 text-cream backdrop-blur-sm hover:bg-cream hover:text-ink',
  ghost: 'text-ink hover:bg-ink/5',
  ghostLight: 'text-cream hover:bg-cream/10',
};

const sizes = {
  sm: 'h-9 px-4 text-[12px]',
  md: 'h-11 px-5 text-[13px]',
  lg: 'h-12 px-6 text-[13.5px] sm:h-[3.25rem] sm:px-7 sm:text-sm',
  icon: 'size-10 p-0',
};

export default function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  href,
  type = 'button',
  ...rest
}) {
  const Tag = href ? 'a' : 'button';
  return (
    <Tag
      href={href}
      type={href ? undefined : type}
      className={cn(
        'inline-flex shrink-0 items-center justify-center gap-2 rounded-full font-semibold whitespace-nowrap transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-55',
        variants[variant],
        sizes[size],
        className,
      )}
      {...rest}
    >
      {children}
    </Tag>
  );
}
