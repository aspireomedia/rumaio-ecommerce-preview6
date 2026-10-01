"use client";
import Link from "next/link";
import { LogIn } from "lucide-react";
import { PageTitle, StoreFooter, StoreHeader, useStore } from "@/app/furniture/FurnitureShell";
export default function SignInPage(){const store=useStore();return <><StoreHeader store={store}/><PageTitle kicker="AKUN SAYA" title="Masuk ke Casen Living"/><main className="store-shell form-page"><section className="form-card"><LogIn size={28}/><h2>Masuk ke akun</h2><p>Autentikasi produksi belum diaktifkan. Jangan masukkan kata sandi nyata pada preview ini.</p><label>Email<input type="email" placeholder="email@example.com"/></label><label>Kata sandi<input type="password" placeholder="Kata sandi"/></label><button onClick={()=>store.setNotice('Masuk belum tersedia pada preview ini.')}>Masuk</button><p>Belum punya akun? <Link href="/register">Buat akun</Link></p><Link href="/account/security">Pengaturan keamanan</Link></section></main><StoreFooter/></>}
