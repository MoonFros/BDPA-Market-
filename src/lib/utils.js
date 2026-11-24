export const cn = (...values) => values.filter(Boolean).join(' ');

export const formatNaira = (value) =>
  `₦${Number(value).toLocaleString('en-NG', { maximumFractionDigits: 0 })}`;

export const scrollToId = (id) => {
  if (typeof document === 'undefined') return;
  const el = document.getElementById(id);
  if (!el) return;
  if (id === 'site-top') {
    const top = el.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: Math.max(0, top - 1), behavior: 'smooth' });
    return;
  }
  el.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

export const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

export const pluralise = (count, singular, plural = `${singular}s`) =>
  `${count} ${count === 1 ? singular : plural}`;

export const todayISO = () => {
  const now = new Date();
  const offset = now.getTimezoneOffset();
  return new Date(now.getTime() - offset * 60 * 1000).toISOString().slice(0, 10);
};

export const demoReference = (prefix = 'SAV') =>
  `${prefix}-${Math.floor(1000 + Math.random() * 9000)}`;
