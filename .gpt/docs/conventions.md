# Vibe Intel — Convenções Oficiais do Projeto (v1.0)

Estas convenções definem o comportamento padrão para todo o monorepo.

---

## 1. Nomenclatura (Naming)

### Pastas

- controllers/
- services/
- schemas/
- utils/
- tests/
- hooks/
- components/
- types/

### Arquivos

- route.ts (somente um por diretório de rota)
- [feature]Controller.ts
- [feature]Service.ts
- [feature]Schema.ts
- [feature].test.ts
- use[Feature].[domain].ts
- [feature]Service.ts (frontend)

### Variáveis

- camelCase para variáveis e funções
- PascalCase para componentes e classes
- CONSTANT_CASE para constantes

### Types

- `type Something = {...}`
- Nunca usar `interface` no projeto

---

## 2. Imports

### Padrão oficial

import { ... } from "@/packages/shared/...";

Regras:

- Sempre imports absolutos com "@/..."
- Nunca usar caminhos relativos longos (“../../../”)
- Index.ts deve exportar tudo que é público

---

## 3. Estrutura das Respostas (Backend)

### Sucesso

sendSuccess(data)

### Erro

sendError("Mensagem clara", statusCode)

Regras:

- Mensagens de erro devem ser específicas.
- Nunca retornar erro cru.
- Nunca expor stack trace para o cliente.

---

## 4. Zod — Convenções

- Todo input deve ser um Zod schema.
- Todo output também.
- Expressar restrições reais (regex, min, max).
- Nunca usar `z.any()`.

Exemplo padrão:

export const CreateUserSchema = z.object({
email: z.string().email(),
name: z.string().min(2),
});

---

## 5. TypeScript — Convenções

- Sempre strict mode.
- Nunca usar any.
- Evitar unknown.
- Sempre inferir tipos a partir de schemas.
- Garantir que services sejam funções puras.

---

## 6. Organização do Código

### Backend

- Controller → valida + chama service.
- Service → lógica e regras de negócio.
- Repo → acesso a banco.
- Schema → validação.
- Tests → unidade e integração.

### Frontend

- Page → estrutura visual.
- Component → UI fragmentada.
- Hook → lógica client-side.
- Service → fetch centralizado.
- Schema → validação.
- Store → estado global.

---

## 7. React — Convenções

- Usar componentes server sempre que possível.
- Components client apenas quando necessário.
- Hooks devem ser pequenos e isolados.
- Nada de lógica pesada dentro do componente.

---

## 8. Zustand — Convenções

- Sempre criar slices por domínio:

createUserSlice
createAuthSlice
createSettingsSlice

- A store final combina todos os slices.

---

## 9. Testes — Convenções

### Unitários

- Testar services, utils, schemas.

### Integração

- Testar controllers e rotas.
- Usar supertest ou fetch.

### UI

- Testar páginas críticas.
- Testar componentes dinâmicos.
- Testar hooks com renderHook.

---

## 10. Commits — Convenções

Seguir Conventional Commits:

- feat:
- fix:
- chore:
- refactor:
- docs:
- test:

---

## 11. Releases — Convenções

- Geradas automaticamente com semantic-release.
- Changelogs automáticos.
- Versionamento semântico controlado.

---

## 12. Logs — Convenções

- JSON estruturado.
- Nível: debug / info / warn / error.
- Nada de console.log no código final.

---

## 13. Segurança

- RLS 100% aplicado no Supabase.
- Nunca expor service_role no frontend.
- JWT assinado com expiração curta.
- Cookies HttpOnly + SameSite + Secure.
- Schema obrigatório em toda request.

---

## 14. Arquitetura — Convenções Gerais

- Monorepo organizado por packages.
- Cada feature deve ser modular e isolada.
- Nada compartilhado sem passar por shared/.
- Remover qualquer duplicação lógica imediatamente.

---

## 15. Qualidade 10/10

- Tipagem perfeita.
- Testes cobrindo casos críticos.
- Arquitetura clara.
- Código legível e explícito.
- Sem repetições.
- Sem atalhos.
- Documentar resultados.

## 16. Versionamento da API

- Todos os endpoints públicos vivem em `/api/v1/*`.
- Alterações breaking só podem ir para `/api/v2`.
- Cada rota deve declarar data de lançamento/depreciação em `docs/versioning.md`.
- Ambas as versões devem conviver até a data limite publicada.
