"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import type { VehicleImage as VehicleImageData } from "@/types/vehicle";
import { VehicleImage } from "./VehicleImage";

const navButton =
  "flex h-11 w-11 items-center justify-center rounded-full bg-surface/90 text-ink shadow-md transition-colors hover:bg-surface disabled:opacity-40";

/**
 * Galeria: imagem principal, miniaturas, setas (botões e teclado ← →) e ampliação em <dialog>.
 * Cada imagem tem fallback próprio caso falhe.
 */
export function VehicleGallery({ images, title }: { images: VehicleImageData[]; title: string }) {
  const [index, setIndex] = useState(0);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const total = images.length;
  const current = images[index] ?? images[0];
  if (!current) return null;

  const go = (delta: number) => setIndex((i) => (i + delta + total) % total);
  const onKeyDown = (e: KeyboardEvent) => {
    if (total < 2) return;
    if (e.key === "ArrowRight") {
      e.preventDefault();
      go(1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      go(-1);
    }
  };

  // Só o contador principal é região "ao vivo", para não duplicar anúncios do leitor de tela.
  const counter = (live: boolean) => (
    <span className="rounded-full bg-ink/75 px-3 py-1 text-xs font-semibold text-white" aria-live={live ? "polite" : undefined}>
      Foto {index + 1} de {total}
    </span>
  );

  return (
    <section aria-label={`Fotos de ${title}`} onKeyDown={onKeyDown}>
      <div className="relative overflow-hidden rounded-xl bg-line">
        <VehicleImage key={index} image={current} priority={index === 0} sizes="(min-width: 1024px) 60vw, 100vw" className="aspect-[3/2] w-full object-cover" />
        {total > 1 && (
          <>
            <button type="button" onClick={() => go(-1)} aria-label="Foto anterior" className={`${navButton} absolute top-1/2 left-3 -translate-y-1/2`}>
              <ChevronLeft aria-hidden className="h-5 w-5" />
            </button>
            <button type="button" onClick={() => go(1)} aria-label="Próxima foto" className={`${navButton} absolute top-1/2 right-3 -translate-y-1/2`}>
              <ChevronRight aria-hidden className="h-5 w-5" />
            </button>
          </>
        )}
        <div className="absolute right-3 bottom-3 left-3 flex items-center justify-between">
          {counter(true)}
          <button
            type="button"
            onClick={() => dialogRef.current?.showModal()}
            aria-haspopup="dialog"
            className="inline-flex min-h-10 items-center gap-2 rounded-full bg-surface/90 px-4 text-sm font-semibold shadow-md hover:bg-surface"
          >
            <Expand aria-hidden className="h-4 w-4" /> Ampliar
          </button>
        </div>
      </div>

      {total > 1 && (
        <ul className="mt-3 grid grid-cols-4 gap-2 sm:grid-cols-5" aria-label="Miniaturas">
          {images.map((img, i) => (
            <li key={i}>
              <button
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Ver foto ${i + 1} de ${total}: ${img.alt}`}
                aria-current={i === index ? "true" : undefined}
                className={`block w-full overflow-hidden rounded-lg border-2 transition-opacity ${i === index ? "border-wine" : "border-transparent opacity-70 hover:opacity-100"}`}
              >
                <VehicleImage image={img} sizes="160px" className="aspect-[3/2] w-full object-cover" />
              </button>
            </li>
          ))}
        </ul>
      )}
      <p className="mt-2 text-xs text-steel">Use as setas do teclado para navegar. Fotos ilustrativas (Wikimedia Commons).</p>

      {/* As setas no diálogo chegam ao onKeyDown da seção (o diálogo é filho dela na árvore React). */}
      <dialog
        ref={dialogRef}
        aria-label={`Fotos ampliadas de ${title}`}
        onClick={(e) => e.target === e.currentTarget && dialogRef.current?.close()}
        className="m-auto h-auto max-h-none w-[min(96vw,80rem)] max-w-none bg-transparent p-0"
      >
        <div className="relative">
          <VehicleImage key={`zoom-${index}`} image={current} sizes="96vw" className="max-h-[85dvh] w-full rounded-xl object-contain" />
          <button
            type="button"
            onClick={() => dialogRef.current?.close()}
            aria-label="Fechar fotos ampliadas"
            className={`${navButton} absolute top-3 right-3`}
          >
            <X aria-hidden className="h-5 w-5" />
          </button>
          {total > 1 && (
            <>
              <button type="button" onClick={() => go(-1)} aria-label="Foto anterior" className={`${navButton} absolute top-1/2 left-3 -translate-y-1/2`}>
                <ChevronLeft aria-hidden className="h-5 w-5" />
              </button>
              <button type="button" onClick={() => go(1)} aria-label="Próxima foto" className={`${navButton} absolute top-1/2 right-3 -translate-y-1/2`}>
                <ChevronRight aria-hidden className="h-5 w-5" />
              </button>
            </>
          )}
          <div className="absolute bottom-3 left-3">{counter(false)}</div>
        </div>
      </dialog>
    </section>
  );
}
