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
Top utility, commerce header, primary categories, sidebar/hero/service cards, benefits, offers, categories, room collections, supplier quote, product recommendations, additional services, supplier regions, footer.

## Architecture
Next.js App Router, TypeScript, CSS, local public image assets, React client state for search/menu/tabs/wishlist/cart/form feedback. No database, checkout, login, CMS, or external runtime imagery.

## Accessibility and performance
Semantic sections, labels, live feedback, visible keyboard focus, native buttons/links, local optimized image files and responsive grids. Target no horizontal mobile overflow.

## SEO
Metadata includes title and product-marketplace description. Semantic headings and descriptive image alt text.

## Deployment
GitHub-connected Vercel deployment, branded URL `preview6.aspireomedia.com`.

## Exclusions
No authentication, payment processing, inventory, order tracking backend, or actual supplier CRM submission.

## Figma assets
No production Figma asset URL is used. The only frame is a bitmap thumbnail, and variables were empty.