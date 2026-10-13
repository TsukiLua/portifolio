"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

type Item = { id: string; label: string };

/**
 * Navegação por seções com indicação da seção atual (aria-current="location").
 * Na home, observa as seções na tela; nas páginas de projeto, "Projetos" fica marcado.
 */
export function SectionNav({ items, onNavigate, vertical = false }: { items: readonly Item[]; onNavigate?: () => void; vertical?: boolean }) {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [active, setActive] = useState<string>("inicio");

  useEffect(() => {
    if (!isHome) return;
    const sections = items.map((i) => document.getElementById(i.id)).filter((s): s is HTMLElement => !!s);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      // Considera "atual" a seção que ocupa a faixa logo abaixo do cabeçalho.
      { rootMargin: "-20% 0px -70% 0px" },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [isHome, items]);

  const current = isHome ? active : pathname.startsWith("/projetos") ? "projetos" : "";

  return (
    <ul className={vertical ? "divide-y divide-ink/10 border-y border-ink/10" : "flex items-center gap-1"}>
      {items.map((item) => (
        <li key={item.id}>
          <Link
            href={item.id === "inicio" ? "/" : `/#${item.id}`}
            onClick={onNavigate}
            aria-current={current === item.id ? "location" : undefined}
            className={
              vertical
                ? "block py-4 text-2xl font-medium aria-[current=location]:text-accent"
                : "relative rounded-full px-3.5 py-2 text-sm text-mute transition-colors hover:text-ink aria-[current=location]:bg-ink/[0.06] aria-[current=location]:text-ink"
            }
          >
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}
