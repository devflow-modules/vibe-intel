import rateLimit from "@fastify/rate-limit";
export async function registerRateLimit(fastify) {
    await fastify.register(rateLimit, {
        max: 60,
        timeWindow: "1 minute",
        keyGenerator: (req) => req.user?.tenant_id || req.ip
    });
}
