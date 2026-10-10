import { Quote } from "lucide-react";
import { testimonials } from "@/data/content";
import { Container, SectionHeading } from "../ui";

export function Testimonials() {
  return (
    <section aria-labelledby="depoimentos-title" className="bg-paper py-20 sm:py-28">
      <Container>
        <SectionHeading
          id="depoimentos-title"
          center
          eyebrow="Depoimentos"
          title="Quem chamou, recomenda"
          intro="Depoimentos fictícios, escritos para ilustrar esta demonstração."
        />
        <ul className="mt-12 grid gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <li key={t.author} className="flex flex-col rounded-2xl bg-white p-7 ring-1 ring-line">
              <Quote aria-hidden className="h-8 w-8 text-sun" />
              <p className="mt-4 flex-1 leading-relaxed">{t.text}</p>
              <p className="mt-6 border-t border-line pt-4">
                <span className="block font-bold">{t.author}</span>
                <span className="text-sm text-muted">{t.region} · depoimento ilustrativo</span>
              </p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
