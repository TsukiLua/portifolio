import type { ReactNode } from "react";

type ButtonVariant = "primary" | "outline" | "ghost";

const base =
  "inline-flex items-center justify-center gap-2 min-h-12 px-6 text-sm font-bold uppercase tracking-[0.12em] transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-40";

const variants: Record<ButtonVariant, string> = {
  primary: "bg-ember text-coal hover:bg-ember-soft",
  outline: "border border-bone/30 text-bone hover:border-ember hover:text-ember",
  ghost: "text-ash hover:text-bone",
};

export function buttonClasses(variant: ButtonVariant = "primary", extra = "") {
  return `${base} ${variants[variant]} ${extra}`;
}

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-6xl px-5 sm:px-8 ${className}`}>{children}</div>;
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  id,
}: {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  id?: string;
}) {
  return (
    <div className="max-w-2xl">
      <p className="mb-3 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.3em] text-ember">
        <span aria-hidden className="h-px w-8 bg-ember" />
        {eyebrow}
      </p>
      <h2 id={id} className="font-display text-5xl font-extrabold uppercase leading-[0.95] sm:text-6xl">
        {title}
      </h2>
      {intro && <p className="mt-5 text-base leading-relaxed text-ash sm:text-lg">{intro}</p>}
    </div>
  );
}
