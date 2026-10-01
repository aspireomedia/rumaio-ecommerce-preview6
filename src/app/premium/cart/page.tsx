"use client";
import { PremiumCartPanel, PremiumFooter, PremiumHeader, PremiumPageHeading, usePremiumStore } from "../PremiumShell";
export default function PremiumCartPage() { const store = usePremiumStore(); return <><PremiumHeader store={store} /><main><PremiumPageHeading kicker="Casen Living" title="Keranjang Anda" /><div className="premium-shell"><PremiumCartPanel store={store} /></div></main><PremiumFooter /></>; }
