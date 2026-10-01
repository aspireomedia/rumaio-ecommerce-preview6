"use client";

import Link from "next/link";
import { AlertTriangle, Clock3, CreditCard, FileWarning, PackageX, RefreshCw, SearchX, ShieldAlert, ShoppingBag, UploadCloud, WifiOff } from "lucide-react";

type State = keyof typeof states;
const states = {
  "not-found": [SearchX, "Halaman ini tidak tersedia", "Alamatnya mungkin tidak lengkap atau halamannya sudah berpindah. Tidak ada pembayaran yang dilakukan.", "Belanja produk", "/#products"],
  unavailable: [WifiOff, "Toko sedang tidak dapat dihubungi", "Kami tidak dapat terhubung ke layanan toko. Tidak ada pembayaran yang dilakukan.", "Coba lagi", "retry"],
  timeout: [Clock3, "Permintaan membutuhkan waktu terlalu lama", "Kami belum menerima respons tepat waktu. Tidak ada pembayaran yang dilakukan.", "Coba lagi", "retry"],
  declined: [CreditCard, "Pembayaran Anda belum disetujui", "Kartu Anda tidak ditagih. Periksa detailnya atau pilih metode pembayaran lain.", "Pilih metode lain", "/status/pending"],
  pending: [Clock3, "Kami menunggu konfirmasi pembayaran", "Jangan membayar lagi dulu. Pesanan akan diperbarui saat konfirmasi diterima.", "Periksa lagi", "retry"],
  expired: [Clock3, "Sesi pembayaran Anda telah berakhir", "Tidak ada pembayaran yang dilakukan. Mulai sesi pembayaran baru saat Anda siap.", "Mulai pembayaran lagi", "/#products"],
  "order-not-found": [FileWarning, "Pesanan tersebut tidak ditemukan", "Periksa referensi pesanan lalu coba lagi. Tidak ada pembayaran baru yang dilakukan.", "Hubungi bantuan", "/#footer"],
  "out-of-stock": [PackageX, "Produk ini habis", "Produk ini belum dapat ditambahkan ke pesanan. Tidak ada pembayaran yang dilakukan.", "Lihat produk tersedia", "/#products"],
  "stock-changed": [PackageX, "Stok berubah setelah produk ditambahkan", "Produk yang tidak tersedia telah dikeluarkan sebelum pembayaran. Tidak ada pembayaran yang dilakukan.", "Tinjau produk", "/#products"],
  "price-changed": [AlertTriangle, "Harga berubah sebelum pembayaran", "Tinjau total terbaru sebelum melanjutkan. Tidak ada pembayaran yang dilakukan.", "Tinjau produk", "/#products"],
  "empty-cart": [ShoppingBag, "Keranjang Anda masih kosong", "Tambahkan produk sebelum memulai pembayaran. Tidak ada pembayaran yang dilakukan.", "Belanja produk", "/#products"],
  "empty-search": [SearchX, "Tidak ada produk yang cocok", "Coba nama ruangan, material, atau kata kunci yang lebih singkat. Tidak ada pembayaran yang dilakukan.", "Lihat semua produk", "/#products"],
  validation: [AlertTriangle, "Periksa kembali detail pesanan", "Ada informasi yang belum lengkap atau tidak sesuai. Tidak ada pembayaran yang dilakukan.", "Tinjau pesanan", "/#products"],
  "too-many-attempts": [Clock3, "Mohon tunggu sebelum mencoba lagi", "Terlalu banyak percobaan dalam waktu singkat. Tidak ada pembayaran yang dilakukan.", "Coba lagi", "retry"],
  "session-expired": [ShieldAlert, "Sesi staf Anda telah berakhir", "Untuk keamanan, silakan masuk kembali. Tidak ada pembayaran yang dilakukan.", "Masuk kembali", "/"],
  unauthorized: [ShieldAlert, "Anda tidak memiliki akses ke area ini", "Akun ini tidak memiliki peran yang diperlukan. Tidak ada pembayaran yang dilakukan.", "Kembali ke beranda", "/"],
  "upload-rejected": [UploadCloud, "Gambar tersebut tidak dapat diunggah", "Gunakan gambar JPG, PNG, atau WebP dengan ukuran maksimal 5 MB. Tidak ada pembayaran yang dilakukan.", "Pilih gambar lain", "/"],
  unexpected: [AlertTriangle, "Bagian toko ini tidak dapat dimuat", "Keranjang Anda tidak ditagih. Silakan coba lagi.", "Coba lagi", "retry"],
} as const;

export function ErrorExperience({ state = "unexpected", reset }: { state?: string; reset?: () => void }) {
  const [Icon, title, detail, action, href] = states[(state in states ? state : "unexpected") as State];
  return <main className="error-page"><section className="error-card" role="alert"><Icon aria-hidden="true" size={42}/><p>PEMBARUAN CASEN LIVING</p><h1>{title}</h1><span>{detail}</span><div>{href === "retry" ? <button onClick={() => reset ? reset() : window.location.reload()}><RefreshCw size={16}/>{action}</button> : <Link href={href}>{action}</Link>}<Link className="error-secondary" href="/">Kembali ke beranda</Link></div></section></main>;
}
