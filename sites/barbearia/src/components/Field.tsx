import type { InputHTMLAttributes, TextareaHTMLAttributes } from "react";

interface BaseProps {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  optional?: boolean;
}

const control =
  "mt-2 block w-full border bg-coal px-4 py-3 text-base text-bone placeholder:text-ash/60 transition-colors focus:border-ember focus:outline-none aria-[invalid=true]:border-danger";

function Describe({ id, error, hint }: Pick<BaseProps, "id" | "error" | "hint">) {
  return (
    <>
      {hint && !error && (
        <p id={`${id}-hint`} className="mt-2 text-sm text-ash">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className="mt-2 text-sm font-semibold text-danger">
          {error}
        </p>
      )}
    </>
  );
}

const describedBy = (id: string, error?: string, hint?: string) =>
  error ? `${id}-error` : hint ? `${id}-hint` : undefined;

export function TextField({ id, label, error, hint, optional, ...props }: BaseProps & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-bold">
        {label} {optional && <span className="font-normal text-ash">(opcional)</span>}
      </label>
      <input
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, error, hint)}
        className={`${control} border-smoke`}
        {...props}
      />
      <Describe id={id} error={error} hint={hint} />
    </div>
  );
}

export function TextArea({ id, label, error, hint, optional, ...props }: BaseProps & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-bold">
        {label} {optional && <span className="font-normal text-ash">(opcional)</span>}
      </label>
      <textarea
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, error, hint)}
        className={`${control} min-h-28 resize-y border-smoke`}
        {...props}
      />
      <Describe id={id} error={error} hint={hint} />
    </div>
  );
}
