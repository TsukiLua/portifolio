"use client";

import Link from "next/link";
import { useRef } from "react";
import { Menu, X } from "lucide-react";
import { profile } from "@/data/profile";
import { buttonClasses } from "../ui/primitives";
import { SectionNav } from "./SectionNav";

/** Menu móvel em <dialog> nativo: foco preso, Esc fecha, fundo inerte. */
export function MobileMenu({ items }: { items: readonly { id: string; label: string }[] }) {
  const ref = useRef<HTMLDialogElement>(null);
  const close = () => ref.current?.close();
  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-label="Abrir menu"
        aria-haspopup="dialog"
        onClick={() => ref.current?.showModal()}
        className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/15"
      >
        <Menu aria-hidden className="h-5 w-5" />
      </button>
      <dialog
        ref={ref}
        aria-label="Menu"
        onClick={(e) => e.target === e.currentTarget && close()}
        className="m-0 ml-auto h-dvh max-h-none w-[min(22rem,88vw)] max-w-none bg-paper p-0 text-ink backdrop:bg-ink/50"
      >
        <div className="flex h-full flex-col px-6 pt-4 pb-8">
          <div className="flex items-center justify-between">
            <span className="font-semibold">{profile.brand}</span>
            <button type="button" onClick={close} aria-label="Fechar menu" className="-mr-2 flex h-11 w-11 items-center justify-center">
              <X aria-hidden className="h-6 w-6" />
            </button>
          </div>
          <nav aria-label="Menu móvel" className="mt-8">
            <SectionNav items={items} onNavigate={close} vertical />
          </nav>
          <Link href="/#contato" onClick={close} className={buttonClasses("primary", "mt-auto")}>
            Solicitar orçamento
          </Link>
        </div>
      </dialog>
    </div>
  );
}
