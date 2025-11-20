import type { FastifyInstance } from "fastify";
import { healthController } from "../../controllers/health/healthController.js";

const BASE_PATH = "/api/v1";

export async function registerHealthRoute(app: FastifyInstance) {
  app.get(`${BASE_PATH}/health`, healthController);
}
