"use client";
import Link from "next/link";
import { PackageCheck } from "lucide-react";
import { PageTitle, StoreFooter, StoreHeader, useStore } from "@/app/furniture/FurnitureShell";
export default function OrdersPage(){const store=useStore();return <><StoreHeader store={store}/><PageTitle kicker="PESANAN SAYA" title="Riwayat pesanan furniture"/><main className="store-shell orders-page"><PackageCheck size={42}/><h2>Belum ada pesanan tercatat</h2><p>Produk yang Anda tambahkan tersedia di keranjang preview. Checkout produksi belum diaktifkan.</p><div><Link href="/products">Mulai berbelanja</Link><Link href="/orders/preview">Lihat alur detail pesanan</Link></div></main><StoreFooter/></>}
