# Shopify Developer Assignment Submission Guide

Here is the exact submission format and details compiled to send to **nj@troopod.io** with the subject line:
**AI Product Engineer Assignment - [Your Name]**

---

## 1. Project Repository & Preview Links

- **GitHub Repository**: `https://github.com/Somay-kousis/swa1`
- **Live Preview URL**: `http://localhost:8080/purelane-homepage.html` (Local preview server hosted on port 8080)
- **Shopify Dev Store Details**:
  - Store URL: `https://[your-dev-store].myshopify.com`
  - Storefront Password: `[your-password]`

---

## 2. Metafields Schema Definitions

Definitions created to support custom ratings, reviews, and badges:
- `custom.rating` (`number_decimal`): average rating score display (e.g. `4.8`).
- `custom.review_count` (`number_integer`): total number of verified customer reviews.
- `custom.badge_tag` (`single_line_text_field`): pill text rendered on product cards (e.g. `Best Seller`, `New`).

---

## 3. Seeded Products (8 Core Test Cases)

1. *Tap cleaner & limescale remover* (Regular product)
2. *Kitchen cleaner, foaming* (Regular product)
3. *Copper, bronze & brass cleaner* (Regular product)
4. *Washing machine cleaner & descaler* (Regular product)
5. *Natural herbal floor cleaner* (Regular product)
6. *Organic dishwash liquid gel* (Edge Case: Sold Out / Inventory = 0)
7. *Purelane Botanical Multi-Surface Cleaning Solution Concentrate...* (Edge Case: Very Long Title)
8. *Purelane Starter Sampler Pack* (Edge Case: Missing Featured Image)

---

## 4. Build Notes Summary

- Isolated global design variables, glassmorphism, Outfit & Inter fonts, and keyframes into `assets/purelane-base.css`.
- Extracted standalone scene switcher and mouse parallax logic into `assets/purelane-water-bg.js`.
- Implemented automatic calculation of percentage discount badges, title clamping (`-webkit-line-clamp: 2`), and missing product fallback SVGs.
- Optimized performance by utilizing raw CSS animations over heavy JS libraries.
- Standardized marquee loops with screen reader exclusions (`aria-hidden="true"`).

---

## 5. AI Workflow Summary

- **Delegated**: Extracting CSS styles from monolithic HTML, scaffolding Liquid schema templates, abstracting reusable cards.
- **Failures Addressed**: Validating Liquid schema type parameters, preserving carousel event triggers inside Shopify Customizer (`Shopify.designMode`).
- **Scale Plan**: Standardized CLI tool utilizing Shopify GraphQL Admin API to seed products, define metafield definitions, compile CSS tokens, and run checks on every pull request.
