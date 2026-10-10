import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, PackageCheck, RefreshCcw, Truck } from "lucide-react";
import { Price } from "@/components/product/Price";
import { ProductBadge } from "@/components/product/ProductBadge";
import { ProductCard } from "@/components/product/ProductCard";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductPurchase } from "@/components/product/ProductPurchase";
import { Container } from "@/components/ui";
import { getCategory } from "@/data/categories";
import { getProductBySlug, products } from "@/data/products";
import { store } from "@/data/store";
import { siteUrl } from "@/lib/config";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = getProductBySlug((await params).slug);
  if (!product) return {};
  return {
    title: product.name,
    description: product.description,
    alternates: { canonical: `/produto/${product.slug}` },
    openGraph: { title: `${product.name} · ${store.name}`, description: product.description, images: [{ url: product.images[0].src.src }] },
  };
}

const AVAILABILITY_TEXT = {
  disponivel: { label: "Disponível", className: "text-leaf" },
  "ultimas-unidades": { label: "Últimas unidades", className: "text-clay" },
  esgotado: { label: "Esgotado", className: "text-alert" },
} as const;

export default async function ProductPage({ params }: Props) {
  const product = getProductBySlug((await params).slug);
  if (!product) notFound();
  const category = getCategory(product.category);
  const related = products.filter((p) => p.category === product.category && p.id !== product.id && p.availability !== "esgotado").slice(0, 4);
  const availability = AVAILABILITY_TEXT[product.availability];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    sku: product.id,
    description: product.description,
    image: `${siteUrl}${product.images[0].src.src}`,
    offers: {
      "@type": "Offer",
      priceCurrency: "BRL",
      price: product.price.toFixed(2),
      availability: product.availability === "esgotado" ? "https://schema.org/OutOfStock" : "https://schema.org/InStock",
    },
  };

  return (
    <Container className="pt-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <nav aria-label="Trilha de navegação" className="text-xs text-stone">
        <ol className="flex flex-wrap items-center gap-1.5">
          {[
            { href: "/", label: "Início" },
            { href: "/catalogo", label: "Catálogo" },
            { href: `/catalogo?categoria=${product.category}`, label: category?.name ?? "Categoria" },
          ].map((crumb) => (
            <li key={crumb.href} className="flex items-center gap-1.5">
              <Link href={crumb.href} className="hover:text-ink">
                {crumb.label}
              </Link>
              <ChevronRight aria-hidden className="h-3 w-3" />
            </li>
          ))}
          <li aria-current="page" className="text-ink">
            {product.name}
          </li>
        </ol>
      </nav>

      <div className="mt-8 grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
        <ProductGallery images={product.images} name={product.name} />
        <div className="lg:sticky lg:top-36 lg:self-start">
          <ProductBadge product={product} />
          <h1 className="mt-4 font-serif text-4xl leading-tight sm:text-5xl">{product.name}</h1>
          <p className="mt-2 text-xs uppercase tracking-[0.2em] text-stone">Ref. {product.id}</p>
          <Price product={product} className="mt-5 text-2xl" />
          <p className={`mt-2 text-sm font-medium ${availability.className}`}>● {availability.label}</p>
          <p className="mt-6 leading-relaxed text-stone">{product.description}</p>

          <ProductPurchase slug={product.slug} />

          <div className="mt-10 border-t border-sand">
            <details className="group border-b border-sand" open>
              <summary className="flex min-h-12 cursor-pointer items-center justify-between text-[11px] font-medium uppercase tracking-[0.28em]">
                Detalhes da peça <span aria-hidden className="text-lg group-open:rotate-45">+</span>
              </summary>
              <ul className="list-inside list-disc space-y-1 pb-5 text-sm text-stone">
                {product.details.map((d) => (
                  <li key={d}>{d}</li>
                ))}
              </ul>
            </details>
            <details className="group border-b border-sand">
              <summary className="flex min-h-12 cursor-pointer items-center justify-between text-[11px] font-medium uppercase tracking-[0.28em]">
                Entrega e trocas <span aria-hidden className="text-lg group-open:rotate-45">+</span>
              </summary>
              <ul className="space-y-3 pb-5 text-sm text-stone">
                <li className="flex gap-3"><Truck aria-hidden className="h-4 w-4 shrink-0 text-clay" /> Entrega local em até 2 dias úteis ou envio pelos Correios.</li>
                <li className="flex gap-3"><PackageCheck aria-hidden className="h-4 w-4 shrink-0 text-clay" /> Retirada grátis na loja.</li>
                <li className="flex gap-3"><RefreshCcw aria-hidden className="h-4 w-4 shrink-0 text-clay" /> Primeira troca grátis em até 30 dias.</li>
                <li>
                  <Link href="/trocas-e-entregas" className="text-ink underline underline-offset-4">Ver política completa</Link>
                </li>
              </ul>
            </details>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section aria-labelledby="relacionados" className="mt-24">
          <h2 id="relacionados" className="font-serif text-3xl sm:text-4xl">Combina com</h2>
          <ul className="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4">
            {related.map((p) => (
              <li key={p.id}>
                <ProductCard product={p} sizes="(min-width: 768px) 24vw, 46vw" />
              </li>
            ))}
          </ul>
        </section>
      )}
    </Container>
  );
}
