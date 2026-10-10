/** Tratamentos oferecidos (preços e durações fictícios). */
import type { StaticImageData } from "next/image";
import tLimpeza from "../assets/t-limpeza.jpg";
import tFacial from "../assets/t-facial.jpg";
import tSobrancelha from "../assets/t-sobrancelha.jpg";
import tCilios from "../assets/t-cilios.jpg";
import tUnhas from "../assets/t-unhas.jpg";
import tCabelo from "../assets/t-cabelo.jpg";
import tColoracao from "../assets/t-coloracao.jpg";
import tMassagem from "../assets/t-massagem.jpg";

export type TreatmentCategory = "Rosto" | "Olhar" | "Mãos e pés" | "Cabelo" | "Corpo";

export interface Treatment {
  id: string;
  name: string;
  description: string;
  durationMin: number;
  price: number;
  /** Valor inicial: o preço final depende de avaliação (ex.: comprimento do cabelo). */
  priceFrom?: boolean;
  category: TreatmentCategory;
}

export const TREATMENT_CATEGORIES: { id: TreatmentCategory; image: StaticImageData; imageAlt: string; intro: string }[] = [
  { id: "Rosto", image: tFacial, imageAlt: "Esteticista fazendo massagem facial em cliente deitada", intro: "Pele limpa, hidratada e com viço." },
  { id: "Olhar", image: tSobrancelha, imageAlt: "Close de design de sobrancelha com escovinha", intro: "Sobrancelhas e cílios que emolduram." },
  { id: "Mãos e pés", image: tUnhas, imageAlt: "Manicure aplicando esmalte nude", intro: "Cuidado completo, do clássico ao gel." },
  { id: "Cabelo", image: tCabelo, imageAlt: "Cabeleireira sorrindo enquanto finaliza escova", intro: "Corte, escova e cor com diagnóstico." },
  { id: "Corpo", image: tMassagem, imageAlt: "Massagem com pedras quentes nas costas", intro: "Pausa para relaxar de verdade." },
];

export const EXTRA_IMAGES = { tLimpeza, tCilios, tColoracao };

export const treatments: Treatment[] = [
  { id: "limpeza-de-pele", name: "Limpeza de pele profunda", description: "Higienização, extração, máscara calmante e proteção solar.", durationMin: 90, price: 180, category: "Rosto" },
  { id: "facial-revitalizante", name: "Facial revitalizante", description: "Esfoliação suave, massagem facial e máscara de hidratação intensa.", durationMin: 60, price: 150, category: "Rosto" },
  { id: "design-sobrancelhas", name: "Design de sobrancelhas", description: "Mapeamento do rosto e modelagem com pinça e linha.", durationMin: 30, price: 70, category: "Olhar" },
  { id: "lash-lifting", name: "Lash lifting", description: "Curvatura natural dos cílios com nutrição. Dura até 6 semanas.", durationMin: 60, price: 140, category: "Olhar" },
  { id: "extensao-cilios", name: "Extensão de cílios fio a fio", description: "Efeito natural e leve, aplicado fio a fio.", durationMin: 120, price: 220, category: "Olhar" },
  { id: "manicure", name: "Manicure", description: "Cutilagem, lixamento e esmaltação tradicional.", durationMin: 30, price: 45, category: "Mãos e pés" },
  { id: "pedicure", name: "Pedicure", description: "Cuidado completo dos pés com esfoliação e hidratação.", durationMin: 60, price: 55, category: "Mãos e pés" },
  { id: "esmaltacao-gel", name: "Esmaltação em gel", description: "Brilho e duração de até 3 semanas, com cutilagem inclusa.", durationMin: 60, price: 90, category: "Mãos e pés" },
  { id: "corte-escova", name: "Corte e escova", description: "Diagnóstico, lavagem, corte e finalização.", durationMin: 60, price: 140, priceFrom: true, category: "Cabelo" },
  { id: "escova-modelada", name: "Escova modelada", description: "Lavagem e escova com ondas ou liso polido.", durationMin: 60, price: 80, priceFrom: true, category: "Cabelo" },
  { id: "coloracao-raiz", name: "Coloração de raiz", description: "Retoque de raiz com tonalizante e finalização.", durationMin: 120, price: 220, priceFrom: true, category: "Cabelo" },
  { id: "massagem-relaxante", name: "Massagem relaxante", description: "Manobras suaves com óleo aquecido e aromaterapia.", durationMin: 60, price: 160, category: "Corpo" },
  { id: "pedras-quentes", name: "Massagem com pedras quentes", description: "Pedras vulcânicas aquecidas para soltar tensões profundas.", durationMin: 90, price: 210, category: "Corpo" },
];

export const getTreatment = (id: string) => treatments.find((t) => t.id === id);
