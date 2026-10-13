import type { ReactNode } from "react";

type Variant = "primary" | "dark" | "outline" | "whatsapp" | "ghost";

const base =
  "inline-flex min-h-12 items-center justify-center gap-2 whitespace-nowrap rounded-lg px-5 text-sm font-semibold transition-colors duration-150 disabled:cursor-not-allowed disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary: "bg-wine text-white hover:bg-wine-dark",
  dark: "bg-ink text-white hover:bg-graphite",
  outline: "border border-ink/20 bg-surface text-ink hover:border-ink",
  whatsapp: "bg-[#1a7f4b] text-white hover:bg-[#146a3e]",
  ghost: "text-ink hover:bg-ink/5",
};

export const buttonClasses = (variant: Variant = "primary", extra = "") => `${base} ${variants[variant]} ${extra}`;

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>;
}

export function SectionHeader({
  id,
  eyebrow,
  title,
  description,
  action,
}: {
  id: string;
  eyebrow?: string;
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
      <div className="max-w-2xl">
        {eyebrow && <p className="text-xs font-semibold tracking-[0.18em] text-wine uppercase">{eyebrow}</p>}
        <h2 id={id} className="font-display mt-2 text-3xl font-bold text-balance sm:text-4xl">
          {title}
        </h2>
        {description && <p className="mt-3 text-steel">{description}</p>}
      </div>
      {action}
    </div>
  );
}
