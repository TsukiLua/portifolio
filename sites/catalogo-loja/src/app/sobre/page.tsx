import type { Metadata } from "next";
import Image from "next/image";
import { Clock, Leaf, Mail, MapPin, MessageCircle, Phone, Recycle, Scissors } from "lucide-react";
import loja2 from "@/assets/loja-2.jpg";
import loja3 from "@/assets/loja-3.jpg";
import { buttonClasses, Container, Eyebrow } from "@/components/ui";
import { store } from "@/data/store";
import { generalWhatsAppUrl } from "@/lib/contact";

export const metadata: Metadata = {
  title: "A loja",
  description: "Conheça a Maré: moda em fibras naturais, produção em pequenos lotes e atendimento próximo.",
};

const values = [
  { icon: Leaf, title: "Fibras naturais", text: "Linho, algodão e tricô escolhidos pelo toque e pela durabilidade." },
  { icon: Scissors, title: "Pequenos lotes", text: "Produzimos pouco e com cuidado, em parceria com ateliês locais." },
  { icon: Recycle, title: "Feito para durar", text: "Modelagens atemporais que atravessam estações e tendências." },
];

export default function AboutPage() {
  return (
    <Container className="pt-12 sm:pt-16">
      <header className="max-w-3xl">
        <Eyebrow>A loja</Eyebrow>
        <h1 className="mt-4 font-serif text-5xl leading-tight sm:text-7xl">
          Roupas que respiram, <em className="text-clay">como você.</em>
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-stone">
          A Maré nasceu de um armário cheio de peças sintéticas que ninguém queria usar no verão. Hoje reunimos linho,
          algodão e tricô em modelagens simples, que combinam entre si e duram anos.
        </p>
        <p className="mt-3 text-sm text-stone">História e marca fictícias, criadas para esta demonstração.</p>
      </header>

      <div className="mt-14 grid gap-4 sm:grid-cols-2">
        <Image src={loja2} alt="Arara com roupas em tons claros ao lado de um cacto" placeholder="blur" sizes="(min-width: 640px) 50vw, 100vw" className="aspect-[4/5] w-full object-cover" />
        <Image src={loja3} alt="Prateleiras brancas com bolsas, sandálias e roupas penduradas" placeholder="blur" sizes="(min-width: 640px) 50vw, 100vw" className="aspect-[4/5] w-full object-cover sm:mt-16" />
      </div>

      <section aria-labelledby="valores" className="mt-24">
        <h2 id="valores" className="font-serif text-4xl">O que nos guia</h2>
        <ul className="mt-10 grid gap-10 md:grid-cols-3">
          {values.map(({ icon: Icon, title, text }) => (
            <li key={title} className="border-t border-ink/20 pt-6">
              <Icon aria-hidden className="h-6 w-6 text-clay" />
              <h3 className="mt-4 font-serif text-2xl">{title}</h3>
              <p className="mt-2 text-stone">{text}</p>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="visite" className="mt-24 grid gap-10 bg-paper p-8 sm:p-12 lg:grid-cols-2">
        <div>
          <h2 id="visite" className="font-serif text-4xl">Visite ou fale com a gente</h2>
          <p className="mt-4 text-stone">Atendimento pelo WhatsApp em horário comercial. Respondemos em até 1 hora.</p>
          <a href={generalWhatsAppUrl} target="_blank" rel="noopener noreferrer" className={buttonClasses("whatsapp", "mt-8")}>
            <MessageCircle aria-hidden className="h-4 w-4" />
            Chamar no WhatsApp
          </a>
        </div>
        <address className="space-y-4 not-italic">
          <p className="flex gap-3"><MapPin aria-hidden className="mt-0.5 h-5 w-5 shrink-0 text-clay" /> {store.address} <span className="text-stone">(fictício)</span></p>
          <p className="flex gap-3"><Clock aria-hidden className="mt-0.5 h-5 w-5 shrink-0 text-clay" /> {store.hours}</p>
          <p className="flex gap-3"><Phone aria-hidden className="mt-0.5 h-5 w-5 shrink-0 text-clay" /> <a href={store.phoneHref} className="hover:text-clay">{store.phoneDisplay}</a></p>
          <p className="flex gap-3"><Mail aria-hidden className="mt-0.5 h-5 w-5 shrink-0 text-clay" /> <a href={`mailto:${store.email}`} className="break-all hover:text-clay">{store.email}</a></p>
        </address>
      </section>
    </Container>
  );
}
