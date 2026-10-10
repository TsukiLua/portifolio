import Link from "next/link";
import { Phone } from "lucide-react";
import { business } from "@/data/business";
import { Logo } from "./Logo";
import { MobileNav } from "./MobileNav";
import { buttonClasses } from "./ui";

export const NAV_LINKS = [
  { href: "/#servicos", label: "Serviços" },
  { href: "/#como-funciona", label: "Como funciona" },
  { href: "/#trabalhos", label: "Trabalhos" },
  { href: "/#regioes", label: "Regiões" },
  { href: "/#duvidas", label: "Dúvidas" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-18 max-w-6xl items-center justify-between gap-4 px-5 sm:px-8">
        <Link href="/" aria-label={`${business.name}, página inicial`}>
          <Logo />
        </Link>
        <nav aria-label="Principal" className="hidden lg:block">
          <ul className="flex gap-7 text-[15px] font-semibold text-muted">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-brand">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-2 sm:gap-3">
          <a href={business.phoneHref} className="hidden items-center gap-2 text-sm font-bold xl:flex" aria-label={`Ligar para ${business.phoneDisplay} (número fictício)`}>
            <Phone aria-hidden className="h-4 w-4 text-brand" />
            {business.phoneDisplay}
          </a>
          <Link href="/#orcamento" className={buttonClasses("primary", "min-h-11 px-3.5 sm:px-5")}>
            <span className="sm:hidden">Orçamento</span>
            <span className="hidden sm:inline">Pedir orçamento</span>
          </Link>
          <MobileNav links={NAV_LINKS} />
        </div>
      </div>
    </header>
  );
}
