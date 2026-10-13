import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Eye, Info, MessageSquareText, ShieldCheck } from "lucide-react";
import showroom from "@/assets/vehicles/showroom-1.jpg";
import { buttonClasses, Container } from "@/components/ui/primitives";
import { dealership } from "@/data/dealership";

export const metadata: Metadata = {
  title: "Sobre a loja",
  description: "Conheça a proposta da Prime Motors, loja fictícia de seminovos criada para demonstração.",
  alternates: { canonical: "/sobre" },
};

const principles = [
  { icon: Eye, title: "Transparência no anúncio", text: "Ficha completa, fotos de vários ângulos e status atualizado: disponível, reservado ou vendido." },
  { icon: MessageSquareText, title: "Conversa sem pressão", text: "O consultor responde dúvidas e combina a visita no seu tempo, pelo canal que preferir." },
  { icon: ShieldCheck, title: "Procedência em primeiro lugar", text: "Antes de anunciar, conferimos documentação e histórico de manutenção informado." },
];

export default function AboutPage() {
  return (
    <Container className="pt-10 sm:pt-14">
      <div className="grid items-center gap-10 lg:grid-cols-2">
        <div>
          <p className="text-xs font-semibold tracking-[0.18em] text-wine uppercase">Sobre a loja</p>
          <h1 className="font-display mt-2 text-4xl font-extrabold sm:text-5xl">Poucos carros, bem escolhidos</h1>
          {dealership.about.map((p) => (
            <p key={p} className="mt-4 leading-relaxed text-graphite">{p}</p>
          ))}
          <p role="note" className="mt-6 flex gap-2.5 rounded-lg border border-wine/20 bg-wine-soft p-4 text-sm text-wine-dark">
            <Info aria-hidden className="mt-0.5 h-4 w-4 shrink-0" />
            <span>
              <strong>Empresa demonstrativa.</strong> A {dealership.name}, sua história, estoque, preços e contatos são
              fictícios. Não há números de clientes, anos de mercado ou avaliações reais neste site.
            </span>
          </p>
        </div>
        <Image src={showroom} alt="SUV preto exposto em showroom com piso claro" placeholder="blur" sizes="(min-width: 1024px) 45vw, 100vw" className="aspect-[3/2] w-full rounded-2xl object-cover" />
      </div>

      <section aria-labelledby="principios" className="mt-16">
        <h2 id="principios" className="font-display text-3xl font-bold">Como trabalhamos</h2>
        <ul className="mt-6 grid gap-5 md:grid-cols-3">
          {principles.map(({ icon: Icon, title, text }) => (
            <li key={title} className="rounded-xl border border-line bg-surface p-6">
              <Icon aria-hidden className="h-6 w-6 text-wine" />
              <h3 className="mt-3 font-bold">{title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-steel">{text}</p>
            </li>
          ))}
        </ul>
      </section>

      <div className="mt-12 flex flex-col gap-3 sm:flex-row">
        <Link href="/estoque" className={buttonClasses("primary")}>Ver estoque</Link>
        <Link href="/contato" className={buttonClasses("outline")}>Falar com a loja</Link>
      </div>
    </Container>
  );
}
