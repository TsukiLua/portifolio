import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { formatBRL, formatDuration } from "@demo/core/format";
import { SERVICE_CATEGORIES, services } from "@/data/services";
import { buttonClasses, Container, SectionHeading } from "../ui";

export function Services() {
  return (
    <section id="servicos" aria-labelledby="servicos-title" className="grain border-y border-smoke bg-char py-24 sm:py-32">
      <Container>
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            id="servicos-title"
            eyebrow="Serviços e preços"
            title="O cardápio da casa"
            intro="Valores fixos, sem surpresa no caixa. Escolha um serviço para ir direto ao agendamento."
          />
          <Link href="/agendar" className={buttonClasses("outline", "self-start lg:self-auto")}>
            Agendar agora
          </Link>
        </div>

        <div className="mt-16 grid gap-x-16 gap-y-14 lg:grid-cols-2">
          {SERVICE_CATEGORIES.map((category) => (
            <div key={category}>
              <h3 className="mb-6 border-b border-ember/60 pb-3 font-display text-2xl font-bold uppercase tracking-[0.12em] text-ember">
                {category}
              </h3>
              <ul className="space-y-1">
                {services
                  .filter((service) => service.category === category)
                  .map((service) => (
                    <li key={service.id}>
                      <Link
                        href={`/agendar?servico=${service.id}`}
                        className="group -mx-3 block px-3 py-4 transition-colors hover:bg-smoke/60"
                        aria-label={`Agendar ${service.name}, ${formatBRL(service.price)}, ${formatDuration(service.durationMin)}`}
                      >
                        <span className="flex items-baseline gap-3">
                          <span className="font-bold text-bone">{service.name}</span>
                          {service.popular && (
                            <span className="border border-ember/50 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-ember">
                              Mais pedido
                            </span>
                          )}
                          <span aria-hidden className="leader" />
                          <span className="font-display text-2xl font-bold text-bone">{formatBRL(service.price)}</span>
                        </span>
                        <span className="mt-1 flex items-start justify-between gap-6 text-sm text-ash">
                          <span className="max-w-md leading-relaxed">{service.description}</span>
                          <span className="flex shrink-0 items-center gap-1.5 whitespace-nowrap">
                            {formatDuration(service.durationMin)}
                            <ArrowRight
                              aria-hidden
                              className="h-4 w-4 text-ember transition-transform group-hover:translate-x-1"
                            />
                          </span>
                        </span>
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
