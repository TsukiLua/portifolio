import { describe, expect, it } from "vitest";
import {
  ANY_PRO,
  EMPTY_CONTACT,
  calendarGrid,
  eligibleProfessionals,
  isSelectableDay,
  requestMessage,
  selectedTreatments,
  slotsFor,
  toggleTreatment,
  totalDuration,
  totalPrice,
  validateContact,
  validateRequest,
} from "./booking";
import { getProfessional } from "../data/team";

// Quarta-feira, 14/10/2026, 10h.
const NOW = new Date(2026, 9, 14, 10, 0);
const THURSDAY = "2026-10-15";
const SATURDAY = "2026-10-17";
const MONDAY = "2026-10-19";

describe("seleção de tratamentos", () => {
  it("soma duração e preço", () => {
    const items = selectedTreatments(["manicure", "pedicure"]);
    expect(totalDuration(items)).toBe(90);
    expect(totalPrice(items)).toBe(100);
  });

  it("limita a 3 tratamentos e permite desmarcar", () => {
    let ids: string[] = [];
    for (const id of ["manicure", "pedicure", "esmaltacao-gel"]) {
      const r = toggleTreatment(ids, id);
      if (r.ok) ids = r.ids;
    }
    expect(ids).toHaveLength(3);
    expect(toggleTreatment(ids, "lash-lifting")).toEqual({ ok: false, reason: "limite" });
    expect(toggleTreatment(ids, "manicure")).toEqual({ ok: true, ids: ["pedicure", "esmaltacao-gel"] });
  });

  it("só sugere profissionais que fazem todos os tratamentos", () => {
    expect(eligibleProfessionals(["manicure", "lash-lifting"]).map((p) => p.id)).toEqual(["joana"]);
    expect(eligibleProfessionals(["design-sobrancelhas"]).map((p) => p.id)).toEqual(["helena", "joana"]);
    expect(eligibleProfessionals(["manicure", "corte-escova"])).toEqual([]);
    expect(eligibleProfessionals([])).toEqual([]);
  });
});

describe("calendário", () => {
  it("monta semanas completas, desabilita passado, fechados e fora da janela", () => {
    const weeks = calendarGrid(NOW);
    expect(weeks.every((w) => w.length === 7)).toBe(true);
    const cells = weeks.flat();
    expect(cells[0]?.date).toBe("2026-10-11"); // domingo da semana atual
    const byDate = Object.fromEntries(cells.map((c) => [c.date, c]));
    expect(isSelectableDay(byDate["2026-10-13"]!)).toBe(false); // passado
    expect(isSelectableDay(byDate["2026-10-14"]!)).toBe(true); // hoje, quarta
    expect(isSelectableDay(byDate[MONDAY]!)).toBe(false); // segunda: fechado
    expect(isSelectableDay(byDate["2026-11-13"]!)).toBe(true); // último dia da janela (30 dias)
    expect(byDate["2026-11-14"]?.inWindow ?? false).toBe(false);
  });
});

describe("horários", () => {
  it("respeita intervalo de almoço e duração total", () => {
    const slots = slotsFor({ treatmentIds: ["limpeza-de-pele"], proId: "helena", date: THURSDAY, now: NOW });
    const times = slots.map((s) => s.time);
    expect(times).toContain("11:00"); // 11:00–12:30 cabe na manhã
    expect(times).not.toContain("11:30"); // invadiria o almoço
    expect(times).not.toContain("12:30");
    expect(times).toContain("13:30");
    expect(times).toContain("17:30"); // 17:30–19:00
    expect(times).not.toContain("18:00");
  });

  it("encerra mais cedo aos sábados e não abre às segundas", () => {
    const sat = slotsFor({ treatmentIds: ["manicure"], proId: "joana", date: SATURDAY, now: NOW });
    expect(sat.at(-1)?.time).toBe("14:30");
    expect(slotsFor({ treatmentIds: ["manicure"], proId: "joana", date: MONDAY, now: NOW })).toEqual([]);
  });

  it("aplica antecedência mínima de 2 horas no próprio dia", () => {
    const today = slotsFor({ treatmentIds: ["manicure"], proId: "joana", date: "2026-10-14", now: NOW });
    expect(today.filter((s) => s.minutes < 12 * 60).every((s) => !s.available)).toBe(true);
  });

  it("valida a solicitação completa e atribui profissional", () => {
    const free = slotsFor({ treatmentIds: ["design-sobrancelhas"], proId: ANY_PRO, date: THURSDAY, now: NOW }).find((s) => s.available)!;
    const result = validateRequest({ treatmentIds: ["design-sobrancelhas"], proId: ANY_PRO, date: THURSDAY, time: free.time }, NOW);
    expect(result.ok).toBe(true);
    if (result.ok) expect(free.resourceIds).toContain(result.professional.id);
  });

  it("recusa combinação sem profissional, dia fechado e horário no almoço", () => {
    expect(validateRequest({ treatmentIds: ["manicure", "corte-escova"], proId: ANY_PRO, date: THURSDAY, time: "09:00" }, NOW)).toMatchObject({
      error: "sem-profissional",
    });
    expect(validateRequest({ treatmentIds: ["manicure"], proId: "joana", date: MONDAY, time: "09:00" }, NOW)).toMatchObject({ error: "fechado" });
    expect(validateRequest({ treatmentIds: ["manicure"], proId: "joana", date: THURSDAY, time: "12:30" }, NOW)).toMatchObject({
      error: "horario-invalido",
    });
    expect(validateRequest({ treatmentIds: [], proId: ANY_PRO, date: THURSDAY, time: "09:00" }, NOW)).toMatchObject({ error: "sem-tratamento" });
  });
});

describe("contato", () => {
  it("exige nome, telefone e consentimento; e-mail é opcional mas validado", () => {
    expect(Object.keys(validateContact(EMPTY_CONTACT)).sort()).toEqual(["consent", "name", "phone"]);
    const ok = { ...EMPTY_CONTACT, name: "Ana Souza", phone: "(11) 98765-4321", consent: true };
    expect(validateContact(ok)).toEqual({});
    expect(validateContact({ ...ok, email: "ana@" }).email).toBeDefined();
    expect(validateContact({ ...ok, email: "ana@exemplo.com" })).toEqual({});
  });

  it("monta a mensagem com tratamentos, profissional, data e valores", () => {
    const message = requestMessage({
      treatments: selectedTreatments(["corte-escova", "design-sobrancelhas"]),
      professional: getProfessional("marina")!,
      date: THURSDAY,
      time: "14:00",
      contact: { ...EMPTY_CONTACT, name: "Ana Souza", phone: "(11) 98765-4321", consent: true },
    });
    expect(message).toContain("• Corte e escova (1h)");
    expect(message).toContain("Profissional: Marina Lopes");
    expect(message).toContain("quinta-feira, 15 de outubro, às 14:00");
    expect(message).toContain("Duração total: 1h30 · Valor: a partir de R$ 210,00");
    expect(message).not.toContain("E-mail");
  });
});
