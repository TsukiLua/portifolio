# Portfólio — desenvolvedor web freelancer

Site de portfólio para apresentar serviços e projetos a pequenos negócios e receber pedidos de orçamento pelo WhatsApp ou por e-mail. É o destino principal para quem chega por WhatsApp, Instagram, indicação ou prospecção presencial.

- **Página única** (`/`): hero, projetos, serviços, como funciona, sobre e contato.
- **Página por projeto** (`/projetos/<slug>`): visão geral, objetivo, público, problema, funcionalidades, decisões de UX/UI, tecnologias, capturas e CTA "Solicitar projeto semelhante".
- **Capturas reais**: as imagens dos projetos são screenshots dos cinco sites deste repositório em execução, geradas por script.
- **Honestidade por padrão**: projetos são marcados como demonstrativos; não há métricas, depoimentos, clientes ou dados biográficos inventados. Campos pessoais vazios simplesmente não aparecem.

## Rodar

Na raiz do repositório:

```bash
npm install
npm run dev:portfolio          # http://localhost:3000

npm run build -w sites/portfolio
npm run start -w sites/portfolio
npm run typecheck -w sites/portfolio
npm run lint -w sites/portfolio
npx vitest run sites/portfolio  # regras: projetos, WhatsApp, e-mail, formulário
npx playwright test portfolio.spec   # E2E (requer build)
```

Em `npm run dev`, um aviso no canto da tela lista o que ainda falta configurar (nome, e-mail, WhatsApp). Ele não aparece em produção.

## Configurar seus dados

Tudo em **`src/data/profile.ts`**:

| Campo | O que é |
|---|---|
| `name`, `brand`, `monogram` | Nome profissional, marca do cabeçalho e letras do monograma |
| `role`, `description` | Cargo e descrição curta (metadados e rodapé) |
| `email` | E-mail profissional (botões "e-mail" e envio do formulário via `mailto:`) |
| `location` | Opcional — aparece no "Sobre" se preenchido |
| `photo` | Opcional — importe uma imagem de `src/assets` (ex.: `import foto from "../assets/foto.jpg"`) e atribua; sem foto, aparece o monograma |
| `social` | Lista `{ label, url }`; vazia = nenhuma rede exibida |
| `about` | Parágrafos do "Sobre" |
| `facts` | Opcional — pares `{ label, value }` (ex.: formação, atuação). Só preencha com informações verdadeiras |

Serviços, observação de escopo e etapas do processo ficam em **`src/data/services.ts`**.

## Variáveis de ambiente

Copie `.env.example` para `.env.local` (ou configure no painel da hospedagem):

| Variável | Uso |
|---|---|
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Seu WhatsApp, só dígitos com DDD (ex.: `11999999999`; o `55` é adicionado). Vazio: o WhatsApp abre com a mensagem pronta para o visitante escolher o contato |
| `NEXT_PUBLIC_SITE_URL` | Domínio final (canonical, Open Graph, sitemap) |
| `NEXT_PUBLIC_ALLOW_INDEXING` | `true` libera buscadores — ative após preencher o perfil e publicar no domínio final |
| `NEXT_PUBLIC_DEMO_URL_*` | URL pública de cada demonstração. Sem valor, o botão "Abrir demonstração" não aparece. Em `npm run dev`, `.env.development` aponta para `localhost:3001–3005` |

## WhatsApp

Função única em `src/lib/contact.ts` (usa `@demo/core/whatsapp`):

- Mensagem geral: *"Olá! Encontrei seu portfólio e gostaria de conversar sobre o desenvolvimento de um site para minha empresa."*
- Página de projeto: *"Olá! Vi o projeto [nome] no seu portfólio e gostaria de solicitar um orçamento para uma solução semelhante."*
- Formulário: monta a mensagem com nome, empresa, tipo de site, funcionalidades e prazo (só nome e tipo são obrigatórios).

