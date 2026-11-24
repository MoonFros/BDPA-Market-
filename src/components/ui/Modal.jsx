import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { cn } from '../../lib/utils';

function useOverlayBehaviour(open, onClose) {
  const panelRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (event) => {
      if (event.key === 'Escape') onClose?.();
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onKey);
    const focusTimer = window.setTimeout(() => panelRef.current?.focus(), 30);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = previousOverflow;
      window.clearTimeout(focusTimer);
    };
  }, [open, onClose]);

  return panelRef;
}

export default function Modal({
  open,
  onClose,
  children,
  className,
  label = 'Dialog',
  hideClose = false,
  closeLabel = 'Close dialog',
}) {
  const panelRef = useOverlayBehaviour(open, onClose);
  if (!open) return null;

  return createPortal(
    <div className="fixed inset-0 z-[90] flex items-end justify-center sm:items-center sm:p-6">
      <button
        type="button"
        aria-label={closeLabel}
        onClick={onClose}
        className="anim-fade absolute inset-0 cursor-default bg-ink/65 backdrop-blur-sm"
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={label}
        tabIndex={-1}
        className={cn(
          'anim-scale relative z-10 max-h-[92svh] w-full overflow-y-auto overscroll-contain rounded-t-[1.75rem] bg-paper shadow-float outline-none sm:max-w-2xl sm:rounded-[1.75rem]',
          className,
        )}
      >
        {!hideClose && (
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute top-4 right-4 z-20 grid size-9 place-items-center rounded-full bg-paper/90 text-ink shadow-soft ring-1 ring-line transition hover:bg-paper hover:text-terracotta"
          >
            <X className="size-4" />
          </button>
        )}
        {children}
      </div>
    </div>,
    document.body,
  );
}

export function Drawer({ open, onClose, children, label = 'Panel' }) {
  const panelRef = useOverlayBehaviour(open, onClose);
  if (!open) return null;

  return createPortal(
    <div className="fixed inset-0 z-[95]">
      <button
        type="button"
        aria-label="Close panel"
        onClick={onClose}
        className="anim-fade absolute inset-0 cursor-default bg-ink/60 backdrop-blur-[3px]"
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={label}
        tabIndex={-1}
        className="anim-drawer absolute inset-y-0 right-0 flex h-[100dvh] w-full max-w-[27rem] flex-col bg-paper shadow-float outline-none"
      >
        {children}
      </div>
    </div>,
    document.body,
  );
}
