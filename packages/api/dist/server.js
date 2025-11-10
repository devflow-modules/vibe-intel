import Fastify from "fastify";
import dotenv from "dotenv";
import { registerAuth } from "./lib/auth";
import { registerRateLimit } from "./lib/rate";
import { registerHealthRoute } from "./routes/v1/health";
import { registerTasksRoute } from "./routes/v1/tasks";
dotenv.config();
async function startServer() {
    const fastify = Fastify({ logger: true });
    // Registro dos plugins e rotas
    await registerAuth(fastify);
    await registerRateLimit(fastify);
    await registerHealthRoute(fastify);
    await registerTasksRoute(fastify);
    const port = Number(process.env.PORT || 3333);
    try {
        await fastify.listen({ port, host: "0.0.0.0" });
        console.log(`🚀 Server running on http://localhost:${port}`);
    }
    catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
}
startServer();
