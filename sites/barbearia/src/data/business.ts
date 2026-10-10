/**
 * Dados institucionais da barbearia. TODOS FICTÍCIOS, para demonstração.
 * Para adaptar a um cliente real, altere este arquivo (e os demais em `src/data`).
 */
import type { WeeklyHours } from "@demo/core/scheduling";

export const business = {
  name: "Brasa Barbearia",
  shortName: "Brasa",
  tagline: "Barbearia contemporânea com hora marcada",
  description:
    "Cortes masculinos, degradês e barba na navalha com hora marcada. Agende online em menos de um minuto.",
  address: {
    street: "Rua das Palmeiras Fictícias, 240",
    district: "Pinheiros",
    city: "São Paulo",
    state: "SP",
    note: "Endereço fictício para demonstração",
  },
  /** Telefone exibido. Número propositalmente inválido (fictício). */
  phoneDisplay: "(11) 0000-0000",
  phoneHref: "tel:+551100000000",
  email: "contato@brasa.example",
  instagramUrl: "https://www.instagram.com/",
  instagramHandle: "@brasa.barbearia (perfil fictício)",
} as const;

/** Expediente: domingo e segunda fechados. */
export const HOURS: WeeklyHours = [
  [],
  [],
  [{ start: "09:00", end: "20:00" }],
  [{ start: "09:00", end: "20:00" }],
  [{ start: "09:00", end: "20:00" }],
  [{ start: "09:00", end: "20:00" }],
  [{ start: "08:00", end: "18:00" }],
];

export const WEEKDAY_NAMES = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"] as const;

export const BOOKING_RULES = {
  /** Intervalo entre horários exibidos. */
  stepMin: 30,
  /** Quantos dias à frente é possível agendar. */
  maxDaysAhead: 21,
  /** Antecedência mínima para horários no mesmo dia. */
  minLeadMin: 60,
  /** Fração aproximada da agenda ocupada nos dados demonstrativos. */
  demoDensity: 0.38,
} as const;
