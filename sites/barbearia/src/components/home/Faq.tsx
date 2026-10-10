import { Plus } from "lucide-react";
import { faq } from "@/data/content";
import { Container, SectionHeading } from "../ui";

export function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="border-t border-smoke py-24 sm:py-32">
      <Container className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <SectionHeading
          id="faq-title"
          eyebrow="Dúvidas"
          title="Perguntas frequentes"
          intro="Não achou o que procurava? Chame no WhatsApp que a gente responde."
        />
        <div className="divide-y divide-smoke border-y border-smoke">
          {faq.map((item) => (
            <details key={item.q} className="group">
              <summary className="flex min-h-14 cursor-pointer items-center justify-between gap-6 py-5 text-lg font-bold hover:text-ember">
                {item.q}
                <Plus aria-hidden className="h-5 w-5 shrink-0 text-ember transition-transform group-open:rotate-45" />
              </summary>
              <p className="max-w-2xl pb-6 leading-relaxed text-ash">{item.a}</p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}
