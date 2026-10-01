# Better Space Marketplace Homepage

## Purpose
A dense Indonesian furniture marketplace homepage for shoppers and business buyers, prioritizing product discovery, category navigation, trust, and supplier quotation enquiries.

## Reference and design direction
- Primary visual target: supplied Better Space marketplace direction.
- Figma: `mfaynGmduVxDwlZFmIsix6`, inspected via MCP. It has one `Thumbnail` bitmap frame (800x480), no variables or layered page nodes. It informs marketplace structure only.
- Visual language: practical furniture retail, warm white field, deep teal navigation/action color, muted aqua merchandising surfaces, charcoal copy, natural furniture photography.
- Dials: ENERGY 2 / RHYTHM 2 / MOTION 1. Dense marketplace composition remains calm; motion is reserved for useful hover and menu state feedback.

## Major visual decisions
- Deep teal carries navigation, primary actions, and the B2B banner for retail trust and hierarchy.
- DM Sans is used for compact ecommerce scanning; Playfair Display headlines provide furniture warmth without turning the page into a sparse editorial landing page.
- Small 6px card radius and restrained borders/shadows preserve marketplace density.
- Real local furniture photos establish a consistent natural, warm product direction.

## Users and conversion
- B2C shoppers discover room furniture and add products to a cart preview.
- Business buyers submit a supplier quote enquiry.
- Key journeys: search and category browsing, promo discovery, recommended products, B2B quote capture.

## IA
Homepage: top utility, commerce header, primary categories, sidebar/hero/service cards, benefits, offers, categories, room collections, supplier quote, product recommendations, additional services, supplier regions, footer.

Connected storefront routes: `/products` catalog listing, `/products/[id]` furniture detail, `/cart`, `/wishlist`, `/account`, and `/orders`. All derive product identity, prices, images, categories, material, dimensions and color options from one local Better Space catalog, preserving the homepage furniture direction across the storefront.

## Figma UI Kit adaptation
The supplied Figma UI Kit (`0SzpXe5ng7xaKgpTk3Lhk9`) was inspected through MCP. Its Cover structure includes list, product, cart, orders, order detail, wishlist, user, security, registration and sign-in frames. The available design contexts were flattened bitmaps rather than usable components/assets, so the adaptation uses the kit's ecommerce route structure, not its imagery, names, or visual assets. Better Space local furniture content and the existing preview6 homepage system remain authoritative.

## Architecture
Next.js App Router, TypeScript, CSS, local public image assets, React client state for search/menu/tabs/wishlist/cart/form feedback. No database, checkout, login, CMS, or external runtime imagery.

`src/lib/catalog.ts` is the single product source of truth (21 products). Every surface — homepage recommendations, catalog listing, product detail, related products, cart, wishlist, and header search — resolves products through it. The homepage previously kept a duplicate hardcoded product array, which is why its cards never linked to the detail route; that duplication was removed and the homepage now consumes the shared catalog and store.

Cart and wishlist state persist in `sessionStorage`, read after mount rather than during the hydration render. Reading browser storage inside a `useState` initializer caused an SSR/client render mismatch that aborted React hydration site-wide and silently disabled every click handler; the store now initializes empty and syncs in an effect.

## Accessibility and performance
Semantic sections, labels, live feedback, visible keyboard focus, native buttons/links, local optimized image files and responsive grids. Target no horizontal mobile overflow.

## SEO
Metadata includes title and product-marketplace description. Semantic headings and descriptive image alt text.

## Deployment
GitHub repo `aspireomedia/rumaio-ecommerce-preview6` (renamed from `preview6-rumaio-ecommerce`), connected to the Vercel project `preview6-rumaio-ecommerce`, branded URL `preview6.aspireomedia.com`. Commits must carry the author `aspireomedia <aspireomedia@gmail.com>` or Vercel rejects the deploy.

## Catalogue seeding and media
Preview 6 now uses the shared `furniture-catalog` seed adapter that also supplies Preview 5 and Preview 7. The canonical set is 100 products with one distinct Pexels source image per product. The prior local-image expansion was removed because its small image pool caused visually repeated product cards. Remote image access is restricted to `images.pexels.com` in `next.config.ts`. Homepage recommendation tabs are capped at 10 cards while `/products` exposes the complete seeded catalogue.

## Account and order preview routes
The Figma UI Kit surfaces now have honest preview routes: `/orders/[id]`, `/account/security`, `/register`, and `/sign-in`. These routes deliberately do not collect or persist credentials, orders, or payment data. `/account`, `/orders`, and the new routes remain presentational previews until authentication, order persistence, and payment integrations are approved.

