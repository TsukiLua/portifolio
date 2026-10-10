import Image from "next/image";
import { ArrowRight, Check, Drill, Droplets, Grid3x3, PaintRoller, Snowflake, Zap, type LucideIcon } from "lucide-react";
import { formatBRL } from "@demo/core/format";
import { homeServices, type ServiceIcon } from "@/data/services";
import { RequestServiceLink } from "../RequestServiceLink";
import { Container, SectionHeading } from "../ui";

const ICONS: Record<ServiceIcon, LucideIcon> = {
  zap: Zap,
  droplets: Droplets,
  paint: PaintRoller,
  drill: Drill,
  snowflake: Snowflake,
  grid: Grid3x3,
};

export function Services() {
  return (
    <section id="servicos" aria-labelledby="servicos-title" className="py-20 sm:py-28">
      <Container>
        <SectionHeading
          id="servicos-title"
          eyebrow="Serviços"
          title="Tudo o que a sua casa pede, com um só contato"
          intro="Valores de referência para mão de obra. O preço final sai no orçamento, sem surpresa depois."
        />
        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {homeServices.map((service) => {
            const Icon = ICONS[service.icon];
            return (
              <li key={service.id} className="flex flex-col overflow-hidden rounded-2xl bg-white ring-1 ring-line transition-shadow hover:shadow-xl hover:shadow-ink/5">
                <div className="relative">
                  <Image
                    src={service.image}
                    alt={service.imageAlt}
                    placeholder="blur"
                    sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
                    className="aspect-[3/2] w-full object-cover"
                  />
                  <span className="absolute -bottom-6 left-6 flex h-12 w-12 items-center justify-center rounded-xl bg-brand text-white shadow-lg ring-4 ring-white">
                    <Icon aria-hidden className="h-6 w-6" />
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6 pt-10">
                  <h3 className="text-xl font-extrabold">{service.name}</h3>
                  <p className="mt-2 text-muted">{service.summary}</p>
                  <ul className="mt-4 space-y-1.5 text-sm">
                    {service.examples.map((e) => (
                      <li key={e} className="flex items-center gap-2">
                        <Check aria-hidden className="h-4 w-4 shrink-0 text-ok" />
                        {e}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto flex items-end justify-between gap-4 pt-6">
                    <p className="text-sm text-muted">
                      a partir de
                      <span className="block text-xl font-extrabold text-ink">{formatBRL(service.fromPrice)}</span>
                    </p>
                    <RequestServiceLink
                      serviceId={service.id}
                      className="inline-flex min-h-11 items-center gap-1.5 rounded-lg px-2 font-bold text-brand hover:bg-brand-soft"
                    >
                      Orçamento <span className="sr-only">de {service.name.toLowerCase()}</span>
                      <ArrowRight aria-hidden className="h-4 w-4" />
                    </RequestServiceLink>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
