import { describe, expect, it } from "vitest";
import { vehicles, getVehicleBySlug } from "../data/vehicles";
import { dealership } from "../data/dealership";
import { formatKm, formatPrice, formatPriceShort, formatYear } from "./formatters";
import {
  DEFAULT_QUERY,
  activeFilters,
  clearFilters,
  filterVehicles,
  getFacets,
  parseQuery,
  relatedVehicles,
  removeFilter,
  searchVehicles,
  sortVehicles,
  toSearchParams,
  type VehicleQuery,
} from "./vehicle-filters";
import { vehicleMessage, vehicleWhatsAppLink, whatsappLink } from "./whatsapp";
import { contactSchema, fieldErrors, interestSchema, vehicleSchema } from "./validation";

const q = (o: Partial<VehicleQuery>): VehicleQuery => ({ ...DEFAULT_QUERY, ...o });
const ids = (list: { id: string }[]) => list.map((v) => v.id).sort();
const facets = getFacets(vehicles);

describe("dados de demonstração", () => {
  it("tem pelo menos 15 veículos válidos segundo o schema", () => {
    expect(vehicles.length).toBeGreaterThanOrEqual(15);
    for (const v of vehicles) {
      const result = vehicleSchema.safeParse(v);
      expect(result.success, `${v.id}: ${result.error?.message}`).toBe(true);
    }
  });

  it("tem IDs e slugs únicos e slug coerente com marca/modelo", () => {
    expect(new Set(vehicles.map((v) => v.id)).size).toBe(vehicles.length);
    expect(new Set(vehicles.map((v) => v.slug)).size).toBe(vehicles.length);
    for (const v of vehicles) expect(v.slug).toContain(v.brand.toLowerCase().replace(/\s+/g, "-"));
  });

  it("cobre variedade suficiente para testar os filtros", () => {
    expect(facets.categories.length).toBeGreaterThanOrEqual(5);
    expect(facets.fuels.length).toBeGreaterThanOrEqual(3);
    expect(facets.transmissions.length).toBe(3);
    expect(vehicles.some((v) => v.status === "sold")).toBe(true);
    expect(vehicles.some((v) => v.status === "reserved")).toBe(true);
    expect(vehicles.filter((v) => v.featured).length).toBeGreaterThanOrEqual(4);
  });
});

describe("formatação", () => {
  it("formata preço, quilometragem e ano no padrão brasileiro", () => {
    expect(formatPrice(129900)).toBe("R$ 129.900");
    expect(formatPrice(1890000)).toBe("R$ 1.890.000");
    expect(formatKm(45000)).toBe("45.000 km");
    expect(formatKm(0)).toBe("0 km");
    expect(formatYear({ year: 2021, modelYear: 2022 })).toBe("2021/2022");
    expect(formatYear({ year: 2020 })).toBe("2020");
    expect(formatPriceShort(80000)).toBe("R$ 80 mil");
    expect(formatPriceShort(1500000)).toBe("R$ 1,5 mi");
  });
});

describe("filtros isolados", () => {
  it("busca por marca, modelo e versão, sem acento e com vários termos", () => {
    expect(ids(filterVehicles(vehicles, q({ q: "corolla" })))).toEqual(["PM-1001", "PM-1002"]);
    expect(ids(filterVehicles(vehicles, q({ q: "toyota xei" })))).toEqual(["PM-1001"]);
    expect(ids(filterVehicles(vehicles, q({ q: "SEDÃ" })))).toEqual([]); // categoria não entra na busca textual
    expect(ids(filterVehicles(vehicles, q({ q: "gt3" })))).toEqual(["PM-1016"]);
  });

  it("filtra por marca e modelo", () => {
    expect(filterVehicles(vehicles, q({ brand: "Honda" })).every((v) => v.brand === "Honda")).toBe(true);
    expect(ids(filterVehicles(vehicles, q({ brand: "Honda", model: "Civic" })))).toEqual(["PM-1011"]);
  });

  it("filtra por preço, ano e quilometragem (limites inclusivos)", () => {
    expect(filterVehicles(vehicles, q({ priceMin: 100000, priceMax: 150000 })).every((v) => v.price >= 100000 && v.price <= 150000)).toBe(true);
    expect(ids(filterVehicles(vehicles, q({ priceMax: 64900 })))).toEqual(["PM-1004", "PM-1017"]);
    expect(filterVehicles(vehicles, q({ yearMin: 2021 })).every((v) => (v.modelYear ?? v.year) >= 2021)).toBe(true);
    expect(filterVehicles(vehicles, q({ yearMax: 2017 })).every((v) => (v.modelYear ?? v.year) <= 2017)).toBe(true);
    expect(filterVehicles(vehicles, q({ kmMax: 30000 })).every((v) => v.mileageKm <= 30000)).toBe(true);
  });

  it("filtra por tipo, combustível, câmbio, cor, portas e disponibilidade", () => {
    expect(filterVehicles(vehicles, q({ category: "pickup" }))).toHaveLength(2);
    expect(ids(filterVehicles(vehicles, q({ fuel: "hibrido" })))).toEqual(["PM-1008"]);
    expect(filterVehicles(vehicles, q({ transmission: "manual" })).every((v) => v.transmission === "manual")).toBe(true);
    expect(filterVehicles(vehicles, q({ color: "Vermelho" })).every((v) => v.color === "Vermelho")).toBe(true);
    expect(filterVehicles(vehicles, q({ doors: 2 })).every((v) => v.doors === 2)).toBe(true);
    expect(filterVehicles(vehicles, q({ onlyAvailable: true })).every((v) => v.status === "available")).toBe(true);
  });
});

