import type { InputHTMLAttributes } from "react";
import { maskBrPhone } from "@demo/core/phone";
import type { ContactErrors, ContactForm } from "@/lib/booking";

const input =
  "mt-1.5 block w-full rounded-xl border border-linen bg-white px-4 py-3 text-base focus:border-moss focus:outline-none aria-[invalid=true]:border-error";

function Field({ id, label, error, hint, optional, ...props }: { id: string; label: string; error?: string; hint?: string; optional?: boolean } & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label htmlFor={id} className="font-semibold">
        {label} {optional && <span className="font-normal text-mute">(opcional)</span>}
      </label>
      <input id={id} aria-invalid={error ? true : undefined} aria-describedby={error ? `${id}-erro` : hint ? `${id}-dica` : undefined} className={input} {...props} />
      {error ? (
        <p id={`${id}-erro`} className="mt-1.5 text-sm font-semibold text-error">{error}</p>
      ) : (
        hint && <p id={`${id}-dica`} className="mt-1.5 text-sm text-mute">{hint}</p>
      )}
    </div>
  );
}

export const CONTACT_IDS: Record<keyof ContactForm, string> = {
  name: "contato-nome",
  phone: "contato-whatsapp",
  email: "contato-email",
  notes: "contato-obs",
  consent: "contato-consentimento",
};

export function ContactFields({
  form,
  errors,
  onChange,
  onBlur,
}: {
  form: ContactForm;
  errors: ContactErrors;
  onChange: (f: ContactForm) => void;
  onBlur: (k: keyof ContactForm) => void;
}) {
  return (
    <div className="grid gap-5 sm:grid-cols-2">
      <Field id={CONTACT_IDS.name} label="Nome" autoComplete="name" maxLength={80} value={form.name} error={errors.name} onChange={(e) => onChange({ ...form, name: e.target.value })} onBlur={() => onBlur("name")} />
      <Field
        id={CONTACT_IDS.phone}
        label="WhatsApp"
        type="tel"
        inputMode="tel"
        autoComplete="tel-national"
        placeholder="(11) 98765-4321"
        value={form.phone}
        error={errors.phone}
        onChange={(e) => onChange({ ...form, phone: maskBrPhone(e.target.value) })}
        onBlur={() => onBlur("phone")}
      />
      <div className="sm:col-span-2">
        <Field id={CONTACT_IDS.email} label="E-mail" optional type="email" autoComplete="email" value={form.email} error={errors.email} onChange={(e) => onChange({ ...form, email: e.target.value })} onBlur={() => onBlur("email")} />
      </div>
      <div className="sm:col-span-2">
        <label htmlFor={CONTACT_IDS.notes} className="font-semibold">
          Observações <span className="font-normal text-mute">(opcional)</span>
        </label>
        <textarea
          id={CONTACT_IDS.notes}
          rows={3}
          maxLength={300}
          placeholder="Alergias, preferências ou se é sua primeira visita."
          value={form.notes}
          aria-invalid={errors.notes ? true : undefined}
          onChange={(e) => onChange({ ...form, notes: e.target.value })}
          onBlur={() => onBlur("notes")}
          className={`${input} resize-y`}
        />
        {errors.notes && <p className="mt-1.5 text-sm font-semibold text-error">{errors.notes}</p>}
      </div>
      <div className="sm:col-span-2">
        <label className="flex cursor-pointer gap-3 text-sm leading-relaxed">
          <input
            id={CONTACT_IDS.consent}
            type="checkbox"
            checked={form.consent}
            aria-invalid={errors.consent ? true : undefined}
            aria-describedby={errors.consent ? `${CONTACT_IDS.consent}-erro` : undefined}
            onChange={(e) => onChange({ ...form, consent: e.target.checked })}
            onBlur={() => onBlur("consent")}
            className="mt-0.5 h-5 w-5 shrink-0 accent-moss"
          />
          <span>
            Autorizo o uso destes dados apenas para contato sobre esta solicitação (LGPD). Nesta demonstração, nada é
            enviado ou armazenado.
          </span>
        </label>
        {errors.consent && <p id={`${CONTACT_IDS.consent}-erro`} className="mt-1.5 text-sm font-semibold text-error">{errors.consent}</p>}
      </div>
    </div>
  );
}
