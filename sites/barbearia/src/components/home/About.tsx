import Image from "next/image";
import { Coffee, ShieldCheck, Timer } from "lucide-react";
import interior from "@/assets/sobre-interior.jpg";
import cadeira from "@/assets/sobre-cadeira.jpg";
import { Container, SectionHeading } from "../ui";

const pillars = [
  {
    icon: Timer,
    title: "Hora marcada de verdade",
    text: "Agenda organizada por serviço e barbeiro. Você chega e senta na cadeira.",
  },
  {
    icon: ShieldCheck,
    title: "Higiene sem atalhos",
    text: "Lâminas descartáveis, ferramentas esterilizadas e capa limpa a cada cliente.",
  },
  {
    icon: Coffee,
    title: "Tempo para você",
    text: "Café passado na hora, playlist boa e atendimento sem correria.",
  },
];

export function About() {
  return (
    <section aria-labelledby="sobre-title" className="py-24 sm:py-32">
      <Container className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <div className="relative order-last lg:order-first">
          <Image
            src={interior}
            alt="Interior da barbearia com parede de tijolos e luz quente"
            placeholder="blur"
            sizes="(min-width: 1024px) 40vw, 90vw"
            className="aspect-[4/5] w-4/5 object-cover"
          />
          <Image
            src={cadeira}
            alt="Cadeira de barbeiro vermelha em frente a espelho antigo"
            placeholder="blur"
            sizes="(min-width: 1024px) 22vw, 50vw"
            className="absolute -bottom-8 right-0 aspect-square w-1/2 border-8 border-coal object-cover"
          />
        </div>
        <div>
          <SectionHeading
            id="sobre-title"
            eyebrow="A casa"
            title={
              <>
                Ofício antigo,
                <br />
                olhar de agora
              </>
            }
            intro="A Brasa nasceu para quem quer sair da barbearia com um corte que funciona no dia a dia, e não só na foto. Técnica clássica, referências atuais e um atendimento que respeita o seu horário."
          />
          <ul className="mt-10 space-y-6">
            {pillars.map(({ icon: Icon, title, text }) => (
              <li key={title} className="flex gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center border border-smoke text-ember">
                  <Icon aria-hidden className="h-5 w-5" />
                </span>
                <span>
                  <span className="block font-bold text-bone">{title}</span>
                  <span className="text-sm leading-relaxed text-ash">{text}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
