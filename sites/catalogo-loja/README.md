# Maré — catálogo digital (demonstração)

**Objetivo comercial:** mostrar a um pequeno comércio como divulgar produtos online e receber pedidos pelo WhatsApp, sem começar por um e-commerce completo.

Identidade: editorial de moda — linho cru, tinta e argila; Bodoni Moda + Jost; muito espaço em branco.

## Funcionalidades

- **Home:** hero editorial, categorias com contagem, novidades, "como pedir", mais vendidas, chamada da loja física.
- **Cabeçalho:** páginas, faixa de categorias, busca (funciona sem JavaScript) e lista de interesse; menu móvel em `<dialog>`.
- **Catálogo `/catalogo`:** busca por nome (sem diferenciar acentos), filtro por categoria e faixa de preço, ocultar esgotados, ordenação (destaques, preço, nome), contagem por categoria, estado vazio, gaveta de filtros no celular.
  - A URL guarda os filtros e é compartilhável: `/catalogo?categoria=vestidos&preco=200-300&ordem=menor-preco`.
  - O HTML inicial já traz todos os produtos (bom para SEO e para quem está sem JS).
- **Produto `/produto/[slug]`:** galeria, preço (com "de/por" em promoção), disponibilidade em texto, seleção de cor e tamanho (indisponíveis riscados e desabilitados), detalhes, entrega/trocas, relacionados, dados estruturados `Product`.
  - "Pedir pelo WhatsApp" exige variante válida e envia nome, referência, variante, preço e link.
  - Esgotado: sem pedido; oferece "Perguntar sobre reposição".
- **Lista de interesse:** junte várias peças e consulte tudo em uma única mensagem de WhatsApp, com total estimado.
- Páginas `/sobre` e `/trocas-e-entregas` (política demonstrativa).

## Apenas demonstrativo

- Não há checkout, pagamento nem processamento de pedidos. Disponibilidade e frete são combinados na conversa.
- A lista de interesse fica **só no navegador** (`localStorage`, apenas IDs e variantes — nenhum dado pessoal) e é identificada como "não é pedido nem reserva".
- Marca, produtos, preços, estoque, endereço e política são fictícios.

## Estrutura

```
src/
  app/            home, catalogo, produto/[slug], sobre, trocas-e-entregas, robots, sitemap, 404
  components/     layout/* (Header, busca, menu, rodapé), catalog/*, product/*, list/*
  data/           products.ts (fonte única), categories.ts, store.ts
  lib/            catalog.ts (busca/filtros/ordem), order.ts (variantes e mensagens) (+ testes),
                  interest-list.ts, contact.ts, config.ts
  assets/         fotos + CREDITOS.md
```

## Rodar

Na raiz: `npm install` e `npm run dev:catalogo` → http://localhost:3003

## Personalizar

| O quê | Onde |
|---|---|
| Produtos (nome, preço, preço "de", imagens, cores, tamanhos, disponibilidade, destaque) | `src/data/products.ts` — `id` estável e `slug` único (testado) |
| Categorias | `src/data/categories.ts` (e o tipo `CategoryId`) |
| Faixas de preço e opções de ordenação | `src/lib/catalog.ts` |
| Texto das mensagens de WhatsApp | `src/lib/order.ts` |
| Dados da loja (endereço, horário, contatos) | `src/data/store.ts` |
| Política de trocas e entregas | `src/app/trocas-e-entregas/page.tsx` |
| Número do WhatsApp / URL pública | `.env.local` (`NEXT_PUBLIC_WHATSAPP_NUMBER`, `NEXT_PUBLIC_SITE_URL` — usada no link do produto) |
| Cores e fontes | `src/app/globals.css` e `src/app/layout.tsx` |

**Adicionar um produto:** coloque a foto (4:5, ~1000×1250) em `src/assets`, importe em `products.ts` e adicione o objeto. A página do produto, o sitemap e os filtros se atualizam sozinhos. Rode `npm test` para validar IDs, slugs e categorias.

Para muitos produtos ou edição pelo lojista, troque `products.ts` por uma fonte externa (planilha, CMS) mantendo o tipo `Product`.

## Deploy

Vercel com *Root Directory* `sites/catalogo-loja`. Defina `NEXT_PUBLIC_SITE_URL` com o domínio final para os links de produto nas mensagens. Ver [README da raiz](../../README.md#publicação).
