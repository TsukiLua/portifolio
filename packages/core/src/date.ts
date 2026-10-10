/**
 * Datas de calendário no formato ISO "AAAA-MM-DD", sempre no fuso local do navegador.
 * Trabalhar com strings evita os problemas clássicos de `new Date("2026-01-01")` (que é UTC).
 */
export type ISODate = string;

const pad = (n: number) => String(n).padStart(2, "0");

export function toISODate(date: Date): ISODate {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

export function parseISODate(iso: ISODate): Date {
  const [y, m, d] = iso.split("-").map(Number);
  if (!y || !m || !d) throw new Error(`Data inválida: ${iso}`);
  return new Date(y, m - 1, d);
}

export function isISODate(value: string): value is ISODate {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  return toISODate(parseISODate(value)) === value;
}

export function addDays(iso: ISODate, days: number): ISODate {
  const date = parseISODate(iso);
  date.setDate(date.getDate() + days);
  return toISODate(date);
}

export function weekdayOf(iso: ISODate): number {
  return parseISODate(iso).getDay();
}

/** "HH:MM" -> minutos desde a meia-noite */
export function timeToMinutes(time: string): number {
  const match = /^(\d{1,2}):(\d{2})$/.exec(time);
  if (!match) throw new Error(`Horário inválido: ${time}`);
  return Number(match[1]) * 60 + Number(match[2]);
}

export function minutesToTime(minutes: number): string {
  return `${pad(Math.floor(minutes / 60))}:${pad(minutes % 60)}`;
}

export function minutesOfDay(date: Date): number {
  return date.getHours() * 60 + date.getMinutes();
}

const longFormatter = new Intl.DateTimeFormat("pt-BR", { weekday: "long", day: "numeric", month: "long" });
const shortWeekday = new Intl.DateTimeFormat("pt-BR", { weekday: "short" });
const monthFormatter = new Intl.DateTimeFormat("pt-BR", { month: "short" });

/** "sexta-feira, 10 de outubro" */
export function formatDateLong(iso: ISODate): string {
  return longFormatter.format(parseISODate(iso));
}

/** Partes para chips de calendário: { weekday: "sex", day: "10", month: "out" } */
export function dateParts(iso: ISODate) {
  const date = parseISODate(iso);
  return {
    weekday: shortWeekday.format(date).replace(".", ""),
    day: String(date.getDate()),
    month: monthFormatter.format(date).replace(".", ""),
  };
}
