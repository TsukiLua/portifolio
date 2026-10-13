import type { StaticImageData } from "next/image";

export const CATEGORIES = ["hatchback", "suv", "sedan", "pickup", "sports", "motorcycle"] as const;
export const FUELS = ["flex", "gasolina", "diesel", "hibrido", "eletrico"] as const;
export const TRANSMISSIONS = ["manual", "automatico", "cvt"] as const;
export const STATUSES = ["available", "reserved", "sold"] as const;

export type Category = (typeof CATEGORIES)[number];
export type Fuel = (typeof FUELS)[number];
export type Transmission = (typeof TRANSMISSIONS)[number];
export type VehicleStatus = (typeof STATUSES)[number];

export interface VehicleImage {
  src: StaticImageData;
  alt: string;
}

/**
 * Anúncio de veículo. Adaptado do modelo sugerido no briefing:
 * - `images` guarda imagem + texto alternativo (acessibilidade) em vez de só a URL;
 * - combustível e câmbio são uniões fechadas, o que torna filtros e rótulos consistentes.
 */
export interface Vehicle {
  id: string;
  slug: string;
  brand: string;
  model: string;
  version: string;
  category: Category;
  /** Ano de fabricação. */
  year: number;
  /** Ano do modelo, quando diferente do de fabricação. */
  modelYear?: number;
  price: number;
  mileageKm: number;
  fuel: Fuel;
  transmission: Transmission;
  color: string;
  doors?: number;
  passengers?: number;
  description: string;
  features: string[];
  images: [VehicleImage, ...VehicleImage[]];
  featured: boolean;
  condition: "used" | "new";
  status: VehicleStatus;
}
