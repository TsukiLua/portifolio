/** Conteúdo editorial. Depoimentos são FICTÍCIOS. */
import type { StaticImageData } from "next/image";
import g1 from "../assets/galeria-1.jpg";
import g2 from "../assets/galeria-2.jpg";
import g3 from "../assets/galeria-3.jpg";
import g4 from "../assets/galeria-4.jpg";
import g5 from "../assets/galeria-5.jpg";

export const benefits = [
  { icon: "badge", title: "Profissionais identificados", text: "Equipe própria, uniformizada e com crachá. Você sabe quem entra na sua casa." },
  { icon: "receipt", title: "Orçamento sem compromisso", text: "Preço fechado antes de começar. Sem taxa de visita se você aprovar o serviço." },
  { icon: "shield", title: "Garantia de 90 dias", text: "Algo deu errado? Voltamos sem custo para resolver." },
  { icon: "sparkles", title: "Casa limpa no final", text: "Protegemos móveis e piso e deixamos tudo organizado ao terminar." },
] as const;

export const steps = [
  { title: "Conte o que precisa", text: "Preencha o formulário ou chame no WhatsApp. Fotos ajudam muito." },
  { title: "Receba o orçamento", text: "Retornamos em até 2 horas úteis com valor e prazo." },
  { title: "Agende a visita", text: "Você escolhe o melhor dia e período para o atendimento." },
  { title: "Serviço com garantia", text: "Executamos, limpamos e você só paga ao final." },
] as const;

export interface WorkItem {
  image: StaticImageData;
  alt: string;
  title: string;
  tag: string;
}

export const works: WorkItem[] = [
  { image: g1, alt: "Sala clara com piso de madeira e sofá branco", title: "Pintura completa de sala", tag: "Pintura" },
  { image: g2, alt: "Sala de estar com lareira, espelho e mesa de centro", title: "Instalação de luminárias", tag: "Elétrica" },
  { image: g3, alt: "Sala aconchegante com fogão a lenha e tapete", title: "Montagem de estante e prateleiras", tag: "Montagem" },
  { image: g4, alt: "Profissionais cortando madeira com serra de esquadria", title: "Rodapés e acabamentos", tag: "Reparos" },
  { image: g5, alt: "Cozinha integrada com bancada e banquetas", title: "Ar-condicionado na sala integrada", tag: "Climatização" },
];

/** Depoimentos ILUSTRATIVOS: não são de clientes reais. */
export const testimonials = [
  {
    author: "Fernanda L.",
    region: "Jardim das Acácias",
    text: "Pedi orçamento de manhã e à tarde o chuveiro já estava funcionando. Deixaram o banheiro mais limpo do que encontraram.",
  },
  {
    author: "Ricardo S.",
    region: "Vila Aurora",
    text: "Pintaram dois quartos em um dia e meio, com os móveis todos protegidos. Preço exatamente o do orçamento.",
  },
  {
    author: "Patrícia M.",
    region: "Parque dos Ipês",
    text: "Montaram o guarda-roupa e instalaram o suporte da TV. Pontuais e muito educados.",
  },
] as const;

export const faq = [
  {
    q: "A visita para orçamento é cobrada?",
    a: "Para a maioria dos serviços, o orçamento sai por foto e descrição, sem custo. Quando é preciso visitar, a taxa é abatida se você aprovar o serviço.",
  },
  {
    q: "Em quanto tempo vocês respondem?",
    a: "Em até 2 horas úteis, de segunda a sábado. Pedidos feitos à noite são respondidos na manhã seguinte.",
  },
  {
    q: "O material está incluso?",
    a: "Você escolhe: compramos o material e apresentamos a nota, ou usamos o que você já tem. O orçamento deixa isso claro.",
  },
  {
    q: "Quais formas de pagamento vocês aceitam?",
    a: "Pix, cartão de débito e crédito em até 3x sem juros. O pagamento é feito ao final do serviço.",
  },
  {
    q: "Como funciona a garantia?",
    a: "Todo serviço tem 90 dias de garantia sobre a mão de obra. Se algo apresentar defeito, voltamos sem custo.",
  },
  {
    q: "Atendem fora dos bairros listados?",
    a: "Talvez. Envie o pedido escolhendo “Outro bairro” que avaliamos o deslocamento caso a caso.",
  },
] as const;
