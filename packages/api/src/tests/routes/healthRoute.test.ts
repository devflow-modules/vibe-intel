import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { buildServer } from "../../server.js";

describe("GET /api/v1/health", () => {
  let app: Awaited<ReturnType<typeof buildServer>>;

  beforeAll(async () => {
    app = await buildServer();
  });

  afterAll(async () => {
    await app.close();
  });

  it("retorna status operacional", async () => {
    const response = await app.inject({
      method: "GET",
      url: "/api/v1/health"
    });

    expect(response.statusCode).toBe(200);
    const body = response.json();
    expect(body.ok).toBe(true);
    expect(body.data.uptime).toBeGreaterThanOrEqual(0);
  });
});

