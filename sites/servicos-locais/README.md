# Casa em Dia (demonstração)

**Objetivo comercial:** landing page de conversão para empresa de manutenção residencial — explicar rápido o serviço, reduzir dúvidas e facilitar o pedido de orçamento.

Identidade: branco, azul de confiança e amarelo "ferramenta"; Plus Jakarta Sans; cantos arredondados.

## Funcionalidades

- Header com telefone, CTA de orçamento e menu móvel com atalhos de contato.
- Hero com proposta de valor, CTAs de orçamento e WhatsApp, selos de confiança.
- Serviços (6) com exemplos e valor de referência; cada cartão **pré-seleciona o serviço** no formulário.
- Diferenciais, como funciona (4 passos), galeria de trabalhos, regiões atendidas (bairros fictícios, identificados), depoimentos fictícios identificados, FAQ.
- **Formulário de orçamento**: nome, telefone (máscara + validação de DDD), tipo de serviço, bairro, descrição (15–600 caracteres) e período preferido.
  - Erros por campo ao sair do campo; ao enviar, resumo de erros focado com links para cada campo.
  - Estado de processamento, tela de sucesso **que informa que nada foi enviado**, e botão para encaminhar o pedido pelo WhatsApp com todos os dados.
- WhatsApp com mensagem contextualizada (geral, por região e por pedido). Links `tel:` e `mailto:` funcionais.
- SEO: metadados, Open Graph, dados estruturados `HomeAndConstructionBusiness`, `noindex` por padrão.

## Apenas demonstrativo

O formulário não tem backend: valida e monta a solicitação localmente. Empresa, CNPJ, telefone, e-mail, bairros e depoimentos são fictícios.

## Estrutura

```
src/
  app/            layout, home, robots, sitemap, ícone, 404, imagem OG
  components/     Header, MobileNav, Footer, Field, ui, home/*, quote/*
  data/           business.ts (contatos, regiões), services.ts, content.ts
  lib/            quote.ts (+ testes), contact.ts, config.ts
  assets/         fotos + CREDITOS.md
```

## Rodar

Na raiz: `npm install` e `npm run dev:servicos` → http://localhost:3002

## Personalizar

| O quê | Onde |
|---|---|
| Nome, telefone, e-mail, horário, CNPJ | `src/data/business.ts` → `business` |
| Bairros atendidos | `src/data/business.ts` → `regions` |
| Serviços, exemplos, valores de referência, imagens | `src/data/services.ts` |
| Diferenciais, passos, trabalhos, depoimentos, FAQ | `src/data/content.ts` |
| Regras do formulário e texto das mensagens | `src/lib/quote.ts` |
| Número do WhatsApp | `.env.local` → `NEXT_PUBLIC_WHATSAPP_NUMBER` |
| Cores | `src/app/globals.css` (`@theme`) |
| Imagens | `src/assets` (mesmos nomes) e `src/app/opengraph-image.jpg` |

### Ativar envio real do orçamento

1. Criar `src/app/api/orcamento/route.ts` que revalida com `validateQuote()` no servidor.
2. Enviar por e-mail transacional (ex.: Resend, SES) ou para o CRM; guardar a chave em variável de ambiente **sem** prefixo `NEXT_PUBLIC_`.
3. Adicionar proteção anti-spam (Turnstile/hCaptcha) e limite de requisições.
4. Em `QuoteForm.tsx`, trocar o `setTimeout` por `fetch` e exibir uma mensagem de erro clara se a rede falhar (hoje não há estado de erro de envio, pois não há envio).
5. Publicar política de privacidade e registrar o consentimento (LGPD).

## Deploy

Vercel com *Root Directory* `sites/servicos-locais`. Ver [README da raiz](../../README.md#publicação).
