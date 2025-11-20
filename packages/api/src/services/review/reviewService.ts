import { runAgent } from "@devflow-modules/vibe-core";
import { AppError } from "@devflow-modules/vibe-shared";
import type { ReviewRequest, ReviewResponse } from "../../schemas/review/reviewSchema.js";
import { ReviewResponseSchema } from "../../schemas/review/reviewSchema.js";

type ReviewServiceDeps = {
  log?: {
    info: (input: Record<string, unknown>) => void;
    debug: (input: Record<string, unknown>) => void;
    error: (input: Record<string, unknown>) => void;
  };
};

export async function executeCodeReview(
  payload: ReviewRequest,
  deps: ReviewServiceDeps = {}
): Promise<ReviewResponse> {
  deps.log?.info({ msg: "review:start", files: payload.files.length });

  try {
    const result = await runAgent({
      skill: "code_review",
      payload,
      context: {
        env: "cloud",
        model: "gpt-4o-mini",
        telemetry: {
          onEvent(event) {
            deps.log?.debug?.({
              msg: "review:event",
              type: event.type,
              skill: event.skill,
              data: event.payload ?? event.result
            });
          }
        }
      }
    });

    deps.log?.info({ msg: "review:success" });

    return ReviewResponseSchema.parse(result);
  } catch (error) {
    deps.log?.error({ msg: "review:failure", error });
    throw new AppError("Falha ao executar code review", {
      status: 502,
      code: "REVIEW_FAILURE",
      details: error
    });
  }
}

