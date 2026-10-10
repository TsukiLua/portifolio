import Image from "next/image";
import { BadgeCheck, ReceiptText, ShieldCheck, Sparkles, type LucideIcon } from "lucide-react";
import sobre from "@/assets/sobre.jpg";
import { benefits } from "@/data/content";
import { Container, SectionHeading } from "../ui";

const ICONS: Record<(typeof benefits)[number]["icon"], LucideIcon> = {
  badge: BadgeCheck,
  receipt: ReceiptText,
  shield: ShieldCheck,
  sparkles: Sparkles,
};

export function Benefits() {
  return (
    <section aria-labelledby="diferenciais-title" className="bg-brand-dark py-20 text-white sm:py-28">
      <Container className="grid items-center gap-12 lg:grid-cols-[1fr_1.2fr]">
        <Image
          src={sobre}
          alt="Profissional com protetor auricular usando parafusadeira em parede de madeira"
          placeholder="blur"
          sizes="(min-width: 1024px) 40vw, 90vw"
          className="mx-auto aspect-[4/5] w-full max-w-md rounded-3xl object-cover"
        />
        <div>
          <SectionHeading
            id="diferenciais-title"
            invert
            eyebrow="Por que a Casa em Dia"
            title="Gente de confiança dentro da sua casa"
            intro="Somos uma equipe pequena e própria, sem intermediários. Quem faz o orçamento é quem responde pelo resultado."
          />
          <ul className="mt-10 grid gap-6 sm:grid-cols-2">
            {benefits.map(({ icon, title, text }) => {
              const Icon = ICONS[icon];
              return (
                <li key={title} className="rounded-2xl bg-white/[0.07] p-5 ring-1 ring-white/10">
                  <Icon aria-hidden className="h-7 w-7 text-sun" />
                  <h3 className="mt-3 text-lg font-bold">{title}</h3>
                  <p className="mt-1 text-white/75">{text}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </Container>
    </section>
  );
}
