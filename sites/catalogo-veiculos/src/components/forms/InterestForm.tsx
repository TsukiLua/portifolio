"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { AlertCircle } from "lucide-react";
import { addDays, formatDateLong, toISODate } from "@demo/core/date";
import { maskBrPhone } from "@demo/core/phone";
import { composeMessage } from "@demo/core/whatsapp";
import { dealership } from "@/data/dealership";
import { getVehicleBySlug } from "@/data/vehicles";
import { fieldErrors, interestSchema, type InterestInput } from "@/lib/validation";
import { vehicleMessage, whatsappLink } from "@/lib/whatsapp";
import { buttonClasses } from "../ui/primitives";
import { DemoResult } from "./DemoResult";
import { InputField, TextAreaField } from "./FormField";

const EMPTY: InterestInput = { name: "", phone: "", intent: "interesse", visitDate: "", period: "", message: "" };
const PERIODS = { manha: "Manhã", tarde: "Tarde" } as const;

/** Formulário de interesse / agendamento de visita para um veículo. Recebe só o slug. */
export function InterestForm({ slug }: { slug: string }) {
  const vehicle = getVehicleBySlug(slug);
  const [form, setForm] = useState<InterestInput>(EMPTY);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [result, setResult] = useState<string | null>(null);
  const resultRef = useRef<HTMLHeadingElement>(null);

  // O botão "Agendar visita" leva a #agendar-visita: já seleciona a intenção de visita.
  useEffect(() => {
    const onHash = () => {
      if (window.location.hash === "#agendar-visita") setForm((f) => ({ ...f, intent: "visita" }));
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  useEffect(() => {
    if (result) resultRef.current?.focus();
  }, [result]);

  if (!vehicle) return null;
  const today = toISODate(new Date());

  const set = <K extends keyof InterestInput>(key: K, value: InterestInput[K]) => {
    setForm((f) => ({ ...f, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: "" }));
  };

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const parsed = interestSchema(new Date(), dealership.closedWeekdays).safeParse(form);
    if (!parsed.success) {
      const errs = fieldErrors(parsed.error);
      setErrors(errs);
      const first = ["name", "phone", "visitDate", "message"].find((k) => errs[k]);
      if (first) document.getElementById(`interesse-${first}`)?.focus();
      return;
    }
    const d = parsed.data;
    setResult(
      composeMessage([
        vehicleMessage(vehicle!, d.intent),
        d.intent === "visita" && d.visitDate && `Data preferida: ${formatDateLong(d.visitDate)}${d.period ? ` (${PERIODS[d.period]})` : ""}.`,
        `Meu nome é ${d.name.trim()} e meu telefone é ${d.phone}.`,
        d.message && `Observação: ${d.message}`,
      ]),
    );
  }

  if (result) {
    return (
      <DemoResult
        headingRef={resultRef}
        title="Mensagem pronta"
        message={result}
        whatsappUrl={whatsappLink(result)}
        onReset={() => setResult(null)}
      />
    );
  }

  const isVisit = form.intent === "visita";
  return (
    <form noValidate onSubmit={onSubmit} className="grid gap-4 rounded-xl border border-line bg-surface p-5 sm:grid-cols-2 sm:p-6">
      <fieldset className="sm:col-span-2">
        <legend className="text-sm font-semibold">O que você prefere?</legend>
        <div className="mt-2 grid grid-cols-2 gap-2">
          {(
            [
              ["interesse", "Receber informações"],
              ["visita", "Agendar visita"],
            ] as const
          ).map(([value, label]) => (
            <label key={value} className="flex min-h-11 cursor-pointer items-center justify-center rounded-lg border border-line px-3 text-sm font-semibold has-checked:border-wine has-checked:bg-wine-soft has-checked:text-wine-dark has-focus-visible:outline-2 has-focus-visible:outline-wine">
              <input type="radio" name="intencao" value={value} checked={form.intent === value} onChange={() => set("intent", value)} className="sr-only" />
              {label}
            </label>
          ))}
        </div>
      </fieldset>
      <InputField id="interesse-name" label="Nome" autoComplete="name" maxLength={80} value={form.name} error={errors.name} onChange={(e) => set("name", e.target.value)} />
      <InputField
        id="interesse-phone"
        label="Telefone / WhatsApp"
        type="tel"
        inputMode="tel"
        autoComplete="tel-national"
        placeholder="(11) 98765-4321"
        value={form.phone}
        error={errors.phone}
        onChange={(e) => set("phone", maskBrPhone(e.target.value))}
      />
      {isVisit && (
        <>
          <InputField
            id="interesse-visitDate"
            label="Data preferida"
            type="date"
            min={addDays(today, 1)}
            max={addDays(today, 60)}
            value={form.visitDate}
            error={errors.visitDate}
            hint="Atendemos de segunda a sábado."
            onChange={(e) => set("visitDate", e.target.value)}
          />
          <fieldset>
            <legend className="text-sm font-semibold">
              Período <span className="font-normal text-steel">(opcional)</span>
            </legend>
            <div className="mt-1.5 grid grid-cols-2 gap-2">
              {(Object.keys(PERIODS) as (keyof typeof PERIODS)[]).map((p) => (
                <label key={p} className="flex h-[3.1rem] cursor-pointer items-center justify-center rounded-lg border border-line text-sm has-checked:border-wine has-checked:bg-wine-soft has-focus-visible:outline-2 has-focus-visible:outline-wine">
                  <input type="radio" name="periodo" checked={form.period === p} onChange={() => set("period", p)} className="sr-only" />
                  {PERIODS[p]}
                </label>
              ))}
            </div>
          </fieldset>
        </>
      )}
      <div className="sm:col-span-2">
        <TextAreaField
          id="interesse-message"
          label="Mensagem"
          optional
          maxLength={500}
          placeholder="Ex.: aceita meu carro na troca? Tem laudo cautelar?"
          value={form.message}
          error={errors.message}
          onChange={(e) => set("message", e.target.value)}
        />
      </div>
      {Object.values(errors).some(Boolean) && (
        <p role="alert" className="flex items-center gap-2 text-sm font-medium text-error sm:col-span-2">
          <AlertCircle aria-hidden className="h-4 w-4" /> Revise os campos destacados.
        </p>
      )}
      <div className="sm:col-span-2">
        <button type="submit" className={buttonClasses("primary", "w-full sm:w-auto")}>
          {isVisit ? "Preparar agendamento" : "Preparar mensagem"}
        </button>
        <p className="mt-2 text-xs text-steel">Modo demonstrativo: os dados não são enviados nem armazenados.</p>
      </div>
    </form>
  );
}
