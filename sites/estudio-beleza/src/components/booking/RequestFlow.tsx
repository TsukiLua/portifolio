"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { useSearchParams } from "next/navigation";
import { AlertCircle, CircleCheck, Info, LoaderCircle, Lock, MessageCircle, PencilLine, RotateCcw } from "lucide-react";
import { formatDateLong, type ISODate } from "@demo/core/date";
import { formatBRL, formatDuration } from "@demo/core/format";
import { getProfessional } from "@/data/team";
import { getTreatment } from "@/data/treatments";
import { BOOKING_RULES } from "@/data/studio";
import {
  ANY_PRO,
  EMPTY_CONTACT,
  REQUEST_ERRORS,
  calendarGrid,
  eligibleProfessionals,
  hasPriceFrom,
  requestMessage,
  selectedTreatments,
  slotsFor,
  toggleTreatment,
  totalDuration,
  totalPrice,
  validateContact,
  validateRequest,
  type ContactForm,
} from "@/lib/booking";
import { whatsappUrl } from "@/lib/contact";
import { useNow } from "@/lib/use-now";
import { buttonClasses } from "../ui";
import { CONTACT_IDS, ContactFields } from "./ContactFields";
import { CalendarPicker, ProPicker, TimePicker, TreatmentPicker } from "./pickers";

type Mode = "editing" | "review" | "done";

function Step({ n, id, title, done, locked, summary, children }: { n: number; id: string; title: string; done: boolean; locked: boolean; summary?: ReactNode; children: ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-t`} className={`rounded-3xl p-5 sm:p-8 ${locked ? "bg-linen/40" : "bg-white/80 shadow-sm shadow-ink/5"}`}>
      <div className="flex items-start gap-4">
        <span aria-hidden className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full font-serif text-lg ${done ? "bg-moss text-cream" : locked ? "bg-linen text-mute" : "bg-sage-soft text-moss-dark"}`}>
          {done ? <CircleCheck className="h-5 w-5" /> : n}
        </span>
        <div className="min-w-0 flex-1">
          <h2 id={`${id}-t`} className={`font-serif text-2xl ${locked ? "text-mute" : "text-moss-dark"}`}>
            {title}
          </h2>
          {locked ? (
            <p className="mt-1 flex items-center gap-1.5 text-sm text-mute">
              <Lock aria-hidden className="h-3.5 w-3.5" /> Conclua a etapa anterior.
            </p>
          ) : (
            summary && <p className="mt-1 text-sm text-mute">{summary}</p>
          )}
        </div>
      </div>
      {!locked && <div className="mt-6">{children}</div>}
    </section>
  );
}

