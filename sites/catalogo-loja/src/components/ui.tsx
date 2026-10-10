import type { ReactNode } from "react";

type Variant = "solid" | "outline" | "whatsapp" | "text";

const base =
  "inline-flex min-h-12 items-center justify-center gap-2 px-7 text-xs font-medium uppercase tracking-[0.18em] transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-50";

const variants: Record<Variant, string> = {
  solid: "bg-ink text-shell hover:bg-clay-dark",
  outline: "border border-ink text-ink hover:bg-ink hover:text-shell",
  whatsapp: "bg-leaf text-white hover:bg-[#245740]",
  text: "px-0! text-ink underline underline-offset-8 decoration-sand hover:decoration-clay",
};

export const buttonClasses = (variant: Variant = "solid", extra = "") => `${base} ${variants[variant]} ${extra}`;

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-7xl px-5 sm:px-8 ${className}`}>{children}</div>;
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="text-[11px] font-medium uppercase tracking-[0.32em] text-clay">{children}</p>;
}

export function SectionTitle({ id, eyebrow, children, className = "" }: { id?: string; eyebrow?: string; children: ReactNode; className?: string }) {
  return (
    <div className={className}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2 id={id} className="mt-3 font-serif text-4xl leading-tight sm:text-5xl">
        {children}
      </h2>
    </div>
  );
}
