"use client";
import Image from "next/image";
import Link from "next/link";
import { premiumCatalog } from "@/lib/premium-catalog";
import { PremiumFooter, PremiumHeader, PremiumProductCard, usePremiumStore } from "./PremiumShell";

const rooms = [
  { slug: "living", name: "Living Room", image: "https://images.pexels.com/photos/6758245/pexels-photo-6758245.jpeg?auto=compress&cs=tinysrgb&h=900&w=700" },
  { slug: "dining", name: "Dining", image: "https://images.pexels.com/photos/7180275/pexels-photo-7180275.jpeg?auto=compress&cs=tinysrgb&h=900&w=700" },
  { slug: "bedroom", name: "Bedroom", image: "https://images.pexels.com/photos/30287057/pexels-photo-30287057.jpeg?auto=compress&cs=tinysrgb&h=900&w=700" },
  { slug: "office", name: "Office", image: "https://images.pexels.com/photos/7071/space-desk-office-workspace.jpg?auto=compress&cs=tinysrgb&h=900&w=700" },
];

const featuredIds = ["luna-sofa", "bed-frame-laras-king-upholstered", "dining-table-gading-round-120", "desk-rakha-teak-130", "cabinet-lara-wide", "sofa-ranu-3s"];
const featured = featuredIds.map((id) => premiumCatalog.find((p) => p.id === id)).filter(Boolean) as typeof premiumCatalog;

const lookIds = ["sofa-ranu-3s", "coffee-table-riko-round", "armchair-sena-lounge"];
const lookProducts = lookIds.map((id) => premiumCatalog.find((p) => p.id === id)).filter(Boolean) as typeof premiumCatalog;

export default function PremiumHome() {
  const store = usePremiumStore();
  return (
    <>
      <a className="premium-skip" href="#premium-content">Skip to content</a>
      <PremiumHeader store={store} />
      <main id="premium-content">
        <section className="premium-hero" aria-labelledby="premium-hero-title">
          <Image src="https://images.pexels.com/photos/6758245/pexels-photo-6758245.jpeg?auto=compress&cs=tinysrgb&h=1200&w=1920" alt="Living room with a low sofa and layered cushions" fill priority sizes="100vw" />
          <div className="premium-hero-copy">
            <span>Casen Living</span>
            <h1 id="premium-hero-title">Beautiful Furniture for the Way You Actually Live</h1>
            <p>Thoughtfully designed pieces for everyday comfort, quality materials, and a home that feels like yours.</p>
            <div className="premium-hero-ctas">
              <Link href="/premium/living" className="primary">Shop Living</Link>
              <Link href="/premium/dining" className="secondary">Shop Dining</Link>
            </div>
          </div>
        </section>

        <section className="premium-section">
          <div className="premium-shell">
            <div className="premium-section-head"><h2 className="premium-serif">Shop by Room</h2></div>
            <div className="premium-rooms">
              {rooms.map((room) => (
                <Link key={room.slug} href={`/premium/${room.slug}`}>
                  <Image src={room.image} alt={room.name} fill sizes="(max-width:720px) 50vw, 25vw" />
                  <h3 className="premium-serif">{room.name}</h3>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="premium-section tight">
          <div className="premium-shell">
            <div className="premium-section-head"><h2 className="premium-serif">Featured Pieces</h2></div>
            <div className="premium-products">
              {featured.map((p) => <PremiumProductCard key={p.id} product={p} store={store} />)}
            </div>
          </div>
        </section>

        <section className="premium-section">
          <div className="premium-shell premium-look">
            <div className="premium-look-image">
              <Image src="https://images.pexels.com/photos/6480707/pexels-photo-6480707.jpeg?auto=compress&cs=tinysrgb&h=1000&w=900" alt="Styled living room scene" fill sizes="(max-width:1024px) 100vw, 50vw" />
            </div>
            <div className="premium-look-copy">
              <h2 className="premium-serif" style={{ marginBottom: 16 }}>Shop the Look</h2>
              <p className="lede">A warm, minimal living room: a low sofa, a marble coffee table, and a lounge chair that finishes the corner. Recreate the whole look at home.</p>
              {lookProducts.map((p) => (
                <Link key={p.id} href={`/premium/product/${p.id}`} className="premium-look-item">
                  <Image src={p.image} width={64} height={64} alt={p.name} />
                  <div>
                    <h4>{p.name}</h4>
                    <strong>{new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(p.price)}</strong>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="premium-craft premium-section">
          <div className="premium-shell">
            <h2 className="premium-serif" style={{ fontSize: 32, marginBottom: 18 }}>Thoughtfully Crafted</h2>
            <p className="premium-craft-copy">Every piece at Casen Living is chosen and finished with intention. We work with skilled makers to create furniture that fits real, everyday life, not just a photograph.</p>
            <div className="premium-craft-stats">
              <div><div>1 Week</div><p>Delivery Timeline</p></div>
              <div><div>100%</div><p>Thoughtful Selection</p></div>
              <div><div>Premium</div><p>Materials &amp; Design</p></div>
            </div>
          </div>
        </section>
      </main>
      <PremiumFooter />
    </>
  );
}
