"use client";
import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import { PageTitle, StoreFooter, StoreHeader, useStore } from "@/app/furniture/FurnitureShell";
export default function SecurityPage(){const store=useStore();return <><StoreHeader store={store}/><PageTitle kicker="AKUN SAYA" title="Keamanan akun"/><main className="store-shell form-page"><section className="form-card"><ShieldCheck size={28}/><h2>Pengaturan keamanan</h2><p>Fitur ini adalah bagian dari preview UI. Tidak ada kata sandi, sesi, atau data keamanan yang disimpan.</p><label>Email akun<input type="email" placeholder="email@example.com" disabled/></label><label>Kata sandi baru<input type="password" placeholder="Tersedia setelah login produksi" disabled/></label><button onClick={()=>store.setNotice('Keamanan akun tersedia setelah autentikasi produksi diaktifkan.')}>Simpan perubahan</button><Link href="/account">Kembali ke akun</Link></section></main><StoreFooter/></>}
