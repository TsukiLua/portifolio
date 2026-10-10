import { Quote, Star } from "lucide-react";
import { reviews } from "@/data/content";
import { Container, SectionHeading } from "../ui";

export function Reviews() {
  return (
    <section id="avaliacoes" aria-labelledby="avaliacoes-title" className="py-24 sm:py-32">
      <Container>
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading id="avaliacoes-title" eyebrow="Avaliações" title="O que dizem na cadeira" />
          <p className="max-w-xs border-l-2 border-ember pl-4 text-sm text-ash">
            Depoimentos ilustrativos, escritos para esta demonstração. Não são de clientes reais.
          </p>
        </div>
        <ul className="mt-14 grid gap-6 md:grid-cols-3">
          {reviews.map((review) => (
            <li key={review.author} className="flex flex-col border border-smoke bg-char p-7">
              <Quote aria-hidden className="h-7 w-7 text-ember" />
              <p className="mt-5 flex-1 text-lg leading-relaxed text-bone/90">“{review.text}”</p>
              <div className="mt-8 flex items-end justify-between gap-4 border-t border-smoke pt-5">
                <div>
                  <p className="font-bold">{review.author}</p>
                  <p className="text-sm text-ash">{review.service}</p>
                </div>
                <p className="flex gap-0.5 text-ember" aria-label="Nota 5 de 5">
                  {Array.from({ length: 5 }, (_, i) => (
                    <Star key={i} aria-hidden className="h-4 w-4 fill-current" />
                  ))}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
