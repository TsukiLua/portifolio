import Link from "next/link";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { studio } from "@/data/studio";
import { generalWhatsAppUrl } from "@/lib/contact";
import { InstagramIcon } from "./icons";
import { MobileNav } from "./MobileNav";
import { buttonClasses, Container } from "./ui";

export const NAV_LINKS = [
  { href: "/#tratamentos", label: "Tratamentos" },
  { href: "/#equipe", label: "Equipe" },
  { href: "/#galeria", label: "Galeria" },
  { href: "/#como-funciona", label: "Como funciona" },
  { href: "/#visite", label: "Contato" },
];

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <svg aria-hidden viewBox="0 0 32 32" className="h-8 w-8">
        <path d="M16 3c6 5 8 11 0 26C8 14 10 8 16 3Z" fill="var(--color-sage)" />
        <path d="M16 8v20" stroke={light ? "var(--color-cream)" : "var(--color-moss)"} strokeWidth="1.6" strokeLinecap="round" />
      </svg>
      <span className={`font-serif text-2xl leading-none ${light ? "text-cream" : "text-moss-dark"}`}>
        Sálvia
        <span className={`block whitespace-nowrap text-[9px] font-sans tracking-[0.16em] uppercase sm:text-[10px] sm:tracking-[0.3em] ${light ? "text-cream/70" : "text-mute"}`}>estúdio de beleza</span>
      </span>
    </span>
  );
}

export function DemoBar() {
  return (
    <p className="bg-moss-dark px-5 py-1.5 text-center text-xs text-cream/85">
      Site de demonstração · estúdio, equipe, preços e agenda são fictícios
    </p>
  );
}

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-linen bg-cream/95 backdrop-blur">
      <div className="mx-auto flex h-18 max-w-6xl items-center justify-between gap-4 px-5 sm:px-8">
        <Link href="/" aria-label={`${studio.name}, página inicial`}>
          <Logo />
        </Link>
        <nav aria-label="Principal" className="hidden lg:block">
          <ul className="flex gap-8 text-[15px] text-mute">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="py-2 hover:text-moss-dark">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-2">
          <Link href="/agendar" className={buttonClasses("primary", "min-h-11 px-4 sm:px-5")}>
            Agendar
          </Link>
          <MobileNav links={NAV_LINKS} />
        </div>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="bg-moss-dark text-cream/80">
      <Container className="grid gap-10 py-14 md:grid-cols-[1.3fr_1fr_1.2fr]">
        <div>
          <Logo light />
          <p className="mt-5 max-w-xs text-sm leading-relaxed">{studio.tagline}.</p>
        </div>
        <nav aria-label="Rodapé">
          <h2 className="font-serif text-lg text-cream">Navegue</h2>
          <ul className="mt-3 space-y-1 text-sm">
            {[...NAV_LINKS, { href: "/agendar", label: "Agendar horário" }].map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="inline-block py-1 hover:text-cream">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <h2 className="font-serif text-lg text-cream">Contato</h2>
          <ul className="mt-3 space-y-2 text-sm">
            <li className="flex gap-2">
              <MapPin aria-hidden className="mt-0.5 h-4 w-4 shrink-0" />
              {studio.address.street} · {studio.address.district}, {studio.address.city} (fictício)
            </li>
            <li>
              <a href={generalWhatsAppUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 py-1 hover:text-cream">
                <MessageCircle aria-hidden className="h-4 w-4" /> WhatsApp
              </a>
            </li>
            <li>
              <a href={studio.phoneHref} className="inline-flex items-center gap-2 py-1 hover:text-cream">
                <Phone aria-hidden className="h-4 w-4" /> {studio.phoneDisplay}
              </a>
            </li>
            <li>
              <a href={`mailto:${studio.email}`} className="inline-flex items-center gap-2 py-1 hover:text-cream">
                <Mail aria-hidden className="h-4 w-4" /> {studio.email}
              </a>
            </li>
            <li>
              <a href={studio.instagramUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 py-1 hover:text-cream">
                <InstagramIcon className="h-4 w-4" /> Instagram
              </a>
            </li>
          </ul>
        </div>
      </Container>
      <div className="border-t border-cream/10">
        <Container className="py-5 text-xs text-cream/60">
          © {new Date().getFullYear()} {studio.name} · marca fictícia criada para demonstração. Contatos e endereço são ilustrativos.
        </Container>
      </div>
    </footer>
  );
}
