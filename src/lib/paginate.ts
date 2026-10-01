// Shared pagination math: filter -> sort -> count -> slice. Never paginate before filtering/sorting.
export function paginate<T>(items: T[], page: number, pageSize: number) {
  const total = items.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const safePage = Math.min(Math.max(1, page), totalPages);
  const start = (safePage - 1) * pageSize;
  const end = Math.min(start + pageSize, total);
  return { pageItems: items.slice(start, end), total, totalPages, safePage, start, end };
}

// Two page-size sets, chosen per surface by the catalogue grid's column count so every
// page ends on a complete row. A 3-column catalogue needs multiples of 3; a 4-column one
// needs multiples of 4. Both include 60 so the shared value stays legal on either layout.
export const CATALOGUE_PAGE_SIZES_3COL = [18, 36, 60, 90] as const;
export const CATALOGUE_PAGE_SIZES_4COL = [20, 40, 60, 100] as const;

// Kept for backwards compatibility with any import expecting the 4-column default set.
export const PAGE_SIZE_OPTIONS = CATALOGUE_PAGE_SIZES_4COL;
export type PageSize = (typeof CATALOGUE_PAGE_SIZES_3COL)[number] | (typeof CATALOGUE_PAGE_SIZES_4COL)[number];

export type PageSizeOptions = readonly number[];

export function parsePageParam(value: string | null): number {
  const n = Number(value);
  return Number.isFinite(n) && n >= 1 ? Math.floor(n) : 1;
}

// Validates the ?limit= value against the options the CURRENT surface offers, and falls
// back to that surface's default. Passing the surface's list keeps a 3-column catalogue
// from ever adopting a 4-column-only size (and vice-versa) from a stale shared link.
export function parsePageSizeParam(value: string | null, options: PageSizeOptions = PAGE_SIZE_OPTIONS): PageSize {
  const n = Number(value);
  return options.includes(n) ? (n as PageSize) : (options[0] as PageSize);
}

// Builds the collapsed page-number list: 1 2 3 ... 8, never dumping dozens of numbers.
export function buildPageList(totalPages: number, current: number): (number | "...")[] {
  if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);
  const pages = new Set<number>([1, 2, totalPages - 1, totalPages, current - 1, current, current + 1]);
  const sorted = [...pages].filter((p) => p >= 1 && p <= totalPages).sort((a, b) => a - b);
  const result: (number | "...")[] = [];
  let prev = 0;
  for (const p of sorted) {
    if (prev && p - prev > 1) result.push("...");
    result.push(p);
    prev = p;
  }
  return result;
}
