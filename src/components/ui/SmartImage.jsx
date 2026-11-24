import { useState } from 'react';
import { ImageOff } from 'lucide-react';
import { cn } from '../../lib/utils';

/** Image with a warm skeleton and a graceful fallback. */
export default function SmartImage({
  src,
  alt = '',
  className,
  imgClassName,
  eager = false,
  sizes,
  position = '50% 50%',
  children,
}) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  return (
    <div className={cn('relative overflow-hidden bg-cream-deep', className)}>
      {!loaded && !failed && (
        <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-cream-deep via-line-soft to-line/70" />
      )}

      {failed ? (
        <div className="absolute inset-0 grid place-items-center bg-cream-deep text-ink-mute">
          <ImageOff className="size-7" strokeWidth={1.4} aria-hidden="true" />
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          sizes={sizes}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          fetchPriority={eager ? 'high' : 'auto'}
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
          style={{ objectPosition: position }}
          className={cn(
            'h-full w-full object-cover transition-opacity duration-700',
            loaded ? 'opacity-100' : 'opacity-0',
            imgClassName,
          )}
        />
      )}
      {children}
    </div>
  );
}
