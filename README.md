# BDPA Market — Digital Shopping Complex

A premium, fully responsive **frontend demonstration** of a unified digital marketplace and business
directory for BDPA Shopping Complex, Benin City, Edo State, Nigeria.

The site brings eight fictional demo businesses under one address: customers can discover shops, browse
products and services, compare prices and preview how they would contact a shop. Shop owners get a
dedicated page explaining the proposed seller experience, including an interactive dashboard preview.

> **Demonstration only.** There is no backend, database, authentication or payment processing. Every
> business, price, phone number, unit number, opening hour and statistic is sample data. Nothing is
> transmitted or stored. This is stated throughout the interface and in the footer.

---

## Running the project

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in /dist
npm run preview  # preview the production build
```

Requires Node 20+.

## Stack

| Concern | Choice |
| --- | --- |
| Framework | React 19 + Vite 7 |
| Routing | React Router 7 (`BrowserRouter`) |
| Styling | Tailwind CSS 4 via `@tailwindcss/vite` |
| Icons | Lucide React |
| Type | Fraunces (display) + Manrope (UI), self-hosted through Fontsource |
| Imagery | Locally optimised WebP assets, generated for this concept |
| Dependencies | No animation, state or UI component libraries added |

## Pages

| Route | Purpose |
| --- | --- |
| `/` | Hero with live search, six categories, all eight featured shops, featured products, benefits, closing CTA |
| `/shops` | Shop directory with search, category filters, sorting, grid/list toggle, empty state |
| `/shops/:shopSlug` | Individual storefront — cover, identity, hours, contact, product/service browsing |
| `/shops/:shopSlug/product/:productId` | Product or service detail with specifications, shop info and contact CTA |
| `/categories` | Category index with counts, price ranges and popular listings |
| `/about` | Platform purpose, goals, how it would work, transparency notes |
| `/owners` | Seller proposition, interactive dashboard preview, onboarding steps, FAQ, interest form |
| `*` | Polished 404 with recovery links |

## Structure

```
src/
├─ components/
│  ├─ layout/      Header, mobility menu, footer, mobile tab bar, search dialog
│  ├─ seller/      Interactive seller dashboard preview
│  ├─ ui/          Button, Badge, Modal, SmartImage, ShopCard, ProductCard, etc.
│  └─ ContactDialog.jsx
├─ context/        Toast provider
├─ data/
│  ├─ site.js      Platform copy, categories, benefits, FAQs, stats
│  └─ shops.js     All eight shops, their products/services and helpers
├─ hooks/          Page metadata, demo notices
├─ lib/            Formatting and class utilities
├─ pages/          One component per route
├─ routes.jsx      Route definitions (shared by the app shell)
├─ App.jsx         BrowserRouter shell
└─ index.css       Design tokens, base styles, motion
public/img/
├─ categories/     Six category photographs
├─ shops/          Storefront cover photographs
└─ products/       Listing photographs
```

## Editing the demo catalogue

Everything lives in **`src/data/shops.js`**. A shop is one object:

```js
{
  slug: 'mama-eso-kitchen',
  name: 'Mama Eso Kitchen',
  category: 'restaurants-food',
  kind: 'restaurant',      // 'restaurant' | 'retail' | 'service'
  layout: 'menu',          // 'menu' | 'grid' | 'service'
  products: [
    {
      id: 'party-jollof',
      name: 'Smoky Party Jollof Rice',
      price: 3500,
      unit: 'per plate',
      section: 'Rice Dishes',
      image: '/img/products/mama-eso-kitchen-party-jollof.webp',
      // description, specs[], tags[], badge
    },
  ],
  // identity, accent colours, cover, location, hours, contact, story…
}
```

Add a shop, a product or a category in that file and the homepage, directory, search, storefront and
product routes all pick it up automatically. `featuredShopSlugs` and `featuredProductIds` decide what is
promoted on the homepage.

Category definitions, platform copy, benefits, seller features and FAQs live in **`src/data/site.js`**.

## Imagery

Images are served from `public/img` as WebP. Sources are generated concept artwork for this
demonstration, sized at 1400px wide and compressed for the web. `scripts/optimize-images.mjs` converts
source PNGs dropped into `assets-src/` into the optimised files (`shop-*` → `shops/`, `cat-*` →
`categories/`, everything else → `products/`).

`SmartImage` adds a shimmer while loading and a designed fallback if an image is unavailable, so a
missing asset never breaks a layout.

## Interaction notes

- Global search (`⌘K` / `Ctrl+K`), directory search and per-storefront search are all functional against
  the local catalogue.
- Filters, sorting and grid/list view are reflected in the URL, so results can be shared or reloaded.
- WhatsApp, calling, directions, sharing and the seller portal are clearly labelled previews. Actions
  that a backend would power raise a toast explaining exactly what is and is not happening.
- Dashboard edits (add/remove product, profile fields, enquiry replies) work in local component state for
  demonstration and reset on reload.
- Motion respects `prefers-reduced-motion`.

## Accessibility & responsiveness

Semantic landmarks, skip link, visible focus rings, labelled icon buttons, keyboard-dismissable
dialogs and search overlay, and layouts tested from 320px phones to wide desktops. No horizontal
overflow; touch targets sized for mobile use.

---

Built as a concept to show what a shared digital home for BDPA Shopping Complex could look like.

## Deploying to Vercel

The project is a standard Vite single-page app, so Vercel auto-detects everything. A `vercel.json`
is included with the SPA rewrite (so deep links such as `/shops/fresh-basket` work), build settings
and long-lived caching for images.

**Option A — Git integration (recommended)**

1. Push this repository to GitHub (already done on the working branch).
2. Go to [vercel.com/new](https://vercel.com/new) and **Import** the repository.
3. Vercel detects **Vite**. Confirm:
   - Framework preset: **Vite**
   - Build command: `npm run build`
   - Output directory: `dist`
   - Install command: `npm install`
4. Leave environment variables empty — there are none.
5. Click **Deploy**. The first build takes about a minute.
6. Every later push to the production branch triggers a new deployment; pull requests get preview URLs.

**Option B — Vercel CLI**

```bash
npm i -g vercel
vercel          # first run: link the project, then deploy a preview
vercel --prod   # promote to production
```

**Routing note:** the rewrite in `vercel.json` sends every unknown path to `index.html`, which is what
lets React Router handle `/shops`, `/owners` and product URLs on a hard refresh. Without it, deep links
would return a 404 from the CDN.

**Custom domain:** Project → Settings → Domains → add your domain and follow the DNS instructions.
No server, database or environment configuration is required for this demonstration.
