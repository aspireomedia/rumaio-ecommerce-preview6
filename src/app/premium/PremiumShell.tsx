"use client";
import Image from "next/image";
import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, Heart, Menu, Minus, Plus, Search, ShoppingBag, Star, Trash2, X } from "lucide-react";
import { PremiumProduct, premiumCatalog, premiumFormatPrice } from "@/lib/premium-catalog";

export const roomLabels: Record<string, string> = { living: "Ruang Tamu", dining: "Ruang Makan", bedroom: "Kamar Tidur", office: "Ruang Kerja", storage: "Penyimpanan" };
export const premiumNav = [["living", "Ruang Tamu"], ["dining", "Ruang Makan"], ["bedroom", "Kamar Tidur"], ["office", "Ruang Kerja"], ["storage", "Penyimpanan"], ["about", "Tentang Kami"], ["faq", "FAQ"]] as const;

type CartLine = { id: string; quantity: number };
const readStore = <T,>(key: string): T => { if (typeof window === "undefined") return [] as T; try { return JSON.parse(sessionStorage.getItem(key) || "[]") as T; } catch { return [] as T; } };

export function usePremiumStore() {
  const [cart, setCart] = useState<CartLine[]>([]);
  const [wishes, setWishes] = useState<string[]>([]);
  const [notice, setNotice] = useState("");
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- sessionStorage is browser-only; sync after mount to preserve hydration.
    setCart(readStore<CartLine[]>("casen-premium-cart"));
    setWishes(readStore<string[]>("casen-premium-wishes"));
    setHydrated(true);
  }, []);
  const saveCart = (next: CartLine[]) => { setCart(next); sessionStorage.setItem("casen-premium-cart", JSON.stringify(next)); };
  const saveWishes = (next: string[]) => { setWishes(next); sessionStorage.setItem("casen-premium-wishes", JSON.stringify(next)); };
  const add = (id: string) => { const exists = cart.find((x) => x.id === id); saveCart(exists ? cart.map((x) => (x.id === id ? { ...x, quantity: x.quantity + 1 } : x)) : [...cart, { id, quantity: 1 }]); setNotice(`${premiumCatalog.find((x) => x.id === id)?.name} ditambahkan ke keranjang.`); setTimeout(() => setNotice(""), 2500); };
  const remove = (id: string) => saveCart(cart.filter((x) => x.id !== id));
  const quantity = (id: string, delta: number) => saveCart(cart.map((x) => (x.id === id ? { ...x, quantity: Math.max(1, x.quantity + delta) } : x)));
  const toggle = (id: string) => saveWishes(wishes.includes(id) ? wishes.filter((x) => x !== id) : [...wishes, id]);
  return { cart, wishes, notice, setNotice, add, remove, quantity, toggle, hydrated };
}
export type PremiumStore = ReturnType<typeof usePremiumStore>;

