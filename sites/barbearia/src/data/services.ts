/** Catálogo de serviços (preços e durações fictícios). */

export type ServiceCategory = "Cabelo" | "Barba" | "Combos" | "Complementos";

export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  durationMin: number;
  category: ServiceCategory;
  popular?: boolean;
}

export const SERVICE_CATEGORIES: ServiceCategory[] = ["Cabelo", "Barba", "Combos", "Complementos"];

export const services: Service[] = [
  {
    id: "corte-classico",
    name: "Corte clássico",
    description: "Tesoura e máquina, lavagem e finalização com pomada à sua escolha.",
    price: 60,
    durationMin: 45,
    category: "Cabelo",
  },
  {
    id: "corte-degrade",
    name: "Degradê (fade)",
    description: "Low, mid ou high fade com transição limpa e acabamento na navalha.",
    price: 65,
    durationMin: 45,
    category: "Cabelo",
    popular: true,
  },
  {
    id: "platinado",
    name: "Platinado ou luzes",
    description: "Descoloração com protetor de fios e matização. Teste de mecha incluso.",
    price: 160,
    durationMin: 120,
    category: "Cabelo",
  },
  {
    id: "barba-completa",
    name: "Barba completa",
    description: "Toalha quente, navalha, óleo pré-barba e balm hidratante.",
    price: 45,
    durationMin: 30,
    category: "Barba",
  },
  {
    id: "barba-desenhada",
    name: "Barba desenhada",
    description: "Modelagem do contorno com máquina e navalha para barbas médias e longas.",
    price: 50,
    durationMin: 45,
    category: "Barba",
  },
  {
    id: "corte-barba",
    name: "Corte + barba",
    description: "O ritual completo: corte à escolha e barba com toalha quente.",
    price: 95,
    durationMin: 75,
    category: "Combos",
    popular: true,
  },
  {
    id: "corte-sobrancelha",
    name: "Corte + sobrancelha",
    description: "Corte à escolha e alinhamento de sobrancelha na navalha.",
    price: 75,
    durationMin: 60,
    category: "Combos",
  },
  {
    id: "pezinho",
    name: "Acabamento (pezinho)",
    description: "Contorno de nuca e laterais entre um corte e outro.",
    price: 25,
    durationMin: 15,
    category: "Complementos",
  },
  {
    id: "sobrancelha",
    name: "Sobrancelha na navalha",
    description: "Limpeza e alinhamento discreto, sem aparência artificial.",
    price: 20,
    durationMin: 15,
    category: "Complementos",
  },
];

export const getService = (id: string | null | undefined) => services.find((s) => s.id === id);
