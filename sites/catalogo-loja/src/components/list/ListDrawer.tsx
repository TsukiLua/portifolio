"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { Info, MessageCircle, ShoppingBag, Trash2, X } from "lucide-react";
import { formatBRL } from "@demo/core/format";
import { getProductById } from "@/data/products";
import { whatsappUrl } from "@/lib/contact";
import { OPEN_LIST_EVENT, clearList, removeFromList, useInterestList } from "@/lib/interest-list";
import { listMessage, type ListLine } from "@/lib/order";
import { buttonClasses } from "../ui";

export function ListDrawer() {
  const items = useInterestList();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const open = () => dialogRef.current?.showModal();
  const close = () => dialogRef.current?.close();

  useEffect(() => {
    const onOpen = () => dialogRef.current?.showModal();
    window.addEventListener(OPEN_LIST_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_LIST_EVENT, onOpen);
  }, []);

  const lines = items.flatMap((item) => {
    const product = getProductById(item.productId);
    return product ? [{ key: item.key, product, selection: { color: item.color, size: item.size } }] : [];
  });
  const total = lines.reduce((sum, l) => sum + l.product.price, 0);
  const message = listMessage(lines satisfies ListLine[]);

  return (
    <>
      <button
        type="button"
        onClick={open}
        aria-haspopup="dialog"
        aria-label={`Lista de interesse, ${lines.length} ${lines.length === 1 ? "item" : "itens"}`}
        className="relative -mr-2 flex h-11 w-11 items-center justify-center hover:text-clay"
      >
        <ShoppingBag aria-hidden className="h-5 w-5" />
        {lines.length > 0 && (
          <span aria-hidden className="absolute top-1 right-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-clay px-1 text-[10px] font-semibold text-white">
            {lines.length}
          </span>
        )}
      </button>
      <dialog
        ref={dialogRef}
        aria-labelledby="lista-titulo"
        onClick={(e) => e.target === e.currentTarget && close()}
        className="m-0 ml-auto h-dvh max-h-none w-[min(26rem,100vw)] max-w-none bg-shell p-0 text-ink"
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b border-sand px-6 py-4">
            <h2 id="lista-titulo" className="font-serif text-2xl">
              Lista de interesse
            </h2>
            <button type="button" onClick={close} aria-label="Fechar lista" className="-mr-2 flex h-11 w-11 items-center justify-center">
              <X aria-hidden className="h-5 w-5" />
            </button>
          </div>
          <p className="flex gap-2 border-b border-sand bg-paper px-6 py-3 text-xs leading-relaxed text-stone">
            <Info aria-hidden className="mt-0.5 h-3.5 w-3.5 shrink-0 text-clay" />
            Lista demonstrativa salva só neste navegador. Não é um pedido nem reserva: a disponibilidade é confirmada no
            WhatsApp.
          </p>

          {lines.length === 0 ? (
            <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
              <ShoppingBag aria-hidden className="h-10 w-10 text-sand" />
              <p className="mt-4 font-serif text-2xl">Sua lista está vazia</p>
              <p className="mt-2 text-sm text-stone">Adicione peças pela página de cada produto para consultar tudo de uma vez.</p>
              <Link href="/catalogo" onClick={close} className={buttonClasses("outline", "mt-6")}>
                Ver catálogo
              </Link>
            </div>
          ) : (
            <>
              <ul className="flex-1 divide-y divide-sand overflow-y-auto px-6">
                {lines.map(({ key, product, selection }) => (
                  <li key={key} className="flex gap-4 py-4">
                    <Image src={product.images[0].src} alt="" sizes="72px" className="h-24 w-[4.5rem] shrink-0 object-cover" />
                    <div className="min-w-0 flex-1">
                      <Link href={`/produto/${product.slug}`} onClick={close} className="font-medium hover:text-clay">
                        {product.name}
                      </Link>
                      <p className="mt-1 text-xs text-stone">
                        {[selection.color, selection.size && `Tam. ${selection.size}`].filter(Boolean).join(" · ") || "Tamanho único"}
                      </p>
                      <p className="mt-1 text-sm">{formatBRL(product.price)}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeFromList(key)}
                      aria-label={`Remover ${product.name} da lista`}
                      className="flex h-11 w-11 shrink-0 items-center justify-center text-stone hover:text-alert"
                    >
                      <Trash2 aria-hidden className="h-4 w-4" />
                    </button>
                  </li>
                ))}
              </ul>
              <div className="border-t border-sand px-6 py-5">
                <p className="flex items-baseline justify-between">
                  <span className="text-sm text-stone">Total estimado</span>
                  <span className="font-serif text-2xl">{formatBRL(total)}</span>
                </p>
                <a href={whatsappUrl(message)} target="_blank" rel="noopener noreferrer" className={buttonClasses("whatsapp", "mt-4 w-full")}>
                  <MessageCircle aria-hidden className="h-4 w-4" />
                  Consultar lista no WhatsApp
                </a>
                <button type="button" onClick={clearList} className="mt-3 w-full py-2 text-xs uppercase tracking-[0.18em] text-stone hover:text-alert">
                  Limpar lista
                </button>
              </div>
            </>
          )}
        </div>
      </dialog>
    </>
  );
}
