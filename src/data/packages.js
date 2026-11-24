export const packages = [
  {
    id: 'essential',
    number: '01',
    label: 'Package 01',
    name: 'Essential Website',
    short: 'Essential',
    summary: 'A professional online presence',
    description:
      'A professional online presence that introduces your restaurant and makes it easy for customers to reach you.',
    features: [
      'Restaurant homepage',
      'About & story section',
      'Restaurant information',
      'Contact & enquiry form',
      'Location & opening hours',
      'Social media links',
    ],
    image: '/img/savora/interior.webp',
    ideal: 'Ideal for new restaurants and small kitchens',
  },
  {
    id: 'premium',
    number: '02',
    label: 'Package 02',
    name: 'Premium Restaurant Website',
    short: 'Premium',
    summary: 'A complete digital restaurant experience',
    description:
      'A complete digital restaurant experience that lets customers explore your menu, discover dishes and interact with your restaurant.',
    features: [
      'Everything in Essential',
      'Full digital menu',
      'Food categories & search',
      'Individual dish details',
      'Food photography gallery',
      'Order basket demonstration',
      'Reservation enquiries',
    ],
    image: '/img/savora/dish-jollof.webp',
    ideal: 'Ideal for restaurants ready to sell online',
  },
];

export const packageById = (id) => packages.find((item) => item.id === id) ?? packages[1];

export const comparisonRows = [
  { feature: 'Professional homepage', essential: true, premium: true },
  { feature: 'About section', essential: true, premium: true },
  { feature: 'Contact form', essential: true, premium: true },
  { feature: 'Restaurant information', essential: true, premium: true },
  { feature: 'Digital food menu', essential: false, premium: true },
  { feature: 'Food categories & search', essential: false, premium: true },
  { feature: 'Dish details', essential: false, premium: true },
  { feature: 'Food gallery', essential: 'Basic', premium: 'Advanced' },
  { feature: 'Interactive order basket', essential: false, premium: true },
  { feature: 'Reservation enquiries', essential: 'Basic contact', premium: 'Dedicated form' },
];
