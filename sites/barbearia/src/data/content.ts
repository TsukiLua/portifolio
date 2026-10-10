/** Conteúdo editorial: galeria, avaliações (fictícias) e perguntas frequentes. */
import type { StaticImageData } from "next/image";
import g1 from "../assets/galeria-1.jpg";
import g2 from "../assets/galeria-2.jpg";
import g3 from "../assets/galeria-3.jpg";
import g4 from "../assets/galeria-4.jpg";
import g5 from "../assets/galeria-5.jpg";
import g6 from "../assets/galeria-6.jpg";

export interface GalleryItem {
  image: StaticImageData;
  alt: string;
  caption: string;
}

export const gallery: GalleryItem[] = [
  { image: g1, alt: "Degradê médio sendo finalizado com máquina e pente", caption: "Mid fade com topo texturizado" },
  { image: g2, alt: "Corte curto com degradê alto em cliente de perfil", caption: "High fade militar" },
  { image: g3, alt: "Nuca com degradê e desenho de risco feito à navalha", caption: "Freestyle com risco" },
  { image: g4, alt: "Barba cheia sendo aparada com tesoura, em preto e branco", caption: "Barba esculpida na tesoura" },
  { image: g5, alt: "Topete volumoso sendo escovado após o corte", caption: "Pompadour clássico" },
  { image: g6, alt: "Barbeiro de luvas fazendo acabamento na nuca de cliente tatuado", caption: "Acabamento de precisão" },
];

/** Avaliações ILUSTRATIVAS: não são de clientes reais. */
export const reviews = [
  {
    author: "Lucas P.",
    text: "Marquei pelo celular no almoço e fui atendido no horário exato. O degradê ficou impecável.",
    service: "Degradê (fade)",
  },
  {
    author: "Thiago R.",
    text: "Toalha quente, navalha e zero pressa. A barba nunca ficou tão alinhada.",
    service: "Barba completa",
  },
  {
    author: "André M.",
    text: "Ambiente bonito, conversa boa e o corte durou bem mais do que eu esperava.",
    service: "Corte clássico",
  },
] as const;

export const faq = [
  {
    q: "Preciso agendar ou posso chegar sem hora marcada?",
    a: "Damos prioridade a quem agenda. Encaixes sem horário acontecem quando há janela livre na agenda, então vale conferir pelo WhatsApp antes de vir.",
  },
  {
    q: "Qual a tolerância para atrasos?",
    a: "Seguramos o horário por até 10 minutos. Depois disso, tentamos reencaixar no mesmo dia, sem garantia.",
  },
  {
    q: "Como cancelo ou remarco?",
    a: "Pelo WhatsApp, com pelo menos 2 horas de antecedência. Assim liberamos o horário para outro cliente.",
  },
  {
    q: "Quais formas de pagamento são aceitas?",
    a: "Pix, cartões de débito e crédito e dinheiro. O pagamento é feito na barbearia, após o atendimento.",
  },
  {
    q: "Vocês atendem crianças?",
    a: "Sim, a partir de 6 anos, sempre com um responsável presente.",
  },
  {
    q: "Tem estacionamento?",
    a: "Não temos estacionamento próprio, mas há vagas na rua e um estacionamento conveniado a 50 metros.",
  },
] as const;
