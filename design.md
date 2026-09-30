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

## Account and order preview routes
The Figma UI Kit surfaces now have honest preview routes: `/orders/[id]`, `/account/security`, `/register`, and `/sign-in`. These routes deliberately do not collect or persist credentials, orders, or payment data. `/account`, `/orders`, and the new routes remain presentational previews until authentication, order persistence, and payment integrations are approved.

## Error-state coverage
A shared `ErrorExperience` provides Indonesian recovery screens for routing, unavailable/timeout, payment, order, inventory, cart/search, validation/rate-limit, session/role, and product-upload states. Dynamic `/status/[state]` routes make each state independently testable; App Router `not-found.tsx`, `error.tsx`, and `global-error.tsx` prevent raw framework output from reaching users. Deep teal keeps the recovery action aligned with marketplace navigation, while the warm-white card preserves the existing shopping canvas. No decorative motion is used so the state remains focused; every state plainly says whether payment occurred and supplies one primary action.

## Homepage merchandising and catalogue state
The homepage recommendations grid is driven by `tabbed` in `src/app/page.tsx`: "Terlaris" renders `catalog.slice(0, 10)`, while "Produk Baru" (`isNew`) and "Penawaran Spesial" (`oldPrice`) filter the catalog **without any cap**. Those caps are placeholders, not merchandising rules — there is no sales or popularity data yet. The default tab's 10 and the filtered tabs' sizes must be revisited as the catalogue populates, and a filtered tab must be capped too. Temporary options: a hand-curated product ID list (the pattern preview7 uses), badge-driven selection, or room-balanced selection.

This preview has **not** been reseeded from the shared pack (`/home/ubuntu/aspireomedia/furniture-catalog/`). It still carries the old hand-authored 21-product catalogue with local imagery, and 15 of those 21 products share a photo with another product (7 duplicate image groups — e.g. `luna-sofa`/`nara-sofa` both use `products/product1.jpg`, `lento-desk`/`niko-desk`/`arli-lamp` all use `products/product4.jpg`). That is the reported "different names, same image" defect, still open here. Reseeding from `out/preview6-products.ts` (100 products, distinct Pexels photos) is the fix. It also means the badge-dependent tabs are thin: only 1 item is `isNew` and 2 carry `oldPrice`, so those tabs currently render a near-empty grid.

## Exclusions
No authentication, payment processing, inventory, order tracking backend, or actual supplier CRM submission. Error routes demonstrate the UX contract only and do not claim that these integrations exist.

## Figma assets
No production Figma asset URL is used. The only frame is a bitmap thumbnail, and variables were empty.