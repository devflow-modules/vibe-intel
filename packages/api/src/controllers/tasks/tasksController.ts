import type { FastifyReply, FastifyRequest } from "fastify";
import { sendError, sendSuccess } from "../../lib/http.js";
import { TasksRequestSchema } from "../../schemas/tasks/tasksSchema.js";
import { executeAutomationTask } from "../../services/tasks/tasksService.js";

type TasksRequest = FastifyRequest;

export async function tasksController(req: TasksRequest, reply: FastifyReply) {
  const parsed = TasksRequestSchema.safeParse(req.body);

  if (!parsed.success) {
    return sendError(reply, {
      message: "Payload inválido",
      status: 400,
      issues: parsed.error.issues
    });
  }

  const result = await executeAutomationTask(parsed.data, { log: (req as any).log });

  return sendSuccess(reply, result);
}

