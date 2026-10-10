# Sálvia Estúdio de Beleza (demonstração)

**Objetivo comercial:** mostrar como um estúdio de beleza/estética apresenta tratamentos e equipe e permite que clientes **solicitem** horários pelo celular, sem instruções externas.

Identidade: creme, verde-sálvia/musgo e terracota (sem depender de rosa); Fraunces + Figtree; imagens em arco e botões em pílula. Propositalmente diferente da Brasa.

## Funcionalidades

- Home: hero, apresentação do estúdio, menu de tratamentos por categoria (duração e valor; "a partir de" quando depende de avaliação), equipe, como funciona, galeria, FAQ, horários e localização, rodapé.
- **Solicitação de horário `/agendar`** com etapas progressivas (cada uma libera a seguinte):
  1. Até **3 tratamentos** combinados (duração e valor somados)
  2. Profissional — só aparecem as que fazem **todos** os tratamentos escolhidos; "sem preferência" quando há mais de uma; aviso quando nenhuma faz a combinação
  3. Calendário em grade: datas passadas, domingos/segundas e dias além de 30 dias ficam desabilitados (com motivo para leitores de tela); horários por turno (manhã/tarde), respeitando o **intervalo de almoço** e a **duração total**; antecedência mínima de 2 h
  4. Nome, WhatsApp, e-mail opcional, observações e consentimento (LGPD)
  - Resumo fixo no rodapé da tela com tratamentos, duração, valor e horário; botão "Revisar" leva à primeira pendência.
  - Revisão → confirmação revalidada → tela final + mensagem pronta para o WhatsApp.
- Pré-seleção por link: `/agendar?tratamento=lash-lifting`, `/agendar?profissional=marina`.
- SEO: metadados, Open Graph, dados estruturados `BeautySalon`, `noindex` por padrão.

## Apenas demonstrativo

A disponibilidade é simulada localmente e **nenhuma reserva é feita**; a confirmação explica isso e não se apresenta como reserva real. Estúdio, equipe (fotos de banco de imagens com nomes fictícios), preços, endereço e contatos são fictícios.

## Estrutura

```
src/
  app/            layout, home, /agendar, robots, sitemap, ícone, 404, imagem OG
  components/     layout.tsx (Header, Footer, Logo, DemoBar), MobileNav, ui, home/*, booking/*
  data/           studio.ts (contatos, expediente, regras), treatments.ts, team.ts, content.ts
  lib/            booking.ts (+ testes), contact.ts, config.ts, use-now.ts
  assets/         fotos + CREDITOS.md
```

## Rodar

Na raiz: `npm install` e `npm run dev:estudio` → http://localhost:3004

## Personalizar

| O quê | Onde |
|---|---|
| Nome, endereço, contatos | `src/data/studio.ts` → `studio` |
| Expediente (turnos por dia, ex.: intervalo de almoço) | `src/data/studio.ts` → `HOURS` |
| Máx. de tratamentos, janela, antecedência, intervalo | `src/data/studio.ts` → `BOOKING_RULES` |
| Tratamentos, categorias, durações, preços, "a partir de" | `src/data/treatments.ts` |
| Profissionais e tratamentos de cada uma | `src/data/team.ts` |
| Galeria, passos, FAQ | `src/data/content.ts` |
| Número do WhatsApp | `.env.local` → `NEXT_PUBLIC_WHATSAPP_NUMBER` |
| Cores e fontes | `src/app/globals.css` e `src/app/layout.tsx` |
| Imagens | `src/assets` e `src/app/opengraph-image.jpg` |

Para agenda real, substitua `busyFor()` em `src/lib/booking.ts` por consulta ao sistema do estúdio e confirme no servidor (evita dois clientes no mesmo horário).

## Deploy

Vercel com *Root Directory* `sites/estudio-beleza`. Ver [README da raiz](../../README.md#publicação).
