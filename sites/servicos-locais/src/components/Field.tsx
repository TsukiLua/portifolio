import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";

interface Meta {
  id: string;
  label: string;
  error?: string;
  hint?: ReactNode;
  optional?: boolean;
}

const control =
  "mt-1.5 block w-full rounded-xl border-2 border-line bg-white px-4 py-3 text-base text-ink placeholder:text-muted/60 transition-colors focus:border-brand focus:outline-none aria-[invalid=true]:border-danger aria-[invalid=true]:bg-danger/[0.03]";

function Wrapper({ id, label, error, hint, optional, children }: Meta & { children: ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="font-bold">
        {label}
        {optional ? <span className="font-normal text-muted"> (opcional)</span> : <span aria-hidden className="text-danger"> *</span>}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="mt-1.5 text-sm font-semibold text-danger">
          {error}
        </p>
      ) : (
        hint && (
          <p id={`${id}-hint`} className="mt-1.5 text-sm text-muted">
            {hint}
          </p>
        )
      )}
    </div>
  );
}

const aria = (id: string, error?: string, hint?: ReactNode) => ({
  "aria-invalid": error ? true : undefined,
  "aria-describedby": error ? `${id}-error` : hint ? `${id}-hint` : undefined,
});

export function Input({ id, label, error, hint, optional, ...props }: Meta & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <Wrapper {...{ id, label, error, hint, optional }}>
      <input id={id} className={control} {...aria(id, error, hint)} {...props} />
    </Wrapper>
  );
}

export function Select({ id, label, error, hint, optional, children, ...props }: Meta & SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <Wrapper {...{ id, label, error, hint, optional }}>
      <select id={id} className={`${control} appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%23536175%22 stroke-width=%222%22><path d=%22m6 9 6 6 6-6%22/></svg>')] bg-[length:1.25rem] bg-[right_1rem_center] bg-no-repeat pr-11`} {...aria(id, error, hint)} {...props}>
        {children}
      </select>
    </Wrapper>
  );
}

export function TextArea({ id, label, error, hint, optional, ...props }: Meta & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <Wrapper {...{ id, label, error, hint, optional }}>
      <textarea id={id} className={`${control} min-h-32 resize-y`} {...aria(id, error, hint)} {...props} />
    </Wrapper>
  );
}
