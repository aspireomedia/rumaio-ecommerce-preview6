"use client";
import { notFound, useParams } from "next/navigation";
import { premiumByRoom } from "@/lib/premium-catalog";
import { PremiumFooter, PremiumHeader, PremiumProductCard, roomLabels, usePremiumStore } from "../PremiumShell";
const validRooms = ["living", "dining", "bedroom", "office", "storage"];
export default function PremiumRoomPage() { const store = usePremiumStore(); const params = useParams(); const room = params.room as string; if (!validRooms.includes(room)) notFound(); const products = premiumByRoom(room); return <><PremiumHeader store={store} /><main><section className="premium-listing-head"><div className="premium-shell"><h1 className="premium-serif">{roomLabels[room]}</h1><p>Pilihan untuk {roomLabels[room].toLowerCase()}, dipilih untuk material berkualitas dan kenyamanan sehari-hari.</p></div></section><section className="premium-shell premium-listing-grid">{products.length > 0 ? <div className="premium-products">{products.map((p) => <PremiumProductCard key={p.id} product={p} store={store} />)}</div> : <div className="premium-listing-empty">Belum ada produk tersedia untuk ruang ini.</div>}</section></main><PremiumFooter /></>; }
