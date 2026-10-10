import type { Product } from "@/data/products";

const HIGHLIGHT_LABEL = { novidade: "Novidade", "mais-vendido": "Mais vendido", promocao: "Promoção" } as const;

/** Prioriza o estado de estoque; senão mostra o destaque comercial. Sempre com texto, não só cor. */
export function ProductBadge({ product }: { product: Product }) {
  if (product.availability === "esgotado")
    return <span className="bg-ink px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-shell">Esgotado</span>;
  if (product.availability === "ultimas-unidades")
    return <span className="bg-clay px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-white">Últimas unidades</span>;
  if (product.highlight)
    return (
      <span className="bg-shell/95 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-ink">
        {HIGHLIGHT_LABEL[product.highlight]}
      </span>
    );
  return null;
}
