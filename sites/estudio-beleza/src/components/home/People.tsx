import Image from "next/image";
import Link from "next/link";
import { gallery } from "@/data/content";
import { professionals } from "@/data/team";
import { getTreatment } from "@/data/treatments";
import { Container, Heading } from "../ui";

export function Team() {
  return (
    <section id="equipe" aria-labelledby="equipe-title" className="bg-sage-soft/60 py-20 sm:py-28">
      <Container>
        <Heading id="equipe-title" center eyebrow="Equipe" title="Mãos que cuidam" intro="Cada profissional atende sua especialidade, com agenda própria." />
        <ul className="mt-14 grid gap-10 md:grid-cols-3">
          {professionals.map((p) => (
            <li key={p.id} className="text-center">
              <Image
                src={p.photo}
                alt={p.photoAlt}
                placeholder="blur"
                sizes="(min-width: 768px) 28vw, 70vw"
                className="mx-auto aspect-[4/5] w-full max-w-xs rounded-t-[999px] rounded-b-2xl object-cover"
              />
              <h3 className="mt-6 font-serif text-2xl text-moss-dark">{p.name}</h3>
              <p className="text-sm font-semibold text-clay">{p.role}</p>
              <p className="mx-auto mt-3 max-w-xs text-mute">{p.bio}</p>
              <p className="mx-auto mt-3 max-w-xs text-xs text-mute">
                Atende: {p.treatmentIds.map((id) => getTreatment(id)?.name).filter(Boolean).join(", ")}
              </p>
              <Link href={`/agendar?profissional=${p.id}`} className="mt-4 inline-flex min-h-11 items-center text-sm font-semibold text-moss underline decoration-sage underline-offset-4 hover:decoration-moss">
                Agendar com {p.name.split(" ")[0]}
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-10 text-center text-xs text-mute">Fotos de banco de imagens; nomes e perfis fictícios.</p>
      </Container>
    </section>
  );
}

export function Gallery() {
  return (
    <section id="galeria" aria-labelledby="galeria-title" className="py-20 sm:py-28">
      <Container>
        <Heading id="galeria-title" eyebrow="Galeria" title="Detalhes do dia a dia" intro="Imagens ilustrativas de banco de imagens." />
        <ul className="mt-12 columns-2 gap-4 md:columns-3">
          {gallery.map((item, i) => (
            <li key={item.caption} className="mb-4 break-inside-avoid">
              <figure>
                <Image
                  src={item.image}
                  alt={item.alt}
                  placeholder="blur"
                  sizes="(min-width: 768px) 32vw, 46vw"
                  className={`w-full rounded-2xl object-cover ${i % 3 === 0 ? "aspect-[3/4]" : "aspect-square"}`}
                />
                <figcaption className="mt-2 text-sm text-mute">{item.caption}</figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
