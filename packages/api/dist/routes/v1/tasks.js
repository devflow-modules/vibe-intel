import { z } from "zod";
import { runTask } from "@devflow-modules/vibe-core";
const BodySchema = z.object({
    goal: z.enum(["review", "tests", "docs"]),
    files: z.array(z.object({
        path: z.string(),
        content: z.string().max(150_000)
    }))
});
export async function registerTasksRoute(fastify) {
    fastify.post("/v1/tasks", { preValidation: [fastify.authenticate] }, async (req, res) => {
        const input = BodySchema.parse(req.body);
        const result = await runTask({
            goal: input.goal,
            files: input.files.map((f) => f.content)
        });
        return res.send({ ok: true, result });
    });
}
