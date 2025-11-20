import { z } from "zod";

export const SummaryItemSchema = z.object({
  id: z.string(),
  title: z.string(),
  value: z.string(),
  description: z.string()
});

export const DashboardSummarySchema = z.object({
  updatedAt: z.string().datetime(),
  items: z.array(SummaryItemSchema)
});

export type DashboardSummary = z.infer<typeof DashboardSummarySchema>;

