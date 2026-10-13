/**
 * Estoque de DEMONSTRAÇÃO. Preços, quilometragens, versões, cores e itens são fictícios.
 * Fotos: Wikimedia Commons (créditos em src/assets/vehicles/CREDITOS.md); os veículos fotografados não pertencem à loja.
 *
 * Cadastro: adicione um objeto ao array (id e slug únicos) e as fotos em src/assets/vehicles.
 * `npm test` valida o arquivo inteiro com o schema em src/lib/validation.ts.
 */
import type { Vehicle } from "../types/vehicle";
import golf1 from "../assets/vehicles/vw-golf-1.jpg";
import golf2 from "../assets/vehicles/vw-golf-2.jpg";
import golf3 from "../assets/vehicles/vw-golf-3.jpg";
import golf4 from "../assets/vehicles/vw-golf-4.jpg";
import polo1 from "../assets/vehicles/vw-polo-1.jpg";
import polo2 from "../assets/vehicles/vw-polo-2.jpg";
import p2081 from "../assets/vehicles/peugeot-208-1.jpg";
import p2082 from "../assets/vehicles/peugeot-208-2.jpg";
import p2083 from "../assets/vehicles/peugeot-208-3.jpg";
import p2084 from "../assets/vehicles/peugeot-208-4.jpg";
import fiat1 from "../assets/vehicles/fiat-500-1.jpg";
import fiat2 from "../assets/vehicles/fiat-500-2.jpg";
import fiat3 from "../assets/vehicles/fiat-500-3.jpg";
import fit1 from "../assets/vehicles/honda-fit-1.jpg";
import fit2 from "../assets/vehicles/honda-fit-2.jpg";
import cross1 from "../assets/vehicles/toyota-corolla-cross-1.jpg";
import cross2 from "../assets/vehicles/toyota-corolla-cross-2.jpg";
import cross3 from "../assets/vehicles/toyota-corolla-cross-3.jpg";
import cross4 from "../assets/vehicles/toyota-corolla-cross-4.jpg";
import rav1 from "../assets/vehicles/toyota-rav4-1.jpg";
import rav2 from "../assets/vehicles/toyota-rav4-2.jpg";
import rav3 from "../assets/vehicles/toyota-rav4-3.jpg";
import compass1 from "../assets/vehicles/jeep-compass-1.jpg";
import compass2 from "../assets/vehicles/jeep-compass-2.jpg";
import hrv1 from "../assets/vehicles/honda-hrv-1.jpg";
import hrv2 from "../assets/vehicles/honda-hrv-2.jpg";
import hrv3 from "../assets/vehicles/honda-hrv-3.jpg";
import civic1 from "../assets/vehicles/honda-civic-1.jpg";
import civic2 from "../assets/vehicles/honda-civic-2.jpg";
import corolla1 from "../assets/vehicles/toyota-corolla-1.jpg";
import corolla2 from "../assets/vehicles/toyota-corolla-2.jpg";
import bmw1 from "../assets/vehicles/bmw-325i-1.jpg";
import bmw2 from "../assets/vehicles/bmw-325i-2.jpg";
import hilux1 from "../assets/vehicles/toyota-hilux-1.jpg";
import hilux2 from "../assets/vehicles/toyota-hilux-2.jpg";
import ranger1 from "../assets/vehicles/ford-ranger-1.jpg";
import ranger2 from "../assets/vehicles/ford-ranger-2.jpg";
import mustang1 from "../assets/vehicles/ford-mustang-1.jpg";
import mustang2 from "../assets/vehicles/ford-mustang-2.jpg";
import porsche1 from "../assets/vehicles/porsche-911-1.jpg";
import porsche2 from "../assets/vehicles/porsche-911-2.jpg";
import cb1 from "../assets/vehicles/honda-cb500f-1.jpg";
import cb2 from "../assets/vehicles/honda-cb500f-2.jpg";
import cb3 from "../assets/vehicles/honda-cb500f-3.jpg";

