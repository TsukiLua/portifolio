import Image from "next/image";
import Link from "next/link";
import { CalendarClock, Clock, MapPin, Scissors } from "lucide-react";
import hero from "@/assets/hero.jpg";
import { business } from "@/data/business";
import { buttonClasses, Container } from "../ui";

const facts = [
  { icon: Clock, label: "Ter a sáb", detail: "9h às 20h" },
  { icon: CalendarClock, label: "Agenda online", detail: "em menos de 1 minuto" },
  { icon: MapPin, label: business.address.district, detail: `${business.address.city}/${business.address.state}` },
];

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative isolate overflow-hidden">
      <Image
        src={hero}
        alt="Barbeiro de boné fazendo acabamento com máquina em ambiente escuro"
        priority
        placeholder="blur"
        fill
        sizes="100vw"
        className="-z-20 object-cover object-[65%_center]"
      />
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-r from-coal via-coal/85 to-coal/20" />
      <div aria-hidden className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-coal to-transparent" />

      <Container className="flex min-h-[calc(100svh-6.5rem)] flex-col justify-center py-20 sm:py-28">
        <p className="mb-6 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.3em] text-ember">
          <Scissors aria-hidden className="h-4 w-4" />
          Barbearia · {business.address.district}
        </p>
        <h1
          id="hero-title"
          className="max-w-3xl font-display text-[3.4rem] font-extrabold uppercase leading-[0.9] sm:text-7xl lg:text-[6.5rem]"
        >
          Corte preciso.
          <br />
          Barba no ponto.
          <br />
          <span className="text-ember">Hora marcada.</span>
        </h1>
        <p className="mt-7 max-w-xl text-lg leading-relaxed text-bone/80">
          Degradês, cortes na tesoura e barba com toalha quente, sem fila e sem pressa. Escolha o serviço, o barbeiro
          e o horário direto pelo celular.
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Link href="/agendar" className={buttonClasses("primary")}>
            <CalendarClock aria-hidden className="h-4 w-4" />
            Agendar horário
          </Link>
          <Link href="/#servicos" className={buttonClasses("outline")}>
            Ver serviços e preços
          </Link>
        </div>

        <ul className="mt-16 grid max-w-2xl grid-cols-1 gap-px border border-smoke bg-smoke sm:grid-cols-3">
          {facts.map(({ icon: Icon, label, detail }) => (
            <li key={label} className="flex items-center gap-3 bg-coal/90 px-5 py-4">
              <Icon aria-hidden className="h-5 w-5 shrink-0 text-ember" />
              <span className="text-sm leading-tight">
                <span className="block font-bold text-bone">{label}</span>
                <span className="text-ash">{detail}</span>
              </span>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
