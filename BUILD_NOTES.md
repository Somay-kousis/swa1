# Build Notes — Purelane Prototype to Shopify Dawn Section Conversion

## 1. Critique & Audit of the Original `purelane-homepage.html` File

- **Hardcoded Data & Monolithic Structure**: The prototype original file was a single 1,717-line static HTML file with inline CSS custom properties and embedded Base64 image data strings. All prices, product titles, review items, and bundle options were hardcoded.
- **Shopify Compatibility Deficit**: None of the original elements were structured with Liquid logic, standard Shopify product object attributes (`product.title`, `product.price`, `product.featured_image`), or section schemas for merchant customizability.
- **Event Listener Bottlenecks & Animation Performance**: Scroll event listeners were bound directly without full throttling across certain scroll calculations, risking layout thrashing on low-tier mobile devices.
- **Accessibility Gaps**: Inline SVGs lacked descriptive titles/labels, button focus indicators relied on default outlines, and marquee animations ran indefinitely without handling `prefers-reduced-motion` clean fallback states.

---

## 2. Code Refactoring & Production Changes Made

- **Extracted Centralized Design System (`assets/purelane-base.css`)**: Isolated all root variables, typography scales (`d1`–`d4`), HSL dark surface gradients, buttons, glassmorphism overlays (`backdrop-filter: blur(24px)`), SVG fallbacks, and animation keyframes into a shared, clean CSS asset.
- **Built 5 Production Liquid Sections**:
  1. `sections/purelane-hero.liquid`: Interactive 3-stage product showcase with mobile badge strip, headline HTML settings, and background scene integration.
  2. `sections/purelane-shop.liquid`: Collection-driven product grid pulling real Shopify product objects, prices, and variant IDs. Included custom SVG image fallbacks and AJAX `fetch('/cart/add.js')` cart submission.
  3. `sections/purelane-combos.liquid`: Pre-packaged bundle combos horizontal scroll rail with customizable savings pills, product stacks, and CTA links.
  4. `sections/purelane-bundles.liquid`: Bundle tier cards (Starter, Most Popular, Whole Home) with item count badges, flat per-item price highlights, and feature checklists.
  5. `sections/purelane-reviews.liquid`: Infinite auto-scrolling customer reviews marquee ticker with duplicate loop DOM cloning, star rating aggregations, and hover pause behavior.
- **Created Reusable Snippet Component (`snippets/purelane-card-product.liquid`)**:
  - Implemented automatic calculation for percentage savings badges (`{{ savings_pct }}% off`).
  - Added line clamping (`-webkit-line-clamp: 2`) for long product titles to prevent layout breaking.
  - Implemented dynamic stock status detection (`product.available == false` disables button & renders `Sold Out`).
  - Handled missing product images via inline vector SVG container fallbacks.

---

## 3. Data Seeding & Metafield Schema

- **Seeded 8 Core Store Products**:
  1. *Tap Cleaner & Limescale Remover* (Regular product)
  2. *Foaming Kitchen Cleaner* (Regular product)
  3. *Copper, Bronze & Brass Cleaner* (Regular product)
  4. *Washing Machine Cleaner & Descaler* (Regular product)
  5. *Non-Toxic Herbal Floor Cleaner* (Regular product)
  6. *Organic Dishwash Liquid Gel* (Edge Case: Sold Out)
  7. *Purelane Botanical Multi-Surface Cleaning Solution Concentrate for Heavy Heavy Duty Stain Removal* (Edge Case: Long Title)
  8. *Purelane Starter Sampler Pack* (Edge Case: No Featured Image)
- **Defined Metafields**:
  - `custom.rating`: Product average star rating (e.g. `4.8`).
  - `custom.review_count`: Total verified reviews count (e.g. `237`).
  - `custom.badge_tag`: Custom product pill badge (e.g. `Best Seller`, `Top Rated`, `New`).

---

## 4. Performance & Accessibility Enhancements

- **Core Web Vitals Optimization**: Replaced heavy inline base64 assets with clean, cached CSS utility variables.
- **Reduced Motion Support**: Wrapped scroll-driven animations and marquee tickers with `@media (prefers-reduced-motion: reduce)` checks to pause animations for users who request reduced motion.
- **Responsive Fluid Grid**: Fluid `clamp()` typography and container math ensuring pixel-perfect fidelity from 375px mobile screens up to 1920px widescreen monitors.

---

## 5. What I Would Do With More Time

1. **Native Dawn Drawer Cart Integration**: Bind AJAX add-to-cart events directly to Dawn's `<cart-drawer>` web component to open the slide-out drawer on item addition.
2. **Shopify Metaobjects for Bundle Combos**: Convert block-based combo definitions in `purelane-combos.liquid` into custom Shopify Metaobjects (`bundle_combo`) so merchants can reference actual multi-product bundles and discounts directly in Shopify admin.
