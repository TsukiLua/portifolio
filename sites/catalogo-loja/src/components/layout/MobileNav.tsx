"use client";

import Link from "next/link";
import { useRef } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "./Brand";
import { SearchForm } from "./SearchForm";

type NavLink = { href: string; label: string };

/** Menu móvel em <dialog> nativo: foco preso, Esc fecha e o fundo fica inerte. */
export function MobileNav({ pages, categories }: { pages: NavLink[]; categories: NavLink[] }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const close = () => dialogRef.current?.close();

  return (
    <div className="lg:hidden">
      <button
        type="button"
        aria-label="Abrir menu"
        aria-haspopup="dialog"
        onClick={() => dialogRef.current?.showModal()}
        className="-ml-2 flex h-11 w-11 items-center justify-center"
      >
        <Menu aria-hidden className="h-6 w-6" />
      </button>
      <dialog
        ref={dialogRef}
        aria-label="Menu"
        // Fecha ao clicar fora do painel (no backdrop).
        onClick={(e) => e.target === e.currentTarget && close()}
        className="m-0 h-dvh max-h-none w-[min(22rem,88vw)] max-w-none bg-shell p-0 text-ink"
      >
        <div className="flex h-full flex-col overflow-y-auto px-6 pt-4 pb-8">
          <div className="flex items-center justify-between">
            <Logo className="items-start" />
            <button type="button" onClick={close} aria-label="Fechar menu" className="-mr-2 flex h-11 w-11 items-center justify-center">
              <X aria-hidden className="h-6 w-6" />
            </button>
          </div>
          <SearchForm id="busca-menu" className="mt-6" />
          <nav aria-label="Categorias (menu)" className="mt-8">
            <p className="text-[11px] uppercase tracking-[0.3em] text-clay">Categorias</p>
            <ul className="mt-3">
              {categories.map((c) => (
                <li key={c.href}>
                  <Link href={c.href} onClick={close} className="block py-2.5 font-serif text-2xl">
                    {c.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <nav aria-label="Páginas (menu)" className="mt-8 border-t border-sand pt-6">
            <ul className="space-y-1 text-[12px] font-medium uppercase tracking-[0.2em]">
              {pages.map((p) => (
                <li key={p.href}>
                  <Link href={p.href} onClick={close} className="block py-2.5">
                    {p.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </dialog>
    </div>
  );
}
