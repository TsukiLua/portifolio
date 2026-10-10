import Link from "next/link";
import { store } from "@/data/store";
import { generalWhatsAppUrl } from "@/lib/contact";
import { InstagramIcon } from "../icons";
import { Container } from "../ui";
import { Logo } from "./Brand";
import { CATEGORY_LINKS, PAGE_LINKS } from "./Header";

export function Footer() {
  return (
    <footer id="contato" className="mt-24 border-t border-sand bg-paper">
      <Container className="grid gap-12 py-16 md:grid-cols-[1.3fr_1fr_1fr_1.2fr]">
        <div>
          <Logo className="items-start" />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-stone">{store.tagline}. Catálogo digital com pedidos pelo WhatsApp.</p>
        </div>
        <nav aria-label="Categorias (rodapé)">
          <h2 className="text-[11px] font-medium uppercase tracking-[0.28em]">Categorias</h2>
          <ul className="mt-4 space-y-1 text-sm text-stone">
            {CATEGORY_LINKS.map((c) => (
              <li key={c.href}>
                <Link href={c.href} className="inline-block py-1 hover:text-ink">
                  {c.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <nav aria-label="Institucional">
          <h2 className="text-[11px] font-medium uppercase tracking-[0.28em]">A Maré</h2>
          <ul className="mt-4 space-y-1 text-sm text-stone">
            {PAGE_LINKS.map((p) => (
              <li key={p.href}>
                <Link href={p.href} className="inline-block py-1 hover:text-ink">
                  {p.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <h2 className="text-[11px] font-medium uppercase tracking-[0.28em]">Contato</h2>
          <address className="mt-4 space-y-2 text-sm not-italic text-stone">
            <p>{store.address}</p>
            <p>{store.hours}</p>
            <p>
              <a href={generalWhatsAppUrl} target="_blank" rel="noopener noreferrer" className="inline-block py-1 text-ink underline underline-offset-4 hover:text-clay">
                Atendimento pelo WhatsApp
              </a>
            </p>
            <p>
              <a href={store.phoneHref} className="hover:text-ink">
                {store.phoneDisplay}
              </a>{" "}
              · <a href={`mailto:${store.email}`} className="hover:text-ink">{store.email}</a>
            </p>
            <p>
              <a href={store.instagramUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 py-1 hover:text-ink">
                <InstagramIcon className="h-4 w-4" /> Instagram
              </a>
            </p>
          </address>
        </div>
      </Container>
      <div className="border-t border-sand">
        <Container className="flex flex-col gap-1 py-5 text-xs text-stone sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} {store.fullName} · marca fictícia para demonstração.</p>
          <p>Endereço, telefone e redes sociais são ilustrativos.</p>
        </Container>
      </div>
    </footer>
  );
}
