import type { FastifyInstance } from "fastify";
import { reviewController } from "../../controllers/review/reviewController.js";

const BASE_PATH = "/api/v1";

export async function registerReviewRoute(app: FastifyInstance) {
  app.post(
    `${BASE_PATH}/review`,
    {
      preValidation: [app.authenticate]
    },
    reviewController
  );
}
