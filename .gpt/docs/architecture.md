# Vibe Intel — Arquitetura Oficial (v1.0)

Este documento descreve a arquitetura REAL do projeto Vibe Intel, servindo como referência para o Cursor, para o ChatGPT e para desenvolvedores futuros.

Atualize sempre que a arquitetura evoluir.

---

## 1. Estrutura do Monorepo

/vibe-intel
│
├── packages/
│   ├── core/            # Núcleo do agente (skills, memory, loaders, execution engine)
│   ├── api/             # Interface pública (Fastify/Express) + RLS + Auth
│   ├── ui/              # Painel (Next.js 15, Tailwind v4, App Router)
│   └── shared/          # Tipos, schemas Zod, clientes, utils globais
│
├── .gpt/
│   ├── blueprints/      # Padrões de features, rotas, módulos e testes
│   └── docs/            # Documentação indexada pelo Cursor
│
├── .cursor/
│   └── rules/           # Regras de arquitetura aplicadas automaticamente
│
├── turbo.json           # Orquestração do monorepo
├── pnpm-workspace.yaml
└── README.md

---

## 2. Tecnologias Principais

- **Next.js 15 (App Router, RSC)**
- **Node.js / Express / Fastify**
- **Prisma ORM**
- **Supabase (RLS, Auth, Storage)**
- **Zod para validação**
- **Vitest + Playwright**
- **Turbo Repo + PNPM**
- **Tailwind CSS v4**
- **TypeScript estrito**
- **GPT-5.1-Codex-High como modelo oficial**

---

## 3. Padrões de Arquitetura

## Backend / API

- controllers ficam em `api/src/controllers`
- services ficam em `api/src/services`
- Zod schemas em `api/src/schemas`
- tipagens globais em `shared/types`
- erros padronizados (sendError / sendSuccess)
- sempre ESM

## Frontend / UI

- pastas por domínio dentro de `ui/src/app/(dash)`
- hooks globais em `ui/src/hooks`
- componentes em `ui/src/components`
- estado: Zustand com slices e persist
- formulários: React Hook Form + Zod

## Core (Agente)

- skills isoladas
- roteador principal em `agent.ts`
- memory drivers intercambiáveis
- context loaders (repo, files, diffs)
- segurança: sandbox + exec seguro

---

## 4. Fluxo de uma Feature (Pipeline Oficial)

1. Blueprint → `/.gpt/blueprints`
2. Schema Zod
3. Service
4. Controller
5. Rotas
6. UI (página + hook + componente)
7. Testes unitários
8. Testes e2e
9. Documentação
10. Commit com Conventional Commits
11. Release automático (semantic-release)

---

## 5. Regras de Qualidade (10/10)

- 0 uso de `any`
- 100% das rotas com schema Zod
- Testes presentes para cada módulo
- Tipagem estrita em todos os packages
- Imports absolutos `@/`
- Nenhum `console.log` em produção
- Logs estruturados JSON
- Tudo modular, tudo isolado por domínio

---

## 6. Roadmap Arquitetural

- Adicionar skill de code-review
- Skill de testes automatizados
- Skill de documentação automática
- Auditoria de PR por IA
- Painel avançado com histórico de execuções

---

## 7. Identificação do Projeto

Projeto: Vibe Intel  
Autor: Gustavo Marques  
Data Atual: 19/11/2025

## 8. Versões da API

- Base oficial: `/api/v1/*`.
- Controllers e services devem declarar a versão explicitamente ao exportar (ex: `registerTasksRoute` registra sempre em `/api/v1/tasks`).
- Novas mudanças breaking devem ir para `/api/v2` e manter `/api/v1` ativa até data de depreciação registrada em `docs/versioning.md`.
- Todo endpoint precisa documentar:
  - data de lançamento
  - data de depreciação (quando aplicável)
  - compatibilidade entre versões
