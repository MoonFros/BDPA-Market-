import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { CheckCircle2, Info, X } from 'lucide-react';

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const dismiss = useCallback((id) => {
    setToasts((current) => current.filter((toast) => toast.id !== id));
  }, []);

  const toast = useCallback(
    ({ title, description, tone = 'default' }) => {
      const id = Math.random().toString(36).slice(2, 9);
      setToasts((current) => [...current.slice(-2), { id, title, description, tone }]);
      window.setTimeout(() => dismiss(id), 4200);
      return id;
    },
    [dismiss],
  );

  const value = useMemo(() => ({ toast }), [toast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div
        className="pointer-events-none fixed inset-x-4 bottom-24 z-[90] flex flex-col items-center gap-2 sm:inset-x-auto sm:right-6 sm:bottom-6 sm:items-end"
        role="status"
        aria-live="polite"
      >
        {toasts.map((item) => (
          <div
            key={item.id}
            className="animate-toast-in pointer-events-auto flex w-full max-w-sm items-start gap-3 rounded-2xl border border-line bg-white/95 p-4 shadow-lift backdrop-blur"
          >
            <span
              className={
                item.tone === 'info'
                  ? 'mt-0.5 grid size-8 shrink-0 place-items-center rounded-full bg-brand-soft text-brand'
                  : 'mt-0.5 grid size-8 shrink-0 place-items-center rounded-full bg-brand-soft text-brand'
              }
            >
              {item.tone === 'info' ? (
                <Info className="size-4" strokeWidth={2} />
              ) : (
                <CheckCircle2 className="size-4" strokeWidth={2} />
              )}
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-ink">{item.title}</p>
              {item.description && (
                <p className="mt-0.5 text-xs leading-relaxed text-ink-soft">{item.description}</p>
              )}
            </div>
            <button
              type="button"
              onClick={() => dismiss(item.id)}
              className="rounded-full p-1 text-ink-mute transition hover:bg-canvas-deep hover:text-ink"
              aria-label="Dismiss notification"
            >
              <X className="size-4" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) throw new Error('useToast must be used inside ToastProvider');
  return context;
}
