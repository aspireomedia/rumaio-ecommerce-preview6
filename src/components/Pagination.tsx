"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { PAGE_SIZE_OPTIONS, PageSize, PageSizeOptions, buildPageList } from "@/lib/paginate";

export function ListingRangeLabel({ total, start, end }: { total: number; start: number; end: number }) {
  if (total === 0) return <span>0 produk ditemukan</span>;
  return <span>Menampilkan {start + 1}–{end} dari {total} produk</span>;
}

// `options` is required so every catalogue surface states its own page-size set explicitly.
// It MUST match that surface's desktop column count (3-col -> multiples of 3) so pages end
// on complete rows. Defaulting to the 4-column set when a caller forgets is a visible bug,
// not silent breakage, which is the safer failure mode.
export function PageSizeSelect({ pageSize, onPageSizeChange, options = PAGE_SIZE_OPTIONS, className = "" }: { pageSize: PageSize; onPageSizeChange: (size: PageSize) => void; options?: PageSizeOptions; className?: string }) {
  return (
    <label className={`page-size-select ${className}`.trim()}>
      Tampilkan
      <select value={pageSize} onChange={(e) => onPageSizeChange(Number(e.target.value) as PageSize)}>
        {options.map((n) => <option key={n} value={n}>{n} per halaman</option>)}
      </select>
    </label>
  );
}

export function Pagination({ page, totalPages, onPageChange, className = "", scrollTargetId }: { page: number; totalPages: number; onPageChange: (page: number) => void; className?: string; scrollTargetId?: string }) {
  if (totalPages <= 1) return null;
  const pages = buildPageList(totalPages, page);
  const go = (p: number) => {
    onPageChange(p);
    if (scrollTargetId && typeof document !== "undefined") {
      document.getElementById(scrollTargetId)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };
  return (
    <nav className={`pagination-nav ${className}`.trim()} aria-label="Navigasi halaman produk">
      <button type="button" className="pagination-prev" onClick={() => go(page - 1)} disabled={page <= 1} aria-label="Halaman sebelumnya">
        <ChevronLeft size={15} /> <span className="pagination-prev-label">Sebelumnya</span>
      </button>
      <span className="pagination-numbers">
        {pages.map((p, i) => p === "..." ? <span key={`ellipsis-${i}`} className="pagination-ellipsis">…</span> : (
          <button type="button" key={p} className={p === page ? "pagination-page active" : "pagination-page"} aria-current={p === page ? "page" : undefined} onClick={() => go(p)}>{p}</button>
        ))}
      </span>
      <span className="pagination-mobile-indicator">{page} / {totalPages}</span>
      <button type="button" className="pagination-next" onClick={() => go(page + 1)} disabled={page >= totalPages} aria-label="Halaman berikutnya">
        <span className="pagination-next-label">Berikutnya</span> <ChevronRight size={15} />
      </button>
    </nav>
  );
}
