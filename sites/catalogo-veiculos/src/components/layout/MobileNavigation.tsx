"use client";

import Link from "next/link";
import { useRef } from "react";
import { Menu, X } from "lucide-react";
import { dealership } from "@/data/dealership";
import { generalWhatsAppLink } from "@/lib/whatsapp";
import { WhatsAppIcon } from "../ui/icons";
import { buttonClasses } from "../ui/primitives";

/** Menu móvel em <dialog> nativo: foco preso no painel, Esc fecha, fundo inerte. */
export function MobileNavigation({ items }: { items: { href: string; label: string }[] }) {
  const ref = useRef<HTMLDialogElement>(null);
  const close = () => ref.current?.close();

  return (
    <div className="lg:hidden">
      <button
        type="button"
        aria-label="Abrir menu"
        aria-haspopup="dialog"
        onClick={() => ref.current?.showModal()}
        className="flex h-11 w-11 items-center justify-center rounded-lg border border-line text-ink"
      >
        <Menu aria-hidden className="h-5 w-5" />
      </button>
      <dialog
        ref={ref}
        aria-label="Menu"
        onClick={(e) => e.target === e.currentTarget && close()}
        className="m-0 ml-auto h-dvh max-h-none w-[min(22rem,88vw)] max-w-none bg-surface p-0 text-ink"
      >
        <div className="flex h-full flex-col px-6 pt-4 pb-8">
          <div className="flex items-center justify-between">
            <span className="font-display text-lg font-extrabold uppercase">{dealership.name}</span>
            <button type="button" onClick={close} aria-label="Fechar menu" className="-mr-2 flex h-11 w-11 items-center justify-center">
              <X aria-hidden className="h-6 w-6" />
            </button>
          </div>
          <nav aria-label="Menu móvel" className="mt-6">
            <ul className="divide-y divide-line border-y border-line">
              {items.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} onClick={close} className="block py-4 text-lg font-semibold">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="mt-auto grid gap-3">
            <Link href="/estoque" onClick={close} className={buttonClasses("primary")}>
              Ver veículos
            </Link>
            <a href={generalWhatsAppLink()} target="_blank" rel="noopener noreferrer" className={buttonClasses("whatsapp")}>
              <WhatsAppIcon /> Falar no WhatsApp
            </a>
          </div>
        </div>
      </dialog>
    </div>
  );
}
