import type { ReactNode } from "react";

type Variant = "primary" | "soft" | "outline" | "whatsapp";

const base =
  "inline-flex min-h-12 items-center justify-center gap-2 whitespace-nowrap rounded-full px-7 text-[15px] font-semibold transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary: "bg-moss text-cream hover:bg-moss-dark",
  soft: "bg-sage-soft text-moss-dark hover:bg-sage/50",
  outline: "border border-moss/40 text-moss-dark hover:border-moss hover:bg-moss hover:text-cream",
  whatsapp: "bg-[#1f7a4d] text-white hover:bg-[#17633e]",
};

export const buttonClasses = (variant: Variant = "primary", extra = "") => `${base} ${variants[variant]} ${extra}`;

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-6xl px-5 sm:px-8 ${className}`}>{children}</div>;
}

export function Heading({ id, eyebrow, title, intro, center }: { id: string; eyebrow: string; title: ReactNode; intro?: ReactNode; center?: boolean }) {
  return (
    <div className={`max-w-2xl ${center ? "mx-auto text-center" : ""}`}>
      <p className="font-serif text-lg text-clay italic">{eyebrow}</p>
      <h2 id={id} className="mt-2 font-serif text-4xl leading-[1.1] font-medium text-balance sm:text-5xl">
        {title}
      </h2>
      {intro && <p className="mt-5 text-lg leading-relaxed text-mute">{intro}</p>}
    </div>
  );
}
