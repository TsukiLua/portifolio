"use client";

import { useState } from "react";
import { BellRing, Check, Heart, MessageCircle } from "lucide-react";
import { getProductBySlug } from "@/data/products";
import { productUrl, whatsappUrl } from "@/lib/contact";
import { addToList, openList } from "@/lib/interest-list";
import { VARIANT_ERRORS, defaultColor, productOrderMessage, restockMessage, validateVariant } from "@/lib/order";
import { buttonClasses } from "../ui";

/** Seleção de cor/tamanho e ações de pedido. Recebe só o slug para não serializar o produto inteiro. */
export function ProductPurchase({ slug }: { slug: string }) {
  const product = getProductBySlug(slug);
  const [color, setColor] = useState<string | undefined>(() => (product ? defaultColor(product) : undefined));
  const [size, setSize] = useState<string | undefined>();
  const [showError, setShowError] = useState(false);
  const [added, setAdded] = useState<"novo" | "repetido" | null>(null);
  if (!product) return null;

  const url = productUrl(product.slug);
  const error = validateVariant(product, { color, size });

  if (product.availability === "esgotado") {
    return (
      <div className="mt-8 border border-sand bg-paper p-5">
        <p className="font-medium">Esta peça esgotou.</p>
        <p className="mt-1 text-sm text-stone">Pergunte pelo WhatsApp sobre reposição ou peças parecidas.</p>
        <a href={whatsappUrl(restockMessage(product, url))} target="_blank" rel="noopener noreferrer" className={buttonClasses("outline", "mt-5 w-full")}>
          <BellRing aria-hidden className="h-4 w-4" />
          Perguntar sobre reposição
        </a>
      </div>
    );
  }

  const select = (setter: (v: string) => void) => (value: string) => {
    setter(value);
    setAdded(null);
  };

  function addCurrent() {
    if (error) return setShowError(true);
    setAdded(addToList({ productId: product!.id, color, size }) ? "novo" : "repetido");
  }

  return (
    <div className="mt-8 space-y-7">
      {product.colors && product.colors.length > 0 && (
        <fieldset>
          <legend className="text-[11px] font-medium uppercase tracking-[0.28em]">
            Cor: <span className="normal-case tracking-normal text-stone">{color ?? "escolha"}</span>
          </legend>
          <div className="mt-3 flex flex-wrap gap-2">
            {product.colors.map((c) => (
              <label
                key={c.name}
                className="flex min-h-11 cursor-pointer items-center gap-2 border border-sand px-3 text-sm has-checked:border-ink has-disabled:cursor-not-allowed has-disabled:text-stone/70 has-disabled:line-through has-focus-visible:outline-2 has-focus-visible:outline-clay"
              >
                <input type="radio" name="cor" className="sr-only" disabled={!c.available} checked={color === c.name} onChange={() => select(setColor)(c.name)} />
                <span aria-hidden className="h-4 w-4 rounded-full ring-1 ring-ink/15" style={{ background: c.hex }} />
                {c.name}
                {!c.available && <span className="sr-only"> (indisponível)</span>}
              </label>
            ))}
          </div>
        </fieldset>
      )}

      {product.sizes && product.sizes.length > 0 && (
        <fieldset>
          <legend className="text-[11px] font-medium uppercase tracking-[0.28em]">
            Tamanho: <span className="normal-case tracking-normal text-stone">{size ?? "escolha"}</span>
          </legend>
          <div className="mt-3 flex flex-wrap gap-2">
            {product.sizes.map((s) => (
              <label
                key={s.label}
                className="flex h-11 min-w-12 cursor-pointer items-center justify-center border border-sand px-3 text-sm has-checked:border-ink has-checked:bg-ink has-checked:text-shell has-disabled:cursor-not-allowed has-disabled:text-stone/60 has-disabled:line-through has-focus-visible:outline-2 has-focus-visible:outline-clay"
              >
                <input type="radio" name="tamanho" className="sr-only" disabled={!s.available} checked={size === s.label} onChange={() => select(setSize)(s.label)} />
                {s.label}
                {!s.available && <span className="sr-only"> (indisponível)</span>}
              </label>
            ))}
          </div>
          <p className="mt-2 text-xs text-stone">Tamanhos riscados estão indisponíveis.</p>
        </fieldset>
      )}

      <p role="alert" className="min-h-5 text-sm font-medium text-alert">
        {showError && error ? VARIANT_ERRORS[error] : ""}
      </p>

      <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
        {error ? (
          // Sem variante válida, o botão explica o que falta em vez de ficar desabilitado sem contexto.
          <button type="button" onClick={() => setShowError(true)} className={buttonClasses("whatsapp")}>
            <MessageCircle aria-hidden className="h-4 w-4" />
            Pedir pelo WhatsApp
          </button>
        ) : (
          <a
            href={whatsappUrl(productOrderMessage(product, { color, size }, url))}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonClasses("whatsapp")}
          >
            <MessageCircle aria-hidden className="h-4 w-4" />
            Pedir pelo WhatsApp
          </a>
        )}
        <button type="button" onClick={addCurrent} className={buttonClasses("outline", "px-5")}>
          <Heart aria-hidden className="h-4 w-4" />
          <span>Adicionar à lista</span>
        </button>
      </div>
      <div aria-live="polite" className="min-h-6 text-sm">
        {added && (
          <p className="flex flex-wrap items-center gap-2 text-leaf">
            <Check aria-hidden className="h-4 w-4" />
            {added === "novo" ? "Adicionada à sua lista de interesse." : "Essa combinação já está na sua lista."}
            <button type="button" onClick={openList} className="text-ink underline underline-offset-4">
              Ver lista
            </button>
          </p>
        )}
      </div>
      <p className="text-xs leading-relaxed text-stone">
        O WhatsApp abre com nome, referência e variante preenchidos. Disponibilidade e pagamento são combinados na
        conversa; este site não processa pedidos.
      </p>
    </div>
  );
}
