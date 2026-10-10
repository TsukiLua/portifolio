import Image from "next/image";
import Link from "next/link";
import { Flower2, HandHeart, Leaf } from "lucide-react";
import hero from "@/assets/hero.jpg";
import sobre1 from "@/assets/sobre-1.jpg";
import sobre2 from "@/assets/sobre-2.jpg";
import { studio } from "@/data/studio";
import { professionals } from "@/data/team";
import { treatments } from "@/data/treatments";
import { buttonClasses, Container, Heading } from "../ui";

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="overflow-hidden">
      <Container className="grid items-center gap-12 py-12 sm:py-16 lg:grid-cols-[1.1fr_1fr] lg:py-20">
        <div>
          <p className="font-serif text-xl text-clay italic">{studio.address.district} · São Paulo</p>
          <h1 id="hero-title" className="mt-4 font-serif text-5xl leading-[1.05] font-medium text-moss-dark sm:text-6xl lg:text-7xl">
            Cuidado sem pressa, beleza que é <em className="text-clay">sua</em>.
          </h1>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-mute">
            Estética facial, olhar, unhas, cabelo e massagens em um estúdio pequeno e acolhedor. Monte seu atendimento e
            solicite o horário em poucos toques.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link href="/agendar" className={buttonClasses("primary")}>
              Solicitar horário
            </Link>
            <Link href="/#tratamentos" className={buttonClasses("outline")}>
              Ver tratamentos e valores
            </Link>
          </div>
          <dl className="mt-12 grid max-w-md grid-cols-3 gap-6 border-t border-linen pt-6">
            {[
              [String(treatments.length), "tratamentos"],
              [String(professionals.length), "especialistas"],
              ["1", "cliente por sala"],
            ].map(([n, label]) => (
              <div key={label}>
                <dt className="sr-only">{label}</dt>
                <dd>
                  <span className="block font-serif text-4xl text-moss">{n}</span>
                  <span className="text-sm text-mute">{label}</span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
          <Image
            src={hero}
            alt="Corredor do estúdio com parede em tom areia, arco ao fundo e prateleiras de produtos"
            priority
            placeholder="blur"
            sizes="(min-width: 1024px) 42vw, 90vw"
            className="aspect-[4/5] w-full rounded-t-[999px] rounded-b-3xl object-cover"
          />
          <div className="absolute bottom-6 -left-2 max-w-[15rem] rounded-2xl bg-cream/95 p-4 shadow-xl shadow-ink/10 sm:-left-8">
            <p className="font-serif text-lg leading-tight text-moss-dark">“Um atendimento por sala, sem barulho e sem pressa.”</p>
          </div>
        </div>
      </Container>
    </section>
  );
}

const values = [
  { icon: Leaf, title: "Protocolos honestos", text: "Indicamos só o que a sua pele e o seu cabelo precisam." },
  { icon: HandHeart, title: "Atendimento individual", text: "Uma cliente por sala, com tempo para conversar e ouvir." },
  { icon: Flower2, title: "Produtos conscientes", text: "Marcas cruelty-free e composição explicada em cada etapa." },
];

export function About() {
  return (
    <section aria-labelledby="sobre-title" className="bg-linen/60 py-20 sm:py-28">
      <Container className="grid items-center gap-14 lg:grid-cols-2">
        <div className="grid grid-cols-2 items-end gap-4">
          <Image src={sobre1} alt="Ambiente claro do estúdio com cadeira e espelho" placeholder="blur" sizes="(min-width: 1024px) 25vw, 45vw" className="aspect-[3/4] w-full rounded-t-[999px] rounded-b-2xl object-cover" />
          <Image src={sobre2} alt="Bancada com frascos de cosméticos, livros e flores" placeholder="blur" sizes="(min-width: 1024px) 22vw, 45vw" className="aspect-square w-full rounded-2xl object-cover" />
        </div>
        <div>
          <Heading
            id="sobre-title"
            eyebrow="O estúdio"
            title="Um lugar para desacelerar"
            intro="A Sálvia nasceu para ser o contrário do salão apressado: poucas cadeiras, horários bem distribuídos e profissionais que explicam cada passo."
          />
          <ul className="mt-10 space-y-6">
            {values.map(({ icon: Icon, title, text }) => (
              <li key={title} className="flex gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-sage-soft text-moss">
                  <Icon aria-hidden className="h-5 w-5" />
                </span>
                <span>
                  <span className="block font-semibold text-moss-dark">{title}</span>
                  <span className="text-mute">{text}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
