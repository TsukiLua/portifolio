import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";

const control =
  "mt-1.5 block w-full rounded-lg border border-line bg-surface px-3.5 py-3 text-base text-ink placeholder:text-steel/70 focus:border-wine focus:outline-none aria-[invalid=true]:border-error";

interface Meta {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  optional?: boolean;
}

function Wrap({ id, label, error, hint, optional, children }: Meta & { children: ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-semibold">
        {label} {optional && <span className="font-normal text-steel">(opcional)</span>}
      </label>
      {children}
      {error ? (
        <p id={`${id}-erro`} className="mt-1.5 text-sm font-medium text-error">
          {error}
        </p>
      ) : (
        hint && (
          <p id={`${id}-dica`} className="mt-1.5 text-xs text-steel">
            {hint}
          </p>
        )
      )}
    </div>
  );
}

const a11y = (id: string, error?: string, hint?: string) => ({
  "aria-invalid": error ? true : undefined,
  "aria-describedby": error ? `${id}-erro` : hint ? `${id}-dica` : undefined,
});

export function InputField({ id, label, error, hint, optional, ...props }: Meta & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <Wrap {...{ id, label, error, hint, optional }}>
      <input id={id} className={control} {...a11y(id, error, hint)} {...props} />
    </Wrap>
  );
}

export function SelectField({ id, label, error, hint, optional, children, ...props }: Meta & SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <Wrap {...{ id, label, error, hint, optional }}>
      <select id={id} className={control} {...a11y(id, error, hint)} {...props}>
        {children}
      </select>
    </Wrap>
  );
}

export function TextAreaField({ id, label, error, hint, optional, ...props }: Meta & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <Wrap {...{ id, label, error, hint, optional }}>
      <textarea id={id} className={`${control} min-h-28 resize-y`} {...a11y(id, error, hint)} {...props} />
    </Wrap>
  );
}
