"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { AlertCircle, Info } from "lucide-react";
import { maskBrPhone } from "@demo/core/phone";
import { composeMessage } from "@demo/core/whatsapp";
import { dealership } from "@/data/dealership";
import { CONTACT_SUBJECTS, contactSchema, fieldErrors, type ContactInput } from "@/lib/validation";
import { whatsappLink } from "@/lib/whatsapp";
import { buttonClasses } from "../ui/primitives";
import { DemoResult } from "./DemoResult";
import { InputField, SelectField, TextAreaField } from "./FormField";

const EMPTY = { name: "", phone: "", email: "", subject: "", message: "" };
const ORDER = ["name", "phone", "email", "subject", "message"] as const;

/**
 * Formulário de contato SEM backend: valida com Zod e, em vez de simular um envio,
 * prepara a mensagem para o visitante enviar pelo WhatsApp.
 */
export function ContactForm() {
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [result, setResult] = useState<string | null>(null);
  const resultRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (result) resultRef.current?.focus();
  }, [result]);

  const set = (key: keyof typeof EMPTY, value: string) => {
    setForm((f) => ({ ...f, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: "" }));
  };

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const parsed = contactSchema.safeParse(form as ContactInput);
    if (!parsed.success) {
      const errs = fieldErrors(parsed.error);
      setErrors(errs);
      const first = ORDER.find((k) => errs[k]);
      if (first) document.getElementById(`contato-${first}`)?.focus();
      return;
    }
    const d = parsed.data;
    setResult(
      composeMessage([
        `Olá, ${dealership.name}! Meu nome é ${d.name.trim()}.`,
        `Assunto: ${CONTACT_SUBJECTS[d.subject]}.`,
        d.message,
        `Telefone: ${d.phone}${d.email ? ` · E-mail: ${d.email}` : ""}`,
      ]),
    );
  }

  if (result) {
    return <DemoResult headingRef={resultRef} title="Mensagem pronta para enviar" message={result} whatsappUrl={whatsappLink(result)} onReset={() => setResult(null)} />;
  }

  return (
    <form noValidate onSubmit={onSubmit} aria-labelledby="form-contato-titulo" className="grid gap-4 rounded-xl border border-line bg-surface p-5 sm:grid-cols-2 sm:p-6">
      <h2 id="form-contato-titulo" className="text-xl font-bold sm:col-span-2">
        Envie uma mensagem
      </h2>
      <p className="-mt-2 flex gap-2 text-sm text-steel sm:col-span-2">
        <Info aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-wine" />
        Modo demonstrativo: ao enviar, preparamos a mensagem para você mandar pelo WhatsApp. Nenhum dado é armazenado.
      </p>
      <InputField id="contato-name" label="Nome" autoComplete="name" maxLength={80} value={form.name} error={errors.name} onChange={(e) => set("name", e.target.value)} />
      <InputField
        id="contato-phone"
        label="Telefone / WhatsApp"
        type="tel"
        inputMode="tel"
        autoComplete="tel-national"
        placeholder="(11) 98765-4321"
        value={form.phone}
        error={errors.phone}
        onChange={(e) => set("phone", maskBrPhone(e.target.value))}
      />
      <InputField id="contato-email" label="E-mail" optional type="email" autoComplete="email" value={form.email} error={errors.email} onChange={(e) => set("email", e.target.value)} />
      <SelectField id="contato-subject" label="Assunto" value={form.subject} error={errors.subject} onChange={(e) => set("subject", e.target.value)}>
        <option value="">Selecione…</option>
        {Object.entries(CONTACT_SUBJECTS).map(([value, label]) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </SelectField>
      <div className="sm:col-span-2">
        <TextAreaField
          id="contato-message"
          label="Mensagem"
          maxLength={1000}
          value={form.message}
          error={errors.message}
          hint={`${form.message.trim().length}/1000`}
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
          Preparar mensagem
        </button>
      </div>
    </form>
  );
}
