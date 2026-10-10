import Image from "next/image";
import { works } from "@/data/content";
import { Container, SectionHeading } from "../ui";

export function Works() {
  return (
    <section id="trabalhos" aria-labelledby="trabalhos-title" className="bg-paper py-20 sm:py-28">
      <Container>
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <SectionHeading id="trabalhos-title" eyebrow="Trabalhos" title="Antes era problema. Agora é casa." />
          <p className="text-sm text-muted">Imagens ilustrativas de banco de imagens.</p>
        </div>
        <ul className="mt-12 grid auto-rows-[14rem] grid-cols-2 gap-4 md:grid-cols-4 md:auto-rows-[16rem]">
          {works.map((work, i) => (
            <li
              key={work.title}
              className={`group relative overflow-hidden rounded-2xl ${i === 0 ? "col-span-2 row-span-2" : ""}`}
            >
              <Image
                src={work.image}
                alt={work.alt}
                placeholder="blur"
                fill
                sizes={i === 0 ? "(min-width: 768px) 50vw, 100vw" : "(min-width: 768px) 25vw, 50vw"}
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/85 to-transparent p-4 pt-12 text-white">
                <span className="rounded-md bg-sun px-2 py-0.5 text-xs font-bold text-ink">{work.tag}</span>
                <p className="mt-2 font-bold leading-tight">{work.title}</p>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
