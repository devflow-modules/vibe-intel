import { z } from "zod";
import { CodeReviewInputSchema } from "@devflow-modules/vibe-core";

export const ReviewRequestSchema = CodeReviewInputSchema;

export const ReviewResponseSchema = z.object({
  summary: z.string(),
  findings: z.array(
    z.object({
      file: z.string(),
      severity: z.enum(["info", "minor", "major", "critical"]),
      line: z.number().optional(),
      message: z.string(),
      suggestion: z.string().optional()
    })
  ),
  metrics: z.object({
    filesCount: z.number(),
    chars: z.number()
  })
});

export type ReviewRequest = z.infer<typeof ReviewRequestSchema>;
export type ReviewResponse = z.infer<typeof ReviewResponseSchema>;

