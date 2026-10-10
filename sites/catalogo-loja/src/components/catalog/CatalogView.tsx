"use client";

import { useMemo, useRef, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { SearchX, SlidersHorizontal, X } from "lucide-react";
import { getCategory } from "@/data/categories";
import { products } from "@/data/products";
import {
  DEFAULT_QUERY,
  SORT_OPTIONS,
  activeFilterCount,
  filterProducts,
  parseQuery,
  toSearchParams,
  type CatalogQuery,
  type SortId,
} from "@/lib/catalog";
import { ProductCard } from "../product/ProductCard";
import { buttonClasses } from "../ui";
import { FilterPanel } from "./FilterPanel";

/**
 * A URL é a fonte da verdade (links compartilháveis e botão "voltar" funcionam).
 * Atualizamos com history.replaceState, que o Next sincroniza com useSearchParams.
 */
export function CatalogView() {
  const params = useSearchParams();
  const pathname = usePathname();
  const query = useMemo(() => parseQuery(params), [params]);
  const dialogRef = useRef<HTMLDialogElement>(null);

  // Rascunho do campo de busca; ressincroniza quando a URL muda por fora (ex.: busca do topo).
  const [draft, setDraft] = useState(query.q);
  const [syncedQ, setSyncedQ] = useState(query.q);
  if (query.q !== syncedQ) {
    setSyncedQ(query.q);
    setDraft(query.q);
  }

  function update(patch: Partial<CatalogQuery>) {
    const next = { ...query, ...patch };
    if (patch.q !== undefined) setSyncedQ(next.q);
    const qs = toSearchParams(next);
    window.history.replaceState(null, "", qs ? `${pathname}?${qs}` : pathname);
  }

  const results = useMemo(() => filterProducts(products, query), [query]);
  // Contagem por categoria respeitando os demais filtros (preço, busca, disponibilidade).
  const counts = useMemo(() => {
    const base = filterProducts(products, { ...query, category: "todas" });
    const map: Record<string, number> = { todas: base.length };
    for (const p of base) map[p.category] = (map[p.category] ?? 0) + 1;
    return map;
  }, [query]);

  const filters = activeFilterCount(query);
  const category = getCategory(query.category);
  const title = category?.name ?? "Todas as peças";

  return (
    <div>
      <div className="flex flex-col gap-6 border-b border-sand pb-8 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="font-serif text-5xl sm:text-6xl">{title}</h1>
          <p className="mt-2 text-stone">{category?.description ?? "Linho, algodão e tricô em peças feitas para durar."}</p>
        </div>
        <div className="relative w-full md:w-80">
          <label htmlFor="busca-catalogo" className="sr-only">
            Buscar por nome do produto
          </label>
          <input
            id="busca-catalogo"
            type="search"
            value={draft}
            maxLength={60}
            placeholder="Buscar por nome, ex.: vestido"
            onChange={(e) => {
              setDraft(e.target.value);
              update({ q: e.target.value });
            }}
            className="h-12 w-full border border-sand bg-paper px-4 pr-11 text-sm placeholder:text-stone focus:border-ink focus:outline-none"
          />
          {draft && (
            <button
              type="button"
              aria-label="Limpar busca"
              onClick={() => {
                setDraft("");
                update({ q: "" });
              }}
              className="absolute top-0 right-0 flex h-12 w-11 items-center justify-center text-stone hover:text-ink"
            >
              <X aria-hidden className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      <div className="mt-8 grid gap-10 lg:grid-cols-[14rem_1fr]">
        <aside aria-label="Filtros" className="hidden lg:block">
          <FilterPanel idPrefix="lateral" query={query} counts={counts} onChange={update} />
          {filters > 0 && (
            <button type="button" onClick={() => { setDraft(""); update(DEFAULT_QUERY); }} className={buttonClasses("text", "mt-8 min-h-10")}>
              Limpar filtros
            </button>
          )}
        </aside>

        <section aria-labelledby="resultados">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <p id="resultados" className="text-sm text-stone" aria-live="polite">
              {results.length} {results.length === 1 ? "peça encontrada" : "peças encontradas"}
            </p>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => dialogRef.current?.showModal()}
                className="flex h-11 items-center gap-2 border border-sand px-4 text-xs uppercase tracking-[0.16em] lg:hidden"
              >
                <SlidersHorizontal aria-hidden className="h-4 w-4" />
                Filtros{filters > 0 && ` (${filters})`}
              </button>
              <label htmlFor="ordem" className="sr-only">
                Ordenar por
              </label>
              <select
                id="ordem"
                value={query.sort}
                onChange={(e) => update({ sort: e.target.value as SortId })}
                className="h-11 border border-sand bg-paper px-3 text-sm focus:border-ink focus:outline-none"
              >
                {SORT_OPTIONS.map((o) => (
                  <option key={o.id} value={o.id}>
                    {o.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {results.length === 0 ? (
            <div className="flex flex-col items-center border border-dashed border-sand px-6 py-20 text-center">
              <SearchX aria-hidden className="h-10 w-10 text-stone" />
              <h2 className="mt-4 font-serif text-3xl">Nenhuma peça encontrada</h2>
              <p className="mt-2 max-w-sm text-stone">
                Tente outro termo de busca ou remova algum filtro. Também dá para pedir ajuda no WhatsApp.
              </p>
              <button type="button" onClick={() => { setDraft(""); update(DEFAULT_QUERY); }} className={buttonClasses("outline", "mt-6")}>
                Limpar filtros
              </button>
            </div>
          ) : (
            <ul className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-3">
              {results.map((product, i) => (
                <li key={product.id}>
                  <ProductCard product={product} priority={i < 3} sizes="(min-width: 1280px) 22vw, (min-width: 768px) 30vw, 46vw" />
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>

      <dialog
        ref={dialogRef}
        aria-labelledby="filtros-titulo"
        onClick={(e) => e.target === e.currentTarget && dialogRef.current?.close()}
        className="m-0 mt-auto max-h-[85dvh] w-full max-w-none bg-shell p-0 text-ink"
      >
        <div className="flex items-center justify-between border-b border-sand px-6 py-4">
          <h2 id="filtros-titulo" className="font-serif text-2xl">
            Filtros
          </h2>
          <button type="button" aria-label="Fechar filtros" onClick={() => dialogRef.current?.close()} className="-mr-2 flex h-11 w-11 items-center justify-center">
            <X aria-hidden className="h-5 w-5" />
          </button>
        </div>
        <div className="overflow-y-auto px-6 py-6">
          <FilterPanel idPrefix="gaveta" query={query} counts={counts} onChange={update} />
        </div>
        <div className="sticky bottom-0 grid grid-cols-2 gap-3 border-t border-sand bg-shell px-6 py-4">
          <button type="button" onClick={() => { setDraft(""); update(DEFAULT_QUERY); }} className={buttonClasses("outline", "px-3")}>
            Limpar
          </button>
          <button type="button" onClick={() => dialogRef.current?.close()} className={buttonClasses("solid", "px-3")}>
            Ver {results.length}
          </button>
        </div>
      </dialog>
    </div>
  );
}
