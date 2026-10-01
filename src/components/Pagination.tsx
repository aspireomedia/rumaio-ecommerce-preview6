"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { PAGE_SIZE_OPTIONS, PageSize, buildPageList } from "@/lib/paginate";

export function ListingRangeLabel({ total, start, end }: { total: number; start: number; end: number }) {
  if (total === 0) return <span>0 produk ditemukan</span>;
  return <span>Menampilkan {start + 1}–{end} dari {total} produk</span>;
}

export function PageSizeSelect({ pageSize, onPageSizeChange, className = "" }: { pageSize: PageSize; onPageSizeChange: (size: PageSize) => void; className?: string }) {
  return (
    <label className={`page-size-select ${className}`.trim()}>
      Tampilkan
      <select value={pageSize} onChange={(e) => onPageSizeChange(Number(e.target.value) as PageSize)}>
        {PAGE_SIZE_OPTIONS.map((n) => <option key={n} value={n}>{n} per halaman</option>)}
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
