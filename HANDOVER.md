# HANDOVER — Better Space / Rumaio Ecommerce (Preview 6)

Handover document for continuing work in a new session or with a different model.
Last updated: 2026-09-30 (commit `0dfd53c`, after the GitHub repo rename).

---

## 1. Project identity

| Item | Value |
|---|---|
| Local path | `/home/ubuntu/aspireomedia/preview6-rumaio-ecommerce` |
| GitHub repo | `aspireomedia/rumaio-ecommerce-preview6` (renamed from `preview6-rumaio-ecommerce` on 2026-09-30) |
| Git branch | `main` |
| Vercel project | `preview6-rumaio-ecommerce` (scope `aspireomedias-projects`) — **Vercel project name was NOT renamed**, only the GitHub repo |
| Branded URL | https://preview6.aspireomedia.com |
| Brand name shown | **Better Space** — "FURNITURE FOR A BETTER LIVING." |
| Stack | Next.js 16.3.7 (App Router, Turbopack) · React 19.2.8 · TypeScript · plain CSS · lucide-react |
| Node | 24.x on Vercel |

Internal codename history: started as "RUMAIO ecommerce preview" (commit `8d10aae`), rebranded to Better Space (`7d30365`). The product name in the UI is Better Space; the repo keeps "rumaio-ecommerce" for continuity.

**Git identity for this repo is mandatory** — Vercel enforces commit-author checks:
```
git config user.name aspireomedia
git config user.email aspireomedia@gmail.com
```
Never commit with a different author or the Vercel deploy is rejected.

---

## 2. The original goal (J Kal)

> preview 6, continue adjusting the colors, product, and style to be furniture like the home page for ALL pages. Sample structure is [Figma E-Commerce UI Kit `0SzpXe5ng7xaKgpTk3Lhk9`] — use as reference. **But do not use their images and naming.** Use the existing preview 6 homepage as base for product (furniture), product types, colors, text, names, etc. Make sure **the products are all linked together**.

Constraints that follow from this:
- Figma supplies **structure only** (which pages exist, how they are laid out). No Figma imagery, no Figma copy, no Figma brand names.
- The **preview 6 homepage is the design authority** for palette, typography, product naming, and product taxonomy.
- "All linked together" = every product surface must actually navigate to a working product detail page, and cart/wishlist must be consistent everywhere.

---

## 3. Current state — what is verified working

Verified with Playwright against a real production build (`next build` + `next start`) **and** against the live Vercel deployment. Not inferred from source reading.

### Routes (all HTTP 200, zero horizontal overflow at 1440px and 390px)

| Route | Status | Notes |
|---|---|---|
| `/` | OK | Homepage, commerce hero + 21 products |
| `/products` | OK | Catalog listing with category filter + sort |
| `/products/[id]` | OK | 21 product detail pages, all reachable |
| `/cart` | OK | Reads shared cart store |
| `/wishlist` | OK | Reads shared wishlist store |
| `/account` | Partial | Profile stub + link to orders. No real auth. |
| `/orders` | Partial | Empty-state only. No order detail route. |
| `/status/[state]` | OK | 9 error-state demos |

### Click-through suite — 11/11 pass with zero console/page errors

1. Homepage product **image** → `/products/luna-sofa` ✅
2. Homepage product **name** → `/products/luna-sofa` ✅
3. Homepage **promo** card → `/products?category=Ruang%20Tamu` ✅
4. Homepage **collection banner** → `/products?category=Ruang%20Tamu` ✅
5. Homepage **category card** → `/products?category=Ruang%20Tamu` ✅
6. Homepage **sidebar category** → `/products?category=Ruang%20Tamu` ✅
7. Homepage **main nav** category → `/products?category=Ruang%20Tamu` ✅
8. Homepage **wishlist toggle** → persists, appears on `/wishlist` ✅
9. Homepage **Tambah (add to cart)** → persists, appears on `/cart` ✅
10. Header **wishlist icon** → `/wishlist` ✅
11. `/products` **catalog card** → `/products/luna-sofa` ✅

### Palette — unified across every page

`furniture.css` `:root` is the single source of truth. Homepage teal family:

```
--teal:#0a5b60  --teal-dark:#06494d  --aqua:#dbeeed  --ink:#1f2930
--muted:#66747a  --line:#dde4e3  --paper:#fffefa  --soft:#f4f7f6  --accent:#c67138
```

The storefront previously carried the Figma UI Kit's blue-slate tokens (`--slate`, `--ice`, `--dusty`). These are now **aliases of the homepage teal**, not separate values. Verified by fetching the live production CSS bundle and confirming `--slate:#06494d` with zero occurrences of the old blue hexes `3b4c66 / 8e9fb8 / d8e7ff / d4d4d1`.

