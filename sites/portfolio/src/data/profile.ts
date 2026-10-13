/**
 * PERFIL — único lugar com dados pessoais. Preencha antes de publicar.
 *
 * Regra do projeto: nada aqui é inventado. Campos opcionais vazios (localização, foto, redes,
 * fatos) simplesmente não aparecem no site. O WhatsApp vem da variável NEXT_PUBLIC_WHATSAPP_NUMBER.
 */
import type { StaticImageData } from "next/image";

export interface SocialLink {
  label: string;
  url: string;
}

export interface ProfileFact {
  label: string;
  value: string;
}

export interface Profile {
  /** Seu nome profissional (aparece no topo, no "Sobre" e nos metadados). */
  name: string;
  /** Marca exibida no cabeçalho; pode ser igual ao nome. */
  brand: string;
  /** Letras do monograma (1 a 2 caracteres). */
  monogram: string;
  role: string;
  /** Descrição curta usada em metadados e no rodapé. */
  description: string;
  email: string;
  location?: string;
  /** Foto opcional: importe uma imagem de src/assets e atribua aqui. */
  photo?: StaticImageData;
  social: SocialLink[];
  about: string[];
  /** Fatos opcionais (ex.: formação, atuação). Deixe vazio se não quiser exibir. */
  facts: ProfileFact[];
}

export const profile: Profile = {
  name: "Seu Nome",
  brand: "Seu Nome",
  monogram: "SN",
  role: "Desenvolvedor web freelancer",
  description:
    "Desenvolvimento de sites institucionais, landing pages e catálogos digitais para pequenas e médias empresas.",
  email: "contato@seudominio.example",
  location: undefined,
  photo: undefined,
  social: [],
  about: [
    "Desenvolvo sites para negócios que precisam se apresentar bem na internet e facilitar o contato de quem chega até eles: prestadores de serviço, lojas, estúdios e empresas locais.",
    "Meu foco é entregar sites funcionais, rápidos e bem apresentados, construídos a partir do que o negócio realmente precisa — sem complexidade desnecessária e com tudo documentado para quem vai cuidar do site depois.",
  ],
  facts: [],
};

/** Campos que ainda estão com valor de exemplo (usado no aviso exibido apenas em desenvolvimento). */
export function pendingProfileFields(p: Profile = profile, whatsapp = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER): string[] {
  const pending: string[] = [];
  if (p.name === "Seu Nome") pending.push("name / brand / monogram (src/data/profile.ts)");
  if (p.email.endsWith(".example")) pending.push("email (src/data/profile.ts)");
  if (!whatsapp) pending.push("NEXT_PUBLIC_WHATSAPP_NUMBER (.env.local)");
  return pending;
}
