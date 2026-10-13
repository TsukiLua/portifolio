import Link from "next/link";
import { CarFront } from "lucide-react";
import { dealership } from "@/data/dealership";
import { generalWhatsAppLink } from "@/lib/whatsapp";
import { WhatsAppIcon } from "../ui/icons";
import { buttonClasses } from "../ui/primitives";
import { MobileNavigation } from "./MobileNavigation";
import { NavLinks } from "./NavLinks";

export const NAV_ITEMS = [
  { href: "/", label: "Início" },
  { href: "/estoque", label: "Estoque" },
  { href: "/sobre", label: "Sobre a loja" },
  { href: "/contato", label: "Contato" },
];

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <span className="flex items-center gap-2">
      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-wine text-white">
        <CarFront aria-hidden className="h-5 w-5" />
      </span>
      <span className={`font-display text-lg leading-none font-extrabold tracking-tight uppercase ${light ? "text-white" : "text-ink"}`}>
        Prime<span className={light ? "text-[#f0a3ad]" : "text-wine"}> Motors</span>
      </span>
    </span>
  );
}

export function DemoBar() {
  return (
    <p className="bg-ink px-4 py-1.5 text-center text-xs text-white/80">
      Site de demonstração · loja, estoque, preços e contatos são fictícios
    </p>
  );
}

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-surface/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:h-[4.5rem] lg:px-8">
        <Link href="/" aria-label={`${dealership.name}, página inicial`}>
          <Logo />
        </Link>
        <nav aria-label="Principal" className="hidden lg:block">
          <NavLinks items={NAV_ITEMS} />
        </nav>
        <div className="flex items-center gap-2">
          <a
            href={generalWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Falar no WhatsApp (abre em nova aba)"
            className={buttonClasses("outline", "h-11 min-h-11 px-3")}
          >
            <WhatsAppIcon className="h-5 w-5 text-[#1a7f4b]" />
            <span className="hidden xl:inline">WhatsApp</span>
          </a>
          <span className="hidden sm:block">
            <Link href="/estoque" className={buttonClasses("primary", "min-h-11")}>
              Ver veículos
            </Link>
          </span>
          <MobileNavigation items={NAV_ITEMS} />
        </div>
      </div>
    </header>
  );
}
