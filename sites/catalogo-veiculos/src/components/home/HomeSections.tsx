import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarCheck, FileCheck2, Handshake, Landmark } from "lucide-react";
import { vehicles } from "@/data/vehicles";
import { CATEGORY_LABELS } from "@/lib/formatters";
import { getFacets, sortVehicles } from "@/lib/vehicle-filters";
import { generalWhatsAppLink } from "@/lib/whatsapp";
import { WhatsAppIcon } from "../ui/icons";
import { buttonClasses, Container, SectionHeader } from "../ui/primitives";
import { VehicleGrid } from "../vehicles/VehicleGrid";

export function FeaturedVehicles() {
  const featured = sortVehicles(
    vehicles.filter((v) => v.featured && v.status !== "sold"),
    "relevancia",
  ).slice(0, 6);
  return (
    <section aria-labelledby="destaques-titulo" className="py-16 sm:py-20">
      <Container>
        <SectionHeader
          id="destaques-titulo"
          eyebrow="Destaques"
          title="Veículos em destaque"
          description="Selecionados pela equipe pela procedência, conservação e preço."
          action={
            <Link href="/estoque" className={buttonClasses("ghost", "self-start px-3 sm:self-auto")}>
              Ver todo o estoque <ArrowRight aria-hidden className="h-4 w-4" />
            </Link>
          }
        />
        <div className="mt-8">
          <VehicleGrid vehicles={featured} />
        </div>
      </Container>
    </section>
  );
}

export function CategorySection() {
  // Só categorias que existem no estoque, com contagem e capa reais.
  const active = vehicles.filter((v) => v.status !== "sold");
  const categories = getFacets(active).categories.map((c) => {
    const list = sortVehicles(active.filter((v) => v.category === c), "relevancia");
    return { id: c, count: list.length, cover: list[0]! };
  });
  return (
    <section aria-labelledby="categorias-titulo" className="bg-surface py-16 sm:py-20">
      <Container>
        <SectionHeader id="categorias-titulo" eyebrow="Categorias" title="Compre por tipo de veículo" />
        <ul className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          {categories.map(({ id, count, cover }) => (
            <li key={id}>
              <Link href={`/estoque?tipo=${id}`} className="group block overflow-hidden rounded-xl border border-line bg-paper transition-colors hover:border-ink/40">
                <div className="overflow-hidden">
                  <Image
                    src={cover.images[0].src}
                    alt=""
                    placeholder="blur"
                    sizes="(min-width: 1024px) 16vw, (min-width: 768px) 30vw, 46vw"
                    className="aspect-[4/3] w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <p className="flex items-center justify-between px-4 py-3">
                  <span className="font-semibold">{CATEGORY_LABELS[id].plural}</span>
                  <span className="text-sm text-steel">
                    {count} <span className="sr-only">{count === 1 ? "veículo" : "veículos"}</span>
                  </span>
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

const differentials = [
  { icon: Handshake, title: "Atendimento personalizado", text: "Um consultor acompanha você do primeiro contato à entrega, sem pressão." },
  { icon: FileCheck2, title: "Documentação verificada", text: "Conferimos documentação e histórico de manutenção informado de cada veículo." },
  { icon: Landmark, title: "Financiamento sob análise", text: "Ajudamos a simular com instituições parceiras. Aprovação sujeita à análise de crédito." },
  { icon: CalendarCheck, title: "Visita com hora marcada", text: "Agende para ver e dirigir o carro com calma, com ele separado para você." },
];

export function Differentials() {
  return (
    <section aria-labelledby="diferenciais-titulo" className="py-16 sm:py-20">
      <Container>
        <SectionHeader id="diferenciais-titulo" eyebrow="Por que a Prime Motors" title="Compra de seminovo sem surpresas" />
        <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {differentials.map(({ icon: Icon, title, text }) => (
            <li key={title} className="rounded-xl border border-line bg-surface p-6">
              <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-wine-soft text-wine">
                <Icon aria-hidden className="h-5 w-5" />
              </span>
              <h3 className="mt-4 font-bold">{title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-steel">{text}</p>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-xs text-steel">Diferenciais ilustrativos de uma loja fictícia.</p>
      </Container>
    </section>
  );
}

export function CallToAction() {
  return (
    <section aria-labelledby="cta-titulo">
      <Container>
        <div className="flex flex-col items-start justify-between gap-6 rounded-2xl bg-wine px-6 py-10 text-white sm:px-10 md:flex-row md:items-center">
          <div>
            <h2 id="cta-titulo" className="font-display text-2xl font-bold sm:text-3xl">
              Não achou o carro ideal?
            </h2>
            <p className="mt-2 max-w-xl text-white/85">Conte o que você procura e um consultor avisa quando chegar algo com o seu perfil.</p>
          </div>
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <a href={generalWhatsAppLink()} target="_blank" rel="noopener noreferrer" className={buttonClasses("outline", "border-white")}>
              <WhatsAppIcon className="h-5 w-5 text-[#1a7f4b]" /> Falar com consultor
            </a>
            <Link href="/estoque" className={buttonClasses("outline", "border-white/40 bg-transparent text-white hover:border-white")}>
              Ver veículos
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
