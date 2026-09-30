"use client";
import { useState } from "react";
import { catalog } from "@/lib/catalog";
import { FilterBar, PageTitle, ProductCard, StoreFooter, StoreHeader, useStore } from "@/app/furniture/FurnitureShell";
export default function ProductsPage(){const store=useStore();const [category,setCategory]=useState("");const visible=catalog.filter(p=>!category||p.category===category);return <><StoreHeader store={store}/><PageTitle kicker="KOLEKSI BETTER SPACE" title="Furniture untuk setiap ruang"><p>Temukan pilihan yang sama dengan yang Anda lihat di homepage, kini dalam katalog yang mudah ditelusuri.</p></PageTitle><main className="store-shell catalog-page"><FilterBar category={category} setCategory={setCategory}/><p className="product-count">{visible.length} produk tersedia</p><div className="catalog-grid">{visible.map(product=><ProductCard key={product.id} product={product} store={store}/>)}</div></main><StoreFooter/></>}
