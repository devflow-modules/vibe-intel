import { FastifyInstance } from "fastify";

export async function registerHealthRoute(fastify: FastifyInstance) {
  fastify.get("/v1/health", async () => {
    return { ok: true, uptime: process.uptime() };
  });
}
