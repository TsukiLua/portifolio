# Prime Motors — catálogo de veículos (demonstração)

Site de catálogo para uma **loja fictícia** de seminovos, feito para demonstrar a lojas de carros, concessionárias, revendas de motos e de veículos comerciais o que pode ser entregue: estoque navegável, busca e filtros completos, página por veículo e contato contextualizado pelo WhatsApp.

> A Prime Motors, seu estoque, preços, contatos e endereço são **fictícios**. As fotos são do Wikimedia Commons (licenças CC BY / CC BY-SA, créditos em [`src/assets/vehicles/CREDITOS.md`](src/assets/vehicles/CREDITOS.md)); os veículos fotografados não pertencem à loja.

## O que o visitante consegue fazer

| Página | Funcionalidades |
|---|---|
| `/` Início | Hero com CTAs; **busca rápida** (marca, preço até, tipo) que leva ao estoque já filtrado e funciona sem JavaScript; 6 destaques; categorias geradas a partir do estoque (com contagem); diferenciais; chamada comercial |
| `/estoque` | Busca por marca/modelo/versão; filtros de **marca, modelo (depende da marca), preço mín./máx., ano mín./máx., km máx., tipo, combustível, câmbio, cor, portas e "somente disponíveis"**; chips removíveis; "Limpar filtros"; contagem ao vivo; 5 ordenações; filtros em gaveta no celular; **tudo preservado na URL** |
| `/veiculos/[slug]` | Galeria (setas, ← → no teclado, miniaturas, ampliação, fallback se a imagem falhar); ficha completa; descrição e itens; CTAs "Tenho interesse" (WhatsApp) e "Agendar visita" (formulário); relacionados; título, descrição, canonical, Open Graph e dados estruturados `Car`/`Motorcycle` por veículo |
| `/sobre` | História e princípios, com aviso explícito de empresa fictícia |
| `/contato` | Contatos, horários, WhatsApp e formulário validado (Zod) |
| `/privacidade` | Política demonstrativa (sem caráter jurídico) |
| 404 | Página geral e página específica de "veículo não encontrado" (status 404) |

Exemplo de URL filtrada: `/estoque?marca=Honda&modelo=Civic&ordem=menor-km` — ao abrir, os filtros são reconstruídos.

## Decisões registradas

| Tema | Decisão | Por quê |
|---|---|---|
| Arquitetura | Sem backend: estoque tipado em `src/data/vehicles.ts`, todas as páginas estáticas (SSG) | MVP demonstrativo, custo zero de servidor; trocar a fonte de dados não exige mudar componentes |
| Tipo `Vehicle` | `images` guarda `{ src, alt }`; combustível/câmbio são uniões fechadas | Acessibilidade (alt por foto) e filtros/rótulos consistentes |
| Status | Vendidos e reservados continuam visíveis com selo (ícone + texto); vendidos vão para o fim em qualquer ordenação; CTAs mudam ("Ver similares", "Avise-me se liberar") | Nunca parecer disponível sem estar |
| Relevância | Regra fixa: disponível → reservado → vendido; destaque; ano mais novo; menor km; referência | Determinística e explicável, sem dados inexistentes (ex.: visualizações) |
| Opções de filtro | Derivadas do estoque (`getFacets`) | Nenhuma opção que retorne zero por definição |
| URL | Fonte da verdade dos filtros, atualizada com `history.replaceState`; estado local espelha a URL para resposta imediata | Links compartilháveis e botão voltar funcionando |
| Formulários | Validação com Zod; ao enviar, **preparam a mensagem para o WhatsApp** e dizem que nada foi enviado | Não simular envio inexistente |
| WhatsApp | Uma função (`src/lib/whatsapp.ts`); número via variável de ambiente; sem número, abre o seletor de contatos | Nunca direcionar mensagens a um telefone real de terceiros |
| Fotos | Wikimedia Commons, galeria de cada carro com fotos do **mesmo veículo** (mesmo autor/sessão) | Coerência entre anúncio e imagens; licença verificável |
| Dados técnicos | Sem potência, consumo ou medidas | Não inventar especificações sem fonte confiável |
| Biblioteca de UI | Não usada: `<dialog>` e controles nativos | Acessibilidade nativa com menos JavaScript |
| Indexação | `noindex` por padrão | Não indexar loja/estoque fictícios |

## Estrutura

