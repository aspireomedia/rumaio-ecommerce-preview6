"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import {
  Armchair, ArrowRight, BedDouble, Building2, ChevronDown, ChevronRight, ClipboardList, CreditCard, Heart, House, Lamp, Menu, PackageCheck, Search, Send, ShoppingBag, Sofa, Star, Store, Truck, UserRound, X, Music2, Boxes, ShieldCheck, Headphones, Wrench, Warehouse, TreePine, LayoutGrid, PanelTop, BriefcaseBusiness, Camera, Video
} from "lucide-react";

const nav = ["Semua Kategori", "Ruang Tamu", "Kamar Tidur", "Ruang Makan", "Ruang Kerja", "Penyimpanan", "Pencahayaan", "Dekorasi Rumah", "Promo"];
const sidebar = [
  ["Sofa & Kursi Santai", Sofa], ["Tempat Tidur & Kasur", BedDouble], ["Meja Makan & Kursi", PanelTop], ["Lemari & Penyimpanan", Warehouse], ["Meja Kerja & Kursi Kantor", BriefcaseBusiness], ["Rak & Bookshelf", LayoutGrid], ["Pencahayaan", Lamp], ["Karpet & Permadani", House], ["Dekorasi Rumah", TreePine], ["Furniture Outdoor", Armchair], ["Furniture Anak", Boxes], ["Promo & Clearance", Store],
] as const;

const categories = [
  { name: "Sofa & Kursi Santai", image: "/images/categories/living.jpg" }, { name: "Tempat Tidur", image: "/images/categories/bedroom.jpg" }, { name: "Meja Makan & Kursi", image: "/images/categories/dining.jpg" }, { name: "Meja Kerja & Kursi", image: "/images/categories/office.jpg" }, { name: "Lemari & Penyimpanan", image: "/images/categories/storage.jpg" }, { name: "Dekorasi Rumah", image: "/images/categories/decor.jpg" },
];

const products = [
  ["Luna Sofa 3 Seater", "Ruang Tamu", "Rp 7.499.000", "Rp 8.250.000", "4.9", "124", "/images/products/product1.jpg"],
  ["Arka Meja Makan Set", "Ruang Makan", "Rp 5.999.000", "", "4.8", "86", "/images/products/product2.jpg"],
  ["Evora Bed Frame Queen Size", "Kamar Tidur", "Rp 6.999.000", "Rp 7.500.000", "4.9", "72", "/images/products/product3.jpg"],
  ["Nexis Kursi Kantor Ergonomis", "Ruang Kerja", "Rp 2.499.000", "", "4.7", "106", "/images/products/product4.jpg"],
  ["Kana Lemari Penyimpanan", "Penyimpanan", "Rp 3.999.000", "Rp 4.450.000", "4.8", "59", "/images/products/product5.jpg"],
  ["Riko Meja Kopi Round", "Ruang Tamu", "Rp 2.999.000", "", "4.8", "44", "/images/products/product6.jpg"],
  ["Hana Rak Buku", "Penyimpanan", "Rp 2.499.000", "", "4.7", "91", "/images/products/product7.jpg"],
  ["Mori Lemari Pakaian", "Kamar Tidur", "Rp 6.499.000", "Rp 7.000.000", "4.9", "68", "/images/products/product9.jpg"],
  ["Sora Karpet 160 x 230 cm", "Dekorasi Rumah", "Rp 1.299.000", "", "4.8", "39", "/images/products/product10.jpg"],
  ["Arli Lampu Meja", "Pencahayaan", "Rp 899.000", "", "4.7", "53", "/images/categories/decor.jpg"],
] as const;

function ScrollLink({ href, children, className = "" }: { href: string; children: React.ReactNode; className?: string }) {
  return <a className={className} href={href}>{children}</a>;
}

function SectionHead({ id, title, action }: { id: string; title: string; action?: string }) {
  return <div className="section-head"><h2 id={id}>{title}</h2>{action && <a href={`#${id}`} className="section-action">{action} <ArrowRight size={15} /></a>}</div>;
}

