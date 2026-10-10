# Brasa Barbearia (demonstração)

**Objetivo comercial:** mostrar como uma barbearia apresenta serviços e equipe com profissionalismo e transforma visitas em agendamentos — a principal ação do site.

Identidade: carvão, osso e cobre; tipografia condensada (Big Shoulders) + Manrope. Visual urbano, sem clichês vintage.

## Funcionalidades

- Home: hero, apresentação, cardápio de serviços com preços e duração, equipe, galeria, avaliações (marcadas como ilustrativas), horários e endereço, FAQ, rodapé.
- Menu móvel (Esc fecha, foco retorna ao botão) e botão flutuante de WhatsApp.
- **Agendamento `/agendar`** em 5 etapas:
  1. Serviço (pode vir pré-selecionado: `/agendar?servico=corte-degrade`)
  2. Barbeiro ou "sem preferência" (só aparecem os que fazem o serviço; `?barbeiro=diego`)
  3. Dia e horário — dias fechados desabilitados; só horários em que o serviço cabe inteiro; ocupados riscados e desabilitados; antecedência mínima de 60 min no dia
  4. Nome e WhatsApp com máscara e validação
  5. Revisão → confirmação demonstrativa → mensagem pronta para o WhatsApp
- A escolha é **revalidada** no momento da confirmação (o horário pode ter "vencido").
- SEO: metadados, Open Graph, dados estruturados `BarberShop`, sitemap, `noindex` por padrão.

## Apenas demonstrativo

- A agenda ocupada é gerada localmente (determinística por barbeiro e data). **Nada é reservado nem enviado**; a tela final diz isso.
- Telefone `(11) 0000-0000` e e-mail `.example` são propositalmente inválidos. Endereço e Instagram são ilustrativos. Mapa é um SVG.

## Estrutura

```
src/
  app/            layout, home, /agendar, robots, sitemap, ícone, 404, imagem OG
  components/     Header, MobileNav, Footer, ui, home/*, booking/*
  data/           business.ts (contatos, expediente, regras), services.ts, team.ts, content.ts
  lib/            booking.ts (+ testes), contact.ts, config.ts, use-now.ts
  assets/         fotos + CREDITOS.md
```

## Rodar

Na raiz do repositório: `npm install` e `npm run dev:barbearia` → http://localhost:3001

## Personalizar

| O quê | Onde |
|---|---|
| Nome, endereço, telefone, e-mail, Instagram | `src/data/business.ts` → `business` |
| Expediente (por dia da semana, aceita vários turnos) | `src/data/business.ts` → `HOURS` |
| Intervalo dos horários, janela de dias, antecedência | `src/data/business.ts` → `BOOKING_RULES` |
| Serviços, preços, durações, categorias | `src/data/services.ts` |
| Barbeiros e quais serviços cada um faz | `src/data/team.ts` |
| Galeria, avaliações, FAQ | `src/data/content.ts` |
| Número do WhatsApp | `.env.local` → `NEXT_PUBLIC_WHATSAPP_NUMBER=11999999999` |
| Cores | `src/app/globals.css` (`@theme`) |
| Fontes | `src/app/layout.tsx` |
| Imagens | Substitua os arquivos em `src/assets` mantendo os nomes (ou ajuste os imports). Prefira JPEG até ~300 KB; o `next/image` gera os tamanhos |
| Imagem de compartilhamento | `src/app/opengraph-image.jpg` (1200×630) |

Para conectar uma agenda real, substitua `busyFor()` em `src/lib/booking.ts` por uma consulta ao sistema de agenda e confirme a reserva no servidor.

## Deploy

Vercel: novo projeto com *Root Directory* `sites/barbearia`, variáveis do `.env.example`. Detalhes e alternativas no [README da raiz](../../README.md#publicação).
