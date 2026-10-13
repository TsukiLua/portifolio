import Image from "next/image";
import { Blocks, Building2, Check, LayoutGrid, MapPin, Target, type LucideIcon } from "lucide-react";
import { profile } from "@/data/profile";
import { processSteps, services, servicesNote, type ServiceIcon } from "@/data/services";
import { Monogram } from "../layout/Header";
import { Container, Em, Label, SectionHeading } from "../ui/primitives";

const ICONS: Record<ServiceIcon, LucideIcon> = { building: Building2, target: Target, grid: LayoutGrid, puzzle: Blocks };

export function ServicesSection() {
  return (
    <section id="servicos" aria-labelledby="servicos-titulo" className="scroll-mt-16 border-y border-ink/10 bg-paper py-20 sm:py-28">
      <Container>
        <SectionHeading
          id="servicos-titulo"
          label="02 — Serviços"
          title={
            <>
              O que posso <Em>construir</Em> para você
            </>
          }
        />
        <ul className="mt-12 grid gap-px overflow-hidden rounded-3xl border border-ink/10 bg-ink/10 md:grid-cols-2">
          {services.map((s) => {
            const Icon = ICONS[s.icon];
            return (
              <li key={s.id} className="bg-paper p-7 sm:p-9">
                <Icon aria-hidden className="h-6 w-6 text-accent" />
                <h3 className="mt-5 text-xl font-semibold">{s.title}</h3>
                <p className="mt-2 text-mute">{s.description}</p>
                <ul className="mt-5 space-y-2 text-sm">
                  {s.items.map((item) => (
                    <li key={item} className="flex gap-2">
                      <Check aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                      {item}
                    </li>
                  ))}
                </ul>
              </li>
            );
          })}
        </ul>
        <p className="mt-6 max-w-3xl text-sm text-mute">{servicesNote}</p>
      </Container>
    </section>
  );
}

export function ProcessSection() {
  return (
    <section id="processo" aria-labelledby="processo-titulo" className="scroll-mt-16 py-20 sm:py-28">
      <Container>
        <SectionHeading
          id="processo-titulo"
          label="03 — Como funciona"
          title={
            <>
              Do primeiro contato ao <Em>site no ar</Em>
            </>
          }
          intro="Um processo simples, combinado desde o início, para você saber o que acontece em cada etapa."
        />
        <ol className="mt-12 grid gap-6 md:grid-cols-5 md:gap-4">
          {processSteps.map((step, i) => (
            <li key={step.title} className="relative border-t-2 border-ink pt-5 md:border-t">
              <span className="font-mono text-sm text-accent">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-2 text-lg font-semibold">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-mute">{step.text}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}

const commitments = [
  "Escopo, prazo e valor combinados por escrito antes de começar.",
  "Prévias durante o desenvolvimento, não só no final.",
  "Sites responsivos, acessíveis e rápidos de carregar.",
  "Entrega documentada, com orientação para atualizar o conteúdo.",
];

export function AboutSection() {
  return (
    <section id="sobre" aria-labelledby="sobre-titulo" className="scroll-mt-16 border-y border-ink/10 bg-paper py-20 sm:py-28">
      <Container className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div>
          <Label>04 — Sobre</Label>
          <div className="mt-6 flex items-center gap-5">
            {profile.photo ? (
              <Image src={profile.photo} alt={`Foto de ${profile.name}`} sizes="96px" className="h-24 w-24 rounded-2xl object-cover" />
            ) : (
              <Monogram className="h-24 w-24 rounded-2xl text-2xl" />
            )}
            <div>
              <h2 id="sobre-titulo" className="text-3xl font-semibold tracking-tight">
                {profile.name}
              </h2>
              <p className="text-mute">{profile.role}</p>
              {profile.location && (
                <p className="mt-1 flex items-center gap-1.5 text-sm text-mute">
                  <MapPin aria-hidden className="h-4 w-4" /> {profile.location}
                </p>
              )}
            </div>
          </div>
          {profile.facts.length > 0 && (
            <dl className="mt-8 divide-y divide-ink/10 border-y border-ink/10 text-sm">
              {profile.facts.map((f) => (
                <div key={f.label} className="flex justify-between gap-4 py-3">
                  <dt className="text-mute">{f.label}</dt>
                  <dd className="text-right font-medium">{f.value}</dd>
                </div>
              ))}
            </dl>
          )}
        </div>
        <div>
          {profile.about.map((p) => (
            <p key={p} className="mb-5 text-xl leading-relaxed text-graphite">
              {p}
            </p>
          ))}
          <h3 className="mt-10 font-mono text-xs tracking-wider text-mute uppercase">O que você pode esperar</h3>
          <ul className="mt-4 space-y-3">
            {commitments.map((c) => (
              <li key={c} className="flex gap-3">
                <Check aria-hidden className="mt-1 h-4 w-4 shrink-0 text-accent" />
                {c}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
