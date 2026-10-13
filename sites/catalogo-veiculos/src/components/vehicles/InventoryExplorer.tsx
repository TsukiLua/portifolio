"use client";

import { useMemo, useRef, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { CarFront, Search, SlidersHorizontal, X } from "lucide-react";
import { vehicles } from "@/data/vehicles";
import { generalWhatsAppLink } from "@/lib/whatsapp";
import {
  SORT_OPTIONS,
  activeFilters,
  clearFilters,
  getFacets,
  parseQuery,
  removeFilter,
  searchVehicles,
  toSearchParams,
  type SortId,
  type VehicleQuery,
} from "@/lib/vehicle-filters";
import { buttonClasses } from "../ui/primitives";
import { VehicleFilters } from "./VehicleFilters";
import { VehicleGrid } from "./VehicleGrid";

const facets = getFacets(vehicles);

/**
 * Estoque interativo. A URL é a fonte da verdade: filtros, busca e ordenação ficam em query
 * params (compartilháveis) e são atualizados com history.replaceState, que o Next sincroniza
 * com useSearchParams sem recarregar a página.
 */
export function InventoryExplorer() {
  const params = useSearchParams();
  const pathname = usePathname();
  const urlKey = params.toString();

  // Estado local espelha a URL: atualiza na hora (sem "piscar" campos controlados) e
  // ressincroniza quando a URL muda por fora (botão voltar, link da home).
  const [query, setQuery] = useState(() => parseQuery(params, facets));
  const [seenUrlKey, setSeenUrlKey] = useState(urlKey);
  if (urlKey !== seenUrlKey) {
    setSeenUrlKey(urlKey);
    // A URL alcançou o que nós mesmos gravamos? Nada a fazer. Mudou por fora? Reconstrói.
    if (urlKey !== toSearchParams(query)) setQuery(parseQuery(params, facets));
  }

  const results = useMemo(() => searchVehicles(vehicles, query), [query]);
  const chips = activeFilters(query);
  const dialogRef = useRef<HTMLDialogElement>(null);

  function apply(next: VehicleQuery) {
    const qs = toSearchParams(next);
    setQuery(next);
    window.history.replaceState(null, "", qs ? `${pathname}?${qs}` : pathname);
  }
  const update = (patch: Partial<VehicleQuery>) => apply({ ...query, ...patch });
  const filterCount = chips.filter((c) => c.key !== "q").length;

  return (
    <div>
      <div className="flex flex-col gap-6 border-b border-line pb-8 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h1 className="font-display text-4xl font-extrabold sm:text-5xl">Nosso estoque</h1>
          <p className="mt-2 max-w-xl text-steel">Seminovos revisados e prontos para visita. Use a busca e os filtros para encontrar o seu.</p>
          <p className="mt-3 font-semibold" aria-live="polite" id="contagem">
            {results.length} {results.length === 1 ? "veículo encontrado" : "veículos encontrados"}
          </p>
        </div>
        <form role="search" onSubmit={(e) => e.preventDefault()} className="relative w-full lg:w-96">
          <label htmlFor="busca-estoque" className="sr-only">
            Buscar por marca, modelo ou versão
          </label>
          <Search aria-hidden className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-steel" />
          <input
            id="busca-estoque"
            type="search"
            value={query.q}
            maxLength={60}
            placeholder="Buscar por marca, modelo ou versão"
            onChange={(e) => update({ q: e.target.value })}
            className="h-12 w-full rounded-lg border border-line bg-surface pr-11 pl-10 text-sm placeholder:text-steel focus:border-wine focus:outline-none"
          />
          {query.q && (
            <button type="button" aria-label="Limpar busca" onClick={() => update({ q: "" })} className="absolute top-0 right-0 flex h-12 w-11 items-center justify-center text-steel hover:text-ink">
              <X aria-hidden className="h-4 w-4" />
            </button>
          )}
        </form>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[17rem_1fr]">
        <aside aria-label="Filtros" className="hidden lg:block">
          <div className="sticky top-24 rounded-xl border border-line bg-surface p-5">
            <VehicleFilters idPrefix="lateral" query={query} facets={facets} onChange={update} />
          </div>
        </aside>

        <section aria-labelledby="contagem">
          <div className="mb-5 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => dialogRef.current?.showModal()}
              aria-haspopup="dialog"
              className={buttonClasses("outline", "min-h-11 lg:hidden")}
            >
              <SlidersHorizontal aria-hidden className="h-4 w-4" />
              Filtros{filterCount > 0 && ` (${filterCount})`}
            </button>
            <div className="ml-auto flex items-center gap-2">
              <label htmlFor="ordenar" className="text-sm text-steel">
                Ordenar
              </label>
              <select
                id="ordenar"
                value={query.sort}
                onChange={(e) => update({ sort: e.target.value as SortId })}
                className="h-11 rounded-lg border border-line bg-surface px-3 text-sm focus:border-wine focus:outline-none"
              >
                {SORT_OPTIONS.map((o) => (
                  <option key={o.id} value={o.id}>
                    {o.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {chips.length > 0 && (
            <div className="mb-6 flex flex-wrap items-center gap-2">
              <ul className="flex flex-wrap gap-2" aria-label="Filtros ativos">
                {chips.map((chip) => (
                  <li key={chip.key}>
                    <button
                      type="button"
                      onClick={() => apply(removeFilter(query, chip.key))}
                      aria-label={`Remover filtro ${chip.label}`}
                      className="inline-flex min-h-9 items-center gap-1.5 rounded-full border border-line bg-surface px-3 text-sm hover:border-wine hover:text-wine"
                    >
                      {chip.label}
                      <X aria-hidden className="h-3.5 w-3.5" />
                    </button>
                  </li>
                ))}
              </ul>
              <button type="button" onClick={() => apply(clearFilters(query))} className="min-h-9 px-2 text-sm font-semibold text-wine underline underline-offset-4">
                Limpar filtros
              </button>
            </div>
          )}

          {results.length === 0 ? (
            <div className="flex flex-col items-center rounded-xl border border-dashed border-line bg-surface px-6 py-16 text-center">
              <CarFront aria-hidden className="h-10 w-10 text-steel" />
              <h2 className="mt-4 text-xl font-bold">Nenhum veículo com esses filtros</h2>
              <p className="mt-2 max-w-md text-steel">Tente remover algum filtro ou ampliar a faixa de preço. Se preferir, conte para um consultor o que procura.</p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <button type="button" onClick={() => apply(clearFilters(query))} className={buttonClasses("dark")}>
                  Limpar filtros
                </button>
                <a href={generalWhatsAppLink()} target="_blank" rel="noopener noreferrer" className={buttonClasses("outline")}>
                  Falar com consultor
                </a>
              </div>
            </div>
          ) : (
            <VehicleGrid vehicles={results} withSidebar priorityCount={3} />
          )}
        </section>
      </div>

      <dialog
        ref={dialogRef}
        aria-labelledby="filtros-titulo"
        onClick={(e) => e.target === e.currentTarget && dialogRef.current?.close()}
        className="m-0 mt-auto max-h-[90dvh] w-full max-w-none rounded-t-2xl bg-surface p-0 text-ink sm:mx-auto sm:mb-auto sm:max-w-lg sm:rounded-2xl"
      >
        <div className="flex items-center justify-between border-b border-line px-5 py-4">
          <h2 id="filtros-titulo" className="text-lg font-bold">
            Filtros
          </h2>
          <button type="button" aria-label="Fechar filtros" onClick={() => dialogRef.current?.close()} className="-mr-2 flex h-11 w-11 items-center justify-center">
            <X aria-hidden className="h-5 w-5" />
          </button>
        </div>
        <div className="max-h-[calc(90dvh-9rem)] overflow-y-auto px-5 py-5">
          <VehicleFilters idPrefix="gaveta" query={query} facets={facets} onChange={update} />
        </div>
        <div className="grid grid-cols-2 gap-3 border-t border-line px-5 py-4">
          <button type="button" onClick={() => apply(clearFilters(query))} className={buttonClasses("outline")}>
            Limpar
          </button>
          <button type="button" onClick={() => dialogRef.current?.close()} className={buttonClasses("primary")}>
            Ver {results.length} {results.length === 1 ? "resultado" : "resultados"}
          </button>
        </div>
      </dialog>
    </div>
  );
}
