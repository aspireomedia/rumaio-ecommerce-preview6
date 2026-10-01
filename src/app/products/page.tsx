"use client";
import { Suspense, useMemo, useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { uniqueCatalog } from "@/lib/catalog";
import { FilterBar, PageTitle, ProductCard, StoreFooter, StoreHeader, useStore } from "@/app/furniture/FurnitureShell";
import { Pagination, PageSizeSelect, ListingRangeLabel } from "@/components/Pagination";
import { paginate, PageSize, parsePageParam, parsePageSizeParam } from "@/lib/paginate";
import { SORT_OPTIONS, sortProducts } from "@/lib/sort";

export default function ProductsPage(){return <Suspense fallback={<CatalogFallback/>}><ProductsContent/></Suspense>}
function CatalogFallback(){return <><StoreHeader store={useStore()}/><PageTitle kicker="KOLEKSI CASEN LIVING" title="Furniture untuk setiap ruang"><p>Memuat katalog furniture...</p></PageTitle></>}
function ProductsContent(){
  const store=useStore();
  const params=useSearchParams();
  const router=useRouter();
  const pathname=usePathname();
  // URL is the single source of truth for category/page/limit so any view is a shareable deep link.
  const urlCategory=params.get("category")||"";
  const urlPage=parsePageParam(params.get("page"));
  const urlPageSize=parsePageSizeParam(params.get("limit"));
  const [category,setCategory]=useState(urlCategory);
  const [page,setPage]=useState(urlPage);
  const [pageSize,setPageSize]=useState<PageSize>(urlPageSize);
  const [sort,setSort]=useState("featured");
  const [seenUrl,setSeenUrl]=useState({category:urlCategory,page:urlPage,pageSize:urlPageSize});
  if(seenUrl.category!==urlCategory||seenUrl.page!==urlPage||seenUrl.pageSize!==urlPageSize){
    const categoryChanged=seenUrl.category!==urlCategory;
    setSeenUrl({category:urlCategory,page:urlPage,pageSize:urlPageSize});
    setCategory(urlCategory);
    setPageSize(urlPageSize);
    setPage(categoryChanged?1:urlPage);
  }
  const pushUrl=(nextCategory:string,nextPage:number,nextPageSize:PageSize)=>{
    setSeenUrl({category:nextCategory,page:nextPage,pageSize:nextPageSize});
    setCategory(nextCategory);setPage(nextPage);setPageSize(nextPageSize);
    const q=new URLSearchParams();
    if(nextCategory)q.set("category",nextCategory);
    q.set("page",String(nextPage));q.set("limit",String(nextPageSize));
    router.replace(`${pathname}?${q.toString()}`,{scroll:false});
  };
  const visible=useMemo(()=>{
    const filtered=uniqueCatalog.filter(p=>!category||p.category===category);
    // The catalogue stores price/rating/reviews as display strings; the shared sort module
    // coerces them. Tag each product with a numericPrice so one comparator serves all surfaces.
    return sortProducts(filtered.map(p=>({...p,numericPrice:Number(p.price.replace(/\D/g,""))})),sort);
  },[category,sort]);
  const { pageItems, total, totalPages, safePage, start, end } = useMemo(() => paginate(visible, page, pageSize), [visible, page, pageSize]);
  // Sort changes and out-of-range pages (?page=99) resolve to a valid page and are written
  // back to the URL so a shared link can never reproduce a blank grid. Reset-on-sort uses a
  // key derived from the already-committed urlCategory, so it cannot fire against a stale
  // searchParams value during the same commit that adopts a URL category.
  const [resetKey, setResetKey] = useState(`${urlCategory}|${sort}`);
  if (resetKey !== `${urlCategory}|${sort}`) { setResetKey(`${urlCategory}|${sort}`); setPage(1); }
  else if (safePage !== page) setPage(safePage);
  return <><StoreHeader store={store}/><PageTitle kicker="KOLEKSI CASEN LIVING" title="Furniture untuk setiap ruang"><p>Temukan pilihan yang sama dengan yang Anda lihat di homepage, kini dalam katalog yang mudah ditelusuri.</p></PageTitle><main className="store-shell catalog-page"><div className="catalog-controls"><FilterBar category={category} setCategory={(next)=>pushUrl(next,1,pageSize)}/><label className="sort-control">Urutkan<select value={sort} onChange={e=>setSort(e.target.value)}>{SORT_OPTIONS.map(o=><option key={o.value} value={o.value}>{o.label}</option>)}</select></label></div><div className="catalog-controls"><ListingRangeLabel total={total} start={start} end={end}/><PageSizeSelect pageSize={pageSize} onPageSizeChange={(size)=>pushUrl(category,1,size)}/></div>{total?<><div id="catalog-listing" className="catalog-grid">{pageItems.map(product=><ProductCard key={product.id} product={product} store={store}/>)}</div><Pagination page={safePage} totalPages={totalPages} onPageChange={(next)=>pushUrl(category,next,pageSize)} scrollTargetId="catalog-listing"/></>:<div className="empty-panel"><h2>Belum ada produk di kategori ini</h2><p>Pilih kategori lain untuk melihat furniture yang tersedia.</p><button onClick={()=>pushUrl("",1,pageSize)}>Lihat semua produk</button></div>}</main><StoreFooter/></>}
