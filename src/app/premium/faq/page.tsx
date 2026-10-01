"use client";
import { PremiumFooter, PremiumHeader, usePremiumStore } from "../PremiumShell";

const faqGroups = [
  { title: "Pesanan & Pembayaran", items: [
    ["Bagaimana cara melakukan pemesanan?", "Jelajahi koleksi, tambahkan produk ke keranjang, lalu ikuti langkah checkout. Hubungi tim kami apabila Anda memerlukan bantuan untuk langkah berikutnya."],
    ["Metode pembayaran apa yang tersedia?", "Hubungi tim kami untuk informasi metode pembayaran yang tersedia untuk pesanan Anda."],
    ["Apakah saya bisa mengubah atau membatalkan pesanan?", "Hubungi tim kami sesegera mungkin setelah pemesanan. Ketersediaannya bergantung pada tahap pemrosesan pesanan."],
  ] },
  { title: "Pengiriman", items: [
    ["Ke mana Casen Living mengirimkan produk?", "Hubungi tim kami untuk memastikan cakupan pengiriman di area Anda."],
    ["Berapa lama waktu pengiriman?", "Waktu pengiriman bergantung pada produk dan lokasi. Hubungi tim kami untuk perkiraan yang sesuai dengan pesanan Anda."],
    ["Bagaimana produk furniture berukuran besar dikirimkan?", "Produk berukuran besar ditangani dengan perhatian khusus. Hubungi tim kami untuk detail produk Anda."],
    ["Bagaimana cara melacak pesanan?", "Hubungi tim kami untuk bantuan terkait pelacakan pesanan Anda."],
  ] },
  { title: "Pengembalian & Garansi", items: [
    ["Bagaimana kebijakan pengembalian?", "Hubungi tim kami untuk bantuan mengenai kelayakan dan langkah pengembalian produk."],
    ["Apa yang harus dilakukan jika produk tiba dalam kondisi rusak?", "Segera hubungi tim kami dengan foto produk dan kemasannya agar kami dapat membantu penyelesaiannya."],
    ["Apakah tersedia garansi produk?", "Hubungi tim kami untuk detail cakupan garansi yang sesuai dengan produk Anda."],
  ] },
  { title: "Produk", items: [
    ["Apakah warna produk sama persis seperti yang terlihat secara online?", "Kami berupaya menampilkan warna secara akurat, namun tampilan layar dapat sedikit berbeda. Hubungi tim kami jika Anda membutuhkan detail warna."],
    ["Di mana saya dapat melihat dimensi dan material produk?", "Dimensi dan material lengkap tercantum pada bagian \"Tentang Produk Ini\" di setiap halaman produk."],
    ["Bagaimana cara merawat furniture saya?", "Panduan perawatan sesuai material tersedia pada setiap halaman produk. Hubungi tim kami untuk saran lebih lanjut."],
  ] },
  { title: "Layanan", items: [
    ["Apakah Casen Living menyediakan konsultasi furniture?", "Hubungi tim kami untuk menanyakan ketersediaan konsultasi bagi ruang Anda."],
    ["Apakah tersedia layanan perakitan?", "Hubungi tim kami untuk bantuan terkait ketersediaan layanan perakitan."],
    ["Apakah saya dapat memesan furniture untuk kebutuhan bisnis atau proyek?", "Hubungi tim kami untuk mendiskusikan kebutuhan furniture bisnis atau proyek Anda."],
  ] },
];

export default function PremiumFaqPage() {
  const store = usePremiumStore();
  return <><PremiumHeader store={store} /><main><section className="premium-faq-hero"><h1 className="premium-serif">Pertanyaan yang Sering Diajukan</h1><p>Jawaban untuk pertanyaan umum seputar berbelanja di Casen Living.</p></section><section className="premium-shell premium-faq-body">{faqGroups.map((group) => <div key={group.title} className="premium-faq-group"><h2 className="premium-serif">{group.title}</h2>{group.items.map(([q, a]) => <details key={q} className="premium-faq-item"><summary>{q}</summary><p>{a}</p></details>)}</div>)}</section></main><PremiumFooter /></>;
}