---

## 4. THE BUG J KAL REPORTED — "I can't click to get to product detail page"

**Status: FIXED and verified on production.** Root cause was deeper than it looked. Two independent defects were stacked:

### Defect A — Homepage cards were never links (the visible symptom)

`src/app/page.tsx` is a **standalone implementation** that predates the storefront. It had its own hardcoded product array and rendered:

```jsx
<div className="product-image">
  <Image src={p.image} fill .../>          {/* not clickable, no <Link> */}
  <button onClick={...}>...</button>       {/* wishlist only */}
</div>
```

No `<Link>` anywhere on the card image or name. Only the wishlist heart and "Tambah" button had handlers. So the card could never navigate — this was a genuine missing feature, not a styling issue.

**Fix:** wrapped the image and the product name in `<Link href={`/products/${p.id}`}>`.

### Defect B — React hydration failure silently killed ALL click handlers (the real root cause)

After linking the cards, clicks *still* did nothing. Investigation showed **every** interaction on the page was dead — including a plain `useState` tab button that had nothing to do with links. Diagnosis path:

- `Object.getOwnPropertyNames(button)` on a live button returned `[]` — **no `__reactProps$…` / `__reactFiber$…` key**, i.e. React had never attached to the DOM node.
- Raw `document.addEventListener('click', …, true)` *did* capture clicks → the DOM was fine, React was not attached.
- Console showed React error **#418** (hydration mismatch: server HTML ≠ client render).

Cause, in `src/app/furniture/FurnitureShell.tsx`:

```js
// BROKEN — reads sessionStorage during the render that must match the server
const [cart]   = useState<CartLine[]>(() => readStore('better-space-cart'));
const [wishes] = useState<string[]>(() => readStore('better-space-wishes'));
```

`readStore` returns `[]` on the server but real data on the client's first render. Server HTML and client tree disagreed → hydration threw → **React abandoned hydration for the whole tree** → no event handlers attached anywhere on the page. Because this store is used by *every* storefront page, the same failure was latent site-wide.

**Fix** — canonical mount-then-sync pattern:

```js
export function useStore(){
  const [cart,setCart]=useState<CartLine[]>([]);
  const [wishes,setWishes]=useState<string[]>([]);
  const [notice,setNotice]=useState('');
  const [hydrated,setHydrated]=useState(false);
  useEffect(()=>{
    // eslint-disable-next-line react-hooks/set-state-in-effect -- syncing from browser-only sessionStorage after mount to avoid SSR/client hydration mismatch
    setCart(readStore<CartLine[]>('better-space-cart'));
    setWishes(readStore<string[]>('better-space-wishes'));
    setHydrated(true);
  },[]);
  // …saveCart / saveWishes / add / remove / quantity / toggle unchanged
  return {cart,wishes,notice,setNotice,add,remove,quantity,toggle,hydrated};
}
```

Initial state is always `[]` (matches SSR), then an effect fills it from `sessionStorage` after mount. `hydrated` is exposed so any future code that must not render store-dependent markup pre-hydration can gate on it.

**Verification:** zero React #418 errors across all 7 routes; the Playwright click suite went from 0/11 to 11/11.

### Third bug found during the same QA pass

`.product-image > a` inside a `position:relative` wrapper with `Image fill` collapsed to **0×0** because the `<Link>` itself had no size — a `fill` image needs its direct parent to be positioned *and* sized. Fixed in `globals.css`:

```css
.product-image{position:relative;aspect-ratio:1/1;overflow:hidden;background:#edf1ef}
.product-image>a{position:absolute;inset:0;display:block;z-index:1}
.product-image button{z-index:2;position:absolute;...}   /* stays clickable above the link */
```

Note the z-index layering: the wishlist button must sit **above** the stretched link or the heart becomes unclickable.

Also fixed in the same pass: `.store-search{flex:1}` needed `min-width:0` — without it the mobile header overflowed 390px → 516px on `/wishlist`, `/account`, `/orders`. Classic flexbox min-content trap.

---

## 5. Files that matter

