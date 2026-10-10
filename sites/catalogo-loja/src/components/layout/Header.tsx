import Link from "next/link";
import { categories } from "@/data/categories";
import { ListDrawer } from "../list/ListDrawer";
import { Logo } from "./Brand";
import { MobileNav } from "./MobileNav";
import { SearchForm } from "./SearchForm";

export const PAGE_LINKS = [
  { href: "/catalogo", label: "Catálogo" },
  { href: "/#novidades", label: "Novidades" },
  { href: "/sobre", label: "A loja" },
  { href: "/trocas-e-entregas", label: "Trocas e entregas" },
];

export const CATEGORY_LINKS = categories.map((c) => ({ href: `/catalogo?categoria=${c.id}`, label: c.name }));

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-sand bg-shell/95 backdrop-blur">
      <div className="mx-auto grid h-20 max-w-7xl grid-cols-[1fr_auto_1fr] items-center gap-4 px-5 sm:px-8">
        <div className="flex items-center">
          <MobileNav pages={PAGE_LINKS} categories={CATEGORY_LINKS} />
          <nav aria-label="Páginas" className="hidden lg:block">
            <ul className="flex gap-7 text-[11px] font-medium uppercase tracking-[0.2em]">
              {PAGE_LINKS.slice(0, 3).map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="py-2 hover:text-clay">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <Link href="/" aria-label="Maré, página inicial">
          <Logo />
        </Link>
        <div className="flex items-center justify-end gap-4">
          <SearchForm id="busca-topo" className="hidden w-52 lg:block" />
          <ListDrawer />
        </div>
      </div>
      <nav aria-label="Categorias" className="hidden border-t border-sand lg:block">
        <ul className="mx-auto flex max-w-7xl justify-center gap-9 px-8 text-[13px] text-stone">
          {CATEGORY_LINKS.map((c) => (
            <li key={c.href}>
              <Link href={c.href} className="inline-block py-3 hover:text-ink">
                {c.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
