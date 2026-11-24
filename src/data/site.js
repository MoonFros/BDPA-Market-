export const site = {
  name: 'BDPA Market',
  complex: 'BDPA Shopping Complex',
  city: 'Benin City',
  state: 'Edo State',
  locationShort: 'BDPA, Benin City',
  address: 'BDPA Shopping Complex, Benin City, Edo State, Nigeria',
  intro:
    'Discover shops, explore products and connect with businesses at BDPA Shopping Complex, Benin City.',
  whatsappDemo: '0800 000 0000',
  phoneDemoNote: 'WhatsApp integration is a preview and is not connected.',
  disclaimer:
    'This is a frontend demonstration for the BDPA Shopping Complex. Every business, product, price, phone number, address, opening hour and statistic on this site is sample demonstration data — no real tenants, owners or transactions are represented.',
};

export const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Explore Shops', to: '/shops' },
  { label: 'Categories', to: '/categories' },
  { label: 'About', to: '/about' },
];

export const categories = [
  {
    id: 'restaurants-food',
    name: 'Restaurants & Food',
    short: 'Food',
    image: '/img/categories/cat-restaurants.webp',
    description: 'Home-style cooking, quick bites and everything in between.',
    tags: ['Local dishes', 'Fast food', 'Grills', 'Drinks'],
    icon: 'utensils',
  },
  {
    id: 'phones-electronics',
    name: 'Phones & Electronics',
    short: 'Electronics',
    image: '/img/categories/cat-electronics.webp',
    description: 'Phones, accessories and everyday tech from trusted sellers.',
    tags: ['Smartphones', 'Accessories', 'Audio', 'Home tech'],
    icon: 'smartphone',
  },
  {
    id: 'groceries-supermarkets',
    name: 'Groceries & Supermarkets',
    short: 'Groceries',
    image: '/img/categories/cat-groceries.webp',
    description: 'Fresh produce, pantry staples and weekly shopping runs.',
    tags: ['Fresh produce', 'Pantry', 'Frozen', 'Household'],
    icon: 'shopping-basket',
  },
  {
    id: 'laundry-cleaning',
    name: 'Laundry & Cleaning Services',
    short: 'Laundry',
    image: '/img/categories/cat-laundry.webp',
    description: 'Wash and fold, dry cleaning and home care services.',
    tags: ['Wash & fold', 'Dry cleaning', 'Home care'],
    icon: 'washing-machine',
  },
  {
    id: 'fashion-accessories',
    name: 'Fashion & Accessories',
    short: 'Fashion',
    image: '/img/categories/cat-fashion.webp',
    description: 'Made-to-measure pieces, ready-to-wear and accessories.',
    tags: ['Ankara', 'Ready-to-wear', 'Bags', 'Jewellery'],
    icon: 'shirt',
  },
  {
    id: 'general-shopping',
    name: 'General Shopping',
    short: 'General',
    image: '/img/categories/cat-general.webp',
    description: 'Provisions, beauty and the little things you always need.',
    tags: ['Provisions', 'Beauty', 'Household', 'Everyday'],
    icon: 'store',
  },
];

export const getCategory = (id) => categories.find((category) => category.id === id);

export const benefits = [
  {
    icon: 'compass',
    title: 'Every business, one place',
    text: 'Walk through the whole complex from your phone — no more circling the car park looking for a particular shop.',
  },
  {
    icon: 'scan-search',
    title: 'Browse before you visit',
    text: 'See real product photos, prices and specifications before making the trip across town.',
  },
  {
    icon: 'sparkles',
    title: 'Services, not just products',
    text: 'Compare laundry, tailoring and repair services by description, price and turnaround time.',
  },
  {
    icon: 'message-circle',
    title: 'Talk to the shop directly',
    text: 'Send an enquiry straight to the shop owner on WhatsApp, so nothing gets lost in translation.',
  },
  {
    icon: 'heart-handshake',
    title: 'Support businesses close by',
    text: 'Every search keeps money circulating inside the BDPA community and helps local traders grow.',
  },
];

export const ownerFeatures = [
  {
    icon: 'layout-template',
    title: 'Your own digital storefront',
    text: 'A branded page with your logo, cover photo and story — separate from your neighbours, under one trusted address.',
  },
  {
    icon: 'image-plus',
    title: 'Upload product pictures',
    text: 'Add clear photos from your phone camera roll, then arrange your best sellers at the top of the page.',
  },
  {
    icon: 'badge-naira',
    title: 'Update prices anytime',
    text: 'Prices move with the market. Edit them in seconds and customers always see the current figure.',
  },
  {
    icon: 'package-plus',
    title: 'Add or remove products',
    text: 'Seasonal items come and go. Publish a new listing or hide a sold-out item without waiting for anyone.',
  },
  {
    icon: 'store',
    title: 'Keep business info current',
    text: 'Opening hours, new phone numbers, holiday closures — update your profile and it is live for everyone.',
  },
  {
    icon: 'messages-square',
    title: 'Receive customer enquiries',
    text: 'Enquiries land in your seller dashboard and can be answered on WhatsApp with a single tap.',
  },
];

export const howItWorks = [
  {
    step: '01',
    title: 'Visit the complex desk',
    text: 'Register your shop with the BDPA management desk and confirm your unit number. Every listing is verified against the complex register.',
  },
  {
    step: '02',
    title: 'Build your storefront',
    text: 'Add your logo, cover photo and opening hours, then upload your first ten products or services with prices.',
  },
  {
    step: '03',
    title: 'Start receiving customers',
    text: 'Shoppers discover you by category, product or search. Enquiries arrive on WhatsApp and in your dashboard.',
  },
];

export const faqs = [
  {
    q: 'Is the seller portal live yet?',
    a: 'Not yet. The dashboard on this page is an interactive preview of what the seller experience could look like. It uses sample data and nothing you type is saved or sent anywhere.',
  },
  {
    q: 'What does it cost a shop owner?',
    a: 'Pricing has not been decided. The proposal under discussion with complex management is a small monthly listing fee per unit, with no commission on sales made in-store.',
  },
  {
    q: 'Do customers pay on the website?',
    a: 'No. This platform is a discovery and enquiry tool. Customers browse, then contact the shop directly or visit the complex to buy. Online payment is not part of this phase.',
  },
  {
    q: 'Who maintains the listings?',
    a: 'Each shop owner would maintain their own products, prices and business information, with the complex management able to review listings for accuracy.',
  },
  {
    q: 'Can a shop list services instead of products?',
    a: 'Yes. Laundry, tailoring, repairs and similar services have their own layout with descriptions, price units and turnaround times instead of stock counts.',
  },
];

export const stats = [
  { value: '8', label: 'Demo storefronts' },
  { value: '6', label: 'Shopping categories' },
  { value: '40', label: 'Sample listings' },
  { value: '1', label: 'Complex, one address' },
];
