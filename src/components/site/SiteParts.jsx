import { ChevronDown, Clock, Info, Mail, MapPin, Navigation, Phone, Star } from 'lucide-react';
import { useDemo } from '../../context/DemoContext';
import { packageById } from '../../data/packages';
import { restaurant } from '../../data/restaurant';
import { cn } from '../../lib/utils';

export function DemoBand() {
  const { pkg, setSwitchOpen } = useDemo();
  const current = packageById(pkg);

  return (
    <div className="border-b border-line bg-cream-deep/45">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-2.5 gap-y-1 px-4 py-2 sm:px-6">
        <span className="inline-flex items-center gap-1.5 text-[9px] font-bold tracking-[0.18em] text-ink-mute uppercase">
          <span className="size-1.5 rounded-full bg-terracotta" />
          Previewing package {current.number}
        </span>
        <span className="hidden text-[11px] text-ink-soft sm:inline">· {current.name}</span>
        <span className="hidden text-[10px] text-ink-mute md:inline">· sample restaurant data</span>
        <button
          type="button"
          onClick={() => setSwitchOpen(true)}
          className="ml-auto inline-flex items-center gap-1 text-[10.5px] font-semibold text-terracotta transition hover:text-terracotta-deep"
        >
          Switch package <ChevronDown className="size-3" />
        </button>
      </div>
    </div>
  );
}

export function RatingBadge({ tone = 'dark', className }) {
  return (
    <span className={cn('inline-flex items-center gap-1.5', className)}>
      <Star className="size-3.5 fill-gold text-gold" strokeWidth={0} />
      <span className={cn('font-semibold', tone === 'light' ? 'text-cream' : 'text-ink')}>
        {restaurant.rating}
      </span>
      <span className={tone === 'light' ? 'text-cream/55' : 'text-ink-mute'}>
        ({restaurant.reviews} sample reviews)
      </span>
    </span>
  );
}

export function HoursList({ tone = 'dark', className }) {
  return (
    <ul className={cn('divide-y', tone === 'light' ? 'divide-cream/15' : 'divide-line-soft', className)}>
      {restaurant.hours.map((slot) => (
        <li key={slot.days} className="flex items-center justify-between gap-3 py-2 text-[12px]">
          <span className={tone === 'light' ? 'text-cream/70' : 'text-ink-soft'}>{slot.days}</span>
          <span className={cn('font-semibold', tone === 'light' ? 'text-cream' : 'text-ink')}>{slot.time}</span>
        </li>
      ))}
    </ul>
  );
}

export function DemoNote({ className, children }) {
  return (
    <p className={cn('flex items-start gap-1.5 text-[10.5px] leading-relaxed text-ink-mute', className)}>
      <Info className="mt-px size-3.5 shrink-0 text-olive" />
      {children ?? 'Sample restaurant data — this is a website demonstration.'}
    </p>
  );
}

export function MapCard({ className, tone = 'light' }) {
  const query = encodeURIComponent(restaurant.address);

  return (
    <div className={cn('relative overflow-hidden rounded-2xl border border-line bg-olive-soft/40', className)}>
      <svg
        viewBox="0 0 420 320"
        className="absolute inset-0 h-full w-full"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <rect width="420" height="320" fill="#eef0e2" />
        <g stroke="#d8dcc6" strokeWidth="12" strokeLinecap="round">
          <path d="M-30 86 L450 52" />
          <path d="M64 -20 L112 340" />
          <path d="M-20 232 L440 276" />
          <path d="M300 -20 L344 340" />
        </g>
        <g stroke="#e6e9d8" strokeWidth="5" strokeLinecap="round">
          <path d="M-10 160 L430 128" />
          <path d="M196 -10 L226 330" />
        </g>
        <g fill="#e2e6d4">
          <rect x="132" y="176" width="52" height="38" rx="4" />
          <rect x="240" y="182" width="46" height="32" rx="4" />
          <rect x="150" y="94" width="34" height="26" rx="4" />
          <rect x="248" y="86" width="38" height="30" rx="4" />
          <rect x="70" y="252" width="60" height="30" rx="4" />
        </g>
        <circle cx="212" cy="152" r="30" fill="#b04a2c" opacity="0.12" />
        <circle cx="212" cy="152" r="16" fill="#b04a2c" opacity="0.2" />
        <circle cx="212" cy="152" r="7" fill="#b04a2c" />
      </svg>

      <div className="relative flex h-full flex-col justify-between p-4">
        <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-paper/90 px-2.5 py-1 text-[9.5px] font-bold tracking-[0.12em] text-ink uppercase shadow-soft backdrop-blur">
          <MapPin className="size-3 text-terracotta" /> Map placeholder
        </span>

        <div className="mt-10 flex flex-col gap-2 rounded-xl border border-line/80 bg-paper/95 p-3 shadow-soft backdrop-blur">
          <div>
            <p className="font-display text-[14px] font-semibold">{restaurant.name}</p>
            <p className="mt-0.5 text-[11px] leading-relaxed text-ink-soft">{restaurant.address}</p>
          </div>
          <div className="flex items-center justify-between gap-2 border-t border-line-soft pt-2">
            <span className="text-[9.5px] tracking-wide text-ink-mute uppercase">Demo location</span>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${query}`}
              target="_blank"
              rel="noreferrer"
              className={cn(
                'inline-flex items-center gap-1 text-[10.5px] font-semibold transition hover:underline',
                tone === 'light' ? 'text-terracotta' : 'text-terracotta',
              )}
            >
              <Navigation className="size-3" /> Open in Maps
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ContactLines({ tone = 'dark', withIcons = false }) {
  const light = tone === 'light';
  const items = [
    { label: 'Address', value: restaurant.address, icon: MapPin },
    { label: 'Telephone', value: `${restaurant.phone} (demo)`, icon: Phone },
    { label: 'Email', value: restaurant.email, icon: Mail },
  ];

  return (
    <ul className="space-y-3.5">
      {items.map(({ label, value, icon: Icon }) => (
        <li key={label} className="flex gap-3">
          {withIcons && (
            <span
              className={cn(
                'mt-0.5 grid size-8 shrink-0 place-items-center rounded-full',
                light ? 'bg-cream/10 text-cream/70' : 'bg-cream-deep text-terracotta',
              )}
            >
              <Icon className="size-3.5" />
            </span>
          )}
          <div>
            <p
              className={cn(
                'text-[9px] font-bold tracking-[0.16em] uppercase',
                light ? 'text-cream/45' : 'text-ink-mute',
              )}
            >
              {label}
            </p>
            <p className={cn('mt-0.5 text-[12.5px] leading-relaxed', light ? 'text-cream/85' : 'text-ink')}>
              {value}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
}