## Error-state coverage
A shared `ErrorExperience` provides Indonesian recovery screens for routing, unavailable/timeout, payment, order, inventory, cart/search, validation/rate-limit, session/role, and product-upload states. Dynamic `/status/[state]` routes make each state independently testable; App Router `not-found.tsx`, `error.tsx`, and `global-error.tsx` prevent raw framework output from reaching users. Deep teal keeps the recovery action aligned with marketplace navigation, while the warm-white card preserves the existing shopping canvas. No decorative motion is used so the state remains focused; every state plainly says whether payment occurred and supplies one primary action.

## Homepage merchandising and catalogue state
The homepage recommendations grid is driven by `tabbed` in `src/app/page.tsx`: "Terlaris" renders `catalog.slice(0, 10)`, while "Produk Baru" (`isNew`) and "Penawaran Spesial" (`oldPrice`) filter the catalog **without any cap**. Those caps are placeholders, not merchandising rules — there is no sales or popularity data yet. The default tab's 10 and the filtered tabs' sizes must be revisited as the catalogue populates, and a filtered tab must be capped too. Temporary options: a hand-curated product ID list (the pattern preview7 uses), badge-driven selection, or room-balanced selection.

This preview has **not** been reseeded from the shared pack (`/home/ubuntu/aspireomedia/furniture-catalog/`). It still carries the old hand-authored 21-product catalogue with local imagery, and 15 of those 21 products share a photo with another product (7 duplicate image groups — e.g. `luna-sofa`/`nara-sofa` both use `products/product1.jpg`, `lento-desk`/`niko-desk`/`arli-lamp` all use `products/product4.jpg`). That is the reported "different names, same image" defect, still open here. Reseeding from `out/preview6-products.ts` (100 products, distinct Pexels photos) is the fix. It also means the badge-dependent tabs are thin: only 1 item is `isNew` and 2 carry `oldPrice`, so those tabs currently render a near-empty grid.

## Homepage reconstruction (2026-09-30)
- `/` is now composed exclusively through `src/app/HomeMarketplace.tsx` and imported by the root route. Its CSS is route-local (`src/app/home-marketplace.css`), so the shared storefront routes retain their existing visual treatment.
- Target: the supplied RUMAIO marketplace reference, while retaining the Better Space name and the local catalogue. The desktop hierarchy is utility bar, commerce header, category navigation, sidebar + hero + three service cards, benefit strip, four promos, six top categories, deterministic two-banner plus 4x2 merchandising grid, B2B quote banner, ten products (5x2), services, regions, then footer.
- Major decisions: DM Sans remains the scan-first ecommerce typeface. Teal signals actions/navigation and white grounds product scanning. The deterministic compact grids reproduce the marketplace density rather than the former editorial sizing. Local category photos and the seeded catalog supply imagery, avoiding invented assets.

## Global color system (2026-09-30)
- The official website-wide source of truth is defined in `src/app/globals.css`: primary deep teal `#27545c`, secondary dusty aqua `#97c1bc`, pearl neutral `#e2dfdc`, muted gray `#9e9d9d`, and white `#ffffff`.
- Semantic aliases preserve existing layouts and component APIs: `--color-primary`, `--color-secondary`, `--color-neutral-light`, `--color-neutral-muted`, `--color-surface`, alongside mapped legacy aliases (`--slate`, `--dusty`, `--teal`, `--aqua`, etc.). This is intentionally a color-only migration across homepage and all storefront routes, not a structural redesign.
- Deep teal provides reliable text/action contrast, dusty aqua marks secondary/focus affordances, pearl provides quiet separation surfaces, and muted gray is reserved for secondary text. Natural furniture/image colors are not recolored.

