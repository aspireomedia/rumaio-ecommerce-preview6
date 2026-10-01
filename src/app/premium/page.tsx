"use client";
import Image from "next/image";
import Link from "next/link";
import { premiumCatalog } from "@/lib/premium-catalog";
import { PremiumFooter, PremiumHeader, PremiumProductCard, usePremiumStore } from "./PremiumShell";

const rooms = [
  { slug: "living", name: "Living Room", image: "https://images.pexels.com/photos/6758245/pexels-photo-6758245.jpeg?auto=compress&cs=tinysrgb&h=900&w=700" },
  { slug: "dining", name: "Dining", image: "https://images.pexels.com/photos/7180275/pexels-photo-7180275.jpeg?auto=compress&cs=tinysrgb&h=900&w=700" },
  { slug: "bedroom", name: "Bedroom", image: "https://images.pexels.com/photos/30287057/pexels-photo-30287057.jpeg?auto=compress&cs=tinysrgb&h=900&w=700" },
  { slug: "office", name: "Office", image: "https://images.pexels.com/photos/7071/space-desk-office-workspace.jpg?auto=compress&cs=tinysrgb&h=900&w=700" },
];

const featuredIds = ["luna-sofa", "bed-frame-laras-king-upholstered", "dining-table-gading-round-120", "desk-rakha-teak-130", "cabinet-lara-wide", "sofa-ranu-3s"];
const featured = featuredIds.map((id) => premiumCatalog.find((p) => p.id === id)).filter(Boolean) as typeof premiumCatalog;

const promos = [
  { kicker: "Living Collection", title: "Designed for Everyday Comfort", href: "/premium/living", image: "https://images.pexels.com/photos/6758245/pexels-photo-6758245.jpeg?auto=compress&cs=tinysrgb&h=650&w=1600" },
  { kicker: "Dining Collection", title: "Made for Moments Together", href: "/premium/dining", image: "https://images.pexels.com/photos/7180275/pexels-photo-7180275.jpeg?auto=compress&cs=tinysrgb&h=650&w=1600" },
  { kicker: "Bedroom Collection", title: "Comfort That Feels Like Home", href: "/premium/bedroom", image: "https://images.pexels.com/photos/30287057/pexels-photo-30287057.jpeg?auto=compress&cs=tinysrgb&h=650&w=1600" },
];

const homeFaqs = [
  ["Bagaimana cara melakukan pemesanan?", "Jelajahi koleksi, pilih produk yang Anda sukai, lalu tambahkan ke keranjang. Hubungi tim kami apabila Anda membutuhkan bantuan sebelum melanjutkan."],
  ["Berapa lama waktu pengiriman?", "Waktu pengiriman bergantung pada produk dan lokasi. Hubungi tim kami untuk informasi yang sesuai dengan pesanan Anda."],
  ["Apakah tersedia layanan perakitan?", "Hubungi tim kami untuk menanyakan ketersediaan bantuan perakitan untuk produk dan area Anda."],
  ["Bagaimana jika produk tiba dalam kondisi rusak?", "Hubungi tim kami dengan foto produk dan kemasannya agar kami dapat membantu langkah selanjutnya."],
  ["Apakah Casen Living melayani kebutuhan proyek atau bisnis?", "Ya. Hubungi tim kami untuk mendiskusikan kebutuhan furniture untuk proyek maupun bisnis Anda."],
];

