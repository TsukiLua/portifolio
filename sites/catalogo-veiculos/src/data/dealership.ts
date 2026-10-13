/**
 * Configuração da loja — ÚNICO lugar com nome, contatos, endereço, horários e redes.
 * Todos os dados são FICTÍCIOS. Para adaptar a outra loja, edite este arquivo e as variáveis de ambiente.
 */
export const dealership = {
  name: "Prime Motors",
  legalNote: "Loja fictícia criada para demonstração de portfólio.",
  tagline: "Seminovos selecionados, atendimento sem pressa",
  description:
    "Catálogo de seminovos com busca por marca, preço e categoria. Fale com um consultor pelo WhatsApp e agende sua visita.",
  /** Número exibido. Propositalmente inválido: não pertence a ninguém. */
  phoneDisplay: "(11) 0000-0000",
  phoneHref: "tel:+551100000000",
  email: "contato@primemotors.example",
  address: {
    street: "Av. das Nações Fictícias, 1500",
    district: "Vila Exemplo",
    city: "São Paulo",
    state: "SP",
  },
  hours: [
    { days: "Segunda a sexta", time: "9h às 18h" },
    { days: "Sábado", time: "9h às 14h" },
    { days: "Domingo e feriados", time: "Fechado" },
  ],
  /** Dias da semana sem atendimento (0 = domingo), usados na sugestão de data de visita. */
  closedWeekdays: [0] as readonly number[],
  social: [
    { name: "Instagram", url: "https://www.instagram.com/", note: "link de exemplo" },
    { name: "Facebook", url: "https://www.facebook.com/", note: "link de exemplo" },
    { name: "YouTube", url: "https://www.youtube.com/", note: "link de exemplo" },
  ],
  about: [
    "A Prime Motors é uma loja fictícia de seminovos criada para mostrar como uma revenda pode apresentar o estoque on-line com clareza e transformar visitas ao site em conversas com consultores.",
    "A proposta é simples: poucos carros, bem escolhidos, com informações completas no anúncio e atendimento direto, sem pressão.",
  ],
} as const;

export const fullAddress = `${dealership.address.street} · ${dealership.address.district}, ${dealership.address.city}/${dealership.address.state}`;

/** Resumo dos dias de funcionamento (exclui os fechados), ex.: "Segunda a sexta 9h às 18h · Sábado 9h às 14h". */
export const openingSummary = dealership.hours
  .filter((h) => h.time !== "Fechado")
  .map((h) => `${h.days} ${h.time}`)
  .join(" · ");
