"use client";
import { catalog } from "@/lib/catalog";
import { PageTitle, ProductCard, StoreFooter, StoreHeader, useStore } from "@/app/furniture/FurnitureShell";
export default function WishlistPage(){const store=useStore();const items=catalog.filter(p=>store.wishes.includes(p.id));return <><StoreHeader store={store}/><PageTitle kicker="WISHLIST" title="Furniture yang Anda simpan"/><main className="store-shell catalog-page">{items.length?<div className="catalog-grid">{items.map(p=><ProductCard key={p.id} product={p} store={store}/>)}</div>:<div className="empty-panel"><h2>Belum ada produk tersimpan</h2><p>Simpan produk dari katalog untuk membandingkan pilihan furniture Anda.</p></div>}</main><StoreFooter/></>}