```
src/app/page.tsx                          Homepage. Standalone; uses catalog + useStore.
src/app/furniture/FurnitureShell.tsx      StoreHeader, StoreFooter, PageTitle, ProductCard,
                                          FilterBar, CartPanel, useStore  ← central shared module
src/app/furniture/furniture.css           ALL storefront styling. :root tokens live here.
src/app/globals.css                       Homepage styling + :root. Consumed by furniture.css.
src/lib/catalog.ts                        THE single product source of truth — 21 products.
src/app/products/page.tsx                 Catalog listing (category + sort via searchParams)
src/app/products/[id]/page.tsx            Product detail
src/app/cart|wishlist|account|orders/     Storefront pages, all built on FurnitureShell
src/app/status/[state]/page.tsx           9 error-state demos
src/components/ErrorExperience.tsx        Shared Indonesian error recovery UI
src/app/{error,global-error,not-found}.tsx Framework error boundaries
public/images/                            Local furniture photography (products/, categories/, hero/)
design.md                                 Design + architecture source of truth
.reo/context.md                           Compact operational context
```

`catalog.ts` is the linchpin — homepage, listing, detail, cart, wishlist, and the header search all resolve products through it. **Never reintroduce a second product array.** That duplication is exactly what created Defect A.

Product taxonomy: 21 items across `Ruang Tamu`, `Kamar Tidur`, `Ruang Makan`, `Ruang Kerja`, `Penyimpanan`, `Dekorasi Rumah`, `Pencahayaan`. Grouped by `relatedGroup` (`sofa`, `bed`, `dining-table`, `desk`, `office-chair`, `cabinet`, `shelf`, `rug`, `table-lamp`, `coffee-table`, `wardrobe`) which powers related-product recommendations on the detail page.

---

## 6. REMAINING WORK

### 6.1 Missing pages vs the Figma UI Kit structure (highest priority)

The Figma kit's Cover frames are: Homepage, **List**, **Product**, **Cart**, **Orders**, **Order Details**, **Wishlist**, **User Information**, **Security**, **Register**, **Sign In**.

Built: Homepage, List, Product, Cart, Orders, Wishlist, User Information (as `/account`).
**Not built — these are the gap:**

| Missing | Suggested route | Notes |
|---|---|---|
| Order Detail | `/orders/[id]` | Should show line items, quantities, totals, status timeline. Wire the wishlist/cart store shape, or seed 2–3 demo orders so it is not an empty state. |
| Security | `/account/security` | Password / 2FA / session list. Presentational only in a preview; must not imply real auth. |
| Register | `/register` | Form + validation states. No real account creation. |
| Sign In | `/sign-in` | Form + error states. The `/account` "Masuk ke akun" button currently only fires a toast — point it here once the page exists. |

Build each with the **same FurnitureShell components and the same teal palette**. Do not invent a new visual system; J Kal rejected exactly that kind of drift before.

### 6.2 Structural fidelity to the Figma reference

Only the route architecture has been adopted so far. The Figma nodes themselves were flattened bitmaps, so per-page layout was **not** copied. If J Kal asks for closer structural fidelity, re-inspect the Figma file via MCP (`get_design_context` / `get_screenshot` per frame) and compare against the built pages. Note in `design.md` what was and was not adopted.

### 6.3 Placeholder links still present on the homepage

`href="#footer"` ×11 (social icons), `href="#quote"` ×3, `href="#regions"` ×1, `href="#content"` ×1 (skip link — this one is legitimate).

The `#footer` / `#quote` anchors resolve to in-page sections, so nothing is broken, but the social icons are decorative placeholders. Either leave as-is (a preview convention) or point them at real destinations if J Kal supplies them. **Do not silently invent external URLs.**

### 6.4 Known limitations to keep honest

- No auth, no payment, no inventory, no order backend, no CMS. `/account`, `/orders`, `/cart` are **presentational previews**.
- Cart and wishlist live in `sessionStorage` — they reset when the tab closes. If persistence across sessions is wanted, move to `localStorage` (one-line change in `readStore` / `saveCart` / `saveWishes`) or a real backend.
- Copy on `/account` and `/orders` explicitly says the feature is preview-only. **Do not remove those disclaimers** unless the real integration ships.
- Some product images are shared across two products (e.g. `product1.jpg` serves both `luna-sofa` and `nara-sofa`). Acceptable for a preview; worth noting if visual variety is requested.

---

## 7. Environment gotchas that WILL waste your time

### 7.1 `next dev` cannot be QA'd in this sandbox — use a production build

This cost significant time. Under `next dev` (Turbopack), the browser in this environment fails the HMR WebSocket handshake and Next.js logs:

```
⚠ Blocked cross-origin request to Next.js dev resource /_next/hmr from "127.0.0.1".
```

The blocked dev resource **prevents React from hydrating**. Symptom: every click does nothing, `__reactFiber` is absent from DOM nodes. It looks exactly like the real hydration bug described in §4 — but it is a **dev-server artifact, not a product bug.**

**Always QA against a production build:**

