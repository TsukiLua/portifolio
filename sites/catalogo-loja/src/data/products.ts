/**
 * Fonte ÚNICA dos produtos do catálogo. Nomes, preços e estoques são FICTÍCIOS.
 * Para cadastrar um produto: adicione um objeto aqui e a imagem em `src/assets`.
 * O `id` é estável (usado em links do WhatsApp e na lista de interesse); não reaproveite IDs.
 */
import type { StaticImageData } from "next/image";
import camisaOff from "../assets/p-camisa-linho-off.jpg";
import camisaListrada from "../assets/p-camisa-listrada.jpg";
import bataMescla from "../assets/p-bata-mescla.jpg";
import blusaFranzida from "../assets/p-blusa-franzida.jpg";
import camisaAreia from "../assets/p-camisa-areia.jpg";
import vestidoCeu from "../assets/p-vestido-ceu.jpg";
import vestidoEnvelope from "../assets/p-vestido-envelope.jpg";
import vestidoMidi from "../assets/p-vestido-midi.jpg";
import vestidoRose from "../assets/p-vestido-rose.jpg";
import cardigaVerde from "../assets/p-cardiga-verde.jpg";
import sueterCaramelo from "../assets/p-sueter-caramelo.jpg";
import sueterCaramelo2 from "../assets/p-sueter-caramelo-2.jpg";
import tricoOff from "../assets/p-trico-off.jpg";
import jaquetaJeans from "../assets/p-jaqueta-jeans.jpg";
import calcaAlfaiataria from "../assets/p-calca-alfaiataria.jpg";
import calcaSarja from "../assets/p-calca-sarja.jpg";
import calcaJeans from "../assets/p-calca-jeans.jpg";
import bolsaCaramelo from "../assets/p-bolsa-caramelo.jpg";
import bolsaCinza from "../assets/p-bolsa-cinza.jpg";
import oculosGatinho from "../assets/p-oculos-gatinho.jpg";
import oculosTartaruga from "../assets/p-oculos-tartaruga.jpg";
import type { CategoryId } from "./categories";

export type Availability = "disponivel" | "ultimas-unidades" | "esgotado";
export type Highlight = "novidade" | "mais-vendido" | "promocao";

export interface ProductImage {
  src: StaticImageData;
  alt: string;
}

export interface ColorOption {
  name: string;
  hex: string;
  available: boolean;
}

export interface SizeOption {
  label: string;
  available: boolean;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  details: string[];
  price: number;
  /** Preço "de", quando em promoção. */
  compareAtPrice?: number;
  category: CategoryId;
  images: [ProductImage, ...ProductImage[]];
  colors?: ColorOption[];
  sizes?: SizeOption[];
  availability: Availability;
  highlight?: Highlight;
}

const sizes = (unavailable: string[] = []): SizeOption[] =>
  ["PP", "P", "M", "G", "GG"].map((label) => ({ label, available: !unavailable.includes(label) }));

const numeric = (unavailable: string[] = []): SizeOption[] =>
  ["36", "38", "40", "42", "44"].map((label) => ({ label, available: !unavailable.includes(label) }));

