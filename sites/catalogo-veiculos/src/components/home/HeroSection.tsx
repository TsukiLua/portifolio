import Image from "next/image";
import Link from "next/link";
import Form from "next/form";
import { Search } from "lucide-react";
import hero from "@/assets/vehicles/hero-1.jpg";
import { vehicles } from "@/data/vehicles";
import { CATEGORY_LABELS, formatPriceShort } from "@/lib/formatters";
import { PARAM_NAMES, PRICE_STEPS, getFacets } from "@/lib/vehicle-filters";
import { generalWhatsAppLink } from "@/lib/whatsapp";
import { WhatsAppIcon } from "../ui/icons";
import { buttonClasses, Container } from "../ui/primitives";

const facets = getFacets(vehicles.filter((v) => v.status !== "sold"));
const select =
  "mt-1.5 h-12 w-full rounded-lg border border-line bg-surface px-3 text-sm text-ink focus:border-wine focus:outline-none";

export function HeroSection() {
  return (
    <section aria-labelledby="hero-title">
      <div className="relative isolate overflow-hidden bg-ink">
        <Image
          src={hero}
          alt="SUV preto em showroom iluminado"
          priority
          placeholder="blur"
          fill
          sizes="100vw"
          className="-z-10 object-cover object-[70%_center] opacity-80"
        />
        <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-r from-ink via-ink/80 to-ink/10" />
        <Container className="pt-16 pb-36 sm:pt-24 lg:pt-28 lg:pb-44">
          <p className="text-xs font-semibold tracking-[0.2em] text-white/70 uppercase">Seminovos selecionados</p>
          <h1 id="hero-title" className="font-display mt-4 max-w-2xl text-4xl leading-[1.05] font-extrabold text-white sm:text-6xl">
            Encontre seu próximo carro
          </h1>
          <p className="mt-5 max-w-lg text-lg text-white/80">
            Estoque com galeria de fotos, ficha completa e um consultor para tirar dúvidas no WhatsApp.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/estoque" className={buttonClasses("primary", "text-base")}>
              Explorar estoque
            </Link>
            <a
              href={generalWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonClasses("outline", "border-white/40 bg-transparent text-base text-white hover:border-white")}
            >
              <WhatsAppIcon /> Fale com um consultor
            </a>
          </div>
        </Container>
      </div>

      {/* Busca rápida: formulário GET para /estoque (funciona sem JavaScript). */}
      <Container className="relative -mt-24 lg:-mt-28">
        <Form
          action="/estoque"
          aria-labelledby="busca-rapida-titulo"
          className="grid gap-4 rounded-2xl border border-line bg-surface p-5 shadow-xl shadow-ink/10 sm:grid-cols-2 sm:p-6 lg:grid-cols-[1fr_1fr_1fr_auto] lg:items-end"
        >
          <h2 id="busca-rapida-titulo" className="sr-only">
            Busca rápida
          </h2>
          <div>
            <label htmlFor="rapida-marca" className="text-sm font-semibold">
              Marca
            </label>
            <select id="rapida-marca" name={PARAM_NAMES.brand} defaultValue="" className={select}>
              <option value="">Todas as marcas</option>
              {facets.brands.map((b) => (
                <option key={b}>{b}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="rapida-preco" className="text-sm font-semibold">
              Preço até
            </label>
            <select id="rapida-preco" name={PARAM_NAMES.priceMax} defaultValue="" className={select}>
              <option value="">Qualquer valor</option>
              {PRICE_STEPS.map((p) => (
                <option key={p} value={p}>
                  {formatPriceShort(p)}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="rapida-tipo" className="text-sm font-semibold">
              Tipo de veículo
            </label>
            <select id="rapida-tipo" name={PARAM_NAMES.category} defaultValue="" className={select}>
              <option value="">Todos os tipos</option>
              {facets.categories.map((c) => (
                <option key={c} value={c}>
                  {CATEGORY_LABELS[c].plural}
                </option>
              ))}
            </select>
          </div>
          <button type="submit" className={buttonClasses("primary", "h-12 sm:col-span-2 lg:col-span-1")}>
            <Search aria-hidden className="h-4 w-4" /> Buscar veículos
          </button>
        </Form>
      </Container>
    </section>
  );
}
