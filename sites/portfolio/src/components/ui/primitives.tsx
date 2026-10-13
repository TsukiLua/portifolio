import type { ReactNode } from "react";

type Variant = "primary" | "dark" | "outline" | "ghost";

const base =
  "inline-flex min-h-12 items-center justify-center gap-2 whitespace-nowrap rounded-full px-6 text-[15px] font-medium transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary: "bg-accent text-white hover:bg-accent-dark",
  dark: "bg-ink text-white hover:bg-graphite",
  outline: "border border-ink/20 bg-paper text-ink hover:border-ink",
  ghost: "text-ink hover:bg-ink/5",
};

export const buttonClasses = (variant: Variant = "primary", extra = "") => `${base} ${variants[variant]} ${extra}`;

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-6xl px-5 sm:px-8 ${className}`}>{children}</div>;
}

/** Rótulo técnico em fonte mono, usado como "olho" das seções. */
export function Label({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <p className={`font-mono text-xs tracking-wider text-mute uppercase ${className}`}>{children}</p>;
}

export function SectionHeading({ id, label, title, intro }: { id: string; label: string; title: ReactNode; intro?: ReactNode }) {
  return (
    <div className="max-w-2xl">
      <Label>{label}</Label>
      <h2 id={id} className="mt-3 text-4xl leading-[1.05] font-semibold tracking-tight text-balance sm:text-5xl">
        {title}
      </h2>
      {intro && <p className="mt-5 text-lg leading-relaxed text-mute">{intro}</p>}
    </div>
  );
}

/** Ênfase editorial em serifa itálica. */
export const Em = ({ children }: { children: ReactNode }) => <em className="font-serif font-normal text-accent italic">{children}</em>;
