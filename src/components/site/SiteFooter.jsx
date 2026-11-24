import { ArrowUpRight, Columns3, Facebook, Instagram, Music2, RefreshCw } from 'lucide-react';
import Logo from './Logo';
import { useDemo } from '../../context/DemoContext';
import { demoDisclaimer, restaurant } from '../../data/restaurant';
import { packageById } from '../../data/packages';
import { cn, scrollToId } from '../../lib/utils';

const socialIcons = { Instagram, Facebook, TikTok: Music2 };

function SocialRow({ tone }) {
  return (
    <div className="flex items-center gap-2">
      {restaurant.socials.map((social) => {
        const Icon = socialIcons[social.label] ?? Instagram;
        return (
          <span
            key={social.label}
            title={`${social.label} ${social.handle} · sample link`}
            className={cn(
              'grid size-8 place-items-center rounded-full border transition',
              tone === 'light'
                ? 'border-cream/20 text-cream/70'
                : 'border-line bg-paper/60 text-ink-soft',
            )}
          >
            <Icon className="size-3.5" />
            <span className="sr-only">
              {social.label} ({social.handle}) — demonstration only
            </span>
          </span>
        );
      })}
    </div>
  );
}

export default function SiteFooter({ variant = 'essential' }) {
  const premium = variant === 'premium';
  const { setPkg, setSwitchOpen, setCompareOpen, pkg } = useDemo();
  const current = packageById(pkg);
  const other = pkg === 'premium' ? 'essential' : 'premium';

  const go = (id) => scrollToId(id);

  return (
    <footer
      className={cn(
        'relative overflow-hidden border-t',
        premium ? 'border-ink/40 bg-ink text-cream' : 'border-line bg-cream-deep text-ink',
      )}
    >
      <div className="mx-auto max-w-7xl px-4 pt-12 pb-8 sm:px-6 lg:pt-16">
        <div className={cn('grid gap-10', premium ? 'md:grid-cols-2 lg:grid-cols-4' : 'md:grid-cols-3')}>
          <div className="lg:pr-6">
            <Logo tone={premium ? 'light' : 'dark'} />
            <p
              className={cn(
                'mt-4 max-w-xs text-[12.5px] leading-relaxed',
                premium ? 'text-cream/60' : 'text-ink-soft',
              )}
            >
              {restaurant.shortDescription}
            </p>
            <p
              className={cn(
                'mt-4 inline-flex items-center gap-1.5 text-[11px]',
                premium ? 'text-cream/50' : 'text-ink-mute',
              )}
            >
              <span className="size-1.5 rounded-full bg-terracotta" />
              {restaurant.tagline}
            </p>
            <div className="mt-5">
              <SocialRow tone={premium ? 'light' : 'dark'} />
            </div>
          </div>

          <div>
            <h3
              className={cn(
                'text-[10px] font-bold tracking-[0.18em] uppercase',
                premium ? 'text-cream/45' : 'text-ink-mute',
              )}
            >
              Explore
            </h3>
            <ul className={cn('mt-4 space-y-2.5 text-[12.5px]', premium ? 'text-cream/75' : 'text-ink-soft')}>
              {(premium
                ? [
                    ['Home', 'top'],
                    ['Our Menu', 'menu'],
                    ['Gallery', 'gallery'],
                    ['About', 'about'],
                    ['Reservations', 'reserve'],
                  ]
                : [
                    ['Home', 'top'],
                    ['About', 'about'],
                    ['What we offer', 'services'],
                    ['Contact', 'contact'],
                    ['Find us', 'visit'],
                  ]
              ).map(([label, id]) => (
                <li key={id}>
                  <button
                    type="button"
                    onClick={() => go(id)}
                    className={cn(
                      'transition',
                      premium ? 'hover:text-cream' : 'hover:text-terracotta',
                    )}
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {premium && (
            <div>
              <h3 className="text-[10px] font-bold tracking-[0.18em] text-cream/45 uppercase">
                Menu shortcuts
              </h3>
              <ul className="mt-4 space-y-2.5 text-[12.5px] text-cream/75">
                {[
                  ['Signature dishes', 'menu'],
                  ['Nigerian specials', 'menu'],
                  ['Grills & BBQ', 'menu'],
                  ['Drinks & desserts', 'menu'],
                ].map(([label, id]) => (
                  <li key={label}>
                    <button
                      type="button"
                      onClick={() => go(id)}
                      className="transition hover:text-cream"
                    >
                      {label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div>
            <h3
              className={cn(
                'text-[10px] font-bold tracking-[0.18em] uppercase',
                premium ? 'text-cream/45' : 'text-ink-mute',
              )}
            >
              Visit & contact
            </h3>
            <ul
              className={cn(
                'mt-4 space-y-2.5 text-[12.5px] leading-relaxed',
                premium ? 'text-cream/75' : 'text-ink-soft',
              )}
            >
              <li>{restaurant.address}</li>
              <li>
                {restaurant.phone} <span className={premium ? 'text-cream/40' : 'text-ink-mute'}>(demo)</span>
              </li>
              <li>{restaurant.email}</li>
              <li className={premium ? 'text-cream/50' : 'text-ink-mute'}>
                Mon – Thu 10:00 – 22:00
                <br />
                Fri – Sat 10:00 – 23:30 · Sun 12:00 – 21:00
              </li>
            </ul>
          </div>
        </div>

        <div
          className={cn(
            'mt-10 rounded-2xl border p-4 sm:p-5',
            premium ? 'border-cream/12 bg-cream/[0.04]' : 'border-line bg-paper/70',
          )}
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p
                className={cn(
                  'flex items-center gap-2 text-[9.5px] font-bold tracking-[0.16em] uppercase',
                  premium ? 'text-cream/50' : 'text-ink-mute',
                )}
              >
                <Columns3 className="size-3.5 text-terracotta" /> Website package demonstration
              </p>
              <p className={cn('mt-1.5 text-[12.5px]', premium ? 'text-cream/75' : 'text-ink-soft')}>
                You are viewing <span className="font-semibold">{current.name}</span> · {current.label}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => { setPkg(other); scrollToId('site-top'); }}
                className={cn(
                  'inline-flex h-9 items-center gap-1.5 rounded-full border px-3.5 text-[11.5px] font-semibold transition',
                  premium
                    ? 'border-cream/25 text-cream hover:bg-cream hover:text-ink'
                    : 'border-ink/20 text-ink hover:bg-ink hover:text-cream',
                )}
              >
                View {other === 'premium' ? 'Premium' : 'Essential'} package
                <ArrowUpRight className="size-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setCompareOpen(true)}
                className={cn(
                  'inline-flex h-9 items-center gap-1.5 rounded-full px-3 text-[11.5px] font-semibold transition',
                  premium ? 'text-cream/60 hover:text-cream' : 'text-ink-mute hover:text-ink',
                )}
              >
                Compare
              </button>
              <button
                type="button"
                onClick={() => setSwitchOpen(true)}
                className={cn(
                  'inline-flex h-9 items-center gap-1.5 rounded-full px-3 text-[11.5px] font-semibold transition',
                  premium ? 'text-cream/60 hover:text-cream' : 'text-ink-mute hover:text-ink',
                )}
              >
                <RefreshCw className="size-3.5" /> Switch package
              </button>
            </div>
          </div>
          <p
            className={cn(
              'mt-3 border-t pt-3 text-[10.5px] leading-relaxed',
              premium ? 'border-cream/10 text-cream/40' : 'border-line text-ink-mute',
            )}
          >
            {demoDisclaimer}
          </p>
        </div>

        <div
          className={cn(
            'mt-6 flex flex-col gap-2 border-t pt-5 text-[10.5px] sm:flex-row sm:items-center sm:justify-between',
            premium ? 'border-cream/10 text-cream/40' : 'border-line text-ink-mute',
          )}
        >
          <p>© {new Date().getFullYear()} SAVORA — fictional restaurant demonstration.</p>
          <p className="flex items-center gap-1.5">
            <span className="size-1.5 rounded-full bg-olive" />
            {restaurant.city}, {restaurant.region}
          </p>
        </div>
      </div>
    </footer>
  );
}
