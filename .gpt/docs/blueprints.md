# Vibe Intel — Blueprints Oficiais (v1.0)

Este documento define os blueprints oficiais para criação de features, rotas, módulos, componentes, testes e serviços no monorepo Vibe Intel.

Todos os arquivos criados pelo Cursor OU ChatGPT DEVEM seguir rigorosamente estes padrões.

---

## 1. Blueprint de Rota (Backend API)

Estrutura obrigatória:

/packages/api/src/routes/[feature]/route.ts
/packages/api/src/controllers/[feature]Controller.ts
/packages/api/src/services/[feature]Service.ts
/packages/api/src/schemas/[feature]Schema.ts
/packages/api/tests/[feature].test.ts
- Base path obrigatório: `/api/v1/[feature]`.

## 1.1. Estrutura do Controller

- Sem lógica de negócio no controller.
- Apenas validação inicial, chamada ao service e formatação da resposta.
- Uso obrigatório de Zod.
- Respostas padronizadas com: sendSuccess / sendError.

## 1.2. Estrutura do Service

- Toda a lógica de negócio centralizada aqui.
- Nunca acessar req/res dentro do service.
- Prisma e Supabase utilizados apenas através de funções utilitárias (ex: prismaClient, supabaseAdmin).
- Sem side-effects não controlados.

## 1.3. Schemas Zod

- Sempre criar input e output.
- Input: validação completa.
- Output: tipagem estrita.
- Nada de `z.any()`.

## 1.4. Testes

- Testes de unidade para o service.
- Testes de integração para a rota (Vitest).
- Mock centralizado em shared/test-utils.
- Cada teste deve declarar explicitamente a versão exercitada.

---

## 2. Blueprint de Módulo (Core / Shared)

Estrutura obrigatória:

/packages/shared/[module]/
/packages/shared/[module]/index.ts
/packages/shared/[module]/[module].ts
/packages/shared/[module]/[module].schema.ts
/packages/shared/[module]/[module].types.ts

### Regras do Módulo

- Apenas lógica pura.
- Sem dependências de UI ou API.
- Export único pelo index.ts.
- Testes obrigatórios para cada módulo.

---

## 3. Blueprint de Tela (Next.js 15 – UI)

/packages/ui/src/app/(dash)/[feature]/page.tsx
/packages/ui/src/app/(dash)/[feature]/components/
/packages/ui/src/app/(dash)/[feature]/hooks/
/packages/ui/src/app/(dash)/[feature]/schema.ts

### Regras da Tela

- Server Components para carregamento inicial.
- Client Components SOMENTE quando houver estado ou interação.
- Formulários: React Hook Form + ZodResolver.
- Estado: Zustand slice por domínio.
- UI: sem CSS aleatório, usar Tailwind + design tokens.

---

## 4. Blueprint para Hooks (UI)

Nome:
use[Feature].[component].ts

Local:
/ui/src/hooks/[domain]/

### Regras do Hook

- Sem side-effects não declarados.
- Sem lógica duplicada.
- Sempre tipado.
- Regras de negócio ficam no service, não no hook.

---

## 5. Blueprint de Service (Frontend)

Local:
/ui/src/services/[feature]Service.ts

### Regras do Service

- Toda chamada HTTP fica centralizada aqui.
- Nunca chamar fetch no componente.
- Sempre utilizar funções puras.
- Tratamento de erros centralizado.

---

## 6. Blueprint de Testes (UI + API)

## API — Vitest

- Teste de service
- Teste de controller
- Teste de rota
- Mock de prisma
- Mock de Supabase

## UI — Testing Library / Vitest

- Teste de componentes importantes
- Teste de hooks com renderHook
- Teste de páginas com mocking de serviços
- Snapshot somente quando fizer sentido

---

## 7. Blueprint de Feature Completa

Checklist:

- [ ] Schema Zod (input/output)
- [ ] Service
- [ ] Controller
- [ ] Rota
- [ ] Teste unitário
- [ ] Teste de integração
- [ ] Página UI
- [ ] Componente(s)
- [ ] Hook(s)
- [ ] Service de frontend
- [ ] Documentação da feature
- [ ] Commits semânticos
- [ ] Release notes geradas

---

## 8. Blueprint de Mensagens

- Sempre escrever mensagens claras e testáveis.
- Nunca deixar mensagens genéricas para erros (“Algo deu errado”).

---

## 9. Blueprint de Logs

- JSON estruturado.
- Sem console.log em produção.
- Usar logger centralizado.

---

## 10. Blueprint de Estrutura de Domínio

Cada domínio tem:

/feature

- routes
- controller
- service
- schema
- types
- tests
- ui (caso aplicável)
- versionamento/documentação (`docs/versioning.md`)
