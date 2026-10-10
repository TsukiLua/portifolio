import { ShieldCheck } from "lucide-react";
import { maskBrPhone } from "@demo/core/phone";
import { TextArea, TextField } from "../Field";

export interface DetailsForm {
  name: string;
  phone: string;
  notes: string;
}

export type DetailsErrors = Partial<Record<keyof DetailsForm, string>>;

export function DetailsStep({
  form,
  errors,
  onChange,
  onBlur,
}: {
  form: DetailsForm;
  errors: DetailsErrors;
  onChange: (form: DetailsForm) => void;
  onBlur: (field: keyof DetailsForm) => void;
}) {
  return (
    <div className="max-w-xl space-y-6">
      <TextField
        id="nome"
        label="Nome completo"
        autoComplete="name"
        value={form.name}
        error={errors.name}
        onChange={(e) => onChange({ ...form, name: e.target.value })}
        onBlur={() => onBlur("name")}
        maxLength={80}
        required
      />
      <TextField
        id="telefone"
        label="WhatsApp"
        type="tel"
        inputMode="tel"
        autoComplete="tel-national"
        placeholder="(11) 98765-4321"
        value={form.phone}
        error={errors.phone}
        hint="Usado apenas para confirmar o horário."
        onChange={(e) => onChange({ ...form, phone: maskBrPhone(e.target.value) })}
        onBlur={() => onBlur("phone")}
        required
      />
      <TextArea
        id="observacoes"
        label="Observações"
        optional
        placeholder="Ex.: quero manter o comprimento em cima."
        value={form.notes}
        error={errors.notes}
        maxLength={200}
        hint={`${form.notes.length}/200 caracteres`}
        onChange={(e) => onChange({ ...form, notes: e.target.value })}
        onBlur={() => onBlur("notes")}
      />
      <p className="flex gap-3 border border-smoke bg-char p-4 text-sm text-ash">
        <ShieldCheck aria-hidden className="h-5 w-5 shrink-0 text-ok" />
        Nesta demonstração, seus dados ficam apenas no seu navegador: não são enviados nem armazenados.
      </p>
    </div>
  );
}