export function RequestFlow() {
  const params = useSearchParams();
  const now = useNow();

  const [ids, setIds] = useState<string[]>(() => {
    const t = getTreatment(params.get("tratamento") ?? "");
    return t ? [t.id] : [];
  });
  const [proId, setProId] = useState<string | null>(() => getProfessional(params.get("profissional"))?.id ?? null);
  const [date, setDate] = useState<ISODate | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [contact, setContact] = useState<ContactForm>(EMPTY_CONTACT);
  const [touched, setTouched] = useState<Partial<Record<keyof ContactForm, boolean>>>({});
  const [showAll, setShowAll] = useState(false);
  const [limitMsg, setLimitMsg] = useState(false);
  const [mode, setMode] = useState<Mode>("editing");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{ url: string; proName: string } | null>(null);
  const topRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (mode !== "editing") topRef.current?.focus();
  }, [mode]);

  const items = selectedTreatments(ids);
  const pros = eligibleProfessionals(ids);
  // Uma profissional pré-escolhida (via link) só vale se fizer todos os tratamentos.
  const validPro = proId === ANY_PRO ? (pros.length > 0 ? ANY_PRO : null) : pros.some((p) => p.id === proId) ? proId : pros.length === 1 ? pros[0]!.id : null;
  const weeks = useMemo(() => (now ? calendarGrid(now) : []), [now]);
  const slots = useMemo(
    () => (now && validPro && date && ids.length ? slotsFor({ treatmentIds: ids, proId: validPro, date, now }) : []),
    [now, validPro, date, ids],
  );
  const slot = slots.find((s) => s.time === time && s.available);

  const contactErrors = validateContact(contact);
  const visibleErrors = Object.fromEntries(Object.entries(contactErrors).filter(([k]) => showAll || touched[k as keyof ContactForm]));

  const step1 = items.length > 0;
  const step2 = step1 && !!validPro;
  const step3 = step2 && !!slot;
  const step4 = step3 && Object.keys(contactErrors).length === 0;

  const duration = totalDuration(items);
  const price = `${hasPriceFrom(items) ? "a partir de " : ""}${formatBRL(totalPrice(items))}`;
  const proLabel = validPro === ANY_PRO ? (slot ? `Sem preferência (${getProfessional(slot.resourceIds[0])?.name})` : "Sem preferência") : getProfessional(validPro)?.name;

  function toggle(id: string) {
    const r = toggleTreatment(ids, id);
    setLimitMsg(!r.ok);
    if (r.ok) {
      setIds(r.ids);
      setTime(null);
    }
  }

  function goReview() {
    const target = !step1 ? "etapa-tratamentos" : !step2 ? "etapa-profissional" : !step3 ? "etapa-horario" : null;
    if (target) {
      document.getElementById(target)?.scrollIntoView({ block: "start" });
      return;
    }
    if (!step4) {
      setShowAll(true);
      const first = (Object.keys(CONTACT_IDS) as (keyof ContactForm)[]).find((k) => contactErrors[k]);
      if (first) document.getElementById(CONTACT_IDS[first])?.focus();
      return;
    }
    setError(null);
    setMode("review");
    window.scrollTo({ top: 0 });
  }

  function confirm() {
    if (!validPro || !date || !time) return;
    const check = validateRequest({ treatmentIds: ids, proId: validPro, date, time }, new Date());
    if (!check.ok) {
      setError(REQUEST_ERRORS[check.error]);
      setTime(null);
      setMode("editing");
      return;
    }
    setSubmitting(true);
    // Simula o tempo de um envio; não há integração nesta demonstração.
    window.setTimeout(() => {
      setResult({ url: whatsappUrl(requestMessage({ treatments: check.treatments, professional: check.professional, date, time, contact })), proName: check.professional.name });
      setSubmitting(false);
      setMode("done");
      window.scrollTo({ top: 0 });
    }, 700);
  }

  function restart() {
    setIds([]);
    setProId(null);
    setDate(null);
    setTime(null);
    setContact(EMPTY_CONTACT);
    setTouched({});
    setShowAll(false);
    setResult(null);
    setMode("editing");
  }

  const summaryRows: [string, string][] = [
    ["Tratamentos", items.map((t) => t.name).join(", ")],
    ["Profissional", result?.proName ?? proLabel ?? "—"],
    ["Data", date ? formatDateLong(date) : "—"],
    ["Horário", time ?? "—"],
    ["Duração", formatDuration(duration)],
    ["Valor", price],
    ["Nome", contact.name.trim()],
    ["WhatsApp", contact.phone],
    ...(contact.email.trim() ? ([["E-mail", contact.email.trim()]] as [string, string][]) : []),
  ];

  if (mode !== "editing") {
    const done = mode === "done";
    return (
      <div className="mx-auto max-w-2xl rounded-3xl bg-white/85 p-6 shadow-sm shadow-ink/5 sm:p-10">
        {done && <CircleCheck aria-hidden className="h-12 w-12 text-moss" />}
        <h2 ref={topRef} tabIndex={-1} className="mt-2 font-serif text-4xl text-moss-dark focus:outline-none">
          {done ? "Solicitação pronta para envio" : "Revise sua solicitação"}
        </h2>
        <div role="note" className="mt-4 flex gap-3 rounded-2xl bg-sage-soft/70 p-4 text-sm text-moss-dark">
          <Info aria-hidden className="mt-0.5 h-4 w-4 shrink-0" />
          <p>
            {done ? (
              <>
                <strong>Isto é uma demonstração:</strong> nenhum horário foi reservado e nada foi enviado ao estúdio. A
                disponibilidade mostrada é simulada. Para seguir, envie a solicitação pelo WhatsApp; em um site real, a
                recepção confirmaria o horário.
              </>
            ) : (
              <>Ao confirmar, preparamos a mensagem para o WhatsApp. A disponibilidade exibida é demonstrativa.</>
            )}
          </p>
        </div>
        <dl className="mt-6 divide-y divide-linen rounded-2xl border border-linen">
          {summaryRows.map(([k, v]) => (
            <div key={k} className="grid gap-1 px-5 py-3 sm:grid-cols-[8rem_1fr]">
              <dt className="text-sm text-mute">{k}</dt>
              <dd className="font-semibold first-letter:uppercase">{v}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          {done && result ? (
            <>
              <a href={result.url} target="_blank" rel="noopener noreferrer" className={buttonClasses("whatsapp")}>
                <MessageCircle aria-hidden className="h-4 w-4" /> Enviar pelo WhatsApp
              </a>
              <button type="button" onClick={restart} className={buttonClasses("outline")}>
                <RotateCcw aria-hidden className="h-4 w-4" /> Nova solicitação
              </button>
            </>
          ) : (
            <>
              <button type="button" onClick={confirm} disabled={submitting} className={buttonClasses("primary")}>
                {submitting ? <LoaderCircle aria-hidden className="h-4 w-4 animate-spin" /> : <CircleCheck aria-hidden className="h-4 w-4" />}
                {submitting ? "Preparando…" : "Confirmar solicitação"}
              </button>
              <button type="button" onClick={() => setMode("editing")} disabled={submitting} className={buttonClasses("outline")}>
                <PencilLine aria-hidden className="h-4 w-4" /> Editar
              </button>
            </>
          )}
        </div>
        {done && (
          <p className="mt-4 text-xs text-mute">
            O WhatsApp abre com a mensagem pronta; nada é enviado sem a sua ação.{" "}
            <Link href="/" className="underline underline-offset-2">Voltar ao site</Link>
          </p>
        )}
      </div>
    );
  }

  return (
    <div>
      {error && (
        <p role="alert" className="mb-6 flex gap-3 rounded-2xl border border-error/30 bg-error/5 p-4 text-sm">
          <AlertCircle aria-hidden className="h-5 w-5 shrink-0 text-error" /> {error}
        </p>
      )}
      <div className="space-y-4">
        <Step
          n={1}
          id="etapa-tratamentos"
          title="Tratamentos"
          done={step1}
          locked={false}
          summary={`Escolha até ${BOOKING_RULES.maxServices}. Eles são feitos em sequência, no mesmo horário.`}
        >
          <TreatmentPicker selected={ids} onToggle={toggle} limitReached={ids.length >= BOOKING_RULES.maxServices} />
          <p aria-live="polite" className="mt-4 min-h-5 text-sm font-semibold text-clay">
            {limitMsg || ids.length >= BOOKING_RULES.maxServices ? `Limite de ${BOOKING_RULES.maxServices} tratamentos por solicitação.` : ""}
          </p>
        </Step>

        <Step n={2} id="etapa-profissional" title="Profissional" done={step2} locked={!step1} summary="Mostramos só quem realiza todos os tratamentos escolhidos.">
          {pros.length === 0 ? (
            <p role="status" className="rounded-2xl border border-dashed border-clay/40 p-5 text-sm">
              Nenhuma profissional realiza essa combinação em sequência. Remova um tratamento ou faça duas solicitações.
            </p>
          ) : (
            <ProPicker
              pros={pros}
              value={validPro}
              onChange={(id) => {
                setProId(id);
                setTime(null);
              }}
            />
          )}
        </Step>

        <Step n={3} id="etapa-horario" title="Data e horário" done={step3} locked={!step2} summary={`Duração total: ${formatDuration(duration)}.`}>
          {!now ? (
            <p role="status" className="flex items-center gap-2 text-mute">
              <LoaderCircle aria-hidden className="h-4 w-4 animate-spin" /> Carregando agenda…
            </p>
          ) : (
            <div className="grid gap-8 lg:grid-cols-[minmax(0,22rem)_1fr]">
              <CalendarPicker
                weeks={weeks}
                value={date}
                onChange={(d) => {
                  setDate(d);
                  setTime(null);
                }}
              />
              {date ? (
                <TimePicker date={date} slots={slots} value={time} onChange={setTime} />
              ) : (
                <p className="self-center rounded-2xl border border-dashed border-linen p-5 text-sm text-mute">Escolha um dia no calendário para ver os horários.</p>
              )}
            </div>
          )}
        </Step>

        <Step n={4} id="etapa-contato" title="Seus dados" done={step4} locked={!step3} summary="Para a recepção confirmar com você.">
          <ContactFields form={contact} errors={visibleErrors} onChange={setContact} onBlur={(k) => setTouched((t) => ({ ...t, [k]: true }))} />
        </Step>
      </div>

      {/* Resumo "grudado" no rodapé da tela enquanto o fluxo está visível, principalmente no celular. */}
      <div className="sticky bottom-0 z-30 -mx-5 mt-6 border-t border-linen bg-cream/95 backdrop-blur sm:mx-0 sm:rounded-t-2xl sm:border-x">
        <div className="flex items-center justify-between gap-4 px-5 py-3 sm:px-6">
          <p className="min-w-0 text-sm" aria-live="polite">
            {items.length === 0 ? (
              <span className="text-mute">Nenhum tratamento escolhido</span>
            ) : (
              <>
                <span className="block truncate font-semibold">
                  {items.length} {items.length === 1 ? "tratamento" : "tratamentos"} · {formatDuration(duration)}
                </span>
                <span className="text-mute">{price}{slot && date ? ` · ${formatDateLong(date).split(",")[1]?.trim()} às ${slot.time}` : ""}</span>
              </>
            )}
          </p>
          <button type="button" onClick={goReview} className={buttonClasses("primary", "shrink-0 px-5")}>
            Revisar
          </button>
        </div>
      </div>
    </div>
  );
}
