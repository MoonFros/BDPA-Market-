import { cn } from '../../lib/utils';

export const controlClass =
  'w-full rounded-xl border border-line bg-paper px-3.5 py-2.5 text-[13.5px] text-ink shadow-[0_1px_0_rgba(25,22,18,0.02)] transition placeholder:text-ink-mute focus:border-terracotta/60 focus:ring-2 focus:ring-terracotta/15 focus:outline-none';

export function Field({ id, label, error, hint, required, className, children }) {
  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      <label htmlFor={id} className="text-[11.5px] font-semibold tracking-wide text-ink-soft">
        {label}
        {required && <span className="ml-1 text-terracotta">*</span>}
      </label>
      {children}
      {error ? (
        <p className="text-[11px] font-medium text-terracotta" role="alert">
          {error}
        </p>
      ) : hint ? (
        <p className="text-[11px] text-ink-mute">{hint}</p>
      ) : null}
    </div>
  );
}

export function TextInput({ error, className, ...rest }) {
  return (
    <input
      className={cn(controlClass, error && 'border-terracotta/70 ring-1 ring-terracotta/10', className)}
      {...rest}
    />
  );
}

export function TextArea({ error, className, ...rest }) {
  return (
    <textarea
      className={cn(controlClass, 'resize-none leading-relaxed', error && 'border-terracotta/70', className)}
      {...rest}
    />
  );
}

export function Select({ error, className, children, ...rest }) {
  return (
    <select className={cn(controlClass, 'pr-8', error && 'border-terracotta/70', className)} {...rest}>
      {children}
    </select>
  );
}
