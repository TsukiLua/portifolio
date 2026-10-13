import Link from "next/link";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { dealership, fullAddress } from "@/data/dealership";
import { generalWhatsAppLink } from "@/lib/whatsapp";
import { SocialIcon, WhatsAppIcon } from "../ui/icons";
import { Container } from "../ui/primitives";
import { Logo, NAV_ITEMS } from "./Header";

export function Footer() {
  return (
    <footer className="mt-20 bg-ink text-white/75">
      <Container className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1.2fr_1.2fr]">
        <div>
          <Logo light />
          <p className="mt-4 max-w-xs text-sm leading-relaxed">{dealership.tagline}.</p>
          <p className="mt-4 rounded-lg border border-white/15 p-3 text-xs leading-relaxed">
            <strong className="text-white">Aviso:</strong> a {dealership.name} é uma loja fictícia. Estoque, preços, contatos
            e endereço existem apenas para demonstração.
          </p>
        </div>
        <nav aria-label="Rodapé">
          <h2 className="text-sm font-semibold text-white">Navegação</h2>
          <ul className="mt-3 space-y-1 text-sm">
            {[...NAV_ITEMS, { href: "/privacidade", label: "Privacidade" }].map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="inline-block py-1 hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <h2 className="text-sm font-semibold text-white">Horários</h2>
          <ul className="mt-3 space-y-2 text-sm">
            {dealership.hours.map((h) => (
              <li key={h.days} className="flex gap-2">
                <Clock aria-hidden className="mt-0.5 h-4 w-4 shrink-0" />
                <span>
                  {h.days}: <span className="text-white">{h.time}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-sm font-semibold text-white">Contato</h2>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <a href={generalWhatsAppLink()} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-white">
                <WhatsAppIcon className="h-4 w-4" /> WhatsApp
              </a>
            </li>
            <li>
              <a href={dealership.phoneHref} className="inline-flex items-center gap-2 hover:text-white">
                <Phone aria-hidden className="h-4 w-4" /> {dealership.phoneDisplay} (fictício)
              </a>
            </li>
            <li>
              <a href={`mailto:${dealership.email}`} className="inline-flex items-center gap-2 break-all hover:text-white">
                <Mail aria-hidden className="h-4 w-4 shrink-0" /> {dealership.email}
              </a>
            </li>
            <li className="flex gap-2">
              <MapPin aria-hidden className="mt-0.5 h-4 w-4 shrink-0" /> {fullAddress}
            </li>
          </ul>
          <ul className="mt-4 flex gap-2" aria-label="Redes sociais (links de exemplo)">
            {dealership.social.map((s) => (
              <li key={s.name}>
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${s.name} (${s.note})`}
                  title={`${s.name} — ${s.note}`}
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/15 hover:border-white/50 hover:text-white"
                >
                  <SocialIcon name={s.name} />
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-2 text-xs text-white/50">Redes sociais: links de exemplo.</p>
        </div>
      </Container>
      <div className="border-t border-white/10">
        <Container className="flex flex-col gap-1 py-5 text-xs text-white/50 sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} {dealership.name} · {dealership.legalNote}</p>
          <p>Fotos: Wikimedia Commons, licenças CC BY/CC BY-SA (créditos no repositório).</p>
        </Container>
      </div>
    </footer>
  );
}
