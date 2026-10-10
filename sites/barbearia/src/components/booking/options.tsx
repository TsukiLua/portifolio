import type { ReactNode } from "react";

/** Cartão de opção baseado em <input type="radio"> nativo: teclado e leitores de tela funcionam sem JS extra. */
export function RadioCard({
  name,
  value,
  checked,
  onChange,
  disabled,
  children,
  className = "",
}: {
  name: string;
  value: string;
  checked: boolean;
  onChange: (value: string) => void;
  disabled?: boolean;
  children: ReactNode;
  className?: string;
}) {
  return (
    <label
      className={`relative block cursor-pointer border border-smoke bg-char transition-colors hover:border-ash/60 has-checked:border-ember has-checked:bg-ember/10 has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-ember has-disabled:cursor-not-allowed has-disabled:opacity-45 has-disabled:hover:border-smoke ${className}`}
    >
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        disabled={disabled}
        onChange={() => onChange(value)}
        className="sr-only"
      />
      {children}
    </label>
  );
}

export function StepHeading({ title, description, headingRef }: { title: string; description?: string; headingRef: React.Ref<HTMLHeadingElement> }) {
  return (
    <div className="mb-8">
      <h2 ref={headingRef} tabIndex={-1} className="font-display text-4xl font-bold uppercase focus:outline-none sm:text-5xl">
        {title}
      </h2>
      {description && <p className="mt-2 text-ash">{description}</p>}
    </div>
  );
}
