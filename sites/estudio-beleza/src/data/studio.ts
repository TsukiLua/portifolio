/** Dados institucionais do estúdio. TODOS FICTÍCIOS, para demonstração. */
import type { WeeklyHours } from "@demo/core/scheduling";

export const studio = {
  name: "Sálvia Estúdio de Beleza",
  shortName: "Sálvia",
  tagline: "Cuidado sem pressa, beleza que é sua",
  description:
    "Estética facial, olhar, unhas, cabelo e massagens em um estúdio acolhedor. Escolha os tratamentos e solicite seu horário online.",
  address: {
    street: "Alameda das Sálvias Fictícias, 312, sala 4",
    district: "Jardins",
    city: "São Paulo/SP",
  },
  phoneDisplay: "(11) 0000-0000",
  phoneHref: "tel:+551100000000",
  email: "ola@salvia.example",
  instagramUrl: "https://www.instagram.com/",
} as const;

/**
 * Expediente: terça a sexta com intervalo de almoço; sábado meio período; domingo e segunda fechados.
 * Um atendimento só é oferecido se couber inteiro em um mesmo turno.
 */
export const HOURS: WeeklyHours = [
  [],
  [],
  [
    { start: "09:00", end: "12:30" },
    { start: "13:30", end: "19:00" },
  ],
  [
    { start: "09:00", end: "12:30" },
    { start: "13:30", end: "19:00" },
  ],
  [
    { start: "09:00", end: "12:30" },
    { start: "13:30", end: "19:00" },
  ],
  [
    { start: "09:00", end: "12:30" },
    { start: "13:30", end: "19:00" },
  ],
  [{ start: "09:00", end: "15:00" }],
];

export const WEEKDAYS = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"] as const;

export const BOOKING_RULES = {
  stepMin: 30,
  maxDaysAhead: 30,
  minLeadMin: 120,
  maxServices: 3,
  demoDensity: 0.3,
} as const;
