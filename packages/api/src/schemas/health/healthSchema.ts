import { z } from "zod";

export const HealthPayloadSchema = z.object({
  uptime: z.number(),
  timestamp: z.string().datetime(),
  version: z.string(),
  environment: z.string()
});

export type HealthPayload = z.infer<typeof HealthPayloadSchema>;

