import { useState } from 'react';
import { ImageOff } from 'lucide-react';
import { cn } from '../../lib/utils';

/**
 * Image with a designed loading shimmer and a graceful branded fallback so a
 * missing photograph never breaks the layout.
 */
export default function SmartImage({
  src,
  alt = '',
  className,
  imgClassName,
  icon: Icon = ImageOff,
  fallbackLabel,
  eager = false,
  sizes,
  compact = false,
}) {
  const [status, setStatus] = useState('loading');

  return (
    <div className={cn('relative overflow-hidden bg-canvas-deep', className)}>
      {status === 'loading' && (
        <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
          <div className="absolute inset-0 bg-gradient-to-br from-canvas-deep via-sand/70 to-canvas-deep" />
          <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.8s_infinite] bg-gradient-to-r from-transparent via-white/50 to-transparent" />
        </div>
      )}

      {status === 'error' ? (
        compact ? (
          <div className="absolute inset-0 grid place-items-center text-ink-mute/70">
            <Icon className="size-[38%] max-h-5 max-w-5" strokeWidth={1.5} />
          </div>
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 px-2 text-center">
            <span className="grid size-11 max-h-[38%] max-w-[38%] place-items-center rounded-full bg-white/70 text-ink-mute ring-1 ring-line">
              <Icon className="size-[45%]" strokeWidth={1.5} />
            </span>
            {(fallbackLabel || alt) && (
              <span className="line-clamp-2 max-w-[85%] text-[10.5px] leading-tight font-medium tracking-wide text-ink-mute uppercase">
                {fallbackLabel || alt}
              </span>
            )}
          </div>
        )
      ) : (
        <img
          src={src}
          alt={alt}
          sizes={sizes}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          onLoad={() => setStatus('loaded')}
          onError={() => setStatus('error')}
          className={cn(
            'size-full object-cover transition-[opacity,transform] duration-700',
            status === 'loaded' ? 'opacity-100' : 'opacity-0',
            imgClassName,
          )}
        />
      )}
    </div>
  );
}
