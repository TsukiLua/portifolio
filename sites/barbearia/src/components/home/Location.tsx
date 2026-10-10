import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { HOURS, WEEKDAY_NAMES, business } from "@/data/business";
import { generalWhatsAppUrl } from "@/lib/contact";
import { buttonClasses, Container, SectionHeading } from "../ui";

// Exibe de terça a segunda, que é como o cliente lê a semana de uma barbearia.
const ORDER = [2, 3, 4, 5, 6, 0, 1] as const;

export function Location() {
  return (
    <section id="contato" aria-labelledby="contato-title" className="border-t border-smoke bg-char py-24 sm:py-32">
      <Container className="grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
        <div>
          <SectionHeading id="contato-title" eyebrow="Horários e endereço" title="Passe aqui" />
          <table className="mt-10 w-full text-left">
            <caption className="sr-only">Horário de funcionamento</caption>
            <tbody className="divide-y divide-smoke">
              {ORDER.map((day) => {
                const ranges = HOURS[day];
                return (
                  <tr key={day}>
                    <th scope="row" className="py-3 font-normal text-ash">
                      {WEEKDAY_NAMES[day]}
                    </th>
                    <td className="py-3 text-right font-bold tabular-nums">
                      {ranges.length ? ranges.map((r) => `${r.start} – ${r.end}`).join(" · ") : <span className="text-ash">Fechado</span>}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <address className="mt-10 space-y-4 not-italic">
            <p className="flex gap-3">
              <MapPin aria-hidden className="mt-0.5 h-5 w-5 shrink-0 text-ember" />
              <span>
                {business.address.street} · {business.address.district}, {business.address.city}/{business.address.state}
                <span className="block text-sm text-ash">{business.address.note}</span>
              </span>
            </p>
            <p className="flex gap-3">
              <Phone aria-hidden className="h-5 w-5 shrink-0 text-ember" />
              <a href={business.phoneHref} className="hover:text-ember">
                {business.phoneDisplay} <span className="text-sm text-ash">(número fictício)</span>
              </a>
            </p>
            <p className="flex gap-3">
              <Mail aria-hidden className="h-5 w-5 shrink-0 text-ember" />
              <a href={`mailto:${business.email}`} className="break-all hover:text-ember">
                {business.email}
              </a>
            </p>
          </address>
          <a href={generalWhatsAppUrl} target="_blank" rel="noopener noreferrer" className={buttonClasses("outline", "mt-10")}>
            <MessageCircle aria-hidden className="h-4 w-4" />
            Falar no WhatsApp
          </a>
        </div>

        <figure className="relative min-h-80 overflow-hidden border border-smoke bg-coal">
          <IllustrativeMap />
          <figcaption className="absolute bottom-0 left-0 right-0 flex items-center justify-between gap-4 border-t border-smoke bg-coal/95 px-5 py-4 text-sm">
            <span className="font-bold">{business.name}</span>
            <span className="text-ash">Mapa ilustrativo</span>
          </figcaption>
        </figure>
      </Container>
    </section>
  );
}

function IllustrativeMap() {
  return (
    <svg aria-hidden viewBox="0 0 600 520" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full">
      <rect width="600" height="520" fill="var(--color-coal)" />
      <g stroke="var(--color-smoke)" strokeWidth="18" fill="none">
        <path d="M-20 140 L620 90" />
        <path d="M-20 330 L620 380" />
        <path d="M150 -20 L210 540" />
        <path d="M420 -20 L380 540" />
      </g>
      <g stroke="var(--color-smoke)" strokeWidth="6" fill="none" opacity="0.7">
        <path d="M-20 240 L620 236" />
        <path d="M300 -20 L292 540" />
        <path d="M-20 450 L620 470" />
        <path d="M520 -20 L560 540" />
        <path d="M60 -20 L40 540" />
      </g>
      <rect x="225" y="250" width="56" height="62" fill="color-mix(in srgb, var(--color-ember) 14%, transparent)" />
      <circle cx="300" cy="236" r="46" fill="color-mix(in srgb, var(--color-ember) 18%, transparent)" />
      <path d="M300 196c-17 0-30 13-30 29 0 22 30 51 30 51s30-29 30-51c0-16-13-29-30-29Z" fill="var(--color-ember)" />
      <circle cx="300" cy="225" r="10" fill="var(--color-coal)" />
    </svg>
  );
}
