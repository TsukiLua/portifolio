"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { AlertCircle, CircleCheck, Info, LoaderCircle, MessageCircle, RotateCcw, Send } from "lucide-react";
import { maskBrPhone } from "@demo/core/phone";
import { OTHER_REGION, getRegionName, regions } from "@/data/business";
import { OTHER_SERVICE, getServiceName, homeServices } from "@/data/services";
import { whatsappUrl } from "@/lib/contact";
import {
  DESCRIPTION_MAX,
  EMPTY_QUOTE,
  PERIOD_LABELS,
  QUOTE_FIELDS,
  quoteMessage,
  validateQuote,
  type QuoteErrors,
  type QuoteForm as QuoteFormData,
} from "@/lib/quote";
import { Input, Select, TextArea } from "../Field";
import { SELECT_SERVICE_EVENT } from "../RequestServiceLink";
import { buttonClasses } from "../ui";

const FIELD_IDS: Record<keyof QuoteFormData, string> = {
  name: "orc-nome",
  phone: "orc-telefone",
  service: "orc-servico",
  region: "orc-bairro",
  description: "orc-descricao",
  period: "orc-periodo",
};

const FIELD_LABELS: Record<keyof QuoteFormData, string> = {
  name: "Nome",
  phone: "Telefone",
  service: "Tipo de serviço",
  region: "Bairro",
  description: "Descrição",
  period: "Período",
};

type Status = "editing" | "processing" | "done";

