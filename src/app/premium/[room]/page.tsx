"use client";
import { Suspense, useEffect, useMemo, useState } from "react";
import { notFound, useParams, useRouter, usePathname, useSearchParams } from "next/navigation";
import { premiumByRoom } from "@/lib/premium-catalog";
import { PremiumFooter, PremiumHeader, PremiumProductCard, roomLabels, usePremiumStore } from "../PremiumShell";
import { Pagination, PageSizeSelect, ListingRangeLabel } from "@/components/Pagination";
import { paginate, PageSize, parsePageParam, parsePageSizeParam, CATALOGUE_PAGE_SIZES_3COL } from "@/lib/paginate";
import { SORT_OPTIONS, sortProducts } from "@/lib/sort";
const validRooms = ["living", "dining", "bedroom", "office", "storage"];
export default function PremiumRoomPage() { return <Suspense fallback={null}><PremiumRoomContent /></Suspense>; }
function PremiumRoomContent() {
  const store = usePremiumStore(); const params = useParams(); const room = params.room as string; if (!validRooms.includes(room)) notFound();
  const searchParams = useSearchParams(); const router = useRouter(); const pathname = usePathname();
  // URL is the single source of truth for page/limit so any view is a shareable deep link.
  const urlPage = parsePageParam(searchParams.get("page"));
  const urlPageSize = parsePageSizeParam(searchParams.get("limit"), CATALOGUE_PAGE_SIZES_3COL);
  const [page, setPage] = useState(urlPage);
  const [pageSize, setPageSize] = useState<PageSize>(urlPageSize);
  const [sort, setSort] = useState("featured");
  const [seenUrl, setSeenUrl] = useState({ room, page: urlPage, pageSize: urlPageSize });
  if (seenUrl.room !== room || seenUrl.page !== urlPage || seenUrl.pageSize !== urlPageSize) {
    const roomChanged = seenUrl.room !== room;
    setSeenUrl({ room, page: urlPage, pageSize: urlPageSize });
    setPageSize(urlPageSize);
    setPage(roomChanged ? 1 : urlPage);
  }
  // A sort change always returns to page 1 so the first result of the new order is visible.
  const [sortKey, setSortKey] = useState(sort);
  if (sortKey !== sort) { setSortKey(sort); setPage(1); }
  const pushUrl = (nextPage: number, nextPageSize: PageSize) => {
    setSeenUrl({ room, page: nextPage, pageSize: nextPageSize });
    setPage(nextPage); setPageSize(nextPageSize);
    router.replace(`${pathname}?page=${nextPage}&limit=${nextPageSize}`, { scroll: false });
  };
  const products = useMemo(() => sortProducts(premiumByRoom(room).map(p => ({ ...p, numericPrice: p.price })), sort), [room, sort]);
  const { pageItems, total, totalPages, safePage, start, end } = useMemo(() => paginate(products, page, pageSize), [products, page, pageSize]);
  // Out-of-range pages resolve to a valid page. Kept as local-only clamping so a shared
  // link is never silently rewritten; the grid still renders correctly either way.
  if (safePage !== page) setPage(safePage);
  return <><PremiumHeader store={store} /><main><section className="premium-listing-head"><div className="premium-shell"><h1 className="premium-serif">{roomLabels[room]}</h1><p>Pilihan untuk {roomLabels[room].toLowerCase()}, dipilih untuk material berkualitas dan kenyamanan sehari-hari.</p></div></section><section id="premium-room-listing" className="premium-shell premium-listing-grid">{products.length > 0 ? <><div className="premium-listing-toolbar"><ListingRangeLabel total={total} start={start} end={end}/><div className="premium-listing-toolbar-controls"><PageSizeSelect pageSize={pageSize} options={CATALOGUE_PAGE_SIZES_3COL} onPageSizeChange={(size) => pushUrl(1, size)}/><label className="sort-control">Urutkan <select value={sort} onChange={(e) => setSort(e.target.value)}>{SORT_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}</select></label></div></div><div className="premium-products">{pageItems.map((p) => <PremiumProductCard key={p.id} product={p} store={store} />)}</div><Pagination page={safePage} totalPages={totalPages} onPageChange={(next) => pushUrl(next, pageSize)} className="premium-pagination" scrollTargetId="premium-room-listing"/></> : <div className="premium-listing-empty">Belum ada produk tersedia untuk ruang ini.</div>}</section></main><PremiumFooter /></>;
}
