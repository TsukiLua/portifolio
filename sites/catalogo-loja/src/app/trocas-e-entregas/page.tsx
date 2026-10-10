import type { Metadata } from "next";
import Link from "next/link";
import { Container, Eyebrow } from "@/components/ui";
import { generalWhatsAppUrl } from "@/lib/contact";

export const metadata: Metadata = {
  title: "Trocas e entregas",
  description: "Prazos de entrega, retirada na loja, trocas e devoluções da Maré.",
};

const sections = [
  {
    id: "entregas",
    title: "Entregas",
    items: [
      "Entrega local por motoboy em até 2 dias úteis após a confirmação do pagamento (taxa fixa de R$ 15,00).",
      "Envio para todo o Brasil pelos Correios, com prazo e frete calculados no atendimento.",
      "Pedidos acima de R$ 400,00 têm frete grátis na entrega local.",
      "Você recebe o código de rastreio pelo WhatsApp assim que o pedido é postado.",
    ],
  },
  {
    id: "retirada",
    title: "Retirada na loja",
    items: [
      "Grátis. A peça fica separada por até 3 dias úteis após a confirmação.",
      "Leve um documento com foto ou informe o nome usado no pedido.",
    ],
  },
  {
    id: "trocas",
    title: "Trocas",
    items: [
      "A primeira troca é grátis em até 30 dias após o recebimento.",
      "A peça deve estar sem uso, com etiqueta e na embalagem original.",
      "Trocas podem ser feitas na loja ou combinadas pelo WhatsApp.",
      "Peças em promoção podem ser trocadas por tamanho ou cor, conforme disponibilidade.",
    ],
  },
  {
    id: "devolucoes",
    title: "Devoluções e arrependimento",
    items: [
      "Compras feitas à distância podem ser devolvidas em até 7 dias corridos após o recebimento, conforme o Código de Defesa do Consumidor.",
      "O reembolso é feito pelo mesmo meio de pagamento em até 10 dias úteis após recebermos a peça.",
      "Defeitos de fabricação têm cobertura de 90 dias.",
    ],
  },
];

export default function PolicyPage() {
  return (
    <Container className="pt-12 sm:pt-16">
      <div className="grid gap-12 lg:grid-cols-[16rem_1fr] lg:gap-20">
        <aside>
          <Eyebrow>Ajuda</Eyebrow>
          <h1 className="mt-4 font-serif text-5xl leading-tight">Trocas e entregas</h1>
          <p className="mt-4 border-l-2 border-clay pl-4 text-sm text-stone">
            Política <strong>demonstrativa</strong>: prazos e valores são exemplos e devem ser ajustados para cada loja.
          </p>
          <nav aria-label="Seções da política" className="mt-8 hidden lg:block">
            <ul className="space-y-2 text-sm">
              {sections.map((s) => (
                <li key={s.id}>
                  <a href={`#${s.id}`} className="text-stone hover:text-ink">{s.title}</a>
                </li>
              ))}
            </ul>
          </nav>
        </aside>
        <div className="max-w-2xl space-y-14">
          {sections.map((s) => (
            <section key={s.id} id={s.id} aria-labelledby={`${s.id}-t`}>
              <h2 id={`${s.id}-t`} className="font-serif text-3xl">{s.title}</h2>
              <ul className="mt-5 space-y-3 border-t border-sand pt-5">
                {s.items.map((item) => (
                  <li key={item} className="flex gap-3 leading-relaxed text-stone">
                    <span aria-hidden className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-clay" />
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          ))}
          <p className="text-stone">
            Ficou alguma dúvida?{" "}
            <a href={generalWhatsAppUrl} target="_blank" rel="noopener noreferrer" className="text-ink underline underline-offset-4">
              Fale com a gente no WhatsApp
            </a>{" "}
            ou <Link href="/catalogo" className="text-ink underline underline-offset-4">volte ao catálogo</Link>.
          </p>
        </div>
      </div>
    </Container>
  );
}
