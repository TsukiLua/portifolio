import Link from "next/link";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";
import { GENERAL_MESSAGE, mailtoLink, whatsappLink } from "@/lib/contact";
import { Container } from "../ui/primitives";
import { Monogram, NAV_ITEMS } from "./Header";

export function Footer() {
  return (
    <footer className="border-t border-ink/10 bg-paper">
      <Container className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-2.5">
            <Monogram />
            <span className="font-semibold">{profile.brand}</span>
          </div>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-mute">{profile.description}</p>
        </div>
        <nav aria-label="Rodapé">
          <h2 className="font-mono text-xs tracking-wider text-mute uppercase">Navegação</h2>
          <ul className="mt-3 space-y-1 text-sm">
            {NAV_ITEMS.map((i) => (
              <li key={i.id}>
                <Link href={i.id === "inicio" ? "/" : `/#${i.id}`} className="inline-block py-1 hover:text-accent">
                  {i.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <h2 className="font-mono text-xs tracking-wider text-mute uppercase">Contato</h2>
          <ul className="mt-3 space-y-1 text-sm">
            <li>
              <a href={whatsappLink(GENERAL_MESSAGE)} target="_blank" rel="noopener noreferrer" className="inline-block py-1 hover:text-accent">
                WhatsApp
              </a>
            </li>
            <li>
              <a href={mailtoLink("Orçamento de site")} className="inline-block py-1 break-all hover:text-accent">
                {profile.email}
              </a>
            </li>
            {/* Redes só aparecem quando configuradas em src/data/profile.ts. */}
            {profile.social.map((s) => (
              <li key={s.url}>
                <a href={s.url} target="_blank" rel="noopener noreferrer me" className="inline-block py-1 hover:text-accent">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Container>
      <div className="border-t border-ink/10">
        <Container className="flex flex-col gap-1 py-5 text-xs text-mute sm:flex-row sm:justify-between">
          <p>
            © {new Date().getFullYear()} {profile.name}. Todos os direitos reservados.
          </p>
          {projects.every((p) => p.status === "demonstrativo") && <p>Projetos exibidos são demonstrativos, desenvolvidos para este portfólio.</p>}
        </Container>
      </div>
    </footer>
  );
}
