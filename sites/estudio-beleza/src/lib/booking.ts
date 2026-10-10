/**
 * Regras de solicitação de horário do estúdio. A agenda ocupada é DEMONSTRATIVA (gerada localmente).
 * Para produção, substitua `busyFor` por uma consulta ao sistema de agenda do estúdio.
 */
import { addDays, formatDateLong, parseISODate, toISODate, type ISODate } from "@demo/core/date";
import { formatBRL, formatDuration } from "@demo/core/format";
import {
  checkBooking,
  demoBusyBlocks,
  generateSlots,
  isOpenOn,
  mergeAvailability,
  type BookingCheck,
  type ResourceSlot,
} from "@demo/core/scheduling";
import { compactErrors, validateLength, validateName, validatePhone } from "@demo/core/validation";
import { composeMessage } from "@demo/core/whatsapp";
import { BOOKING_RULES, HOURS, studio } from "../data/studio";
import { getProfessional, professionals, type Professional } from "../data/team";
import { getTreatment, type Treatment } from "../data/treatments";

export const ANY_PRO = "sem-preferencia";

export function selectedTreatments(ids: readonly string[]): Treatment[] {
  return ids.map(getTreatment).filter((t): t is Treatment => !!t);
}

export const totalDuration = (items: readonly Treatment[]) => items.reduce((sum, t) => sum + t.durationMin, 0);
export const totalPrice = (items: readonly Treatment[]) => items.reduce((sum, t) => sum + t.price, 0);
export const hasPriceFrom = (items: readonly Treatment[]) => items.some((t) => t.priceFrom);

/** Profissionais que realizam TODOS os tratamentos escolhidos (atendimento em sequência, com a mesma pessoa). */
export function eligibleProfessionals(treatmentIds: readonly string[]): Professional[] {
  if (treatmentIds.length === 0) return [];
  return professionals.filter((p) => treatmentIds.every((id) => p.treatmentIds.includes(id)));
}

export type ToggleResult = { ok: true; ids: string[] } | { ok: false; reason: "limite" };

export function toggleTreatment(ids: readonly string[], id: string): ToggleResult {
  if (ids.includes(id)) return { ok: true, ids: ids.filter((x) => x !== id) };
  if (ids.length >= BOOKING_RULES.maxServices) return { ok: false, reason: "limite" };
  return { ok: true, ids: [...ids, id] };
}

function busyFor(proId: string, date: ISODate) {
  return demoBusyBlocks(`salvia-${proId}`, date, HOURS, BOOKING_RULES.stepMin, BOOKING_RULES.demoDensity);
}

export interface CalendarCell {
  date: ISODate;
  inWindow: boolean;
  past: boolean;
  open: boolean;
}

/**
 * Grade de calendário em semanas completas (domingo a sábado), de hoje até o fim da janela.
 * Dias passados da primeira semana aparecem desabilitados, para o visitante entender a regra.
 */
export function calendarGrid(now: Date): CalendarCell[][] {
  const today = toISODate(now);
  const last = addDays(today, BOOKING_RULES.maxDaysAhead);
  const start = addDays(today, -parseISODate(today).getDay());
  const weeks: CalendarCell[][] = [];
  for (let cursor = start; cursor <= last; ) {
    const week: CalendarCell[] = [];
    for (let i = 0; i < 7; i++, cursor = addDays(cursor, 1)) {
      week.push({ date: cursor, past: cursor < today, inWindow: cursor >= today && cursor <= last, open: isOpenOn(HOURS, cursor) });
    }
    weeks.push(week);
  }
  return weeks;
}

export const isSelectableDay = (cell: CalendarCell) => cell.inWindow && cell.open;

export function slotsFor(params: { treatmentIds: readonly string[]; proId: string; date: ISODate; now: Date }): ResourceSlot[] {
  const { treatmentIds, proId, date, now } = params;
  const duration = totalDuration(selectedTreatments(treatmentIds));
  const eligible = eligibleProfessionals(treatmentIds);
  const pros = proId === ANY_PRO ? eligible : eligible.filter((p) => p.id === proId);
  return mergeAvailability(
    pros.map((p) => ({
      id: p.id,
      slots: generateSlots({
        date,
        durationMin: duration,
        hours: HOURS,
        stepMin: BOOKING_RULES.stepMin,
        busy: busyFor(p.id, date),
        now,
        minLeadMin: BOOKING_RULES.minLeadMin,
      }),
    })),
  );
}

