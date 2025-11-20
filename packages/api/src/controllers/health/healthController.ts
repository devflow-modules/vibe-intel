import type { FastifyReply, FastifyRequest } from "fastify";
import { getHealthStatus } from "../../services/health/healthService.js";
import { sendSuccess } from "../../lib/http.js";

export async function healthController(_req: FastifyRequest, reply: FastifyReply) {
  const status = await getHealthStatus();
  return sendSuccess(reply, status);
}

