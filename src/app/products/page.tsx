"use client";
import { Suspense, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { uniqueCatalog } from "@/lib/catalog";
import { FilterBar, PageTitle, ProductCard, StoreFooter, StoreHeader, useStore } from "@/app/furniture/FurnitureShell";

export default function ProductsPage(){return <Suspense fallback={<CatalogFallback/>}><ProductsContent/></Suspense>}
function CatalogFallback(){return <><StoreHeader store={useStore()}/><PageTitle kicker="KOLEKSI BETTER SPACE" title="Furniture untuk setiap ruang"><p>Memuat katalog furniture...</p></PageTitle></>}
function ProductsContent(){
  const store=useStore();
  const params=useSearchParams();
  const queryCategory=params.get("category")||"";
  const [localCategory,setLocalCategory]=useState("");
  const category=localCategory||queryCategory;
  const [sort,setSort]=useState("featured");
  const visible=useMemo(()=>{
    const filtered=uniqueCatalog.filter(p=>!category||p.category===category);
    return [...filtered].sort((a,b)=>sort==="price-low"?Number(a.price.replace(/\D/g,""))-Number(b.price.replace(/\D/g,"")):sort==="price-high"?Number(b.price.replace(/\D/g,""))-Number(a.price.replace(/\D/g,"")):sort==="rating"?Number(b.rating)-Number(a.rating):0);
  },[category,sort]);
  return <><StoreHeader store={store}/><PageTitle kicker="KOLEKSI BETTER SPACE" title="Furniture untuk setiap ruang"><p>Temukan pilihan yang sama dengan yang Anda lihat di homepage, kini dalam katalog yang mudah ditelusuri.</p></PageTitle><main className="store-shell catalog-page"><div className="catalog-controls"><FilterBar category={category} setCategory={setLocalCategory}/><label className="sort-control">Urutkan<select value={sort} onChange={e=>setSort(e.target.value)}><option value="featured">Pilihan kami</option><option value="rating">Rating tertinggi</option><option value="price-low">Harga terendah</option><option value="price-high">Harga tertinggi</option></select></label></div><p className="product-count">{visible.length} produk tersedia{category&&<> untuk <strong>{category}</strong></>}</p>{visible.length?<div className="catalog-grid">{visible.map(product=><ProductCard key={product.id} product={product} store={store}/>)}</div>:<div className="empty-panel"><h2>Belum ada produk di kategori ini</h2><p>Pilih kategori lain untuk melihat furniture yang tersedia.</p><button onClick={()=>setLocalCategory("")}>Lihat semua produk</button></div>}</main><StoreFooter/></>}
