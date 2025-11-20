import type { FastifyInstance } from "fastify";
import { tasksController } from "../../controllers/tasks/tasksController.js";

const BASE_PATH = "/api/v1";

export async function registerTasksRoute(app: FastifyInstance) {
  app.post(
    `${BASE_PATH}/tasks`,
    {
      preValidation: [app.authenticate]
    },
    tasksController
  );
}