export function PremiumHeader({ store }: { store: PremiumStore }) {
  const [open, setOpen] = useState(false); const [query, setQuery] = useState(""); const router = useRouter(); const cartCount = store.cart.reduce((n, x) => n + x.quantity, 0);
  useEffect(() => {
    if (!open) return;
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [open]);
  const submit = (e: FormEvent) => { e.preventDefault(); const hit = premiumCatalog.find((p) => p.name.toLowerCase().includes(query.toLowerCase())); if (hit) router.push(`/premium/product/${hit.id}`); else store.setNotice("Produk belum ditemukan. Coba kata kunci lain."); };
  return <><header className="premium-header"><div className="premium-shell premium-header-row"><button className="premium-menu-btn" aria-label="Buka menu" onClick={() => setOpen(true)}><Menu /></button><Link href="/premium" className="premium-wordmark">Casen Living<small>DI MANA RUANG MENJADI RUMAH</small></Link><nav className="premium-nav">{premiumNav.slice(0, 5).map(([slug, label]) => <Link key={slug} href={`/premium/${slug}`}>{label}</Link>)}<Link href="/premium/about">Tentang Kami</Link><Link href="/premium/faq">FAQ</Link></nav><form className="premium-search" onSubmit={submit}><input aria-label="Cari produk Casen Living" placeholder="Cari furniture..." value={query} onChange={(e) => setQuery(e.target.value)} /><button aria-label="Cari"><Search size={16} /></button></form><div className="premium-actions"><Link href="/premium/wishlist" aria-label="Wishlist"><Heart size={19} />{store.wishes.length > 0 && <b>{store.wishes.length}</b>}</Link><Link href="/premium/cart" aria-label="Keranjang"><ShoppingBag size={19} />{cartCount > 0 && <b>{cartCount}</b>}</Link></div></div></header><div className={`premium-drawer ${open ? "open" : ""}`} role="dialog" aria-modal="true" aria-label="Menu Casen Living"><div><button aria-label="Tutup menu" onClick={() => setOpen(false)}><X /></button>{premiumNav.map(([slug, label]) => <Link key={slug} href={`/premium/${slug}`} onClick={() => setOpen(false)}>{label}</Link>)}</div><button className="premium-drawer-back" aria-label="Tutup menu" onClick={() => setOpen(false)} /></div>{store.notice && <div className="premium-toast" role="status">{store.notice}</div>}</>;
}

export function PremiumFooter() { return <footer className="premium-footer" id="kebijakan-privasi"><div className="premium-shell premium-footer-grid"><div><Link href="/premium" className="premium-wordmark light">Casen Living</Link><p>Terinspirasi dari Casa, dihadirkan kembali untuk kehidupan. Furniture yang dirancang untuk cara Anda menjalani keseharian.</p></div><div><h3>Belanja</h3>{premiumNav.slice(0, 5).map(([slug, label]) => <Link key={slug} href={`/premium/${slug}`}>{label}</Link>)}</div><div><h3>Bantuan</h3><Link href="/premium/faq">FAQ</Link><Link href="/premium/about">Tentang Casen Living</Link><Link href="/premium/cart">Keranjang</Link><Link href="/premium/wishlist">Wishlist</Link><a href="#kebijakan-privasi">Kebijakan Privasi</a></div><div><h3>Pengiriman</h3><p>Pilihan furniture dikirim dengan perhatian. Hubungi tim kami untuk informasi waktu pengiriman sesuai area dan produk Anda.</p></div></div><div className="premium-shell premium-footer-bottom"><span>&copy; 2026 Casen Living. Semua hak dilindungi.</span><span><a href="#kebijakan-privasi">Kebijakan Privasi</a> · Di mana Ruang Menjadi Rumah.</span></div></footer>; }

export function PremiumProductCard({ product, store }: { product: PremiumProduct; store: PremiumStore }) { const saved = store.wishes.includes(product.id); return <article className="premium-card"><div className="premium-card-image"><Link href={`/premium/product/${product.id}`} aria-label={product.name}><Image src={product.image} fill sizes="(max-width: 650px) 50vw, (max-width: 1000px) 33vw, 24vw" alt={product.name} /></Link><button aria-label={saved ? `Hapus ${product.name} dari wishlist` : `Simpan ${product.name} ke wishlist`} aria-pressed={saved} className={saved ? "saved" : ""} onClick={() => store.toggle(product.id)}><Heart size={17} fill={saved ? "currentColor" : "none"} /></button></div><div className="premium-card-info"><Link href={`/premium/product/${product.id}`}><h3>{product.name}</h3></Link><p className="premium-card-rating"><Star size={13} fill="currentColor" /> {product.rating} <small>({product.reviews})</small></p><div className="premium-card-price"><strong>{premiumFormatPrice(product.price)}</strong>{product.oldPrice && <del>{premiumFormatPrice(product.oldPrice)}</del>}</div><button className="premium-card-add" onClick={() => store.add(product.id)}>Tambah ke Keranjang</button></div></article>; }

export function PremiumPageHeading({ kicker, title }: { kicker: string; title: string }) { return <section className="premium-page-heading"><div className="premium-shell"><Link href="/premium" className="premium-crumb"><ArrowLeft size={15} /> Kembali ke Casen Living</Link><p>{kicker}</p><h1>{title}</h1></div></section>; }

export function PremiumCartPanel({ store }: { store: PremiumStore }) { const lines = store.cart.map((x) => ({ line: x, product: premiumCatalog.find((p) => p.id === x.id)! })).filter((l) => l.product); const total = lines.reduce((sum, x) => sum + x.product.price * x.line.quantity, 0); if (!lines.length) return <div className="premium-empty-panel"><ShoppingBag /><h2>Keranjang Anda masih kosong</h2><p>Jelajahi koleksi dan tambahkan produk yang Anda sukai.</p><Link href="/premium">Belanja di Casen Living</Link></div>; return <div className="premium-cart-panel"><div className="premium-cart-lines">{lines.map(({ line, product }) => <article key={product.id}><Image src={product.image} width={110} height={110} alt={product.name} /><div><p>{roomLabels[product.room]}</p><h3>{product.name}</h3><strong>{premiumFormatPrice(product.price)}</strong><div className="premium-quantity"><button aria-label={`Kurangi jumlah ${product.name}`} onClick={() => store.quantity(product.id, -1)}><Minus size={14} /></button><span>{line.quantity}</span><button aria-label={`Tambah jumlah ${product.name}`} onClick={() => store.quantity(product.id, 1)}><Plus size={14} /></button></div></div><button className="premium-delete" aria-label={`Hapus ${product.name}`} onClick={() => store.remove(product.id)}><Trash2 size={18} /></button></article>)}</div><aside className="premium-summary"><h2>Ringkasan Pesanan</h2><p><span>Subtotal</span><strong>{premiumFormatPrice(total)}</strong></p><p><span>Pengiriman</span><span>Dihitung saat checkout</span></p><hr /><p className="premium-summary-total"><span>Total</span><strong>{premiumFormatPrice(total)}</strong></p><button onClick={() => store.setNotice("Checkout belum tersedia pada preview ini. Produk Anda tetap tersimpan di keranjang.")}>Lanjut ke Checkout <ArrowRight size={16} /></button></aside></div>; }
