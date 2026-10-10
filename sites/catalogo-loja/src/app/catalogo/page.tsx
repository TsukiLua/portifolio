import type { Metadata } from "next";
import { Suspense } from "react";
import { CatalogView } from "@/components/catalog/CatalogView";
import { ProductCard } from "@/components/product/ProductCard";
import { Container } from "@/components/ui";
import { products } from "@/data/products";
import { DEFAULT_QUERY, filterProducts } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Catálogo",
  description: "Camisas de linho, vestidos, tricôs, calças e acessórios. Filtre por categoria e preço e peça pelo WhatsApp.",
  alternates: { canonical: "/catalogo" },
};

/** HTML estático com todas as peças: visível antes da hidratação e sem JavaScript. */
function StaticCatalog() {
  return (
    <div>
      <h1 className="border-b border-sand pb-8 font-serif text-5xl sm:text-6xl">Todas as peças</h1>
      <ul className="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-3 lg:ml-[16.5rem]">
        {filterProducts(products, DEFAULT_QUERY).map((product) => (
          <li key={product.id}>
            <ProductCard product={product} sizes="(min-width: 1280px) 22vw, (min-width: 768px) 30vw, 46vw" />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function CatalogPage() {
  return (
    <Container className="pt-12 sm:pt-16">
      <Suspense fallback={<StaticCatalog />}>
        <CatalogView />
      </Suspense>
    </Container>
  );
}
