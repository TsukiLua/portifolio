/** Serviços oferecidos. "Preço a partir de" é fictício e serve só para ilustrar a apresentação. */
import type { StaticImageData } from "next/image";
import eletrica from "../assets/eletrica.jpg";
import hidraulica from "../assets/hidraulica.jpg";
import pintura from "../assets/pintura.jpg";
import montagem from "../assets/montagem.jpg";
import climatizacao from "../assets/climatizacao.jpg";
import pisos from "../assets/pisos.jpg";

export type ServiceIcon = "zap" | "droplets" | "paint" | "drill" | "snowflake" | "grid";

export interface HomeService {
  id: string;
  name: string;
  summary: string;
  examples: string[];
  fromPrice: number;
  icon: ServiceIcon;
  image: StaticImageData;
  imageAlt: string;
}

export const homeServices: HomeService[] = [
  {
    id: "eletrica",
    name: "Elétrica",
    summary: "Instalações e reparos com segurança, seguindo a norma NBR 5410.",
    examples: ["Tomadas e interruptores", "Chuveiro e disjuntores", "Luminárias e lustres"],
    fromPrice: 120,
    icon: "zap",
    image: eletrica,
    imageAlt: "Eletricista ajustando fiação de um quadro de distribuição",
  },
  {
    id: "hidraulica",
    name: "Hidráulica",
    summary: "Vazamentos, entupimentos e trocas sem quebra-quebra desnecessário.",
    examples: ["Torneiras e sifões", "Caixa acoplada", "Detecção de vazamentos"],
    fromPrice: 110,
    icon: "droplets",
    image: hidraulica,
    imageAlt: "Torneira preta moderna sobre cuba de cozinha",
  },
  {
    id: "pintura",
    name: "Pintura",
    summary: "Paredes, tetos e portas com proteção de móveis e limpeza ao final.",
    examples: ["Cômodos inteiros", "Retoques e texturas", "Portas e rodapés"],
    fromPrice: 350,
    icon: "paint",
    image: pintura,
    imageAlt: "Pintor de macacão aplicando tinta amarela na parede com rolo",
  },
  {
    id: "montagem",
    name: "Montagem e instalação",
    summary: "Móveis, suportes de TV, prateleiras, cortinas e varais.",
    examples: ["Móveis planejados e de caixa", "Suporte de TV", "Cortinas e persianas"],
    fromPrice: 90,
    icon: "drill",
    image: montagem,
    imageAlt: "Mão segurando furadeira contra parede branca",
  },
  {
    id: "climatizacao",
    name: "Ar-condicionado",
    summary: "Instalação, limpeza e manutenção preventiva de splits.",
    examples: ["Instalação de split", "Higienização", "Recarga de gás"],
    fromPrice: 180,
    icon: "snowflake",
    image: climatizacao,
    imageAlt: "Técnico em escada instalando aparelho de ar-condicionado na parede",
  },
  {
    id: "pisos",
    name: "Pisos e revestimentos",
    summary: "Troca de peças, rejunte, nivelamento e pequenos assentamentos.",
    examples: ["Troca de pisos soltos", "Rejunte e silicone", "Revestimento de parede"],
    fromPrice: 150,
    icon: "grid",
    image: pisos,
    imageAlt: "Mãos assentando peça de revestimento em parede",
  },
];

export const OTHER_SERVICE = "outro";

export const getServiceName = (id: string) =>
  id === OTHER_SERVICE ? "Outro serviço" : homeServices.find((s) => s.id === id)?.name;
