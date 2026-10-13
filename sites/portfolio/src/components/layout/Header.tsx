import Link from "next/link";
import { profile } from "@/data/profile";
import { buttonClasses } from "../ui/primitives";
import { MobileMenu } from "./MobileMenu";
import { SectionNav } from "./SectionNav";

export const NAV_ITEMS = [
  { id: "inicio", label: "Início" },
  { id: "projetos", label: "Projetos" },
  { id: "servicos", label: "Serviços" },
  { id: "sobre", label: "Sobre" },
  { id: "contato", label: "Contato" },
] as const;

export function Monogram({ className = "" }: { className?: string }) {
  return (
    <span aria-hidden className={`flex h-9 w-9 items-center justify-center rounded-lg bg-ink font-mono text-xs font-semibold text-white ${className}`}>
      {profile.monogram}
    </span>
  );
}

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-ink/10 bg-canvas/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5 sm:px-8">
        <Link href="/" className="flex items-center gap-2.5" aria-label={`${profile.brand}, início`}>
          <Monogram />
          <span className="font-semibold tracking-tight">{profile.brand}</span>
        </Link>
        <nav aria-label="Principal" className="hidden md:block">
          <SectionNav items={NAV_ITEMS} />
        </nav>
        <div className="flex items-center gap-2">
          <span className="hidden sm:block">
            <Link href="/#contato" className={buttonClasses("dark", "min-h-10 px-5 text-sm")}>
              Solicitar orçamento
            </Link>
          </span>
          <MobileMenu items={NAV_ITEMS} />
        </div>
      </div>
    </header>
  );
}
