import { describe, it, expect, vi } from "vitest";
import { runAgent } from "../src/index.js";
import type { CodeReviewResult } from "../src/skills/code_review.js";

vi.mock("@devflow-modules/vibe-shared", async (importOriginal) => {
    const actual = (await importOriginal()) as Record<string, any>;
    return {
        ...actual,
        setupTelemetry: vi.fn().mockResolvedValue(undefined),
        ai: vi.fn().mockResolvedValue({
            content: '{"summary":"sucesso","findings":[],"metrics":{"filesCount":1,"chars":10}}',
            raw: {}
        }),
        aiClient: {
            chat: {
                completions: {
                    create: vi.fn().mockResolvedValue({
                        choices: [
                            {
                            message: { content: '{"summary":"sucesso","findings":[],"metrics":{"filesCount":1,"chars":10}}' }
                            }
                        ]
                    })
                }
            }
        }
    };
});

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