```
src/
  app/
    page.tsx                 Início
    estoque/page.tsx         Estoque (grade estática como fallback + explorador interativo)
    veiculos/[slug]/         Página do veículo + not-found próprio
    sobre/ contato/ privacidade/
    layout.tsx, globals.css, not-found.tsx, robots.ts, sitemap.ts, icon.svg, opengraph-image.jpg
  components/
    layout/                  Header, NavLinks, MobileNavigation, Footer
    home/                    HeroSection (busca rápida), HomeSections (destaques, categorias, diferenciais, CTA)
    vehicles/                VehicleCard, VehicleGrid, VehicleImage (fallback), VehicleGallery, VehicleFilters,
                             InventoryExplorer, VehicleSpecs, VehicleContactActions, StatusBadge
    forms/                   ContactForm, InterestForm, FormField, DemoResult
    ui/                      primitives (botões, container, títulos), icons
  data/
    vehicles.ts              Estoque (fonte única)
    dealership.ts            Dados da loja (fonte única)
  lib/
    formatters.ts            Preço, km, ano, rótulos
    vehicle-filters.ts       Busca, filtros, ordenação, URL, chips, relacionados
    whatsapp.ts              Links e mensagens de WhatsApp
    validation.ts            Schemas Zod (formulários e estoque)
    catalog.test.ts          21 testes de regras
  types/vehicle.ts
  assets/vehicles/           Fotos + CREDITOS.md
```

## Rodar, testar e publicar

Na raiz do repositório:

```bash
npm install
npm run dev:veiculos                       # http://localhost:3005

npm run typecheck -w sites/catalogo-veiculos
npm run lint -w sites/catalogo-veiculos
npx vitest run sites/catalogo-veiculos     # testes de regras
npm run build -w sites/catalogo-veiculos
npx playwright test veiculos.spec          # E2E (requer build; sobe o servidor sozinho)
```

**Publicação (Vercel):** novo projeto com *Root Directory* `sites/catalogo-veiculos`; configure as variáveis abaixo. Alternativas e notas de custo no [README da raiz](../../README.md#publicação).

## Configuração

Copie `.env.example` para `.env.local`:

| Variável | Uso |
|---|---|
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Número da loja, só dígitos com DDD (ex.: `11999999999`; o `55` é adicionado). **Vazio:** o WhatsApp abre com a mensagem pronta para o visitante escolher o contato |
| `NEXT_PUBLIC_SITE_URL` | Domínio público (canonical, Open Graph, sitemap, dados estruturados) |
| `NEXT_PUBLIC_ALLOW_INDEXING` | `true` libera buscadores (somente com loja e dados reais) |

## Personalizar para outra loja

**Dados da loja** — edite apenas `src/data/dealership.ts`: nome, slogan, telefone, e-mail, endereço, horários, dias fechados (usados na validação da data de visita), redes sociais e texto institucional.

**Identidade visual** — cores em `src/app/globals.css` (`@theme`: `wine` é a cor de destaque), fontes em `src/app/layout.tsx`, logotipo no componente `Logo` em `src/components/layout/Header.tsx`, favicon em `src/app/icon.svg`, imagem de compartilhamento em `src/app/opengraph-image.jpg` (1200×630) e hero em `src/assets/vehicles/hero-1.jpg`.

**Cadastrar um veículo**
1. Salve as fotos em `src/assets/vehicles/` (paisagem, ~1600×1067, JPEG até ~300 KB).
2. Importe-as no topo de `src/data/vehicles.ts` e adicione um objeto ao array `vehicles`:
   - `id` único no formato `PM-0000` (aparece nas mensagens de WhatsApp como referência);
   - `slug` único em minúsculas com hífens (vira a URL `/veiculos/<slug>`);
   - `images`: a primeira é a capa; cada uma com `alt` descritivo;
   - `doors` é obrigatório para carros; omita para motos.
3. Rode `npm test`: o schema Zod valida o estoque inteiro (IDs/slugs únicos, preços, anos, alt das fotos).

**Editar** — altere o objeto; preço, status e destaque refletem em listagem, filtros, página e mensagens.

**Remover** — apague o objeto e as fotos sem uso. Para manter o histórico, prefira `status: "sold"`.

Novos tipos, combustíveis ou câmbios: acrescente em `src/types/vehicle.ts` e o rótulo correspondente em `src/lib/formatters.ts`.

## Limitações conhecidas

- Estoque, preços e contatos são fictícios; formulários não enviam nada (preparam a mensagem do WhatsApp).
- Filtros de preço, ano e km usam faixas pré-definidas (selects), não valores livres.
- Fotos com licença CC BY-SA: em uso real, troque pelas fotos da própria loja (ou mantenha a atribuição).
- A ampliação da galeria usa as fotos em até 1600 px de largura.
- Sem paginação: adequado a dezenas de veículos; acima de ~100, paginar ou carregar sob demanda.

## O que exige backend numa versão real

- Cadastro de estoque por painel (CMS headless, planilha ou integração com DMS/ERP da loja).
- Envio real de leads (e-mail transacional ou CRM) com anti-spam, rate limit e registro de consentimento (LGPD).
- Agenda de visitas com confirmação e bloqueio de horário.
- Simulação de financiamento integrada a instituições parceiras.
- Status de estoque em tempo real (reservado/vendido) e avisos automáticos.
- Métricas de conversão (com consentimento de cookies).
