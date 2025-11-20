import { describe, it, expect, vi } from "vitest";
import { executeAutomationTask } from "../../services/tasks/tasksService.js";

vi.mock("../../services/review/reviewService.js", () => ({
  executeCodeReview: vi.fn().mockResolvedValue({
    summary: "ok",
    findings: [],
    metrics: { filesCount: 1, chars: 10 }
  })
}));

describe("executeAutomationTask", () => {
  it("mapeia goal para foco correto e retorna resultado tipado", async () => {
    const response = await executeAutomationTask({
      goal: "review",
      files: [{ path: "index.ts", content: "console.log('test');" }]
    });

    expect(response.goal).toBe("review");
    expect(response.result.summary).toBe("ok");
  });
});

