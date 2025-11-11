import { z } from "zod";
import type { VibeSkillContext } from "@devflow-modules/vibe-shared";
declare const ReviewSchema: z.ZodObject<{
    summary: z.ZodString;
    issues: z.ZodArray<z.ZodObject<{
        file: z.ZodString;
        line: z.ZodOptional<z.ZodNumber>;
        type: z.ZodEnum<{
            bug: "bug";
            perf: "perf";
            security: "security";
            style: "style";
        }>;
        reason: z.ZodString;
        fix: z.ZodString;
    }, z.core.$strip>>;
    risk: z.ZodEnum<{
        low: "low";
        medium: "medium";
        high: "high";
    }>;
}, z.core.$strip>;
export type ReviewResult = z.infer<typeof ReviewSchema>;
export declare function execute({ ai, input }: VibeSkillContext): Promise<ReviewResult>;
export {};
