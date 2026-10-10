/** Busca, filtros e ordenação do catálogo — funções puras sobre os dados locais. */
import { normalizeText } from "@demo/core/format";
import { categories, getCategory, type CategoryId } from "../data/categories";
import type { Product } from "../data/products";

export const PRICE_RANGES = [
  { id: "todos", label: "Todos os preços", min: 0, max: Infinity },
  { id: "ate-200", label: "Até R$ 200", min: 0, max: 200 },
  { id: "200-300", label: "R$ 200 a R$ 300", min: 200, max: 300 },
  { id: "acima-300", label: "Acima de R$ 300", min: 300, max: Infinity },
] as const;

export const SORT_OPTIONS = [
  { id: "destaques", label: "Destaques" },
  { id: "menor-preco", label: "Menor preço" },
  { id: "maior-preco", label: "Maior preço" },
  { id: "nome-az", label: "Nome (A–Z)" },
  { id: "nome-za", label: "Nome (Z–A)" },
] as const;

export type PriceRangeId = (typeof PRICE_RANGES)[number]["id"];
export type SortId = (typeof SORT_OPTIONS)[number]["id"];

export interface CatalogQuery {
  q: string;
  category: CategoryId | "todas";
  price: PriceRangeId;
  sort: SortId;
  onlyAvailable: boolean;
}

export const DEFAULT_QUERY: CatalogQuery = { q: "", category: "todas", price: "todos", sort: "destaques", onlyAvailable: false };

const HIGHLIGHT_WEIGHT: Record<NonNullable<Product["highlight"]> | "none", number> = {
  "mais-vendido": 0,
  novidade: 1,
  promocao: 2,
  none: 3,
};

function matchesSearch(product: Product, q: string): boolean {
  const terms = normalizeText(q).split(/\s+/).filter(Boolean);
  if (terms.length === 0) return true;
  const haystack = normalizeText(`${product.name} ${getCategory(product.category)?.name ?? ""} ${product.id}`);
  return terms.every((term) => haystack.includes(term));
}

export function filterProducts(products: readonly Product[], query: CatalogQuery): Product[] {
  const range = PRICE_RANGES.find((r) => r.id === query.price) ?? PRICE_RANGES[0];
  const collator = new Intl.Collator("pt-BR", { sensitivity: "base" });

  const result = products.filter(
    (p) =>
      (query.category === "todas" || p.category === query.category) &&
      p.price >= range.min &&
      p.price < range.max &&
      (!query.onlyAvailable || p.availability !== "esgotado") &&
      matchesSearch(p, query.q),
  );

  const byIndex = new Map(products.map((p, i) => [p.id, i]));
  const sorters: Record<SortId, (a: Product, b: Product) => number> = {
    destaques: (a, b) =>
      // Esgotados por último; depois destaques; depois ordem do cadastro.
      Number(a.availability === "esgotado") - Number(b.availability === "esgotado") ||
      HIGHLIGHT_WEIGHT[a.highlight ?? "none"] - HIGHLIGHT_WEIGHT[b.highlight ?? "none"] ||
      (byIndex.get(a.id) ?? 0) - (byIndex.get(b.id) ?? 0),
    "menor-preco": (a, b) => a.price - b.price || collator.compare(a.name, b.name),
    "maior-preco": (a, b) => b.price - a.price || collator.compare(a.name, b.name),
    "nome-az": (a, b) => collator.compare(a.name, b.name),
    "nome-za": (a, b) => collator.compare(b.name, a.name),
  };
  return result.sort(sorters[query.sort]);
}

type ParamsLike = { get(name: string): string | null };

/** Lê a consulta da URL, ignorando valores inválidos. */
export function parseQuery(params: ParamsLike): CatalogQuery {
  const category = params.get("categoria");
  const price = params.get("preco");
  const sort = params.get("ordem");
  return {
    q: (params.get("q") ?? "").slice(0, 60),
    category: categories.some((c) => c.id === category) ? (category as CategoryId) : "todas",
    price: PRICE_RANGES.some((r) => r.id === price) ? (price as PriceRangeId) : "todos",
    sort: SORT_OPTIONS.some((s) => s.id === sort) ? (sort as SortId) : "destaques",
    onlyAvailable: params.get("disponiveis") === "1",
  };
}

/** Serializa só o que difere do padrão, mantendo URLs curtas e legíveis. */
export function toSearchParams(query: CatalogQuery): string {
  const params = new URLSearchParams();
  if (query.q.trim()) params.set("q", query.q.trim());
  if (query.category !== "todas") params.set("categoria", query.category);
  if (query.price !== "todos") params.set("preco", query.price);
  if (query.sort !== "destaques") params.set("ordem", query.sort);
  if (query.onlyAvailable) params.set("disponiveis", "1");
  return params.toString();
}

export const activeFilterCount = (query: CatalogQuery) =>
  Number(query.category !== "todas") + Number(query.price !== "todos") + Number(query.onlyAvailable) + Number(!!query.q.trim());
