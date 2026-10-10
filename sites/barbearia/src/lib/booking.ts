/**
 * Regras de agendamento da barbearia. A agenda ocupada é DEMONSTRATIVA (gerada localmente);
 * em produção, `busyFor` seria substituído por uma consulta ao sistema de agenda.
 */
import {
  bookableDays,
  checkBooking,
  demoBusyBlocks,
  generateSlots,
  mergeAvailability,
  type BookingCheck,
  type ResourceSlot,
} from "@demo/core/scheduling";
import { composeMessage } from "@demo/core/whatsapp";
import { formatBRL, formatDuration } from "@demo/core/format";
import { formatDateLong, type ISODate } from "@demo/core/date";
import { BOOKING_RULES, HOURS, business } from "../data/business";
import { getService, type Service } from "../data/services";
import { barbers, getBarber, type Barber } from "../data/team";

export const ANY_BARBER = "qualquer";

export function barbersFor(serviceId: string | null): Barber[] {
  if (!serviceId) return barbers;
  return barbers.filter((b) => b.serviceIds.includes(serviceId));
}

function busyFor(barberId: string, date: ISODate) {
  return demoBusyBlocks(`brasa-${barberId}`, date, HOURS, BOOKING_RULES.stepMin, BOOKING_RULES.demoDensity);
}

export function calendarDays(now: Date) {
  return bookableDays(HOURS, now, BOOKING_RULES.maxDaysAhead);
}

/**
 * Horários do dia para o serviço. Com "qualquer barbeiro", combina a agenda dos profissionais
 * aptos e indica quem está livre em cada horário.
 */
export function slotsFor(params: { service: Service; barberId: string; date: ISODate; now: Date }): ResourceSlot[] {
  const { service, barberId, date, now } = params;
  const candidates = barberId === ANY_BARBER ? barbersFor(service.id) : barbersFor(service.id).filter((b) => b.id === barberId);
  return mergeAvailability(
    candidates.map((barber) => ({
      id: barber.id,
      slots: generateSlots({
        date,
        durationMin: service.durationMin,
        hours: HOURS,
        stepMin: BOOKING_RULES.stepMin,
        busy: busyFor(barber.id, date),
        now,
        minLeadMin: BOOKING_RULES.minLeadMin,
      }),
    })),
  );
}

export interface BookingDraft {
  serviceId: string;
  barberId: string;
  date: ISODate;
  time: string;
}

export type ValidatedBooking = { ok: true; service: Service; barber: Barber } | Exclude<BookingCheck, { ok: true }> | { ok: false; error: "dados-invalidos" };

/** Revalida a escolha no momento da confirmação e define o barbeiro (quando "sem preferência"). */
export function validateBooking(draft: BookingDraft, now: Date): ValidatedBooking {
  const service = getService(draft.serviceId);
  if (!service) return { ok: false, error: "dados-invalidos" };
  const candidates = draft.barberId === ANY_BARBER ? barbersFor(service.id) : [getBarber(draft.barberId)].filter((b): b is Barber => !!b && b.serviceIds.includes(service.id));
  if (candidates.length === 0) return { ok: false, error: "dados-invalidos" };

  let lastError: Exclude<BookingCheck, { ok: true }> | null = null;
  for (const barber of candidates) {
    const result = checkBooking({
      date: draft.date,
      time: draft.time,
      durationMin: service.durationMin,
      hours: HOURS,
      stepMin: BOOKING_RULES.stepMin,
      busy: busyFor(barber.id, draft.date),
      now,
      minLeadMin: BOOKING_RULES.minLeadMin,
      maxDaysAhead: BOOKING_RULES.maxDaysAhead,
    });
    if (result.ok) return { ok: true, service, barber };
    lastError = result;
  }
  return lastError ?? { ok: false, error: "dados-invalidos" };
}

export const BOOKING_ERRORS: Record<Exclude<ValidatedBooking, { ok: true }>["error"], string> = {
  "data-passada": "Essa data já passou. Escolha outro dia.",
  "fora-da-janela": `Agendamos com até ${BOOKING_RULES.maxDaysAhead} dias de antecedência.`,
  fechado: "A barbearia não abre nesse dia.",
  "horario-invalido": "Esse horário está fora do expediente.",
  "horario-indisponivel": "Esse horário acabou de ficar indisponível. Escolha outro.",
  "dados-invalidos": "Revise o serviço e o profissional escolhidos.",
};

export function bookingMessage(params: {
  service: Service;
  barber: Barber;
  date: ISODate;
  time: string;
  name: string;
  phone: string;
  notes?: string;
}): string {
  const { service, barber, date, time, name, phone, notes } = params;
  return composeMessage([
    `Olá, ${business.shortName}! Gostaria de confirmar um horário:`,
    `• Serviço: ${service.name} (${formatBRL(service.price)}, ${formatDuration(service.durationMin)})`,
    `• Barbeiro: ${barber.name}`,
    `• Data: ${formatDateLong(date)}, às ${time}`,
    `• Nome: ${name.trim()}`,
    `• Telefone: ${phone}`,
    notes?.trim() ? `• Observações: ${notes.trim()}` : null,
  ]);
}
