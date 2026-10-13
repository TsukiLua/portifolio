"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { AlertTriangle, ArrowLeft, ArrowRight, Check } from "lucide-react";
import { compactErrors, validateName, validatePhone, validateLength } from "@demo/core/validation";
import type { ISODate } from "@demo/core/date";
import { formatBRL } from "@demo/core/format";
import { getService } from "@/data/services";
import { getBarber } from "@/data/team";
import {
  ANY_BARBER,
  BOOKING_ERRORS,
  barbersFor,
  bookingMessage,
  calendarDays,
  slotsFor,
  validateBooking,
} from "@/lib/booking";
import { whatsappUrl } from "@/lib/contact";
import { useNow } from "@/lib/use-now";
import { buttonClasses } from "../ui";
import { BarberStep } from "./BarberStep";
import { BookingDone } from "./BookingDone";
import { DetailsStep, type DetailsErrors, type DetailsForm } from "./DetailsStep";
import { ScheduleStep } from "./ScheduleStep";
import { ServiceStep } from "./ServiceStep";
import { StepHeading } from "./options";
import { Summary, type SummaryData } from "./Summary";

const STEPS = [
  { title: "Serviço", heading: "Escolha o serviço", description: "Preço fixo, pago na barbearia." },
  { title: "Barbeiro", heading: "Com quem?", description: "Escolha um barbeiro ou deixe sem preferência." },
  { title: "Horário", heading: "Dia e horário", description: "Só aparecem horários em que o serviço cabe inteiro na agenda." },
  { title: "Dados", heading: "Seus dados", description: "Para a barbearia confirmar com você." },
  { title: "Revisão", heading: "Confira tudo", description: "Revise antes de confirmar." },
] as const;

type Step = 0 | 1 | 2 | 3 | 4;

function validateDetails(form: DetailsForm): DetailsErrors {
  return compactErrors({
    name: validateName(form.name),
    phone: validatePhone(form.phone),
    notes: validateLength(form.notes, { max: 200 }, "Observações"),
  });
}

interface Confirmed {
  summary: SummaryData;
  whatsappUrl: string;
}

