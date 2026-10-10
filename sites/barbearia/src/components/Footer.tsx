import Link from "next/link";
import { Mail, MessageCircle, Phone } from "lucide-react";
import { business } from "@/data/business";
import { generalWhatsAppUrl } from "@/lib/contact";
import { NAV_LINKS } from "./Header";
import { InstagramIcon } from "./icons";
import { Logo } from "./Logo";
import { Container } from "./ui";

export function Footer() {
  return (
    <footer className="border-t border-smoke bg-coal">
      <Container className="grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-2">
          <Logo />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-ash">{business.description}</p>
        </div>
        <nav aria-label="Rodapé">
          <h2 className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-bone">Navegação</h2>
          <ul className="space-y-1 text-sm text-ash">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="inline-block py-1.5 hover:text-bone">
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/agendar" className="inline-block py-1.5 hover:text-bone">
                Agendar horário
              </Link>
            </li>
          </ul>
        </nav>
        <div>
          <h2 className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-bone">Contato</h2>
          <ul className="space-y-1 text-sm text-ash">
            <li>
              <a href={generalWhatsAppUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 py-1.5 hover:text-bone">
                <MessageCircle aria-hidden className="h-4 w-4" /> WhatsApp
              </a>
            </li>
            <li>
              <a href={business.phoneHref} className="inline-flex items-center gap-2 py-1.5 hover:text-bone">
                <Phone aria-hidden className="h-4 w-4" /> {business.phoneDisplay}
              </a>
            </li>
            <li>
              <a href={`mailto:${business.email}`} className="inline-flex items-center gap-2 py-1.5 hover:text-bone">
                <Mail aria-hidden className="h-4 w-4" /> {business.email}
              </a>
            </li>
            <li>
              <a
                href={business.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 py-1.5 hover:text-bone"
              >
                <InstagramIcon className="h-4 w-4" /> Instagram
              </a>
            </li>
          </ul>
        </div>
      </Container>
      <div className="border-t border-smoke">
        <Container className="flex flex-col gap-2 py-6 text-xs text-ash sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} {business.name} · marca fictícia criada para demonstração.</p>
          <p>Contatos, endereço e redes sociais são ilustrativos.</p>
        </Container>
      </div>
    </footer>
  );
}
