"use client";

import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { Info, Mail, MessageCircle, RotateCcw } from "lucide-react";
import { EMPTY_QUOTE, SITE_TYPES, mailtoLink, quoteMessage, validateQuote, whatsappLink, type QuoteForm as QuoteData } from "@/lib/contact";
import { buttonClasses } from "../ui/primitives";

const input =
  "mt-1.5 block w-full rounded-xl border border-ink/15 bg-paper px-4 py-3 text-base text-ink placeholder:text-mute/70 focus:border-accent focus:outline-none aria-[invalid=true]:border-error";

function Field({ id, label, optional, error, children }: { id: string; label: string; optional?: boolean; error?: string; children: ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-medium">
        {label} {optional && <span className="font-normal text-mute">(opcional)</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-erro`} className="mt-1.5 text-sm font-medium text-error">
          {error}
        </p>
      )}
    </div>
  );
}

/**
 * Formulário SEM backend: valida e prepara a mensagem. Não diz que algo foi enviado —
 * o visitante escolhe abrir no WhatsApp ou no e-mail e decide se envia.
 */
export function QuoteForm() {
  const [form, setForm] = useState<QuoteData>(EMPTY_QUOTE);
  const [errors, setErrors] = useState<Partial<Record<keyof QuoteData, string>>>({});
  const [ready, setReady] = useState<string | null>(null);
  const readyRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (ready) readyRef.current?.focus();
  }, [ready]);

  const set = <K extends keyof QuoteData>(key: K, value: QuoteData[K]) => {
    setForm((f) => ({ ...f, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  };
  const aria = (key: keyof QuoteData) => ({ "aria-invalid": errors[key] ? true : undefined, "aria-describedby": errors[key] ? `orc-${key}-erro` : undefined });

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const errs = validateQuote(form);
    setErrors(errs);
    const first = (["name", "siteType", "company", "features", "deadline", "message"] as const).find((k) => errs[k]);
    if (first) {
      document.getElementById(`orc-${first}`)?.focus();
      return;
    }
    setReady(quoteMessage(form));
  }

  if (ready) {
    return (
      <div className="rounded-3xl border border-ink/10 bg-paper p-6 sm:p-8">
        <h3 ref={readyRef} tabIndex={-1} className="text-2xl font-semibold focus:outline-none">
          Mensagem pronta
        </h3>
        <p role="note" className="mt-3 flex gap-2 rounded-xl bg-accent-soft p-3 text-sm text-accent-dark">
          <Info aria-hidden className="mt-0.5 h-4 w-4 shrink-0" />
          Nada foi enviado ainda. Escolha por onde mandar: o aplicativo abre com o texto preenchido e você confirma o envio.
        </p>
        <pre className="mt-4 rounded-xl bg-canvas p-4 font-sans text-sm leading-relaxed whitespace-pre-wrap">{ready}</pre>
        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <a href={whatsappLink(ready)} target="_blank" rel="noopener noreferrer" className={buttonClasses("primary")}>
            <MessageCircle aria-hidden className="h-4 w-4" /> Enviar pelo WhatsApp
          </a>
          <a href={mailtoLink(`Orçamento de site — ${form.name.trim()}`, ready)} className={buttonClasses("outline")}>
            <Mail aria-hidden className="h-4 w-4" /> Enviar por e-mail
          </a>
          <button type="button" onClick={() => setReady(null)} className={buttonClasses("ghost")}>
            <RotateCcw aria-hidden className="h-4 w-4" /> Editar
          </button>
        </div>
      </div>
    );
  }

  return (
    <form noValidate onSubmit={onSubmit} aria-labelledby="form-orcamento-titulo" className="grid gap-4 rounded-3xl border border-ink/10 bg-paper p-6 sm:grid-cols-2 sm:p-8">
      <h3 id="form-orcamento-titulo" className="text-xl font-semibold sm:col-span-2">
        Prefere adiantar os detalhes?
      </h3>
      <p className="-mt-2 text-sm text-mute sm:col-span-2">Só nome e tipo de site são obrigatórios. O resto ajuda, mas pode ficar para a conversa.</p>
      <Field id="orc-name" label="Nome" error={errors.name}>
        <input id="orc-name" autoComplete="name" maxLength={80} value={form.name} onChange={(e) => set("name", e.target.value)} className={input} {...aria("name")} />
      </Field>
      <Field id="orc-company" label="Empresa" optional error={errors.company}>
        <input id="orc-company" autoComplete="organization" maxLength={120} value={form.company} onChange={(e) => set("company", e.target.value)} className={input} {...aria("company")} />
      </Field>
      <Field id="orc-siteType" label="Tipo de site" error={errors.siteType}>
        <select id="orc-siteType" value={form.siteType} onChange={(e) => set("siteType", e.target.value as QuoteData["siteType"])} className={input} {...aria("siteType")}>
          <option value="">Selecione…</option>
          {Object.entries(SITE_TYPES).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </Field>
      <Field id="orc-deadline" label="Prazo desejado" optional error={errors.deadline}>
        <input id="orc-deadline" maxLength={120} placeholder="Ex.: até o fim do mês" value={form.deadline} onChange={(e) => set("deadline", e.target.value)} className={input} {...aria("deadline")} />
      </Field>
      <div className="sm:col-span-2">
        <Field id="orc-features" label="Funcionalidades necessárias" optional error={errors.features}>
          <input
            id="orc-features"
            maxLength={500}
            placeholder="Ex.: catálogo com filtros, WhatsApp, agendamento"
            value={form.features}
            onChange={(e) => set("features", e.target.value)}
            className={input}
            {...aria("features")}
          />
        </Field>
      </div>
      <div className="sm:col-span-2">
        <Field id="orc-message" label="Mais detalhes" optional error={errors.message}>
          <textarea id="orc-message" rows={3} maxLength={500} value={form.message} onChange={(e) => set("message", e.target.value)} className={`${input} resize-y`} {...aria("message")} />
        </Field>
      </div>
      <div className="sm:col-span-2">
        <button type="submit" className={buttonClasses("dark", "w-full sm:w-auto")}>
          Preparar mensagem
        </button>
        <p className="mt-2 text-xs text-mute">Nenhum dado é enviado ou armazenado por este site.</p>
      </div>
    </form>
  );
}
