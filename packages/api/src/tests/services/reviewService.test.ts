import { describe, it, expect, vi, beforeEach } from "vitest";
import type { ReviewRequest } from "../../schemas/review/reviewSchema.js";

const mockInitCore = vi.fn();
const mockRunAgent = vi.fn();

const basePayload: ReviewRequest = {
  files: [{ path: "index.ts", content: "export const x = 1;" }],
  language: "typescript",
  focus: ["bugs"],
};

const createLogMock = () => ({
  info: vi.fn(),
  debug: vi.fn(),
  error: vi.fn(),
});

async function loadService() {
  vi.resetModules();
  vi.doMock("@devflow-modules/vibe-core", async () => {
    const actual = await vi.importActual<typeof import("@devflow-modules/vibe-core")>(
      "@devflow-modules/vibe-core"
    );
    return {
      ...actual,
      initCore: () => mockInitCore(),
      runAgent: (...args: unknown[]) => mockRunAgent(...args),
    };
  });
  return import("../../services/review/reviewService.js");
}

beforeEach(() => {
  mockInitCore.mockReset();
  mockRunAgent.mockReset();
});

describe("executeCodeReview", () => {
  it("executa runAgent e retorna relatório válido", async () => {
    mockInitCore.mockReturnValue(Promise.resolve());
    mockRunAgent.mockResolvedValue({
      summary: "ok",
      findings: [],
      metrics: { filesCount: 1, chars: 10 },
    });

    const { executeCodeReview } = await loadService();
    const log = createLogMock();
    const result = await executeCodeReview(basePayload, { log });

    expect(result.summary).toBe("ok");
    expect(mockRunAgent).toHaveBeenCalledWith(
      expect.objectContaining({
        skill: "code_review",
        payload: basePayload,
      })
    );
    expect(log.info).toHaveBeenCalledWith(
      expect.objectContaining({ msg: "review:start" })
    );
    expect(log.info).toHaveBeenCalledWith(
      expect.objectContaining({ msg: "review:success" })
    );
  });

  it("propaga AppError quando runAgent falha", async () => {
    mockInitCore.mockReturnValue(Promise.resolve());
    mockRunAgent.mockRejectedValue(new Error("boom"));

    const { executeCodeReview } = await loadService();
    const log = createLogMock();

    await expect(
      executeCodeReview(basePayload, { log })
    ).rejects.toMatchObject({
      status: 502,
      code: "REVIEW_FAILURE",
    });
    expect(log.error).toHaveBeenCalledWith(
      expect.objectContaining({ msg: "review:failure" })
    );
  });

  it("falha rapidamente quando initCore rejeita", async () => {
    const initError = Promise.reject(new Error("init fail"));
    initError.catch(() => null);
    mockInitCore.mockReturnValue(initError);

    const { executeCodeReview } = await loadService();
    const log = createLogMock();

    await expect(
      executeCodeReview(basePayload, { log })
    ).rejects.toThrow("init fail");
    expect(mockRunAgent).not.toHaveBeenCalled();
    expect(log.info).not.toHaveBeenCalled();
  });
});

