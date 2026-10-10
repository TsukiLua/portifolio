export type CategoryId = "camisas" | "vestidos" | "trico" | "calcas" | "acessorios";

export interface Category {
  id: CategoryId;
  name: string;
  description: string;
}

export const categories: Category[] = [
  { id: "camisas", name: "Camisas e blusas", description: "Linho e algodão para o calor" },
  { id: "vestidos", name: "Vestidos", description: "Do midi ao godê" },
  { id: "trico", name: "Tricô e casacos", description: "Camadas para a meia-estação" },
  { id: "calcas", name: "Calças", description: "Alfaiataria, sarja e jeans" },
  { id: "acessorios", name: "Acessórios", description: "Bolsas e óculos" },
];

export const getCategory = (id: string | null | undefined) => categories.find((c) => c.id === id);
