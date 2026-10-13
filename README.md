# Portfólio de demonstrações — 5 sites

Cinco sites de demonstração para apresentar a comércios e prestadores de serviço. Cada um tem marca, identidade visual e funcionalidades próprias do segmento. Todos rodam sem backend: os fluxos funcionam de ponta a ponta no navegador e **declaram explicitamente** que são demonstrativos.

| Site | Segmento | Destaque comercial | Porta |
|---|---|---|---|
| [Brasa Barbearia](sites/barbearia/README.md) | Barbearia premium | Agendamento em 5 etapas (serviço, barbeiro, dia/horário, dados, revisão) | 3001 |
| [Casa em Dia](sites/servicos-locais/README.md) | Manutenção residencial | Landing de conversão com formulário de orçamento validado | 3002 |
| [Maré](sites/catalogo-loja/README.md) | Loja de roupas | Catálogo com busca, filtros, variantes e pedido pelo WhatsApp | 3003 |
| [Sálvia Estúdio](sites/estudio-beleza/README.md) | Estúdio de beleza | Solicitação de horário com vários tratamentos e regras de agenda | 3004 |
| [Prime Motors](sites/catalogo-veiculos/README.md) | Loja de veículos | Estoque com busca e 13 filtros na URL, galeria, agendamento de visita e WhatsApp por veículo | 3005 |

> Marcas, pessoas, endereços, telefones, preços, avaliações e depoimentos são **fictícios**. Fotos: Unsplash nos quatro primeiros sites e Wikimedia Commons (CC BY/CC BY-SA) na Prime Motors — créditos em `sites/*/src/assets/**/CREDITOS.md`.

## Tecnologias

- Next.js 16 (App Router, geração estática) · React 19 · TypeScript 5.9 estrito
- Tailwind CSS 4 · Lucide React · `next/font` · `next/image` · Zod 4 (Prime Motors)
- ESLint 9 (`eslint-config-next`) · Vitest 4 (regras de negócio) · Playwright (E2E)
- npm workspaces (uma instalação para os quatro sites)

Requisitos: **Node.js 20.9+** e npm 10+.

## Estrutura

```
.
├── packages/core/          Regras compartilhadas, sem UI: datas, motor de agenda,
│                           telefone BR, WhatsApp, moeda, validação (+ testes)
├── sites/
│   ├── barbearia/          Brasa Barbearia
│   ├── servicos-locais/    Casa em Dia
│   ├── catalogo-loja/      Maré
│   ├── estudio-beleza/     Sálvia Estúdio de Beleza
│   └── catalogo-veiculos/  Prime Motors
├── e2e/                    Testes Playwright (fluxos + qualidade nos 5 sites)
├── docs/
│   ├── PLANO.md            Plano de execução e decisões de arquitetura
│   └── MELHORIAS.md        Melhorias futuras (obrigatórias x opcionais)
├── playwright.config.ts
├── vitest.config.mts
└── tsconfig.base.json      Configuração TypeScript estrita compartilhada
```

Cada site segue o mesmo padrão interno: `src/app` (rotas), `src/components` (UI), `src/data` (conteúdo editável), `src/lib` (regras, configuração), `src/assets` (imagens).

Apenas **lógica** é compartilhada (`@demo/core`). A UI é própria de cada site para que as identidades não pareçam variações do mesmo template.

## Como rodar

```bash
npm install                 # instala tudo (raiz + 5 sites)

npm run dev:barbearia       # http://localhost:3001
npm run dev:servicos        # http://localhost:3002
npm run dev:catalogo        # http://localhost:3003
npm run dev:estudio         # http://localhost:3004
npm run dev:veiculos        # http://localhost:3005
```

Produção local de um site: `npm run build -w sites/barbearia && npm run start -w sites/barbearia`.

## Verificação

| Comando | O que faz |
|---|---|
| `npm run typecheck` | Gera tipos de rotas e roda `tsc --noEmit` nos 5 sites e no core |
| `npm run lint` | ESLint nos 5 sites |
| `npm test` | Vitest: regras de agenda, catálogos, filtros de veículos, formulários, mensagens de WhatsApp, integridade dos dados |
| `npm run build` | Build de produção dos 5 sites |
| `npm run test:e2e` | Playwright contra os builds (sobe os 5 servidores automaticamente) |
| `npm run check` | typecheck + lint + test + build |

