import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { barbers } from "@/data/team";
import { Container, SectionHeading } from "../ui";

export function Team() {
  return (
    <section id="equipe" aria-labelledby="equipe-title" className="py-24 sm:py-32">
      <Container>
        <SectionHeading
          id="equipe-title"
          eyebrow="Equipe"
          title="Quem segura a navalha"
          intro="Três barbeiros, três especialidades. Agende com quem você já conhece ou deixe a gente indicar."
        />
        <ul className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {barbers.map((barber) => (
            <li key={barber.id} className="group">
              <div className="relative overflow-hidden">
                <Image
                  src={barber.photo}
                  alt={barber.photoAlt}
                  placeholder="blur"
                  sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
                  className="aspect-[4/5] w-full object-cover grayscale transition duration-500 group-hover:scale-[1.03] group-hover:grayscale-0"
                />
                <div aria-hidden className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-coal/90 to-transparent" />
              </div>
              <h3 className="mt-6 font-display text-3xl font-bold uppercase">{barber.name}</h3>
              <p className="text-sm font-bold uppercase tracking-[0.14em] text-ember">{barber.role}</p>
              <p className="mt-3 leading-relaxed text-ash">{barber.bio}</p>
              <ul className="mt-4 flex flex-wrap gap-2" aria-label={`Especialidades de ${barber.name}`}>
                {barber.specialties.map((s) => (
                  <li key={s} className="border border-smoke px-2.5 py-1 text-xs text-bone/80">
                    {s}
                  </li>
                ))}
              </ul>
              <Link
                href={`/agendar?barbeiro=${barber.id}`}
                className="mt-6 inline-flex min-h-11 items-center gap-2 text-sm font-bold uppercase tracking-[0.12em] text-bone underline decoration-ember decoration-2 underline-offset-8 hover:text-ember"
              >
                Agendar com {barber.name.split(" ")[0]}
                <ArrowUpRight aria-hidden className="h-4 w-4" />
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
