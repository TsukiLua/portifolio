import type { ReactNode } from "react";
import { CATEGORY_LABELS, FUEL_LABELS, TRANSMISSION_LABELS, formatKm, formatPriceShort } from "@/lib/formatters";
import { KM_STEPS, PRICE_STEPS, type Facets, type VehicleQuery } from "@/lib/vehicle-filters";

interface Props {
  idPrefix: string;
  query: VehicleQuery;
  facets: Facets;
  onChange: (patch: Partial<VehicleQuery>) => void;
}

const control = "mt-1.5 h-11 w-full rounded-lg border border-line bg-surface px-3 text-sm text-ink focus:border-wine focus:outline-none disabled:bg-paper disabled:text-steel";

function Field({ id, label, children }: { id: string; label: string; children: ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-semibold">
        {label}
      </label>
      {children}
    </div>
  );
}

const num = (value: string) => (value ? Number(value) : undefined);

/**
 * Filtros com <select> nativos: acessíveis por teclado e leitor de tela, e com o seletor
 * do sistema no celular. As opções vêm do próprio estoque (getFacets).
 */
export function VehicleFilters({ idPrefix, query, facets, onChange }: Props) {
  const id = (name: string) => `${idPrefix}-${name}`;
  const models = query.brand ? (facets.modelsByBrand[query.brand] ?? []) : [];
  const years = Array.from({ length: facets.years.max - facets.years.min + 1 }, (_, i) => facets.years.max - i);

  return (
    <div className="space-y-5">
      <Field id={id("marca")} label="Marca">
        <select id={id("marca")} className={control} value={query.brand ?? ""} onChange={(e) => onChange({ brand: e.target.value || undefined, model: undefined })}>
          <option value="">Todas</option>
          {facets.brands.map((b) => (
            <option key={b}>{b}</option>
          ))}
        </select>
      </Field>
      <Field id={id("modelo")} label="Modelo">
        <select
          id={id("modelo")}
          className={control}
          value={query.model ?? ""}
          disabled={!query.brand}
          aria-describedby={!query.brand ? id("modelo-dica") : undefined}
          onChange={(e) => onChange({ model: e.target.value || undefined })}
        >
          <option value="">{query.brand ? "Todos" : "Escolha a marca"}</option>
          {models.map((m) => (
            <option key={m}>{m}</option>
          ))}
        </select>
        {!query.brand && (
          <p id={id("modelo-dica")} className="mt-1 text-xs text-steel">
            Disponível após escolher a marca.
          </p>
        )}
      </Field>
      <Field id={id("tipo")} label="Tipo de veículo">
        <select id={id("tipo")} className={control} value={query.category ?? ""} onChange={(e) => onChange({ category: (e.target.value || undefined) as VehicleQuery["category"] })}>
          <option value="">Todos</option>
          {facets.categories.map((c) => (
            <option key={c} value={c}>
              {CATEGORY_LABELS[c].plural}
            </option>
          ))}
        </select>
      </Field>

      <fieldset>
        <legend className="text-sm font-semibold">Preço</legend>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label htmlFor={id("preco-min")} className="sr-only">
              Preço mínimo
            </label>
            <select id={id("preco-min")} className={control} value={query.priceMin ?? ""} onChange={(e) => onChange({ priceMin: num(e.target.value) })}>
              <option value="">Mínimo</option>
              {PRICE_STEPS.map((p) => (
                <option key={p} value={p}>
                  {formatPriceShort(p)}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor={id("preco-max")} className="sr-only">
              Preço máximo
            </label>
            <select id={id("preco-max")} className={control} value={query.priceMax ?? ""} onChange={(e) => onChange({ priceMax: num(e.target.value) })}>
              <option value="">Máximo</option>
              {PRICE_STEPS.map((p) => (
                <option key={p} value={p}>
                  {formatPriceShort(p)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </fieldset>

      <fieldset>
        <legend className="text-sm font-semibold">Ano (modelo)</legend>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label htmlFor={id("ano-min")} className="sr-only">
              Ano mínimo
            </label>
            <select id={id("ano-min")} className={control} value={query.yearMin ?? ""} onChange={(e) => onChange({ yearMin: num(e.target.value) })}>
              <option value="">De</option>
              {years.map((y) => (
                <option key={y}>{y}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor={id("ano-max")} className="sr-only">
              Ano máximo
            </label>
            <select id={id("ano-max")} className={control} value={query.yearMax ?? ""} onChange={(e) => onChange({ yearMax: num(e.target.value) })}>
              <option value="">Até</option>
              {years.map((y) => (
                <option key={y}>{y}</option>
              ))}
            </select>
          </div>
        </div>
      </fieldset>

      <Field id={id("km")} label="Quilometragem máxima">
        <select id={id("km")} className={control} value={query.kmMax ?? ""} onChange={(e) => onChange({ kmMax: num(e.target.value) })}>
          <option value="">Qualquer</option>
          {KM_STEPS.map((k) => (
            <option key={k} value={k}>
              Até {formatKm(k)}
            </option>
          ))}
        </select>
      </Field>
      <Field id={id("combustivel")} label="Combustível">
        <select id={id("combustivel")} className={control} value={query.fuel ?? ""} onChange={(e) => onChange({ fuel: (e.target.value || undefined) as VehicleQuery["fuel"] })}>
          <option value="">Todos</option>
          {facets.fuels.map((f) => (
            <option key={f} value={f}>
              {FUEL_LABELS[f]}
            </option>
          ))}
        </select>
      </Field>
      <Field id={id("cambio")} label="Câmbio">
        <select
          id={id("cambio")}
          className={control}
          value={query.transmission ?? ""}
          onChange={(e) => onChange({ transmission: (e.target.value || undefined) as VehicleQuery["transmission"] })}
        >
          <option value="">Todos</option>
          {facets.transmissions.map((t) => (
            <option key={t} value={t}>
              {TRANSMISSION_LABELS[t]}
            </option>
          ))}
        </select>
      </Field>
      <div className="grid grid-cols-2 gap-2">
        <Field id={id("cor")} label="Cor">
          <select id={id("cor")} className={control} value={query.color ?? ""} onChange={(e) => onChange({ color: e.target.value || undefined })}>
            <option value="">Todas</option>
            {facets.colors.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </Field>
        <Field id={id("portas")} label="Portas">
          <select id={id("portas")} className={control} value={query.doors ?? ""} onChange={(e) => onChange({ doors: num(e.target.value) })}>
            <option value="">Todas</option>
            {facets.doors.map((d) => (
              <option key={d} value={d}>
                {d} portas
              </option>
            ))}
          </select>
        </Field>
      </div>
      <label className="flex min-h-11 cursor-pointer items-center gap-3 text-sm">
        <input type="checkbox" checked={query.onlyAvailable} onChange={(e) => onChange({ onlyAvailable: e.target.checked })} className="h-5 w-5 accent-wine" />
        Somente disponíveis
      </label>
    </div>
  );
}
