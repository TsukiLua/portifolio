import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/data/products";
import { Price } from "./Price";
import { ProductBadge } from "./ProductBadge";

export function ProductCard({ product, sizes, priority }: { product: Product; sizes: string; priority?: boolean }) {
  const soldOut = product.availability === "esgotado";
  return (
    <article className="group relative">
      <div className="relative overflow-hidden bg-sand">
        <Image
          src={product.images[0].src}
          alt={product.images[0].alt}
          placeholder="blur"
          priority={priority}
          sizes={sizes}
          className={`aspect-[4/5] w-full object-cover transition duration-700 group-hover:scale-[1.04] ${soldOut ? "opacity-60 grayscale-[60%]" : ""}`}
        />
        <div className="absolute top-3 left-3">
          <ProductBadge product={product} />
        </div>
      </div>
      <h3 className="mt-4 text-[15px] leading-snug">
        <Link href={`/produto/${product.slug}`} className="after:absolute after:inset-0 hover:text-clay">
          {product.name}
        </Link>
      </h3>
      <Price product={product} className="mt-1 text-sm" />
    </article>
  );
}