```bash
cd /home/ubuntu/aspireomedia/preview6-rumaio-ecommerce
npm run build
PORT=3004 npm run start          # then browse http://127.0.0.1:3004
```

Alternative if you must use `next dev`: add `allowedDevOrigins: ['127.0.0.1']` to `next.config.ts`. This was **not** committed — the production build is the honest test target and it is what Vercel serves.

Port hygiene: `EADDRINUSE` happens often. Clear it with `fuser -k 3004/tcp` before starting.

### 7.2 Playwright is borrowed from the preview7 install

There is no local Playwright dependency here. Use:

```bash
NODE_PATH=/home/ubuntu/aspireomedia/preview7-better-space/node_modules node script.js
```

Do not `npm install playwright` into this repo — it is a heavy dependency and the shared install works.

### 7.3 `elementFromPoint` returns `null` for off-viewport elements

When probing clickability, call `scrollIntoViewIfNeeded()` first, or Playwright's `.click()` will complain about an element outside the viewport while your `elementFromPoint` probe reports a misleading `null`.

### 7.4 `next dev` rewrites `AGENTS.md`

`node_modules/next/dist/docs/` holds the docs for this Next.js version and the version has breaking changes vs older training data. `next dev` re-adds a `<!-- BEGIN:nextjs-agent-rules -->` block to `AGENTS.md`; commit it with your work to keep the tree clean rather than fighting the diff.

---

## 8. Reusable verification recipe

Run this before claiming any change is done. It caught all three bugs in §4.

```bash
cd /home/ubuntu/aspireomedia/preview6-rumaio-ecommerce
npm run lint && npx tsc --noEmit && npm run build

# production server
fuser -k 3004/tcp 2>/dev/null; sleep 1
PORT=3004 npm run start   # background

NODE_PATH=/home/ubuntu/aspireomedia/preview7-better-space/node_modules node - <<'NODE'
const {chromium}=require('playwright');
(async()=>{
  const b=await chromium.launch({headless:true});
  const p=await b.newPage({viewport:{width:1440,height:900}});
  let errors=[];
  p.on('pageerror',e=>errors.push('PAGEERROR: '+e.message));   // catches React #418

  // load every route, assert no errors
  for (const u of ['/','/products','/products/luna-sofa','/cart','/wishlist','/account','/orders'])
    await p.goto('http://127.0.0.1:3004'+u,{waitUntil:'networkidle'});

  // the click that J Kal reported
  await p.goto('http://127.0.0.1:3004/',{waitUntil:'networkidle'});
  await p.locator('.product-grid .product-image a').first().click();
  await p.waitForURL('**/products/**',{timeout:5000});
  console.log('url:', p.url(), '| h1:', await p.locator('h1').first().textContent());

  console.log('errors:', JSON.stringify(errors));   // MUST be []
  await b.close();
})();
NODE
```

Overflow check — every route, both breakpoints, `scrollWidth === clientWidth`:

```js
const d = await page.evaluate(()=>({
  sw: document.documentElement.scrollWidth,
  cw: document.documentElement.clientWidth
}));
// sw === cw required
```

**Do not claim a change works from `npm run build` success, HTTP 200, or reading the source.** Build success says nothing about hydration or clickability — that is precisely how Defect B hid for so long.

---

## 9. Deploy procedure

```bash
cd /home/ubuntu/aspireomedia/preview6-rumaio-ecommerce
git config user.name aspireomedia
git config user.email aspireomedia@gmail.com
git add -A
git commit -m "…"
git push origin main                       # triggers Vercel auto-deploy
vercel --prod --yes                        # explicit prod deploy
```

Then verify the live site, not localhost:

```bash
curl -sS -o /dev/null -w "%{http_code}\n" https://preview6.aspireomedia.com/
```

Delivery report J Kal expects — **all three**:
1. GitHub commit SHA
2. Vercel preview URL
3. Branded URL (`https://preview6.aspireomedia.com`)

### DNS / TLS note

`preview7` hit an issue where DNS was correct and HTTP worked but **HTTPS failed the TLS handshake** because Vercel had never auto-issued the certificate. Fix:

```bash
vercel certs issue <domain> --scope aspireomedias-projects
```

If `preview6.aspireomedia.com` ever fails the same way, that is the command. Verify with `vercel certs ls --scope aspireomedias-projects`.

---

## 10. Repo rename record (2026-09-30)

J Kal asked to rename the GitHub repo with a `-preview6` suffix. Option chosen: match the existing `better-space-preview7` / `preview_furniture5-preview5` convention.

