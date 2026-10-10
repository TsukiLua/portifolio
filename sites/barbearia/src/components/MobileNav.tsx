"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { CalendarClock, Menu, X } from "lucide-react";
import { buttonClasses } from "./ui";

export function MobileNav({ links }: { links: { href: string; label: string }[] }) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? "Fechar menu" : "Abrir menu"}
        onClick={() => setOpen((v) => !v)}
        className="inline-flex h-11 w-11 items-center justify-center border border-smoke text-bone hover:border-ember"
      >
        {open ? <X aria-hidden className="h-5 w-5" /> : <Menu aria-hidden className="h-5 w-5" />}
      </button>
      <div
        id={panelId}
        hidden={!open}
        className="absolute inset-x-0 top-full z-40 h-[calc(100dvh-4.5rem)] overflow-y-auto border-t border-smoke bg-coal"
      >
        <nav aria-label="Menu móvel" className="px-5 py-8 sm:px-8">
          <ul className="divide-y divide-smoke border-y border-smoke">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block py-4 font-display text-3xl font-bold uppercase text-bone hover:text-ember"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link href="/agendar" onClick={() => setOpen(false)} className={buttonClasses("primary", "mt-8 w-full")}>
            <CalendarClock aria-hidden className="h-4 w-4" />
            Agendar horário
          </Link>
        </nav>
      </div>
    </div>
  );
}
