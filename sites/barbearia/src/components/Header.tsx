import Link from "next/link";
import { CalendarClock } from "lucide-react";
import { Logo } from "./Logo";
import { MobileNav } from "./MobileNav";
import { buttonClasses } from "./ui";

export const NAV_LINKS = [
  { href: "/#servicos", label: "Serviços" },
  { href: "/#equipe", label: "Equipe" },
  { href: "/#galeria", label: "Galeria" },
  { href: "/#avaliacoes", label: "Avaliações" },
  { href: "/#contato", label: "Contato" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-smoke/80 bg-coal/90 backdrop-blur supports-[backdrop-filter]:bg-coal/75">
      <div className="mx-auto flex h-18 max-w-6xl items-center justify-between gap-6 px-5 sm:px-8">
        <Link href="/" aria-label="Brasa Barbearia, página inicial" className="text-bone">
          <Logo />
        </Link>
        <nav aria-label="Principal" className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-xs font-bold uppercase tracking-[0.18em] text-ash transition-colors hover:text-bone"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-2">
          <Link href="/agendar" className={buttonClasses("primary", "min-h-11 px-4 sm:px-5")}>
            <CalendarClock aria-hidden className="h-4 w-4" />
            Agendar
          </Link>
          <MobileNav links={NAV_LINKS} />
        </div>
      </div>
    </header>
  );
}