export const products: Product[] = [
  {
    id: "MR-001",
    slug: "camisa-linho-gola-padre-off-white",
    name: "Camisa de Linho Gola Padre",
    description: "Linho puro de toque macio, gola padre e botões de casca de coco. Fresca para os dias quentes.",
    details: ["100% linho", "Modelagem reta", "Lavar à mão ou ciclo delicado"],
    price: 249.9,
    category: "camisas",
    images: [{ src: camisaOff, alt: "Camisa de linho off-white de manga curta em cabide de madeira" }],
    colors: [
      { name: "Off-white", hex: "#efe9de", available: true },
      { name: "Areia", hex: "#d8c7a8", available: true },
    ],
    sizes: sizes(["GG"]),
    availability: "disponivel",
  },
  {
    id: "MR-002",
    slug: "camisa-linho-listrada-ceu",
    name: "Camisa de Linho Listrada Céu",
    description: "Listras finas em azul-céu sobre linho natural. Vai do trabalho ao fim de semana.",
    details: ["100% linho", "Gola mandarim", "Barra arredondada"],
    price: 239.9,
    category: "camisas",
    images: [{ src: camisaListrada, alt: "Camisa de linho listrada em azul-claro pendurada em galho" }],
    colors: [{ name: "Listrado céu", hex: "#b9c8da", available: true }],
    sizes: sizes(),
    availability: "disponivel",
    highlight: "novidade",
  },
  {
    id: "MR-003",
    slug: "bata-linho-mescla",
    name: "Bata de Linho Mescla",
    description: "Decote em V e caimento solto em linho mescla cinza. Leve e sem esforço.",
    details: ["70% linho, 30% viscose", "Decote em V", "Manga curta"],
    price: 189.9,
    category: "camisas",
    images: [{ src: bataMescla, alt: "Bata de linho cinza mescla com decote em V em cabide" }],
    colors: [{ name: "Cinza mescla", hex: "#a7a39c", available: true }],
    sizes: sizes(["PP"]),
    availability: "disponivel",
  },
  {
    id: "MR-004",
    slug: "blusa-linho-barra-franzida",
    name: "Blusa de Linho Barra Franzida",
    description: "Linho cru com barra franzida que marca levemente a cintura. Combina com tudo.",
    details: ["100% linho", "Barra com elástico", "Gola canoa"],
    price: 169.9,
    category: "camisas",
    images: [{ src: blusaFranzida, alt: "Blusa de linho cru com barra franzida em cabide" }],
    colors: [{ name: "Cru", hex: "#ece4d4", available: true }],
    sizes: sizes(["PP", "P", "GG"]),
    availability: "ultimas-unidades",
  },
  {
    id: "MR-005",
    slug: "camisa-oversized-areia",
    name: "Camisa Oversized Areia",
    description: "Ombro caído, mangas amplas e gola esporte. A peça curinga da coleção.",
    details: ["100% linho", "Modelagem oversized", "Bolso frontal"],
    price: 259.9,
    category: "camisas",
    images: [{ src: camisaAreia, alt: "Camisa de linho cor areia dobrada ao lado de óculos e novelo" }],
    colors: [
      { name: "Areia", hex: "#d6c6ab", available: true },
      { name: "Oliva", hex: "#7b7a55", available: false },
    ],
    sizes: sizes(),
    availability: "disponivel",
    highlight: "mais-vendido",
  },
  {
    id: "MR-006",
    slug: "vestido-gode-azul-ceu",
    name: "Vestido Godê Azul-Céu",
    description: "Saia godê com movimento, manga bufante e cintura marcada. Romântico na medida.",
    details: ["Viscose", "Comprimento curto", "Zíper invisível nas costas"],
    price: 299.9,
    category: "vestidos",
    images: [{ src: vestidoCeu, alt: "Mulher usando vestido azul-claro de saia godê e manga bufante" }],
    colors: [{ name: "Azul-céu", hex: "#a9c7e6", available: true }],
    sizes: sizes(["GG"]),
    availability: "disponivel",
    highlight: "novidade",
  },
  {
    id: "MR-007",
    slug: "vestido-envelope-terracota",
    name: "Vestido Envelope Terracota",
    description: "Transpasse com amarração lateral e fenda discreta, em tom terroso que valoriza a pele.",
    details: ["Crepe de viscose", "Comprimento midi", "Amarração ajustável"],
    price: 329.9,
    category: "vestidos",
    images: [{ src: vestidoEnvelope, alt: "Mulher de chapéu usando vestido envelope terracota" }],
    colors: [{ name: "Terracota", hex: "#c98b6f", available: true }],
    sizes: sizes(["PP", "GG"]),
    availability: "disponivel",
  },
  {
    id: "MR-008",
    slug: "vestido-midi-laise-branco",
    name: "Vestido Midi Laise Branco",
    description: "Laise de algodão, botões frontais e mangas com punho. Clássico de verão.",
    details: ["100% algodão", "Forro removível", "Botões de madrepérola sintética"],
    price: 389.9,
    category: "vestidos",
    images: [{ src: vestidoMidi, alt: "Mulher usando vestido midi branco de laise à beira de um rio" }],
    colors: [{ name: "Branco", hex: "#f7f5f0", available: true }],
    sizes: sizes(),
    availability: "disponivel",
    highlight: "mais-vendido",
  },
  {
    id: "MR-009",
    slug: "vestido-chemise-rose",
    name: "Vestido Chemise Rosé",
    description: "Chemise de botões em rosé claro, com manga curta e saia evasê.",
    details: ["Algodão com elastano", "Comprimento midi", "Bolsos laterais"],
    price: 279.9,
    category: "vestidos",
    images: [{ src: vestidoRose, alt: "Mulher de chapéu e mala vintage usando vestido chemise rosé" }],
    colors: [{ name: "Rosé", hex: "#ecd3c7", available: false }],
    sizes: sizes(["PP", "P", "M", "G", "GG"]),
    availability: "esgotado",
  },
  {
    id: "MR-010",
    slug: "cardiga-trico-folhagem-verde",
    name: "Cardigã Tricô Folhagem",
    description: "Ponto rendado em forma de folha, em verde profundo. Feito à mão por artesãs parceiras.",
    details: ["100% algodão", "Tricô artesanal", "Botões de madeira"],
    price: 319.9,
    category: "trico",
    images: [{ src: cardigaVerde, alt: "Detalhe de cardigã de tricô verde com ponto rendado de folha" }],
    colors: [{ name: "Verde-musgo", hex: "#3f7366", available: true }],
    sizes: sizes(["PP"]),
    availability: "disponivel",
    highlight: "novidade",
  },
  {
    id: "MR-011",
    slug: "sueter-trico-caramelo",
    name: "Suéter Tricô Caramelo",
    description: "Tricô de ponto inglês, gola alta suave e punhos largos. Abraço em forma de roupa.",
    details: ["Algodão e acrílico", "Gola alta", "Modelagem ampla"],
    price: 289.9,
    category: "trico",
    images: [
      { src: sueterCaramelo, alt: "Pilha de suéteres de tricô em tons de caramelo e creme" },
      { src: sueterCaramelo2, alt: "Suéteres dobrados em tons de bege, mostarda e marrom" },
    ],
    colors: [
      { name: "Caramelo", hex: "#b9814f", available: true },
      { name: "Creme", hex: "#efe2cc", available: true },
    ],
    sizes: sizes(["GG"]),
    availability: "disponivel",
  },
  {
    id: "MR-012",
    slug: "trico-trancado-off-white",
    name: "Tricô Trançado Off-white",
    description: "Tranças em relevo e textura aconchegante em off-white. Peça de inverno que dura anos.",
    details: ["Algodão", "Tranças em relevo", "Comprimento no quadril"],
    price: 269.9,
    compareAtPrice: 329.9,
    category: "trico",
    images: [{ src: tricoOff, alt: "Pilha de malhas de tricô em tons de off-white e bege" }],
    colors: [{ name: "Off-white", hex: "#efe9de", available: true }],
    sizes: sizes(),
    availability: "disponivel",
    highlight: "promocao",
  },
  {
    id: "MR-013",
    slug: "jaqueta-jeans-gola-pelucia",
    name: "Jaqueta Jeans Gola Pelúcia",
    description: "Jeans lavagem clara com gola de pelúcia removível. Do outono à meia-estação.",
    details: ["100% algodão", "Gola removível", "Bolsos com lapela"],
    price: 359.9,
    category: "trico",
    images: [{ src: jaquetaJeans, alt: "Jaqueta jeans clara com gola de pelúcia pendurada na parede" }],
    colors: [{ name: "Jeans claro", hex: "#a8bfd6", available: true }],
    sizes: sizes(["PP", "GG"]),
    availability: "ultimas-unidades",
  },
  {
    id: "MR-014",
    slug: "calca-alfaiataria-bege",
    name: "Calça Alfaiataria Bege",
    description: "Cintura alta, pregas frontais e cordão interno. Elegância sem rigidez.",
    details: ["Linho e viscose", "Perna reta", "Cós com cordão"],
    price: 279.9,
    category: "calcas",
    images: [{ src: calcaAlfaiataria, alt: "Calça de alfaiataria bege dobrada sobre fundo cinza" }],
    colors: [{ name: "Bege", hex: "#cdbba0", available: true }],
    sizes: numeric(["44"]),
    availability: "disponivel",
  },
  {
    id: "MR-015",
    slug: "calca-sarja-ferrugem",
    name: "Calça Sarja Ferrugem",
    description: "Sarja com elastano em ferrugem queimado, corte chino e barra italiana.",
    details: ["98% algodão, 2% elastano", "Corte chino", "Barra italiana"],
    price: 229.9,
    compareAtPrice: 279.9,
    category: "calcas",
    images: [{ src: calcaSarja, alt: "Calça de sarja cor ferrugem dobrada com botas e cinto" }],
    colors: [{ name: "Ferrugem", hex: "#b4532f", available: true }],
    sizes: numeric(),
    availability: "disponivel",
    highlight: "promocao",
  },
  {
    id: "MR-016",
    slug: "calca-jeans-reta-escura",
    name: "Calça Jeans Reta Escura",
    description: "Denim rígido em lavagem escura, perna reta e barra dobrada.",
    details: ["100% algodão", "Cintura média", "Cinco bolsos"],
    price: 249.9,
    category: "calcas",
    images: [{ src: calcaJeans, alt: "Calça jeans escura de perna reta com barra dobrada" }],
    colors: [{ name: "Azul escuro", hex: "#1f2633", available: true }],
    sizes: numeric(["36"]),
    availability: "disponivel",
  },
  {
    id: "MR-017",
    slug: "bolsa-transversal-couro-caramelo",
    name: "Bolsa Transversal Couro Caramelo",
    description: "Couro legítimo com bolso frontal e alça regulável. Cabe o dia inteiro.",
    details: ["Couro bovino", "Alça regulável e removível", "Forro em algodão"],
    price: 459.9,
    category: "acessorios",
    images: [{ src: bolsaCaramelo, alt: "Bolsa de couro caramelo com bolso frontal e alça" }],
    colors: [{ name: "Caramelo", hex: "#a8582c", available: true }],
    availability: "disponivel",
    highlight: "mais-vendido",
  },
  {
    id: "MR-018",
    slug: "bolsa-satchel-cinza",
    name: "Bolsa Satchel Cinza",
    description: "Satchel estruturada com fivelas douradas e alça de mão. Clássica e versátil.",
    details: ["Couro sintético premium", "Duas fivelas", "Alça transversal inclusa"],
    price: 399.9,
    category: "acessorios",
    images: [{ src: bolsaCinza, alt: "Bolsa satchel cinza com fivelas douradas sobre fundo claro" }],
    colors: [
      { name: "Cinza", hex: "#8a8789", available: true },
      { name: "Preto", hex: "#1c1b1b", available: false },
    ],
    availability: "disponivel",
  },
  {
    id: "MR-019",
    slug: "oculos-gatinho-rose",
    name: "Óculos Gatinho Rosé",
    description: "Armação metálica rosé e lentes degradê com proteção UV400.",
    details: ["Proteção UV400", "Lentes degradê", "Acompanha estojo"],
    price: 189.9,
    category: "acessorios",
    images: [{ src: oculosGatinho, alt: "Óculos de sol formato gatinho com armação rosé" }],
    colors: [{ name: "Rosé", hex: "#d9b7a6", available: true }],
    availability: "ultimas-unidades",
  },
  {
    id: "MR-020",
    slug: "oculos-redondo-tartaruga",
    name: "Óculos Redondo Tartaruga",
    description: "Formato redondo em acetato tartaruga com lentes escuras. Atemporal.",
    details: ["Proteção UV400", "Acetato", "Acompanha estojo"],
    price: 179.9,
    category: "acessorios",
    images: [{ src: oculosTartaruga, alt: "Óculos de sol redondos com armação tartaruga" }],
    colors: [{ name: "Tartaruga", hex: "#5b3a24", available: true }],
    availability: "disponivel",
    highlight: "novidade",
  },
];

export const getProductBySlug = (slug: string) => products.find((p) => p.slug === slug);
export const getProductById = (id: string) => products.find((p) => p.id === id);
