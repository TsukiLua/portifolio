import Link from "next/link";
import { ChevronDown, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { faq, process } from "@/data/content";
import { HOURS, WEEKDAYS, studio } from "@/data/studio";
import { generalWhatsAppUrl } from "@/lib/contact";
import { buttonClasses, Container, Heading } from "../ui";

export function Process() {
  return (
    <section id="como-funciona" aria-labelledby="como-title" className="bg-moss py-20 text-cream sm:py-28">
      <Container>
        <div className="max-w-2xl">
          <p className="font-serif text-lg text-sage-soft italic">Como funciona</p>
          <h2 id="como-title" className="mt-2 font-serif text-4xl leading-[1.1] font-medium sm:text-5xl">
            Do clique ao chá de boas-vindas
          </h2>
        </div>
        <ol className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {process.map((step, i) => (
            <li key={step.title}>
              <span className="font-serif text-6xl text-sage italic">0{i + 1}</span>
              <h3 className="mt-3 text-lg font-semibold">{step.title}</h3>
              <p className="mt-2 text-cream/75">{step.text}</p>
            </li>
          ))}
        </ol>
        <Link href="/agendar" className="mt-14 inline-flex min-h-12 items-center rounded-full bg-cream px-7 font-semibold text-moss-dark hover:bg-white">
          Começar minha solicitação
        </Link>
      </Container>
    </section>
  );
}

export function Faq() {
  return (
    <section id="duvidas" aria-labelledby="duvidas-title" className="py-20 sm:py-28">
      <Container className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <Heading id="duvidas-title" eyebrow="Dúvidas" title="Perguntas frequentes" />
        <div className="space-y-3">
          {faq.map((item) => (
            <details key={item.q} className="group rounded-2xl bg-white/70 px-6 open:bg-white">
              <summary className="flex min-h-14 cursor-pointer items-center justify-between gap-4 py-4 font-semibold">
                {item.q}
                <ChevronDown aria-hidden className="h-5 w-5 shrink-0 text-moss transition-transform group-open:rotate-180" />
              </summary>
              <p className="pb-5 leading-relaxed text-mute">{item.a}</p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}

const ORDER = [2, 3, 4, 5, 6, 0, 1] as const;

export function Visit() {
  return (
    <section id="visite" aria-labelledby="visite-title" className="pb-20 sm:pb-28">
      <Container>
        <div className="grid gap-10 rounded-[2rem] bg-linen/70 p-8 sm:p-12 lg:grid-cols-2">
          <div>
            <Heading id="visite-title" eyebrow="Visite" title="Horários e localização" />
            <address className="mt-8 space-y-3 not-italic">
              <p className="flex gap-3">
                <MapPin aria-hidden className="mt-0.5 h-5 w-5 shrink-0 text-moss" />
                <span>
                  {studio.address.street}
                  <br />
                  {studio.address.district}, {studio.address.city}
                  <span className="block text-sm text-mute">Endereço fictício para demonstração</span>
                </span>
              </p>
              <p className="flex gap-3">
                <Phone aria-hidden className="h-5 w-5 shrink-0 text-moss" />
                <a href={studio.phoneHref} className="hover:text-moss">{studio.phoneDisplay}</a>
                <span className="text-sm text-mute">(fictício)</span>
              </p>
              <p className="flex gap-3">
                <Mail aria-hidden className="h-5 w-5 shrink-0 text-moss" />
                <a href={`mailto:${studio.email}`} className="hover:text-moss">{studio.email}</a>
              </p>
            </address>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/agendar" className={buttonClasses("primary")}>Solicitar horário</Link>
              <a href={generalWhatsAppUrl} target="_blank" rel="noopener noreferrer" className={buttonClasses("whatsapp")}>
                <MessageCircle aria-hidden className="h-4 w-4" /> WhatsApp
              </a>
            </div>
          </div>
          <table className="w-full self-start text-left">
            <caption className="mb-4 text-left font-serif text-2xl text-moss-dark">Funcionamento</caption>
            <tbody className="divide-y divide-linen">
              {ORDER.map((day) => (
                <tr key={day}>
                  <th scope="row" className="py-3 font-normal text-mute">{WEEKDAYS[day]}</th>
                  <td className="py-3 text-right font-semibold tabular-nums">
                    {HOURS[day].length ? HOURS[day].map((r) => `${r.start}–${r.end}`).join(" · ") : <span className="font-normal text-mute">Fechado</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Container>
    </section>
  );
}
