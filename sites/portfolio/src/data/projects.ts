/**
 * PROJETOS — fonte única da galeria e das páginas /projetos/[slug].
 * Todos os projetos atuais são DEMONSTRATIVOS (estão em sites/* deste repositório); nenhum foi feito para cliente.
 *
 * As imagens são capturas reais dos projetos em execução, geradas por `npm run capture -w sites/portfolio`.
 * Links de demonstração vêm de variáveis de ambiente (veja .env.example); sem URL, o botão não aparece.
 */
import type { Project } from "../types/project";
import veiculosHome from "../assets/projects/veiculos-home.jpg";
import veiculosEstoque from "../assets/projects/veiculos-estoque.jpg";
import veiculosDetalhe from "../assets/projects/veiculos-detalhe.jpg";
import veiculosMobile from "../assets/projects/veiculos-mobile.jpg";
import barbeariaHome from "../assets/projects/barbearia-home.jpg";
import barbeariaAgendar from "../assets/projects/barbearia-agendar.jpg";
import barbeariaMobile from "../assets/projects/barbearia-mobile.jpg";
import catalogoHome from "../assets/projects/catalogo-home.jpg";
import catalogoLista from "../assets/projects/catalogo-lista.jpg";
import catalogoProduto from "../assets/projects/catalogo-produto.jpg";
import catalogoMobile from "../assets/projects/catalogo-mobile.jpg";
import estudioHome from "../assets/projects/estudio-home.jpg";
import estudioAgendar from "../assets/projects/estudio-agendar.jpg";
import estudioMobile from "../assets/projects/estudio-mobile.jpg";
import servicosHome from "../assets/projects/servicos-home.jpg";
import servicosOrcamento from "../assets/projects/servicos-orcamento.jpg";
import servicosMobile from "../assets/projects/servicos-mobile.jpg";

const STACK = ["Next.js", "React", "TypeScript", "Tailwind CSS"];