describe("filtros combinados", () => {
  it("aplica todos ao mesmo tempo", () => {
    const result = filterVehicles(vehicles, q({ category: "suv", fuel: "flex", priceMax: 130000, transmission: "cvt" }));
    expect(ids(result)).toEqual(["PM-1010"]);
  });

  it("retorna vazio quando nada corresponde", () => {
    expect(filterVehicles(vehicles, q({ category: "motorcycle", fuel: "diesel" }))).toEqual([]);
  });
});

describe("ordenação", () => {
  it("ordena por preço, ano e quilometragem, deixando vendidos no fim", () => {
    const asc = sortVehicles(vehicles, "menor-preco");
    const activeAsc = asc.filter((v) => v.status !== "sold").map((v) => v.price);
    expect(activeAsc).toEqual([...activeAsc].sort((a, b) => a - b));
    expect(asc.at(-1)?.status).toBe("sold");
    const desc = sortVehicles(vehicles, "maior-preco").filter((v) => v.status !== "sold").map((v) => v.price);
    expect(desc).toEqual([...desc].sort((a, b) => b - a));
    const km = sortVehicles(vehicles, "menor-km").filter((v) => v.status !== "sold").map((v) => v.mileageKm);
    expect(km).toEqual([...km].sort((a, b) => a - b));
    const years = sortVehicles(vehicles, "mais-novos").filter((v) => v.status !== "sold").map((v) => v.modelYear ?? v.year);
    expect(years).toEqual([...years].sort((a, b) => b - a));
  });

  it("relevância é determinística: disponíveis e destaques primeiro", () => {
    const first = sortVehicles(vehicles, "relevancia");
    expect(sortVehicles([...vehicles].reverse(), "relevancia").map((v) => v.id)).toEqual(first.map((v) => v.id));
    const firstNonFeatured = first.findIndex((v) => !v.featured);
    expect(first.slice(0, firstNonFeatured).every((v) => v.status === "available" && v.featured)).toBe(true);
    expect(first.at(-1)?.status).toBe("sold");
  });
});

describe("consulta na URL", () => {
  it("faz ida e volta com todos os parâmetros", () => {
    const query = q({
      q: "xre",
      brand: "Toyota",
      model: "Corolla Cross",
      priceMin: 100000,
      priceMax: 200000,
      yearMin: 2020,
      yearMax: 2022,
      kmMax: 50000,
      category: "suv",
      fuel: "flex",
      transmission: "cvt",
      color: "Branco",
      doors: 4,
      onlyAvailable: true,
      sort: "menor-km",
    });
    const qs = toSearchParams(query);
    expect(qs).toContain("marca=Toyota");
    expect(parseQuery(new URLSearchParams(qs), facets)).toEqual(query);
    expect(searchVehicles(vehicles, query).map((v) => v.id)).toEqual(["PM-1002"]);
  });

  it("ignora valores inválidos, modelo de outra marca e corrige faixas invertidas", () => {
    const parsed = parseQuery(new URLSearchParams("marca=Tesla&tipo=aviao&precoMin=abc&ordem=xyz&portas=7"), facets);
    expect(parsed).toEqual(DEFAULT_QUERY);
    expect(parseQuery(new URLSearchParams("marca=Honda&modelo=Corolla"), facets).model).toBeUndefined();
    const swapped = parseQuery(new URLSearchParams("precoMin=200000&precoMax=100000"), facets);
    expect([swapped.priceMin, swapped.priceMax]).toEqual([100000, 200000]);
    expect(toSearchParams(DEFAULT_QUERY)).toBe("");
  });

  it("gera chips, remove filtros individualmente e limpa tudo", () => {
    const query = q({ brand: "Honda", model: "Civic", fuel: "flex", sort: "menor-preco" });
    expect(activeFilters(query).map((c) => c.label)).toEqual(["Honda", "Civic", "Flex"]);
    const noBrand = removeFilter(query, "brand");
    expect(noBrand.brand).toBeUndefined();
    expect(noBrand.model).toBeUndefined(); // modelo depende da marca
    expect(noBrand.fuel).toBe("flex");
    expect(clearFilters(query)).toEqual(q({ sort: "menor-preco" }));
  });
});

