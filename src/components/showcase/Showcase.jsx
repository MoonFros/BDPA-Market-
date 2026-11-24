import { ArrowRight, ArrowUpRight, Check, Columns3, Minus, Sparkles } from 'lucide-react';
import Button from '../ui/Button';
import Modal from '../ui/Modal';
import SmartImage from '../ui/SmartImage';
import Logo from '../site/Logo';
import { comparisonRows, packageById, packages } from '../../data/packages';
import { useDemo } from '../../context/DemoContext';
import { cn, scrollToId } from '../../lib/utils';
import { siteMeta } from '../../data/restaurant';

export function ShowcaseTopBar() {
  const { setCompareOpen } = useDemo();

  return (
    <header className="relative z-40 border-b border-line bg-cream-deep/60">
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3 sm:px-6">
        <div className="scale-[0.92] sm:scale-100">
          <Logo />
        </div>
        <span className="hidden text-[10px] font-semibold tracking-[0.24em] text-ink-mute uppercase md:block">
          {siteMeta.demoTitle}
        </span>
        <div className="ml-auto flex items-center gap-2">
          <span className="hidden items-center gap-1.5 rounded-full border border-line bg-paper/70 px-2.5 py-1 text-[10px] font-semibold tracking-[0.14em] text-ink-mute uppercase sm:inline-flex">
            <Sparkles className="size-3 text-terracotta" /> Demo only
          </span>
          <Button variant="outline" size="sm" onClick={() => setCompareOpen(true)}>
            <Columns3 className="size-3.5" />
            <span className="hidden sm:inline">Compare packages</span>
            <span className="sm:hidden">Compare</span>
          </Button>
        </div>
      </div>
    </header>
  );
}

