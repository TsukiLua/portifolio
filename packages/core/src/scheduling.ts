/**
 * Motor de disponibilidade usado pelos fluxos de agendamento (barbearia e estúdio).
 *
 * Regras:
 * - Só há horários em dias com expediente.
 * - Um horário só existe se o atendimento inteiro (duração) couber dentro de um mesmo turno.
 * - Horários que colidem com blocos ocupados ficam indisponíveis.
 * - No dia atual, horários antes de "agora + antecedência mínima" ficam indisponíveis.
 * - Datas passadas ou além da janela de agendamento não têm horários.
 *
 * Os blocos ocupados são DEMONSTRATIVOS: gerados de forma determinística a partir de uma semente,
 * para que a agenda pareça realista e seja estável entre renderizações.
 */
import { addDays, minutesOfDay, timeToMinutes, minutesToTime, toISODate, weekdayOf, type ISODate } from "./date";

export interface TimeRange {
  /** "HH:MM" */
  start: string;
  /** "HH:MM" */
  end: string;
}

/** Índice 0 = domingo ... 6 = sábado. Lista vazia = fechado. */
export type WeeklyHours = readonly [
  readonly TimeRange[],
  readonly TimeRange[],
  readonly TimeRange[],
  readonly TimeRange[],
  readonly TimeRange[],
  readonly TimeRange[],
  readonly TimeRange[],
];

/** Intervalo ocupado em minutos desde a meia-noite, [start, end). */
export interface BusyBlock {
  start: number;
  end: number;
}

export type SlotUnavailableReason = "ocupado" | "antecedencia";

export interface Slot {
  time: string;
  minutes: number;
  available: boolean;
  reason?: SlotUnavailableReason;
}

export interface SlotQuery {
  date: ISODate;
  durationMin: number;
  hours: WeeklyHours;
  stepMin: number;
  busy: readonly BusyBlock[];
  now: Date;
  /** Antecedência mínima para agendar no próprio dia. Padrão: 60 min. */
  minLeadMin?: number;
}

export function rangesFor(hours: WeeklyHours, date: ISODate): readonly TimeRange[] {
  return hours[weekdayOf(date)] ?? [];
}

export function isOpenOn(hours: WeeklyHours, date: ISODate): boolean {
  return rangesFor(hours, date).length > 0;
}

const overlaps = (aStart: number, aEnd: number, b: BusyBlock) => aStart < b.end && b.start < aEnd;

export function generateSlots({ date, durationMin, hours, stepMin, busy, now, minLeadMin = 60 }: SlotQuery): Slot[] {
  if (durationMin <= 0 || stepMin <= 0) return [];
  const today = toISODate(now);
  if (date < today) return [];

  const earliest = date === today ? minutesOfDay(now) + minLeadMin : -Infinity;
  const slots: Slot[] = [];

  for (const range of rangesFor(hours, date)) {
    const open = timeToMinutes(range.start);
    const close = timeToMinutes(range.end);
    for (let t = open; t + durationMin <= close; t += stepMin) {
      const end = t + durationMin;
      let reason: SlotUnavailableReason | undefined;
      if (t < earliest) reason = "antecedencia";
      else if (busy.some((b) => overlaps(t, end, b))) reason = "ocupado";
      slots.push({ time: minutesToTime(t), minutes: t, available: !reason, ...(reason ? { reason } : {}) });
    }
  }
  return slots;
}

export interface CalendarDay {
  date: ISODate;
  open: boolean;
}

/** Dias exibidos no seletor: de hoje até `daysAhead` dias à frente. */
export function bookableDays(hours: WeeklyHours, now: Date, daysAhead: number): CalendarDay[] {
  const today = toISODate(now);
  return Array.from({ length: daysAhead + 1 }, (_, i) => {
    const date = addDays(today, i);
    return { date, open: isOpenOn(hours, date) };
  });
}

/** PRNG determinístico (mulberry32) a partir de hash FNV-1a da semente. */
function seededRandom(seed: string): () => number {
  let h = 0x811c9dc5;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  let a = h >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Gera agenda ocupada fictícia e estável para um profissional em uma data.
 * `density` é a fração aproximada de intervalos ocupados (0 a 1).
 */
export function demoBusyBlocks(
  seed: string,
  date: ISODate,
  hours: WeeklyHours,
  stepMin: number,
  density = 0.35,
): BusyBlock[] {
  const random = seededRandom(`${seed}|${date}`);
  const blocks: BusyBlock[] = [];
  for (const range of rangesFor(hours, date)) {
    const close = timeToMinutes(range.end);
    for (let t = timeToMinutes(range.start); t < close; t += stepMin) {
      if (random() < density) {
        const last = blocks[blocks.length - 1];
        if (last && last.end === t) last.end = t + stepMin;
        else blocks.push({ start: t, end: t + stepMin });
      }
    }
  }
  return blocks;
}

export interface ResourceSlot extends Slot {
  /** Recursos (profissionais) livres neste horário. */
  resourceIds: string[];
}

/**
 * Combina a disponibilidade de vários profissionais ("sem preferência"):
 * o horário fica disponível se ao menos um deles estiver livre.
 */
export function mergeAvailability(perResource: ReadonlyArray<{ id: string; slots: readonly Slot[] }>): ResourceSlot[] {
  const byTime = new Map<number, ResourceSlot>();
  for (const { id, slots } of perResource) {
    for (const slot of slots) {
      const current = byTime.get(slot.minutes) ?? { ...slot, available: false, resourceIds: [] };
      if (slot.available) {
        current.available = true;
        delete current.reason;
        current.resourceIds.push(id);
      } else if (!current.available) {
        current.reason = slot.reason;
      }
      byTime.set(slot.minutes, current);
    }
  }
  return [...byTime.values()].sort((a, b) => a.minutes - b.minutes);
}

export type BookingCheck =
  | { ok: true }
  | { ok: false; error: "data-passada" | "fora-da-janela" | "fechado" | "horario-invalido" | "horario-indisponivel" };

/** Revalida uma escolha no momento da confirmação (a agenda pode ter "virado" de horário). */
export function checkBooking(query: SlotQuery & { time: string; maxDaysAhead: number }): BookingCheck {
  const today = toISODate(query.now);
  if (query.date < today) return { ok: false, error: "data-passada" };
  if (query.date > addDays(today, query.maxDaysAhead)) return { ok: false, error: "fora-da-janela" };
  if (!isOpenOn(query.hours, query.date)) return { ok: false, error: "fechado" };
  const slot = generateSlots(query).find((s) => s.time === query.time);
  if (!slot) return { ok: false, error: "horario-invalido" };
  if (!slot.available) return { ok: false, error: "horario-indisponivel" };
  return { ok: true };
}
