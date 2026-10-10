import Image from "next/image";
import Link from "next/link";
import { Clock, Plus } from "lucide-react";
import { formatBRL, formatDuration } from "@demo/core/format";
import { TREATMENT_CATEGORIES, treatments } from "@/data/treatments";
import { buttonClasses, Container, Heading } from "../ui";

export function Treatments() {
  return (
    <section id="tratamentos" aria-labelledby="tratamentos-title" className="py-20 sm:py-28">
      <Container>
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <Heading
            id="tratamentos-title"
            eyebrow="Tratamentos"
            title="Menu de cuidados"
            intro="Duração e valores de referência. Combine até três tratamentos no mesmo atendimento."
          />
          <Link href="/agendar" className={buttonClasses("soft", "self-start md:self-auto")}>
            Montar meu atendimento
          </Link>
        </div>

        {/* Atalhos para as categorias */}
        <nav aria-label="Categorias de tratamento" className="-mx-5 mt-10 overflow-x-auto px-5 sm:mx-0 sm:px-0">
          <ul className="flex gap-2">
            {TREATMENT_CATEGORIES.map((c) => (
              <li key={c.id}>
                <a href={`#cat-${slug(c.id)}`} className="inline-flex min-h-11 items-center rounded-full border border-linen bg-white/60 px-5 text-sm whitespace-nowrap hover:border-moss">
                  {c.id}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-12 space-y-16">
          {TREATMENT_CATEGORIES.map((category, i) => (
            <div key={category.id} id={`cat-${slug(category.id)}`} className={`grid gap-8 md:gap-12 ${i % 2 ? "md:grid-cols-[1fr_16rem]" : "md:grid-cols-[16rem_1fr]"}`}>
              <div className={i % 2 ? "md:order-last" : ""}>
                <Image
                  src={category.image}
                  alt={category.imageAlt}
                  placeholder="blur"
                  sizes="(min-width: 768px) 16rem, 90vw"
                  className="aspect-[4/3] w-full rounded-t-[999px] rounded-b-2xl object-cover md:aspect-[3/4]"
                />
              </div>
              <div>
                <h3 className="font-serif text-3xl text-moss-dark">{category.id}</h3>
                <p className="mt-1 text-mute">{category.intro}</p>
                <ul className="mt-6 divide-y divide-linen border-y border-linen">
                  {treatments
                    .filter((t) => t.category === category.id)
                    .map((t) => (
                      <li key={t.id} className="flex flex-col gap-3 py-5 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
                        <div>
                          <p className="font-semibold text-ink">{t.name}</p>
                          <p className="mt-0.5 text-sm text-mute">{t.description}</p>
                        </div>
                        <div className="flex shrink-0 items-center justify-between gap-5 sm:justify-end">
                          <span className="flex items-center gap-1.5 text-sm text-mute">
                            <Clock aria-hidden className="h-4 w-4" /> {formatDuration(t.durationMin)}
                          </span>
                          <span className="min-w-24 text-right font-serif text-xl text-moss-dark">
                            {t.priceFrom && <span className="font-sans text-xs text-mute">a partir de </span>}
                            {formatBRL(t.price)}
                          </span>
                          <Link
                            href={`/agendar?tratamento=${t.id}`}
                            aria-label={`Agendar ${t.name}`}
                            className="flex h-11 w-11 items-center justify-center rounded-full border border-moss/30 text-moss hover:bg-moss hover:text-cream"
                          >
                            <Plus aria-hidden className="h-5 w-5" />
                          </Link>
                        </div>
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

const slug = (s: string) =>
  s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z]+/g, "-");
