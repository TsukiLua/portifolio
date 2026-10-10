import { Info, MapPin, MessageCircle } from "lucide-react";
import { regions } from "@/data/business";
import { whatsappUrl } from "@/lib/contact";
import { business } from "@/data/business";
import { Container, SectionHeading } from "../ui";

export function Regions() {
  return (
    <section id="regioes" aria-labelledby="regioes-title" className="py-20 sm:py-28">
      <Container className="grid gap-12 lg:grid-cols-2 lg:items-center">
        <div>
          <SectionHeading
            id="regioes-title"
            eyebrow="Regiões atendidas"
            title="Atendemos perto de você"
            intro="Equipes saem todos os dias para os bairros abaixo, o que garante pontualidade e deslocamento sem custo extra."
          />
          <p className="mt-6 flex gap-2 rounded-xl bg-brand-soft p-4 text-sm text-brand-dark">
            <Info aria-hidden className="mt-0.5 h-4 w-4 shrink-0" />
            Bairros fictícios, criados para esta demonstração.
          </p>
          <a
            href={whatsappUrl(`Olá, ${business.name}! Vocês atendem no meu bairro? Moro em: `)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex min-h-11 items-center gap-2 font-bold text-brand hover:underline"
          >
            <MessageCircle aria-hidden className="h-5 w-5" />
            Não achou seu bairro? Pergunte no WhatsApp
          </a>
        </div>
        <ul className="grid grid-cols-2 gap-3">
          {regions.map((region) => (
            <li key={region.id} className="flex items-center gap-3 rounded-xl bg-white p-4 font-semibold ring-1 ring-line">
              <MapPin aria-hidden className="h-5 w-5 shrink-0 text-brand" />
              {region.name}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
