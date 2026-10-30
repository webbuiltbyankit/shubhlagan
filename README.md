# Shubhlagn Sarees Demo — Frontend Showcase

A clean, responsive, garment-first e-commerce frontend demo built with **React + Vite + TypeScript**.

---

## 1. Project Contract & Absolute Scope

- **Frontend-Only Prototype:** This project is strictly a customer-facing UI demonstration.
- **Zero Backend / Zero Database:** There are no remote databases, authentication servers, payment gateways, live inventory streams, or seller/admin dashboards.
- **Local Browser State:** The Shopping Bag and Saved Wishlist are persisted safely in the browser's `localStorage` with full cross-tab synchronization and defensive JSON parsing.
- **Simulated Checkout:** The checkout process is non-operational and illustrative. It collects no credit card or UPI information, triggers no network requests, and generates no real orders.

---

## 2. Authentic Catalog & Asset Provenance

All garments and photography in this demo are derived from the research dataset in `Shubhlagn_Sarees/products/react_vite_catalog.json`:

- **Total Unique Garments:** 17 authentic products (`SHL-0001` through `SHL-0017`).
- **Paired Photography:** 34 verified local images (`SHL-XXXX_main.jpg` and `SHL-XXXX_gallery_02.jpg`) showing full drapes and fine embroidery details without stretching or artificial upscaling.
- **Fabric Category Breakdown:**
  - **Fandy Sarees:** 7 garments
  - **Georgette Sarees:** 4 garments
  - **Silk Sarees:** 3 garments
  - **Chiffon Sarees:** 1 garment
  - **Chinon Sarees:** 1 garment
  - **Crepe Sarees:** 1 garment
- **Brand Identity:** Logo source referenced from `profile_logo_900.jpg` in `public/brand/`. Official Instagram handle linked to `https://www.instagram.com/shubhlagn_sarees/`.

---

## 3. Architecture & Folder Structure

```
shubh lagan/
├── public/
│   ├── brand/
│   │   └── profile_logo_900.jpg
│   └── images/
│       ├── collections/       # 6 authentic fabric collection covers
│       └── products/          # 34 paired high-resolution garment photos
├── src/
│   ├── components/
│   │   ├── icons/             # Custom crisp SVGs (InstagramIcon)
│   │   ├── BackToTop.tsx      # Smooth return-to-top floating control
│   │   ├── Breadcrumbs.tsx    # Accessible navigation breadcrumbs
│   │   ├── DemoNotice.tsx     # Reusable non-operational notice
│   │   ├── Footer.tsx         # Responsive columns & mobile accordion
│   │   ├── Header.tsx         # Announcement bar, mega menu, search & cart badges
│   │   ├── HowItWorksModal.tsx# Architecture explanation dialog
│   │   ├── Layout.tsx         # Global page layout & scroll restoration
│   │   ├── MiniCartDrawer.tsx # Fast slide-out bag with live line totals
│   │   ├── MobileDrawer.tsx   # Off-canvas mobile navigation
│   │   ├── ProductCard.tsx    # Responsive card with hover secondary photo
│   │   ├── ProductImage.tsx   # 4:5 aspect ratio wrapper with fallback
│   │   ├── SearchModal.tsx    # Live catalog search with suggestions
│   │   └── SectionHeading.tsx # Editorial serif/sans section headings
│   ├── context/
│   │   ├── CartContext.tsx    # Local cart state, demo clamps (1-10), undo toast
│   │   ├── ToastContext.tsx   # Accessible status toasts with action support
│   │   └── WishlistContext.tsx# Browser-local saved items with multi-tab sync
│   ├── data/
│   │   └── catalog.json       # Authoritative 17-garment catalog data
│   ├── lib/
│   │   ├── catalog.ts         # Single catalog service: lookup, filters, INR formatter
│   │   └── contentConfig.ts   # Brand name, Instagram URL, and provisional notices
│   ├── pages/
│   │   ├── About.tsx          # Brand philosophy & drape aesthetics
│   │   ├── Cart.tsx           # Full shopping bag, price summaries & MRP savings
│   │   ├── Checkout.tsx       # 3-step illustrative demo checkout & summary
│   │   ├── CollectionPage.tsx # Fabric collection routes (/collections/:slug)
│   │   ├── Contact.tsx        # Instagram link & demo inquiry form
│   │   ├── FabricGuide.tsx    # Textile guide & dry-clean-only care instructions
│   │   ├── FAQ.tsx            # Interactive accordions for catalog & ordering
│   │   ├── Home.tsx           # Editorial hero, 6-fabric gallery, featured drapes
│   │   ├── Lookbook.tsx       # Visual drape showcase with paired photos
│   │   ├── NotFound.tsx       # Custom 404 route with recovery links
│   │   ├── Returns.tsx        # Transparent provisional return terms
│   │   ├── SearchPage.tsx     # Dedicated search query results page
│   │   ├── Shipping.tsx       # Transparent provisional delivery timelines
│   │   └── Shop.tsx           # Complete catalog with fabric, shade & price filters
│   ├── styles/
│   │   ├── index.css          # Design system base, fluid clamp scale, reset
│   │   └── tokens.css         # Oxblood (#621D23), gold (#D4AF37), parchment (#FCFAF8)
│   ├── types/
│   │   └── index.ts           # Product, Cart, Wishlist, Filter TypeScript definitions
│   ├── App.tsx                # Client-side router configuration
│   └── main.tsx               # Application entry point
├── index.html                 # Google fonts (Cormorant Garamond & Plus Jakarta Sans)
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## 4. How to Run Locally

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Local Development Server
```bash
npm run dev
```
Open your browser at `http://localhost:3000` (or the port indicated by Vite).

### 3. Production Build & Static Preview
```bash
npm run build
npm run preview
```

---

## 5. Visual Handoff & Owner Verification Checklist

Before publishing for live public commerce:
- [ ] **Contact Details:** Verify studio address, direct customer care phone lines, and operating hours.
- [ ] **Commercial Pricing & Taxes:** Confirm final consumer prices, GST inclusion/breakdown, and discount parameters.
- [ ] **Logistics & Delivery:** Finalize carrier partnerships (Blue Dart, Delhivery), domestic shipping rates, and cod serviceability by PIN code.
- [ ] **Return & Exchange Terms:** Define official refund windows, reverse courier pickup conditions, and inspection policies.
- [ ] **Payment Gateway Integration:** Contract and connect an authorized Indian payment gateway (Razorpay, Cashfree, or PhonePe PG).
- [ ] **Photography Rights & Usage:** Confirm commercial usage rights for all catalog imagery.