function PackageCardMeta({ pkg, active, onSelect }) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={active}
      className={cn(
        'group relative flex h-full flex-col overflow-hidden rounded-[1.6rem] border bg-paper text-left transition-all duration-500',
        active
          ? 'border-terracotta/60 shadow-lift ring-1 ring-terracotta/25'
          : 'border-line hover:-translate-y-1 hover:border-ink/20 hover:shadow-lift',
      )}
    >
      <div className="relative">
        <SmartImage
          src={pkg.image}
          alt={`${pkg.name} preview`}
          className="aspect-[16/9] w-full sm:aspect-[16/8]"
          imgClassName="transition-transform duration-[900ms] group-hover:scale-[1.04]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/10 to-transparent" />
        <span className="absolute top-3.5 left-3.5 rounded-full bg-cream/95 px-3 py-1 text-[9.5px] font-bold tracking-[0.18em] text-ink uppercase">
          {pkg.label}
        </span>
        {active && (
          <span className="absolute top-3.5 right-3.5 inline-flex items-center gap-1.5 rounded-full bg-terracotta px-2.5 py-1 text-[9.5px] font-bold tracking-[0.14em] text-cream uppercase shadow-soft">
            <Check className="size-3" strokeWidth={3} /> Viewing now
          </span>
        )}
        <div className="absolute inset-x-4 bottom-3.5 flex items-end justify-between gap-3">
          <h3 className="font-display text-[1.35rem] leading-tight font-semibold text-cream sm:text-[1.5rem]">
            {pkg.name}
          </h3>
          <span className="hidden shrink-0 text-[10px] font-semibold tracking-[0.18em] text-cream/60 uppercase sm:block">
            {pkg.number}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <p className="text-[12.5px] leading-relaxed text-ink-soft sm:text-[13px]">{pkg.description}</p>

        <ul className="mt-4 grid gap-1.5 text-[11.5px] text-ink-soft sm:grid-cols-2 sm:gap-x-4 sm:text-[11.5px]">
          {pkg.features.map((feature) => (
            <li key={feature} className="flex items-start gap-1.5">
              <Check className="mt-[2px] size-3 shrink-0 text-olive" strokeWidth={2.6} />
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        <div className="mt-4 flex items-center justify-between gap-2 border-t border-line-soft pt-3.5">
          <span className="text-[10.5px] tracking-wide text-ink-mute">{pkg.ideal}</span>
          <span className="inline-flex shrink-0 items-center gap-1 text-[12px] font-semibold text-terracotta">
            {active ? 'Viewing' : 'Open demo'}
            <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>
    </button>
  );
}

export function PackageSwitcher() {
  const { pkg, setPkg, setCompareOpen } = useDemo();

  const select = (id) => {
    if (id !== pkg) setPkg(id);
    window.setTimeout(() => scrollToId('site-top'), 60);
  };

  return (
    <section id="packages" className="relative overflow-hidden border-b border-line bg-cream">
      <div
        className="pointer-events-none absolute -top-32 -right-24 size-[30rem] rounded-full bg-terracotta-soft/60 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-40 -left-32 size-[26rem] rounded-full bg-olive-soft/70 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-4 pt-10 pb-10 sm:px-6 sm:pt-12 lg:pt-16 lg:pb-14">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
          <div className="max-w-3xl">
            <span className="eyebrow text-terracotta">Website packages</span>
            <h1 className="mt-4 text-[clamp(2.15rem,5.6vw,4.1rem)] leading-[0.98] font-semibold">
              {siteMeta.switcherTitle}
            </h1>
            <p className="mt-4 max-w-xl text-[14.5px] leading-relaxed text-ink-soft sm:text-base">
              {siteMeta.switcherIntro}
            </p>
          </div>

          <div className="hidden w-[19rem] shrink-0 rounded-2xl border border-line bg-paper/70 p-4 backdrop-blur lg:block">
            <p className="text-[9px] font-bold tracking-[0.18em] text-ink-mute uppercase">
              How this demonstration works
            </p>
            <ul className="mt-3 space-y-2.5">
              {[
                ['One restaurant, two builds', 'Same logo, photography and tone of voice.'],
                ['Switch at any time', 'The package control stays in the site header.'],
                ['Sample data throughout', 'No real orders, payments or messages.'],
              ].map(([title, copy]) => (
                <li key={title} className="flex gap-2.5">
                  <Check className="mt-0.5 size-3.5 shrink-0 text-olive" strokeWidth={2.6} />
                  <div>
                    <p className="text-[11.5px] font-semibold text-ink">{title}</p>
                    <p className="text-[10.5px] leading-snug text-ink-soft">{copy}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-7 grid gap-4 md:grid-cols-2 lg:gap-6">
          {packages.map((item) => (
            <PackageCardMeta
              key={item.id}
              pkg={item}
              active={pkg === item.id}
              onSelect={() => select(item.id)}
            />
          ))}
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-md text-[11.5px] leading-relaxed text-ink-mute">
            Both packages share the same SAVORA identity, photography and brand voice. Only the
            depth of the experience changes.
          </p>
          <button
            type="button"
            onClick={() => setCompareOpen(true)}
            className="inline-flex w-fit items-center gap-1.5 text-[12.5px] font-semibold text-ink transition hover:text-terracotta"
          >
            Compare the two packages
            <ArrowUpRight className="size-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
}

export function CompareDialog() {
  const { compareOpen, setCompareOpen, pkg, setPkg } = useDemo();

  return (
    <Modal
      open={compareOpen}
      onClose={() => setCompareOpen(false)}
      label="Compare restaurant website packages"
      className="sm:max-w-3xl"
    >
      <div className="border-b border-line-soft px-5 pt-6 pb-5 sm:px-8 sm:pt-8">
        <span className="eyebrow text-terracotta">Side by side</span>
        <h2 className="mt-3 text-[clamp(1.5rem,4vw,2rem)] leading-tight font-semibold">
          What each package includes
        </h2>
        <p className="mt-2 max-w-lg text-[12.5px] leading-relaxed text-ink-soft">
          Both packages include the same considered design language. Premium adds the menu
          experience, ordering demonstration and reservation flow.
        </p>
      </div>

      <div className="px-3 pb-2 sm:px-6">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="text-[10px] font-bold tracking-[0.14em] text-ink-mute uppercase">
              <th className="px-2 py-3 font-semibold sm:px-3">Feature</th>
              <th className="w-[24%] px-1 py-3 text-center font-semibold">Essential</th>
              <th className="w-[24%] px-1 py-3 text-center font-semibold text-terracotta">Premium</th>
            </tr>
          </thead>
          <tbody>
            {comparisonRows.map((row) => (
              <tr key={row.feature} className="border-t border-line-soft">
                <td className="px-2 py-2.5 text-[12px] leading-snug text-ink-soft sm:px-3 sm:text-[12.5px]">
                  {row.feature}
                </td>
                <td className="px-1 py-2.5 text-center">
                  <CompareValue value={row.essential} muted />
                </td>
                <td className="px-1 py-2.5 text-center">
                  <CompareValue value={row.premium} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col gap-3 border-t border-line-soft px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p className="text-[11px] text-ink-mute">
          Pricing is discussed separately — this demo does not quote package rates.
        </p>
        <div className="flex gap-2">
          {packages.map((item) => (
            <Button
              key={item.id}
              size="sm"
              variant={pkg === item.id ? 'outline' : item.id === 'premium' ? 'primary' : 'dark'}
              onClick={() => {
                setPkg(item.id);
                setCompareOpen(false);
                window.setTimeout(() => scrollToId('site-top'), 120);
              }}
            >
              {pkg === item.id ? 'Viewing' : `Open ${item.short}`}
            </Button>
          ))}
        </div>
      </div>
    </Modal>
  );
}

function CompareValue({ value, muted = false }) {
  if (value === true) {
    return (
      <span
        className={cn(
          'inline-grid size-6 place-items-center rounded-full',
          muted ? 'bg-olive-soft text-olive' : 'bg-terracotta-soft text-terracotta',
        )}
      >
        <Check className="size-3.5" strokeWidth={3} />
        <span className="sr-only">Included</span>
      </span>
    );
  }
  if (value === false) {
    return (
      <span className="inline-grid size-6 place-items-center rounded-full bg-line-soft text-ink-mute">
        <Minus className="size-3.5" />
        <span className="sr-only">Not included</span>
      </span>
    );
  }
  return <span className="text-[10.5px] font-semibold text-ink-soft">{value}</span>;
}

export function PackageSheet() {
  const { switchOpen, setSwitchOpen, pkg, setPkg, setCompareOpen } = useDemo();
  const current = packageById(pkg);

  const choose = (id) => {
    setPkg(id);
    setSwitchOpen(false);
    window.setTimeout(() => scrollToId('site-top'), 80);
  };

  return (
    <Modal open={switchOpen} onClose={() => setSwitchOpen(false)} label="Switch website package">
      <div className="px-5 pt-6 pb-4 sm:px-7">
        <span className="eyebrow text-terracotta">Package switcher</span>
        <h2 className="mt-3 text-[1.5rem] leading-tight font-semibold">Switch demonstration</h2>
        <p className="mt-1.5 text-[12px] text-ink-soft">
          Currently viewing <span className="font-semibold text-ink">{current.name}</span>.
        </p>
      </div>

      <div className="grid gap-2 px-4 pb-4 sm:px-6">
        {packages.map((item) => {
          const active = pkg === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => choose(item.id)}
              className={cn(
                'flex items-center gap-3 rounded-2xl border p-2.5 text-left transition',
                active
                  ? 'border-terracotta/50 bg-terracotta-soft/40'
                  : 'border-line bg-paper hover:border-ink/20 hover:bg-cream',
              )}
            >
              <SmartImage
                src={item.image}
                alt=""
                className="size-14 shrink-0 rounded-xl sm:size-16"
              />
              <span className="min-w-0 flex-1">
                <span className="flex items-center gap-2 text-[9.5px] font-bold tracking-[0.16em] text-ink-mute uppercase">
                  {item.label}
                  {active && <span className="text-terracotta">· Viewing</span>}
                </span>
                <span className="mt-0.5 block font-display text-[15px] leading-tight font-semibold text-ink">
                  {item.name}
                </span>
                <span className="mt-0.5 block text-[11px] text-ink-soft">
                  {item.features.length} features · {item.summary.toLowerCase()}
                </span>
              </span>
              <Check
                className={cn('size-4 shrink-0', active ? 'text-terracotta' : 'text-line')}
                strokeWidth={2.5}
              />
            </button>
          );
        })}
      </div>

      <div className="flex items-center justify-between gap-3 border-t border-line-soft px-5 py-4 sm:px-7">
        <button
          type="button"
          onClick={() => {
            setSwitchOpen(false);
            setCompareOpen(true);
          }}
          className="text-[12px] font-semibold text-ink-soft underline decoration-line underline-offset-4 transition hover:text-terracotta"
        >
          Compare features
        </button>
        <span className="text-[10.5px] text-ink-mute">Demonstration only</span>
      </div>
    </Modal>
  );
}
