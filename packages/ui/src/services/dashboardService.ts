"use server";

import { DashboardSummarySchema, type DashboardSummary } from "../schemas/dashboardSchema";

const MOCK_SUMMARY: DashboardSummary = {
  updatedAt: new Date().toISOString(),
  items: [
    {
      id: "reviews",
      title: "Reviews processadas",
      value: "128",
      description: "Execuções de code review nos últimos 7 dias"
    },
    {
      id: "tests",
      title: "Suítes de teste",
      value: "42",
      description: "Planos de teste automatizados em execução"
    },
    {
      id: "docs",
      title: "Documentações atualizadas",
      value: "19",
      description: "Features documentadas neste sprint"
    }
  ]
};

export async function getDashboardSummary(): Promise<DashboardSummary> {
  // Placeholder até termos endpoint real; mantém contrato via Zod
  const validation = DashboardSummarySchema.safeParse(MOCK_SUMMARY);
  if (!validation.success) {
    throw new Error("Dashboard summary inválido");
  }
  return validation.data;
}