export const vehicles: Vehicle[] = [
  {
    id: "PM-1001",
    slug: "toyota-corolla-xei-2022",
    brand: "Toyota",
    model: "Corolla",
    version: "XEi 2.0",
    category: "sedan",
    year: 2021,
    modelYear: 2022,
    price: 129900,
    mileageKm: 39000,
    fuel: "flex",
    transmission: "cvt",
    color: "Branco",
    doors: 4,
    passengers: 5,
    description:
      "Sedã de uso familiar, com um único dono e revisões feitas em concessionária. Interior conservado, sem marcas de fumo, e pneus com mais da metade da vida útil.",
    features: ["Central multimídia com espelhamento", "Câmera de ré", "Ar-condicionado digital", "Controle de cruzeiro", "Chave presencial", "Rodas de liga leve"],
    images: [
      { src: corolla1, alt: "Toyota Corolla branco, vista dianteira lateral" },
      { src: corolla2, alt: "Toyota Corolla branco, vista traseira lateral" },
    ],
    featured: true,
    condition: "used",
    status: "available",
  },
  {
    id: "PM-1002",
    slug: "toyota-corolla-cross-xre-2022",
    brand: "Toyota",
    model: "Corolla Cross",
    version: "XRE 2.0",
    category: "suv",
    year: 2021,
    modelYear: 2022,
    price: 149900,
    mileageKm: 42000,
    fuel: "flex",
    transmission: "cvt",
    color: "Branco",
    doors: 4,
    passengers: 5,
    description:
      "SUV médio com posição de dirigir elevada e porta-malas amplo. Unidade com manual e chave reserva, ideal para quem roda em cidade e estrada.",
    features: ["Central multimídia", "Câmera de ré", "Sensor de estacionamento", "Bancos em couro", "Ar-condicionado digital", "Faróis em LED"],
    images: [
      { src: cross1, alt: "Toyota Corolla Cross branco, vista dianteira" },
      { src: cross2, alt: "Toyota Corolla Cross branco, vista lateral" },
      { src: cross3, alt: "Toyota Corolla Cross branco, vista traseira" },
      { src: cross4, alt: "Toyota Corolla Cross, compartimento do motor" },
    ],
    featured: true,
    condition: "used",
    status: "available",
  },
  {
    id: "PM-1003",
    slug: "volkswagen-golf-highline-2020",
    brand: "Volkswagen",
    model: "Golf",
    version: "Highline 1.4 TSI",
    category: "hatchback",
    year: 2020,
    price: 119900,
    mileageKm: 48000,
    fuel: "flex",
    transmission: "automatico",
    color: "Preto",
    doors: 4,
    passengers: 5,
    description:
      "Hatch médio com acabamento caprichado e acerto de suspensão firme. Pintura preta sem retoques e histórico de manutenção completo.",
    features: ["Painel digital", "Central multimídia", "Faróis em LED", "Controle de cruzeiro adaptativo", "Sensor de chuva", "Rodas de liga leve"],
    images: [
      { src: golf1, alt: "Volkswagen Golf preto, vista dianteira" },
      { src: golf2, alt: "Volkswagen Golf preto, vista dianteira lateral" },
      { src: golf3, alt: "Volkswagen Golf preto, vista traseira" },
      { src: golf4, alt: "Volkswagen Golf preto, vista traseira lateral" },
    ],
    featured: true,
    condition: "used",
    status: "available",
  },
  {
    id: "PM-1004",
    slug: "volkswagen-polo-msi-2019",
    brand: "Volkswagen",
    model: "Polo",
    version: "MSI 1.6",
    category: "hatchback",
    year: 2018,
    modelYear: 2019,
    price: 64900,
    mileageKm: 62000,
    fuel: "flex",
    transmission: "manual",
    color: "Branco",
    doors: 4,
    passengers: 5,
    description:
      "Hatch econômico e espaçoso para a categoria, ótimo como primeiro carro. Câmbio manual macio e manutenção barata.",
    features: ["Ar-condicionado", "Direção elétrica", "Vidros e travas elétricos", "Rádio com Bluetooth", "Computador de bordo"],
    images: [
      { src: polo1, alt: "Volkswagen Polo branco, vista dianteira lateral" },
      { src: polo2, alt: "Volkswagen Polo branco, vista traseira lateral" },
    ],
    featured: false,
    condition: "used",
    status: "available",
  },
  {
    id: "PM-1005",
    slug: "peugeot-208-active-2022",
    brand: "Peugeot",
    model: "208",
    version: "Active 1.6",
    category: "hatchback",
    year: 2021,
    modelYear: 2022,
    price: 79900,
    mileageKm: 35000,
    fuel: "flex",
    transmission: "automatico",
    color: "Preto",
    doors: 4,
    passengers: 5,
    description:
      "Visual moderno e cabine bem resolvida. Baixa quilometragem para o ano e garantia de fábrica já encerrada, com revisões em dia.",
    features: ["Central multimídia", "Painel i-Cockpit", "Ar-condicionado", "Faróis com assinatura em LED", "Controle de estabilidade"],
    images: [
      { src: p2081, alt: "Peugeot 208 preto, vista dianteira" },
      { src: p2082, alt: "Peugeot 208 preto, vista lateral" },
      { src: p2083, alt: "Peugeot 208 preto, vista traseira lateral" },
      { src: p2084, alt: "Peugeot 208 preto, vista traseira" },
    ],
    featured: false,
    condition: "used",
    status: "available",
  },
  {
    id: "PM-1006",
    slug: "fiat-500-turbo-2017",
    brand: "Fiat",
    model: "500",
    version: "1.4 Turbo",
    category: "hatchback",
    year: 2017,
    price: 69900,
    mileageKm: 54000,
    fuel: "gasolina",
    transmission: "manual",
    color: "Prata",
    doors: 2,
    passengers: 4,
    description:
      "Compacto de estilo marcante, fácil de estacionar e divertido de dirigir. Indicado para uso urbano por uma ou duas pessoas.",
    features: ["Ar-condicionado", "Bancos esportivos", "Rodas de liga leve", "Computador de bordo", "Rádio com Bluetooth"],
    images: [
      { src: fiat1, alt: "Fiat 500 prata, vista dianteira lateral" },
      { src: fiat2, alt: "Fiat 500 prata, vista lateral" },
      { src: fiat3, alt: "Fiat 500 prata, vista traseira" },
    ],
    featured: false,
    condition: "used",
    status: "reserved",
  },
  {
    id: "PM-1007",
    slug: "honda-fit-exl-2018",
    brand: "Honda",
    model: "Fit",
    version: "EXL 1.5",
    category: "hatchback",
    year: 2018,
    price: 78500,
    mileageKm: 71000,
    fuel: "flex",
    transmission: "cvt",
    color: "Branco",
    doors: 4,
    passengers: 5,
    description:
      "Monovolume compacto famoso pela versatilidade dos bancos traseiros. Muito espaço interno e fama de durabilidade.",
    features: ["Bancos traseiros rebatíveis", "Central multimídia", "Câmera de ré", "Ar-condicionado digital", "Bancos em couro"],
    images: [
      { src: fit1, alt: "Honda Fit branco, vista dianteira" },
      { src: fit2, alt: "Honda Fit branco, vista traseira" },
    ],
    featured: false,
    condition: "used",
    status: "available",
  },
  {
    id: "PM-1008",
    slug: "toyota-rav4-hybrid-2020",
    brand: "Toyota",
    model: "RAV4",
    version: "SX Hybrid AWD",
    category: "suv",
    year: 2019,
    modelYear: 2020,
    price: 189900,
    mileageKm: 58000,
    fuel: "hibrido",
    transmission: "cvt",
    color: "Branco",
    doors: 4,
    passengers: 5,
    description:
      "SUV híbrido com tração integral, econômico na cidade e confortável na estrada. Revisões do sistema híbrido documentadas.",
    features: ["Tração integral", "Teto solar", "Bancos em couro com ajuste elétrico", "Câmera 360°", "Piloto automático adaptativo", "Carregador por indução"],
    images: [
      { src: rav1, alt: "Toyota RAV4 branco com teto preto, vista dianteira" },
      { src: rav2, alt: "Toyota RAV4 branco com teto preto, vista traseira" },
      { src: rav3, alt: "Toyota RAV4, compartimento do motor híbrido" },
    ],
    featured: true,
    condition: "used",
    status: "available",
  },
  {
    id: "PM-1009",
    slug: "jeep-compass-limited-2019",
    brand: "Jeep",
    model: "Compass",
    version: "Limited 2.0",
    category: "suv",
    year: 2019,
    price: 124900,
    mileageKm: 67000,
    fuel: "flex",
    transmission: "automatico",
    color: "Vermelho",
    doors: 4,
    passengers: 5,
    description:
      "SUV com teto em contraste e versão topo de linha. Bem equipado, com pneus novos e alinhamento recém-feito.",
    features: ["Teto em cor contrastante", "Bancos em couro", "Central multimídia", "Sensor de estacionamento", "Partida por botão", "Rodas de 18 polegadas"],
    images: [
      { src: compass1, alt: "Jeep Compass vermelho com teto preto, vista dianteira" },
      { src: compass2, alt: "Jeep Compass vermelho com teto preto, vista traseira" },
    ],
    featured: false,
    condition: "used",
    status: "available",
  },
  {
    id: "PM-1010",
    slug: "honda-hr-v-exl-2020",
    brand: "Honda",
    model: "HR-V",
    version: "EXL 1.8",
    category: "suv",
    year: 2019,
    modelYear: 2020,
    price: 109900,
    mileageKm: 52000,
    fuel: "flex",
    transmission: "cvt",
    color: "Vermelho",
    doors: 4,
    passengers: 5,
    description:
      "SUV compacto de boa revenda, com espaço traseiro generoso e consumo comportado. Segundo dono, com notas de manutenção.",
    features: ["Central multimídia", "Câmera de ré", "Bancos em couro", "Ar-condicionado digital", "Freio de estacionamento eletrônico"],
    images: [
      { src: hrv1, alt: "Honda HR-V vermelho, vista dianteira lateral" },
      { src: hrv2, alt: "Honda HR-V vermelho, vista frontal" },
      { src: hrv3, alt: "Honda HR-V vermelho, vista lateral" },
    ],
    featured: false,
    condition: "used",
    status: "available",
  },
  {
    id: "PM-1011",
    slug: "honda-civic-exl-2019",
    brand: "Honda",
    model: "Civic",
    version: "EXL 2.0",
    category: "sedan",
    year: 2019,
    price: 112900,
    mileageKm: 61000,
    fuel: "flex",
    transmission: "cvt",
    color: "Vermelho",
    doors: 4,
    passengers: 5,
    description:
      "Sedã com desenho esportivo, posição de dirigir baixa e porta-malas grande. Unidade sem detalhes de funilaria.",
    features: ["Central multimídia", "Câmera de ré", "Ar-condicionado digital de duas zonas", "Bancos em couro", "Chave presencial"],
    images: [
      { src: civic1, alt: "Honda Civic vermelho, vista dianteira lateral" },
      { src: civic2, alt: "Honda Civic vermelho, vista dianteira lateral em outro ângulo" },
    ],
    featured: false,
    condition: "used",
    status: "available",
  },
  {
    id: "PM-1012",
    slug: "bmw-320i-m-sport-2020",
    brand: "BMW",
    model: "320i",
    version: "M Sport 2.0 Turbo",
    category: "sedan",
    year: 2020,
    price: 219900,
    mileageKm: 44000,
    fuel: "gasolina",
    transmission: "automatico",
    color: "Branco",
    doors: 4,
    passengers: 5,
    description:
      "Sedã premium com pacote esportivo, dirigibilidade precisa e acabamento de alto padrão. Revisões no plano de manutenção da marca.",
    features: ["Pacote esportivo", "Painel digital", "Faróis em LED", "Bancos esportivos com ajuste elétrico", "Assistente de estacionamento", "Iluminação ambiente"],
    images: [
      { src: bmw1, alt: "BMW Série 3 branco, vista dianteira" },
      { src: bmw2, alt: "BMW Série 3 branco, vista traseira lateral" },
    ],
    featured: true,
    condition: "used",
    status: "available",
  },
  {
    id: "PM-1013",
    slug: "toyota-hilux-srx-4x4-2019",
    brand: "Toyota",
    model: "Hilux",
    version: "SRX 2.8 4x4",
    category: "pickup",
    year: 2019,
    price: 229900,
    mileageKm: 98000,
    fuel: "diesel",
    transmission: "automatico",
    color: "Branco",
    doors: 4,
    passengers: 5,
    description:
      "Picape cabine dupla para trabalho pesado ou lazer. Uso predominante em asfalto, com protetor de caçamba e engate.",
    features: ["Tração 4x4 com reduzida", "Protetor de caçamba", "Engate", "Bancos em couro", "Central multimídia", "Controle de descida"],
    images: [
      { src: hilux1, alt: "Toyota Hilux branca cabine dupla, vista dianteira lateral" },
      { src: hilux2, alt: "Toyota Hilux branca cabine dupla, vista traseira lateral" },
    ],
    featured: true,
    condition: "used",
    status: "available",
  },
  {
    id: "PM-1014",
    slug: "ford-ranger-xlt-4x4-2019",
    brand: "Ford",
    model: "Ranger",
    version: "XLT 4x4",
    category: "pickup",
    year: 2019,
    price: 179900,
    mileageKm: 112000,
    fuel: "diesel",
    transmission: "automatico",
    color: "Cinza",
    doors: 4,
    passengers: 5,
    description:
      "Picape robusta e confortável, com estribos laterais. Vendida recentemente: mantida no catálogo como referência de estoque.",
    features: ["Tração 4x4", "Estribos laterais", "Central multimídia", "Sensor de estacionamento", "Controle de tração"],
    images: [
      { src: ranger1, alt: "Ford Ranger cinza, vista dianteira lateral" },
      { src: ranger2, alt: "Ford Ranger cinza, vista lateral" },
    ],
    featured: false,
    condition: "used",
    status: "sold",
  },
  {
    id: "PM-1015",
    slug: "ford-mustang-gt-2018",
    brand: "Ford",
    model: "Mustang",
    version: "GT 5.0 V8",
    category: "sports",
    year: 2018,
    price: 389900,
    mileageKm: 23000,
    fuel: "gasolina",
    transmission: "automatico",
    color: "Amarelo",
    doors: 2,
    passengers: 4,
    description:
      "Esportivo de colecionador, usado apenas em fins de semana e guardado em garagem coberta. Cor rara e baixíssima quilometragem.",
    features: ["Motor V8", "Escapamento esportivo", "Modos de condução", "Bancos esportivos", "Painel digital"],
    images: [
      { src: mustang1, alt: "Ford Mustang amarelo, vista dianteira lateral" },
      { src: mustang2, alt: "Ford Mustang amarelo, vista traseira lateral" },
    ],
    featured: true,
    condition: "used",
    status: "available",
  },
  {
    id: "PM-1016",
    slug: "porsche-911-gt3-rs-2019",
    brand: "Porsche",
    model: "911",
    version: "GT3 RS",
    category: "sports",
    year: 2019,
    price: 1890000,
    mileageKm: 9800,
    fuel: "gasolina",
    transmission: "automatico",
    color: "Preto",
    doors: 2,
    passengers: 2,
    description:
      "Esportivo de pista homologado para as ruas. Unidade de baixíssima rodagem, reservada para avaliação de cliente.",
    features: ["Aerofólio fixo", "Bancos tipo concha", "Rodas forjadas", "Modos de condução de pista", "Freios de alto desempenho"],
    images: [
      { src: porsche1, alt: "Porsche 911 GT3 RS preto, vista dianteira lateral" },
      { src: porsche2, alt: "Porsche 911 GT3 RS preto, vista traseira lateral com aerofólio" },
    ],
    featured: false,
    condition: "used",
    status: "reserved",
  },
  {
    id: "PM-1017",
    slug: "honda-cb-500f-2016",
    brand: "Honda",
    model: "CB 500F",
    version: "ABS",
    category: "motorcycle",
    year: 2016,
    price: 27900,
    mileageKm: 28000,
    fuel: "gasolina",
    transmission: "manual",
    color: "Vermelho",
    passengers: 2,
    description:
      "Naked de média cilindrada, fácil de pilotar e econômica. Ótima para quem está subindo de categoria. Pneus e relação trocados.",
    features: ["Freios ABS", "Painel digital", "Pneus novos", "Kit relação novo", "Manual e chave reserva"],
    images: [
      { src: cb1, alt: "Moto Honda CB 500F vermelha, vista lateral dianteira" },
      { src: cb2, alt: "Moto Honda CB 500F vermelha, vista lateral" },
      { src: cb3, alt: "Moto Honda CB 500F vermelha, vista traseira lateral" },
    ],
    featured: false,
    condition: "used",
    status: "available",
  },
];

export const getVehicleBySlug = (slug: string) => vehicles.find((v) => v.slug === slug);
export const getVehicleById = (id: string) => vehicles.find((v) => v.id === id);
