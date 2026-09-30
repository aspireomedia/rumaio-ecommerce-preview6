"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ArrowRight, Building2, ChevronDown, ChevronRight, ClipboardList, CreditCard, Heart, House, Menu, PackageCheck, Search, Send, ShoppingBag, Star, Truck, UserRound, X, Music2, ShieldCheck, Headphones, Wrench, Camera, Video
} from "lucide-react";
import { catalog } from "@/lib/catalog";
import { useStore } from "@/app/furniture/FurnitureShell";

const nav = [
  { label: "Semua Kategori", href: "/products" },
  { label: "Ruang Tamu", href: "/products?category=Ruang%20Tamu" },
  { label: "Kamar Tidur", href: "/products?category=Kamar%20Tidur" },
  { label: "Ruang Makan", href: "/products?category=Ruang%20Makan" },
  { label: "Ruang Kerja", href: "/products?category=Ruang%20Kerja" },
  { label: "Penyimpanan", href: "/products?category=Penyimpanan" },
  { label: "Pencahayaan", href: "/products?category=Pencahayaan" },
  { label: "Dekorasi Rumah", href: "/products?category=Dekorasi%20Rumah" },
  { label: "Promo", href: "/products", promo: true },
];

const sidebar = [
  { name: "Sofa & Kursi Santai", href: "/products?category=Ruang%20Tamu" },
  { name: "Tempat Tidur & Kasur", href: "/products?category=Kamar%20Tidur" },
  { name: "Meja Makan & Kursi", href: "/products?category=Ruang%20Makan" },
  { name: "Meja Kerja & Kursi Kantor", href: "/products?category=Ruang%20Kerja" },
  { name: "Lemari & Penyimpanan", href: "/products?category=Penyimpanan" },
  { name: "Pencahayaan", href: "/products?category=Pencahayaan" },
  { name: "Dekorasi Rumah", href: "/products?category=Dekorasi%20Rumah" },
];

const categoryCards = [
  { name: "Sofa & Kursi Santai", image: "/images/categories/living.jpg", href: "/products?category=Ruang%20Tamu" },
  { name: "Tempat Tidur", image: "/images/categories/bedroom.jpg", href: "/products?category=Kamar%20Tidur" },
  { name: "Meja Makan & Kursi", image: "/images/categories/dining.jpg", href: "/products?category=Ruang%20Makan" },
  { name: "Meja Kerja & Kursi", image: "/images/categories/office.jpg", href: "/products?category=Ruang%20Kerja" },
  { name: "Lemari & Penyimpanan", image: "/images/categories/storage.jpg", href: "/products?category=Penyimpanan" },
  { name: "Dekorasi Rumah", image: "/images/categories/decor.jpg", href: "/products?category=Dekorasi%20Rumah" },
];

function SectionHead({ id, title, action, href }: { id: string; title: string; action?: string; href?: string }) {
  return <div className="section-head"><h2 id={id}>{title}</h2>{action && <Link href={href ?? "/products"} className="section-action">{action} <ArrowRight size={15} /></Link>}</div>;
}

