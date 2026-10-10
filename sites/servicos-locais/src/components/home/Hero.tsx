import Image from "next/image";
import Link from "next/link";
import { BadgeCheck, Clock3, MessageCircle, ShieldCheck, Users } from "lucide-react";
import hero from "@/assets/hero.jpg";
import { serviceWhatsAppUrl } from "@/lib/contact";
import { buttonClasses, Container } from "../ui";

const trust = ["Orçamento sem compromisso", "Profissionais identificados", "Garantia de 90 dias"];

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="overflow-hidden bg-gradient-to-b from-brand-soft/70 to-white">
      <Container className="grid items-center gap-12 py-14 sm:py-20 lg:grid-cols-[1.05fr_1fr] lg:py-24">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-sm font-semibold text-brand-dark shadow-sm ring-1 ring-line">
            <Clock3 aria-hidden className="h-4 w-4 text-brand" />
            Resposta em até 2 horas úteis
          </p>
          <h1 id="hero-title" className="mt-6 text-4xl font-extrabold leading-[1.08] tracking-tight text-balance sm:text-5xl lg:text-6xl">
            Aquele reparo que você adia, <span className="text-brand">resolvido esta semana.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
            Elétrica, hidráulica, pintura, montagem e ar-condicionado com preço fechado antes de começar e uma equipe
            que deixa a casa limpa ao sair.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/#orcamento" className={buttonClasses("primary", "text-base")}>
              Pedir orçamento grátis
            </Link>
            <a href={serviceWhatsAppUrl()} target="_blank" rel="noopener noreferrer" className={buttonClasses("whatsapp", "text-base")}>
              <MessageCircle aria-hidden className="h-5 w-5" />
              Chamar no WhatsApp
            </a>
          </div>
          <ul className="mt-8 flex flex-col gap-x-6 gap-y-2 text-sm font-semibold sm:flex-row sm:flex-wrap">
            {trust.map((t) => (
              <li key={t} className="flex items-center gap-2">
                <BadgeCheck aria-hidden className="h-5 w-5 text-ok" />
                {t}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
          <Image
            src={hero}
            alt="Profissional de boné e luvas cortando peça sobre bancada com nível e ferramentas"
            priority
            placeholder="blur"
            sizes="(min-width: 1024px) 45vw, 90vw"
            className="aspect-square w-full rounded-3xl object-cover shadow-2xl shadow-brand-dark/15"
          />
          <div className="absolute -bottom-5 -left-3 flex items-center gap-3 rounded-2xl bg-white p-4 shadow-xl shadow-ink/10 ring-1 ring-line sm:-left-6">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-sun text-ink">
              <ShieldCheck aria-hidden className="h-6 w-6" />
            </span>
            <span className="text-sm leading-tight">
              <span className="block font-extrabold">90 dias de garantia</span>
              <span className="text-muted">em toda mão de obra</span>
            </span>
          </div>
          <div className="absolute -top-4 -right-2 hidden items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-xl shadow-ink/10 ring-1 ring-line sm:flex">
            <Users aria-hidden className="h-5 w-5 text-brand" />
            <span className="text-sm font-bold">Equipe própria, sem terceirizados</span>
          </div>
        </div>
      </Container>
    </section>
  );
}
