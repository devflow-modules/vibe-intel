import { describe, it, expect, beforeAll, afterAll, vi } from "vitest";
import { buildServer } from "../../server.js";
import * as reviewService from "../../services/review/reviewService.js";

describe("POST /api/v1/review", () => {
  let app: Awaited<ReturnType<typeof buildServer>>;

  beforeAll(async () => {
    app = await buildServer();
  });

  afterAll(async () => {
    await app.close();
  });

  it("valida payload e retorna relatório", async () => {
    vi.spyOn(reviewService, "executeCodeReview").mockResolvedValue({
      summary: "ok",
      findings: [],
      metrics: { filesCount: 1, chars: 20 }
    });

    const token = await (app as any).jwt.sign({ sub: "tester" });
    const response = await app.inject({
      method: "POST",
      url: "/api/v1/review",
      headers: { cookie: `vibe_session=${token}` },
      payload: {
        files: [{ path: "index.ts", content: "export const x = 1;" }],
        language: "typescript",
        focus: ["bugs"]
      }
    });

    expect(response.statusCode).toBe(200);
    const body = response.json();
    expect(body.data.summary).toBe("ok");
    expect(reviewService.executeCodeReview).toHaveBeenCalled();
  });

  it("retorna 400 para payload inválido", async () => {
    const token = await (app as any).jwt.sign({ sub: "tester" });
    const response = await app.inject({
      method: "POST",
      url: "/api/v1/review",
      headers: { cookie: `vibe_session=${token}` },
      payload: {}
    });

    expect(response.statusCode).toBe(400);
  });
});