describe("relacionados", () => {
  it("não inclui o próprio nem vendidos e prioriza a mesma categoria", () => {
    const corolla = getVehicleBySlug("toyota-corolla-xei-2022")!;
    const related = relatedVehicles(vehicles, corolla);
    expect(related).toHaveLength(3);
    expect(related.some((v) => v.id === corolla.id)).toBe(false);
    expect(related.some((v) => v.status === "sold")).toBe(false);
    expect(related.slice(0, 2).every((v) => v.category === "sedan")).toBe(true);
  });
});

describe("WhatsApp", () => {
  const corolla = getVehicleBySlug("toyota-corolla-xei-2022")!;

  it("monta a mensagem do anúncio com nome, ano, preço e referência", () => {
    expect(vehicleMessage(corolla)).toBe(
      "Olá! Tenho interesse no veículo Toyota Corolla XEi 2.0, ano 2021/2022, anunciado por R$ 129.900. Gostaria de receber mais informações. Referência: PM-1001.",
    );
    expect(vehicleMessage(corolla, "visita")).toContain("agendar uma visita");
  });

  it("codifica a mensagem e usa o número configurado", () => {
    const url = whatsappLink("Olá! Carro & preço?", "11987654321");
    expect(url).toBe("https://wa.me/5511987654321?text=Ol%C3%A1!%20Carro%20%26%20pre%C3%A7o%3F");
    const vehicleUrl = vehicleWhatsAppLink(corolla);
    expect(decodeURIComponent(vehicleUrl.split("text=")[1]!)).toContain("Referência: PM-1001");
  });

  it("adapta a mensagem para vendidos e reservados", () => {
    const sold = vehicles.find((v) => v.status === "sold")!;
    const reserved = vehicles.find((v) => v.status === "reserved")!;
    expect(decodeURIComponent(vehicleWhatsAppLink(sold))).toContain("algo parecido");
    expect(decodeURIComponent(vehicleWhatsAppLink(reserved))).toContain("se ficar disponível");
  });
});

describe("validação de formulários", () => {
  it("valida o contato com mensagens claras", () => {
    const empty = contactSchema.safeParse({ name: "", phone: "", email: "x@", subject: "", message: "oi" });
    expect(empty.success).toBe(false);
    if (!empty.success) {
      const errors = fieldErrors(empty.error);
      expect(errors.name).toBe("Informe seu nome.");
      expect(errors.phone).toMatch(/Informe um telefone/);
      expect(errors.email).toMatch(/Confira o e-mail/);
      expect(errors.subject).toBe("Escolha um assunto.");
      expect(errors.message).toMatch(/10 caracteres/);
    }
    expect(
      contactSchema.safeParse({ name: "Ana Lima", phone: "(11) 98765-4321", email: "", subject: "veiculo", message: "Quero saber do Corolla." }).success,
    ).toBe(true);
  });

  it("exige data de visita futura, dentro de 60 dias e em dia de funcionamento", () => {
    const wednesday = new Date(2026, 9, 14, 10);
    const schema = interestSchema(wednesday, dealership.closedWeekdays);
    const base = { name: "Ana Lima", phone: "(11) 98765-4321", intent: "visita" as const, period: "" as const, message: "" };
    const err = (visitDate: string) => {
      const r = schema.safeParse({ ...base, visitDate });
      return r.success ? null : fieldErrors(r.error).visitDate;
    };
    expect(err("")).toBe("Escolha a data da visita.");
    expect(err("2026-10-14")).toMatch(/a partir de amanhã/);
    expect(err("2026-10-18")).toMatch(/não abre/); // domingo
    expect(err("2027-01-30")).toMatch(/60 dias/);
    expect(err("2026-10-15")).toBeNull();
    expect(schema.safeParse({ ...base, intent: "interesse", visitDate: "" }).success).toBe(true);
  });
});