export default function PremiumHome() {
  const store = usePremiumStore();
  return (
    <>
      <a className="premium-skip" href="#premium-content">Lewati ke konten</a>
      <PremiumHeader store={store} />
      <main id="premium-content">
        <section className="premium-hero" aria-labelledby="premium-hero-title">
          <Image src="https://images.pexels.com/photos/6758245/pexels-photo-6758245.jpeg?auto=compress&cs=tinysrgb&h=1200&w=1920" alt="Ruang keluarga dengan sofa rendah dan bantal berlapis" fill priority sizes="100vw" />
          <div className="premium-hero-copy">
            <span>Casen Living</span>
            <h1 id="premium-hero-title">Beautiful Furniture for the Way You Actually Live</h1>
            <p>Thoughtfully designed pieces for everyday comfort, quality materials, and a home that feels like yours.</p>
            <div className="premium-hero-ctas">
              <Link href="/premium/living" className="primary">Shop Living</Link>
              <Link href="/premium/dining" className="secondary">Shop Dining</Link>
            </div>
          </div>
        </section>

        <section className="premium-section">
          <div className="premium-shell">
            <div className="premium-section-head"><h2 className="premium-serif">Shop by Room</h2></div>
            <div className="premium-rooms">
              {rooms.map((room) => (
                <Link key={room.slug} href={`/premium/${room.slug}`}>
                  <Image src={room.image} alt={room.name} fill sizes="(max-width:720px) 50vw, 25vw" />
                  <h3 className="premium-serif">{room.name}</h3>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="premium-section tight">
          <div className="premium-shell">
            <div className="premium-section-head"><h2 className="premium-serif">Featured Pieces</h2></div>
            <div className="premium-products">
              {featured.map((p) => <PremiumProductCard key={p.id} product={p} store={store} />)}
            </div>
          </div>
        </section>

        <section className="premium-about-home">
          <div className="premium-shell premium-about-home-inner">
            <div>
              <p className="premium-kicker">About Casen Living</p>
              <h2 className="premium-serif">Where Space Becomes Home.</h2>
            </div>
            <div>
              <p>Terinspirasi dari Casa, Casen Living melihat rumah sebagai ruang yang benar-benar hidup: tempat untuk beristirahat, berkumpul, bekerja, bertumbuh, dan menikmati keseharian.</p>
              <Link href="/premium/about">Selengkapnya tentang Casen Living <span aria-hidden="true">→</span></Link>
            </div>
          </div>
        </section>

        <section className="premium-promo-section">
          <div className="premium-shell premium-promo-stack">
            {promos.map((promo) => (
              <Link key={promo.kicker} href={promo.href} className="premium-wide-promo">
                <Image src={promo.image} alt={promo.title} fill sizes="(max-width:720px) 100vw, 1280px" />
                <div><p>{promo.kicker}</p><h2 className="premium-serif">{promo.title}</h2></div>
              </Link>
            ))}
          </div>
        </section>

        <section className="premium-philosophy premium-section">
          <div className="premium-shell premium-philosophy-inner">
            <p className="premium-kicker">Brand Philosophy</p>
            <h2 className="premium-serif">Inspired by Casa — Reimagined for Living.</h2>
            <p>Casa adalah akar inspirasi kami: rumah sebagai ruang yang memiliki makna. Casen memberi identitas yang lebih modern dan khas, sementara Living memperluas maknanya melampaui tempat tinggal — menjadi ruang untuk istirahat, kebersamaan, kerja, dan kehidupan sehari-hari.</p>
            <p className="premium-essence-line">Modern <i>•</i> Home <i>•</i> Comfort <i>•</i> Everyday Living <i>•</i> Versatile</p>
            <strong>Where Space Becomes Home.</strong>
          </div>
        </section>

        <section className="premium-craft premium-section">
          <div className="premium-shell">
            <h2 className="premium-serif">Thoughtfully Crafted</h2>
            <p className="premium-craft-copy">Every piece at Casen Living is chosen and finished with intention. We work with skilled makers to create furniture that fits real, everyday life, not just a photograph.</p>
            <div className="premium-craft-stats">
              <div><div>1 Week</div><p>Delivery Timeline</p></div>
              <div><div>100%</div><p>Thoughtful Selection</p></div>
              <div><div>Premium</div><p>Materials &amp; Design</p></div>
            </div>
          </div>
        </section>

        <section className="premium-home-faq premium-section">
          <div className="premium-shell">
            <div className="premium-home-faq-head"><div><p className="premium-kicker">Need Help?</p><h2 className="premium-serif">Frequently Asked Questions</h2></div><Link href="/premium/faq">Lihat Semua FAQ <span aria-hidden="true">→</span></Link></div>
            <div className="premium-home-faq-list">
              {homeFaqs.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}
            </div>
          </div>
        </section>
      </main>
      <PremiumFooter />
    </>
  );
}
