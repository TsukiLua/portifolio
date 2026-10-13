# Melhorias futuras

## Obrigatórias antes de usar com um cliente real

| # | Item | Sites | Observação |
|---|---|---|---|
| 1 | Substituir marca, textos, preços, endereços e contatos fictícios pelos reais | Todos | Tudo em `src/data/*` |
| 2 | Remover a faixa e os avisos de demonstração | Todos | `DemoBar`, notas em fluxos e depoimentos |
| 3 | Configurar `NEXT_PUBLIC_WHATSAPP_NUMBER`, `NEXT_PUBLIC_SITE_URL` e liberar indexação | Todos | `.env.local` ou painel do host |
| 4 | Usar fotos próprias do negócio e da equipe real (com autorização de uso de imagem) | Todos | Fotos atuais são de banco de imagens com nomes fictícios |
| 5 | Depoimentos reais com autorização, ou remover a seção | Brasa, Casa em Dia | Nunca apresentar texto fictício como avaliação real |
| 6 | Integrar a agenda real e tratar concorrência (dois clientes no mesmo horário) | Brasa, Sálvia | Trocar `busyFor` por API; revalidar no servidor |
| 7 | Envio real do orçamento: Route Handler + e-mail/CRM, rate limit e CAPTCHA | Casa em Dia | Registrar consentimento (LGPD) |
| 8 | Política de privacidade e termos (LGPD) | Todos | Obrigatório ao coletar dados pessoais |
| 9 | Estoque real e preços atualizados | Maré | Planilha, ERP ou CMS |
| 10 | Revisar política de trocas com o cliente | Maré | Prazos e valores atuais são exemplos |
| 11 | Fotos e dados reais dos veículos; revisão jurídica da política de privacidade | Prime Motors | Fotos atuais são do Wikimedia Commons, não do estoque |
| 12 | Envio real de leads/visitas com CRM, anti-spam e consentimento | Prime Motors | Hoje o formulário só prepara a mensagem de WhatsApp |

## Opcionais (agregam valor comercial)

- **Painel do dono** para editar serviços, preços e produtos sem código (CMS headless, ex.: Sanity, ou Google Sheets como fonte).
- **Lembretes automáticos** de agendamento por WhatsApp Business API (custo por conversa: dimensionar antes).
- **Analytics com consentimento** (Plausible ou GA4 + banner) e eventos de conversão: clique no WhatsApp, envio de orçamento, agendamento concluído.
- **Mapa real** com carregamento sob demanda (clique para carregar) para não afetar desempenho nem exigir cookies antes do consentimento.
- **Pagamento de sinal** (Pix) no agendamento para reduzir faltas.
- **Exportar para calendário** (.ics) na tela de confirmação.
- **Filtro por tamanho/cor** e paginação no catálogo quando passar de ~60 produtos.
- **Imagens AVIF** (`images.formats`) para reduzir ainda mais o peso, se o host suportar o custo de CPU.
- **Testes de acessibilidade automatizados** com `@axe-core/playwright`.
- **Pacote de UI compartilhado** apenas para primitivas sem estilo (Dialog, Field) se o portfólio crescer.
- **Prime Motors:** comparador de até 3 veículos, simulador de parcelas (com aviso de valores estimados), filtro por faixa livre de preço e paginação acima de ~100 veículos.
- **Indicar no calendário** os dias sem nenhum horário livre (hoje o visitante vê o estado vazio ao clicar).
