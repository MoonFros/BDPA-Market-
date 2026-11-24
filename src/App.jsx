import { CheckCircle2, X } from 'lucide-react';
import { DemoProvider, useDemo } from './context/DemoContext';
import { BasketProvider, useBasket } from './context/BasketContext';
import { ShowcaseTopBar, PackageSwitcher, CompareDialog, PackageSheet } from './components/showcase/Showcase';
import EssentialSite from './components/site/EssentialSite';
import PremiumSite from './components/site/PremiumSite';

function Toast() {
  const { toast, dismissToast, open } = useBasket();
  if (!toast || open) return null;

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-4 z-[100] flex justify-center px-4 sm:justify-start sm:pl-6">
      <div
        key={toast.key}
        className="anim-scale pointer-events-auto flex max-w-sm items-center gap-2.5 rounded-full border border-line bg-paper/95 py-2.5 pr-2 pl-3.5 shadow-lift backdrop-blur"
        role="status"
      >
        <span className="grid size-6 shrink-0 place-items-center rounded-full bg-olive-soft text-olive">
          <CheckCircle2 className="size-3.5" />
        </span>
        <p className="text-[11.5px] leading-tight font-medium text-ink">{toast.message}</p>
        <button
          type="button"
          onClick={dismissToast}
          aria-label="Dismiss notification"
          className="grid size-6 shrink-0 place-items-center rounded-full text-ink-mute transition hover:bg-cream-deep hover:text-ink"
        >
          <X className="size-3" />
        </button>
      </div>
    </div>
  );
}

function Experience() {
  const { pkg } = useDemo();

  return (
    <div className="min-h-screen bg-cream">
      <ShowcaseTopBar />
      <PackageSwitcher />

      <main key={pkg}>{pkg === 'essential' ? <EssentialSite /> : <PremiumSite />}</main>

      <CompareDialog />
      <PackageSheet />
      <Toast />
    </div>
  );
}

export default function App() {
  return (
    <DemoProvider>
      <BasketProvider>
        <Experience />
      </BasketProvider>
    </DemoProvider>
  );
}
