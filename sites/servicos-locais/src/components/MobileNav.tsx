"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { Menu, MessageCircle, Phone, X } from "lucide-react";
import { business } from "@/data/business";
import { serviceWhatsAppUrl } from "@/lib/contact";
import { buttonClasses } from "./ui";

export function MobileNav({ links }: { links: { href: string; label: string }[] }) {
  const [open, setOpen] = useState(false);
  const id = useId();
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={id}
        aria-label={open ? "Fechar menu" : "Abrir menu"}
        onClick={() => setOpen((v) => !v)}
        className="inline-flex h-11 w-11 items-center justify-center rounded-xl border-2 border-line text-ink"
      >
        {open ? <X aria-hidden className="h-5 w-5" /> : <Menu aria-hidden className="h-5 w-5" />}
      </button>
      <div id={id} hidden={!open} className="absolute inset-x-0 top-full border-b border-line bg-white shadow-xl shadow-ink/10">
        <nav aria-label="Menu móvel" className="mx-auto max-w-6xl px-5 py-4 sm:px-8">
          <ul>
            {links.map((l) => (
              <li key={l.href}>
                <Link href={l.href} onClick={() => setOpen(false)} className="block rounded-lg px-3 py-3.5 text-lg font-semibold hover:bg-paper">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-4 grid gap-3 border-t border-line pt-5 sm:grid-cols-2">
            <Link href="/#orcamento" onClick={() => setOpen(false)} className={buttonClasses("primary")}>
              Pedir orçamento
            </Link>
            <a href={serviceWhatsAppUrl()} target="_blank" rel="noopener noreferrer" className={buttonClasses("whatsapp")}>
              <MessageCircle aria-hidden className="h-5 w-5" /> WhatsApp
            </a>
            <a href={business.phoneHref} className={buttonClasses("outline", "sm:col-span-2")}>
              <Phone aria-hidden className="h-4 w-4" /> {business.phoneDisplay} <span className="font-normal text-muted">(fictício)</span>
            </a>
          </div>
        </nav>
      </div>
    </div>
  );
}
