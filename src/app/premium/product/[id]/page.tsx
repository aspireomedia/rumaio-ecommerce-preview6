"use client";
import Image from "next/image";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { useState } from "react";
import { Award, Heart, Minus, Plus, RotateCcw, Shield, ShoppingBag, Star, Truck } from "lucide-react";
import { premiumFormatPrice, premiumProductById, premiumRelated } from "@/lib/premium-catalog";
import { PremiumFooter, PremiumHeader, PremiumProductCard, roomLabels, usePremiumStore } from "../../PremiumShell";

const reviews = [
  { author: "Jakarta homeowner", rating: 5, text: "Even more beautiful in person than the photos. Fits our living room perfectly.", verified: true },
  { author: "Design enthusiast", rating: 5, text: "The craftsmanship is impeccable and it arrived carefully packed.", verified: true },
  { author: "Repeat customer", rating: 4, text: "Great quality and true to the listed dimensions. Assembly took a bit longer than expected.", verified: true },
];

export default function PremiumProductPage() {
  const store = usePremiumStore();
  const params = useParams();
  const id = params.id as string;
  const product = premiumProductById(id);
  const [quantity, setQuantity] = useState(1);
  if (!product) notFound();
  const saved = store.wishes.includes(product.id);
  const related = premiumRelated(product);
  const avg = reviews.reduce((s, r) => s + r.rating, 0) / reviews.length;

  return (
    <>
      <PremiumHeader store={store} />
      <main>
        <section className="premium-pdp-hero">
          <Image src={product.image} alt={product.name} fill priority sizes="100vw" />
          <div className="premium-pdp-card">
            <Link href="/premium" className="premium-crumb">&larr; Back to Casen Living</Link>
            <p className="category">{roomLabels[product.room]}</p>
            <h1 className="premium-serif">{product.name}</h1>
            <div className="price-row">
              <strong>{premiumFormatPrice(product.price)}</strong>
              {product.oldPrice && <del>{premiumFormatPrice(product.oldPrice)}</del>}
            </div>
            <p className="description">{product.description}</p>
            <div className="premium-qty">
              <label htmlFor="qty" style={{ fontSize: 13, fontWeight: 700 }}>Qty</label>
              <div>
                <button aria-label="Decrease quantity" onClick={() => setQuantity((q) => Math.max(1, q - 1))}><Minus size={14} /></button>
                <span id="qty">{quantity}</span>
                <button aria-label="Increase quantity" onClick={() => setQuantity((q) => q + 1)}><Plus size={14} /></button>
              </div>
            </div>
            <button className="cta-add" onClick={() => { for (let i = 0; i < quantity; i++) store.add(product.id); }}>Add to Cart</button>
            <button className={`cta-wish ${saved ? "saved" : ""}`} onClick={() => store.toggle(product.id)}>
              <Heart size={18} fill={saved ? "currentColor" : "none"} /> {saved ? "Added to Wishlist" : "Add to Wishlist"}
            </button>
            <div className="premium-pdp-benefits">
              <div><Truck size={16} /> Careful, insured delivery</div>
              <div><RotateCcw size={16} /> Returns supported, contact our team</div>
              <div><Shield size={16} /> Quality checked before dispatch</div>
            </div>
          </div>
        </section>

        <section className="premium-shell premium-pdp-main">
          <div>
            <div className="premium-pdp-gallery">
              <Image src={product.image} alt={product.name} fill sizes="(max-width:1024px) 100vw, 60vw" />
            </div>
            <div className="premium-colors" aria-label="Available colors">
              {product.colors.map((c) => <span key={c}>{c}</span>)}
            </div>
          </div>
          <div className="premium-about-block">
            <h3 className="premium-serif">About This Piece</h3>
            <div className="premium-detail-list">
              <div><p className="label">Material</p><p className="value">{product.material}</p></div>
              <div><p className="label">Color</p><p className="value">{product.color}</p></div>
              <div><p className="label">Dimensions</p><p className="value">W: {product.width} &times; D: {product.depth} &times; H: {product.height}</p></div>
              <div><p className="label">Care</p><p className="value">Wipe with a soft, dry cloth. Avoid direct sunlight and harsh cleaning agents on upholstered surfaces.</p></div>
            </div>
            <div className="premium-why-ship">
              <h3 className="premium-serif" style={{ marginBottom: 4 }}>Why Shop With Casen Living</h3>
              <article><Truck size={22} /><div><h4>Careful Delivery</h4><p>Every piece is packed and delivered with care. Contact our team for delivery timing in your area.</p></div></article>
              <article><RotateCcw size={22} /><div><h4>Returns Support</h4><p>Contact our team for assistance with eligibility and next steps.</p></div></article>
              <article><Shield size={22} /><div><h4>Quality Checked</h4><p>Every piece is inspected before it leaves for delivery.</p></div></article>
              <article><Award size={22} /><div><h4>Curated Selection</h4><p>Thoughtfully chosen pieces, not mass filler.</p></div></article>
            </div>
          </div>
        </section>

        <section className="premium-reviews">
          <div className="premium-shell premium-reviews-inner">
            <h3 className="premium-serif" style={{ marginBottom: 20 }}>Customer Reviews</h3>
            <div className="premium-review-summary">
              <div style={{ display: "flex", gap: 2 }}>
                {Array.from({ length: 5 }).map((_, i) => <Star key={i} size={18} fill={i < Math.round(avg) ? "currentColor" : "none"} color="#c08a2c" />)}
              </div>
              <div>
                <strong>{avg.toFixed(1)} out of 5</strong>
                <p style={{ margin: 0, fontSize: 12, color: "var(--premium-muted)" }}>Based on {reviews.length} verified reviews</p>
              </div>
            </div>
            {reviews.map((r, i) => (
              <div key={i} className="premium-review-card">
                <div className="head">
                  <div>
                    <strong>{r.author}</strong>
                    {r.verified && <p className="verified">Verified Purchase</p>}
                  </div>
                  <div style={{ display: "flex", gap: 2 }}>
                    {Array.from({ length: 5 }).map((_, j) => <Star key={j} size={14} fill={j < r.rating ? "currentColor" : "none"} color="#c08a2c" />)}
                  </div>
                </div>
                <p style={{ margin: 0, fontSize: 13, color: "#4c5a58" }}>{r.text}</p>
              </div>
            ))}
          </div>
        </section>

        {related.length > 0 && (
          <section className="premium-shell premium-related">
            <div className="premium-section-head"><h2 className="premium-serif">Complete the Room</h2></div>
            <div className="premium-products">
              {related.map((p) => <PremiumProductCard key={p.id} product={p} store={store} />)}
            </div>
          </section>
        )}

        <section className="premium-bottom-cta">
          <div className="premium-shell">
            <div>
              <h2 className="premium-serif">Ready to Transform Your Space?</h2>
              <p>Add this piece to your cart and start designing your home.</p>
            </div>
            <button onClick={() => store.add(product.id)}><ShoppingBag size={16} style={{ marginRight: 8, verticalAlign: "-3px" }} />Add to Cart</button>
          </div>
        </section>
      </main>
      <PremiumFooter />
    </>
  );
}
