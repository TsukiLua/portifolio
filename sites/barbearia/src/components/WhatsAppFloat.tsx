import { MessageCircle } from "lucide-react";
import { generalWhatsAppUrl } from "@/lib/contact";

export function WhatsAppFloat() {
  return (
    <a
      href={generalWhatsAppUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Conversar pelo WhatsApp (abre em nova aba)"
      className="fixed right-4 bottom-4 z-30 inline-flex h-14 items-center gap-2 rounded-full bg-[#1f7a4d] px-4 text-sm font-bold text-white shadow-lg shadow-black/40 transition-colors hover:bg-[#25935c] sm:right-6 sm:bottom-6 sm:px-5"
    >
      <MessageCircle aria-hidden className="h-6 w-6" />
      <span className="hidden sm:inline">WhatsApp</span>
    </a>
  );
}