## Premium storefront: Casen Living (2026-09-30)
- Added a second, fully isolated storefront experience under `/premium`, alongside the existing standard marketplace at `/`. Both storefronts coexist; the standard marketplace was not touched.
- Brand: **Casen Living**, tagline "Where Space Becomes Home." Structure and composition were ported from the Preview1 premium reference (`/home/ubuntu/aspireomedia/web/samples/furniture-store`, GitHub `aspireomedia/preview`), which is a Next.js App Router project with route-per-category and dedicated PDP, cart, and wishlist pages.
- Route namespace: `/premium`, `/premium/[room]` (living, dining, bedroom, office, storage), `/premium/product/[id]`, `/premium/about`, `/premium/faq`, `/premium/cart`, `/premium/wishlist`. All internal Premium navigation (header, footer, cards, search, breadcrumb) stays inside `/premium`; verified via link audit and click-through.
- Isolated data source: `src/lib/premium-catalog.ts` holds a standalone `premiumCatalog` array, auto-seeded once from the existing `uniqueCatalog` (100 products) in `src/lib/catalog.ts` on 2026-09-30. Premium reads exclusively from this module at runtime; it does not query the standard marketplace catalog. The seed is a one-time file write, not a runtime migration, so it cannot duplicate on repeated app starts.
- Isolated cart/wishlist: Premium uses its own `usePremiumStore` hook (`src/app/premium/PremiumShell.tsx`) with dedicated `sessionStorage` keys (`casen-premium-cart`, `casen-premium-wishes`), independent from the standard marketplace's `better-space-cart`/`better-space-wishes`.
- Isolated theme: `src/app/premium/premium.css` defines route-scoped CSS variables under `.premium-root` (`--premium-primary #27545c`, `--premium-secondary #97c1bc`, `--premium-neutral-light #e2dfdc`, `--premium-muted #9e9d9d`, `--premium-surface #ffffff`), translated from Preview1's original sage/orange/terracotta palette. Standard marketplace CSS/tokens are untouched.
- Legacy brand audit: no "Aspire", "Better Space", or Preview1 placeholder copy remains inside `/premium`; standard marketplace branding ("Better Space") is preserved unchanged outside `/premium`.
- About page content is the supplied Casen Living brand philosophy (Casa &rarr; Casen &rarr; Living narrative, brand essence, closing tagline). FAQ uses neutral "contact our team" wording for any commercial term not established elsewhere in the project (no fabricated policies).
- All Premium images were verified image-by-image against their actual pixel content before use (several initial guesses were wrong — e.g. an "Office" room card that was actually a red panda, and a hero image that was actually a bedroom — both were caught and corrected).
- Targeted Premium revision (2026-10-01): `/premium` retains its existing hero, Shop by Room, Featured Pieces, PDP and product data. The home-only `Shop the Look` block was removed and replaced in narrative order by compact About, three stacked landscape collection banners, shortened Casen philosophy, retained Thoughtfully Crafted section, then a dusty-aqua FAQ accordion. Header search flexes into available width on desktop and remains an input on mobile; Premium footer now uses Deep Teal / Pearl. All changes remain under `src/app/premium/`.
- Full Bahasa Indonesia pass (2026-10-01): user-facing standard and Premium UI, metadata, navigation, forms, empty states, PDP content, FAQ, cart and purchase feedback are localized. Product data itself remains unchanged. The Casen Living navbar tagline is visible on every Premium route, including mobile, as a compact Dusty Aqua (`#97c1bc`) treatment with Deep Teal (`#27545c`) text.
- Visual correction + rebrand patch (2026-10-01):
  - Standard marketplace now uses CASEN LIVING as the single brand across header, footer, metadata, PDP breadcrumb, account/sign-in/register copy, and error states. "Better Space" text no longer appears anywhere in rendered UI (internal `sessionStorage` keys `better-space-cart`/`better-space-wishes` were intentionally left unchanged to avoid invalidating existing visitor carts/wishlists — this is a storage key, not visible branding).
  - Image overlays across standard promo cards, collection banners, and category tiles were changed from a flat full-image teal wash to a localized gradient concentrated behind the text only, fading to transparent so natural photography (wood, beige, warm tones) is visible across the rest of each card. Overlay text shadow changed from a gray/secondary shadow to a true black shadow for stronger legibility.
  - The homepage hero heading now carries a soft layered white glow (text-shadow) so it visibly stands out against the photographic background without becoming a harsh outline.
  - Premium hero scrim and the 3 stacked promo banners use the same localized-gradient approach; Premium overlay copy stays white with a subtle black shadow.
  - Premium Brand Philosophy (Filosofi Brand) section was moved to immediately follow the Hero (previously appeared lower, after the 3 promo banners) and recolored to a Deep Teal `#27545c` background with Pearl Gray `#e2dfdc` text and Dusty Aqua `#97c1bc` accents (was previously a white-background section with Deep Teal text — now inverted for stronger editorial contrast). The duplicate Philosophy block further down the page was removed; there is exactly one Philosophy section.
  - Premium About Casen Living was moved to sit between Shop by Room and Featured Pieces (previously appeared after Featured Pieces). Its Pearl Gray background / Deep Teal text styling is unchanged.
  - Final Premium homepage order: Header → Hero → Brand Philosophy → Shop by Room → About Casen Living → Featured Pieces → 3 stacked promo banners → Thoughtfully Crafted → FAQ → Footer.
  - Supplier Berdasarkan Wilayah (standard) now sits on a Pearl Gray `#e2dfdc` section background.
  - Verified via local production build: zero "Better Space" occurrences in rendered DOM across 12+ standard/Premium routes, zero horizontal overflow, zero console/page errors, functional add-to-cart and category navigation still work, Premium section order confirmed via DOM traversal and visual inspection.
- Dials: ENERGY 2 / RHYTHM 2 / MOTION 1. Only functional hover/menu feedback is used; no decorative looping motion.
- Every homepage action either goes to an existing product/category route, scrolls to an existing section, opens/closes the mobile menu, changes product tabs, adds to cart/wishlist, or provides inline form confirmation.

## Exclusions
No authentication, payment processing, inventory, order tracking backend, or actual supplier CRM submission. Error routes demonstrate the UX contract only and do not claim that these integrations exist.

## Figma assets
No production Figma asset URL is used. The only frame is a bitmap thumbnail, and variables were empty.