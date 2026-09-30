State: Better Space storefront is live at preview6.aspireomedia.com. Preview 6 catalogue is now reseeded from the shared furniture-catalog pack used by Preview 5 and Preview 7: 100 canonical furniture products across Ruang Tamu, Kamar Tidur, Ruang Makan, Ruang Kerja, Penyimpanan, Pencahayaan, and Dekorasi Rumah. The source has 100 unique IDs, names, and Pexels source images. Existing public slugs `luna-sofa` and `arka-dining` are retained for compatibility.

Homepage recommendations are capped at 10 cards per tab. Local rendered QA verified each tab has unique names and images: Terlaris 8, Produk Baru 7, Penawaran Spesial 10. The full seeded catalogue is on `/products`.

QA recipe: use npm run lint && npx tsc --noEmit && npm run build, then PORT=3004 npm run start. Do not use next dev for QA because sandbox HMR can block hydration. Reseed QA passed production build, clickable card to PDP, 390px no-overflow, and zero browser console/page errors.

Homepage rebuilt on 2026-09-30 as a scoped RUMAIO reference reconstruction: `/` now uses `HomeMarketplace.tsx` and `home-marketplace.css` only. Existing storefront routes are not styled through those files. Desktop QA must assert: 4 promos, 6 top categories, 2 collection banners + 8 4x2 tiles, 10 recommendations (5x2), 4 services, 6 supplier regions. Production build QA uses `PORT=3004 npm run start`; never `next dev`. Remaining: authentication, order persistence, payment, and inventory integrations are not implemented. Honest preview routes exist for Order Detail (`/orders/[id]`), Security (`/account/security`), Register (`/register`), and Sign In (`/sign-in`). Full detail is in HANDOVER.md.

Delivery: GitHub repo aspireomedia/rumaio-ecommerce-preview6; branded URL https://preview6.aspireomedia.com.
