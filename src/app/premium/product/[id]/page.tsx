"use client";
import Image from "next/image";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { useState } from "react";
import { Award, Heart, Minus, Plus, RotateCcw, Shield, ShoppingBag, Star, Truck } from "lucide-react";
import { premiumFormatPrice, premiumProductById, premiumRelated } from "@/lib/premium-catalog";
import { PremiumFooter, PremiumHeader, PremiumProductCard, roomLabels, usePremiumStore } from "../../PremiumShell";

const reviews = [
  { author: "Pemilik rumah di Jakarta", rating: 5, text: "Produk ini bahkan lebih indah saat dilihat langsung daripada di foto. Sangat pas untuk ruang tamu kami.", verified: true },
  { author: "Penggemar desain interior", rating: 5, text: "Pengerjaannya sangat baik dan produk tiba dengan kemasan yang rapi.", verified: true },
  { author: "Pelanggan setia", rating: 4, text: "Kualitasnya sangat baik dan ukurannya sesuai dengan informasi. Perakitan membutuhkan waktu sedikit lebih lama dari perkiraan.", verified: true },
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

  return <><PremiumHeader store={store} /><main>
    <section className="premium-pdp-hero"><Image src={product.image} alt={product.name} fill priority sizes="100vw" /><div className="premium-pdp-card">
      <Link href="/premium" className="premium-crumb">&larr; Kembali ke Casen Living</Link><p className="category">{roomLabels[product.room]}</p><h1 className="premium-serif">{product.name}</h1>
      <div className="price-row"><strong>{premiumFormatPrice(product.price)}</strong>{product.oldPrice && <del>{premiumFormatPrice(product.oldPrice)}</del>}</div><p className="description">{product.description}</p>
      <div className="premium-qty"><label htmlFor="qty" style={{ fontSize: 13, fontWeight: 700 }}>Jumlah</label><div><button aria-label="Kurangi jumlah" onClick={() => setQuantity((q) => Math.max(1, q - 1))}><Minus size={14} /></button><span id="qty">{quantity}</span><button aria-label="Tambah jumlah" onClick={() => setQuantity((q) => q + 1)}><Plus size={14} /></button></div></div>
      <button className="cta-add" onClick={() => { for (let i = 0; i < quantity; i++) store.add(product.id); }}>Tambah ke Keranjang</button><button className={`cta-wish ${saved ? "saved" : ""}`} onClick={() => store.toggle(product.id)}><Heart size={18} fill={saved ? "currentColor" : "none"} /> {saved ? "Tersimpan di Wishlist" : "Tambah ke Wishlist"}</button>
      <div className="premium-pdp-benefits"><div><Truck size={16} /> Pengiriman dengan penanganan khusus</div><div><RotateCcw size={16} /> Bantuan pengembalian, hubungi tim kami</div><div><Shield size={16} /> Diperiksa kualitasnya sebelum dikirim</div></div>
    </div></section>
    <section className="premium-shell premium-pdp-main"><div><div className="premium-pdp-gallery"><Image src={product.image} alt={product.name} fill sizes="(max-width:1024px) 100vw, 60vw" /></div><div className="premium-colors" aria-label="Pilihan warna">{product.colors.map((c) => <span key={c}>{c}</span>)}</div></div><div className="premium-about-block"><h3 className="premium-serif">Tentang Produk Ini</h3><div className="premium-detail-list"><div><p className="label">Material</p><p className="value">{product.material}</p></div><div><p className="label">Warna</p><p className="value">{product.color}</p></div><div><p className="label">Dimensi</p><p className="value">L: {product.width} &times; D: {product.depth} &times; T: {product.height}</p></div><div><p className="label">Perawatan</p><p className="value">Bersihkan dengan kain lembut dan kering. Hindari sinar matahari langsung serta bahan pembersih keras pada permukaan berlapis kain.</p></div></div><div className="premium-why-ship"><h3 className="premium-serif" style={{ marginBottom: 4 }}>Mengapa Berbelanja di Casen Living</h3><article><Truck size={22} /><div><h4>Pengiriman Penuh Perhatian</h4><p>Setiap produk dikemas dan dikirim dengan perhatian. Hubungi tim kami untuk waktu pengiriman di area Anda.</p></div></article><article><RotateCcw size={22} /><div><h4>Bantuan Pengembalian</h4><p>Hubungi tim kami untuk bantuan mengenai kelayakan dan langkah berikutnya.</p></div></article><article><Shield size={22} /><div><h4>Kualitas Terverifikasi</h4><p>Setiap produk diperiksa sebelum berangkat untuk pengiriman.</p></div></article><article><Award size={22} /><div><h4>Pilihan Terkurasi</h4><p>Produk dipilih dengan penuh pertimbangan, bukan sekadar pengisi koleksi.</p></div></article></div></div></section>
    <section className="premium-reviews"><div className="premium-shell premium-reviews-inner"><h3 className="premium-serif" style={{ marginBottom: 20 }}>Ulasan Pelanggan</h3><div className="premium-review-summary"><div style={{ display: "flex", gap: 2 }}>{Array.from({ length: 5 }).map((_, i) => <Star key={i} size={18} fill={i < Math.round(avg) ? "currentColor" : "none"} color="#27545c" />)}</div><div><strong>{avg.toFixed(1)} dari 5</strong><p style={{ margin: 0, fontSize: 12, color: "var(--premium-muted)" }}>Berdasarkan {reviews.length} ulasan terverifikasi</p></div></div>{reviews.map((r, i) => <div key={i} className="premium-review-card"><div className="head"><div><strong>{r.author}</strong>{r.verified && <p className="verified">Pembelian Terverifikasi</p>}</div><div style={{ display: "flex", gap: 2 }}>{Array.from({ length: 5 }).map((_, j) => <Star key={j} size={14} fill={j < r.rating ? "currentColor" : "none"} color="#27545c" />)}</div></div><p style={{ margin: 0, fontSize: 13, color: "#4c5a58" }}>{r.text}</p></div>)}</div></section>
    {related.length > 0 && <section className="premium-shell premium-related"><div className="premium-section-head"><h2 className="premium-serif">Lengkapi Ruangan Anda</h2></div><div className="premium-products">{related.map((p) => <PremiumProductCard key={p.id} product={p} store={store} />)}</div></section>}
    <section className="premium-bottom-cta"><div className="premium-shell"><div><h2 className="premium-serif">Siap Menata Ruang Anda?</h2><p>Tambahkan produk ini ke keranjang dan mulai wujudkan rumah Anda.</p></div><button onClick={() => store.add(product.id)}><ShoppingBag size={16} style={{ marginRight: 8, verticalAlign: "-3px" }} />Tambah ke Keranjang</button></div></section>
  </main><PremiumFooter /></>;
}
