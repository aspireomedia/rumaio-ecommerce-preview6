"use client";
import { CartPanel, PageTitle, StoreFooter, StoreHeader, useStore } from "@/app/furniture/FurnitureShell";
export default function CartPage(){const store=useStore();return <><StoreHeader store={store}/><PageTitle kicker="KERANJANG BELANJA" title="Pilihan furniture Anda"><p>Atur jumlah produk sebelum melanjutkan ke tahap checkout preview.</p></PageTitle><main className="store-shell cart-page"><CartPanel store={store}/></main><StoreFooter/></>}