export const isMorning = (slot: { minutes: number }) => slot.minutes < 13 * 60;

export interface ContactForm {
  name: string;
  phone: string;
  email: string;
  notes: string;
  consent: boolean;
}

export const EMPTY_CONTACT: ContactForm = { name: "", phone: "", email: "", notes: "", consent: false };

export type ContactErrors = Partial<Record<keyof ContactForm, string>>;

export function validateContact(form: ContactForm): ContactErrors {
  const email = form.email.trim();
  return compactErrors({
    name: validateName(form.name),
    phone: validatePhone(form.phone),
    email: email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email) ? "Confira o e-mail (ex.: nome@dominio.com)." : null,
    notes: validateLength(form.notes, { max: 300 }, "Observações"),
    consent: form.consent ? null : "Precisamos do seu consentimento para usar os dados no contato.",
  });
}

export type RequestCheck =
  | { ok: true; professional: Professional; treatments: Treatment[] }
  | Exclude<BookingCheck, { ok: true }>
  | { ok: false; error: "sem-tratamento" | "sem-profissional" };

/** Revalida a solicitação inteira no momento do envio e define a profissional quando "sem preferência". */
export function validateRequest(req: { treatmentIds: readonly string[]; proId: string; date: ISODate; time: string }, now: Date): RequestCheck {
  const items = selectedTreatments(req.treatmentIds);
  if (items.length === 0) return { ok: false, error: "sem-tratamento" };
  const eligible = eligibleProfessionals(req.treatmentIds);
  const candidates = req.proId === ANY_PRO ? eligible : eligible.filter((p) => p.id === req.proId);
  if (candidates.length === 0) return { ok: false, error: "sem-profissional" };

  let last: Exclude<BookingCheck, { ok: true }> | null = null;
  for (const professional of candidates) {
    const result = checkBooking({
      date: req.date,
      time: req.time,
      durationMin: totalDuration(items),
      hours: HOURS,
      stepMin: BOOKING_RULES.stepMin,
      busy: busyFor(professional.id, req.date),
      now,
      minLeadMin: BOOKING_RULES.minLeadMin,
      maxDaysAhead: BOOKING_RULES.maxDaysAhead,
    });
    if (result.ok) return { ok: true, professional, treatments: items };
    last = result;
  }
  return last ?? { ok: false, error: "sem-profissional" };
}

export const REQUEST_ERRORS: Record<Exclude<RequestCheck, { ok: true }>["error"], string> = {
  "sem-tratamento": "Escolha ao menos um tratamento.",
  "sem-profissional": "Nenhuma profissional realiza essa combinação. Ajuste os tratamentos.",
  "data-passada": "Essa data já passou.",
  "fora-da-janela": `Abrimos a agenda com até ${BOOKING_RULES.maxDaysAhead} dias de antecedência.`,
  fechado: "O estúdio não abre nesse dia.",
  "horario-invalido": "Esse horário está fora do expediente para a duração escolhida.",
  "horario-indisponivel": "Esse horário acabou de ficar indisponível. Escolha outro.",
};

export function requestMessage(params: {
  treatments: Treatment[];
  professional: Professional;
  date: ISODate;
  time: string;
  contact: ContactForm;
}): string {
  const { treatments, professional, date, time, contact } = params;
  const price = `${hasPriceFrom(treatments) ? "a partir de " : ""}${formatBRL(totalPrice(treatments))}`;
  return composeMessage([
    `Olá, ${studio.shortName}! Gostaria de solicitar um horário:`,
    ...treatments.map((t) => `• ${t.name} (${formatDuration(t.durationMin)})`),
    `• Profissional: ${professional.name}`,
    `• Data: ${formatDateLong(date)}, às ${time}`,
    `• Duração total: ${formatDuration(totalDuration(treatments))} · Valor: ${price}`,
    `• Nome: ${contact.name.trim()}`,
    `• WhatsApp: ${contact.phone}`,
    contact.email.trim() && `• E-mail: ${contact.email.trim()}`,
    contact.notes.trim() && `• Observações: ${contact.notes.trim()}`,
  ]);
}

export { getProfessional };
