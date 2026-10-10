/** Equipe fictícia. As fotos são de banco de imagens; os nomes não correspondem às pessoas retratadas. */
import type { StaticImageData } from "next/image";
import pro1 from "../assets/pro-1.jpg";
import pro2 from "../assets/pro-2.jpg";
import pro3 from "../assets/pro-3.jpg";

export interface Professional {
  id: string;
  name: string;
  role: string;
  bio: string;
  treatmentIds: string[];
  photo: StaticImageData;
  photoAlt: string;
}

export const professionals: Professional[] = [
  {
    id: "helena",
    name: "Helena Duarte",
    role: "Esteticista e terapeuta corporal",
    bio: "Cuida da pele com protocolos simples e eficazes. Responde pelas massagens da casa.",
    treatmentIds: ["limpeza-de-pele", "facial-revitalizante", "design-sobrancelhas", "massagem-relaxante", "pedras-quentes"],
    photo: pro1,
    photoAlt: "Retrato em preto e branco de mulher de cabelo curto sorrindo levemente",
  },
  {
    id: "marina",
    name: "Marina Lopes",
    role: "Cabeleireira e colorista",
    bio: "Especialista em cor natural e cortes que respeitam a textura de cada cabelo.",
    treatmentIds: ["corte-escova", "escova-modelada", "coloracao-raiz"],
    photo: pro2,
    photoAlt: "Retrato de mulher de cabelos presos em fundo azul",
  },
  {
    id: "joana",
    name: "Joana Reis",
    role: "Nail designer e lash designer",
    bio: "Precisão nas unhas e no olhar. Atende mãos, pés, sobrancelhas e cílios.",
    treatmentIds: ["manicure", "pedicure", "esmaltacao-gel", "design-sobrancelhas", "lash-lifting", "extensao-cilios"],
    photo: pro3,
    photoAlt: "Retrato de mulher negra com folhagem no cabelo em fundo bordô",
  },
];

export const getProfessional = (id: string | null | undefined) => professionals.find((p) => p.id === id);
