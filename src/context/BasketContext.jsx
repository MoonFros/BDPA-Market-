import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { getDish } from '../data/menu';

const BasketContext = createContext(null);

export function BasketProvider({ children }) {
  const [items, setItems] = useState([]);
  const [open, setOpen] = useState(false);
  const [toast, setToast] = useState(null);
  const timer = useRef(null);

  const notify = useCallback((message) => {
    setToast({ message, key: Date.now() });
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setToast(null), 3200);
  }, []);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const add = useCallback(
    (dish, qty = 1) => {
      setItems((prev) => {
        const found = prev.find((item) => item.id === dish.id);
        if (found) return prev.map((item) => (item.id === dish.id ? { ...item, qty: item.qty + qty } : item));
        return [...prev, { id: dish.id, qty }];
      });
      notify(`${dish.name} added to your order`);
    },
    [notify],
  );

  const inc = useCallback((id) => {
    setItems((prev) => prev.map((item) => (item.id === id ? { ...item, qty: item.qty + 1 } : item)));
  }, []);

  const dec = useCallback((id) => {
    setItems((prev) =>
      prev
        .map((item) => (item.id === id ? { ...item, qty: item.qty - 1 } : item))
        .filter((item) => item.qty > 0),
    );
  }, []);

  const remove = useCallback((id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const detailed = useMemo(
    () => items.map((item) => ({ ...item, dish: getDish(item.id) })).filter((item) => item.dish),
    [items],
  );

  const count = useMemo(() => detailed.reduce((sum, item) => sum + item.qty, 0), [detailed]);
  const subtotal = useMemo(
    () => detailed.reduce((sum, item) => sum + item.qty * item.dish.price, 0),
    [detailed],
  );

  const value = useMemo(
    () => ({
      items: detailed,
      count,
      subtotal,
      add,
      inc,
      dec,
      remove,
      clear,
      open,
      openBasket: () => setOpen(true),
      closeBasket: () => setOpen(false),
      toast,
      notify,
      dismissToast: () => setToast(null),
    }),
    [detailed, count, subtotal, add, inc, dec, remove, clear, open, toast, notify],
  );

  return <BasketContext.Provider value={value}>{children}</BasketContext.Provider>;
}

export const useBasket = () => {
  const ctx = useContext(BasketContext);
  if (!ctx) throw new Error('useBasket must be used inside BasketProvider');
  return ctx;
};
