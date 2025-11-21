Overview
========

Documento oficial de versionamento da API pública do Vibe Intel.

Estrutura
=========

- Cada versão possui:
  - Caminho base (`/api/v#`)
  - Escopo (features cobertas)
  - Data de lançamento
  - Data planejada de depreciação
  - Status (ativo, em transição, deprecado)
- Novas versões devem ser adicionadas nesta tabela antes de qualquer deploy.

Fluxo
=====

1. Adicionar entrada da nova versão.
2. Atualizar blueprints/rotas para apontar o novo caminho.
3. Registrar prazo de coexistência com a versão anterior.
4. Comunicar data de desligamento no Slack/Docs.

Exemplo
=======

| Versão | Base Path | Features | Lançamento | Depreciação | Status   |
|--------|-----------|----------|------------|-------------|----------|
| v1     | /api/v1   | health, review, tasks | 2025-11-20 | 2026-06-30 | Ativo   |
| v2     | /api/v2   | _planejado_ | _TBD_ | _TBD_ | Em planejamento |

Notas
=====

- Qualquer breaking change deve criar nova versão.
- Documentar links de PR/Release ao atualizar esta tabela.
- Rotas antigas só podem ser removidas após confirmação com produto.
- Mudanças estruturais (telemetria, error handling global, novas políticas de secrets) devem citar `initCore` e `resolveSecret` na descrição da versão.
- Releases só avançam quando o pipeline valida logs estruturados (`createLogger` + `service`) e quando os builds TypeScript seguem a matriz (base NodeNext + override ESNext na UI).
- Sprint 3 introduzirá o plano “Error Handling Global”; registre o rollout como `v1.x` assim que os códigos padronizados estiverem prontos.

