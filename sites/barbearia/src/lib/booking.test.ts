import { describe, expect, it } from "vitest";
import { ANY_BARBER, barbersFor, bookingMessage, calendarDays, slotsFor, validateBooking } from "./booking";
import { getService } from "../data/services";
import { getBarber } from "../data/team";

// Quinta-feira, 15/10/2026, 8h.
const NOW = new Date(2026, 9, 15, 8, 0);
const THURSDAY = "2026-10-15";
const SUNDAY = "2026-10-18";
const degrade = getService("corte-degrade")!;
const platinado = getService("platinado")!;

describe("agendamento da barbearia", () => {
  it("só lista barbeiros que fazem o serviço", () => {
    expect(barbersFor("platinado").map((b) => b.id)).toEqual(["diego"]);
    expect(barbersFor("corte-degrade")).toHaveLength(3);
  });

  it("marca domingo e segunda como fechados no calendário", () => {
    const days = calendarDays(NOW);
    expect(days.find((d) => d.date === SUNDAY)?.open).toBe(false);
    expect(days.find((d) => d.date === "2026-10-19")?.open).toBe(false);
    expect(days.find((d) => d.date === THURSDAY)?.open).toBe(true);
    expect(days).toHaveLength(22);
  });

  it("gera horários dentro do expediente e respeitando a duração", () => {
    const slots = slotsFor({ service: platinado, barberId: "diego", date: THURSDAY, now: NOW });
    expect(slots[0]?.time).toBe("09:00");
    expect(slots.at(-1)?.time).toBe("18:00"); // 18:00 + 2h = 20:00, fim do expediente
  });

  it("não gera horários em dia fechado", () => {
    expect(slotsFor({ service: degrade, barberId: ANY_BARBER, date: SUNDAY, now: NOW })).toEqual([]);
  });

  it("'sem preferência' oferece pelo menos tantos horários quanto um barbeiro só", () => {
    const one = slotsFor({ service: degrade, barberId: "rafael", date: THURSDAY, now: NOW }).filter((s) => s.available);
    const any = slotsFor({ service: degrade, barberId: ANY_BARBER, date: THURSDAY, now: NOW }).filter((s) => s.available);
    expect(any.length).toBeGreaterThanOrEqual(one.length);
  });

  it("aceita horário livre e atribui um barbeiro quando não há preferência", () => {
    const free = slotsFor({ service: degrade, barberId: ANY_BARBER, date: THURSDAY, now: NOW }).find((s) => s.available)!;
    const result = validateBooking({ serviceId: degrade.id, barberId: ANY_BARBER, date: THURSDAY, time: free.time }, NOW);
    expect(result.ok).toBe(true);
    if (result.ok) expect(free.resourceIds).toContain(result.barber.id);
  });

  it("recusa horário ocupado", () => {
    const busy = slotsFor({ service: degrade, barberId: "rafael", date: THURSDAY, now: NOW }).find((s) => !s.available);
    expect(busy).toBeDefined();
    const result = validateBooking({ serviceId: degrade.id, barberId: "rafael", date: THURSDAY, time: busy!.time }, NOW);
    expect(result).toMatchObject({ ok: false, error: "horario-indisponivel" });
  });

  it("recusa barbeiro que não faz o serviço, dia fechado e data passada", () => {
    expect(validateBooking({ serviceId: "platinado", barberId: "rafael", date: THURSDAY, time: "09:00" }, NOW)).toMatchObject({
      error: "dados-invalidos",
    });
    expect(validateBooking({ serviceId: degrade.id, barberId: "rafael", date: SUNDAY, time: "10:00" }, NOW)).toMatchObject({
      error: "fechado",
    });
    expect(validateBooking({ serviceId: degrade.id, barberId: "rafael", date: "2026-10-01", time: "10:00" }, NOW)).toMatchObject({
      error: "data-passada",
    });
  });

  it("monta a mensagem de WhatsApp com os dados do agendamento", () => {
    const message = bookingMessage({
      service: degrade,
      barber: getBarber("diego")!,
      date: THURSDAY,
      time: "10:30",
      name: " Lucas Pereira ",
      phone: "(11) 98765-4321",
    });
    expect(message).toContain("Degradê (fade) (R$ 65,00, 45 min)");
    expect(message).toContain("Barbeiro: Diego Alves");
    expect(message).toContain("quinta-feira, 15 de outubro, às 10:30");
    expect(message).toContain("Nome: Lucas Pereira");
    expect(message).not.toContain("Observações");
  });
});
