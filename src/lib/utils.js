export const cn = (...classes) => classes.filter(Boolean).join(' ');

const nairaFormatter = new Intl.NumberFormat('en-NG', {
  style: 'currency',
  currency: 'NGN',
  maximumFractionDigits: 0,
});

/** ₦3,500 */
export const formatNaira = (value) =>
  nairaFormatter.format(value).replace('NGN', '₦').replace(/\s/g, '');

export const slugify = (value) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

export const pluralise = (count, singular, plural = `${singular}s`) =>
  `${count} ${count === 1 ? singular : plural}`;
