/**
 * Busca, filtros e ordenação do estoque — funções puras, sem React.
 * A consulta vive na URL (query string) para links compartilháveis.
 */
import { normalizeText } from "@demo/core/format";
import { CATEGORIES, FUELS, TRANSMISSIONS, type Category, type Fuel, type Transmission, type Vehicle } from "../types/vehicle";
import { CATEGORY_LABELS, FUEL_LABELS, TRANSMISSION_LABELS, formatKm, formatPriceShort } from "./formatters";

export const SORT_OPTIONS = [
  { id: "relevancia", label: "Mais relevantes" },
  { id: "menor-preco", label: "Menor preço" },
  { id: "maior-preco", label: "Maior preço" },
  { id: "mais-novos", label: "Mais novos" },
  { id: "menor-km", label: "Menor quilometragem" },
] as const;

export type SortId = (typeof SORT_OPTIONS)[number]["id"];

export interface VehicleQuery {
  q: string;
  brand?: string;
  model?: string;
  priceMin?: number;
  priceMax?: number;
  yearMin?: number;
  yearMax?: number;
  kmMax?: number;
  category?: Category;
  fuel?: Fuel;
  transmission?: Transmission;
  color?: string;
  doors?: number;
  onlyAvailable: boolean;
  sort: SortId;
}

export const DEFAULT_QUERY: VehicleQuery = { q: "", onlyAvailable: false, sort: "relevancia" };

/** Nome do parâmetro na URL para cada filtro (em português, legível). */
export const PARAM_NAMES = {
  q: "q",
  brand: "marca",
  model: "modelo",
  priceMin: "precoMin",
  priceMax: "precoMax",
  yearMin: "anoMin",
  yearMax: "anoMax",
  kmMax: "kmMax",
  category: "tipo",
  fuel: "combustivel",
  transmission: "cambio",
  color: "cor",
  doors: "portas",
  onlyAvailable: "disponiveis",
  sort: "ordem",
} as const satisfies Record<keyof VehicleQuery, string>;

export const PRICE_STEPS = [40000, 60000, 80000, 100000, 120000, 150000, 200000, 300000, 500000] as const;
export const KM_STEPS = [10000, 30000, 50000, 70000, 100000] as const;

/** Opções de filtro derivadas do próprio estoque (nada de opção que não retorna resultado). */
export function getFacets(list: readonly Vehicle[]) {
  const collator = new Intl.Collator("pt-BR");
  const unique = <T,>(values: T[]) => [...new Set(values)];
  const brands = unique(list.map((v) => v.brand)).sort(collator.compare);
  const modelsByBrand = Object.fromEntries(
    brands.map((b) => [b, unique(list.filter((v) => v.brand === b).map((v) => v.model)).sort(collator.compare)]),
  ) as Record<string, string[]>;
  const years = list.map((v) => v.modelYear ?? v.year);
  return {
    brands,
    modelsByBrand,
    categories: CATEGORIES.filter((c) => list.some((v) => v.category === c)),
    fuels: FUELS.filter((f) => list.some((v) => v.fuel === f)),
    transmissions: TRANSMISSIONS.filter((t) => list.some((v) => v.transmission === t)),
    colors: unique(list.map((v) => v.color)).sort(collator.compare),
    doors: unique(list.flatMap((v) => (v.doors ? [v.doors] : []))).sort((a, b) => a - b),
    years: years.length ? { min: Math.min(...years), max: Math.max(...years) } : { min: 0, max: 0 },
  };
}

export type Facets = ReturnType<typeof getFacets>;

const effectiveYear = (v: Vehicle) => v.modelYear ?? v.year;

function matchesText(v: Vehicle, q: string) {
  const terms = normalizeText(q).split(/\s+/).filter(Boolean);
  if (terms.length === 0) return true;
  const haystack = normalizeText(`${v.brand} ${v.model} ${v.version} ${v.id}`);
  return terms.every((t) => haystack.includes(t));
}