Na primeira execução do E2E: `npx playwright install chromium`.

Os E2E cobrem os fluxos completos e, em **375, 768 e 1280 px**: ausência de rolagem horizontal, erros de console, imagens quebradas, aviso de demonstração, `h1` único, links internos (200) e 404, links de WhatsApp, menu móvel por teclado/Esc e metadados de SEO.

## Configuração por site (variáveis de ambiente)

Copie `sites/<site>/.env.example` para `sites/<site>/.env.local`:

| Variável | Padrão | Uso |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | `http://localhost:300x` | URL pública (Open Graph, sitemap, links de produto) |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | vazio | Número do negócio (DDD + número). **Vazio = o WhatsApp abre com a mensagem pronta e o visitante escolhe o contato**, sem expor telefone de terceiros |
| `NEXT_PUBLIC_ALLOW_INDEXING` | `false` | `true` libera buscadores. Demonstrações ficam com `noindex` e `robots.txt` bloqueando |

Não há segredos: são valores públicos, embutidos no build.

## O que é demonstrativo (e o que falta para produção)

| Funcionalidade | Na demonstração | Para produção |
|---|---|---|
| Agendamentos (Brasa, Sálvia) | Agenda ocupada gerada localmente (determinística); nada é reservado | Integrar sistema de agenda (ex.: Google Calendar API, Trinks, AgendaPro ou backend próprio) substituindo `busyFor` em `src/lib/booking.ts` |
| Orçamento (Casa em Dia) | Validação completa; nada é enviado | Endpoint (Route Handler) com envio por e-mail/CRM, anti-spam e registro de consentimento |
| Pedidos (Maré) | Link de WhatsApp com produto e variante; lista de interesse no `localStorage` | Estoque real (planilha/ERP/headless CMS) e, se fizer sentido, checkout |
| Leads e visitas (Prime Motors) | Formulários validados com Zod que preparam a mensagem do WhatsApp | Envio para CRM/e-mail, agenda de visitas e estoque integrado ao DMS da loja |
| WhatsApp | Link `wa.me` com mensagem; envio sempre manual | Configurar `NEXT_PUBLIC_WHATSAPP_NUMBER` |
| Mapa | Ilustração SVG | Embed do Google Maps/OpenStreetMap com consentimento de cookies |
| Redes sociais | Apontam para a home do Instagram | Perfis reais |

Nenhum dado pessoal é enviado ou armazenado. A Maré guarda apenas IDs de produtos e variantes no navegador.

## Publicação

Todas as rotas são estáticas (SSG); o único recurso de servidor usado é a otimização de imagens do `next/image`.

**Vercel (recomendado para demonstrar):** crie um projeto por site, com *Root Directory* = `sites/<site>`. A Vercel detecta Next.js e os npm workspaces. Defina as variáveis acima por projeto. Plano Hobby atende demonstrações.

**Outras opções:** qualquer host Node (`npm run build && npm run start -w sites/<site>`) ou, para hospedagem 100% estática (Netlify, Cloudflare Pages, S3), adicionar `output: "export"` e `images: { unoptimized: true }` ao `next.config.ts` — perde-se a otimização automática de imagens (as originais já são JPEG comprimidos, 60–300 KB).

**Custos (FinOps):** sem backend, banco ou chamadas pagas, o custo é previsível e tende a zero em planos gratuitos. O ponto de atenção é a cota de otimização de imagens da Vercel (conta imagens de origem distintas; são ~120 no total) e o tráfego. Para demos de longa duração, configure alerta de uso no provedor ou use a exportação estática.

## Problemas conhecidos

- `npm audit` aponta 5 vulnerabilidades *high* em `braces`, dependência apenas da cadeia de lint (`eslint-config-next`). Não chega ao bundle (`npm audit --omit=dev`: 0). A correção oferecida pelo npm rebaixaria para Next 14; aguardar atualização upstream.
- `Big Shoulders` (fonte da Brasa) não tem métricas de fallback no Google Fonts; usamos `Arial Narrow` como fallback sem ajuste automático.
- A agenda demonstrativa considera o relógio do navegador do visitante (fuso local).

Mais em [docs/MELHORIAS.md](docs/MELHORIAS.md).
