import type { FastifyReply } from "fastify";

export function sendSuccess<T>(
  reply: FastifyReply,
  data: T,
  status: number = 200
) {
  return reply.status(status).send({ ok: true, data });
}

export function sendError(
  reply: FastifyReply,
  options: {
    message: string;
    status?: number;
    code?: string;
    issues?: unknown;
  }
) {
  return reply.status(options.status ?? 400).send({
    ok: false,
    error: options.message,
    code: options.code,
    issues: options.issues
  });
}