export function BookingFlow() {
  const params = useSearchParams();
  const now = useNow();

  const [serviceId, setServiceId] = useState<string | null>(() => getService(params.get("servico"))?.id ?? null);
  const [barberId, setBarberId] = useState<string | null>(() => {
    const barber = getBarber(params.get("barbeiro"));
    const service = getService(params.get("servico"));
    if (!barber) return null;
    return !service || barber.serviceIds.includes(service.id) ? barber.id : null;
  });
  const [step, setStep] = useState<Step>(() => (serviceId ? (barberId ? 2 : 1) : 0));
  const [date, setDate] = useState<ISODate | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [form, setForm] = useState<DetailsForm>({ name: "", phone: "", notes: "" });
  const [touched, setTouched] = useState<Partial<Record<keyof DetailsForm, boolean>>>({});
  const [showAllErrors, setShowAllErrors] = useState(false);
  const [stepError, setStepError] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState<Confirmed | null>(null);

  const headingRef = useRef<HTMLHeadingElement>(null);
  const focusPending = useRef(false);
  useEffect(() => {
    if (focusPending.current) {
      headingRef.current?.focus();
      focusPending.current = false;
    }
  }, [step, confirmed]);

  const service = getService(serviceId);
  const eligibleBarbers = barbersFor(serviceId);
  const days = useMemo(() => (now ? calendarDays(now) : []), [now]);
  // Sem data escolhida, sugere o primeiro dia com expediente.
  const selectedDate = date ?? days.find((d) => d.open)?.date ?? null;
  const slots = useMemo(
    () => (service && barberId && selectedDate && now ? slotsFor({ service, barberId, date: selectedDate, now }) : []),
    [service, barberId, selectedDate, now],
  );
  const selectedSlot = slots.find((s) => s.time === time && s.available);

  const allErrors = validateDetails(form);
  const visibleErrors: DetailsErrors = Object.fromEntries(
    Object.entries(allErrors).filter(([field]) => showAllErrors || touched[field as keyof DetailsForm]),
  );

  const barberLabel =
    barberId === ANY_BARBER
      ? selectedSlot
        ? `Sem preferência (${getBarber(selectedSlot.resourceIds[0])?.name})`
        : "Sem preferência"
      : getBarber(barberId)?.name;

  const summary: SummaryData = {
    service,
    barberName: barberLabel,
    date: step >= 2 ? selectedDate : null,
    time: selectedSlot?.time ?? null,
    name: form.name,
    phone: form.phone,
    notes: form.notes,
  };

  function goTo(next: Step) {
    setStepError(null);
    focusPending.current = true;
    setStep(next);
  }

  function chooseService(id: string) {
    setServiceId(id);
    if (barberId && barberId !== ANY_BARBER && !getBarber(barberId)?.serviceIds.includes(id)) setBarberId(null);
    setTime(null);
  }

  function canAdvance(): boolean {
    switch (step) {
      case 0:
        return !!service;
      case 1:
        return !!barberId;
      case 2:
        return !!selectedSlot;
      default:
        return true;
    }
  }

  function next() {
    if (step === 3) {
      setShowAllErrors(true);
      const firstInvalid = (["name", "phone", "notes"] as const).find((f) => allErrors[f]);
      if (firstInvalid) {
        document.getElementById({ name: "nome", phone: "telefone", notes: "observacoes" }[firstInvalid])?.focus();
        return;
      }
    }
    if (step < 4) goTo((step + 1) as Step);
  }

  function confirm() {
    if (!service || !barberId || !selectedDate || !time) return;
    const result = validateBooking({ serviceId: service.id, barberId, date: selectedDate, time }, new Date());
    if (!result.ok) {
      setStepError(BOOKING_ERRORS[result.error]);
      if (result.error !== "dados-invalidos") {
        setTime(null);
        focusPending.current = true;
        setStep(2);
      }
      return;
    }
    const message = bookingMessage({ ...form, service: result.service, barber: result.barber, date: selectedDate, time });
    focusPending.current = true;
    setConfirmed({
      summary: { ...summary, barberName: result.barber.name, time },
      whatsappUrl: whatsappUrl(message),
    });
  }

  function restart() {
    setServiceId(null);
    setBarberId(null);
    setDate(null);
    setTime(null);
    setForm({ name: "", phone: "", notes: "" });
    setTouched({});
    setShowAllErrors(false);
    setStepError(null);
    setConfirmed(null);
    goTo(0);
  }

  if (confirmed) {
    return <BookingDone data={confirmed.summary} whatsappUrl={confirmed.whatsappUrl} onRestart={restart} headingRef={headingRef} />;
  }

  const current = STEPS[step];

  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_22rem] lg:gap-14">
      {/* min-w-0: sem isso, a faixa de datas (rolável) alarga a coluna e a página inteira. */}
      <div className="min-w-0">
        <nav aria-label="Etapas do agendamento" className="mb-10">
          <ol className="grid grid-cols-5 gap-1.5">
            {STEPS.map((s, index) => {
              const done = index < step;
              const active = index === step;
              return (
                <li key={s.title}>
                  <button
                    type="button"
                    disabled={!done}
                    onClick={() => goTo(index as Step)}
                    aria-current={active ? "step" : undefined}
                    className="group w-full text-left disabled:cursor-default"
                  >
                    <span className={`block h-1 ${index <= step ? "bg-ember" : "bg-smoke"}`} />
                    <span
                      className={`mt-2 flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider sm:text-xs ${
                        active ? "text-bone" : done ? "text-ash group-hover:text-bone" : "text-ash/50"
                      }`}
                    >
                      {done && <Check aria-hidden className="hidden h-3 w-3 sm:block" />}
                      <span className="truncate">{s.title}</span>
                      <span className="sr-only">{done ? " (concluída, voltar)" : active ? " (atual)" : ""}</span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>
        </nav>

        {service && step > 0 && step < 4 && (
          <p className="mb-6 flex flex-wrap gap-x-3 border-l-2 border-ember pl-3 text-sm text-ash lg:hidden">
            <span className="font-bold text-bone">{service.name}</span>
            <span>{formatBRL(service.price)}</span>
            {step > 1 && barberLabel && <span>· {barberLabel}</span>}
          </p>
        )}

        <StepHeading title={current.heading} description={current.description} headingRef={headingRef} />

        {stepError && (
          <p role="alert" className="mb-6 flex gap-3 border border-danger/50 bg-danger/10 p-4 text-sm text-bone">
            <AlertTriangle aria-hidden className="h-5 w-5 shrink-0 text-danger" />
            {stepError}
          </p>
        )}

        {step === 0 && <ServiceStep value={serviceId} onChange={chooseService} />}
        {step === 1 && (
          <BarberStep
            barbers={eligibleBarbers}
            value={barberId}
            onChange={(id) => {
              setBarberId(id);
              setTime(null);
            }}
          />
        )}
        {step === 2 && (
          <ScheduleStep
            ready={!!now}
            days={days}
            date={selectedDate}
            onDateChange={(d) => {
              setDate(d);
              setTime(null);
            }}
            slots={slots}
            time={time}
            onTimeChange={setTime}
            showBarber={barberId === ANY_BARBER}
          />
        )}
        {step === 3 && (
          <DetailsStep form={form} errors={visibleErrors} onChange={setForm} onBlur={(f) => setTouched((t) => ({ ...t, [f]: true }))} />
        )}
        {step === 4 && (
          <div className="max-w-xl">
            <Summary data={summary} />
            <p className="mt-4 text-sm text-ash">
              Ao confirmar, mostramos a mensagem pronta para enviar à barbearia pelo WhatsApp. Nesta demonstração, nada é
              reservado automaticamente.
            </p>
          </div>
        )}

        <div className="sticky bottom-0 z-10 -mx-5 mt-10 flex gap-3 border-t border-smoke bg-coal/95 px-5 py-4 backdrop-blur sm:mx-0 sm:px-0">
          {step > 0 && (
            <button type="button" onClick={() => goTo((step - 1) as Step)} className={buttonClasses("outline", "px-4 sm:px-6")}>
              <ArrowLeft aria-hidden className="h-4 w-4" />
              <span className="sr-only sm:not-sr-only">Voltar</span>
            </button>
          )}
          {step < 4 ? (
            <button type="button" onClick={next} disabled={!canAdvance()} className={buttonClasses("primary", "flex-1 sm:flex-none")}>
              Continuar
              <ArrowRight aria-hidden className="h-4 w-4" />
            </button>
          ) : (
            <button type="button" onClick={confirm} className={buttonClasses("primary", "flex-1 sm:flex-none")}>
              <Check aria-hidden className="h-4 w-4" />
              Confirmar pedido
            </button>
          )}
        </div>
        {step === 2 && !selectedSlot && now && (
          <p className="mt-2 text-xs text-ash" aria-live="polite">
            Selecione um horário para continuar.
          </p>
        )}
      </div>

      <aside className="hidden lg:block">
        <div className="sticky top-28">
          <Summary data={summary} />
        </div>
      </aside>
    </div>
  );
}