export default function Home() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cart, setCart] = useState(0);
  const [wishes, setWishes] = useState<string[]>([]);
  const [tab, setTab] = useState("Terlaris");
  const [notice, setNotice] = useState("");
  const [search, setSearch] = useState("");
  const [quoteSent, setQuoteSent] = useState(false);
  const [newsletter, setNewsletter] = useState("");
  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === "Escape") setMobileOpen(false); };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);
  const filtered = useMemo(() => products.filter((p) => p[0].toLowerCase().includes(search.toLowerCase())), [search]);
  const addCart = (name: string) => { setCart((n) => n + 1); setNotice(`${name} ditambahkan ke keranjang.`); window.setTimeout(() => setNotice(""), 2600); };
  const toggleWish = (name: string) => setWishes((items) => items.includes(name) ? items.filter((x) => x !== name) : [...items, name]);

  return <main>
    <a className="skip" href="#content">Lewati ke konten</a>
    {notice && <div className="toast" role="status">{notice}</div>}
    <div className="utility"><div className="shell utility-inner"><span><Truck size={14}/> Gratis Ongkir untuk pembelian di atas Rp 1.000.000</span><div><a href="#footer">Pusat Bantuan</a><a href="#products">Lacak Pesanan</a><a href="#regions">Lokasi Toko</a><button>Bahasa Indonesia <ChevronDown size={13}/></button></div></div></div>

    <header className="header"><div className="shell header-row">
      <button className="mobile-menu-btn" aria-label="Buka menu" aria-expanded={mobileOpen} onClick={() => setMobileOpen(true)}><Menu /></button>
      <a className="wordmark" href="#content">Better Space <small>FURNITURE FOR A BETTER LIVING.</small></a>
      <form className="search" onSubmit={(e) => { e.preventDefault(); document.getElementById("products")?.scrollIntoView({ behavior: "smooth" }); }}><button type="button" className="select-category">Semua Kategori <ChevronDown size={14}/></button><input aria-label="Cari produk" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Cari furniture, ruangan, atau gaya..."/><button aria-label="Cari" className="search-button"><Search size={19}/></button></form>
      <div className="account-actions"><a href="#footer"><UserRound/><span>Masuk<br/><b>Akun Saya</b></span></a><a href="#products"><Heart/><span>Wishlist<br/><b>Favorit</b></span></a><a href="#products" className="cart"><ShoppingBag/><span>Keranjang<br/><b>{cart} Produk</b></span><i>{cart}</i></a></div>
    </div></header>
    <nav className="mainnav"><div className="shell">{nav.map((item) => <ScrollLink key={item} href={item === "Promo" ? "#promos" : "#categories"} className={item === "Promo" ? "promo-nav" : ""}>{item}</ScrollLink>)}</div></nav>

    <div className={`drawer ${mobileOpen ? "open" : ""}`} role="dialog" aria-modal="true" aria-label="Navigasi utama"><div className="drawer-panel"><div className="drawer-top"><b>MENU BETTER SPACE</b><button aria-label="Tutup menu" onClick={() => setMobileOpen(false)}><X/></button></div>{nav.map((n) => <a key={n} href={n === "Promo" ? "#promos" : "#categories"} onClick={() => setMobileOpen(false)}>{n}<ChevronRight size={16}/></a>)}<div className="drawer-search"><Search size={18}/><input aria-label="Cari di Better Space" placeholder="Cari produk" value={search} onChange={(e)=>setSearch(e.target.value)}/></div></div><button className="drawer-backdrop" aria-label="Tutup menu" onClick={() => setMobileOpen(false)} /></div>

    <div id="content" className="shell hero-layout">
      <aside className="category-sidebar" aria-label="Kategori produk"><div className="side-title"><LayoutGrid size={17}/> Kategori Furniture</div>{sidebar.map(([name, Icon]) => <a key={name} href="#products"><Icon size={16}/><span>{name}</span><ChevronRight size={14}/></a>)}</aside>
      <section className="hero" aria-labelledby="hero-title"><Image src="/images/hero/living-room.jpg" fill sizes="(max-width: 900px) 100vw, 58vw" priority alt="Interior ruang keluarga hangat dengan sofa dan tanaman"/><div className="hero-copy"><span>KOLEKSI TERBARU</span><h1 id="hero-title">Furniture Modern<br/><span>Untuk Setiap Ruang</span></h1><p>Nyaman, fungsional, dan tahan lama untuk rumah dan kantor Anda.</p><a href="#products">Belanja Sekarang <ArrowRight size={17}/></a></div><div className="dots" aria-label="Slide 1 dari 3"><b></b><i></i><i></i></div></section>
      <aside className="business-cards"><article><span className="iconbox"><House/></span><div><strong>Konsultasi Interior</strong><p>Gratis konsultasi dengan tim kami.</p><a href="#quote">Atur konsultasi <ArrowRight size={14}/></a></div></article><article><span className="iconbox aqua"><Wrench/></span><div><strong>Custom Furniture</strong><p>Sesuai ukuran dan kebutuhan Anda.</p><a href="#quote">Kirim kebutuhan <ArrowRight size={14}/></a></div></article><article><span className="iconbox pale"><Building2/></span><div><strong>Business Order</strong><p>Penawaran khusus untuk perusahaan.</p><a href="#quote">Minta penawaran <ArrowRight size={14}/></a></div></article></aside>
    </div>

    <section className="benefits"><div className="shell">{[[PackageCheck,"Material Berkualitas","Tahan lama dan aman"],[Truck,"Gratis Ongkir","Min. pembelian Rp 1.000.000"],[CreditCard,"Pembayaran Aman","100% aman & terpercaya"],[Headphones,"Layanan Pelanggan","Siap membantu setiap hari"]].map(([Icon,title,desc]) => { const I = Icon as typeof Truck; return <div key={String(title)}><I/><p><b>{String(title)}</b><span>{String(desc)}</span></p></div>})}</div></section>

    <section id="promos" className="shell section"><SectionHead id="promo-title" title="Penawaran & Promo" action="Lihat Semua Promo"/><div className="promo-grid">{[
      ["DISKON HINGGA 50%", "Sofa Pilihan", "/images/categories/living.jpg", "cream"], ["HARGA SPESIAL", "Set Meja Makan", "/images/categories/dining.jpg", "teal"], ["KOLEKSI BARU", "Ruang Kerja", "/images/categories/office.jpg", "blue"], ["CLEARANCE SALE", "Lemari & Penyimpanan", "/images/categories/storage.jpg", "dark"],
    ].map(([eyebrow,title,image,tone]) => <article className={`promo ${tone}`} key={title}><Image src={image} fill sizes="(max-width: 700px) 80vw, 25vw" alt={title}/><div><span>{eyebrow}</span><h3>{title}</h3><a href="#products" aria-label={`Lihat ${title}`}><ArrowRight size={18}/></a></div></article>)}</div></section>

    <section id="categories" className="shell section"><SectionHead id="cat-title" title="Kategori Pilihan" action="Lihat Semua Kategori"/><div className="category-cards">{categories.map((cat) => <a key={cat.name} href="#products"><div><Image src={cat.image} fill sizes="(max-width: 700px) 45vw, 17vw" alt={cat.name}/></div><b>{cat.name}</b><span>Lihat produk <ArrowRight size={13}/></span></a>)}</div></section>

    <section className="shell section collection-section"><div className="collection-banners"><article className="collection-banner"><Image src="/images/categories/living.jpg" fill sizes="(max-width: 900px) 100vw, 50vw" alt="Koleksi ruang keluarga"/><div><span>KOLEKSI RUANGAN</span><h2>Perlengkapan Ruang Keluarga</h2><p>Sofa, meja, kabinet, dan lebih banyak untuk hunian yang lebih nyaman.</p><a href="#products">Lihat Koleksi <ArrowRight size={15}/></a></div></article><article className="collection-banner office"><Image src="/images/categories/office.jpg" fill sizes="(max-width: 900px) 100vw, 50vw" alt="Koleksi ruang kerja"/><div><span>BEKERJA LEBIH NYAMAN</span><h2>Ruang Kerja Produktif</h2><p>Meja kerja, kursi ergonomis, dan penyimpanan yang fungsional.</p><a href="#products">Lihat Koleksi <ArrowRight size={15}/></a></div></article></div><div className="collection-tiles">{["Sofa Minimalis","Meja Kopi","Lemari TV","Rak Dinding","Meja Kerja","Kursi Kantor","Lemari Arsip","Aksesoris Kantor"].map((name,i) => <a href="#products" key={name}><Image src={categories[i % categories.length].image} fill sizes="(max-width: 700px) 50vw, 18vw" alt={name}/><span>{name}</span></a>)}</div></section>

    <section id="quote" className="business-quote"><div className="shell quote-inner"><div><span className="quote-kicker">UNTUK BISNIS DAN PROYEK</span><h2>Kemudahan untuk Pembelian dalam Jumlah Besar</h2><p>Dapatkan penawaran khusus untuk bisnis, proyek, atau kebutuhan perusahaan Anda.</p><ul><li><ShieldCheck/>Produk sesuai kebutuhan proyek</li><li><ClipboardList/>Pendampingan pesanan dari awal</li></ul></div><form className="quote-form" onSubmit={(e) => { e.preventDefault(); const fd = new FormData(e.currentTarget); if (!fd.get("company") || !fd.get("email") || !fd.get("quantity")) return; setQuoteSent(true); e.currentTarget.reset(); }}><h3>Minta Penawaran untuk Supplier</h3><label>Nama Perusahaan<input required name="company" placeholder="Nama perusahaan Anda"/></label><label>Email<input required type="email" name="email" placeholder="email@perusahaan.com"/></label><label>Jumlah Kebutuhan<select required name="quantity" defaultValue=""><option value="" disabled>Pilih estimasi kebutuhan</option><option>10 - 50 produk</option><option>51 - 100 produk</option><option>Lebih dari 100 produk</option></select></label><label>Pesan <em>(Opsional)</em><textarea name="message" placeholder="Ceritakan kebutuhan proyek Anda"/></label><button>Kirim Penawaran <Send size={16}/></button>{quoteSent && <p className="form-success" role="status">Terima kasih. Tim Better Space akan menghubungi Anda.</p>}</form></div></section>

    <section id="products" className="shell section products"><SectionHead id="product-title" title="Rekomendasi Produk" action="Lihat Semua"/><div className="product-toolbar"><div role="tablist" aria-label="Filter produk">{["Terlaris", "Produk Baru", "Penawaran Spesial"].map((t) => <button role="tab" aria-selected={tab===t} key={t} className={tab===t ? "active" : ""} onClick={()=>setTab(t)}>{t}</button>)}</div><span>{search ? `${filtered.length} hasil pencarian` : `Pilihan ${tab.toLowerCase()}`}</span></div><div className="product-grid">{filtered.map(([name,category,price,old,rating,reviews,image]) => <article className="product-card" key={name}><div className="product-image"><Image src={image} fill sizes="(max-width: 600px) 50vw, (max-width: 1000px) 33vw, 20vw" alt={name}/><button aria-label={`Simpan ${name} ke wishlist`} aria-pressed={wishes.includes(name)} className={wishes.includes(name)?"hearted":""} onClick={() => toggleWish(name)}><Heart size={18} fill={wishes.includes(name)?"currentColor":"none"}/></button></div><div className="product-info"><span>{category}</span><h3>{name}</h3><p className="rating"><Star size={14} fill="currentColor"/> {rating} <small>({reviews})</small></p><div className="price-row"><strong>{price}</strong>{old && <del>{old}</del>}</div><button className="add" onClick={() => addCart(name)}>Tambah <ShoppingBag size={15}/></button></div></article>)}</div>{filtered.length === 0 && <div className="empty">Produk yang dicari belum tersedia. Coba kata kunci lain.</div>}</section>

    <section className="services"><div className="shell"><SectionHead id="service-title" title="Layanan Tambahan Kami"/><div className="service-grid">{[[House,"Konsultasi Desain Interior","Gratis konsultasi dengan tim ahli kami."],[Wrench,"Custom Furniture","Sesuai kebutuhan ruang Anda."],[PackageCheck,"Jasa Perakitan","Perakitan cepat dan profesional."],[ShieldCheck,"Garansi & Dukungan","Produk berkualitas dengan layanan purna jual terpercaya."]].map(([Icon,title,copy]) => {const I=Icon as typeof House; return <article key={String(title)}><I/><div><h3>{String(title)}</h3><p>{String(copy)}</p></div></article>})}</div></div></section>

    <section id="regions" className="shell section"><SectionHead id="region-title" title="Supplier Berdasarkan Wilayah"/><div className="regions">{[["🇮🇩","Indonesia","Produk Lokal"],["🇨🇳","China","Perabot Modern"],["🇲🇾","Malaysia","Desain Kontemporer"],["🇻🇳","Vietnam","Harga Kompetitif"],["🇹🇭","Thailand","Keahlian Kayu"],["🇸🇬","Singapore","Teknologi & Inovasi"]].map(([flag,name,desc]) => <article key={name}><b>{flag}</b><span><strong>{name}</strong><small>{desc}</small></span></article>)}</div></section>

    <footer id="footer"><div className="shell footer-grid"><div className="footer-brand"><a className="wordmark" href="#content">Better Space <small>FURNITURE FOR A BETTER LIVING.</small></a><p>Furniture berkualitas untuk setiap ruang. Membuat rumah dan tempat kerja lebih nyaman, fungsional dan indah.</p><div className="socials"><a href="#footer" aria-label="Instagram"><Camera/></a><a href="#footer" aria-label="Facebook"><UserRound/></a><a href="#footer" aria-label="TikTok"><Music2/></a><a href="#footer" aria-label="YouTube"><Video/></a></div></div><div><h3>Belanja</h3>{["Semua Produk","Ruang Tamu","Kamar Tidur","Ruang Makan","Ruang Kerja","Penyimpanan","Dekorasi Rumah","Promo"].map(x => <a href="#products" key={x}>{x}</a>)}</div><div><h3>Layanan Pelanggan</h3>{["Pusat Bantuan","Lacak Pesanan","Informasi Pengiriman","Pengembalian & Penukaran","Garansi Produk","Syarat & Ketentuan","Kebijakan Privasi"].map(x => <a href="#footer" key={x}>{x}</a>)}</div><div className="newsletter"><h3>Dapatkan Update Terbaru</h3><p>Dapatkan inspirasi ruangan, promo, dan koleksi terbaru dari Better Space.</p><form onSubmit={(e)=>{e.preventDefault(); if(newsletter.includes("@")){setNotice("Terima kasih, Anda sudah terdaftar.");setNewsletter("")} else setNotice("Masukkan alamat email yang valid.")}}><input aria-label="Email newsletter" type="email" placeholder="Alamat email Anda" value={newsletter} onChange={(e)=>setNewsletter(e.target.value)} required/><button aria-label="Daftar newsletter"><Send size={17}/></button></form></div></div><div className="shell footer-bottom"><span>© 2026 Better Space. Semua hak dilindungi.</span><div className="payments"><b>BCA</b><b>Mandiri</b><b>BNI</b><b>BRI</b><b>VISA</b><b>mastercard</b><b>GoPay</b><b>OVO</b><b>DANA</b></div></div></footer>
  </main>;
}