export function filterVehicles(list: readonly Vehicle[], query: VehicleQuery): Vehicle[] {
  return list.filter(
    (v) =>
      matchesText(v, query.q) &&
      (!query.brand || v.brand === query.brand) &&
      (!query.model || v.model === query.model) &&
      (query.priceMin === undefined || v.price >= query.priceMin) &&
      (query.priceMax === undefined || v.price <= query.priceMax) &&
      (query.yearMin === undefined || effectiveYear(v) >= query.yearMin) &&
      (query.yearMax === undefined || effectiveYear(v) <= query.yearMax) &&
      (query.kmMax === undefined || v.mileageKm <= query.kmMax) &&
      (!query.category || v.category === query.category) &&
      (!query.fuel || v.fuel === query.fuel) &&
      (!query.transmission || v.transmission === query.transmission) &&
      (!query.color || v.color === query.color) &&
      (query.doors === undefined || v.doors === query.doors) &&
      (!query.onlyAvailable || v.status === "available"),
  );
}

const STATUS_RANK = { available: 0, reserved: 1, sold: 2 } as const;

/**
 * "Mais relevantes" — regra explícita e determinística:
 * 1. disponíveis, depois reservados, depois vendidos;
 * 2. destaques primeiro;
 * 3. ano (modelo) mais recente;
 * 4. menor quilometragem;
 * 5. referência (id) como desempate final.
 * As demais ordenações também mandam vendidos para o fim, para não parecerem ofertas ativas.
 */
export function sortVehicles(list: readonly Vehicle[], sort: SortId): Vehicle[] {
  const byStatus = (a: Vehicle, b: Vehicle) => STATUS_RANK[a.status] - STATUS_RANK[b.status];
  const tie = (a: Vehicle, b: Vehicle) => a.id.localeCompare(b.id);
  const rules: Record<SortId, (a: Vehicle, b: Vehicle) => number> = {
    relevancia: (a, b) =>
      byStatus(a, b) ||
      Number(b.featured) - Number(a.featured) ||
      effectiveYear(b) - effectiveYear(a) ||
      a.mileageKm - b.mileageKm ||
      tie(a, b),
    "menor-preco": (a, b) => Number(a.status === "sold") - Number(b.status === "sold") || a.price - b.price || tie(a, b),
    "maior-preco": (a, b) => Number(a.status === "sold") - Number(b.status === "sold") || b.price - a.price || tie(a, b),
    "mais-novos": (a, b) =>
      Number(a.status === "sold") - Number(b.status === "sold") || effectiveYear(b) - effectiveYear(a) || a.mileageKm - b.mileageKm || tie(a, b),
    "menor-km": (a, b) => Number(a.status === "sold") - Number(b.status === "sold") || a.mileageKm - b.mileageKm || tie(a, b),
  };
  return [...list].sort(rules[sort]);
}

export const searchVehicles = (list: readonly Vehicle[], query: VehicleQuery) => sortVehicles(filterVehicles(list, query), query.sort);

type ParamsLike = { get(name: string): string | null };

const positiveInt = (value: string | null) => {
  if (!value || !/^\d{1,9}$/.test(value)) return undefined;
  const n = Number(value);
  return n > 0 ? n : undefined;
};

const oneOf = <T extends string>(value: string | null, allowed: readonly T[]) =>
  allowed.includes(value as T) ? (value as T) : undefined;

/** Lê a consulta da URL descartando valores inválidos ou inexistentes no estoque. */
export function parseQuery(params: ParamsLike, facets: Facets): VehicleQuery {
  const brand = oneOf(params.get(PARAM_NAMES.brand), facets.brands);
  const model = brand ? oneOf(params.get(PARAM_NAMES.model), facets.modelsByBrand[brand] ?? []) : undefined;
  const doors = positiveInt(params.get(PARAM_NAMES.doors));
  let priceMin = positiveInt(params.get(PARAM_NAMES.priceMin));
  let priceMax = positiveInt(params.get(PARAM_NAMES.priceMax));
  let yearMin = positiveInt(params.get(PARAM_NAMES.yearMin));
  let yearMax = positiveInt(params.get(PARAM_NAMES.yearMax));
  // Faixas invertidas na URL são corrigidas em vez de zerar o resultado.
  if (priceMin && priceMax && priceMin > priceMax) [priceMin, priceMax] = [priceMax, priceMin];
  if (yearMin && yearMax && yearMin > yearMax) [yearMin, yearMax] = [yearMax, yearMin];

  return {
    q: (params.get(PARAM_NAMES.q) ?? "").trim().slice(0, 60),
    brand,
    model,
    priceMin,
    priceMax,
    yearMin,
    yearMax,
    kmMax: positiveInt(params.get(PARAM_NAMES.kmMax)),
    category: oneOf(params.get(PARAM_NAMES.category), CATEGORIES),
    fuel: oneOf(params.get(PARAM_NAMES.fuel), FUELS),
    transmission: oneOf(params.get(PARAM_NAMES.transmission), TRANSMISSIONS),
    color: oneOf(params.get(PARAM_NAMES.color), facets.colors),
    doors: doors && facets.doors.includes(doors) ? doors : undefined,
    onlyAvailable: params.get(PARAM_NAMES.onlyAvailable) === "1",
    sort: oneOf(params.get(PARAM_NAMES.sort), SORT_OPTIONS.map((o) => o.id)) ?? "relevancia",
  };
}

