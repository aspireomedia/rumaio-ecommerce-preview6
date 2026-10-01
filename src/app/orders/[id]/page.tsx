"use client";
import Link from "next/link";
import { PackageCheck, ArrowLeft } from "lucide-react";
import { PageTitle, StoreFooter, StoreHeader, useStore } from "@/app/furniture/FurnitureShell";
import { uniqueCatalog } from "@/lib/catalog";

export default function OrderDetailPage(){
  const store=useStore();
  const lines=store.cart.map(line=>({line,product:uniqueCatalog.find(product=>product.id===line.id)})).filter(item=>item.product);
  const total=lines.reduce((sum,item)=>sum+Number(item.product!.price.replace(/\D/g,''))*item.line.quantity,0);
  return <><StoreHeader store={store}/><PageTitle kicker="DETAIL PESANAN" title="Ringkasan pesanan"/><main className="store-shell order-detail-page">
    <div className="preview-banner"><PackageCheck size={20}/><div><strong>Mode preview</strong><p>Pesanan belum tersimpan ke akun atau sistem pembayaran. Isi di bawah hanya mengikuti isi keranjang pada tab ini.</p></div></div>
    {!lines.length?<section className="empty-panel"><h2>Belum ada item untuk diringkas</h2><p>Tambahkan furniture ke keranjang terlebih dahulu untuk melihat ringkasan alur pesanan.</p><Link href="/products">Pilih furniture</Link></section>:<div className="order-detail-grid"><section className="order-detail-card"><div className="order-detail-heading"><div><p className="eyebrow">KERANJANG PREVIEW</p><h2>Item pilihan Anda</h2></div><Link href="/cart"><ArrowLeft size={15}/> Kembali ke keranjang</Link></div>{lines.map(({line,product})=><article className="order-line" key={product!.id}><div><h3>{product!.name}</h3><p>{product!.category} · {line.quantity} unit</p></div><strong>{product!.price}</strong></article>)}</section><aside className="order-summary"><p>Perkiraan total</p><strong>Rp {total.toLocaleString('id-ID')}</strong><p className="muted">Pengiriman dan pembayaran belum dihitung pada preview.</p><button onClick={()=>store.setNotice('Checkout belum tersedia pada preview ini.')}>Lanjut ke checkout</button></aside></div>}
  </main><StoreFooter/></>;
}
