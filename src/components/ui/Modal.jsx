import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { cn } from '../../lib/utils';

export default function Modal({ open, onClose, title, description, children, size = 'md', icon: Icon }) {
  const panelRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const timer = window.setTimeout(() => {
      const focusable = panelRef.current?.querySelector(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );
      focusable?.focus();
    }, 60);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = originalOverflow;
      window.clearTimeout(timer);
    };
  }, [open, onClose]);

  if (!open) return null;

  const widths = { sm: 'max-w-md', md: 'max-w-lg', lg: 'max-w-2xl' };

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-end justify-center px-0 sm:items-center sm:px-4">
      <button
        type="button"
        aria-label="Close dialog"
        className="animate-fade-in absolute inset-0 cursor-default bg-ink/40 backdrop-blur-[3px]"
        onClick={onClose}
        tabIndex={-1}
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={title || 'Dialog'}
        className={cn(
          'animate-scale-in relative max-h-[92vh] w-full overflow-y-auto rounded-t-[1.75rem] border border-line bg-white p-6 shadow-float sm:rounded-[1.75rem] sm:p-7',
          widths[size],
        )}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            {Icon && (
              <span className="mt-0.5 grid size-10 shrink-0 place-items-center rounded-2xl bg-brand-soft text-brand">
                <Icon className="size-5" strokeWidth={1.8} />
              </span>
            )}
            <div>
              {title && <h2 className="text-xl leading-tight font-semibold text-ink">{title}</h2>}
              {description && <p className="mt-1 text-[13px] leading-relaxed text-ink-soft">{description}</p>}
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="grid size-9 shrink-0 place-items-center rounded-full border border-line text-ink-soft transition hover:bg-canvas-deep hover:text-ink"
            aria-label="Close"
          >
            <X className="size-4" />
          </button>
        </div>
        <div className="mt-5">{children}</div>
      </div>
    </div>,
    document.body,
  );
}