export const projects: Project[] = [
  {
    id: "P01",
    slug: "catalogo-automotivo",
    name: "Prime Motors",
    category: "Catálogo automotivo",
    summary: "Catálogo de seminovos com busca, 13 filtros, página por veículo e contato pelo WhatsApp.",
    problem:
      "Lojas de veículos costumam divulgar o estoque só em redes sociais e portais, onde o cliente não consegue filtrar por preço, ano ou câmbio e o anúncio se perde entre concorrentes.",
    objective: "Dar à loja um catálogo próprio, fácil de navegar, que leve o visitante interessado direto a uma conversa com o consultor.",
    audience: "Revendas de seminovos, concessionárias, lojas de motos e de veículos comerciais.",
    solution:
      "Estoque centralizado em um arquivo de dados tipado, com busca e filtros que funcionam em conjunto e ficam salvos na URL (o link filtrado pode ser compartilhado). Cada veículo tem página própria com galeria, ficha completa e mensagens de WhatsApp que já identificam o carro.",
    features: [
      "Busca por marca, modelo e versão",
      "Filtros de preço, ano, km, tipo, combustível, câmbio, cor e portas",
      "Ordenação e filtros removíveis individualmente",
      "Galeria com teclado, miniaturas e ampliação",
      "WhatsApp com mensagem do veículo e referência",
      "Agendamento de visita com validação de data",
      "Status de disponível, reservado e vendido",
    ],
    uxDecisions: [
      "Filtros em gaveta no celular e em coluna fixa no desktop.",
      "Veículos vendidos continuam visíveis com selo e vão para o fim da lista, para nunca parecerem disponíveis.",
      "Opções de filtro geradas a partir do estoque: nenhuma opção leva a zero resultados por definição.",
      "Formulários preparam a mensagem do WhatsApp em vez de simular um envio.",
    ],
    technologies: [...STACK, "Zod", "Playwright"],
    cover: { src: veiculosHome, alt: "Página inicial da Prime Motors com busca rápida por marca, preço e tipo", caption: "Página inicial com busca rápida", device: "desktop" },
    gallery: [
      { src: veiculosEstoque, alt: "Estoque filtrado por SUVs com filtros na lateral", caption: "Estoque com filtros e ordenação", device: "desktop" },
      { src: veiculosDetalhe, alt: "Página de um veículo com galeria, preço e botões de contato", caption: "Página do veículo", device: "desktop" },
      { src: veiculosMobile, alt: "Estoque da Prime Motors em tela de celular", caption: "Estoque no celular", device: "mobile" },
    ],
    demoUrl: process.env.NEXT_PUBLIC_DEMO_URL_VEICULOS,
    status: "demonstrativo",
    featured: true,
  },
  {
    id: "P02",
    slug: "site-para-barbearia",
    name: "Brasa Barbearia",
    category: "Site para negócio local",
    summary: "Site de barbearia com cardápio de serviços e agendamento online em cinco etapas.",
    problem: "Agendamentos feitos só por mensagem tomam tempo do barbeiro e geram idas e vindas para achar um horário livre.",
    objective: "Apresentar a barbearia com personalidade e permitir que o cliente escolha serviço, barbeiro e horário sozinho.",
    audience: "Barbearias e salões com agenda por profissional.",
    solution:
      "Página institucional escura e marcante, com preços fixos à vista. O agendamento mostra apenas horários em que o serviço cabe inteiro na agenda do barbeiro e revalida a escolha antes de confirmar.",
    features: [
      "Serviços com preço e duração",
      "Agendamento: serviço, barbeiro, dia, horário e dados",
      "Opção \"sem preferência\" de barbeiro",
      "Dias fechados e horários ocupados bloqueados",
      "Resumo e confirmação com mensagem pronta para o WhatsApp",
    ],
    uxDecisions: [
      "Cada link de serviço ou barbeiro já abre o agendamento com a escolha feita.",
      "Barra de ações fixa no rodapé da tela no celular.",
      "Foco movido para o título de cada etapa, para leitores de tela.",
    ],
    technologies: STACK,
    cover: { src: barbeariaHome, alt: "Página inicial da Brasa Barbearia em tons escuros com destaque laranja", caption: "Página inicial", device: "desktop" },
    gallery: [
      { src: barbeariaAgendar, alt: "Etapa de escolha de dia e horário do agendamento", caption: "Agendamento: dia e horário", device: "desktop" },
      { src: barbeariaMobile, alt: "Página inicial da barbearia no celular", caption: "Versão para celular", device: "mobile" },
    ],
    demoUrl: process.env.NEXT_PUBLIC_DEMO_URL_BARBEARIA,
    status: "demonstrativo",
  },
  {
    id: "P03",
    slug: "catalogo-de-produtos",
    name: "Maré",
    category: "Catálogo de produtos",
    summary: "Catálogo de moda com busca, filtros, variantes e pedido pelo WhatsApp, sem checkout.",
    problem: "Pequenas lojas querem vender pela internet, mas um e-commerce completo é caro de montar e manter para o volume que têm.",
    objective: "Organizar os produtos em um catálogo bonito e levar o cliente a uma conversa já sabendo peça, cor e tamanho.",
    audience: "Lojas de roupas, acessórios e pequenos comércios que vendem pelo WhatsApp.",
    solution:
      "Catálogo editorial com dados centralizados, filtros na URL e páginas de produto que exigem cor e tamanho disponíveis antes de abrir o WhatsApp. Uma lista de interesse permite consultar várias peças em uma única mensagem.",
    features: [
      "Busca, filtro por categoria e faixa de preço, ordenação",
      "Seleção de cor e tamanho com indisponíveis bloqueados",
      "Mensagem de WhatsApp com produto, variante e link",
      "Lista de interesse salva no navegador",
      "Política de trocas e página da loja",
    ],
    uxDecisions: [
      "Visual editorial, com fotografia em destaque e pouca interface.",
      "Produto esgotado troca o pedido por \"perguntar sobre reposição\".",
      "O HTML inicial já traz todos os produtos, mesmo antes do JavaScript.",
    ],
    technologies: STACK,
    cover: { src: catalogoHome, alt: "Página inicial do catálogo Maré com foto editorial e título em serifa", caption: "Página inicial", device: "desktop" },
    gallery: [
      { src: catalogoLista, alt: "Listagem de vestidos com filtros na lateral", caption: "Catálogo filtrado", device: "desktop" },
      { src: catalogoProduto, alt: "Página de produto com seleção de cor e tamanho", caption: "Página do produto", device: "desktop" },
      { src: catalogoMobile, alt: "Catálogo da Maré no celular", caption: "Catálogo no celular", device: "mobile" },
    ],
    demoUrl: process.env.NEXT_PUBLIC_DEMO_URL_CATALOGO,
    status: "demonstrativo",
  },
  {
    id: "P04",
    slug: "site-para-estudio-de-beleza",
    name: "Sálvia Estúdio",
    category: "Site para negócio local",
    summary: "Estúdio de beleza com menu de tratamentos e solicitação de horário com até três serviços.",
    problem: "Combinar mais de um tratamento no mesmo horário exige saber quem faz o quê e quanto tempo tudo leva.",
    objective: "Permitir que a cliente monte o atendimento e veja só os horários em que uma profissional consegue fazer tudo em sequência.",
    audience: "Estúdios de beleza, estética e bem-estar.",
    solution:
      "Fluxo de solicitação em etapas progressivas: tratamentos, profissional compatível, calendário e dados com consentimento. A agenda respeita intervalo de almoço, duração total e antecedência mínima.",
    features: [
      "Seleção de até três tratamentos com duração e valor somados",
      "Profissionais filtradas pelos tratamentos escolhidos",
      "Calendário mensal com dias fechados e passados bloqueados",
      "Horários por turno respeitando o intervalo de almoço",
      "Resumo fixo e revisão antes de confirmar",
    ],
    uxDecisions: [
      "Identidade acolhedora em creme e verde, sem depender de rosa.",
      "Etapas bloqueadas até a anterior ser concluída, com o motivo explicado.",
      "Botão \"Revisar\" leva direto à primeira pendência.",
    ],
    technologies: STACK,
    cover: { src: estudioHome, alt: "Página inicial do Sálvia Estúdio com foto em arco e tipografia serifada", caption: "Página inicial", device: "desktop" },
    gallery: [
      { src: estudioAgendar, alt: "Calendário e horários da solicitação de atendimento", caption: "Solicitação de horário", device: "desktop" },
      { src: estudioMobile, alt: "Página inicial do estúdio no celular", caption: "Versão para celular", device: "mobile" },
    ],
    demoUrl: process.env.NEXT_PUBLIC_DEMO_URL_ESTUDIO,
    status: "demonstrativo",
  },
  {
    id: "P05",
    slug: "site-para-negocio-local",
    name: "Casa em Dia",
    category: "Landing page de serviços",
    summary: "Landing page de manutenção residencial com formulário de orçamento validado.",
    problem: "Prestadores de serviço recebem pedidos incompletos (\"quanto custa?\") e perdem tempo coletando informações básicas.",
    objective: "Explicar rápido o serviço, passar confiança e receber pedidos de orçamento com as informações certas.",
    audience: "Eletricistas, pintores, técnicos e empresas de manutenção.",
    solution:
      "Página única orientada à conversão: serviços com valor de referência, diferenciais, etapas do atendimento, regiões atendidas e um formulário que valida telefone, bairro e descrição antes de montar a mensagem.",
    features: [
      "Serviços com valor de referência",
      "Formulário com máscara de telefone e validação de DDD",
      "Resumo de erros acessível",
      "Cartões de serviço que pré-preenchem o formulário",
      "WhatsApp com mensagem contextualizada",
    ],
    uxDecisions: [
      "Paleta clara de azul e amarelo para transmitir confiança.",
      "Selo ou depoimento que pareça avaliação real foi evitado; depoimentos são marcados como fictícios.",
    ],
    technologies: STACK,
    cover: { src: servicosHome, alt: "Página inicial da Casa em Dia com proposta de valor e foto de profissional", caption: "Página inicial", device: "desktop" },
    gallery: [
      { src: servicosOrcamento, alt: "Seção de orçamento com formulário e contatos", caption: "Formulário de orçamento", device: "desktop" },
      { src: servicosMobile, alt: "Página da Casa em Dia no celular", caption: "Versão para celular", device: "mobile" },
    ],
    demoUrl: process.env.NEXT_PUBLIC_DEMO_URL_SERVICOS,
    status: "demonstrativo",
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
export const featuredProject = projects.find((p) => p.featured) ?? projects[0]!;
export const otherProjects = projects.filter((p) => p !== featuredProject);

export const STATUS_LABEL = { demonstrativo: "Projeto demonstrativo", cliente: "Projeto para cliente" } as const;
