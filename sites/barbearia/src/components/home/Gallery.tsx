import Image from "next/image";
import { gallery } from "@/data/content";
import { business } from "@/data/business";
import { InstagramIcon } from "../icons";
import { Container, SectionHeading } from "../ui";

export function Gallery() {
  return (
    <section id="galeria" aria-labelledby="galeria-title" className="border-t border-smoke py-24 sm:py-32">
      <Container>
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading id="galeria-title" eyebrow="Galeria" title="Trabalhos recentes" />
          <a
            href={business.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center gap-2 text-sm text-ash hover:text-bone"
          >
            <InstagramIcon />
            {business.instagramHandle}
          </a>
        </div>
        <ul className="mt-14 grid grid-cols-2 gap-3 md:grid-cols-3">
          {gallery.map((item, index) => (
            <li
              key={item.caption}
              className={
                index === 0 ? "col-span-2 md:row-span-2" : index === gallery.length - 1 ? "col-span-2 md:col-span-1" : ""
              }
            >
              <figure className="group relative h-full overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.alt}
                  placeholder="blur"
                  sizes={index === 0 ? "(min-width: 768px) 66vw, 100vw" : "(min-width: 768px) 33vw, 50vw"}
                  className={`h-full w-full object-cover transition duration-500 group-hover:scale-105 ${
                    index === gallery.length - 1 ? "aspect-[2/1] md:aspect-square" : "aspect-square"
                  }`}
                />
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-coal/95 to-transparent px-4 pt-10 pb-3 text-sm font-bold text-bone">
                  {item.caption}
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
