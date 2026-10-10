/** Equipe fictícia. As fotos são de banco de imagens; os nomes não correspondem às pessoas retratadas. */
import type { StaticImageData } from "next/image";
import barbeiro1 from "../assets/barbeiro-1.jpg";
import barbeiro2 from "../assets/barbeiro-2.jpg";
import barbeiro3 from "../assets/barbeiro-3.jpg";

export interface Barber {
  id: string;
  name: string;
  role: string;
  bio: string;
  specialties: string[];
  /** Serviços que este profissional realiza. */
  serviceIds: string[];
  photo: StaticImageData;
  photoAlt: string;
}

const ALL_BUT_COLOR = [
  "corte-classico",
  "corte-degrade",
  "barba-completa",
  "barba-desenhada",
  "corte-barba",
  "corte-sobrancelha",
  "pezinho",
  "sobrancelha",
];

export const barbers: Barber[] = [
  {
    id: "rafael",
    name: "Rafael Moreno",
    role: "Fundador · tesoura e clássicos",
    bio: "Doze anos de cadeira. Gosta de cortes que crescem bem e não pedem retoque toda semana.",
    specialties: ["Corte na tesoura", "Social", "Barba longa"],
    serviceIds: ALL_BUT_COLOR,
    photo: barbeiro1,
    photoAlt: "Retrato em preto e branco de barbeiro segurando uma tesoura",
  },
  {
    id: "diego",
    name: "Diego Alves",
    role: "Degradês e texturas",
    bio: "Especialista em fades e cabelos crespos e cacheados. Responsável pelos platinados da casa.",
    specialties: ["Fade", "Crespos e cacheados", "Platinado"],
    serviceIds: [...ALL_BUT_COLOR, "platinado"],
    photo: barbeiro2,
    photoAlt: "Barbeiro finalizando um degradê em cliente de cabelo cacheado",
  },
  {
    id: "caio",
    name: "Caio Fernandes",
    role: "Barba e navalha",
    bio: "Detalhista com navalha e toalha quente. O nome certo para quem leva a barba a sério.",
    specialties: ["Barba desenhada", "Navalha", "Sobrancelha"],
    serviceIds: ALL_BUT_COLOR,
    photo: barbeiro3,
    photoAlt: "Barbeiro de camisa polo atendendo cliente em frente ao espelho",
  },
];

export const getBarber = (id: string | null | undefined) => barbers.find((b) => b.id === id);
