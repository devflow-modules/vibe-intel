import { describe, it, expect } from "vitest";
import { getHealthStatus } from "../../services/health/healthService.js";

describe("getHealthStatus", () => {
  it("retorna métricas básicas de uptime", async () => {
    const result = await getHealthStatus();

    expect(result).toMatchObject({
      version: "test",
      environment: expect.any(String)
    });
    expect(result.uptime).toBeGreaterThanOrEqual(0);
  });
});