/** Serializa apenas o que difere do padrão, em ordem estável. */
export function toSearchParams(query: VehicleQuery): string {
  const params = new URLSearchParams();
  for (const key of Object.keys(PARAM_NAMES) as (keyof VehicleQuery)[]) {
    const value = query[key];
    if (value === undefined || value === "" || value === false) continue;
    if (key === "sort" && value === "relevancia") continue;
    params.set(PARAM_NAMES[key], value === true ? "1" : String(value).trim());
  }
  return params.toString();
}

export type FilterKey = Exclude<keyof VehicleQuery, "sort">;

/** Rótulos dos filtros ativos, para os "chips" removíveis. */
export function activeFilters(query: VehicleQuery): { key: FilterKey; label: string }[] {
  const chips: { key: FilterKey; label: string }[] = [];
  if (query.q) chips.push({ key: "q", label: `Busca: “${query.q}”` });
  if (query.brand) chips.push({ key: "brand", label: query.brand });
  if (query.model) chips.push({ key: "model", label: query.model });
  if (query.category) chips.push({ key: "category", label: CATEGORY_LABELS[query.category].plural });
  if (query.priceMin) chips.push({ key: "priceMin", label: `A partir de ${formatPriceShort(query.priceMin)}` });
  if (query.priceMax) chips.push({ key: "priceMax", label: `Até ${formatPriceShort(query.priceMax)}` });
  if (query.yearMin) chips.push({ key: "yearMin", label: `Ano a partir de ${query.yearMin}` });
  if (query.yearMax) chips.push({ key: "yearMax", label: `Ano até ${query.yearMax}` });
  if (query.kmMax) chips.push({ key: "kmMax", label: `Até ${formatKm(query.kmMax)}` });
  if (query.fuel) chips.push({ key: "fuel", label: FUEL_LABELS[query.fuel] });
  if (query.transmission) chips.push({ key: "transmission", label: TRANSMISSION_LABELS[query.transmission] });
  if (query.color) chips.push({ key: "color", label: `Cor: ${query.color}` });
  if (query.doors) chips.push({ key: "doors", label: `${query.doors} portas` });
  if (query.onlyAvailable) chips.push({ key: "onlyAvailable", label: "Só disponíveis" });
  return chips;
}

/** Remove um filtro. Remover a marca também remove o modelo, que depende dela. */
export function removeFilter(query: VehicleQuery, key: FilterKey): VehicleQuery {
  const next: VehicleQuery = { ...query, [key]: key === "q" ? "" : key === "onlyAvailable" ? false : undefined };
  if (key === "brand") next.model = undefined;
  return next;
}

/** Mantém só o que não é filtro (a ordenação). */
export const clearFilters = (query: VehicleQuery): VehicleQuery => ({ ...DEFAULT_QUERY, sort: query.sort });

/** Veículos relacionados: mesma categoria e/ou preço próximo, sem o próprio e sem vendidos. */
export function relatedVehicles(list: readonly Vehicle[], current: Vehicle, limit = 3): Vehicle[] {
  const score = (v: Vehicle) =>
    (v.category === current.category ? 4 : 0) +
    (Math.abs(v.price - current.price) <= current.price * 0.3 ? 2 : 0) +
    (v.brand === current.brand ? 1 : 0);
  return list
    .filter((v) => v.id !== current.id && v.status !== "sold")
    .map((v) => ({ v, s: score(v) }))
    .filter(({ s }) => s > 0)
    .sort((a, b) => b.s - a.s || Math.abs(a.v.price - current.price) - Math.abs(b.v.price - current.price))
    .slice(0, limit)
    .map(({ v }) => v);
}
