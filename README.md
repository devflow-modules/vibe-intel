# 🧪 Vibe Intel — Experimental Lab

**Vibe Intel** é um projeto experimental da **DevFlow Labs** voltado à exploração de agentes, automações inteligentes, roteamento de skills, APIs modulares e pacotes reutilizáveis em TypeScript.

Este repositório permanece público como **laboratório técnico experimental**, não como produto principal da DevFlow Labs. O objetivo é registrar pesquisa, arquitetura, padrões de automação e possíveis módulos reutilizáveis que podem evoluir futuramente para produtos ou pacotes mais maduros.

---

## Status

```text
Experimental / Research Lab
```

Este projeto pode sofrer mudanças estruturais, renomeações, quebras de API e ajustes de escopo sem compromisso de estabilidade pública.

Para cases de produto mais estáveis da DevFlow Labs, veja:

- https://github.com/devflow-modules/devflow-case-studies
- https://github.com/devflow-modules/applyflow-case-study
- https://github.com/devflow-modules/investiga-mais

---

## Objetivo

Explorar uma base modular para agentes e inteligência operacional, com foco em:

- Núcleo de agentes
- Roteamento de skills
- API pública modular
- Tipos e utilitários compartilhados
- Automação de builds e releases
- Publicação contínua de pacotes
- Experimentos com arquitetura orientada a IA

---

## Estrutura do Monorepo

```bash
/vibe-intel
  ├── packages/
  │   ├── api/        # API pública experimental
  │   ├── core/       # Núcleo de agente e roteamento de skills
  │   └── shared/     # Tipos, clients e utilitários compartilhados
  ├── .github/workflows/release.yml
  ├── tsconfig.base.json
  ├── turbo.json
  └── package.json
```

---

## Tecnologias

- TypeScript
- Node.js
- Fastify
- JWT
- Rate limiting
- PNPM Workspaces
- Turborepo
- GitHub Actions
- Semantic Release
- npm Trusted Publishing

---

## Desenvolvimento Local

Clone o repositório:

```bash
git clone https://github.com/devflow-modules/vibe-intel.git
cd vibe-intel
```

Instale as dependências:

```bash
pnpm install
```

Rode os módulos localmente:

```bash
pnpm dev:api
pnpm dev:core
```

Build:

```bash
pnpm build
```

---

## Publicação e Versionamento

O projeto utiliza automação de release com Conventional Commits, Semantic Release e GitHub Actions.

Fluxo previsto:

1. Commits seguem Conventional Commits
2. Semantic Release calcula a versão
3. Changelog e tags são gerados automaticamente
4. Pacotes podem ser publicados via npm Trusted Publishing

---

## Padrão de Commit

```text
<tipo>(escopo): descrição curta
```

Exemplos:

```text
feat(core): add intent router
fix(shared): adjust OpenAI client import
chore(ci): update release workflow
```

---

## Requisitos

- Node.js >= 20
- PNPM >= 10.21.0
- TypeScript >= 5.9
- GitHub OIDC Trusted Publisher configurado no npm quando aplicável

---

## Relação com a DevFlow Labs

Dentro da organização, este repositório deve ser lido como **experimental**.

Estrutura estratégica:

- `devflow` — monorepo privado principal da DevFlow Labs
- `investiga-mais` — SaaS público/case real
- `jwt-auth` — módulo reutilizável
- `applyflow-case-study` — case público específico
- `devflow-case-studies` — hub público de cases
- `vibe-intel` — laboratório experimental de agentes e inteligência operacional

---

## Roadmap Experimental

- Consolidar contratos internos entre `core`, `api` e `shared`
- Documentar arquitetura de agentes
- Criar exemplos de skills
- Adicionar testes automatizados
- Avaliar integração com produtos DevFlow Labs
- Separar módulos que possam virar pacotes públicos estáveis

---

## Licença

MIT.

---

## Autor

Criado e mantido por **Gustavo Marques de Lima** como parte do ecossistema **DevFlow Labs**.

- Portfolio: https://devflowlabs.com.br
- GitHub: https://github.com/gustavomarques00
- DevFlow Labs GitHub: https://github.com/devflow-modules
- LinkedIn: https://www.linkedin.com/in/gustavo-marques-00
