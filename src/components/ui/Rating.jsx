import { Star } from 'lucide-react';
import { cn } from '../../lib/utils';

export default function Rating({ value, count, className, compact = false }) {
  return (
    <span className={cn('inline-flex items-center gap-1.5 text-ink-soft', className)}>
      <Star className="size-3.5 fill-gold text-gold" strokeWidth={1.5} />
      <span className="text-[13px] font-semibold text-ink">{value.toFixed(1)}</span>
      {!compact && count != null && (
        <span className="text-[12px] text-ink-mute">({count})</span>
      )}
    </span>
  );
}
