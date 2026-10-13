/** Formatação brasileira de valores do catálogo. */
import type { Category, Fuel, Transmission, Vehicle, VehicleStatus } from "../types/vehicle";

const price = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });
const integer = new Intl.NumberFormat("pt-BR");

/** 129900 -> "R$ 129.900" (espaço comum no lugar do NBSP do Intl, para mensagens e testes previsíveis). */
export const formatPrice = (value: number) => price.format(value).replace(/ /g, " ");

/** 45000 -> "45.000 km"; 0 -> "0 km" */
export const formatKm = (km: number) => `${integer.format(km)} km`;

/** Ano de fabricação/modelo: "2021/2022" ou "2020". */
export const formatYear = (v: Pick<Vehicle, "year" | "modelYear">) =>
  v.modelYear && v.modelYear !== v.year ? `${v.year}/${v.modelYear}` : String(v.year);

/** Valor compacto para filtros: 80000 -> "R$ 80 mil"; 1500000 -> "R$ 1,5 mi" */
export function formatPriceShort(value: number): string {
  if (value >= 1_000_000) return `R$ ${integer.format(value / 1_000_000)} mi`;
  return `R$ ${integer.format(Math.round(value / 1000))} mil`;
}

export const vehicleTitle = (v: Pick<Vehicle, "brand" | "model">) => `${v.brand} ${v.model}`;
export const vehicleFullName = (v: Pick<Vehicle, "brand" | "model" | "version">) => `${v.brand} ${v.model} ${v.version}`;

export const CATEGORY_LABELS: Record<Category, { singular: string; plural: string }> = {
  hatchback: { singular: "Hatch", plural: "Hatches" },
  suv: { singular: "SUV", plural: "SUVs" },
  sedan: { singular: "Sedã", plural: "Sedãs" },
  pickup: { singular: "Picape", plural: "Picapes" },
  sports: { singular: "Esportivo", plural: "Esportivos" },
  motorcycle: { singular: "Moto", plural: "Motos" },
};

export const FUEL_LABELS: Record<Fuel, string> = {
  flex: "Flex",
  gasolina: "Gasolina",
  diesel: "Diesel",
  hibrido: "Híbrido",
  eletrico: "Elétrico",
};

export const TRANSMISSION_LABELS: Record<Transmission, string> = {
  manual: "Manual",
  automatico: "Automático",
  cvt: "Automático CVT",
};

/** Versão curta para cards (evita truncar "Automático CVT" em colunas estreitas). */
export const TRANSMISSION_SHORT: Record<Transmission, string> = {
  manual: "Manual",
  automatico: "Automático",
  cvt: "CVT",
};

export const STATUS_LABELS: Record<VehicleStatus, string> = {
  available: "Disponível",
  reserved: "Reservado",
  sold: "Vendido",
};
