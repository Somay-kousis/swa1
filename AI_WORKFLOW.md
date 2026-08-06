# AI Workflow Report — AI Product Engineer Assignment

## 1. AI Task Delegation Breakdown

| Task Area | Delegated to AI Agent | Human Developer Oversight & Intervention |
|---|---|---|
| **Design System & CSS Extraction** | Parsed root variables, color tokens, font imports, and glassmorphism rules from `purelane-homepage.html` into `purelane-base.css`. | Verified responsive breakpoints, clamp functions, and SVG asset fallbacks. |
| **Liquid Section Generation** | Created `purelane-hero.liquid`, `purelane-shop.liquid`, `purelane-combos.liquid`, `purelane-bundles.liquid`, and `purelane-reviews.liquid`. | Refined Liquid schema settings, block definitions, and Theme Editor designMode JS triggers. |
| **Reusable Snippet Abstraction** | Built `snippets/purelane-card-product.liquid` with conditional rendering. | Ensured mathematical discount percentage calculations (`{{ compare_at_price | minus: price }}`) and fallback SVG SVG rendering for missing images. |
| **Edge Case Logic** | Sold out button states, title truncation clamping, missing image fallbacks. | Tested edge cases against 8 seeded store products. |

---

## 2. Where AI Agents Fail & How to Catch It

1. **Liquid Schema Syntax Errors**:
   - *Failure Mode*: AI agents frequently hallucinate non-existent Liquid schema setting types or omit required `presets` / `name` properties, causing section compilation errors in Shopify's theme customizer.
   - *Mitigation*: Strictly validate JSON schema structures with standard type enums (`inline_richtext`, `text`, `textarea`, `select`, `range`, `collection`, `checkbox`, `color`).
2. **Shopify Theme Customizer State Breakage (`Shopify.designMode`)**:
   - *Failure Mode*: AI generated JS script tags often run once on initial DOM load. When a merchant adds, reorders, or updates blocks in the Shopify Theme Editor, event listeners and intersection observers break.
   - *Mitigation*: Scope JS listeners to `document.addEventListener('shopify:section:load', ...)` and use idempotent, scope-isolated JS modules tied to `section.id`.
3. **Hardcoded Price / Currency Formatting**:
   - *Failure Mode*: AI models tend to leave static hardcoded currency symbols (e.g. `₹200`) inside section markup instead of using Shopify's native money filters (`{{ product.price | money_without_trailing_zeros }}`).
   - *Mitigation*: Explicitly enforce Liquid money filters across all product card templates.

---

## 3. Systematizing Workflow to Scale to 20+ Projects in Parallel

To scale delivery infrastructure to 500 DTC clients without increasing developer headcount, I would build a standardized **Troopod AI Delivery Pipeline**:

1. **Automated Figma / Prototype Parser**:
   - Script that parses raw HTML/CSS prototypes or Figma tokens directly into clean Liquid design tokens (`assets/brand-tokens.css`).
2. **Standardized Section Generator Templates**:
   - Pre-built agent prompts for standard DTC sections (Hero Stage, Product Grid, Marquee Ticker, Bundle Comparison, FAQ, UGC Video Rail).
3. **Automated Seed & Deployment CLI**:
   - A Node.js CLI tool wrapping Shopify Admin API / GraphQL to automatically seed 8+ standard edge-case test products, create metafield definitions, compile theme assets, and run theme check linters before client handoff.
4. **CI/CD Theme Check Pipeline**:
   - Run `shopify theme check` and automated visual regression testing via Playwright across mobile (375px) and desktop (1440px) viewports on every git commit.
