import jwt from "@fastify/jwt";
export async function registerAuth(fastify) {
    await fastify.register(jwt, {
        secret: process.env.JWT_SECRET || "dev-secret"
    });
    fastify.decorate("authenticate", async (req, res) => {
        try {
            await req.jwtVerify();
        }
        catch {
            res.code(401).send({ error: "unauthorized" });
        }
    });
}
