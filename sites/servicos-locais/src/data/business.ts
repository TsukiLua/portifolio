/**
 * Dados institucionais. TODOS FICTÍCIOS, para demonstração.
 * Para adaptar a um cliente real, edite os arquivos em `src/data`.
 */
export const business = {
  name: "Casa em Dia",
  legalName: "Casa em Dia Manutenção Residencial (empresa fictícia)",
  cnpj: "00.000.000/0001-00 (fictício)",
  tagline: "Manutenção residencial sem dor de cabeça",
  description:
    "Elétrica, hidráulica, pintura, montagem e pequenos reparos com orçamento sem compromisso e garantia de 90 dias.",
  phoneDisplay: "(11) 0000-0000",
  phoneHref: "tel:+551100000000",
  email: "orcamentos@casaemdia.example",
  hours: "Seg a sex, 8h às 18h · Sáb, 8h às 12h",
  city: "Cidade Exemplo/SP",
} as const;

export interface Region {
  id: string;
  name: string;
}

/** Bairros FICTÍCIOS, criados para a demonstração. */
export const regions: Region[] = [
  { id: "jardim-acacias", name: "Jardim das Acácias" },
  { id: "vila-aurora", name: "Vila Aurora" },
  { id: "parque-ipes", name: "Parque dos Ipês" },
  { id: "centro-novo", name: "Centro Novo" },
  { id: "alto-serra", name: "Alto da Serra" },
  { id: "bosque-azul", name: "Bosque Azul" },
  { id: "vila-esperanca", name: "Vila Esperança" },
  { id: "lago-sereno", name: "Lago Sereno" },
];

export const OTHER_REGION = "outra";

export const getRegionName = (id: string) =>
  id === OTHER_REGION ? "Outro bairro" : regions.find((r) => r.id === id)?.name;
