// Shared sort options + comparators for every product listing surface.
// One source of truth so the standard and premium catalogues (and their toolbars)
// can never drift apart. Order here is the order shown in the <select>.
//
// `featured` is a real option and must be kept — we ADD to the list, never replace.
export const SORT_OPTIONS = [
  { value: "featured", label: "Pilihan kami" },
  { value: "newest", label: "Terbaru" },
  { value: "popular", label: "Populer" },
  { value: "price-low", label: "Harga terendah" },
  { value: "price-high", label: "Harga tertinggi" },
  { value: "rating", label: "Rating tertinggi" },
] as const;

export type SortValue = (typeof SORT_OPTIONS)[number]["value"];

// The shape the comparator needs. Every catalogue product satisfies this
// (P6 standard, P6 premium).
export type SortableProduct = {
  numericPrice: number;
  badge?: string;
  rating?: number | string;
  reviews?: number | string;
  isNew?: boolean;
};

// "Terbaru" / "Populer" are backed by real catalogue data, not a fake tie-break:
//  - newness   : an explicit isNew flag, else a new-arrival badge
//  - popularity: the review count (how many people engaged), then rating
const NEW_BADGES = ["Produk Baru", "Baru"];
const BESTSELLER_BADGES = ["Terlaris"];
const num = (v: number | string | undefined): number => {
  if (typeof v === "number") return Number.isFinite(v) ? v : 0;
  if (typeof v === "string") {
    const parsed = Number(v.replace(/[^0-9.]/g, ""));
    return Number.isFinite(parsed) ? parsed : 0;
  }
  return 0;
};
const isNewProduct = (p: SortableProduct) => p.isNew === true || (p.badge ? NEW_BADGES.includes(p.badge) : false);
const isBestseller = (p: SortableProduct) => (p.badge ? BESTSELLER_BADGES.includes(p.badge) : false);
const priceOf = (p: SortableProduct) => num(p.numericPrice);

export function sortProducts<T extends SortableProduct>(items: T[], sort: string): T[] {
  const out = [...items];
  switch (sort) {
    case "newest":
      // New arrivals first, newest-flagged before the rest; stable otherwise.
      return out.sort((a, b) => Number(isNewProduct(b)) - Number(isNewProduct(a)));
    case "popular":
      // Popularity uses whatever real signal the catalogue has, in priority order:
      // bestseller badge > review count > rating. Never fabricates one.
      return out.sort(
        (a, b) =>
          Number(isBestseller(b)) - Number(isBestseller(a)) ||
          num(b.reviews) - num(a.reviews) ||
          num(b.rating) - num(a.rating),
      );
    case "price-low":
      return out.sort((a, b) => priceOf(a) - priceOf(b));
    case "price-high":
      return out.sort((a, b) => priceOf(b) - priceOf(a));
    case "rating":
      return out.sort((a, b) => num(b.rating) - num(a.rating));
    case "featured":
    default:
      // No reordering: the catalogue's curated order IS the "Pilihan" order.
      return out;
  }
}

export function parseSortParam(value: string | null): SortValue {
  return (SORT_OPTIONS as readonly { value: string }[]).some((o) => o.value === value)
    ? (value as SortValue)
    : "featured";
}
