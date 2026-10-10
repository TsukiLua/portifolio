import { Clock3, Mail, MessageCircle, Phone } from "lucide-react";
import { business } from "@/data/business";
import { serviceWhatsAppUrl } from "@/lib/contact";
import { Container } from "../ui";
import { QuoteForm } from "./QuoteForm";

export function QuoteSection() {
  return (
    <section id="orcamento" aria-labelledby="orcamento-title" className="relative overflow-hidden bg-brand py-20 text-white sm:py-28">
      <div aria-hidden className="absolute -top-24 -right-24 h-80 w-80 rounded-full bg-white/5" />
      <div aria-hidden className="absolute -bottom-32 -left-20 h-96 w-96 rounded-full bg-brand-dark/50" />
      <Container className="relative grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div>
          <p className="text-sm font-bold text-sun">Orçamento grátis</p>
          <h2 id="orcamento-title" className="mt-2 text-3xl font-extrabold tracking-tight text-balance sm:text-4xl">
            Conte o que precisa. A gente responde com preço e prazo.
          </h2>
          <p className="mt-4 text-lg text-white/85">
            Leva menos de 2 minutos. Sem cadastro e sem compromisso.
          </p>
          <ul className="mt-10 space-y-5">
            <li className="flex gap-4">
              <Clock3 aria-hidden className="h-6 w-6 shrink-0 text-sun" />
              <span>
                <span className="block font-bold">Atendimento</span>
                <span className="text-white/80">{business.hours}</span>
              </span>
            </li>
            <li className="flex gap-4">
              <MessageCircle aria-hidden className="h-6 w-6 shrink-0 text-sun" />
              <span>
                <span className="block font-bold">Prefere conversar?</span>
                <a href={serviceWhatsAppUrl()} target="_blank" rel="noopener noreferrer" className="text-white/90 underline underline-offset-4 hover:text-white">
                  Chame no WhatsApp
                </a>
              </span>
            </li>
            <li className="flex gap-4">
              <Phone aria-hidden className="h-6 w-6 shrink-0 text-sun" />
              <span>
                <span className="block font-bold">Telefone</span>
                <a href={business.phoneHref} className="text-white/90 underline underline-offset-4 hover:text-white">
                  {business.phoneDisplay}
                </a>{" "}
                <span className="text-sm text-white/70">(fictício)</span>
              </span>
            </li>
            <li className="flex gap-4">
              <Mail aria-hidden className="h-6 w-6 shrink-0 text-sun" />
              <span>
                <span className="block font-bold">E-mail</span>
                <a href={`mailto:${business.email}`} className="break-all text-white/90 underline underline-offset-4 hover:text-white">
                  {business.email}
                </a>
              </span>
            </li>
          </ul>
        </div>
        <QuoteForm />
      </Container>
    </section>
  );
}
