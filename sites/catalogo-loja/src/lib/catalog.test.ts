import { describe, expect, it } from "vitest";
import { DEFAULT_QUERY, activeFilterCount, filterProducts, parseQuery, toSearchParams, type CatalogQuery } from "./catalog";
import { defaultColor, listMessage, productOrderMessage, validateVariant } from "./order";
import { getProductById, products } from "../data/products";
import { categories } from "../data/categories";

const q = (overrides: Partial<CatalogQuery>): CatalogQuery => ({ ...DEFAULT_QUERY, ...overrides });

describe("dados do catálogo", () => {
  it("tem ao menos 12 produtos com IDs e slugs únicos", () => {
    expect(products.length).toBeGreaterThanOrEqual(12);
    expect(new Set(products.map((p) => p.id)).size).toBe(products.length);
    expect(new Set(products.map((p) => p.slug)).size).toBe(products.length);
  });

  it("todo produto pertence a uma categoria existente e tem preço positivo", () => {
    for (const p of products) {
      expect(categories.some((c) => c.id === p.category)).toBe(true);
      expect(p.price).toBeGreaterThan(0);
      if (p.compareAtPrice) expect(p.compareAtPrice).toBeGreaterThan(p.price);
    }
  });
});

describe("filtros, busca e ordenação", () => {
  it("sem filtros, retorna tudo com esgotados por último", () => {
    const result = filterProducts(products, DEFAULT_QUERY);
    expect(result).toHaveLength(products.length);
    expect(result.at(-1)?.availability).toBe("esgotado");
  });

  it("filtra por categoria", () => {
    const result = filterProducts(products, q({ category: "vestidos" }));
    expect(result.length).toBeGreaterThan(0);
    expect(result.every((p) => p.category === "vestidos")).toBe(true);
  });

  it("filtra por faixa de preço", () => {
    expect(filterProducts(products, q({ price: "ate-200" })).every((p) => p.price < 200)).toBe(true);
    expect(filterProducts(products, q({ price: "200-300" })).every((p) => p.price >= 200 && p.price < 300)).toBe(true);
    expect(filterProducts(products, q({ price: "acima-300" })).every((p) => p.price >= 300)).toBe(true);
  });

  it("busca sem diferenciar acentos e maiúsculas, exigindo todos os termos", () => {
    expect(filterProducts(products, q({ q: "OCULOS" })).map((p) => p.id).sort()).toEqual(["MR-019", "MR-020"]);
    expect(filterProducts(products, q({ q: "vestido rosé" })).map((p) => p.id)).toEqual(["MR-009"]);
    expect(filterProducts(products, q({ q: "mr-017" })).map((p) => p.id)).toEqual(["MR-017"]);
  });

  it("combina filtros e retorna vazio quando nada corresponde", () => {
    expect(filterProducts(products, q({ category: "acessorios", price: "ate-200", q: "bolsa" }))).toEqual([]);
  });

  it("oculta esgotados quando pedido", () => {
    expect(filterProducts(products, q({ onlyAvailable: true })).some((p) => p.availability === "esgotado")).toBe(false);
  });

  it("ordena por preço e nome", () => {
    const asc = filterProducts(products, q({ sort: "menor-preco" })).map((p) => p.price);
    expect(asc).toEqual([...asc].sort((a, b) => a - b));
    const desc = filterProducts(products, q({ sort: "maior-preco" })).map((p) => p.price);
    expect(desc).toEqual([...desc].sort((a, b) => b - a));
    const names = filterProducts(products, q({ sort: "nome-az" })).map((p) => p.name);
    expect(names).toEqual([...names].sort((a, b) => a.localeCompare(b, "pt-BR")));
    expect(filterProducts(products, q({ sort: "nome-za" }))[0]?.name).toBe(names.at(-1));
  });
});

describe("consulta na URL", () => {
  it("faz ida e volta e ignora valores inválidos", () => {
    const query = q({ q: "linho", category: "camisas", price: "200-300", sort: "nome-az", onlyAvailable: true });
    expect(parseQuery(new URLSearchParams(toSearchParams(query)))).toEqual(query);
    expect(parseQuery(new URLSearchParams("categoria=sapatos&preco=gratis&ordem=aleatoria"))).toEqual(DEFAULT_QUERY);
    expect(toSearchParams(DEFAULT_QUERY)).toBe("");
    expect(activeFilterCount(query)).toBe(4);
  });
});

describe("pedido pelo WhatsApp", () => {
  const camisa = getProductById("MR-001")!;
  const bolsa = getProductById("MR-017")!;
  const esgotado = getProductById("MR-009")!;

  it("exige cor e tamanho disponíveis", () => {
    expect(validateVariant(camisa, {})).toBe("escolha-cor");
    expect(validateVariant(camisa, { color: "Areia" })).toBe("escolha-tamanho");
    expect(validateVariant(camisa, { color: "Areia", size: "GG" })).toBe("tamanho-indisponivel");
    expect(validateVariant(camisa, { color: "Areia", size: "M" })).toBeNull();
    expect(validateVariant(getProductById("MR-005")!, { color: "Oliva", size: "M" })).toBe("cor-indisponivel");
    expect(validateVariant(esgotado, { color: "Rosé", size: "M" })).toBe("esgotado");
  });

  it("pré-seleciona a cor quando há só uma disponível", () => {
    expect(defaultColor(bolsa)).toBe("Caramelo");
    expect(defaultColor(camisa)).toBeUndefined();
    expect(validateVariant(bolsa, { color: defaultColor(bolsa) })).toBeNull();
  });

  it("inclui nome, referência, variante e link na mensagem", () => {
    const message = productOrderMessage(camisa, { color: "Areia", size: "M" }, "https://exemplo.com/produto/x");
    expect(message).toContain("Camisa de Linho Gola Padre (ref. MR-001)");
    expect(message).toContain("Cor: Areia · Tamanho: M");
    expect(message).toContain("R$ 249,90");
    expect(message).toContain("https://exemplo.com/produto/x");
  });

  it("resume a lista de interesse com total estimado", () => {
    const message = listMessage([
      { product: camisa, selection: { color: "Areia", size: "M" } },
      { product: bolsa, selection: { color: "Caramelo" } },
    ]);
    expect(message).toContain("1. Camisa de Linho Gola Padre");
    expect(message).toContain("2. Bolsa Transversal Couro Caramelo");
    expect(message).toContain("Total estimado: R$ 709,80");
  });
});