export function QuoteForm() {
  const [form, setForm] = useState<QuoteFormData>(EMPTY_QUOTE);
  const [touched, setTouched] = useState<Partial<Record<keyof QuoteFormData, boolean>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [status, setStatus] = useState<Status>("editing");
  const summaryRef = useRef<HTMLDivElement>(null);
  const doneRef = useRef<HTMLHeadingElement>(null);

  // Os cartões de serviço pré-selecionam o tipo de serviço.
  useEffect(() => {
    const onSelect = (event: Event) => {
      const serviceId = (event as CustomEvent<string>).detail;
      setForm((f) => ({ ...f, service: serviceId }));
      setStatus((s) => (s === "done" ? "editing" : s));
    };
    window.addEventListener(SELECT_SERVICE_EVENT, onSelect);
    return () => window.removeEventListener(SELECT_SERVICE_EVENT, onSelect);
  }, []);

  useEffect(() => {
    if (status === "done") doneRef.current?.focus();
  }, [status]);

  const errors = validateQuote(form);
  const visible: QuoteErrors = Object.fromEntries(
    Object.entries(errors).filter(([k]) => submitted || touched[k as keyof QuoteFormData]),
  );
  const errorList = QUOTE_FIELDS.filter((f) => errors[f]);

  const update = <K extends keyof QuoteFormData>(key: K, value: QuoteFormData[K]) => setForm((f) => ({ ...f, [key]: value }));
  const blur = (key: keyof QuoteFormData) => () => setTouched((t) => ({ ...t, [key]: true }));

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    setSubmitted(true);
    if (errorList.length > 0) {
      // Foca o resumo de erros para leitores de tela e teclado.
      requestAnimationFrame(() => summaryRef.current?.focus());
      return;
    }
    setStatus("processing");
    // Simula o tempo de processamento de um envio real (não há envio nesta demonstração).
    window.setTimeout(() => setStatus("done"), 700);
  }

  function reset() {
    setForm(EMPTY_QUOTE);
    setTouched({});
    setSubmitted(false);
    setStatus("editing");
  }

  if (status === "done") {
    return (
      <div className="rounded-3xl bg-white p-6 text-ink shadow-2xl shadow-ink/20 sm:p-10">
        <CircleCheck aria-hidden className="h-12 w-12 text-ok" />
        <h3 ref={doneRef} tabIndex={-1} className="mt-4 text-2xl font-extrabold focus:outline-none sm:text-3xl">
          Solicitação pronta, {form.name.trim().split(" ")[0]}!
        </h3>
        <div role="note" className="mt-4 flex gap-3 rounded-xl bg-brand-soft p-4 text-sm text-brand-dark">
          <Info aria-hidden className="mt-0.5 h-4 w-4 shrink-0" />
          <p>
            <strong>Demonstração:</strong> o pedido <strong>não foi enviado</strong> a nenhuma empresa. Para simular o
            próximo passo, encaminhe pelo WhatsApp. Em um site real, ele chegaria por e-mail ou CRM automaticamente.
          </p>
        </div>
        <dl className="mt-6 divide-y divide-line rounded-xl ring-1 ring-line">
          {(
            [
              ["Serviço", getServiceName(form.service)],
              ["Bairro", getRegionName(form.region)],
              ["Telefone", form.phone],
              ["Período", form.period ? PERIOD_LABELS[form.period] : "Sem preferência"],
              ["Descrição", form.description.trim()],
            ] as const
          ).map(([label, value]) => (
            <div key={label} className="grid gap-1 px-4 py-3 sm:grid-cols-[8rem_1fr]">
              <dt className="text-sm text-muted">{label}</dt>
              <dd className="font-semibold break-words">{value}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <a href={whatsappUrl(quoteMessage(form))} target="_blank" rel="noopener noreferrer" className={buttonClasses("whatsapp")}>
            <MessageCircle aria-hidden className="h-5 w-5" />
            Enviar pelo WhatsApp
          </a>
          <button type="button" onClick={reset} className={buttonClasses("outline")}>
            <RotateCcw aria-hidden className="h-4 w-4" />
            Nova solicitação
          </button>
        </div>
        <p className="mt-3 text-xs text-muted">O WhatsApp abre com a mensagem preenchida. Nada é enviado sem a sua confirmação.</p>
      </div>
    );
  }

  const processing = status === "processing";

  return (
    <form noValidate onSubmit={onSubmit} aria-labelledby="orcamento-title" className="rounded-3xl bg-white p-6 text-ink shadow-2xl shadow-ink/20 sm:p-8">
      {submitted && errorList.length > 0 && (
        <div ref={summaryRef} tabIndex={-1} role="alert" className="mb-6 rounded-xl border-2 border-danger/30 bg-danger/5 p-4 focus:outline-none">
          <p className="flex items-center gap-2 font-bold text-danger">
            <AlertCircle aria-hidden className="h-5 w-5" />
            Revise {errorList.length === 1 ? "1 campo" : `${errorList.length} campos`} para continuar:
          </p>
          <ul className="mt-2 list-inside list-disc text-sm">
            {errorList.map((field) => (
              <li key={field}>
                <a href={`#${FIELD_IDS[field]}`} className="underline underline-offset-2 hover:text-danger">
                  {FIELD_LABELS[field]}: {errors[field]}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      <fieldset disabled={processing} className="grid gap-5 sm:grid-cols-2">
        <legend className="sr-only">Dados para o orçamento</legend>
        <Input
          id={FIELD_IDS.name}
          label="Nome"
          autoComplete="name"
          value={form.name}
          maxLength={80}
          error={visible.name}
          onChange={(e) => update("name", e.target.value)}
          onBlur={blur("name")}
        />
        <Input
          id={FIELD_IDS.phone}
          label="Telefone / WhatsApp"
          type="tel"
          inputMode="tel"
          autoComplete="tel-national"
          placeholder="(11) 98765-4321"
          value={form.phone}
          error={visible.phone}
          onChange={(e) => update("phone", maskBrPhone(e.target.value))}
          onBlur={blur("phone")}
        />
        <Select
          id={FIELD_IDS.service}
          label="Tipo de serviço"
          value={form.service}
          error={visible.service}
          onChange={(e) => update("service", e.target.value)}
          onBlur={blur("service")}
        >
          <option value="">Selecione…</option>
          {homeServices.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name}
            </option>
          ))}
          <option value={OTHER_SERVICE}>Outro serviço</option>
        </Select>
        <Select
          id={FIELD_IDS.region}
          label="Bairro"
          value={form.region}
          error={visible.region}
          hint="Bairros fictícios"
          onChange={(e) => update("region", e.target.value)}
          onBlur={blur("region")}
        >
          <option value="">Selecione…</option>
          {regions.map((r) => (
            <option key={r.id} value={r.id}>
              {r.name}
            </option>
          ))}
          <option value={OTHER_REGION}>Outro bairro</option>
        </Select>
        <div className="sm:col-span-2">
          <TextArea
            id={FIELD_IDS.description}
            label="O que precisa ser feito?"
            placeholder="Ex.: trocar o chuveiro do banheiro e instalar duas tomadas na cozinha."
            value={form.description}
            maxLength={DESCRIPTION_MAX}
            error={visible.description}
            hint={`${form.description.trim().length}/${DESCRIPTION_MAX} · quanto mais detalhes, mais preciso o orçamento`}
            onChange={(e) => update("description", e.target.value)}
            onBlur={blur("description")}
          />
        </div>
        <fieldset className="sm:col-span-2">
          <legend className="font-bold">
            Melhor período para a visita <span className="font-normal text-muted">(opcional)</span>
          </legend>
          <div className="mt-2 flex flex-wrap gap-2">
            {(Object.keys(PERIOD_LABELS) as (keyof typeof PERIOD_LABELS)[]).map((p) => (
              <label
                key={p}
                className="cursor-pointer rounded-xl border-2 border-line px-4 py-2.5 font-semibold has-checked:border-brand has-checked:bg-brand-soft has-checked:text-brand-dark has-focus-visible:outline-3 has-focus-visible:outline-brand"
              >
                <input
                  type="radio"
                  name="periodo"
                  value={p}
                  checked={form.period === p}
                  onChange={() => update("period", p)}
                  className="sr-only"
                />
                {PERIOD_LABELS[p]}
              </label>
            ))}
          </div>
        </fieldset>
      </fieldset>

      <button type="submit" disabled={processing} className={buttonClasses("primary", "mt-8 w-full text-base")}>
        {processing ? (
          <>
            <LoaderCircle aria-hidden className="h-5 w-5 animate-spin" />
            Preparando sua solicitação…
          </>
        ) : (
          <>
            <Send aria-hidden className="h-5 w-5" />
            Solicitar orçamento grátis
          </>
        )}
      </button>
      <p className="mt-3 text-center text-xs text-muted" aria-live="polite">
        {processing ? "Processando…" : "Demonstração: nenhum dado é enviado ou armazenado."}
      </p>
    </form>
  );
}
