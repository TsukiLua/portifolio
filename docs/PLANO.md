# Plano de execução

## Diagnóstico do ambiente (inspeção inicial)

- Diretório vazio, sem repositório Git nem projeto prévio (apenas um arquivo vazio `a]`, preservado e fora do versionamento).
- Node 20.20.2 e npm 10.8.2 no Windows 11. Sem pnpm/yarn.
- Acesso à rede disponível (registro npm e Unsplash).

## Arquitetura

Monorepo simples com **npm workspaces**: uma única instalação de dependências e quatro aplicações Next.js independentes.

```
packages/core          regras de negócio compartilhadas (sem UI)
sites/barbearia        Brasa Barbearia          porta 3001
sites/servicos-locais  Casa em Dia              porta 3002
sites/catalogo-loja    Maré                     porta 3003
sites/estudio-beleza   Sálvia Estúdio           porta 3004
e2e/                   testes Playwright de ponta a ponta
```

Decisões:

| Tema | Decisão | Motivo |
|---|---|---|
| Framework | Next.js 16 (App Router) + React 19 | Pedido do briefing; geração estática por padrão |
| Linguagem | TypeScript 5.9 estrito | TS 7 é recente demais para o ecossistema do Next/ESLint |
| Estilo | Tailwind CSS 4 | Tokens de tema por site via `@theme` |
| Lint | ESLint 9 + `eslint-config-next` | ESLint 10 ainda sem suporte pleno dos plugins do Next |
| Testes | Vitest 4 (regras) + Playwright (fluxos e responsividade) | Vitest 5 exige Node 22 |
| Compartilhamento | Só lógica em `@demo/core` (datas, agenda, telefone, WhatsApp, moeda) | Evita que os sites pareçam o mesmo template |
| Backend | Nenhum | Nenhuma funcionalidade exige persistência real; fluxos declaram-se demonstrativos |
| Imagens | Fotos do Unsplash (licença Unsplash, sem Unsplash+), baixadas e versionadas localmente, servidas via `next/image` | Sem dependência externa em runtime; sem CLS |
| WhatsApp | `wa.me` com número vindo de variável de ambiente; sem número configurado, abre o seletor de contatos | Não expõe telefone de terceiros |
| Indexação | `noindex` por padrão (variável de ambiente para liberar) | Demonstrações não devem poluir buscadores |

## Etapas

1. Inspeção e plano (este documento).
2. Estrutura: workspaces, configs (TS, ESLint, Tailwind, Vitest, Playwright), `@demo/core` com testes.
3. Imagens: curadoria, download otimizado e créditos.
4. Sites, um por vez: identidade visual, seções, funcionalidades.
5. Validação: typecheck, lint, testes unitários, build, E2E em 3 larguras.
6. Documentação central, READMEs, melhorias futuras.
7. Relatório final.

## Critérios de aceitação

Os do briefing (seção 11), verificados por: `npm run typecheck`, `npm run lint`, `npm test`, `npm run build` e `npm run test:e2e`.
