/**
 * Mensagens de pedido via WhatsApp e validação de variantes.
 * Não há checkout: o pedido é combinado na conversa com a loja.
 */
import { formatBRL } from "@demo/core/format";
import { composeMessage } from "@demo/core/whatsapp";
import { store } from "../data/store";
import type { Product } from "../data/products";

export interface VariantSelection {
  color?: string;
  size?: string;
}

export type VariantError = "esgotado" | "escolha-cor" | "escolha-tamanho" | "cor-indisponivel" | "tamanho-indisponivel";

export const VARIANT_ERRORS: Record<VariantError, string> = {
  esgotado: "Produto esgotado no momento.",
  "escolha-cor": "Escolha uma cor.",
  "escolha-tamanho": "Escolha um tamanho.",
  "cor-indisponivel": "Essa cor está indisponível.",
  "tamanho-indisponivel": "Esse tamanho está indisponível.",
};

/** Cor pré-selecionada: a única disponível, quando só existe uma. */
export function defaultColor(product: Product): string | undefined {
  const available = product.colors?.filter((c) => c.available) ?? [];
  return available.length === 1 ? available[0]?.name : undefined;
}

export function validateVariant(product: Product, selection: VariantSelection): VariantError | null {
  if (product.availability === "esgotado") return "esgotado";
  if (product.colors?.length) {
    if (!selection.color) return "escolha-cor";
    if (!product.colors.find((c) => c.name === selection.color)?.available) return "cor-indisponivel";
  }
  if (product.sizes?.length) {
    if (!selection.size) return "escolha-tamanho";
    if (!product.sizes.find((s) => s.label === selection.size)?.available) return "tamanho-indisponivel";
  }
  return null;
}

const variantLabel = ({ color, size }: VariantSelection) =>
  [color && `Cor: ${color}`, size && `Tamanho: ${size}`].filter(Boolean).join(" · ");

export function productOrderMessage(product: Product, selection: VariantSelection, url: string): string {
  return composeMessage([
    `Olá, ${store.name}! Tenho interesse nesta peça:`,
    `• ${product.name} (ref. ${product.id})`,
    variantLabel(selection) && `• ${variantLabel(selection)}`,
    `• Preço no site: ${formatBRL(product.price)}`,
    `• Link: ${url}`,
    "Está disponível? Como faço para comprar?",
  ]);
}

export function restockMessage(product: Product, url: string): string {
  return composeMessage([
    `Olá, ${store.name}! A peça ${product.name} (ref. ${product.id}) está esgotada no site.`,
    "Vocês têm previsão de reposição?",
    `Link: ${url}`,
  ]);
}

export interface ListLine {
  product: Product;
  selection: VariantSelection;
}

export function listMessage(lines: readonly ListLine[]): string {
  const total = lines.reduce((sum, l) => sum + l.product.price, 0);
  return composeMessage([
    `Olá, ${store.name}! Montei esta lista no site e gostaria de saber se está disponível:`,
    ...lines.map(
      ({ product, selection }, i) =>
        `${i + 1}. ${product.name} (ref. ${product.id})${variantLabel(selection) ? ` · ${variantLabel(selection)}` : ""} · ${formatBRL(product.price)}`,
    ),
    `Total estimado: ${formatBRL(total)}`,
  ]);
}