Nada é enviado automaticamente: o link `wa.me` (ou `mailto:`) abre com o texto e o visitante decide enviar.

## Adicionar um projeto

1. Publique o projeto e anote a URL da demonstração (se houver).
2. Gere as capturas (veja abaixo) ou coloque imagens em `src/assets/projects/`: desktop 1440×900 e, se quiser, celular 390×844 @2x.
3. Em `src/data/projects.ts`, importe as imagens e adicione um objeto com `id`, `slug` (vira `/projetos/<slug>`), textos (resumo, problema, objetivo, público, solução), `features`, `uxDecisions`, `technologies`, `cover`, `gallery` e `status`:
   - `"demonstrativo"` para projetos de portfólio;
   - `"cliente"` **somente** para trabalhos reais entregues (o selo muda para "Projeto para cliente").
4. Para destacar na galeria, mova `featured: true` para ele (apenas um projeto).
5. Rode `npm test`: valida slugs, campos obrigatórios e bloqueia termos de métricas inventadas.

A página do projeto, o sitemap e os links de navegação anterior/próximo são gerados automaticamente.

> Ao incluir um trabalho de cliente, peça autorização para exibir marca e capturas, e só cite resultados que o cliente possa confirmar. O teste `todos os projetos devem ser demonstrativos` precisará ser ajustado nesse momento — ele existe para impedir que um projeto seja marcado como de cliente por engano.

## Trocar imagens (capturas reais)

O script `scripts/capture-screenshots.mjs` abre cada demonstração, interage quando necessário (ex.: avança o agendamento até os horários) e salva JPEGs otimizados em `src/assets/projects/`.

```bash
npm run build                      # na raiz: gera os 5 sites
# suba os sites (em terminais separados ou em segundo plano):
npm run start -w sites/barbearia   # 3001 … repita para servicos-locais, catalogo-loja, estudio-beleza, catalogo-veiculos
npm run capture -w sites/portfolio
```

Para capturar demos publicadas, defina `CAPTURE_VEICULOS`, `CAPTURE_BARBEARIA`, `CAPTURE_SERVICOS`, `CAPTURE_CATALOGO`, `CAPTURE_ESTUDIO` com as URLs. Para outras telas, edite a lista `SHOTS` no script.

## Identidade visual

- Cores: `src/app/globals.css` (`@theme`) — base neutra quente, tinta `ink` e destaque `accent` (índigo).
- Fontes: `src/app/layout.tsx` — Geist (texto), Instrument Serif (ênfases em itálico), Geist Mono (rótulos).
- Favicon: `src/app/icon.svg`. Imagem de compartilhamento: gerada no build por `src/app/opengraph-image.tsx` a partir do perfil.

## Publicar

**Vercel:** novo projeto com *Root Directory* `sites/portfolio`, variáveis acima, domínio próprio. Publique também as demonstrações (um projeto por site) e preencha `NEXT_PUBLIC_DEMO_URL_*` com as URLs. Tudo é estático: custo previsível e compatível com o plano gratuito para tráfego de portfólio.

## Dependências externas

| Recurso | Depende de |
|---|---|
| Botões de WhatsApp | Aplicativo/serviço do WhatsApp no dispositivo do visitante |
| Botões de e-mail | Cliente de e-mail configurado no dispositivo do visitante |
| Fontes | Baixadas do Google Fonts no build (servidas pelo próprio site) |

Não há backend, banco de dados, analytics nem cookies. Para receber o formulário direto por e-mail ou CRM seria preciso um serviço de envio (ex.: e-mail transacional) — hoje ele prepara a mensagem e o visitante envia.

## Limitações conhecidas

- Nome, e-mail e WhatsApp estão com valores de exemplo até serem configurados.
- Sem URLs de demonstração configuradas, os projetos mostram apenas o estudo de caso.
- As capturas refletem o estado dos projetos no momento em que o script foi executado; rode-o de novo após mudanças visuais.
