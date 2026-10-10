import Link from "next/link";
import { business } from "@/data/business";
import { serviceWhatsAppUrl } from "@/lib/contact";
import { NAV_LINKS } from "./Header";
import { Logo } from "./Logo";
import { Container } from "./ui";

export function Footer() {
  return (
    <footer className="bg-ink text-white/75">
      <Container className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Logo invert />
          <p className="mt-4 max-w-sm text-sm leading-relaxed">{business.description}</p>
          <p className="mt-4 text-xs">
            {business.legalName}
            <br />
            CNPJ {business.cnpj}
          </p>
        </div>
        <nav aria-label="Rodapé">
          <h2 className="text-sm font-bold text-white">Navegue</h2>
          <ul className="mt-3 space-y-1 text-sm">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="inline-block py-1 hover:text-white">
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/#orcamento" className="inline-block py-1 hover:text-white">
                Pedir orçamento
              </Link>
            </li>
          </ul>
        </nav>
        <div>
          <h2 className="text-sm font-bold text-white">Contato</h2>
          <ul className="mt-3 space-y-1 text-sm">
            <li>
              <a href={serviceWhatsAppUrl()} target="_blank" rel="noopener noreferrer" className="inline-block py-1 hover:text-white">
                WhatsApp
              </a>
            </li>
            <li>
              <a href={business.phoneHref} className="inline-block py-1 hover:text-white">
                {business.phoneDisplay} (fictício)
              </a>
            </li>
            <li>
              <a href={`mailto:${business.email}`} className="inline-block py-1 break-all hover:text-white">
                {business.email}
              </a>
            </li>
            <li className="pt-1">{business.hours}</li>
            <li>{business.city}</li>
          </ul>
        </div>
      </Container>
      <div className="border-t border-white/10">
        <Container className="py-5 text-xs">
          © {new Date().getFullYear()} {business.name} · empresa fictícia criada para demonstração de portfólio.
        </Container>
      </div>
    </footer>
  );
}
