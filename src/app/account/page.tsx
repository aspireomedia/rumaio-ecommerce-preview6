"use client";
import Link from "next/link";
import { PageTitle, StoreFooter, StoreHeader, useStore } from "@/app/furniture/FurnitureShell";
export default function AccountPage(){const store=useStore();return <><StoreHeader store={store}/><PageTitle kicker="AKUN SAYA" title="Ruang pribadi Better Space"/><main className="store-shell account-page"><section><h2>Data profil</h2><p>Masuk untuk menyimpan alamat, wishlist, dan riwayat pesanan. Fitur akun penuh tersedia pada toko produksi.</p><button onClick={()=>store.setNotice('Masuk belum tersedia pada preview ini.')}>Masuk ke akun</button></section><section><h2>Pesanan</h2><p>Lihat ringkasan alur pesanan furniture Anda.</p><Link href="/orders">Buka pesanan saya</Link></section></main><StoreFooter/></>}
