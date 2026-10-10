import g1 from "../assets/galeria-1.jpg";
import g2 from "../assets/galeria-2.jpg";
import g3 from "../assets/galeria-3.jpg";
import g4 from "../assets/galeria-4.jpg";
import g5 from "../assets/galeria-5.jpg";
import g6 from "../assets/galeria-6.jpg";

export const gallery = [
  { image: g1, alt: "Cliente recebendo massagem facial com rolo de quartzo", caption: "Facial revitalizante" },
  { image: g2, alt: "Unhas curtas com esmaltação em gel cinza-azulado", caption: "Gel em tom névoa" },
  { image: g3, alt: "Close de olho com cílios curvados e sobrancelha natural", caption: "Lash lifting" },
  { image: g4, alt: "Cabeleireira modelando ondas com babyliss em cabelo castanho iluminado", caption: "Escova modelada" },
  { image: g5, alt: "Parede com expositor de esmaltes e plantas no estúdio", caption: "Nosso cantinho de unhas" },
  { image: g6, alt: "Frascos de sérum e creme sobre bancada branca", caption: "Home care indicado" },
];

export const process = [
  { title: "Escolha os tratamentos", text: "Combine até três serviços. Mostramos duração e valor total na hora." },
  { title: "Profissional, dia e horário", text: "Só aparecem horários em que tudo cabe em sequência, com a mesma profissional." },
  { title: "Confirmação pelo WhatsApp", text: "A recepção confirma em até 2 horas úteis e envia orientações de preparo." },
  { title: "Seu momento", text: "Chegue 10 minutos antes para um chá e uma conversa rápida de avaliação." },
];

export const faq = [
  {
    q: "Posso agendar mais de um tratamento no mesmo horário?",
    a: "Sim. Escolha até três tratamentos e mostramos só os horários em que uma mesma profissional consegue fazer tudo em sequência.",
  },
  {
    q: "A solicitação feita pelo site já garante o horário?",
    a: "Nesta demonstração, não: a disponibilidade é simulada. Em um site real, a recepção confirmaria pelo WhatsApp ou o sistema de agenda reservaria automaticamente.",
  },
  {
    q: "Qual a política de cancelamento?",
    a: "Pedimos aviso com 24 horas de antecedência. Faltas sem aviso podem exigir sinal no próximo agendamento.",
  },
  {
    q: "Por que alguns valores aparecem como “a partir de”?",
    a: "Tratamentos de cabelo variam com comprimento e volume. O valor final é confirmado na avaliação, antes de começar.",
  },
  {
    q: "Vocês usam produtos veganos?",
    a: "Priorizamos marcas cruelty-free e informamos a composição de tudo o que usamos. Tem alguma alergia? Conte nas observações.",
  },
  {
    q: "Quais formas de pagamento são aceitas?",
    a: "Pix, débito e crédito em até 3x sem juros para pacotes. O pagamento é feito no estúdio, após o atendimento.",
  },
] as const;
