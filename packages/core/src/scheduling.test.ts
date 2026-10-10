import { describe, expect, it } from "vitest";
import {
  bookableDays,
  checkBooking,
  demoBusyBlocks,
  generateSlots,
  mergeAvailability,
  type WeeklyHours,
} from "./scheduling";
import { addDays, isISODate, toISODate } from "./date";

// Seg a sex 09-12 e 13-18; sábado 09-14; domingo fechado.
const HOURS: WeeklyHours = [
  [],
  [
    { start: "09:00", end: "12:00" },
    { start: "13:00", end: "18:00" },
  ],
  [
    { start: "09:00", end: "12:00" },
    { start: "13:00", end: "18:00" },
  ],
  [
    { start: "09:00", end: "12:00" },
    { start: "13:00", end: "18:00" },
  ],
  [
    { start: "09:00", end: "12:00" },
    { start: "13:00", end: "18:00" },
  ],
  [
    { start: "09:00", end: "12:00" },
    { start: "13:00", end: "18:00" },
  ],
  [{ start: "09:00", end: "14:00" }],
];

// 2026-10-12 é segunda-feira; "agora" = domingo, 11/10, 10h.
const NOW = new Date(2026, 9, 11, 10, 0);
const MONDAY = "2026-10-12";
const base = { hours: HOURS, stepMin: 30, busy: [], now: NOW };

describe("generateSlots", () => {
  it("não gera horários em dia fechado", () => {
    expect(generateSlots({ ...base, date: "2026-10-11", durationMin: 30 })).toEqual([]);
  });

  it("não gera horários em datas passadas", () => {
    expect(generateSlots({ ...base, date: "2026-10-09", durationMin: 30 })).toEqual([]);
  });

  it("só oferece horários em que o serviço inteiro cabe no turno", () => {
    const slots = generateSlots({ ...base, date: MONDAY, durationMin: 90 });
    const times = slots.map((s) => s.time);
    expect(times).toContain("10:30"); // 10:30-12:00 cabe
    expect(times).not.toContain("11:00"); // terminaria 12:30, no intervalo de almoço
    expect(times).toContain("16:30");
    expect(times).not.toContain("17:00");
    expect(times[0]).toBe("09:00");
  });

  it("marca como ocupado o horário que colide com um bloco", () => {
    const slots = generateSlots({
      ...base,
      date: MONDAY,
      durationMin: 60,
      busy: [{ start: 10 * 60, end: 10 * 60 + 30 }],
    });
    const byTime = Object.fromEntries(slots.map((s) => [s.time, s]));
    expect(byTime["09:00"]?.available).toBe(true); // 09:00-10:00 encosta mas não colide
    expect(byTime["09:30"]).toMatchObject({ available: false, reason: "ocupado" });
    expect(byTime["10:00"]).toMatchObject({ available: false, reason: "ocupado" });
    expect(byTime["10:30"]?.available).toBe(true);
  });

  it("respeita a antecedência mínima no próprio dia", () => {
    const now = new Date(2026, 9, 12, 10, 10); // segunda 10:10
    const slots = generateSlots({ ...base, now, date: MONDAY, durationMin: 30, minLeadMin: 60 });
    const byTime = Object.fromEntries(slots.map((s) => [s.time, s]));
    expect(byTime["11:00"]).toMatchObject({ available: false, reason: "antecedencia" });
    expect(byTime["11:30"]?.available).toBe(true);
  });
});

describe("bookableDays", () => {
  it("lista hoje + N dias e marca dias fechados", () => {
    const days = bookableDays(HOURS, NOW, 7);
    expect(days).toHaveLength(8);
    expect(days[0]).toEqual({ date: "2026-10-11", open: false });
    expect(days[1]).toEqual({ date: MONDAY, open: true });
    expect(days.every((d) => isISODate(d.date))).toBe(true);
  });
});

describe("demoBusyBlocks", () => {
  it("é determinístico para a mesma semente e data", () => {
    const a = demoBusyBlocks("barbeiro-1", MONDAY, HOURS, 30);
    const b = demoBusyBlocks("barbeiro-1", MONDAY, HOURS, 30);
    expect(a).toEqual(b);
  });

  it("varia entre profissionais e respeita o expediente", () => {
    const a = demoBusyBlocks("barbeiro-1", MONDAY, HOURS, 30, 0.5);
    const b = demoBusyBlocks("barbeiro-2", MONDAY, HOURS, 30, 0.5);
    expect(a).not.toEqual(b);
    for (const block of [...a, ...b]) {
      expect(block.start).toBeGreaterThanOrEqual(9 * 60);
      expect(block.end).toBeLessThanOrEqual(18 * 60);
      expect(block.start >= 12 * 60 && block.start < 13 * 60).toBe(false);
    }
  });

  it("não gera blocos em dia fechado", () => {
    expect(demoBusyBlocks("x", "2026-10-11", HOURS, 30, 1)).toEqual([]);
  });
});

describe("mergeAvailability", () => {
  it("disponibiliza o horário se ao menos um profissional estiver livre", () => {
    const a = generateSlots({ ...base, date: MONDAY, durationMin: 30, busy: [{ start: 540, end: 570 }] });
    const b = generateSlots({ ...base, date: MONDAY, durationMin: 30, busy: [{ start: 570, end: 600 }] });
    const merged = mergeAvailability([
      { id: "a", slots: a },
      { id: "b", slots: b },
    ]);
    expect(merged.find((s) => s.time === "09:00")).toMatchObject({ available: true, resourceIds: ["b"] });
    expect(merged.find((s) => s.time === "09:30")).toMatchObject({ available: true, resourceIds: ["a"] });
    expect(merged.find((s) => s.time === "10:00")?.resourceIds).toEqual(["a", "b"]);
  });

  it("mantém indisponível quando todos estão ocupados", () => {
    const busy = [{ start: 540, end: 600 }];
    const a = generateSlots({ ...base, date: MONDAY, durationMin: 30, busy });
    const merged = mergeAvailability([
      { id: "a", slots: a },
      { id: "b", slots: a },
    ]);
    expect(merged.find((s) => s.time === "09:00")).toMatchObject({ available: false, reason: "ocupado", resourceIds: [] });
  });
});

describe("checkBooking", () => {
  const query = { ...base, durationMin: 30, maxDaysAhead: 14 };

  it("aceita um horário livre", () => {
    expect(checkBooking({ ...query, date: MONDAY, time: "09:00" })).toEqual({ ok: true });
  });

  it("recusa data passada, fora da janela, dia fechado e horário fora do expediente", () => {
    expect(checkBooking({ ...query, date: "2026-10-10", time: "09:00" })).toMatchObject({ error: "data-passada" });
    expect(checkBooking({ ...query, date: addDays(toISODate(NOW), 30), time: "09:00" })).toMatchObject({
      error: "fora-da-janela",
    });
    expect(checkBooking({ ...query, date: "2026-10-11", time: "09:00" })).toMatchObject({ error: "fechado" });
    expect(checkBooking({ ...query, date: MONDAY, time: "12:30" })).toMatchObject({ error: "horario-invalido" });
    expect(checkBooking({ ...query, date: MONDAY, time: "07:00" })).toMatchObject({ error: "horario-invalido" });
  });

  it("recusa horário ocupado", () => {
    expect(checkBooking({ ...query, busy: [{ start: 540, end: 570 }], date: MONDAY, time: "09:00" })).toMatchObject({
      error: "horario-indisponivel",
    });
  });
});
