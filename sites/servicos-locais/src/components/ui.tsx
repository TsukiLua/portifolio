import type { ReactNode } from "react";

type Variant = "primary" | "sun" | "whatsapp" | "outline" | "light";

const base =
  "inline-flex min-h-12 items-center whitespace-nowrap justify-center gap-2 rounded-xl px-6 text-[15px] font-bold transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-60";

const variants: Record<Variant, string> = {
  primary: "bg-brand text-white hover:bg-brand-dark",
  sun: "bg-sun text-ink hover:bg-[#ffb000]",
  whatsapp: "bg-[#157347] text-white hover:bg-[#0f5c38]",
  outline: "border-2 border-line bg-white text-ink hover:border-brand hover:text-brand",
  light: "bg-white text-brand-dark hover:bg-brand-soft",
};

export const buttonClasses = (variant: Variant = "primary", extra = "") => `${base} ${variants[variant]} ${extra}`;

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-6xl px-5 sm:px-8 ${className}`}>{children}</div>;
}

export function SectionHeading({
  id,
  eyebrow,
  title,
  intro,
  center,
  invert,
}: {
  id: string;
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  center?: boolean;
  invert?: boolean;
}) {
  return (
    <div className={`max-w-2xl ${center ? "mx-auto text-center" : ""}`}>
      <p className={`text-sm font-bold ${invert ? "text-sun" : "text-brand"}`}>{eyebrow}</p>
      <h2 id={id} className={`mt-2 text-3xl font-extrabold tracking-tight text-balance sm:text-4xl ${invert ? "text-white" : ""}`}>
        {title}
      </h2>
      {intro && <p className={`mt-4 text-lg leading-relaxed ${invert ? "text-white/80" : "text-muted"}`}>{intro}</p>}
    </div>
  );
}
