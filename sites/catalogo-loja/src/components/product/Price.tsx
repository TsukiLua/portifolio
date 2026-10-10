import { formatBRL } from "@demo/core/format";
import type { Product } from "@/data/products";

export function Price({ product, className = "" }: { product: Product; className?: string }) {
  return (
    <p className={className}>
      {product.compareAtPrice && (
        <>
          <span className="sr-only">De </span>
          <s className="mr-2 text-stone">{formatBRL(product.compareAtPrice)}</s>
          <span className="sr-only">por </span>
        </>
      )}
      <span className={product.compareAtPrice ? "font-medium text-clay" : "font-medium"}>{formatBRL(product.price)}</span>
    </p>
  );
}
