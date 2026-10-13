import type { Metadata } from "next";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { ContactForm } from "@/components/forms/ContactForm";
import { WhatsAppIcon } from "@/components/ui/icons";
import { buttonClasses, Container } from "@/components/ui/primitives";
import { dealership, fullAddress } from "@/data/dealership";
import { generalWhatsAppLink } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Contato",
  description: "Fale com um consultor da Prime Motors pelo WhatsApp, telefone ou formulário.",
  alternates: { canonical: "/contato" },
};

export default function ContactPage() {
  return (
    <Container className="pt-10 sm:pt-14">
      <h1 className="font-display text-4xl font-extrabold sm:text-5xl">Contato</h1>
      <p className="mt-3 max-w-xl text-steel">Tire dúvidas, peça uma avaliação do seu usado ou combine uma visita. O caminho mais rápido é o WhatsApp.</p>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_1.4fr]">
        <div className="space-y-5">
          <a href={generalWhatsAppLink()} target="_blank" rel="noopener noreferrer" className={buttonClasses("whatsapp", "w-full text-base")}>
            <WhatsAppIcon /> Conversar no WhatsApp
          </a>
          <address className="space-y-4 rounded-xl border border-line bg-surface p-5 not-italic">
            <p className="flex gap-3">
              <Phone aria-hidden className="mt-0.5 h-5 w-5 shrink-0 text-wine" />
              <span>
                <a href={dealership.phoneHref} className="font-semibold hover:text-wine">{dealership.phoneDisplay}</a>
                <span className="block text-sm text-steel">Número fictício de demonstração</span>
              </span>
            </p>
            <p className="flex gap-3">
              <Mail aria-hidden className="mt-0.5 h-5 w-5 shrink-0 text-wine" />
              <a href={`mailto:${dealership.email}`} className="break-all hover:text-wine">{dealership.email}</a>
            </p>
            <p className="flex gap-3">
              <MapPin aria-hidden className="mt-0.5 h-5 w-5 shrink-0 text-wine" />
              <span>
                {fullAddress}
                <span className="block text-sm text-steel">Endereço fictício</span>
              </span>
            </p>
          </address>
          <div className="rounded-xl border border-line bg-surface p-5">
            <h2 className="flex items-center gap-2 font-semibold">
              <Clock aria-hidden className="h-5 w-5 text-wine" /> Horário de atendimento
            </h2>
            <dl className="mt-3 divide-y divide-line text-sm">
              {dealership.hours.map((h) => (
                <div key={h.days} className="flex justify-between gap-4 py-2">
                  <dt className="text-steel">{h.days}</dt>
                  <dd className="font-semibold">{h.time}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
        <ContactForm />
      </div>
    </Container>
  );
}
