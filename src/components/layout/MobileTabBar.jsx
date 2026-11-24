import { NavLink } from 'react-router-dom';
import { Compass, Home, LayoutGrid, Store } from 'lucide-react';
import { cn } from '../../lib/utils';

const tabs = [
  { label: 'Home', to: '/', icon: Home, end: true },
  { label: 'Shops', to: '/shops', icon: Store },
  { label: 'Categories', to: '/categories', icon: LayoutGrid },
  { label: 'Owners', to: '/owners', icon: Compass },
];

export default function MobileTabBar() {
  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-canvas/92 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl lg:hidden"
      aria-label="Mobile sections"
    >
      <div className="mx-auto flex max-w-lg items-stretch justify-around px-2">
        {tabs.map((tab) => (
          <NavLink
            key={tab.to}
            to={tab.to}
            end={tab.end}
            className={({ isActive }) =>
              cn(
                'relative flex min-w-[64px] flex-1 flex-col items-center gap-1 py-2.5 text-[10px] font-semibold tracking-wide transition-colors',
                isActive ? 'text-brand-dark' : 'text-ink-mute',
              )
            }
          >
            {({ isActive }) => (
              <>
                <span
                  className={cn(
                    'grid size-8 place-items-center rounded-full transition-colors',
                    isActive ? 'bg-brand-soft' : 'bg-transparent',
                  )}
                >
                  <tab.icon className="size-[18px]" strokeWidth={isActive ? 2.2 : 1.8} />
                </span>
                {tab.label}
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
