import { categories } from "@/data/categories";
import { PRICE_RANGES, type CatalogQuery } from "@/lib/catalog";

interface Props {
  idPrefix: string;
  query: CatalogQuery;
  counts: Record<string, number>;
  onChange: (patch: Partial<CatalogQuery>) => void;
}

const option =
  "flex min-h-10 cursor-pointer items-center justify-between gap-3 py-1.5 text-sm text-stone hover:text-ink has-checked:font-medium has-checked:text-ink";

function Dot({ checked }: { checked: boolean }) {
  return (
    <span aria-hidden className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border ${checked ? "border-ink" : "border-stone/50"}`}>
      {checked && <span className="h-2 w-2 rounded-full bg-ink" />}
    </span>
  );
}

/** Filtros de categoria, preço e disponibilidade. Usado na lateral (desktop) e na gaveta (mobile). */
export function FilterPanel({ idPrefix, query, counts, onChange }: Props) {
  const all = [{ id: "todas" as const, name: "Todas as peças" }, ...categories];
  return (
    <div className="space-y-9">
      <fieldset>
        <legend className="mb-3 text-[11px] font-medium uppercase tracking-[0.28em] text-ink">Categoria</legend>
        {all.map((c) => (
          <label key={c.id} className={option}>
            <span className="flex items-center gap-3">
              <input
                type="radio"
                name={`${idPrefix}-categoria`}
                className="peer sr-only"
                checked={query.category === c.id}
                onChange={() => onChange({ category: c.id })}
              />
              <Dot checked={query.category === c.id} />
              <span className="peer-focus-visible:underline">{c.name}</span>
            </span>
            <span className="text-xs tabular-nums text-stone">{counts[c.id] ?? 0}</span>
          </label>
        ))}
      </fieldset>
      <fieldset>
        <legend className="mb-3 text-[11px] font-medium uppercase tracking-[0.28em] text-ink">Preço</legend>
        {PRICE_RANGES.map((r) => (
          <label key={r.id} className={option}>
            <span className="flex items-center gap-3">
              <input
                type="radio"
                name={`${idPrefix}-preco`}
                className="peer sr-only"
                checked={query.price === r.id}
                onChange={() => onChange({ price: r.id })}
              />
              <Dot checked={query.price === r.id} />
              <span className="peer-focus-visible:underline">{r.label}</span>
            </span>
          </label>
        ))}
      </fieldset>
      <label className="flex min-h-10 cursor-pointer items-center gap-3 text-sm">
        <input
          type="checkbox"
          checked={query.onlyAvailable}
          onChange={(e) => onChange({ onlyAvailable: e.target.checked })}
          className="h-4 w-4 accent-ink"
        />
        Ocultar peças esgotadas
      </label>
    </div>
  );
}
