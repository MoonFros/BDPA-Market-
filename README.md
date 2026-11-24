# SAVORA — Restaurant Website Package Showcase

A premium, frontend-only sales demonstration for a fictional restaurant in Benin City, Nigeria. The same SAVORA brand is presented as **two complete restaurant websites** — an **Essential** build and the flagship **Premium** build — inside one polished product experience.

Switch packages at the top of the page (or from the package control in either site's header) to move between the two demonstrations without a page reload.

> **Demonstration only.** SAVORA is a fictional restaurant. All menu items, prices, reviews, phone numbers, addresses, opening hours and submitted "enquiries" are sample data. There is no backend, database, authentication, payment or real ordering. Nothing entered into a form is sent or stored.

---

## The two packages

| | Essential (Package 01) | Premium (Package 02) |
|---|---|---|
| Positioning | A professional online presence | A complete digital restaurant experience |
| Pages / sections | Home, About, What we offer, Visit, Contact | Home, Menu, About, Gallery, Reservations, Contact |
| Menu | Highlights only | Full digital menu, 18 dishes, 9 categories, search & filters, dish detail dialogs |
| Ordering | — | Interactive basket with quantity controls, order enquiry demonstration |
| Gallery | Single imagery | 9-image gallery with lightbox |
| Reservations | Basic contact | Dedicated reservation form with validation |
| Forms | Contact form with validation | Contact + reservation + order enquiry |

Both builds share the same logo, typography, colour palette, photography and tone of voice — only the depth of the experience changes.

Also included:

- **Package switcher** — two large product cards with feature lists and a live "viewing" state, plus a persistent switcher in the site header and footer.
- **Comparison table** — a side-by-side dialog listing exactly what each package includes (no pricing is quoted).
- **Fully functional demonstrations** — menu filtering and search, dish dialogs with quantity selectors, basket drawer with checkout steps, reservation and contact forms with validation and demo confirmations, gallery lightbox with keyboard navigation.

---

## Design system

| Token | Value | Use |
|---|---|---|
| Cream | `#FBF6EC` | Page canvas |
| Paper | `#FFFDF8` | Cards and surfaces |
| Ink | `#191612` | Type, dark sections |
| Terracotta | `#B04A2C` | Primary accent, CTAs, links |
| Olive | `#59653F` | Secondary accent, success states |
| Gold | `#BD8A3D` | Ratings and small details |
| Line | `#E7DDCA` | Borders and dividers |

- **Fraunces** (variable serif) for display headings, **Manrope** (variable sans) for UI and body copy.
- Subtle grain, soft shadows, generous whitespace, restrained reveal-on-scroll animations that respect `prefers-reduced-motion`.
- Mobile-first layouts from 320px upward, 16px form controls to prevent iOS focus zoom, comfortable touch targets, no horizontal overflow.

---

## Tech stack

- **React 19** + **Vite 7**
- **Tailwind CSS 4** (`@tailwindcss/vite`) with a custom `@theme` token set
- **Lucide React** icons
- **Fontsource** variable fonts (self-hosted)
- No router, no state library — package state, basket state and overlays use small React contexts

Production build: ~339 kB JS (≈100 kB gzip) and ~71 kB CSS (≈15 kB gzip).

---

## Project structure

```
src/
  App.jsx                  Showcase shell, toast and provider wiring
  index.css                Tailwind theme tokens, base styles, animations
  data/
    restaurant.js          Brand, contact, hours, story, services, gallery
    menu.js                18 dishes, 9 categories, helpers
    packages.js            Package metadata + comparison rows
  context/
    DemoContext.jsx        Selected package, switcher + compare dialogs
    BasketContext.jsx      Order basket, subtotal, toast notifications
  components/
    ui/                    Button, Modal, Drawer, Field, Reveal, SmartImage, …
    showcase/              Package switcher, top bar, compare dialog, package sheet
    site/
      EssentialSite.jsx    Package 01 experience
      PremiumSite.jsx      Package 02 experience
      SiteHeader.jsx       Responsive navigation + package control
      SiteFooter.jsx       Package-aware footer
      Menu.jsx             Featured dishes, full menu, dish dialogs
      BasketDrawer.jsx     Basket → order details → demo confirmation
      Forms.jsx            Contact + reservation forms with validation
      Gallery.jsx          Masonry-style gallery and lightbox
      SiteParts.jsx        Demo band, ratings, hours, map placeholder
scripts/
  optimize-images.mjs      PNG → WebP pipeline for public/img/savora
public/img/savora/         22 optimised WebP photographs (~2.4 MB total)
```

---

## Getting started

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in dist/
npm run preview  # preview the production build
```

Node 20.19+ / 22 is required (see `.nvmrc`).

Deep-link either package directly:

- `/?package=premium`
- `/?package=essential`

---

## Imagery

The photography in `public/img/savora` was generated for this demonstration and optimised to WebP (quality ≈ 82, 1200–1800px wide). Source PNGs live in `assets-src/savora/` and are intentionally **not committed**; if you need to regenerate the derived WebP files, add those sources back and run:

```bash
node scripts/optimize-images.mjs
```

`SmartImage` lazy-loads below-the-fold images, fades them in on load, and falls back to a neutral tile if an image is missing.

---

## Deploying to Vercel

The repository includes `vercel.json` (Vite preset, SPA rewrite and long-lived caching for `/img/*` and `/assets/*`).

1. Push the repository to GitHub.
2. In Vercel: **Add New → Project → Import** the repository.
3. Framework preset **Vite**, build command `npm run build`, output directory `dist`, install command the default `npm install`.
4. No environment variables, database or backend are required.
5. `vercel --prod` works too, once the Vercel CLI is installed and authenticated.

Because the package switcher uses a query string (`?package=…`) rather than client-side routes, the rewrite simply ensures any path resolves to `index.html`.

---

## Notes for a client demonstration

- The site deliberately presents **two products, not one** — the switcher is the sales tool, so it appears above both sites and stays available in each header, footer and mobile menu.
- The Essential package is treated as a real, carefully designed website — it is not made to look cheap in order to flatter Premium.
- Every interactive element does something; where a real service would be required (ordering, payments, messages, reservations), the interface says clearly that it is a demonstration.
