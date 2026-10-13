"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

/** Links do menu com indicação da página atual (aria-current). */
export function NavLinks({ items }: { items: { href: string; label: string }[] }) {
  const pathname = usePathname();
  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href)) || (href === "/estoque" && pathname.startsWith("/veiculos"));
  return (
    <ul className="flex items-center gap-1">
      {items.map((item) => (
        <li key={item.href}>
          <Link
            href={item.href}
            aria-current={isActive(item.href) ? "page" : undefined}
            className="rounded-md px-3 py-2 text-sm font-medium text-steel transition-colors hover:text-ink aria-[current=page]:text-ink aria-[current=page]:underline aria-[current=page]:decoration-wine aria-[current=page]:decoration-2 aria-[current=page]:underline-offset-8"
          >
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}
