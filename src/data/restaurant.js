/**
 * Central restaurant + showcase data. Everything here is fictional sample
 * content for a website demonstration — none of it is a real business.
 */

export const restaurant = {
  name: 'Savora',
  wordmark: 'SAVORA',
  tagline: 'Good Food. Great Moments.',
  shortDescription:
    'A contemporary Nigerian kitchen serving familiar flavours with a little more care — in the heart of Benin City.',
  intro:
    'Seasonal produce, a charcoal grill and a dining room that feels like a warm welcome. Savora is where Benin City comes to eat well and stay a while.',
  established: 2019,
  city: 'Benin City',
  region: 'Edo State, Nigeria',
  address: '12 Adesuwa Road, GRA, Benin City, Edo State',
  addressNote: 'Off Adesuwa Road, two minutes from Ring Road',
  phone: '0800 000 0000',
  phoneHref: 'tel:+2348000000000',
  whatsappHref: 'https://wa.me/2348000000000',
  email: 'hello@savora-demo.com',
  rating: 4.8,
  reviews: 214,
  priceRange: '₦₦',
  seating: '64 covers · terrace for 24',
  hours: [
    { days: 'Monday – Thursday', time: '10:00 – 22:00' },
    { days: 'Friday – Saturday', time: '10:00 – 23:30' },
    { days: 'Sunday', time: '12:00 – 21:00' },
  ],
  openNote: 'Kitchen closes 30 minutes before the doors do.',
  socials: [
    { label: 'Instagram', handle: '@savora.benin' },
    { label: 'Facebook', handle: '/savorabenin' },
    { label: 'TikTok', handle: '@savora.benin' },
  ],
};

export const images = {
  hero: '/img/savora/hero.webp',
  interior: '/img/savora/interior.webp',
  chef: '/img/savora/chef.webp',
  ambience: '/img/savora/ambience-interior.webp',
};

export const services = [
  {
    icon: 'dineIn',
    title: 'Dine-In Experience',
    copy: 'A warm, easy-going dining room for family lunches, first dates and everything in between.',
  },
  {
    icon: 'chef',
    title: 'Freshly Prepared Meals',
    copy: 'Cooked to order every day — sauces simmered from scratch, produce brought in each morning.',
  },
  {
    icon: 'bag',
    title: 'Takeaway Services',
    copy: 'Call ahead and collect from the counter, packed so it still tastes right when you get home.',
  },
  {
    icon: 'sparkles',
    title: 'Private Dining & Events',
    copy: 'Birthdays, small weddings and team dinners in our private room or on the terrace.',
  },
];

export const philosophy = [
  {
    number: '01',
    title: 'Local first',
    copy: 'Peppers, herbs and produce sourced from markets and farms around Edo State whenever the season allows.',
  },
  {
    number: '02',
    title: 'Cooked with care',
    copy: 'No shortcuts. Our stews and sauces are built slowly, in small batches, every single morning.',
  },
  {
    number: '03',
    title: 'Hospitality that stays with you',
    copy: 'Knowledgeable, unhurried service — the kind of welcome that makes you want to bring someone back.',
  },
];

export const story = {
  eyebrow: 'Our story',
  title: 'A small kitchen with a long memory.',
  paragraphs: [
    'Savora began in 2019 with eight tables, one grill and a simple idea: that the food we grew up eating deserved a room as considered as any restaurant abroad.',
    'Today the dining room is bigger and the menu has travelled a little, but the kitchen still starts early — roasting peppers for jollof, simmering goat meat pepper soup, charring plantain until the edges caramelise.',
  ],
  bullets: [
    'Family-owned and locally run since 2019',
    'Fresh produce delivered six mornings a week',
    'Halal chicken, line-caught fish, no artificial stock',
  ],
};

export const gallery = [
  { src: '/img/savora/hero.webp', title: 'Evening service', caption: 'The main dining room, just before the rush.' },
  { src: '/img/savora/dish-jollof.webp', title: 'House jollof', caption: 'Smoked over open flame, finished with grilled chicken.' },
  { src: '/img/savora/interior.webp', title: 'The dining room', caption: 'Linen, terracotta and a lot of afternoon light.' },
  { src: '/img/savora/dish-grilled-fish.webp', title: 'From the coast', caption: 'Whole tilapia, pepper glaze, sweet plantain.' },
  { src: '/img/savora/chef.webp', title: 'In the kitchen', caption: 'Plating the last dish of the lunch service.' },
  { src: '/img/savora/dish-cake.webp', title: 'Something sweet', caption: 'Layered chocolate cake with fresh raspberries.' },
  { src: '/img/savora/ambience-interior.webp', title: 'Terrace light', caption: 'Pendant lamps and a very long lunch.' },
  { src: '/img/savora/drink-chapman.webp', title: 'Chapman, on the rocks', caption: 'The house welcome drink.' },
  { src: '/img/savora/dish-sharing-platter.webp', title: 'The sharing table', caption: 'Everything in the middle, as it should be.' },
];

export const facts = [
  { label: 'Find us', value: restaurant.address, sub: restaurant.addressNote },
  { label: 'Opening hours', value: 'Mon – Sat from 10:00', sub: 'Sunday from 12:00' },
  { label: 'Reservations', value: restaurant.phone, sub: 'Demo number · sample data' },
  { label: 'Write to us', value: restaurant.email, sub: 'Demo address · sample data' },
];

export const reservationTimes = [
  '12:00',
  '13:00',
  '14:00',
  '17:00',
  '18:00',
  '19:00',
  '20:00',
  '21:00',
];

export const demoDisclaimer =
  'Demonstration website. SAVORA is a fictional restaurant — menu, prices, contact details and reviews are sample data. Nothing you submit is sent or stored.';

export const siteMeta = {
  demoTitle: 'Restaurant Website Demonstration',
  switcherTitle: "Choose Your Restaurant's Online Experience",
  switcherIntro: 'Two ways to bring your restaurant online. One brand, different possibilities.',
};
