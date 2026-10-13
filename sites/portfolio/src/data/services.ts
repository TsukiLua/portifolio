export type ServiceIcon = "building" | "target" | "grid" | "puzzle";

export interface Service {
  id: string;
  title: string;
  description: string;
  items: string[];
  icon: ServiceIcon;
}

export const services: Service[] = [
  {
    id: "institucional",
    title: "Sites institucionais",
    description: "Para apresentar a empresa, explicar o que ela faz e facilitar o primeiro contato.",
    items: ["Apresentação da empresa", "Serviços e informações comerciais", "Formulário de contato", "Integração com WhatsApp", "Layout responsivo"],
    icon: "building",
  },
  {
    id: "landing",
    title: "Landing pages",
    description: "Uma página focada em uma oferta ou serviço, com um caminho claro até o contato.",
    items: ["Página orientada a uma oferta", "Hierarquia de conteúdo", "Chamadas para ação", "Formulário ou contato comercial"],
    icon: "target",
  },
  {
    id: "catalogo",
    title: "Catálogos digitais",
    description: "Para mostrar produtos ou veículos de forma organizada e receber consultas.",
    items: ["Produtos ou veículos com fotos", "Categorias e filtros, quando necessários", "Página de detalhes", "Consulta pelo WhatsApp"],
    icon: "grid",
  },
  {
    id: "personalizado",
    title: "Funcionalidades personalizadas",
    description: "Recursos específicos do seu negócio, definidos junto com você.",
    items: ["Agendamento", "Formulários específicos", "Integrações com APIs", "Painéis administrativos, conforme o escopo"],
    icon: "puzzle",
  },
];

export const servicesNote =
  "Os itens acima são exemplos do que pode fazer parte de cada tipo de site. O escopo de cada projeto é definido na conversa inicial, de acordo com a necessidade e o orçamento — nem toda funcionalidade está incluída em todos os projetos.";

export const processSteps = [
  { title: "Conversa inicial", text: "Entender o negócio, o público, os objetivos e o que o site precisa resolver." },
  { title: "Planejamento", text: "Definir escopo, páginas, conteúdo, funcionalidades e prazo, tudo por escrito." },
  { title: "Design e desenvolvimento", text: "Criar a interface e implementar as funcionalidades combinadas, com prévias para acompanhamento." },
  { title: "Revisão", text: "Validar o site com você e fazer os ajustes previstos no escopo." },
  { title: "Publicação", text: "Colocar o site no ar no seu domínio e orientar sobre como mantê-lo e atualizá-lo." },
];
