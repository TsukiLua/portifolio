import { Mail, MessageCircle } from "lucide-react";
import { profile } from "@/data/profile";
import { GENERAL_MESSAGE, mailtoLink, whatsappLink } from "@/lib/contact";
import { buttonClasses, Container, Em, Label } from "../ui/primitives";
import { QuoteForm } from "./QuoteForm";

const tips = ["Seu nome", "Nome da empresa", "Tipo de site que você imagina", "Funcionalidades importantes", "Prazo estimado"];

export function ContactSection() {
  return (
    <section id="contato" aria-labelledby="contato-titulo" className="scroll-mt-16 py-20 sm:py-28">
      <Container className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-14">
        <div>
          <Label>05 — Contato</Label>
          <h2 id="contato-titulo" className="mt-3 text-4xl leading-[1.05] font-semibold tracking-tight text-balance sm:text-5xl">
            Vamos tirar seu próximo projeto <Em>do papel?</Em>
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-mute">
            Conte rapidamente o que você precisa. A primeira conversa serve para entender o negócio e não tem compromisso.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href={whatsappLink(GENERAL_MESSAGE)} target="_blank" rel="noopener noreferrer" className={buttonClasses("primary", "text-base")}>
              <MessageCircle aria-hidden className="h-5 w-5" /> Conversar no WhatsApp
            </a>
            <a href={mailtoLink("Orçamento de site")} className={buttonClasses("outline", "text-base")}>
              <Mail aria-hidden className="h-5 w-5" /> {profile.email}
            </a>
          </div>
          <div className="mt-10 rounded-2xl border border-dashed border-ink/20 p-6">
            <h3 className="font-medium">Para um orçamento mais rápido, se puder, conte:</h3>
            <ul className="mt-3 grid gap-x-6 gap-y-2 text-sm text-graphite sm:grid-cols-2">
              {tips.map((t, i) => (
                <li key={t} className="flex gap-2">
                  <span className="font-mono text-accent">{String(i + 1).padStart(2, "0")}</span> {t}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-mute">Nada disso é obrigatório para começar: um &quot;oi&quot; já serve.</p>
          </div>
        </div>
        <QuoteForm />
      </Container>
    </section>
  );
}
