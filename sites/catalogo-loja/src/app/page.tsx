import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Heart, MessageCircle, Shirt } from "lucide-react";
import hero from "@/assets/hero.jpg";
import editorial2 from "@/assets/editorial-2.jpg";
import editorial3 from "@/assets/editorial-3.jpg";
import loja1 from "@/assets/loja-1.jpg";
import { ProductCard } from "@/components/product/ProductCard";
import { buttonClasses, Container, Eyebrow, SectionTitle } from "@/components/ui";
import { categories } from "@/data/categories";
import { products } from "@/data/products";
import { store } from "@/data/store";

const newArrivals = products.filter((p) => p.highlight === "novidade" && p.availability !== "esgotado").slice(0, 4);
const bestSellers = products.filter((p) => p.highlight === "mais-vendido").slice(0, 3);
// Capa de cada categoria: o primeiro produto disponível dela.
const categoryCovers = categories.map((c) => ({
  ...c,
  cover: products.find((p) => p.category === c.id && p.availability !== "esgotado") ?? products[0]!,
  count: products.filter((p) => p.category === c.id).length,
}));

const howTo = [
  { icon: Shirt, title: "Escolha a peça", text: "Navegue pelo catálogo, filtre por categoria e preço." },
  { icon: Heart, title: "Defina cor e tamanho", text: "Peça direto ou monte uma lista com várias peças." },
  { icon: MessageCircle, title: "Finalize no WhatsApp", text: "A mensagem já vai pronta. A loja confirma estoque, frete e pagamento." },
];

export default function HomePage() {
  return (
    <>
      <section aria-labelledby="hero-title" className="overflow-hidden">
        <Container className="grid items-center gap-10 pt-10 pb-16 lg:grid-cols-[1fr_1.05fr] lg:gap-16 lg:pt-16">
          <div className="order-last lg:order-first">
            <Eyebrow>Coleção Verão Leve</Eyebrow>
            <h1 id="hero-title" className="mt-5 font-serif text-[3.2rem] leading-[1.02] sm:text-7xl lg:text-[5.5rem]">
              Leveza que
              <br />
              <em className="text-clay">vem do linho</em>
            </h1>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-stone">
              Peças em fibras naturais, pensadas para o calor e para durar mais de uma estação. Escolha no site, finalize
              no WhatsApp.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link href="/catalogo" className={buttonClasses("solid")}>
                Ver catálogo
              </Link>
              <Link href="/#novidades" className={buttonClasses("outline")}>
                Novidades
              </Link>
            </div>
          </div>
          <div className="relative">
            <Image
              src={hero}
              alt="Mulher de perfil vestindo casaco amarelo-mostarda, segurando flores secas"
              priority
              placeholder="blur"
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="aspect-[4/5] w-full object-cover sm:aspect-[5/5] lg:aspect-[4/5]"
            />
            <Image
              src={editorial2}
              alt="Modelo com conjunto de alfaiataria em tom caramelo"
              placeholder="blur"
              sizes="(min-width: 1024px) 16vw, 30vw"
              className="absolute -bottom-8 -left-4 hidden aspect-[4/5] w-[34%] border-[6px] border-shell object-cover sm:block lg:-left-12"
            />
          </div>
        </Container>
      </section>

      <section aria-labelledby="categorias-title" className="py-16">
        <Container>
          <div className="flex items-end justify-between gap-6">
            <SectionTitle id="categorias-title" eyebrow="Coleções">
              Compre por categoria
            </SectionTitle>
            <Link href="/catalogo" className="hidden items-center gap-2 text-xs uppercase tracking-[0.2em] hover:text-clay sm:flex">
              Ver tudo <ArrowRight aria-hidden className="h-4 w-4" />
            </Link>
          </div>
          <ul className="mt-10 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-5">
            {categoryCovers.map((c, i) => (
              <li key={c.id} className={i === 0 ? "col-span-2 lg:col-span-1" : ""}>
                <Link href={`/catalogo?categoria=${c.id}`} className="group block">
                  <div className="overflow-hidden bg-sand">
                    <Image
                      src={c.cover.images[0].src}
                      alt=""
                      placeholder="blur"
                      sizes="(min-width: 1024px) 19vw, 46vw"
                      className={`w-full object-cover transition duration-700 group-hover:scale-[1.04] ${i === 0 ? "aspect-[2/1] lg:aspect-[3/4]" : "aspect-[3/4]"}`}
                    />
                  </div>
                  <p className="mt-3 font-serif text-xl group-hover:text-clay">{c.name}</p>
                  <p className="text-xs text-stone">
                    {c.count} {c.count === 1 ? "peça" : "peças"} · {c.description}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section id="novidades" aria-labelledby="novidades-title" className="py-16">
        <Container>
          <SectionTitle id="novidades-title" eyebrow="Acabou de chegar">
            Novidades
          </SectionTitle>
          <ul className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-4">
            {newArrivals.map((p) => (
              <li key={p.id}>
                <ProductCard product={p} sizes="(min-width: 1024px) 23vw, 46vw" />
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section aria-labelledby="como-title" className="my-16 bg-paper">
        <Container className="grid items-center gap-12 py-16 lg:grid-cols-2 lg:gap-20 lg:py-0">
          <Image
            src={editorial3}
            alt="Modelo em preto e branco vestindo blazer de lã cinza"
            placeholder="blur"
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="aspect-[4/5] w-full object-cover lg:aspect-[4/5]"
          />
          <div className="lg:py-16">
            <SectionTitle id="como-title" eyebrow="Sem cadastro, sem checkout">
              Como pedir
            </SectionTitle>
            <ol className="mt-10 space-y-8">
              {howTo.map(({ icon: Icon, title, text }, i) => (
                <li key={title} className="flex gap-5">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-ink/20">
                    <Icon aria-hidden className="h-5 w-5 text-clay" />
                  </span>
                  <span>
                    <span className="block font-serif text-2xl">
                      {i + 1}. {title}
                    </span>
                    <span className="mt-1 block text-stone">{text}</span>
                  </span>
                </li>
              ))}
            </ol>
            <Link href="/catalogo" className={buttonClasses("solid", "mt-10")}>
              Começar a escolher
            </Link>
          </div>
        </Container>
      </section>

      <section aria-labelledby="mais-vendidos-title" className="py-16">
        <Container>
          <SectionTitle id="mais-vendidos-title" eyebrow="Queridinhas">
            Mais vendidas
          </SectionTitle>
          <ul className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-3">
            {bestSellers.map((p) => (
              <li key={p.id}>
                <ProductCard product={p} sizes="(min-width: 768px) 31vw, 46vw" />
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section aria-labelledby="loja-title" className="py-16">
        <Container className="grid items-center gap-10 lg:grid-cols-[1.3fr_1fr]">
          <Image src={loja1} alt="Interior claro da loja com araras de roupas e plantas" placeholder="blur" sizes="(min-width: 1024px) 55vw, 100vw" className="aspect-[3/2] w-full object-cover" />
          <div>
            <SectionTitle id="loja-title" eyebrow="A loja">
              Venha provar pessoalmente
            </SectionTitle>
            <p className="mt-5 leading-relaxed text-stone">
              Nossa loja fica no centro, com provadores amplos e café passado na hora. Reservamos peças do catálogo
              para você experimentar sem compromisso.
            </p>
            <p className="mt-4 text-sm">{store.address}</p>
            <p className="text-sm text-stone">{store.hours}</p>
            <Link href="/sobre" className={buttonClasses("text", "mt-6")}>
              Conhecer a Maré
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
