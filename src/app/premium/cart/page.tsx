"use client";
import { PremiumCartPanel, PremiumFooter, PremiumHeader, PremiumPageHeading, usePremiumStore } from "../PremiumShell";

export default function PremiumCartPage() {
  const store = usePremiumStore();
  return (
    <>
      <PremiumHeader store={store} />
      <main>
        <PremiumPageHeading kicker="Casen Living" title="Your Cart" />
        <div className="premium-shell">
          <PremiumCartPanel store={store} />
        </div>
      </main>
      <PremiumFooter />
    </>
  );
}
