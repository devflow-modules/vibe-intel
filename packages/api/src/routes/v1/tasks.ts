import { FastifyInstance } from "fastify";
import { z } from "zod";
import { runTask } from "@devflow-modules/vibe-core";

const BodySchema = z.object({
  goal: z.enum(["review", "tests", "docs"]),
  files: z.array(
    z.object({
      path: z.string(),
      content: z.string().max(150_000)
    })
  )
});

export async function registerTasksRoute(fastify: FastifyInstance) {
  fastify.post(
    "/v1/tasks",
    { preValidation: [fastify.authenticate] },
    async (req, res) => {
      const input = BodySchema.parse(req.body as unknown);
      const result = await runTask({
        goal: input.goal,
        files: input.files.map((f: any) => f.content)
      });
      return res.send({ ok: true, result });
    }
  );
}