```bash
gh repo rename rumaio-ecommerce-preview6 \
  --repo aspireomedia/preview6-rumaio-ecommerce --yes
git remote set-url origin https://github.com/aspireomedia/rumaio-ecommerce-preview6.git
```

Verified: `git ls-remote origin main` returns the expected HEAD; GitHub redirects the old name.

**Deliberately NOT changed:**
- The Vercel project is still named `preview6-rumaio-ecommerce`. Vercel tracks the GitHub repo by internal ID, so the rename does not break auto-deploy. Renaming the Vercel project would change its auto-generated `*.vercel.app` preview URLs — no benefit, real risk.
- The local directory is still `preview6-rumaio-ecommerce`. Renaming it would invalidate absolute paths used in tooling and docs.

---

## 11. Suggested first actions for the next session

1. Read `design.md`, `.reo/context.md`, and this file. Read `FurnitureShell.tsx` and `catalog.ts` before touching any UI.
2. Confirm the rename is still healthy: `cd /home/ubuntu/aspireomedia/preview6-rumaio-ecommerce && git ls-remote origin main`.
3. Run the §8 verification recipe once to establish a clean baseline.
4. Build the four missing pages in §6.1, starting with Order Detail (`/orders/[id]`), reusing `FurnitureShell` components and the existing teal tokens. Screenshot desktop + mobile before reporting done.
5. Update `design.md` and `.reo/context.md` when the page set changes.
6. Never commit with an author other than `aspireomedia <aspireomedia@gmail.com>`.


## Follow-up work completed (2026-09-30)

### Complete furniture seed and deduplication

- Expanded the canonical `src/lib/catalog.ts` from 19 unique existing entries to **119 unique furniture listings** across living room, bedroom, dining, office, storage, lighting, and home decor.
- Seed taxonomy follows the established Preview 5 and Preview 7 furniture structure, while public names, copy, images, and product IDs remain local to Preview 6.
- Removed duplicate canonical seed rows where the expansion repeated existing `luna-sofa` and `nara-sofa` entries.
- Verified mechanically: `119 item(...)` calls and `119` unique IDs.
- `uniqueCatalog` now merges the original catalog with the expanded seed and is used by homepage, product listing, PDP lookup, related products, header search, cart, wishlist, and category filters.
- Avoided extending the homepage to the full catalogue: homepage merchandising remains capped at its existing curated slice; the full catalogue is available at `/products`.
- Verified local production build and rendered interactions: `/products` showed `119 produk tersedia`; add-to-cart created one cart line; wishlist toggle created one saved card; routes `/`, `/products`, `/products/nara-sofa`, `/cart`, and `/wishlist` had no page errors and no mobile overflow at 390px.
- Deployed production commit `e19f13f` as Vercel deployment `dpl_3uDaAmxcRT9zTqMFneayUd7CdFjz`; branded routes returned HTTP 200.

### Remaining ecommerce scope

- Account and orders remain honest preview states until authentication, database persistence, and payment/order APIs are approved and implemented.

## Follow-up work completed (2026-09-30)

- Added `uniqueCatalog`, a canonical ID-deduped view of the shared catalog. Homepage, catalogue, wishlist, related products, cart lookup, and header search now use the canonical view where listing duplication matters.
- Added URL-backed category filtering on `/products?category=...`, sorting by featured/rating/price, visible result count, and an honest empty state. Wrapped `useSearchParams` in `Suspense` so the production build remains valid.
- Added a visible wishlist empty-state link to the catalogue and `aria-pressed` to wishlist controls.
- Preserved all furniture listing names/images as Better Space originals; no Figma product names or images were introduced.
- Verified with `npm run lint`, `npx tsc --noEmit`, `npm run build`, and a local production server on port 3004: all seven routes had zero console/page errors, mobile `scrollWidth === clientWidth`, homepage product click opened `/products/luna-sofa`, add-to-cart produced one cart line, and wishlist toggle produced one wishlist card.
- Deployed production again after the follow-up fixes.
- Latest commits: `694b28a` (canonical catalogue and catalogue controls) and `db0c169` (canonical cart/search lookups).
- Latest Vercel deployment: `dpl_FUbz7N2d4Rtb6cEom4TBqHy9Cfne`; branded URL remains `https://preview6.aspireomedia.com`.

### Remaining product scope

- `/account` and `/orders` remain honest preview states, not authentication or order persistence.
- Checkout remains a preview notice; no payment/order backend exists.
- Order detail, sign-in, register, and security routes from the reference UI kit are still not implemented.
- Production live browser click verification was limited by the browser-harness daemon being unavailable in this session; HTTP 200 and the full local production click-through are verified.
