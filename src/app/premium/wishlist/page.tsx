"use client";
import { premiumCatalog } from "@/lib/premium-catalog";
import { PremiumFooter, PremiumHeader, PremiumPageHeading, PremiumProductCard, usePremiumStore } from "../PremiumShell";

export default function PremiumWishlistPage() {
  const store = usePremiumStore();
  const products = premiumCatalog.filter((p) => store.wishes.includes(p.id));
  return (
    <>
      <PremiumHeader store={store} />
      <main>
        <PremiumPageHeading kicker="Casen Living" title="Your Wishlist" />
        <div className="premium-shell premium-listing-grid">
          {products.length > 0 ? (
            <div className="premium-products">
              {products.map((p) => <PremiumProductCard key={p.id} product={p} store={store} />)}
            </div>
          ) : (
            <div className="premium-listing-empty">Your wishlist is empty. Browse the collection to save pieces you love.</div>
          )}
        </div>
      </main>
      <PremiumFooter />
    </>
  );
}
