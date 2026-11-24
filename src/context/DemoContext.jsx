import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';

const DemoContext = createContext(null);

const readPackage = () => {
  if (typeof window === 'undefined') return 'premium';
  const value = new URLSearchParams(window.location.search).get('package');
  return value === 'essential' ? 'essential' : 'premium';
};

export function DemoProvider({ children }) {
  const [pkg, setPkgState] = useState(readPackage);
  const [compareOpen, setCompareOpen] = useState(false);
  const [switchOpen, setSwitchOpen] = useState(false);

  const setPkg = useCallback((next) => {
    setPkgState(next);
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.set('package', next);
      window.history.replaceState({}, '', url);
    }
  }, []);

  const firstRender = useRef(true);

  // Any package change dismisses the compact switcher sheet.
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    setSwitchOpen(false);
  }, [pkg]);

  const value = useMemo(
    () => ({
      pkg,
      setPkg,
      compareOpen,
      setCompareOpen,
      switchOpen,
      setSwitchOpen,
    }),
    [pkg, setPkg, compareOpen, switchOpen],
  );

  return <DemoContext.Provider value={value}>{children}</DemoContext.Provider>;
}

export const useDemo = () => {
  const ctx = useContext(DemoContext);
  if (!ctx) throw new Error('useDemo must be used inside DemoProvider');
  return ctx;
};
