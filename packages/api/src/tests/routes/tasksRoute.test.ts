import { describe, it, expect, vi, beforeAll, afterAll } from "vitest";
import { buildServer } from "../../server.js";
import * as tasksService from "../../services/tasks/tasksService.js";

describe("POST /api/v1/tasks", () => {
  const payload = {
    goal: "review",
    files: [{ path: "app.ts", content: "export const sum = (a,b)=>a+b" }]
  };

  let app: Awaited<ReturnType<typeof buildServer>>;

  beforeAll(async () => {
    app = await buildServer();
  });

  afterAll(async () => {
    await app.close();
  });

  it("retorna 200 quando automation task completa", async () => {
    vi.spyOn(tasksService, "executeAutomationTask").mockResolvedValue({
      goal: "review",
      result: {
        summary: "done",
        findings: [],
        metrics: { filesCount: 1, chars: 10 }
      }
    });

    const token = await (app as any).jwt.sign({ sub: "tester" });
    const response = await app.inject({
      method: "POST",
      url: "/api/v1/tasks",
      payload,
      headers: {
        cookie: `vibe_session=${token}`
      }
    });

    expect(response.statusCode).toBe(200);
    const body = response.json();
    expect(body.data.goal).toBe("review");
  });
});

