import { describe, it, expect, vi } from "vitest";
import { runAgent } from "../src/index.js";
import type { CodeReviewResult } from "../src/skills/code_review.js";

vi.mock("@devflow-modules/vibe-shared", () => ({
    ai: vi.fn().mockResolvedValue({
        content: "✅ Código analisado com sucesso.",
        raw: {},
    }),
}));

describe("runAgent", () => {
    it("deve executar sem erros com input mínimo válido", async () => {
        const result: CodeReviewResult = await runAgent({
            skill: "code_review",
            payload: {
                files: [
                    {
                        path: "src/example.ts",
                        content: "console.log('Hello World')",
                    },
                ],
                // necessários apenas para satisfazer o TS (defaults em runtime)
                language: "typescript",
                focus: ["bugs", "style", "architecture"],
            },
            context: {
                env: "local",
            },
        });

        expect(result).toBeDefined();
        expect(result.summary).toContain("sucesso");
        expect(result.findings).toBeInstanceOf(Array);
        expect(result.metrics).toHaveProperty("filesCount", 1);
    });
});
