import Link from "next/link";
import { ArrowDownRight } from "lucide-react";
import { getProject, projects } from "@/data/projects";
import { profile } from "@/data/profile";
import { BrowserFrame, PhoneFrame } from "../ui/frames";
import { buttonClasses, Container, Em, Label } from "../ui/primitives";

// Composição com capturas reais: projeto destaque, um negócio local e um catálogo no celular.
const main = getProject("catalogo-automotivo")!;
const secondary = getProject("site-para-barbearia")!;
const phone = getProject("catalogo-de-produtos")!.gallery.find((g) => g.device === "mobile")!;

export function Hero() {
  return (
    <section id="inicio" aria-labelledby="hero-titulo" className="relative overflow-hidden">
      <div aria-hidden className="blueprint absolute inset-0 -z-10" />
      <Container className="grid items-center gap-14 pt-14 pb-20 sm:pt-20 lg:grid-cols-[1fr_1.1fr] lg:gap-12 lg:pt-24 lg:pb-28">
        <div>
          <Label>
            {profile.name} · {profile.role}
          </Label>
          <h1 id="hero-titulo" className="mt-5 text-[2.6rem] leading-[1.02] font-semibold tracking-tight text-balance sm:text-6xl lg:text-[3.6rem]">
            Transformo ideias em sites que <Em>trabalham</Em> pelo seu negócio.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-mute">
            Sites profissionais, catálogos digitais e funcionalidades sob medida para empresas que querem se apresentar
            bem na internet e facilitar o contato de quem procura por elas.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link href="/#projetos" className={buttonClasses("dark")}>
              Ver projetos <ArrowDownRight aria-hidden className="h-4 w-4" />
            </Link>
            <Link href="/#contato" className={buttonClasses("outline")}>
              Solicitar orçamento
            </Link>
          </div>
          <p className="mt-8 font-mono text-xs text-mute">
            {projects.filter((p) => p.status === "demonstrativo").length} projetos demonstrativos · capturas reais das interfaces
          </p>
        </div>

        <div aria-label="Prévia de projetos do portfólio" role="group" className="relative mx-auto w-full max-w-xl pb-14 lg:max-w-none lg:pb-20">
          <BrowserFrame image={main.cover} label={`${main.name.toLowerCase().replace(/\s+/g, "-")} · demo`} priority sizes="(min-width: 1024px) 45vw, 90vw" className="ml-auto w-[90%]" />
          <BrowserFrame
            image={secondary.cover}
            label={`${secondary.name.toLowerCase().replace(/\s+/g, "-")} · demo`}
            sizes="(min-width: 1024px) 26vw, 50vw"
            className="absolute bottom-0 left-0 w-[50%]"
          />
          <PhoneFrame image={phone} sizes="(min-width: 1024px) 10vw, 22vw" className="absolute -right-2 bottom-2 hidden w-[21%] sm:block lg:-right-4" />
        </div>
      </Container>
    </section>
  );
}
