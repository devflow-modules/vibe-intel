import type { FastifyReply, FastifyRequest } from "fastify";
import { ReviewRequestSchema } from "../../schemas/review/reviewSchema.js";
import { executeCodeReview } from "../../services/review/reviewService.js";
import { sendError, sendSuccess } from "../../lib/http.js";

type ReviewRequest = FastifyRequest;

export async function reviewController(req: ReviewRequest, reply: FastifyReply) {
  const parsed = ReviewRequestSchema.safeParse(req.body);

  if (!parsed.success) {
    return sendError(reply, {
      message: "Payload inválido",
      status: 400,
      issues: parsed.error.issues
    });
  }

  const result = await executeCodeReview(parsed.data, { log: (req as any).log });

  return sendSuccess(reply, result);
}