export default function Home() {
  const store = useStore();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [tab, setTab] = useState("Terlaris");
  const [search, setSearch] = useState("");
  const [quoteSent, setQuoteSent] = useState(false);
  const [newsletter, setNewsletter] = useState(false);
  const cartCount = store.cart.reduce((n, x) => n + x.quantity, 0);
  const tabbed = useMemo(() => {
    if (tab === "Produk Baru") return catalog.filter((p) => p.isNew);
    if (tab === "Penawaran Spesial") return catalog.filter((p) => p.oldPrice);
    return catalog.slice(0, 10);
  }, [tab]);
  const filtered = useMemo(() => tabbed.filter((p) => p.name.toLowerCase().includes(search.toLowerCase())), [tabbed, search]);

  return <main>
    <a className="skip" href="#content">Lewati ke konten</a>
    {store.notice && <div className="toast" role="status">{store.notice}</div>}
    <div className="utility"><div className="shell utility-inner"><span><Truck size={14}/> Gratis Ongkir untuk pembelian di atas Rp 1.000.000</span><div><Link href="#footer">Pusat Bantuan</Link><Link href="/orders">Lacak Pesanan</Link><Link href="#regions">Lokasi Toko</Link><button>Bahasa Indonesia <ChevronDown size={13}/></button></div></div></div>

    <header className="header"><div className="shell header-row">
      <button className="mobile-menu-btn" aria-label="Buka menu" aria-expanded={mobileOpen} onClick={() => setMobileOpen(true)}><Menu /></button>
      <Link className="wordmark" href="/">Better Space <small>FURNITURE FOR A BETTER LIVING.</small></Link>
      <form className="search" onSubmit={(e) => { e.preventDefault(); document.getElementById("products")?.scrollIntoView({ behavior: "smooth" }); }}><button type="button" className="select-category">Semua Kategori <ChevronDown size={14}/></button><input aria-label="Cari produk" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Cari furniture, ruangan, atau gaya..."/><button aria-label="Cari" className="search-button"><Search size={19}/></button></form>
      <div className="account-actions"><Link href="/account"><UserRound/><span>Masuk<br/><b>Akun Saya</b></span></Link><Link href="/wishlist"><Heart/><span>Wishlist<br/><b>{store.wishes.length} Produk</b></span></Link><Link href="/cart" className="cart"><ShoppingBag/><span>Keranjang<br/><b>{cartCount} Produk</b></span><i>{cartCount}</i></Link></div>
    </div></header>
    <nav className="mainnav"><div className="shell">{nav.map((item) => <Link key={item.label} href={item.href} className={item.promo ? "promo-nav" : ""}>{item.label}</Link>)}</div></nav>

    <div className={`drawer ${mobileOpen ? "open" : ""}`} role="dialog" aria-modal="true" aria-label="Navigasi utama"><div className="drawer-panel"><div className="drawer-top"><b>MENU BETTER SPACE</b><button aria-label="Tutup menu" onClick={() => setMobileOpen(false)}><X/></button></div>{nav.map((n) => <Link key={n.label} href={n.href} onClick={() => setMobileOpen(false)}>{n.label}<ChevronRight size={16}/></Link>)}<div className="drawer-search"><Search size={18}/><input aria-label="Cari di Better Space" placeholder="Cari produk" value={search} onChange={(e)=>setSearch(e.target.value)}/></div></div><button className="drawer-backdrop" aria-label="Tutup menu" onClick={() => setMobileOpen(false)} /></div>

    <div id="content" className="shell hero-layout">
      <aside className="category-sidebar" aria-label="Kategori produk"><div className="side-title">Kategori Furniture</div>{sidebar.map((s) => <Link key={s.name} href={s.href}><span>{s.name}</span><ChevronRight size={14}/></Link>)}</aside>
      <section className="hero" aria-labelledby="hero-title"><Image src="/images/hero/living-room.jpg" fill sizes="(max-width: 900px) 100vw, 58vw" priority alt="Interior ruang keluarga hangat dengan sofa dan tanaman"/><div className="hero-copy"><span>KOLEKSI TERBARU</span><h1 id="hero-title">Furniture Modern<br/><span>Untuk Setiap Ruang</span></h1><p>Nyaman, fungsional, dan tahan lama untuk rumah dan kantor Anda.</p><Link href="/products">Belanja Sekarang <ArrowRight size={17}/></Link></div><div className="dots" aria-label="Slide 1 dari 3"><b></b><i></i><i></i></div></section>
      <aside className="business-cards"><article><span className="iconbox"><House/></span><div><strong>Konsultasi Interior</strong><p>Gratis konsultasi dengan tim kami.</p><Link href="#quote">Atur konsultasi <ArrowRight size={14}/></Link></div></article><article><span className="iconbox aqua"><Wrench/></span><div><strong>Custom Furniture</strong><p>Sesuai ukuran dan kebutuhan Anda.</p><Link href="#quote">Kirim kebutuhan <ArrowRight size={14}/></Link></div></article><article><span className="iconbox pale"><Building2/></span><div><strong>Business Order</strong><p>Penawaran khusus untuk perusahaan.</p><Link href="#quote">Minta penawaran <ArrowRight size={14}/></Link></div></article></aside>
    </div>

    <section className="benefits"><div className="shell">{[[PackageCheck,"Material Berkualitas","Tahan lama dan aman"],[Truck,"Gratis Ongkir","Min. pembelian Rp 1.000.000"],[CreditCard,"Pembayaran Aman","100% aman & terpercaya"],[Headphones,"Layanan Pelanggan","Siap membantu setiap hari"]].map(([Icon,title,desc]) => { const I = Icon as typeof Truck; return <div key={String(title)}><I/><p><b>{String(title)}</b><span>{String(desc)}</span></p></div>})}</div></section>

    <section id="promos" className="shell section"><SectionHead id="promo-title" title="Penawaran & Promo" action="Lihat Semua Promo" href="/products"/><div className="promo-grid">{[
      ["DISKON HINGGA 50%", "Sofa Pilihan", "/images/categories/living.jpg", "cream", "/products?category=Ruang%20Tamu"], ["HARGA SPESIAL", "Set Meja Makan", "/images/categories/dining.jpg", "teal", "/products?category=Ruang%20Makan"], ["KOLEKSI BARU", "Ruang Kerja", "/images/categories/office.jpg", "blue", "/products?category=Ruang%20Kerja"], ["CLEARANCE SALE", "Lemari & Penyimpanan", "/images/categories/storage.jpg", "dark", "/products?category=Penyimpanan"],
    ].map(([eyebrow,title,image,tone,href]) => <Link className={`promo ${tone}`} key={title} href={href} aria-label={`Lihat ${title}`}><Image src={image} fill sizes="(max-width: 700px) 80vw, 25vw" alt={title}/><div><span>{eyebrow}</span><h3>{title}</h3><span className="promo-go"><ArrowRight size={18}/></span></div></Link>)}</div></section>

    <section id="categories" className="shell section"><SectionHead id="cat-title" title="Kategori Pilihan" action="Lihat Semua Kategori" href="/products"/><div className="category-cards">{categoryCards.map((cat) => <Link key={cat.name} href={cat.href}><div><Image src={cat.image} fill sizes="(max-width: 700px) 45vw, 17vw" alt={cat.name}/></div><b>{cat.name}</b><span>Lihat produk <ArrowRight size={13}/></span></Link>)}</div></section>

    <section className="shell section collection-section"><div className="collection-banners"><Link href="/products?category=Ruang%20Tamu" className="collection-banner"><Image src="/images/categories/living.jpg" fill sizes="(max-width: 900px) 100vw, 50vw" alt="Koleksi ruang keluarga"/><div><span>KOLEKSI RUANGAN</span><h2>Perlengkapan Ruang Keluarga</h2><p>Sofa, meja, kabinet, dan lebih banyak untuk hunian yang lebih nyaman.</p><span className="collection-cta">Lihat Koleksi <ArrowRight size={15}/></span></div></Link><Link href="/products?category=Ruang%20Kerja" className="collection-banner office"><Image src="/images/categories/office.jpg" fill sizes="(max-width: 900px) 100vw, 50vw" alt="Koleksi ruang kerja"/><div><span>BEKERJA LEBIH NYAMAN</span><h2>Ruang Kerja Produktif</h2><p>Meja kerja, kursi ergonomis, dan penyimpanan yang fungsional.</p><span className="collection-cta">Lihat Koleksi <ArrowRight size={15}/></span></div></Link></div><div className="collection-tiles">{["Sofa Minimalis","Meja Kopi","Lemari TV","Rak Dinding","Meja Kerja","Kursi Kantor","Lemari Arsip","Aksesoris Kantor"].map((name,i) => <Link href="/products" key={name}><Image src={categoryCards[i % categoryCards.length].image} fill sizes="(max-width: 700px) 50vw, 18vw" alt={name}/><span>{name}</span></Link>)}</div></section>

    <section id="quote" className="business-quote"><div className="shell quote-inner"><div><span className="quote-kicker">UNTUK BISNIS DAN PROYEK</span><h2>Kemudahan untuk Pembelian dalam Jumlah Besar</h2><p>Dapatkan penawaran khusus untuk bisnis, proyek, atau kebutuhan perusahaan Anda.</p><ul><li><ShieldCheck/>Produk sesuai kebutuhan proyek</li><li><ClipboardList/>Pendampingan pesanan dari awal</li></ul></div><form className="quote-form" onSubmit={(e) => { e.preventDefault(); const fd = new FormData(e.currentTarget); if (!fd.get("company") || !fd.get("email") || !fd.get("quantity")) return; setQuoteSent(true); e.currentTarget.reset(); }}><h3>Minta Penawaran untuk Supplier</h3><label>Nama Perusahaan<input required name="company" placeholder="Nama perusahaan Anda"/></label><label>Email<input required type="email" name="email" placeholder="email@perusahaan.com"/></label><label>Jumlah Kebutuhan<select required name="quantity" defaultValue=""><option value="" disabled>Pilih estimasi kebutuhan</option><option>10 - 50 produk</option><option>51 - 100 produk</option><option>Lebih dari 100 produk</option></select></label><label>Pesan <em>(Opsional)</em><textarea name="message" placeholder="Ceritakan kebutuhan proyek Anda"/></label><button>Kirim Penawaran <Send size={16}/></button>{quoteSent && <p className="form-success" role="status">Terima kasih. Tim Better Space akan menghubungi Anda.</p>}</form></div></section>

    <section id="products" className="shell section products"><SectionHead id="product-title" title="Rekomendasi Produk" action="Lihat Semua" href="/products"/><div className="product-toolbar"><div role="tablist" aria-label="Filter produk">{["Terlaris", "Produk Baru", "Penawaran Spesial"].map((t) => <button role="tab" aria-selected={tab===t} key={t} className={tab===t ? "active" : ""} onClick={()=>setTab(t)}>{t}</button>)}</div><span>{search ? `${filtered.length} hasil pencarian` : `Pilihan ${tab.toLowerCase()}`}</span></div><div className="product-grid">{filtered.map((p) => <article className="product-card" key={p.id}><div className="product-image"><Link href={`/products/${p.id}`} aria-label={p.name}><Image src={p.image} fill sizes="(max-width: 600px) 50vw, (max-width: 1000px) 33vw, 20vw" alt={p.name}/></Link><button aria-label={store.wishes.includes(p.id) ? `Hapus ${p.name} dari wishlist` : `Simpan ${p.name} ke wishlist`} aria-pressed={store.wishes.includes(p.id)} className={store.wishes.includes(p.id)?"hearted":""} onClick={() => store.toggle(p.id)}><Heart size={18} fill={store.wishes.includes(p.id)?"currentColor":"none"}/></button></div><div className="product-info"><span>{p.category}</span><Link href={`/products/${p.id}`}><h3>{p.name}</h3></Link><p className="rating"><Star size={14} fill="currentColor"/> {p.rating} <small>({p.reviews})</small></p><div className="price-row"><strong>{p.price}</strong>{p.oldPrice && <del>{p.oldPrice}</del>}</div><button className="add" onClick={() => store.add(p.id)}>Tambah <ShoppingBag size={15}/></button></div></article>)}</div>{filtered.length === 0 && <div className="empty">Produk yang dicari belum tersedia. Coba kata kunci lain.</div>}</section>

    <section className="services"><div className="shell"><SectionHead id="service-title" title="Layanan Tambahan Kami"/><div className="service-grid">{[[House,"Konsultasi Desain Interior","Gratis konsultasi dengan tim ahli kami."],[Wrench,"Custom Furniture","Sesuai kebutuhan ruang Anda."],[PackageCheck,"Jasa Perakitan","Perakitan cepat dan profesional."],[ShieldCheck,"Garansi & Dukungan","Produk berkualitas dengan layanan purna jual terpercaya."]].map(([Icon,title,copy]) => {const I=Icon as typeof House; return <article key={String(title)}><I/><div><h3>{String(title)}</h3><p>{String(copy)}</p></div></article>})}</div></div></section>

    <section id="regions" className="shell section"><SectionHead id="region-title" title="Supplier Berdasarkan Wilayah"/><div className="regions">{[["🇮🇩","Indonesia","Produk Lokal"],["🇨🇳","China","Perabot Modern"],["🇲🇾","Malaysia","Desain Kontemporer"],["🇻🇳","Vietnam","Harga Kompetitif"],["🇹🇭","Thailand","Keahlian Kayu"],["🇸🇬","Singapore","Teknologi & Inovasi"]].map(([flag,name,desc]) => <article key={name}><b>{flag}</b><span><strong>{name}</strong><small>{desc}</small></span></article>)}</div></section>

    <footer id="footer"><div className="shell footer-grid"><div className="footer-brand"><Link className="wordmark" href="/">Better Space <small>FURNITURE FOR A BETTER LIVING.</small></Link><p>Furniture berkualitas untuk setiap ruang. Membuat rumah dan tempat kerja lebih nyaman, fungsional dan indah.</p><div className="socials"><a href="#footer" aria-label="Instagram"><Camera/></a><a href="#footer" aria-label="Facebook"><UserRound/></a><a href="#footer" aria-label="TikTok"><Music2/></a><a href="#footer" aria-label="YouTube"><Video/></a></div></div><div><h3>Belanja</h3><Link href="/products">Semua Produk</Link>{["Ruang Tamu","Kamar Tidur","Ruang Makan","Ruang Kerja","Penyimpanan","Dekorasi Rumah"].map(x => <Link href={`/products?category=${encodeURIComponent(x)}`} key={x}>{x}</Link>)}<Link href="/products">Promo</Link></div><div><h3>Layanan Pelanggan</h3><Link href="#footer">Pusat Bantuan</Link><Link href="/orders">Lacak Pesanan</Link><Link href="#footer">Informasi Pengiriman</Link><Link href="#footer">Pengembalian & Penukaran</Link><Link href="#footer">Garansi Produk</Link><Link href="#footer">Syarat & Ketentuan</Link><Link href="#footer">Kebijakan Privasi</Link></div><div className="newsletter"><h3>Dapatkan Update Terbaru</h3><p>Dapatkan inspirasi ruangan, promo, dan koleksi terbaru dari Better Space.</p><form onSubmit={(e)=>{e.preventDefault(); const fd=new FormData(e.currentTarget); const email=String(fd.get("email")||""); if(email.includes("@")){store.setNotice("Terima kasih, Anda sudah terdaftar.");setNewsletter(true);e.currentTarget.reset()} else store.setNotice("Masukkan alamat email yang valid.")}}><input aria-label="Email newsletter" name="email" type="email" placeholder="Alamat email Anda" required/><button aria-label="Daftar newsletter"><Send size={17}/></button></form>{newsletter && <p role="status" style={{marginTop:8,fontSize:11,color:"#bde3dc"}}>Terdaftar.</p>}</div></div><div className="shell footer-bottom"><span>© 2026 Better Space. Semua hak dilindungi.</span><div className="payments"><b>BCA</b><b>Mandiri</b><b>BNI</b><b>BRI</b><b>VISA</b><b>mastercard</b><b>GoPay</b><b>OVO</b><b>DANA</b></div></div></footer>
  </main>;
}
