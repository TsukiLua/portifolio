import type { StaticImageData } from "next/image";

/** "demonstrativo": projeto de portfólio, sem cliente. "cliente": trabalho entregue a um cliente real. */
export type ProjectStatus = "demonstrativo" | "cliente";

export interface ProjectImage {
  src: StaticImageData;
  alt: string;
  caption: string;
  device: "desktop" | "mobile";
}

export interface Project {
  id: string;
  slug: string;
  name: string;
  category: string;
  /** Uma frase para cards. */
  summary: string;
  /** Problema de negócio que a solução busca resolver. */
  problem: string;
  objective: string;
  audience: string;
  /** Como a solução foi construída (visão geral). */
  solution: string;
  features: string[];
  uxDecisions: string[];
  technologies: string[];
  cover: ProjectImage;
  gallery: ProjectImage[];
  /** URL pública da demonstração; sem valor, o botão não é exibido. */
  demoUrl?: string;
  status: ProjectStatus;
  /** Destaque na galeria (apenas um projeto). */
  featured?: boolean;
}
